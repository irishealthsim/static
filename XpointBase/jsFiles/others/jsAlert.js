/// <reference path="jquery-1.3.2-vsdoc.js" />
/// <reference path="json2.js"/>
/// <reference path="jquery-ui-1.7.2.custom.min.js"/>
/**Copyright (c) <YYYY> – Relay Consultants Ltd – ALL RIGHTS RESERVED **/
var jsAlertSettings = {
  _serviceUrl: "/_layouts/IImpact.Web/MyActiveNotification.asmx/",
  _imgUrlAlert: "_layouts/images/XPointBase/myalerts_active.png",
  _imgNotification: "#imgRlnotification",
  _activeDiv: "#activeAlert",
  _archiveDiv: "#archiveAlerts",
  _notificationTab: "#rlNotification",
  _chatTab: "#rlChat",
  _alertInterval: 5,
  _refreshInterval: 10
};
var ActiveAlerts = {
    Alerts: new Array()
};
var jsAlert = function (id, content) {
    this.m_id = id;
    this.m_content = content;
    this.m_displayed = false;
    this.m_link;
}
jsAlert.prototype = {
    /*Get the alerts from the active list one by one on every inteval of 6 sec (Refresh interval)*/
    getAlerts: function () {
        var displayedAlerts = "";
        for (i = 0; i < ActiveAlerts.Alerts.length; i++) {
            if (ActiveAlerts.Alerts[i].m_displayed == true) displayedAlerts += ActiveAlerts.Alerts[i].m_id + ","
        }
        /* Remove the comma at the end if displayedAlerts is not empty*/
        if (displayedAlerts != "") displayedAlerts = displayedAlerts.slice(0, -1);
        $.ajax({
            type: "POST",
            url: jsAlertSettings._serviceUrl + "GetActiveItems",
            data: '{ "displayedAlerts" : "' + displayedAlerts + '"}',
            contentType: "application/json; charset=utf-8",
            success: JSAlert.processAlerts,
            dataType: "json"
        });
        setTimeout("JSAlert.getAlerts()", jsAlertSettings._refreshInterval * 1000);
    },

    /*on success of the ajax call push the new alerts to active alerts array*/
    processAlerts: function (response) {
        var alerts = response.d;
        /* Flush displayed alerts from ActiveAlerts*/
        var i = 0;
        while (ActiveAlerts.Alerts.length > 0 && i < ActiveAlerts.Alerts.length && ActiveAlerts.Alerts[i].m_displayed) {
            ActiveAlerts.Alerts.shift();
            i++;
        }
        /* Assign new alerts to end of the array*/
        $(alerts).each(function (intParseIndex) {
            var newActiveAlert = new jsAlert(this.m_id, this.m_Content);
            ActiveAlerts.Alerts.push(newActiveAlert);
        });
    },
    /**display the active alert at every interval of 6 seconds
    *depends on status of the archiveDiv either is opened or not
    *the active alerts will display
    *if it is hidden active alerts will display 1 by 1 or
    *they will append to active div one after the other
    **/
    displayAlert: function () {
        var indx;
        for (indx in ActiveAlerts.Alerts) {
            if (ActiveAlerts.Alerts[indx].m_displayed) { ///do nothing
            }
            else {
                break;
            }
        }
        if (indx) {
            var currentActiveAlert = ActiveAlerts.Alerts[indx];
            if (currentActiveAlert.m_displayed) {
              if ($(jsAlertSettings._notificationTab).is(":hidden")) {
                $(jsAlertSettings._activeDiv).empty();
                $(jsAlertSettings._activeDiv).slideUp();
              }
            }
            else if ($(jsAlertSettings._notificationTab).is(':visible')) {
                $("#archiveAlerts div:first").removeClass("xp-Padding-4 xp-FontNormal xp-FloatLeft xp-Width ui-state-default");
                $("#archiveAlerts div:first-child").addClass("xp-Padding-4 xp-FontNormal xp-FloatLeft xp-Width");
                $(jsAlertSettings._archiveDiv).prepend("<br/>");
                $(jsAlertSettings._archiveDiv).prepend(currentActiveAlert.m_content).animate(1000, function () {
                    ActiveAlerts.Alerts[indx].m_displayed = true;
                });
                $("#archiveAlerts div:first").addClass("xp-Padding-4 xp-FontNormal xp-FloatLeft xp-Width ui-state-default");
            }

              else {
                if ($(jsAlertSettings._chatTab).is(':visible')) {
                  $(jsAlertSettings._imgNotification).attr("src", jsAlertSettings._imgUrlAlert);
                }
                $(jsAlertSettings._activeDiv).slideDown();
                $(jsAlertSettings._activeDiv).empty();
                $(jsAlertSettings._activeDiv).prepend(currentActiveAlert.m_content).animate(1000, function () {
                    ActiveAlerts.Alerts[indx].m_displayed = true;
                });
                $(jsAlertSettings._activeDiv).prepend('<a href="#" class="close" style="float:right;padding-left:2px;color:#3f3f40">X</a>').click(function () { $(jsAlertSettings._activeDiv).slideUp(); });
            }
        }
        setTimeout("JSAlert.displayAlert()", jsAlertSettings._alertInterval * 1000);
    }
};
