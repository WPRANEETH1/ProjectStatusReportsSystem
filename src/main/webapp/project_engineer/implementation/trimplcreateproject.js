/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function trimplcreateProjectt() {
    var trimplprojectName = $('#trimplprojectName').val();
    if (JSON.stringify(trimpl()) !== "null") {
        $.ajax({
            type: 'POST',
            url: '/ProjectStatusReportsSystem/rest/psrservices/createProjectservices/createProject',
            data: trimpl(),
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
                if (data === "CREATED") {
                    window.location.replace("project_excelsheet.jsp?projectName=" + btoa(trimplprojectName) + "");
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

function trimplClose() {
    $('#trimplprojectName').val("");
    $('#trimpltotalscope').val("");
    $('#trimplstartdate').val("");
    $('#trimplenddate').val("");
}

function trimpl() {
    var projectName = $('#trimplprojectName').val();
    var projectCategory = "Transmission Implementation";
    var projectTotalscope = $('#trimpltotalscope').val();
    var projectStartDate = $('#trimplstartdate').val();
    var projectEndDate = $('#trimplenddate').val();
    var projectSubCategory = "Transmission_Implementation";
    var projectUserName = $('#sessionusername').val();
    var projectDateTime = new Date().toISOString().substr(0, 10);
    var NestedHeader = [[], [], []];
    var projectColumns = [];
    var projectData = [];
    var projectChechByManager = false;

    if ($('#trimplIndex').is(":checked")) {
        NestedHeader[1].push("Index");
        projectColumns.push({"data": "Index", "type": "text"});
    }
    if ($('#trimplsiteid').is(":checked")) {
        NestedHeader[1].push("Site ID");
        projectColumns.push({"data": "Site_ID", "type": "text"});
    }
    if ($('#trimplSiteName').is(":checked")) {
        NestedHeader[1].push("Site Name");
        projectColumns.push({"data": "Site_Name", "type": "text"});
    }
    if ($('#trimplCategory').is(":checked")) {
        NestedHeader[1].push("Category");
        projectColumns.push({"data": "Category", "type": "text"});
    }
    if ($('#trimplBatch').is(":checked")) {
        NestedHeader[1].push("Batch");
        projectColumns.push({"data": "Batch", "type": "text"});
    }
    if ($('#trimplHODate').is(":checked")) {
        NestedHeader[1].push("HO Date");
        projectColumns.push({"data": "HO_Date", "type": "text"});
    }
    if ($('#trimplTargetCommissionDate').is(":checked")) {
        NestedHeader[1].push("Target Commission Date");
        projectColumns.push({"data": "OnAir_Target_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
    }
    if ($('#trimplCommissionedDate').is(":checked")) {
        NestedHeader[1].push("Commissioned Date");
        projectColumns.push({"data": "OnAir_Actual_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
    }
    if ($('#trimplStatus').is(":checked")) {
        NestedHeader[1].push("Status");
        projectColumns.push({"data": "Status", "type": "dropdown", "source": ["OnAir", "WIP", "On Hold", "Cannot Forecast"]});
    }
    if ($('#trimplCurrentTask').is(":checked")) {
        NestedHeader[1].push("Current Task");
        projectColumns.push({"data": "Current_Task", "type": "text"});
    }
    if ($('#trimplLastMilestone').is(":checked")) {
        NestedHeader[1].push("Last Milestone");
        projectColumns.push({"data": "Last_Milestone", "type": "text"});
    }
    if ($('#trimplNextMilestone').is(":checked")) {
        NestedHeader[1].push("Next Milestone");
        projectColumns.push({"data": "Next_Milestone", "type": "text"});
    }
    if ($('#trimplDependency').is(":checked")) {
        NestedHeader[1].push("Dependency");
        projectColumns.push({"data": "Dependency", "type": "text"});
    }
    if ($('#trimplResponsiblePerson').is(":checked")) {
        NestedHeader[1].push("Responsible Person");
        projectColumns.push({"data": "Responsible_Person", "type": "text"});
    }
    if ($('#trimplResponsibleParty').is(":checked")) {
        NestedHeader[1].push("Responsible Party");
        projectColumns.push({"data": "Responsible_Party", "type": "text"});
    }
    if ($('#trimplDependencyStatus').is(":checked")) {
        NestedHeader[1].push("Dependency Status");
        projectColumns.push({"data": "Dependency_Status", "type": "text"});
    }
    if ($('#trimplDependencyRaisedDate').is(":checked")) {
        NestedHeader[1].push("Dependency Raised Date");
        projectColumns.push({"data": "Dependency_Raised_Date", "type": "text"});
    }
    if ($('#trimplDependencyClearedDate').is(":checked")) {
        NestedHeader[1].push("Dependency Cleared Date");
        projectColumns.push({"data": "Dependency_Cleared_Date", "type": "text"});
    }
    if ($('#trimplSiteEngineer').is(":checked")) {
        NestedHeader[1].push("Site Engineer");
        projectColumns.push({"data": "Site_Engineer", "type": "text"});
    }
    if ($('#trimplRFTSSRSubcon').is(":checked")) {
        NestedHeader[1].push("RF TSSR Subcon");
        projectColumns.push({"data": "RF_TSSR_Subcon", "type": "text"});
    }
    if ($('#trimplRFTSSDate').is(":checked")) {
        NestedHeader[1].push("RF TSS Date");
        projectColumns.push({"data": "RF_TSS_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
    }
    if ($('#trimplRFTSSStatus').is(":checked")) {
        NestedHeader[1].push("RF TSS Status");
        projectColumns.push({"data": "RF_TSS_Status", "type": "text"});
    }
    if ($('#trimplRFTSSRSbbmission').is(":checked")) {
        NestedHeader[1].push("RF TSSR Submission");
        projectColumns.push({"data": "RF_TSSR_Submission", "type": "text"});
    }
    if ($('#trimplTSSRSubmissionNo').is(":checked")) {
        NestedHeader[1].push("TSSR Submittal No");
        projectColumns.push({"data": "TSSR_Submittal_No", "type": "text"});
    }
    if ($('#trimplRFTSSRSubmissionDate').is(":checked")) {
        NestedHeader[1].push("RF TSSR Submission Date");
        projectColumns.push({"data": "RF_TSSR_Submission_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
    }
    if ($('#trimplRFTssRApprovalStatus').is(":checked")) {
        NestedHeader[1].push("RF TSSR Approval");
        projectColumns.push({"data": "RF_TSSR_Approval", "type": "text"});
    }
    if ($('#trimplRFTSSRApprovalDate').is(":checked")) {
        NestedHeader[1].push("RF TSSR Approval Date");
        projectColumns.push({"data": "RF_TSSR_Approval_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
    }
    if ($('#trimplMCWSubcon').is(":checked")) {
        NestedHeader[1].push("MCW Subcon");
        projectColumns.push({"data": "MCW_Subcon", "type": "text"});
    }
    if ($('#trimplMCWstartedDate').is(":checked")) {
        NestedHeader[1].push("MCW Started Date");
        projectColumns.push({"data": "MCW_Started_Date", "type": "text"});
    }
    if ($('#trimplMCWCompletedDate').is(":checked")) {
        NestedHeader[1].push("MCW Completed Date");
        projectColumns.push({"data": "MCW_Completed_Date", "type": "text"});
    }
    if ($('#trimplMcwStatus').is(":checked")) {
        NestedHeader[1].push("MCW Status");
        projectColumns.push({"data": "MCW_Status", "type": "text"});
    }
    if ($('#trimplITSubcon').is(":checked")) {
        NestedHeader[1].push("TI Subcon");
        projectColumns.push({"data": "TI_Subcon", "type": "text"});
    }
    if ($('#trimplEquipmentDeliveryDate').is(":checked")) {
        NestedHeader[1].push("Equipments Delivery Date");
        projectColumns.push({"data": "Equipments_Delivery_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
    }
    if ($('#trimplTIStartDate').is(":checked")) {
        NestedHeader[1].push("TI Start Date");
        projectColumns.push({"data": "TI_Start_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
    }
    if ($('#trimplTIStatus').is(":checked")) {
        NestedHeader[1].push("TI Status");
        projectColumns.push({"data": "TI_Status", "type": "text"});
    }
    if ($('#trimplTICompletedDate').is(":checked")) {
        NestedHeader[1].push("TI Completed Date");
        projectColumns.push({"data": "TI_Completed_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
    }
    if ($('#trimplSWAPDate').is(":checked")) {
        NestedHeader[1].push("SWAP Date");
        projectColumns.push({"data": "SWAP_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
    }
    if ($('#trimplTIPrePatDate').is(":checked")) {
        NestedHeader[1].push("TI Pre PAT Date");
        projectColumns.push({"data": "TI_Pre_PAT_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
    }
    if ($('#trimplTIpatDate').is(":checked")) {
        NestedHeader[1].push("TI PAT Date");
        projectColumns.push({"data": "TI_PAT_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
    }
    if ($('#trimplTiPatStatus').is(":checked")) {
        NestedHeader[1].push("TI PAT Status");
        projectColumns.push({"data": "TI_PAT_Status", "type": "text"});
    }
    if ($('#trimplPendingApprovalSite').is(":checked")) {
        NestedHeader[1].push("Pending Approval Site");
        projectColumns.push({"data": "Pending_Approval_Site", "type": "text"});
    }
    if ($('#trimplAdditionalInstallation').is(":checked")) {
        NestedHeader[1].push("Additional Installation");
        projectColumns.push({"data": "Additional_Installation", "type": "text"});
    }
    if ($('#trimplPatDocSubmission').is(":checked")) {
        NestedHeader[1].push("PAT Doc Submission");
        projectColumns.push({"data": "PAT_Doc_Submission", "type": "text"});
    }
    if ($('#trimplPLCsubmission').is(":checked")) {
        NestedHeader[1].push("PLC Submission");
        projectColumns.push({"data": "PLC_Submission", "type": "text"});
    }
    if ($('#trimplRemarks').is(":checked")) {
        NestedHeader[1].push("Remarks");
        projectColumns.push({"data": "Remarks", "type": "text"});
    }
    if ($('#trimplEfectedNodeB').is(":checked")) {
        NestedHeader[1].push("Efected Node B");
        projectColumns.push({"data": "Efected_Node_B", "type": "text"});
    }
    if ($('#trimplOutageWindow').is(":checked")) {
        NestedHeader[1].push("Outage Window");
        projectColumns.push({"data": "Outage_Window", "type": "text"});
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

