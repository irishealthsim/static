(function ($) {
  /*
  */
  $.fn.checkListToolUpdate = function (opts) {

    var defaults = {
      updateUrl: '',
      prefix: '',
      itemid: -1
    };
    var opts = $.extend(defaults, opts);
    return this.each(function () {
      var elem = $(this);
      $.ajax({
        url: opts.updateUrl,
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: "{itemId:" + opts.itemid + "}",
        success: function (result, stat) {
            $(".readinessHeading").html(result.d);
        }
      });
    });
  }
})(jQuery);