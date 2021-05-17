; (function ($) {

    $.fn.fr_duplicateLifecycle = function (options) {
        var defaults = {
            iconUrl: "",
            serviceUrl: "/_layouts/IImpact.Web/LifeCycleService.asmx/",
            message: "La duplication prendra quelques minutes à mesure que toutes les données sont déplacées. Vous serez averti quand cela sera fait.",
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
                $actionImg = $("<div id='" + $div.attr('id') + "actionimg' title='Article en double' ></div>")
                .attr("class", options.iconUrl)
                .click(function () {
                    if ($(".ui-widget-overlay").length == 0) {
                        $(".ui-widget-overlay").css("display", "block");
                    }
                    createDialog(container);
                    $dialog.dialog('open');
                });
            }
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
            $dialog = $("<div id='" + "actiondialog" + "' title='Article en double' />");
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
                    text: 'Dupliquer',
                    id: ids.primarybutton,
                    click: function () {
                        $(".ui-dialog-buttonset").hide();
                        $("#messageId").empty();
                        $(".xp-IconLCDuplicate").css("display", "none");
                        $('.ui-dialog-title').empty();

                        $('.ui-dialog-title').text("Duplication de l'article");
                        $(".ui-icon-closethick").hover(function () {
                            $(this).css('cursor', 'pointer').attr('title', 'La duplication de l\'article est en cours. Vous pouvez cliquer ici pour fermer la fenêtre et poursuivre d\'autres tâches. Une fois le processus de duplication terminé, nous vous mettrons à jour sur la page d\'accueil. Sinon, accrochez-vous ici.');
                        }, function () {
                            $(this).css('cursor', 'auto');
                        });

                        $("#messageId").text("La duplication est en cours et prendra quelques minutes.");
                        $("#mainTableId").append($("<tr><td><center><img src='/_layouts/IMAGES/Xpointbase/xpoint-progress-bar.gif' width='350px'/></center></td></tr>"));
                        $('#' + ids.primarybutton).attr('disabled', true);
                        $('#' + ids.secondarybutton).attr('disabled', true);

                        $.ajax({
                            url: options.serviceUrl + "Duplicate", contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{trackerid:'" + options.trackerid + "'}",
                            success: function (datap, st) {
                                var data = datap.d;
                                if (data != "") {
                                    $('.ui-dialog-title').text("Succès - l'article est dupliqué!");
                                    $("#mainTableId").empty();
                                    $("#mainTableId").append($("<p>L'élément en double est accessible ici:</p>"));
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
                    text: 'Annuler',
                    id: ids.secondarybutton,
                    click: function () {
                        $.relayloading("hide");
                        $(this).dialog('close');
                    }
                }]
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