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

//                                develop a new function for change trget date
                                function findTargetDate(fruit) {
                                    return fruit.Site_ID !== null && fruit.Site_ID !== "";
                                }
                                var targetAlldate = data[0].createdprojectData.filter(findTargetDate);

                                var allonair = data[0].createdprojectData.filter(findOnAir);
                                if ((isNaN(allonair) !== false) && isNaN(targetAlldate) !== false) {
                                    var onaliQ = jsonQ(allonair);
                                    var OnAir_Actual_Date = (onaliQ.find('OnAir_Actual_Date').value().sort());
//                                    var OnAir_Target_Date = (onaliQ.find('OnAir_Target_Date').value().sort());

//                                    new target date function
                                    var dateQ = jsonQ(targetAlldate);
                                    var OnAir_Target_Date = (dateQ.find('OnAir_Target_Date').value().sort());


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
//                                        console.log(filteredOnAir_Target_Date);
//                                        console.log(filteredOnAir_Actual_Date);
//                                        console.log(fullDateArray);
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
//                                        console.log(fullDateArray);
//                                        console.log(timeValues);
//                                        console.log(timeValuesBarHeightStart);
//                                        console.log(timeValuesBarHeightEnd);
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

                                // alert("Wi-Fi");//**********************************************************************************************
                                function findOnAir(fruit) {
                                    return fruit.Status === 'OnAir';
                                }
                                function findOnAirRemoved(fruit) {
                                    return fruit.Status === 'OnAir & Removed';
                                }
                                function findOnAirBlocked(fruit) {
                                    return fruit.Status === 'OnAir & Blocked';
                                }
                                function findOnAirPOC(fruit) {
                                    return fruit.Status === 'OnAir & POC';
                                }
                                var allonairOnly = data[0].createdprojectData.filter(findOnAir);
                                var allonairRemoved = data[0].createdprojectData.filter(findOnAirRemoved);
                                var allonairBlocked = data[0].createdprojectData.filter(findOnAirBlocked);
                                var allonairPoc = data[0].createdprojectData.filter(findOnAirPOC);

                                var allonair = [];
                                if (allonairOnly.length !== 0) {
                                    if (allonairRemoved.length !== 0) {
                                        if (allonairBlocked.length !== 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairOnly.concat(allonairRemoved).concat(allonairBlocked).concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairOnly.concat(allonairRemoved).concat(allonairBlocked);
                                            }
                                        }
                                        if (allonairBlocked.length === 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairOnly.concat(allonairRemoved).concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairOnly.concat(allonairRemoved);
                                            }
                                        }
                                    }
                                    if (allonairRemoved.length === 0) {
                                        if (allonairBlocked.length !== 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairOnly.concat(allonairBlocked).concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairOnly.concat(allonairBlocked);
                                            }
                                        }
                                        if (allonairBlocked.length === 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairOnly.concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairOnly;
                                            }
                                        }
                                    }
                                }
                                if (allonairOnly.length === 0) {
                                    if (allonairRemoved.length !== 0) {
                                        if (allonairBlocked.length !== 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairRemoved.concat(allonairBlocked).concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairRemoved.concat(allonairBlocked);
                                            }
                                        }
                                        if (allonairBlocked.length === 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairRemoved.concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairRemoved;
                                            }
                                        }
                                    }
                                    if (allonairRemoved.length === 0) {
                                        if (allonairBlocked.length !== 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairBlocked.concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairBlocked;
                                            }
                                        }
                                        if (allonairBlocked.length === 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairPoc;
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = [];
                                            }
                                        }
                                    }
                                }



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
//                                        console.log(fullDateArray);
//                                        console.log(timeValues);
//                                        console.log(timeValuesBarHeightStart);
//                                        console.log(timeValuesBarHeightEnd);
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
//                                        console.log(fullDateArray);
//                                        console.log(timeValues);
//                                        console.lconsoleog(timeValuesBarHeightStart);
//                                        console.log(timeValuesBarHeightEnd);
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

                                //alert("Access Network");//**********************************************************************************************
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
                                        var ActualValues_2G = [];
                                        var OnAir_TargetValues_2G = [];
                                        var ActualValues_3G = [];
                                        var OnAir_TargetValues_3G = [];
                                        var ActualValues_4G = [];
                                        var OnAir_TargetValues_4G = [];
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
//                                        console.log(fullDateArray);
//                                        console.log(timeValues);
//                                        console.log(timeValuesBarHeightStart);
//                                        console.log(timeValuesBarHeightEnd);
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

