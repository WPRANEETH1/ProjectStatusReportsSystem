<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">

    <input type="hidden" id="sessionusername" value="<%=session.getAttribute("userName")%>"/>
    <input type="hidden" id="userRole" value="<%=session.getAttribute("userRole")%>"/>
    <!--    <input type="hidden" id="projectname"/>-->
    <input type="hidden" id="projectnameDelete"/>
    <input type="hidden" id="pagenumber"/>      

    <div class="container-fluid">


        <ul class="nav navbar-nav navbar-left collapse" id="navbar-left" style="margin-top: 1%">                       
            <li class="active">
                <a href="javascript:void(0);" onclick="return loadhomepage();" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs"><i class="fa fa-home"></i></span>
                    <span class="hidden-xs" style="color: palegreen"><i class="fa fa-home fa-2x" ></i> Home</span>
                </a>
            </li> 
            <li class="">
                <a href="javascript:void(0);" onclick="return createproject();" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs"><i class="fa fa-file"></i></span>
                    <span class="hidden-xs" style="color: palegreen"><i class="fa fa-file fa-2x" ></i> Create New Project</span>
                </a>
            </li>                       
            <li class="">
                <a href="javascript:void(0);" onclick="return openExcelFile();" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs"><i class="fa fa-folder-open"></i></span>
                    <span class="hidden-xs" style="color: palegreen"><i class="fa fa-folder-open fa-2x"></i> Open Project</span>
                </a>
            </li>  
            <li class="">
                <a href="javascript:void(0);" id="saveExcelFile" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs"><i class="fa fa-save"></i></span>
                    <span class="hidden-xs" style="color: palegreen"><i class="fa fa-save fa-2x"></i> Save Project</span>
                </a>
            </li>  
            <li class="">
                <a href="javascript:void(0);" onclick="return deleteproject();" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs"><i class="fa fa-times"></i></span>
                    <span class="hidden-xs" style="color: palegreen"><i class="fa fa-times fa-2x"></i> Delete Project</span>
                </a>
            </li>  
            <li class="">
                <a href="javascript:void(0);" onclick="return exportExcel();" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs"><i class="fa fa-upload"></i></span>
                    <span class="hidden-xs" style="color: palegreen"><i class="fa fa-upload fa-2x"></i> Export Excel</span>
                </a>
            </li>  
            <li class="">
                <a href="javascript:void(0);" onclick="return loadProjectProfile();" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs"><i class="fa fa-folder-open-o"></i></span>
                    <span class="hidden-xs" style="color: palegreen"><i class="fa fa-folder-open-o fa-2x"></i> Project Profile</span>
                </a>
            </li>  
        </ul>


        <div class="navbar-header pull-right" style="margin-top: 1%">
            <div class="hidden-lg pull-right">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-right">
                    <span class="sr-only">Toggle navigation</span>
                    <i class="fa fa-chevron-down"></i>
                </button>
            </div>

            <ul class="nav navbar-nav navbar-left-custom">

                <li>
                    <a href="javascript:void(0);" onclick="return emailmodal();">
                        <strong class="label label-danger">7</strong>
                        <i class="fa fa-comments"></i>
                        <span>Messages</span>                    
                    </a>
                </li>
                <li>
                    <a href="#">
                        <strong class="label label-info">7</strong>
                        <i class="fa fa-tasks"></i>
                        <span>Notifications</span>
                    </a>
                </li>

                <li class="user dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown">
                        <script>
                            $(document).ready(function () {
                                $("#my_image").attr("src", "<%=session.getAttribute("image")%>");
                            });
                        </script>
                        <img id="my_image" src="" alt="" width="20px" height="24px">
                        <span id="mainnameLoged"><%=session.getAttribute("Name")%>!.</span>
                        <i class="caret"></i>

                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="javascript:void(0);" onclick="return profile();"><i class="fa fa-user"></i> Profile</a>
                        </li>
                        <li><a href="#"><i class="fa fa-tasks"></i> Tasks</a></li>
                        <li><a href="#"><i class="fa fa-cog"></i> Settings</a></li>
                        <li>
                            <a href="index.jsp" onclick="logoutengineer();"><i class="fa fa-mail-forward"></i> Logout</a>
                        </li>
                    </ul>
                </li>                 
            </ul>
        </div>


    </div>

    <!--    <div class="container-fluid">
            <div class="navbar-header" style="margin-top: 1%">
                <div class="hidden-lg pull-right">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-right">
                        <span class="sr-only">Toggle navigation</span>
                        <i class="fa fa-chevron-down"></i>
                    </button>
                </div>
    
                <ul class="nav navbar-nav navbar-left-custom">
                    <li class="user dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown">
                            <script>
                                $(document).ready(function () {
                                $("#my_image").attr("src","<%=session.getAttribute("image")%>");
                            });
                            </script>
                            <img id="my_image" src="" alt="" width="20px" height="24px">
                            <span id="mainnameLoged"><%=session.getAttribute("Name")%>!.</span>
                            <i class="caret"></i>
    
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="javascript:void(0);" onclick="return profile();"><i class="fa fa-user"></i> Profile</a>
                            </li>
                            <li><a href="#"><i class="fa fa-tasks"></i> Tasks</a></li>
                            <li><a href="#"><i class="fa fa-cog"></i> Settings</a></li>
                            <li>
                                <a href="index.jsp" onclick="logoutengineer();"><i class="fa fa-mail-forward"></i> Logout</a>
                            </li>
                        </ul>
                    </li> 
    
                    <li>
                        <div class="tab-content" style="margin: 0px;height: 35px;width: 460px;padding: 0px;padding-bottom: 10px;padding-top: 4px;background-color: transparent;border: 0px">
                            <div class="tab-pane active" id="messages-2">
                                <div>
                                    <a href="javascript:void(0);" onclick="return loadhomepage();" style="color: palegreen"><div class="col-sm-2"><i class="fa fa-dashboard" style="font-size: x-large;"></i> Panel</div></a>
                                    <a href="javascript:void(0);" onclick="return createproject();" style="color: palegreen"><div class="col-sm-2"><i class="fa fa-file" style="font-size: x-large;"></i>&nbsp;new</div></a>
                                    <a href="javascript:void(0);" onclick="return openExcelFile();" style="color: palegreen"><div class="col-sm-2"><i class="fa fa-folder-open-o" style="font-size: x-large;"></i>open</div></a>
                                    <a href="javascript:void(0);" id="saveExcelFile" style="color: palegreen"><div class="col-sm-2"><i class="fa fa-save" style="font-size: x-large;"></i>save</div></a>
                                    <a href="javascript:void(0);" onclick="return deleteproject();" style="color: palegreen"><div class="col-sm-2"><i class="fa fa-times" style="font-size: x-large;"></i>Delete</div></a>                                
                                    <a href="javascript:void(0);" onclick="return exportExcel();" style="color: palegreen"><div class="col-sm-2"><i class="fa fa-upload" style="font-size: x-large;"></i>export</div></a>
                                </div>
                            </div>
                            <div class="tab-pane" id="profile-2">
                                <div>
                                    <a href="#" style="color: palegreen"><div class="col-sm-2"><i class="fa fa-copy" style="font-size: x-large;"></i>copy</div></a>
                                    <a href="#" style="color: palegreen"><div class="col-sm-2"><i class="fa fa-cut" style="font-size: x-large;"></i>cut</div></a>
                                    <a href="#" style="color: palegreen"><div class="col-sm-2"><i class="fa fa-paste" style="font-size: x-large;"></i>past</div></a>
                                    <a href="#" style="color: palegreen"><div class="col-sm-2"><i class="fa fa-search" style="font-size: x-large;"></i>search</div></a>
                                    <a href="#" style="color: palegreen"><div class="col-sm-4 " align="center"><input id="search_field" type="search" style="color: black"/></div></a>                                
                                </div>
                            </div>
                            <div class="tab-pane " id="home-2">
                                <div>
                                    <a href="#" style="color: palegreen"><div class="col-sm-2"><i class="fa fa-filter" style="font-size: x-large;"></i>filter</div></a>
                                    <a href="javascript:void(0);" onclick="return loadProjectProfile();" style="color: palegreen"><div class="col-sm-4"><i class="fa fa-folder-open-o" style="font-size: x-large;"></i>Project Profile</div></a>
                                    <a href="javascript:void(0);" onclick="return refresh();" style="color: palegreen"><div class="col-sm-2"><i class="fa fa-refresh" style="font-size: x-large;"></i>refresh</div></a>                                
                                </div>
                            </div>
                            <div class="tab-pane" id="settings-2">
                                <div>
                                    <a href="#" onclick=" return info();" style="color: palegreen"><div class="col-sm-2"><i class="fa fa-question-circle" style="font-size: x-large;"></i>info</div></a>                                
                                </div>
                            </div>
                        </div>
                    </li>
    
                </ul>
            </div>
    
            <ul class="nav navbar-nav navbar-right collapse" id="navbar-right" style="margin-top: 1%">           
                <li class="">
                    <a href="#messages-2" data-toggle="tab" aria-expanded="true">
                        <span class="visible-xs"><i class="fa fa-folder-open-o" id="page-title-tour"></i></span>
                        <span class="hidden-xs"><i class="fa fa-folder-open-o"></i> File</span>
                    </a>
                </li>
                <li class="">
                    <a href="#profile-2" data-toggle="tab" aria-expanded="false">
                        <span class="visible-xs"><i class="fa fa-home"></i></span>
                        <span class="hidden-xs"><i class="fa fa-home" ></i> Home</span>
                    </a>
                </li> 
                <li class="">
                    <a href="#home-2" data-toggle="tab" aria-expanded="false">
                        <span class="visible-xs"><i class="fa fa-filter"></i></span>
                        <span class="hidden-xs"><i class="fa fa-filter" ></i> Data</span>
                    </a>
                </li>                       
                <li class="">
                    <a href="#settings-2" data-toggle="tab" aria-expanded="false">
                        <span class="visible-xs"><i class="fa fa-question-circle"></i></span>
                        <span class="hidden-xs"><i class="fa fa-question-circle"></i> Help</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <strong class="label label-danger">15</strong>
                        <i class="fa fa-rotate-right"></i>
                        <span>Updates</span>                    
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);" onclick="return emailmodal();">
                        <strong class="label label-danger">7</strong>
                        <i class="fa fa-comments"></i>
                        <span>Messages</span>                    
                    </a>
                </li>
                <li>
                    <a href="#">
                        <strong class="label label-info">7</strong>
                        <i class="fa fa-tasks"></i>
                        <span>Notifications</span>
                    </a>
                </li>
            </ul>
    
    
        </div>-->
</div>
</div>
</div>