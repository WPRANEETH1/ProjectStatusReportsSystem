/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services;

import com.ongoingsolution.model.MailObj;
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
@Path("/sendemailservices")
@WebService(name = "psrServices", targetNamespace = "")
public interface sendemailservices {

    @POST
    @Produces({MediaType.APPLICATION_JSON})
    @Path("defaultemailmessage/{message}")
    public Response defaultemailmessage(@PathParam("message") String message);

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/sendMail/{useraname}")
    public Response sendMailForCreateUser(@PathParam("useraname") String username);

    @POST
    @Produces({MediaType.APPLICATION_JSON})
    @Path("retrieveInformation/{email}")
    public Response RetrieveInformation(@PathParam("email") String email);

    @POST
    @Produces({MediaType.APPLICATION_JSON})
    @Path("getAllemailWithImage")
    public Response getAllemailWithImage();

    @POST
    @Produces({MediaType.APPLICATION_JSON})
    @Path("sendEmail")
    public Response sendEmail(MailObj mailobj);
}
