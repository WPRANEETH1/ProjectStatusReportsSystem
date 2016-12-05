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
//    var projectSubCategory = $('#accnSub_ProjectName').val();
    var projectSubCategory = "Access Network";
    var projectUserName = $('#sessionusername').val();
    var projectDateTime = new Date().toISOString().substr(0, 10);
    var NestedHeader = [[], [], []];
    var projectColumns = [];
    var projectData = [];
    var projectChechByManager = false;

    var projectdatavalue = {};

    if ($('#accnno').is(":checked")) {
        NestedHeader[1].push("No");
        projectColumns.push({"data": "No", "type": "text"});
        projectdatavalue["No"] = "";
    }
    if ($('#accnregion').is(":checked")) {
        NestedHeader[1].push("Region");
        projectColumns.push({"data": "Region", "type": "dropdown", "source": ["1", "2", "3", "4", "5", "6"]});
        projectdatavalue["Region"] = "";
    }
    if ($('#accnsiteid').is(":checked")) {
        NestedHeader[1].push("Site ID");
        projectColumns.push({"data": "Site_ID", "type": "text"});
        projectdatavalue["Site_ID"] = "";
    }
    if ($('#accnsitename').is(":checked")) {
        NestedHeader[1].push("Site Name");
        projectColumns.push({"data": "Site_Name", "type": "text"});
        projectdatavalue["Site_Name"] = "";
    }
    if ($('#accnTowerOwner').is(":checked")) {
        NestedHeader[1].push("Tower Owner");
        projectColumns.push({"data": "Tower_Owner", "type": "text"});
        projectdatavalue["Tower_Owner"] = "";
    }
    if ($('#accnProjectCategories').is(":checked")) {
        NestedHeader[1].push("Project Categories");
        projectColumns.push({"data": "Project_Categories", "type": "text"});
        projectdatavalue["Project_Categories"] = "";
    }
    if ($('#accnTowerIndoorOutdoor').is(":checked")) {
        NestedHeader[1].push("Tower (Indoor/outdoor)");
        projectColumns.push({"data": "Tower_Indoor_outdoor", "type": "text"});
        projectdatavalue["Tower_Indoor_outdoor"] = "";
    }

    if ($('#accnDateOfHandover').is(":checked")) {
        NestedHeader[1].push("Date of Handover");
        projectColumns.push({"data": "Date_of_Handover", "type": "text"});
        projectdatavalue["Date_of_Handover"] = "";
    }
    if ($('#accnBand').is(":checked")) {
        NestedHeader[1].push("Band");
        projectColumns.push({"data": "Band", "type": "text"});
        projectdatavalue["Band"] = "";
    }
    if ($('#accnBTSType').is(":checked")) {
        NestedHeader[1].push("BTS Type");
        projectColumns.push({"data": "BTS_Type", "type": "text"});
        projectdatavalue["BTS_Type"] = "";
    }
    if ($('#accn2g3g4g').is(":checked")) {
        NestedHeader[1].push("2G/3G/4G");
        projectColumns.push({"data": "G2_3G_4G", "type": "dropdown", "source": ["2G", "3G", "4G"]});
        projectdatavalue["G2_3G_4G"] = "";
    }
    if ($('#accn2GDateFile').is(":checked")) {
        NestedHeader[1].push("2G Data File");
        projectColumns.push({"data": "2G_Data_File", "type": "text"});
        projectdatavalue["2G_Data_File"] = "";
    }
    if ($('#accnMWLinkAvaliablity').is(":checked")) {
        NestedHeader[1].push("MW Link Availability");
        projectColumns.push({"data": "MW_Link_Availability", "type": "text"});
        projectdatavalue["MW_Link_Availability"] = "";
    }
    if ($('#accnRRUType').is(":checked")) {
        NestedHeader[1].push("RRU Type");
        projectColumns.push({"data": "RRU_Type", "type": "text"});
        projectdatavalue["RRU_Type"] = "";
    }
    if ($('#accnAntennaType').is(":checked")) {
        NestedHeader[1].push("Antenna Type");
        projectColumns.push({"data": "Antenna_Type", "type": "text"});
        projectdatavalue["Antenna_Type"] = "";
    }
    if ($('#accnNodesType').is(":checked")) {
        NestedHeader[1].push("NodeB Type");
        projectColumns.push({"data": "NodeB_Type", "type": "text"});
        projectdatavalue["NodeB_Type"] = "";
    }
    if ($('#accnTSSDate').is(":checked")) {
        NestedHeader[1].push("TSS Date");
        projectColumns.push({"data": "TSS_Date", "type": "text"});
        projectdatavalue["TSS_Date"] = "";
    }
    if ($('#accnTSSCompleted').is(":checked")) {
        NestedHeader[1].push("TSS Completed");
        projectColumns.push({"data": "TSS_Completed", "type": "text"});
        projectdatavalue["TSS_Completed"] = "";
    }
    if ($('#accnTSSRSubmissionStatus').is(":checked")) {
        NestedHeader[1].push("TSSR Submission Status");
        projectColumns.push({"data": "TSSR_Submission_Status", "type": "text"});
        projectdatavalue["TSSR_Submission_Status"] = "";
    }
    if ($('#accnTSSRSubmissionDate').is(":checked")) {
        NestedHeader[1].push("TSSR Submission Date");
        projectColumns.push({"data": "TSSR_Submission_Date", "type": "text"});
        projectdatavalue["TSSR_Submission_Date"] = "";
    }
    if ($('#accnTssrApprovalStatus').is(":checked")) {
        NestedHeader[1].push("TSSR Approval Status");
        projectColumns.push({"data": "TSSR_Approval_Status", "type": "text"});
        projectdatavalue["TSSR_Approval_Status"] = "";
    }
    if ($('#accnApprovedTssrReceived').is(":checked")) {
        NestedHeader[1].push("Approved TSSR Received");
        projectColumns.push({"data": "Approved_TSSR_Received", "type": "text"});
        projectdatavalue["Approved_TSSR_Received"] = "";
    }
    if ($('#accnPlinthandMcwTargetDate').is(":checked")) {
        NestedHeader[1].push("Plinth & MCW Target Date");
        projectColumns.push({"data": "Plinth_and_MCW_Target_Date", "type": "text"});
        projectdatavalue["Plinth_and_MCW_Target_Date"] = "";
    }
    if ($('#accnPlinthandMCWCompletionDate').is(":checked")) {
        NestedHeader[1].push("Plinth & MCW Completion Date");
        projectColumns.push({"data": "Plinth_and_MCW_Completion_Date", "type": "text"});
        projectdatavalue["Plinth_and_MCW_Completion_Date"] = "";
    }
    if ($('#accnRFIStatus').is(":checked")) {
        NestedHeader[1].push("RFI Status");
        projectColumns.push({"data": "RFI_Status", "type": "text"});
        projectdatavalue["RFI_Status"] = "";
    }
    if ($('#accnRFITargetDate').is(":checked")) {
        NestedHeader[1].push("RFI Target Date");
        projectColumns.push({"data": "RFI_Target_Date", "type": "text"});
        projectdatavalue["RFI_Target_Date"] = "";
    }
    if ($('#accnRFICompletedDate').is(":checked")) {
        NestedHeader[1].push("RFI Completed Date");
        projectColumns.push({"data": "RFI_Completed_Date", "type": "text"});
        projectdatavalue["RFI_Completed_Date"] = "";
    }
    if ($('#accnstatus').is(":checked")) {
        NestedHeader[1].push("Status");
        projectColumns.push({"data": "Status", "type": "dropdown", "source":
                    ["OnAir", "TE WIP", "Tower WIP", "MCW", "On Air Pending", "RFI Pending", "RFI MW Pending(WIP)", "RFI Power Pending(WIP)",
                        "RFI MW & Power Pending(WIP)", "Other Operator Approval Pending(WIP)", "Material Pending(WIP)", "RF Cabinet(WIP)", "DT(WIP)",
                        "Eq.not Ready", "Site not Ready", "SA Issues", "RFI MW Pending(CF)", "RFI Power Pending(CF)", "RFI MW & Power Pending(CF)",
                        "Other Operator Approval Pending(CF)", "Material Pending(CF)", "RF Cabinet(CF)", "DT(CF)",
                        "Commissioned & blocked(CF)", "PAT Passed & blocked(CF)", "TX Pending(WIP)", "Civil Pending(CF)", "MW PAT Pending(WIP)", "Commission Pending(WIP)",
                        "Commissioned blocked(WIP)", "Power Pending(WIP)", "Other"]});
        projectdatavalue["Status"] = "";
    }
    if ($('#accnDependency').is(":checked")) {
        NestedHeader[1].push("Dependency");
        projectColumns.push({"data": "Dependency", "type": "text"});
        projectdatavalue["Dependency"] = "";
    }
    if ($('#accnRemarks').is(":checked")) {
        NestedHeader[1].push("Remarks");
        projectColumns.push({"data": "Remarks", "type": "text"});
        projectdatavalue["Remarks"] = "";
    }
    if ($('#accnDependencyRPdivision').is(":checked")) {
        NestedHeader[1].push("Dependancy Responsibility Division");
        projectColumns.push({"data": "Dependancy_Responsibility_Division", "type": "text"});
        projectdatavalue["Dependancy_Responsibility_Division"] = "";
    }
    if ($('#accnDependancyRpPerson').is(":checked")) {
        NestedHeader[1].push("Dependancy Responsible Person");
        projectColumns.push({"data": "Dependancy_Responsible_Person", "type": "text"});
        projectdatavalue["Dependancy_Responsible_Person"] = "";
    }
    if ($('#accnTXPlanAvailability').is(":checked")) {
        NestedHeader[1].push("TX Plan Availability");
        projectColumns.push({"data": "TX_Plan_Availability", "type": "text"});
        projectdatavalue["TX_Plan_Availability"] = "";
    }
    if ($('#accnTXPlanTragetDate').is(":checked")) {
        NestedHeader[1].push("Tx Plan Traget Date");
        projectColumns.push({"data": "Tx_Plan_Traget_Date", "type": "text"});
        projectdatavalue["Tx_Plan_Traget_Date"] = "";
    }
    if ($('#accnTxPlanReviseddate').is(":checked")) {
        NestedHeader[1].push("Tx Plan Revised Date");
        projectColumns.push({"data": "Tx_Plan_Revised_Date", "type": "text"});
        projectdatavalue["Tx_Plan_Revised_Date"] = "";
    }
    if ($('#accnTXplanreceivedstatus').is(":checked")) {
        NestedHeader[1].push("TX Plan Received Status");
        projectColumns.push({"data": "TX_Plan_Received_Status", "type": "text"});
        projectdatavalue["TX_Plan_Received_Status"] = "";
    }
    if ($('#accnTxplancompletiondate').is(":checked")) {
        NestedHeader[1].push("Tx Plan Completion Date");
        projectColumns.push({"data": "Tx_Plan_Completion_Date", "type": "text"});
        projectdatavalue["Tx_Plan_Completion_Date"] = "";
    }
    if ($('#accnTxImplementaion').is(":checked")) {
        NestedHeader[1].push("TX Implemented");
        projectColumns.push({"data": "TX_Implemented", "type": "text"});
        projectdatavalue["TX_Implemented"] = "";
    }
    if ($('#accnTxStatusandTargetDate').is(":checked")) {
        NestedHeader[1].push("TX Status & Target Date");
        projectColumns.push({"data": "TX_Status_and_Target_Date", "type": "text"});
        projectdatavalue["TX_Status_and_Target_Date"] = "";
    }
    if ($('#accnTXCompletionDate').is(":checked")) {
        NestedHeader[1].push("TX Completion Date");
        projectColumns.push({"data": "TX_Completion_Date", "type": "text"});
        projectdatavalue["TX_Completion_Date"] = "";
    }
    if ($('#accnMwPatCompletionStatus').is(":checked")) {
        NestedHeader[1].push("MW PAT Completion Status");
        projectColumns.push({"data": "MW_PAT_Completion_Status", "type": "text"});
        projectdatavalue["MW_PAT_Completion_Status"] = "";
    }
    if ($('#accnMwPatCompletionDate').is(":checked")) {
        NestedHeader[1].push("MW PAT Completion Date");
        projectColumns.push({"data": "MW_PAT_Completion_Date", "type": "text"});
        projectdatavalue["MW_PAT_Completion_Date"] = "";
    }
    if ($('#accnPowerAvailability').is(":checked")) {
        NestedHeader[1].push("Power Availability");
        projectColumns.push({"data": "Power_Availability", "type": "text"});
        projectdatavalue["Power_Availability"] = "";
    }
    if ($('#accnPowerType').is(":checked")) {
        NestedHeader[1].push("Power Type");
        projectColumns.push({"data": "Power_Type", "type": "text"});
        projectdatavalue["Power_Type"] = "";
    }
    if ($('#accnPowerComments').is(":checked")) {
        NestedHeader[1].push("Power Comments");
        projectColumns.push({"data": "Power_Comments", "type": "text"});
        projectdatavalue["Power_Comments"] = "";
    }
    if ($('#accnPowerTargetDate').is(":checked")) {
        NestedHeader[1].push("Power Target Date");
        projectColumns.push({"data": "Power_Target_Date", "type": "text"});
        projectdatavalue["Power_Target_Date"] = "";
    }
    if ($('#accnPowerRevisedDate').is(":checked")) {
        NestedHeader[1].push("Power Revised Date");
        projectColumns.push({"data": "Power_Revised_Date", "type": "text"});
        projectdatavalue["Power_Revised_Date"] = "";
    }
    if ($('#accnPowerCompletionDate').is(":checked")) {
        NestedHeader[1].push("Power Completion Date");
        projectColumns.push({"data": "Power_Completion_Date", "type": "text"});
        projectdatavalue["Power_Completion_Date"] = "";
    }
    if ($('#accnCivilworkcompleted').is(":checked")) {
        NestedHeader[1].push("Civil Work Completed");
        projectColumns.push({"data": "Civil_Work_Completed", "type": "text"});
        projectdatavalue["Civil_Work_Completed"] = "";
    }
    if ($('#accnCivilTargetDate').is(":checked")) {
        NestedHeader[1].push("Civil Target Date");
        projectColumns.push({"data": "Civil_Target_Date", "type": "text"});
        projectdatavalue["Civil_Target_Date"] = "";
    }
    if ($('#accnRevisedCivilTargetDate').is(":checked")) {
        NestedHeader[1].push("Revised Civil Target Date");
        projectColumns.push({"data": "Revised_Civil_Target_Date", "type": "text"});
        projectdatavalue["Revised_Civil_Target_Date"] = "";
    }
    if ($('#accnCivilCompletedDate').is(":checked")) {
        NestedHeader[1].push("Civil Completed Date");
        projectColumns.push({"data": "Civil_Completed_Date", "type": "text"});
        projectdatavalue["Civil_Completed_Date"] = "";
    }
    if ($('#accnOnAirTargetDate').is(":checked")) {
        NestedHeader[1].push("OnAir Target Date");
        projectColumns.push({"data": "OnAir_Target_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
        projectdatavalue["OnAir_Target_Date"] = "";
    }
    if ($('#accnComments').is(":checked")) {
        NestedHeader[1].push("Comments");
        projectColumns.push({"data": "Comments", "type": "text"});
        projectdatavalue["Comments"] = "";
    }
    if ($('#accnPATPassedDate').is(":checked")) {
        NestedHeader[1].push("PAT Passed Date");
        projectColumns.push({"data": "PAT_Passed_Date", "type": "text"});
        projectdatavalue["PAT_Passed_Date"] = "";
    }
    if ($('#accnOnAirActualDate').is(":checked")) {
        NestedHeader[1].push("OnAir Actual Date");
        projectColumns.push({"data": "OnAir_Actual_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
        projectdatavalue["OnAir_Actual_Date"] = "";
    }
    if ($('#accnSAIssue').is(":checked")) {
        NestedHeader[1].push("SA Issue");
        projectColumns.push({"data": "SA_Issue", "type": "text"});
        projectdatavalue["SA_Issue"] = "";
    }
    if ($('#accnSATargetDate').is(":checked")) {
        NestedHeader[1].push("SA Target Date");
        projectColumns.push({"data": "SA_Target_Date", "type": "text"});
        projectdatavalue["SA_Target_Date"] = "";
    }
    if ($('#accnSaRevisedTargetDate').is(":checked")) {
        NestedHeader[1].push("SA Revised Target Date");
        projectColumns.push({"data": "SA_Revised_Target_Date", "type": "text"});
        projectdatavalue["SA_Revised_Target_Date"] = "";
    }
    if ($('#accnWIPHold').is(":checked")) {
        NestedHeader[1].push("WIP/HOLD");
        projectColumns.push({"data": "WIP_HOLD", "type": "text"});
        projectdatavalue["WIP_HOLD"] = "";
    }
    if ($('#accnDoneby').is(":checked")) {
        NestedHeader[1].push("Done By");
        projectColumns.push({"data": "Done_By", "type": "text"});
        projectdatavalue["Done_By"] = "";
    }
    if (true) {
        NestedHeader[1].push("");
        projectColumns.push({"data": "One", "type": "text"});
        projectdatavalue["One"] = "";
    }
    if (true) {
        NestedHeader[1].push("");
        projectColumns.push({"data": "Two", "type": "text"});
        projectdatavalue["Two"] = "";
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

    projectData.push(projectdatavalue);

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



