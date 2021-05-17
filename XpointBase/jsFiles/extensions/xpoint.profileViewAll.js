(function ($) {
	$.profileViewAll = $.profileViewAll || {};
	$.fn.profileViewAll = function (options) {
		this.options = $.extend($.profileViewAll.defaults, options);
		$.profileViewAll.methods.init.apply(this, $.makeArray(this.options));
	};
	/*
	*Providing NameSpace for profileViewAll Action
	*/
	$.profileViewAll = {
		defaults: {
			userId: '',
			userName: '',
			userProfileUrl: '',
			followingCount: '',
			followersCount: '',
			commonFollowersCount: '',
			commonFollowingCount: '',
			numberOfCommonUsers: '0',
			numberOfUsers: '0',
			section: ''
		},
		/*
		*Array to declare various Paths
		*/
		paths: {
			commonFollowersServiceUrl: '/_vti_bin/xpointbase/ProfileService.svc/GetCommonFollowers',
			commonFollowingServiceUrl: '/_vti_bin/xpointbase/ProfileService.svc/GetCommonFollowing',
			followersServiceUrl: '/_vti_bin/xpointbase/ProfileService.svc/GetFollowers',
			followingServiceUrl: '/_vti_bin/xpointbase/ProfileService.svc/GetFollowing'
		},
		/*
		* Array to declare Id's
		*/
		ids: {
			commonUsersCount: 'commonUsersCount'
		},
		/*
		*Array to declare methods
		*/
		methods: {
			/*
			*Entry Point for the plugin
			*/
			init: function (options) {
				var elem = $(this);
				$.profileViewAll.methods.createHtml.apply(elem, $.makeArray(options));
			},
			/*
			* Prepare Common Followers layout
			*/
			getCommonFollowers: function (elem, options) {
				var ajaxOpts = {
					url: $.profileViewAll.paths.commonFollowersServiceUrl,
					data: ({ "userId": options.userId, "numberOfUsers": options.numberOfCommonUsers }),
					success: function (data) {
						var users = data.GetCommonFollowersResult;
						if (users.length > 0) {
							$.profileViewAll.methods.createUsersHtml(elem, users);
						}
						else {
							var messageDiv = $("<div class='xp-Width xp-FloatLeft  xp-BorderBottom xp-Height-60'><div class='xp-NoData xp-FontLite'>Oop's! Seems you dont have common friend's.. </div></div>");
							elem.append(messageDiv);
						}
					}
				};
				$.profileViewAll.methods.ajaxCall(ajaxOpts);
			},
			/*
			* Prepare Common Following layout
			*/
			getCommonFollowing: function (elem, options) {
				var ajaxOpts = {
					url: $.profileViewAll.paths.commonFollowingServiceUrl,
					data: ({ "userId": options.userId, "numberOfUsers": options.numberOfCommonUsers }),
					success: function (data) {
						var users = data.GetCommonFollowingResult;
						if (users.length > 0) {
							$.profileViewAll.methods.createUsersHtml(elem, users);
						}
						else {
							var messageDiv = $("<div class='xp-Width xp-FloatLeft  xp-BorderBottom xp-Height-60'><div class='xp-NoData xp-FontLite'>Oop's! Seems you dont have common friend's.. </div></div>");
							elem.append(messageDiv);
						}
					}
				};
				$.profileViewAll.methods.ajaxCall(ajaxOpts);
			},
			/*
			* Prepare Followers layout
			*/
			getFollowers: function (elem, options) {
				var ajaxOpts = {
					url: $.profileViewAll.paths.followersServiceUrl,
					data: ({ "userId": options.userId, "numberOfUsers": options.numberOfUsers }),
					success: function (data) {
						var users = data.GetFollowersResult;
						if (users.length > 0) {
							$.profileViewAll.methods.createUsersHtml(elem, users);
						}
						else {
							var messageDiv = $("<div class='xp-Width xp-Body xp-FloatLeft  xp-BorderBottom xp-Height-60'><div class='xp-NoData xp-FontLite'>No friend's No problem - Start following!!!</div></div>");
							elem.append(messageDiv);
						}
					}
				};
				$.profileViewAll.methods.ajaxCall(ajaxOpts);
			},
			/*
			* Prepare Following layout
			*/
			getFollowing: function (elem, options) {
				var ajaxOpts = {
					url: $.profileViewAll.paths.followingServiceUrl,
					data: ({ "userId": options.userId, "numberOfUsers": options.numberOfUsers }),
					success: function (data) {
						var users = data.GetFollowingResult;
						if (users.length > 0) {
							//$.profileViewAll.methods.createUsersHtml(elem, users);
						}
						else {
							var messageDiv = $("<div class='xp-Width xp-Body xp-FloatLeft  xp-BorderBottom xp-Height-60'><div class='xp-NoData xp-FontLite'>No friend's No problem - Start following!!!</div></div>");
							//elem.append(messageDiv);
						}
					}
				};
				$.profileViewAll.methods.ajaxCall(ajaxOpts);
			},
			/*Helper for Ajax calls */
			ajaxCall: function (ajaxOpts) {
				if (ajaxOpts) {
					var aOpts = { type: "GET", contentType: "application/json; charset=utf-8", dataType: "json", data: '', cache: false };
					aOpts = $.extend(aOpts, ajaxOpts);
					$.ajax(aOpts);
				}
			},
			/*
			* Prepare Users layout
			*/
			createUsersHtml: function (elem, users) {
				$.each(users, function () {
					var user = this;
					var container = $("<div class='xp-ProfileMiniBox xp-BorderBox  xp-FloatLeft ui-state-default xp-BorderRightBottom'></div>").appendTo(elem);
					var div = $("<div class='xp-Width xp-FloatLeft xp-Body  '></div>").appendTo(container);
					div.append("<div class='xp-FloatLeft xp-Width30 xp-Padding-4 xp-MediumProfilePic '><img  src='" + user.ImageUrl + "' alt='userProfile pic' /></div>");
					var descDiv = $("<div class='xp-FloatLeft xp-Width60 xp-MarginLeft-5'/>");
					descDiv.append("<div class='xp-Padding-2 '><a href='" + user.ProfileUrl + "' class='xp-LinkLabel'>" + user.Name + "</a></div>");
					descDiv.append("<div class='xp-Padding-2 '>" + user.Department + "</div>");
					var comma = ', ';
					if (user.Function.trim() == '' || user.Location.trim() == '') {
						comma = '';
					}
					descDiv.append("<div class='xp-Padding-2 '>" + user.Function + comma + user.Location + "</div>");
					descDiv.appendTo(div);
				});
			},
			/*
			* Creates Layout
			*/
			createHtml: function (options) {
				var elem = $(this);
				var mainDiv = $("<div class='xp-Width  xp-FloatLeft'/>").appendTo(elem);
				/*
				* Following
				*/
				if (options.section == "Following") {
					var commonUsersMainDiv = $("<div class='xp-Width xp-FloatLeft '/>").appendTo(mainDiv);
					var commonUsersHeader = $("<div class='xp-FloatLeft xp-Width50 xp-Height-36  xp-MarginTop-2 xp-Body  xp-PositionRelative'/>").appendTo(commonUsersMainDiv);
					commonUsersHeader.append("<div id='" + $.profileViewAll.ids.commonUsersCount + "' class='xp-Icon-Highlight xp-IconCommonUserAll xp-CommonUserCountView'>" + options.commonFollowingCount + "</div>");
					var commonUsersDivContainer = $("<div class='xp-Width90 xp-BorderBox xp-Overflowhidden xp-FloatLeft ui-state-default '/>").appendTo(commonUsersMainDiv);
					var commonUsersDiv = $("<div class='xp-ProfileViewAllDiv xp-Overflowhidden  xp-ClearBoth  '/>").appendTo(commonUsersDivContainer);

					var usersMainDiv = $("<div class='xp-Width uncommon xp-FloatLeft'></div>").appendTo(mainDiv);
					var usersHeaderDiv = $("<div class='xp-FloatLeft xp-Width xp-Height-36 xp-Body xp-BorderBottom xp-MarginTop-2'> <a href='" + options.userProfileUrl + "' class='xp-LinkLabel'>" + options.userName + "</a>:   " + options.userName + " is following, " + options.followingCount + " </div>").prependTo(mainDiv);
					var spaceDiv = $("<div style='height:0px' class='xp-Width90 xp-BorderBox ui-state-default xp-ClearBoth    '/>").appendTo(usersMainDiv);
					var usersDivContainer = $("<div class='xp-Width90 xp-BorderBox xp-Overflowhidden  ui-state-default xp-FloatLeft  '/>").appendTo(usersMainDiv);
					var usersDiv = $("<div class='xp-ProfileViewAllDiv xp-Overflowhidden  xp-ClearBoth  '/>").appendTo(usersDivContainer);


					//$.profileViewAll.methods.getCommonFollowing(commonUsersDiv, options);
					//$.profileViewAll.methods.getFollowing(usersDiv, options);
				}
				/*
				* Followers
				*/
				else if (options.section == "Follower") {
					var commonUsersMainDiv = $("<div class='xp-Width xp-FloatLeft'/>").appendTo(mainDiv);
					var commonUsersHeader = $("<div class='xp-FloatLeft xp-Width50 xp-Height-36 xp-Body xp-BorderBottom xp-MarginTop-2  xp-PositionRelative'/>").appendTo(commonUsersMainDiv);
					commonUsersHeader.append("<div id='" + $.profileViewAll.ids.commonUsersCount + "' class='xp-Icon-Highlight xp-IconCommonUserAll xp-CommonUserCountView'>" + options.commonFollowersCount + "</div>");
					var commonUsersDivContainer = $("<div class='xp-Width90 xp-BorderBox xp-Overflowhidden xp-FloatLeft ui-state-default '/>").appendTo(commonUsersMainDiv);
					var commonUsersDiv = $("<div class='xp-ProfileViewAllDiv xp-Overflowhidden  xp-ClearBoth  '/>").appendTo(commonUsersDivContainer);
					var spaceDiv = $("<div style='height:0px' class='xp-Width90 xp-FloatLeft xp-BorderBox ui-state-default xp-PostBackground '/>").appendTo(mainDiv);
					var usersMainDiv = $("<div class='xp-Width xp-FloatLeft xp-PaddingBottom-5'/>").appendTo(mainDiv);
					var usersHeaderDiv = $("<div class='xp-FloatLeft xp-Width xp-Height-36 xp-Body xp-BorderBottom xp-MarginTop-2'> <a href='" + options.userProfileUrl + "' class='xp-LinkLabel'>" + options.userName + "</a>:   Following " + options.userName + ", " + options.followersCount + " </div>").prependTo(mainDiv);
					var usersDivContainer = $("<div class='xp-Width90 xp-BorderBox xp-Overflowhidden  ui-state-default xp-FloatLeft  '/>").appendTo(usersMainDiv);
					var usersDiv = $("<div class='xp-ProfileViewAllDiv xp-Overflowhidden  xp-ClearBoth  '/>").appendTo(usersDivContainer);


					$.profileViewAll.methods.getCommonFollowers(commonUsersDiv, options);
					$.profileViewAll.methods.getFollowers(usersDiv, options);
				}
			} //end of CreateHtml            
		}//end of method array
	}//end of namespace
})(jQuery);