//2GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                        function find2G(fruit) {
                                            return fruit.G2_3G_4G === '2G';
                                        }
                                        var all2G = data[0].createdprojectData.filter(find2G);
                                        var OnAir2G = jsonQ(all2G);
                                        var OnAir_Actual_Date_2G = (OnAir2G.find('OnAir_Actual_Date').value().sort());
                                        var OnAir_Target_Date_2G = (OnAir2G.find('OnAir_Target_Date').value().sort());
                                        if ((isNaN(OnAir_Target_Date_2G) !== false) && (isNaN(OnAir_Actual_Date_2G) !== false)) {
                                            if (OnAir_Target_Date_2G.length !== 0) {
                                                var SystemDate = new Date().toJSON().slice(0, 10);
                                                for (i = 0; i < OnAir_Target_Date_2G.length; i++) {
                                                    var filteredOnAir_Target_Date_2G = OnAir_Target_Date_2G.filter(function (item) {
                                                        return item.localeCompare(OnAir_Target_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                    });
                                                }
                                            }
                                            if (OnAir_Actual_Date_2G.length !== 0) {
                                                var SystemDate = new Date().toJSON().slice(0, 10);
                                                for (i = 0; i < OnAir_Actual_Date_2G.length; i++) {
                                                    var filteredOnAir_Actual_Date_2G = OnAir_Actual_Date_2G.filter(function (item) {
                                                        return item.localeCompare(OnAir_Actual_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                    });
                                                }
                                            }
                                            for (i = 0; i < timeValues.length; i++) {
                                                var startDate = timeValuesBarHeightStart[0];
                                                var endDate = timeValuesBarHeightEnd[i];
                                                var CalculateArrayActual_2G = filteredOnAir_Actual_Date_2G.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var CalculateArrayOnAir_Target_2G = filteredOnAir_Target_Date_2G.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                ActualValues_2G.push(CalculateArrayActual_2G.length);
                                                OnAir_TargetValues_2G.push(CalculateArrayOnAir_Target_2G.length);
                                            }
                                        }

//3GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                        function find3G(fruit) {
                                            return fruit.G2_3G_4G === '3G';
                                        }
                                        var all3G = data[0].createdprojectData.filter(find3G);
                                        var OnAir3G = jsonQ(all3G);
                                        var OnAir_Actual_Date_3G = (OnAir3G.find('OnAir_Actual_Date').value().sort());
                                        var OnAir_Target_Date_3G = (OnAir3G.find('OnAir_Target_Date').value().sort());
                                        if ((isNaN(OnAir_Target_Date_3G) !== false) && (isNaN(OnAir_Actual_Date_3G) !== false)) {
                                            if (OnAir_Target_Date_3G.length !== 0) {
                                                var SystemDate = new Date().toJSON().slice(0, 10);
                                                for (i = 0; i < OnAir_Target_Date_3G.length; i++) {
                                                    var filteredOnAir_Target_Date_3G = OnAir_Target_Date_3G.filter(function (item) {
                                                        return item.localeCompare(OnAir_Target_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                    });
                                                }
                                            }
                                            if (OnAir_Actual_Date_3G.length !== 0) {
                                                var SystemDate = new Date().toJSON().slice(0, 10);
                                                for (i = 0; i < OnAir_Actual_Date_3G.length; i++) {
                                                    var filteredOnAir_Actual_Date_3G = OnAir_Actual_Date_3G.filter(function (item) {
                                                        return item.localeCompare(OnAir_Actual_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                    });
                                                }
                                            }
                                            for (i = 0; i < timeValues.length; i++) {
                                                var startDate = timeValuesBarHeightStart[0];
                                                var endDate = timeValuesBarHeightEnd[i];
                                                var CalculateArrayActual_3G = filteredOnAir_Actual_Date_3G.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var CalculateArrayOnAir_Target_3G = filteredOnAir_Target_Date_3G.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                ActualValues_3G.push(CalculateArrayActual_3G.length);
                                                OnAir_TargetValues_3G.push(CalculateArrayOnAir_Target_3G.length);
                                            }
                                        }

//4GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG                                        
                                        function find4G(fruit) {
                                            return fruit.G2_3G_4G === '4G';
                                        }
                                        var all4G = data[0].createdprojectData.filter(find4G);
                                        var OnAir4G = jsonQ(all4G);
                                        var OnAir_Actual_Date_4G = (OnAir4G.find('OnAir_Actual_Date').value().sort());
                                        var OnAir_Target_Date_4G = (OnAir4G.find('OnAir_Target_Date').value().sort());
                                        if ((isNaN(OnAir_Target_Date_4G) !== false) && (isNaN(OnAir_Actual_Date_4G) !== false)) {
                                            if (OnAir_Target_Date_4G.length !== 0) {
                                                var SystemDate = new Date().toJSON().slice(0, 10);
                                                for (i = 0; i < OnAir_Target_Date_4G.length; i++) {
                                                    var filteredOnAir_Target_Date_4G = OnAir_Target_Date_4G.filter(function (item) {
                                                        return item.localeCompare(OnAir_Target_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                    });
                                                }
                                            }
                                            if (OnAir_Actual_Date_4G.length !== 0) {
                                                var SystemDate = new Date().toJSON().slice(0, 10);
                                                for (i = 0; i < OnAir_Actual_Date_4G.length; i++) {
                                                    var filteredOnAir_Actual_Date_4G = OnAir_Actual_Date_3G.filter(function (item) {
                                                        return item.localeCompare(OnAir_Actual_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                    });
                                                }
                                            }
                                            for (i = 0; i < timeValues.length; i++) {
                                                var startDate = timeValuesBarHeightStart[0];
                                                var endDate = timeValuesBarHeightEnd[i];
                                                var CalculateArrayActual_4G = filteredOnAir_Actual_Date_4G.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var CalculateArrayOnAir_Target_4G = filteredOnAir_Target_Date_4G.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                ActualValues_4G.push(CalculateArrayActual_4G.length);
                                                OnAir_TargetValues_4G.push(CalculateArrayOnAir_Target_4G.length);
                                            }
                                        }


                                        //**************
                                        $(function () {
                                            var chart = new Highcharts.Chart({
                                                chart: {
                                                    renderTo: "chartViewDivtag",
                                                    type: "column"
                                                },
                                                title: {
                                                    text: 'Monthly On Air Progress'
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
                                                        stacking: 'normal',
                                                        events: {
                                                            legendItemClick: function () {
                                                                var chart = this.chart,
                                                                        series = chart.series,
                                                                        visible;
                                                                if (this.name === 'Total On Air Target') {
                                                                    visible = true;
                                                                    series[0].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[1].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[2].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[3].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[4].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[5].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[6].update({
                                                                        visible: visible
                                                                    });
                                                                    series[7].update({
                                                                        visible: visible
                                                                    });
                                                                    return false;
                                                                }
                                                                if (this.name === 'On Air Target 2G') {
                                                                    visible = true;
                                                                    series[0].update({
                                                                        visible: visible
                                                                    });
                                                                    series[1].update({
                                                                        visible: visible
                                                                    });
                                                                    series[2].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[3].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[4].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[5].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[6].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[7].update({
                                                                        visible: !visible
                                                                    });
                                                                    return false;
                                                                }
                                                                if (this.name === 'On Air Target 3G') {
                                                                    visible = true;
                                                                    series[0].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[1].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[2].update({
                                                                        visible: visible
                                                                    });
                                                                    series[3].update({
                                                                        visible: visible
                                                                    });
                                                                    series[4].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[5].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[6].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[7].update({
                                                                        visible: !visible
                                                                    });
                                                                    return false;
                                                                }
                                                                if (this.name === 'On Air Target 4G') {
                                                                    visible = true;
                                                                    series[0].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[1].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[2].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[3].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[4].update({
                                                                        visible: visible
                                                                    });
                                                                    series[5].update({
                                                                        visible: visible
                                                                    });
                                                                    series[6].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[7].update({
                                                                        visible: !visible
                                                                    });
                                                                    return false;
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                series: [{
                                                        name: "On Air Target 2G",
                                                        data: OnAir_TargetValues_2G,
                                                        stack: 'target',
                                                        visible: false,
                                                        color: 'rgb(124, 181, 236)'
                                                    }, {
                                                        linkedTo: ':previous',
                                                        name: "Actual 2G",
                                                        data: ActualValues_2G,
                                                        stack: 'actual',
                                                        visible: false,
                                                        color: 'rgb(92, 92, 97)'
                                                    }, {
                                                        name: "On Air Target 3G",
                                                        data: OnAir_TargetValues_3G,
                                                        stack: 'target',
                                                        visible: false,
                                                        color: 'rgb(124, 181, 236)'
                                                    }, {
                                                        linkedTo: ':previous',
                                                        name: "Actual 3G",
                                                        data: ActualValues_3G,
                                                        stack: 'actual',
                                                        visible: false,
                                                        color: 'rgb(92, 92, 97)'
                                                    }, {
                                                        name: "On Air Target 4G",
                                                        data: OnAir_TargetValues_4G,
                                                        stack: 'target',
                                                        visible: false,
                                                        color: 'rgb(124, 181, 236)'
                                                    }, {
                                                        linkedTo: ':previous',
                                                        name: "Actual 4G",
                                                        data: ActualValues_4G,
                                                        stack: 'actual',
                                                        visible: false,
                                                        color: 'rgb(92, 92, 97)'
                                                    }, {
                                                        name: 'Total On Air Target',
                                                        data: OnAir_TargetValues,
                                                        stack: 'totaltarget',
                                                        color: 'rgb(124, 181, 236)'
                                                    }, {
                                                        linkedTo: ':previous',
                                                        name: 'Total Actual',
                                                        data: ActualValues,
                                                        stack: 'totalactual',
                                                        color: 'rgb(92, 92, 97)'
                                                    }],
                                                xAxis: {
                                                    categories: timeValues,
                                                    crosshair: true
                                                }
                                            },
                                            function (chart) {
                                                //            chart.legend.allItems[0].update({name:'2G'});
                                                //            chart.legend.allItems[1].update({name:'3G'});
                                                //            chart.legend.allItems[2].update({name:'Total'});
                                            });
                                        });
                                        //***************

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
//                                console.log(datapie);
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

                                //alert("Wi-Fi");//**********************************************************************************************

                                var totalsocpe = data[0].createdprojectTotalscope;
                                var OnAir_POC = 0;
                                var OnAir = 0;
                                var WIP = 0;
                                var ToBeStarted = 0;
                                var Agreement_Pending = 0;
                                var TX_Pending = 0;
                                var SiteOwnerApprovalPending = 0;
                                var DesignReportPendingFromVendor = 0;
                                var DesignReportPendingFromNPM = 0;
                                var OnAirRemoved = 0;
                                var OnAirBlocked = 0;
                                var Hold = 0;

                                if (isNaN(StatusCount.OnAir) !== true) {
                                    OnAir = StatusCount.OnAir;
                                }
                                if (isNaN(StatusCount['OnAir & POC']) !== true) {
                                    OnAir_POC = StatusCount['OnAir & POC'];
                                }
                                if (isNaN(StatusCount.WIP) !== true) {
                                    WIP = StatusCount.WIP;
                                }
                                if (isNaN(StatusCount['To be Started']) !== true) {
                                    ToBeStarted = StatusCount['To be Started'];
                                }
                                if (isNaN(StatusCount['Agreement Pending']) !== true) {
                                    Agreement_Pending = StatusCount['Agreement Pending'];
                                }
                                if (isNaN(StatusCount['TX Pending']) !== true) {
                                    TX_Pending = StatusCount['TX Pending'];
                                }
                                if (isNaN(StatusCount['Site Owner Approval Pending']) !== true) {
                                    SiteOwnerApprovalPending = StatusCount['Site Owner Approval Pending'];
                                }
                                if (isNaN(StatusCount['Design Report Pending From Vendor']) !== true) {
                                    DesignReportPendingFromVendor = StatusCount['Design Report Pending From Vendor'];
                                }
                                if (isNaN(StatusCount['Design Approval Pending from NPA']) !== true) {
                                    DesignReportPendingFromNPM = StatusCount['Design Approval Pending from NPA'];
                                }
                                if (isNaN(StatusCount['OnAir & Removed']) !== true) {
                                    OnAirRemoved = StatusCount['OnAir & Removed'];
                                }
                                if (isNaN(StatusCount['OnAir & Blocked']) !== true) {
                                    OnAirBlocked = StatusCount['OnAir & Blocked'];
                                }
                                if (isNaN(StatusCount.Hold) !== true) {
                                    Hold = StatusCount.Hold;
                                }
                                var Not_HO = 0;
                                var prnding = 0;
                                var tot_onAir = 0;
                                var tot_wip = 0;
                                var tot_hold = 0;
                                var tot_TBS = 0;

                                tot_onAir = (OnAir + OnAir_POC + OnAirRemoved + OnAirBlocked);
                                tot_wip = (WIP + DesignReportPendingFromVendor + DesignReportPendingFromNPM);
                                tot_hold = (Hold + SiteOwnerApprovalPending + Agreement_Pending);
                                tot_TBS = (ToBeStarted + TX_Pending);
                                prnding = (tot_wip + tot_hold + tot_TBS);
                                Not_HO = (totalsocpe - (tot_onAir + prnding));

                                var datapie = [];
                                if (tot_wip !== 0) {
                                    var wip = {name: 'WIP', y: ((tot_wip * 100) / totalsocpe), color: '#FF7F50'};
                                    datapie.push(wip);
                                }
                                if (tot_TBS !== 0) {
                                    var tbs = {name: 'TBS', y: ((tot_TBS * 100) / totalsocpe), color: '#5c5c61'};
                                    datapie.push(tbs);
                                }
                                if (tot_hold !== 0) {
                                    var discussion = {name: 'Hold', y: (tot_hold * 100) / totalsocpe, color: '#65FF65'};
                                    datapie.push(discussion);
                                }
                                if (Not_HO !== 0) {
                                    var not_ho = {name: 'Not_HO', y: ((Not_HO * 100) / totalsocpe), color: '#95ceff'};
                                    datapie.push(not_ho);
                                }
                                if (tot_onAir !== 0) {
                                    var Onair = {name: 'OnAir', y: ((tot_onAir * 100) / totalsocpe), sliced: true, selected: true, color: '#00008B'};
                                    datapie.push(Onair);
                                }


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
//                                console.log(datapie);
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

                                //alert("Access Network");//**********************************************************************************************
                                var totalsocpe = data[0].createdprojectTotalscope;
                                var OnAir = 0;

                                var TE_WIP = 0;
                                var Tower_WIP = 0;
                                var MCW = 0;
                                var OnAir_Pending = 0;
                                var RFI_Pending = 0;
                                var RFI_MW_Pending_WIP = 0;
                                var RFI_Power_Pending_WIP = 0;
                                var RFI_MW_and_Power_Pending_WIP = 0;
                                var Other_Operator_Approval_Pending_WIP = 0;
                                var Material_Pending_WIP = 0;
                                var RF_Cabinet_WIP = 0;
                                var DT_WIP = 0;

                                var Eq_not_ready = 0;
                                var Site_Not_Ready = 0;
                                var SA_Issues = 0;
                                var RFI_MW_Pending_CF = 0;
                                var RFI_Power_Pending_CF = 0;
                                var RFI_MW_and_Power_Pending_CF = 0;
                                var Other_Operator_Approval_Pending_CF = 0;
                                var Material_Pending_CF = 0;
                                var RF_Cabinet_CF = 0;
                                var DT_CF = 0;
                                var other = 0;

                                if (isNaN(StatusCount.OnAir) !== true) {
                                    OnAir = StatusCount.OnAir;
                                }
                                if (isNaN(StatusCount["TE WIP"]) !== true) {
                                    TE_WIP = StatusCount["TE WIP"];
                                }
                                if (isNaN(StatusCount["Tower WIP"]) !== true) {
                                    Tower_WIP = StatusCount["Tower WIP"];
                                }
                                if (isNaN(StatusCount.MCW) !== true) {
                                    MCW = StatusCount.MCW;
                                }
                                if (isNaN(StatusCount["On Air Pendind"]) !== true) {
                                    OnAir_Pending = StatusCount["On Air Pendind"];
                                }
                                if (isNaN(StatusCount["RFI Pending"]) !== true) {
                                    RFI_Pending = StatusCount["RFI Pending"];
                                }
                                if (isNaN(StatusCount["RFI MW Pending(WIP)"]) !== true) {
                                    RFI_MW_Pending_WIP = StatusCount["RFI MW Pending(WIP)"];
                                }
                                if (isNaN(StatusCount["RFI Power Pending(WIP)"]) !== true) {
                                    RFI_Power_Pending_WIP = StatusCount["RFI Power Pending(WIP)"];
                                }
                                if (isNaN(StatusCount["RFI MW & Power Pending(WIP)"]) !== true) {
                                    RFI_MW_and_Power_Pending_WIP = StatusCount["RFI MW & Power Pending(WIP)"];
                                }
                                if (isNaN(StatusCount["Other Operator Approval Pending(WIP)"]) !== true) {
                                    Other_Operator_Approval_Pending_WIP = StatusCount["Other Operator Approval Pending(WIP)"];
                                }
                                if (isNaN(StatusCount["Material Pending(WIP)"]) !== true) {
                                    Material_Pending_WIP = StatusCount["Material Pending(WIP)"];
                                }
                                if (isNaN(StatusCount["RF Cabinet(WIP)"]) !== true) {
                                    RF_Cabinet_WIP = StatusCount["RF Cabinet(WIP)"];
                                }
                                if (isNaN(StatusCount["DT(WIP)"]) !== true) {
                                    DT_WIP = StatusCount["DT(WIP)"];
                                }
                                if (isNaN(StatusCount["Eq.not Ready"]) !== true) {
                                    Eq_not_ready = StatusCount["Eq.not Ready"];
                                }
                                if (isNaN(StatusCount["Site not Ready"]) !== true) {
                                    Site_Not_Ready = StatusCount["Site not Ready"];
                                }
                                if (isNaN(StatusCount["SA Issues"]) !== true) {
                                    SA_Issues = StatusCount["SA Issues"];
                                }
                                if (isNaN(StatusCount["RFI MW Pending(CF)"]) !== true) {
                                    RFI_MW_Pending_CF = StatusCount["RFI MW Pending(CF)"];
                                }
                                if (isNaN(StatusCount["RFI Power Pending(CF)"]) !== true) {
                                    RFI_Power_Pending_CF = StatusCount["RFI Power Pending(CF)"];
                                }
                                if (isNaN(StatusCount["RFI MW & Power Pending(CF)"]) !== true) {
                                    RFI_MW_and_Power_Pending_CF = StatusCount["RFI MW & Power Pending(CF)"];
                                }
                                if (isNaN(StatusCount["Other Operator Approval Pending(CF)"]) !== true) {
                                    Other_Operator_Approval_Pending_CF = StatusCount["Other Operator Approval Pending(CF)"];
                                }
                                if (isNaN(StatusCount["Material Pending(CF)"]) !== true) {
                                    Material_Pending_CF = StatusCount["Material Pending(CF)"];
                                }

                                if (isNaN(StatusCount["RF Cabinet(CF)"]) !== true) {
                                    RF_Cabinet_CF = StatusCount["RF Cabinet(CF)"];
                                }
                                if (isNaN(StatusCount["DT(CF)"]) !== true) {
                                    DT_CF = StatusCount["DT(CF)"];
                                }
                                if (isNaN(StatusCount["Other"]) !== true) {
                                    other = StatusCount["Other"];
                                }

                                var WIP = 0;
                                var Cant_forcact = 0;
                                var Prnding = 0;
                                var Not_HO = 0;
                                var HO = 0;

                                WIP = (TE_WIP + Tower_WIP + MCW + OnAir_Pending + RFI_Pending + RFI_MW_Pending_WIP + RFI_Power_Pending_WIP + RFI_MW_and_Power_Pending_WIP + Other_Operator_Approval_Pending_WIP + Material_Pending_WIP + RF_Cabinet_WIP + DT_WIP);
                                Cant_forcact = (Eq_not_ready + Site_Not_Ready + SA_Issues + RFI_MW_Pending_CF + RFI_Power_Pending_CF + RFI_MW_and_Power_Pending_CF + Other_Operator_Approval_Pending_CF + Material_Pending_CF + RF_Cabinet_CF + DT_CF);
                                Prnding = (WIP + Cant_forcact);
                                HO = (OnAir + Prnding + other);
                                Not_HO = (totalsocpe - HO);
//                                console.log(WIP + "|" + Cant_forcact + "|" + Prnding + "|" + HO + "|" + Not_HO + "|" + OnAir);
                                var datapie = [];
                                if (WIP !== 0) {
                                    var wip = {name: 'WIP', y: ((WIP * 100) / totalsocpe), color: '#FF7F50'};
                                    datapie.push(wip);
                                }
                                if (Cant_forcact !== 0) {
                                    var cannot_forcast = {name: 'Cannot Forcast', y: ((Cant_forcact * 100) / totalsocpe), color: '#757A77'};
                                    datapie.push(cannot_forcast);
                                }
                                if (other !== 0) {
                                    var other_pie = {name: 'Other', y: (other * 100) / totalsocpe, color: '#7FFF00'};
                                    datapie.push(other_pie);
                                }
                                if (Not_HO !== 0) {
                                    var not_ho = {name: 'Not_HO', y: ((Not_HO * 100) / totalsocpe), color: '#95ceff'};
                                    datapie.push(not_ho);
                                }
                                if (OnAir !== 0) {
                                    var Onair = {name: 'OnAir', y: ((OnAir * 100) / totalsocpe), sliced: true, selected: true, color: '#00008B'};
                                    datapie.push(Onair);
                                }
//                                console.log(datapie);
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
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error Pie chart");
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

                                //alert("Wi-Fi");//**********************************************************************************************

                                var totalsocpe = data[0].createdprojectTotalscope;
                                var OnAir_POC = 0;
                                var OnAir = 0;
                                var WIP = 0;
                                var ToBeStarted = 0;
                                var Agreement_Pending = 0;
                                var TX_Pending = 0;
                                var SiteOwnerApprovalPending = 0;
                                var DesignReportPendingFromVendor = 0;
                                var DesignReportPendingFromNPM = 0;
                                var OnAirRemoved = 0;
                                var OnAirBlocked = 0;
                                var Hold = 0;

                                if (isNaN(StatusCount.OnAir) !== true) {
                                    OnAir = StatusCount.OnAir;
                                }
                                if (isNaN(StatusCount['OnAir & POC']) !== true) {
                                    OnAir_POC = StatusCount['OnAir & POC'];
                                }
                                if (isNaN(StatusCount.WIP) !== true) {
                                    WIP = StatusCount.WIP;
                                }
                                if (isNaN(StatusCount['To be Started']) !== true) {
                                    ToBeStarted = StatusCount['To be Started'];
                                }
                                if (isNaN(StatusCount['Agreement Pending']) !== true) {
                                    Agreement_Pending = StatusCount['Agreement Pending'];
                                }
                                if (isNaN(StatusCount['TX Pending']) !== true) {
                                    TX_Pending = StatusCount['TX Pending'];
                                }
                                if (isNaN(StatusCount['Site Owner Approval Pending']) !== true) {
                                    SiteOwnerApprovalPending = StatusCount['Site Owner Approval Pending'];
                                }
                                if (isNaN(StatusCount['Design Report Pending From Vendor']) !== true) {
                                    DesignReportPendingFromVendor = StatusCount['Design Report Pending From Vendor'];
                                }
                                if (isNaN(StatusCount['Design Approval Pending from NPA']) !== true) {
                                    DesignReportPendingFromNPM = StatusCount['Design Approval Pending from NPA'];
                                }
                                if (isNaN(StatusCount['OnAir & Removed']) !== true) {
                                    OnAirRemoved = StatusCount['OnAir & Removed'];
                                }
                                if (isNaN(StatusCount['OnAir & Blocked']) !== true) {
                                    OnAirBlocked = StatusCount['OnAir & Blocked'];
                                }
                                if (isNaN(StatusCount.Hold) !== true) {
                                    Hold = StatusCount.Hold;
                                }
                                var Not_HO = 0;
                                var Pending = 0;
                                var tot_onAir = 0;
                                var tot_wip = 0;
                                var tot_hold = 0;
                                var tot_TBS = 0;
                                var HO = 0;

                                tot_onAir = (OnAir + OnAir_POC + OnAirRemoved + OnAirBlocked);
                                tot_wip = (WIP + DesignReportPendingFromVendor + DesignReportPendingFromNPM);
                                tot_hold = (Hold + SiteOwnerApprovalPending + Agreement_Pending);
                                tot_TBS = (ToBeStarted + TX_Pending);
                                Pending = (tot_wip + tot_hold + tot_TBS);
                                HO = (Pending + tot_onAir);
                                Not_HO = (totalsocpe - HO);

                                var projectName = "<b>" + data[0].createdprojectName + "</b><br>" + totalsocpe;
                                var handover = "<b>Handed Over</b><br>" + HO;
                                var nothandover = "<b>Not Handed Over</b><br>" + Not_HO;
                                var on_air = "<b>On Air</b><br>" + tot_onAir;
                                var pending = "<b>Pending</b><br>" + Pending;
                                var OnAirtree = "On Air<br>" + OnAir;
                                var OnAirPoctree = "On Air & POC<br>" + OnAir_POC;
                                var OnAirBlockedtree = "On Air & Blocked<br>" + OnAirBlocked;
                                var OnAirRemovetree = "On Air & Removed<br>" + OnAirRemoved;

                                var WIPTree = "WIP</br>" + WIP;
                                var HOLDTree = "Hold</br>" + Hold;
                                var ToBeStartedTree = "To be Started</br>" + ToBeStarted;

                                var DesignReportPendingFromVendorTree = "Design Report Pending  from Vendor<br>" + DesignReportPendingFromVendor;
                                var DesignReportPendingFromNPM = "Design Report Pending  from NPM<br>" + DesignReportPendingFromNPM;

                                var SiteOwnerApprovalPendingTree = "Site Owner Approval Pending<br>" + SiteOwnerApprovalPending;
                                var Agreement_PendingTree = "Agreement Pending<br>" + Agreement_Pending;

                                var TX_PendingTree = "TX Pending<br>" + TX_Pending;

                                var treeDataIBS = [];
                                treeDataIBS.push([projectName, '']);
                                treeDataIBS.push([handover, projectName]);
                                treeDataIBS.push([nothandover, projectName]);
                                treeDataIBS.push([on_air, handover]);
                                treeDataIBS.push([pending, handover]);

                                treeDataIBS.push([OnAirtree, on_air]);
                                treeDataIBS.push([OnAirPoctree, on_air]);
                                treeDataIBS.push([OnAirBlockedtree, OnAirPoctree]);
                                treeDataIBS.push([OnAirRemovetree, OnAirBlockedtree]);

                                treeDataIBS.push([WIPTree, pending]);
                                treeDataIBS.push([DesignReportPendingFromVendorTree, WIPTree]);
                                treeDataIBS.push([DesignReportPendingFromNPM, DesignReportPendingFromVendorTree]);

                                treeDataIBS.push([HOLDTree, pending]);
                                treeDataIBS.push([Agreement_PendingTree, HOLDTree]);
                                treeDataIBS.push([SiteOwnerApprovalPendingTree, Agreement_PendingTree]);

                                treeDataIBS.push([ToBeStartedTree, pending]);
                                treeDataIBS.push([TX_PendingTree, ToBeStartedTree]);

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

                                //alert("Access Network");//**********************************************************************************************
                                var totalsocpe = data[0].createdprojectTotalscope;
                                var OnAir = 0;

                                var TE_WIP = 0;
                                var Tower_WIP = 0;
                                var MCW = 0;
                                var OnAir_Pending = 0;
                                var RFI_Pending = 0;
                                var RFI_MW_Pending_WIP = 0;
                                var RFI_Power_Pending_WIP = 0;
                                var RFI_MW_and_Power_Pending_WIP = 0;
                                var Other_Operator_Approval_Pending_WIP = 0;
                                var Material_Pending_WIP = 0;
                                var RF_Cabinet_WIP = 0;
                                var DT_WIP = 0;

                                var Eq_not_ready = 0;
                                var Site_Not_Ready = 0;
                                var SA_Issues = 0;
                                var RFI_MW_Pending_CF = 0;
                                var RFI_Power_Pending_CF = 0;
                                var RFI_MW_and_Power_Pending_CF = 0;
                                var Other_Operator_Approval_Pending_CF = 0;
                                var Material_Pending_CF = 0;
                                var RF_Cabinet_CF = 0;
                                var DT_CF = 0;
                                var other = 0;

                                if (isNaN(StatusCount.OnAir) !== true) {
                                    OnAir = StatusCount.OnAir;
                                }
                                if (isNaN(StatusCount["TE WIP"]) !== true) {
                                    TE_WIP = StatusCount["TE WIP"];
                                }
                                if (isNaN(StatusCount["Tower WIP"]) !== true) {
                                    Tower_WIP = StatusCount["Tower WIP"];
                                }
                                if (isNaN(StatusCount.MCW) !== true) {
                                    MCW = StatusCount.MCW;
                                }
                                if (isNaN(StatusCount["On Air Pendind"]) !== true) {
                                    OnAir_Pending = StatusCount["On Air Pendind"];
                                }
                                if (isNaN(StatusCount["RFI Pending"]) !== true) {
                                    RFI_Pending = StatusCount["RFI Pending"];
                                }
                                if (isNaN(StatusCount["RFI MW Pending(WIP)"]) !== true) {
                                    RFI_MW_Pending_WIP = StatusCount["RFI MW Pending(WIP)"];
                                }
                                if (isNaN(StatusCount["RFI Power Pending(WIP)"]) !== true) {
                                    RFI_Power_Pending_WIP = StatusCount["RFI Power Pending(WIP)"];
                                }
                                if (isNaN(StatusCount["RFI MW & Power Pending(WIP)"]) !== true) {
                                    RFI_MW_and_Power_Pending_WIP = StatusCount["RFI MW & Power Pending(WIP)"];
                                }
                                if (isNaN(StatusCount["Other Operator Approval Pending(WIP)"]) !== true) {
                                    Other_Operator_Approval_Pending_WIP = StatusCount["Other Operator Approval Pending(WIP)"];
                                }
                                if (isNaN(StatusCount["Material Pending(WIP)"]) !== true) {
                                    Material_Pending_WIP = StatusCount["Material Pending(WIP)"];
                                }
                                if (isNaN(StatusCount["RF Cabinet(WIP)"]) !== true) {
                                    RF_Cabinet_WIP = StatusCount["RF Cabinet(WIP)"];
                                }
                                if (isNaN(StatusCount["DT(WIP)"]) !== true) {
                                    DT_WIP = StatusCount["DT(WIP)"];
                                }
                                if (isNaN(StatusCount["Eq.not Ready"]) !== true) {
                                    Eq_not_ready = StatusCount["Eq.not Ready"];
                                }
                                if (isNaN(StatusCount["Site not Ready"]) !== true) {
                                    Site_Not_Ready = StatusCount["Site not Ready"];
                                }
                                if (isNaN(StatusCount["SA Issues"]) !== true) {
                                    SA_Issues = StatusCount["SA Issues"];
                                }
                                if (isNaN(StatusCount["RFI MW Pending(CF)"]) !== true) {
                                    RFI_MW_Pending_CF = StatusCount["RFI MW Pending(CF)"];
                                }
                                if (isNaN(StatusCount["RFI Power Pending(CF)"]) !== true) {
                                    RFI_Power_Pending_CF = StatusCount["RFI Power Pending(CF)"];
                                }
                                if (isNaN(StatusCount["RFI MW & Power Pending(CF)"]) !== true) {
                                    RFI_MW_and_Power_Pending_CF = StatusCount["RFI MW & Power Pending(CF)"];
                                }
                                if (isNaN(StatusCount["Other Operator Approval Pending(CF)"]) !== true) {
                                    Other_Operator_Approval_Pending_CF = StatusCount["Other Operator Approval Pending(CF)"];
                                }
                                if (isNaN(StatusCount["Material Pending(CF)"]) !== true) {
                                    Material_Pending_CF = StatusCount["Material Pending(CF)"];
                                }

                                if (isNaN(StatusCount["RF Cabinet(CF)"]) !== true) {
                                    RF_Cabinet_CF = StatusCount["RF Cabinet(CF)"];
                                }
                                if (isNaN(StatusCount["DT(CF)"]) !== true) {
                                    DT_CF = StatusCount["DT(CF)"];
                                }
                                if (isNaN(StatusCount["Other"]) !== true) {
                                    other = StatusCount["Other"];
                                }

                                var WIP = 0;
                                var Cant_forcact = 0;
                                var Prnding = 0;
                                var Not_HO = 0;
                                var HO = 0;

                                WIP = (TE_WIP + Tower_WIP + MCW + OnAir_Pending + RFI_Pending + RFI_MW_Pending_WIP + RFI_Power_Pending_WIP + RFI_MW_and_Power_Pending_WIP + Other_Operator_Approval_Pending_WIP + Material_Pending_WIP + RF_Cabinet_WIP + DT_WIP);
                                Cant_forcact = (Eq_not_ready + Site_Not_Ready + SA_Issues + RFI_MW_Pending_CF + RFI_Power_Pending_CF + RFI_MW_and_Power_Pending_CF + Other_Operator_Approval_Pending_CF + Material_Pending_CF + RF_Cabinet_CF + DT_CF);
                                Prnding = (WIP + Cant_forcact + other);
                                HO = (OnAir + Prnding);
                                Not_HO = (totalsocpe - HO);

                                var projectName = "<b>" + data[0].createdprojectName + "</b><br>" + totalsocpe;
                                var handover = "<b>Handed Over</b><br>" + HO;
                                var nothandover = "<b>Not Handed Over</b><br>" + Not_HO;
                                var on_air = "<b>On Air</b><br>" + OnAir;
                                var pending = "<b>Pending</b><br>" + Prnding;
                                var WIPTree = "WIP<br>" + WIP;
                                var OtherTree = "Other<br>" + other;
                                var cannotForcastTree = "Can't Forcast<br>" + Cant_forcact;

                                var TE_WIPTree = "TE WIP<br>" + TE_WIP;
                                var Tower_WIPTree = "Tower WIP<br>" + Tower_WIP;
                                var MCWTree = "MCW<br>" + MCW;
                                var OnAir_PendingTree = "On Air Pending<br>" + OnAir_Pending;
                                var RFI_PendingTree = "RFI Pending<br>" + RFI_Pending;
                                var RFI_MW_Pending_WIPTree = "RFI MW Pending (WIP)<br>" + RFI_MW_Pending_WIP;
                                var RFI_Power_Pending_WIPTree = "RFI Power Pending (WIP)<br>" + RFI_Power_Pending_WIP;
                                var RFI_MW_and_Power_Pending_WIPTree = "RFI MW & Power Pending (WIP)<br>" + RFI_MW_and_Power_Pending_WIP;
                                var Other_Operator_Approval_Pending_WIPTree = "Other Operator Approval Pending (WIP)<br>" + Other_Operator_Approval_Pending_WIP;
                                var Material_Pending_WIPTree = "Material Pending (WIP)<br>" + Material_Pending_WIP;
                                var RF_Cabinet_WIPTree = "RF Cabinet (WIP)<br>" + RF_Cabinet_WIP;
                                var DT_WIPTree = "DT (WIP)<br>" + DT_WIP;

                                var Eq_not_readyTree = "Eq. Not Ready<br>" + Eq_not_ready;
                                var Site_Not_ReadyTree = "Site Not Ready<br>" + Site_Not_Ready;
                                var SA_IssuesTree = "SA Issues<br>" + SA_Issues;
                                var RFI_MW_Pending_CFTree = "RFI MW Pending (Can't Forcast)<br>" + RFI_MW_Pending_CF;
                                var RFI_Power_Pending_CFTree = "RFI Power Pending (Can't Forcast)<br>" + RFI_Power_Pending_CF;
                                var RFI_MW_and_Power_Pending_CFTree = "RFI MW & Power Pending (Can't Forcast)<br>" + RFI_MW_and_Power_Pending_CF;
                                var Other_Operator_Approval_Pending_CFTree = "Other Operator Approval Pending (Can't Forcast)<br>" + Other_Operator_Approval_Pending_CF;
                                var Material_Pending_CFTree = "Material Pending (Can't Forcast)<br>" + Material_Pending_CF;
                                var RF_Cabinet_CFTree = "RF Cabinet (Can't Forcast)<br>" + RF_Cabinet_CF;
                                var DT_CFTree = "DT (Can't Forcast)<br>" + DT_CF;

                                var treeDataIBS = [];
                                treeDataIBS.push([projectName, '']);
                                treeDataIBS.push([handover, projectName]);
                                treeDataIBS.push([nothandover, projectName]);
                                treeDataIBS.push([on_air, handover]);
                                treeDataIBS.push([pending, handover]);

                                treeDataIBS.push([WIPTree, pending]);
                                treeDataIBS.push([OtherTree, pending]);
                                treeDataIBS.push([cannotForcastTree, pending]);

                                treeDataIBS.push([TE_WIPTree, WIPTree]);
                                treeDataIBS.push([OnAir_PendingTree, TE_WIPTree]);
                                treeDataIBS.push([RFI_PendingTree, OnAir_PendingTree]);
                                treeDataIBS.push([RFI_MW_Pending_WIPTree, RFI_PendingTree]);

                                treeDataIBS.push([Tower_WIPTree, WIPTree]);
                                treeDataIBS.push([RFI_Power_Pending_WIPTree, Tower_WIPTree]);
                                treeDataIBS.push([RFI_MW_and_Power_Pending_WIPTree, RFI_Power_Pending_WIPTree]);
                                treeDataIBS.push([Other_Operator_Approval_Pending_WIPTree, RFI_MW_and_Power_Pending_WIPTree]);

                                treeDataIBS.push([MCWTree, WIPTree]);
                                treeDataIBS.push([Material_Pending_WIPTree, MCWTree]);
                                treeDataIBS.push([RF_Cabinet_WIPTree, Material_Pending_WIPTree]);
                                treeDataIBS.push([DT_WIPTree, RF_Cabinet_WIPTree]);

                                treeDataIBS.push([Eq_not_readyTree, cannotForcastTree]);
                                treeDataIBS.push([RFI_MW_Pending_CFTree, Eq_not_readyTree]);
                                treeDataIBS.push([RFI_Power_Pending_CFTree, RFI_MW_Pending_CFTree]);
                                treeDataIBS.push([SA_IssuesTree, RFI_Power_Pending_CFTree]);
                                treeDataIBS.push([Material_Pending_CFTree, SA_IssuesTree]);

                                treeDataIBS.push([Site_Not_ReadyTree, cannotForcastTree]);
                                treeDataIBS.push([RFI_MW_and_Power_Pending_CFTree, Site_Not_ReadyTree]);
                                treeDataIBS.push([Other_Operator_Approval_Pending_CFTree, RFI_MW_and_Power_Pending_CFTree]);
                                treeDataIBS.push([RF_Cabinet_CFTree, Other_Operator_Approval_Pending_CFTree]);
                                treeDataIBS.push([DT_CFTree, RF_Cabinet_CFTree]);


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
                    console.log(data);
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

//                                develop a new function for change trget date
                                function findTargetDate(fruit) {
                                    return fruit.Site_ID !== null && fruit.Site_ID !== "";
                                }
                                var targetAlldate = data[0].createdprojectData.filter(findTargetDate);

                                var allonair = data[0].createdprojectData.filter(findOnAir);
                                if ((isNaN(allonair) !== false) && isNaN(targetAlldate) !== false) {
                                    var onaliQ = jsonQ(allonair);
                                    var OnAir_Actual_Date = (onaliQ.find('OnAir_Actual_Date').value().sort());
//                                    var OnAir_Target_Date = (onaliQ.find('OnAir_Target_Date').value().sort());

//                                    new target date function
                                    var dateQ = jsonQ(targetAlldate);
                                    var OnAir_Target_Date = (dateQ.find('OnAir_Target_Date').value().sort());

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
//                                            console.log(fullDateArray);
//                                            console.log(timeValues);
//                                            console.log(timeValuesBarHeightStart);
//                                            console.log(timeValuesBarHeightEnd);
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
//                                            console.log(fullDateArray);
//                                            console.log(timeValues);
//                                            console.log(timeValuesBarHeightStart);
//                                            console.log(timeValuesBarHeightEnd);

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
//                                            console.log(fullDateArray);
//                                            console.log(timeValues);
//                                            console.log(timeValuesBarHeightStart);
//                                            console.log(timeValuesBarHeightEnd);

                                            var PreviousCountActual = filteredOnAir_Actual_Date.filter(function (item) {
                                                return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
                                            });
                                            var PreviousCountOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
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
//                                            console.log(fullDateArray);
//                                            console.log(timeValues);
//                                            console.log(timeValuesBarHeightStart);
//                                            console.log(timeValuesBarHeightEnd);

                                            var PreviousCountActual = filteredOnAir_Actual_Date.filter(function (item) {
                                                return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
                                            });
                                            var PreviousCountOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
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

                                //alert("Wi-Fi");//**********************************************************************************************

                                function findOnAir(fruit) {
                                    return fruit.Status === 'OnAir';
                                }
                                function findOnAirRemoved(fruit) {
                                    return fruit.Status === 'OnAir & Removed';
                                }
                                function findOnAirBlocked(fruit) {
                                    return fruit.Status === 'OnAir & Blocked';
                                }
                                function findOnAirPOC(fruit) {
                                    return fruit.Status === 'OnAir & POC';
                                }
                                var allonairOnly = data[0].createdprojectData.filter(findOnAir);
                                var allonairRemoved = data[0].createdprojectData.filter(findOnAirRemoved);
                                var allonairBlocked = data[0].createdprojectData.filter(findOnAirBlocked);
                                var allonairPoc = data[0].createdprojectData.filter(findOnAirPOC);

                                var allonair = [];
                                if (allonairOnly.length !== 0) {
                                    if (allonairRemoved.length !== 0) {
                                        if (allonairBlocked.length !== 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairOnly.concat(allonairRemoved).concat(allonairBlocked).concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairOnly.concat(allonairRemoved).concat(allonairBlocked);
                                            }
                                        }
                                        if (allonairBlocked.length === 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairOnly.concat(allonairRemoved).concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairOnly.concat(allonairRemoved);
                                            }
                                        }
                                    }
                                    if (allonairRemoved.length === 0) {
                                        if (allonairBlocked.length !== 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairOnly.concat(allonairBlocked).concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairOnly.concat(allonairBlocked);
                                            }
                                        }
                                        if (allonairBlocked.length === 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairOnly.concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairOnly;
                                            }
                                        }
                                    }
                                }
                                if (allonairOnly.length === 0) {
                                    if (allonairRemoved.length !== 0) {
                                        if (allonairBlocked.length !== 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairRemoved.concat(allonairBlocked).concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairRemoved.concat(allonairBlocked);
                                            }
                                        }
                                        if (allonairBlocked.length === 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairRemoved.concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairRemoved;
                                            }
                                        }
                                    }
                                    if (allonairRemoved.length === 0) {
                                        if (allonairBlocked.length !== 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairBlocked.concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairBlocked;
                                            }
                                        }
                                        if (allonairBlocked.length === 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairPoc;
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = [];
                                            }
                                        }
                                    }
                                }




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
                                        if ((Pstart >= FO) && (Pend <= FEnd)) {//55555555555555
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
                                        if (((FO <= Pstart) && (Pstart < FEnd)) && (Pend > FEnd)) {//66666666666666

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

                                //alert("Access Network");//**********************************************************************************************
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
                                            var ActualValues_2G = [];
                                            var OnAir_TargetValues_2G = [];
                                            var ActualValues_3G = [];
                                            var OnAir_TargetValues_3G = [];
                                            var ActualValues_4G = [];
                                            var OnAir_TargetValues_4G = [];
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

//2GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                            function find2G(fruit) {
                                                return fruit.G2_3G_4G === '2G';
                                            }
                                            var all2G = data[0].createdprojectData.filter(find2G);
                                            var OnAir2G = jsonQ(all2G);
                                            var OnAir_Actual_Date_2G = (OnAir2G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_2G = (OnAir2G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_2G) !== false) && (isNaN(OnAir_Actual_Date_2G) !== false)) {
                                                if (OnAir_Target_Date_2G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_2G.length; i++) {
                                                        var filteredOnAir_Target_Date_2G = OnAir_Target_Date_2G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_2G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_2G.length; i++) {
                                                        var filteredOnAir_Actual_Date_2G = OnAir_Actual_Date_2G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                for (i = 0; i < timeValues.length; i++) {
                                                    var startDate = timeValuesBarHeightStart[0];
                                                    var endDate = timeValuesBarHeightEnd[i];
                                                    var CalculateArrayActual_2G = filteredOnAir_Actual_Date_2G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var CalculateArrayOnAir_Target_2G = filteredOnAir_Target_Date_2G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    ActualValues_2G.push(CalculateArrayActual_2G.length);
                                                    OnAir_TargetValues_2G.push(CalculateArrayOnAir_Target_2G.length);
                                                }
                                            }

//3GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                            function find3G(fruit) {
                                                return fruit.G2_3G_4G === '3G';
                                            }
                                            var all3G = data[0].createdprojectData.filter(find3G);
                                            var OnAir3G = jsonQ(all3G);
                                            var OnAir_Actual_Date_3G = (OnAir3G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_3G = (OnAir3G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_3G) !== false) && (isNaN(OnAir_Actual_Date_3G) !== false)) {
                                                if (OnAir_Target_Date_3G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_3G.length; i++) {
                                                        var filteredOnAir_Target_Date_3G = OnAir_Target_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_3G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_3G.length; i++) {
                                                        var filteredOnAir_Actual_Date_3G = OnAir_Actual_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                for (i = 0; i < timeValues.length; i++) {
                                                    var startDate = timeValuesBarHeightStart[0];
                                                    var endDate = timeValuesBarHeightEnd[i];
                                                    var CalculateArrayActual_3G = filteredOnAir_Actual_Date_3G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var CalculateArrayOnAir_Target_3G = filteredOnAir_Target_Date_3G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    ActualValues_3G.push(CalculateArrayActual_3G.length);
                                                    OnAir_TargetValues_3G.push(CalculateArrayOnAir_Target_3G.length);
                                                }
                                            }

//4GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG                                        
                                            function find4G(fruit) {
                                                return fruit.G2_3G_4G === '4G';
                                            }
                                            var all4G = data[0].createdprojectData.filter(find4G);
                                            var OnAir4G = jsonQ(all4G);
                                            var OnAir_Actual_Date_4G = (OnAir4G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_4G = (OnAir4G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_4G) !== false) && (isNaN(OnAir_Actual_Date_4G) !== false)) {
                                                if (OnAir_Target_Date_4G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_4G.length; i++) {
                                                        var filteredOnAir_Target_Date_4G = OnAir_Target_Date_4G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_4G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_4G.length; i++) {
                                                        var filteredOnAir_Actual_Date_4G = OnAir_Actual_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                for (i = 0; i < timeValues.length; i++) {
                                                    var startDate = timeValuesBarHeightStart[0];
                                                    var endDate = timeValuesBarHeightEnd[i];
                                                    var CalculateArrayActual_4G = filteredOnAir_Actual_Date_4G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var CalculateArrayOnAir_Target_4G = filteredOnAir_Target_Date_4G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    ActualValues_4G.push(CalculateArrayActual_4G.length);
                                                    OnAir_TargetValues_4G.push(CalculateArrayOnAir_Target_4G.length);
                                                }
                                            }

                                            //**************
                                            $(function () {
                                                var chart = new Highcharts.Chart({
                                                    chart: {
                                                        renderTo: "chartViewDivtag",
                                                        type: "column"
                                                    },
                                                    title: {
                                                        text: 'Monthly On Air Progress'
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
                                                            stacking: 'normal',
                                                            events: {
                                                                legendItemClick: function () {
                                                                    var chart = this.chart,
                                                                            series = chart.series,
                                                                            visible;
                                                                    if (this.name === 'Total On Air Target') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 2G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 3G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 4G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    series: [{
                                                            name: "On Air Target 2G",
                                                            data: OnAir_TargetValues_2G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 2G",
                                                            data: ActualValues_2G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: "On Air Target 3G",
                                                            data: OnAir_TargetValues_3G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 3G",
                                                            data: ActualValues_3G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: "On Air Target 4G",
                                                            data: OnAir_TargetValues_4G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 4G",
                                                            data: ActualValues_4G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: 'Total On Air Target',
                                                            data: OnAir_TargetValues,
                                                            stack: 'totaltarget',
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: 'Total Actual',
                                                            data: ActualValues,
                                                            stack: 'totalactual',
                                                            color: 'rgb(92, 92, 97)'
                                                        }],
                                                    xAxis: {
                                                        categories: timeValues,
                                                        crosshair: true
                                                    }
                                                },
                                                function (chart) {
                                                    //            chart.legend.allItems[0].update({name:'2G'});
                                                    //            chart.legend.allItems[1].update({name:'3G'});
                                                    //            chart.legend.allItems[2].update({name:'Total'});
                                                });
                                            });
                                        }
                                        if ((Pstart < FO) && ((FO < Pend) && (Pend <= FEnd))) {//4444444444444444444444444

                                            var timeValues = [];
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            var ActualValues_2G = [];
                                            var OnAir_TargetValues_2G = [];
                                            var ActualValues_3G = [];
                                            var OnAir_TargetValues_3G = [];
                                            var ActualValues_4G = [];
                                            var OnAir_TargetValues_4G = [];
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


//2GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                            function find2G(fruit) {
                                                return fruit.G2_3G_4G === '2G';
                                            }
                                            var all2G = data[0].createdprojectData.filter(find2G);
                                            var OnAir2G = jsonQ(all2G);
                                            var OnAir_Actual_Date_2G = (OnAir2G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_2G = (OnAir2G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_2G) !== false) && (isNaN(OnAir_Actual_Date_2G) !== false)) {
                                                if (OnAir_Target_Date_2G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_2G.length; i++) {
                                                        var filteredOnAir_Target_Date_2G = OnAir_Target_Date_2G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_2G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_2G.length; i++) {
                                                        var filteredOnAir_Actual_Date_2G = OnAir_Actual_Date_2G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                for (i = 0; i < timeValues.length; i++) {
                                                    var startDate = timeValuesBarHeightStart[0];
                                                    var endDate = timeValuesBarHeightEnd[i];
                                                    var CalculateArrayActual_2G = filteredOnAir_Actual_Date_2G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var CalculateArrayOnAir_Target_2G = filteredOnAir_Target_Date_2G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    ActualValues_2G.push(CalculateArrayActual_2G.length);
                                                    OnAir_TargetValues_2G.push(CalculateArrayOnAir_Target_2G.length);
                                                }
                                            }

//3GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                            function find3G(fruit) {
                                                return fruit.G2_3G_4G === '3G';
                                            }
                                            var all3G = data[0].createdprojectData.filter(find3G);
                                            var OnAir3G = jsonQ(all3G);
                                            var OnAir_Actual_Date_3G = (OnAir3G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_3G = (OnAir3G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_3G) !== false) && (isNaN(OnAir_Actual_Date_3G) !== false)) {
                                                if (OnAir_Target_Date_3G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_3G.length; i++) {
                                                        var filteredOnAir_Target_Date_3G = OnAir_Target_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_3G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_3G.length; i++) {
                                                        var filteredOnAir_Actual_Date_3G = OnAir_Actual_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                for (i = 0; i < timeValues.length; i++) {
                                                    var startDate = timeValuesBarHeightStart[0];
                                                    var endDate = timeValuesBarHeightEnd[i];
                                                    var CalculateArrayActual_3G = filteredOnAir_Actual_Date_3G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var CalculateArrayOnAir_Target_3G = filteredOnAir_Target_Date_3G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    ActualValues_3G.push(CalculateArrayActual_3G.length);
                                                    OnAir_TargetValues_3G.push(CalculateArrayOnAir_Target_3G.length);
                                                }
                                            }

//4GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG                                        
                                            function find4G(fruit) {
                                                return fruit.G2_3G_4G === '4G';
                                            }
                                            var all4G = data[0].createdprojectData.filter(find4G);
                                            var OnAir4G = jsonQ(all4G);
                                            var OnAir_Actual_Date_4G = (OnAir4G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_4G = (OnAir4G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_4G) !== false) && (isNaN(OnAir_Actual_Date_4G) !== false)) {
                                                if (OnAir_Target_Date_4G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_4G.length; i++) {
                                                        var filteredOnAir_Target_Date_4G = OnAir_Target_Date_4G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_4G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_4G.length; i++) {
                                                        var filteredOnAir_Actual_Date_4G = OnAir_Actual_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                for (i = 0; i < timeValues.length; i++) {
                                                    var startDate = timeValuesBarHeightStart[0];
                                                    var endDate = timeValuesBarHeightEnd[i];
                                                    var CalculateArrayActual_4G = filteredOnAir_Actual_Date_4G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var CalculateArrayOnAir_Target_4G = filteredOnAir_Target_Date_4G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    ActualValues_4G.push(CalculateArrayActual_4G.length);
                                                    OnAir_TargetValues_4G.push(CalculateArrayOnAir_Target_4G.length);
                                                }
                                            }






                                            $(function () {
                                                var chart = new Highcharts.Chart({
                                                    chart: {
                                                        renderTo: "chartViewDivtag",
                                                        type: "column"
                                                    },
                                                    title: {
                                                        text: 'Monthly On Air Progress'
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
                                                            stacking: 'normal',
                                                            events: {
                                                                legendItemClick: function () {
                                                                    var chart = this.chart,
                                                                            series = chart.series,
                                                                            visible;
                                                                    if (this.name === 'Total On Air Target') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 2G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 3G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 4G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    series: [{
                                                            name: "On Air Target 2G",
                                                            data: OnAir_TargetValues_2G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 2G",
                                                            data: ActualValues_2G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: "On Air Target 3G",
                                                            data: OnAir_TargetValues_3G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 3G",
                                                            data: ActualValues_3G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: "On Air Target 4G",
                                                            data: OnAir_TargetValues_4G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 4G",
                                                            data: ActualValues_4G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: 'Total On Air Target',
                                                            data: OnAir_TargetValues,
                                                            stack: 'totaltarget',
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: 'Total Actual',
                                                            data: ActualValues,
                                                            stack: 'totalactual',
                                                            color: 'rgb(92, 92, 97)'
                                                        }],
                                                    xAxis: {
                                                        categories: timeValues,
                                                        crosshair: true
                                                    }
                                                },
                                                function (chart) {
                                                    //            chart.legend.allItems[0].update({name:'2G'});
                                                    //            chart.legend.allItems[1].update({name:'3G'});
                                                    //            chart.legend.allItems[2].update({name:'Total'});
                                                });
                                            });
                                        }
                                        if ((Pstart >= FO) && (Pend <= FEnd)) {//55555555555555555555

                                            var timeValues = [];
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            var ActualValues_2G = [];
                                            var OnAir_TargetValues_2G = [];
                                            var ActualValues_3G = [];
                                            var OnAir_TargetValues_3G = [];
                                            var ActualValues_4G = [];
                                            var OnAir_TargetValues_4G = [];
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
                                                return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
                                            });
                                            var PreviousCountOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
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

//2GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                            function find2G(fruit) {
                                                return fruit.G2_3G_4G === '2G';
                                            }
                                            var all2G = data[0].createdprojectData.filter(find2G);
                                            var OnAir2G = jsonQ(all2G);
                                            var OnAir_Actual_Date_2G = (OnAir2G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_2G = (OnAir2G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_2G) !== false) && (isNaN(OnAir_Actual_Date_2G) !== false)) {
                                                if (OnAir_Target_Date_2G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_2G.length; i++) {
                                                        var filteredOnAir_Target_Date_2G = OnAir_Target_Date_2G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_2G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_2G.length; i++) {
                                                        var filteredOnAir_Actual_Date_2G = OnAir_Actual_Date_2G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }

                                                var PreviousCountActual_2G = filteredOnAir_Actual_Date_2G.filter(function (item) {
                                                    return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
                                                });
                                                var PreviousCountOnAir_Target_2G = filteredOnAir_Target_Date_2G.filter(function (item) {
                                                    return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
                                                });

                                                for (i = 0; i < timeValues.length; i++) {
                                                    var startDate = timeValuesBarHeightStart[0];
                                                    var endDate = timeValuesBarHeightEnd[i];
                                                    var CalculateArrayActual_2G = filteredOnAir_Actual_Date_2G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var CalculateArrayOnAir_Target_2G = filteredOnAir_Target_Date_2G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    ActualValues_2G.push(CalculateArrayActual_2G.length + PreviousCountActual_2G.length);
                                                    OnAir_TargetValues_2G.push(CalculateArrayOnAir_Target_2G.length + PreviousCountOnAir_Target_2G.length);
                                                }
                                            }

//3GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                            function find3G(fruit) {
                                                return fruit.G2_3G_4G === '3G';
                                            }
                                            var all3G = data[0].createdprojectData.filter(find3G);
                                            var OnAir3G = jsonQ(all3G);
                                            var OnAir_Actual_Date_3G = (OnAir3G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_3G = (OnAir3G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_3G) !== false) && (isNaN(OnAir_Actual_Date_3G) !== false)) {
                                                if (OnAir_Target_Date_3G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_3G.length; i++) {
                                                        var filteredOnAir_Target_Date_3G = OnAir_Target_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_3G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_3G.length; i++) {
                                                        var filteredOnAir_Actual_Date_3G = OnAir_Actual_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }

                                                var PreviousCountActual_3G = filteredOnAir_Actual_Date_3G.filter(function (item) {
                                                    return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
                                                });
                                                var PreviousCountOnAir_Target_3G = filteredOnAir_Target_Date_3G.filter(function (item) {
                                                    return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
                                                });

                                                for (i = 0; i < timeValues.length; i++) {
                                                    var startDate = timeValuesBarHeightStart[0];
                                                    var endDate = timeValuesBarHeightEnd[i];
                                                    var CalculateArrayActual_3G = filteredOnAir_Actual_Date_3G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var CalculateArrayOnAir_Target_3G = filteredOnAir_Target_Date_3G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    ActualValues_3G.push(CalculateArrayActual_3G.length + PreviousCountActual_3G.length);
                                                    OnAir_TargetValues_3G.push(CalculateArrayOnAir_Target_3G.length + PreviousCountOnAir_Target_3G.length);
                                                }
                                            }

