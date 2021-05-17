(function ($) {
  $.xpointSystemAdmin = $.xpointSystemAdmin || {};
  $.fn.xpointSystemAdmin = function (options) {
    this.options = $.extend($.xpointSystemAdmin.defaults, options);
    $.xpointSystemAdmin.methods.init.apply(this, $.makeArray(this.options));
  };
  $.xpointSystemAdmin = {
    defaults: {
      currentSystemAdmin: '',
      selectedAdminMessage: 'Please assign a system admin'
    },
    /*
    *Array to declare various Paths
    */
    paths: {
      getAdminUsersUrl: "/_layouts/IImpact.Web/UserMngGridService.asmx/GetAdminUsers",
      saveSystemAdminUrl: "/_layouts/IImpact.Web/UserMngGridService.asmx/SaveSystemAdmin"
    },
    /*
    *Array to declare various IDs
    */
    ids: {
      assignAdmin: 'assignAdmin',
      selectAdmin: 'selectAdmin',
      selectedAdmin: 'selectedAdmin',
      radioDiv: 'adminUsersRadioDiv'
    },
    /*
    *Array to declare various classes
    */
    classes:
		{
		  downArrow: 'xp-IconDownArrow',
		  selectAdminCss: 'xp-SelectAdminCss',
		  selectedElement: 'xp-SelectedElement'
		},
    methods: {
      init: function (options) {
        var elem = $(this);
        /*
        * Prepare the Html
        */
        $.xpointSystemAdmin.methods.createHtml.apply(this, $.makeArray(options));
        /*
        * On click of the DownArrow
        */
        $("." + $.xpointSystemAdmin.classes.downArrow).click(function () {
          $("#" + $.xpointSystemAdmin.ids.selectAdmin).toggle().addClass("xp-DisplayBlock");
          $("." + $.xpointSystemAdmin.classes.selectAdminCss).jScrollPane();
          return false;
        });
        /*
        * On click of the Radio button
        */
        $('input[type="radio"][name="adminuser"]').live("click", function (e) {
          e.stopImmediatePropogation;
          $("." + $.xpointSystemAdmin.classes.selectedElement).removeClass('xp-LinkLabel');
          if ($(this).is(":checked")) {
            var selectedVal = $(this).val();
            if (selectedVal != options.currentSystemAdmin) {
              $(this).parent().addClass('xp-LinkLabel ' + $.xpointSystemAdmin.classes.selectedElement);
              options.currentSystemAdmin = selectedVal;
              $.ajax({
                url: $.xpointSystemAdmin.paths.saveSystemAdminUrl,
                contentType: "application/json; charset=utf-8",
                type: "post",
                dataType: "json",
                data: "{loginName:'" + selectedVal + "'}",
                success: function (datap, st) {
                  var data = datap.d;
                  if (data.Status == "success") {
                    $("#" + $.xpointSystemAdmin.ids.selectedAdmin).html(data.Message);
                    $("#" + $.xpointSystemAdmin.ids.selectAdmin).hide();
                  }
                  return false;
                }
              });
            }
          }
        });
      }, //end init
      /*
      * Get the users belonging to the Administrator Group & Build the set of Radio buttons for selection
      */
      prepareRadioButtons: function (radioDiv, options) {
        $.ajax({
          url: $.xpointSystemAdmin.paths.getAdminUsersUrl,
          contentType: "application/json; charset=utf-8",
          type: "post",
          dataType: "json",
          data: "",
          success: function (datap, st) {
            var data = datap.d;
            $.each(data, function (i) {
              var user = this;
              if (user.IsSystemAdmin) {
                radioDiv.append($("<div class='xp-LinkLabel " + $.xpointSystemAdmin.classes.selectedElement + "'><input type='radio' name='adminuser' value='" + user.LoginName + "'  checked='checked'  />" + user.Name + "</div>"));
              }
              else {
                radioDiv.append($("<div><input type='radio' name='adminuser' value='" + user.LoginName + "' />" + user.Name + "</div>"));
              }
            });
          },
          error: function (xhr, ajaxOptions, thrownError) {
          }
        });
      }, // end prepareRadioButtons
      /*
      * Prepare the Html
      */
      createHtml: function (options) {
        var $elem = $(this);
        $elem.append("<div class='xp-FloatLeft xp-PositionRelative' id='" + $.xpointSystemAdmin.ids.assignAdmin + "' style='margin-left:500px;'>");
        $elem.append("<div class='xp-FloatLeft' id='" + $.xpointSystemAdmin.ids.selectedAdmin + "'>" + options.selectedAdminMessage + "</div>");
        $elem.append("<div class='xp-FloatLeft " + $.xpointSystemAdmin.classes.downArrow + " xp-Icon xp-Padding'></div>");
        $elem.append("<div class='xp-Width xp-FloatLeft' >");
        $elem.append("<div class='xp-PositionAbsolute xp-Width ui-state-default xp-Margin-0 xp-SelectAdminDiv xp-DisplayNone' id='" + $.xpointSystemAdmin.ids.selectAdmin + "'>");

        var radioDiv = $("<div id='" + $.xpointSystemAdmin.ids.radioDiv + "' class='xp-FloatLeft xp-Width " + $.xpointSystemAdmin.classes.selectAdminCss + " '>");
        radioDiv.append("<div class='xp-Width xp-FloatLeft ui-widget-header'><div class='xp-Padding  xp-FloatLeft'>Select an Admin User</div></div>");

        $.xpointSystemAdmin.methods.prepareRadioButtons(radioDiv, options);
        $("#" + $.xpointSystemAdmin.ids.selectAdmin).append(radioDiv);

        $elem.append("</div></div></div></div>");

      } //end createHtml
    }
  };

})(jQuery);

