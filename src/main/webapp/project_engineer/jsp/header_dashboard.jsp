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
</div>
</div>
</div>