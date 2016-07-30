/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services.Impl;

import com.ongoingsolution.dao.issuesDao;
import com.ongoingsolution.model.Issues;
import com.ongoingsolution.services.issuesServices;
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
public class issuesServicesimpl implements issuesServices {

    @Autowired
    private issuesDao issuesDao;

    @Transactional
    @Override
    public Response getAllissuesData(String projectName) {
        JSONArray issusAll = issuesDao.getAllissuesData(projectName);
        return Response.ok(issusAll).build();
    }

    @Transactional
    @Override
    public Response deleteIssues(String issuesId) {
        try {
            Boolean val = issuesDao.deleteIssues(issuesId);
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
    public Response createIssuec(Issues issues) {
        try {
            Boolean val = issuesDao.createIssues(issues);
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
    public Response updateIssues(Issues issues) {
        try {
            Boolean val = issuesDao.updateIssues(issues);
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
    public Response closedIssues(String issuesId) {
        try {
            Boolean val = issuesDao.closedIssues(issuesId);
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
    public Response getIssuesById(String issuesId) {
        JSONArray issusAll = issuesDao.getIssuesById(issuesId);
        return Response.ok(issusAll).build();
    }

}
