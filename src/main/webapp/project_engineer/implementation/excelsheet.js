/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global Handsontable, saveExcelFile */

window.onload = loadexcelshetByprojectEngineer();

function loadexcelshetByprojectEngineer() {
    var projectName = atob(location.search.split('projectName=')[1]);
    $('#projectnameDelete').text(projectName);
    $('#projectname').val("");
    var rootURL = '/ProjectStatusReportsSystem/rest/psrservices/getexceldataservices';
    $.ajax({
        type: 'GET',
        url: rootURL + '/getexceldata/' + projectName,
        contentType: 'application/json',
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {
                viewexcelsheet(data);
            } else {
                $('#infotitle').text("Error Load Excelsheet");
                $('#infodetails').text("Cannot load work sheet... Please open work sheet using file open tab!...");
                $('#information').modal('show');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#infotitle').text("Error Load Excelsheet");
            $('#infodetails').text("Cannot load work sheet... Please open work sheet using file open tab!...");
            $('#information').modal('show');
        }
    });
}

function viewexcelsheet(exceldata) {
    $('#projectnameDelete').val(exceldata[0].createdprojectName);
    $('#projectname').val("");
//    console.log(exceldata);
    document.addEventListener("DOMContentLoaded", function () {
        var
                data = exceldata[0].createdprojectData,
                container = document.getElementById('example1'),
                searchFiled = document.getElementById('search_field'),
                hot1,
                yellowRenderer,
                greenRenderer;
        yellowRenderer = function (instance, td, row, col, prop, value, cellProperties) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.style.backgroundColor = 'yellow';
        };
        greenRenderer = function (instance, td, row, col, prop, value, cellProperties) {
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.style.backgroundColor = 'green';
        };
        hot1 = new Handsontable(container, {
            data: data,
            startRows: 5,
            afterChange: function () {
                var tmpData = JSON.stringify((data));
//                console.log(JSON.parse(tmpData));
            },
            rowHeaders: true,
            colHeaders: true,
            fixedRowsTop: 2,
            fixedColumnsLeft: 2,
            manualColumnResize: true,
            manualRowResize: true,
            manualColumnMove: true,
            manualRowMove: true,
            nestedHeaders: exceldata[0].createdprojectNestedHeader,
            contextMenu: true,
            minSpareRows: 6,
            formulas: true,
            currentRowClassName: 'currentRow',
            dropdownMenu: true,
            filters: true,
            search: true,
            columns: exceldata[0].createdprojectColumns
//            cell: [
//                {row: 1, col: 0, renderer: greenRenderer}
//            ],
//            cells: function (row, col, prop) {
//                if (row === 0 && col === 0) {
//                    this.renderer = greenRenderer;
//                }
//            }
        });
        function bindDumpButton() {
            if (typeof Handsontable === "undefined") {
                return;
            }

            Handsontable.Dom.addEvent(saveExcelFile, 'click', function () {
                var createdprojectName = exceldata[0].createdprojectName;
                var createdprojectData = (data);
                var updateexcelData = "";
                updateexcelData = {
                    createdprojectName: createdprojectName,
                    createdprojectData: createdprojectData
                };
//                console.log((updateexcelData));
                var rootURL = '/ProjectStatusReportsSystem/rest/psrservices/getexceldataservices/updateexcelprojectdata';
                var userrole = $('#userRole').val();
                var userName = $('#sessionusername').val();
                if (userrole === "manager" && userName !== "Senuri") {
                    $('#managerworning').modal('show');
                }
                if (userrole === "engineer") {
                    $.ajax({
                        type: 'POST',
                        url: rootURL,
                        data: JSON.stringify(updateexcelData),
                        contentType: 'application/json',
                        success: function (data, textStatus, jqXHR) {
//                        console.log(data);
//                            alert("suc");
                            $('#success').modal('show');
                            setTimeout(function () {
                                $('#success').modal('hide');
                            }, 1000);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            alert("Error load loadexceldata");
                        }
                    });
                }
                if (userName === "Senuri") {
                    $.ajax({
                        type: 'POST',
                        url: rootURL,
                        data: JSON.stringify(updateexcelData),
                        contentType: 'application/json',
                        success: function (data, textStatus, jqXHR) {
//                        console.log(data);
//                            alert("suc");
                            $('#success').modal('show');
                            setTimeout(function () {
                                $('#success').modal('hide');
                            }, 1000);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            alert("Error load loadexceldata");
                        }
                    });
                }
            });

            Handsontable.Dom.addEvent(searchFiled, 'keyup', function (event) {
                var queryResult = hot1.search.query(this.value);
//                console.log(queryResult);
                hot1.render();
            });

            Handsontable.Dom.addEvent(document.body, 'click', function (e) {

                var element = e.target || e.srcElement;
                if (element.nodeName === "BUTTON" && element.name === 'dump') {
                    var name = element.getAttribute('data-dump');
                    var instance = element.getAttribute('data-instance');
                    var hot = window[instance];
                    console.log('data of ' + name, hot.getData());
                }
            });
        }
        bindDumpButton();
    });
}

