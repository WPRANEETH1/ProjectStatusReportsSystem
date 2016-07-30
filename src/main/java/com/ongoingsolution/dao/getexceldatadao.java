/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.dao;

import com.ongoingsolution.model.Createdproject;
import org.json.simple.JSONArray;

/**
 *
 * @author Praneeth
 */
public interface getexceldatadao {

    JSONArray getExcelDataByUser(String createdprojectName);
    
    JSONArray getExcelAllProjectNameByUser(String userName);
    
    public boolean updateExcelProjectData(Createdproject createdproject);
    
}
