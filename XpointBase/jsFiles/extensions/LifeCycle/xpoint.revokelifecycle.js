; (function ($) {

  $.fn.revokeLifecycle = function (options) {
    var defaults = {
      iconUrl: "",
      serviceUrl: "/_layouts/IImpact.Web/LifeCycleService.asmx/",
      message: "Are you sure you want to revoke the cancellation?",
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

    function revoke(container) {
      var $actionImg = $("#" + $div.attr('id') + "actionimg");
      if ($actionImg.length == 0) {
        $actionImg = $("<div  id='" + $div.attr('id') + "actionimg' title='Revoke Item' />")
                   .attr("class", options.iconUrl)
                   .click(function () {
                     createDialog(container);
                     $dialog.dialog('open');
                   });
      }
      var imageContainer = $("<div class='xp-FloatLeft xp-HoverCursor xp-Margin-0'/>").append($actionImg).prependTo($div);

    } /*end of Revoke*/

    function createDialog(elem) {
      if ($dialog.length > 0) {
        $dialog.children().remove();
        $dialog.remove();
      }

      var html = "";
      $dialog = $("<div id='" + "actiondialogid" + "' title='Revoke' />");
      html += "<div class='xp-FloatLeft xp-Height-60 xp-Overflowhidden' ><table border=0 width=100% cellspacing=0 cellpadding=6><tbody>";
      html += "<tr><td height='40px'>" + options.message + "</td>";
      html += "</tbody></table></div>";

      $dialog.html(html);
      $('body').append($dialog);

      $dialog.dialog
        ({
          autoOpen: false,
          width: 450,
          bgiframe: false,
          modal: true,
          buttons: [
          {
            text: 'Revoke',
            id: ids.primarybutton,
            click: function () {
              $('#' + ids.primarybutton).attr('disabled', true);
              $('#' + ids.secondarybutton).attr('disabled', true);
              $.relayloading("show");
              $.ajax({ url: options.serviceUrl + "Revoke", contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{trackerid:'" + options.trackerid + "'}",
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
              });
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
      revoke($this);
    });

  } /*end of Main function*/

})(jQuery);