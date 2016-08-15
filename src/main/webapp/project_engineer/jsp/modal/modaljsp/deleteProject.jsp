<div id="deleteproject" class="modal fade" role="dialog" aria-labelledby="custom-width-modalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog" style="width:40%;padding: 0px;">
        <div class="modal-content" style="padding: 16px;background-color: ">
            <div class="modal-header" style="background-color: 	mediumblue">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="font-size: xx-large;padding-right: 10px;">×</button>
                <h2 class="modal-title" style="text-align: center;padding-top: 10px;"> Delete Project</h2>
            </div>
            <style>
                .trash {
                    background:#ff6873;
                    width: 66px;
                    height: 80px;
                    display: inline-block;
                    margin:0 auto;

                    position: relative;
                    -webkit-border-bottom-right-radius: 6px;
                    -webkit-border-bottom-left-radius: 6px;
                    -moz-border-radius-bottomright: 6px;
                    -moz-border-radius-bottomleft: 6px;
                    border-bottom-right-radius: 6px;
                    border-bottom-left-radius: 6px;
                }
                .trash:after {
                    content: '';
                    position: absolute;
                    left: -99px;
                    right: 0;
                    bottom: -50px;
                    width: 300px;
                }
                .trash span {
                    position: absolute;
                    height: 12px;
                    background: #ff6873;
                    top: -19px;
                    left: -10px;
                    right: -10px;

                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    transform: rotate(0deg);
                    transition: transform 250ms;
                    transform-origin: 19% 100%;
                }
                .trash span:after {
                    content: '';
                    position: absolute;
                    width: 27px;
                    height: 7px;
                    background: #ff6873;
                    top: -10px;

                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    transform: rotate(0deg);
                    transition: transform 250ms;
                    transform-origin: 19% 100%;
                    left: 27px;
                }


                .trash i {
                    position:relative;
                    width: 5px;
                    height:50px;
                    background:#fff;
                    display:block;
                    margin:14px auto;
                    border-radius: 5px;
                }
                .trash i:after {
                    content: '';
                    width: 5px;
                    height: 50px;
                    background: #fff;
                    position: absolute;
                    left: -18px;
                    border-radius: 5px;
                }
                .trash i:before {
                    content: '';
                    width: 5px;
                    height: 50px;
                    background: #fff;
                    position: absolute;
                    right: -18px;
                    border-radius: 5px;
                }

                .trash:hover span {
                    transform: rotate(-45deg);
                    transition: transform 250ms;
                }
            </style>
            <div class="col-sm-12 modal-header center" style="background-color:indigo;padding: 4%;border: 0px" align="center">                
                <div class="col-sm-4" style="padding-top: 5%">
                    <section> <span class="trash"> <span></span> <i></i> </span> </section>
                </div>
                <div class="col-sm-8" align="center">
                    <div class="col-sm-12" id="infodetailsforDeleteproject">

                    </div>
                    <div class="col-sm-12">
                        <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                        <button onclick="conformdeleteprojectsheet();" type="button" class="btn btn-primary waves-effect waves-light" >Conform</button>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="background-color:#808000; padding-bottom: 7px;padding-top: 7px;padding-right: 10px;border: 0px;border-radius: 0px;">
                <!--                <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                                <button onclick="conformdeleteprojectsheet();" type="button" class="btn btn-primary waves-effect waves-light" >Conform</button>-->
            </div>
        </div>
    </div>
</div>
    
    

   