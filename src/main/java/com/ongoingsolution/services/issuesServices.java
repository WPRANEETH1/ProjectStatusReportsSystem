/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services;

import com.ongoingsolution.model.Issues;
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
@Path("/issuesServices")
@WebService(name = "psrServices", targetNamespace = "")
public interface issuesServices {

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/getAllissuesData/{projectName}")
    public Response getAllissuesData(@PathParam("projectName") String projectName);

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/deleteIssues/{issuesId}")
    public Response deleteIssues(@PathParam("issuesId") String issuesId);

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/createIssuec")
    public Response createIssuec(Issues issues);

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/updateIssues")
    public Response updateIssues(Issues issues);

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/closedIssues/{issuesId}")
    public Response closedIssues(@PathParam("issuesId") String issuesId);

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/getIssuesById/{issuesId}")
    public Response getIssuesById(@PathParam("issuesId") String issuesId);
}
