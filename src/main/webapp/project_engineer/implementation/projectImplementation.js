/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Highcharts, moment, google */

function loadrightchartdata(data) {
    $('#projectname').val(data);
    var pagenumber = $('#pagenumber').val();
    if (pagenumber === "1") {
        $('#sitelistTable').hide();
        $('#sitelistOptionDiv').hide();
        $('#IssuseTable').hide();
        var projectname = $("#projectname").val();
        if (projectname !== "null") {
            $('#datepickerbutton').show();
            $('#datebutton').show();
            $('#chartViewDivtag').show();
            Histrogram();
        }
    }
    if (pagenumber === "2") {
        $('#sitelistOptionDiv').hide();
        $('#datebutton').hide();
        $('#datepickerbutton').hide();
        $('#sitelistTable').hide();
        $('#IssuseTable').hide();
        var projectname = $("#projectname").val();
        if (projectname !== "null") {
            $('#chartViewDivtag').show();
            Piechart();
        }
    }
    if (pagenumber === "3") {
        $('#sitelistOptionDiv').hide();
        $('#datebutton').hide();
        $('#datepickerbutton').hide();
        $('#chartViewDivtag').show();
        $('#sitelistTable').hide();
        $('#IssuseTable').hide();
        Tree_View();
    }
    if (pagenumber === "4") {
        $('#datebutton').hide();
        $('#datepickerbutton').hide();
        $('#chartViewDivtag').hide();
        $('#IssuseTable').hide();
        var projectname = $("#projectname").val();
        if (projectname !== "null") {
            $('#sitelistOptionDiv').show();
            $('#sitelistTable').show();
            Site_List();
        }
    }
    if (pagenumber === "5") {
        $('#sitelistOptionDiv').hide();
        $('#datebutton').hide();
        $('#datepickerbutton').hide();
        $('#chartViewDivtag').hide();
        $('#sitelistTable').hide();
        var projectname = $("#projectname").val();
        if (projectname !== "null") {
            $('#IssuseTable').show();
            Issues();
        }
    }
    if (pagenumber === "6") {
        $('#sitelistOptionDiv').hide();
        $('#datebutton').hide();
        $('#datepickerbutton').hide();
        $('#chartViewDivtag').hide();
        $('#sitelistTable').hide();
        var projectname = $("#projectname").val();
        if (projectname !== "null") {
            $('#IssuseTable').show();
            Risks();
        }
    }
}

function Histrogram() {
    $('#chartViewDivtag').html("");
    var projectname = $("#projectname").val();
    var pagenumber = $('#pagenumber').val();
    if (projectname !== "null") {
        if (pagenumber === "1") {
            $.ajax({
                type: 'GET',
                url: '/ProjectStatusReportsSystem/rest/psrservices/loadprojectdetailsservices/getImplementationDateByProjectName/' + projectname,
                contentType: 'application/json',
                success: function (data, textStatus, jqXHR) {
                    if (data[0].createdprojectSubCategory === "IBS") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {
                                function findOnAir(fruit) {
                                    return fruit.Status === 'OnAir';
                                }
                                var allonair = data[0].createdprojectData.filter(findOnAir);
                                if (isNaN(allonair) !== false) {
                                    var onaliQ = jsonQ(allonair);
                                    var OnAir_Actual_Date = (onaliQ.find('OnAir_Actual_Date').value().sort());
                                    var OnAir_Target_Date = (onaliQ.find('OnAir_Target_Date').value().sort());
                                    if ((isNaN(OnAir_Target_Date) !== false) && (isNaN(OnAir_Actual_Date) !== false)) {
                                        if (OnAir_Target_Date.length !== 0) {
                                            var SystemDate = new Date().toJSON().slice(0, 10);
                                            for (i = 0; i < OnAir_Target_Date.length; i++) {
                                                var filteredOnAir_Target_Date = OnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(OnAir_Target_Date[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                });
                                            }
                                        }
                                        if (OnAir_Actual_Date.length !== 0) {
                                            var SystemDate = new Date().toJSON().slice(0, 10);
                                            for (i = 0; i < OnAir_Actual_Date.length; i++) {
                                                var filteredOnAir_Actual_Date = OnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(OnAir_Actual_Date[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                });
                                            }
                                        }
                                        var fullDateArray = filteredOnAir_Target_Date.concat(filteredOnAir_Actual_Date).sort();
                                        var timeValues = [];
                                        var ActualValues = [];
                                        var OnAir_TargetValues = [];
                                        var timeValuesBarHeightStart = [];
                                        var timeValuesBarHeightEnd = [];
                                        var dateStart = moment(fullDateArray[0]);
                                        var dateEnd = moment(fullDateArray[fullDateArray.length - 1]);
                                        while (dateEnd >= dateStart) {
                                            timeValues.push(dateStart.format('YYYY-MMMM'));
                                            timeValuesBarHeightStart.push(dateStart.format('YYYY-MM-01'));
                                            timeValuesBarHeightEnd.push(dateStart.format('YYYY-MM-31'));
                                            dateStart.add(1, 'month');
                                        }
                                        console.log(fullDateArray);
                                        console.log(timeValues);
                                        console.log(timeValuesBarHeightStart);
                                        console.log(timeValuesBarHeightEnd);
                                        for (i = 0; i < timeValues.length; i++) {
                                            var startDate = timeValuesBarHeightStart[0];
                                            var endDate = timeValuesBarHeightEnd[i];
                                            var CalculateArrayActual = filteredOnAir_Actual_Date.filter(function (item) {
                                                return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                            });
                                            var CalculateArrayOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                            });
                                            ActualValues.push(CalculateArrayActual.length);
                                            OnAir_TargetValues.push(CalculateArrayOnAir_Target.length);
                                        }


                                        $(function () {
                                            $('#chartViewDivtag').highcharts({
                                                chart: {
                                                    type: 'column'
                                                },
                                                title: {
                                                    text: 'Monthly OnAir Progress'
                                                },
                                                subtitle: {
                                                    text: 'Source:' + data[0].createdprojectName
                                                },
                                                xAxis: {
                                                    categories: timeValues,
                                                    crosshair: true
                                                },
                                                yAxis: {
                                                    min: 0,
                                                    title: {
                                                        text: 'No of Project'
                                                    }
                                                },
                                                tooltip: {
                                                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                                            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                                                    footerFormat: '</table>',
                                                    shared: true,
                                                    useHTML: true
                                                },
                                                plotOptions: {
                                                    column: {
                                                        pointPadding: 0.2,
                                                        borderWidth: 0
                                                    }
                                                },
                                                series: [{
                                                        name: 'On Air Target Date',
                                                        data: OnAir_TargetValues

                                                    }, {
                                                        name: 'On Air Actual Date',
                                                        data: ActualValues

                                                    }]
                                            });
                                        });
                                    }
                                    else {
                                        $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Not fill target date or onair actual date. .....</h2></div>");
                                    }
                                } else {
                                    $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No OnAir Data .....</h2></div>");
                                }
                            }
                            else {
                                $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                            }
                        } else {
                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>");
                        }
                    }
                    if (data[0].createdprojectSubCategory === "Wi-Fi") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                alert("Wi-Fi");//**********************************************************************************************
                            }
                            else {
                                $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                            }
                        } else {
                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>");
                        }
                    }
                    if (data[0].createdprojectSubCategory === "Transmission_Implementation") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                //alert("Transmission_Implementation");//**********************************************************************************************

                                function findOnAir(fruit) {
                                    return fruit.Status === 'OnAir';
                                }
                                var allonair = data[0].createdprojectData.filter(findOnAir);
                                if (isNaN(allonair) !== false) {
                                    var onaliQ = jsonQ(allonair);
                                    var OnAir_Actual_Date = (onaliQ.find('OnAir_Actual_Date').value().sort());
                                    var OnAir_Target_Date = (onaliQ.find('OnAir_Target_Date').value().sort());
                                    if ((isNaN(OnAir_Target_Date) !== false) && (isNaN(OnAir_Actual_Date) !== false)) {
                                        if (OnAir_Target_Date.length !== 0) {
                                            var SystemDate = new Date().toJSON().slice(0, 10);
                                            for (i = 0; i < OnAir_Target_Date.length; i++) {
                                                var filteredOnAir_Target_Date = OnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(OnAir_Target_Date[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                });
                                            }
                                        }
                                        if (OnAir_Actual_Date.length !== 0) {
                                            var SystemDate = new Date().toJSON().slice(0, 10);
                                            for (i = 0; i < OnAir_Actual_Date.length; i++) {
                                                var filteredOnAir_Actual_Date = OnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(OnAir_Actual_Date[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                });
                                            }
                                        }
                                        var fullDateArray = filteredOnAir_Target_Date.concat(filteredOnAir_Actual_Date).sort();
                                        var timeValues = [];
                                        var ActualValues = [];
                                        var OnAir_TargetValues = [];
                                        var timeValuesBarHeightStart = [];
                                        var timeValuesBarHeightEnd = [];
                                        var dateStart = moment(fullDateArray[0]);
                                        var dateEnd = moment(fullDateArray[fullDateArray.length - 1]);
                                        while (dateEnd >= dateStart) {
                                            timeValues.push(dateStart.format('YYYY-MMMM'));
                                            timeValuesBarHeightStart.push(dateStart.format('YYYY-MM-01'));
                                            timeValuesBarHeightEnd.push(dateStart.format('YYYY-MM-31'));
                                            dateStart.add(1, 'month');
                                        }
                                        console.log(fullDateArray);
                                        console.log(timeValues);
                                        console.log(timeValuesBarHeightStart);
                                        console.log(timeValuesBarHeightEnd);
                                        for (i = 0; i < timeValues.length; i++) {
                                            var startDate = timeValuesBarHeightStart[0];
                                            var endDate = timeValuesBarHeightEnd[i];
                                            var CalculateArrayActual = filteredOnAir_Actual_Date.filter(function (item) {
                                                return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                            });
                                            var CalculateArrayOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                            });
                                            ActualValues.push(CalculateArrayActual.length);
                                            OnAir_TargetValues.push(CalculateArrayOnAir_Target.length);
                                        }


                                        $(function () {
                                            $('#chartViewDivtag').highcharts({
                                                chart: {
                                                    type: 'column'
                                                },
                                                title: {
                                                    text: 'Monthly On Air Progress'
                                                },
                                                subtitle: {
                                                    text: 'Source:' + data[0].createdprojectName
                                                },
                                                xAxis: {
                                                    categories: timeValues,
                                                    crosshair: true
                                                },
                                                yAxis: {
                                                    min: 0,
                                                    title: {
                                                        text: 'No of Project'
                                                    }
                                                },
                                                tooltip: {
                                                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                                            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                                                    footerFormat: '</table>',
                                                    shared: true,
                                                    useHTML: true
                                                },
                                                plotOptions: {
                                                    column: {
                                                        pointPadding: 0.2,
                                                        borderWidth: 0
                                                    }
                                                },
                                                series: [{
                                                        name: 'On Air Target Date',
                                                        data: OnAir_TargetValues

                                                    }, {
                                                        name: 'On Air Actual Date',
                                                        data: ActualValues

                                                    }]
                                            });
                                        });
                                    }
                                    else {
                                        $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Not fill target date or onair actual date. .....</h2></div>");
                                    }
                                } else {
                                    $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No OnAir Data .....</h2></div>");
                                }
                            }
                            else {
                                $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                            }
                        } else {
                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>");
                        }
                    }
                    if (data[0].createdprojectCategory === "Access Network") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                alert("Access Network");//**********************************************************************************************

                            }
                            else {
                                $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                            }
                        } else {
                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>");
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error Histrogram");
                }
            });
        }
    }
}
//----------------------------------------------------------------------------------------------------------
function Piechart() {
    $('#chartViewDivtag').html("");
    var projectname = $("#projectname").val();
    var pagenumber = $('#pagenumber').val();
    if (projectname !== "null") {
        if (pagenumber === "2") {
            $.ajax({
                type: 'GET',
                url: '/ProjectStatusReportsSystem/rest/psrservices/loadprojectdetailsservices/getImplementationDateByProjectName/' + projectname,
                contentType: 'application/json',
                success: function (data, textStatus, jqXHR) {
                    if (data[0].createdprojectSubCategory === "IBS") {
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                var totalsocpe = data[0].createdprojectTotalscope;
                                var WIP = 0;
                                var TBS = 0;
                                var Discussion = 0;
                                var Not_HO = 0;
                                var OnAir = 0;
                                var Agreement_Pending_TBS = 0;
                                var Agreement_Pending_WIP = 0;
                                var TX_Pending = 0;
                                var Civil_Pending = 0;
                                var Power_Pending = 0;
                                var DAS = 0;
                                var Design_Completed = 0;
                                var Site_Owner_Approval_Pending = 0;
                                var Stage_1 = 0;
                                var Stage_2 = 0;
                                var Stage_3 = 0;
                                if (isNaN(StatusCount.OnAir) !== true) {
                                    OnAir = StatusCount.OnAir;
                                }
                                if (isNaN(StatusCount['Agreement Pending (WIP)']) !== true) {
                                    Agreement_Pending_WIP = StatusCount['Agreement Pending (WIP)'];
                                }
                                if (isNaN(StatusCount['TX Pending']) !== true) {
                                    TX_Pending = StatusCount['TX Pending'];
                                }
                                if (isNaN(StatusCount['Civil Pending']) !== true) {
                                    Civil_Pending = StatusCount['Civil Pending'];
                                }
                                if (isNaN(StatusCount['Power Pending']) !== true) {
                                    Power_Pending = StatusCount['Power Pending'];
                                }
                                if (isNaN(StatusCount.DAS) !== true) {
                                    DAS = StatusCount.DAS;
                                }
                                WIP = (Agreement_Pending_WIP + TX_Pending + Civil_Pending + Power_Pending + DAS);
                                if (isNaN(StatusCount['Agreement Pending (TBS)']) !== true) {
                                    Agreement_Pending_TBS = StatusCount['Agreement Pending (TBS)'];
                                }
                                if (isNaN(StatusCount['Site Owner Approval Pending']) !== true) {
                                    Site_Owner_Approval_Pending = StatusCount['Site Owner Approval Pending'];
                                }
                                if (isNaN(StatusCount['Design Completed']) !== true) {
                                    Design_Completed = StatusCount['Design Completed'];
                                }
                                TBS = (Agreement_Pending_TBS + Site_Owner_Approval_Pending + Design_Completed);
                                if (isNaN(StatusCount['Stage 1']) !== true) {
                                    Stage_1 = StatusCount['Stage 1'];
                                }
                                if (isNaN(StatusCount['Stage 2']) !== true) {
                                    Stage_2 = StatusCount['Stage 2'];
                                }
                                if (isNaN(StatusCount['Stage 3']) !== true) {
                                    Stage_3 = StatusCount['Stage 3'];
                                }
                                Discussion = (Stage_1 + Stage_2 + Stage_3);
                                Not_HO = (totalsocpe - (WIP + TBS + Discussion + OnAir));
                                var datapie = [];
                                if (WIP !== 0) {
                                    var wip = {name: 'WIP', y: ((WIP * 100) / totalsocpe), color: '#FF7F50'};
                                    datapie.push(wip);
                                }
                                if (TBS !== 0) {
                                    var tbs = {name: 'TBS', y: ((TBS * 100) / totalsocpe), color: '#5c5c61'};
                                    datapie.push(tbs);
                                }
                                if (Discussion !== 0) {
                                    var discussion = {name: 'Discussion', y: (Discussion * 100) / totalsocpe, color: '#65FF65'};
                                    datapie.push(discussion);
                                }
                                if (Not_HO !== 0) {
                                    var not_ho = {name: 'Not_HO', y: ((Not_HO * 100) / totalsocpe), color: '#95ceff'};
                                    datapie.push(not_ho);
                                }
                                if (OnAir !== 0) {
                                    var Onair = {name: 'OnAir', y: ((OnAir * 100) / totalsocpe), sliced: true, selected: true, color: '#00008B'};
                                    datapie.push(Onair);
                                }
                                console.log(datapie);
                                $(document).ready(function () {
                                    $(function () {
                                        $('#chartViewDivtag').highcharts({
                                            chart: {
                                                type: 'pie',
                                                options3d: {
                                                    enabled: true,
                                                    alpha: 45,
                                                    beta: 0
                                                }
                                            },
                                            title: {
                                                text: '<p style="color:blue">' + data[0].createdprojectName + '</p>'
                                            },
                                            subtitle: {
                                                text: 'Total Scope ' + totalsocpe
                                            },
                                            tooltip: {
                                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                            },
                                            plotOptions: {
                                                pie: {
                                                    allowPointSelect: true,
                                                    cursor: 'pointer',
                                                    depth: 35,
                                                    dataLabels: {
                                                        enabled: true,
                                                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                                                    }
                                                }
                                            },
                                            series: [{
                                                    type: 'pie',
                                                    name: '',
                                                    data: datapie
                                                }]
                                        });
                                    });
                                });
                            }
                            else {
                                $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                            }
                        } else {
                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                        }
                    }
                    if (data[0].createdprojectSubCategory === "Wi-Fi") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                alert("Wi-Fi");//**********************************************************************************************
                            }
                            else {
                                chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>";
                            }
                        } else {
                            chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>";
                        }
                        $('#chartViewDivtag').html(chartViewDivtag);
                    }
                    if (data[0].createdprojectSubCategory === "Transmission_Implementation") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                //alert("Transmission_Implementation");//**********************************************************************************************

                                var totalsocpe = data[0].createdprojectTotalscope;
                                var WIP = 0;
                                var On_Hold = 0;
                                var Cant_forcact = 0;
                                var Not_HO = 0;
                                var OnAir = 0;

                                if (isNaN(StatusCount.OnAir) !== true) {
                                    OnAir = StatusCount.OnAir;
                                }
                                if (isNaN(StatusCount.WIP) !== true) {
                                    WIP = StatusCount.WIP;
                                }
                                if (isNaN(StatusCount['Cannot Forecast']) !== true) {
                                    Cant_forcact = StatusCount['Cannot Forecast'];
                                }
                                if (isNaN(StatusCount['On Hold']) !== true) {
                                    On_Hold = StatusCount['On Hold'];
                                }
                                Not_HO = (totalsocpe - (WIP + On_Hold + Cant_forcact + OnAir));
                                var datapie = [];
                                if (WIP !== 0) {
                                    var wip = {name: 'WIP', y: ((WIP * 100) / totalsocpe), color: '#FF7F50'};
                                    datapie.push(wip);
                                }
                                if (Cant_forcact !== 0) {
                                    var cannot_forcast = {name: 'Cannot Forcast', y: ((Cant_forcact * 100) / totalsocpe), color: '#757A77'};
                                    datapie.push(cannot_forcast);
                                }
                                if (On_Hold !== 0) {
                                    var on_hold = {name: 'On_Hold', y: (On_Hold * 100) / totalsocpe, color: '#7FFF00'};
                                    datapie.push(on_hold);
                                }
                                if (Not_HO !== 0) {
                                    var not_ho = {name: 'Not_HO', y: ((Not_HO * 100) / totalsocpe), color: '#95ceff'};
                                    datapie.push(not_ho);
                                }
                                if (OnAir !== 0) {
                                    var Onair = {name: 'OnAir', y: ((OnAir * 100) / totalsocpe), sliced: true, selected: true, color: '#00008B'};
                                    datapie.push(Onair);
                                }
                                console.log(datapie);
                                $(document).ready(function () {
                                    $(function () {
                                        $('#chartViewDivtag').highcharts({
                                            chart: {
                                                type: 'pie',
                                                options3d: {
                                                    enabled: true,
                                                    alpha: 45,
                                                    beta: 0
                                                }
                                            },
                                            title: {
                                                text: '<p style="color:blue">' + data[0].createdprojectName + '</p>'
                                            },
                                            subtitle: {
                                                text: 'Total Scope ' + totalsocpe
                                            },
                                            tooltip: {
                                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                            },
                                            plotOptions: {
                                                pie: {
                                                    allowPointSelect: true,
                                                    cursor: 'pointer',
                                                    depth: 35,
                                                    dataLabels: {
                                                        enabled: true,
                                                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                                                    }
                                                }
                                            },
                                            series: [{
                                                    type: 'pie',
                                                    name: '',
                                                    data: datapie
                                                }]
                                        });
                                    });
                                });

                            }
                            else {
                                $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                            }
                        } else {
                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>");
                        }
                    }
                    if (data[0].createdprojectCategory === "Access Network") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                alert("Access Network");//**********************************************************************************************

                            }
                            else {
                                chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>";
                            }
                        } else {
                            chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>";
                        }
                        $('#chartViewDivtag').html(chartViewDivtag);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error Tree_View");
                }
            });
        }
    }
}
//-------------------------------------------------------------------------------------------------------------
function Tree_View() {
    $('#chartViewDivtag').html("");
    $('#chartViewDivtag').html("");
    var projectname = $("#projectname").val();
    var pagenumber = $('#pagenumber').val();
    if (projectname !== "null") {
        if (pagenumber === "3") {
            $.ajax({
                type: 'GET',
                url: '/ProjectStatusReportsSystem/rest/psrservices/loadprojectdetailsservices/getImplementationDateByProjectName/' + projectname,
                contentType: 'application/json',
                success: function (data, textStatus, jqXHR) {
                    if (data[0].createdprojectSubCategory === "IBS") {
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                var totalsocpe = data[0].createdprojectTotalscope;
                                var WIP = 0;
                                var TBS = 0;
                                var Discussion = 0;
                                var Not_HO = 0;
                                var HO = 0;
                                var OnAir = 0;
                                var Pending = 0;
                                var Agreement_Pending_TBS = 0;
                                var Agreement_Pending_WIP = 0;
                                var TX_Pending = 0;
                                var Civil_Pending = 0;
                                var Power_Pending = 0;
                                var DAS = 0;
                                var Design_Completed = 0;
                                var Site_Owner_Approval_Pending = 0;
                                var Stage_1 = 0;
                                var Stage_2 = 0;
                                var Stage_3 = 0;
                                if (isNaN(StatusCount.OnAir) !== true) {
                                    OnAir = StatusCount.OnAir;
                                }
                                if (isNaN(StatusCount['Agreement Pending (WIP)']) !== true) {
                                    Agreement_Pending_WIP = StatusCount['Agreement Pending (WIP)'];
                                }
                                if (isNaN(StatusCount['TX Pending']) !== true) {
                                    TX_Pending = StatusCount['TX Pending'];
                                }
                                if (isNaN(StatusCount['Civil Pending']) !== true) {
                                    Civil_Pending = StatusCount['Civil Pending'];
                                }
                                if (isNaN(StatusCount['Power Pending']) !== true) {
                                    Power_Pending = StatusCount['Power Pending'];
                                }
                                if (isNaN(StatusCount.DAS) !== true) {
                                    DAS = StatusCount.DAS;
                                }
                                WIP = (Agreement_Pending_WIP + TX_Pending + Civil_Pending + Power_Pending + DAS);
                                if (isNaN(StatusCount['Agreement Pending (TBS)']) !== true) {
                                    Agreement_Pending_TBS = StatusCount['Agreement Pending (TBS)'];
                                }
                                if (isNaN(StatusCount['Site Owner Approval Pending']) !== true) {
                                    Site_Owner_Approval_Pending = StatusCount['Site Owner Approval Pending'];
                                }
                                if (isNaN(StatusCount['Design Completed']) !== true) {
                                    Design_Completed = StatusCount['Design Completed'];
                                }
                                TBS = (Agreement_Pending_TBS + Site_Owner_Approval_Pending + Design_Completed);
                                if (isNaN(StatusCount['Stage 1']) !== true) {
                                    Stage_1 = StatusCount['Stage 1'];
                                }
                                if (isNaN(StatusCount['Stage 2']) !== true) {
                                    Stage_2 = StatusCount['Stage 2'];
                                }
                                if (isNaN(StatusCount['Stage 3']) !== true) {
                                    Stage_3 = StatusCount['Stage 3'];
                                }
                                Discussion = (Stage_1 + Stage_2 + Stage_3);
                                Pending = (WIP + TBS + Discussion);
                                HO = (OnAir + Pending);
                                Not_HO = (totalsocpe - HO);
                                var projectName = "<b>" + data[0].createdprojectName + "</b><br>" + totalsocpe;
                                var handover = "<b>Handed Over</b><br>" + HO;
                                var nothandover = "<b>Not Handed Over</b><br>" + Not_HO;
                                var on_air = "<b>On Air</b><br>" + OnAir;
                                var pending = "<b>Pending</b><br>" + Pending;
                                var wip_tot = "WIP<br>" + WIP;
                                var tbs_tot = "TBS<br>" + TBS;
                                var discussion_tot = "Discussion<br>" + Discussion;
                                var agreementpending_wip = "Agreement Pending(WIP)<br>" + Agreement_Pending_WIP;
                                var txpending = "TX Pending<br>" + TX_Pending;
                                var civilpending = "Civil Pending<br>" + Civil_Pending;
                                var powerpending = "Power Pending<br>" + Power_Pending;
                                var das = "DAS<br>" + DAS;
                                var agreementpending_tbs = "Agreement Pending(TBS)<br>" + Agreement_Pending_TBS;
                                var designcompleted = "Design Completed<br>" + Design_Completed;
                                var siteownerapprovedpending = "Site Owner Approval Pending<br>" + Site_Owner_Approval_Pending;
                                var stg1 = "Stage 1<br>" + Stage_1;
                                var stg2 = "Stage 2<br>" + Stage_2;
                                var stg3 = "Stage 3<br>" + Stage_3;
                                var treeDataIBS = [];
                                treeDataIBS.push([projectName, '']);
                                treeDataIBS.push([handover, projectName]);
                                treeDataIBS.push([nothandover, projectName]);
                                treeDataIBS.push([on_air, handover]);
                                treeDataIBS.push([pending, handover]);
                                treeDataIBS.push([wip_tot, pending]);
                                treeDataIBS.push([tbs_tot, pending]);
                                treeDataIBS.push([discussion_tot, pending]);

                                treeDataIBS.push([agreementpending_wip, wip_tot]);
                                treeDataIBS.push([txpending, agreementpending_wip]);
                                treeDataIBS.push([civilpending, txpending]);

                                treeDataIBS.push([powerpending, wip_tot]);
                                treeDataIBS.push([das, powerpending]);

                                treeDataIBS.push([stg1, discussion_tot]);
                                treeDataIBS.push([stg2, stg1]);
                                treeDataIBS.push([stg3, stg2]);
                                treeDataIBS.push([agreementpending_tbs, tbs_tot]);
                                treeDataIBS.push([designcompleted, agreementpending_tbs]);
                                treeDataIBS.push([siteownerapprovedpending, designcompleted]);
                                console.log(projectName);
                                var data = new google.visualization.DataTable();
                                data.addColumn('string', 'Node');
                                data.addColumn('string', 'Parent');
                                data.addRows(treeDataIBS);
                                var chart = new google.visualization.OrgChart(document.getElementById('chartViewDivtag'));
                                chart.draw(data, {allowHtml: true});
                            }
                            else {
                                $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                            }
                        } else {
                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>");
                        }
                    }
                    if (data[0].createdprojectSubCategory === "Wi-Fi") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                alert("Wi-Fi");//**********************************************************************************************
                            }
                            else {
                                chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>";
                            }
                        } else {
                            chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>";
                        }
                        $('#chartViewDivtag').html(chartViewDivtag);
                    }
                    if (data[0].createdprojectSubCategory === "Transmission_Implementation") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                //alert("Transmission_Implementation");//**********************************************************************************************

                                var totalsocpe = data[0].createdprojectTotalscope;
                                var WIP = 0;
                                var On_Hold = 0;
                                var Cant_forcact = 0;
                                var Not_HO = 0;
                                var OnAir = 0;

                                if (isNaN(StatusCount.OnAir) !== true) {
                                    OnAir = StatusCount.OnAir;
                                }
                                if (isNaN(StatusCount.WIP) !== true) {
                                    WIP = StatusCount.WIP;
                                }
                                if (isNaN(StatusCount['Cannot Forecast']) !== true) {
                                    Cant_forcact = StatusCount['Cannot Forecast'];
                                }
                                if (isNaN(StatusCount['On Hold']) !== true) {
                                    On_Hold = StatusCount['On Hold'];
                                }
                                Not_HO = (totalsocpe - (WIP + On_Hold + Cant_forcact + OnAir));

                                var Pending = 0;
                                var HO = 0;
                                Pending = (WIP + On_Hold + Cant_forcact);
                                HO = Pending + OnAir;

                                var projectName = "<b>" + data[0].createdprojectName + "</b><br>" + totalsocpe;
                                var handover = "<b>Handed Over</b><br>" + HO;
                                var nothandover = "<b>Not Handed Over</b><br>" + Not_HO;
                                var on_air = "<b>On Air</b><br>" + OnAir;
                                var pending = "<b>Pending</b><br>" + Pending;
                                var wip_tot = "WIP<br>" + WIP;
                                var On_hold_tot = "On Hold<br>" + On_Hold;
                                var cannot_forcast_tot = "Can't Forcast<br>" + Cant_forcact;
                                var treeDataIBS = [];
                                treeDataIBS.push([projectName, '']);
                                treeDataIBS.push([handover, projectName]);
                                treeDataIBS.push([nothandover, projectName]);
                                treeDataIBS.push([on_air, handover]);
                                treeDataIBS.push([pending, handover]);
                                treeDataIBS.push([wip_tot, pending]);
                                treeDataIBS.push([On_hold_tot, wip_tot]);
                                treeDataIBS.push([cannot_forcast_tot, On_hold_tot]);
                                var data = new google.visualization.DataTable();
                                data.addColumn('string', 'Node');
                                data.addColumn('string', 'Parent');
                                data.addRows(treeDataIBS);
                                var chart = new google.visualization.OrgChart(document.getElementById('chartViewDivtag'));
                                chart.draw(data, {allowHtml: true});
                            }
                            else {
                                $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                            }
                        } else {
                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>");
                        }
                    }
                    if (data[0].createdprojectCategory === "Access Network") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                alert("Access Network");//**********************************************************************************************

                            }
                            else {
                                chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>";
                            }
                        } else {
                            chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>";
                        }
                        $('#chartViewDivtag').html(chartViewDivtag);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error Tree_View");
                }
            });
        }
    }
}

