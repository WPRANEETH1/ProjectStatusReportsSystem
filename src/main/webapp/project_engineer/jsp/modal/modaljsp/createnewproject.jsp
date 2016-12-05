<div id="createnewproject" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="custom-width-modalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog" style="width:60%;padding: 0px;">
        <div class="modal-content" style="padding: 16px;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="font-size: xx-large;padding-right: 10px;">×</button>
                <h2 class="modal-title" id="custom-width-modalLabel" style="text-align: center;padding-top: 10px;"> Create New Project</h2>
            </div>








            <div class="row">
                <div class="col-sm-12">
                    <div class="tabbable">
                        <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="myTab4">
                            <li class="active" >
                                <a data-toggle="tab" href="#smcp" >Small Cell Implementation</a>
                            </li>

                            <li>
                                <a data-toggle="tab" href="#accn">Access Network</a>
                            </li>

                            <li>
                                <a data-toggle="tab" href="#trimpl">Transmission Implementation</a>
                            </li>
                        </ul>

                        <div class="tab-content" >
                            <div id="smcp" class="tab-pane in active">

                                <br>
                                <div class="col-sm-12" align="center" style="padding-bottom: 2%">                                    
                                    <div class="form-group" align="center">
                                        <label class="col-sm-2 control-label" style="padding-top: 2%">Project Name:</label>
                                        <div class="col-sm-4">
                                            <input class="form-control" id="smcpprojectName" type="text" />
                                        </div>
                                        <label class="col-sm-2 control-label" style="padding-top: 2%">Project Category:</label>
                                        <div class="col-sm-4">
                                            <select class="form-control selectpicker" id="smcpSub_ProjectName">
                                                <option></option>
                                                <option>IBS</option>
                                                <option>Wi-Fi</option>                                                
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <br>
                                <br>
                                <div class="form-group" align="center">
                                    <div class="col-sm-4">
                                        <label for="totalscope" class="col-sm-12 control-label">Total Scope:</label> 
                                        <input type="text" class="form-control" id="smcptotalscope"/>
                                    </div>                                    
                                    <div class="col-sm-4">
                                        <label for="startdate" class="col-sm-12 control-label">Start Date:</label>
                                        <input class="form-control" id="smcpstartdate" type="date" />
                                    </div>                                    
                                    <div class="col-sm-4">
                                        <label for="enddate" class="col-sm-12 control-label">End Date:</label>
                                        <input class="form-control" id="smcpenddate" type="date" />
                                    </div>
                                </div>                                
                                <br>
                                <hr>
                                <fieldset class="">
                                    <legend style="font-size: 12px">select fields...</legend>
                                    <div class="col-sm-4">
                                        <div class="checkbox checkbox-primary">
                                            <input id="smcpno" type="checkbox" checked>
                                            <label for="smcpno">
                                                No.
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-primary">
                                            <input id="smcpsiteid" type="checkbox" checked>
                                            <label for="smcpsiteid">
                                                Site Id
                                            </label>
                                        </div>                                        
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="checkbox checkbox-primary">
                                            <input id="smcpsiteName" type="checkbox" checked>
                                            <label for="smcpsiteName">
                                                Site Name
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-primary">
                                            <input id="smcpStatus" type="checkbox" checked>
                                            <label for="smcpStatus">
                                                Status
                                            </label>
                                        </div>                                                                                
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="checkbox checkbox-primary">
                                            <input id="smcpOnAirTargetDate" type="checkbox" checked>
                                            <label for="smcpOnAirTargetDate">
                                                On Air Target Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-primary">
                                            <input id="smcpOnAirActualDate" type="checkbox" checked>
                                            <label for="smcpOnAirActualDate">
                                                On Air Actual Date
                                            </label>
                                        </div>
                                    </div>
                                    <legend style="font-size: 12px;margin: 0px">select fields...</legend>
                                    <div class="col-sm-4">
                                        <div class="checkbox checkbox-warning">
                                            <input id="smcpCurrentStatus" type="checkbox">
                                            <label for="smcpCurrentStatus">
                                                Current Status
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="smcpAsquisitionStatus" type="checkbox">
                                            <label for="smcpAsquisitionStatus">
                                                Acquisition Status
                                            </label>
                                        </div>                                        
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="checkbox checkbox-warning">
                                            <input id="smcp2GVendor" type="checkbox" >
                                            <label for="smcp2GVendor">
                                                2G Vendor
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="smcp3GVendor" type="checkbox">
                                            <label for="smcp3GVendor">
                                                3G Vendor
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="checkbox checkbox-warning">
                                            <input id="smcpDependency" type="checkbox">
                                            <label for="smcpDependency">
                                                Dependancy
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="smcpRegion" type="checkbox">
                                            <label for="smcpRegion">
                                                Region
                                            </label>
                                        </div>                                        
                                    </div>
                                    <legend style="margin: 0px"></legend>
                                    <div class="col-sm-3">                                        
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpNewSiteId" type="checkbox">
                                            <label for="smcpNewSiteId">
                                                New Site ID
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpArea" type="checkbox">
                                            <label for="smcpArea">
                                                Area 
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpLatitide" type="checkbox">
                                            <label for="smcpLatitide">
                                                latitude
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpLongitude" type="checkbox">
                                            <label for="smcpLongitude">
                                                longitude
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpCategory" type="checkbox">
                                            <label for="smcpCategory">
                                                Category
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpNoOfAp" type="checkbox">
                                            <label for="smcpNoOfAp">
                                                No Of Ap
                                            </label>
                                        </div>                                                                                                                       
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpDateOfHandover" type="checkbox">
                                            <label for="smcpDateOfHandover">
                                                Date of Handover
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpMemoApproval" type="checkbox">
                                            <label for="smcpMemoApproval">
                                                Memo Approval
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpBackhaulingMethod" type="checkbox">
                                            <label for="smcpBackhaulingMethod">
                                                Backhauling Method
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpMobitelTo" type="checkbox">
                                            <label for="smcpMobitelTo">
                                                Mobitel TO
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpMITSiteENG" type="checkbox">
                                            <label for="smcpMITSiteENG">
                                                MIT Site ENG
                                            </label>
                                        </div>                                        
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpDesignDocfromMIT" type="checkbox">
                                            <label for="smcpDesignDocfromMIT">
                                                Design Doc form MIT
                                            </label>
                                        </div>                                        
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpRouterType" type="checkbox">
                                            <label for="smcpRouterType">
                                                Router type
                                            </label>
                                        </div>                                        
                                    </div>
                                    <div class="col-sm-3">                                        
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpTXApplyDate" type="checkbox">
                                            <label for="smcpTXApplyDate">
                                                TX Apply date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpTxConnectedDate" type="checkbox">
                                            <label for="smcpTxConnectedDate">
                                                Tx connected Date 
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpTXStatus" type="checkbox">
                                            <label for="smcpTXStatus">
                                                TX status 
                                            </label>
                                        </div>                                        
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpActualIMPStatusDate" type="checkbox">
                                            <label for="smcpActualIMPStatusDate">
                                                Actual IMP Star Date
                                            </label>
                                        </div>                                        
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpIMPStatus" type="checkbox">
                                            <label for="smcpIMPStatus">
                                                IMP Status
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpCOWRequsted" type="checkbox">
                                            <label for="smcpCOWRequsted">
                                                COW Requested 
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpPATDocument" type="checkbox">
                                            <label for="smcpPATDocument">
                                                PAT Document
                                            </label>
                                        </div>                                        
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpTECompletionDate" type="checkbox">
                                            <label for="smcpTECompletionDate">
                                                TE  Completion  Date
                                            </label>
                                        </div> 
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpPATSchulddate" type="checkbox">
                                            <label for="smcpPATSchulddate">
                                                PAT Schuled date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpPATStatus" type="checkbox">
                                            <label for="smcpPATStatus">
                                                PAT Status
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpPriorityList" type="checkbox">
                                            <label for="smcpPriorityList">
                                                Priority List
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpCurrentActionBy" type="checkbox">
                                            <label for="smcpCurrentActionBy">
                                                Currtent Action by
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpComments" type="checkbox">
                                            <label for="smcpComments">
                                                Comments
                                            </label>
                                        </div>                                        
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpInitialSiteSurveyReportStatus" type="checkbox">
                                            <label for="smcpInitialSiteSurveyReportStatus">
                                                Initial site Survey Report Status
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpIMPSiteVisitDate" type="checkbox">
                                            <label for="smcpIMPSiteVisitDate">
                                                IMP Site Visit Date (Vendor)
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpPlannedImpStarDate" type="checkbox">
                                            <label for="smcpPlannedImpStarDate">
                                                Planned IMP Star Date
                                            </label>
                                        </div>                                        
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpPlannedIMPCompletionDate" type="checkbox">
                                            <label for="smcpPlannedIMPCompletionDate">
                                                Planned IMP completion Date
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">                                        
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpApprovedDesignDoc" type="checkbox">
                                            <label for="smcpApprovedDesignDoc">
                                                Approved Design Doc
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="smcpTxRequestedforSmallSite" type="checkbox">
                                            <label for="smcpTxRequestedforSmallSite">
                                                Tx Requested for Small Site
                                            </label>
                                        </div>
                                    </div>                                    
                                    <legend></legend>
                                    <div class="col-sm-12" align="center">
                                        <button type="button" class="btn btn-default waves-effect" data-dismiss="modal" onclick="SMCPClose();">Close</button>
                                        <button type="button" class="btn btn-success waves-effect waves-light" onclick="createSMCPproject();">Create Project</button>
                                    </div>

                                </fieldset>

                            </div>

















                            <div id="accn" class="tab-pane">






                                <br>
                                <div class="col-sm-12" align="center" style="padding-bottom: 2%">                                    
                                    <div class="form-group" align="center">
                                        <div class="col-sm-2"></div>
                                        <label class="col-sm-2 control-label" style="padding-top: 2%">Project Name:</label>
                                        <div class="col-sm-4">
                                            <input class="form-control" id="accnprojectName" type="text" />
                                        </div>
                                        <div class="col-sm-2"></div>
                                        <!--<label class="col-sm-2 control-label" style="padding-top: 2%">Project Category:</label>-->
