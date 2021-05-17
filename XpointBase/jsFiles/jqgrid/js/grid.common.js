/*
* jqGrid common function
* Tony Tomov tony@trirand.com
* http://trirand.com/blog/ 
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*/
// Modal functions
var showModal = function (h) {
    h.w.show();
};
var closeModal = function (h) {
    h.w.hide().attr("aria-hidden", "true");
    if (h.o) { h.o.remove(); }
};
/*Code for tabs for reverse link*/
var createResourceProject = function (p, selectItem) {

    var title = $("<div class='ui-state-default' style='height: 24px;'><span id='headerId' class='xp-padding-6' style='font-weight:bold;'>Create new Item and share master data</span></div>");

    var dialogLayout = $("<div  id='dialog' class='reverselink-dialog  ui-widget ui-widget-content ui-corner-all xp-PopupBorder' title='reverse link tool'/>");
    var tabMainLayout = $("<div  class='xp-FloatLeft xp-Width tab-main'/>");
    var tabBottomLayout = $("<div  class='xp-FloatLeft xp-Width xp-TabBottomBorder ui-jqdialog-titlebar  ui-corner-all'/>");
    var ul = $("<ul class='xp-TopNav reverseTool' />");
    var secondMainLayout = $("<div class='xp-FloatLeft xp-Width'/>");
    var contentPLaceHolder = $("<div id='tabs-1' class='xp-MarginTop-10 xp-FloatLeft xp-Width'/>");
    /*Title*/
    var titleMainLayout = $("<div class='xp-FloatLeft xp-Width'/>");
    var titleFirstSubLayout = $("<div class='xp-FloatLeft xp-Width20'/>");
    var titleLabel = $("<label class='xp-Padding-6 xp-FloatLeft' >Title</label>");
    var defaultTextToTitleMainLayout = $("<div class='xp-FloatLeft xp-Width70'/>");
    var subLayoutOfDefaultText = $("<div class='xp-Padding-6'>");
    var inputBox = $("<input autocomplete='off' type='text' class='' />");
    var defaultText = $("<label class='xp-MarginLeft-5 xp-LightFont'>(Trainer)</label>");

    /*Title Error*/
    var titleError = $("<span class='error titleError' id='titleErMsg' ></span>");
    /*Description*/
    var descriptionMainLayout = $("<div class='xp-FloatLeft xp-Width'/>");
    var descriptionSubLayout = $("<div class='xp-FloatLeft xp-Width20'/>");
    var descriptionLabel = $("<label class='xp-Padding-6 xp-FloatLeft' >Description</label>");

    /*Description Box*/
    var descriptionBoxMainLayout = $("<div class='xp-FloatLeft xp-Width70'/>");
    var descriptionBoxSubLayout = $("<div class='xp-Padding-6'/>");
    var descritpionBox = $("<textarea></textarea>");

    /*Note*/
    var noteMainLayout = $("<div class='xp-ClearBoth xp-Width xp-MarginTop-10  xp-MarginBottom-10'/>");
    var noteSubLayout = $("<div class='xp-Padding-6'/>");
    var noteMessage = "<div class='ui-state-default'><p id='msg' class='xp-padding-6'></p></div>";
    noteSubLayout.html(noteMessage);
    noteMainLayout.append(noteSubLayout);


    /*Buttons*/
    var btnMainLayout = $("<div class='xp-ClearBoth xp-Width'/>");
    var btnSubLayout = $("<div class='xp-Padding-6 text-right'/>");

    var okButton = $("<button id='clikOk' class='fm-button ui-primarytabclr ui-corner-all fm-button-icon-left'><span class='ui-icon ui-icon-disk'></span>OK</button>");
    var cancelButton = $("<button id='clickCancel' class='fm-button ui-state-default ui-corner-all fm-button-icon-left'><span class='ui-icon ui-icon-close'></span>Cancel</button>");
    btnMainLayout.append(btnSubLayout);
    btnSubLayout.append(okButton);
    btnSubLayout.append(cancelButton);

    /*Structure tab layout*/
    var descMainLayout = $("<div class='xp-FloatLeft xp-Width descDiv' id='aa'  >");
    for (var k in p.LifecycleDetails) {
        if (p.LifecycleDetails.hasOwnProperty(k)) {
            ul.append($(" <li><a class='tab ui-state-default' style='' href='#" + k + "'>" + p.LifecycleDetails[k] + "</a></li>"));
            var descLayout = "<div id=" + k + " class='xp-MarginTop-10 xp-FloatLeft xp-Width desc'  >";
            descLayout += "<div class='xp-FloatLeft xp-Width'>";
            descLayout += "<div class='xp-FloatLeft xp-Width20'>";
            descLayout += "<label class='xp-Padding-6 xp-FloatLeft' >Title<span style='color:red'>*</span></label>";
            descLayout += "</div>";
            descLayout += "<div class='xp-FloatLeft xp-Width70'>";
            descLayout += "<div class='xp-Padding-6'>";
            descLayout += "<input autocomplete='off' type='text' class='' id='title_" + k + "' />";
            descLayout += "<label class='xp-MarginLeft-5 xp-LightFont'>(" + p.LifecycleDetails[k] + ")</label>";
            descLayout += "</div>";
            descLayout += "</div>";
            descLayout += "<div class='xp-FloatLeft xp-Width'>";
            descLayout += "<span class='error titleError' style='margin-left:160px;' id='titleErMsg_" + k + "' ></span>";
            descLayout += "</div>";
            descLayout += "<div class='xp-FloatLeft xp-Width'>";
            descLayout += "<div class='xp-FloatLeft xp-Width20'>";
            descLayout += "<label class='xp-Padding-6 xp-FloatLeft' >Description</label>";
            descLayout += "</div>";
            descLayout += "<div class='xp-FloatLeft xp-Width70'>";
            descLayout += "<div class='xp-Padding-6' >";
            descLayout += "<textarea id='description_" + k + "'></textarea>";
            descLayout += "</div>";
            descLayout += "</div>";
            descLayout += "</div>";
            descLayout += "</div>";
            descLayout += "</div>";
            descMainLayout.append($(descLayout));
        }
    }

    tabBottomLayout.append(ul);
    tabMainLayout.append(title);
    tabMainLayout.append(tabBottomLayout);
    tabMainLayout.append(descMainLayout);
    tabMainLayout.append(noteMainLayout);
    tabMainLayout.append(btnMainLayout);
    dialogLayout.append(tabMainLayout);

    var desc = $(p.projectDescription).text();
    var mainLayoutForTool = selectItem.replace('#gview', '#lui');
    dialogLayout.insertAfter("#load_SDReverseLinkedLC_FlexGrid");
    $(".descDiv > div:first-child").nextAll().hide();
    var contTYp = $(".descDiv > div:first-child").attr('id');
    var hrefArr = $('.tab').attr('href').split("#");

    var hrefVal = hrefArr[1];
    if (contTYp == hrefVal) {
        $('.reverseTool > li').first().children().addClass('ui-primarytabclr').removeClass('ui-state-default');

        $('#title_' + contTYp).val(p.projectTitle);
        $('#description_' + contTYp).val(desc);
        $.ajax({
            url: "/_layouts/IImpact.Web/" + p.serviceName + ".asmx/GetSelectedTabInfo",
            contentType: "application/json; charset=utf-8",
            type: "post", dataType: "json",
            data: "{contentType:'" + contTYp + "',projectId:'" + p.trackerID + "'}",
            success: function (datap) {
                var toolInfo = datap.d.m_ToolName;
                noteSubLayout.html(noteMessage);
                $('#msg').append(toolInfo);
            }
        });
    }
    $('.tab').click(function (e) {

        $('.reverseTool').children().each(function () {
            $(this).children().removeClass('ui-primarytabclr').addClass('ui-state-default');

        });

        $(this).addClass('ui-primarytabclr');
        var idd = $(this).attr('href');

        //var contentType = idd.replace('#', '');
        var contentTypeArr = idd.split('#');
        var idd = "#" + contentTypeArr[1];
        var contentType = idd.replace('#', '');

        $('#title_' + contentType).val(p.projectTitle);
        $('#description_' + contentType).val(desc);

        /*Get selected tab info*/
        $.ajax({
            url: "/_layouts/IImpact.Web/" + p.serviceName + ".asmx/GetSelectedTabInfo",
            contentType: "application/json; charset=utf-8",
            type: "post", dataType: "json",
            data: "{contentType:'" + contentType + "',projectId:'" + p.trackerID + "'}",
            success: function (datap) {
                var toolInfo = datap.d.m_ToolName;
                noteSubLayout.html(noteMessage);
                $('#msg').append(toolInfo);
            }
        });

        $('.desc').hide();
        $(idd).show();
        e.preventDefault();
    });
    /*End of creating tab*/
    /*On click on OK button*/

    $("#clikOk").click(function (e) {
        e.preventDefault();
        var key;
        $('.reverseTool').children().each(function () {
            var gh = $(this).children().attr('href');
            if ($(this).children('a').hasClass('ui-primarytabclr')) {
                //key = $(this).children().attr('href').replace('#','');
                var keyVal = $(this).children().attr('href');
                var keyArr = keyVal.split("#");
                key = keyArr[1];
            }
        });

        var title = $('#title_' + key).val();
        var extraText = $('#title_' + key).next().text();

        var description = $('#description_' + key).val();
        if (title == '') {
            $('#titleErMsg_' + key).css('display', 'block').html("Title is required");
        }

        if (title != '') {
            $('#titleErMsg_' + key).css('display', 'none');
            /*save project*/
            $.ajax({
                url: "/_layouts/XPointBase/pages/BaseCreateProjectHandler.aspx/SaveNewToolProjectItem",
                contentType: "application/json; charset=utf-8",
                type: "post", dataType: "json",
                data: "{projectTitle:'" + title + ' ' + extraText + "',description:'" + description + "',contentType:'" + key + "',projectID:'" + p.trackerID + "'}",
                error: function (xhr, status, errorThrown) {
                    $('#titleErMsg_' + key).css('display', 'block').html("A project with this name already exists.");
                },
                success: function (datap) {
                    $(".reverselink-dialog").append("<div class='xpNextOverlay'><div id='relayAjaxLoading'><div class='xp-Width xp-TextAlignCenter xp-Height100' style='top: 10%;left: 0px;margin-top:10px;'><img src='/_layouts/Images/XPointProjectSpace/Xploader.gif' style='z-index:1111;text-align:center;width:100px;position:absolute; top:30%;left:40%;'/></div></div></div>");
                    var result = jQuery.parseJSON(datap.d);
                    if (result.CreatedProjectID == -1) {
                        $('#titleErMsg_' + key).css('display', 'block').html("A project with this name already exists.");
                        $("#xpNextOverlay").remove();
                    }
                    else if (result.RetStatus == 0) {
                        $('#titleErMsg_' + key).css('display', 'block').html("A project with this name already exists.");
                        $("#xpNextOverlay").remove();
                    } else {
                        var trackerID = $.urlParam('trackerId');
                        $.ajax({
                            url: "/_layouts/IImpact.Web/" + p.serviceName + ".asmx/SaveSDReverseLinkedLC",
                            contentType: "application/json; charset=utf-8",
                            type: "post", dataType: "json", async: false,
                            data: "{TrackerID:'" + result.CreatedProjectID + "',CurrentTrackerID:'" + trackerID + "'}",
                            success: function (datap) {
                                $("#dialog").remove();
                                var gridRef = selectItem.replace('#gview_', 'table#');
                                var gridOverlay = selectItem.replace('#gview', '#lui');
                                $(gridRef).trigger("reloadGrid");
                                $(gridOverlay).hide();
                            }
                        });
                    }
                }
            });
        }
    });
    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1];
    };



    $('#clickCancel').click(function (e) {
        e.preventDefault();

        $('#dialog').remove();
        $('#lui_SDReverseLinkedLC_FlexGrid').hide();


    });
}