//--------------------------------------------------------------------------------------------------------------
function Site_List() {
    var projectname = $("#projectname").val();
    var pagenumber = $('#pagenumber').val();
    if (projectname !== "null") {
        if (pagenumber === "4") {
            $.ajax({
                type: 'GET',
                url: '/ProjectStatusReportsSystem/rest/psrservices/loadprojectdetailsservices/getImplementationDateByProjectName/' + projectname,
                contentType: 'application/json',
                success: function (data, textStatus, jqXHR) {
                    $("#sitelistOptionDiv").empty("");
                    $('#datatable-buttons').html("");
                    var msgSiteList = "";
                    if (isNaN(data[0].createdprojectData) !== false) {
                        var StatusData = jsonQ(data[0].createdprojectData);
                        var AllStatesData = StatusData.find('Status');
                        var StatusCount = {};
                        AllStatesData.value().forEach(function (i) {
                            StatusCount[i] = (StatusCount[i] || 0) + 1;
                        });
                        var StatusCategory = [];
                        for (var key in StatusCount) {
                            if (StatusCount.hasOwnProperty(key)) {
                                StatusCategory.push(key);
                            }
                        }
                        $("#sitelistOptionDiv").empty();
                        $("#sitelistOptionDiv").append("<option value='OnAir' name='OnAir'>OnAir</option>");
                        $.each(StatusCategory, function (index, optiondata) {
                            if (optiondata !== "OnAir" && optiondata !== "undefined") {
                                $("#sitelistOptionDiv").append("<option value='" + ((optiondata)) + "' name='" + (optiondata) + "'>" + (optiondata) + "</option>");
                            }
                        });
                        function findOnAir(fruit) {
                            return fruit.Status === 'OnAir';
                        }
                        var allOnAir = data[0].createdprojectData.filter(findOnAir);
                        if (isNaN(allOnAir) !== false) {
                            var OnAirSiteList = allOnAir.sort(function (a, b) {
                                return new Date(a.OnAir_Actual_Date) < new Date(b.OnAir_Actual_Date) ? 1 : -1;
                                ;
                            });
                            msgSiteList = "<thead><tr bgcolor='#C0C0C0'>"
                                    + "<th>No</th>"
                                    + "<th>Site Id</th>"
                                    + "<th>Site Name</th>"
                                    + "<th>Region</th>"
                                    + "<th style='text-align:center'>OnAir Actual Date</th>"
                                    + "</tr></thead>";
                            var currentDate = new Date().toJSON().slice(0, 10);
                            $.each(OnAirSiteList, function (x, tDataJson) {
                                msgSiteList += "<tbody>";
                                if (tDataJson.OnAir_Actual_Date <= currentDate) {
                                    msgSiteList += "<tr>"
                                            + "<td>" + (x + 1) + "</td>"
                                            + "<td>" + tDataJson.Site_ID + "</td>"
                                            + "<td>" + tDataJson.Site_Name + "</td>"
                                            + "<td align='center'>" + tDataJson.Region + "</td>"
                                            + "<td align='center'>" + tDataJson.OnAir_Actual_Date + "</td>"
                                            + "</tr></tbody>";
                                }
                                if (tDataJson.OnAir_Actual_Date > currentDate) {
                                    msgSiteList += "<tr>"
                                            + "<td style='background-color:#FA8258'>" + (x + 1) + "</td>"
                                            + "<td style='background-color:#FA8258'>" + tDataJson.Site_ID + "</td>"
                                            + "<td style='background-color:#FA8258'>" + tDataJson.Site_Name + "</td>"
                                            + "<td align='center' style='background-color:#FA8258'>" + tDataJson.Region + "</td>"
                                            + "<td align='center' style='background-color:#FA8258'>" + tDataJson.OnAir_Actual_Date + "</td>"
                                            + "</tr>";
                                }
                                msgSiteList += "</tbody>";
                                if (x === 9) {
                                    return false;
                                }
                            });
//                            console.log(StatusCategory);
//                            console.log(OnAirSiteList);
                        } else {
                            msgSiteList = "<div style='padding:150px'><h2 style='color:red'>No OnAir Data .....</h2></div>";
                        }

                    } else {
                        msgSiteList = "<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>";
                    }
                    $('#datatable-buttons').html(msgSiteList);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error Site_List");
                }
            });
        }
    }
}

