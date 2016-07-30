/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.dao;

import com.ongoingsolution.model.Issues;
import org.json.simple.JSONArray;

/**
 *
 * @author Praneeth
 */
public interface issuesDao {
    
    JSONArray getAllissuesData(String ProjectName);
    
    public boolean deleteIssues(String issuesId);
    
    public boolean createIssues(Issues issues);
    
    public boolean updateIssues(Issues issues);
    
    public boolean closedIssues(String issuesId);
    
    public JSONArray getIssuesById(String issuesId);

}
