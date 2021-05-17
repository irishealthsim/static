var onceloaded = false;
(function ($) {

    /*This Plugin creates ecoach content for the given div container with set of configuration items*/
    $.fn.ecoach = function (options) {

        var defaults = {
            html: "",
            isattachment: false,
            fileurl: "",
            geturl: "/_layouts/IImpact.Web/ECoachService.asmx/GetECoachItem",
            uniquekey: "",
            imageurl: "xp-IconEcoach xp-Icon",
            needloading: true,
            title: "",
            baseid: "",
            dialogwidth: 300,
            dialogheight: "auto"
        };
        var classes = {
            ecoach: 'xp-IconEcoach xp-Icon'
        };

        /*extend the defaults with options*/
        var options = $.extend(defaults, options);

        function BuildHtml(container) {
            /*create dialog incase ecoach is not an attachment*/
            if (!options.isattachment) {
                var html = $("<div/>").html(options.html).text();
                var dialogdiv = $("<div id='" + options.baseid + "_ecoachcontainer'/>");
                dialogdiv.attr('title', options.title);
                dialogdiv.html($("<div/>").html(html).text());
                dialogdiv.hide();
                $('body').append(dialogdiv);
                dialogdiv.dialog({
                    autoOpen: false,
                    height: options.dialogheight,
                    width: options.dialogwidth,
                    modal: true
                });
            }

            var html = $("<div/>").html(options.html).text();
            var img = $("<div class='tooltipEcoach'><i class='fa fa-info-circle fa-1x xpEcoach' ></i><span class='tooltiptextEcoach' style='bottom: 100%;'>" + html + "</span></div>");

            container.append(img);
        }
        /*Start of return call*/
        return this.each(function () {
            var $this = $(this);
            if ($this.attr('ecoachenabled')) {
                return false;
            }
            $this.attr('ecoachenabled', "true");
            this.options = options;
            options.baseid = $this.attr('id');
            /*check if loading is required  if yes do the ajax call else proceed with rendering*/
            if (options.needloading) {
                $.ajax({
                    url: options.geturl,
                    contentType: "application/json; charset=utf-8",
                    type: "post",
                    dataType: "json",
                    data: "{uniquekey:'" + options.uniquekey + "'}",
                    success: function (datap, st) {
                        if (datap.d) {
                            var data = datap.d;
                            options.html = data.Html;
                            options.fileurl = data.FileUrl;
                            options.isattachment = data.IsAttachment;
                            options.title = data.Title;
                            BuildHtml($this);
                        }
                    }
                });
            } else {
                BuildHtml($this);
            }
        });
        /*end of return call*/
    };

})(jQuery);