function loadListOther(nameStatus) {
    var projectname = $("#projectname").val();
    var pagenumber = $('#pagenumber').val();
    if (projectname !== "null") {
        if (pagenumber === "4") {
            $.ajax({
                type: 'GET',
                url: '/ProjectStatusReportsSystem/rest/psrservices/loadprojectdetailsservices/getImplementationDateByProjectName/' + projectname,
                contentType: 'application/json',
                success: function (data, textStatus, jqXHR) {
                    $("#sitelistOptionDiv").empty("");
                    $('#datatable-buttons').html("");
                    var msgSiteList = "";
                    if (isNaN(data[0].createdprojectData) !== false) {
                        var StatusData = jsonQ(data[0].createdprojectData);
                        var AllStatesData = StatusData.find('Status');
                        var StatusCount = {};
                        AllStatesData.value().forEach(function (i) {
                            StatusCount[i] = (StatusCount[i] || 0) + 1;
                        });
                        var StatusCategory = [];
                        for (var key in StatusCount) {
                            if (StatusCount.hasOwnProperty(key)) {
                                StatusCategory.push(key);
                            }
                        }
                        $("#sitelistOptionDiv").empty();
                        $("#sitelistOptionDiv").append("<option value='OnAir' name='OnAir'>OnAir</option>");
                        $.each(StatusCategory, function (index, optiondata) {
                            if (optiondata !== nameStatus && optiondata !== "undefined") {
                                $("#sitelistOptionDiv").append("<option value='" + ((optiondata)) + "' name='" + (optiondata) + "'>" + (optiondata) + "</option>");
                            }
                        });
                        function findOnAir(fruit) {
                            return fruit.Status === nameStatus;
                        }
                        var allOnAir = data[0].createdprojectData.filter(findOnAir);
                        if (isNaN(allOnAir) !== false) {
                            var OnAirSiteList = allOnAir.sort(function (a, b) {
                                return new Date(a.OnAir_Actual_Date) < new Date(b.OnAir_Actual_Date) ? 1 : -1;
                                ;
                            });
                            msgSiteList = "<thead><tr bgcolor='#C0C0C0'>"
                                    + "<th>No</th>"
                                    + "<th>Site Id</th>"
                                    + "<th>Site Name</th>"
                                    + "<th>Region</th>"
                                    + "<th style='text-align:center'>OnAir Actual Date</th>"
                                    + "</tr></thead>";
                            var currentDate = new Date().toJSON().slice(0, 10);
                            $.each(OnAirSiteList, function (x, tDataJson) {
                                msgSiteList += "<tbody>";
                                if (tDataJson.OnAir_Actual_Date <= currentDate) {
                                    msgSiteList += "<tr>"
                                            + "<td>" + (x + 1) + "</td>"
                                            + "<td>" + tDataJson.Site_ID + "</td>"
                                            + "<td>" + tDataJson.Site_Name + "</td>"
                                            + "<td align='center'>" + tDataJson.Region + "</td>"
                                            + "<td align='center'>" + tDataJson.OnAir_Actual_Date + "</td>"
                                            + "</tr></tbody>";
                                }
                                if (tDataJson.OnAir_Actual_Date > currentDate) {
                                    msgSiteList += "<tr>"
                                            + "<td style='background-color:#FA8258'>" + (x + 1) + "</td>"
                                            + "<td style='background-color:#FA8258'>" + tDataJson.Site_ID + "</td>"
                                            + "<td style='background-color:#FA8258'>" + tDataJson.Site_Name + "</td>"
                                            + "<td align='center' style='background-color:#FA8258'>" + tDataJson.Region + "</td>"
                                            + "<td align='center' style='background-color:#FA8258'>" + tDataJson.OnAir_Actual_Date + "</td>"
                                            + "</tr>";
                                }
                                msgSiteList += "</tbody>";
                                if (x === 9) {
                                    return false;
                                }
                            });
//                            console.log(StatusCategory);
//                            console.log(OnAirSiteList);
                        } else {
                            msgSiteList = "<div style='padding:150px'><h2 style='color:red'>No OnAir Data .....</h2></div>";
                        }

                    } else {
                        msgSiteList = "<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>";
                    }
                    $('#datatable-buttons').html(msgSiteList);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error Site_List");
                }
            });
        }
    }
}

