(function ($) {
    $.fn.changeLanguage = function (options) {
        var defaults = {
            selectedLangauge: 'en'
        };
        var opts = $.extend(defaults, options);
        var html;

        return this.each(function () {
            var currentLang;
            /*ajax call to get the current session language*/
            $.ajax({
                url: "/_layouts/IImpact.Web/ProfileWebService.asmx/GetCurrentSessionLanguage",
                contentType: "application/json; charset=utf-8",
                type: "Post",
                dataType: "json",
                async: false,
                data: "{}",
                success: function (datap) {
                    currentLang = datap.d;
                }
            });

            html = "<select id='selectLanguageID'><option value='en'>English</option><option value='fr'>Française</option></select>";

            $(this).append(html);
            $("#selectLanguageID option").each(function () {
                if ($(this).val() == currentLang)
                    $(this).attr("selected", "selected");
            });

            $('#selectLanguageID').change(function () {
                var selectedLanguage = $(this).children("option:selected").val();
                /*ajax call to set the session*/
                $.ajax({
                    url: "/_layouts/IImpact.Web/ProfileWebService.asmx/SelectedLanguage",
                    contentType: "application/json; charset=utf-8",
                    type: "Post",
                    dataType: "json",
                    async: false,
                    data: "{currentLanguage:'" + selectedLanguage + "'}",
                    success: function (datap) {
                        location.reload(true);
                    }
                });
            });
        });
    }
})(jQuery);