var showErrorMessageforLicence = function () {
    var ErrorNotification = "<div class='LicenceExpired'>";
    ErrorNotification += " <span class='helper'></span>";
    ErrorNotification += "<div style='max-width:530px;'>";
    ErrorNotification += "<div class='popupCloseButton'><i class='fa fa-times' aria-hidden='true'></i></div>";
    ErrorNotification += "<div class='modal-contents' id='privacyPolicy' style='height:auto;border-radius: 0px; border: 0px;text-align:left;'>";
    ErrorNotification += "<div class='modal-header' >";
    ErrorNotification += "<h4 class='modal-title' id='LiceneceErrorHeader' style='color: #33AEDC;font-weight: 600;margin-left:5px;'>You have used all your licences</h4>";
    ErrorNotification += "</div>";

    ErrorNotification += "<div class='modal-body' style='float:left;'>";
    ErrorNotification += "<div class='support-body' >";
    ErrorNotification += "<form id='LicenceErrorNotifications'>";
    ErrorNotification += "<div class='support-body'>";
    ErrorNotification += "<p style='float:left;margin-right:10px;padding-top:5px;color:#FF0000;'>All of your licences are now allocated </p>";
    ErrorNotification += "<p style='float:left;margin-right:10px;padding-top:5px;color:#FF0000;'>To work within your existing licenses Deactivate a User to free up a license as required </p>";
    ErrorNotification += "<p style='float:left;margin-right:10px;padding-top:5px;color:#FF0000;'>If you wish to request more licenses then click <a id='sendEmailforMoreLicence' href='#' style='text-decoration:underline;color:#FF0000;'>here</a></p>";

    ErrorNotification += "</div>";
    ErrorNotification += "</form>";
    ErrorNotification += "</div>";
    ErrorNotification += "</div>";
    ErrorNotification += "</div>";
    ErrorNotification += "</div>";
    ErrorNotification += "</div>";


    $("#SupportRequest").append($(ErrorNotification));
    $('.LicenceExpired').show();
    $("#privacyPolicy").slideDown()
    $('.popupCloseButton').click(function () {
        $("#privacyPolicy").slideUp(50000)
        $('.LicenceExpired').remove();
        $("#SupportRequest").remove();
        $(".jqgrid-overlay").hide();
    });

    $('#sendEmailforMoreLicence').click(function () {
        var subject = "Request for Licences";

        $.ajax({
            url: "/_layouts/IImpact.Web/LifeCycleService.asmx/SendEmailForLicence",
            contentType: "application/json; charset=utf-8",
            type: "post",
            dataType: "json",
            data: "{EmailSubject:'" + subject + "'}",
            success: function (datap, st) {
                $("#LiceneceErrorHeader").html("<p style='color: #000000;font-weight: 600;margin-left:5px;'>Request to discuss licences</p>");
                $("#LicenceErrorNotifications").find("div").html("<p>Your request has been sent.  The iRIS Team will contact you shortly to discuss Licences.<br><br>Thank you.</p>");
                //$('.privacyContent').remove();
                //$("#SupportRequest").remove();
                //$(".jqgrid-overlay").remove();
            }
        });
    });

}