$(document).ready(function () {
    $("select.selectOption").change(function () {
        var selectedValue = $(".selectOption option:selected").val();
        var projectname = $("#projectname").val();
        var pagenumber = $('#pagenumber').val();
        if (projectname !== "null") {
            if (pagenumber === "4") {
                if (selectedValue === "OnAir") {
                    Site_List();
                }
                if (selectedValue === "OnAir & POC") {
                    loadListOther(selectedValue);
                }
                if (selectedValue === "OnAir & Removed") {
                    loadListOther(selectedValue);
                }
                if (selectedValue === "OnAir & Blocked") {
                    loadListOther(selectedValue);
                }
                if (selectedValue !== "OnAir" && selectedValue !== "OnAir & POC" && selectedValue !== "OnAir & Removed" && selectedValue !== "OnAir & Blocked") {
                    $.ajax({
                        type: 'GET',
                        url: '/ProjectStatusReportsSystem/rest/psrservices/loadprojectdetailsservices/getImplementationDateByProjectName/' + projectname,
                        contentType: 'application/json',
                        success: function (data, textStatus, jqXHR) {
                            $("#sitelistOptionDiv").empty("");
                            $('#datatable-buttons').html("");
                            var msgSiteList = "";
                            if (isNaN(data[0].createdprojectData) !== false) {
                                var StatusData = jsonQ(data[0].createdprojectData);
                                var AllStatesData = StatusData.find('Status');
                                var StatusCount = {};
                                AllStatesData.value().forEach(function (i) {
                                    StatusCount[i] = (StatusCount[i] || 0) + 1;
                                });
                                var StatusCategory = [];
                                for (var key in StatusCount) {
                                    if (StatusCount.hasOwnProperty(key)) {
                                        StatusCategory.push(key);
                                    }
                                }
                                $("#sitelistOptionDiv").empty();
                                $("#sitelistOptionDiv").append("<option value='" + selectedValue + "' name='" + selectedValue + "'>" + selectedValue + "</option>");
                                $.each(StatusCategory, function (index, optiondata) {
                                    if (optiondata !== selectedValue && optiondata !== "undefined") {
                                        $("#sitelistOptionDiv").append("<option value='" + ((optiondata)) + "' name='" + (optiondata) + "'>" + (optiondata) + "</option>");
                                    }
                                });
                                function findOnAir(fruit) {
                                    return fruit.Status === selectedValue;
                                }
                                var allOnAir = data[0].createdprojectData.filter(findOnAir);
                                if (isNaN(allOnAir) !== false) {
                                    var OnAirargetSiteList = allOnAir.sort(function (a, b) {
                                        return new Date(a.OnAir_Target_Date) < new Date(b.OnAir_Target_Date) ? 1 : -1;
                                        ;
                                    });
                                    msgSiteList = "<thead><tr bgcolor='#C0C0C0'>"
                                            + "<th>No</th>"
                                            + "<th>Site Id</th>"
                                            + "<th>Site Name</th>"
                                            + "<th>Region</th>"
                                            + "<th style='text-align:center'>OnAir Target Date</th>"
                                            + "</tr></thead>";
                                    var currentDate = new Date().toJSON().slice(0, 10);
                                    $.each(OnAirargetSiteList, function (x, tDataJson) {
                                        msgSiteList += "<tbody>";
                                        if (tDataJson.OnAir_Target_Date <= currentDate) {
                                            msgSiteList += "<tr>"
                                                    + "<td>" + (x + 1) + "</td>"
                                                    + "<td>" + tDataJson.Site_ID + "</td>"
                                                    + "<td>" + tDataJson.Site_Name + "</td>"
                                                    + "<td align='center'>" + tDataJson.Region + "</td>"
                                                    + "<td align='center'>" + tDataJson.OnAir_Target_Date + "</td>"
                                                    + "</tr></tbody>";
                                        }
                                        if (tDataJson.OnAir_Target_Date > currentDate) {
                                            msgSiteList += "<tr>"
                                                    + "<td style='background-color:#FA8258'>" + (x + 1) + "</td>"
                                                    + "<td style='background-color:#FA8258'>" + tDataJson.Site_ID + "</td>"
                                                    + "<td style='background-color:#FA8258'>" + tDataJson.Site_Name + "</td>"
                                                    + "<td align='center' style='background-color:#FA8258'>" + tDataJson.Region + "</td>"
                                                    + "<td align='center' style='background-color:#FA8258'>" + tDataJson.OnAir_Target_Date + "</td>"
                                                    + "</tr>";
                                        }
                                        msgSiteList += "</tbody>";
                                        if (x === 9) {
                                            return false;
                                        }
                                    });
//                            console.log(StatusCategory);
//                            console.log(OnAirSiteList);
                                } else {
                                    msgSiteList = "<div style='padding:150px'><h2 style='color:red'>No OnAir Data .....</h2></div>";
                                }

                            } else {
                                msgSiteList = "<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>";
                            }
                            $('#datatable-buttons').html(msgSiteList);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            alert("Error Site_List");
                        }
                    });
                }
            }
        }
    });
});
//--------------------------------------------------------------------------------------------------------------------
function Issues() {
    $('#issuetable').html("");
    $('#issuescloced').html("");
    $('#openName').text("Key Issues (Open)");
    $('#closedName').text("Key Issues (Closed)");
    var projectname = $("#projectname").val();
    var pagenumber = $('#pagenumber').val();
    if (projectname !== "null") {
        if (pagenumber === "5") {
            $.ajax({
                type: 'POST',
                url: '/ProjectStatusReportsSystem/rest/psrservices/issuesServices/getAllissuesData/' + projectname,
//                data: loginObject(),
                contentType: 'application/json',
                success: function (data, textStatus, jqXHR) {
                    var issuetable = "";
                    var issuescloced = "";
                    if (data.length !== 0) {
                        var z = 0;
                        var y = 0;
                        $.each(data, function (x, tDataJson) {
                            if (tDataJson.issuesType === "false") {
                                y = (y + 1);
                                issuetable += "<tr><td align='center'>" + (y) + "</td>"
                                        + "<td>" + tDataJson.issuesDescription + "</td>"
                                        + "" + tDataJson.issuesRank + ""
                                        + "<td style='color:green' align='center'><a href='#' style='color:green' onclick='return editIssues(" + JSON.stringify(tDataJson.issuesId) + ");'><i class='glyphicon glyphicon-edit'></i></a></td>"
                                        + "<td style='color:red' align='center'><a href='#' style='color:red' onclick='return deleteIssues(" + JSON.stringify(tDataJson.issuesId) + ");'><i class='glyphicon glyphicon-trash'></i></a></td>"
                                        + "<td style='color:blue' align='center'><a href='#' onclick='return closedIssues(" + JSON.stringify(tDataJson.issuesId) + ");'><i class='glyphicon glyphicon-remove'></i></a></td>"
                                        + "</tr>";
                            }
                            if (tDataJson.issuesType === "true") {
                                z = (z + 1);
                                issuescloced += "<tr><td align='center'>" + (z) + "</td>"
                                        + "<td>" + tDataJson.issuesDescription + "</td>"
                                        + "" + tDataJson.issuesRank + ""
                                        + "<td style='color:blue' align='center'><a href='#' style='color:green' onclick='return editIssues(" + JSON.stringify(tDataJson.issuesId) + ");'><i class='glyphicon glyphicon-edit'></i></a></td>"
                                        + "<td style='color:blue' align='center'><a href='#' style='color:red' onclick='return deleteIssues(" + JSON.stringify(tDataJson.issuesId) + ");'><i class='glyphicon glyphicon-trash'></i></a></td>"
                                        + "<td></td>"
                                        + "</tr>";
                            }
                        });
                        issuetable += "<tr><td colspan='6' align='right'><input class='btn btn-xs btn-success' onclick='addissues();' type='button' value='Add'/></td></tr>";
                    } else {
                        issuetable += "<tr><td colspan='6' align='right'><input class='btn btn-xs btn-success' type='button' onclick='addissues();' value='Add'/></td></tr>";
                    }
                    $('#issuetable').html(issuetable);
                    $('#issuescloced').html(issuescloced);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        }
    }
}

function addissues() {
    $('#issuesAdd').modal('show');
}

function issuesObj() {
    var issuesId = Math.floor(Math.random() * (1000000 - 1)) + 1 + 1;
    var projectName = $('#projectname').val();
    var issuesdiscription = $('#issuesdiscription').val();
    var issuesrankVal = $('#issuesrank').val();
    var issuesrank = "";
    if (issuesrankVal === "1") {
        issuesrank = "<td style='color:green' align='center'><i class='glyphicon glyphicon-exclamation-sign fa-2x'></i></td>";
    }
    if (issuesrankVal === "2") {
        issuesrank = "<td style='color:red' align='center'><i class='glyphicon glyphicon-exclamation-sign fa-2x'></i></td>";
    }
    var issuesObject = null;
    if (issuesdiscription !== "" && issuesrank !== "" && projectName !== "" && issuesId !== "") {
        issuesObject = {
            issuesId: issuesId,
            issuesProjectName: projectName,
            issuesDescription: issuesdiscription,
            issuesRank: issuesrank,
            issuesType: false
        };
        return JSON.stringify(issuesObject);
    } else {
        return null;
    }
}

function saveIssues() {
    if (JSON.stringify(issuesObj()) !== "null") {
        $.ajax({
            type: 'POST',
            url: '/ProjectStatusReportsSystem/rest/psrservices/issuesServices/createIssuec',
            data: issuesObj(),
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
                $('#issuesdiscription').val("");
                $('#issuesAdd').modal('hide');
                Issues();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#issuesdiscription').val("");
                $('#issuesAdd').modal('hide');
                Issues();
            }
        });
    } else {
        $('#issuesdiscription').val("");
        $('#issuesAdd').modal('hide');
        Issues();
    }
}
function editIssues(issuesId) {
    $('#issuesId').val("");
    $('#issuesDescription').val("");
    $('#issuesType').val("");
    $.ajax({
        type: 'POST',
        url: '/ProjectStatusReportsSystem/rest/psrservices/issuesServices/getIssuesById/' + issuesId,
        contentType: 'application/json',
        success: function (data, textStatus, jqXHR) {
            $('#issuesId').val(data[0].issuesId);
            $('#issuesDescriptionVal').val(data[0].issuesDescription);
            $('#issuesType').val(data[0].issuesType);

            $('#issuesEdit').modal('show');
        }, error: function (jqXHR, textStatus, errorThrown) {
            Issues();
        }
    });
}

function editSaveObj() {
    var issuesId = $('#issuesId').val();
    var issuesDescription = $('#issuesDescriptionVal').val();
    var issuesType = $('#issuesType').val();
    var issuesrankVal = $('#issuesrankValTwo').val();
    var issuesrank = "";
    if (issuesrankVal === "1") {
        issuesrank = "<td style='color:green' align='center'><i class='glyphicon glyphicon-exclamation-sign fa-2x'></i></td>";
    }
    if (issuesrankVal === "2") {
        issuesrank = "<td style='color:red' align='center'><i class='glyphicon glyphicon-exclamation-sign fa-2x'></i></td>";
    }
    var editObj = null;
    if (true) {
        editObj = {
            issuesType: issuesType,
            issuesRank: issuesrank,
            issuesDescription: issuesDescription,
            issuesId: issuesId
        };
        return JSON.stringify(editObj);
    } else {
        return editObj;
    }
}

function editSaveIssues() {
    if (JSON.stringify(editSaveObj()) !== "null") {
        $.ajax({
            type: 'POST',
            url: '/ProjectStatusReportsSystem/rest/psrservices/issuesServices/updateIssues/',
            data: editSaveObj(),
            contentType: 'application/json',
            success: function (data, textStatus, jqXHR) {
                $('#issuesEdit').modal('hide');
                Issues();
            }, error: function (jqXHR, textStatus, errorThrown) {
                $('#issuesEdit').modal('hide');
                Issues();
            }
        });
    } else {
        $('#issuesEdit').modal('hide');
        Issues();
    }

}

function deleteIssues(issuesId) {
    $.ajax({
        type: 'POST',
        url: '/ProjectStatusReportsSystem/rest/psrservices/issuesServices/deleteIssues/' + issuesId,
        contentType: 'application/json',
        success: function (data, textStatus, jqXHR) {
            Issues();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Issues();
        }
    });
}

function closedIssues(issuesId) {
    $.ajax({
        type: 'POST',
        url: '/ProjectStatusReportsSystem/rest/psrservices/issuesServices/closedIssues/' + issuesId,
        contentType: 'application/json',
        success: function (data, textStatus, jqXHR) {
            Issues();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Issues();
        }
    });
}
//------------------------------------------------------------------------------------------------------------------------

function Risks() {
    $('#issuetable').html("");
    $('#issuescloced').html("");
    $('#openName').text("Key Risks (Open)");
    $('#closedName').text("Key Risks (Closed)");
    var projectname = $("#projectname").val();
    var pagenumber = $('#pagenumber').val();
    if (projectname !== "null") {
        if (pagenumber === "6") {
            $.ajax({
                type: 'POST',
                url: '/ProjectStatusReportsSystem/rest/psrservices/riskServices/getAllRiskData/' + projectname,
//                data: loginObject(),
                contentType: 'application/json',
                success: function (data, textStatus, jqXHR) {
                    console.log(data);
                    var issuetable = "";
                    var issuescloced = "";
                    if (data.length !== 0) {
                        var z = 0;
                        var y = 0;
                        $.each(data, function (x, tDataJson) {
                            if (tDataJson.riskType === "false") {
                                y = (y + 1);
                                issuetable += "<tr><td align='center'>" + (y) + "</td>"
                                        + "<td>" + tDataJson.riskDescription + "</td>"
                                        + "" + tDataJson.riskRank + ""
                                        + "<td style='color:green' align='center'><a href='#' style='color:green' onclick='return editRisk(" + JSON.stringify(tDataJson.riskId) + ");'><i class='glyphicon glyphicon-edit'></i></a></td>"
                                        + "<td style='color:red' align='center'><a href='#' style='color:red' onclick='return deleteRisk(" + JSON.stringify(tDataJson.riskId) + ");'><i class='glyphicon glyphicon-trash'></i></a></td>"
                                        + "<td style='color:blue' align='center'><a href='#' onclick='return closedRisk(" + JSON.stringify(tDataJson.riskId) + ");'><i class='glyphicon glyphicon-remove'></i></a></td>"
                                        + "</tr>";
                            }
                            if (tDataJson.riskType === "true") {
                                z = (z + 1);
                                issuescloced += "<tr><td align='center'>" + (z) + "</td>"
                                        + "<td>" + tDataJson.riskDescription + "</td>"
                                        + "" + tDataJson.riskRank + ""
                                        + "<td style='color:blue' align='center'><a href='#' style='color:green' onclick='return editRisk(" + JSON.stringify(tDataJson.riskId) + ");'><i class='glyphicon glyphicon-edit'></i></a></td>"
                                        + "<td style='color:blue' align='center'><a href='#' style='color:red' onclick='return deleteRisk(" + JSON.stringify(tDataJson.riskId) + ");'><i class='glyphicon glyphicon-trash'></i></a></td>"
                                        + "<td></td>"
                                        + "</tr>";
                            }
                        });
                        issuetable += "<tr><td colspan='6' align='right'><input class='btn btn-xs btn-success' onclick='addRisk();' type='button' value='Add'/></td></tr>";
                    } else {
                        issuetable += "<tr><td colspan='6' align='right'><input class='btn btn-xs btn-success' type='button' onclick='addRisk();' value='Add'/></td></tr>";
                    }
                    $('#issuetable').html(issuetable);
                    $('#issuescloced').html(issuescloced);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        }
    }
}

function addRisk() {
    alert("addRisk");
}

function deleteRisk() {
    alert("deleteRisk");
}

function editRisk() {
    alert("editRisk");
}

function closedRisk() {
    alert("closedRisk");
}
//-------------------------------------------------------------------------------------------------------------------------
function monthly() {
    var projectname = $("#projectname").val();
    if (projectname !== "null") {
        Histrogram();
    }
}

function getSearchDateMonthly() {
    $('#chartViewDivtag').html("");
    var pickerstart = new Date($("input[name=daterangepicker_start]").val());
    var pickerend = new Date($("input[name=daterangepicker_end]").val());
    var projectname = $("#projectname").val();
    var pagenumber = $('#pagenumber').val();
    if (projectname !== "null") {
        if (pagenumber === "1") {
            $.ajax({
                type: 'GET',
                url: '/ProjectStatusReportsSystem/rest/psrservices/loadprojectdetailsservices/getImplementationDateByProjectName/' + projectname,
                contentType: 'application/json',
                success: function (data, textStatus, jqXHR) {
                    if (data[0].createdprojectSubCategory === "IBS") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {
                                function findOnAir(fruit) {
                                    return fruit.Status === 'OnAir';
                                }
                                var allonair = data[0].createdprojectData.filter(findOnAir);
                                if (isNaN(allonair) !== false) {
                                    var onaliQ = jsonQ(allonair);
                                    var OnAir_Actual_Date = (onaliQ.find('OnAir_Actual_Date').value().sort());
                                    var OnAir_Target_Date = (onaliQ.find('OnAir_Target_Date').value().sort());
                                    if ((isNaN(OnAir_Target_Date) !== false) && (isNaN(OnAir_Actual_Date) !== false)) {

                                        if (OnAir_Target_Date.length !== 0) {
                                            var SystemDate = new Date().toJSON().slice(0, 10);
                                            for (i = 0; i < OnAir_Target_Date.length; i++) {
                                                var filteredOnAir_Target_Date = OnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(OnAir_Target_Date[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                });
                                            }
                                        }
                                        if (OnAir_Actual_Date.length !== 0) {
                                            var SystemDate = new Date().toJSON().slice(0, 10);
                                            for (i = 0; i < OnAir_Actual_Date.length; i++) {
                                                var filteredOnAir_Actual_Date = OnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(OnAir_Actual_Date[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                });
                                            }
                                        }
                                        var fullDateArray = filteredOnAir_Target_Date.concat(filteredOnAir_Actual_Date).sort();
                                        var Pstart = pickerstart.toString('yyyy-MM-dd');
                                        var Pend = pickerend.toString('yyyy-MM-dd');
                                        var FO = fullDateArray[0];
                                        var FEnd = fullDateArray[fullDateArray.length - 1];
                                        if ((Pstart < FO) && (Pend <= FO)) {// 1111111111111111111111111111
                                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Out Of the range</h2></div>");
                                        }
                                        if ((Pstart >= FEnd) && (Pend > FEnd)) {// 222222222222222222222222
                                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Out Of the range</h2></div>");
                                        }
                                        if ((Pstart < FO) && (Pend > FEnd)) {//33333333333333333333333333333
                                            var timeValues = [];
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            var timeValuesBarHeightStart = [];
                                            var timeValuesBarHeightEnd = [];
                                            var dateStart = moment(fullDateArray[0]);
                                            var dateEnd = moment(fullDateArray[fullDateArray.length - 1]);
                                            while (dateEnd >= dateStart) {
                                                timeValues.push(dateStart.format('YYYY-MMMM'));
                                                timeValuesBarHeightStart.push(dateStart.format('YYYY-MM-01'));
                                                timeValuesBarHeightEnd.push(dateStart.format('YYYY-MM-31'));
                                                dateStart.add(1, 'month');
                                            }
                                            console.log(fullDateArray);
                                            console.log(timeValues);
                                            console.log(timeValuesBarHeightStart);
                                            console.log(timeValuesBarHeightEnd);
                                            for (i = 0; i < timeValues.length; i++) {
                                                var startDate = timeValuesBarHeightStart[0];
                                                var endDate = timeValuesBarHeightEnd[i];
                                                var CalculateArrayActual = filteredOnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var CalculateArrayOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                ActualValues.push(CalculateArrayActual.length);
                                                OnAir_TargetValues.push(CalculateArrayOnAir_Target.length);
                                            }
                                            $(function () {
                                                $('#chartViewDivtag').highcharts({
                                                    chart: {
                                                        type: 'column'
                                                    },
                                                    title: {
                                                        text: 'Monthly OnAir Progress'
                                                    },
                                                    subtitle: {
                                                        text: 'Source:' + data[0].createdprojectName
                                                    },
                                                    xAxis: {
                                                        categories: timeValues,
                                                        crosshair: true
                                                    },
                                                    yAxis: {
                                                        min: 0,
                                                        title: {
                                                            text: 'No of Project'
                                                        }
                                                    },
                                                    tooltip: {
                                                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                                                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                                                        footerFormat: '</table>',
                                                        shared: true,
                                                        useHTML: true
                                                    },
                                                    plotOptions: {
                                                        column: {
                                                            pointPadding: 0.2,
                                                            borderWidth: 0
                                                        }
                                                    },
                                                    series: [{
                                                            name: 'On Air Target Date',
                                                            data: OnAir_TargetValues

                                                        }, {
                                                            name: 'On Air Actual Date',
                                                            data: ActualValues

                                                        }]
                                                });
                                            });
                                        }
                                        if ((Pstart < FO) && ((FO < Pend) && (Pend <= FEnd))) {//4444444444444444444444444
                                            var timeValues = [];
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            var timeValuesBarHeightStart = [];
                                            var timeValuesBarHeightEnd = [];

                                            var dateStart = moment(fullDateArray[0]);
                                            var dateEnd = moment(Pend);//change
                                            while (dateEnd >= dateStart) {
                                                timeValues.push(dateStart.format('YYYY-MMMM'));
                                                timeValuesBarHeightStart.push(dateStart.format('YYYY-MM-01'));
                                                timeValuesBarHeightEnd.push(dateStart.format('YYYY-MM-31'));
                                                dateStart.add(1, 'month');
                                            }
                                            console.log(fullDateArray);
                                            console.log(timeValues);
                                            console.log(timeValuesBarHeightStart);
                                            console.log(timeValuesBarHeightEnd);

                                            for (i = 0; i < timeValues.length; i++) {
                                                var startDate = timeValuesBarHeightStart[0];
                                                var endDate = timeValuesBarHeightEnd[i];
                                                var CalculateArrayActual = filteredOnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var CalculateArrayOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });

                                                ActualValues.push(CalculateArrayActual.length);
                                                OnAir_TargetValues.push(CalculateArrayOnAir_Target.length);
                                            }


                                            $(function () {
                                                $('#chartViewDivtag').highcharts({
                                                    chart: {
                                                        type: 'column'
                                                    },
                                                    title: {
                                                        text: 'Monthly OnAir Progress'
                                                    },
                                                    subtitle: {
                                                        text: 'Source:' + data[0].createdprojectName
                                                    },
                                                    xAxis: {
                                                        categories: timeValues,
                                                        crosshair: true
                                                    },
                                                    yAxis: {
                                                        min: 0,
                                                        title: {
                                                            text: 'No of Project'
                                                        }
                                                    },
                                                    tooltip: {
                                                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                                                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                                                        footerFormat: '</table>',
                                                        shared: true,
                                                        useHTML: true
                                                    },
                                                    plotOptions: {
                                                        column: {
                                                            pointPadding: 0.2,
                                                            borderWidth: 0
                                                        }
                                                    },
                                                    series: [{
                                                            name: 'OnAir Target Date',
                                                            data: OnAir_TargetValues

                                                        }, {
                                                            name: 'OnAir Actual Date',
                                                            data: ActualValues

                                                        }]
                                                });
                                            });
                                        }
                                        if ((Pstart >= FO) && (Pend <= FEnd)) {
                                            var timeValues = [];
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            var timeValuesBarHeightStart = [];
                                            var timeValuesBarHeightEnd = [];

                                            var dateStart = moment(Pstart);//change
                                            var dateEnd = moment(Pend);//change
                                            while (dateEnd >= dateStart) {
                                                timeValues.push(dateStart.format('YYYY-MMMM'));
                                                timeValuesBarHeightStart.push(dateStart.format('YYYY-MM-01'));
                                                timeValuesBarHeightEnd.push(dateStart.format('YYYY-MM-31'));
                                                dateStart.add(1, 'month');
                                            }
                                            console.log(fullDateArray);
                                            console.log(timeValues);
                                            console.log(timeValuesBarHeightStart);
                                            console.log(timeValuesBarHeightEnd);

                                            var PreviousCountActual = filteredOnAir_Actual_Date.filter(function (item) {
                                                return item.localeCompare(fullDateArray[0]) > -1 && Pstart.localeCompare(item) > -1;//change
                                            });
                                            var PreviousCountOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                return item.localeCompare(fullDateArray[0]) > -1 && Pstart.localeCompare(item) > -1;//change
                                            });
                                            for (i = 0; i < timeValues.length; i++) {
                                                var startDate = timeValuesBarHeightStart[0];
                                                var endDate = timeValuesBarHeightEnd[i];
                                                var CalculateArrayActual = filteredOnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var CalculateArrayOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });

                                                ActualValues.push(CalculateArrayActual.length + PreviousCountActual.length);
                                                OnAir_TargetValues.push(CalculateArrayOnAir_Target.length + PreviousCountOnAir_Target.length);
                                            }


                                            $(function () {
                                                $('#chartViewDivtag').highcharts({
                                                    chart: {
                                                        type: 'column'
                                                    },
                                                    title: {
                                                        text: 'Monthly OnAir Progress'
                                                    },
                                                    subtitle: {
                                                        text: 'Source:' + data[0].createdprojectName
                                                    },
                                                    xAxis: {
                                                        categories: timeValues,
                                                        crosshair: true
                                                    },
                                                    yAxis: {
                                                        min: 0,
                                                        title: {
                                                            text: 'No of Project'
                                                        }
                                                    },
                                                    tooltip: {
                                                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                                                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                                                        footerFormat: '</table>',
                                                        shared: true,
                                                        useHTML: true
                                                    },
                                                    plotOptions: {
                                                        column: {
                                                            pointPadding: 0.2,
                                                            borderWidth: 0
                                                        }
                                                    },
                                                    series: [{
                                                            name: 'On Air Target Date',
                                                            data: OnAir_TargetValues

                                                        }, {
                                                            name: 'On Air Actual Date',
                                                            data: ActualValues

                                                        }]
                                                });
                                            });
                                        }
                                        if (((FO <= Pstart) && (Pstart < FEnd)) && (Pend > FEnd)) {

                                            var timeValues = [];
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            var timeValuesBarHeightStart = [];
                                            var timeValuesBarHeightEnd = [];

                                            var dateStart = moment(Pstart);//change
                                            var dateEnd = moment(fullDateArray[fullDateArray.length - 1]);
                                            while (dateEnd >= dateStart) {
                                                timeValues.push(dateStart.format('YYYY-MMMM'));
                                                timeValuesBarHeightStart.push(dateStart.format('YYYY-MM-01'));
                                                timeValuesBarHeightEnd.push(dateStart.format('YYYY-MM-31'));
                                                dateStart.add(1, 'month');
                                            }
                                            console.log(fullDateArray);
                                            console.log(timeValues);
                                            console.log(timeValuesBarHeightStart);
                                            console.log(timeValuesBarHeightEnd);

                                            var PreviousCountActual = filteredOnAir_Actual_Date.filter(function (item) {
                                                return item.localeCompare(fullDateArray[0]) > -1 && Pstart.localeCompare(item) > -1;//change
                                            });
                                            var PreviousCountOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                return item.localeCompare(fullDateArray[0]) > -1 && Pstart.localeCompare(item) > -1;//change
                                            });
                                            for (i = 0; i < timeValues.length; i++) {
                                                var startDate = timeValuesBarHeightStart[0];
                                                var endDate = timeValuesBarHeightEnd[i];
                                                var CalculateArrayActual = filteredOnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var CalculateArrayOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });

                                                ActualValues.push(CalculateArrayActual.length + PreviousCountActual.length);
                                                OnAir_TargetValues.push(CalculateArrayOnAir_Target.length + PreviousCountOnAir_Target.length);
                                            }


                                            $(function () {
                                                $('#chartViewDivtag').highcharts({
                                                    chart: {
                                                        type: 'column'
                                                    },
                                                    title: {
                                                        text: 'Monthly OnAir Progress'
                                                    },
                                                    subtitle: {
                                                        text: 'Source:' + data[0].createdprojectName
                                                    },
                                                    xAxis: {
                                                        categories: timeValues,
                                                        crosshair: true
                                                    },
                                                    yAxis: {
                                                        min: 0,
                                                        title: {
                                                            text: 'No of Project'
                                                        }
                                                    },
                                                    tooltip: {
                                                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                                                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                                                        footerFormat: '</table>',
                                                        shared: true,
                                                        useHTML: true
                                                    },
                                                    plotOptions: {
                                                        column: {
                                                            pointPadding: 0.2,
                                                            borderWidth: 0
                                                        }
                                                    },
                                                    series: [{
                                                            name: 'On Air Target Date',
                                                            data: OnAir_TargetValues

                                                        }, {
                                                            name: 'On Air Actual Date',
                                                            data: ActualValues

                                                        }]
                                                });
                                            });
                                        }
                                    } else {
                                        $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Not fill target date or onair actual date.. .....</h2></div>");
                                    }
                                } else {
                                    $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No OnAir Data .....</h2></div>");
                                }
                            }
                            else {
                                $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                            }
                        } else {
                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>");
                        }
                    }
                    if (data[0].createdprojectSubCategory === "Wi-Fi") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                alert("Wi-Fi");//**********************************************************************************************
                            }
                            else {
                                $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                            }
                        } else {
                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>");
                        }
                    }
                    if (data[0].createdprojectSubCategory === "Transmission_Implementation") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                //alert("Transmission_Implementation");//**********************************************************************************************

                                function findOnAir(fruit) {
                                    return fruit.Status === 'OnAir';
                                }
                                var allonair = data[0].createdprojectData.filter(findOnAir);
                                if (isNaN(allonair) !== false) {
                                    var onaliQ = jsonQ(allonair);
                                    var OnAir_Actual_Date = (onaliQ.find('OnAir_Actual_Date').value().sort());
                                    var OnAir_Target_Date = (onaliQ.find('OnAir_Target_Date').value().sort());
                                    if ((isNaN(OnAir_Target_Date) !== false) && (isNaN(OnAir_Actual_Date) !== false)) {

                                        if (OnAir_Target_Date.length !== 0) {
                                            var SystemDate = new Date().toJSON().slice(0, 10);
                                            for (i = 0; i < OnAir_Target_Date.length; i++) {
                                                var filteredOnAir_Target_Date = OnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(OnAir_Target_Date[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                });
                                            }
                                        }
                                        if (OnAir_Actual_Date.length !== 0) {
                                            var SystemDate = new Date().toJSON().slice(0, 10);
                                            for (i = 0; i < OnAir_Actual_Date.length; i++) {
                                                var filteredOnAir_Actual_Date = OnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(OnAir_Actual_Date[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                });
                                            }
                                        }
                                        var fullDateArray = filteredOnAir_Target_Date.concat(filteredOnAir_Actual_Date).sort();
                                        var Pstart = pickerstart.toString('yyyy-MM-dd');
                                        var Pend = pickerend.toString('yyyy-MM-dd');
                                        var FO = fullDateArray[0];
                                        var FEnd = fullDateArray[fullDateArray.length - 1];
                                        if ((Pstart < FO) && (Pend <= FO)) {// 1111111111111111111111111111
                                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Out Of the range</h2></div>");
                                        }
                                        if ((Pstart >= FEnd) && (Pend > FEnd)) {// 222222222222222222222222
                                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Out Of the range</h2></div>");
                                        }
                                        if ((Pstart < FO) && (Pend > FEnd)) {//33333333333333333333333333333
                                            var timeValues = [];
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            var timeValuesBarHeightStart = [];
                                            var timeValuesBarHeightEnd = [];
                                            var dateStart = moment(fullDateArray[0]);
                                            var dateEnd = moment(fullDateArray[fullDateArray.length - 1]);
                                            while (dateEnd >= dateStart) {
                                                timeValues.push(dateStart.format('YYYY-MMMM'));
                                                timeValuesBarHeightStart.push(dateStart.format('YYYY-MM-01'));
                                                timeValuesBarHeightEnd.push(dateStart.format('YYYY-MM-31'));
                                                dateStart.add(1, 'month');
                                            }
                                            console.log(fullDateArray);
                                            console.log(timeValues);
                                            console.log(timeValuesBarHeightStart);
                                            console.log(timeValuesBarHeightEnd);
                                            for (i = 0; i < timeValues.length; i++) {
                                                var startDate = timeValuesBarHeightStart[0];
                                                var endDate = timeValuesBarHeightEnd[i];
                                                var CalculateArrayActual = filteredOnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var CalculateArrayOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                ActualValues.push(CalculateArrayActual.length);
                                                OnAir_TargetValues.push(CalculateArrayOnAir_Target.length);
                                            }
                                            $(function () {
                                                $('#chartViewDivtag').highcharts({
                                                    chart: {
                                                        type: 'column'
                                                    },
                                                    title: {
                                                        text: 'Monthly OnAir Progress'
                                                    },
                                                    subtitle: {
                                                        text: 'Source:' + data[0].createdprojectName
                                                    },
                                                    xAxis: {
                                                        categories: timeValues,
                                                        crosshair: true
                                                    },
                                                    yAxis: {
                                                        min: 0,
                                                        title: {
                                                            text: 'No of Project'
                                                        }
                                                    },
                                                    tooltip: {
                                                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                                                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                                                        footerFormat: '</table>',
                                                        shared: true,
                                                        useHTML: true
                                                    },
                                                    plotOptions: {
                                                        column: {
                                                            pointPadding: 0.2,
                                                            borderWidth: 0
                                                        }
                                                    },
                                                    series: [{
                                                            name: 'On Air Target Date',
                                                            data: OnAir_TargetValues

                                                        }, {
                                                            name: 'On Air Actual Date',
                                                            data: ActualValues

                                                        }]
                                                });
                                            });
                                        }
                                        if ((Pstart < FO) && ((FO < Pend) && (Pend <= FEnd))) {//4444444444444444444444444
                                            var timeValues = [];
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            var timeValuesBarHeightStart = [];
                                            var timeValuesBarHeightEnd = [];

                                            var dateStart = moment(fullDateArray[0]);
                                            var dateEnd = moment(Pend);//change
                                            while (dateEnd >= dateStart) {
                                                timeValues.push(dateStart.format('YYYY-MMMM'));
                                                timeValuesBarHeightStart.push(dateStart.format('YYYY-MM-01'));
                                                timeValuesBarHeightEnd.push(dateStart.format('YYYY-MM-31'));
                                                dateStart.add(1, 'month');
                                            }
                                            console.log(fullDateArray);
                                            console.log(timeValues);
                                            console.log(timeValuesBarHeightStart);
                                            console.log(timeValuesBarHeightEnd);

                                            for (i = 0; i < timeValues.length; i++) {
                                                var startDate = timeValuesBarHeightStart[0];
                                                var endDate = timeValuesBarHeightEnd[i];
                                                var CalculateArrayActual = filteredOnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var CalculateArrayOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });

                                                ActualValues.push(CalculateArrayActual.length);
                                                OnAir_TargetValues.push(CalculateArrayOnAir_Target.length);
                                            }


                                            $(function () {
                                                $('#chartViewDivtag').highcharts({
                                                    chart: {
                                                        type: 'column'
                                                    },
                                                    title: {
                                                        text: 'Monthly OnAir Progress'
                                                    },
                                                    subtitle: {
                                                        text: 'Source:' + data[0].createdprojectName
                                                    },
                                                    xAxis: {
                                                        categories: timeValues,
                                                        crosshair: true
                                                    },
                                                    yAxis: {
                                                        min: 0,
                                                        title: {
                                                            text: 'No of Project'
                                                        }
                                                    },
                                                    tooltip: {
                                                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                                                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                                                        footerFormat: '</table>',
                                                        shared: true,
                                                        useHTML: true
                                                    },
                                                    plotOptions: {
                                                        column: {
                                                            pointPadding: 0.2,
                                                            borderWidth: 0
                                                        }
                                                    },
                                                    series: [{
                                                            name: 'OnAir Target Date',
                                                            data: OnAir_TargetValues

                                                        }, {
                                                            name: 'OnAir Actual Date',
                                                            data: ActualValues

                                                        }]
                                                });
                                            });
                                        }
                                        if ((Pstart >= FO) && (Pend <= FEnd)) {
                                            var timeValues = [];
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            var timeValuesBarHeightStart = [];
                                            var timeValuesBarHeightEnd = [];

                                            var dateStart = moment(Pstart);//change
                                            var dateEnd = moment(Pend);//change
                                            while (dateEnd >= dateStart) {
                                                timeValues.push(dateStart.format('YYYY-MMMM'));
                                                timeValuesBarHeightStart.push(dateStart.format('YYYY-MM-01'));
                                                timeValuesBarHeightEnd.push(dateStart.format('YYYY-MM-31'));
                                                dateStart.add(1, 'month');
                                            }
                                            console.log(fullDateArray);
                                            console.log(timeValues);
                                            console.log(timeValuesBarHeightStart);
                                            console.log(timeValuesBarHeightEnd);

                                            var PreviousCountActual = filteredOnAir_Actual_Date.filter(function (item) {
                                                return item.localeCompare(fullDateArray[0]) > -1 && Pstart.localeCompare(item) > -1;//change
                                            });
                                            var PreviousCountOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                return item.localeCompare(fullDateArray[0]) > -1 && Pstart.localeCompare(item) > -1;//change
                                            });
                                            for (i = 0; i < timeValues.length; i++) {
                                                var startDate = timeValuesBarHeightStart[0];
                                                var endDate = timeValuesBarHeightEnd[i];
                                                var CalculateArrayActual = filteredOnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var CalculateArrayOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });

                                                ActualValues.push(CalculateArrayActual.length + PreviousCountActual.length);
                                                OnAir_TargetValues.push(CalculateArrayOnAir_Target.length + PreviousCountOnAir_Target.length);
                                            }


                                            $(function () {
                                                $('#chartViewDivtag').highcharts({
                                                    chart: {
                                                        type: 'column'
                                                    },
                                                    title: {
                                                        text: 'Monthly OnAir Progress'
                                                    },
                                                    subtitle: {
                                                        text: 'Source:' + data[0].createdprojectName
                                                    },
                                                    xAxis: {
                                                        categories: timeValues,
                                                        crosshair: true
                                                    },
                                                    yAxis: {
                                                        min: 0,
                                                        title: {
                                                            text: 'No of Project'
                                                        }
                                                    },
                                                    tooltip: {
                                                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                                                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                                                        footerFormat: '</table>',
                                                        shared: true,
                                                        useHTML: true
                                                    },
                                                    plotOptions: {
                                                        column: {
                                                            pointPadding: 0.2,
                                                            borderWidth: 0
                                                        }
                                                    },
                                                    series: [{
                                                            name: 'On Air Target Date',
                                                            data: OnAir_TargetValues

                                                        }, {
                                                            name: 'On Air Actual Date',
                                                            data: ActualValues

                                                        }]
                                                });
                                            });
                                        }
                                        if (((FO <= Pstart) && (Pstart < FEnd)) && (Pend > FEnd)) {

                                            var timeValues = [];
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            var timeValuesBarHeightStart = [];
                                            var timeValuesBarHeightEnd = [];

                                            var dateStart = moment(Pstart);//change
                                            var dateEnd = moment(fullDateArray[fullDateArray.length - 1]);
                                            while (dateEnd >= dateStart) {
                                                timeValues.push(dateStart.format('YYYY-MMMM'));
                                                timeValuesBarHeightStart.push(dateStart.format('YYYY-MM-01'));
                                                timeValuesBarHeightEnd.push(dateStart.format('YYYY-MM-31'));
                                                dateStart.add(1, 'month');
                                            }
                                            console.log(fullDateArray);
                                            console.log(timeValues);
                                            console.log(timeValuesBarHeightStart);
                                            console.log(timeValuesBarHeightEnd);

                                            var PreviousCountActual = filteredOnAir_Actual_Date.filter(function (item) {
                                                return item.localeCompare(fullDateArray[0]) > -1 && Pstart.localeCompare(item) > -1;//change
                                            });
                                            var PreviousCountOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                return item.localeCompare(fullDateArray[0]) > -1 && Pstart.localeCompare(item) > -1;//change
                                            });
                                            for (i = 0; i < timeValues.length; i++) {
                                                var startDate = timeValuesBarHeightStart[0];
                                                var endDate = timeValuesBarHeightEnd[i];
                                                var CalculateArrayActual = filteredOnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var CalculateArrayOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });

                                                ActualValues.push(CalculateArrayActual.length + PreviousCountActual.length);
                                                OnAir_TargetValues.push(CalculateArrayOnAir_Target.length + PreviousCountOnAir_Target.length);
                                            }


                                            $(function () {
                                                $('#chartViewDivtag').highcharts({
                                                    chart: {
                                                        type: 'column'
                                                    },
                                                    title: {
                                                        text: 'Monthly OnAir Progress'
                                                    },
                                                    subtitle: {
                                                        text: 'Source:' + data[0].createdprojectName
                                                    },
                                                    xAxis: {
                                                        categories: timeValues,
                                                        crosshair: true
                                                    },
                                                    yAxis: {
                                                        min: 0,
                                                        title: {
                                                            text: 'No of Project'
                                                        }
                                                    },
                                                    tooltip: {
                                                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                                                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                                                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                                                        footerFormat: '</table>',
                                                        shared: true,
                                                        useHTML: true
                                                    },
                                                    plotOptions: {
                                                        column: {
                                                            pointPadding: 0.2,
                                                            borderWidth: 0
                                                        }
                                                    },
                                                    series: [{
                                                            name: 'On Air Target Date',
                                                            data: OnAir_TargetValues

                                                        }, {
                                                            name: 'On Air Actual Date',
                                                            data: ActualValues

                                                        }]
                                                });
                                            });
                                        }
                                    } else {
                                        $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Not fill target date or onair actual date.. .....</h2></div>");
                                    }
                                } else {
                                    $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No OnAir Data .....</h2></div>");
                                }


                            }
                            else {
                                $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                            }
                        } else {
                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>");
                        }
                    }
                    if (data[0].createdprojectCategory === "Access Network") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                alert("Access Network");//**********************************************************************************************

                            }
                            else {
                                chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>";
                            }
                        } else {
                            chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>";
                        }
                        $('#chartViewDivtag').html(chartViewDivtag);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error Tree_View");
                }
            });
        }
    }
}