//4GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG                                        
                                            function find4G(fruit) {
                                                return fruit.G2_3G_4G === '4G';
                                            }
                                            var all4G = data[0].createdprojectData.filter(find4G);
                                            var OnAir4G = jsonQ(all4G);
                                            var OnAir_Actual_Date_4G = (OnAir4G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_4G = (OnAir4G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_4G) !== false) && (isNaN(OnAir_Actual_Date_4G) !== false)) {
                                                if (OnAir_Target_Date_4G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_4G.length; i++) {
                                                        var filteredOnAir_Target_Date_4G = OnAir_Target_Date_4G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_4G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_4G.length; i++) {
                                                        var filteredOnAir_Actual_Date_4G = OnAir_Actual_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }

                                                var PreviousCountActual_4G = filteredOnAir_Actual_Date_4G.filter(function (item) {
                                                    return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
                                                });
                                                var PreviousCountOnAir_Target_4G = filteredOnAir_Target_Date_4G.filter(function (item) {
                                                    return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
                                                });

                                                for (i = 0; i < timeValues.length; i++) {
                                                    var startDate = timeValuesBarHeightStart[0];
                                                    var endDate = timeValuesBarHeightEnd[i];
                                                    var CalculateArrayActual_4G = filteredOnAir_Actual_Date_4G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var CalculateArrayOnAir_Target_4G = filteredOnAir_Target_Date_4G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    ActualValues_4G.push(CalculateArrayActual_4G.length + PreviousCountActual_4G.length);
                                                    OnAir_TargetValues_4G.push(CalculateArrayOnAir_Target_4G.length + PreviousCountOnAir_Target_4G.length);
                                                }
                                            }





                                            $(function () {
                                                var chart = new Highcharts.Chart({
                                                    chart: {
                                                        renderTo: "chartViewDivtag",
                                                        type: "column"
                                                    },
                                                    title: {
                                                        text: 'Monthly On Air Progress'
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
                                                            stacking: 'normal',
                                                            events: {
                                                                legendItemClick: function () {
                                                                    var chart = this.chart,
                                                                            series = chart.series,
                                                                            visible;
                                                                    if (this.name === 'Total On Air Target') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 2G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 3G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 4G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    series: [{
                                                            name: "On Air Target 2G",
                                                            data: OnAir_TargetValues_2G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 2G",
                                                            data: ActualValues_2G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: "On Air Target 3G",
                                                            data: OnAir_TargetValues_3G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 3G",
                                                            data: ActualValues_3G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: "On Air Target 4G",
                                                            data: OnAir_TargetValues_4G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 4G",
                                                            data: ActualValues_4G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: 'Total On Air Target',
                                                            data: OnAir_TargetValues,
                                                            stack: 'totaltarget',
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: 'Total Actual',
                                                            data: ActualValues,
                                                            stack: 'totalactual',
                                                            color: 'rgb(92, 92, 97)'
                                                        }],
                                                    xAxis: {
                                                        categories: timeValues,
                                                        crosshair: true
                                                    }
                                                },
                                                function (chart) {
                                                    //            chart.legend.allItems[0].update({name:'2G'});
                                                    //            chart.legend.allItems[1].update({name:'3G'});
                                                    //            chart.legend.allItems[2].update({name:'Total'});
                                                });
                                            });
                                        }
                                        if (((FO <= Pstart) && (Pstart < FEnd)) && (Pend > FEnd)) { //666666666666666666666666666666666666666

                                            var timeValues = [];
                                            var ActualValues = [];
                                            var OnAir_TargetValues = [];
                                            var ActualValues_2G = [];
                                            var OnAir_TargetValues_2G = [];
                                            var ActualValues_3G = [];
                                            var OnAir_TargetValues_3G = [];
                                            var ActualValues_4G = [];
                                            var OnAir_TargetValues_4G = [];
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
                                                return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
                                            });
                                            var PreviousCountOnAir_Target = filteredOnAir_Target_Date.filter(function (item) {
                                                return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
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



//2GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                            function find2G(fruit) {
                                                return fruit.G2_3G_4G === '2G';
                                            }
                                            var all2G = data[0].createdprojectData.filter(find2G);
                                            var OnAir2G = jsonQ(all2G);
                                            var OnAir_Actual_Date_2G = (OnAir2G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_2G = (OnAir2G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_2G) !== false) && (isNaN(OnAir_Actual_Date_2G) !== false)) {
                                                if (OnAir_Target_Date_2G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_2G.length; i++) {
                                                        var filteredOnAir_Target_Date_2G = OnAir_Target_Date_2G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_2G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_2G.length; i++) {
                                                        var filteredOnAir_Actual_Date_2G = OnAir_Actual_Date_2G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }

                                                var PreviousCountActual_2G = filteredOnAir_Actual_Date_2G.filter(function (item) {
                                                    return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
                                                });
                                                var PreviousCountOnAir_Target_2G = filteredOnAir_Target_Date_2G.filter(function (item) {
                                                    return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
                                                });

                                                for (i = 0; i < timeValues.length; i++) {
                                                    var startDate = timeValuesBarHeightStart[0];
                                                    var endDate = timeValuesBarHeightEnd[i];
                                                    var CalculateArrayActual_2G = filteredOnAir_Actual_Date_2G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var CalculateArrayOnAir_Target_2G = filteredOnAir_Target_Date_2G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    ActualValues_2G.push(CalculateArrayActual_2G.length + PreviousCountActual_2G.length);
                                                    OnAir_TargetValues_2G.push(CalculateArrayOnAir_Target_2G.length + PreviousCountOnAir_Target_2G.length);
                                                }
                                            }

//3GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                            function find3G(fruit) {
                                                return fruit.G2_3G_4G === '3G';
                                            }
                                            var all3G = data[0].createdprojectData.filter(find3G);
                                            var OnAir3G = jsonQ(all3G);
                                            var OnAir_Actual_Date_3G = (OnAir3G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_3G = (OnAir3G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_3G) !== false) && (isNaN(OnAir_Actual_Date_3G) !== false)) {
                                                if (OnAir_Target_Date_3G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_3G.length; i++) {
                                                        var filteredOnAir_Target_Date_3G = OnAir_Target_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_3G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_3G.length; i++) {
                                                        var filteredOnAir_Actual_Date_3G = OnAir_Actual_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }

                                                var PreviousCountActual_3G = filteredOnAir_Actual_Date_3G.filter(function (item) {
                                                    return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
                                                });
                                                var PreviousCountOnAir_Target_3G = filteredOnAir_Target_Date_3G.filter(function (item) {
                                                    return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
                                                });

                                                for (i = 0; i < timeValues.length; i++) {
                                                    var startDate = timeValuesBarHeightStart[0];
                                                    var endDate = timeValuesBarHeightEnd[i];
                                                    var CalculateArrayActual_3G = filteredOnAir_Actual_Date_3G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var CalculateArrayOnAir_Target_3G = filteredOnAir_Target_Date_3G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    ActualValues_3G.push(CalculateArrayActual_3G.length + PreviousCountActual_3G.length);
                                                    OnAir_TargetValues_3G.push(CalculateArrayOnAir_Target_3G.length + PreviousCountOnAir_Target_3G.length);
                                                }
                                            }

