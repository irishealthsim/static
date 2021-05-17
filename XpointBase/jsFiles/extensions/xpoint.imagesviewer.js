; (function()
{
  /*
  * Plugin prepares images viewer 
  */
  $.fn.imagesviewer = function(options)
  {
    //prepare the defaults
    var defaults = {
      imageModel: [],
      dataType: "ajax",
      geturl: '',
      headerText: '',
      noItemsText: 'No Data Available',
      itemsInRow: 3
    };

    var ids = {
      headerElem: 'headercontainer',
      contentElem: 'contentcontainer'
    };
    function prepareIds(baseid)
    {
      ids.headerElem += baseid;
      ids.contentElem += baseid;
    }
    //override the defaults
    var options = $.extend(defaults, options);
    /*************start of method prepareHtml *********/
    function prepareHtml(elem)
    {
      elem.empty();
      var width = (100 / parseInt(options.itemsInRow)) - 5;
      var length = $(options.imageModel).length;
      if (length > 0)
      {
        if (length < options.itemsInRow)
        {
          width = "15";
        }
        $(options.imageModel).each(function(i)
        {
          var image = options.imageModel[i];
          if (image)
          {
            elem.append("<a href='" + image.href + "' title='" + image.title + "' width='" + width + "px' height='50px' class='xp-FloatLeft' style='padding:5px'><img src='" + image.src + "' height='45px' border=0/></a>");
          }
        });
      }
      else
      {
        elem.append("<div style='margin:0 0 0 12px;width:94%;height:50px;' class='xp-FontBold xp-FloatLeft'><div class='xp-NoData'>"+options.noItemsText+"</div></div>");
      }
    }
    /**********End of method ***********/
    /********start of method - prepare imagemodel incase of ajax datatype **/
    function prepareModel(elem, callback)
    {
      $.ajax({ url: options.geturl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{'nDays':'" + options.nDays + "'}",
        success: function(datap, st)
        {
          var data = datap.d;
          if (data.length > 0)
          {
            options.imageModel = data;
            if ($.isFunction(callback))
            {
              callback.call();
            }
          }
          else
          {
            elem.append("<div style='margin:0 0 0 12px;width:94%;height:50px;' class='xp-FontBold xp-FloatLeft'><div class='xp-NoData'>"+options.noItemsText+"</div></div>");
          }
        }
      });
    }
    /*************end of method *************/
    return this.each(function()
    {
      var elem = $(this);
      prepareIds(elem.attr('id'));
      var headerDiv = $("<div id='" + ids.headerElem + "' style='text-indent: 4px;' />").append(options.headerText);
      var contentDiv = $("<div id='" + ids.contentElem + "'/>");
      elem.xpointbox({ 'headerContainer': headerDiv, 'contentContainer': contentDiv, headerWidth: '', headerStyle: 'ui-widget-header xp-HeaderBgClr xp-Padding-4 xp-DivHeader' });
      switch (options.dataType)
      {
        case "ajax":
          prepareModel(contentDiv, function()
          {
            prepareHtml(contentDiv);
          });
          break;
      }
    });
  }

})(jQuery);