function weekly() {
    $('#chartViewDivtag').html("");
    var projectname = $("#projectname").val();
    var pagenumber = $('#pagenumber').val();
    if (projectname !== "null") {
        if (pagenumber === "1") {
            $.ajax({
                type: 'GET',
                url: '/ProjectStatusReportsSystem/rest/psrservices/loadprojectdetailsservices/getImplementationDateByProjectName/' + projectname,
                contentType: 'application/json',
                success: function (data, textStatus, jqXHR) {
                    if (data[0].createdprojectSubCategory === "IBS") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {
                                function findOnAir(fruit) {
                                    return fruit.Status === 'OnAir';
                                }
                                var allonair = data[0].createdprojectData.filter(findOnAir);
                                if (isNaN(allonair) !== false) {
                                    var onaliQ = jsonQ(allonair);
                                    var OnAir_Actual_Date = (onaliQ.find('OnAir_Actual_Date').value().sort());
                                    var OnAir_Target_Date = (onaliQ.find('OnAir_Target_Date').value().sort());
                                    if ((isNaN(OnAir_Target_Date) !== false) && (isNaN(OnAir_Actual_Date) !== false)) {

                                        if (OnAir_Target_Date.length !== 0) {
                                            var SystemDate = new Date().toJSON().slice(0, 10);
                                            for (i = 0; i < OnAir_Target_Date.length; i++) {
                                                var filteredOnAir_Target_Date = OnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(OnAir_Target_Date[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                });
                                            }
                                        }
                                        if (OnAir_Actual_Date.length !== 0) {
                                            var SystemDate = new Date().toJSON().slice(0, 10);
                                            for (i = 0; i < OnAir_Actual_Date.length; i++) {
                                                var filteredOnAir_Actual_Date = OnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(OnAir_Actual_Date[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                });
                                            }
                                        }
                                        var fullDateArray = filteredOnAir_Target_Date.concat(filteredOnAir_Actual_Date).sort();
                                        var d1 = Date.parse(fullDateArray[0]);
                                        if (!d1.is().saturday()) {
                                            d1.last().saturday();
                                        }
                                        var firatSaturday_one = d1.toString('yyyy-MM-dd');
                                        var firatSaturday = moment(firatSaturday_one);
                                        var BeginingfiratSaturday = moment(firatSaturday_one);
                                        var EndDateFullArray = moment(fullDateArray[fullDateArray.length - 1]);
                                        var timeValues = [];
                                        var categoriesTimeValues = [];
                                        while (firatSaturday < EndDateFullArray) {//cannot take = value.. should add nxt date because if not some date may be missing
                                            timeValues.push(firatSaturday.format('YYYY-MM-DD'));
                                            if (BeginingfiratSaturday.format('YYYY-MM-DD') !== firatSaturday.format('YYYY-MM-DD')) {
                                                categoriesTimeValues.push(firatSaturday.format('YYYY-MMMM'));
                                            }
                                            firatSaturday.add(7, 'days');
                                        }
                                        timeValues.push(EndDateFullArray.format('YYYY-MM-DD'));
                                        categoriesTimeValues.push(EndDateFullArray.format('YYYY-MMMM'));
//                                        console.log(fullDateArray);
//                                        console.log(timeValues);
//                                        console.log(timeValues.length);
//                                        console.log(categoriesTimeValues);
                                        var map = categoriesTimeValues.reduce(function (prev, cur) {
                                            prev[cur] = (prev[cur] || 0) + 1;
                                            return prev;
                                        }, {});
                                        var categoriesName = [];
                                        var categoriesWeek = [];
                                        for (var key in map) {
                                            if (map.hasOwnProperty(key)) {
                                                categoriesName.push(key);
                                                categoriesWeek.push(map[key]);
                                            }
                                        }
//                                        console.log(categoriesName);
//                                        console.log(categoriesWeek);
                                        var categoriesObj = [];
                                        if (categoriesName.length === categoriesWeek.length) {
                                            var categories = {};
                                            for (i = 0; i < categoriesName.length; i++) {
                                                var weeksObj = [];
                                                for (j = 0; j < categoriesWeek[i]; j++) {
                                                    weeksObj.push((j + 1) + " Wk");
                                                }
                                                categories = {"name": categoriesName[i], "categories": weeksObj};
                                                categoriesObj.push(categories);
                                            }
                                        }
                                        //console.log(categoriesObj);
                                        var ActualValues = [];
                                        var OnAir_TargetValues = [];
                                        for (i = 1; i < timeValues.length; i++) {
                                            var startDate = timeValues[0];
                                            var endDate = timeValues[i];
                                            console.log(startDate + " ||||| " + endDate);
                                            var filteredArrayActual = OnAir_Actual_Date.filter(function (item) {
                                                return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                            });
                                            var filteredArrayOnAir_Target = OnAir_Target_Date.filter(function (item) {
                                                return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                            });

                                            ActualValues.push(filteredArrayActual.length);
                                            OnAir_TargetValues.push(filteredArrayOnAir_Target.length);

                                        }
                                        console.log(ActualValues);
                                        console.log(OnAir_TargetValues);
                                        $(function () {
                                            var chart = new Highcharts.Chart({
                                                chart: {
                                                    renderTo: "chartViewDivtag",
                                                    type: "column"
                                                },
                                                title: {
                                                    text: 'Weekly On Air Progress'
                                                },
                                                subtitle: {
                                                    text: 'Source:' + data[0].createdprojectName
                                                },
                                                yAxis: {
                                                    min: 0,
                                                    title: {
                                                        text: 'No of Project'
                                                    }
                                                },
                                                plotOptions: {
                                                    column: {
                                                        stacking: 'normal'
                                                    }
                                                },
                                                series: [{
                                                        name: "On Air Target Date",
                                                        data: OnAir_TargetValues,
                                                        stack: 'target'
                                                    }, {
                                                        name: "On Air Actual Date",
                                                        data: ActualValues,
                                                        stack: 'actual'
                                                    }],
                                                xAxis: {
                                                    categories: categoriesObj
                                                }
                                            });
                                        });

                                    } else {
                                        $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Not fill target date or onair actual date.. .....</h2></div>");
                                    }
                                } else {
                                    $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No OnAir Data .....</h2></div>");
                                }
                            }
                            else {
                                $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                            }
                        } else {
                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>");
                        }
                    }
                    if (data[0].createdprojectSubCategory === "Wi-Fi") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                alert("Wi-Fi");//**********************************************************************************************
                            }
                            else {
                                chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>";
                            }
                        } else {
                            chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>";
                        }
                        $('#chartViewDivtag').html(chartViewDivtag);
                    }
                    if (data[0].createdprojectSubCategory === "Transmission_Implementation") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                //alert("Transmission_Implementation");//**********************************************************************************************

                                function findOnAir(fruit) {
                                    return fruit.Status === 'OnAir';
                                }
                                var allonair = data[0].createdprojectData.filter(findOnAir);
                                if (isNaN(allonair) !== false) {
                                    var onaliQ = jsonQ(allonair);
                                    var OnAir_Actual_Date = (onaliQ.find('OnAir_Actual_Date').value().sort());
                                    var OnAir_Target_Date = (onaliQ.find('OnAir_Target_Date').value().sort());
                                    if ((isNaN(OnAir_Target_Date) !== false) && (isNaN(OnAir_Actual_Date) !== false)) {

                                        if (OnAir_Target_Date.length !== 0) {
                                            var SystemDate = new Date().toJSON().slice(0, 10);
                                            for (i = 0; i < OnAir_Target_Date.length; i++) {
                                                var filteredOnAir_Target_Date = OnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(OnAir_Target_Date[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                });
                                            }
                                        }
                                        if (OnAir_Actual_Date.length !== 0) {
                                            var SystemDate = new Date().toJSON().slice(0, 10);
                                            for (i = 0; i < OnAir_Actual_Date.length; i++) {
                                                var filteredOnAir_Actual_Date = OnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(OnAir_Actual_Date[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                });
                                            }
                                        }
                                        var fullDateArray = filteredOnAir_Target_Date.concat(filteredOnAir_Actual_Date).sort();
                                        var d1 = Date.parse(fullDateArray[0]);
                                        if (!d1.is().saturday()) {
                                            d1.last().saturday();
                                        }
                                        var firatSaturday_one = d1.toString('yyyy-MM-dd');
                                        var firatSaturday = moment(firatSaturday_one);
                                        var BeginingfiratSaturday = moment(firatSaturday_one);
                                        var EndDateFullArray = moment(fullDateArray[fullDateArray.length - 1]);
                                        var timeValues = [];
                                        var categoriesTimeValues = [];
                                        while (firatSaturday < EndDateFullArray) {//cannot take = value.. should add nxt date because if not some date may be missing
                                            timeValues.push(firatSaturday.format('YYYY-MM-DD'));
                                            if (BeginingfiratSaturday.format('YYYY-MM-DD') !== firatSaturday.format('YYYY-MM-DD')) {
                                                categoriesTimeValues.push(firatSaturday.format('YYYY-MMMM'));
                                            }
                                            firatSaturday.add(7, 'days');
                                        }
                                        timeValues.push(EndDateFullArray.format('YYYY-MM-DD'));
                                        categoriesTimeValues.push(EndDateFullArray.format('YYYY-MMMM'));
//                                        console.log(fullDateArray);
//                                        console.log(timeValues);
//                                        console.log(timeValues.length);
//                                        console.log(categoriesTimeValues);
                                        var map = categoriesTimeValues.reduce(function (prev, cur) {
                                            prev[cur] = (prev[cur] || 0) + 1;
                                            return prev;
                                        }, {});
                                        var categoriesName = [];
                                        var categoriesWeek = [];
                                        for (var key in map) {
                                            if (map.hasOwnProperty(key)) {
                                                categoriesName.push(key);
                                                categoriesWeek.push(map[key]);
                                            }
                                        }
//                                        console.log(categoriesName);
//                                        console.log(categoriesWeek);
                                        var categoriesObj = [];
                                        if (categoriesName.length === categoriesWeek.length) {
                                            var categories = {};
                                            for (i = 0; i < categoriesName.length; i++) {
                                                var weeksObj = [];
                                                for (j = 0; j < categoriesWeek[i]; j++) {
                                                    weeksObj.push((j + 1) + " Wk");
                                                }
                                                categories = {"name": categoriesName[i], "categories": weeksObj};
                                                categoriesObj.push(categories);
                                            }
                                        }
                                        //console.log(categoriesObj);
                                        var ActualValues = [];
                                        var OnAir_TargetValues = [];
                                        for (i = 1; i < timeValues.length; i++) {
                                            var startDate = timeValues[0];
                                            var endDate = timeValues[i];
                                            console.log(startDate + " ||||| " + endDate);
                                            var filteredArrayActual = OnAir_Actual_Date.filter(function (item) {
                                                return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                            });
                                            var filteredArrayOnAir_Target = OnAir_Target_Date.filter(function (item) {
                                                return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                            });

                                            ActualValues.push(filteredArrayActual.length);
                                            OnAir_TargetValues.push(filteredArrayOnAir_Target.length);

                                        }
                                        console.log(ActualValues);
                                        console.log(OnAir_TargetValues);
                                        $(function () {
                                            var chart = new Highcharts.Chart({
                                                chart: {
                                                    renderTo: "chartViewDivtag",
                                                    type: "column"
                                                },
                                                title: {
                                                    text: 'Weekly On Air Progress'
                                                },
                                                subtitle: {
                                                    text: 'Source:' + data[0].createdprojectName
                                                },
                                                yAxis: {
                                                    min: 0,
                                                    title: {
                                                        text: 'No of Project'
                                                    }
                                                },
                                                plotOptions: {
                                                    column: {
                                                        stacking: 'normal'
                                                    }
                                                },
                                                series: [{
                                                        name: "On Air Target Date",
                                                        data: OnAir_TargetValues,
                                                        stack: 'target'
                                                    }, {
                                                        name: "On Air Actual Date",
                                                        data: ActualValues,
                                                        stack: 'actual'
                                                    }],
                                                xAxis: {
                                                    categories: categoriesObj
                                                }
                                            });
                                        });
                                    } else {
                                        $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Not fill target date or onair actual date.. .....</h2></div>");
                                    }
                                } else {
                                    $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No OnAir Data .....</h2></div>");
                                }
                            }
                            else {
                                $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                            }
                        } else {
                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>");
                        }
                    }
                    if (data[0].createdprojectCategory === "Access Network") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                alert("Access Network");//**********************************************************************************************

                            }
                            else {
                                chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>";
                            }
                        } else {
                            chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>";
                        }
                        $('#chartViewDivtag').html(chartViewDivtag);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error weekly");
                }
            });
        }
    }
}