//4GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG                                        
                                            function find4G(fruit) {
                                                return fruit.G2_3G_4G === '4G';
                                            }
                                            var all4G = data[0].createdprojectData.filter(find4G);
                                            var OnAir4G = jsonQ(all4G);
                                            var OnAir_Actual_Date_4G = (OnAir4G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_4G = (OnAir4G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_4G) !== false) && (isNaN(OnAir_Actual_Date_4G) !== false)) {
                                                if (OnAir_Target_Date_4G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_4G.length; i++) {
                                                        var filteredOnAir_Target_Date_4G = OnAir_Target_Date_4G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_4G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_4G.length; i++) {
                                                        var filteredOnAir_Actual_Date_4G = OnAir_Actual_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }

                                                var PreviousCountActual_4G = filteredOnAir_Actual_Date_4G.filter(function (item) {
                                                    return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
                                                });
                                                var PreviousCountOnAir_Target_4G = filteredOnAir_Target_Date_4G.filter(function (item) {
                                                    return item.localeCompare(fullDateArray[0]) > -1 && timeValuesBarHeightStart[0].localeCompare(item) > -1;//change
                                                });

                                                for (i = 0; i < timeValues.length; i++) {
                                                    var startDate = timeValuesBarHeightStart[0];
                                                    var endDate = timeValuesBarHeightEnd[i];
                                                    var CalculateArrayActual_4G = filteredOnAir_Actual_Date_4G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var CalculateArrayOnAir_Target_4G = filteredOnAir_Target_Date_4G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    ActualValues_4G.push(CalculateArrayActual_4G.length + PreviousCountActual_4G.length);
                                                    OnAir_TargetValues_4G.push(CalculateArrayOnAir_Target_4G.length + PreviousCountOnAir_Target_4G.length);
                                                }
                                            }






                                            $(function () {
                                                var chart = new Highcharts.Chart({
                                                    chart: {
                                                        renderTo: "chartViewDivtag",
                                                        type: "column"
                                                    },
                                                    title: {
                                                        text: 'Monthly On Air Progress'
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
                                                            stacking: 'normal',
                                                            events: {
                                                                legendItemClick: function () {
                                                                    var chart = this.chart,
                                                                            series = chart.series,
                                                                            visible;
                                                                    if (this.name === 'Total On Air Target') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 2G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 3G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 4G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    series: [{
                                                            name: "On Air Target 2G",
                                                            data: OnAir_TargetValues_2G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 2G",
                                                            data: ActualValues_2G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: "On Air Target 3G",
                                                            data: OnAir_TargetValues_3G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 3G",
                                                            data: ActualValues_3G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: "On Air Target 4G",
                                                            data: OnAir_TargetValues_4G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 4G",
                                                            data: ActualValues_4G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: 'Total On Air Target',
                                                            data: OnAir_TargetValues,
                                                            stack: 'totaltarget',
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: 'Total Actual',
                                                            data: ActualValues,
                                                            stack: 'totalactual',
                                                            color: 'rgb(92, 92, 97)'
                                                        }],
                                                    xAxis: {
                                                        categories: timeValues,
                                                        crosshair: true
                                                    }
                                                },
                                                function (chart) {
                                                    //            chart.legend.allItems[0].update({name:'2G'});
                                                    //            chart.legend.allItems[1].update({name:'3G'});
                                                    //            chart.legend.allItems[2].update({name:'Total'});
                                                });
                                            });
                                        }

                                    }
                                    else {
                                        $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Not fill target date or onair actual date.. .....</h2></div>");
                                    }
                                }
                                else {
                                    $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Not fill target date or onair actual date.. .....</h2></div>");
                                }
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


