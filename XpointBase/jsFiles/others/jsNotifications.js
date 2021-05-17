/* 
*Plugin is for showing Top five notifications
*Girish Kumar
*Copyright (c) <2011> – Element8 Transformations Solutions Ltd – ALL RIGHTS RESERVED  
*/
; (function ($) {
  $.fn.jsNotifications = function (options) {
    /*
    *set defaults configurations for plugin
    */
    var defaults = {
      activeDiv: '',
      serviceUrl:'',
      viewAll: '',
      rowLimit: 5
    };
    /*override defaults variables with options*/
    var options = $.extend(defaults, options);
    /*
    * Ajax call to get Top 5 notification items from ANArchive list
    */
    function displayNotifications(archiveDiv) {
      $(options.activeDiv).empty();
      $(archiveDiv).empty();
      $.ajax({
        type: "POST",
        cache: false,
        url: options.serviceUrl + "GetNotifications",
        data: '{ "rLimit" : "' + options.rowLimit + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
          var notificationItems = data.d;
         if(notificationItems.length==0)
          {
            $(archiveDiv).append("<div class='xp-FontBold xp-nodata' style='width: 94%;height: 50px;'>No Notifications Available</div>");
            $(options.viewAll).hide();
          }
          else{
          for (var i = 0; i < notificationItems.length; i++) {
            var archiveSubDiv = $("<div id='notification' class='xp-Padding-4 xp-FontNormal xp-FloatLeft' style='padding-top:7px'>" + notificationItems[i].m_Content + "</div>");
            $(archiveDiv).append(archiveSubDiv);
          }
          }
        }
      });
    }
    return this.each(function () {
      var archiveAlerts = $(this);
      displayNotifications(archiveAlerts);
    });
  };
})(jQuery);