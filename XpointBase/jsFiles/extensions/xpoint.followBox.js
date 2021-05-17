(function ($) {
	$.xpointFollowBox = $.xpointFollowBox || {};
	$.fn.xpointFollowBox = function (options) {
		this.options = $.extend($.xpointFollowBox.defaults, options);
		$.xpointFollowBox.methods.init.apply(this, $.makeArray(this.options));
	};
	$.xpointFollowBox = {
		defaults: {
			toggleFollowUrl: '',
			userId: '',
			followAction: '',
			followStatus: '',
			followUrl: '',
			unFollowUrl: '',
			isFollowingUrl: ''
		},
		methods: {
			init: function (opts) {
				var elem = $(this);
				$.xpointFollowBox.methods.createHtml.apply(this, $.makeArray(opts));
			}, //end init

			/*
			*Build the html
			*/
			createHtml: function (opts) {
				var elem = $(this);
				var mainDiv = $("<div class='xp-OriginatorBtn'></div>").appendTo(elem);
				var buttonDiv = $("<div class='ui-secondarytabclr ui-tabbuttonstyle xp-FloatLeft xp-FollowButton'></div>").appendTo(mainDiv);
				var actionDiv = $("<div class='xp-FloatLeft xp-FollowButtonPadding Tip-PVFllwActionBtn xp-LinkLabel'><div class='xp-LinkLabel ><a href='#' id='xpfollowaction' class='xp-LinkLabel xp-Login'>" + opts.followAction + "</a></div></div>").appendTo(buttonDiv);
				var statusDiv = $("<div class='xp-FloatLeft xp-BorderLeft xp-FollowButtonPadding'><span class=' xp-TopBanner-Fontclrlight xp-Login'><i>" + opts.followStatus + "</i></span></div>").appendTo(buttonDiv);
				if (opts.followStatus === '') {
					statusDiv.addClass("xp-DisplayNone");
				}
				actionDiv.click(function () {
					$.ajax({
						type: "GET",
						cache: false,
						dataType: "json",
						url: opts.isFollowingUrl,
						data: ({ "userId": opts.userId }),
						success: function (data) {
							if (data.IsFollowingResult === false) {
								$.ajax({
									url: opts.followUrl,
									contentType: "application/json; charset=utf-8",
									type: "post",
									dataType: "json",
									data: '{ "userId": ' + opts.userId + '}',
									success: function (data) {
										var result = data.UserFollowResult;
										actionDiv.text(result.ActionStatus);
										statusDiv.addClass("xp-DisplayBlock").removeClass("xp-DisplayNone");
										statusDiv.text(result.FollowStatus);
										$(".profileFollowContainer").profileFollow("refresh");
									} //sucess
								}); //ajax
							} //if
							else {
								$.ajax({
									url: opts.unFollowUrl,
									contentType: "application/json; charset=utf-8",
									type: "post",
									dataType: "json",
									data: '{ "userId": ' + opts.userId + '}',
									success: function (data) {
										var result = data.UserUnFollowResult;
										actionDiv.text(result.ActionStatus);
										statusDiv.text(result.FollowStatus);
										if (result.FollowStatus == '') {
											statusDiv.addClass("xp-DisplayNone").removeClass("xp-DisplayBlock");
										}
										$(".profileFollowContainer").profileFollow("refresh");
									} //sucess
								});
							} //else
						} //sucess
					}); //ajax
				});
			} //end createHtml
		}
	};
})(jQuery);