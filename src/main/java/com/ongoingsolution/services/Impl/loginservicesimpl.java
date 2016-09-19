/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services.Impl;

import com.ongoingsolution.dao.logindao;
import com.ongoingsolution.model.CreatUserAccount;
import com.ongoingsolution.model.UserLogin;
import com.ongoingsolution.services.loginservices;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.core.Response;
import org.apache.cxf.message.Message;
import org.apache.cxf.phase.PhaseInterceptorChain;
import org.apache.cxf.transport.http.AbstractHTTPDestination;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Praneeth
 */
@Service
public class loginservicesimpl implements loginservices {

    @Autowired
    private logindao logindao;

    @Transactional
    @Override
    public Response getValidLoginUserdata(UserLogin userLogin) {
        JSONObject obj;
        JSONObject jsonvalidlogindata;
        try {
            JSONArray validlogindata = logindao.getValidLoginUserdata(userLogin);
            if (validlogindata.isEmpty() == false) {
                jsonvalidlogindata = (JSONObject) new JSONParser().parse(validlogindata.get(0).toString());
                if (jsonvalidlogindata != null) {
                    obj = new JSONObject();
                    obj.put("userName", jsonvalidlogindata.get("userName"));
                    obj.put("userRole", jsonvalidlogindata.get("userRole"));
                    Message message = PhaseInterceptorChain.getCurrentMessage();
                    HttpServletRequest request = (HttpServletRequest) message.get(AbstractHTTPDestination.HTTP_REQUEST);
                    HttpSession session = request.getSession();//true              
                    session.setAttribute("userName", jsonvalidlogindata.get("userName"));
                    session.setAttribute("image", jsonvalidlogindata.get("image"));
                    session.setAttribute("Name", jsonvalidlogindata.get("firstName") + " " + jsonvalidlogindata.get("lastName"));
                    session.setAttribute("userRole", jsonvalidlogindata.get("userRole"));
                } else {
                    obj = new JSONObject();
                    obj.put("userRole", null);
                    obj.put("userName", null);
                    Message message = PhaseInterceptorChain.getCurrentMessage();
                    HttpServletRequest request = (HttpServletRequest) message.get(AbstractHTTPDestination.HTTP_REQUEST);
                    HttpSession session = request.getSession(true);
                    session.setAttribute("userName", null);
                    session.setAttribute("image", null);
                    session.setAttribute("Name", null);
                    session.setAttribute("userRole", null);
                }

                return Response.ok(obj).build();
            } else {
                return Response.ok(Response.Status.NOT_FOUND).build();
            }

        } catch (Exception e) {
            return Response.ok(Response.Status.EXPECTATION_FAILED).build();
        }
    }

    @Transactional
    @Override
    public Response createUser(CreatUserAccount creatUserAccount) {
        try {
            String password = passwordgenarter.getSaltString();
            creatUserAccount.setPassWord(password);
            Boolean val = logindao.createUser(creatUserAccount);
            if (val == true) {
                return Response.ok(Response.Status.CREATED).build();
            } else {
                return Response.ok(Response.Status.NOT_ACCEPTABLE).build();
            }
        } catch (Exception e) {
            return Response.ok(Response.Status.NOT_ACCEPTABLE).build();
        }
    }

    @Transactional
    @Override
    public Response getUserData(String userName) {
        try {
            JSONArray getuserdata = logindao.getUserData(userName);
            return Response.ok(getuserdata).build();
        } catch (Exception e) {
        }
        return Response.ok(Response.Status.NOT_FOUND).build();
    }

    @Transactional
    @Override
    public Response updateUserData(CreatUserAccount creatUserAccount) {
        try {
            Boolean val = logindao.updateUserData(creatUserAccount);
            if (val == true) {
                Message message = PhaseInterceptorChain.getCurrentMessage();
                HttpServletRequest request = (HttpServletRequest) message.get(AbstractHTTPDestination.HTTP_REQUEST);
                HttpSession session = request.getSession();//true 
                session.setAttribute("Name", creatUserAccount.getFirstName() + " " + creatUserAccount.getLastName());
                return Response.ok(Response.Status.CREATED).build();
            } else {
                return Response.ok(Response.Status.NOT_ACCEPTABLE).build();
            }
        } catch (Exception e) {
            return Response.ok(Response.Status.NOT_ACCEPTABLE).build();
        }
    }
}
