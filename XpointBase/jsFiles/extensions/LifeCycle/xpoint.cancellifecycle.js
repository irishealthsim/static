; (function ($) {

  $.fn.cancelLifecycle = function (options) {
    var defaults = {
      iconUrl: "",
      serviceUrl: "/_layouts/IImpact.Web/LifeCycleService.asmx/",
      message: "Please provide the reason for cancelling",
      errorMessage: "Please enter Cancel Reason",
      trackerid: ""
    };

    var options = $.extend(defaults, options);
    var $div = $(this);
    var $dialog = $("#" + "actiondialog");
    var ids = {
      errimage: $(this).attr('id') + "xpointerrorimageid",
      validateinput: $(this).attr('id') + "xpointvalidateinputid",
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

    function cancel(container) {
      var $actionImg = $("#" + $div.attr('id') + "actionimg");
      if ($actionImg.length == 0) {
        $actionImg = $("<div  id='" + $div.attr('id') + "actionimg' title='Cancel Item' ></div>")
                   .attr("class", options.iconUrl)
                   .click(function () {
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
      $dialog = $("<div id='" + "actiondialog" + "' title='Cancel' />");
      $dialog.append($errorp);

      html += "<div class='xp-FloatLeft xp-Width'><table border=0 width=100% cellspacing=0 cellpadding=6><tbody>";
      html += "<tr><td>" + options.message + "</td></tr>";
      html += "<tr><td><textarea id= 'textentered' rows='3' cols='60'></textarea></td></tr>";
      html += "</tbody></table></div>";

      $firstdiv.append(html);
      $dialog.append($firstdiv);
      $('body').append($dialog);

      $dialog.dialog
      ({
        autoOpen: false,
        width:'450px',
        bgiframe: false,
        modal: true,
        buttons: [
        {
          text: 'Proceed',
          id: ids.primarybutton,
          click: function () {
            var text = $('#textentered').val().replace(/'/g, '');
            if (text == "") {
              $errorp.show();
            }
            else {
              $('#' + ids.primarybutton).attr('disabled', true);
              $('#' + ids.secondarybutton).attr('disabled', true);
              $.relayloading("show");
              $.ajax({ url: options.serviceUrl + "Cancel", contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{trackerid:'" + options.trackerid + "', reason:'" + text + "'}",
                success: function (datap, st) {
                  var data = datap.d;
                  if (data.Status == "success") {
                    window.location.reload(false);
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
      cancel($this);
    });

  } /*end of Main function*/

})(jQuery);