function getSearchDateWeekly() {
    $('.daterangepicker').hide();
    $('#chartViewDivtag').html("");
    var pickerstart = new Date($("input[name=daterangepicker_start]").val());
    var pickerend = new Date($("input[name=daterangepicker_end]").val());
    $('#reportrange span').html(moment(pickerstart).format('YYYY-MMMM-DD') + ' - ' + moment(pickerend).format('YYYY-MMMM-DD'));
    var projectname = $("#projectname").val();
    var pagenumber = $('#pagenumber').val();
    if (projectname !== "null") {
        if (pagenumber === "1") {
            $.ajax({
                type: 'GET',
                url: '/ProjectStatusReportsSystem/rest/psrservices/loadprojectdetailsservices/getImplementationDateByProjectName/' + projectname,
                contentType: 'application/json',
                success: function (data, textStatus, jqXHR) {
                    if (data[0].createdprojectSubCategory === "IBS") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {
                                function findOnAir(fruit) {
                                    return fruit.Status === 'OnAir';
                                }
                                var allonair = data[0].createdprojectData.filter(findOnAir);
                                if (isNaN(allonair) !== false) {
                                    var onaliQ = jsonQ(allonair);
                                    var OnAir_Actual_Date = (onaliQ.find('OnAir_Actual_Date').value().sort());
                                    var OnAir_Target_Date = (onaliQ.find('OnAir_Target_Date').value().sort());
                                    if ((isNaN(OnAir_Target_Date) !== false) && (isNaN(OnAir_Actual_Date) !== false)) {

                                        if (OnAir_Target_Date.length !== 0) {
                                            var SystemDate = new Date().toJSON().slice(0, 10);
                                            for (i = 0; i < OnAir_Target_Date.length; i++) {
                                                var filteredOnAir_Target_Date = OnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(OnAir_Target_Date[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                });
                                            }
                                        }
                                        if (OnAir_Actual_Date.length !== 0) {
                                            var SystemDate = new Date().toJSON().slice(0, 10);
                                            for (i = 0; i < OnAir_Actual_Date.length; i++) {
                                                var filteredOnAir_Actual_Date = OnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(OnAir_Actual_Date[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                });
                                            }
                                        }
                                        var fullDateArray = filteredOnAir_Target_Date.concat(filteredOnAir_Actual_Date).sort();
                                        var Pstart = pickerstart.toString('yyyy-MM-dd');
                                        var Pend = pickerend.toString('yyyy-MM-dd');
                                        var FO = fullDateArray[0];
                                        var FEnd = fullDateArray[fullDateArray.length - 1];

                                        if ((Pstart < FO) && (Pend <= FO)) {// 1111111111111111111111111111
                                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Out Of the range</h2></div>");
                                        }
                                        if ((Pstart >= FEnd) && (Pend > FEnd)) {// 222222222222222222222222
                                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Out Of the range</h2></div>");
                                        }
                                        if ((Pstart < FO) && (Pend > FEnd)) {// 3333333333333333333333333333333333333333333333
                                            var d1 = Date.parse(fullDateArray[0]);
                                            if (!d1.is().saturday()) {
                                                d1.last().saturday();
                                            }
                                            var firatSaturday_one = d1.toString('yyyy-MM-dd');
                                            var firatSaturday = moment(firatSaturday_one);
                                            var BeginingfiratSaturday = moment(firatSaturday_one);
                                            var EndDateFullArray = moment(fullDateArray[fullDateArray.length - 1]);
                                            var timeValues = [];
                                            var categoriesTimeValues = [];
                                            while (firatSaturday < EndDateFullArray) {//cannot take = value.. should add nxt date because if not some date may be missing
                                                timeValues.push(firatSaturday.format('YYYY-MM-DD'));
                                                if (BeginingfiratSaturday.format('YYYY-MM-DD') !== firatSaturday.format('YYYY-MM-DD')) {
                                                    categoriesTimeValues.push(firatSaturday.format('YYYY-MMMM'));
                                                }
                                                firatSaturday.add(7, 'days');
                                            }
                                            timeValues.push(EndDateFullArray.format('YYYY-MM-DD'));
                                            categoriesTimeValues.push(EndDateFullArray.format('YYYY-MMMM'));
//                                        console.log(fullDateArray);
//                                        console.log(timeValues);
//                                        console.log(timeValues.length);
//                                        console.log(categoriesTimeValues);
                                            var map = categoriesTimeValues.reduce(function (prev, cur) {
                                                prev[cur] = (prev[cur] || 0) + 1;
                                                return prev;
                                            }, {});
                                            var categoriesName = [];
                                            var categoriesWeek = [];
                                            for (var key in map) {
                                                if (map.hasOwnProperty(key)) {
                                                    categoriesName.push(key);
                                                    categoriesWeek.push(map[key]);
                                                }
                                            }
//                                        console.log(categoriesName);
//                                        console.log(categoriesWeek);
                                            var categoriesObj = [];
                                            if (categoriesName.length === categoriesWeek.length) {
                                                var categories = {};
                                                for (i = 0; i < categoriesName.length; i++) {
                                                    var weeksObj = [];
                                                    for (j = 0; j < categoriesWeek[i]; j++) {
                                                        weeksObj.push((j + 1) + " Wk");
                                                    }
                                                    categories = {"name": categoriesName[i], "categories": weeksObj};
                                                    categoriesObj.push(categories);
                                                }
                                            }
                                            //console.log(categoriesObj);
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            for (i = 1; i < timeValues.length; i++) {
                                                var startDate = timeValues[0];
                                                var endDate = timeValues[i];
                                                console.log(startDate + " ||||| " + endDate);
                                                var filteredArrayActual = OnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var filteredArrayOnAir_Target = OnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });

                                                ActualValues.push(filteredArrayActual.length);
                                                OnAir_TargetValues.push(filteredArrayOnAir_Target.length);

                                            }
                                            console.log(ActualValues);
                                            console.log(OnAir_TargetValues);
                                            $(function () {
                                                var chart = new Highcharts.Chart({
                                                    chart: {
                                                        renderTo: "chartViewDivtag",
                                                        type: "column"
                                                    },
                                                    title: {
                                                        text: 'Weekly OnAir Progress'
                                                    },
                                                    subtitle: {
                                                        text: 'Source:' + data[0].createdprojectName
                                                    },
                                                    yAxis: {
                                                        min: 0,
                                                        title: {
                                                            text: 'No of Project'
                                                        }
                                                    },
                                                    plotOptions: {
                                                        column: {
                                                            stacking: 'normal'
                                                        }
                                                    },
                                                    series: [{
                                                            name: "On Air Target Date",
                                                            data: OnAir_TargetValues,
                                                            stack: 'target'
                                                        }, {
                                                            name: "On Air Actual Date",
                                                            data: ActualValues,
                                                            stack: 'actual'
                                                        }],
                                                    xAxis: {
                                                        categories: categoriesObj
                                                    }
                                                });
                                            });
                                        }
                                        if ((Pstart < FO) && ((FO < Pend) && (Pend <= FEnd))) {//44444444444444444444444444444444444
                                            var d1 = Date.parse(fullDateArray[0]);
                                            if (!d1.is().saturday()) {
                                                d1.last().saturday();
                                            }
                                            var firatSaturday_one = d1.toString('yyyy-MM-dd');
                                            var firatSaturday = moment(firatSaturday_one);
                                            var BeginingfiratSaturday = moment(firatSaturday_one);
                                            var EndDateFullArray = moment(Pend);//change
                                            var timeValues = [];
                                            var categoriesTimeValues = [];
                                            while (firatSaturday < EndDateFullArray) {//cannot take = value.. should add nxt date because if not some date may be missing
                                                timeValues.push(firatSaturday.format('YYYY-MM-DD'));
                                                if (BeginingfiratSaturday.format('YYYY-MM-DD') !== firatSaturday.format('YYYY-MM-DD')) {
                                                    categoriesTimeValues.push(firatSaturday.format('YYYY-MMMM'));
                                                }
                                                firatSaturday.add(7, 'days');
                                            }
                                            timeValues.push(EndDateFullArray.format('YYYY-MM-DD'));
                                            categoriesTimeValues.push(EndDateFullArray.format('YYYY-MMMM'));
//                                        console.log(fullDateArray);
//                                        console.log(timeValues);
//                                        console.log(timeValues.length);
//                                        console.log(categoriesTimeValues);
                                            var map = categoriesTimeValues.reduce(function (prev, cur) {
                                                prev[cur] = (prev[cur] || 0) + 1;
                                                return prev;
                                            }, {});
                                            var categoriesName = [];
                                            var categoriesWeek = [];
                                            for (var key in map) {
                                                if (map.hasOwnProperty(key)) {
                                                    categoriesName.push(key);
                                                    categoriesWeek.push(map[key]);
                                                }
                                            }
//                                        console.log(categoriesName);
//                                        console.log(categoriesWeek);
                                            var categoriesObj = [];
                                            if (categoriesName.length === categoriesWeek.length) {
                                                var categories = {};
                                                for (i = 0; i < categoriesName.length; i++) {
                                                    var weeksObj = [];
                                                    for (j = 0; j < categoriesWeek[i]; j++) {
                                                        weeksObj.push((j + 1) + " Wk");
                                                    }
                                                    categories = {"name": categoriesName[i], "categories": weeksObj};
                                                    categoriesObj.push(categories);
                                                }
                                            }
                                            //console.log(categoriesObj);
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            for (i = 1; i < timeValues.length; i++) {
                                                var startDate = timeValues[0];
                                                var endDate = timeValues[i];
                                                console.log(startDate + " ||||| " + endDate);
                                                var filteredArrayActual = OnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var filteredArrayOnAir_Target = OnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });

                                                ActualValues.push(filteredArrayActual.length);
                                                OnAir_TargetValues.push(filteredArrayOnAir_Target.length);

                                            }
                                            console.log(ActualValues);
                                            console.log(OnAir_TargetValues);
                                            $(function () {
                                                var chart = new Highcharts.Chart({
                                                    chart: {
                                                        renderTo: "chartViewDivtag",
                                                        type: "column"
                                                    },
                                                    title: {
                                                        text: 'Weekly OnAir Progress'
                                                    },
                                                    subtitle: {
                                                        text: 'Source:' + data[0].createdprojectName
                                                    },
                                                    yAxis: {
                                                        min: 0,
                                                        title: {
                                                            text: 'No of Project'
                                                        }
                                                    },
                                                    plotOptions: {
                                                        column: {
                                                            stacking: 'normal'
                                                        }
                                                    },
                                                    series: [{
                                                            name: "On Air Target Date",
                                                            data: OnAir_TargetValues,
                                                            stack: 'target'
                                                        }, {
                                                            name: "On Air Actual Date",
                                                            data: ActualValues,
                                                            stack: 'actual'
                                                        }],
                                                    xAxis: {
                                                        categories: categoriesObj
                                                    }
                                                });
                                            });
                                        }
                                        if ((Pstart >= FO) && (Pend <= FEnd)) {//555555555555555555555555555555555555555555555555
                                            var d1 = Date.parse(Pstart);//change
                                            if (!d1.is().saturday()) {
                                                d1.last().saturday();
                                            }
                                            var firatSaturday_one = d1.toString('yyyy-MM-dd');
                                            var firatSaturday = moment(firatSaturday_one);
                                            var BeginingfiratSaturday = moment(firatSaturday_one);
                                            var EndDateFullArray = moment(Pend);//change
                                            var timeValues = [];
                                            var categoriesTimeValues = [];
                                            while (firatSaturday < EndDateFullArray) {//cannot take = equal value.. should add nxt date because if not some date may be missing
                                                timeValues.push(firatSaturday.format('YYYY-MM-DD'));
                                                if (BeginingfiratSaturday.format('YYYY-MM-DD') !== firatSaturday.format('YYYY-MM-DD')) {
                                                    categoriesTimeValues.push(firatSaturday.format('YYYY-MMMM'));
                                                }
                                                firatSaturday.add(7, 'days');
                                            }
                                            timeValues.push(EndDateFullArray.format('YYYY-MM-DD'));
                                            categoriesTimeValues.push(EndDateFullArray.format('YYYY-MMMM'));
//                                            console.log(fullDateArray);
//                                            console.log(timeValues);
//                                            console.log(timeValues.length);
//                                            console.log(categoriesTimeValues);
                                            var map = categoriesTimeValues.reduce(function (prev, cur) {
                                                prev[cur] = (prev[cur] || 0) + 1;
                                                return prev;
                                            }, {});
                                            var categoriesName = [];
                                            var categoriesWeek = [];
                                            for (var key in map) {
                                                if (map.hasOwnProperty(key)) {
                                                    categoriesName.push(key);
                                                    categoriesWeek.push(map[key]);
                                                }
                                            }
//                                            console.log(categoriesName);
//                                            console.log(categoriesWeek);
                                            var categoriesObj = [];
                                            if (categoriesName.length === categoriesWeek.length) {
                                                var categories = {};
                                                for (i = 0; i < categoriesName.length; i++) {
                                                    var weeksObj = [];
                                                    for (j = 0; j < categoriesWeek[i]; j++) {
                                                        weeksObj.push((j + 1) + " Wk");
                                                    }
                                                    categories = {"name": categoriesName[i], "categories": weeksObj};
                                                    categoriesObj.push(categories);
                                                }
                                            }
                                            //console.log(categoriesObj);
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            for (i = 1; i < timeValues.length; i++) {
                                                var startDate = fullDateArray[0];//change
                                                var endDate = timeValues[i];
                                                console.log(startDate + " ||||| " + endDate);
                                                var filteredArrayActual = OnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var filteredArrayOnAir_Target = OnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });

                                                ActualValues.push(filteredArrayActual.length);
                                                OnAir_TargetValues.push(filteredArrayOnAir_Target.length);

                                            }
//                                            console.log(ActualValues);
//                                            console.log(OnAir_TargetValues);
                                            $(function () {
                                                var chart = new Highcharts.Chart({
                                                    chart: {
                                                        renderTo: "chartViewDivtag",
                                                        type: "column"
                                                    },
                                                    title: {
                                                        text: 'Weekly OnAir Progress'
                                                    },
                                                    subtitle: {
                                                        text: 'Source:' + data[0].createdprojectName
                                                    },
                                                    yAxis: {
                                                        min: 0,
                                                        title: {
                                                            text: 'No of Project'
                                                        }
                                                    },
                                                    plotOptions: {
                                                        column: {
                                                            stacking: 'normal'
                                                        }
                                                    },
                                                    series: [{
                                                            name: "On Air Target Date",
                                                            data: OnAir_TargetValues,
                                                            stack: 'target'
                                                        }, {
                                                            name: "On Air Actual Date",
                                                            data: ActualValues,
                                                            stack: 'actual'
                                                        }],
                                                    xAxis: {
                                                        categories: categoriesObj
                                                    }
                                                });
                                            });
                                        }
                                        if (((FO <= Pstart) && (Pstart < FEnd)) && (Pend > FEnd)) {// 66666666666666666666666666666
                                            var d1 = Date.parse(Pstart);//change
                                            if (!d1.is().saturday()) {
                                                d1.last().saturday();
                                            }
                                            var firatSaturday_one = d1.toString('yyyy-MM-dd');
                                            var firatSaturday = moment(firatSaturday_one);
                                            var BeginingfiratSaturday = moment(firatSaturday_one);
                                            var EndDateFullArray = moment(fullDateArray[fullDateArray.length - 1]);
                                            var timeValues = [];
                                            var categoriesTimeValues = [];
                                            while (firatSaturday < EndDateFullArray) {//cannot take = value.. should add nxt date because if not some date may be missing
                                                timeValues.push(firatSaturday.format('YYYY-MM-DD'));
                                                if (BeginingfiratSaturday.format('YYYY-MM-DD') !== firatSaturday.format('YYYY-MM-DD')) {
                                                    categoriesTimeValues.push(firatSaturday.format('YYYY-MMMM'));
                                                }
                                                firatSaturday.add(7, 'days');
                                            }
                                            timeValues.push(EndDateFullArray.format('YYYY-MM-DD'));
                                            categoriesTimeValues.push(EndDateFullArray.format('YYYY-MMMM'));
//                                            console.log(fullDateArray);
//                                            console.log(timeValues);
//                                            console.log(timeValues.length);
//                                            console.log(categoriesTimeValues);
                                            var map = categoriesTimeValues.reduce(function (prev, cur) {
                                                prev[cur] = (prev[cur] || 0) + 1;
                                                return prev;
                                            }, {});
                                            var categoriesName = [];
                                            var categoriesWeek = [];
                                            for (var key in map) {
                                                if (map.hasOwnProperty(key)) {
                                                    categoriesName.push(key);
                                                    categoriesWeek.push(map[key]);
                                                }
                                            }
//                                            console.log(categoriesName);
//                                            console.log(categoriesWeek);
                                            var categoriesObj = [];
                                            if (categoriesName.length === categoriesWeek.length) {
                                                var categories = {};
                                                for (i = 0; i < categoriesName.length; i++) {
                                                    var weeksObj = [];
                                                    for (j = 0; j < categoriesWeek[i]; j++) {
                                                        weeksObj.push((j + 1) + " Wk");
                                                    }
                                                    categories = {"name": categoriesName[i], "categories": weeksObj};
                                                    categoriesObj.push(categories);
                                                }
                                            }
                                            //console.log(categoriesObj);
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            for (i = 1; i < timeValues.length; i++) {
                                                var startDate = fullDateArray[0];//change
                                                var endDate = timeValues[i];
                                                console.log(startDate + " ||||| " + endDate);
                                                var filteredArrayActual = OnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var filteredArrayOnAir_Target = OnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });

                                                ActualValues.push(filteredArrayActual.length);
                                                OnAir_TargetValues.push(filteredArrayOnAir_Target.length);

                                            }
//                                            console.log(ActualValues);
//                                            console.log(OnAir_TargetValues);
                                            $(function () {
                                                var chart = new Highcharts.Chart({
                                                    chart: {
                                                        renderTo: "chartViewDivtag",
                                                        type: "column"
                                                    },
                                                    title: {
                                                        text: 'Weekly OnAir Progress'
                                                    },
                                                    subtitle: {
                                                        text: 'Source:' + data[0].createdprojectName
                                                    },
                                                    yAxis: {
                                                        min: 0,
                                                        title: {
                                                            text: 'No of Project'
                                                        }
                                                    },
                                                    plotOptions: {
                                                        column: {
                                                            stacking: 'normal'
                                                        }
                                                    },
                                                    series: [{
                                                            name: "On Air Target Date",
                                                            data: OnAir_TargetValues,
                                                            stack: 'target'
                                                        }, {
                                                            name: "On Air Actual Date",
                                                            data: ActualValues,
                                                            stack: 'actual'
                                                        }],
                                                    xAxis: {
                                                        categories: categoriesObj
                                                    }
                                                });
                                            });
                                        }


                                    } else {
                                        $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Not fill target date or onair actual date.. .....</h2></div>");
                                    }
                                } else {
                                    $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No OnAir Data .....</h2></div>");
                                }
                            }
                            else {
                                $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                            }
                        } else {
                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>");
                        }
                    }
                    if (data[0].createdprojectSubCategory === "Wi-Fi") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                alert("Wi-Fi");//**********************************************************************************************
                            }
                            else {
                                chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>";
                            }
                        } else {
                            chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>";
                        }
                        $('#chartViewDivtag').html(chartViewDivtag);
                    }
                    if (data[0].createdprojectSubCategory === "Transmission_Implementation") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                // alert("Transmission_Implementation");//**********************************************************************************************

                                function findOnAir(fruit) {
                                    return fruit.Status === 'OnAir';
                                }
                                var allonair = data[0].createdprojectData.filter(findOnAir);
                                if (isNaN(allonair) !== false) {
                                    var onaliQ = jsonQ(allonair);
                                    var OnAir_Actual_Date = (onaliQ.find('OnAir_Actual_Date').value().sort());
                                    var OnAir_Target_Date = (onaliQ.find('OnAir_Target_Date').value().sort());
                                    if ((isNaN(OnAir_Target_Date) !== false) && (isNaN(OnAir_Actual_Date) !== false)) {

                                        if (OnAir_Target_Date.length !== 0) {
                                            var SystemDate = new Date().toJSON().slice(0, 10);
                                            for (i = 0; i < OnAir_Target_Date.length; i++) {
                                                var filteredOnAir_Target_Date = OnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(OnAir_Target_Date[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                });
                                            }
                                        }
                                        if (OnAir_Actual_Date.length !== 0) {
                                            var SystemDate = new Date().toJSON().slice(0, 10);
                                            for (i = 0; i < OnAir_Actual_Date.length; i++) {
                                                var filteredOnAir_Actual_Date = OnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(OnAir_Actual_Date[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                });
                                            }
                                        }
                                        var fullDateArray = filteredOnAir_Target_Date.concat(filteredOnAir_Actual_Date).sort();
                                        var Pstart = pickerstart.toString('yyyy-MM-dd');
                                        var Pend = pickerend.toString('yyyy-MM-dd');
                                        var FO = fullDateArray[0];
                                        var FEnd = fullDateArray[fullDateArray.length - 1];

                                        if ((Pstart < FO) && (Pend <= FO)) {// 1111111111111111111111111111
                                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Out Of the range</h2></div>");
                                        }
                                        if ((Pstart >= FEnd) && (Pend > FEnd)) {// 222222222222222222222222
                                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Out Of the range</h2></div>");
                                        }
                                        if ((Pstart < FO) && (Pend > FEnd)) {// 3333333333333333333333333333333333333333333333
                                            var d1 = Date.parse(fullDateArray[0]);
                                            if (!d1.is().saturday()) {
                                                d1.last().saturday();
                                            }
                                            var firatSaturday_one = d1.toString('yyyy-MM-dd');
                                            var firatSaturday = moment(firatSaturday_one);
                                            var BeginingfiratSaturday = moment(firatSaturday_one);
                                            var EndDateFullArray = moment(fullDateArray[fullDateArray.length - 1]);
                                            var timeValues = [];
                                            var categoriesTimeValues = [];
                                            while (firatSaturday < EndDateFullArray) {//cannot take = value.. should add nxt date because if not some date may be missing
                                                timeValues.push(firatSaturday.format('YYYY-MM-DD'));
                                                if (BeginingfiratSaturday.format('YYYY-MM-DD') !== firatSaturday.format('YYYY-MM-DD')) {
                                                    categoriesTimeValues.push(firatSaturday.format('YYYY-MMMM'));
                                                }
                                                firatSaturday.add(7, 'days');
                                            }
                                            timeValues.push(EndDateFullArray.format('YYYY-MM-DD'));
                                            categoriesTimeValues.push(EndDateFullArray.format('YYYY-MMMM'));
//                                        console.log(fullDateArray);
//                                        console.log(timeValues);
//                                        console.log(timeValues.length);
//                                        console.log(categoriesTimeValues);
                                            var map = categoriesTimeValues.reduce(function (prev, cur) {
                                                prev[cur] = (prev[cur] || 0) + 1;
                                                return prev;
                                            }, {});
                                            var categoriesName = [];
                                            var categoriesWeek = [];
                                            for (var key in map) {
                                                if (map.hasOwnProperty(key)) {
                                                    categoriesName.push(key);
                                                    categoriesWeek.push(map[key]);
                                                }
                                            }
//                                        console.log(categoriesName);
//                                        console.log(categoriesWeek);
                                            var categoriesObj = [];
                                            if (categoriesName.length === categoriesWeek.length) {
                                                var categories = {};
                                                for (i = 0; i < categoriesName.length; i++) {
                                                    var weeksObj = [];
                                                    for (j = 0; j < categoriesWeek[i]; j++) {
                                                        weeksObj.push((j + 1) + " Wk");
                                                    }
                                                    categories = {"name": categoriesName[i], "categories": weeksObj};
                                                    categoriesObj.push(categories);
                                                }
                                            }
                                            //console.log(categoriesObj);
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            for (i = 1; i < timeValues.length; i++) {
                                                var startDate = timeValues[0];
                                                var endDate = timeValues[i];
                                                console.log(startDate + " ||||| " + endDate);
                                                var filteredArrayActual = OnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var filteredArrayOnAir_Target = OnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });

                                                ActualValues.push(filteredArrayActual.length);
                                                OnAir_TargetValues.push(filteredArrayOnAir_Target.length);

                                            }
                                            console.log(ActualValues);
                                            console.log(OnAir_TargetValues);
                                            $(function () {
                                                var chart = new Highcharts.Chart({
                                                    chart: {
                                                        renderTo: "chartViewDivtag",
                                                        type: "column"
                                                    },
                                                    title: {
                                                        text: 'Weekly OnAir Progress'
                                                    },
                                                    subtitle: {
                                                        text: 'Source:' + data[0].createdprojectName
                                                    },
                                                    yAxis: {
                                                        min: 0,
                                                        title: {
                                                            text: 'No of Project'
                                                        }
                                                    },
                                                    plotOptions: {
                                                        column: {
                                                            stacking: 'normal'
                                                        }
                                                    },
                                                    series: [{
                                                            name: "On Air Target Date",
                                                            data: OnAir_TargetValues,
                                                            stack: 'target'
                                                        }, {
                                                            name: "On Air Actual Date",
                                                            data: ActualValues,
                                                            stack: 'actual'
                                                        }],
                                                    xAxis: {
                                                        categories: categoriesObj
                                                    }
                                                });
                                            });
                                        }
                                        if ((Pstart < FO) && ((FO < Pend) && (Pend <= FEnd))) {//44444444444444444444444444444444444
                                            var d1 = Date.parse(fullDateArray[0]);
                                            if (!d1.is().saturday()) {
                                                d1.last().saturday();
                                            }
                                            var firatSaturday_one = d1.toString('yyyy-MM-dd');
                                            var firatSaturday = moment(firatSaturday_one);
                                            var BeginingfiratSaturday = moment(firatSaturday_one);
                                            var EndDateFullArray = moment(Pend);//change
                                            var timeValues = [];
                                            var categoriesTimeValues = [];
                                            while (firatSaturday < EndDateFullArray) {//cannot take = value.. should add nxt date because if not some date may be missing
                                                timeValues.push(firatSaturday.format('YYYY-MM-DD'));
                                                if (BeginingfiratSaturday.format('YYYY-MM-DD') !== firatSaturday.format('YYYY-MM-DD')) {
                                                    categoriesTimeValues.push(firatSaturday.format('YYYY-MMMM'));
                                                }
                                                firatSaturday.add(7, 'days');
                                            }
                                            timeValues.push(EndDateFullArray.format('YYYY-MM-DD'));
                                            categoriesTimeValues.push(EndDateFullArray.format('YYYY-MMMM'));
//                                        console.log(fullDateArray);
//                                        console.log(timeValues);
//                                        console.log(timeValues.length);
//                                        console.log(categoriesTimeValues);
                                            var map = categoriesTimeValues.reduce(function (prev, cur) {
                                                prev[cur] = (prev[cur] || 0) + 1;
                                                return prev;
                                            }, {});
                                            var categoriesName = [];
                                            var categoriesWeek = [];
                                            for (var key in map) {
                                                if (map.hasOwnProperty(key)) {
                                                    categoriesName.push(key);
                                                    categoriesWeek.push(map[key]);
                                                }
                                            }
//                                        console.log(categoriesName);
//                                        console.log(categoriesWeek);
                                            var categoriesObj = [];
                                            if (categoriesName.length === categoriesWeek.length) {
                                                var categories = {};
                                                for (i = 0; i < categoriesName.length; i++) {
                                                    var weeksObj = [];
                                                    for (j = 0; j < categoriesWeek[i]; j++) {
                                                        weeksObj.push((j + 1) + " Wk");
                                                    }
                                                    categories = {"name": categoriesName[i], "categories": weeksObj};
                                                    categoriesObj.push(categories);
                                                }
                                            }
                                            //console.log(categoriesObj);
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            for (i = 1; i < timeValues.length; i++) {
                                                var startDate = timeValues[0];
                                                var endDate = timeValues[i];
                                                console.log(startDate + " ||||| " + endDate);
                                                var filteredArrayActual = OnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var filteredArrayOnAir_Target = OnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });

                                                ActualValues.push(filteredArrayActual.length);
                                                OnAir_TargetValues.push(filteredArrayOnAir_Target.length);

                                            }
                                            console.log(ActualValues);
                                            console.log(OnAir_TargetValues);
                                            $(function () {
                                                var chart = new Highcharts.Chart({
                                                    chart: {
                                                        renderTo: "chartViewDivtag",
                                                        type: "column"
                                                    },
                                                    title: {
                                                        text: 'Weekly OnAir Progress'
                                                    },
                                                    subtitle: {
                                                        text: 'Source:' + data[0].createdprojectName
                                                    },
                                                    yAxis: {
                                                        min: 0,
                                                        title: {
                                                            text: 'No of Project'
                                                        }
                                                    },
                                                    plotOptions: {
                                                        column: {
                                                            stacking: 'normal'
                                                        }
                                                    },
                                                    series: [{
                                                            name: "On Air Target Date",
                                                            data: OnAir_TargetValues,
                                                            stack: 'target'
                                                        }, {
                                                            name: "On Air Actual Date",
                                                            data: ActualValues,
                                                            stack: 'actual'
                                                        }],
                                                    xAxis: {
                                                        categories: categoriesObj
                                                    }
                                                });
                                            });
                                        }
                                        if ((Pstart >= FO) && (Pend <= FEnd)) {//555555555555555555555555555555555555555555555555
                                            var d1 = Date.parse(Pstart);//change
                                            if (!d1.is().saturday()) {
                                                d1.last().saturday();
                                            }
                                            var firatSaturday_one = d1.toString('yyyy-MM-dd');
                                            var firatSaturday = moment(firatSaturday_one);
                                            var BeginingfiratSaturday = moment(firatSaturday_one);
                                            var EndDateFullArray = moment(Pend);//change
                                            var timeValues = [];
                                            var categoriesTimeValues = [];
                                            while (firatSaturday < EndDateFullArray) {//cannot take = equal value.. should add nxt date because if not some date may be missing
                                                timeValues.push(firatSaturday.format('YYYY-MM-DD'));
                                                if (BeginingfiratSaturday.format('YYYY-MM-DD') !== firatSaturday.format('YYYY-MM-DD')) {
                                                    categoriesTimeValues.push(firatSaturday.format('YYYY-MMMM'));
                                                }
                                                firatSaturday.add(7, 'days');
                                            }
                                            timeValues.push(EndDateFullArray.format('YYYY-MM-DD'));
                                            categoriesTimeValues.push(EndDateFullArray.format('YYYY-MMMM'));
//                                            console.log(fullDateArray);
//                                            console.log(timeValues);
//                                            console.log(timeValues.length);
//                                            console.log(categoriesTimeValues);
                                            var map = categoriesTimeValues.reduce(function (prev, cur) {
                                                prev[cur] = (prev[cur] || 0) + 1;
                                                return prev;
                                            }, {});
                                            var categoriesName = [];
                                            var categoriesWeek = [];
                                            for (var key in map) {
                                                if (map.hasOwnProperty(key)) {
                                                    categoriesName.push(key);
                                                    categoriesWeek.push(map[key]);
                                                }
                                            }
//                                            console.log(categoriesName);
//                                            console.log(categoriesWeek);
                                            var categoriesObj = [];
                                            if (categoriesName.length === categoriesWeek.length) {
                                                var categories = {};
                                                for (i = 0; i < categoriesName.length; i++) {
                                                    var weeksObj = [];
                                                    for (j = 0; j < categoriesWeek[i]; j++) {
                                                        weeksObj.push((j + 1) + " Wk");
                                                    }
                                                    categories = {"name": categoriesName[i], "categories": weeksObj};
                                                    categoriesObj.push(categories);
                                                }
                                            }
                                            //console.log(categoriesObj);
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            for (i = 1; i < timeValues.length; i++) {
                                                var startDate = fullDateArray[0];//change
                                                var endDate = timeValues[i];
                                                console.log(startDate + " ||||| " + endDate);
                                                var filteredArrayActual = OnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var filteredArrayOnAir_Target = OnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });

                                                ActualValues.push(filteredArrayActual.length);
                                                OnAir_TargetValues.push(filteredArrayOnAir_Target.length);

                                            }
