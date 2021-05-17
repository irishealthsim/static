(function ($) {

    $.fn.AddAuditFiles = function (options) {

        var defaults = {
            serviceUrl: '/_layouts/IImpact.Web/ThemeService.asmx/'
        };
        opts = $.extend(defaults, options);

        function createHtml(mainContainer) {

            /*Outer background layout*/
            var outerBackground = $("<div class='outerBackground' />")
            /*create the outer layout*/
            var outerLayout = $("<div class='auditouterlayout' />");

            /*create inner layout*/

            var innerLayout = $("<div class='auditinnerlayout' />");
            /*Text layout*/
            var textMessage = $("<p>Browse Audit file to create improvement items</p>");
            var submitButton = $("<center><a  id='uploadFile' class='browseAuditFile'>Browse & Upload</a></center>");

            var StatusMessage = $("<p id='statusId' style='display:none;' >Audit projects have been created successfully!! </p>");
            innerLayout.append(textMessage);
            innerLayout.append(submitButton);
            innerLayout.append(StatusMessage);
            outerLayout.append(innerLayout);
            outerLayout.append(innerLayout);
            outerBackground.append(outerLayout);
            mainContainer.append(outerBackground);


            /*Start of upload function*/
            var uploadObject;
            /*call ajaxUpload method of jqery to upload file*/
            var path = '/_layouts/IImpact.Web/Geo/UploadAuditFiles.asmx/ImportFile';

            $('#uploadFile').live('click', function (e) {


                uploadObject = new AjaxUpload($("#uploadFile"), {
                    action: path,
                    autoSubmit: true,
                    name: 'UploadAuditFile',
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    responseType: "json",
                    onComplete: function (file, response) {
                        $(".auditoverlay");
                        $("#statusId").css("display", "block").fadeOut(10000);


                    },
                    /* Validating the file among the accepted extensions or not*/
                    onSubmit: function (file, ext) {
                        /*create overlay on body of th page*/
                        var overLayMainDiv = $("<div class='auditoverlay'/>");
                        var loadingImage = $("<img src='/_layouts/Images/Xpoint.client/Geo/xp-loading.gif' width='10%'' class='auditgif'></img>");
                        var loadingText = $("<p class='auditloadingText'></p>");
                        overLayMainDiv.append(loadingImage);
                        overLayMainDiv.append(loadingText);
                        /*load the loader at the center of the page*/
                        $("body").append(overLayMainDiv);

                    },
                    /*When user selects a file,Show the filename in textbox*/
                    onChange: function (file, extension) {
                        console.log("onchange");

                        uploadObject.setData({
                            'rowId': 4,
                            'trackerId': 8
                        });
                        console.log("File: " + file);
                    }
                }); //end ajax upload
                uploadObject.submit();
            });
            /*end of ajax upload code ends*/
            $("#uploadFile").trigger("click");

            /*end of upload function*/
            /*End of function craete html*/
        }


        return this.each(function () {
            var $this = $(this);
            createHtml($this);
        });
    };
})(jQuery);