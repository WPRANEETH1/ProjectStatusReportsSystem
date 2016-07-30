<div id="selectprojectname" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="custom-width-modalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog" style="width:35%;padding: 0px;">
        <div class="modal-content" style="padding: 16px;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="font-size: xx-large;padding-right: 10px;">×</button>
                <h2 class="modal-title" id="custom-width-modalLabel" style="text-align: center;padding-top: 10px;"> Open Project</h2>
            </div>
            
            
            
            
            
            <div class="modal-body" style="padding-top: 5px;">
                <!--<div class="col-md-10" style="height: 10px">-->
                <div>
                    <div class="col-md-3">
                        <label class="control-label margin-top-12" style="float: right;padding-top: 10px;color: white;font-size: 15px;">File Name:</label>    
                    </div>
                    <div class="col-md-3" style="width: 60%;">
                        <select class="form-control" id="allprojectname"></select>
                    </div>
                    <br>
                </div>
            </div>
            
            
             
            
            
            
            
            <div class="modal-footer" style="background-color:#435966; padding-bottom: 7px;padding-top: 7px;padding-right: 10px;">
                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary waves-effect waves-light" id="reloadbutton" onclick="reloadpageToloadexcelsheet();">Open file</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->