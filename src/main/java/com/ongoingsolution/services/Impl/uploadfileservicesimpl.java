/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services.Impl;

import com.ongoingsolution.dao.logindao;
import com.ongoingsolution.model.CreatUserAccount;
import com.ongoingsolution.services.uploadfileservices;
import java.io.File;
import java.io.InputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URISyntaxException;
import javax.activation.DataHandler;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.apache.cxf.jaxrs.ext.multipart.Attachment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Praneeth
 */
@Service
public class uploadfileservicesimpl implements uploadfileservices {

    public static final String UPLOAD_FILE_SERVER = "C:/xampp/tomcat/webapps/ProjectStatusReportsSystem/imageuplode/";
    public static final String UPLOAD_FILE_SERVERtem = "../ProjectStatusReportsSystem/imageuplode/";

    @Autowired
    private logindao logindao;

    @Transactional
    @Override
    public Response uploadTextFile(String note, Attachment attachment, HttpServletRequest request) {
        String userName = note;
        String fileName = null;
        // for (Attachment attachment : attachments) {
        DataHandler dataHandler = attachment.getDataHandler();
        try {
            // get filename to be uploaded
            MultivaluedMap<String, String> multivaluedMap = attachment.getHeaders();
            fileName = getFileName(multivaluedMap);
            String imagenamefile = "servisespro_profile-" + userName + "." + getFormat(fileName);
            String imagename = UPLOAD_FILE_SERVERtem + imagenamefile;
            CreatUserAccount usersetImg = new CreatUserAccount();
            usersetImg.setUserName(userName);
            usersetImg.setImage(imagename);
            logindao.updateUserImage(usersetImg);
            HttpSession session = request.getSession();//true                                  
            session.setAttribute("image", imagename);
            // write & upload file to server
            InputStream inputStream = dataHandler.getInputStream();
            writeToFileServer(inputStream, imagenamefile);
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            // release resources, if any
        }
        //  }

        java.net.URI location = null;
        try {
            try {
                Thread.sleep(3000);
            } catch (InterruptedException ex) {
                //ToCatchOrNot
            }
            location = new java.net.URI("../../project_engineer.jsp?projectName=bnVsbA");
        } catch (URISyntaxException ex) {
        }
        // return Response.ok("upload success"+fileName).build();
        return Response.temporaryRedirect(location).build();
    }

    public String getFormat(String imageName) {
        try {
            String temp = imageName;
            String tempImageName = temp.toLowerCase();
            if (tempImageName.endsWith(".png")) {
                return "png";
            } else if (temp.endsWith(".jpg")) {
                return "jpg";
            } else if (temp.endsWith(".jpeg")) {
                return "jpeg";
            } else if (temp.endsWith(".gif")) {
                return "gif";
            } else if (temp.endsWith(".tiff")) {
                return "tiff";
            } else if (temp.endsWith(".pdf")) {
                return "pdf";
            }
        } catch (Exception e) {
        }
        return "png";
    }

    /**
     *
     * @param inputStream
     * @param fileName
     */
    private void writeToFileServer(InputStream inputStream, String fileName) {
        OutputStream outputStream = null;
        try {
            outputStream = new FileOutputStream(new File(UPLOAD_FILE_SERVER + fileName));
            int read = 0;
            byte[] bytes = new byte[1024];
            while ((read = inputStream.read(bytes)) != -1) {
                outputStream.write(bytes, 0, read);
            }
            outputStream.flush();
            outputStream.close();
        } catch (IOException ioe) {
        } finally {
            //release resource, if any
        }
    }

    /**
     *
     * @param multivaluedMap
     * @return
     */
    private String getFileName(MultivaluedMap<String, String> multivaluedMap) {
        try {
            String[] contentDisposition = multivaluedMap.getFirst("Content-Disposition").split(";");
            for (String filename : contentDisposition) {

                if ((filename.trim().startsWith("filename"))) {
                    String[] name = filename.split("=");
                    String exactFileName = name[1].trim().replaceAll("\"", "");
                    return exactFileName;
                }
            }
        } catch (Exception e) {
        }
        return "unknownFile";
    }

}
