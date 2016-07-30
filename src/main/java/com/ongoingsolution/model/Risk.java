/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.model;

/**
 *
 * @author Praneeth
 */
public class Risk {

    private String riskId;
    private String riskProjectName;
    private String riskDescription;
    private String riskMitigration;
    private String riskRank;
    private String riskType;

    /**
     * @return the riskId
     */
    public String getRiskId() {
        return riskId;
    }

    /**
     * @param riskId the riskId to set
     */
    public void setRiskId(String riskId) {
        this.riskId = riskId;
    }

    /**
     * @return the riskProjectName
     */
    public String getRiskProjectName() {
        return riskProjectName;
    }

    /**
     * @param riskProjectName the riskProjectName to set
     */
    public void setRiskProjectName(String riskProjectName) {
        this.riskProjectName = riskProjectName;
    }

    /**
     * @return the riskDescription
     */
    public String getRiskDescription() {
        return riskDescription;
    }

    /**
     * @param riskDescription the riskDescription to set
     */
    public void setRiskDescription(String riskDescription) {
        this.riskDescription = riskDescription;
    }

    /**
     * @return the riskMitigration
     */
    public String getRiskMitigration() {
        return riskMitigration;
    }

    /**
     * @param riskMitigration the riskMitigration to set
     */
    public void setRiskMitigration(String riskMitigration) {
        this.riskMitigration = riskMitigration;
    }

    /**
     * @return the riskRank
     */
    public String getRiskRank() {
        return riskRank;
    }

    /**
     * @param riskRank the riskRank to set
     */
    public void setRiskRank(String riskRank) {
        this.riskRank = riskRank;
    }

    /**
     * @return the riskType
     */
    public String getRiskType() {
        return riskType;
    }

    /**
     * @param riskType the riskType to set
     */
    public void setRiskType(String riskType) {
        this.riskType = riskType;
    }

}