var EditingIsNotAllowed = function () {
    var ErrorNotification = "<div class='LicenceExpired'>";
    ErrorNotification += " <span class='helper'></span>";
    ErrorNotification += "<div style='max-width:530px;'>";
    ErrorNotification += "<div class='popupCloseButton'><i class='fa fa-times' aria-hidden='true'></i></div>";
    ErrorNotification += "<div class='modal-contents' id='privacyPolicy' style='height:auto;border-radius: 0px; border: 0px;text-align:left;'>";
    ErrorNotification += "<div class='modal-header' >";
    ErrorNotification += "<h4 class='modal-title' id='LiceneceErrorHeader' style='color: #33AEDC;font-weight: 600;margin-left:5px;'>Details of deactivated Users cannot be edited</h4>";
    ErrorNotification += "</div>";

    ErrorNotification += "<div class='modal-body' style='float:left;'>";
    ErrorNotification += "<div class='support-body' >";
    ErrorNotification += "<form id='LicenceErrorNotifications'>";
    ErrorNotification += "<div class='support-body'>";
    ErrorNotification += "<p style='float:left;margin-right:10px;padding-top:5px;color:#FF0000;'>Deactivated Users cannot be edited.  If you need to Edit this User then Reactivate them first, and then Edit their details as required.</p>";

    ErrorNotification += "</div>";
    ErrorNotification += "</form>";
    ErrorNotification += "</div>";
    ErrorNotification += "</div>";
    ErrorNotification += "</div>";
    ErrorNotification += "</div>";
    ErrorNotification += "</div>";


    $("#SupportRequest").append($(ErrorNotification));
    $('.LicenceExpired').show();
    $("#privacyPolicy").slideDown()
    $('.popupCloseButton').click(function () {
        $("#privacyPolicy").slideUp(50000)
        $('.LicenceExpired').remove();
        $("#SupportRequest").remove();
        $(".jqgrid-overlay").hide();
    });


}




/*custom code by pradeepa*/
var createNewIdea = function (p, selectItem) {
    //alert(p.trackerID);
    var titleError = $("<span class='error titleError' id='titleError' ></span>");
    var accessError = $("<span class='error accessError' id='accessError'>Please select Access level</span>");

    var overlayDiv = $("<div id='dialog-overlay'></div>");
    var PopUpMain = $("<div id='dialog-box'></div>");
    var secDiv = $("<div class='dialog-content'></div>");

    var ptag1 = $("<p></p>");
    var titleLabel = $("<label>Title<span style='color:red'>*</span></label>");
    var titleControl = $("<input autocomplete='off' type='text' id='projTitle' />");

    var ptag2 = $("<p></p>");
    var DescriptionLabel = $("<label>Description</label>");
    var DescriptionControl = $("<textarea id='projDescription' ></textarea>");

    var ptag3 = $("<p></p>");
    var accessLabel = $("<label>Access<span style='color:red'>*</span></label>");
    var accessControl = $("<select id='accessID'><option value=''></option><option value='public'>Public</option><option value='private'>Private</option></select>");

    var ptag4 = $("<p></p>");
    var okButton = $("<button id='okButton' class='ui-primarytabclr ui-tabbuttonstyle  ui-corner-all'>OK</button>");
    var cancelButton = $("<button id='cancelButton' class='ui-secondarytabclr ui-tabbuttonstyle  ui-corner-all'>Cancel</button>");
    ptag1.append(titleLabel);
    ptag1.append(titleControl);
    ptag1.append(titleError);

    ptag2.append(DescriptionLabel);
    ptag2.append(DescriptionControl);

    ptag3.append(accessLabel);
    ptag3.append(accessControl);
    ptag3.append(accessError);


    ptag4.append(cancelButton);
    ptag4.append(okButton);

    secDiv.append(ptag1);
    secDiv.append(ptag2);
    secDiv.append(ptag3);
    secDiv.append(ptag4);



    PopUpMain.append(secDiv);
    $("#aspnetForm").append(PopUpMain);
    $("#aspnetForm").append(overlayDiv);

    /*Validation code*/
    $('#okButton').click(function (e) {
        e.preventDefault();

        var is_title = $.trim($('#projTitle').val());
        var isAccess = $('#accessID').val();

        if (is_title == '') {
            $('#titleError').css('display', 'block').html("Title is required");
        }
        else {
            $('#titleError').css('display', 'none');
        }
        if (isAccess == '') {
            $('#accessError').css('display', 'block');
        }
        else {
            $('#accessError').css('display', 'none');
        }
        if (is_title != '' && isAccess != '') {
            var description = $('#projDescription').val();
            $('#okButton').html('Processing...');
            $.ajax({
                url: "/_layouts/IImpact.Web/" + p.serviceName + ".asmx/CreateNewProjectWithReverseLink",
                contentType: "application/json; charset=utf-8",
                type: "post", dataType: "json",
                data: "{projectTitle:'" + is_title + "',projectID:'" + p.trackerID + "',description:'" + description + "',access:'" + isAccess + "'}",
                success: function (datap) {
                    if (datap.d) {
                        var data = datap.d;
                        if (data.m_IsProjectExist === true) {
                            $('#titleError').css('display', 'block').html(data.m_Message);
                            $('#okButton').html('OK');
                        } else {
                            var gridRef = selectItem.replace('#gview_', 'table#');
                            var popupRef = selectItem.replace('#gview_', '#editmod');
                            $(gridRef).trigger("reloadGrid");
                            $('#titleError').css('display', 'none');
                            $('#dialog-overlay').remove();
                            $('#dialog-box').remove();
                            $(popupRef).hide();
                            $('.jqgrid-overlay').hide();
                        }
                    }
                }
            });
        }
    });
    $('#cancelButton').click(function (e) {
        e.preventDefault();
        $('#sigmadialog-overlay').remove();
        $('#sigmadialog-box').remove();
    });
};

var createXbarChartModal = function (rowId, aIDs, content, p, insertSelector, posSelector, appendsel) {
    /*functionality for edit the selected row*/
    if (rowId != "_empty") {
        /*ajax call to retrieve the sample data based on the rowid*/

        $.ajax({
            url: "/_layouts/IImpact.Web/NGHA/SigmaChartService.asmx/GetSamples",
            contentType: "application/json; charset=utf-8",
            type: "post", dataType: "json",
            data: "{rowId:'" + rowId + "'}",
            success: function (datap) {
                var data = datap.d;
                /*call the method which shows the popup */

                showXBarChartPopup(rowId, data, insertSelector);
            }
        });

    }

        /*functionality for add new row*/

    else {
        var myObject = [];

        showXBarChartPopup(rowId, myObject, insertSelector);


    }
}


