/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services.Impl;

import com.ongoingsolution.dao.getexceldatadao;
import com.ongoingsolution.model.Createdproject;
import com.ongoingsolution.services.getexceldataservices;
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
public class getexceldataservicesimpl implements getexceldataservices {

    @Autowired
    private getexceldatadao getexceldatadao;

    @Transactional
    @Override
    public Response getExcelDataByUser(String createdprojectName) {
        try {
            JSONArray exceldata = getexceldatadao.getExcelDataByUser(createdprojectName);
            return Response.ok(exceldata).build();
        } catch (Exception e) {
        }
        return Response.ok(Response.Status.NOT_FOUND).build();
    }

    @Transactional
    @Override
    public Response getExcelAllProjectNameByUser(String userName) {
        try {
            JSONArray allprojectName = getexceldatadao.getExcelAllProjectNameByUser(userName);
            return Response.ok(allprojectName).build();
        } catch (Exception e) {
        }
        return Response.ok(Response.Status.NOT_FOUND).build();
    }

    @Transactional
    @Override
    public Response updateExcelProjectData(Createdproject createdproject) {
        try {
            Boolean val = getexceldatadao.updateExcelProjectData(createdproject);
            if (val) {
                return Response.ok(Response.Status.ACCEPTED).build();
            }
            return Response.ok(Response.Status.NOT_ACCEPTABLE).build();
        } catch (Exception e) {
        }
        return Response.ok(Response.Status.NOT_ACCEPTABLE).build();
    }

    //manager 
    @Transactional
    @Override
    public Response getExcelAllProjectNameManager() {
        try {
            JSONArray allprojectName = getexceldatadao.getExcelAllProjectNameManager();
            return Response.ok(allprojectName).build();
        } catch (Exception e) {
        }
        return Response.ok(Response.Status.NOT_FOUND).build();
    }

    @Transactional
    @Override
    public Response mainManagerLoadDashboard() {
        try {
            JSONArray dashboardprojectname = getexceldatadao.mainManagerLoadDashboard();
            return Response.ok(dashboardprojectname).build();
        } catch (Exception e) {
        }
        return Response.ok(Response.Status.NOT_FOUND).build();
    }

    //Engineer
    @Transactional
    @Override
    public Response mainEngineerLoadDashboard(String userName) {
        try {
            JSONArray dashboardprojectname = getexceldatadao.mainEngineerLoadDashboard(userName);
            return Response.ok(dashboardprojectname).build();
        } catch (Exception e) {
        }
        return Response.ok(Response.Status.NOT_FOUND).build();
    }

}