//                                develop a new function for change trget date
                                function findTargetDate(fruit) {
                                    return fruit.Site_ID !== null && fruit.Site_ID !== "";
                                }
                                var targetAlldate = data[0].createdprojectData.filter(findTargetDate);

                                var allonair = data[0].createdprojectData.filter(findOnAir);
                                if ((isNaN(allonair) !== false) && (isNaN(targetAlldate) !== false)) {
                                    var onaliQ = jsonQ(allonair);
                                    var OnAir_Actual_Date = (onaliQ.find('OnAir_Actual_Date').value().sort());
//                                    var OnAir_Target_Date = (onaliQ.find('OnAir_Target_Date').value().sort());

//                                    new target date function
                                    var dateQ = jsonQ(targetAlldate);
                                    var OnAir_Target_Date = (dateQ.find('OnAir_Target_Date').value().sort());

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
//                                            console.log(startDate + " ||||| " + endDate);
                                            var filteredArrayActual = OnAir_Actual_Date.filter(function (item) {
                                                return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                            });
                                            var filteredArrayOnAir_Target = OnAir_Target_Date.filter(function (item) {
                                                return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                            });

                                            ActualValues.push(filteredArrayActual.length);
                                            OnAir_TargetValues.push(filteredArrayOnAir_Target.length);

                                        }
