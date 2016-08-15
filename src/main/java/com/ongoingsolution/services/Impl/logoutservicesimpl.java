/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services.Impl;

import com.ongoingsolution.services.logoutservices;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.core.Response;
import org.apache.cxf.message.Message;
import org.apache.cxf.phase.PhaseInterceptorChain;
import org.apache.cxf.transport.http.AbstractHTTPDestination;
import org.springframework.stereotype.Service;

/**
 *
 * @author Praneeth
 */
@Service
public class logoutservicesimpl implements logoutservices {

    @Override
    public Response logout() {
        java.net.URI location = null;
        Message message = PhaseInterceptorChain.getCurrentMessage();
        HttpServletRequest request = (HttpServletRequest) message.get(AbstractHTTPDestination.HTTP_REQUEST);
        HttpSession session = request.getSession(true);
        session.setAttribute("userName", null);
        session.setAttribute("image", null);
        session.setAttribute("Name", null);
        session.setAttribute("userRole", null);
        session.invalidate();
        String returnval = "session_destroyed";
        return Response.ok(returnval).build();
    }

}
