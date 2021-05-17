(function ($) {
	$.xpointLifecycleUpdates = $.xpointLifecycleUpdates || {};
	$.fn.xpointLifecycleUpdates = function (options) {
		if (this && this.length == 0) return;
		if (typeof (options) == "object") {
			var elem = this;
			var jQueryElem = elem.get(0);
			options = $.extend($.xpointLifecycleUpdates.defaults, options);
			jQueryElem.options = options;
			return $.xpointLifecycleUpdates.methods.init.call(elem, options);
		}
		if ($.xpointLifecycleUpdates.methods[options]) {
			var lifecycleUpdatesOptions = $.data(document, "lifecycleUpdatesOptions");
			lifecycleUpdatesOptions = $.extend(lifecycleUpdatesOptions, Array.prototype.slice.call(arguments, 1));
			return $.xpointLifecycleUpdates.methods[options].apply(this, $.makeArray(lifecycleUpdatesOptions));
		}
	};
	/* 
	* Stores the plugin options  
	*/
	var options;
	$.xpointLifecycleUpdates =
    {
    	/* 
    	* default values 
    	*/
    	defaults:
        {
        	trackerId: '',
        	title: 'Recent Activities',
        	page: 1,
        	needPage: true,
        	numberOfUpdates: 10
        },
    	ids: {
    		viewMoreLink: 'viewMoreLink'
    	},
    	/* Service url paths */
    	paths: {
    		getLifecyleUpdatesServicePath: "/_vti_bin/XPointBase/UpdatesService.svc/getLifecycleUpdates"
    	},
    	/* 
    	* these methods will be available to call from outside of the plugin 
    	*/
    	methods:
        {
        	/*
        	* Start methods 
        	*/
        	init: function (opts) {
        		var elem = this;
        		var options = $.makeArray(opts);
        		$.xpointLifecycleUpdates.methods.createHtml.apply(elem, options);
        	},
        	/*
        	* Creates Layout
        	*/
        	createHtml: function (opts) {
        		var elem = $(this);
        		/* Heading Part of the Recent Activities */
        		var headingMainDiv = $("<div class='xp-Width98 xp-MarginAuto xp-ClearBoth xp-DisplayInlineBlock xp-BorderBottom'>");
        		var headingDiv = $("<div class='xp-FloatLeft xp-Padding-4 ui-secondarytabclr ui-corner-all xp-MarginBottom-10' ></div>");
        		headingDiv.append("<div class='xp-FloatLeft xp-PaddingRight-5 xp-Icon xp-IconRecentActivity'>");
        		headingDiv.append("</div>");
        		headingDiv.append("<div class='xp-FloatLeft xp-PaddingRight-5 xp-FontBold xp-FontSize13pt'>" + opts.title + "</div>");
        		headingDiv.append("</div>");
        		headingMainDiv.append(headingDiv);
        		elem.append(headingMainDiv);
        		/* End of Heading Part Of the Updates */
        		/*Get Lifecycle Updates and Render on the Page*/
        		$.xpointLifecycleUpdates.methods.getUpdates(elem, opts);
        	},
        	/*
        	*Gets lifeycle updates data
        	*/
        	getUpdates: function (elem, opts) {
        		$.ajax({
        			type: "GET",
        			dataType: "json",
        			url: $.xpointLifecycleUpdates.paths.getLifecyleUpdatesServicePath,
        			data: ({ "trackerId": opts.trackerId, "numberofUpdates": opts.numberOfUpdates, "page": opts.page, "needPage": opts.needPage }),
        			success: function (data) {
        				var result = data.GetLifecycleUpdatesResult;
        				/*
        				* Render the updates
        				*/        				
        				$(result.Data).each(function () {
        					$.xpointTemplates.methods.getBasicPostHtml.call(elem, this, opts, null, null, false);
        				});
								/*
								*Paging - View More
								*/
        				if (result.NeedPage === true) {
        					var viewMoreDiv = $("#" + $.xpointLifecycleUpdates.ids.viewMoreLink + "_Container");
        					viewMoreDiv.remove();
        					if (result.TotalCount > (result.PageSize * result.Page)) {
        						viewMoreDiv = $("<div id='" + $.xpointLifecycleUpdates.ids.viewMoreLink + "_Container' class='xp-FloatLeft xp-Width ui-state-default xp-HoverCursor xp-TextAlignCenter ui-corner-all xp-MarginTop-5' />");
        						viewMoreDiv.appendTo(elem);
        						var viewMoreLink = $("<a id='" + $.xpointLifecycleUpdates.ids.viewMoreLink + "' class='xp-nothers xp-PositionRelative xp-LinkLabel xp-HoverCursor Tip-HPUpdatesViewMore xp-Height-20 xp-LineHeight-35' >View More</a>")
        																									.appendTo(viewMoreDiv)
        																									.click(function () {
        																										var ops = opts;
        																										ops.page = (result.Page + 1);
        																										$.xpointLifecycleUpdates.methods.getUpdates(elem, ops);
        																									});
        					}
        				}
        			}
        		});
        	}
        }
    	// End methods
    };
})(jQuery);
