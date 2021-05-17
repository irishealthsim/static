(function($)
{

  /* 
  *  will return top forums as per top rated  top discussed top viewed
  */
  $.fn.topforums = function(options)
  {
    /*set up defaults*/
    var defaults = {
      geturl: '/_layouts/IImpact.Web/ForumService.asmx/GetTopForumInfos',
      headerText: 'Top Forums'     
    };
    /*extend the defaults*/
    var options = $.extend(defaults, options);
    var ids =
        {
          headerElem: 'topforumsHeader',
          contentElem: 'topforumsContent'
        };
    //Required to use the plugin multiple times on the time
    function prepareIds(baseid)
    {
      ids.headerElem += baseid;
      ids.contentElem += baseid;
    }

    /*****************start of the method *************/
    function populate(elem)
    {
      elem.empty();
      /*start of ajax call for saving the option selected*/
      $.ajax({ url: options.geturl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{}",
        success: function(datap, st)
        {
          var data = datap.d;
          if (data)
          {
              var tabs = "<ul style='position:relative;height:20px!important;padding:0px!important;margin:0px!important;border-right:0px!important' class='xp-FloatLeft xp-Width ui-state-default'>", tabsContent = "";
              var idx = 1;
            $(data).each(function()
            {
              var tab = this;
              tabs += "<li class='xp-TopForumTabs' ><a class='xp-TabLink ' style='width:100%!important;color:#3f3f40!important;' href='#topForumStats" + idx + "'>" + tab.name + "</a></li>";
              tabsContent += "<div id='topForumStats" + idx + "' style='padding:0px;margin:0px;display:block' class='xp-Font xp-FloatLeft xp-Width'>" + tab.html + "</div>";
              idx++;
            });
            tabs += "</ul>";
            tabs += tabsContent;
            elem.html(tabs).tabs();
          }
        }
      });
    }
    /***************** end of the method************************/
    return this.each(function()
    {
      var elem = $(this);

      /*
      * no need to attach the plugin if its already attached to the element
      */
      if (elem.data("topForumsAttacched"))
      {
        return;
      }
      elem.data("topForumsAttacched", "true");
      prepareIds(elem.attr('id'));
      var headerDiv = $("<div id='" + ids.headerElem + "' style='text-indent: 4px;'/>").append(options.headerText);
      var contentDiv = $("<div id='" + ids.contentElem + "' class='xp-Overflowhidden'/>");
      elem.xpointbox({ 'headerContainer': headerDiv, containterWidth: '99%', 'contentContainer': contentDiv, headerWidth: '', headerStyle: 'ui-widget-header xp-HeaderBgClr xp-Padding xp-DivHeader' });
      populate(contentDiv);
    });
  }

})(jQuery);