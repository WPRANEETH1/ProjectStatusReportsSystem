/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.onload = loadEngineerFunction();

function loadEngineerFunction() {
    var projectName = atob(location.search.split('projectName=')[1]);
    $('#projectname').val(projectName);
    $('#projectnameDelete').val("");
    var userName = $('#sessionusername').val();
    var rootURL = '/ProjectStatusReportsSystem/rest/psrservices/loadprojectdetailsservices';
    $.ajax({
        type: 'GET',
        url: rootURL + "/getProjectNameWithCategoryByManager",
        contentType: 'application/json',
        success: function (data, textStatus, jqXHR) {
            $('#firstWiFi').hide();
            $('#firstIBS').hide();
            $('#firstTrns').hide();
            $('#firstaccn').hide();
            $('#secondaccn').hide();
            $('#theardaccn').hide();
            $('#forthaccn').hide();
            $('#fiveaccn').hide();
            $('#sixaccn').hide();
            $('#sevenaccn').hide();
            $('#eightaccn').hide();
            $('#nineaccn').hide();
            $('#tenaccn').hide();
            if (data.smcp.length !== 0) {
                if (data.wifidata.length !== 0) {
                    $('#firstWiFi').show();
                    $('#firstWiFi').html("<a href='#' style='font-size:12px;color:black;width:90%' onclick='loadrightchartdata(" + JSON.stringify(data.wifidata[0].createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + data.wifidata[0].createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + data.wifidata[0].createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + data.wifidata[0].createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + data.wifidata[0].createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a>");
                } else {
                    $('#firstWiFi').remove();
                }
                if (data.ibsdata.length !== 0) {
                    $('#firstIBS').show();
                    $('#firstIBS').html("<a href='#' style='font-size:12px;color:black;width:90%' onclick='loadrightchartdata(" + JSON.stringify(data.ibsdata[0].createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + data.ibsdata[0].createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + data.ibsdata[0].createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + data.ibsdata[0].createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + data.ibsdata[0].createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a>");
                } else {
                    $('#firstIBS').remove();
                }
                var samllcellimplementation = "";
                samllcellimplementation = "";
                $.each(data.wifidata, function (x, tDataJson) {
                    if (x !== 0) {
                        samllcellimplementation += "<li><a href='#' style='font-size:12px;color:blue;width:90%' onclick='loadrightchartdata(" + JSON.stringify(tDataJson.createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + tDataJson.createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a></li>";
                    }
                });
                $.each(data.ibsdata, function (x, tDataJson) {
                    if (x !== 0) {
                        samllcellimplementation += "<li><a href='#' style='font-size:12px;color:blue;width:90%' onclick='loadrightchartdata(" + JSON.stringify(tDataJson.createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + tDataJson.createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a></li>";
                    }
                });
                $('#samllcellimplementation').html(samllcellimplementation);
            } else {
                $('#firstIBS').show();
                $('#firstIBS').html("<span style='color:red'>No existing project</span>");
                $('#firstWiFi').remove();
            }

            if (data.Transmission_Implementation.length !== 0) {
                $('#firstTrns').show();
                $('#firstTrns').html("<a href='#' style='font-size:12px;color:black;width:90%' onclick='loadrightchartdata(" + JSON.stringify(data.Transmission_Implementation[0].createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + data.Transmission_Implementation[0].createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + data.Transmission_Implementation[0].createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + data.Transmission_Implementation[0].createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + data.Transmission_Implementation[0].createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a>");
                var Transmission_Implementation = "";
                Transmission_Implementation = "";
                $.each(data.Transmission_Implementation, function (x, tDataJson) {
                    if (x !== 0) {
                        Transmission_Implementation += "<li><a href='#' style='font-size:12px;color:blue;width:90%' onclick='loadrightchartdata(" + JSON.stringify(tDataJson.createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + tDataJson.createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a></li>";
                    }
                });
                $('#Transmission_Implementation').html(Transmission_Implementation);
            } else {
                $('#firstTrns').show();
                $('#firstTrns').html("<span style='color:red'>No existing project</span>");
            }

            if (data.accn.length !== 0) {
                var accessnetwork = "";
                accessnetwork = "";
                if (data.Buffer_Stock_Huawei.length !== 0) {
                    $('#firstaccn').show();
                    $('#firstaccn').html("<a href='#' style='font-size:12px;color:black;width:90%' onclick='loadrightchartdata(" + JSON.stringify(data.Buffer_Stock_Huawei[0].createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + data.Buffer_Stock_Huawei[0].createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + data.Buffer_Stock_Huawei[0].createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + data.Buffer_Stock_Huawei[0].createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + data.Buffer_Stock_Huawei[0].createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a>");
                    $.each(data.Buffer_Stock_Huawei, function (x, tDataJson) {
                        if (x !== 0) {
                            accessnetwork += "<li><a href='#' style='font-size:12px;color:blue;width:90%' onclick='loadrightchartdata(" + JSON.stringify(tDataJson.createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + tDataJson.createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a></li>";
                        }
                    });
                } else {
                    $('#firstaccn').remove();
                }
                if (data.Buffer_Stock_ZTE.length !== 0) {
                    $('#secondaccn').show();
                    $('#secondaccn').html("<a href='#' style='font-size:12px;color:black;width:90%' onclick='loadrightchartdata(" + JSON.stringify(data.Buffer_Stock_ZTE[0].createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + data.Buffer_Stock_ZTE[0].createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + data.Buffer_Stock_ZTE[0].createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + data.Buffer_Stock_ZTE[0].createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + data.Buffer_Stock_ZTE[0].createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a>");
                    $.each(data.Buffer_Stock_ZTE, function (x, tDataJson) {
                        if (x !== 0) {
                            accessnetwork += "<li><a href='#' style='font-size:12px;color:blue;width:90%' onclick='loadrightchartdata(" + JSON.stringify(tDataJson.createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + tDataJson.createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a></li>";
                        }
                    });
                } else {
                    $('#secondaccn').remove();
                }
                if (data.Stage_VII.length !== 0) {
                    $('#theardaccn').show();
                    $('#theardaccn').html("<a href='#' style='font-size:12px;color:black;width:90%' onclick='loadrightchartdata(" + JSON.stringify(data.Stage_VII[0].createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + data.Stage_VII[0].createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + data.Stage_VII[0].createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + data.Stage_VII[0].createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + data.Stage_VII[0].createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a>");
                    $.each(data.Stage_VII, function (x, tDataJson) {
                        if (x !== 0) {
                            accessnetwork += "<li><a href='#' style='font-size:12px;color:blue;width:90%' onclick='loadrightchartdata(" + JSON.stringify(tDataJson.createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + tDataJson.createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a></li>";
                        }
                    });
                } else {
                    $('#theardaccn').remove();
                }
                if (data.Ericsson_DBC.length !== 0) {
                    $('#forthaccn').show();
                    $('#forthaccn').html("<a href='#' style='font-size:12px;color:black;width:90%' onclick='loadrightchartdata(" + JSON.stringify(data.Ericsson_DBC[0].createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + data.Ericsson_DBC[0].createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + data.Ericsson_DBC[0].createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + data.Ericsson_DBC[0].createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + data.Ericsson_DBC[0].createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a>");
                    $.each(data.Ericsson_DBC, function (x, tDataJson) {
                        if (x !== 0) {
                            accessnetwork += "<li><a href='#' style='font-size:12px;color:blue;width:90%' onclick='loadrightchartdata(" + JSON.stringify(tDataJson.createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + tDataJson.createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a></li>";
                        }
                    });
                } else {
                    $('#forthaccn').remove();
                }
                if (data.th_Sector_Installation.length !== 0) {
                    $('#fiveaccn').show();
                    $('#fiveaccn').html("<a href='#' style='font-size:12px;color:black;width:90%' onclick='loadrightchartdata(" + JSON.stringify(data.th_Sector_Installation[0].createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + data.th_Sector_Installation[0].createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + data.th_Sector_Installation[0].createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + data.th_Sector_Installation[0].createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + data.th_Sector_Installation[0].createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a>");
                    $.each(data.th_Sector_Installation, function (x, tDataJson) {
                        if (x !== 0) {
                            accessnetwork += "<li><a href='#' style='font-size:12px;color:blue;width:90%' onclick='loadrightchartdata(" + JSON.stringify(tDataJson.createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + tDataJson.createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a></li>";
                        }
                    });
                } else {
                    $('#fiveaccn').remove();
                }
                if (data.Small_Cell_Implementation.length !== 0) {
                    $('#sixaccn').show();
                    $('#sixaccn').html("<a href='#' style='font-size:12px;color:black;width:90%' onclick='loadrightchartdata(" + JSON.stringify(data.Small_Cell_Implementation[0].createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + data.Small_Cell_Implementation[0].createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + data.Small_Cell_Implementation[0].createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + data.Small_Cell_Implementation[0].createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + data.Small_Cell_Implementation[0].createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a>");
                    $.each(data.Small_Cell_Implementation, function (x, tDataJson) {
                        if (x !== 0) {
                            accessnetwork += "<li><a href='#' style='font-size:12px;color:blue;width:90%' onclick='loadrightchartdata(" + JSON.stringify(tDataJson.createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + tDataJson.createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a></li>";
                        }
                    });
                } else {
                    $('#sixaccn').remove();
                }
                if (data.Huawei_P1.length !== 0) {
                    $('#sevenaccn').show();
                    $('#sevenaccn').html("<a href='#' style='font-size:12px;color:black;width:90%' onclick='loadrightchartdata(" + JSON.stringify(data.Huawei_P1[0].createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + data.Huawei_P1[0].createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + data.Huawei_P1[0].createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + data.Huawei_P1[0].createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + data.Huawei_P1[0].createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a>");
                    $.each(data.Huawei_P1, function (x, tDataJson) {
                        if (x !== 0) {
                            accessnetwork += "<li><a href='#' style='font-size:12px;color:blue;width:90%' onclick='loadrightchartdata(" + JSON.stringify(tDataJson.createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + tDataJson.createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a></li>";
                        }
                    });
                } else {
                    $('#sevenaccn').remove();
                }
                if (data.Huawei_P2.length !== 0) {
                    $('#eightaccn').show();
                    $('#eightaccn').html("<a href='#' style='font-size:12px;color:black;width:90%' onclick='loadrightchartdata(" + JSON.stringify(data.Huawei_P2[0].createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + data.Huawei_P2[0].createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + data.Huawei_P2[0].createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + data.Huawei_P2[0].createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + data.Huawei_P2[0].createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a>");
                    $.each(data.Huawei_P2, function (x, tDataJson) {
                        if (x !== 0) {
                            accessnetwork += "<li><a href='#' style='font-size:12px;color:blue;width:90%' onclick='loadrightchartdata(" + JSON.stringify(tDataJson.createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + tDataJson.createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a></li>";
                        }
                    });
                } else {
                    $('#eightaccn').remove();
                }
                if (data.ZTE_P1.length !== 0) {
                    $('#nineaccn').show();
                    $('#nineaccn').html("<a href='#' style='font-size:12px;color:black;width:90%' onclick='loadrightchartdata(" + JSON.stringify(data.ZTE_P1[0].createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + data.ZTE_P1[0].createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + data.ZTE_P1[0].createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + data.ZTE_P1[0].createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + data.ZTE_P1[0].createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a>");
                    $.each(data.ZTE_P1, function (x, tDataJson) {
                        if (x !== 0) {
                            accessnetwork += "<li><a href='#' style='font-size:12px;color:blue;width:90%' onclick='loadrightchartdata(" + JSON.stringify(tDataJson.createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + tDataJson.createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a></li>";
                        }
                    });
                } else {
                    $('#nineaccn').remove();
                }
                if (data.ZTE_P2.length !== 0) {
                    $('#tenaccn').show();
                    $('#tenaccn').html("<a href='#' style='font-size:12px;color:black;width:90%' onclick='loadrightchartdata(" + JSON.stringify(data.ZTE_P2[0].createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + data.ZTE_P2[0].createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + data.ZTE_P2[0].createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + data.ZTE_P2[0].createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + data.ZTE_P2[0].createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a>");
                    $.each(data.ZTE_P2, function (x, tDataJson) {
                        if (x !== 0) {
                            accessnetwork += "<li><a href='#' style='font-size:12px;color:blue;width:90%' onclick='loadrightchartdata(" + JSON.stringify(tDataJson.createdprojectName) + ");'><ji><span><i class='glyphicon glyphicon glyphicon-ok-circle' > </i> " + tDataJson.createdprojectName + "<spann>Project Name</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectTotalscope + "<spann>Scope</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectStartDate + "<spann>Start date</spann></ji><ji>&nbsp; | " + tDataJson.createdprojectEndDate + "<spann>End date</spann></ji>&nbsp; | </a></li>";
                        }
                    });
                } else {
                    $('#tenaccn').remove();
                }
                accessnetwork += "</li>";
                $('#accessnetwork').html(accessnetwork);
            } else {
                $('#firstaccn').show();
                $('#firstaccn').html("<span style='color:red'>No existing project</span>");
                $('#secondaccn').remove();
                $('#theardaccn').remove();
                $('#forthaccn').remove();
                $('#fiveaccn').remove();
                $('#sixaccn').remove();
                $('#sevenaccn').remove();
                $('#eightaccn').remove();
                $('#nineaccn').remove();
                $('#tenaccn').remove();
            }
            $('.tree ul li:nth-child(2) li').hide();
            $('.tree ul li:nth-child(3) li').hide();
            $('.tree ul li:nth-child(4) li').hide();
            $('.tree ul li:nth-child(5) li').hide();
            $('.tree ul li:nth-child(6) li').hide();
            $('.tree ul li:nth-child(7) li').hide();
            $('.tree ul li:nth-child(8) li').hide();
            $('.tree ul li:nth-child(9) li').hide();
            $('.tree ul li:nth-child(10) li').hide();
            $('.tree ul li:nth-child(11) li').hide();
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

