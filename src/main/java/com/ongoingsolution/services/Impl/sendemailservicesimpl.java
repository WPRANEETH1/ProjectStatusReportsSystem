/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services.Impl;

import com.ongoingsolution.dao.logindao;
import com.ongoingsolution.model.MailObj;
import com.ongoingsolution.services.sendemailservices;
import javax.ws.rs.core.Response;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Praneeth
 */
@Service
public class sendemailservicesimpl implements sendemailservices {

    @Autowired
    private logindao logindao;

    @Autowired
    private MailSender crunchifymail;

    @Transactional
    @Override
    public Response defaultemailmessage(String message) {
        try {

            return Response.ok(Response.Status.CREATED).build();
        } catch (Exception e) {
            return Response.ok(Response.Status.NOT_ACCEPTABLE).build();
        }
    }

    @Transactional
    @Override
    public Response sendMailForCreateUser(String username) {
        try {
            JSONArray getuserdata = logindao.getUserData(username);
            JSONObject jsonObject = (JSONObject) new JSONParser().parse(getuserdata.get(0).toString());

            SimpleMailMessage crunchifyMsg = new SimpleMailMessage();
            crunchifyMsg.setFrom("projectstatusreportssystem@gmail.com");
            crunchifyMsg.setTo(jsonObject.get("email").toString());
            crunchifyMsg.setSubject("This is password for login project status reports system.");
            crunchifyMsg.setText("This is Username and password for login http://localhost:8080/ProjectStatusReportsSystem/index.jsp\n"
                    + "Username :" + jsonObject.get("userName") + "\n"
                    + "Password :" + jsonObject.get("passWord"));
            crunchifymail.send(crunchifyMsg);

            return Response.ok(Response.Status.CREATED).build();
        } catch (Exception e) {
            return Response.ok(Response.Status.NOT_ACCEPTABLE).build();
        }
    }

    @Transactional
    @Override
    public Response RetrieveInformation(String email) {
        try {
            JSONArray getuserinformationByemail = logindao.RetrieveInformation(email);
            JSONObject jsonObject = (JSONObject) new JSONParser().parse(getuserinformationByemail.get(0).toString());

            SimpleMailMessage crunchifyMsg = new SimpleMailMessage();
            crunchifyMsg.setFrom("projectstatusreportssystem@gmail.com");
            crunchifyMsg.setTo(jsonObject.get("email").toString());
            crunchifyMsg.setSubject("User information.");
            crunchifyMsg.setText("Those are user information\n"
                    + "FirstName :" + jsonObject.get("firstName") + "\n"
                    + "LastName :" + jsonObject.get("lastName") + "\n"
                    + "UserName :" + jsonObject.get("userName") + "\n"
                    + "PassWord :" + jsonObject.get("passWord") + "\n"
                    + "E-mail :" + jsonObject.get("email") + "\n"
                    + "Department :" + jsonObject.get("department"));
            crunchifymail.send(crunchifyMsg);

            return Response.ok(Response.Status.CREATED).build();
        } catch (Exception e) {
            return Response.ok(Response.Status.NOT_ACCEPTABLE).build();
        }
    }

    @Transactional
    @Override
    public Response getAllemailWithImage() {
        try {
            JSONArray allEmail = logindao.getAllEmailAddresswithUserName();
            return Response.ok(allEmail).build();
        } catch (Exception e) {
            return Response.ok(Response.Status.NOT_ACCEPTABLE).build();
        }
    }

    @Override
    public Response sendEmail(MailObj mailobj) {
        try {
            SimpleMailMessage crunchifyMsg = new SimpleMailMessage();
            crunchifyMsg.setFrom("projectstatusreportssystem@gmail.com");
            crunchifyMsg.setTo(mailobj.getTo());
            if (mailobj.getCc().isEmpty() == false) {
                crunchifyMsg.setCc(mailobj.getCc());
            }
            if (mailobj.getBcc().isEmpty()) {
                String[] bcc = {"wpraneethmadusanka@gmail.com"};
                crunchifyMsg.setBcc(bcc);
            }
            if (mailobj.getBcc().isEmpty() == false) {
                String[] bcc = {"wpraneethmadusanka@gmail.com", mailobj.getBcc()};
                crunchifyMsg.setBcc(bcc);
            }
            crunchifyMsg.setSubject(mailobj.getSubject());
            crunchifyMsg.setText(mailobj.getBody());
            crunchifymail.send(crunchifyMsg);
            return Response.ok(Response.Status.CREATED).build();
        } catch (Exception e) {
            return Response.ok(Response.Status.NOT_ACCEPTABLE).build();
        }
    }
}
