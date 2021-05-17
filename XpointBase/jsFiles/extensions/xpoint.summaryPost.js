(function ($) {
	$.postSummary = $.postSummary | {};
	$.fn.postSummary = function (options) {
		if (!this || this.length == 0) {
			return;
		}
		var elem = this;
		if (typeof (options == "object")) {
			var jElem = elem.get(0);
			var options = $.extend($.postSummary.defaults, options);
			jElem.options = options;
			return $.postSummary.methods.init.call(elem, options);
		}
		var fnCall = $.postSummary.methods[options];
		if (fnCall && $.isFunction(fnCall)) {
			return fnCall.methods[options].call(elem, arguments[1]);
		}
	};

	$.postSummary = {
		/*default values*/
		defaults: {
			currentUserId: null,
			siteUrl: null,
			postCount: 1,
			page: 1,
			needPage: false
		},
		/* 
		* ids used in this current plugin
		*/
		ids: {
			summaryPostContainer: 'summaryPostContainer',
			timeStampContainer: 'timeStampContainer',
			timeStampIcon: 'timeStampIcon',
			timeStampDiv: 'timeStampDiv',
			postLink: 'postLink',
			postLinkDiv: 'postLinkDiv',
			dateDiv: 'dateDiv'
		},
		/* 
		* css classes used in this plugin 
		*/
		classes: {
			summaryPostContainer: 'xp-FloatLeft xp-Width xp-PaddingTop-10',
			timeStampContainer: 'xp-FloatLeft xp-MarginLeft-5 xp-PositionRelative xp-MarginTop-5',
			timeStampIcon: 'xp-FloatLeft  xp-Icon  xp-IconTimestamp xp-PaddingRight-3',
			timeStampDiv: 'xp-FloatLeft xp-CharCounter xp-IconTxtAlign',
			postLink: 'xp-LinkLabel Tip-HPLatestPost',
			postLinkDiv: 'xp-FloatLeft xp-Padding-4',
			dateDiv: 'xp-PositionAbsolute xp-Padding-4 ui-state-default xp-BoxShadow xp-DisplayNone xp-DateHoverDiv '
		},
		/* 
		* service paths used in this plugin 
		*/
		paths: {
			getSummaryPost: '/_vti_bin/XPointBase/UserPostsService.svc/getPosts'
		},
		/* 
		* methods used in this plugin 
		*/
		methods: {
			/*
			* initializing plugin
			*/
			init: function (options) {
				return this.each(function () {
					var elem = $(this);
					var summaryPostContainer = $("<div />")
				                              .attr('id', $.postSummary.ids.summaryPostContainer)
																			.attr('class', $.postSummary.classes.summaryPostContainer)
																			.attr('data-options', options)
																			.data('options', options)
																			.appendTo(elem);
					$.postSummary.methods.getPostData.call(summaryPostContainer, options);
				});
			},
			/*
			* gets recent post by doing ajax call 
			*/
			getPostData: function (options) {
				var elem = $(this);
				elem.empty();
				var ajaxOpts = {
					url: $.postSummary.paths.getSummaryPost,
					data: ({ "numberOfPosts": options.postCount, "contentTypes": "ALL", "page": options.page, "needPage": options.needPage }),
					type: 'GET',
					dataType: "json",
					success: function (data) {
						var item = data.GetPostsResult;
						if (item.Data.length > 0) {
							$.postSummary.methods.createHtml.call(elem, item.Data[0]);
						}
					}
				};
				/*
				* making ajax call to get the latest post of the user
				*/
				$.xpointTemplates.methods.ajaxCall.call(this, ajaxOpts);
			},
			/* creates html for the item passed */
			createHtml: function (item) {
				var elem = $(this);
				var options = elem.data().options;
				var createdDate = new Date(parseInt(item.CreatedDate.substr(6)));
				/*
				*  getting date in the required format 
				*/
				var formattedDate = $.xpointTemplates.methods.formatDate(createdDate);
				/*
				*  preparing post url for href use
				*/
				var postHref = options.siteUrl + "/SitePages/Post.aspx?PostID=" + item.Id;
				var postLinkDiv = $("<div />")
						                .attr('id', $.postSummary.ids.postLinkDiv)
														.attr('class', $.postSummary.classes.postLinkDiv)
														.appendTo(elem);
				var postLink = $("<a>view my latest post</a>")
						                .attr('id', $.postSummary.ids.postLink)
														.attr('href', postHref)
														.attr('class', $.postSummary.classes.postLink)
														.appendTo(postLinkDiv);
				var timeStampContainer = $("<div />")
						                        .attr('id', $.postSummary.ids.timeStampContainer)
																		.attr('class', $.postSummary.classes.timeStampContainer)
																		.attr('style', 'z-index:10')
																		.appendTo(elem);
				var timeStampIcon = $("<div />")
						                         .attr('id', $.postSummary.ids.timeStampIcon)
																		 .attr('class', $.postSummary.classes.timeStampIcon)
																		 .appendTo(timeStampContainer);
				var dateDiv = $("<div />")
				                  .attr('id', $.postSummary.ids.dateDiv)
													.attr('class', $.postSummary.classes.dateDiv)
													.attr('style', 'left:20px;top:20px')
													.append(formattedDate)
													.appendTo(timeStampContainer);
				var timeStampDiv = $("<div />")
						                     .attr('id', $.postSummary.ids.timeStampDiv)
																 .attr('class', $.postSummary.classes.timeStampDiv)
																 .append($.timeago(createdDate))
																 .appendTo(timeStampContainer)
																 .hover(function () {
																 	dateDiv.removeClass($.xpointTemplates.classes.displayNone);
																 },
																  function () {
																  	dateDiv.addClass($.xpointTemplates.classes.displayNone);
																  });
			}
		}
	}
})(jQuery);