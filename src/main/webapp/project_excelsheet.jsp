<%-- 
    Document   : index
    Created on : May 14, 2016, 11:29:10 AM
    Author     : Praneeth
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <link rel="shortcut icon" href="login/css/images/mobitel.ico">
        <title>project_engineer template by Ongoing Solution</title>

        <script src="project_engineer/assets/jquery/jquery.min.js"></script>        

        <script src="http://jquerypp.com/release/latest/jquerypp.js"></script> 
        <script src="login/implementation/bootstrap-notify.js"></script> 
        <style>
            /*            .handsontable td.htSearchResult { I change handsontable.full.min
                            background:greenyellow; 
                        }*/
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

        <!-- Include Required Prerequisites -->
        <script src="project_engineer/datepicker/moment.js"></script>
        <script type="text/javascript" src="project_engineer/datepicker/moment.min.js"></script>        
        <script src="project_engineer/datepicker/daterangepicker.js"></script>
        <link rel="stylesheet" type="text/css" href="project_engineer/datepicker/daterangepicker.css" />                             
        <script type="text/javascript">
            $(function () {
                var start = moment().subtract(29, 'days');
                var end = moment();
                function cb(start, end) {
                    $('#reportrange span').html(start.format('YYYY-MMMM-DD') + ' - ' + end.format('YYYY-MMMM-DD'));
                }
                $('#reportrange').daterangepicker({
                    startDate: start,
                    endDate: end,
                    ranges: {
                    }
                }, cb);
                cb(start, end);
            });
        </script> 

        <link type="text/css" rel="stylesheet" href="project_engineer/excel/css/handsontable.full.min.css">
        <link rel="stylesheet" type="text/css" href="project_engineer/excel/css/all.min.css" />
        <script src="project_engineer/excel/js/handsontable.full.min.js"></script>
        <script src="project_engineer/excel/js/lodash.js"></script>
        <script src="project_engineer/excel/js/underscore.string.js"></script>
        <script src="project_engineer/excel/js/moment.js"></script>
        <script src="project_engineer/excel/js/numeral.js"></script>
        <script src="project_engineer/excel/js/numeric.js"></script>
        <script src="project_engineer/excel/js/md5.js"></script>
        <script src="project_engineer/excel/js/jstat.js"></script>
        <script src="project_engineer/excel/js/formula.js"></script>
        <script src="project_engineer/excel/js/parser.js"></script>
        <script src="project_engineer/excel/js/ruleJS.js"></script>
        <script src="project_engineer/excel/js/handsontable.formula.js"></script>
        <script src="project_engineer/implementation/loadmodal.js"></script>
        <script src="project_engineer/implementation/excelsheet.js"></script>
        <style>
            .currentRow {
                background-color: #1E90FF !important;
            }           
            .handsontable table thead th{
                background-color: #99ffff;
                /*   color:white;*/
                font-weight:bold;
                font-size:15px;
                width: 120px;
                /*height: 40px;*/
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
        <link href="project_engineer/jsp/modal/css/custombox.min.css" rel="stylesheet">        
        <link href="project_engineer/jsp/modal/css/core.css" rel="stylesheet" type="text/css" />
        <link href="project_engineer/jsp/modal/css/components.css" rel="stylesheet" type="text/css" />
    </head>
    <body style="background-color: #122b40">

        <%@include file="project_engineer/jsp/header.jsp" %>
        <%@include file="project_engineer/jsp/excelsheet.jsp" %>        
        <%@include file="project_engineer/jsp/modal/modaljsp/openproject.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/profile.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/deleteProject.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/managerWorning.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/mailmodal.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/success.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/createnewproject.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/projectProfile.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/information.jsp" %>
    </body>       

    <script src="project_engineer/implementation/smcpcreateproject.js"></script>
    <script src="project_engineer/implementation/accncreateproject.js"></script>
    <script src="project_engineer/implementation/trimplcreateproject.js"></script>


    <script src="project_engineer/jsp/modal/js/custombox.min.js"></script>
    <script src="project_engineer/jsp/modal/js/legacy.min.js"></script>  
    <script>
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
    </script>
</html>
