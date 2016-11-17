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
        <title>project_engineer template by Ongoing Solution</title>

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

        <!-- Include Required Prerequisites -->
        <script src="project_engineer/datepicker/moment.js"></script>
        <script type="text/javascript" src="project_engineer/datepicker/moment.min.js"></script>        
        <script src="project_engineer/datepicker/daterangepicker.js"></script>
        <link rel="stylesheet" type="text/css" href="project_engineer/datepicker/daterangepicker.css" />                             
        <script type="text/javascript">
            $(function () {
                var start = moment().subtract(0, 'days');
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

        <script src="project_engineer/pagination/js/jquery.twbsPagination.js"></script>        

        <style>
            .tree lix {
                margin: 0px 0;
                list-style-type: none;
                position: relative;
                padding: 20px 5px 0px 5px;
            }
            .tree li {
                margin: 0px 0;
                list-style-type: none;
                position: relative;
                padding: 10px 5px 0px 5px;
            }
            .tree li::before {
                content:'';
                position: absolute;
                top: 0;
                width: 1px;
                height: 100%;
                right: auto;
                left: -20px;
                border-left: 1px solid #ccc;
                bottom: 50px;
            }
            .tree li::after {
                content:'';
                position: absolute;
                top: 30px;
                width: 25px;
                height: 20px;
                right: auto;
                left: -20px;
                border-top: 1px solid #ccc;
            }
            .tree li a {
                display: inline-block;
                border: 1px solid #ccc;
                padding: 5px 10px;
                text-decoration: none;
                color: #666;
                font-family: arial, verdana, tahoma;
                font-size: 11px;
                border-radius: 5px;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
            }
            /*Remove connectors before root*/
            .tree > ul > li::before, .tree > ul > li::after {
                border: 0;
            }
            /*Remove connectors after last child*/
            .tree li:last-child::before {
                height: 30px;
            }
            /*Time for some hover effects*/

            /*We will apply the hover effect the the lineage of the element also*/
            .tree li a:hover, .tree li a:hover+ul li a {
                background: #c8e4f8;
                color: #000;
                border: 1px solid #94a0b4;
            }
            /*Connector styles on hover*/
            .tree li a:hover+ul li::after, .tree li a:hover+ul li::before, .tree li a:hover+ul::before, .tree li a:hover+ul ul::before {
                border-color: #94a0b4;
            }

            spann{
                background:transparent;
                /*border: 5px solid #DFDFDF;*/
                color: blue;
                font-size: 12px;
                height: 18px;
                letter-spacing: 1px;
                line-height: 25px;
                position: relative;
                text-align: center;
                /*text-transform: uppercase;*/
                top: 0px;
                left:-8px;
                display:none;
                padding:0 0px;

            }
            spann:after{
                content:'';
                position:absolute;
                bottom:-10px; 
                color: red;
                width:10px;
                height:0px;
                /*border-bottom:5px solid #dfdfdf;*/
                /*border-right:5px solid #dfdfdf;*/
                background:#f8f8f8;
                left:50%;
                margin-left:-10px;
                -moz-transform:rotate(45deg);
                -webkit-transform:rotate(45deg);
                transform:rotate(45deg);
            }
            ji{
                margin:0px;
                float:left;
                position:relative;
                cursor:pointer;
            }

            ji:hover spann{
                display:block;
            }
        </style>
        <!--CSS Family Tree-->
        <style>
            /*Now the CSS*/
            * {margin: 0; padding: 0;}

            .treee ul {
                padding-top: 20px; position: relative;

                transition: all 0.5s;
                -webkit-transition: all 0.5s;
                -moz-transition: all 0.5s;
            }

            .treee li {
                float: left; text-align: center;
                list-style-type: none;
                position: relative;
                padding: 20px 5px 0 5px;

                transition: all 0.5s;
                -webkit-transition: all 0.5s;
                -moz-transition: all 0.5s;
            }

            /*We will use ::before and ::after to draw the connectors*/

            .treee li::before, .treee li::after{
                content: '';
                position: absolute; top: 0; right: 50%;
                border-top: 1px solid #ccc;
                width: 50%; height: 20px;
            }
            .treee li::after{
                right: auto; left: 50%;
                border-left: 1px solid #ccc;
            }

            /*We need to remove left-right connectors from elements without 
            any siblings*/
            .treee li:only-child::after, .treee li:only-child::before {
                display: none;
            }

            /*Remove space from the top of single children*/
            .treee li:only-child{ padding-top: 0;}

            /*Remove left connector from first child and 
            right connector from last child*/
            .treee li:first-child::before, .treee li:last-child::after{
                border: 0 none;
            }
            /*Adding back the vertical connector to the last nodes*/
            .treee li:last-child::before{
                border-right: 1px solid #ccc;
                border-radius: 0 5px 0 0;
                -webkit-border-radius: 0 5px 0 0;
                -moz-border-radius: 0 5px 0 0;
            }
            .treee li:first-child::after{
                border-radius: 5px 0 0 0;
                -webkit-border-radius: 5px 0 0 0;
                -moz-border-radius: 5px 0 0 0;
            }

            /*Time to add downward connectors from parents*/
            .treee ul ul::before{
                content: '';
                position: absolute; top: 0; left: 50%;
                border-left: 1px solid #ccc;
                width: 0; height: 20px;
            }

            .treee li a{
                border: 1px solid #ccc;
                padding: 5px 10px;
                text-decoration: none;
                color: #666;
                font-family: arial, verdana, tahoma;
                font-size: 11px;
                display: inline-block;

                border-radius: 5px;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;

                transition: all 0.5s;
                -webkit-transition: all 0.5s;
                -moz-transition: all 0.5s;
            }

            /*Time for some hover effects*/
            /*We will apply the hover effect the the lineage of the element also*/
            .treee li a:hover, .treee li a:hover+ul li a {
                background: #c8e4f8; color: #000; border: 1px solid #94a0b4;
            }
            /*Connector styles on hover*/
            .treee li a:hover+ul li::after, 
            .treee li a:hover+ul li::before, 
            .treee li a:hover+ul::before, 
            .treee li a:hover+ul ul::before{
                border-color:  #94a0b4;
            }

            /*Thats all. I hope you enjoyed it.
            Thanks :)*/
        </style>
    </head>
    <body style="background-color: white">

        <%@include file="project_engineer/jsp/header_dashboard.jsp" %>
        <%@include file="project_engineer/jsp/content.jsp" %>        
        <%@include file="project_engineer/jsp/modal/modaljsp/openproject.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/profile.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/managerWorning.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/mailmodal.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/issuesAdd.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/issuesEdit.jsp" %>
        <%@include file="project_engineer/jsp/modal/modaljsp/createnewproject.jsp" %>        
        <%@include file="project_engineer/jsp/modal/modaljsp/information.jsp" %>
    </body>

    <script src="project_engineer/highcharts/highcharts.js"></script>
    <script src="project_engineer/highcharts/highcharts-3d.js"></script>
    <script src="project_engineer/highcharts/exporting.js"></script>
    <script src="project_engineer/highcharts/grouped-categories.js"></script>

    <script>
            $('#pagination-demo').twbsPagination({
                totalPages: 6,
                visiblePages: 1,
                onPageClick: function (event, page) {
                    $('#pagenumber').val(page);
                    if (page === 1) {
                        $('#sitelistTable').hide();
                        $('#sitelistOptionDiv').hide();
                        $('#IssuseTable').hide();
                        var projectname = $("#projectname").val();
                        if (projectname !== "null") {
                            $('#datepickerbutton').show();
                            $('#datebutton').show();
                            $('#chartViewDivtag').show();
                            Histrogram();
                        }
                    }
                    if (page === 2) {
                        $('#sitelistOptionDiv').hide();
                        $('#datebutton').hide();
                        $('#datepickerbutton').hide();
                        $('#sitelistTable').hide();
                        $('#IssuseTable').hide();
                        var projectname = $("#projectname").val();
                        if (projectname !== "null") {
                            $('#chartViewDivtag').show();
                            Piechart();
                        }
                    }
                    if (page === 3) {
                        $('#sitelistOptionDiv').hide();
                        $('#datebutton').hide();
                        $('#datepickerbutton').hide();
                        $('#chartViewDivtag').show();
                        $('#sitelistTable').hide();
                        $('#IssuseTable').hide();
                        Tree_View();
                    }
                    if (page === 4) {
                        $('#datebutton').hide();
                        $('#datepickerbutton').hide();
                        $('#chartViewDivtag').hide();
                        $('#IssuseTable').hide();
                        var projectname = $("#projectname").val();
                        if (projectname !== "null") {
                            $('#sitelistOptionDiv').show();
                            $('#sitelistTable').show();
                            Site_List();
                        }
                    }
                    if (page === 5) {
                        $('#sitelistOptionDiv').hide();
                        $('#datebutton').hide();
                        $('#datepickerbutton').hide();
                        $('#chartViewDivtag').hide();
                        $('#sitelistTable').hide();
                        var projectname = $("#projectname").val();
                        if (projectname !== "null") {
                            $('#IssuseTable').show();
                            Issues();
                        }
                    }
                    if (page === 6) {
                        $('#sitelistOptionDiv').hide();
                        $('#datebutton').hide();
                        $('#datepickerbutton').hide();
                        $('#chartViewDivtag').hide();
                        $('#sitelistTable').hide();
                        var projectname = $("#projectname").val();
                        if (projectname !== "null") {
                            $('#IssuseTable').show();
                            Risks();
                        }
                    }
                }
            });
    </script>
    <script src="project_engineer/implementation/loadmodal.js?1500"></script>
    <script src="project_engineer/implementation/smcpcreateproject.js?1500"></script>
    <script src="project_engineer/implementation/accncreateproject.js?1500"></script>
    <script src="project_engineer/implementation/trimplcreateproject.js?1500"></script>

    <script src="project_engineer/implementation/date.js"></script>
    <script src="project_engineer/implementation/jsonQ.js"></script>    
    <script src="project_engineer/implementation/managerfunction.js?1500"></script> 
    <script src="project_engineer/implementation/projectImplementation.js?1500"></script>

    <style>
        label {
            /*float: right;*/
        }
        .table > tbody > tr > td{
            padding: 5px 5px;
        }
        .card-box {
            background-color: aliceblue;
        }
        th {color: black}
    </style>

    <script type="text/javascript">
            $(function () {
                $('.tree li').hide();
                $('.tree li:first').show();
                $('.tree ul li:first-child').show();
                $('.tree ul li:nth-child(2)').show();
                $('.tree ul li:nth-child(3)').show();
                $('.tree ul li:nth-child(4)').show();
                $('.tree ul li:nth-child(5)').show();
                $('.tree ul li:nth-child(6)').show();
                $('.tree ul li:nth-child(7)').show();
                $('.tree ul li:nth-child(8)').show();
                $('.tree ul li:nth-child(9)').show();
                $('.tree ul li:nth-child(10)').show();
                $('.tree ul li:nth-child(11)').show();
                $('.tree ul li:nth-child(2) li').hide();
                $('.tree ul li:nth-child(3) li').hide();
                $('.tree ul li:nth-child(4) li').hide();
                $('.tree ul li:nth-child(5) li').hide();
                $('.tree ul li:nth-child(6) li').hide();
                $('.tree ul li:nth-child(7) li').hide();
                $('.tree ul li:nth-child(8) li').hide();
                $('.tree ul li:nth-child(9) li').hide();
                $('.tree ul li:nth-child(10) li').hide();
                $('.tree ul li:nth-child(11) li').hide();
                //$('.tree ul li:first-child + li:first').show();
                $('.tree li').on('click', function (e) {
                    var children = $(this).find('> ul > li');
                    console.log(children);
                    if (children.is(":visible"))
                        children.hide('fast');
                    else
                        children.show('fast');
                    e.stopPropagation();
                });
            });

    </script>    

    <!--<script src="project_engineer/treeview/shieldui-all.min.js"></script>-->
    <script type='text/javascript' src='https://www.google.com/jsapi'></script>
    <!--<script src="project_engineer/treeview/jsapi.js"></script>-->
    <script>
            google.load('visualization', '1', {packages: ['orgchart']});
            google.setOnLoadCallback(drawChart);
    </script>

    <style>
        .sui-treeview-item-text:hover{color:#fff;background-color:white}
        .google-visualization-orgchart-node {border: aliceblue}   
        .google-visualization-orgchart-table{background-color: aliceblue}
        tbody div{
            overflow:scroll;
            height:100px;
        }
    </style>


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