//                                        console.log(ActualValues);
//                                        console.log(OnAir_TargetValues);
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

                                //alert("Wi-Fi");//**********************************************************************************************


                                function findOnAir(fruit) {
                                    return fruit.Status === 'OnAir';
                                }
                                function findOnAirRemoved(fruit) {
                                    return fruit.Status === 'OnAir & Removed';
                                }
                                function findOnAirBlocked(fruit) {
                                    return fruit.Status === 'OnAir & Blocked';
                                }
                                function findOnAirPOC(fruit) {
                                    return fruit.Status === 'OnAir & POC';
                                }
                                var allonairOnly = data[0].createdprojectData.filter(findOnAir);
                                var allonairRemoved = data[0].createdprojectData.filter(findOnAirRemoved);
                                var allonairBlocked = data[0].createdprojectData.filter(findOnAirBlocked);
                                var allonairPoc = data[0].createdprojectData.filter(findOnAirPOC);

                                var allonair = [];
                                if (allonairOnly.length !== 0) {
                                    if (allonairRemoved.length !== 0) {
                                        if (allonairBlocked.length !== 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairOnly.concat(allonairRemoved).concat(allonairBlocked).concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairOnly.concat(allonairRemoved).concat(allonairBlocked);
                                            }
                                        }
                                        if (allonairBlocked.length === 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairOnly.concat(allonairRemoved).concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairOnly.concat(allonairRemoved);
                                            }
                                        }
                                    }
                                    if (allonairRemoved.length === 0) {
                                        if (allonairBlocked.length !== 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairOnly.concat(allonairBlocked).concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairOnly.concat(allonairBlocked);
                                            }
                                        }
                                        if (allonairBlocked.length === 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairOnly.concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairOnly;
                                            }
                                        }
                                    }
                                }
                                if (allonairOnly.length === 0) {
                                    if (allonairRemoved.length !== 0) {
                                        if (allonairBlocked.length !== 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairRemoved.concat(allonairBlocked).concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairRemoved.concat(allonairBlocked);
                                            }
                                        }
                                        if (allonairBlocked.length === 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairRemoved.concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairRemoved;
                                            }
                                        }
                                    }
                                    if (allonairRemoved.length === 0) {
                                        if (allonairBlocked.length !== 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairBlocked.concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairBlocked;
                                            }
                                        }
                                        if (allonairBlocked.length === 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairPoc;
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = [];
                                            }
                                        }
                                    }
                                }


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

                                // alert("Access Network");//**********************************************************************************************

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


//2GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                        function find2G(fruit) {
                                            return fruit.G2_3G_4G === '2G';
                                        }
                                        var all2G = data[0].createdprojectData.filter(find2G);
                                        var OnAir2G = jsonQ(all2G);
                                        var OnAir_Actual_Date_2G = (OnAir2G.find('OnAir_Actual_Date').value().sort());
                                        var OnAir_Target_Date_2G = (OnAir2G.find('OnAir_Target_Date').value().sort());
                                        if ((isNaN(OnAir_Target_Date_2G) !== false) && (isNaN(OnAir_Actual_Date_2G) !== false)) {
                                            if (OnAir_Target_Date_2G.length !== 0) {
                                                var SystemDate = new Date().toJSON().slice(0, 10);
                                                for (i = 0; i < OnAir_Target_Date_2G.length; i++) {
                                                    var filteredOnAir_Target_Date_2G = OnAir_Target_Date_2G.filter(function (item) {
                                                        return item.localeCompare(OnAir_Target_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                    });
                                                }
                                            }
                                            if (OnAir_Actual_Date_2G.length !== 0) {
                                                var SystemDate = new Date().toJSON().slice(0, 10);
                                                for (i = 0; i < OnAir_Actual_Date_2G.length; i++) {
                                                    var filteredOnAir_Actual_Date_2G = OnAir_Actual_Date_2G.filter(function (item) {
                                                        return item.localeCompare(OnAir_Actual_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                    });
                                                }
                                            }
                                            var ActualValues_2G = [];
                                            var OnAir_TargetValues_2G = [];
                                            for (i = 1; i < timeValues.length; i++) {
                                                var startDate = timeValues[0];
                                                var endDate = timeValues[i];
                                                console.log(startDate + " ||||| " + endDate);
                                                var filteredArrayActual_2G = OnAir_Actual_Date_2G.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var filteredArrayOnAir_Target_2G = OnAir_Target_Date_2G.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });

                                                ActualValues_2G.push(filteredArrayActual_2G.length);
                                                OnAir_TargetValues_2G.push(filteredArrayOnAir_Target_2G.length);

                                            }
                                        }

//3GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                        function find3G(fruit) {
                                            return fruit.G2_3G_4G === '3G';
                                        }
                                        var all3G = data[0].createdprojectData.filter(find3G);
                                        var OnAir3G = jsonQ(all3G);
                                        var OnAir_Actual_Date_3G = (OnAir3G.find('OnAir_Actual_Date').value().sort());
                                        var OnAir_Target_Date_3G = (OnAir3G.find('OnAir_Target_Date').value().sort());
                                        if ((isNaN(OnAir_Target_Date_3G) !== false) && (isNaN(OnAir_Actual_Date_3G) !== false)) {
                                            if (OnAir_Target_Date_3G.length !== 0) {
                                                var SystemDate = new Date().toJSON().slice(0, 10);
                                                for (i = 0; i < OnAir_Target_Date_3G.length; i++) {
                                                    var filteredOnAir_Target_Date_3G = OnAir_Target_Date_3G.filter(function (item) {
                                                        return item.localeCompare(OnAir_Target_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                    });
                                                }
                                            }
                                            if (OnAir_Actual_Date_3G.length !== 0) {
                                                var SystemDate = new Date().toJSON().slice(0, 10);
                                                for (i = 0; i < OnAir_Actual_Date_3G.length; i++) {
                                                    var filteredOnAir_Actual_Date_3G = OnAir_Actual_Date_3G.filter(function (item) {
                                                        return item.localeCompare(OnAir_Actual_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                    });
                                                }
                                            }
                                            var ActualValues_3G = [];
                                            var OnAir_TargetValues_3G = [];
                                            for (i = 1; i < timeValues.length; i++) {
                                                var startDate = timeValues[0];
                                                var endDate = timeValues[i];
                                                console.log(startDate + " ||||| " + endDate);
                                                var filteredArrayActual_3G = OnAir_Actual_Date_3G.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var filteredArrayOnAir_Target_3G = OnAir_Target_Date_3G.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });

                                                ActualValues_3G.push(filteredArrayActual_3G.length);
                                                OnAir_TargetValues_3G.push(filteredArrayOnAir_Target_3G.length);

                                            }

                                        }

//4GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG                                        
                                        function find4G(fruit) {
                                            return fruit.G2_3G_4G === '4G';
                                        }
                                        var all4G = data[0].createdprojectData.filter(find4G);
                                        var OnAir4G = jsonQ(all4G);
                                        var OnAir_Actual_Date_4G = (OnAir4G.find('OnAir_Actual_Date').value().sort());
                                        var OnAir_Target_Date_4G = (OnAir4G.find('OnAir_Target_Date').value().sort());
                                        if ((isNaN(OnAir_Target_Date_4G) !== false) && (isNaN(OnAir_Actual_Date_4G) !== false)) {
                                            if (OnAir_Target_Date_4G.length !== 0) {
                                                var SystemDate = new Date().toJSON().slice(0, 10);
                                                for (i = 0; i < OnAir_Target_Date_4G.length; i++) {
                                                    var filteredOnAir_Target_Date_4G = OnAir_Target_Date_4G.filter(function (item) {
                                                        return item.localeCompare(OnAir_Target_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                    });
                                                }
                                            }
                                            if (OnAir_Actual_Date_4G.length !== 0) {
                                                var SystemDate = new Date().toJSON().slice(0, 10);
                                                for (i = 0; i < OnAir_Actual_Date_4G.length; i++) {
                                                    var filteredOnAir_Actual_Date_4G = OnAir_Actual_Date_3G.filter(function (item) {
                                                        return item.localeCompare(OnAir_Actual_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                    });
                                                }
                                            }
                                            var ActualValues_4G = [];
                                            var OnAir_TargetValues_4G = [];
                                            for (i = 1; i < timeValues.length; i++) {
                                                var startDate = timeValues[0];
                                                var endDate = timeValues[i];
                                                console.log(startDate + " ||||| " + endDate);
                                                var filteredArrayActual_4G = OnAir_Actual_Date_4G.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });
                                                var filteredArrayOnAir_Target_4G = OnAir_Target_Date_4G.filter(function (item) {
                                                    return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                });

                                                ActualValues_4G.push(filteredArrayActual_4G.length);
                                                OnAir_TargetValues_4G.push(filteredArrayOnAir_Target_4G.length);

                                            }
                                        }



                                        //**************
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
                                                        stacking: 'normal',
                                                        events: {
                                                            legendItemClick: function () {
                                                                var chart = this.chart,
                                                                        series = chart.series,
                                                                        visible;
                                                                if (this.name === 'Total On Air Target') {
                                                                    visible = true;
                                                                    series[0].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[1].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[2].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[3].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[4].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[5].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[6].update({
                                                                        visible: visible
                                                                    });
                                                                    series[7].update({
                                                                        visible: visible
                                                                    });
                                                                    return false;
                                                                }
                                                                if (this.name === 'On Air Target 2G') {
                                                                    visible = true;
                                                                    series[0].update({
                                                                        visible: visible
                                                                    });
                                                                    series[1].update({
                                                                        visible: visible
                                                                    });
                                                                    series[2].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[3].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[4].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[5].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[6].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[7].update({
                                                                        visible: !visible
                                                                    });
                                                                    return false;
                                                                }
                                                                if (this.name === 'On Air Target 3G') {
                                                                    visible = true;
                                                                    series[0].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[1].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[2].update({
                                                                        visible: visible
                                                                    });
                                                                    series[3].update({
                                                                        visible: visible
                                                                    });
                                                                    series[4].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[5].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[6].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[7].update({
                                                                        visible: !visible
                                                                    });
                                                                    return false;
                                                                }
                                                                if (this.name === 'On Air Target 4G') {
                                                                    visible = true;
                                                                    series[0].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[1].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[2].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[3].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[4].update({
                                                                        visible: visible
                                                                    });
                                                                    series[5].update({
                                                                        visible: visible
                                                                    });
                                                                    series[6].update({
                                                                        visible: !visible
                                                                    });
                                                                    series[7].update({
                                                                        visible: !visible
                                                                    });
                                                                    return false;
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                series: [{
                                                        name: "On Air Target 2G",
                                                        data: OnAir_TargetValues_2G,
                                                        stack: 'target',
                                                        visible: false,
                                                        color: 'rgb(124, 181, 236)'
                                                    }, {
                                                        linkedTo: ':previous',
                                                        name: "Actual 2G",
                                                        data: ActualValues_2G,
                                                        stack: 'actual',
                                                        visible: false,
                                                        color: 'rgb(92, 92, 97)'
                                                    }, {
                                                        name: "On Air Target 3G",
                                                        data: OnAir_TargetValues_3G,
                                                        stack: 'target',
                                                        visible: false,
                                                        color: 'rgb(124, 181, 236)'
                                                    }, {
                                                        linkedTo: ':previous',
                                                        name: "Actual 3G",
                                                        data: ActualValues_3G,
                                                        stack: 'actual',
                                                        visible: false,
                                                        color: 'rgb(92, 92, 97)'
                                                    }, {
                                                        name: "On Air Target 4G",
                                                        data: OnAir_TargetValues_4G,
                                                        stack: 'target',
                                                        visible: false,
                                                        color: 'rgb(124, 181, 236)'
                                                    }, {
                                                        linkedTo: ':previous',
                                                        name: "Actual 4G",
                                                        data: ActualValues_4G,
                                                        stack: 'actual',
                                                        visible: false,
                                                        color: 'rgb(92, 92, 97)'
                                                    }, {
                                                        name: 'Total On Air Target',
                                                        data: OnAir_TargetValues,
                                                        stack: 'totaltarget',
                                                        color: 'rgb(124, 181, 236)'
                                                    }, {
                                                        linkedTo: ':previous',
                                                        name: 'Total Actual',
                                                        data: ActualValues,
                                                        stack: 'totalactual',
                                                        color: 'rgb(92, 92, 97)'
                                                    }],
                                                xAxis: {
                                                    categories: categoriesObj
                                                }
                                            },
                                            function (chart) {
                                                //            chart.legend.allItems[0].update({name:'2G'});
                                                //            chart.legend.allItems[1].update({name:'3G'});
                                                //            chart.legend.allItems[2].update({name:'Total'});
                                            });
                                        });
                                        //***************




                                    }
                                    else {
                                        $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Not fill target date or onair actual date.. .....</h2></div>");
                                    }
                                }
                                else {
                                    $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>Not fill target date or onair actual date.. .....</h2></div>");
                                }
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

