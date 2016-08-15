/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services.Impl;

import com.ongoingsolution.dao.loadprojectdetailsdao;
import com.ongoingsolution.services.loadprojectdetailsservices;
import javax.ws.rs.core.Response;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Praneeth
 */
@Service
public class loadprojectdetailsservicesimpl implements loadprojectdetailsservices {

    @Autowired
    private loadprojectdetailsdao loadprojectdetailsdao;

    @Override
    public Response getProjectNameWithCategoryBuUserName(String userName) {
        JSONObject obj = new JSONObject();
        JSONArray smcp = loadprojectdetailsdao.getProjectNameWithCategoryBuUserNameotherProject(userName, "Small Cell Implementation");
        JSONArray accn = loadprojectdetailsdao.getProjectNameWithCategoryBuUserNameotherProject(userName, "Access Network");

        JSONArray ibsdata = loadprojectdetailsdao.getProjectNameWithCategoryBuUserName(userName, "IBS");
        JSONArray wifidata = loadprojectdetailsdao.getProjectNameWithCategoryBuUserName(userName, "Wi-Fi");

        JSONArray Buffer_Stock_Huawei = loadprojectdetailsdao.getProjectNameWithCategoryBuUserName(userName, "Buffer Stock_Huawei");
        JSONArray Buffer_Stock_ZTE = loadprojectdetailsdao.getProjectNameWithCategoryBuUserName(userName, "Buffer Stock_ZTE");
        JSONArray Stage_VII = loadprojectdetailsdao.getProjectNameWithCategoryBuUserName(userName, "Stage VII Associated projects");
        JSONArray Ericsson_DBC = loadprojectdetailsdao.getProjectNameWithCategoryBuUserName(userName, "Ericsson DBC");
        JSONArray th_Sector_Installation = loadprojectdetailsdao.getProjectNameWithCategoryBuUserName(userName, "4th Sector Installation");
        JSONArray Small_Cell_Implementation = loadprojectdetailsdao.getProjectNameWithCategoryBuUserName(userName, "Small Cell Implementation");
        JSONArray Huawei_P1 = loadprojectdetailsdao.getProjectNameWithCategoryBuUserName(userName, "Immediate Expansion_Huawei P1");
        JSONArray Huawei_P2 = loadprojectdetailsdao.getProjectNameWithCategoryBuUserName(userName, "Immediate Expansion_Huawei P2");
        JSONArray ZTE_P1 = loadprojectdetailsdao.getProjectNameWithCategoryBuUserName(userName, "Immediate Expansion_ZTE P1");
        JSONArray ZTE_P2 = loadprojectdetailsdao.getProjectNameWithCategoryBuUserName(userName, "Immediate Expansion_ZTE P2");

        JSONArray Transmission_Implementation = loadprojectdetailsdao.getProjectNameWithCategoryBuUserName(userName, "Transmission_Implementation");

        obj.put("smcp", smcp);
        obj.put("accn", accn);

        obj.put("ibsdata", ibsdata);
        obj.put("wifidata", wifidata);

        obj.put("Buffer_Stock_Huawei", Buffer_Stock_Huawei);
        obj.put("Buffer_Stock_ZTE", Buffer_Stock_ZTE);
        obj.put("Stage_VII", Stage_VII);
        obj.put("Ericsson_DBC", Ericsson_DBC);
        obj.put("th_Sector_Installation", th_Sector_Installation);
        obj.put("Small_Cell_Implementation", Small_Cell_Implementation);
        obj.put("Huawei_P1", Huawei_P1);
        obj.put("Huawei_P2", Huawei_P2);
        obj.put("ZTE_P1", ZTE_P1);
        obj.put("ZTE_P2", ZTE_P2);

        obj.put("Transmission_Implementation", Transmission_Implementation);
        return Response.ok(obj).build();
    }

    @Override
    public Response getImplementationDateByProjectName(String projectName) {
        JSONArray implementationDate = loadprojectdetailsdao.getImplementationDateByProjectName(projectName);
        return Response.ok(implementationDate).build();
    }

//    ------------------------------------------------------------------
    @Override
    public Response getProjectNameWithCategoryByManager() {
        JSONObject obj = new JSONObject();

        JSONArray smcp = loadprojectdetailsdao.getProjectNameWithCategoryBuManagerotherProject("Small Cell Implementation");
        JSONArray accn = loadprojectdetailsdao.getProjectNameWithCategoryBuManagerotherProject("Access Network");

        JSONArray ibsdata = loadprojectdetailsdao.getProjectNameWithCategoryBuManager("IBS");
        JSONArray wifidata = loadprojectdetailsdao.getProjectNameWithCategoryBuManager("Wi-Fi");

        JSONArray Buffer_Stock_Huawei = loadprojectdetailsdao.getProjectNameWithCategoryBuManager("Buffer Stock_Huawei");
        JSONArray Buffer_Stock_ZTE = loadprojectdetailsdao.getProjectNameWithCategoryBuManager("Buffer Stock_ZTE");
        JSONArray Stage_VII = loadprojectdetailsdao.getProjectNameWithCategoryBuManager("Stage VII Associated projects");
        JSONArray Ericsson_DBC = loadprojectdetailsdao.getProjectNameWithCategoryBuManager("Ericsson DBC");
        JSONArray th_Sector_Installation = loadprojectdetailsdao.getProjectNameWithCategoryBuManager("4th Sector Installation");
        JSONArray Small_Cell_Implementation = loadprojectdetailsdao.getProjectNameWithCategoryBuManager("Small Cell Implementation");
        JSONArray Huawei_P1 = loadprojectdetailsdao.getProjectNameWithCategoryBuManager("Immediate Expansion_Huawei P1");
        JSONArray Huawei_P2 = loadprojectdetailsdao.getProjectNameWithCategoryBuManager("Immediate Expansion_Huawei P2");
        JSONArray ZTE_P1 = loadprojectdetailsdao.getProjectNameWithCategoryBuManager("Immediate Expansion_ZTE P1");
        JSONArray ZTE_P2 = loadprojectdetailsdao.getProjectNameWithCategoryBuManager("Immediate Expansion_ZTE P2");

        JSONArray Transmission_Implementation = loadprojectdetailsdao.getProjectNameWithCategoryBuManager("Transmission_Implementation");

        obj.put("smcp", smcp);
        obj.put("accn", accn);

        obj.put("ibsdata", ibsdata);
        obj.put("wifidata", wifidata);

        obj.put("Buffer_Stock_Huawei", Buffer_Stock_Huawei);
        obj.put("Buffer_Stock_ZTE", Buffer_Stock_ZTE);
        obj.put("Stage_VII", Stage_VII);
        obj.put("Ericsson_DBC", Ericsson_DBC);
        obj.put("th_Sector_Installation", th_Sector_Installation);
        obj.put("Small_Cell_Implementation", Small_Cell_Implementation);
        obj.put("Huawei_P1", Huawei_P1);
        obj.put("Huawei_P2", Huawei_P2);
        obj.put("ZTE_P1", ZTE_P1);
        obj.put("ZTE_P2", ZTE_P2);

        obj.put("Transmission_Implementation", Transmission_Implementation);

        return Response.ok(obj).build();
    }

    @Override
    public Response getImplementationDateByProjectNameForManager(String projectName) {
        JSONArray implementationDate = loadprojectdetailsdao.getImplementationDateByProjectNameManager(projectName);
        return Response.ok(implementationDate).build();
    }

}
