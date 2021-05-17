; (function ($) {

  $.fn.genericdialog = function (options) {

    var defaults = {
      action: "",
      iconUrl: "",
      serviceUrl: "/_layouts/IImpact.Web/",
      serviceName: "",
      message: "",
      buttonText: "Proceed,Cancel",
      errorMessage: "",
      param1: "",
      param2: "",
      param3: "",
      trackerid: ""
    };

    var options = $.extend(defaults, options);
    var $div = $(this);
    var $dialog = $("#" + "actiondialog");
    var ids = { errimage: "xpointerrorimageid",
                primarybutton: $(this).attr('id') + "primarybuttonid",
                secondarybutton: $(this).attr('id') + "secondarybuttonid" };

    /*Error message div*/
    var $errordiv = $("#" + ids.errimage + "errordiv");
    $errordiv = $("<div id= '" + ids.errimage + "errordiv' class='xp-ErrorMsg'/>");
    $errordiv.hide();
    $($('.xp-PhaseActivitydiv').parents().get(0)).prepend($errordiv);
    $errordiv.hide();
    $errordiv.html("");
    /*end error message div*/

    function Action(container) {
      var $actionImg = $("#" + $div.attr('id') + "actionimg");
      if ($actionImg.length == 0) {
         $actionImg = $("<div  id='" + $div.attr('id') + "actionimg' title='" + options.action + "' ></div>")
                   .attr("class", options.iconUrl)
                   .click(function () {
                     CreateDialog(container);
                     $dialog.dialog('open');
                   });
      }
      var imgcontainer = $("<div class='xp-FloatLeft xp-Margin-0' />").append($actionImg).prependTo($div);

    } /*end of Action*/

    function CreateDialog(elem) {
      if ($dialog.length > 0) {
        $dialog.children().remove();
        $dialog.remove();
      }
      var btnText = options.buttonText.split(',');

      var html = "";
      $dialog = $("<div id='" + "actiondialogid" + "' title='" + options.action + "' />");
      html += "<div class='xp-FloatLeft xp-Overflowhidden xp-Height-60'><table border=0 width=100% cellspacing=0 cellpadding=6><tbody>";
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
            text: btnText[0],
            id: ids.primarybutton,
            click: function() {
              $('#' + ids.primarybutton).attr('disabled', true);
              $('#' + ids.secondarybutton).attr('disabled', true);
              $.relayloading("show");
              $.ajax({ url: options.serviceUrl + options.serviceName, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{trackerid:'" + options.trackerid + "'}",
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
                text: btnText[1],
                id: ids.secondarybutton,
                click: function() {
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
      Action($this);
    });

  } /*end of Main function*/
})(jQuery);