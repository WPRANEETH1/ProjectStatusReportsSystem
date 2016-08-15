/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services.Impl;

import com.ongoingsolution.dao.createProjectdao;
import com.ongoingsolution.model.Createdproject;
import com.ongoingsolution.services.createProjectservices;
import javax.ws.rs.core.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Praneeth
 */
@Service
public class createProjectservicesimpl implements createProjectservices {

    @Autowired
    private createProjectdao createProjectdao;

    @Transactional
    @Override
    public Response createProect(Createdproject createdproject) {
        try {
            Boolean val = createProjectdao.createProect(createdproject);
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
    public Response deleteProect(Createdproject createdproject) {
        try {
            Boolean val = createProjectdao.deleteProect(createdproject);
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
    public Response updateProect(Createdproject createdproject) {
        try {
            Boolean val = createProjectdao.updateProect(createdproject);
            if (val == true) {
                return Response.ok(Response.Status.CREATED).build();
            } else {
                return Response.ok(Response.Status.NOT_ACCEPTABLE).build();
            }
        } catch (Exception e) {
            return Response.ok(Response.Status.NOT_ACCEPTABLE).build();
        }
    }

}
