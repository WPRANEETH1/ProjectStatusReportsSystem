<div id="issuesEdit" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="custom-width-modalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog" style="width:45%;padding: 0px;">
        <input type="hidden" id="issuesId"/>
        <input type="hidden" id="issuesType"/>
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="font-size: xx-large;padding-right: 10px;">×</button>
                <h2 class="modal-title" id="custom-width-modalLabel" style="text-align: center;padding-top: 10px;"> Edit Key Issues</h2>
            </div>

            <div class="col-sm-12" align="center" style="padding-bottom: 2%;padding-top: 5%"> 
                <div class="col-sm-6">
                    <label for="totalscope" class="col-sm-12 control-label" style="color: white">Issue Description:</label> 
                    <textarea id="issuesDescriptionVal" class="form-control"></textarea>
                </div>                                    
                <div class="col-sm-6">
                    <label for="startdate" class="col-sm-12 control-label" style="color: white">Rank:</label>
                    <div class="col-sm-12">
                        <select class="form-control selectpicker" id="issuesrankValTwo">
                            <option value="1">Normal</option>
                            <option value="2">Advances</option>                                                                            
                        </select>
                    </div>
                </div>                
            </div>

            <div class="modal-footer" style="background-color:#435966; padding-bottom: 7px;padding-top: 7px;padding-right: 10px;">
                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary waves-effect waves-light" id="reloadbutton" onclick="editSaveIssues();">Save</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->