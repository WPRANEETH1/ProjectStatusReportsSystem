/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.dao;

import org.json.simple.JSONArray;

/**
 *
 * @author Praneeth
 */
public interface loadprojectdetailsdao {

    JSONArray getProjectNameWithCategoryBuUserName(String userName, String projectSubCategory);

    JSONArray getProjectNameWithCategoryBuUserNameotherProject(String userName, String projectCategory);

    JSONArray getImplementationDateByProjectName(String projectName);

//-----------------------------------------------------------
    JSONArray getProjectNameWithCategoryBuManager(String projectSubCategory);

    JSONArray getProjectNameWithCategoryBuManagerotherProject(String projectCategory);

    JSONArray getImplementationDateByProjectNameManager(String projectName);

    JSONArray managerDashboardviewAllProject();
}
