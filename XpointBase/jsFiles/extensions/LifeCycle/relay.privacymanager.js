var privacyloaded = false;
; (function($)
{

  $.fn.privacymanager = function(options)
  {

    var defaults = {
      url: "",
      readonly: true,
      lockimageurl: "",
      unlockimageurl: "",
      currentstate: "unlock",
      trackerid: -1
    };
    var options = $.extend(defaults, options);
    var $div = $(this);
    function toggleimage()
    {
      /*var $status = $("<div class='xp-FontNormal' style='color:#FFFFFF'> Updating... </div>");
      $("#" + $div.attr('id')).append($status);*/
      var $privateimg = $("#" + $div.attr('id') + "privacyimage");
      if ($privateimg.length > 0)
      {
        $.ajax({ url: options.url, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{trackerid:'" + options.trackerid + "'}",
          success: function(datap, st)
          {
            var data = datap.d;
            if (data == "success")
            {
              if (options.currentstate == "unlock")
              {
                options.currentstate = "lock";

                $privateimg.attr("class", options.lockimageurl);
                $privateimg.attr("alt", "Make Public");
                $privateimg.attr("title", "Make Public");/*to show tool tips in browsers other than IE*/
              }
              else
              {
                options.currentstate = "unlock";

                $privateimg.attr("class", options.unlockimageurl);
                $privateimg.attr("alt", "Make Private");
                $privateimg.attr("title", "Make Private"); /*to show tool tips in browsers other than IE*/
              }
              /*$status.remove();*/
            }
          }
        });
      }
    }
    if (!privacyloaded)
    {
      return this.each(function()
      {
        privacyloaded = true;
        var $privateimg = $("#" + $div.attr('id') + "privacyimage");
        var alt = '';
        if ($privateimg.length == 0)
        {
          $privateimg = $("<div  id='" + $div.attr('id') + "privacyimage'></div>")
          if (options.currentstate == "unlock")
          {
            alt = (options.readonly) ? "Public" : "Make Private";                
            $privateimg.attr("class", options.unlockimageurl);
            $privateimg.attr("alt", alt);
            $privateimg.attr("title", alt); /*to show tool tips in browsers other than IE*/
          }
          else
          {
            alt = (options.readonly) ? "Private" : "Make Public";  
            alt = (options.readonly) ? "Private" : "Make Public";  
            $privateimg.attr("class", options.lockimageurl);
            $privateimg.attr("alt", alt);
            $privateimg.attr("title", alt); /*to show tool tips in browsers other than IE*/
          }
          $div.append($privateimg);
        }
        if (!options.readonly)
        {
          $privateimg.click(function()
          {
            toggleimage();
          });
        }
      });
    }
  }

})(jQuery);