var showXBarChartPopup = function (rowId, stringObj, selectItem) {


    var titleError = $("<span class='error titleError' id='titleEr' ></span>");
    var accessError = $("<span class='error accessError' id='accessEr'>Please select Access level</span>");

    var overlayDiv = $("<div id='sigmadialog-overlay'></div>");
    var PopUpMain = $("<div id='sigmadialog-box'></div>");
    var secDiv = $("<div class='dialog-content'></div>");

    var ptag1 = $("<p></p>");

    var datePtag = $("<p id='dateTag' />").css('width', '150px').css('font-size', '15px');
    var timePtag = $("<p id='timeTag' />").css('width', '150px').css('font-size', '15px');

    var dateInput = $("<span id='dateLabelId'>Date</span><input id='dateInputId' autocomplete='off' class='xp-EmptyClickToEdit' style='font-size:10pt' placeholder='Required Field' />");
    //var dateInput = $("<span>Date</span><input id='dateInputId'  />");
    var timeInput = $("<span>Time</span><input id='timeInputId' class='timepicker' autocomplete='off'/>");

    var dateTimeDiv = $("<div/>").css('width', '100%').css('height', '50px').css('border-bottom', '1px solid #e4e6e8');
    var sampleLabel = $("<span >Sample</span>").css('width', '130px').css('margin', '3px').css('margin-top', '10px').css('font-size', '15px');
    var measureLabel = $("<span>Measure</span>").css('width', '110px').css('margin', '3px').css('margin-top', '10px').css('font-size', '15px');

    var labelPTag = $("<p/>");

    var table = $("<table id='popupTableId' />");

    var firstRow = $("<tr id='newRow_1'/>");
    var firstSampleColumn = $("<td id='firstSampleId'/>");
    var firstMeasureColumn = $("<td id='firstMeasureColumn' />");

    var sampleInput = $("<label class='sampleInput' id='newSampleInput_1' >Sample 1</label>").css('width', '136px').css('font-size', '11px');
    var measureInput = $("<input class='measureInput' id='newMeasureInput_1' type='number' autocomplete='off'/>").css('width', '130px');

    var ptag3 = $("<p></p>");
    var addMoreLink = $("<span id='addMore'>Add more</span>").css('text-decoration', 'underline').css('cursor', 'pointer').css('font-size', '11px');


    var ptag4 = $("<p></p>");
    var okButton = $("<button id='okButton' class='fm-button ui-primarytabclr ui-corner-all fm-button-icon-left'><span class='ui-icon ui-icon-disk'></span>OK</button>");
    var cancelButton = $("<button id='cancelButton' class='fm-button ui-state-default ui-corner-all fm-button-icon-left'><span class='ui-icon ui-icon-close'></span>Cancel</button>");

    var loopCount = 0;
    if (rowId == "_empty") {
        firstSampleColumn.append(sampleInput);
        firstMeasureColumn.append(measureInput);
        firstRow.append(firstSampleColumn);
        firstRow.append(firstMeasureColumn);

        table.append(firstRow);
    }



    if (stringObj != null) {
        //	alert(stringObj[0].timeStamp);
        var rowLength = stringObj.length;

        $(stringObj).each(function (i) {

            loopCount = loopCount + i + 2;
            var loop = i + 1;

            var newRow = $("<tr  id='newRow_" + stringObj[i].xbarChartPopupItemId + "' />");
            var newSampleCol = $("<td id='newSampleCol_" + stringObj[i].xbarChartPopupItemId + "'/>").css('width', '130px');
            var newMeasureCol = $("<td id='newMeasureCol_" + stringObj[i].xbarChartPopupItemId + "'/>").css('width', '130px');
            var newSampleInput = $("<label class='sampleInput' id='newSampleInput_" + stringObj[i].xbarChartPopupItemId + "'  >Sample" + loop + "</label>").css('width', '130px');
            var newMeasureInput = $("<input autocomplete='off' class='measureInput'  id='newMeasureInput_" + stringObj[i].xbarChartPopupItemId + "' type='number' value='" + stringObj[i].measure + "' />").css('width', '130px');
            var deleteIcon = $("<td class ='deleClass' id='" + stringObj[i].xbarChartPopupItemId + "' >");
            var delSpan = $("<span>X</span>").css('cursor', 'pointer');

            /*append sample input to sample td*/

            newSampleCol.append(newSampleInput);
            newMeasureCol.append(newMeasureInput);

            deleteIcon.append(delSpan);

            newRow.append(newSampleCol);
            newRow.append(newMeasureCol);
            if (rowLength > 1) {
                newRow.append(deleteIcon);
            }

            table.append(newRow);


        });




    }
    /*append elements programmatically*/
    datePtag.append(dateInput);
    timePtag.append(timeInput);
    dateTimeDiv.append(datePtag);
    dateTimeDiv.append(timePtag);


    /*apend both sample and measure label to th ecommon p tag*/
    labelPTag.append(sampleLabel);
    labelPTag.append(measureLabel);

    ptag1.append(table);
    ptag3.append(addMoreLink);

    ptag4.append(cancelButton);
    ptag4.append(okButton);
    secDiv.append(dateTimeDiv);
    secDiv.append(labelPTag);
    secDiv.append(ptag1);
    secDiv.append(ptag3);
    secDiv.append(ptag4);
    PopUpMain.append(secDiv);
    $("#gview_ctl00_PlaceHolderMain_LifeCycleContainerWebPartZone_SigmaChart_FlexGrid").append(PopUpMain);
    $("#gview_ctl00_PlaceHolderMain_LifeCycleContainerWebPartZone_SigmaChart_FlexGrid").append(overlayDiv);
    /*For new item*/


    /*time plugin*/
    var selectedTime;
    var selectedDate;
    $('input.timepicker').timepicker({
        change: function (time) {
            // the input field
            var element = $(this), text;
            // get access to this Timepicker instance
            var timepicker = element.timepicker();
            text = timepicker.format(time);
            element.siblings('span.help-line').text(text);
            selectedTime = text;
        }
    });

    $('#dateInputId').datepicker({ dateFormat: 'M dd, yy' }).css('width', '129px').css('float', 'left').css('margin', '3px');
    $('#timeInputId').css('width', '129px').css('float', 'left').css('margin', '3px');
    $('span').css('float', 'left');
    $('#dateTag').css('width', '130px').css('float', 'left').css('margin', '3px');
    $('#timeTag').css('width', '130px').css('float', 'left').css('margin', '3px');



    if (stringObj == '') {
    }
    else {
        var months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June',
  'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        var dateString = stringObj[0].dateTimePick.substr(6);
        var currentTime = new Date(parseInt(dateString));
        var month = currentTime.getMonth() + 1;

        var selectedMonth = months[month - 1];
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var date = selectedMonth + " " + day + "," + year;



        $("input[id='dateInputId']").val(date);
        $("input[id='timeInputId']").val(stringObj[0].timeStamp);


        /*functionality for deleting sample*/

        $('.deleClass').click(function () {

            var SampleRowId = $(this).attr('id');

            /*Ajax call to delete the item from the row*/
            $.ajax({
                url: "/_layouts/IImpact.Web/NGHA/SigmaChartService.asmx/DeleteSample",
                contentType: "application/json; charset=utf-8",
                type: "post", dataType: "json",
                data: "{sampleId:'" + SampleRowId + "'}",
                success: function (datap) {

                    var data = datap.d;
                    if (data == "Success") {

                        $("table#popupTableId tr#newRow_" + SampleRowId).remove();
                        var tableRowCount = $("#popupTableId tr").length;
                        if (tableRowCount == 1) {
                            $(".deleClass").hide();
                        }

                        /*update sample label*/
                        $("#popupTableId >tbody >tr").each(function (i) {
                            var newLabelVal = i + 1;

                            $(this).find("label[class='sampleInput']").text("Sample " + newLabelVal);




                        });
                    }

                }
            });


        });


    }
    $("#addMore").click(function (e) {
        var checkEmptyInputs = false;
        var rowCount;
        $("#popupTableId input[type='number']").each(function () {
            if ($(this).val() == '') {
                checkEmptyInputs = true;

            }
        });

        if (checkEmptyInputs === false) {
            rowCount = $('#popupTableId >tbody >tr').length + 1;

            /*Rows and columns for dynamic insertion*/

            var newRow = $("<tr  id='newRow_" + rowCount + "' />");

            var newSampleCol = $("<td id='newSampleCol_" + rowCount + "'/>").css('width', '130px');
            var newMeasureCol = $("<td id='newMeasureCol_" + rowCount + "'/>").css('width', '130px');
            var newSampleInput = $("<label class='sampleInput' id='newSampleInput_" + rowCount + "' >Sample " + rowCount + "</label>").css('width', '130px').css('font-size', '11px');

            var newMeasureInput = $("<input autocomplete='off' class='measureInput' id='newMeasureInput_" + rowCount + "' type='number' />").css('width', '130px').css('width', '130px').css('font-size', '11px');

            var deleteIcon = $("<td  class='newEmptyRowClass' id ='" + rowCount + "'  />");
            var delSpan = $("<span>X</span>").css('cursor', 'pointer');

            /*append sample input to sample td*/

            newSampleCol.append(newSampleInput);
            newMeasureCol.append(newMeasureInput);
            deleteIcon.append(delSpan);
            newRow.append(newSampleCol);
            newRow.append(newMeasureCol);
            newRow.append(deleteIcon);
            $("#popupTableId").append(newRow);

        }

        $(".newEmptyRowClass").click(function () {
            var selectedTdId = $(this).attr("id");
            $("table#popupTableId tr#newRow_" + selectedTdId).remove();
            $("#popupTableId >tbody >tr").each(function (i) {
                var newLabelVal = i + 1;
                $(this).find("label[class='sampleInput']").text("Sample " + newLabelVal);
            });
        });

    });




    $('#cancelButton').click(function (e) {
        e.preventDefault();
        $('#sigmadialog-overlay').remove();
        $('#sigmadialog-box').remove();
        $('.jqgrid-overlay').hide();
    });

    $("#okButton").click(function (e) {


        e.preventDefault();


        var sampleValue = '';
        var totalMeasurement = '';
        var arr = [];

        var dataObj = {};
        var finalData = {};
        var SPCItemId;
        $("#ctl00_PlaceHolderMain_LifeCycleContainerWebPartZone_SPCChartControl_FlexGrid >tbody >tr").each(function (i) {
            SPCItemId = $("tr[aria-selected='true']").attr("id");
        });

        var valuePublishDate = $("input[id='dateInputId']").val();
        selectedTime = $("input[id='timeInputId']").val();
        var sampleInputId;
        var measureInputId;
        $("#popupTableId > tbody > tr ").each(function (i) {


            $(this).find("input,number").each(function (i) {

                if ($(this).attr("id").indexOf("newSampleInput_") >= 0) {
                    sampleInputId = $(this).attr("id");
                }
                else if ($(this).attr("id").indexOf("newMeasureInput_") >= 0) {
                    measureInputId = $(this).attr("id");
                }

            });

            newVal = i + 1;
            //			sampleValue = $("#" + sampleInputId).val();
            totalMeasurement = $("#" + measureInputId).val();

            arr.push({
                //				sample: sampleValue,
                measure: totalMeasurement,
                spcItemId: SPCItemId,
                itemRowId: rowId,
                timeStamp: selectedTime,
                dateTimePick: valuePublishDate

            });
            finalData.sampleData = arr;


        });

        var db = JSON.stringify(finalData);
        if (valuePublishDate == '') {

            $("#dateLabelId").append("<span style='font-size:11px;Color:#ff0000'>*</span>");
        }
        else {
            $.ajax({
                url: "/_layouts/IImpact.Web/NGHA/SigmaChartService.asmx/SaveSample",
                contentType: "application/json; charset=utf-8",
                type: "post", dataType: "json",
                data: db,
                success: function (datap) {

                    var data = datap.d;
                    if (data == "Success") {


                        var gridRef = selectItem.replace('#gview_', 'table#');
                        var popupRef = selectItem.replace('#gview_', '#editmod');
                        $(gridRef).trigger("reloadGrid");
                        $('#titleError').css('display', 'none');
                        $('#sigmadialog-overlay').remove();
                        $('#sigmadialog-box').remove();
                        $(popupRef).hide();
                        $('.jqgrid-overlay').hide();

                    }
                    /*call the method which shows the popup */

                    //showXBarChartPopup(data)
                }
            });
        }



    });

}
/*end*/
var createModal = function (aIDs, content, p, insertSelector, posSelector, appendsel) {
    //if($('.profileContentClass').length > 0)
    //{
    //    alert();
    //    $('.profileContentClass').prev().addclass('fa fa-info-circle fa-1x xpEcoach');
    //}

    var mw = document.createElement('div');
    mw.className = "ui-widget ui-widget-content ui-corner-all ui-jqdialog xp-PopupBorder";
    mw.id = aIDs.themodal;
    var mh = document.createElement('div');
    mh.className = "ui-jqdialog-titlebar  ui-corner-all ui-helper-clearfix";
    mh.id = aIDs.modalhead;
    jQuery(mh).append("<span class='ui-jqdialog-title'>" + p.caption + "</span>");
    if (p.funcAlt === 'True') {
        jQuery(mh).append("<span id='createNewIdea'>[+]</span>");
    }
    var ahr = jQuery("<a href='javascript:void(0)' class='ui-jqdialog-titlebar-close ui-corner-all' style='right:0.3em'></a>")
	.hover(function () { ahr.addClass('ui-state-hover'); },
		   function () { ahr.removeClass('ui-state-hover'); })
	.append("<span class='ui-icon ui-icon-closethick'></span>");
    jQuery(mh).append(ahr);
    var mc = document.createElement('div');
    jQuery(mc).addClass("ui-jqdialog-content ui-widget-content").attr("id", aIDs.modalcontent);
    jQuery(mc).append(content);
    mw.appendChild(mc);
    jQuery(mw).prepend(mh);
    if (appendsel === true) { jQuery('body').append(mw); } //append as first child in body -for alert dialog
    else { jQuery(mw).insertBefore(insertSelector); }
    if (typeof p.jqModal === 'undefined') { p.jqModal = true; } // internal use
    if (jQuery.fn.jqm && p.jqModal === true) {
        if (p.left == 0 && p.top == 0) {
            var pos = [];
            pos = findPos(posSelector);
            p.left = pos[0] + 4;
            p.top = pos[1] + 4;
        }
    }
    jQuery("a.ui-jqdialog-titlebar-close", mh).click(function (e) {
        var oncm = jQuery("#" + aIDs.themodal).data("onClose") || p.onClose;
        var gboxclose = jQuery("#" + aIDs.themodal).data("gbox") || p.gbox;
        hideModal("#" + aIDs.themodal, { gb: gboxclose, jqm: p.jqModal, onClose: oncm });
        return false;
    });
    if (p.width == 0 || !p.width) { p.width = 300; }
    if (p.height == 0 || !p.height) { p.height = 200; }
    if (!p.zIndex) { p.zIndex = 1250; }
    jQuery(mw).css({
        top: p.top + "px",
        left: p.left + "px",
        width: isNaN(p.width) ? "auto" : p.width + "px",
        height: isNaN(p.height) ? "auto" : p.height + "px",
        zIndex: p.zIndex,
        overflow: 'hidden'
    })
	.attr({ tabIndex: "-1", "role": "dialog", "aria-labelledby": aIDs.modalhead, "aria-hidden": "true" });
    if (typeof p.drag == 'undefined') { p.drag = true; }
    if (typeof p.resize == 'undefined') { p.resize = true; }
    if (p.drag) {
        jQuery(mh).css('cursor', 'move');
        if (jQuery.fn.jqDrag) {
            jQuery(mw).jqDrag(mh);
        } else {
            try {
                jQuery(mw).draggable({ handle: jQuery("#" + mh.id) });
            } catch (e) { }
        }
    }
    if (p.resize) {
        if (jQuery.fn.jqResize) {
            jQuery(mw).append("<div class='jqResize ui-resizable-handle ui-resizable-se'></div>");
            jQuery("#" + aIDs.themodal).jqResize(".jqResize", aIDs.scrollelm ? "#" + aIDs.scrollelm : false);
        } else {
            try {
                jQuery(mw).resizable({ handles: 'se', alsoResize: aIDs.scrollelm ? "#" + aIDs.scrollelm : false });
                jQuery(mw).removeClass("ui-icon jqResize ui-resizable-handle ui-resizable-s");
            } catch (e) { }
        }
    }
    if (p.closeOnEscape === true) {
        jQuery(mw).keydown(function (e) {
            if (e.which == 27) {
                var cone = jQuery("#" + aIDs.themodal).data("onClose") || p.onClose;
                hideModal(this, { gb: p.gbox, jqm: p.jqModal, onClose: cone });
            }
        });
    }
    $('#createNewIdea').hover(function (e) {
        e.preventDefault();
        var pathImage = "/_layouts/Images/Xpointbase/downarrow.jpg";
        $('#createNewIdea').prepend("<span id='tooltip' class='icontooltip'>Add new<br> " + p.contentType + "<span class='arrowImg'></span></span>").show();
    }, function (e) {
        $('#tooltip').remove();
    });
    $("#createNewIdea").click(function (e) {

        createNewIdea(p, insertSelector);

    });
};
var viewModal = function (selector, o) {
    o = jQuery.extend({
        toTop: true,
        overlay: 10,
        modal: false,
        onShow: showModal,
        onHide: closeModal,
        gbox: '',
        jqm: true,
        jqM: true,
        isalert: false
    }, o || {});
    if (o.isalert) {
        $(selector).css({ "top": ($(o.gbox).offset().top + 25) });
    }
    if (jQuery.fn.jqm && o.jqm == true) {
        if (o.jqM) jQuery(selector).attr("aria-hidden", "false").jqm(o).jqmShow();
        else jQuery(selector).attr("aria-hidden", "false").jqmShow();
    } else {
        if (o.gbox != '') {
            jQuery(".jqgrid-overlay:first", o.gbox).show();
            jQuery(selector).data("gbox", o.gbox);
        }
        jQuery(selector).show().attr("aria-hidden", "false");
        try { jQuery(':input:visible', selector)[0].focus(); } catch (_) { }
    }
};
var hideModal = function (selector, o) {
    o = jQuery.extend({ jqm: true, gb: '' }, o || {});
    if (o.onClose) {
        var oncret = o.onClose(selector);
        if (typeof oncret == 'boolean' && !oncret) return;
    }
    if (jQuery.fn.jqm && o.jqm === true) {
        jQuery(selector).attr("aria-hidden", "true").jqmHide();
    } else {
        if (o.gb != '') {
            try { jQuery(".jqgrid-overlay:first", o.gb).hide(); } catch (e) { }
        }

        jQuery(selector).hide().attr("aria-hidden", "true");
        jQuery(".ui-timepicker-container").hide();
    }
};

