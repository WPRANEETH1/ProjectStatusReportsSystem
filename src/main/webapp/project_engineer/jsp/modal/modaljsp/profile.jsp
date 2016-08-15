<div id="profilepage" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="custom-width-modalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width:65%;">


        <div class="row" style="background-color: #656868">
            <div class="col-xs-12" style="background-color: #656868;margin-top: -20px">  
                <div class="panel panel-info"  style="background-color: #656868;padding-top: 5px">
                    <div class="panel-heading" style="border-radius: 4px;">
                        <h3 class="panel-title">User Information</h3>
                    </div>
                    <div class="panel-body" style="background-color: #656868">
                        <div class="row" >
                            <div class="col-xs-2 col-md-4 " align="center"> 
                                <script>
                                    $(document).ready(function () {
                                        $("#imageID").attr("src", "<%=session.getAttribute("image")%>");
                                    });
                                </script>
                                <img alt="User Pic" id="imageID" src="" style="width: 160px;height: 195px" class="img-thumbnail img-responsive" id="auth-profile-picture"> </div>
                            <div class="col-xs-3 col-md-1"></div>
                            <div class=" col-xs-9 col-md-7 "> 
                                <table class="table table-condensed">
                                    <tbody style="color: white">
                                    <p id="nifo" style="color: yellow;font-size: 15px;padding-left: 20%"></p>
                                    <tr>
                                        <td id="highlight-data">First Name :</td>
                                        <td id="view-name"><input type="text" id="firstName" disabled="disabled" style="background-color: #656868;border: 2px;width: 100%" value="xxxxxxxxxx"/></td>
                                    </tr>
                                    <tr>
                                        <td id="highlight-data">Last Name :</td>
                                        <td id="view-nic"><input type="text" id="lastName" disabled="disabled" style="background-color: #656868;border: 2px;width: 100%" value="xxxxxxxxxx"/></td>
                                    </tr>                               
                                    <tr>
                                        <td id="highlight-data">Birthday :</td>
                                        <td id="view-date"><input type="text" id="birthday" disabled="disabled" style="background-color: #656868;border: 2px;width: 100%" value="xxxxxxxxxx"/></td>
                                    </tr> 
                                    <tr>
                                        <td id="highlight-data">Department :</td>
                                        <td id="view-laddress"><input type="text" id="department" disabled="disabled" style="background-color: #656868;border: 2px;width: 100%" value="xxxxxxxxxx"/></td>
                                    </tr>
                                    <tr>
                                        <td id="highlight-data">Contact Number :</td>
                                        <td id="view-paddress"><input type="text" id="contactnumber" disabled="disabled" style="background-color: #656868;border: 2px;width: 100%" value="xxxxxxxxxx"/></td>
                                    </tr>
                                    <tr>
                                        <td id="highlight-data">Email :</td>
                                        <td id="view-email"><input type="text" id="email" disabled="disabled" style="background-color: #656868;border: 2px;width: 100%" value="xxxxxxxxxx"/></td>
                                    </tr>
                                    <tr>
                                        <td id="highlight-data"></td>
                                        <td id="view-contactno"></br>

                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="row"> 
                                <div class="col-xs-2 col-md-2" style="margin-left: 30px"> 

                                    <form method="POST" enctype="multipart/form-data"
                                          action="/ProjectStatusReportsSystem/rest/psrservices/uploadfileservices/uploadprofimg" class="pull-center">

                                        <div class="row" style="margin-left: 5px"> 
                                            <div class="col-xs-12 choose_file"> 

                                                <span id="span-image">Change Image <input type="file" name="upfile" class="btn btn-sm btn-default" style="width: 180%"/></span>

                                            </div> 
                                            <input type="hidden" name="note" id="userNameForUpload"/>
                                            <div class="col-xs-3"> 
                                                <input type="submit" onclick="sendAjaxFormData(this.form, this.form.upfile, this.form.note);" id="image-submit" value="Upload" class="btn btn-xs btn-default" style="margin-top: 5px"/> 
                                            </div>
                                        </div> 
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer" style="height: 45px;border-radius: 5px">

                        <!--<button  type="button" class="btn btn-sm btn-primary" onclick="addservicesofservicesprovider(serid);" ><a class="glyphicon glyphicon-car"></a>&nbsp;Add Services</button >-->
                        <span class="pull-right" style="border-radius: 5px">                            
                            <button id="saveid" type="button" class="btn btn-sm btn-info" onclick="profileSave();"><i class="glyphicon glyphicon-save"></i>&nbsp;Save</button>
                            <button id="editid" type="button" class="btn btn-sm btn-warning" onclick="profileEdit();"><i class="glyphicon glyphicon-edit"></i>&nbsp;Edit</button >&nbsp;&nbsp;
                            <button type="button" class="btn btn-default waves-effect" onclick="closeupdate();" data-dismiss="modal">Close</button>
                        </span>
                    </div>
                </div>

            </div>
        </div>


    </div>
</div><!-- /.modal -->