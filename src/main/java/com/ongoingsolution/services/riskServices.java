/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services;

import com.ongoingsolution.model.Risk;
import javax.jws.WebService;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 *
 * @author Praneeth
 */
@Path("/riskServices")
@WebService(name = "psrServices", targetNamespace = "")
public interface riskServices {

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/getAllRiskData/{projectName}")
    public Response getAllRiskData(@PathParam("projectName") String projectName);

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/deleteRisk/{riskId}")
    public Response deleteRisk(@PathParam("riskId") String riskId);

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/createRisk")
    public Response createRisk(Risk risk);

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/updateRisk")
    public Response updateRisk(Risk risk);

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/closedRisk/{riskId}")
    public Response closedRisk(@PathParam("riskId") String riskId);

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/getRiskById/{riskId}")
    public Response getRiskById(@PathParam("riskId") String riskId);
}
