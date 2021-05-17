var $completePhase = $("#" + "complete-phase-dialog");
var $warningMessage = $("#" + "warning-message-dialog");
var $rollbackMessage = $("#" + "rollback-message-dialog"); ;
(function ($) {

    //This plugin will create phase options forlifecycle
    $.fn.phaseTabs = function (options) {
        var defaults = {
            model: [],
            classification: '',
            trackerId: '',
            needPhaseId: false,
            actionName: [],
            editable: false
        };
        /*maintain globla ids for dialog boxes*/
        var ids = {
            liId: 'li',
            completePhaseDialogId: 'complete-phase',
            warningMessageDialogId: 'warning-message',
            rollbackMessageDialogId: 'rollback-message'
        };

        function phaseItem(item) {
            this.title = item.title;
        }

        var opts = $.extend(defaults, options);
        var $dialog = $("#" + "completePhaseDialog");

        //This function creates the html of the options
        function createHtml(elem) {
            var html = "<div id='jqxMenu' class='slider' style='float:right'>";
            html += "<ul id='amenu-list' class='phases' style='margin-top:35px; margin-left:00px;'>"; /*id='amenu-list'  style='margin-top:35px; margin-left:00px; phases*/
            $(opts.model).each(function (i) {
                if (opts.model[i]) {
                    html += buildli(opts.model[i], i);
                }
            });
            html += "</ul></div>";
            elem.append(html);
            /*On hover on any phase names, it will show the relavant sub options for actions such as
            * Complete phase, revoke phase and view phase.BY default view phase option wil be attached to each phase option
            *When the current phase is active & it is teh first phase , when the user hovers on that phase option it will show only two 
            options such as view phase, complete phase . 

            * when the current phase is second phase onwards and it is active then show all the three options-view phase,complete phase and rollback phase
            *when the user hovers on the phase which is npot the active phase then it shows on ly view phase option
            */
            $('ul.phases li').hover(function () {
                var menuOptionIndex = $(this).attr("index");
                var indexVal = parseInt(menuOptionIndex, 10);
                var hasClas = opts.model[menuOptionIndex].design;
                var isCurrentPhase = hasClas.indexOf('xp-Current') !== -1;
                var phaseUrl = opts.model[menuOptionIndex].url;

                var parentUl = $("<ul  class='sub-menu' style='display:block;margin-left: 120px;margin-top:00px;'>");
                viewPhaseOption(parentUl, phaseUrl, ++menuOptionIndex, opts.model[indexVal]);
                var completeActionTypeName = '';
                var rollbackActionTYpeName = '';
                var completePhaseMessage = '';
                var rollBackPhaseMessage = '';
                $(opts.actionName).each(function (i) {
                    if (opts.actionName[i].id === "completePhase_callback") {
                        completeActionTypeName = opts.actionName[i].title;
                        completePhaseMessage = opts.actionName[i].message;
                    } else if (opts.actionName[i].id === "rollBack_callback") {
                        rollbackActionTypeName = opts.actionName[i].title;
                        rollBackPhaseMessage = opts.actionName[i].message;
                    }
                });

                if (opts.editable === "True" && isCurrentPhase === true && menuOptionIndex > 1) {
                    $(opts.actionName).each(function (i) {
                        if (opts.actionName[i].id === "completePhase_callback") {
                            completePhaseOption(parentUl, opts.model[indexVal], completeActionTypeName, phaseUrl);
                        }
                        else if (opts.actionName[i].id === "rollBack_callback") {
                            GoBackPhaseOption(parentUl, opts.model[indexVal], rollbackActionTypeName);
                        }
                    });
                } else if (opts.editable === "True" && isCurrentPhase === true && menuOptionIndex === 1) {
                    $(opts.actionName).each(function (i) {
                        if (opts.actionName[i].id === "completePhase_callback") {
                            completePhaseOption(parentUl, opts.model[indexVal], completeActionTypeName, phaseUrl);
                        }
                    });
                }
                parentEndUl = $("</ul>");
                parentUl.append(parentEndUl);
                $(this).append(parentUl);

                $(this).children('.sub-menu').show();
                /*when the user clicks on any of submenu of phase option then 
                (complete and roll back needs call back to sever side function , so we have attached callbacl word to the id of its option in li for submenu)
                1.it will check for whether the clicked submenu has the id 'callback '.if yes then it will check for whether teh id has the word 
                '_completephase' or not. if it is '_completephase' then it will check whether the project needs to add data to  any of tool in teh current phase or not

                if yes then it wil show an warning message to user to add data to those tools. else it wil allow user to complete the current phase through a popup

                
                */
                $('ul.sub-menu li').click(function () {
                    var completeOPtionId = $(this).attr("id");
                    var $dialog = $("#" + "actiondialog");
                    var isCallBackRequired = completeOPtionId.indexOf("callback") > 0;

                    if (isCallBackRequired === true) {
                        if (completeOPtionId.indexOf("_completePhase") > 0 === true) {
                            // completePhase(opts.trackerId);
                            $.relayloading("show");
                            $dialog.dialog({
                                open: function (event, ui) {
                                    alert("a");
                                    $.relayloading("hide");
                                }
                            });

                            /*ajax to verify whether any tool needs to be completed before the 
                            phase gets completed
                            */
                            $.ajax({
                                url: "/_layouts/IImpact.Web/LifeCycleService.asmx/IsToolUpdateRequired",
                                contentType: "application/json; charset=utf-8",
                                type: "post",
                                dataType: "json",
                                data: "{trackerid:'" + opts.trackerId + "'}",
                                success: function (datap, st) {
                                    var data = datap.d;
                                    if (data.Status === "failure") {
                                        showWarning(data.Message);
                                    } else {
                                        completePhase(opts.trackerId, completePhaseMessage, phaseUrl, indexVal + 1);
                                    }
                                }
                            });
                            /*end of ajax call*/

                        } else {
                            RollbackPhase(opts.trackerId, rollBackPhaseMessage, phaseUrl, indexVal);
                            $dialog.dialog('open');
                        }
                    }
                }); //hover on
            }, function () {
                $(this).children('.sub-menu').hide(); //hover off
            });
        }

        /*method for showing the View Phase option*/
        function viewPhaseOption(parentMenuOption, url, index, phaseItem) {
            if (opts.needPhaseId === 'True') {
                var checkUrl = url.indexOf("&PhaseID=") > 0;
                if (checkUrl === false) {
                    url = url + "&PhaseID=" + index;
                }
            }
            var subphasemenu = $("<li id='" + phaseItem.title + "_ViewPhase'><a href='" + url + "' style='display:block;float:left;'>" + 'View Phase' + "</a></li>");
            parentMenuOption.append(subphasemenu);
        }

        /*method for showing the complete phase option*/
        function completePhaseOption(parentMenuOption, mainOptionObject, actionName, phaseUrl) {
            var subCompleteMenu = $("<li id='" + mainOptionObject.title + "_completePhase_callback' style='display:block;'><a href='#' style='display:block;float:left;'>" + actionName + "</a></li>");
            parentMenuOption.append(subCompleteMenu);
        }

        /*method for showing the popup for warning message */
        function showWarning(warningMessage) {
            if ($warningMessage.length > 0) {
                $warningMessage.children().remove();
                $warningMessage.remove();
            }
            /*
            Set the dialog box 'title' and 'message' based on what is selected for delete
            */
            var title = "Warning";
            /*
            Create the dialog box
            */
            $warningMessage = $("<div style='display:block;z-index:999 !important' id='" + ids.warningMessageDialogId + "' title='" + title + "' />");
            var html = "<div style='display:block;z-index:999 !important margin-top: -23px;' class='xp-FloatLeft xp-Overflowhidden xp-Height-60'><table border=0 width=100% cellspacing=0 cellpadding=6><tbody>";
            html += "<tr><td height='40px'>" + warningMessage + "</td>";
            html += "</tr></tbody></table></div>";
            $warningMessage.html(html);
            $warningMessage.css('z-index', '999');
            $("body").append($warningMessage);
            $warningMessage.dialog({
                autoOpen: true,
                dialogClass: "warning-message-dialog",
                width: 450,
                bgiframe: false,
                modal: true,
                buttons: [{
                    text: 'Ok',
                    id: 'primarybutton',
                    click: function () {
                        $(this).dialog('close');
                        $.relayloading("hide");
                    }
                }]
            });
            $('.ui-dialog-titlebar-close').click(function () {
                $.relayloading("hide");
            });
        }

        /*project phase completion*/

        function completePhase(trackerId, completeMessage, phaseUrl, index) {
            if ($completePhase.length > 0) {
                $completePhase.children().remove();
                $completePhase.remove();
            }
            /*
            Set the dialog box 'title' and 'message' based on what is selected for delete
            */
            var completePhase = "Any folders and files associated with this folder will be deleted permanently along with this folder and cannot be rolled back. Are you sure want to delete?";
            var title = "Complete Phase";
            /*
            Create the dialog box
            */
            $.relayloading("show");
            $completePhase = $("<div style='display:block;z-index:999 !important' id='" + ids.completePhaseDialogId + "' title='" + title + "' />");
            var html = "<div style='display:block;z-index:999 !important margin-top: -23px; width:100%;' class='xp-FloatLeft xp-Overflowhidden '><table border=0 width=100% cellspacing=0 cellpadding=6><tbody>";
            html += "<tr><td height='40px'><p>" + completeMessage + "</p></td>";
            html += "</tr></tbody></table></div>";
            $completePhase.html(html);
            $completePhase.css('z-index', '999');
            $("body").append($completePhase);
            //alert("a");
            $completePhase.dialog({
                autoOpen: true,
                dialogClass: "complete-phase-dialog",
                width: 450,
                bgiframe: false,
                modal: true,
                buttons: [
                     {
                         text: 'Cancel',
                         id: 'secondarybutton',
                         class: 'cancelButton',
                         click: function () {
                             $.relayloading("hide");
                             $(this).dialog('close');

                         }
                     },

                    {
                        text: 'Complete',
                        id: 'primarybutton',
                        class: 'xpThemeButton',
                        click: function () {
                            $.ajax({
                                url: "/_layouts/IImpact.Web/LifeCycleService.asmx/Complete",
                                contentType: "application/json; charset=utf-8",
                                type: "post",
                                dataType: "json",
                                data: "{trackerid:'" + trackerId + "'}",
                                success: function (datap, st) {
                                    var data = datap.d;
                                    if (data.Status == "success") {

                                        window.location.href = phaseUrl;
                                    }
                                }
                            });
                            /*write logic for ajax to complete teh phase*/
                        }
                    }
                ]
            });
            $('.ui-dialog-titlebar-close').click(function () {
                $.relayloading("hide");
            });
        }

        function RollbackPhase(trackerId, rollBackMessage, phaseUrl, index) {
            if ($rollbackMessage.length > 0) {
                $rollbackMessage.children().remove();
                $rollbackMessage.remove();
            }
            /*
            Set the dialog box 'title' and 'message' based on what is selected for delete
            */
            var rollbackMessage = "Any folders and files associated with this folder will be deleted permanently along with this folder and cannot be rolled back. Are you sure want to delete?";
            var title = "Rollback Phase";

            /*
            Create the dialog box
            */
            $.relayloading("show");
            $rollbackMessage = $("<div style='display:block;z-index:999 !important' id='" + ids.RollbackPhaseDialogId + "' title='" + title + "' />");
            var html = "<div style='display:block;z-index:999 !important margin-top: -23px;' class='xp-FloatLeft xp-Overflowhidden xp-Height-60'><table border=0 width=100% cellspacing=0 cellpadding=6><tbody>";
            html += "<tr><td height='40px'><p>" + rollBackMessage + "</p></td>";
            html += "</tr></tbody></table></div>";
            $rollbackMessage.html(html);
            $rollbackMessage.css('z-index', '999');
            $("body").append($rollbackMessage);
            $rollbackMessage.dialog({
                autoOpen: true,
                dialogClass: "rollback-message-dialog",
                width: 450,
                bgiframe: false,
                modal: true,
                buttons: [

                     {
                         text: 'Cancel',
                         id: 'secondarybutton',
                         class: 'cancelButton',
                         click: function () {
                             $.relayloading("hide");
                             $(this).dialog('close');
                         }
                     },

                {
                    text: 'Roll back',
                    id: 'primarybutton',
                    class: 'xpThemeButton',
                    click: function () {
                        $.ajax({
                            url: "/_layouts/IImpact.Web/LifeCycleService.asmx/GoBackPhase",
                            //url: $(this).attr('href'),
                            contentType: "application/json; charset=utf-8",
                            type: "post",
                            dataType: "json",
                            data: "{trackerid:'" + trackerId + "'}",
                            success: function (datap, st) {
                                var data = datap.d;
                                if (data.Status == "success") {
                                    /*logic for  loading proper url*/
                                    phaseUrl = phaseUrl + "&PhaseID=" + index;
                                    window.location.reload(phaseUrl);
                                }
                            }
                        });
                        /*write logic for ajax to roolback teh phase*/
                    }
                },
                ]
            });
            $('.ui-dialog-titlebar-close').click(function () {
                $.relayloading("hide");
            });
        }

        /*method for showing the rollback phase option*/
        function GoBackPhaseOption(parentMenuOption, mainOptionObject, actionName) {
            var GoBackPhaseMenu = $("<li id='" + mainOptionObject.title + "_rollBack_callback'><a href='#' style='display:block'>" + actionName + "</a></li>");
            parentMenuOption.append(GoBackPhaseMenu);
        }

        //This function creates the listitem of the phasetabs
        function buildli(phaseItem, index) {
            var html = "<li index='" + index + "' id='" + ids.liId + phaseItem.title + "_ViewPhase' style='display:block;' ><a href='" + phaseItem.url + "' style='" + phaseItem.style + " float:left;' class='" + phaseItem.design + "'>" + phaseItem.title + "</a></li></br>";
            return html;
        }

        return this.each(function () {
            var elem = $(this);
            var selectedClassification = $('.xp-classification').find('a.ui-textclr').text(); //to find selected classification
            $(opts.model).each(function (i) {
                var phaseStatus = (opts.model[i].design.indexOf('xp-Current') >= 0 && opts.classification == "Phase") ? "Active/Live" : "Read only";

                if (opts.model[i].design.indexOf('ui-primarytabclr') >= 0 && opts.classification == "Phase") {
                    $("#currentPhaseName").html("Phase >> " + opts.model[i].title + "" + ' (' + phaseStatus + ')');
                } else if (opts.classification != "Phase") {
                    $("#currentPhaseName").html(selectedClassification);
                }
            });
            $("#phasetabs").click(function () {
                createHtml(elem);
            });

            $(document).click(function (event) {
                var $trigger = $("#phasetabs");
                if ($trigger !== event.target && !$trigger.has(event.target).length) {
                    $(".phases").hide();
                }
            });

            $('#amenu-list').amenu({
                'speed': 100, // animation speed
                'animation': 'animate' // animation type: <span style="background-color: rgb(255, 255, 255); line-height: normal;">show, fade, slide, wind, none</span>
            });
        });
    }
})(jQuery);