<!--                                        <div class="col-sm-4">
                                            <select class="form-control selectpicker" id="accnSub_ProjectName">
                                                <option></option>
                                                <option>Buffer Stock_Huawei</option>
                                                <option>Buffer Stock_ZTE</option>
                                                <option>Stage VII Associated projects</option>
                                                <option>Ericsson DBC</option>
                                                <option>4th Sector Installation</option>                                                
                                                <option>Small Cell Implementation</option>
                                                <option>Immediate Expansion_Huawei P1</option>
                                                <option>Immediate Expansion_Huawei P2</option>
                                                <option>Immediate Expansion_ZTE P1</option>
                                                <option>Immediate Expansion_ZTE P2</option>
                                            </select>
                                        </div>-->
                                    </div>
                                </div>
                                <br>
                                <br>
                                <br>                                                                                             
                                <div class="form-group" align="center">
                                    <div class="col-sm-4">
                                        <label for="totalscope" class="col-sm-12 control-label">Total Scope:</label> 
                                        <input type="text" class="form-control" id="accntotalscope"/>
                                    </div>                                    
                                    <div class="col-sm-4">
                                        <label for="startdate" class="col-sm-12 control-label">Start Date:</label>
                                        <input class="form-control" id="accnstartdate" type="date" />
                                    </div>                                    
                                    <div class="col-sm-4">
                                        <label for="enddate" class="col-sm-12 control-label">End Date:</label>
                                        <input class="form-control" id="accnenddate" type="date" />
                                    </div>
                                </div> 
                                <br>
                                <hr>
                                <fieldset>
                                    <legend style="font-size: 12px">select fields...</legend>
                                    <div class="col-sm-3">
                                        <div class="checkbox checkbox-primary">
                                            <input id="accnno" type="checkbox" checked>
                                            <label for="accnno">
                                                No.
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-primary">
                                            <input id="accnsiteid" type="checkbox" checked>
                                            <label for="accnsiteid">
                                                Site Id
                                            </label>
                                        </div>                                        
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="checkbox checkbox-primary">
                                            <input id="accnsitename" type="checkbox" checked>
                                            <label for="accnsitename">
                                                Site Name
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-primary">
                                            <input id="accnregion" type="checkbox" checked>
                                            <label for="accnregion">
                                                Region
                                            </label>
                                        </div>                                                                                
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="checkbox checkbox-primary">
                                            <input id="accnstatus" type="checkbox" checked>
                                            <label for="accnstatus">
                                                Status
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-primary">
                                            <input id="accn2g3g4g" type="checkbox" checked>
                                            <label for="accn2g3g4g">
                                                2G/3G/4G
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="checkbox checkbox-primary">
                                            <input id="accnOnAirTargetDate" type="checkbox" checked>
                                            <label for="accnOnAirTargetDate">
                                                On Air Target Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-primary">
                                            <input id="accnOnAirActualDate" type="checkbox" checked>
                                            <label for="accnOnAirActualDate">
                                                On Air Actual Date
                                            </label>
                                        </div>                                        
                                    </div>
                                    <legend style="font-size: 12px;margin: 0px">select fields...</legend>
                                    <div class="col-sm-3">
                                        <div class="checkbox checkbox-success">
                                            <input id="accnTowerOwner" type="checkbox">
                                            <label for="accnTowerOwner">
                                                Tower Owner
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnProjectCategories" type="checkbox">
                                            <label for="accnProjectCategories">
                                                Project Categories
                                            </label>
                                        </div>                                        
                                        <div class="checkbox checkbox-success">
                                            <input id="accnDateOfHandover" type="checkbox">
                                            <label for="accnDateOfHandover">
                                                Date of Handover
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnBand" type="checkbox">
                                            <label for="accnBand">
                                                Band
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnBTSType" type="checkbox">
                                            <label for="accnBTSType">
                                                BTS Type
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accn2GDateFile" type="checkbox">
                                            <label for="accn2GDateFile">
                                                2G Data file received
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnMWLinkAvaliablity" type="checkbox">
                                            <label for="accnMWLinkAvaliablity">
                                                MW Link Availability
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnRRUType" type="checkbox">
                                            <label for="accnRRUType">
                                                RRU Type
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnAntennaType" type="checkbox">
                                            <label for="accnAntennaType">
                                                Antenna Type
                                            </label>
                                        </div>                                                                               
                                    </div>
                                    <div class="col-sm-3">                                        
                                        <div class="checkbox checkbox-success">
                                            <input id="accnNodesType" type="checkbox">
                                            <label for="accnNodesType">
                                                NodeB Type
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnTSSDate" type="checkbox">
                                            <label for="accnTSSDate">
                                                TSS Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnTSSCompleted" type="checkbox">
                                            <label for="accnTSSCompleted">
                                                TSS Completed
                                            </label>
                                        </div> 
                                        <div class="checkbox checkbox-success">
                                            <input id="accnRFIStatus" type="checkbox">
                                            <label for="accnRFIStatus">
                                                RFI Status
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnRFITargetDate" type="checkbox">
                                            <label for="accnRFITargetDate">
                                                RFI Target Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnRFICompletedDate" type="checkbox">
                                            <label for="accnRFICompletedDate">
                                                RFI Completed Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnDependency" type="checkbox">
                                            <label for="accnDependency">
                                                Dependency
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnRemarks" type="checkbox">
                                            <label for="accnRemarks">
                                                Remarks
                                            </label>
                                        </div>                                                                               
                                        <div class="checkbox checkbox-success">
                                            <input id="accnTXPlanAvailability" type="checkbox">
                                            <label for="accnTXPlanAvailability">
                                                TX Plan Availability
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="checkbox checkbox-success">
                                            <input id="accnTXPlanTragetDate" type="checkbox">
                                            <label for="accnTXPlanTragetDate">
                                                Tx Plan Traget Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnTxPlanReviseddate" type="checkbox">
                                            <label for="accnTxPlanReviseddate">
                                                Tx Plan Revised date
                                            </label>
                                        </div>                                                                                
                                        <div class="checkbox checkbox-success">
                                            <input id="accnTxImplementaion" type="checkbox">
                                            <label for="accnTxImplementaion">
                                                TX Implemented
                                            </label>
                                        </div>                                        
                                        <div class="checkbox checkbox-success">
                                            <input id="accnTXCompletionDate" type="checkbox">
                                            <label for="accnTXCompletionDate">
                                                TX Completion Date
                                            </label>
                                        </div>                                                                                
                                        <div class="checkbox checkbox-success">
                                            <input id="accnPowerAvailability" type="checkbox">
                                            <label for="accnPowerAvailability">
                                                Power Availability
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnPowerType" type="checkbox">
                                            <label for="accnPowerType">
                                                Power Type
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnPowerComments" type="checkbox">
                                            <label for="accnPowerComments">
                                                Power Comments
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnPowerTargetDate" type="checkbox">
                                            <label for="accnPowerTargetDate">
                                                Power Target Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnPowerRevisedDate" type="checkbox">
                                            <label for="accnPowerRevisedDate">
                                                Power Revised Dates
                                            </label>
                                        </div>  
                                    </div>
                                    <div class="col-sm-3">                                                                              
                                        <div class="checkbox checkbox-success">
                                            <input id="accnCivilworkcompleted" type="checkbox">
                                            <label for="accnCivilworkcompleted">
                                                Civil work completed
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnCivilTargetDate" type="checkbox">
                                            <label for="accnCivilTargetDate">
                                                Civil Target Date
                                            </label>
                                        </div>                                        
                                        <div class="checkbox checkbox-success">
                                            <input id="accnCivilCompletedDate" type="checkbox">
                                            <label for="accnCivilCompletedDate">
                                                Civil Completed Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnComments" type="checkbox">
                                            <label for="accnComments">
                                                Comments
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnPATPassedDate" type="checkbox">
                                            <label for="accnPATPassedDate">
                                                PAT Passed Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnSAIssue" type="checkbox">
                                            <label for="accnSAIssue">
                                                SA Issue
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnSATargetDate" type="checkbox">
                                            <label for="accnSATargetDate">
                                                SA Target Date
                                            </label>
                                        </div>                                        
                                        <div class="checkbox checkbox-success">
                                            <input id="accnWIPHold" type="checkbox">
                                            <label for="accnWIPHold">
                                                WIP/HOLD
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnDoneby" type="checkbox">
                                            <label for="accnDoneby">
                                                Done By
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="checkbox checkbox-success">
                                            <input id="accnTowerIndoorOutdoor" type="checkbox">
                                            <label for="accnTowerIndoorOutdoor">
                                                Tower_(Indoor/outdoor)
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnTSSRSubmissionStatus" type="checkbox">
                                            <label for="accnTSSRSubmissionStatus">
                                                TSSR Submission Status
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnTSSRSubmissionDate" type="checkbox">
                                            <label for="accnTSSRSubmissionDate">
                                                TSSR Submission Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnTssrApprovalStatus" type="checkbox">
                                            <label for="accnTssrApprovalStatus">
                                                TSSR Approval Status
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnApprovedTssrReceived" type="checkbox">
                                            <label for="accnApprovedTssrReceived">
                                                Approved TSSR received
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="checkbox checkbox-success">
                                            <input id="accnPlinthandMcwTargetDate" type="checkbox">
                                            <label for="accnPlinthandMcwTargetDate">
                                                Plinth & MCW Target Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnPlinthandMCWCompletionDate" type="checkbox">
                                            <label for="accnPlinthandMCWCompletionDate">
                                                Plinth & MCW Completion Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnDependencyRPdivision" type="checkbox">
                                            <label for="accnDependencyRPdivision">
                                                Dependancy RP division
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnDependancyRpPerson" type="checkbox">
                                            <label for="accnDependancyRpPerson">
                                                Dependancy RP person
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnTXplanreceivedstatus" type="checkbox">
                                            <label for="accnTXplanreceivedstatus">
                                                TX Plan received status
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnTxplancompletiondate" type="checkbox">
                                            <label for="accnTxplancompletiondate">
                                                Tx plan completion date
                                            </label>
                                        </div>                                        
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="checkbox checkbox-success">
                                            <input id="accnTxStatusandTargetDate" type="checkbox">
                                            <label for="accnTxStatusandTargetDate">
                                                TX Status & Target Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnMwPatCompletionStatus" type="checkbox">
                                            <label for="accnMwPatCompletionStatus">
                                                MW PAT Completion Status
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnMwPatCompletionDate" type="checkbox">
                                            <label for="accnMwPatCompletionDate">
                                                MW PAT Completion Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnPowerCompletionDate" type="checkbox">
                                            <label for="accnPowerCompletionDate">
                                                Power Completion Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnRevisedCivilTargetDate" type="checkbox">
                                            <label for="accnRevisedCivilTargetDate">
                                                Revised Civil Target Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-success">
                                            <input id="accnSaRevisedTargetDate" type="checkbox">
                                            <label for="accnSaRevisedTargetDate">
                                                SA Revised Target Date
                                            </label>
                                        </div>
                                    </div>
                                    <legend></legend>
                                    <div class="col-sm-12" align="center">
                                        <button type="button" class="btn btn-default waves-effect" data-dismiss="modal" onclick="closeAccN();">Close</button>
                                        <button type="button" class="btn btn-success waves-effect waves-light" onclick="AccNproject();">Create Project</button>
                                    </div>

                                </fieldset>




                            </div>

                            <div id="trimpl" class="tab-pane">








                                <!----------------------------------------------------------->



                                <br>
                                <div class="col-sm-12" align="center" style="padding-bottom: 0%">                                    
                                    <div class="form-group" align="center">
                                        <div class="col-sm-2"></div>
                                        <label class="col-sm-2 control-label" style="padding: 2%">Project Name:</label>
                                        <div class="col-sm-4">
                                            <input class="form-control" id="trimplprojectName" type="text" />
                                        </div>  
                                        <div class="col-sm-2"></div>
                                    </div>
                                </div>
                                <br>
                                <br>
                                <br>
                                <div class="form-group" align="center">
                                    <div class="col-sm-4">
                                        <label for="totalscope" class="col-sm-12 control-label">Total Scope:</label> 
                                        <input type="text" class="form-control" id="trimpltotalscope"/>
                                    </div>                                    
                                    <div class="col-sm-4">
                                        <label for="startdate" class="col-sm-12 control-label">Start Date:</label>
                                        <input class="form-control" id="trimplstartdate" type="date" />
                                    </div>                                    
                                    <div class="col-sm-4">
                                        <label for="enddate" class="col-sm-12 control-label">End Date:</label>
                                        <input class="form-control" id="trimplenddate" type="date" />
                                    </div>
                                </div>                              
                                <br>
                                <hr>
                                <fieldset class="" style="min-width: 1px;">
                                    <legend style="font-size: 12px">select fields...</legend>
                                    <div class="col-sm-3">
                                        <div class="checkbox checkbox-primary">
                                            <input id="trimplIndex" type="checkbox" checked>
                                            <label for="trimplIndex">
                                                Index.
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-primary">
                                            <input id="trimplsiteid" type="checkbox" checked>
                                            <label for="trimplsiteid">
                                                Site Id
                                            </label>
                                        </div>                                        
                                    </div>
                                    <div class="col-sm-3">
                                        <div class="checkbox checkbox-primary">
                                            <input id="trimplSiteName" type="checkbox" checked>
                                            <label for="trimplSiteName">
                                                Site Name
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-primary">
                                            <input id="trimplCategory" type="checkbox" checked>
                                            <label for="trimplCategory">
                                                Category
                                            </label>
                                        </div>                                                                                
                                    </div>
                                    <div class="col-sm-2">
                                        <div class="checkbox checkbox-primary">
                                            <input id="trimplBatch" type="checkbox" checked>
                                            <label for="trimplBatch">
                                                Batch
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-primary">
                                            <input id="trimplStatus" type="checkbox" checked>
                                            <label for="trimplStatus">
                                                Status
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="checkbox checkbox-primary">
                                            <input id="trimplTargetCommissionDate" type="checkbox" checked>
                                            <label for="trimplTargetCommissionDate">
                                                Target Commission Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-primary">
                                            <input id="trimplCommissionedDate" type="checkbox" checked>
                                            <label for="trimplCommissionedDate">
                                                Commissioned Date
                                            </label>
                                        </div>                                        
                                    </div>
                                    <legend style="font-size: 12px;margin: 0px">select fields...</legend>
                                    <div class="col-sm-3">
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplHODate" type="checkbox">
                                            <label for="trimplHODate">
                                                HO _Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplCurrentTask" type="checkbox">
                                            <label for="trimplCurrentTask">
                                                Current_Task
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplLastMilestone" type="checkbox">
                                            <label for="trimplLastMilestone">
                                                Last_Milestone
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplNextMilestone" type="checkbox">
                                            <label for="trimplNextMilestone">
                                                Next_Milestone
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplDependency" type="checkbox">
                                            <label for="trimplDependency">
                                                Dependency
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplResponsiblePerson" type="checkbox">
                                            <label for="trimplResponsiblePerson">
                                                Responsible_Person
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplResponsibleParty" type="checkbox">
                                            <label for="trimplResponsibleParty">
                                                Responsible_Party
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplDependencyStatus" type="checkbox">
                                            <label for="trimplDependencyStatus">
                                                Dependency_Status
                                            </label>
                                        </div>
                                    </div> 
                                    <div class="col-sm-3">
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplSiteEngineer" type="checkbox">
                                            <label for="trimplSiteEngineer">
                                                Site_Engineer
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplRFTSSRSubcon" type="checkbox">
                                            <label for="trimplRFTSSRSubcon">
                                                RF TSSR Subcon
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplRFTSSDate" type="checkbox">
                                            <label for="trimplRFTSSDate">
                                                RF TSS Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplRFTSSStatus" type="checkbox">
                                            <label for="trimplRFTSSStatus">
                                                RF TSS Status
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplRFTSSRSbbmission" type="checkbox">
                                            <label for="trimplRFTSSRSbbmission">
                                                RF TSSR Submission
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplTSSRSubmissionNo" type="checkbox">
                                            <label for="trimplTSSRSubmissionNo">
                                                TSSR Submittal No
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplMCWSubcon" type="checkbox">
                                            <label for="trimplMCWSubcon">
                                                MCW Subcon
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplMCWstartedDate" type="checkbox">
                                            <label for="trimplMCWstartedDate">
                                                MCW started Date
                                            </label>
                                        </div>
                                    </div> 
                                    <div class="col-sm-3">                                        
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplMcwStatus" type="checkbox">
                                            <label for="trimplMcwStatus">
                                                MCW Status
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplITSubcon" type="checkbox">
                                            <label for="trimplITSubcon">
                                                TI Subcon
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplTIStartDate" type="checkbox">
                                            <label for="trimplTIStartDate">
                                                TI Start Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplTIStatus" type="checkbox">
                                            <label for="trimplTIStatus">
                                                TI Status
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplTICompletedDate" type="checkbox">
                                            <label for="trimplTICompletedDate">
                                                TI completed Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplSWAPDate" type="checkbox">
                                            <label for="trimplSWAPDate">
                                                SWAP Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplTIPrePatDate" type="checkbox">
                                            <label for="trimplTIPrePatDate">
                                                TI Pre PAT Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplTIpatDate" type="checkbox">
                                            <label for="trimplTIpatDate">
                                                TI PAT Date
                                            </label>
                                        </div>
                                    </div> 
                                    <div class="col-sm-3">                                        
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplTiPatStatus" type="checkbox">
                                            <label for="trimplTiPatStatus">
                                                TI PAT Status
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplAdditionalInstallation" type="checkbox">
                                            <label for="trimplAdditionalInstallation">
                                                Additional Installation
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplPatDocSubmission" type="checkbox">
                                            <label for="trimplPatDocSubmission">
                                                PAT Doc submission
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplPLCsubmission" type="checkbox">
                                            <label for="trimplPLCsubmission">
                                                PLC submission
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplRemarks" type="checkbox">
                                            <label for="trimplRemarks">
                                                Remarks
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplEfectedNodeB" type="checkbox">
                                            <label for="trimplEfectedNodeB">
                                                Efected Node B
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplOutageWindow" type="checkbox">
                                            <label for="trimplOutageWindow">
                                                Outage Window
                                            </label>
                                        </div>                                        
                                    </div> 
                                    <div class="col-sm-4">
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplDependencyRaisedDate" type="checkbox">
                                            <label for="trimplDependencyRaisedDate">
                                                Dependency Raised Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplDependencyClearedDate" type="checkbox">
                                            <label for="trimplDependencyClearedDate">
                                                Dependency Cleared Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplRFTSSRSubmissionDate" type="checkbox">
                                            <label for="trimplRFTSSRSubmissionDate">
                                                RF TSSR Submission Date
                                            </label>
                                        </div>                                                                               
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplRFTssRApprovalStatus" type="checkbox">
                                            <label for="trimplRFTssRApprovalStatus">
                                                RF TSSR Approval status
                                            </label>
                                        </div> 
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplRFTSSRApprovalDate" type="checkbox">
                                            <label for="trimplRFTSSRApprovalDate">
                                                RF TSSR Approval Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplMCWCompletedDate" type="checkbox">
                                            <label for="trimplMCWCompletedDate">
                                                MCW Completed Date
                                            </label>
                                        </div>                                        
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplEquipmentDeliveryDate" type="checkbox">
                                            <label for="trimplEquipmentDeliveryDate">
                                                Equipments Delivery Date
                                            </label>
                                        </div>
                                        <div class="checkbox checkbox-warning">
                                            <input id="trimplPendingApprovalSite" type="checkbox">
                                            <label for="trimplPendingApprovalSite">
                                                Pending Approval Site
                                            </label>
                                        </div>
                                    </div>
                                    <legend></legend>
                                    <div class="col-sm-12" align="center">
                                        <button type="button" class="btn btn-default waves-effect" data-dismiss="modal" onclick="trimplClose();">Close</button>
                                        <button type="button" class="btn btn-success waves-effect waves-light" onclick="trimplcreateProjectt();">Create Project</button>
                                    </div>

                                </fieldset>





                                <!----------------------------------------------------------------->

                            </div>

                        </div>
                    </div>
                </div><!-- /.col -->
            </div><!-- /.row -->





        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->