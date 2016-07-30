/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {    
    $('#createnewproject').modal('hide');
    $('#selectprojectname').modal('hide');
    $('#information').modal('hide');
    $('#issuesAdd').modal('hide');
    $('#issuesEdit').modal('hide');
});

function createproject() {
    $('#createnewproject').modal('show');
}

function openExcelFile() {
    $('#selectprojectname').modal('show');
}


function openExcelFile() {
    var sessionusername = $('#sessionusername').val();
    var rootURL = '/ProjectStatusReportsSystem/rest/psrservices/getexceldataservices';
    $.ajax({
        type: 'GET',
        url: rootURL + "/searchallprojectname/" + sessionusername,
        contentType: 'application/json',
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            if (data.length !== 0) {
                $("#allprojectname").empty();
                $.each(data, function (index, optiondata) {
                    $("#allprojectname").append("<option value='" + ((optiondata.createdprojectName)) + "' name='" + (optiondata.createdprojectName) + "'>" + (optiondata.createdprojectName) + " / " + (optiondata.createdprojectDateTime) + " / " + (optiondata.createdprojectCategory) + "</option>");
                });
            } else {
                $("#allprojectname").append("<option>" + "No Existing project" + "</option>");
                $('#allprojectname').prop("disabled", true);
                $('#reloadbutton').attr("disabled", "disabled");
            }
            $('#selectprojectname').modal('show');
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function reloadpageToloadexcelsheet() {
    var projectname = $('#allprojectname').val();
    window.location.replace("project_excelsheet.jsp?projectName=" + btoa(projectname) + "");
}

function loadhomepage() {
    window.location.replace("project_engineer.jsp?projectName=" + btoa(null) + "");
}

function deleteproject() {
    if (JSON.stringify(deleteprojectobject()) !== "null") {
        var rootURL = '/ProjectStatusReportsSystem/rest/psrservices/createProjectservices/deleteProject';
        $.ajax({
            type: 'POST',
            url: rootURL,
            data: deleteprojectobject(),
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
                console.log(data);
                if (data === "CREATED") {
                    alert("suc delete");
                    loadhomepage();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    }
}

function deleteprojectobject() {
    var projectname = $('#projectnameDelete').val();
    var deleteprojectObj = null;
    if (projectname !== "") {
        deleteprojectObj = {
            createdprojectName: projectname
        };
        return JSON.stringify(deleteprojectObj);
    } else {
        return deleteprojectObj;
    }
}
