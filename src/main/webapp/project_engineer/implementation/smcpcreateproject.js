/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function createSMCPproject() {
    var smcpprojectName = $('#smcpprojectName').val();
    if (JSON.stringify(smcp()) !== "null") {
        $.ajax({
            type: 'POST',
            url: '/ProjectStatusReportsSystem/rest/psrservices/createProjectservices/createProject',
            data: smcp(),
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
                if (data === "CREATED") {
                    window.location.replace("project_excelsheet.jsp?projectName=" + btoa(smcpprojectName) + "");
                } else if (data === "NOT_ACCEPTABLE") {
                    $('#infotitle').text("Cannot Create Excelsheet");
                    $('#infodetails').text("Cannot create work sheet... Duplicate worksheet name or DB error!...");
                    $('#information').modal('show');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#infotitle').text("Cannot Create Excelsheet");
                $('#infodetails').text("Cannot create work sheet... Duplicate worksheet name or DB error!...");
                $('#information').modal('show');
            }
        });
    } else {
        $('#infotitle').text("Fill all main fields");
        $('#infodetails').html("<p>You should fill fallowing fields before creating project..\n\
                                <ui><li> name</li><li> date </li><li> scope </li><li> category</li></ui></p>");
        $('#information').modal('show');
    }
}

function SMCPClose() {
    $('#smcpprojectName').val("");
    $('#smcptotalscope').val("");
    $('#smcpstartdate').val("");
    $('#smcpenddate').val("");
    $('#smcpSub_ProjectName').val("");
}

