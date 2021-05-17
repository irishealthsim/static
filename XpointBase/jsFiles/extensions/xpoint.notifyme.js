(function ($) {

    $.fn.NotifyMe = function (options) {

        var defaults = {
            componentname: '',
            AddNotificationUrl: "/_layouts/IImpact.Web/NotifyMeService.asmx/AddNotification",
            uniqueid: '',
            isnotifymepresent: false,
            frequency: '',
            RemovenotificationUrl: "/_layouts/IImpact.Web/NotifyMeService.asmx/ModifyNotification",
            configid: '',
            isonline: false,
            offline: ""
        };

        var opts = $.extend(defaults, options);

        var ids = {
            imgid: 'menufive',
            ulid: 'menufivelist',
            removeimgid: 'removenotification',
            popupdialogid: 'notifymepopupid',
            popupdialogerrorid: 'nofitymepopupdialogerrorid',
            popupcheckboxid: 'notifymepopupcheckboxid',
            popupddlid: 'notifymepopupddlid'
        };

        var ddloptions = [{ text: "None", value: "None" },
        { text: "Immediate", value: "Immediate" },
        { text: "Daily", value: "Daily" },
        { text: "Weekly", value: "Weekly" },
        { text: "Monthly", value: "Monthly"}];
        var classes = {
            alertme: 'alertme'
        };

        var maindivId = "";
        var constants = {
            immediate: "Immediate",
            daily: "Daily",
            weekly: "Weekly",
            monthly: "Monthly",
            lcnotifymeImage: "",
            removenotifymeImage: "edit_notification.png",
            baseimageurl: "/_layouts/Images/XpointBase/",
            lcremoveimmediateImage: "edit_notification.png"
        };

        function createNotifyMe() {
            var html = "";
            html = "<img id='" + ids.imgid + "' src='/_layouts/Images/XpointBase/forum_Notifyme.png' alt='Subscribe' title='Subscribe' style='cursor:pointer'/>"
            html += "<ul id='" + ids.ulid + "' style='display:none'>";
            html += "<li style='list-style-type:none;' class='" + classes.alertme + "'>" + constants.immediate + "</li>";
            html += "<li class='" + classes.alertme + "'>" + constants.daily + "</li>";
            html += "<li class='" + classes.alertme + "'>" + constants.weekly + "</li>";
            html += "<li class='" + classes.alertme + "'>" + constants.monthly + "</li>";
            html += "</ul>";
            $("#" + maindivId).append(html);
            AssignPlugin();
        }

        function AssignPlugin() {
            var menuoptions = { minWidth: 60, arrowSrc: 'arrow_right.gif', onClick: function (e, menuItem) {
                AddNotification($(this).text());
            }
            };
            $("#menufive").NotifyMenu(menuoptions, "#" + ids.ulid);
        }

        function AddNotification() {
            $.ajax({
                url: opts.AddNotificationUrl,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "POST",
                data: "{ componentname: '" + opts.componentname + "' ,uniqueid: '" + opts.uniqueid + "',isonline:'" + $("#" + ids.popupcheckboxid).attr('checked') + "',offline:'" + $("#" + ids.popupddlid).val() + "',configid:'" + opts.configid + "'}",
                success: function (data) {
                    opts.configid = data.d.configId;
                    var status = data.d.status;
                    opts.offline = data.d.offline;
                    opts.isonline = data.d.isonline;
                    if (status) {
                        CloseDialog();
                        AddRemoveImg();
                    }
                }
            });
        }

        function AddRemoveImg() {
            $("#" + ids.imgid).remove();
            var html = "<img id='" + ids.removeimgid + "' src='/_layouts/Images/XpointBase/" + constants.removenotifymeImage + "' alt='" + GetImageAlt() + "' title='" + GetImageAlt() + "' style='cursor:pointer'/>";
            $("#" + maindivId).append(html);

            if ($("#removenotification").length > 0) {
                $("#removenotification").click(function () {
                    //  CreateNotifyMeDialog();
                    OpenDialog();
                });
            }
        }

        function RemoveNotification() {
            $.ajax({
                url: opts.RemovenotificationUrl,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "POST",
                data: "{ configId: '" + opts.configid + "', isonline: '" + $("#" + ids.popupcheckboxid).attr('checked') + "',offline:'" + $("#" + ids.popupddlid).val() + "',componentname:'" + opts.componentname + "',uniqueid:'" + opts.uniqueid + "'}",
                success: function (data) {
                    var status = data.d;
                    if (status) {
                        opts.configid = status.configId;
                        opts.offline = status.offline;
                        opts.isonline = status.isonline;
                        if (!opts.isonline && opts.offline == "None") {
                            CloseDialog();
                            $("#" + ids.removeimgid).remove();
                            createNotifyMeImg();
                        }
                        else {
                            CloseDialog();
                            $("#" + ids.removeimgid).attr('alt', GetImageAlt());
                            $("#" + ids.removeimgid).attr('title', GetImageAlt());
                        }

                    }
                }
            });
        }

        function CloseDialog() {
            $("#" + ids.popupdialogid).dialog('close');
        }

        function OpenDialog() {
            $("#" + ids.popupdialogid).dialog('open');
        }
        function CreatePopUp() {
            var $popup;
            $popup = $("<div />");
            $popup.attr("id", ids.popupdialogid);

            var $firstdiv = $("<div />");
            var $errorp = $("<p id='" + ids.popupdialogerrorid + "' class='xp-ErrorMsg'><b></b></p>");
            $errorp.hide();
            $firstdiv.append($errorp);

            var $seconddiv = $("<div />");
            var onlinehtml = "";
            var offlinehtml = "";
            onlinehtml += "<div>";
            onlinehtml += "Online (In-System)<input type=checkbox id=" + ids.popupcheckboxid;

            if (opts.isonline == "true") {
                onlinehtml += " checked ";
            }
            onlinehtml += " />";
            onlinehtml += "</div>";
            offlinehtml += "<div>";
            offlinehtml += "Offline (Email)<select id=" + ids.popupddlid + ">";
            $.each(ddloptions, function () {
                offlinehtml += "<option value=" + this.value + "";
                if (opts.offline == this.text) {
                    offlinehtml += " selected ";
                }
                offlinehtml += ">" + this.text + "</option>";
            });
            offlinehtml += "</select>";
            offlinehtml += "</div>";

            $popup.append($firstdiv);
            $popup.append(onlinehtml);
            $popup.append(offlinehtml);
            $("#" + maindivId).append($popup);
            return $popup;
        }

        function CreateNotifyMeDialog() {
            var $popup = CreatePopUp();
            $popup.attr("title", "Notify Me");
            $popup.dialog({
                bgiframe: true,
                autoOpen: false,
                width: 450,
                modal: true,
                buttons: {
                    'Submit': function () {

                        if (opts.configid == 0) {
                            AddNotification();
                        }
                        else {
                            RemoveNotification();
                        }
                    },
                    Cancel: function () {
                        $(this).dialog('close');
                    }
                }
            });
        }

        function createNotifyMeImg() {
            var html = "";
            if (opts.configid != 0) {
                AddRemoveImg();
            }
            else {
            	html = "<img id='" + ids.imgid + "' src='/_layouts/Images/XpointBase/forum_Notifyme.png' alt='Subscribe' title='Subscribe' style='cursor:pointer'/>"
                $("#" + maindivId).append(html);
                $("#" + ids.imgid).click(function () {
                    $("#" + ids.popupdialogid).dialog('open');
                });
            }
        }

        function GetImageAlt() {
            var alttext = "";
            if (opts.isonline) {
                alttext += 'Online';
            }
            if (opts.offline != "None") {

                if (alttext.length > 0) {
                    alttext += ",";
                }
                alttext += opts.offline + " email";
            }
            return alttext;
        }

        return this.each(function () {
            var $this = $(this);
            maindivId = $this.attr('id');
            CreateNotifyMeDialog();
            createNotifyMeImg();
        });
    }
})(jQuery);

