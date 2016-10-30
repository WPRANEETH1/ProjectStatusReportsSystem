/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = logiremenberme();

function logiremenberme() {
    var checkval = $.cookie('checked_cooli');
    if (checkval === "true") {
        var username = $.cookie('username_cooki');
        var password = $.cookie('password_cooli');
        $('#userName').val(username);
        $('#passWord').val(password);
        $("#rememberme").prop('checked', true);
    }
}

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
                            if ($('#rememberme').is(":checked")) {
                                $.cookie('checked_cooli', true);
                                $.cookie('username_cooki', data.userName);
                                $.cookie('password_cooli', $('#passWord').val());
                            } else {
                                $.cookie('checked_cooli', null);
                                $.cookie('username_cooki', null);
                                $.cookie('password_cooli', null);
                            }
                            window.location.replace("project_engineer.jsp?projectName=" + btoa(null) + "");
                        } else if (data.userName !== null && data.userRole === "manager") {
                            if ($('#rememberme').is(":checked")) {
                                $.cookie('checked_cooli', true);
                                $.cookie('username_cooki', data.userName);
                                $.cookie('password_cooli', $('#passWord').val());
                            } else {
                                $.cookie('checked_cooli', null);
                                $.cookie('username_cooki', null);
                                $.cookie('password_cooli', null);
                            }
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
    var conformEmail = $('#conformemailReg').val();
    var email = $('#emailReg').val();

    var department = "Mobitel Eng Off";
    var image = "../../ProjectStatusReportsSystem/imageuplode/default-profile.png";
    var checkBy = "false";
    var userRole = "manager";

    var registerUser = null;
    if (firstName !== "" && lastName !== "" && userName !== "" && conformEmail !== "" && email !== "" && (conformEmail === email)) {
        registerUser = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
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
    var conformEmail = $('#conformemailReg').val();
    var email = $('#emailReg').val();
    if (JSON.stringify(registerUserObject()) !== "null") {
        $.ajax({
            type: 'POST',
            url: '/ProjectStatusReportsSystem/rest/psrservices/loginservices/createUserEngineer',
            data: registerUserObject(),
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
//            alert(data);
                if (data === "CREATED") {

                    var notify = $.notify('<strong>Saving</strong> Do not close this page...', {
                        allow_dismiss: false,
                        showProgressbar: true
                    });

                    setTimeout(function () {
                        notify.update({'type': 'success', 'message': '<strong>Success</strong> Your registation data has been saved!', 'progress': 50});
                    }, 6500);

                    $.ajax({
                        type: 'POST',
                        url: '/ProjectStatusReportsSystem/rest/psrservices/sendemailservices/sendMail/' + JSON.parse(registerUserObject()).userName,
                        contentType: 'application/json',
                        success: function (data, textStatus, jqXHR) {
                            if (data === "CREATED") {
                                $('#backlogin').trigger('click');
                                $.notify({
                                    icon: 'glyphicon glyphicon-star',
                                    message: "Your account has been successfully created. Please check your email for the instructions on how to conform your account!."                                    
                                }, {
                                    delay: 8000
                                });
                                resetform();
                            }
                        }, error: function (jqXHR, textStatus, errorThrown) {
                        }
                    });
//                    window.location.replace("index.jsp");
                } else if (data === "NOT_ACCEPTABLE") {
                    $.notify({
                        icon: 'glyphicon glyphicon-warning-sign',
                        title: "<strong>Sorry !: </strong> ",
                        message: " That username or E-mail is already taken..."
                    }, {
                        type: 'pastel-mywarning',
                        delay: 6000
                    });
//                    $('#usernameexist').text("User Name Already Exists!");
//                    $('#hidesubtitle').text("");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
//            alert("Error createdEngaccount");
            }
        });
    } else {
        if (conformEmail !== email) {
            $.notify({
                icon: 'glyphicon glyphicon-star',
                title: "<strong>Warning:</strong> ",
                message: "The email address do not match.."
            }, {
                type: 'pastel-mywarning',
                delay: 6000
            });
        }
        if (conformEmail === email) {
            $.notify({
                icon: 'glyphicon glyphicon-star',
                title: "<strong>Warning:</strong> ",
                message: "Please fill in all of the required fields"
            }, {
                type: 'pastel-myinfo',
                delay: 6000
            });
//        $('#usernameexist').text("Enter all fields!");
//        $('#hidesubtitle').text("");
        }
    }
}

function resetform() {
    $('#firstName').val("");
    $('#lastName').val("");
    $('#userNameReg').val("");
    $('#passWordReg').val("");
    $('#emailReg').val("");
}

function Retrieveemailfunction() {
    var Retrieveemail = $('#Retrieveemail').val();
    var valid = validateEmail(Retrieveemail);
    if (!valid) {
        $.notify({
            icon: 'glyphicon glyphicon-star',
            title: "<strong>Warning:</strong> ",
            message: "Cannot get information : mail is incorrect"
        }, {
            type: 'pastel-mywarning',
            delay: 6000
        });
    } else {
        $.ajax({
            type: 'POST',
            url: '/ProjectStatusReportsSystem/rest/psrservices/sendemailservices/retrieveInformation/' + Retrieveemail,
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
                if (data === "CREATED") {
                    $('#backlogin').trigger('click');
                    $('#Retrieveemail').val("");
                    $.notify({
                        icon: 'glyphicon glyphicon-star',
                        message: "Your request has been successfully received. Please check your email for view the information!."                        
                    }, {
                        delay: 8000
                    });
                }
                if (data === "NOT_ACCEPTABLE") {
                    $.notify({
                        icon: 'glyphicon glyphicon-star',
                        title: "<strong>Warning:</strong> ",
                        message: "The email is incorrect."
                    }, {
                        type: 'pastel-myinfo',
                        delay: 6000
                    });
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    }
}

var validateEmail = function (elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
};

var userName = document.getElementById("userName");
userName.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        loadLoginValidation();
    }
});

var passWord = document.getElementById("passWord");
passWord.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        loadLoginValidation();
    }
});