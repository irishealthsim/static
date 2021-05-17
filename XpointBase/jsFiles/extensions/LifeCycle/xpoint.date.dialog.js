; (function ($) {

  $.fn.datedialog = function (options) {

    var defaults = {
      action: "",
      iconUrl: "",
      serviceUrl: "/_layouts/IImpact.Web/",
      serviceName: "",
      message: "",
      buttonText: "Proceed,Cancel",
      errorMessage: "Select a date",
      param1: "",
      param2: "",
      param3: "",
      trackerid: ""
    };

    var options = $.extend(defaults, options);
    var $div = $(this);
    var $dialog = $("#" + "actiondialog");
    var ids = { 
        errimage: $(this).attr('id') + "xpointerrorimageid", 
        selectdate: $(this).attr('id') + "xpointselectdate",
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
      var imgcontainer = $("<div class='xp-FloatLeft xp-HoverCursor xp-Margin-0' />").append($actionImg).prependTo($div);

    } /*end of Action*/

    function CreateDialog(elem) {
      if ($dialog.length > 0) {
        $dialog.children().remove();
        $dialog.remove();
      }

      var btnText = options.buttonText.split(',');

      $errorp = $("<div id='" + ids.validateinput + "' class='xp-ErrorMsg'></div>");
      $errorp.hide();
      $errorp.append(options.errorMessage);

      var $firstdiv = $("<div />");
      var html = "";
      $dialog = $("<div id='" + "actiondialog" + "' title='" + options.action + "' />");
      $dialog.append($errorp);
      html += "<table border=0  cellspacing=0 cellpadding=6><tbody>";
      html += "<tr><td class='xp-FontBold'>" + options.message + "</td></tr>";
      html += "<tr><td>" + options.param1 + "</td>";
      html += "<td><input type='text' id='" + ids.selectdate + "'/>";
      html += "</td></tr></tbody></table>";
      html += "</tbody></table>";

      $firstdiv.append(html);
      $dialog.append($firstdiv);
      $('body').append($dialog);
      $("#" + ids.selectdate).datepicker({ dateFormat: 'M dd,yy', minDate: 0, selectDefaultDate: false });
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
              selectedDate = new Date($("#" + ids.selectdate).datepicker('getDate'));
              selectedDate = $.datepicker.formatDate('M dd,yy', selectedDate);
              if ($("#" + ids.selectdate).val() == "")
              {
                $errorp.show();
              }
              else
              {
                $('#' + ids.primarybutton).attr('disabled', true);
                $('#' + ids.secondarybutton).attr('disabled', true);
                $.relayloading("show");
                $.ajax({ url: options.serviceUrl + options.serviceName, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{trackerid:'" + options.trackerid + "',date:'" + selectedDate + "'}",
                  success: function(datap, st)
                  {
                    var data = datap.d;
                    if (data.Status == "success")
                    {
                      window.location.reload(false);
                    }
                    else
                    {                                      
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
                } /*end else*/                           
              }
              },
              {
                text: btnText[1],
                id: ids.secondarybutton,
                click: function() {
                  $("#" + ids.selectdate).datepicker('destroy');
                  $(this).dialog('close');
                }
              }
            ],
          close: function()
          {
            $("#" + ids.selectdate).datepicker('destroy');
          }
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