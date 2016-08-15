/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function AccNproject() {
    var accnprojectName = $('#accnprojectName').val();
    if (JSON.stringify(accn()) !== "null") {
        $.ajax({
            type: 'POST',
            url: '/ProjectStatusReportsSystem/rest/psrservices/createProjectservices/createProject',
            data: accn(),
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
                if (data === "CREATED") {
                    window.location.replace("project_excelsheet.jsp?projectName=" + btoa(accnprojectName) + "");
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

function closeAccN() {
    $('#accnprojectName').val("");
    $('#accntotalscope').val("");
    $('#accnstartdate').val("");
    $('#accnenddate').val("");
    $('#accnSub_ProjectName').val("");
}

function accn() {
    var projectName = $('#accnprojectName').val();
    var projectCategory = "Access Network";
    var projectTotalscope = $('#accntotalscope').val();
    var projectStartDate = $('#accnstartdate').val();
    var projectEndDate = $('#accnenddate').val();
    var projectSubCategory = $('#accnSub_ProjectName').val();
    var projectUserName = $('#sessionusername').val();
    var projectDateTime = new Date().toISOString().substr(0,10);
    var NestedHeader = [[], [], []];
    var projectColumns = [];
    var projectData = [];
    var projectChechByManager = false;
    if ($('#accnno').is(":checked")) {
        NestedHeader[1].push("No");
        projectColumns.push({"data": "No", "type": "text"});
    }
    if ($('#accnregion').is(":checked")) {
        NestedHeader[1].push("Region");
        projectColumns.push({"data": "Region", "type": "dropdown", "source": ["1", "2", "3", "4", "5", "6"]});
    }
    if ($('#accnsiteid').is(":checked")) {
        NestedHeader[1].push("Site ID");
        projectColumns.push({"data": "Site_ID", "type": "text"});
    }
    if ($('#accnsitename').is(":checked")) {
        NestedHeader[1].push("Site Name");
        projectColumns.push({"data": "Site_Name", "type": "text"});
    }
    if ($('#accnTowerOwner').is(":checked")) {
        NestedHeader[1].push("Tower Owner");
        projectColumns.push({"data": "Tower_Owner", "type": "text"});
    }
    if ($('#accnProjectCategories').is(":checked")) {
        NestedHeader[1].push("Project Categories");
        projectColumns.push({"data": "Project_Categories", "type": "text"});
    }
    if ($('#accnTowerIndoorOutdoor').is(":checked")) {
        NestedHeader[1].push("Tower (Indoor/outdoor)");
        projectColumns.push({"data": "Tower_Indoor_outdoor", "type": "text"});
    }

    if ($('#accnDateOfHandover').is(":checked")) {
        NestedHeader[1].push("Date of Handover");
        projectColumns.push({"data": "Date_of_Handover", "type": "text"});
    }
    if ($('#accnBand').is(":checked")) {
        NestedHeader[1].push("Band");
        projectColumns.push({"data": "Band", "type": "text"});
    }
    if ($('#accnBTSType').is(":checked")) {
        NestedHeader[1].push("BTS Type");
        projectColumns.push({"data": "BTS_Type", "type": "text"});
    }
    if ($('#accn2g3g4g').is(":checked")) {
        NestedHeader[1].push("2G/3G/4G");
        projectColumns.push({"data": "G2_3G_4G", "type": "dropdown", "source": ["2G", "3G", "4G"]});
    }
    if ($('#accn2GDateFile').is(":checked")) {
        NestedHeader[1].push("2G Data File");
        projectColumns.push({"data": "2G_Data_File", "type": "text"});
    }
    if ($('#accnMWLinkAvaliablity').is(":checked")) {
        NestedHeader[1].push("MW Link Availability");
        projectColumns.push({"data": "MW_Link_Availability", "type": "text"});
    }
    if ($('#accnRRUType').is(":checked")) {
        NestedHeader[1].push("RRU Type");
        projectColumns.push({"data": "RRU_Type", "type": "text"});
    }
    if ($('#accnAntennaType').is(":checked")) {
        NestedHeader[1].push("Antenna Type");
        projectColumns.push({"data": "Antenna_Type", "type": "text"});
    }
    if ($('#accnNodesType').is(":checked")) {
        NestedHeader[1].push("NodeB Type");
        projectColumns.push({"data": "NodeB_Type", "type": "text"});
    }
    if ($('#accnTSSDate').is(":checked")) {
        NestedHeader[1].push("TSS Date");
        projectColumns.push({"data": "TSS_Date", "type": "text"});
    }
    if ($('#accnTSSCompleted').is(":checked")) {
        NestedHeader[1].push("TSS Completed");
        projectColumns.push({"data": "TSS_Completed", "type": "text"});
    }
    if ($('#accnTSSRSubmissionStatus').is(":checked")) {
        NestedHeader[1].push("TSSR Submission Status");
        projectColumns.push({"data": "TSSR_Submission_Status", "type": "text"});
    }
    if ($('#accnTSSRSubmissionDate').is(":checked")) {
        NestedHeader[1].push("TSSR Submission Date");
        projectColumns.push({"data": "TSSR_Submission_Date", "type": "text"});
    }
    if ($('#accnTssrApprovalStatus').is(":checked")) {
        NestedHeader[1].push("TSSR Approval Status");
        projectColumns.push({"data": "TSSR_Approval_Status", "type": "text"});
    }
    if ($('#accnApprovedTssrReceived').is(":checked")) {
        NestedHeader[1].push("Approved TSSR Received");
        projectColumns.push({"data": "Approved_TSSR_Received", "type": "text"});
    }
    if ($('#accnPlinthandMcwTargetDate').is(":checked")) {
        NestedHeader[1].push("Plinth & MCW Target Date");
        projectColumns.push({"data": "Plinth_and_MCW_Target_Date", "type": "text"});
    }
    if ($('#accnPlinthandMCWCompletionDate').is(":checked")) {
        NestedHeader[1].push("Plinth & MCW Completion Date");
        projectColumns.push({"data": "Plinth_and_MCW_Completion_Date", "type": "text"});
    }
    if ($('#accnRFIStatus').is(":checked")) {
        NestedHeader[1].push("RFI Status");
        projectColumns.push({"data": "RFI_Status", "type": "text"});
    }
    if ($('#accnRFITargetDate').is(":checked")) {
        NestedHeader[1].push("RFI Target Date");
        projectColumns.push({"data": "RFI_Target_Date", "type": "text"});
    }
    if ($('#accnRFICompletedDate').is(":checked")) {
        NestedHeader[1].push("RFI Completed Date");
        projectColumns.push({"data": "RFI_Completed_Date", "type": "text"});
    }
    if ($('#accnstatus').is(":checked")) {
        NestedHeader[1].push("Status");
        projectColumns.push({"data": "Status", "type": "dropdown", "source": ["OnAir", "TE WIP", "Tower WIP", "MCW", "On Air Pendind", "RFI Pending", "RFI MW Pending(WIP)", "RFI Power Pending(WIP)", "RFI MW & Power Pending(WIP)", "Other Operator Approval Pending(WIP)","Material Pending(WIP)", "RF Cabinet(WIP)", "DT(WIP)", "Eq.not Ready", "Site not Ready", "SA Issues", "RFI MW Pending(CF)", "RFI Power Pending(CF)", "RFI MW & Power Pending(CF)", "Other Operator Approval Pending(CF)","Material Pending(CF)", "RF Cabinet(CF)", "DT(CF)", "Other"]});
    }
    if ($('#accnDependency').is(":checked")) {
        NestedHeader[1].push("Dependency");
        projectColumns.push({"data": "Dependency", "type": "text"});
    }
    if ($('#accnRemarks').is(":checked")) {
        NestedHeader[1].push("Remarks");
        projectColumns.push({"data": "Remarks", "type": "text"});
    }
    if ($('#accnDependencyRPdivision').is(":checked")) {
        NestedHeader[1].push("Dependancy Responsibility Division");
        projectColumns.push({"data": "Dependancy_Responsibility_Division", "type": "text"});
    }
    if ($('#accnDependancyRpPerson').is(":checked")) {
        NestedHeader[1].push("Dependancy Responsible Person");
        projectColumns.push({"data": "Dependancy_Responsible_Person", "type": "text"});
    }
    if ($('#accnTXPlanAvailability').is(":checked")) {
        NestedHeader[1].push("TX Plan Availability");
        projectColumns.push({"data": "TX_Plan_Availability", "type": "text"});
    }
    if ($('#accnTXPlanTragetDate').is(":checked")) {
        NestedHeader[1].push("Tx Plan Traget Date");
        projectColumns.push({"data": "Tx_Plan_Traget_Date", "type": "text"});
    }
    if ($('#accnTxPlanReviseddate').is(":checked")) {
        NestedHeader[1].push("Tx Plan Revised Date");
        projectColumns.push({"data": "Tx_Plan_Revised_Date", "type": "text"});
    }
    if ($('#accnTXplanreceivedstatus').is(":checked")) {
        NestedHeader[1].push("TX Plan Received Status");
        projectColumns.push({"data": "TX_Plan_Received_Status", "type": "text"});
    }
    if ($('#accnTxplancompletiondate').is(":checked")) {
        NestedHeader[1].push("Tx Plan Completion Date");
        projectColumns.push({"data": "Tx_Plan_Completion_Date", "type": "text"});
    }
    if ($('#accnTxImplementaion').is(":checked")) {
        NestedHeader[1].push("TX Implemented");
        projectColumns.push({"data": "TX_Implemented", "type": "text"});
    }
    if ($('#accnTxStatusandTargetDate').is(":checked")) {
        NestedHeader[1].push("TX Status & Target Date");
        projectColumns.push({"data": "TX_Status_and_Target_Date", "type": "text"});
    }
    if ($('#accnTXCompletionDate').is(":checked")) {
        NestedHeader[1].push("TX Completion Date");
        projectColumns.push({"data": "TX_Completion_Date", "type": "text"});
    }
    if ($('#accnMwPatCompletionStatus').is(":checked")) {
        NestedHeader[1].push("MW PAT Completion Status");
        projectColumns.push({"data": "MW_PAT_Completion_Status", "type": "text"});
    }
    if ($('#accnMwPatCompletionDate').is(":checked")) {
        NestedHeader[1].push("MW PAT Completion Date");
        projectColumns.push({"data": "MW_PAT_Completion_Date", "type": "text"});
    }
    if ($('#accnPowerAvailability').is(":checked")) {
        NestedHeader[1].push("Power Availability");
        projectColumns.push({"data": "Power_Availability", "type": "text"});
    }
    if ($('#accnPowerType').is(":checked")) {
        NestedHeader[1].push("Power Type");
        projectColumns.push({"data": "Power_Type", "type": "text"});
    }
    if ($('#accnPowerComments').is(":checked")) {
        NestedHeader[1].push("Power Comments");
        projectColumns.push({"data": "Power_Comments", "type": "text"});
    }
    if ($('#accnPowerTargetDate').is(":checked")) {
        NestedHeader[1].push("Power Target Date");
        projectColumns.push({"data": "Power_Target_Date", "type": "text"});
    }
    if ($('#accnPowerRevisedDate').is(":checked")) {
        NestedHeader[1].push("Power Revised Date");
        projectColumns.push({"data": "Power_Revised_Date", "type": "text"});
    }
    if ($('#accnPowerCompletionDate').is(":checked")) {
        NestedHeader[1].push("Power Completion Date");
        projectColumns.push({"data": "Power_Completion_Date", "type": "text"});
    }
    if ($('#accnCivilworkcompleted').is(":checked")) {
        NestedHeader[1].push("Civil Work Completed");
        projectColumns.push({"data": "Civil_Work_Completed", "type": "text"});
    }
    if ($('#accnCivilTargetDate').is(":checked")) {
        NestedHeader[1].push("Civil Target Date");
        projectColumns.push({"data": "Civil_Target_Date", "type": "text"});
    }
    if ($('#accnRevisedCivilTargetDate').is(":checked")) {
        NestedHeader[1].push("Revised Civil Target Date");
        projectColumns.push({"data": "Revised_Civil_Target_Date", "type": "text"});
    }
    if ($('#accnCivilCompletedDate').is(":checked")) {
        NestedHeader[1].push("Civil Completed Date");
        projectColumns.push({"data": "Civil_Completed_Date", "type": "text"});
    }
    if ($('#accnOnAirTargetDate').is(":checked")) {
        NestedHeader[1].push("OnAir Target Date");
        projectColumns.push({"data": "OnAir_Target_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
    }
    if ($('#accnComments').is(":checked")) {
        NestedHeader[1].push("Comments");
        projectColumns.push({"data": "Comments", "type": "text"});
    }
    if ($('#accnPATPassedDate').is(":checked")) {
        NestedHeader[1].push("PAT Passed Date");
        projectColumns.push({"data": "PAT_Passed_Date", "type": "text"});
    }
    if ($('#accnOnAirActualDate').is(":checked")) {
        NestedHeader[1].push("OnAir Actual Date");
        projectColumns.push({"data": "OnAir_Actual_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
    }
    if ($('#accnSAIssue').is(":checked")) {
        NestedHeader[1].push("SA Issue");
        projectColumns.push({"data": "SA_Issue", "type": "text"});
    }
    if ($('#accnSATargetDate').is(":checked")) {
        NestedHeader[1].push("SA Target Date");
        projectColumns.push({"data": "SA_Target_Date", "type": "text"});
    }
    if ($('#accnSaRevisedTargetDate').is(":checked")) {
        NestedHeader[1].push("SA Revised Target Date");
        projectColumns.push({"data": "SA_Revised_Target_Date", "type": "text"});
    }
    if ($('#accnWIPHold').is(":checked")) {
        NestedHeader[1].push("WIP/HOLD");
        projectColumns.push({"data": "WIP_HOLD", "type": "text"});
    }
    if ($('#accnDoneby').is(":checked")) {
        NestedHeader[1].push("Done By");
        projectColumns.push({"data": "Done_By", "type": "text"});
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



