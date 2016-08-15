/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services;

import com.ongoingsolution.model.CreatUserAccount;
import com.ongoingsolution.model.UserLogin;
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
@Path("/loginservices")
@WebService(name = "psrServices", targetNamespace = "")
public interface loginservices {

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/loginuser")
    public Response getValidLoginUserdata(UserLogin userLogin);

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/createUserEngineer")
    public Response createUser(CreatUserAccount creatUserAccount);

    @POST
    @Produces({MediaType.APPLICATION_JSON})
    @Path("getUserData/{userName}")
    public Response getUserData(@PathParam("userName") String userName);

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/updateUserData")
    public Response updateUserData(CreatUserAccount creatUserAccount);
}
