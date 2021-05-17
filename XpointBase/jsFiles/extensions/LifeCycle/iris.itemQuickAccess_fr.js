$(document).ready(function () {
    var projectID = '';
    var isItemInactive;
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
                $("#synopsisActionControls").append("<div id='synopsisID' title='Voir le résumé du résumé' class='underline-text margin-right xp-Fullwidth' style='float:left; cursor:pointer;'>Synopsis</div>");
                $("#previewBriefingActionControls").append("<div id='previewBriefingID' title='Générer des aperçus et télécharger des briefings' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Briefing de prévisualisation</div>");
                $("#quickShareActionControls").append("<div id='quickShareID' title='Partager le scénario avec la communauté FairShare' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>QuickShare à FSC</div>");
                isItemInactive = CheckProjectStatus(projectID);
                if (!(isItemInactive)) {
                    $("#duplicateItemActionControls").append("<div id='duplicateItem' title='Dupliquer tout le scénario' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Dupliquer</div>");
                } else {
                    $("#duplicateItemActionControls").append("<div id='duplicateItem' title='Dupliquer tout le scénario' class='underline-text disablebutton margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Dupliquer</div>");
                }
                $("#deleteItemActionControls").append("<div id='deleteItem' title='View Synopsis Briefing' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Supprimer</div>");
                $("#RestoreItemActionControls").append("<div id='restoreItem' title='Restaurer le scénario à son état de pré-suppression' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Restaurer</div>");
            }
            else {
                $("#synopsisActionControls").append("<div id='synopsisID' title='Voir le résumé du résumé' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Synopsis</div>");
                $("#previewBriefingActionControls").append("<div id='previewBriefingID' title='Générer des aperçus et télécharger des briefings' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Briefing de prévisualisation</div>");
                $("#quickShareActionControls").append("<div id='quickShareID' title='Partager le scénario avec la communauté FairShare' class='underline-text disablebutton margin-right xp-Fullwidth' style='float:left;'>QuickShare à FSC</div>");
                isItemInactive = CheckProjectStatus(projectID);
                if (!(isItemInactive)) {
                    $("#duplicateItemActionControls").append("<div id='duplicateItem' title='Dupliquer tout le scénario' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Dupliquer</div>");
                } else {
                    $("#duplicateItemActionControls").append("<div id='duplicateItem' title='Dupliquer tout le scénario' class='underline-text disablebutton margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Dupliquer</div>");
                }
                $("#deleteItemActionControls").append("<div id='deleteItem' title='View Synopsis Briefing' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Supprimer</div>");
                $("#RestoreItemActionControls").append("<div id='restoreItem' title='Restaurer le scénario à son état de pré-suppression' class='underline-text margin-right xp-Fullwidth' style='float:left;cursor:pointer;'>Restaurer</div>");
            }
        }
    });

    $("#duplicateItem").click(function () {
        fr_DuplicateProject(projectID);
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
        RestoreItem += "<h4 class='modal-title' style='margin-left: 10px;color: #000;font-weight: 600;'>Restaurer l'élément</h4>";
        RestoreItem += "</div>";
        RestoreItem += "<div class='modal-body'>";
        RestoreItem += "<div id='passwordValidation'></div>";
        RestoreItem += "<div class='support-body'>";
        RestoreItem += "<div class='form-group delete-border-bottom'>";
        RestoreItem += "Si vous cliquez sur Continuer, cet élément:<br>";
        RestoreItem += "<ul>";
        RestoreItem += "<li>Restaurer à son état modifiable précédent et ouvrir dans le navigateur</li>";
        RestoreItem += "<li>Passer de la corbeille à la page principale de la bibliothèque</li>";
        RestoreItem += "<li>Les parties prenantes disposant d'un accès antérieur retrouveront leur visibilité.</li>";
        RestoreItem += "</ul>";

        RestoreItem += "</div>";
        RestoreItem += "<div class='buttonSection'>";
        RestoreItem += "<button type='submit' class='xpThemeButton ui-tabbuttonstyle ui-corner-all xp-NewButton' id='RestoreConfirm'>Procéder</button>";
        RestoreItem += "<button type='button' class='cancelButton ui-tabbuttonstyle ui-corner-all xp-NewButton ' >Annuler</button>";
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

                }
            });
            location.reload(true);
        });


        $(".cancelButton").click(function () {
            $(".resetPasswordContent").remove();
        });
    }

    //$("#deleteItem").click(function () {
    //    createDeletePopUp();
    //});

    function createDeletePopUp() {
        var DeleteItem = "<div class='resetPasswordContent'>";
        DeleteItem += " <span class='helper'></span>";
        DeleteItem += "<div>";
        DeleteItem += "<div class='popupCloseButton'><i class='fa fa-times' aria-hidden='true'></i></div>";
        DeleteItem += "<div class='modal-contents' id='resetPasswordContent' style='border-radius: 0px; border: 0px;text-align:left;'>";
        DeleteItem += "<div class='modal-header'>";
        DeleteItem += "<h4 class='modal-title' style='margin-left: 10px;color: #000;font-weight: 600;'>Supprimer</h4>";
        DeleteItem += "</div>";
        DeleteItem += "<div class='modal-body'>";
        DeleteItem += "<div id='passwordValidation'></div>";
        DeleteItem += "<div class='support-body'>";
        DeleteItem += "<div class='form-group delete-border-bottom'>";
        DeleteItem += "Si vous continuez, cet élément sera déplacé vers le <b>Corbeille</b> qui est visible depuis le <b>Page de la bibliothèque</b> (option de filtre en haut à droite).  Le propriétaire, les membres de l'équipe et les utilisateurs des profils de gestionnaire verront cet élément dans la corbeille. Cet élément ne sera plus partagé avec d'autres. <br><br>Pour restaurer un élément, cliquez pour l'ouvrir et, une fois dans l'élément, utilisez l'option de menu Restaurer dans les options du menu en haut à gauche.<br><br>";

        DeleteItem += "</div>";
        DeleteItem += "<div class='buttonSection'>";
        DeleteItem += "<button type='submit' class='xpThemeButton ui-tabbuttonstyle ui-corner-all xp-NewButton' id='submitConfirm'>Procéder </button>";
        DeleteItem += "<button type='button' class='cancelButton ui-tabbuttonstyle ui-corner-all xp-NewButton ' >Annuler </button>";
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

                }
            });
            window.location.href = "/_layouts/XpointProjectSpace/Library.aspx";
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
        var reportCloseButton = $("<span class='cancelBtn'><img src='/_layouts/Images/XPointProjectSpace/iRIS_report_close_icon.png' class='closePreview' title='fermer'/></span>");
        if (!(isItemInactive))
            var reportDownloadButton = $("<a class='downloadBtn'><img src='/_layouts/Images/XPointProjectSpace/iRIS_report_download_icon.png' class='previewDownload' title='Télécharger' /></a>");
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
        $("#reportTitle").html("(Briefing Synopsis)");
        $(".reportPreviewBody").append("<center><img src='/_layouts/Images/XPointProjectSpace/Xploader.gif' style='z-index:1111;text-align:center;width:100px;margin-top: 80px;'/><p>Veuillez patienter ... nous préparons un aperçu du briefing synopsis</p></center>");
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
                    var reportItemDiv = $("<span id='" + reportData[i].m_reportID + "' class='previewReportName' ><p class='previewTitle'>" + reportData[i].m_reportTitle + "</p></span>");
                    var previewReportItem = $("<a id='" + reportData[i].m_reportID + "' validforDownload='" + reportData[i].m_validforDownload + "' style='color: #fff !important;' previewUrl='" + reportData[i].m_reportPreviewUrl + "' downloadUrl='" + reportData[i].m_reportDownloadUrl + "' projectTitle='" + reportData[i].m_title + "' class='previewReportCss js-open-modal xpButtons' href='#' data-modal-id='xp-preview-popup'>Aperçu</a>");
                    if (!(isItemInactive))
                        var downloadReportItem = $("<span id='" + reportData[i].m_reportID + "' downloadUrl='" + reportData[i].m_reportDownloadUrl + "' class='downloadReportCss xpButtons'>Télécharger<span class='downloadText'>File will be downloaded shortly</span></span>");

                    if (reportData[i].m_fileType == "msce") {
                        if (reportData[i].m_validforDownload) {
                            scxItemDiv = $("<span id='" + reportData[i].m_reportID + "' class='previewReportName' ><p class='previewTitle'>" + reportData[i].m_reportTitle + "</p></span>");
                            if (!(isItemInactive)) {
                                var downloadscxItem = $("<a id='msceFileDownload' href='" + reportData[i].m_reportDownloadUrl + projectID + "' style='color: #fff !important;' class='downloadReportCss xpButtons'>Télécharger</a>");
                                scxItemDiv.append(downloadscxItem);
                                mainDiv.append(scxItemDiv);
                            }
                        }
                    }
                    else if (reportData[i].m_fileType == "scx") {
                        if (reportData[i].m_validforDownload) {
                            scxItemDiv = $("<span id='" + reportData[i].m_reportID + "' class='previewReportName' ><p class='previewTitle'>" + reportData[i].m_reportTitle + "</p></span>");
                            if (!(isItemInactive)) {
                                var downloadscxItem = $("<a id='scxFileDownload' href='" + reportData[i].m_reportDownloadUrl + projectID + "' style='color: #fff !important;' class='downloadReportCss xpButtons'>Télécharger</a>");
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

                    else if (reportData[i].m_validforDownload) {
                        reportItemDiv.append(previewReportItem);
                        reportItemDiv.append(downloadReportItem);
                        mainDiv.append(reportItemDiv);
                    }
                    else {
                        reportItemDiv.append(previewReportItem);
                        mainDiv.append(reportItemDiv);
                    }
                });

                $("#previewBriefingID").append(mainDiv);

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
                    $("#previewBriefingID").children().remove();
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
            $(".reportPreviewBody").append("<center><img src='/_layouts/Images/XPointProjectSpace/Xploader.gif' style='z-index:1111;text-align:center;width:100px;margin-top: 80px;'/><p>Veuillez patienter ... nous préparons un aperçu du " + reportTitle + "</p></center>");
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
        fairShare += "<h4 class='modal-title' style='color: #33AEDC;font-weight: 600;'>Partager le contenu</h4>";
        fairShare += "</div>";

        fairShare += "<div class='modal-body'>";
        fairShare += "<p>L'option des scénarios FairShare est disponible si:</p>";
        fairShare += "<ul class='fairShareStructure'>"
        fairShare += "<li> Toutes les étapes sont terminées</li>"
        fairShare += "<li> Vous êtes le propriétaire de l'élément ou le gestionnaire (vous avez donc le droit de partager du contenu au nom de votre organisation)</li>"
        fairShare += "<br/></ul>";

        fairShare += "<p>Il existe un réel danger que la communauté FairShare soit peuplée de contenus partiellement prêts / de mauvaise qualité, ce qui diminuera la valeur pour tous. Avant de partager, veuillez confirmer le scénario:</p>"
        fairShare += "<ul class='fairShareStructure'>";
        fairShare += "<li> Est entièrement terminé</li>";
        fairShare += "<li> A été évalué par des pairs</li>";
        fairShare += "<li> A été utilisé avec succès pour former des apprenants.</li>";
        fairShare += "<br/></ul>";

        fairShare += "<span>Merci d'avoir contribué à rendre la communauté FairShare plus précieuse.</span><br/>";

        fairShare += "<span>Cliquez sur OK pour FairShare ce scénario</span>";

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
                        $("#quickShareID").addClass("disablebutton");
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


});

