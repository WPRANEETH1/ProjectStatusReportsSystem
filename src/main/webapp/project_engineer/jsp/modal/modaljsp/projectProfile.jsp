<div id="projectProfile" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="custom-width-modalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog" style="width:60%;padding: 0px;;background-color: lightsteelblue">
        <div class="modal-content" style="padding: 16px;">
            <div class="modal-header" style="background-color: mediumblue">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="font-size: xx-large;padding-right: 10px;">×</button>
                <h2 class="modal-title" id="custom-width-modalLabel" style="text-align: center;padding-top: 10px;"> Project Profile</h2>
            </div>


            <div class="modal-footer" style="background-color: indigo; padding-bottom: 7px;padding-top: 7px;padding-right: 10px;">
                
                <div class="col-sm-12" align="center" style="padding: 5%">

                    <div class="form-group" align="center">
                        <div class="col-sm-4">
                            <label for="totalscope" class="col-sm-12 control-label" style="color: white">Total Scope:</label> 
                            <input type="text" class="form-control" id="TTscope"/>
                        </div>                                    
                        <div class="col-sm-4">
                            <label for="startdate" class="col-sm-12 control-label" style="color: white">Start Date:</label>
                            <input class="form-control" id="TTstartdate" type="date" />
                        </div>                                    
                        <div class="col-sm-4">
                            <label for="enddate" class="col-sm-12 control-label" style="color: white">End Date:</label>
                            <input class="form-control" id="TTenddate" type="date" />
                        </div>
                    </div>  

                </div>

                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary waves-effect waves-light" id="reloadbutton" onclick="saveabdEditProjectProf();">Edit & Save</button>
                
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->