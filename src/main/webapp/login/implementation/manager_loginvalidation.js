/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function loginObject() {
    var userName = $('#userName').val();
    var passWord = $('#passWord').val();
    var UserLogin = null;
    if (userName !== "" && passWord !== "") {
        UserLogin = {
            userName: userName,
            passWord: passWord
        };
        return JSON.stringify(UserLogin);
    } else {
        return UserLogin;
    }
}
function loadLoginValidation() {
    var rootURL = '/ProjectStatusReportsSystem/rest/psrservices/loginservices/loginuser';
    if (JSON.stringify(loginObject()) !== "null") {
        $.ajax({
            type: 'POST',
            url: rootURL,
            data: loginObject(),
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
                if (data !== "EXPECTATION_FAILED") {
                    if (data !== "NOT_FOUND") {
                        if (data.userName !== null && data.userRole === "engineer") {
                            window.location.replace("project_engineer.jsp?projectName=" + btoa(null) + "");
                        } else if (data.userName !== null && data.userRole === "manager") {
                            window.location.replace("project_manager.jsp?projectName=" + btoa(null) + "");
                        } else {
                            window.location.replace("index.jsp");
                        }
                    } else {
                        reset();
                        $('#invalidusername').text("Invalid Username or Password");
                    }
                } else {
                    window.location.replace("404-page.jsp");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                reset();
                $('#invalidusername').text("Enter Username and Password");
            }
        });
    } else {
        $('#invalidusername').text("Enter Username and Password");
    }
}

function reset() {
    $('#userName').val("");
    $('#passWord').val("");
}



function registerUserObject() {
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var userName = $('#userNameReg').val();
    var passWord = $('#passWordReg').val();
    var email = $('#emailReg').val();

    var department = "Mobitel Eng Off";
    var image = "../../ProjectStatusReportsSystem/imageuplode/default-profile.png";
    var checkBy = "false";
    var userRole = "manager";

    var registerUser = null;
    if (firstName !== "" && lastName !== "" && userName !== "" && passWord !== "" && email !== "") {
        registerUser = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            passWord: passWord,
            email: email,
            department: department,
            image: image,
            checkBy: checkBy,
            userRole: userRole
        };
        return JSON.stringify(registerUser);
    } else {
        return registerUser;
    }
}

function createdEngaccount() {
    if (JSON.stringify(registerUserObject()) !== "null") {
        $.ajax({
            type: 'POST',
            url: '/ProjectStatusReportsSystem/rest/psrservices/loginservices/createUserEngineer',
            data: registerUserObject(),
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
//            alert(data);
                if (data === "CREATED") {
                    window.location.replace("index.jsp");
                } else if (data === "NOT_ACCEPTABLE") {
                    $('#usernameexist').text("User Name Already Exists!");
                    $('#hidesubtitle').text("");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
//            alert("Error createdEngaccount");
            }
        });
    } else {
        $('#usernameexist').text("Enter all fields!");
        $('#hidesubtitle').text("");
    }
}

