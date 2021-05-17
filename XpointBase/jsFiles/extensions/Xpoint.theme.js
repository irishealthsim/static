/* 
*Plugin is for change theme
*Girish Kumar
*Copyright (c) <2011> – Element8 Transformations Solutions Ltd – ALL RIGHTS RESERVED 
*/
(function ($) {
  $.fn.themeSetting = function (options) {
    var ids = {
      themeSave: 'saveTheme',
      themesConfig: 'themesConfig',
      themeImage: 'themeImage'
    };
    var defaults = {
      serviceUrl: '/_layouts/IImpact.Web/ThemeService.asmx/'
    };
    opts = $.extend(defaults, options);
    /*
    *createHtml method is used to create html layout theme outer div, theme header div,
    *theme image holder div, theme list div
    */
    function createHtml(mainContainer) {
    	var themeOuterDiv = $("<div class='xp-Width99 xp-PositionRelative xp-FloatLeft' style='height:auto;'/>");
    	var themeHeaderDiv = $("<div class='xp-DivHeader  xp-Width Tip-MSThemeHead' >Themes</div>");
    	themeOuterDiv.append(themeHeaderDiv);
    	var themeBodydiv = $("<div class = 'xp-Width xp-FloatLeft xp-OuterPanel xp-BoxShadow xp-Overflowhidden ui-corner-all' />");
    	var themeTable = $("<table style='table-layout:fixed' width=100% cellspacing=0/>");
    	var themeTblTr = $("<tr float=left/>");
    	var themeTblImgTd = $("<td class='xp-OuterPanel xp-Width60 xp-Padding-0' style='border-width:0px 1px 0px 0px !important;'/>");
    	var themeImgDiv = $("<div id='" + ids.themeImage + "' class ='xp-FloatLeft xp-Width xp-ThemeImg'></div>");
    	themeTblImgTd.append(themeImgDiv);
    	themeTblTr.append(themeTblImgTd);
    	var themeTblLstTd = $("<td class='xp-SimilarIdeaBody xp-Width40 xp-Padding-0 ui-state-default xp-NoBorder' valign=top/>");
    	var themeListDiv = $("<div class = 'xp-Padding-0 xp-FloatLeft xp-Width'/>");
    	themeTblLstTd.append(themeListDiv);
      themeTblTr.append(themeTblLstTd);
      themeTable.append(themeTblTr);
      themeBodydiv.append(themeTable);
      themeOuterDiv.append(themeBodydiv);
      mainContainer.append(themeOuterDiv);
      getThemeConfigItems(themeListDiv);
    }
    /*
    *getThemeConfigItems method is to get all themeitem through ajax call to the web method 'GetThemeConfig'.
    */
    function getThemeConfigItems(themeListDiv) {
      $.ajax({
        type: "POST",
        url: opts.serviceUrl + "GetThemeItems",
        data: "{}",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (datap) {
          var themeConfigItems = datap.d;
          var themeUl = $("<ul class='xp-LifeCycleOuterDiv xp-ThemeLi'/>");
          /*
          *if theme list contains only one item no need add button
          */
          if (themeConfigItems == 0) {
          	themeListDiv.append("<li><a class='xp-TabLink xp-FloatLeft xp-HoverCursor xp-MarginLeft-12  '>" + themeConfigItems[i].m_ThemeName + "</a></li>");
          }
          /*
          *if theme items count is greater than one , add button by selecting  theme  and 
          *corresponding preview image in img div and call savethemeconfig ajax call through web method "SaveUserThemeConfig"
          */
          else {
            $.each(themeConfigItems, function (i) {
            	var themeLi = $("<li class='xp-FloatLeft' id='" + themeConfigItems[i].m_ID + "'><a class='xp-HoverCursor xp-TabLink xp-FloatLeft xp-MarginLeft-12 '>" + themeConfigItems[i].m_ThemeName + "</a></li>").click(function () {
                /*if li already doesn't contains input button add button or else do nothing and 
                *default theme high light and there is no button will add by selecting default theme
                */
                	if ($(this).has('input').length == 0 && themeConfigItems[i].m_IsSelected == false) {
                		$('li').removeClass("xp-Customhighlight");
                		$(this).addClass("xp-Customhighlight");
                		$("#" + ids.themeSave).remove();
                		$(".dynamicTriangle").remove();
                		$("#" + ids.themeImage).html('<img src="' + themeConfigItems[i].m_ImageUrl + '"/>');
                		$(this).append("<input autocomplete='off' id='" + ids.themeSave + "'class='xp-HoverCursor ui-primarytabclr ui-tabbuttonstyle  ui-corner-all xp-FloatRight' type='button' value='Apply'></input>");
                		$(this).append("<span class='dynamicTriangle notch '/><span class='dynamicTriangle notch2'/>");
                		$("#" + ids.themeSave).click(function () {
                			$("#" + ids.themeSave).remove();
                			saveUserThemeConfig(themeConfigItems[i].m_ID);
                		});
                	}
                else if (themeConfigItems[i].m_IsSelected == true) {
                	$('li').removeClass("xp-Customhighlight");
                	$(".dynamicTriangle").remove();
                	$(this).addClass("xp-Customhighlight");
                	$(this).append("<span class='dynamicTriangle notch '/><span class='dynamicTriangle notch2'/>");
                	$("#" + ids.themeSave).remove();
                	$("#" + ids.themeImage).html('<img src="' + themeConfigItems[i].m_ImageUrl + '"/>');
                }
              });
              if (themeConfigItems[i].m_IsSelected == true) {
              	$("#" + ids.themeImage).html('<img src="' + themeConfigItems[i].m_ImageUrl + '"/>');
              	$(themeLi).addClass("xp-Customhighlight");
              	$(themeLi).append("<span class='dynamicTriangle notch '/><span class='dynamicTriangle notch2'/>");
              }
              $(themeUl).append(themeLi);
              $(themeListDiv).append(themeUl);
            });
          }
        }
      });
      return false;
    }
    /*
    *'saveUserThemeConfig' method is used to call the web  method 'SaveUserThemeConfig' to save the user id,themeid  through ajax call .
    */
    function saveUserThemeConfig(selectedThemeID) {
      $.ajax({
        type: "POST",
        url: opts.serviceUrl + "SaveUserThemeConfig",
        data: "{ themeID :'" + selectedThemeID + "'}",
        contentType: "application/json",
        dataType: "json",
        success: function (datap) {
          window.location.reload(false);
        }
      });
    }
    return this.each(function () {
      var $this = $(this);
      createHtml($this);
    });
  };
})(jQuery);