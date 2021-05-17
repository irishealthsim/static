(function ($) {

    $.fn.myforums = function (options) {

        var defaults = {
            gridid: ""
        };

        var ids = {

    };

    //extend the default settings with the options specified and put them in opts
    var opts = $.extend(defaults, options);


    return this.each(function () {
        var $this = $(this);
        var ddl = "<div class='xp-CustomBgClr-Light'><select id='ddlid'><option value='Initiated'>I Initiated</option><option value='Participated'>I Participated</option></select></div>";
        $this.append(ddl);
        $("#ddlid").change(function () {
            var $gridid = $("#" + options.gridid);
            $gridid.setGridParam({ postData: { myforumtype: $(this).val()} });
            $gridid.trigger("reloadGrid");
        });



    });

}

})(jQuery);


