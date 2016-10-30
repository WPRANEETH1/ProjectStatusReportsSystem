<div id="mainpaneldiv" class="panel panel-default" style="width: 100%;height: auto;background-color: white;padding: 1%;">
    <div class="panel-body" style="padding-top: 0px;">
        <div class="col-sm-12" align="center" style="padding-bottom: 0%;">
            <h1 style="color: blue;background-color: #d1e0e0"><b>Network Project Implementations</b></h1>
        </div>
        <div class="col-sm-5">

            <div class="col-sm-12" style="background-color: aliceblue;margin: 0px">
                <div class="panel" style="background-color: #d1e0e0;margin: 0px;padding-bottom: 0px" align="center">
                    <h2 style="color: blue"><b>Project Details</b></h2>
                </div> 
                <div class="col-md-12" style="background-color: #d1e0e0;margin-top: 15px;padding-top: 0px" align="center">
                    
                </div>
                <div class="col-md-12" style="padding-bottom: 10px;padding-top: 0px">                                        
                    <div class="tree">
                        <ul>
                            <li><a href="javascript:void(0);" style="background-color: white;color: black;font-size: 15px;width:55%"><span><i class="glyphicon glyphicon-folder-open" ></i> Small Cell Implementation</span></a>
                                <ul>
                                    <li id="firstIBS"> </li> 
                                    <li id="firstWiFi"> </li>
                                    <li><a href="javascript:void(0);" style="background-color: white;color: red;"><span><i class="glyphicon glyphicon glyphicon-open" ></i> See more</span></a>
                                        <ul id="samllcellimplementation">

                                        </ul>
                                    </li>               
                                </ul>
                            </li>
                        </ul>                        
                        <ul>
                            <li><a href="javascript:void(0);" style="background-color: white;color: black;font-size: 15px;width:55%"><span><i class="glyphicon glyphicon-folder-open" ></i> Transmission Implementation</span></a>
                                <ul>                                    
                                    <li id="firstTrns"> </li> 
                                    <li><a href="javascript:void(0);" style="background-color: white;color: red;"><span><i class="glyphicon glyphicon glyphicon-open" ></i> See more</span></a>
                                        <ul id="Transmission_Implementation">

                                        </ul>
                                    </li>               
                                </ul>
                            </li>
                        </ul>
                        <ul>
                            <li><a href="javascript:void(0);" style="background-color: white;color: black;font-size: 15px;width:55%"><span><i class="glyphicon glyphicon-folder-open" ></i> Access Network</span></a>
                                <ul>
                                    <li id="firstaccn"> </li>
                                    <li id="secondaccn"> </li>
                                    <li id="theardaccn"> </li>
                                    <li id="forthaccn"> </li>
                                    <li id="fiveaccn"> </li>
                                    <li id="sixaccn"> </li>
                                    <li id="sevenaccn"> </li>
                                    <li id="eightaccn"> </li>
                                    <li id="nineaccn"> </li>
                                    <li id="tenaccn"> </li>
                                    <li><a href="javascript:void(0);" style="background-color: white;color: red;"><span><i class="glyphicon glyphicon glyphicon-open" ></i> See more</span></a>
                                        <ul id="accessnetwork">

                                        </ul>
                                    </li>               
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>        

        <div class="col-sm-7">
            <div class="col-sm-12" align="center" style="background-color: #d1e0e0;padding: 0px;margin-bottom: 1px;color: blue;font-size: 18px;">
                <div style="padding-left: 25%;margin: 0px">
                    Following figure shows project details of : <input type="text" id="projectname" disabled="true" style="background-color:#d1e0e0;border: 0px;width: 30%" />
                </div>
            </div>
            <div class="col-sm-12" style="background-color: #d1e0e0;padding-bottom: 5px">              
                <div class="col-sm-4" style="background-color: ;padding: 6px">
                    <ul id="pagination-demo" class="pagination-sm"></ul>                  
                </div>
                <style>
                    .pagination > li > a, .pagination > li > span {color: blue}
                    .pagination > li {background-color: #0eac5c}
                    .pagination > .active > a{background-color: blue}                    
                </style>
                <div class="col-sm-4" style="float: right;padding-top: 1%">
                    <select class="selectOption form-control selectpicker" id="sitelistOptionDiv" style="background-color: chartreuse;font-size: 15px">

                    </select>
                </div>
                <div class="col-sm-5" id="datepickerbutton" style="padding-left:0px">
                    <div id="reportrange" class="pull-right" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
                        <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>&nbsp;
                        <span></span> <b class="caret"></b>
                    </div>                    
                </div>
                <div class="col-sm-3" id="datebutton">                    
                    <input type="button" onclick="monthly();" id="monthly" class="btn btn-success btn-sm" value="Monthly"/>
                    <input type="button" onclick="weekly();" id="weekly" class="btn btn-success btn-sm" value="Weekly"/>
                </div>                
            </div>
            <div id="chartViewDivtag" style="height: 430px;background-color: aliceblue"></div>
            <div class="col-sm-12" style="display: none;background-color: aliceblue" id="sitelistTable">
                <div class="card-box table-responsive" id="datatable-buttons">
                                      
                </div>
            </div>
            <div class="col-sm-12" style="display: none;padding: 2%;background-color: aliceblue" id="IssuseTable">
                <div class="panel-body" align="center" style="margin: 0px;padding: 0px">
                    <h3 style="margin: 0px;color: black" id="openName">Key Issues (Open)</h3>
                    <div class="table-responsive">                        
                        <div class="scrollit">
                            <table class="table table-bordered table-hover table-striped"
                                   id="transactionTable">
                                <thead class="thead-fix">
                                    <tr bgcolor='#00FFFF' align="center">
                                        <th style="width: 5%">#</th>
                                        <th style="width: 70%">Issue Description</th>
                                        <th style="width: 10%">Rank</th> 
                                        <th style="width: 5%"></th>
                                        <th style="width: 5%"></th>
                                        <th style="width: 5%"></th>
                                    </tr>
                                </thead>
                                <tbody id="issuetable">

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="panel-body" align="center" style="margin: 0px;padding: 0px">
                    <h3 style="margin: 0px;color: black" id="closedName">Key Issues (Closed)</h3>
                    <div class="table-responsive">                        
                        <table class="table table-bordered table-hover table-striped"
                               id="transactionTable">
                            <thead class="thead-fix">
                                <tr bgcolor='#00FFFF' align="center">
                                    <th style="width: 5%">#</th>
                                    <th style="width: 70%">Issue Description</th>
                                    <th style="width: 10%">Rank</th> 
                                    <th style="width: 5%"></th>
                                    <th style="width: 5%"></th>
                                    <th style="width: 5%"></th>
                                </tr>
                            </thead>
                            <tbody id="issuescloced">

                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- end col -->
                <!--<div id="barchartloadmunthlydatachart" style="display: none;min-width: 310px; height: 400px; margin: 0 auto"></div>-->
                <!--<div id="teeeviewchart" style="display: none;min-width: 310px; height: 400px; margin: 0 auto"><div id="chart_div"></div></div>-->
            </div>


        </div>
    </div>
</div>