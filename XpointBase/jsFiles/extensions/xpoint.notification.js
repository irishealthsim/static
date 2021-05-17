(function ($) {
    $.notification = $.notifcation || {};
    $.fn.notification = function (options) {
        //logic  for calling method which are under notification nameSpace
        if (!this || this.length == 0) return;
        if (typeof (options) == "object") {
            var elem = $(this);
            options = $.extend({}, $.notification.defaults, options);
            elem.notifyOpts = options;
            $.notification.methods.init.apply(this, $.makeArray(options));
        }
        if ($.notification.methods[options]) {
            var notificationOptions = elem.notifyOpts;
            notificationOptions = $.extend(notificationOptions, Array.prototype.slice.call(arguments, 1));
            return $.notification.methods[options].apply(this, $.makeArray(notificationOptions));
        }
    };
    $.notification = {
        defaults: {
            paths: {
                addAlertsUrl: "/_layouts/IImpact.Web/NotificationService.asmx/AddAlert",
                removeAlertsUrl: "/_layouts/IImpact.Web/NotificationService.asmx/RemoveAlert"
            },
            cssClass: {
                unSubscribeImage: "xp-Icon-Highlight xp-IconSub",
                subscribeImage: "xp-Icon-Highlight  xp-IconUnSub"
            }
        },
        ids: {
            notificationImage: 'notification'
        },
        /*
        *method Array for this plugin
        */
        methods: {
            /*
            *Entry Point to this Plugin
            */
            init: function (options) {
                var elem = $(this);
                $.notification.methods.createHtml.apply(elem, $.makeArray(options));
                $("#" + $.notification.ids.notificationImage).click(function () {
                    $.notification.methods.toggleSubscription.apply(this, $.makeArray(options));
                });
            },
            toggleImg: function (img, alertAdded, options) {
                if (img == null) {
                    img = $("#" + $.notification.ids.notificationImage);
                }
                var css = options.cssClass.unSubscribeImage;
                title = "Subscribe";
                if (alertAdded === true) {
                    css = options.cssClass.subscribeImage;
                    var title = "UnSubscribe";
                }
                img
				 .attr('class', css)
				 .attr('title', title);
            }, //ends toggleImg
            /*
            *CreatesHtml to display notificationImage
            */
            createHtml: function (options) {
                var elem = $(this);
                var html = "";
                if (options.subscribePermissionValue == 0) {
                    var img = $("<div id='" + $.notification.ids.notificationImage + "' class='" + options.cssClass.unSubscribeImage + "' style='cursor:pointer'/>")
                      .appendTo(elem);
                }
                else if (options.subscribePermissionValue == 1) {
                    var img = $("<div id='" + $.notification.ids.notificationImage + "' class='" + options.cssClass.subscribeImage + "' style='cursor:pointer'/>")
                      .appendTo(elem);
                }
            },
            /*
            *Toggles the Image & subscription and calls the relevant
            *webmethod to create/remove SPAlert
            */
            toggleSubscription: function (options) {
                if (options.alertAdded === true) {
                    $.notification.methods.unSubscribe.apply(this, $.makeArray(options));
                }
                else {
                    $.notification.methods.subscribe.apply(this, $.makeArray(options));
                }
            },
            /*
            *Subscribes for the Alert functionality
            */
            subscribe: function (options) {
                var cssClass = $(this).attr("class");
                var permissionValue;
                if (cssClass == options.cssClass.subscribeImage) {
                    permissionValue = 0;
                }
                else { permissionValue = 1; }

                $.ajax({
                    url: "/_layouts/IImpact.Web/LCNotificationService.asmx/AddSubscription",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: "{ permissionValue:'" + permissionValue + "', TrackerID:'" + options.TrackerID + "'}",
                    type: "POST",
                    success: function (data) {
                        var status = data.d;
                        if (status == "success") {
                            var img = $("#" + $.notification.ids.notificationImage);
                            var cssClass = img.attr('class');
                            if (cssClass == options.cssClass.subscribeImage) {
                                img.attr('class', options.cssClass.unSubscribeImage).attr('title', "UnSubscribe");
                            }
                            else { img.attr('class', options.cssClass.subscribeImage).attr('title', "Subscribe"); }
                        }
                    }
                });
            },
            /*
            *Unsubscribe for alert functionality
            */
            unSubscribe: function (options) {
                $.ajax({
                    url: options.removeAlertsUrl,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    type: "POST",
                    data: "{ componentName: '" + options.componentname + "' ,subCategory: '" + options.subCategory + "',uniqueId: '" + options.uniqueid + "', processExcludedList:" + options.processExcludedList + "}",
                    success: function (data) {
                        var status = data.d;
                        if (status == "success") {
                            options.alertAdded = false;
                            $.notification.methods.toggleImg(null, false, options);
                        }
                        else { $.notification.methods.toggleImg(null, true, options); }
                    }
                });
            }
        }//end of method array
    }; //end notification namespace
})(jQuery);