(function ($) {
  $.fn.quicklinks = function (options) {
    var defaults = {
      getUrl: "/_layouts/IImpact.Web/QuickLinksService.asmx/GetQuickLinks"
    };
    var options = $.extend(defaults, options);
    return this.each(function () {
      var elem = $(this);
      $.ajax({
        url: options.getUrl,
        dataType: 'json',
        data: '{}',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        success: function (datap, st) {
          var data = datap.d;
          elem.html(data);
          if (data == "") {
            elem.css('display', 'none');
            $('#spaceDiv').css('display', 'none');
          }
        }
      });
    });
  }
})(jQuery);