function info_dialog(caption, content, c_b, modalopt) {
    var mopt = {
        width: 290,
        height: 'auto',
        dataheight: 'auto',
        drag: true,
        resize: false,
        caption: "<b>" + caption + "</b>",
        left: 250,
        top: 170,
        jqModal: true,
        closeOnEscape: true,
        align: 'center',
        buttonalign: 'center'
    };
    jQuery.extend(mopt, modalopt || {});
    var jm = mopt.jqModal;
    if (jQuery.fn.jqm && !jm) jm = false;
    // in case there is no jqModal
    var dh = isNaN(mopt.dataheight) ? mopt.dataheight : mopt.dataheight + "px",
	cn = "text-align:" + mopt.align + ";";
    var cnt = "<div id='info_id'>";
    cnt += "<div id='infocnt' style='margin:0px;padding-bottom:1em;width:100%;overflow:auto;position:relative;height:" + dh + ";" + cn + "'>" + content + "</div>";
    cnt += c_b ? "<div class='ui-widget-content ui-helper-clearfix' style='text-align:" + mopt.buttonalign + ";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'><a href='javascript:void(0)' id='closedialog' class='fm-button ui-state-default ui-corner-all'>" + c_b + "</a></div>" : "";
    cnt += "</div>";

    try { jQuery("#info_dialog").remove(); } catch (e) { }
    createModal({
        themodal: 'info_dialog',
        modalhead: 'info_head',
        modalcontent: 'info_content',
        scrollelm: 'infocnt'
    },
		cnt,
		mopt,
		'', '', true
	);
    jQuery("#closedialog", "#info_id").click(function (e) {
        hideModal("#info_dialog", { jqm: jm });
        return false;
    });
    jQuery(".fm-button", "#info_dialog").hover(
		function () { jQuery(this).addClass('ui-state-hover'); },
		function () { jQuery(this).removeClass('ui-state-hover'); }
	);
    viewModal("#info_dialog", {
        onHide: function (h) {
            h.w.hide().remove();
            if (h.o) { h.o.remove(); }
        },
        modal: true,
        jqm: jm
    });
}
//Helper functions
function findPos(obj) {
    var curleft = curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        //do not change obj == obj.offsetParent 
    }
    return [curleft, curtop];
}
function isArray(obj) {
    if (obj.constructor.toString().indexOf("Array") == -1) {
        return false;
    } else {
        return true;
    }
}
function formatPeoplepickerVal(val) {
    var datap = {}, i = 0;
    if ($.trim(val)) {
        $.each(val.split(","), function () {
            var currentval = this;
            if (currentval != null && $.trim(currentval).length != 0) {
                var id = currentval.split("!")[0];
                var value = currentval.split("!")[1];
                if (id != null && value != null) {
                    datap[i] = { "id": id, "name": value };
                    i++;
                }
            }
        });
    }
    return datap;
}
// Form Functions
function createEl(eltype, options, vl) {
    var elem = "";
    if (options.defaultValue) delete options['defaultValue'];
    function bindEv(el, opt) {
        if (jQuery.isFunction(opt.dataInit)) {
            // datepicker fix 
            el.id = opt.id;
            opt.dataInit(el, vl);
            delete opt['id'];
            delete opt['dataInit'];
        }
        if (opt.dataEvents) {
            jQuery.each(opt.dataEvents, function () {
                if (this.data != null)
                    jQuery(el).bind(this.type, this.data, this.fn);
                else
                    jQuery(el).bind(this.type, this.fn);
            });
            delete opt['dataEvents'];
        }
        return opt;
    }
    switch (eltype) {
        case "textarea":
            elem = document.createElement("textarea");
            if (!options.cols) { jQuery(elem).css("width", "98%"); }
            if (vl == '&nbsp;' || vl == '&#160;' || (vl.length == 1 && vl.charCodeAt(0) == 160)) { vl = ""; }
            elem.value = vl;
            options = bindEv(elem, options);
            jQuery(elem).attr(options);
            break;

        case "multipeople":
            elem = document.createElement("textarea");
            if (!options.cols) { jQuery(elem).css("width", "98%"); }
            if (!vl || vl == '&nbsp;' || vl == '&#160;' || (vl.length == 1 && vl.charCodeAt(0) == 160)) { vl = ""; }
            var datap = formatPeoplepickerVal(vl);
            options = bindEv(elem, options);
            jQuery(elem).attr(options);
            setTimeout(function () { $(elem).peoplepicker({ multiple: true, prePopulate: datap }) }, 200);
            break;

        case "richtextbox":
            elem = document.createElement("textarea");
            elem.setAttribute("cols", 50);
            elem.setAttribute("width", "80%");
            elem.setAttribute("rows", 15);
            if (!options.cols) { jQuery(elem).css("width", "98%"); }
            if (vl == '&nbsp;' || vl == '&#160;' || (vl.length == 1 && vl.charCodeAt(0) == 160)) { vl = ""; }
            elem.value = vl;
            options = bindEv(elem, options);
            jQuery(elem).attr(options);
            jQuery(elem).addClass("ms-long");
            jQuery(elem).addClass("makerichtext");
            setTimeout(function () { $(elem).RelayRichText({ imageEnabled: options.imageEnabled }); }, 150);
            break;
        case "checkbox": //what code for simple checkbox
            elem = document.createElement("input");
            elem.type = "checkbox";
            if (!options.value) {
                var vl1 = vl.toLowerCase();
                if (vl1.search(/(false|0|no|off|undefined)/i) < 0 && vl1 !== "") {
                    elem.checked = true;
                    elem.defaultChecked = true;
                    elem.value = vl;
                } else {
                    elem.value = "on";
                }
                jQuery(elem).attr("offval", "off");
            } else {
                var cbval = options.value.split(":");
                if (vl === cbval[0]) {
                    elem.checked = true;
                    elem.defaultChecked = true;
                }
                elem.value = cbval[0];
                jQuery(elem).attr("offval", cbval[1]);
                try { delete options['value']; } catch (e) { }
            }
            options = bindEv(elem, options);
            jQuery(elem).attr(options);
            break;
        case "select":
            elem = document.createElement("select");
            var msl = options.multiple === true ? true : false;
            if (options.dataUrl != null) {
                var dataParm = "";
                if (options.dataParm != null) {
                    dataParm = options.dataParm;
                }
                $.ajax({
                    url: options.dataUrl,
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: "{" + dataParm + "}",
                    complete: function (data, Status) {
                        try { delete options['dataUrl']; delete options['value']; } catch (e) { }
                        var rtn = $.jgrid.parse(data.responseText);
                        var a = jQuery(rtn.d).html();
                        jQuery(elem).append(a);
                        options = bindEv(elem, options);
                        if (typeof options.size === 'undefined') { options.size = msl ? 3 : 1; }
                        jQuery(elem).attr(options);
                        setTimeout(function () {
                            jQuery("option", elem).each(function (i) {
                                if (jQuery(this).html() == vl) {
                                    this.selected = "selected";
                                    return false;
                                }
                            });
                            if ($.isFunction(options.afterAjaxComplete)) {
                                options.afterAjaxComplete(elem);
                            }
                        }, 0);
                    }
                });
                /*
                jQuery.get(options.dataUrl, { _nsd: (new Date().getTime()) }, function(data) {
                try { delete options['dataUrl']; delete options['value']; } catch (e) { }
                var a = jQuery(data).html();
                jQuery(elem).append(a);
                options = bindEv(elem, options);
                if (typeof options.size === 'undefined') { options.size = msl ? 3 : 1; }
                jQuery(elem).attr(options);
                setTimeout(function() {
                jQuery("option", elem).each(function(i) {
                if (jQuery(this).html() == vl) {
                this.selected = "selected";
                return false;
                }
                });
                }, 0);
                }, 'html');
                */
            } else if (options.value) {
                var ovm = [], i;
                if (msl) {
                    ovm = vl.split(",");
                    ovm = jQuery.map(ovm, function (n) { return jQuery.trim(n) });
                    if (typeof options.size === 'undefined') { options.size = 3; }
                } else {
                    options.size = 1;
                }
                if (typeof options.value === 'string') {
                    var so = options.value.split(";"), sv, ov;
                    try { delete options['value']; } catch (e) { }
                    options = bindEv(elem, options);
                    jQuery(elem).attr(options);
                    for (i = 0; i < so.length; i++) {
                        sv = so[i].split(":");
                        ov = document.createElement("option");
                        ov.value = sv[0]; ov.innerHTML = sv[1];
                        if (!msl && sv[0] == vl) ov.selected = "selected";
                        if (msl && jQuery.inArray(jQuery.trim(sv[0]), ovm) > -1) { ov.selected = "selected"; }
                        elem.appendChild(ov);
                    }
                } else if (typeof options.value === 'object') {
                    var oSv = options.value;
                    try { delete options['value']; } catch (e) { }
                    options = bindEv(elem, options);
                    jQuery(elem).attr(options);
                    i = 0;
                    for (var key in oSv) {
                        i++;
                        ov = document.createElement("option");
                        ov.value = key; ov.innerHTML = oSv[key];
                        if (!msl && oSv[key] == vl) ov.selected = "selected";
                        if (msl && jQuery.inArray(jQuery.trim(oSv[key]), ovm) > -1) ov.selected = "selected";
                        elem.appendChild(ov);
                    }
                }
            }
            break;

        case "text":
        case "password":
        case "button":
            elem = document.createElement("input");
            elem.type = eltype;
            elem.value = jQuery.jgrid.htmlDecode(vl);
            options = bindEv(elem, options);
            if (!options.size) {
                jQuery(elem).css({ width: "98%" });
            }
            jQuery(elem).attr(options);
            break;
        case "location":
            elem = document.createElement("select");
            options = bindEv(elem, options);
            jQuery(elem).attr(options);

            $(elem).classification({
                listname: 'GeographyData',
                columnname: 'GeographyName',
                parentcolumnname: '',
                parentid: '',
                serviceurl: '/_layouts/IImpact.Web/ClassificationService.asmx/Classification',
                valuecolumn: 'GeographyName',
                uniquevals: 'False',
                autoindexing: 'False'
            });
            break;
        case "function":
            elem = document.createElement("select");
            options = bindEv(elem, options);
            jQuery(elem).attr(options);

            $(elem).classification({
                listname: 'FunctionData',
                columnname: 'FunctionName',
                parentcolumnname: '',
                parentid: '',
                serviceurl: '/_layouts/IImpact.Web/ClassificationService.asmx/Classification',
                valuecolumn: 'FunctionName',
                uniquevals: 'False',
                autoindexing: 'False'
            });
            break;
        case "department":
            elem = document.createElement("select");
            options = bindEv(elem, options);
            jQuery(elem).attr(options);

            $(elem).classification({
                listname: 'DepartmentData',
                columnname: 'DepartmentName',
                parentcolumnname: '',
                parentid: '',
                serviceurl: '/_layouts/IImpact.Web/ClassificationService.asmx/Classification',
                valuecolumn: 'DepartmentName',
                uniquevals: 'False',
                autoindexing: 'False'
            });
            break;
        case "singleperson":
            elem = document.createElement("input");
            options = bindEv(elem, options);
            if (!options.size) {
                jQuery(elem).css({ width: "98%" });
            }
            jQuery(elem).attr(options);
            var datap = formatPeoplepickerVal(vl);
            options = bindEv(elem, options);
            jQuery(elem).attr(options);
            setTimeout(function () { $(elem).peoplepicker({ prePopulate: datap }) }, 200);
            break;
        case "image":
        case "file":
            elem = document.createElement("input");
            elem.type = eltype;
            options = bindEv(elem, options);
            jQuery(elem).attr(options);
            break;
    }
    return elem;
}
function checkValues(val, valref, g) {
    var edtrul, i, nm;
    if (typeof (valref) == 'string') {
        for (i = 0, len = g.p.colModel.length; i < len; i++) {
            if (g.p.colModel[i].name == valref) {
                edtrul = g.p.colModel[i].editrules;
                valref = i;
                try { nm = g.p.colModel[i].formoptions.label; } catch (e) { }
                break;
            }
        }
    } else if (valref >= 0) {
        edtrul = g.p.colModel[valref].editrules;
    }
    if (edtrul) {
        if (!nm) nm = g.p.colNames[valref];
        if (edtrul.required === true) {
            var valtocheck = $.trim(val.replace('&nbsp;', ""));
            if (valtocheck.match(/^\s+$/) || valtocheck == "") return [false, nm + ": " + jQuery.jgrid.edit.msg.required, ""];
        }
        // force required
        var rqfield = edtrul.required === false ? false : true;
        if (edtrul.number === true) {
            if (!(rqfield === false && isEmpty(val))) {
                if (isNaN(val)) return [false, nm + ": " + jQuery.jgrid.edit.msg.number, ""];
            }
        }
        if (typeof edtrul.minValue != 'undefined' && !isNaN(edtrul.minValue)) {
            if (parseFloat(val) < parseFloat(edtrul.minValue)) return [false, nm + ": " + jQuery.jgrid.edit.msg.minValue + " " + edtrul.minValue, ""];
        }
        if (typeof edtrul.maxValue != 'undefined' && !isNaN(edtrul.maxValue)) {
            if (parseFloat(val) > parseFloat(edtrul.maxValue)) return [false, nm + ": " + jQuery.jgrid.edit.msg.maxValue + " " + edtrul.maxValue, ""];
        }
        var filter;
        if (edtrul.email === true) {
            if (!(rqfield === false && isEmpty(val))) {
                // taken from jquery Validate plugin
                filter = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
                if (!filter.test(val)) { return [false, nm + ": " + jQuery.jgrid.edit.msg.email, ""]; }
            }
        }
        if (edtrul.integer === true) {
            if (!(rqfield === false && isEmpty(val))) {
                if (isNaN(val)) return [false, nm + ": " + jQuery.jgrid.edit.msg.integer, ""];
                if ((val % 1 != 0) || (val.indexOf('.') != -1)) return [false, nm + ": " + jQuery.jgrid.edit.msg.integer, ""];
            }
        }
        if (edtrul.date === true) {
            if (!(rqfield === false && isEmpty(val))) {
                var dft = g.p.colModel[valref].datefmt || "Y-m-d";
                if (!checkDate(dft, val)) return [false, nm + ": " + jQuery.jgrid.edit.msg.date + " - " + dft, ""];
            }
        }
        if (edtrul.time === true) {
            if (!(rqfield === false && isEmpty(val))) {
                if (!checkTime(val)) return [false, nm + ": " + jQuery.jgrid.edit.msg.date + " - hh:mm (am/pm)", ""];
            }
        }
        if (edtrul.url === true) {
            if (!(rqfield === false && isEmpty(val))) {
                filter = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                if (!filter.test(val)) { return [false, nm + ": " + jQuery.jgrid.edit.msg.url, ""]; }
            }
        }
    }
    return [true, "", ""];
}
// Date Validation Javascript
function checkDate(format, date) {
    var tsp = {}, sep;
    format = format.toLowerCase();
    //changes made to incorporate custom datetime format. Milan
    if (format.indexOf("/") != -1) {
        sep = "/";
    } else if (format.indexOf("-") != -1) {
        sep = "-";
    } else if (format.indexOf(".") != -1) {
        sep = ".";
    } else {
        try {
            /*Restricted for only format Dec 02, 2012 (M dd, yyyy)*/
            var mnth, dt, fullYr;
            var splitArr = date.split(' ');
            var monthStr = splitArr[0];
            var monthIdx = $.datepicker.regional[""].monthNamesShort.indexOf(monthStr);
            if (monthIdx > -1) {
                mnth = monthIdx + 1;
                var dtStr = splitArr[1];
                dt = dtStr.split(',')[0];
                if (dt != null) {
                    fullYr = splitArr[2];
                    date = fullYr + "-" + mnth + "-" + dt;
                    format = "y-m-d";
                    sep = "-";
                }
            }
        }
        catch (err) { return false; }
    }
    format = format.split(sep);
    date = date.split(sep);
    if (date.length != 3) return false;
    var j = -1, yln, dln = -1, mln = -1;
    for (var i = 0; i < format.length; i++) {
        var dv = isNaN(date[i]) ? 0 : parseInt(date[i], 10);
        tsp[format[i]] = dv;
        yln = format[i];
        if (yln.indexOf("y") != -1) { j = i; }
        if (yln.indexOf("m") != -1) { mln = i }
        if (yln.indexOf("d") != -1) { dln = i }
    }
    if (format[j] == "y" || format[j] == "yyyy") {
        yln = 4;
    } else if (format[j] == "yy") {
        yln = 2;
    } else {
        yln = -1;
    }
    var daysInMonth = DaysArray(12);
    var strDate;
    if (j === -1) {
        return false;
    } else {
        strDate = tsp[format[j]].toString();
        if (yln == 2 && strDate.length == 1) { yln = 1; }
        if (strDate.length != yln || tsp[format[j]] == 0) {
            return false;
        }
    }
    if (mln === -1) {
        return false;
    } else {
        strDate = tsp[format[mln]].toString();
        if (strDate.length < 1 || tsp[format[mln]] < 1 || tsp[format[mln]] > 12) {
            return false;
        }
    }
    if (dln === -1) {
        return false;
    } else {
        strDate = tsp[format[dln]].toString();
        if (strDate.length < 1 || tsp[format[dln]] < 1 || tsp[format[dln]] > 31 || (tsp[format[mln]] == 2 && tsp[format[dln]] > daysInFebruary(tsp[format[j]])) || tsp[format[dln]] > daysInMonth[tsp[format[mln]]]) {
            return false;
        }
    }
    return true;
}
function daysInFebruary(year) {
    // February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
}
function DaysArray(n) {
    for (var i = 1; i <= n; i++) {
        this[i] = 31;
        if (i == 4 || i == 6 || i == 9 || i == 11) { this[i] = 30; }
        if (i == 2) { this[i] = 29; }
    }
    return this;
}

function isEmpty(val) {
    if (val.match(/^s+$/) || val == "") {
        return true;
    } else {
        return false;
    }
}
function checkTime(time) {
    // checks only hh:ss (and optional am/pm)
    var re = /^(\d{1,2}):(\d{2})([ap]m)?$/, regs;
    if (!isEmpty(time)) {
        regs = time.match(re);
        if (regs) {
            if (regs[3]) {
                if (regs[1] < 1 || regs[1] > 12)
                    return false;
            } else {
                if (regs[1] > 23)
                    return false;
            }
            if (regs[2] > 59) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
}