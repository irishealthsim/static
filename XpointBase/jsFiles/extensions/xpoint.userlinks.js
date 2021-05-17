(function($) {
    $.xpointUserLinks = $.xpointUserLinks || {};
    $.fn.xpointUserLinks = function(options) {
        this.options = $.extend($.xpointUserLinks.defaults, options);
        $.xpointUserLinks.methods.init.apply(this, $.makeArray(this.options));
    };
    $.xpointUserLinks = {
        defaults: {
            userId: '',
            name: '',
            getLinksUrl: '/_layouts/IImpact.Web/ProfileWebService.asmx/GetUserLinks'
        },
        ids: {
            userSettingsId: "userSettingsDiv",
            userNameId: "userNameDiv",
            linksDivId: "linksDiv",
            supportId: "supportDiv"
        },
        methods: {
            init: function(opts) {
                var elem = $(this);
                $.xpointUserLinks.methods.createHtml.apply(this, $.makeArray(opts));
            }, //end init
            /*
            * Prepare links to be shown on the click of UserName
            */
            prepareLinks: function(opts, container) {
                var html = "";
                $.ajax({
                    url: opts.getLinksUrl,
                    contentType: "application/json; charset=utf-8",
                    type: "post",
                    dataType: "json",
                    data: "{userId:'" + opts.userId + "'}",
                    success: function(datap) {
                        var userLinks = datap.d;
                        $.each(userLinks, function(i) {
                            var link = this;
                            html += "<div tabindex='-1' class='XpMenu xp-BorderTopBlack'><div class='xp-UserSettingsList '><a tabindex='-1' class='xp-DisplayBlock'   href='" + link.LinkUrl + "' >" + link.Link + "</a></div></div>";
                        });
                        //html += "<div tabindex='-1' class=' xp-BorderTopBlack'><div class='xp-UserSettingsList '><a tabindex='-1' class='xp-DisplayBlock'  target='_blank'  id='" + $.xpointUserLinks.ids.supportId + "' href='http://login.vivantioservicedesk.com/Prog/ServiceDesk/SelfService/login.asp?LoginName=SelfService@element8software.com&AccountID=1958429' >Support</a></div></div>";
                        container.html(html);

                        return false;
                    }
                });
            }, // end prepareLinks
            /*
            *Build the html
            */
            createHtml: function(opts) {
                var elem = $(this);
                //elem.attr("class", "xp-FloatRight xp-PositionRelative");
                //elem.attr("style", "z-index:999;");
                var mainDiv = $("<div id='" + $.xpointUserLinks.ids.userSettingsId + "' ></div>");
                var nameDiv = $("<a  id='" + $.xpointUserLinks.ids.userNameId + "' href='#'><span class='xp-text-desktop'>" + opts.name + " " + "</span></a>");
                var linksDiv = $("<div id='" + $.xpointUserLinks.ids.linksDivId + "' />");
                $.xpointUserLinks.methods.prepareLinks(opts, linksDiv);
                nameDiv.append(linksDiv);
                mainDiv.append(nameDiv);
                elem.append(mainDiv);
                $('#' + $.xpointUserLinks.ids.linksDivId + ' a').click(function(e) {
                    e.stopPropagation();
                    return true;
                });
                /*
                * hover on User Name
                */
                /*8$(nameDiv).mouseover(function () {
                $(this).stop().animate({
                height: '160px',
                queue: false,
                duration: 600,
                easing: 'swing'
                });
                });
                $(nameDiv).mouseout(function () {
                $(this).stop().animate({
                height: '23px',
                queue: false,
                duration: 600,
                easing: 'swing'
                });
                });*/
                $(document).keydown(function(e) {
                    if (e.which == 9) {
                        $(nameDiv).mouseover(function() {
                            $(this).stop().animate({
                                height: '160px',
                                queue: false,
                                duration: 600,
                                easing: 'swing'
                            });
                        });
                        $(nameDiv).mouseout(function() {
                            $(this).stop().animate({
                                height: '23px',
                                queue: false,
                                duration: 600,
                                easing: 'swing'
                            });
                        });
                    }
                });
            } //end createHtml
        }
    };
})(jQuery);


