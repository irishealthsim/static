; (function ($) {

    $.fn.similarideas = function (options) {

        var defaults = {
            url: "",
            textboxid: "",
            cssClass: "textboxcss",
            resultcontainerid: $(this).attr('id') + "resultcontainer"
        };
        var options = $.extend(defaults, options);
        if ($.trim(options.textboxid).length > 0) {
            $textbox = $("#" + options.textboxid);
        }
        else {
            $textbox = $("." + options.cssClass);
        }
        $this = $(this);
        $result = $("#" + options.resultcontainerid);
        function createContainer() {
            $this.html("");
            var SimalarIdeaContainer = $("<div class='xp-Overflowhidden xp-ClearBoth xp-Padding-4'/>");           
            if ($result.length == 0) {
                $result = $("<div id='" + options.resultcontainerid + "' class='xp-SimilarIdeaBody  xp-ClearBoth' />");

            }
            SimalarIdeaContainer.append($result);
            $this.append(SimalarIdeaContainer);
						$(".xp-CreateNewForm").removeClass("xp-Width").addClass("xp-Width75");
						$(".xp-SimiliarDiv").fadeIn("slow");

        }
        function clearResultContainer() {
            if ($result.length >= 0) {
                $result.html("");
            }
        }
        function getSimilarIdeas() {
            $this.html("");
            $.ajax({ url: options.url, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{input:'" + $textbox.val() + "'}",
                success: function (datap, st) {
                    var data = datap.d;
                    if (data != "") {
                        createContainer();
                        clearResultContainer();
                        $result.html(data);
                    }
                }
            });
        }

        return this.each(function () {

            if ($textbox.length > 0 && $textbox[0].tagName == "TEXTAREA") {
                $textbox.keyup(function () {
                    $this.html("");
                    if ($textbox.val().length > 10) {
                        getSimilarIdeas();
                    }
										else{
										$(".xp-CreateNewForm").removeClass("xp-Width75").addClass("xp-Width");
										$(".xp-SimiliarDiv").fadeOut("slow");
										}

                });
            }
        });
    }
})(jQuery);