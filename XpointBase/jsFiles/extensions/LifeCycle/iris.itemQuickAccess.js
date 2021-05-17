$(document).ready(function () {
    var projectID = '';
    var isItemInactive;
    var isValidforDelete;
    var TrackerID = new RegExp('[\?&]TrackerID=([^&#]*)').exec(window.location.href);
    var trackerId = new RegExp('[\?&]trackerId=([^&#]*)').exec(window.location.href);
    var trackerID = new RegExp('[\?&]trackerID=([^&#]*)').exec(window.location.href);

    if (TrackerID != undefined) {
        projectID = TrackerID[1];
    }
    else if (trackerId != undefined) {
        projectID = trackerId[1];
    }
    else {
        projectID = trackerID[1];
    }

    $.ajax({
        url: "/_layouts/IImpact.Web/FairShareService.asmx/getFairSharePermission",
        contentType: "application/json; charset=utf-8",
        type: "post",
        dataType: "json",
        async: false,
        data: "{projectID:'" + projectID + "'}",
        success: function (datap) {
            var permission = datap.d;
            if (permission) {
                $("#synopsisActionControls").append("<div id='synopsisID' title='View Synopsis Briefing' class='underline-text margin-right xp-Fullwidth' style='float:left; cursor:pointer;'>Synopsis</div>");
                $("#previewBriefingActionControls").append("<div id='previewBriefingID' title='Generate Preview and Download Briefings' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Preview Briefing</div>");
                $("#quickShareActionControls").append("<div id='quickShareID' title='Share Scenario to the FairShare Community' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>QuickShare to FSC</div>");
                isItemInactive = CheckProjectStatus(projectID);
                if (!(isItemInactive)) {
                    $("#duplicateItemActionControls").append("<div id='duplicateItem' title='Duplicate the entire Scenario' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Duplicate</div>");
                } else {
                    $("#duplicateItemActionControls").append("<div id='duplicateItem' title='Duplicate the entire Scenario' class='underline-text disablebutton margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Duplicate</div>");
                }
                isValidforDelete = CheckPermissionforDelete(projectID);
                if (isValidforDelete) {
                    $("#deleteItemActionControls").append("<div id='deleteItem' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Delete</div>");
                    $("#RestoreItemActionControls").append("<div id='restoreItem' title='Restore the Scenario to its pre-delete state' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Restore</div>");
                }
                else {
                    $("#deleteItemActionControls").append("<div id='deleteItem' class='underline-text disablebutton margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Delete</div>");
                    $("#RestoreItemActionControls").append("<div id='restoreItem' title='Restore the Scenario to its pre-delete state' class='underline-text disablebutton margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Restore</div>");
                }
            }
            else {
                $("#synopsisActionControls").append("<div id='synopsisID' title='View Synopsis Briefing' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Synopsis</div>");
                $("#previewBriefingActionControls").append("<div id='previewBriefingID' title='Generate Preview and Download Briefings' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Preview Briefing</div>");
                $("#quickShareActionControls").append("<div id='quickShareID' title='Share Scenario to the FairShare Community' class='underline-text disablebutton margin-right xp-Fullwidth' style='float:left;'>QuickShare to FSC</div>");
                isItemInactive = CheckProjectStatus(projectID);
                if (!(isItemInactive)) {
                    $("#duplicateItemActionControls").append("<div id='duplicateItem' title='Duplicate the entire Scenario' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Duplicate</div>");
                } else {
                    $("#duplicateItemActionControls").append("<div id='duplicateItem' title='Duplicate the entire Scenario' class='underline-text disablebutton margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Duplicate</div>");
                }
                isValidforDelete = CheckPermissionforDelete(projectID);
                if (isValidforDelete) {
                    $("#deleteItemActionControls").append("<div id='deleteItem' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Delete</div>");
                    $("#RestoreItemActionControls").append("<div id='restoreItem' title='Restore the Scenario to its pre-delete state' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Restore</div>");
                }
                else {
                    $("#deleteItemActionControls").append("<div id='deleteItem' class='underline-text disablebutton margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Delete</div>");
                    $("#RestoreItemActionControls").append("<div id='restoreItem' title='Restore the Scenario to its pre-delete state' class='underline-text disablebutton margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Restore</div>");
                }
                
            }
        }
    });

    $("#duplicateItem").click(function () {
        DuplicateProject(projectID);
    });

    $("#restoreItem").click(function () {
        createRestorePopUp(projectID);
    });

    //restore pop up for deleted item
    function createRestorePopUp() {
        var RestoreItem = "<div class='resetPasswordContent'>";
        RestoreItem += " <span class='helper'></span>";
        RestoreItem += "<div>";
        RestoreItem += "<div class='popupCloseButton'><i class='fa fa-times' aria-hidden='true'></i></div>";
        RestoreItem += "<div class='modal-contents' id='resetPasswordContent' style='border-radius: 0px; border: 0px;text-align:left;'>";
        RestoreItem += "<div class='modal-header'>";
        RestoreItem += "<h4 class='modal-title' style='margin-left: 10px;color: #000;font-weight: 600;'>Restore</h4>";
        RestoreItem += "</div>";
        RestoreItem += "<div class='modal-body'>";
        RestoreItem += "<div id='passwordValidation'></div>";
        RestoreItem += "<div class='support-body'>";
        RestoreItem += "<div class='form-group delete-border-bottom' style='font-size: 11pt;color: #000;'>";
        RestoreItem += "<p style='margin:0;'>If you click Proceed, this item will:</p>";
        RestoreItem += "<ul>";
        RestoreItem += "<li>Restore to its previous editable state, and open in the browser</li>";
        RestoreItem += "<li> Move from the <b>Recycle Bin</b> into the main <b>Library page</b></li>";
        RestoreItem += "<li>Stakeholders with previous access will regain visibility.</li>";
        RestoreItem += "</ul>";

        RestoreItem += "</div>";
        RestoreItem += "<div class='buttonSection'>";
        RestoreItem += "<button type='submit' class='xpThemeButton ui-tabbuttonstyle ui-corner-all xp-NewButton' id='RestoreConfirm'>Proceed </button>";
        RestoreItem += "<button type='button' class='cancelButton ui-tabbuttonstyle ui-corner-all xp-NewButton ' >Cancel </button>";
        RestoreItem += "</div>";
        RestoreItem += "</div>";
        RestoreItem += "</div>";
        RestoreItem += "</div>";
        RestoreItem += "</div>";
        RestoreItem += "</div>";

        $('body').append($(RestoreItem));
        $('.resetPasswordContent').show();
        $("#resetPasswordContentContentSection").slideDown()
        $('.popupCloseButton').click(function () {
            $("#resetPasswordContentContentSection").slideUp(50000)
            $('.resetPasswordContent').remove();
        });


        $("#RestoreConfirm").click(function () {
            var UpdateValue = 0;
            $.ajax({
                url: "/_layouts/IImpact.Web/LifeCycleService.asmx/UpdateProjectDeleteFlag",
                contentType: "application/json; charset=utf-8",
                type: "post",
                dataType: "json",
                data: "{projectID:'" + projectID + "' , UpdateValue:'" + UpdateValue + "' , TrackerID:'" + projectID + "'}",
                success: function (datap, st) {
                    location.reload(true);
                },
                error: function (xhr, status, errorThrown) {
                    console.log(xhr);
                }
            });
           
        });


        $(".cancelButton").click(function () {
            $(".resetPasswordContent").remove();
        });
    }
    
    function createDeletePopUp() {
        var DeleteItem = "<div class='resetPasswordContent'>";
        DeleteItem += " <span class='helper'></span>";
        DeleteItem += "<div>";
        DeleteItem += "<div class='popupCloseButton'><i class='fa fa-times' aria-hidden='true'></i></div>";
        DeleteItem += "<div class='modal-contents' id='resetPasswordContent' style='border-radius: 0px; border: 0px;text-align:left;'>";
        DeleteItem += "<div class='modal-header'>";
        DeleteItem += "<h4 class='modal-title' style='margin-left: 10px;color: #000;font-weight: 600;'>Delete</h4>";
        DeleteItem += "</div>";
        DeleteItem += "<div class='modal-body'>";
        DeleteItem += "<div id='passwordValidation'></div>";
        DeleteItem += "<div class='support-body'>";
        DeleteItem += "<div class='form-group delete-border-bottom'>";
        DeleteItem += "If you Proceed, this item will be moved to the <b>Recycle Bin</b> which is viewable from the <b>Library page</b> (top right filter option).  The Owner, Team members and Users in Manager Profiles will see this item in the Recycle Bin.  This item will no longer be Shared with others. <br><br>To Restore an Item, click to open it and, once in the item, use the Restore menu option in the top left menu options.<br><br>";

        DeleteItem += "</div>";
        DeleteItem += "<div class='buttonSection'>";
        DeleteItem += "<button type='submit' class='xpThemeButton ui-tabbuttonstyle ui-corner-all xp-NewButton' id='submitConfirm'>Proceed </button>";
        DeleteItem += "<button type='button' class='cancelButton ui-tabbuttonstyle ui-corner-all xp-NewButton ' >Cancel </button>";
        DeleteItem += "</div>";
        DeleteItem += "</div>";
        DeleteItem += "</div>";
        DeleteItem += "</div>";
        DeleteItem += "</div>";
        DeleteItem += "</div>";

        $('body').append($(DeleteItem));
        $('.resetPasswordContent').show();
        $("#resetPasswordContentContentSection").slideDown()
        $('.popupCloseButton').click(function () {
            $("#resetPasswordContentContentSection").slideUp(50000)
            $('.resetPasswordContent').remove();
        });

        $("#submitConfirm").click(function () {
            var UpdateValue = 1;
            $.ajax({
                url: "/_layouts/IImpact.Web/LifeCycleService.asmx/UpdateProjectDeleteFlag",
                contentType: "application/json; charset=utf-8",
                type: "post",
                dataType: "json",
                data: "{projectID:'" + projectID + "' , UpdateValue:'" + UpdateValue + "' , TrackerID:'" + projectID + "'}",
                success: function (datap, st) {
                    window.location.href = "/_layouts/XpointProjectSpace/Library.aspx";
                },
                error: function (xhr, status, errorThrown) {
                    console.log(xhr);
                }
            });
            
        });

        $(".cancelButton").click(function () {
            $(".resetPasswordContent").remove();
        });
    }

    $("#deleteItem").click(function () {
        createDeletePopUp();
    });

    $("#synopsisID").click(function () {
        var projectTitle;
        var permission;
        var contentType;
        var reportPreviewUrl;
        var reportDownloadUrl;

        $.ajax({
            url: "/_layouts/IImpact.Web/LifecycleService.asmx/getPermission",
            contentType: "application/json; charset=utf-8",
            type: "post",
            dataType: "json",
            async: false,
            data: "{projectID:'" + projectID + "'}",
            success: function (datap) {
                var data = datap.d;
                projectTitle = data.projectTitle;
                permission = data.permission;
                reportPreviewUrl = data.previewUrl;
                reportDownloadUrl = data.downloadUrl;
            }
        });

        $('head').append('<link type="text/css" rel="stylesheet" href="/_Layouts/XpointReport/CSS/XpointReport.css" id="removable-css">');

        var mainContainer = $("<div id='myModal' class='modal'></div>");
        var reportPreview = $("<div class='modal-content'></div>");
        var reportPreviewPopup = $("<div style='background:#fff;float:left;width:100%;'></div>")
        var reportPreviewHeader = $("<div class='header'>");
        var reportPreviewBody = $("<div class='reportPreviewBody' ></div>");

        var reportProjectTitle = $("<h3 id='projectTitle'></h3>");
        var reportCloseButton = $("<span class='cancelBtn'><img src='/_layouts/Images/XPointProjectSpace/iRIS_report_close_icon.png' class='closePreview' title='Close'/></span>");
        if (!(isItemInactive))
            var reportDownloadButton = $("<a class='downloadBtn'><img src='/_layouts/Images/XPointProjectSpace/iRIS_report_download_icon.png' class='previewDownload' title='Download' /><span class='previewDownloadText'>File will be downloaded shortly</span></a>");
        var reportHeaderTitle = $("<p id='reportTitle' ></p>");

        reportPreviewHeader.append(reportProjectTitle);
        reportPreviewHeader.append(reportCloseButton);
        if (permission) {
            reportPreviewHeader.append(reportDownloadButton);
        }
        reportPreviewHeader.append(reportHeaderTitle);

        reportPreviewPopup.append(reportPreviewHeader);
        reportPreviewPopup.append(reportPreviewBody);
        reportPreview.append(reportPreviewPopup);
        mainContainer.append(reportPreview);
        $(".xp-MainContainer tbody:first-child").append(mainContainer);

        $("#myModal").css('display', 'block');
        $("body").css("overflow", "hidden");

        $("#projectTitle").text(projectTitle);
        $("#reportTitle").html("(Synopsis Briefing)");
        $(".reportPreviewBody").append("<center><img src='/_layouts/Images/XPointProjectSpace/Xploader.gif' style='z-index:1111;text-align:center;width:100px;margin-top: 80px;'/><p>Please wait... we are preparing a preview of the Synopsis Briefing</p></center>");
        $(".reportPreviewBody").load(reportPreviewUrl + "?trackerID=" + projectID + "&reportID=1");

        $(".downloadBtn").click(function () {
            var returnVal = downloadReportFile("1", reportDownloadUrl, projectID);

            $(".previewDownloadText").css("display", "block");
            /*This code is for to hide Progress of report loading*/
            $.ajax({
                xhr: function () {
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("previewDownloadText", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = evt.loaded / evt.total;
                        }
                    }, false);
                    return xhr;
                },
                type: 'POST',
                url: "/",
                data: {},
                success: function (data) {
                    $('.previewDownloadText').hide();
                }
            });
        });

        /*Close the Preview on click of Cancel*/
        $(".cancelBtn").click(function () {
            $('#removable-css').remove();
            $("#myModal").remove();
            $("body").css("overflow", "scroll");
        });
    });

    function CheckProjectStatus(trackerId) {
        var CheckStatus = true;
        $.ajax({
            url: "/_layouts/IImpact.Web/LifeCycleService.asmx/IsItemInactive",
            contentType: "application/json; charset=utf-8", async: false,
            type: "post",
            dataType: "json",
            data: "{projectID:'" + trackerId + "'}",
            success: function (datap, st) {
                CheckStatus = datap.d;
            }
        });
        return CheckStatus;
    }

    function CheckPermissionforDelete(trackerId) {
        var isValid = true;
        $.ajax({
            url: "/_layouts/IImpact.Web/LifeCycleService.asmx/IsValidforDelete",
            contentType: "application/json; charset=utf-8", async: false,
            type: "post",
            dataType: "json",
            data: "{projectID:'" + trackerId + "'}",
            success: function (datap, st) {
                isValid = datap.d;
            }
        });
        return isValid;
    }

    $("#previewBriefingID").click(function () {

        $.ajax({
            url: "/_layouts/IImpact.Web/LifeCyclePhaseActionsService.asmx/GetReportInfo",
            contentType: "application/json; charset=utf-8",
            type: "post",
            dataType: "json",
            data: "{trackerId:'" + projectID + "'}",
            success: function (datap, st) {
                reportData = datap.d;

                isItemInactive = CheckProjectStatus(projectID);

                var mainDiv = $("<div id='quickaccesstoreport' />");

                $.each(reportData, function (i) {
                    var scxItemDiv;
                    //var isProjectActive = false;
                    var reportItemDiv = $("<span id='" + reportData[i].m_reportID + "' class='previewReportName' ><p class='previewTitle'>" + reportData[i].m_reportTitle + "</p></span>");
                    var previewReportItem = $("<a id='" + reportData[i].m_reportID + "' validforDownload='" + reportData[i].m_validforDownload + "' style='color: #fff !important;' previewUrl='" + reportData[i].m_reportPreviewUrl + "' downloadUrl='" + reportData[i].m_reportDownloadUrl + "' projectTitle='" + reportData[i].m_title + "' class='previewReportCss js-open-modal xpButtons' href='#' data-modal-id='xp-preview-popup'>Preview</a>");
                    if (!(isItemInactive))
                        var downloadReportItem = $("<span id='" + reportData[i].m_reportID + "' downloadUrl='" + reportData[i].m_reportDownloadUrl + "' class='downloadReportCss xpButtons'>Download<span class='downloadText'>File will be downloaded shortly</span></span>");

                    if (reportData[i].m_fileType == "msce") {
                        if (reportData[i].m_validforDownload) {
                            scxItemDiv = $("<span id='" + reportData[i].m_reportID + "' class='previewReportName' ><p class='previewTitle'>" + reportData[i].m_reportTitle + "</p></span>");
                            if (!(isItemInactive)) {
                                var downloadscxItem = $("<a id='msceFileDownload' href='" + reportData[i].m_reportDownloadUrl + projectID + "' style='color: #fff !important;' class='downloadReportCss xpButtons'>Download</a>");
                                scxItemDiv.append(downloadscxItem);

                                mainDiv.append(scxItemDiv);
                            }
                        }
                    }
                    else if (reportData[i].m_fileType == "scx") {
                        if (reportData[i].m_validforDownload) {
                            scxItemDiv = $("<span id='" + reportData[i].m_reportID + "' class='previewReportName' ><p class='previewTitle'>" + reportData[i].m_reportTitle + "</p></span>");
                            if (!(isItemInactive)) {
                                var downloadscxItem = $("<a id='scxFileDownload' href='" + reportData[i].m_reportDownloadUrl + projectID + "' style='color: #fff !important;' class='downloadReportCss xpButtons'>Download</a>");
                                scxItemDiv.append(downloadscxItem);

                                mainDiv.append(scxItemDiv);
                            }
                        }
                    }

                    else if (reportData[i].m_fileType == "blank") {
                        if (reportData[i].m_validforDownload) {
                            //reportItemDiv.append(previewReportItem);
                            if (!(isItemInactive)) {
                                reportItemDiv.append(downloadReportItem);
                                mainDiv.append(reportItemDiv);
                            }
                        }
                    }
                    else if (reportData[i].m_fileType == "ubi") {
                        scxItemDiv = $("<span class='previewReportName' ><p class='previewTitle'>" + reportData[i].m_reportTitle + "</p></span>");
                        var downloadscxItem = $("<p id='exportUbiSim' class=' exportUbiSim xpButtons' style='left:9px;'>Downlod</p>");

                        scxItemDiv.append(downloadscxItem);

                        mainDiv.append(scxItemDiv);
                    }

                    else if (reportData[i].m_validforDownload) {
                        reportItemDiv.append(previewReportItem);
                        if (!(isItemInactive))
                            reportItemDiv.append(downloadReportItem);
                        mainDiv.append(reportItemDiv);
                    }
                    else {
                        reportItemDiv.append(previewReportItem);
                        mainDiv.append(reportItemDiv);
                    }
                });

                $("#previewBriefingID").append(mainDiv);

                $(".exportUbiSim").click(function () {
                    var fairSharetoAll = "<div class='fairShareContent' style='background: rgba(0,0,0,.4);cursor: pointer;height: 100%;position: fixed; text-align: center;top: 0;left: 0;width: 100%;z-index: 10000;'>";
                    fairSharetoAll += "<span class='helper'></span>";
                    fairSharetoAll += "<div>";

                    fairSharetoAll += "<div class='modal-content' id='quickSharetoAll' style='z-index:99;top:180px;width:500px;margin:0 auto;position:relative;height:170px;border-radius: 0px; border: 0px;text-align:left;'>";
                    fairSharetoAll += "<div class='popupCloseButton' style='postion:relative;right:0;'>X</div>";
                    fairSharetoAll += "<div class='modal-header'>";
                    fairSharetoAll += "<h4 class='modal-title' style='color: #33AEDC;font-weight: 600;'>Export to UbiSim</h4>";
                    fairSharetoAll += "</div>";
                    fairSharetoAll += "<div class='modal-body'>";
                    fairSharetoAll += "<span style='float:left;margin:0px 10px 0px 0px'>Select the type of Module</span>";
                    fairSharetoAll += "<select id='moduleTypes'>";
                    fairSharetoAll += "<option value='generic-scenario-in-hospital-bedroom' selected>Generic scenario in hospital bedroom</option>";
                    fairSharetoAll += "<option value='pediatric-scenario-in-hospital-bedroom'>Pediatric scenario in hospital bedroom</option>";
                    fairSharetoAll += "<option value='adult-scenario-in-examination-room'>Adult scenario in examination room</option>";
                    fairSharetoAll += "</select>";

                    fairSharetoAll += "<div class='form-group' style='margin-top:34px !important;width: 40% !important;float:right;' >";
                    fairSharetoAll += "<input type='submit' name='send' value='Download' id='downloadUbiExport' class='ui-primarytabclr ui-tabbuttonstyle  ui-corner-all' style='margin-right:10px;'>";
                    fairSharetoAll += "<input type='button' name='send' value='Cancel' id='cancel' class='ui-secondarytabclr ui-tabbuttonstyle  ui-corner-all' style='font-size: 14px !important;'>";
                    fairSharetoAll += "</div>";
                    fairSharetoAll += "</div>";
                    fairSharetoAll += "</div>";
                    fairSharetoAll += "</div></div>";

                    $('body').append(fairSharetoAll);

                    $('#downloadUbiExport').click(function () {
                        var moduleType = $('select#moduleTypes option:selected').val();

                        var iframe = $("#myframe");
                        if (iframe.length > 0) {
                            iframe.remove();
                        }
                        var element = document.createElement("iframe");
                        element.setAttribute('src', '/_Layouts/iRIStoUbiSim/UbiSimReport.aspx?trackerID=' + projectID + '&moduleType=' + moduleType + '');
                        element.style.display = "none";
                        document.body.appendChild(element);
                        return true;
                    });

                    $('.popupCloseButton').click(function () {
                        $('.fairShareContent').remove();
                    });

                    $('#cancel').click(function () {
                        $('.fairShareContent').remove();
                    });
                });

                $(".previewReportCss").click(function () {
                    $("#previewBriefingID").children("#quickaccesstoreport").remove();
                    var reportPreviewId = $(this).attr("id");
                    var reportPreviewUrl = $(this).attr("previewUrl");
                    var reportDownloadUrl = $(this).attr("downloadUrl");
                    var validforDownload = $(this).attr("validforDownload");
                    var projectTitle = '';

                    $.ajax({
                        url: "/_layouts/IImpact.Web/LifecycleService.asmx/GetProjectTitle",
                        contentType: "application/json; charset=utf-8",
                        type: "post",
                        dataType: "json",
                        async: false,
                        data: "{projectID:'" + projectID + "'}",
                        success: function (datap) {
                            projectTitle = datap.d;
                        }
                    });
                    var reportTitle = $(this).prev().html();
                    previewReportFile(reportPreviewId, projectID, reportPreviewUrl, reportDownloadUrl, projectTitle, reportTitle, validforDownload);
                });


                /*On click of Download Button get the ReportID, DownloadUrl
                Call teh DownloadReportFile Function to load the iframe for Report Download*/
                $(".downloadReportCss").click(function () {
                    $("#quickaccesstoreport").remove();
                    $(".downloadText").css("display", "block");
                    var reportDownloadId = $(this).attr("id");
                    var reportDownloadUrl = $(this).attr("downloadUrl");
                    var returnVal = downloadReportFile(reportDownloadId, reportDownloadUrl, projectID);

                    /*This code will execute while loading the file stream onto browser and show an indicator 
                    to user to indicate that the file is being downloaded. Once the execution control goes inside the success method in the
                    ajax, it will hide the indicator which was used to indicate loader 
                    */
                    $.ajax({
                        xhr: function () {
                            var xhr = new window.XMLHttpRequest();
                            //Upload progress
                            xhr.upload.addEventListener("downloadText", function (evt) {
                                if (evt.lengthComputable) {
                                    var percentComplete = evt.loaded / evt.total;
                                    //Do something with upload progress
                                    console.log(percentComplete);
                                }
                            }, false);
                            return xhr;
                        },
                        type: 'POST',
                        url: "/",
                        data: {},
                        success: function (data) {
                            $('.downloadText').hide();
                            $("#reportItemsId").remove();
                        }
                    });
                });

                $('body').click(function () {
                    if (!$(this.target).is('#quickaccesstoreport')) {
                        $("#quickaccesstoreport").remove();
                    }
                });
            }
        });

        function previewReportFile(reportId, projectID, reportPreviewUrl, reportDownloadUrl, projectTitle, reportTitle, validforDownload) {
            $("#reportItemsId").css("display", "none");
            $('head').append('<link type="text/css" rel="stylesheet" href="/_Layouts/XpointReport/CSS/XpointReport.css" id="removable-css">');

            var mainContainer = $("<div id='myModal' class='modal'></div>");
            var reportPreview = $("<div class='modal-content'></div>");
            var reportPreviewPopup = $("<div style='background:#fff;float:left;width:100%;'></div>")
            var reportPreviewHeader = $("<div class='header'>");
            var reportPreviewBody = $("<div class='reportPreviewBody' ></div>");

            var reportProjectTitle = $("<h3 id='projectTitle'></h3>");
            var reportCloseButton = $("<span class='cancelBtn'><img src='/_layouts/Images/XPointProjectSpace/iRIS_report_close_icon.png' class='closePreview' title='Close'/></span>");

            var reportDownloadButton = $("<a class='downloadBtn'><img src='/_layouts/Images/XPointProjectSpace/iRIS_report_download_icon.png' class='previewDownload' title='Download' /><span class='previewDownloadText'>File will be downloaded shortly</span></a>");
            var reportHeaderTitle = $("<p id='reportTitle' ></p>");

            reportPreviewHeader.append(reportProjectTitle);
            reportPreviewHeader.append(reportCloseButton);
            if (validforDownload == "true") {
                if (!(isItemInactive)) {
                    reportPreviewHeader.append(reportDownloadButton);
                }
            }
            reportPreviewHeader.append(reportHeaderTitle);

            reportPreviewPopup.append(reportPreviewHeader);
            reportPreviewPopup.append(reportPreviewBody);
            reportPreview.append(reportPreviewPopup);
            mainContainer.append(reportPreview);
            $(".xp-MainContainer tbody:first-child").append(mainContainer);

            $("#myModal").css('display', 'block');
            $("body").css("overflow", "hidden");

            $("#projectTitle").text(projectTitle);
            $("#reportTitle").html("(" + reportTitle + ")");
            $(".reportPreviewBody").append("<center><img src='/_layouts/Images/XPointProjectSpace/Xploader.gif' style='z-index:1111;text-align:center;width:100px;margin-top: 80px;'/><p>Please wait... we are preparing a preview of the " + reportTitle + "</p></center>");
            $(".reportPreviewBody").load(reportPreviewUrl + "?trackerID=" + projectID + "&reportID=" + reportId);

            $(".downloadBtn").click(function () {
                var returnVal = downloadReportFile(reportId, reportDownloadUrl, projectID);

                $(".previewDownloadText").css("display", "block");
                /*This code is for to hide Progress of report loading*/
                $.ajax({
                    xhr: function () {
                        var xhr = new window.XMLHttpRequest();
                        xhr.upload.addEventListener("previewDownloadText", function (evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                            }
                        }, false);
                        return xhr;
                    },
                    type: 'POST',
                    url: "/",
                    data: {},
                    success: function (data) {
                        $('.previewDownloadText').hide();
                    }
                });
            });

            /*Close the Preview on click of Cancel*/
            $(".cancelBtn").click(function () {
                $('#removable-css').remove();
                $("#myModal").remove();
                $("body").css("overflow", "scroll");
            });
        };

        /*load the iframe on to the page to download the Report*/
        function downloadReportFile(reportId, reportDownloadUrl, projectID) {
            var iframe = $("#myframe");
            if (iframe.length > 0) {
                iframe.remove();
            }
            var element = document.createElement("iframe");
            element.setAttribute('id', reportId);
            element.setAttribute('src', reportDownloadUrl + "?trackerID=" + projectID + "&reportID=" + reportId);
            element.style.display = "none";
            document.body.appendChild(element);
            return true;
        };


    });

    $("#quickShareID").click(function () {
        var fairShare = "<div class='fairShareContent'>";
        fairShare += " <span class='helper'></span>";
        fairShare += "<div>";

        fairShare += "<div class='modal-content' id='fairSharedata' style='width:500px;margin:0 auto;position:relative;top:100px;height:450px;border-radius: 0px; border: 0px;text-align:left;'>";
        fairShare += "<div class='popupCloseButton' style='postion:relative;right:0;'>X</div>";
        fairShare += "<div class='modal-header'>";
        fairShare += "<h4 class='modal-title' style='color: #33AEDC;font-weight: 600;'>Fair Share the Content</h4>";
        fairShare += "</div>";

        fairShare += "<div class='modal-body'>";
        fairShare += "<p>The option to FairShare Scenarios is available if:</p>";
        fairShare += "<ul class='fairShareStructure'>"
        fairShare += "<li> All Steps have been completed</li>"
        fairShare += "<li> You are the Owner of the item or are the Manager (so have rights to Share content on behalf of your organisation)</li>"
        fairShare += "<br/></ul>";

        fairShare += "<p>There is a real danger that the FairShare Community becomes populated with partially ready/poor quality content which will diminish the value for all.  Before sharing please confirm the Scenario:</p>"
        fairShare += "<ul class='fairShareStructure'>";
        fairShare += "<li> Is fully completed</li>";
        fairShare += "<li> Has been peer-reviewed</li>";
        fairShare += "<li> Has been used successfully to train learners.</li>";
        fairShare += "<br/></ul>";

        fairShare += "<span>Thank you for helping to make the FairShare Community more valuable..</span><br/>";

        fairShare += "<span>Click OK to FairShare this Scenario</span>";

        fairShare += "<div class='form-group' style='margin-top:15px !important;' >";
        fairShare += "<input type='submit' name='send' value='Ok' id='quickshareSubmit' class='xpThemeButton ui-tabbuttonstyle ui-corner-all xp-NewButton' style='margin-right:10px;'>";
        fairShare += "</div>";
        fairShare += "</div>"
        fairShare += "</div>";
        fairShare += "</div></div>";

        $('body').append(fairShare);

        $("#quickshareSubmit").click(function () {
            $.ajax({
                url: "/_layouts/IImpact.Web/FairShareService.asmx/quickSharetoFSC",
                contentType: "application/json; charset=utf-8",
                type: "post",
                dataType: "json",
                async: false,
                data: "{projectID:'" + projectID + "'}",
                success: function (datap) {
                    var returnVal = datap.d;
                    if (returnVal) {
                        $(".modal-body").empty();
                        $("#fairSharedata").animate({ height: 110 }, 1000);
                        $(".modal-body").append("<p style='text-align:center;color:#155724;font-size: 16px;font-weight: 530;'>Selected items are shared successfully</p>");
                        $(".xp-Body").css("overflow", "hidden !important");
                        //$(".fairShareContent").remove();
                        //$("#fairShareItem").remove();
                        $("#quickShareID").addClass("disablebutton");

                        //location.reload();
                    }
                    else {
                        alert("something went wrong");
                    }
                }
            });
        });


        $('.popupCloseButton').click(function () {
            $('.fairShareContent').remove();
        });

        $('#quickshareCancel').click(function () {
            $('.fairShareContent').remove();
        });
    });

    $("#quickSharetoAllID").click(function () {
        var fairSharetoAll = "<div class='fairShareContent' style='background: rgba(0,0,0,.4);cursor: pointer;height: 100%;position: fixed; text-align: center;top: 0;left: 0;width: 100%;z-index: 10000;'>";
        fairSharetoAll += "<span class='helper'></span>";
        fairSharetoAll += "<div>";

        fairSharetoAll += "<div class='modal-content' id='quickSharetoAll' style='z-index:99;top:180px;width:500px;margin:0 auto;position:relative;height:170px;border-radius: 0px; border: 0px;text-align:left;'>";
        fairSharetoAll += "<div class='popupCloseButton' style='postion:relative;right:0;'>X</div>";
        fairSharetoAll += "<div class='modal-header'>";
        fairSharetoAll += "<h4 class='modal-title' style='color: #33AEDC;font-weight: 600;'>Fair Share the Content</h4>";
        fairSharetoAll += "</div>";
        fairSharetoAll += "<div class='modal-body'>";
        fairSharetoAll += "<span>Are you sure want to share the selected items with fairshare community?</span>"
        fairSharetoAll += "<div class='form-group' style='margin-top:20px !important;width: 33% !important;float:right;' >";
        fairSharetoAll += "<input type='submit' name='send' value='Share' id='quickshareSubmit' class='ui-primarytabclr ui-tabbuttonstyle  ui-corner-all' style='margin-right:10px;'>";
        fairSharetoAll += "<input type='button' name='send' value='Cancel' id='quickshareCancel' class='ui-secondarytabclr ui-tabbuttonstyle  ui-corner-all' style='font-size: 14px !important;'>";
        fairSharetoAll += "</div>";
        fairSharetoAll += "</div>";
        fairSharetoAll += "</div>";
        fairSharetoAll += "</div></div>";

        $('body').append(fairSharetoAll);

        $('.popupCloseButton').click(function () {
            $('.fairShareContent').remove();
        });

        $('#quickshareCancel').click(function () {
            $('.fairShareContent').remove();
        });
    });

    $("#exportUbiSim").click(function () {
        var fairSharetoAll = "<div class='fairShareContent' style='background: rgba(0,0,0,.4);cursor: pointer;height: 100%;position: fixed; text-align: center;top: 0;left: 0;width: 100%;z-index: 10000;'>";
        fairSharetoAll += "<span class='helper'></span>";
        fairSharetoAll += "<div>";

        fairSharetoAll += "<div class='modal-content' id='quickSharetoAll' style='z-index:99;top:180px;width:500px;margin:0 auto;position:relative;height:170px;border-radius: 0px; border: 0px;text-align:left;'>";
        fairSharetoAll += "<div class='popupCloseButton' style='postion:relative;right:0;'>X</div>";
        fairSharetoAll += "<div class='modal-header'>";
        fairSharetoAll += "<h4 class='modal-title' style='color: #33AEDC;font-weight: 600;'>Export to UbiSim</h4>";
        fairSharetoAll += "</div>";
        fairSharetoAll += "<div class='modal-body'>";
        fairSharetoAll += "<span style='float:left;margin:0px 10px 0px 0px'>Select the type of Module</span>";
        fairSharetoAll += "<select id='moduleTypes'>";
        fairSharetoAll += "<option value='generic-scenario-in-hospital-bedroom' selected>Generic scenario in hospital bedroom</option>";
        fairSharetoAll += "<option value='pediatric-scenario-in-hospital-bedroom'>Pediatric scenario in hospital bedroom</option>";
        fairSharetoAll += "<option value='adult-scenario-in-examination-room'>Adult scenario in examination room</option>";
        fairSharetoAll += "</select>";

        fairSharetoAll += "<div class='form-group' style='margin-top:34px !important;width: 40% !important;float:right;' >";
        fairSharetoAll += "<input type='submit' name='send' value='Download' id='downloadUbiExport' class='ui-primarytabclr ui-tabbuttonstyle  ui-corner-all' style='margin-right:10px;'>";
        fairSharetoAll += "<input type='button' name='send' value='Cancel' id='cancel' class='ui-secondarytabclr ui-tabbuttonstyle  ui-corner-all' style='font-size: 14px !important;'>";
        fairSharetoAll += "</div>";
        fairSharetoAll += "</div>";
        fairSharetoAll += "</div>";
        fairSharetoAll += "</div></div>";

        $('body').append(fairSharetoAll);

        $('#downloadUbiExport').click(function () {
            var moduleType = $('select#moduleTypes option:selected').val();

            var iframe = $("#myframe");
            if (iframe.length > 0) {
                iframe.remove();
            }
            var element = document.createElement("iframe");
            element.setAttribute('src', '/_Layouts/iRIStoUbiSim/UbiSimReport.aspx?trackerID=' + projectID + '&moduleType='+moduleType+'');
            element.style.display = "none";
            document.body.appendChild(element);
            return true;
        });

        $('.popupCloseButton').click(function () {
            $('.fairShareContent').remove();
        });

        $('#cancel').click(function () {
            $('.fairShareContent').remove();
        });
    });


});

