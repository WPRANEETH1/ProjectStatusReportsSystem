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

    var projectdatavalue = {};

    if ($('#trimplIndex').is(":checked")) {
        NestedHeader[1].push("Index");
        projectColumns.push({"data": "Index", "type": "text"});
        projectdatavalue["Index"] = "";
    }
    if ($('#trimplsiteid').is(":checked")) {
        NestedHeader[1].push("Site ID");
        projectColumns.push({"data": "Site_ID", "type": "text"});
        projectdatavalue["Site_ID"] = "";
    }
    if ($('#trimplSiteName').is(":checked")) {
        NestedHeader[1].push("Site Name");
        projectColumns.push({"data": "Site_Name", "type": "text"});
        projectdatavalue["Site_Name"] = "";
    }
    if ($('#trimplCategory').is(":checked")) {
        NestedHeader[1].push("Category");
        projectColumns.push({"data": "Category", "type": "text"});
        projectdatavalue["Category"] = "";
    }
    if ($('#trimplBatch').is(":checked")) {
        NestedHeader[1].push("Batch");
        projectColumns.push({"data": "Batch", "type": "text"});
        projectdatavalue["Batch"] = "";
    }
    if ($('#trimplHODate').is(":checked")) {
        NestedHeader[1].push("HO Date");
        projectColumns.push({"data": "HO_Date", "type": "text"});
        projectdatavalue["HO_Date"] = "";
    }
    if ($('#trimplTargetCommissionDate').is(":checked")) {
        NestedHeader[1].push("Target Commission Date");
        projectColumns.push({"data": "OnAir_Target_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
        projectdatavalue["OnAir_Target_Date"] = "";
    }
    if ($('#trimplCommissionedDate').is(":checked")) {
        NestedHeader[1].push("Commissioned Date");
        projectColumns.push({"data": "OnAir_Actual_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
        projectdatavalue["OnAir_Actual_Date"] = "";
    }
    if ($('#trimplStatus').is(":checked")) {
        NestedHeader[1].push("Status");
        projectColumns.push({"data": "Status", "type": "dropdown", "source": ["OnAir", "WIP", "On Hold", "Cannot Forecast"]});
        projectdatavalue["Status"] = "";
    }
    if ($('#trimplCurrentTask').is(":checked")) {
        NestedHeader[1].push("Current Task");
        projectColumns.push({"data": "Current_Task", "type": "text"});
        projectdatavalue["Current_Task"] = "";
    }
    if ($('#trimplLastMilestone').is(":checked")) {
        NestedHeader[1].push("Last Milestone");
        projectColumns.push({"data": "Last_Milestone", "type": "text"});
        projectdatavalue["Last_Milestone"] = "";
    }
    if ($('#trimplNextMilestone').is(":checked")) {
        NestedHeader[1].push("Next Milestone");
        projectColumns.push({"data": "Next_Milestone", "type": "text"});
        projectdatavalue["Next_Milestone"] = "";
    }
    if ($('#trimplDependency').is(":checked")) {
        NestedHeader[1].push("Dependency");
        projectColumns.push({"data": "Dependency", "type": "text"});
        projectdatavalue["Dependency"] = "";
    }
    if ($('#trimplResponsiblePerson').is(":checked")) {
        NestedHeader[1].push("Responsible Person");
        projectColumns.push({"data": "Responsible_Person", "type": "text"});
        projectdatavalue["Responsible_Person"] = "";
    }
    if ($('#trimplResponsibleParty').is(":checked")) {
        NestedHeader[1].push("Responsible Party");
        projectColumns.push({"data": "Responsible_Party", "type": "text"});
        projectdatavalue["Responsible_Party"] = "";
    }
    if ($('#trimplDependencyStatus').is(":checked")) {
        NestedHeader[1].push("Dependency Status");
        projectColumns.push({"data": "Dependency_Status", "type": "text"});
        projectdatavalue["Dependency_Status"] = "";
    }
    if ($('#trimplDependencyRaisedDate').is(":checked")) {
        NestedHeader[1].push("Dependency Raised Date");
        projectColumns.push({"data": "Dependency_Raised_Date", "type": "text"});
        projectdatavalue["Dependency_Raised_Date"] = "";
    }
    if ($('#trimplDependencyClearedDate').is(":checked")) {
        NestedHeader[1].push("Dependency Cleared Date");
        projectColumns.push({"data": "Dependency_Cleared_Date", "type": "text"});
        projectdatavalue["Dependency_Cleared_Date"] = "";
    }
    if ($('#trimplSiteEngineer').is(":checked")) {
        NestedHeader[1].push("Site Engineer");
        projectColumns.push({"data": "Site_Engineer", "type": "text"});
        projectdatavalue["Site_Engineer"] = "";
    }
    if ($('#trimplRFTSSRSubcon').is(":checked")) {
        NestedHeader[1].push("RF TSSR Subcon");
        projectColumns.push({"data": "RF_TSSR_Subcon", "type": "text"});
        projectdatavalue["RF_TSSR_Subcon"] = "";
    }
    if ($('#trimplRFTSSDate').is(":checked")) {
        NestedHeader[1].push("RF TSS Date");
        projectColumns.push({"data": "RF_TSS_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
        projectdatavalue["RF_TSS_Date"] = "";
    }
    if ($('#trimplRFTSSStatus').is(":checked")) {
        NestedHeader[1].push("RF TSS Status");
        projectColumns.push({"data": "RF_TSS_Status", "type": "text"});
        projectdatavalue["RF_TSS_Status"] = "";
    }
    if ($('#trimplRFTSSRSbbmission').is(":checked")) {
        NestedHeader[1].push("RF TSSR Submission");
        projectColumns.push({"data": "RF_TSSR_Submission", "type": "text"});
        projectdatavalue["RF_TSSR_Submission"] = "";
    }
    if ($('#trimplTSSRSubmissionNo').is(":checked")) {
        NestedHeader[1].push("TSSR Submittal No");
        projectColumns.push({"data": "TSSR_Submittal_No", "type": "text"});
        projectdatavalue["TSSR_Submittal_No"] = "";
    }
    if ($('#trimplRFTSSRSubmissionDate').is(":checked")) {
        NestedHeader[1].push("RF TSSR Submission Date");
        projectColumns.push({"data": "RF_TSSR_Submission_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
        projectdatavalue["RF_TSSR_Submission_Date"] = "";
    }
    if ($('#trimplRFTssRApprovalStatus').is(":checked")) {
        NestedHeader[1].push("RF TSSR Approval");
        projectColumns.push({"data": "RF_TSSR_Approval", "type": "text"});
        projectdatavalue["RF_TSSR_Approval"] = "";
    }
    if ($('#trimplRFTSSRApprovalDate').is(":checked")) {
        NestedHeader[1].push("RF TSSR Approval Date");
        projectColumns.push({"data": "RF_TSSR_Approval_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
        projectdatavalue["RF_TSSR_Approval_Date"] = "";
    }
    if ($('#trimplMCWSubcon').is(":checked")) {
        NestedHeader[1].push("MCW Subcon");
        projectColumns.push({"data": "MCW_Subcon", "type": "text"});
        projectdatavalue["MCW_Subcon"] = "";
    }
    if ($('#trimplMCWstartedDate').is(":checked")) {
        NestedHeader[1].push("MCW Started Date");
        projectColumns.push({"data": "MCW_Started_Date", "type": "text"});
        projectdatavalue["MCW_Started_Date"] = "";
    }
    if ($('#trimplMCWCompletedDate').is(":checked")) {
        NestedHeader[1].push("MCW Completed Date");
        projectColumns.push({"data": "MCW_Completed_Date", "type": "text"});
        projectdatavalue["MCW_Completed_Date"] = "";
    }
    if ($('#trimplMcwStatus').is(":checked")) {
        NestedHeader[1].push("MCW Status");
        projectColumns.push({"data": "MCW_Status", "type": "text"});
        projectdatavalue["MCW_Status"] = "";
    }
    if ($('#trimplITSubcon').is(":checked")) {
        NestedHeader[1].push("TI Subcon");
        projectColumns.push({"data": "TI_Subcon", "type": "text"});
        projectdatavalue["TI_Subcon"] = "";
    }
    if ($('#trimplEquipmentDeliveryDate').is(":checked")) {
        NestedHeader[1].push("Equipments Delivery Date");
        projectColumns.push({"data": "Equipments_Delivery_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
        projectdatavalue["Equipments_Delivery_Date"] = "";
    }
    if ($('#trimplTIStartDate').is(":checked")) {
        NestedHeader[1].push("TI Start Date");
        projectColumns.push({"data": "TI_Start_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
        projectdatavalue["TI_Start_Date"] = "";
    }
    if ($('#trimplTIStatus').is(":checked")) {
        NestedHeader[1].push("TI Status");
        projectColumns.push({"data": "TI_Status", "type": "text"});
        projectdatavalue["TI_Status"] = "";
    }
    if ($('#trimplTICompletedDate').is(":checked")) {
        NestedHeader[1].push("TI Completed Date");
        projectColumns.push({"data": "TI_Completed_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
        projectdatavalue["TI_Completed_Date"] = "";
    }
    if ($('#trimplSWAPDate').is(":checked")) {
        NestedHeader[1].push("SWAP Date");
        projectColumns.push({"data": "SWAP_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
        projectdatavalue["SWAP_Date"] = "";
    }
    if ($('#trimplTIPrePatDate').is(":checked")) {
        NestedHeader[1].push("TI Pre PAT Date");
        projectColumns.push({"data": "TI_Pre_PAT_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
        projectdatavalue["TI_Pre_PAT_Date"] = "";
    }
    if ($('#trimplTIpatDate').is(":checked")) {
        NestedHeader[1].push("TI PAT Date");
        projectColumns.push({"data": "TI_PAT_Date", "type": "date", "dateFormat": "YYYY-MM-DD"});
        projectdatavalue["TI_PAT_Date"] = "";
    }
    if ($('#trimplTiPatStatus').is(":checked")) {
        NestedHeader[1].push("TI PAT Status");
        projectColumns.push({"data": "TI_PAT_Status", "type": "text"});
        projectdatavalue["TI_PAT_Status"] = "";
    }
    if ($('#trimplPendingApprovalSite').is(":checked")) {
        NestedHeader[1].push("Pending Approval Site");
        projectColumns.push({"data": "Pending_Approval_Site", "type": "text"});
        projectdatavalue["Pending_Approval_Site"] = "";
    }
    if ($('#trimplAdditionalInstallation').is(":checked")) {
        NestedHeader[1].push("Additional Installation");
        projectColumns.push({"data": "Additional_Installation", "type": "text"});
        projectdatavalue["Additional_Installation"] = "";
    }
    if ($('#trimplPatDocSubmission').is(":checked")) {
        NestedHeader[1].push("PAT Doc Submission");
        projectColumns.push({"data": "PAT_Doc_Submission", "type": "text"});
        projectdatavalue["PAT_Doc_Submission"] = "";
    }
    if ($('#trimplPLCsubmission').is(":checked")) {
        NestedHeader[1].push("PLC Submission");
        projectColumns.push({"data": "PLC_Submission", "type": "text"});
        projectdatavalue["PLC_Submission"] = "";
    }
    if ($('#trimplRemarks').is(":checked")) {
        NestedHeader[1].push("Remarks");
        projectColumns.push({"data": "Remarks", "type": "text"});
        projectdatavalue["Remarks"] = "";
    }
    if ($('#trimplEfectedNodeB').is(":checked")) {
        NestedHeader[1].push("Efected Node B");
        projectColumns.push({"data": "Efected_Node_B", "type": "text"});
        projectdatavalue["Efected_Node_B"] = "";
    }
    if ($('#trimplOutageWindow').is(":checked")) {
        NestedHeader[1].push("Outage Window");
        projectColumns.push({"data": "Outage_Window", "type": "text"});
        projectdatavalue["Outage_Window"] = "";
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

