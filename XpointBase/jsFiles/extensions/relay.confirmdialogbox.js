var onceLoaded = false;
; (function($) {

    $.fn.confirmaction = function(options) {
        var defaults = {
            confirmmessage: "",
            clientid: ""
        };
        var options = $.extend(defaults, options);
        var $confirmDialog = $("#" + "confirmdialog");

        function CreateConfirmDialog() {
            if ($confirmDialog.length > 0) {
                $confirmDialog.children().remove();
                $confirmDialog.remove();
            }

            var html = "";
            $confirmDialog = $("<div id='" + "submitdialogid" + "' title='Confirm' />");
            html += "<div style='height:60px;' class='xp-FloatLeft xp-Overflowhidden'><table border=0 width=100% cellspacing=0 cellpadding=6><tbody>";
            html += "<tr><td height='40px'>Are you sure you want to delete?</td>";
            html += "</tbody></table></div>";

            $confirmDialog.html(html);
            $confirmDialog.dialog('destroy');
            $('body').append($confirmDialog);
            $confirmDialog.dialog
                 ({
                     autoOpen: false,
                     width: 450,
                     buttons:
                        {
                            Cancel: function() {
                                $(this).dialog('destroy');

                            },
                            'Delete': function() {
                                /*executes the postback and the event handler for the OnClick event will be processed*/
                                eval($("#" + options.clientid).val());
                                $(this).dialog('close');
                            }
                        },
                     close: function() {
                         $(this).dialog('destroy');

                     }
                 });

            return $confirmDialog;
        } /*end of CreateConfirmDialog*/

        return this.each(function() {
            if (!onceLoaded) {

                var elem = $(this);
                elem.click(function() {
                    /*gets the client id of the hidden field correspnding to the server side delete button*/
                    options.clientid = $("input[type='hidden']", elem.parent()).attr('id');
                    onceLoaded = true;
                    /*Creates the confirm dialog box*/
                    CreateConfirmDialog();
                    /*Open dialog box*/
                    $confirmDialog.dialog('open');
                });
            }

        });
    };

})(jQuery);