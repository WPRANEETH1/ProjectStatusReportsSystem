/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ongoingsolution.services;

import javax.servlet.http.HttpServletRequest;
import javax.jws.WebService;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.apache.cxf.jaxrs.ext.multipart.Multipart;
import org.apache.cxf.jaxrs.ext.multipart.Attachment;

/**
 *
 * @author Praneeth
 */
@Path("/uploadfileservices")
@WebService(name = "psrServices", targetNamespace = "")
public interface uploadfileservices {

    @POST
    @Consumes({MediaType.MULTIPART_FORM_DATA})
    @Produces({MediaType.TEXT_HTML})
    @Path("/uploadprofimg")
    public Response uploadTextFile(@Multipart("note") String note,
            @Multipart("upfile") Attachment attachment, @Context HttpServletRequest request);
}