//                                            console.log(ActualValues);
//                                            console.log(OnAir_TargetValues);
                                            $(function () {
                                                var chart = new Highcharts.Chart({
                                                    chart: {
                                                        renderTo: "chartViewDivtag",
                                                        type: "column"
                                                    },
                                                    title: {
                                                        text: 'Weekly OnAir Progress'
                                                    },
                                                    subtitle: {
                                                        text: 'Source:' + data[0].createdprojectName
                                                    },
                                                    yAxis: {
                                                        min: 0,
                                                        title: {
                                                            text: 'No of Project'
                                                        }
                                                    },
                                                    plotOptions: {
                                                        column: {
                                                            stacking: 'normal'
                                                        }
                                                    },
                                                    series: [{
                                                            name: "On Air Target Date",
                                                            data: OnAir_TargetValues,
                                                            stack: 'target'
                                                        }, {
                                                            name: "On Air Actual Date",
                                                            data: ActualValues,
                                                            stack: 'actual'
                                                        }],
                                                    xAxis: {
                                                        categories: categoriesObj
                                                    }
                                                });
                                            });
                                        }
                                        if (((FO <= Pstart) && (Pstart < FEnd)) && (Pend > FEnd)) {// 66666666666666666666666666666
                                            var d1 = Date.parse(Pstart);//change
                                            if (!d1.is().saturday()) {
                                                d1.last().saturday();
                                            }
                                            var firatSaturday_one = d1.toString('yyyy-MM-dd');
                                            var firatSaturday = moment(firatSaturday_one);
                                            var BeginingfiratSaturday = moment(firatSaturday_one);
                                            var EndDateFullArray = moment(fullDateArray[fullDateArray.length - 1]);
                                            var timeValues = [];
                                            var categoriesTimeValues = [];
                                            while (firatSaturday < EndDateFullArray) {//cannot take = value.. should add nxt date because if not some date may be missing
                                                timeValues.push(firatSaturday.format('YYYY-MM-DD'));
                                                if (BeginingfiratSaturday.format('YYYY-MM-DD') !== firatSaturday.format('YYYY-MM-DD')) {
                                                    categoriesTimeValues.push(firatSaturday.format('YYYY-MMMM'));
                                                }
                                                firatSaturday.add(7, 'days');
                                            }
                                            timeValues.push(EndDateFullArray.format('YYYY-MM-DD'));
                                            categoriesTimeValues.push(EndDateFullArray.format('YYYY-MMMM'));
//                                            console.log(fullDateArray);
//                                            console.log(timeValues);
//                                            console.log(timeValues.length);
//                                            console.log(categoriesTimeValues);
                                            var map = categoriesTimeValues.reduce(function (prev, cur) {
                                                prev[cur] = (prev[cur] || 0) + 1;
                                                return prev;
                                            }, {});
                                            var categoriesName = [];
                                            var categoriesWeek = [];
                                            for (var key in map) {
                                                if (map.hasOwnProperty(key)) {
                                                    categoriesName.push(key);
                                                    categoriesWeek.push(map[key]);
                                                }
                                            }
//                                            console.log(categoriesName);
//                                            console.log(categoriesWeek);
                                            var categoriesObj = [];
                                            if (categoriesName.length === categoriesWeek.length) {
                                                var categories = {};
                                                for (i = 0; i < categoriesName.length; i++) {
                                                    var weeksObj = [];
                                                    for (j = 0; j < categoriesWeek[i]; j++) {
                                                        weeksObj.push((j + 1) + " Wk");
                                                    }
                                                    categories = {"name": categoriesName[i], "categories": weeksObj};
                                                    categoriesObj.push(categories);
                                                }
                                            }
                                            //console.log(categoriesObj);
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            for (i = 1; i < timeValues.length; i++) {
                                                var startDate = fullDateArray[0];//change
                                                var endDate = timeValues[i];
                                                console.log(startDate + " ||||| " + endDate);
                                                var filteredArrayActual = OnAir_Actual_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var filteredArrayOnAir_Target = OnAir_Target_Date.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });

                                                ActualValues.push(filteredArrayActual.length);
                                                OnAir_TargetValues.push(filteredArrayOnAir_Target.length);

                                            }
