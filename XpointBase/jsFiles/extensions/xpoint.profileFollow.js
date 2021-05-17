(function ($) {
	$.profileFollow = $.profileFollow || {};
	$.fn.profileFollow = function (options) {
		/*
		* logic  for calling method which are under profileFollow nameSpace
		*/
		if (!this || this.length == 0) {
			return;
		}
		var elem = this;
		if (typeof (options) == "object") {
			var options = $.extend($.profileFollow.defaults, options);
			$.profileFollow.methods.init.call(elem, options);
			return this.each(function () {
				var jElem = this;
				jElem.profileFollowOpts = options;
			});
		}
		var fnCall = $.profileFollow.methods[options];
		if (fnCall && $.isFunction(fnCall)) {
			return fnCall.call(elem, arguments[1]);
		}
	};
	/*
	*Providing NameSpace for profileFollow Action
	*/
	$.profileFollow = {
		defaults: {
			userId: '',
			userName: '',
			followingCount: '',
			followersCount: '',
			commonFollowersCount: '',
			commonFollowingCount: '',
			numberOfCommonUsers: '2',
			numberOfUsers: '4'
		},
		/*
		*Array to declare various Paths
		*/
		paths: {
			commonFollowersServiceUrl: '/_vti_bin/xpointbase/ProfileService.svc/getCommonFollowers',
			commonFollowingServiceUrl: '/_vti_bin/xpointbase/ProfileService.svc/getCommonFollowing',
			followersServiceUrl: '/_vti_bin/xpointbase/ProfileService.svc/getFollowersHtml',
			followingServiceUrl: '/_vti_bin/xpointbase/ProfileService.svc/getFollowingHtml',
			followersFollowingCountServiceUrl: '/_vti_bin/xpointbase/ProfileService.svc/getFollowerFollowingCount'
		},
		/*
		* Array to declare Id's
		*/
		ids: {
			followingTab: "followingTab",
			followersTab: "followersTab"
		},
		/*
		*Array to declare methods
		*/
		methods: {
			refresh: function () {
				var elem = $(this);
				var profileFollowOpts = elem.get(0).profileFollowOpts
				elem.empty();
				$.profileFollow.methods.init.call(elem, profileFollowOpts);
			},
			/*
			*Entry Point for the plugin
			*/
			init: function (options) {
				var elem = $(this);
				elem.addClass("profileFollowContainer");
				$.profileFollow.methods.createHtml.apply(elem, $.makeArray(options));

			},
			/*Helper for Ajax calls */
			ajaxCall: function (ajaxOpts, options) {
				if (ajaxOpts) {
					var aOpts = { type: "GET", contentType: "application/json; charset=utf-8", dataType: "json", cache: false,
						data: ({ "userId": options.userId, "numberOfCommonUsers": options.numberOfCommonUsers, "numberOfUsers": options.numberOfUsers })
					};
					aOpts = $.extend(aOpts, ajaxOpts);
					$.ajax(aOpts);
				}
			},
			/*
			* Prepare Following layout
			*/
			getFollowingHtml: function (elem, options) {
				var ajaxOpts = {
					url: $.profileFollow.paths.followingServiceUrl,
					success: function (data) {
						//elem.append(data.GetFollowingHtmlResult);
						return false;
					}
				};
				$.profileFollow.methods.ajaxCall(ajaxOpts, options);
			},
			/*
			* Prepare Followers layout
			*/
			getFollowersHtml: function (elem, options) {
				var ajaxOpts = {
					url: $.profileFollow.paths.followersServiceUrl,
					success: function (data) {
						//elem.append(data.GetFollowersHtmlResult);
						return false;
					}
				};
				$.profileFollow.methods.ajaxCall(ajaxOpts, options);
			},
			/*
			* Creates Layout
			*/
			createHtml: function (options) {
				var elem = $(this);
				var mainDiv = $("<div class='xp-Width xp-FloatLeft  xp-MarginTop-5 xp-DisplayBlock'/>").appendTo(elem);
				var headerTabsDiv = $("<div class='xp-FloatLeft xp-Width '/>");
				var ajaxOpts = {
					url: $.profileFollow.paths.followersFollowingCountServiceUrl,
					data: ({ "userId": options.userId }),
					success: function (data) {
						var result = data.GetFollowerFollowingCountResult;
						if (result.Status == "success") {
//							/*
//							*Tabs
//							*/
//							var headerTabs = $("<ul style='position:relative;padding:0px!important;margin:0px!important;border-right:0px!important;background: none repeat scroll 0 0 transparent;' class='xp-FloatLeft xp-Width'>");
//							headerTabs.append("<li class='xp-FollowTabs xp-Width49 '><a class='xp-TabLink' style='color:#3f3f40!important;font-size:8pt !important'  href='#" + $.profileFollow.ids.followingTab + "'>" + options.userName + " is Following, <span>" + result.FollowingCount + "</span></a></li>");
//							headerTabs.append("<li style='margin-left:2px' class='xp-FollowTabs xp-Width49 '><a class='xp-TabLink' style='color:#3f3f40!important;font-size:8pt !important' href='#" + $.profileFollow.ids.followersTab + "'>Following " + options.userName + ", <span>" + result.FollowersCount + "</span></a></li>");
//							headerTabs.append("</ul>");
//							/*
//							*Tabs content
//							*/
//							var followingContent = $("<div id='" + $.profileFollow.ids.followingTab + "' style='padding:0px;margin:0px;display:block' class='xp-Font xp-FloatLeft xp-Width'></div>").appendTo(headerTabs);
//							var followingContentHtml = $("<div class='xp-FloatLeft xp-Width xp-OuterPanel xp-PositionRelative'  style='border-width:2px 1px 1px 1px !important;' ></div>").appendTo(followingContent);
//							$.profileFollow.methods.getFollowingHtml(followingContentHtml, options);

//							var followersContent = $("<div id='" + $.profileFollow.ids.followersTab + "' style='padding:0px;margin:0px;display:block' class='xp-Font xp-FloatLeft xp-Width'></div>").appendTo(headerTabs);
//							var followersContentHtml = $("<div class='xp-FloatLeft xp-Width xp-OuterPanel   xp-PositionRelative'  style='border-width:2px 1px 1px 1px !important;' />").appendTo(followersContent); ;
//							$.profileFollow.methods.getFollowersHtml(followersContentHtml, options);

//							headerTabsDiv.append(headerTabs).tabs();
//							headerTabsDiv.appendTo(mainDiv);
						}
					}
				};
				$.profileFollow.methods.ajaxCall(ajaxOpts, options);
			} //end of CreateHtml            
		}//end of method array
	}//end of namespace
})(jQuery);