//                            develop a new function for change trget date
                            function findTargetDate(fruit) {
                                return fruit.Site_ID !== null && fruit.Site_ID !== "";
                            }
                            var targetAlldate = data[0].createdprojectData.filter(findTargetDate);

                            if (AllStatesData.length !== 0) {
                                function findOnAir(fruit) {
                                    return fruit.Status === 'OnAir';
                                }
                                var allonair = data[0].createdprojectData.filter(findOnAir);
                                if ((isNaN(allonair) !== false) && (isNaN(targetAlldate) !== false)) {
                                    var onaliQ = jsonQ(allonair);
                                    var OnAir_Actual_Date = (onaliQ.find('OnAir_Actual_Date').value().sort());
//                                    var OnAir_Target_Date = (onaliQ.find('OnAir_Target_Date').value().sort());

//                                    new target date function
                                    var dateQ = jsonQ(targetAlldate);
                                    var OnAir_Target_Date = (dateQ.find('OnAir_Target_Date').value().sort());

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
                                                        text: 'Weekly OnA ir Progress'
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
//                                                console.log(startDate + " ||||| " + endDate);
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
//                                                console.log(startDate + " ||||| " + endDate);
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

                                //alert("Wi-Fi");//**********************************************************************************************

                                function findOnAir(fruit) {
                                    return fruit.Status === 'OnAir';
                                }
                                function findOnAirRemoved(fruit) {
                                    return fruit.Status === 'OnAir & Removed';
                                }
                                function findOnAirBlocked(fruit) {
                                    return fruit.Status === 'OnAir & Blocked';
                                }
                                function findOnAirPOC(fruit) {
                                    return fruit.Status === 'OnAir & POC';
                                }
                                var allonairOnly = data[0].createdprojectData.filter(findOnAir);
                                var allonairRemoved = data[0].createdprojectData.filter(findOnAirRemoved);
                                var allonairBlocked = data[0].createdprojectData.filter(findOnAirBlocked);
                                var allonairPoc = data[0].createdprojectData.filter(findOnAirPOC);

                                var allonair = [];
                                if (allonairOnly.length !== 0) {
                                    if (allonairRemoved.length !== 0) {
                                        if (allonairBlocked.length !== 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairOnly.concat(allonairRemoved).concat(allonairBlocked).concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairOnly.concat(allonairRemoved).concat(allonairBlocked);
                                            }
                                        }
                                        if (allonairBlocked.length === 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairOnly.concat(allonairRemoved).concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairOnly.concat(allonairRemoved);
                                            }
                                        }
                                    }
                                    if (allonairRemoved.length === 0) {
                                        if (allonairBlocked.length !== 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairOnly.concat(allonairBlocked).concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairOnly.concat(allonairBlocked);
                                            }
                                        }
                                        if (allonairBlocked.length === 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairOnly.concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairOnly;
                                            }
                                        }
                                    }
                                }
                                if (allonairOnly.length === 0) {
                                    if (allonairRemoved.length !== 0) {
                                        if (allonairBlocked.length !== 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairRemoved.concat(allonairBlocked).concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairRemoved.concat(allonairBlocked);
                                            }
                                        }
                                        if (allonairBlocked.length === 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairRemoved.concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairRemoved;
                                            }
                                        }
                                    }
                                    if (allonairRemoved.length === 0) {
                                        if (allonairBlocked.length !== 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairBlocked.concat(allonairPoc);
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = allonairBlocked;
                                            }
                                        }
                                        if (allonairBlocked.length === 0) {
                                            if (allonairPoc.length !== 0) {
                                                allonair = allonairPoc;
                                            }
                                            if (allonairPoc.length === 0) {
                                                allonair = [];
                                            }
                                        }
                                    }
                                }



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
                                                        text: 'Weekly OnA ir Progress'
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

                                //alert("Access Network");//**********************************************************************************************
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


//2GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                            function find2G(fruit) {
                                                return fruit.G2_3G_4G === '2G';
                                            }
                                            var all2G = data[0].createdprojectData.filter(find2G);
                                            var OnAir2G = jsonQ(all2G);
                                            var OnAir_Actual_Date_2G = (OnAir2G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_2G = (OnAir2G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_2G) !== false) && (isNaN(OnAir_Actual_Date_2G) !== false)) {
                                                if (OnAir_Target_Date_2G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_2G.length; i++) {
                                                        var filteredOnAir_Target_Date_2G = OnAir_Target_Date_2G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_2G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_2G.length; i++) {
                                                        var filteredOnAir_Actual_Date_2G = OnAir_Actual_Date_2G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                var ActualValues_2G = [];
                                                var OnAir_TargetValues_2G = [];
                                                for (i = 1; i < timeValues.length; i++) {
                                                    var startDate = timeValues[0];
                                                    var endDate = timeValues[i];
                                                    console.log(startDate + " ||||| " + endDate);
                                                    var filteredArrayActual_2G = OnAir_Actual_Date_2G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var filteredArrayOnAir_Target_2G = OnAir_Target_Date_2G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });

                                                    ActualValues_2G.push(filteredArrayActual_2G.length);
                                                    OnAir_TargetValues_2G.push(filteredArrayOnAir_Target_2G.length);

                                                }
                                            }

//3GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                            function find3G(fruit) {
                                                return fruit.G2_3G_4G === '3G';
                                            }
                                            var all3G = data[0].createdprojectData.filter(find3G);
                                            var OnAir3G = jsonQ(all3G);
                                            var OnAir_Actual_Date_3G = (OnAir3G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_3G = (OnAir3G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_3G) !== false) && (isNaN(OnAir_Actual_Date_3G) !== false)) {
                                                if (OnAir_Target_Date_3G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_3G.length; i++) {
                                                        var filteredOnAir_Target_Date_3G = OnAir_Target_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_3G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_3G.length; i++) {
                                                        var filteredOnAir_Actual_Date_3G = OnAir_Actual_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                var ActualValues_3G = [];
                                                var OnAir_TargetValues_3G = [];
                                                for (i = 1; i < timeValues.length; i++) {
                                                    var startDate = timeValues[0];
                                                    var endDate = timeValues[i];
                                                    console.log(startDate + " ||||| " + endDate);
                                                    var filteredArrayActual_3G = OnAir_Actual_Date_3G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var filteredArrayOnAir_Target_3G = OnAir_Target_Date_3G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });

                                                    ActualValues_3G.push(filteredArrayActual_3G.length);
                                                    OnAir_TargetValues_3G.push(filteredArrayOnAir_Target_3G.length);

                                                }

                                            }

//4GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG                                        
                                            function find4G(fruit) {
                                                return fruit.G2_3G_4G === '4G';
                                            }
                                            var all4G = data[0].createdprojectData.filter(find4G);
                                            var OnAir4G = jsonQ(all4G);
                                            var OnAir_Actual_Date_4G = (OnAir4G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_4G = (OnAir4G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_4G) !== false) && (isNaN(OnAir_Actual_Date_4G) !== false)) {
                                                if (OnAir_Target_Date_4G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_4G.length; i++) {
                                                        var filteredOnAir_Target_Date_4G = OnAir_Target_Date_4G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_4G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_4G.length; i++) {
                                                        var filteredOnAir_Actual_Date_4G = OnAir_Actual_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                var ActualValues_4G = [];
                                                var OnAir_TargetValues_4G = [];
                                                for (i = 1; i < timeValues.length; i++) {
                                                    var startDate = timeValues[0];
                                                    var endDate = timeValues[i];
                                                    console.log(startDate + " ||||| " + endDate);
                                                    var filteredArrayActual_4G = OnAir_Actual_Date_4G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var filteredArrayOnAir_Target_4G = OnAir_Target_Date_4G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });

                                                    ActualValues_4G.push(filteredArrayActual_4G.length);
                                                    OnAir_TargetValues_4G.push(filteredArrayOnAir_Target_4G.length);

                                                }
                                            }



                                            //**************
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
                                                            stacking: 'normal',
                                                            events: {
                                                                legendItemClick: function () {
                                                                    var chart = this.chart,
                                                                            series = chart.series,
                                                                            visible;
                                                                    if (this.name === 'Total On Air Target') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 2G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 3G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 4G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    series: [{
                                                            name: "On Air Target 2G",
                                                            data: OnAir_TargetValues_2G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 2G",
                                                            data: ActualValues_2G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: "On Air Target 3G",
                                                            data: OnAir_TargetValues_3G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 3G",
                                                            data: ActualValues_3G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: "On Air Target 4G",
                                                            data: OnAir_TargetValues_4G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 4G",
                                                            data: ActualValues_4G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: 'Total On Air Target',
                                                            data: OnAir_TargetValues,
                                                            stack: 'totaltarget',
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: 'Total Actual',
                                                            data: ActualValues,
                                                            stack: 'totalactual',
                                                            color: 'rgb(92, 92, 97)'
                                                        }],
                                                    xAxis: {
                                                        categories: categoriesObj
                                                    }
                                                },
                                                function (chart) {
                                                    //            chart.legend.allItems[0].update({name:'2G'});
                                                    //            chart.legend.allItems[1].update({name:'3G'});
                                                    //            chart.legend.allItems[2].update({name:'Total'});
                                                });
                                            });
                                            //***************
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


                                            //2GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                            function find2G(fruit) {
                                                return fruit.G2_3G_4G === '2G';
                                            }
                                            var all2G = data[0].createdprojectData.filter(find2G);
                                            var OnAir2G = jsonQ(all2G);
                                            var OnAir_Actual_Date_2G = (OnAir2G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_2G = (OnAir2G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_2G) !== false) && (isNaN(OnAir_Actual_Date_2G) !== false)) {
                                                if (OnAir_Target_Date_2G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_2G.length; i++) {
                                                        var filteredOnAir_Target_Date_2G = OnAir_Target_Date_2G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_2G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_2G.length; i++) {
                                                        var filteredOnAir_Actual_Date_2G = OnAir_Actual_Date_2G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                var ActualValues_2G = [];
                                                var OnAir_TargetValues_2G = [];
                                                for (i = 1; i < timeValues.length; i++) {
                                                    var startDate = timeValues[0];
                                                    var endDate = timeValues[i];
                                                    console.log(startDate + " ||||| " + endDate);
                                                    var filteredArrayActual_2G = OnAir_Actual_Date_2G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var filteredArrayOnAir_Target_2G = OnAir_Target_Date_2G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });

                                                    ActualValues_2G.push(filteredArrayActual_2G.length);
                                                    OnAir_TargetValues_2G.push(filteredArrayOnAir_Target_2G.length);

                                                }
                                            }

//3GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                            function find3G(fruit) {
                                                return fruit.G2_3G_4G === '3G';
                                            }
                                            var all3G = data[0].createdprojectData.filter(find3G);
                                            var OnAir3G = jsonQ(all3G);
                                            var OnAir_Actual_Date_3G = (OnAir3G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_3G = (OnAir3G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_3G) !== false) && (isNaN(OnAir_Actual_Date_3G) !== false)) {
                                                if (OnAir_Target_Date_3G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_3G.length; i++) {
                                                        var filteredOnAir_Target_Date_3G = OnAir_Target_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_3G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_3G.length; i++) {
                                                        var filteredOnAir_Actual_Date_3G = OnAir_Actual_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                var ActualValues_3G = [];
                                                var OnAir_TargetValues_3G = [];
                                                for (i = 1; i < timeValues.length; i++) {
                                                    var startDate = timeValues[0];
                                                    var endDate = timeValues[i];
                                                    console.log(startDate + " ||||| " + endDate);
                                                    var filteredArrayActual_3G = OnAir_Actual_Date_3G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var filteredArrayOnAir_Target_3G = OnAir_Target_Date_3G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });

                                                    ActualValues_3G.push(filteredArrayActual_3G.length);
                                                    OnAir_TargetValues_3G.push(filteredArrayOnAir_Target_3G.length);

                                                }

                                            }

