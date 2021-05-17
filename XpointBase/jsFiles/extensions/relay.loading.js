
(function($)
{

  $.extend($, {
    relayloading: function(op)
    {
      var id = "relayajaxloading";
      var $loadingdiv = $("#" + id);
      function creatediv()
      {
        if ($loadingdiv.length == 0)
        {
            $loadingdiv = $("<div id='" + id + "'><div   class='xp-Width xp-TextAlignCenter xp-PositionAbsolute xp-Height100' style='top: 10%;left: 0px;'><img src='/_layouts/Images/XPointBase/Indicator.gif';z-index:999999999;text-align:center;'/></div></div>");

          $loadingdiv.hide();
          $('#contentmain').append($loadingdiv);
        }
      }

      function showDiv()
      {
        creatediv();
        $loadingdiv.show();

      }

      function hideDiv()
      {
        $loadingdiv.hide();
      }

      if (op == "show")
      {
        showDiv();
      }
      else if (op == "hide")
      {
        hideDiv();
      }
    }

  });


})(jQuery);