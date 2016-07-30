/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services;

import com.ongoingsolution.model.Createdproject;
import javax.jws.WebService;
import javax.ws.rs.Consumes;
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
@Path("/getexceldataservices")
@WebService(name = "psrServices", targetNamespace = "")
public interface getexceldataservices {
    
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @Path("getexceldata/{createdprojectName}")
    public Response getExcelDataByUser(@PathParam("createdprojectName") String createdprojectName);
    
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @Path("searchallprojectname/{userName}")
    public Response getExcelAllProjectNameByUser(@PathParam("userName") String userName);
    
    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/updateexcelprojectdata")
    public Response updateExcelProjectData(Createdproject createdproject);
}