//                                            console.log(ActualValues);
//                                            console.log(OnAir_TargetValues);
                                            $(function () {
                                                var chart = new Highcharts.Chart({
                                                    chart: {
                                                        renderTo: "chartViewDivtag",
                                                        type: "column"
                                                    },
                                                    title: {
                                                        text: 'Weekly OnAir Progress'
                                                    },
                                                    subtitle: {
                                                        text: 'Source:' + data[0].createdprojectName
                                                    },
                                                    yAxis: {
                                                        min: 0,
                                                        title: {
                                                            text: 'No of Project'
                                                        }
                                                    },
                                                    plotOptions: {
                                                        column: {
                                                            stacking: 'normal'
                                                        }
                                                    },
                                                    series: [{
                                                            name: "On Air Target Date",
                                                            data: OnAir_TargetValues,
                                                            stack: 'target'
                                                        }, {
                                                            name: "On Air Actual Date",
                                                            data: ActualValues,
                                                            stack: 'actual'
                                                        }],
                                                    xAxis: {
                                                        categories: categoriesObj
                                                    }
                                                });
                                            });
                                        }


                                    } else {
                                        $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Not fill target date or onair actual date.. .....</h2></div>");
                                    }
                                } else {
                                    $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No OnAir Data .....</h2></div>");
                                }



                            }
                            else {
                                $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                            }
                        } else {
                            $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>");
                        }
                    }
                    if (data[0].createdprojectCategory === "Access Network") {
                        var chartViewDivtag = "";
                        if (isNaN(data[0].createdprojectData) !== false) {
                            var StatusData = jsonQ(data[0].createdprojectData);
                            var AllStatesData = StatusData.find('Status');
                            var StatusCount = {};
                            AllStatesData.value().forEach(function (i) {
                                StatusCount[i] = (StatusCount[i] || 0) + 1;
                            });
                            if (AllStatesData.length !== 0) {

                                alert("Access Network");//**********************************************************************************************

                            }
                            else {
                                chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>";
                            }
                        } else {
                            chartViewDivtag = "<div style='padding:150px'><h2 style='color:red'>No Any Data .....</h2></div>";
                        }
                        $('#chartViewDivtag').html(chartViewDivtag);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error weekly");
                }
            });
        }
    }
}
