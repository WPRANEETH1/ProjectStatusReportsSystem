<%-- 
    Document   : index
    Created on : May 14, 2016, 11:29:10 AM
    Author     : Praneeth
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Cache-control" content="no-cache">
        <link rel="shortcut icon" href="login/css/images/mobitel.ico">
        <title>project_engineer dashboard template by Ongoing Solution</title>

        <script src="project_engineer/assets/jquery/jquery.min.js"></script> 

        <!--google pagination table js file-->
        <script src="http://d3js.org/d3.v3.min.js"></script>

        <script src="http://jquerypp.com/release/latest/jquerypp.js"></script> 
        <script src="login/implementation/bootstrap-notify.js"></script> 
        <style>
            [data-notify="container"]{
                background-color: #bce8f1;
            }
            [data-notify="container"].alert-pastel-mywarning {
                background-color: #ff3333;
            }
            [data-notify="container"].alert-pastel-myinfo {
                background-color: #ffff4d;
            }                  
        </style>



        <link href="project_engineer/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
        <link href="project_engineer/assets/css/brain-theme.css" rel="stylesheet" type="text/css">
        <link href="project_engineer/assets/css/styles.css" rel="stylesheet" type="text/css">
        <link href="project_engineer/assets/css/font-awesome.min.css" rel="stylesheet" type="text/css">


        <script type="text/javascript" src="project_engineer/assets/jquery/jquery-ui.min.js"></script>
        <script type="text/javascript" src="project_engineer/assets/js/plugins/interface/collapsible.min.js"></script>
        <script type="text/javascript" src="project_engineer/assets/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="project_engineer/assets/js/application_blank.js"></script>

        <!--modal-->
        <!--<link href="project_engineer/jsp/modal/css/custombox.min.css" rel="stylesheet">-->        
        <link href="project_engineer/jsp/modal/css/core.css" rel="stylesheet" type="text/css" />
        <link href="project_engineer/jsp/modal/css/components.css" rel="stylesheet" type="text/css" />

        <script src="project_engineer/pagination/js/jquery.twbsPagination.js"></script>  
        
        <!--new adminsidebar css-->        
        <!--<link href="dashboard/css/style-responsive.css" rel="stylesheet" type="text/css"/>-->
        <link href="dashboard/css/style.css" rel="stylesheet" type="text/css"/>
          
    </head>
    <body style="background-color: white">

        <%@include file="project_engineer/jsp/header_dashboard.jsp" %>
        
        
        <%@include file="dashboard/jsp/adminsidebar.jsp" %>
        
        <section id="main-content">
          <section class="wrapper">

              <div class="row">
                  <div class="col-lg-9 main-chart">
                      <%@include file="dashboard/jsp/admincontaner1.jsp" %>                         
                  </div><!-- /col-lg-9 END SECTION MIDDLE -->
 
                  <div class="col-lg-3 ds">
                      <%@include file="dashboard/jsp/adminnotification.jsp" %>                    
                  </div><!-- /col-lg-3 -->
              </div><! --/row -->
              
          </section>
      </section>
        
        
        
        <%@include file="project_engineer/jsp/modal/modaljsp/openproject.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/profile.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/mailmodal.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/issuesAdd.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/issuesEdit.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/createnewproject.jsp" %>        
        <%@include file="project_engineer/jsp/modal/modaljsp/information.jsp" %>
    </body>

    
    <script src="project_engineer/implementation/loadmodal.js?1500"></script>
    <script src="project_engineer/implementation/smcpcreateproject.js?1500"></script>
    <script src="project_engineer/implementation/accncreateproject.js?1500"></script>
    <script src="project_engineer/implementation/trimplcreateproject.js?1500"></script>

    <script src="project_engineer/implementation/date.js"></script>
    <script src="project_engineer/implementation/jsonQ.js"></script>    
    <!--<script src="project_engineer/implementation/engineerfunction.js?1500"></script>--> 
<!--    <script src="project_engineer/implementation/projectImplementation.js?1500"></script>-->
   

    <script src="project_engineer/jsp/modal/js/custombox.min.js"></script>
    <script src="project_engineer/jsp/modal/js/legacy.min.js"></script>    
    <script>
        function loadlink() {
            var uName = $('#sessionusername').val();
            if (isNaN(uName === false) || (uName === "null")) {
                $.ajax({
                    type: 'GET',
                    url: "/ProjectStatusReportsSystem/rest/psrservices/logoutservices/logout",
                    contentType: 'application/json',
                    success: function (data, textStatus, jqXHR) {
                        $('#sessionusername').val("");
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    }
                });
                window.location.replace("index.jsp");
            }
        }
        loadlink(); // This will run on page load
        setInterval(function () {
            loadlink() // this will run after every 5 seconds
        }, 5000);
    </script>
</html>
