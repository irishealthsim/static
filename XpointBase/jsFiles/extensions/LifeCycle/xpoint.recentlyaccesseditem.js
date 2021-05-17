(function ($) {
    $.fn.Recentlyaccesseditem = function (options) {
        var defaults = {

    };

    var opts = $.extend(defaults, options);

    function createhtml(id) {
        /*create a layout and append the value to htmlobj*/
        var mainContainer = $("<div class='tini-time-line Tip-HPRecentlyAccessedItem' id='Outerlayout' >");
        $(mainContainer).appendTo("#recentlyAccessedProjectId");
        var outerlayout = $(".tini-time-line").attr("id");
        getRecentlyAccessedItem(outerlayout);
    }
    function getRecentlyAccessedItem(outerlayout) {

        $.ajax({
            url: '/_layouts/IImpact.Web/RecentlyAccessedItemService.asmx/GetRecentlyAccessedItem',
            contentType: "application/json; charset=utf-8",
            type: "POST",
            dataType: "json",
            success: function (datap) {
                var result = datap.d;
                if (result.length === 0) {
                    var imagediv = ("<ul class='timeline'>");
                    imagediv += ("<li>");
                    imagediv += ("<div class='timeline-badge info'><i class='fa fa-folder-open'></i></div>");
                    imagediv += ("<div class='timeline-panel'>");
                    imagediv += ("<div class='timeline-heading'><h4 class='timeline-title'>There are no recently accessed items</h4></div>");
                    imagediv += ("<div class='timeline-body'></div>");
                    imagediv += ("</div>");
                    imagediv += ("</li>");
                    imagediv += ("</ul>");
                    $("#" + outerlayout).append(imagediv);
                }
                else {
                    var imagediv = ("<ul class='timeline'>");
                    $.each(result, function (i) {
                        imagediv += ("<li>");
                        imagediv += ("<div class='timeline-badge info'><i class='fa fa-folder-open'></i></div>");
                        imagediv += ("<div class='timeline-panel'>");
                        imagediv += ("<div class='timeline-heading'><h4 class='timeline-title'><a href=" + result[i].ProjectUrl + "> " + result[i].ProjectTitle + " </a></h4></div>");
                        imagediv += ("<div class='timeline-body'></div>");
                        imagediv += ("</div>");
                        imagediv += ("</li>");
                    });
                    imagediv += ("</ul>");
                    $("#" + outerlayout).append(imagediv);
                }
            }
        });
    };

    return this.each(function () {
        var elem = $(this);
        createhtml(elem);
    });
}
})(jQuery);

