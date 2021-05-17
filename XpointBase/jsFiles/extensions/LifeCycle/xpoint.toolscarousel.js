(function ($) {
	$.toolscarousel = $.toolscarousel || {};
	$.fn.toolscarousel = function (options) {
		//logic  for calling method which are under toolscarousel nameSpace
		if (!this || this.length == 0) return;
		if (typeof (options) == "object") {
			var elem = $(this);
			$.data(document, "carouselOptions", options);
			$.toolscarousel.methods.init.apply(this, $.makeArray(options));
		}
		if ($.toolscarousel.methods[options]) {
			var carouselOptions = $.data(document, "carouselOptions");
			carouselOptions = $.extend(carouselOptions, Array.prototype.slice.call(arguments, 1));
			return $.toolscarousel.methods[options].apply(this, $.makeArray(carouselOptions));
		}
	}; //ends toolscarousel
	/*
	*Providing definition for toolscarousel namespace
	*/
	$.toolscarousel = {
		/*
		*specifies images location
		*/
		paths: {

			tickImageUrl: " xp-IconToolsTick xp-Icon "
		},
		/*
		*specifies tool array
		*/
		toolArray: [],
		/*
		*array to declare various Id's used in plugin
		*/
		ids: {
			leftElem: 'toolLeftContainer',
			rightElem: 'toolRightContainer',
			minimizedElem: 'toolMinimizedContainer',
			arrowImageElem: 'arrowImage',
			carouselElem: 'toolscarousel',
			alltoolsElem: 'alltoolsElem',
			pageElem: 'html',
			toolContainerDivElem: 'toolsdiv',
			RibbonContainerElem: 'RibbonContainer',
			arrowImage: 'arrowImage',
			showhideDiv: 'showhideDiv',
			outerPanel: 'outerPanel',
			tickIcon: 'tickicon'
		},
		/*
		*Array to declare classes which are used in Plugin
		*/
		classes: {
			toolExist: 'toolExist',
			floatLeft: 'xp-FloatLeft',
			fullWidth: 'xp-Width',
			greyBackGround: 'xp-FloatLeft xp-GreyBackground',
			toolHide: 'toolhide',
			floatRight: 'xp-FloatRight',
			toolContainer: 'toolcontainer',
			overFlowHidden: 'xp-Overflowhidden',
			jqGridTable: 'jqgridtable',
			topZoneTools: 'topzonetools',
			mainContainer: 'xp-MainContainer',
			masterContent: 'html',
			elemCss: 'xp-FloatLeft xp-Width90 carouselContainerCss',
			rightArrowImageUrl: " xp-IconToolsClose xp-Icon ",
			leftArrowImageUrl: " xp-IconToolsOpen xp-Icon "
		},
		methods: {
			/*
			*this method is the entry point for this plugin
			*/
			init: function (options) {
				var elem = $(this);
				$.toolscarousel.methods.createHtml.apply(elem, $.makeArray(options));
				$("#" + $.toolscarousel.ids.carouselElem).jcarousel({
					vertical: true,
					visible: 8
				});
				/*
				*Calls toggleTool on click of tool in the carousel which toggles the tool on the page.  
				*/
				$("." + $.toolscarousel.classes.toolHide).click(function () {
					$.toolscarousel.methods.toggleTool.apply(this, $.makeArray(options));
				});
				/*
				*Calls toggleTools On click of hide/show all which toggles all the tools present on the page.  
				*/
				$("#" + $.toolscarousel.ids.alltoolsElem).click(function () {
					$.toolscarousel.methods.toggleTools.apply(this, $.makeArray(options));
				});
				/*
				*calls method to dock carousel to the left when clicked anywhere in the page
				*/
				var toolRightElem = $('#' + $.toolscarousel.ids.rightElem);
				$(document).click(function (event) {
					/*
					*verify if the click is not on the carousel Container or it's children elements
					*/
					var sourceElem = $(event.target);
					if (!sourceElem.hasClass(".carouselContainerCss")) {
						var parentElems = sourceElem.parents(".carouselContainerCss");
						if (parentElems.length == 0) {
							$.toolscarousel.methods.hideCarousel();
						}
					}
				});
				/*
				*calls method to display/expand carousel on clicking on Tool Image
				*/
				$("#" + $.toolscarousel.ids.rightElem).click(function () {
					$.toolscarousel.methods.toggleCarousel();
				});
				/*
				*Scrolls the carousel with the page Scroll
				*Added a delay factor so that the scrollCarousel method runs after some delay
				*/
				$(window).scroll(function () {
					pageScroll = true;
					setInterval(function () {
						if (pageScroll) {
							$.toolscarousel.methods.scrollCarousel();
						}
						pageScroll = false;
					}, 50);
				});
				/*
				*Call init when window resizes
				*/
				$(window).resize(function () {
					elem.toolscarousel("init");
				});
			}, //ends init
			/*
			*toggle the toolscarousel,image of rightElem
			*and  the minimizeddiv based on the visibility of toolscarousel
			*/
			toggleCarousel: function () {
				var leftElem = $('#' + $.toolscarousel.ids.leftElem);
				var minimizedElem = $('#' + $.toolscarousel.ids.minimizedElem);
				var arrowImage = $('#' + $.toolscarousel.ids.arrowImage);
				/*
				*minimize carousel if it's visible on click of rightArrow
				*/
				if (leftElem.is(':visible')) {
					leftElem.css({ 'width': '0%' });
					leftElem.css({ 'display': 'none' });
					minimizedElem.show();
					arrowImage.removeClass($.toolscarousel.classes.rightArrowImageUrl);
					arrowImage.addClass($.toolscarousel.classes.leftArrowImageUrl);
				}
				/*
				*display carousel if it's unvisible on click of rightArrow
				*/
				else {
					leftElem.css({ 'display': 'block' });
					leftElem.css({ 'width': '15%' });
					minimizedElem.hide();
					arrowImage.removeClass($.toolscarousel.classes.leftArrowImageUrl);
					arrowImage.addClass($.toolscarousel.classes.rightArrowImageUrl);
					
				}
			},
			hideCarousel: function () {
				var leftElem = $('#' + $.toolscarousel.ids.leftElem);
				var minimizedElem = $('#' + $.toolscarousel.ids.minimizedElem);
				var arrowImage = $('#' + $.toolscarousel.ids.arrowImage);
				/*
				*minimize carousel if it's visible on click of rightArrow
				*/
				if (leftElem.is(':visible')) {
					leftElem.css({ 'width': '0%' });
					leftElem.css({ 'display': 'none' });
					minimizedElem.show();
					arrowImage.attr('src', $.toolscarousel.paths.leftArrowImageUrl);
				}
			},
			/*
			*this method creates html structure of tools carousel
			*/
			createHtml: function (options) {
				var elem = $(this);
				elem.css({ 'top': '-20px' });
				elem.empty();
				elem.css({ 'position': 'relative' });
				elem.css({ 'height': '1px' });
				elem.css({ 'z-index': '1' });
				elem.addClass($.toolscarousel.classes.elemCss);
				/*
				*div which is shown when carousel is in minimized state
				*/
				var miniMizedDiv = $("<div id='" + $.toolscarousel.ids.minimizedElem + "' class='" + $.toolscarousel.classes.greyBackGround + "' style='border:0px solid #D2D4D2;z-index:999;height:500px ; position:inherit'/>").appendTo(elem);
				var showHide = $("<div id='" + $.toolscarousel.ids.showhideDiv + "' class='ui-secondarytabclr ui-corner-all xp-TextAlignCenter ' style='padding:2px;width:82%'><a href='#' id='" + $.toolscarousel.ids.alltoolsElem + "' toolshown=true class='xp-Font xp-LinkLabel ' style='color:#3f3f40!important;padding:1px'>hide all</a><div>");
				/*		
				*div which contains carousel
				*/
				var leftElem = $("<div id='" + $.toolscarousel.ids.leftElem + "' class='" + $.toolscarousel.classes.floatLeft + "  xp-BoxShadow ui-corner-all xp-Padding-0 xp-ToolCarouselBorder' style='width:15%;height:auto !important;z-index: 9999999999;background:#FFFFFF'/>").appendTo(elem);
				var carouselElem = $("<ul style='padding:5px 0px !important' id = '" + $.toolscarousel.ids.carouselElem + "' class='jcarousel-skin-tango xp-Font'/>");
				$(options.model).each(function (i) {
					var toolItem = this;
					if (toolItem) {
						carouselElem.append($.toolscarousel.methods.buildCarousel(toolItem));
					}
				});
				leftElem.append(showHide)
				leftElem.append(carouselElem);
				/*
				*div which contains the tools text
				*/
				var rightElem = $("<div id='" + $.toolscarousel.ids.rightElem + "' class='" + $.toolscarousel.classes.floatLeft + " ui-corner-all xp-BoxShadow xp-ToolCarouselBorder  Tip-LCToolCarousel ' style=' position: relative;height:15px;padding:5px 9px;background:#ffffff' />");
				rightElem.append("<div id='" + $.toolscarousel.ids.arrowImage + "' class='" + $.toolscarousel.classes.floatLeft + " " + $.toolscarousel.classes.rightArrowImageUrl + "'/>");
				elem.append(rightElem);
				$('#' + $.toolscarousel.ids.leftElem).hide();
			},
			/*
			*creates vertical carousel
			*/
			buildCarousel: function (tool) {
				var liElem = $("<li style='border:1px solid #C9C9CB;height:auto;padding:0px 0px'/>");
				/*
				*this div contains the information of the current toolitem specified in the parameter of method
				*/
				var tooInfoMainDiv = $("<div toolId='" + tool.toolId + "' class='" + $.toolscarousel.classes.toolHide + " xp-FloatLeft xp-Width  ui-secondarytabclr  ui-corner-all " + $.toolscarousel.classes.toolExist + "' title='" + tool.title + "' style='position:relative;'/>");
				var imageContainer = $("<div style='float: left; margin: 0pt auto; text-align: center; padding: 4px 0px; width: 100%;display:none;'/>");
				/*
				*div which contains tick image represeting if tool is present in container or not
				*/
				var toolTickImageDiv = $("<div class='" + $.toolscarousel.classes.floatLeft + "' style='margin:0 auto;width:37%;padding:6px 0px;text-align:center;position:relative;top:0px;border:0px yellow solid;display:none'/>");
				/*
				*makes the tool invisible if it's property defaultopen is not true
				*/
				var style = tool.defaultopen ? "" : "display : none";
				var tickImage = $("<div id='" + $.toolscarousel.ids.tickIcon + "' class='" + $.toolscarousel.paths.tickImageUrl + " " + $.toolscarousel.classes.toolExist + " xp-HoverCursor'/>").appendTo(toolTickImageDiv);
				imageContainer.append(toolTickImageDiv);
				/*
				*div containing image of tool
				*/
				var toolImageDiv = $("<div class='" + $.toolscarousel.classes.floatLeft + "' style='margin:0 auto;width:48%;text-align:center;position:relative;border:0px red solid;display:none'/>");
				var toolImage = $("<div class='" + tool.imagesrc + " xp-HoverCursor'/>").appendTo(toolImageDiv);
				imageContainer.append(toolImageDiv);
				tooInfoMainDiv.append(imageContainer);
				/*
				*div containing name of the tool
				*/
				var toolTextDiv = $("<div class='" + $.toolscarousel.classes.overFlowHidden + " xp-FontNormal  ' style='position:relative;width:95%;word-wrap:break-word;text-align:center;margin:0 auto;'/>");
				var toolTitle = tool.title.length >= 8 ? tool.title.substring(0, 8) + '...' : tool.title;
				var toolName = tool.title;
				var toolText = $("<span style='cursor:pointer;display:block;font-size:8pt;padding:5px 0px;line-height:normal !important'/>")
				                .append(toolName)
												.appendTo(toolTextDiv);
				tooInfoMainDiv.append(toolTextDiv);
				liElem.append(tooInfoMainDiv);
				return liElem;
			},
			/*
			*toggle the Tool Background color
			*/
			toggleToolBackground: function (toolElem) {
				if ($(toolElem).hasClass("xp-NoBackground")) {
					toolElem.removeClass("xp-NoBackground");
				}
			else{
				toolElem.addClass("xp-NoBackground");
			}
			},
			/*
			*method to show.hide all tools
			*/
			toggleTools: function (options) {
				var toolElem = $("#" + $.toolscarousel.ids.alltoolsElem);
				var toolshowns = toolElem.attr('toolshown');
				if (toolshowns == "true") {
					toolElem.attr('toolshown', "false");
					toolElem.text('view all');
					$(options.model).each(function (k) {
						var tool = this;
						$(".toolcontainer[toolId=" + tool.toolId + "]").hide();
					});
					$("." + $.toolscarousel.classes.toolExist).addClass("xp-NoBackground")
				} //ends if
				else {
					toolElem.attr('toolshown', "true");
					toolElem.text('hide all');
					$(options.model).each(function (k) {
						var tool = this;
						var toolObj = $(".toolcontainer[toolId=" + tool.toolId + "]").show();
						if (toolObj.find($('.' + $.toolscarousel.classes.jqGridTable)).length > 0) {
							$($('.' + $.toolscarousel.classes.jqGridTable), toolObj).trigger('reloadGrid');
						}
					});
					$("." + $.toolscarousel.classes.toolExist).removeClass("xp-NoBackground")
				} //end else
			}, //end toggleTools
			/*
			*this method is used to show/hide tool info in the 
			*carousel and the respective tool on the page
			*/
			toggleTool: function (options) {
				var toolElem = $(this);
				/*
				*getting a referece to the tool
				*/
				var toolid = toolElem.attr('toolId');
				var tool = $(".toolcontainer[toolId=" + toolid + "]");
				/*
				*Hiding tool if it's visible on click
				*/
				if (tool.is(':visible')) {
					tool.hide();
					if ($("#toolsdiv .toolcontainer:visible").length == "1") {
						$("#" + $.toolscarousel.ids.alltoolsElem).text('view all');
					}
					$.toolscarousel.methods.toggleToolBackground(toolElem);
				}
				/*
				*Display tool
				*/
				else {
					tool.show();
					if ($("#toolsdiv .toolcontainer:visible").length == "2") {
						$("#" + $.toolscarousel.ids.alltoolsElem).text('hide all');
					}
					/*
					*Toggles Image
					*/
					$.toolscarousel.methods.toggleToolBackground(toolElem);
					/*
					*Reloads grid if there are no tools present on the page
					*/
					if (tool.find(".jqgridtable").length > 0) {
						$(".jqgridtable", tool).trigger('reloadGrid');
					}
				}
			},
			/*
			*this method scrolls carousel with the page scroll
			*/
			scrollCarousel: function () {
				/*
				*getting reference to the elem
				*/
				//need to correct this,get a way to retrieve it from method call
				var elem = $(".carouselContainerCss");
				/*
				*Current top position of element
				*/
				var originalTop = elem.position().top;
				/*
				*top position of parent element
				*/
				var topOffset = elem.parent().offset().top;
				/*
				*top area which is scrolled
				*/
				var scrolltop = $(window).scrollTop();
				/*
				*height of topZone tools
				*/
				var zoneHeight = $('.' + $.toolscarousel.classes.topZoneTools).height();
				if (topOffset > scrolltop - zoneHeight) {
					elem.css('position', 'absolute');
					elem.css('top', topOffset-20);
				}
				/*
				*changing top value of carousel 
				*in order to appear it at top always
				*/
				else if (topOffset > scrolltop - zoneHeight) {
					elem.css('position', 'absolute');
					var topValue = topOffset - scrolltop;
					elem.position().top = topValue;
					var htmlHeight = $('#' + $.toolscarousel.ids.carouselElem).height() + scrolltop;
					if (htmlHeight <= $(window).height()) {
						$('#' + $.toolscarousel.ids.carouselElem).height(htmlHeight);
						var panelHeight = $('#' + $.toolscarousel.ids.leftElem).height() + scrolltop;
						$('#' + $.toolscarousel.ids.leftElem).height(panelHeight);
					}
				}
				/*
				*changing the top position of carousel to zero
				* in order to appear it at the top
				*/
				if (topOffset <= scrolltop) {
					elem.css('position', 'fixed');
					elem.css('top', "0px");
					var setHeight = $(window).height();
					$('#' + $.toolscarousel.ids.miniMizedDiv).height(setHeight);
					$('#' + $.toolscarousel.ids.leftElem).height(setHeight);
								}
				if (scrolltop > zoneHeight) {
					elem.css('position', 'fixed');
					elem.css('top','0px');
					var setHeight = $(window).height();
					$('#' + $.toolscarousel.ids.miniMizedDiv).height(setHeight);
					$('#' + $.toolscarousel.ids.leftElem).height(setHeight);
				}
			} //end scrollCarousel method
		}//end of method array
	}; //end namespace
})(jQuery);