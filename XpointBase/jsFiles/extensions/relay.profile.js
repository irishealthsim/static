; (function($)
{
  $.fn.validatepp = function(options)
  {
    var defaults = {
      url: "/_layouts/IImpact.Web/UserMngGridService.asmx/ValidatePeople",
      profileCss: "",
      loginname: ""
    }
    var options = $.extend(defaults, options);
    var validate = false;
    var $input = $(this);
    function Check()
    {
      var val = "";
      if (options.loginname == "")
      {
        options.loginname = $input.val();
      }
      if (options.loginname != "")
      {
        $.ajax({ url: options.url, mode: "abort",
          // limit abortion to this input
          port: "peoplecheck" + options.loginname, async: false, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{loginname:'" + options.loginname + "'}",
          success: function(datap, st)
          {
            var data = datap.d;
            if (data != "success")
            {
              alert("Select valid person");
              validate = false;
            }
            else
            {
              validate = true;
            }
          }
        });
      }
      else
      {
        alert("Select valid person");
        validate = false;
      }

    }
    return this.each(function()
    {
      Check();
      this.validate = validate;
    });

  };

  $.fn.profilepic = function(options)
  {
    var defaults = {
      geturl: "/_layouts/IImpact.Web/UserMngGridService.asmx/GetPic",
      seturl: "/_layouts/IImpact.Web/UserMngGridService.asmx/SetPic",
      imgSrcId: $(this).attr('id') + "profilePic",
      fileid: "profilepicupload" + $(this).attr('id'),
      containerid: $(this).attr('id'),
      profilepicCSS:"xp-ProfilePic",
      loginname: "",
      showupload: false,
			imagesrc: ""
    }
    /*extend options */
    options = $.extend(defaults, options);
    function GetPic()
    {
      var $img = $("#" + options.imgSrcId);
      if ($img.length > 0)
      {
        $.ajax({ url: options.geturl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{loginname:'" + options.loginname + "'}",
          success: function(datap, st)
          {
            var data = datap.d;
            if (data != null)
            {
              $img.attr("src", data.ImageUrl);
            }
          }
        });
      }
    }

    return this.each(function () {
        var $img = $("#" + options.imgSrcId);
        $uploaddiv = $("#" + options.fileid);
        var changePicDiv = $("<div class='xp-PositionAbsolute xp-Width' style='height:1px;margin:0 auto;btoom:0px'/>")

        if ($img.length === 0) {
            $("#" + options.containerid).html("<div id='picContainer' class='xp-PositionRelative xp-Overflowhidden  " + " " + options.profileCss + "'><img class='userPic' src='" + options.imagesrc + "' id='" + options.imgSrcId + "'/></div>");
            if (options.showupload == "true" && $uploaddiv.length == 0) {
            }
        }
        //this hover function is to change currently logged-in user profile picture.
       $("#picContainer").hover(function () {
            //$(".pic").append("<a href='#' class='xp-ChangePicFont ui-widget-header xp-ProfilePics xpiconpic'>Change Pic</a>");
            $(".pic").html("<a href='#' class='changeImg xp-ChangePicFont ui-widget-header'><img src='/_layouts/Images/XpointBase/changePic.png' alt='Smiley face' style='height:21px; width:25px;border-radius:0px!important;border:none!important;'></a>");
        },
               function () {
                   $(".picContainer").children("a.xp-ChangePicFont").remove();
               });
        $(".xp-ChangePicBg").hover(function () {
            $(".pic").html("<a href='#' class='changeImg'><img src='/_layouts/Images/XpointBase/changePic.png' alt='Smiley face' style='height:21px; width:25px;border-radius:0px!important;border:none!important;'></a>");
        }, function () {
            $(".picContainer").children("a.changeImg").remove();
        });
    });
  }
})(jQuery);