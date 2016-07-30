/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services.Impl;

import com.ongoingsolution.dao.riskDao;
import com.ongoingsolution.model.Risk;
import com.ongoingsolution.services.riskServices;
import javax.ws.rs.core.Response;
import org.json.simple.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Praneeth
 */
@Service
public class riskServicesimpl implements riskServices {

    @Autowired
    private riskDao riskDao;

    @Transactional
    @Override
    public Response getAllRiskData(String projectName) {
        JSONArray riskAll = riskDao.getAllRiskData(projectName);
        return Response.ok(riskAll).build();
    }

    @Transactional
    @Override
    public Response deleteRisk(String riskId) {
        try {
            Boolean val = riskDao.deleteRisk(riskId);
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
    public Response createRisk(Risk risk) {
        try {
            Boolean val = riskDao.createRisk(risk);
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
    public Response updateRisk(Risk risk) {
        try {
            Boolean val = riskDao.updateRisk(risk);
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
    public Response closedRisk(String riskId) {
        try {
            Boolean val = riskDao.closedRisk(riskId);
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
    public Response getRiskById(String riskId) {
        JSONArray riskAll = riskDao.getRiskById(riskId);
        return Response.ok(riskAll).build();
    }

}
