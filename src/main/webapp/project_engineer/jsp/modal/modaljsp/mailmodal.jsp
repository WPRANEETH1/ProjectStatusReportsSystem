<div id="emailmodal" class="modal fade" role="dialog" aria-labelledby="custom-width-modalLabel" aria-hidden="true" style="display: none;background-color: transparent">
    <div class="modal-dialog" style="width: 40%;padding: 0px;">
        <div class="col-sm-12">
            <section class="panel">               
                <div class="panel-body">                    
                    <div class="compose-mail">
                        <form role="form-horizontal">
                            <div class="form-group">
                                <label for="to" class="">To:</label>
                                <select type="text" tabindex="1" id="to" class="form-control"></select>
                                <div class="compose-options">
                                    <a onclick="$(this).hide();
                                            $('#cc').parent().removeClass('hidden');
                                            $('#cc').focus();" href="javascript:;">Cc</a>
                                    <a onclick="$(this).hide();
                                            $('#bcc').parent().removeClass('hidden');
                                            $('#bcc').focus();" href="javascript:;">Bcc</a>
                                </div>
                            </div>

                            <div class="form-group hidden">
                                <label for="cc" class="">Cc:</label>
                                <select type="text" tabindex="2" id="cc" class="form-control"></select>
                            </div>

                            <div class="form-group hidden">
                                <label for="bcc" class="">Bcc:</label>
                                <select type="text" tabindex="2" id="bcc" class="form-control"></select>
                            </div>

                            <div class="form-group">
                                <label for="subject" class="">Subject:</label>
                                <input type="text" tabindex="1" id="subject" class="form-control">
                            </div>

                            <div class="compose-editor">
                                <textarea class="wysihtml5 form-control" id="body" rows="7"></textarea>                                
                            </div>
                            <div class="compose-btn">
                                <button type="button" onclick="sendmaildata();" class="btn btn-success waves-effect waves-light" ><i class="fa fa-check"></i> Send</button>                                                              
                                <button type="button" class="btn btn-default waves-effect" onclick="resetMail();" data-dismiss="modal">Close</button>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>
