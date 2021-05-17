/*
* Plugin shows community stats
*/
; (function ($) {

    $.fn.communityStats = function (options) {
        /*set up defaults*/
        var defaults = {
            geturl: '/_layouts/IImpact.Web/ChatService.asmx/GetCommunityStats',
            headerText: 'Community Stats',
            editable: false
        };
        /*extend the defaults*/
        var statsOptions = $.extend(defaults, options);
        var ids = {
            header: 'communityHeaderElem',
            container: 'communityContainerElem'
        };
        /************************** start of method ***********************/
        /*****Override the ids so that plugin can be used multiple times on the page************/
        function prepareIds(baseid) {
            ids.header += baseid;
            ids.container += baseid;
        }
        /***************************end of method ************/
        /****************Start of return each method **********/
        return this.each(function () {
            var elem = $(this).width("100%");
            prepareIds(elem.attr('id'));
            var headerDiv = $("<div id='" + ids.header + "'/>").append(statsOptions.headerText);
            var contentDiv = $("<div id='" + ids.container + "'/>");
            elem.xpointbox({ 'headerContainer': "", 'contentContainer': contentDiv, headerWidth: '97%' });
            $.ajax({ url: statsOptions.geturl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{}",
                success: function (datap, st) {
                    if (datap.d) {
                        var data = datap.d;
                        $(data).each(function (i) {
                            var stat = data[i];
                            var html = "<div class='xp-MainContent xp-FloatLeft'>";
                            html += "<div class='xp-Statsdiv xp-BodyLink xp-FloatLeft' >";
                            html += "<div class='xp-StatsBorder xp-GrayBackground'>";
                            /*To do place to show trends*/
                            //html += "<div style='border: 0px solid black;text-align:right'></div>";
                            html += "<div class='xp-Font xp-StatsCount'>" + stat.count + "</div>";
                            html += "<div class='xp-FontLite xp-StatsTitle' align='center'>" + stat.name + "</div>";
                            html += "</div>";
                            if (!stat.isadmincheck) {
                                html += "<div><input autocomplete='off' style='color:#FFFFFF!important;display:none' type='button' value='add' class='ui-primarytabclr ui-corner-all xp-Width' onclick=location.href='" + stat.pageurl + "' /></div>";
                            }
                            else{
                             if(statsOptions.editable)
                             {
                                 html += "<div><input autocomplete='off' style='color:#FFFFFF!important;display:none' type='button' value='add' class='ui-primarytabclr ui-corner-all xp-Width' onclick=location.href='" + stat.pageurl + "' /></div>";
                             }
                            }
                            html += "</div>";
                            contentDiv.append(html);
                        });
                    }
                }
            });
        });
        /************** end of return method *************/
    }

})(jQuery);