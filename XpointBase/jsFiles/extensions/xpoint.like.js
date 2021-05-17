(function ($) {
	$.xpointLike = $.xpointLike || {};
	$.fn.xpointLike = function (options) {
		this.options = $.extend($.xpointLike.defaults, options);
		$.xpointLike.methods.init.apply(this, $.makeArray(this.options));
	};
	/*
	*Providing NameSpace for xpointLike Action
	*/
	var mainElem;
	$.xpointLike = {
		defaults: {
			componentId: '',
			isLiked: false,
			likeImage: 'xp-IconLcUnlike xp-Icon-Highlight',
			unlikeImage: 'xp-IconLcLike xp-Icon-Highlight ',
			serviceUrl: ''
		},
		/*
		*Array to declare various Paths
		*/
		paths: {
			toggleLikeUrl: "ToggleLike",
			getLikesCountUrl: "GetTotalLikesCount",
			isLikedUrl: "IsLiked"
		},
		/*
		* Array to declare Id's
		*/
		ids: {
			likeImage: "xpointLikeImage",
			likeIcon: "xpointLikeIcon"
		},
		/*
		*Array to declare methods
		*/
		methods: {
			/*
			*Entry Point for the plugin
			*/
			init: function (options) {
				mainElem = $(this);
				$.xpointLike.methods.createHtml.apply(mainElem, $.makeArray(options));
			},
			/*Helper for Ajax calls */
			ajaxCall: function (ajaxOpts, opts) {
				if (ajaxOpts) {
					var aOpts = {
						contentType: "application/json; charset=utf-8",
						type: "post",
						dataType: "json",
						data: "{componentId:'" + opts.componentId + "'}"
					};
					aOpts = $.extend(aOpts, ajaxOpts);
					$.ajax(aOpts);
				}
			},
			/*
			*Toggles like/unlike on click of the icon
			*/
			toggleLike: function (opts) {
				$('#' + $.xpointLike.ids.likeIcon).click(function () {
					var ajaxOpts = {
						url: opts.serviceUrl + $.xpointLike.paths.toggleLikeUrl,
						success: function (datap, status) {
							var data = datap.d;
							var aOpts = {
								url: opts.serviceUrl + $.xpointLike.paths.getLikesCountUrl,
								success: function (datap) {
									$('.xp-LikesCount').text(datap.d);
								}
							};
							$.xpointLike.methods.ajaxCall(aOpts, opts);
							if (data.Message == "Liked") {
								opts.isLiked = true;
							}
							else {
								opts.isLiked = false;
							}
							$.xpointLike.methods.setImage(opts);
						}
					};
					$.xpointLike.methods.ajaxCall(ajaxOpts, opts);
				});
			},
			setImage: function (opts) {
				var likeImage = $("#" + $.xpointLike.ids.likeImage);
				var imgSource, imgTitle;
				if (opts.isLiked == true) {
					imgSource = opts.likeImage;
					imgTitle = 'Unlike';
				}
				else {
					imgSource = opts.unlikeImage;
					imgTitle = 'Like';
				}
				likeImage
				 .attr('class', imgSource)
				 .attr('title', imgTitle);
			}, //end of setImage 
			/*
			* Creates Layout
			*/
			createHtml: function (opts) {
				var like = "<div id='" + $.xpointLike.ids.likeIcon + "'><span class='xp-HoverCursor'><div id='" + $.xpointLike.ids.likeImage + "'></div></span></div>";
				mainElem.append(like);
				var ajaxOpts = {
					url: opts.serviceUrl + $.xpointLike.paths.isLikedUrl,
					success: function (datap) {
						opts.isLiked = datap.d;
						$.xpointLike.methods.setImage(opts);
						$.xpointLike.methods.toggleLike(opts);
					}
				};
				$.xpointLike.methods.ajaxCall(ajaxOpts, opts);
			} //end of CreateHtml   

		}//end of method array
	}//end of namespace
})(jQuery);