function smcp() {
    var projectName = $('#smcpprojectName').val();
    var projectCategory = "Small Cell Implementation";
    var projectTotalscope = $('#smcptotalscope').val();
    var projectStartDate = $('#smcpstartdate').val();
    var projectEndDate = $('#smcpenddate').val();
    var projectSubCategory = $('#smcpSub_ProjectName').val();
    var projectUserName = $('#sessionusername').val();
    var projectDateTime = new Date().toISOString().substr(0,10);
    var NestedHeader = [[], [], []];
    var projectColumns = [];
    var projectData = [];
    var projectChechByManager = false;

    if ($('#smcpno').is(":checked")) {
        NestedHeader[1].push("No");
        projectColumns.push({"data": "No", "type": "text"});
    }
    if ($('#smcpsiteid').is(":checked")) {
        NestedHeader[1].push("Site ID");
        projectColumns.push({"data": "Site_ID", "type": "text"});
    }
    if ($('#smcpNewSiteId').is(":checked")) {
        NestedHeader[1].push("New Site ID");
        projectColumns.push({"data": "New_Site_ID", "type": "text"});
    }
    if ($('#smcpsiteName').is(":checked")) {
        NestedHeader[1].push("Site Name");
        projectColumns.push({"data": "Site_Name", "type": "text"});
    }
    if ($('#smcpCurrentStatus').is(":checked")) {
        NestedHeader[1].push("Current Status");
        projectColumns.push({"data": "Current_Status", "type": "dropdown", "source": ["OnAir", "WIP", "TBS", "Discussion"]});
    }
    if (projectSubCategory === "IBS") {
        if ($('#smcpStatus').is(":checked")) {
            NestedHeader[1].push("Status");
            projectColumns.push({"data": "Status", "type": "dropdown", "source": ["OnAir", "Agreement Pending (WIP)", "Agreement Pending (TBS)", "TX Pending", "Civil Pending", "Power Pending", "Design Completed", "Site Owner Approval Pending", "Stage 1", "Stage 2", "Stage 3", "DAS"]});
        }
    }
    if ($('#smcpAsquisitionStatus').is(":checked")) {
        NestedHeader[1].push("Acquisition Status");
        projectColumns.push({"data": "Acquisition_Status", "type": "dropdown", "source": ["Acquired", "Stage 1", "Stage 2", "NA"]});
    }
    if ($('#smcpDependency').is(":checked")) {
        NestedHeader[1].push("Dependancy");
        projectColumns.push({"data": "Dependancy", "type": "text"});
    }
    if ($('#smcp2GVendor').is(":checked")) {
        NestedHeader[1].push("2G Vendor");
        projectColumns.push({"data": "2G_Vendor", "type": "dropdown", "source": ["HW", "HW(BS)", "ZT", "ZT(BS)", "Ericcson"]});
    }
    if ($('#smcp3GVendor').is(":checked")) {
        NestedHeader[1].push("3G Vendor");
        projectColumns.push({"data": "3G_Vendor", "type": "dropdown", "source": ["HW", "HW(BS)", "ZT", "ZT(BS)"]});
    }
    if ($('#smcpRegion').is(":checked")) {
        NestedHeader[1].push("Region");
        projectColumns.push({"data": "Region", "type": "dropdown", "source": ["1", "2", "3", "4", "5", "6"]});
    }
    if ($('#smcpArea').is(":checked")) {
        NestedHeader[1].push("Area");
        projectColumns.push({"data": "Area", "type": "text"});
    }
    if ($('#smcpLatitide').is(":checked")) {
        NestedHeader[1].push("Latitide");
        projectColumns.push({"data": "Latitide", "type": "text"});
    }
    if ($('#smcpLongitude').is(":checked")) {
        NestedHeader[1].push("Longitude");
        projectColumns.push({"data": "Longitude", "type": "text"});
    }
    if ($('#smcpCategory').is(":checked")) {
        NestedHeader[1].push("Category");
        projectColumns.push({"data": "Category", "type": "text"});
    }
    if ($('#smcpNoOfAp').is(":checked")) {
        NestedHeader[1].push("No Of Ap");
        projectColumns.push({"data": "No_Of_Ap", "type": "text"});
    }
    if ($('#smcpInitialSiteSurveyReportStatus').is(":checked")) {
        NestedHeader[1].push("Initial Site Survey Report Status");
        projectColumns.push({"data": "Initial_Site_Survey_Report_Status", "type": "text"});
    }
    if ($('#smcpDateOfHandover').is(":checked")) {
        NestedHeader[1].push("Date of Handover");
        projectColumns.push({"data": "Date_of_Handover", "type": "text"});
    }
    if ($('#smcpMemoApproval').is(":checked")) {
        NestedHeader[1].push("Memo Approval");
        projectColumns.push({"data": "Memo_Approval", "type": "text"});
    }
    if ($('#smcpBackhaulingMethod').is(":checked")) {
        NestedHeader[1].push("Backhauling Method");
        projectColumns.push({"data": "Backhauling_Method", "type": "text"});
    }
    if ($('#smcpMobitelTo').is(":checked")) {
        NestedHeader[1].push("Mobitel TO");
        projectColumns.push({"data": "Mobitel_TO", "type": "text"});
    }
    if ($('#smcpMITSiteENG').is(":checked")) {
        NestedHeader[1].push("MIT Site ENG");
        projectColumns.push({"data": "MIT_Site_ENG", "type": "text"});
    }
    if ($('#smcpIMPSiteVisitDate').is(":checked")) {
        NestedHeader[1].push("Implementation Site Visit Date (Vendor)");
        projectColumns.push({"data": "Implementation_Site_Visit_Date_Vendor", "type": "text"});
    }
    if ($('#smcpDesignDocfromMIT').is(":checked")) {
        NestedHeader[1].push("Design Doc form MIT");
        projectColumns.push({"data": "Design_Doc_form_MIT", "type": "text"});
    }
    if ($('#smcpApprovedDesignDoc').is(":checked")) {
        NestedHeader[1].push("Approved Design Doc");
        projectColumns.push({"data": "Approved_Design_Doc", "type": "text"});
    }
    if ($('#smcpRouterType').is(":checked")) {
        NestedHeader[1].push("Router type");
        projectColumns.push({"data": "Router_type", "type": "text"});
    }
    if ($('#smcpTxRequestedforSmallSite').is(":checked")) {
        NestedHeader[1].push("Tx Requested for Small Site");
        projectColumns.push({"data": "Tx_Requested_for_Small_Site", "type": "text"});
    }
    if ($('#smcpTXApplyDate').is(":checked")) {
        NestedHeader[1].push("TX Apply date");
        projectColumns.push({"data": "TX_Apply_date", "type": "text"});
    }
    if ($('#smcpTxConnectedDate').is(":checked")) {
        NestedHeader[1].push("Tx connected Date");
        projectColumns.push({"data": "Tx_connected_Date", "type": "text"});
    }
    if ($('#smcpTXStatus').is(":checked")) {
        NestedHeader[1].push("TX Status");
        projectColumns.push({"data": "TX_status", "type": "text"});
    }
    if ($('#smcpPlannedImpStarDate').is(":checked")) {
        NestedHeader[1].push("Planned Implementaion Star Date");
        projectColumns.push({"data": "Planned_Implementaion_Star_Date", "type": "text"});
    }
    if ($('#smcpActualIMPStatusDate').is(":checked")) {
        NestedHeader[1].push("Actual Implementaion Star Date");
        projectColumns.push({"data": "Actual_Implementaion_Star_Date", "type": "text"});
    }
    if ($('#smcpPlannedIMPCompletionDate').is(":checked")) {
        NestedHeader[1].push("Planned Implementaion completion Date");
        projectColumns.push({"data": "Planned_Implementaion_completion_Date", "type": "text"});
    }
    if ($('#smcpIMPStatus').is(":checked")) {
        NestedHeader[1].push("Implemenation Status");
        projectColumns.push({"data": "Implemenation_Status", "type": "text"});
    }
    if ($('#smcpTECompletionDate').is(":checked")) {
        NestedHeader[1].push("TE Completion Date");
        projectColumns.push({"data": "TE_Completion_Date", "type": "text"});
    }
    if ($('#smcpPATSchulddate').is(":checked")) {
        NestedHeader[1].push("PAT Schuled date");
        projectColumns.push({"data": "PAT_Schuled_date", "type": "text"});
    }
    if ($('#smcpPATStatus').is(":checked")) {
        NestedHeader[1].push("PAT Status");
        projectColumns.push({"data": "PAT_Status", "type": "text"});
    }
    if ($('#smcpPriorityList').is(":checked")) {
        NestedHeader[1].push("Priority List");
        projectColumns.push({"data": "Priority_List", "type": "text"});
    }
    if ($('#smcpCurrentActionBy').is(":checked")) {
        NestedHeader[1].push("Currtent Action by");
        projectColumns.push({"data": "Currtent_Action_by", "type": "text"});
    }
    if (projectSubCategory === "Wi-Fi") {
        if ($('#smcpStatus').is(":checked")) {
            NestedHeader[1].push("Status");
            projectColumns.push({"data": "Status", "type": "dropdown", "source": ["OnAir & POC", "OnAir", "WIP", "To be Started", "Agreement Pending", "TX Pending", "Site Owner Approval Pending", "Design Report Pending From Vendor", "Design Approval Pending from NPA", "OnAir & Removed", "OnAir & Blocked", "Hold"]});
        }
    }
    if ($('#smcpOnAirTargetDate').is(":checked")) {
        NestedHeader[1].push("OnAir Target Date");
        projectColumns.push({"data": "OnAir_Target_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
    }
    if ($('#smcpOnAirActualDate').is(":checked")) {
        NestedHeader[1].push("OnAir Actual Date");
        projectColumns.push({"data": "OnAir_Actual_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
    }
    if ($('#smcpComments').is(":checked")) {
        NestedHeader[1].push("Comments");
        projectColumns.push({"data": "Comments", "type": "text"});
    }
    if ($('#smcpCOWRequsted').is(":checked")) {
        NestedHeader[1].push("COW Requested");
        projectColumns.push({"data": "COW_Requested", "type": "text"});
    }
    if ($('#smcpPATDocument').is(":checked")) {
        NestedHeader[1].push("PAT Document");
        projectColumns.push({"data": "PAT_Document", "type": "text"});
    }
    if (true) {
        NestedHeader[1].push("");
        projectColumns.push({"data": "One", "type": "text"});
    }
    if (true) {
        NestedHeader[1].push("");
        projectColumns.push({"data": "Two", "type": "text"});
    }

    var index = 65;
    for (var i = 0; i < NestedHeader[1].length; i++) {
        if (i < 26) {
            NestedHeader[0].push(String.fromCharCode(index++));
            NestedHeader[2].push("");
        } else {
            index = 65;
            for (var j = 0; j < NestedHeader[1].length - i; j++) {
                if (j < 26) {
                    NestedHeader[0].push("A" + String.fromCharCode(index++));
                    NestedHeader[2].push("");
                } else {
                    index = 65;
                    for (var k = 0; k < NestedHeader[1].length - (i + j); k++) {
                        NestedHeader[0].push("B" + String.fromCharCode(index++));
                        NestedHeader[2].push("");
                    }
                    break;
                }
            }
            break;
        }
    }
    var createdprojectObject = null;
    if (projectName !== "" && projectSubCategory !== "" && projectCategory !== "" && projectUserName !== "" && projectTotalscope !== "" && projectStartDate !== "" && projectEndDate !== "") {
        createdprojectObject = {
            createdprojectName: projectName,
            createdprojectSubCategory: projectSubCategory,
            createdprojectCategory: projectCategory,
            createdprojectUserName: projectUserName,
            createdprojectTotalscope: projectTotalscope,
            createdprojectStartDate: projectStartDate,
            createdprojectEndDate: projectEndDate,
            createdprojectDateTime: projectDateTime,
            createdprojectNestedHeader: NestedHeader,
            createdprojectColumns: projectColumns,
            createdprojectData: projectData,
            createdprojectChechByManager: projectChechByManager
        };
        return JSON.stringify(createdprojectObject);
    } else {
        return null;
    }
}

