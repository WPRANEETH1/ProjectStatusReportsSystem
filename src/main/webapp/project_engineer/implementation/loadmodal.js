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
    $('#profilepage').modal('hide');
    $('#projectProfile').modal('hide');
    $('#deleteproject').modal('hide');
    $('#managerworning').modal('hide');
    $('#success').modal('hide');
    var userrole = $('#userRole').val();
    if (userrole === "manager") {
        loadDashboardManager();
    }
    if (userrole === "engineer") {
        loadDashboardEngineer();
    }
});

function createproject() {
    var userrole = $('#userRole').val();
    if (userrole === "manager") {
        $('#managerworning').modal('show');
    }
    if (userrole === "engineer") {
        $('#createnewproject').modal('show');
    }
}

//function openExcelFile() {
//    $('#selectprojectname').modal('show');
//}

function refresh() {
    location.reload();
}

function loadProjectProfile() {
    $('#TTscope').val("");
    $('#TTstartdate').val("");
    $('#TTenddate').val("");
    var projectNName = $('#projectnameDelete').val();
    if (isNaN(projectNName) !== false) {
        $.ajax({
            type: 'GET',
            url: '/ProjectStatusReportsSystem/rest/psrservices/loadprojectdetailsservices/getImplementationDateByProjectName/' + projectNName,
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
                $('#TTscope').val(data[0].createdprojectTotalscope);
                $('#TTstartdate').val(data[0].createdprojectStartDate);
                $('#TTenddate').val(data[0].createdprojectEndDate);
                $('#projectProfile').modal('show');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error loadProjectProfile");
            }
        });
    }
}

function afterEditProProfObj() {
    var projectNName = $('#projectnameDelete').val();
    var scopeProjProf = $('#TTscope').val();
    var startDateProjProf = $('#TTstartdate').val();
    var endDateProj = $('#TTenddate').val();
    var editSaveProjProf = null;
    if (true) {
        editSaveProjProf = {
            createdprojectName: projectNName,
            createdprojectTotalscope: scopeProjProf,
            createdprojectStartDate: startDateProjProf,
            createdprojectEndDate: endDateProj
        };
        return JSON.stringify(editSaveProjProf);
    } else {
        return null;
    }
}

function saveabdEditProjectProf() {
    if (JSON.stringify(afterEditProProfObj()) !== "null") {
        $.ajax({
            type: 'POST',
            url: '/ProjectStatusReportsSystem/rest/psrservices/createProjectservices/updateProject',
            data: afterEditProProfObj(),
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
                if (data === "CREATED") {
                    $('#TTscope').val("");
                    $('#TTstartdate').val("");
                    $('#TTenddate').val("");
                    $('#projectProfile').modal('hide');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Erroe saveabdEditProjectProf");
            }
        });
    }
}

