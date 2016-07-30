/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.dao;

import com.ongoingsolution.model.Risk;
import org.json.simple.JSONArray;

/**
 *
 * @author Praneeth
 */
public interface riskDao {

    JSONArray getAllRiskData(String ProjectName);

    public boolean deleteRisk(String riskId);

    public boolean createRisk(Risk risk);

    public boolean updateRisk(Risk risk);

    public boolean closedRisk(String riskId);

    public JSONArray getRiskById(String riskId);
}
