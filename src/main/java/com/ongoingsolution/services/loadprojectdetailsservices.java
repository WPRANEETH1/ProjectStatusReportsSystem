/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services;

import javax.jws.WebService;
import javax.ws.rs.GET;
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
@Path("/loadprojectdetailsservices")
@WebService(name = "psrServices", targetNamespace = "")
public interface loadprojectdetailsservices {

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @Path("getProjectNameWithCategoryBuUserName/{userName}")
    public Response getProjectNameWithCategoryBuUserName(@PathParam("userName") String userName);

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @Path("getImplementationDateByProjectName/{projectName}")
    public Response getImplementationDateByProjectName(@PathParam("projectName") String projectName);

//    -----------------------------------------------------------
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @Path("getProjectNameWithCategoryByManager")
    public Response getProjectNameWithCategoryByManager();

    @POST
    @Produces({MediaType.APPLICATION_JSON})
    @Path("managerDashboardviewAllProject")
    public Response managerDashboardviewAllProject();

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @Path("getImplementationDateByProjectNameForManager/{projectName}")
    public Response getImplementationDateByProjectNameForManager(@PathParam("projectName") String projectName);
}
