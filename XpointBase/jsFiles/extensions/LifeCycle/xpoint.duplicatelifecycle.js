; (function ($) {

    $.fn.duplicateLifecycle = function (options) {
        var defaults = {
            iconUrl: "",
            serviceUrl: "/_layouts/IImpact.Web/DuplicateItemDataService.asmx/",
            message: "Duplication will take a few minutes as all the data is moved across. You will be notified when it is done.",

            trackerid: ""
        };

        var options = $.extend(defaults, options);
        var $div = $(this);
        var $dialog = $("#" + "actiondialog");
        var ids = {
            errimage: $(this).attr('id') + "xpointerrorimageid",
            primarybutton: $(this).attr('id') + "primarybuttonid",
            secondarybutton: $(this).attr('id') + "secondarybuttonid"
        };

        /*Error message div*/
        var $errordiv = $("#" + ids.errimage + "errordiv");
        $errordiv = $("<div id= '" + ids.errimage + "errordiv' class='xp-ErrorMsg'/>");
        $errordiv.hide();
        $($('.xp-PhaseActivitydiv').parents().get(0)).prepend($errordiv);
        $errordiv.hide();
        $errordiv.html("");
        /*end error message div*/

        function duplicate(container) {
            var $actionImg = $("#" + $div.attr('id') + "actionimg");
            if ($actionImg.length == 0) {
                $actionImg = $("<div id='" + $div.attr('id') + "actionimg' title='Duplicate Item' ></div>")
                .attr("class", options.iconUrl)
                .click(function () {

                    if ($(".ui-widget-overlay").length == 0) {
                        $(".ui-widget-overlay").css("display", "block");
                    }



                    createDialog(container);
                    $dialog.dialog('open');
                });
            }
            if ($(".ui-widget-overlay").length == 0) {
                $(".ui-widget-overlay").css("display", "block");
            }

            //createDialog(container);
            //$dialog.dialog('open');
            var imageContainer = $("<div class='xp-FloatLeft xp-HoverCursor xp-Margin-0' />").append($actionImg).prependTo($div);
            var imageContainer = $("<div class='xp-FloatLeft xp-HoverCursor xp-Margin-0' />").append($actionImg).prependTo($div);

        } /*end of Action*/

        function createDialog(elem) {
            if ($dialog.length > 0) {
                $dialog.children().remove();
                $dialog.remove();
            }

            $errorp = $("<div id='" + ids.validateinput + "' class='xp-ErrorMsg xp-FloatLeft'/>");
            $errorp.append(options.errorMessage);
            var $firstdiv = $("<div />");
            var html = "";
            $dialog = $("<div id='" + "actiondialog" + "' title='Duplicate the Item' />");
            $dialog.append($errorp);

            html += "<div class='xp-FloatLeft xp-Width'><table id='mainTableId' border=0 width=100% cellspacing=0 cellpadding=6><tbody>";
            html += "<tr><td id='messageId' >" + options.message + "</td></tr>";

            html += "</tbody></table></div>";

            $firstdiv.append(html);
            $dialog.append($firstdiv);
            $('body').append($dialog);

            $dialog.dialog
            ({
                autoOpen: false,
                width: '450px',
                bgiframe: false,
                modal: true,
                buttons: [
                {
                    text: 'Duplicate',
                    id: ids.primarybutton,
                    click: function () {
                        var text = "Prade";
                        $(".ui-dialog-buttonset").hide();

                        $("#messageId").empty();
                        $(".xp-IconLCDuplicate").css("display", "none");
                        $('.ui-dialog-title').empty();

                        $('.ui-dialog-title').text("Duplicating the Item");
                        $(".ui-icon-closethick").hover(function () {
                            $(this).css('cursor', 'pointer').attr('title', 'Duplictaing the item is underway. You can click here to close the window and continue with other tasks. Once the process for duplication is completed then we will update you on home page. Else hang on here');
                        }, function () {
                            $(this).css('cursor', 'auto');
                        });


                        $("#messageId").text("Duplication is underway and will take a few minutes.");
                        $("#mainTableId").append($("<tr><td><center><img src='/_layouts/IMAGES/Xpointbase/xpoint-progress-bar.gif' width='350px'/></center></td></tr>"));

                        $('#' + ids.primarybutton).attr('disabled', true);
                        $('#' + ids.secondarybutton).attr('disabled', true);

                        $.ajax({
                            url: options.serviceUrl + "Duplicate", contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{trackerid:'" + options.trackerid + "'}",
                            success: function (datap, st) {
                                var data = datap.d;


                                if (data != "") {
                                    $('.ui-dialog-title').text("Success - the Item is Duplicated!");

                                    $("#mainTableId").empty();

                                    $("#mainTableId").append($("<p>The duplicate item can be accessed here:</p>"));
                                    $("#mainTableId").append($("<p style='font-size:20px;'>" + data + "</p>"));


                                    $(".xp-IconLCDuplicate").css("display", "block");


                                }
                                else {
                                    $('#' + ids.primarybutton).attr('disabled', false);
                                    $('#' + ids.secondarybutton).attr('disabled', false);
                                    $.relayloading("hide");
                                    $errordiv.html(data.Message);
                                    $errordiv.show();
                                    $("#" + ids.errimage + "errordiv").focus();
                                    $dialog.dialog('close');
                                }
                            }
                        }); /*close ajax*/

                    }
                },
                {
                    text: 'Cancel',
                    id: ids.secondarybutton,
                    click: function () {
                        $.relayloading("hide");
                        $(this).dialog('close');
                    }
                }
                ]
            });
            return $dialog;
        } /*end of CreateDialog*/

        return this.each(function () {
            this.options = options;
            var $this = $(this);
            duplicate($this);
        });

    } /*end of Main function*/

})(jQuery);