function openExcelFile() {
    var sessionusername = $('#sessionusername').val();
    var userRole = $('#userRole').val();
    if (userRole === "engineer") {
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
    if (userRole === "manager") {
        var rootURL = '/ProjectStatusReportsSystem/rest/psrservices/getexceldataservices';
        $.ajax({
            type: 'GET',
            url: rootURL + "/searchallprojectnameManager",
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
}

function reloadpageToloadexcelsheet() {
    var projectname = $('#allprojectname').val();
    window.location.replace("project_excelsheet.jsp?projectName=" + btoa(projectname) + "");
}

function loadhomepage() {
    var userRole = $('#userRole').val();
    if (userRole === "engineer") {
        window.location.replace("project_engineer.jsp?projectName=" + btoa(null) + "");
    }
    if (userRole === "manager") {
        window.location.replace("project_manager.jsp?projectName=" + btoa(null) + "");
    }
}

function deleteproject() {
    var deleteProName = $('#projectnameDelete').val();
    $('#infodetailsforDeleteproject').html("<p style='padding:10px'>Do you want to delete <b><u>" + deleteProName + "</u></b> tracker !...</p>");
    $('#deleteproject').modal('show');
}

function conformdeleteprojectsheet() {
    var userrole = $('#userRole').val();
    if (userrole === "manager") {
        $('#deleteproject').modal('hide');
        $('#managerworning').modal('show');
    }
    if (userrole === "engineer") {
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
//                    alert("suc delete");
                        loadhomepage();
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        }
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


function logoutengineer() {
    $.ajax({
        type: 'GET',
        url: "/ProjectStatusReportsSystem/rest/psrservices/logoutservices/logout",
//        data: deleteprojectobject(),
        contentType: 'application/json',
        success: function (data, textStatus, jqXHR) {
//                alert(data);                
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function profile() {
    var userName = $('#sessionusername').val();
    $.ajax({
        type: 'POST',
        url: "/ProjectStatusReportsSystem/rest/psrservices/loginservices/getUserData/" + userName,
//        data: deleteprojectobject(),
        contentType: 'application/json',
        success: function (data, textStatus, jqXHR) {
            $('#firstName').val(data[0].firstName);
            $('#firstName').css({'color': 'white'});
            $('#lastName').val(data[0].lastName);
            $('#lastName').css({'color': 'white'});
            $('#birthday').val(data[0].birthDay);
            $('#birthday').css({'color': 'white'});
            $('#department').val(data[0].department);
            $('#department').css({'color': 'white'});
            $('#contactnumber').val(data[0].tleNo);
            $('#contactnumber').css({'color': 'white'});
            $('#email').val(data[0].email);
            $('#email').css({'color': 'white'});

            $('#userNameForUpload').val(userName);
            $('#image-submit').hide();
            $('#profilepage').modal('show');
            $('#saveid').hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function profileEdit() {
    $('#saveid').show();
    $('#editid').hide();
    $('#firstName').prop('disabled', false);
    $('#firstName').css({'color': 'red'});
    $('#lastName').prop('disabled', false);
    $('#lastName').css({'color': 'red'});
    $('#birthday').prop('disabled', false);
    $('#birthday').css({'color': 'red'});
    $('#department').prop('disabled', false);
    $('#department').css({'color': 'red'});
    $('#contactnumber').prop('disabled', false);
    $('#contactnumber').css({'color': 'red'});
    $('#email').prop('disabled', false);
    $('#email').css({'color': 'red'});
}

function profileSave() {
    if (JSON.stringify(userprofileeditObj()) !== "null") {
        $.ajax({
            type: 'POST',
            url: "/ProjectStatusReportsSystem/rest/psrservices/loginservices/updateUserData",
            data: userprofileeditObj(),
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
                if (data === "CREATED") {
                    $('#firstName').prop('disabled', true);
                    $('#firstName').css({'color': 'white'});
                    $('#lastName').prop('disabled', true);
                    $('#lastName').css({'color': 'white'});
                    $('#birthday').prop('disabled', true);
                    $('#birthday').css({'color': 'white'});
                    $('#department').prop('disabled', true);
                    $('#department').css({'color': 'white'});
                    $('#contactnumber').prop('disabled', true);
                    $('#contactnumber').css({'color': 'white'});
                    $('#email').prop('disabled', true);
                    $('#email').css({'color': 'white'});
                    $('#saveid').hide();
                    $('#editid').show();
                    $('#nifo').text("success update!! ");
                    $('#mainnameLoged').text(JSON.parse(userprofileeditObj()).firstName + " " + JSON.parse(userprofileeditObj()).lastName);
                    $("#nifo").show().delay(1000).fadeOut();
                } else {
                    $('#saveid').hide();
                    $('#editid').show();
                    $('#nifo').text("Update not completed");
                    $("#nifo").show().delay(1000).fadeOut();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    } else {
        window.location.replace("index.jsp");
    }

}

function userprofileeditObj() {
    var userName = $('#sessionusername').val();
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var birthday = $('#birthday').val();
    var department = $('#department').val();
    var contactnumber = $('#contactnumber').val();
    var email = $('#email').val();

    var registerUser = null;
    if (firstName !== "" && lastName !== "" && userName !== "") {
        registerUser = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            birthDay: birthday,
            department: department,
            tleNo: contactnumber,
            email: email
        };
        return JSON.stringify(registerUser);
    } else {
        return registerUser;
    }
}

function closeupdate() {
    $('#saveid').hide();
    $('#editid').show();
}

$(document).ready(function () {
    $('#image-submit').hide();
    $('#span-image').click(function () {
        $('#image-submit').show();
    });
});

function info() {
    alert("info");
}


function exportExcel() {
    var projectName = $('#projectnameDelete').val();
    if (projectName !== "") {
        var rootURL = '/ProjectStatusReportsSystem/rest/psrservices/getexceldataservices';
        $.ajax({
            type: 'GET',
            url: rootURL + '/getexceldata/' + projectName,
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
                if (data[0].createdprojectData.length !== 0) {
                    if (data === '')
                        return;
                    JSONToCSVConvertor(data[0].createdprojectData, data[0].createdprojectName, true);
                } else {
                    alert("Please fill the data into tracker before export excel sheet!...");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    }
}

function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';
    //Set Report title in first row or line

    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV === '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function loadDashboardManager() {
    $.ajax({
        type: 'POST',
        url: '/ProjectStatusReportsSystem/rest/psrservices/getexceldataservices/mainManagerLoadDashboard',
        contentType: 'application/json',
        success: function (data, textStatus, jqXHR) {
            var val = 0;
            var name = "";
            for (i = 0; i < data.length; i++) {
                if (val <= data[i].createdprojectData.length) {
                    val = data[i].createdprojectData.length;
                    name = (data[i].createdprojectName);
                }
            }
            if (name !== "") {
                loadrightchartdata(name);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error loadDashboardManager");
        }
    });
}

function loadDashboardEngineer() {
    var userName = $('#sessionusername').val();
    var rootURL = '/ProjectStatusReportsSystem/rest/psrservices/getexceldataservices';
    $.ajax({
        type: 'POST',
        url: rootURL + "/mainEngineerLoadDashboard/" + userName,
        contentType: 'application/json',
        success: function (data, textStatus, jqXHR) {
//            console.log(data);
            var val = 0;
            var name = "";
            for (i = 0; i < data.length; i++) {
                if (val <= data[i].createdprojectData.length) {
                    val = data[i].createdprojectData.length;
                    name = (data[i].createdprojectName);
                }
            }
            if (name !== "") {
                loadrightchartdata(name);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Error loadDashboardManager");
        }
    });
}