//4GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG                                        
                                            function find4G(fruit) {
                                                return fruit.G2_3G_4G === '4G';
                                            }
                                            var all4G = data[0].createdprojectData.filter(find4G);
                                            var OnAir4G = jsonQ(all4G);
                                            var OnAir_Actual_Date_4G = (OnAir4G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_4G = (OnAir4G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_4G) !== false) && (isNaN(OnAir_Actual_Date_4G) !== false)) {
                                                if (OnAir_Target_Date_4G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_4G.length; i++) {
                                                        var filteredOnAir_Target_Date_4G = OnAir_Target_Date_4G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_4G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_4G.length; i++) {
                                                        var filteredOnAir_Actual_Date_4G = OnAir_Actual_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                var ActualValues_4G = [];
                                                var OnAir_TargetValues_4G = [];
                                                for (i = 1; i < timeValues.length; i++) {
                                                    var startDate = timeValues[0];
                                                    var endDate = timeValues[i];
                                                    console.log(startDate + " ||||| " + endDate);
                                                    var filteredArrayActual_4G = OnAir_Actual_Date_4G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var filteredArrayOnAir_Target_4G = OnAir_Target_Date_4G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });

                                                    ActualValues_4G.push(filteredArrayActual_4G.length);
                                                    OnAir_TargetValues_4G.push(filteredArrayOnAir_Target_4G.length);

                                                }
                                            }



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
                                                            stacking: 'normal',
                                                            events: {
                                                                legendItemClick: function () {
                                                                    var chart = this.chart,
                                                                            series = chart.series,
                                                                            visible;
                                                                    if (this.name === 'Total On Air Target') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 2G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 3G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 4G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    series: [{
                                                            name: "On Air Target 2G",
                                                            data: OnAir_TargetValues_2G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 2G",
                                                            data: ActualValues_2G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: "On Air Target 3G",
                                                            data: OnAir_TargetValues_3G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 3G",
                                                            data: ActualValues_3G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: "On Air Target 4G",
                                                            data: OnAir_TargetValues_4G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 4G",
                                                            data: ActualValues_4G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: 'Total On Air Target',
                                                            data: OnAir_TargetValues,
                                                            stack: 'totaltarget',
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: 'Total Actual',
                                                            data: ActualValues,
                                                            stack: 'totalactual',
                                                            color: 'rgb(92, 92, 97)'
                                                        }],
                                                    xAxis: {
                                                        categories: categoriesObj
                                                    }
                                                },
                                                function (chart) {
                                                    //            chart.legend.allItems[0].update({name:'2G'});
                                                    //            chart.legend.allItems[1].update({name:'3G'});
                                                    //            chart.legend.allItems[2].update({name:'Total'});
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


                                            //2GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                            function find2G(fruit) {
                                                return fruit.G2_3G_4G === '2G';
                                            }
                                            var all2G = data[0].createdprojectData.filter(find2G);
                                            var OnAir2G = jsonQ(all2G);
                                            var OnAir_Actual_Date_2G = (OnAir2G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_2G = (OnAir2G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_2G) !== false) && (isNaN(OnAir_Actual_Date_2G) !== false)) {
                                                if (OnAir_Target_Date_2G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_2G.length; i++) {
                                                        var filteredOnAir_Target_Date_2G = OnAir_Target_Date_2G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_2G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_2G.length; i++) {
                                                        var filteredOnAir_Actual_Date_2G = OnAir_Actual_Date_2G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                var ActualValues_2G = [];
                                                var OnAir_TargetValues_2G = [];
                                                for (i = 1; i < timeValues.length; i++) {
                                                    var startDate = fullDateArray[0];//change
                                                    var endDate = timeValues[i];
                                                    console.log(startDate + " ||||| " + endDate);
                                                    var filteredArrayActual_2G = OnAir_Actual_Date_2G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var filteredArrayOnAir_Target_2G = OnAir_Target_Date_2G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });

                                                    ActualValues_2G.push(filteredArrayActual_2G.length);
                                                    OnAir_TargetValues_2G.push(filteredArrayOnAir_Target_2G.length);

                                                }
                                            }

//3GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                            function find3G(fruit) {
                                                return fruit.G2_3G_4G === '3G';
                                            }
                                            var all3G = data[0].createdprojectData.filter(find3G);
                                            var OnAir3G = jsonQ(all3G);
                                            var OnAir_Actual_Date_3G = (OnAir3G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_3G = (OnAir3G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_3G) !== false) && (isNaN(OnAir_Actual_Date_3G) !== false)) {
                                                if (OnAir_Target_Date_3G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_3G.length; i++) {
                                                        var filteredOnAir_Target_Date_3G = OnAir_Target_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_3G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_3G.length; i++) {
                                                        var filteredOnAir_Actual_Date_3G = OnAir_Actual_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                var ActualValues_3G = [];
                                                var OnAir_TargetValues_3G = [];
                                                for (i = 1; i < timeValues.length; i++) {
                                                    var startDate = fullDateArray[0];//change
                                                    var endDate = timeValues[i];
                                                    console.log(startDate + " ||||| " + endDate);
                                                    var filteredArrayActual_3G = OnAir_Actual_Date_3G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var filteredArrayOnAir_Target_3G = OnAir_Target_Date_3G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });

                                                    ActualValues_3G.push(filteredArrayActual_3G.length);
                                                    OnAir_TargetValues_3G.push(filteredArrayOnAir_Target_3G.length);

                                                }

                                            }

//4GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG                                        
                                            function find4G(fruit) {
                                                return fruit.G2_3G_4G === '4G';
                                            }
                                            var all4G = data[0].createdprojectData.filter(find4G);
                                            var OnAir4G = jsonQ(all4G);
                                            var OnAir_Actual_Date_4G = (OnAir4G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_4G = (OnAir4G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_4G) !== false) && (isNaN(OnAir_Actual_Date_4G) !== false)) {
                                                if (OnAir_Target_Date_4G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_4G.length; i++) {
                                                        var filteredOnAir_Target_Date_4G = OnAir_Target_Date_4G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_4G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_4G.length; i++) {
                                                        var filteredOnAir_Actual_Date_4G = OnAir_Actual_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                var ActualValues_4G = [];
                                                var OnAir_TargetValues_4G = [];
                                                for (i = 1; i < timeValues.length; i++) {
                                                    var startDate = fullDateArray[0];//change
                                                    var endDate = timeValues[i];
                                                    console.log(startDate + " ||||| " + endDate);
                                                    var filteredArrayActual_4G = OnAir_Actual_Date_4G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var filteredArrayOnAir_Target_4G = OnAir_Target_Date_4G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });

                                                    ActualValues_4G.push(filteredArrayActual_4G.length);
                                                    OnAir_TargetValues_4G.push(filteredArrayOnAir_Target_4G.length);

                                                }
                                            }



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
                                                            stacking: 'normal',
                                                            events: {
                                                                legendItemClick: function () {
                                                                    var chart = this.chart,
                                                                            series = chart.series,
                                                                            visible;
                                                                    if (this.name === 'Total On Air Target') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 2G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 3G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 4G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    series: [{
                                                            name: "On Air Target 2G",
                                                            data: OnAir_TargetValues_2G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 2G",
                                                            data: ActualValues_2G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: "On Air Target 3G",
                                                            data: OnAir_TargetValues_3G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 3G",
                                                            data: ActualValues_3G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: "On Air Target 4G",
                                                            data: OnAir_TargetValues_4G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 4G",
                                                            data: ActualValues_4G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: 'Total On Air Target',
                                                            data: OnAir_TargetValues,
                                                            stack: 'totaltarget',
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: 'Total Actual',
                                                            data: ActualValues,
                                                            stack: 'totalactual',
                                                            color: 'rgb(92, 92, 97)'
                                                        }],
                                                    xAxis: {
                                                        categories: categoriesObj
                                                    }
                                                },
                                                function (chart) {
                                                    //            chart.legend.allItems[0].update({name:'2G'});
                                                    //            chart.legend.allItems[1].update({name:'3G'});
                                                    //            chart.legend.allItems[2].update({name:'Total'});
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



                                            //2GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                            function find2G(fruit) {
                                                return fruit.G2_3G_4G === '2G';
                                            }
                                            var all2G = data[0].createdprojectData.filter(find2G);
                                            var OnAir2G = jsonQ(all2G);
                                            var OnAir_Actual_Date_2G = (OnAir2G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_2G = (OnAir2G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_2G) !== false) && (isNaN(OnAir_Actual_Date_2G) !== false)) {
                                                if (OnAir_Target_Date_2G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_2G.length; i++) {
                                                        var filteredOnAir_Target_Date_2G = OnAir_Target_Date_2G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_2G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_2G.length; i++) {
                                                        var filteredOnAir_Actual_Date_2G = OnAir_Actual_Date_2G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_2G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                var ActualValues_2G = [];
                                                var OnAir_TargetValues_2G = [];
                                                for (i = 1; i < timeValues.length; i++) {
                                                    var startDate = fullDateArray[0];//change
                                                    var endDate = timeValues[i];
                                                    console.log(startDate + " ||||| " + endDate);
                                                    var filteredArrayActual_2G = OnAir_Actual_Date_2G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var filteredArrayOnAir_Target_2G = OnAir_Target_Date_2G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });

                                                    ActualValues_2G.push(filteredArrayActual_2G.length);
                                                    OnAir_TargetValues_2G.push(filteredArrayOnAir_Target_2G.length);

                                                }
                                            }

//3GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
                                            function find3G(fruit) {
                                                return fruit.G2_3G_4G === '3G';
                                            }
                                            var all3G = data[0].createdprojectData.filter(find3G);
                                            var OnAir3G = jsonQ(all3G);
                                            var OnAir_Actual_Date_3G = (OnAir3G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_3G = (OnAir3G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_3G) !== false) && (isNaN(OnAir_Actual_Date_3G) !== false)) {
                                                if (OnAir_Target_Date_3G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_3G.length; i++) {
                                                        var filteredOnAir_Target_Date_3G = OnAir_Target_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_3G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_3G.length; i++) {
                                                        var filteredOnAir_Actual_Date_3G = OnAir_Actual_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_3G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                var ActualValues_3G = [];
                                                var OnAir_TargetValues_3G = [];
                                                for (i = 1; i < timeValues.length; i++) {
                                                    var startDate = fullDateArray[0];//change
                                                    var endDate = timeValues[i];
                                                    console.log(startDate + " ||||| " + endDate);
                                                    var filteredArrayActual_3G = OnAir_Actual_Date_3G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var filteredArrayOnAir_Target_3G = OnAir_Target_Date_3G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });

                                                    ActualValues_3G.push(filteredArrayActual_3G.length);
                                                    OnAir_TargetValues_3G.push(filteredArrayOnAir_Target_3G.length);

                                                }

                                            }

//4GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG                                        
                                            function find4G(fruit) {
                                                return fruit.G2_3G_4G === '4G';
                                            }
                                            var all4G = data[0].createdprojectData.filter(find4G);
                                            var OnAir4G = jsonQ(all4G);
                                            var OnAir_Actual_Date_4G = (OnAir4G.find('OnAir_Actual_Date').value().sort());
                                            var OnAir_Target_Date_4G = (OnAir4G.find('OnAir_Target_Date').value().sort());
                                            if ((isNaN(OnAir_Target_Date_4G) !== false) && (isNaN(OnAir_Actual_Date_4G) !== false)) {
                                                if (OnAir_Target_Date_4G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Target_Date_4G.length; i++) {
                                                        var filteredOnAir_Target_Date_4G = OnAir_Target_Date_4G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Target_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                if (OnAir_Actual_Date_4G.length !== 0) {
                                                    var SystemDate = new Date().toJSON().slice(0, 10);
                                                    for (i = 0; i < OnAir_Actual_Date_4G.length; i++) {
                                                        var filteredOnAir_Actual_Date_4G = OnAir_Actual_Date_3G.filter(function (item) {
                                                            return item.localeCompare(OnAir_Actual_Date_4G[0]) > -1 && SystemDate.localeCompare(item) > -1;
                                                        });
                                                    }
                                                }
                                                var ActualValues_4G = [];
                                                var OnAir_TargetValues_4G = [];
                                                for (i = 1; i < timeValues.length; i++) {
                                                    var startDate = fullDateArray[0];//change
                                                    var endDate = timeValues[i];
                                                    console.log(startDate + " ||||| " + endDate);
                                                    var filteredArrayActual_4G = OnAir_Actual_Date_4G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });
                                                    var filteredArrayOnAir_Target_4G = OnAir_Target_Date_4G.filter(function (item) {
                                                        return item.localeCompare(startDate) > -1 && endDate.localeCompare(item) > -1;
                                                    });

                                                    ActualValues_4G.push(filteredArrayActual_4G.length);
                                                    OnAir_TargetValues_4G.push(filteredArrayOnAir_Target_4G.length);

                                                }
                                            }


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
                                                            stacking: 'normal',
                                                            events: {
                                                                legendItemClick: function () {
                                                                    var chart = this.chart,
                                                                            series = chart.series,
                                                                            visible;
                                                                    if (this.name === 'Total On Air Target') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 2G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 3G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                    if (this.name === 'On Air Target 4G') {
                                                                        visible = true;
                                                                        series[0].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[1].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[2].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[3].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[4].update({
                                                                            visible: visible
                                                                        });
                                                                        series[5].update({
                                                                            visible: visible
                                                                        });
                                                                        series[6].update({
                                                                            visible: !visible
                                                                        });
                                                                        series[7].update({
                                                                            visible: !visible
                                                                        });
                                                                        return false;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    },
                                                    series: [{
                                                            name: "On Air Target 2G",
                                                            data: OnAir_TargetValues_2G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 2G",
                                                            data: ActualValues_2G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: "On Air Target 3G",
                                                            data: OnAir_TargetValues_3G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 3G",
                                                            data: ActualValues_3G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: "On Air Target 4G",
                                                            data: OnAir_TargetValues_4G,
                                                            stack: 'target',
                                                            visible: false,
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: "Actual 4G",
                                                            data: ActualValues_4G,
                                                            stack: 'actual',
                                                            visible: false,
                                                            color: 'rgb(92, 92, 97)'
                                                        }, {
                                                            name: 'Total On Air Target',
                                                            data: OnAir_TargetValues,
                                                            stack: 'totaltarget',
                                                            color: 'rgb(124, 181, 236)'
                                                        }, {
                                                            linkedTo: ':previous',
                                                            name: 'Total Actual',
                                                            data: ActualValues,
                                                            stack: 'totalactual',
                                                            color: 'rgb(92, 92, 97)'
                                                        }],
                                                    xAxis: {
                                                        categories: categoriesObj
                                                    }
                                                },
                                                function (chart) {
                                                    //            chart.legend.allItems[0].update({name:'2G'});
                                                    //            chart.legend.allItems[1].update({name:'3G'});
                                                    //            chart.legend.allItems[2].update({name:'Total'});
                                                });
                                            });

                                        }

                                    }
                                    else {
                                        $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                                    }
                                }
                                else {
                                    $('#chartViewDivtag').html("<div style='padding:150px'><h2 style='color:red'>No Status Data .....</h2></div>");
                                }
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
                    alert("Error getSearchDateWeekly");
                }
            });
        }
    }
}

