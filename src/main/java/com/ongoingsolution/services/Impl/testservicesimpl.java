/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services.Impl;

import com.ongoingsolution.dao.tesdao;
import com.ongoingsolution.services.testservices;


import javax.ws.rs.core.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author malitha
 */
@Service

public class testservicesimpl implements testservices {

    @Autowired
    private tesdao employeeDao;

    @Transactional
    @Override
    public Response getTestDetail(String employeeId) {
        int employeeId1 = Integer.parseInt(employeeId);

        if (employeeId == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        return Response.ok(employeeDao.view(employeeId1)).build();

    }

//    @Transactional
//    @Override
//    public Response rederetuser() {
//         URI uri = null;
//        try {
//          uri = new URI("/AutosupportServices/resources/newjsp.jsp");
//        } catch (URISyntaxException ex) {
//            Logger.getLogger(testservicesimpl.class.getName()).log(Level.SEVERE, null, ex);
//        }
//
//     return Response.temporaryRedirect(uri).build();
//
//    }
    @Transactional
    @Override
    public Response rederetuser() {

        return Response.ok(employeeDao.view2()).build();

    }

}
