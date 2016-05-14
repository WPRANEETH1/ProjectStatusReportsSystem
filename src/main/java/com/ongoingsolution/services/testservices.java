/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services;

import javax.jws.WebService;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/")
@WebService(name = "employeeService", targetNamespace = "http://www.lessonslab.com/cxf-rest/example")
public interface testservices {

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/test")
    public Response getTestDetail(@QueryParam("employeeId") String employeeId);

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/test2")
    public Response rederetuser();
}
