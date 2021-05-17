(function ($) {
	$.fn.postTemplates = function (options) {
		/*
		* logic  for calling method which are under postTemplates nameSpace
		*/
		if (!this || this.length == 0) {
			return;
		}
		var elem = this;
		if (typeof (options) == "object") {
			var jElem = elem.get(0);
			var options = $.extend($.postTemplates.defaults, options);
			jElem.options = options;
			return $.postTemplates.methods.init.call(elem, options);
		}
		var fnCall = $.postTemplates.methods[options];
		if (fnCall && $.isFunction(fnCall)) {
			return fnCall.call(elem, arguments[1]);
		}
	};
	/* 
	* Stores the plugin options  
	*/
	var options;
	var maindivElem;
	$.postTemplates = {
		templates: [],
		navButtons: [],
		addNavButtons: function (name, navConfig) {
			/*Updating navingation buttons array*/
			$.postTemplates.navButtons[name] = navConfig;
		},
		/* Adding new template type*/
		addTemplate: function (name, templateConfig) {
			$.postTemplates.templates[name] = templateConfig;
		},
		/* 
		* default values 
		*/
		defaults: {
			inputBoxWaterMarkText: 'Write a comment and Press Enter',
			userPictureUrl: '',
			playableAudioFileTypes: [],
			playableMediaFileTypes: [],
			userId: '',
			isSinglePost: false,
			serverUrl: '',
			ajaxOpts: {
				type: 'GET'
			},
			docFileTypes: [],
			imageFileTypes: [],
			mediaFileTypes: []
		},
		/* ids which we used in this plugin will be declared here */
		ids: {
			descriptionArea: 'descriptionArea',
			container: 'container',
			profilePic: 'profilePic',
			mainDiv: 'mainDiv',
			postDescriptionDiv: 'postDescriptionDiv',
			descriptionTopDiv: 'descriptionTopDiv',
			postDescription: 'postDescription',
			descriptionBottomDiv: 'descriptionBottomDiv',
			profilePicDiv: 'profilePicDiv',
			profileUrl: 'profileUrl',
			contextMenuIcon: 'contextMenuIcon',
			duration: 'duration',
			clockIcon: 'clockIcon',
			descBottomUL: 'descBottomUL',
			postDescriptionFormat: 'postDescriptionFormat',
			postcontextMenu: 'postcontextMenu_',
			likeCommentDetailsMainDiv: 'likeCommentDetailsMainDiv_',
			like: 'like_',
			comment: 'comment_',
			time: 'time_',
			commentCount: 'commentCount_',
			likeCount: 'likeCount_',
			viewMore: 'viewMore_',
			readCount: 'readCount_',
			likedByMainDiv: 'likedByMainDiv_',
			commentCountSpan: 'commentCountSpan_',
			closeCommentDiv: 'closeCommentDiv_',
			commentCountMainDiv: 'commentCountMainDiv_',
			pollChartDiv: 'pollChartDiv_',
			pollContentDiv: 'pollContentDiv_',
			pollOptions: 'pollOptions_',
			pollImageDiv: 'pollImageDiv_',
			pollConfirmButtonDiv: 'pollConfirmButtonDiv',
			pollInputDiv: 'pollInputDiv_',
			likeCountSpan: 'likeCountSpan_',
			likeCommentDiv: 'likeCommentDiv',
			likeCountMainDiv: 'likeCountMainDiv',
			videoIcon: 'videoIcon_',
			audioIcon: 'audioIcon_',
			dateDiv: 'dateDiv',
			viewMoreDiv: 'viewMoreDiv_',
			viewLessDiv: 'viewLessDiv_',
			commentParentDiv: 'commentParentDiv',
			inputBox: 'inputBox',
			postMainDiv: 'postMainDiv',
			likeCount: 'likeCount',
			commentCount: 'commentCount',
			postActionList: 'postActionList_',
			likedByMainDiv: 'likedByMainDiv_',
			deletePost: 'deletePost_',
			followPost: 'followPost_',
			videoElem: 'videoElem_',
			audioElem: 'audioElem_',
			viewComment: 'xpointViewCommentDiv_',
			viewMoreLink: 'viewMoreLink',
			inputComment: 'xpointInputCommentDiv_',
			postsContainerDiv: 'postsContainerDiv',
			likeCountMainDiv: 'likeCountMainDiv',
			likeCommentCountMainDiv: 'likeCommentCountMainDiv',
			closeLike: 'closeLike'
		},
		/*
		*Class Array
		*/
		classes: {
			templateContainer: 'postTemplateContainer',
			container: 'xp-FloatLeft xp-Width xp-BorderBottomGray',
			mainDiv: 'xp-FloatLeft xp-Width90 xp-Padding-6 xp-PositionRelative',
			profilePicDiv: 'xp-FloatLeft xp-MarginRight-10 xp-SmallProfilePic',
			postDescriptionDiv: 'xp-FloatLeft xp-MarginRight-10 xp-Width88 ',
			descriptionTopDiv: 'xp-FloatLeft xp-Width90 xp-TxtDescription',
			link: 'xp-LinkLabel',
			descriptionBottomDiv: 'xp-FloatLeft xp-Width xp-PaddingTopBottom-10',
			descBottomUL: 'xp-LikeCommentOptions',
			descriptionArea: 'xp-FloatLeft xp-Width xp-PaddingTop-4',
			contextMenuIcon: 'xp-FloatLeft xp-Margin-0 xp-Padding-0 xp-IconPostAction xp-PositionRelative  xp-HoverCursor  xp-Icon-Highlight Tip-HPMyPostsCntxtMenu',
			duration: 'xp-FontLite xp-FloatLeft',
			clockIcon: 'xp-IconTimestamp xp-Icon xp-FloatLeft xp-PaddingRight-3',
			postcontextMenu: 'postcontextMenu postcontextMenu xp-PositionRelative',
			like: 'like Tip-HPMyPostsLike',
			comment: 'comment Tip-HPMyPostsComment',
			time: 'time Tip-HPMyPostsTime',
			markAsReadCount: 'markAsReadCount',
			commentCount: 'commentCount',
			likeCount: 'likeCount',
			viewMore: 'viewMore',
			postdescriptionArea: 'postdescriptionArea',
			displayNone: 'xp-DisplayNone',
			durationDiv: 'xp-FloatLeft xp-PositionRelative xp-Padding-2   xp-Width',
			dateDiv: 'xp-PositionAbsolute xp-Padding-4 ui-state-default xp-BoxShadow xp-DateHoverDiv  xp-DisplayNone',
			viewMoreDiv: 'viewMoreDiv',
			viewLessDiv: 'viewLessDiv',
			likePost: 'likePost',
			commentPost: 'commentPost',
			viewPost: 'viewPost',
			timeStamp: 'timeStamp',
			dropDown: 'dropDown',
			textCheckBox: 'textCheckBox',
			pollCheckBox: 'pollCheckBox',
			docCheckBox: 'docCheckBox',
			mediaCheckBox: 'mediaCheckBox',
			postMainDiv: 'postMainDiv',
			checkBox: 'checkBox',
			deletePost: 'deletePost',
			followPost: 'followPost',
			readCount: 'readCount Tip-HPMyPostsReadCount',
			closeLike: 'closeLike',
			mediaDiv: 'xp-MyPostsImg xp-FloatLeft',
			contextMenu: 'xp-PositionAbsolute ui-state-default xp-FloatLeft xp-BoxShadow xp-PostActionList ui-corner-all xp-Overflowhidden',
			contextMenuElement: 'xp-FloatLeft xp-Width',
			tourCssViewMore: 'Tip-HPUpdatesViewMore',
			tourCssLikeCount: 'Tip-HPMyPostsLikeCount',
			tourCssCommentCount: 'Tip-HPMyPostsCmntCount'
		},
		/* Service url paths */
		paths: {
			getFileIcon: '/getFileIcon',
			getForumById: '/GetForumById',
			getLifeCycleById: '/GetLifeCycleById',
			getUserDetails: '/_vti_bin/XPointBase/UpdatesService.svc/GetUserDetails',
			getPollData: '/getPollData',
			savePoll: '/SavePoll',
			likePostMethod: '/LikePost',
			unlikePostMethod: '/UnlikePost',
			getPostsMethod: '/GetPosts',
			addPostCommentMethod: '/AddPostComment',
			deletePostMethod: '/DeletePost',
			getPostLikesCommentsCountMethod: '/GetPostLikesCommentsCount',
			isPostLikedByMethod: '/IsPostLikedBy',
			getPostLikedByMethod: '/GetPostLikedBy',
			getPostCommentsMethod: '/GetPostComments',
			getPostByIdMethod: '/GetPostById',
			deletePostCommentMethod: '/DeletePostComment',
			followPost: '/FollowPost',
			unFollowPost: '/UnfollowPost',
			getPostFollowStatus: '/GetPostFollowStatus',
			markPostAsRead: '/MarkPostAsRead',
			getPostReadCount: '/GetPostReadCount',
			loadingImagePath: '/_layouts/Images/XPointBase/indicator.gif',
			defaultImage: '/_layouts/Images/XPointBase/playButton.png',
			isDeleteAllowedMethod: '/IsDeleteAllowed',
			getContextMenuText: '/GetContextMenuText'
		},
		/*
		*Media Configs
		*/
		mediaConfigs: {
			/*
			*Video File Configuration
			*/
			videoConfigs: {
				"flv": {
					type: "video/x-flv"
				},
				"ogv": {
					type: "video/ogg"
				},
				"mp4": {
					type: "video/mp4"
				},
				"webm": {
					type: "video/webm"
				}
			}, //end of videoConfigs
			/*
			*Default VideoConfig
			*/
			defaultVideoConfig: {
				"mp4": {
					type: "video/mp4"
				}
			},
			audioConfigs: {
				"mp3": {
					type: "audio/mp3"
				}
			},
			defaultAudioConfigs: {
				"mp3": {
					type: "audio/mp3"
				}
			} //end of default audio Configs
		}, //end of mediaConfigs

		/* 
		* these methods will be available to call from outside of the plugin 
		*/
		methods: {
			/*Redraws the output*/
			refreshData: function (options) {
				var elem = $("." + $.postTemplates.classes.templateContainer);
				var options = elem.postOptions;
				var checkBoxes = $(":checkbox", $(".xp-PostNavigationList"));
				checkBoxes.attr("checked", false);
				$(checkBoxes.first()).trigger("click", options);

			},
			/*
			* Start point for the plugin 
			*/
			init: function (opts) {
				var jElem = this;
				var options = jElem.postOptions;
				container = $(jElem);
				if (opts) {
					options = $.extend($.postTemplates.defaults, opts);
				}
				jElem.postOptions = options;
				jElem.addClass($.postTemplates.classes.templateContainer);
				/*
				*Calling Create Html method
				*/
				$.postTemplates.methods.createHtml.apply(jElem, $.makeArray(options));
				$("." + $.postTemplates.classes.checkBox).attr('checked', true);
				/*
				*Calling filterPost method on Click of CheckBoxes
				*/
				$("." + $.postTemplates.classes.checkBox).click(function () {
					$.postTemplates.methods.filterPosts.apply(this, $.makeArray(options));
				});
			}, //Init Ends
			/*Helper for Ajax calls */
			ajaxCall: function (ajaxOpts, loadingOpts) {
				var elem = this;
				$(".loading-indicator").hide();
				elem.showLoading(loadingOpts);
				var onComplete = (ajaxOpts.complete && $.isFunction(ajaxOpts.complete)) ? ajaxOpts.complete : null;
				if (ajaxOpts) {
					var aOpts = {
						type: "POST",
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						data: '',
						cache: false,
						complete: function (jqXHR, textStatus) {
							elem.hideLoading();
							if (onComplete) {
								onComplete.call(elem, jqXHR, textStatus);
							}
						}
					};
					aOpts = $.extend(aOpts, ajaxOpts);
					$.ajax(aOpts);
				}
			},
			/* Adds basic html for incoming div (selector) */
			getBasicPostHtml: function (elem, data, opts) {
				var data = data;
				var postTime = new Date(parseInt(data.CreatedDate.substr(6)));

				var container = $("<div />")
                    .attr('id', $.postTemplates.ids.container)
                    .attr('class', $.postTemplates.classes.container);
				var mainDiv = $("<div />")
                    .attr('id', $.postTemplates.ids.mainDiv + data.Id)
                    .attr('class', $.postTemplates.classes.mainDiv)
                    .appendTo(container);
				var profilePicDiv = $("<div />")
                    .attr('id', $.postTemplates.ids.profilePicDiv)
                    .attr('class', $.postTemplates.classes.profilePicDiv)
                    .appendTo(mainDiv);
				var profilePic = $("<img  />")
                    .attr('id', $.postTemplates.ids.profilePic)
                    .attr('src', data.CreatedBy.PictureUrl)
                    .attr('alt', 'Unable to display user profile pic')
                    .attr('title', data.CreatedBy.DisplayName)
                    .appendTo(profilePicDiv);
				var postDescriptionDiv = $("<div />")
                    .attr('id', $.postTemplates.ids.postDescriptionDiv + data.Id)
                    .attr('class', $.postTemplates.classes.postDescriptionDiv)
                    .appendTo(mainDiv);
				var descriptionTopDiv = $("<div />")
                    .attr('id', $.postTemplates.ids.descriptionTopDiv)
                    .attr('class', $.postTemplates.classes.descriptionTopDiv)
                    .appendTo(postDescriptionDiv);

				var profileUrlDiv = $("<div class='xp-PaddingBottom-5'/>")
                    .appendTo(descriptionTopDiv);
				var profileUrl = $("<a>" + data.CreatedBy.DisplayName + "</a>")
                    .attr('id', $.postTemplates.ids.profileUrl)
                    .attr('href', data.CreatedBy.ProfileUrl)
                    .attr('class', $.postTemplates.classes.link)
                    .appendTo(profileUrlDiv);
				var postDescription = $("<div>" + data.Description.replace(/\\"/g, '"').replace(/\\\\/g, "\\") + "</div>")
                    .attr('id', $.postTemplates.ids.postDescription)
                    .appendTo(descriptionTopDiv);
				var postDescriptionFormat = $("<div class='xp-Width xp-Float'/>")
                    .attr('id', $.postTemplates.ids.postDescriptionFormat + data.Id)
                    .appendTo(postDescription);
				var descriptionBottomDiv = $("<div class='xp-FloatLeft' />")
                    .attr('class', $.postTemplates.classes.descriptionBottomDiv)
                    .attr('id', $.postTemplates.ids.descriptionBottomDiv)
                    .appendTo(postDescription);
				var durationDiv = $("<div />")
                    .attr('class', $.postTemplates.classes.durationDiv);
				var descBottomUL = $("<ul id='" + $.postTemplates.ids.descBottomUL + "'/>")
                    .attr('class', $.postTemplates.classes.descBottomUL)
                    .appendTo(descriptionBottomDiv);
				/*
				*Adding Like,Comment Action and Clock Icon
				*/
				var likeLi = $("<li id='" + $.postTemplates.ids.like + data.Id + "'  class='" + $.postTemplates.classes.like + "' data-postId='" + data.Id + "'/>").appendTo(descBottomUL);
				var commentLi = $("<li id='" + $.postTemplates.ids.comment + data.Id + "'class='" + $.postTemplates.classes.comment + "' data-postId='" + data.Id + "' />").appendTo(descBottomUL);
				var timeLI = $("<li id='" + $.postTemplates.ids.time + data.Id + "' class='" + $.postTemplates.classes.time + "'  data-postId='" + data.Id + "'/>").appendTo(descBottomUL);
				likeStatus = data.IsPostLikedBy == true ? "UnLike" : "Like";
				var linkHref = $("<a href='#' class='xp-LinkLabel'>" + likeStatus + "</a>")
                    .appendTo(likeLi);
				var commentHref = $("<a href='#' class='xp-LinkLabel'>Comment</a>")
                    .appendTo(commentLi);
				var clockIcon = $("<div />")
                    .attr('id', $.postTemplates.ids.clockIcon)
                    .attr('class', $.postTemplates.classes.clockIcon)
                    .appendTo(timeLI);
				var date = new Date(parseInt(data.CreatedDate.substr(6)));
				var duration = $("<div class='" + $.postTemplates.classes.time + "'>" + $.timeago(postTime) + "</div>")
                    .attr('id', $.postTemplates.ids.duration + data.Id)
                    .attr('class', $.postTemplates.classes.duration)
                    .appendTo(timeLI);
				var formattedDate = $.postTemplates.methods.formatDate(date);
				durationDiv.appendTo(duration);
				var dateDiv = $("<div/>")
                    .attr('class', $.postTemplates.classes.dateDiv)
                    .attr('id', $.postTemplates.ids.dateDiv + data.Id)
                    .append(formattedDate)
                    .appendTo(durationDiv);
				/* Adding the right context menu icon*/
				var contextMenuDiv = $("<div style= 'float:left;'/ >")
                    .data('postID', data.Id)
                    .attr('class', $.postTemplates.classes.postcontextMenu)
                    .attr('id', $.postTemplates.ids.postcontextMenu + data.Id);
				var contextMenuIcon = $("<div />")
                    .attr('id', $.postTemplates.ids.contextMenuIcon)
                    .attr('class', $.postTemplates.classes.contextMenuIcon)
                    .appendTo(contextMenuDiv);
				contextMenuDiv.appendTo(postDescriptionDiv);
				var likeCommentCountStyle = data.LikesCount > 0 || data.CommentsCount > 0 || data.MarkAsRead === "true" ? "" : "xp-DisplayNone";
				var likeCommentCountMainDiv = $("<div id='" + $.postTemplates.ids.likeCommentCountMainDiv + data.Id + "'  class='xp-FloatLeft  xp-Width90  ui-state-default " + likeCommentCountStyle + "'/>");
				var likeCountstyle = data.LikesCount > 0 ? "" : "xp-DisplayNone";
				var tourLikeCountCss = data.LikesCount > 0 ? $.postTemplates.classes.tourCssLikeCount : "";
				var likeCountMainDiv = $("<div id='" + $.postTemplates.ids.likeCountMainDiv + data.Id + "' class='xp-FloatLeft xp-Padding-4 xp-Width20 " + likeCountstyle + "'/>").appendTo(likeCommentCountMainDiv);
				var likeIconDiv = $("<div class='xp-FloatLeft xp-PaddingRight-3 xp-IconLike-Highlight xp-Icon-Highlight'/>").appendTo(likeCountMainDiv);
				var likeCountDiv = $("<div class='xp-FloatLeft xp-PaddingRight-3'><div id='" + $.postTemplates.ids.likeCount + data.Id + "' class = '" + $.postTemplates.classes.likeCount + "' data-postId='" + data.Id + "'><a href='#' class='xp-LinkLabel'><span id='" + $.postTemplates.ids.likeCountSpan + data.Id + "' class='" + tourLikeCountCss + "'>" + data.LikesCount + "</span> Likes</a></div></div>").appendTo(likeCountMainDiv);
				var commentCountstyle = data.CommentsCount > 0 ? "" : "xp-DisplayNone";
				var tourCommentCountCss = data.CommentsCount > 0 ? $.postTemplates.classes.tourCssCommentCount : "";
				var commentCountMainDiv = $("<div id='" + $.postTemplates.ids.commentCountMainDiv + data.Id + "' class='xp-FloatLeft xp-Padding-4  xp-Width25 " + commentCountstyle + "'/> ").appendTo(likeCommentCountMainDiv);
				var commentIconDiv = $("<div class='xp-FloatLeft xp-PaddingRight-3 xp-IconComment-Highlight xp-Icon-Highlight'/>").appendTo(commentCountMainDiv);
				var commentCountDiv = $("<div class='xp-FloatLeft xp-PaddingRight-3' data-postId='" + data.Id + "'><div id='" + $.postTemplates.ids.commentCount + data.Id + "' class='" + $.postTemplates.classes.commentCount + "'><a href='#' class='xp-LinkLabel'><span id='" + $.postTemplates.ids.commentCountSpan + data.Id + "' class='" + tourCommentCountCss + "'>" + data.CommentsCount + "</span> Comments</a></div></div>").appendTo(commentCountMainDiv);
				var commentsMainDiv = $("<div id= '" + $.postTemplates.ids.likedByMainDiv + data.Id + "'class='xp-FloatLeft  xp-Width  '/>");
				var closeCommentDiv = $("<div id='" + $.postTemplates.ids.closeCommentDiv + data.Id + "' class='xp-FloatLeft  xp-CloseBox xp-Width'></div>");

				likeCommentCountMainDiv.appendTo(postDescriptionDiv);
				$('#' + $.postTemplates.ids.likeCommentDetailsMainDiv + data.Id).empty();
				var likeCommentDetailsMainDiv = $("<div id='" + $.postTemplates.ids.likeCommentDetailsMainDiv + data.Id + "' class='xp-FloatLeft xp-Width90 ui-state-default xp-NoBackground'/>");
				likeCommentDetailsMainDiv.appendTo(postDescriptionDiv);
				if (data.CommentsCount == 0) {
					likeCommentDetailsMainDiv.hide();
				}
				/*
				*Parameters to pass to comments plugin for default display
				*/
				var defaultParams = new Object();
				defaultParams.id = data.Id;
				if (opts.isSinglePost) {
				    defaultParams.isSinglePost = opts.isSinglePost;
				    defaultParams.serverUrl = opts.serverUrl;
				}
				defaultParams.userPictureUrl = opts.userPictureUrl;
				defaultParams.numberOfComments = "2";
				defaultParams.allowInput = false;
				defaultParams.inputBoxWaterMarkText = opts.inputBoxWaterMarkText;
				defaultParams.getCommentsUrl = opts.serviceUrl + $.postTemplates.paths.getPostCommentsMethod;
				defaultParams.saveCommentsUrl = opts.serviceUrl + $.postTemplates.paths.addPostCommentMethod;
				defaultParams.deleteCommentsUrl = opts.serviceUrl + $.postTemplates.paths.deletePostCommentMethod;
				defaultParams.commentCountId = $.postTemplates.ids.commentCountSpan + data.Id;
				defaultParams.commentCountDiv = $.postTemplates.ids.commentCountMainDiv + data.Id;
				defaultParams.viewComment = $.postTemplates.ids.viewComment + data.Id;
				defaultParams.inputComment = $.postTemplates.ids.inputComment + data.Id;
				defaultParams.likeCommentCountMainDiv = $.postTemplates.ids.likeCommentCountMainDiv + data.Id;
				defaultParams.commentsMainDiv = $.postTemplates.ids.likedByMainDiv + data.Id;

				likeCommentDetailsMainDiv.append(commentsMainDiv);
				$.xpointComments.methods.addCommentContainer(commentsMainDiv, defaultParams);
				/*
				*On click of comments count
				*/
				commentCountDiv.click(function () {
					$.postTemplates.methods.viewComments.apply(this, $.makeArray(defaultParams));
					return false;
				});
				/*
				*On click of 'Comment' text
				*/
				commentLi.click(function () {
					likeCommentDetailsMainDiv.show();
					var commentElem = $("#" + $.postTemplates.ids.inputComment + data.Id);
					/*if comments section is not yet displayed on the page*/
					if (commentElem.length == 0) {
						commentsMainDiv.empty();
						likeCommentDetailsMainDiv.empty();
						var params = {};
						$.extend(params, defaultParams);
						params.allowInput = true;
						$.xpointComments.methods.addCommentContainer(commentsMainDiv, params);
						likeCommentDetailsMainDiv.append(commentsMainDiv);
					}
					else {
						$.xpointComments.methods.addInputContainer(defaultParams);
					}
					return false;
				});
				if (opts.isAdminSection == "true") {
					if (data.MarkAsRead == "true") {
						var readCountMainDiv = $("<div class='xp-FloatLeft xp-Padding-4 xp-Width20'/>").appendTo(likeCommentCountMainDiv);
						var readCountIconDiv = $("<div class='xp-FloatLeft xp-PaddingRight-3 xp-IconAddAcknowledge xp-Icon-Highlight'/>").appendTo(readCountMainDiv);
						var readCountCountDiv = $("<div class='xp-FloatLeft xp-PaddingRight-3'><div id='" + $.postTemplates.ids.readCount + data.Id + "' class = '" + $.postTemplates.classes.readCount + "' data-postId='" + data.Id + "'> <span class='xp-FontLite'><span>" + data.ReadByCount + "</span> Read</span></div></div>").appendTo(readCountMainDiv);
					}
				}
				return container;
			},
			/*
			*method to bind Events for Click
			*/
			bindEvents: function (data, options) {
				$("#" + $.postTemplates.ids.postcontextMenu + data.Id).click(function () {
					var contextMenuDiv = $(this);
					var postId = contextMenuDiv.data('postID');
					var elem = $("#" + $.postTemplates.ids.postActionList + postId);
					var hidden = (elem.length == 0 || elem.is(':hidden'));
					if (hidden === true) {
						$.postTemplates.methods.contextMenuAction.call(contextMenuDiv, options, postId);
						return false;
					}
					else {
						elem.remove();
					}
				});
				$("#" + $.postTemplates.ids.like + data.Id).click(function () {
					$.postTemplates.methods.likePost.apply(this, $.makeArray(options));
					return false;
				});
				$("#" + $.postTemplates.ids.time + data.Id).click(function () {
					$.postTemplates.methods.showActualTime.apply(this, $.makeArray(options));
				});
				$("#" + $.postTemplates.ids.likeCount + data.Id).click(function () {
					$.postTemplates.methods.viewLike.apply(this, $.makeArray(options));
					return false;
				});
				$("#" + $.postTemplates.ids.closeLike + data.Id).click(function () {
					$.postTemplates.methods.closeLikeDetails.apply(this, $.makeArray(options));
					return false;
				});
				$("#" + $.postTemplates.ids.videoIcon + data.Id).click(function () {
					$.postTemplates.methods.playVideo(this, data, options);
				});
				$("#" + $.postTemplates.ids.audioIcon + data.Id).click(function () {
					$.postTemplates.methods.playAudio(this, data, options);
				});
				$("#" + $.postTemplates.ids.viewMore + data.Id).click(function () {
					$.postTemplates.methods.viewMoreSystemPosts(this, data, options);
				});
				$("#" + $.postTemplates.ids.duration + data.Id).hover(
				function () {
					$("#" + $.postTemplates.ids.dateDiv + data.Id).show();
				},
        function () {
        	$("#" + $.postTemplates.ids.dateDiv + data.Id).hide();
        });
				$("#" + $.postTemplates.ids.duration + data.Id).click(function () {
					$("#" + $.postTemplates.ids.dateDiv + data.Id).toggle();
				});
			},
			/*
			*Format Date in required format
			*/
			formatDate: function (date) {
				if (typeof (date) == "object") {
					var hours = date.getHours();
					var minutes = date.getMinutes();
					var minutesText = (minutes < 10 && minutes > 0) ? "0" + minutes : minutes;
					var hoursText = (hours > 12) ? (hours - 12) + ":" + minutesText + " PM" : hours + ":" + minutesText + " AM";
					return date.formatDate('dd-mmm-yyyy - ') + hoursText;
				} else {
					return null;
				}
			},
			/*
			*Draw function
			*/
			draw: function (opts) {
				var elem = this;
				$(opts.data).each(function () {
					var dataItem = this;
					$.postTemplates.templates[dataItem.tmpType].draw.call(elem, dataItem);
				});
			},
			/*
			View more system Posts
			*/
			viewMoreSystemPosts: function (elem, options, postId) {
				elem.empty();
				if ($('#' + $.postTemplates.ids.viewMore + postId).css('visibility') == "visible") {
					$('#' + $.postTemplates.ids.viewMore + postId).css({
						display: "none"
					});
					$('#' + $.postTemplates.ids.viewMore + postId).css({
						visibility: "hidden"
					});
					elem.append($("<div class='xp-FloatLeft xp-Width xp-Padding-4'><div id='" + $.postTemplates.ids.viewMore + postId + "' class='viewMoreDiv'><a href='#' class='xp-LinkLabel " + $.postTemplates.classes.tourCssViewMore + "'>View More...</a></div></div>"));
				} else {
					$('#' + $.postTemplates.ids.viewMore + postId).css({
						visibility: "visible"
					});
					$('#' + $.postTemplates.ids.viewMore + postId).css({
						display: "block"
					});
					elem.append($("<div class='xp-FloatLeft xp-Width xp-Padding-4'><div id='" + $.postTemplates.ids.viewMore + postId + "' class='viewMoreDiv'><a href='#' class='xp-LinkLabel'>Show less...</a></div></div>"));
				}
			}, //End of viewMoreSystemPosts
			/*
			*Close Like Details
			*/
			closeLikeDetails: function (options, postId) {
				var elem = $(this);
				$("#" + $.postTemplates.ids.closeLike + postId).hide();
				$('#' + $.postTemplates.ids.likedByMainDiv + postId).hide();
				$('#' + $.postTemplates.ids.closeDiv + postId).hide();
			}, //End of closeLikeDetails
			/*
			*Build ContextMenu on Click
			*/
			contextMenuAction: function (options, postId) {
				var contextMenuDiv = this;
				/*
				*Making Context Menu Actions
				*/
				var contextMenu = $("<div class='" + $.postTemplates.classes.contextMenu + "' id='" + $.postTemplates.ids.postActionList + postId + "'/>").appendTo(contextMenuDiv);
				var deletePostOption = $("<div id ='" + $.postTemplates.ids.deletePost + postId + "' class='xp-FloatLeft xp-Width xp-BorderBottom'><a class='xp-DisplayBlock xp-Floatleft xp-Width xp-Padding-4' href='#'>Delete Post</a></div>");
				/*
				*Ajax call to get whether delete is allowed and Check follow current status
				*/
				var ajaxOptions = {
					type: "GET",
					cache: false,
					async: false,
					dataType: "json",
					url: options.serviceUrl + $.postTemplates.paths.getContextMenuText,
					data: ({ "postId": postId, "isDeleteEnabled": options.isDeleteEnabled }),
					success: function (data) {
						contextMenu = $("#" + $.postTemplates.ids.postActionList + postId);
						var deleteAllowed = data.GetContextMenuTextResult.DeleteText;
						var followStatus = data.GetContextMenuTextResult.FollowText;
						if (deleteAllowed == "True") {
							deletePostOption.appendTo(contextMenu);
						}
						var followPostOption = $("<div id='" + $.postTemplates.ids.followPost + postId + "' class='xp-FloatLeft xp-Width '><a  class='xp-DisplayBlock xp-Floatleft xp-Width xp-Padding-4' href='#'>" + followStatus + " Post</a></div>").appendTo(contextMenu);
						/*
						*Delete Post on deletePost
						*/
						$("#" + $.postTemplates.ids.deletePost + postId).click(function () {
							var deleteAjaxOptions = {
								type: "POST",
								contentType: "application/json; charset=utf-8",
								dataType: "json",
								url: options.serviceUrl + $.postTemplates.paths.deletePostMethod,
								data: '{ "postId": ' + postId + '}',
								success: function (data) {
									var result = data.DeletePostResult.Status;
									if (status = "success") {
									    if (options.isSinglePost) {
									        window.location.href = options.serverUrl;
									    }
									    else {
									        $.postTemplates.methods.init.apply(maindivElem, $.makeArray(options));
									    }
										//$.postTemplates.methods.init.apply(maindivElem, $.makeArray(options));
										return false;
									}

								} //end of success
							}
							$.postTemplates.methods.ajaxCall.call($("#" + $.postTemplates.ids.deletePost + postId), deleteAjaxOptions);
						}); //end of deletePost Click
						/*
						*Follow Post on click if Follow Post
						*/
						$("#" + $.postTemplates.ids.followPost + postId).click(function (e) {
							e.preventDefault();
							if (followStatus == "Follow") {
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8",
									dataType: "json",
									url: options.serviceUrl + $.postTemplates.paths.followPost,
									data: '{ "postId": ' + postId + '}',
									success: function (data) {
										var result = data.FollowPostResult.Status;
										$("#" + $.postTemplates.ids.postActionList + postId).remove();
									} //end of success
								});
							} else {
								$.ajax({
									type: "POST",
									contentType: "application/json; charset=utf-8",
									dataType: "json",
									url: options.serviceUrl + $.postTemplates.paths.unFollowPost,
									data: '{ "postId": ' + postId + '}',
									success: function (data) {
										var result = data.UnfollowPostResult.Status;
										$("#" + $.postTemplates.ids.postActionList + postId).remove();
									} //end of success
								}); //end of followAjaxOptions
							} //end of else
						}); //end of Click
					} //end of ajaxOptions 
				}//end of else
				$.postTemplates.methods.ajaxCall.call(contextMenuDiv, ajaxOptions);
			},  //end of contextMenuAction method
			/*
			*Get like Status for the Specified PostID For the Current User
			*/
			getLikeStatus: function (options, postId) {
				var likeStatus;
				var likeAjaxOptions = {
					type: "GET",
					cache: false,
					dataType: "json",
					url: options.serviceUrl + $.postTemplates.paths.isPostLikedByMethod,
					data: ({
						"postId": postId
					}),
					success: function (data) {
						likeStatus = data.IsPostLikedByResult == "true" ? "UnLike" : "Like";
					}
				}
				$.postTemplates.methods.ajaxCall.call(this, likeAjaxOptions);
				return likeStatus;
			},
			/*
			*Gets Like and Comment Count for the specified PostId
			*/
			getPostLikesCommentsCount: function (options, postId) {
				var elem = $(this);
				var likeCommentOptions = {
					type: "GET",
					cache: false,
					dataType: "json",
					url: options.serviceUrl + $.postTemplates.paths.getPostLikesCommentsCountMethod,
					data: ({
						"postId": postId
					}),
					success: function (countData) {
						var countResult = countData.GetPostLikesCommentsCountResult;
						$("#" + $.postTemplates.ids.likeCountSpan + postId).text(countResult.LikesCount);
					}
				}
				$.postTemplates.methods.ajaxCall.call(elem, likeCommentOptions);
			},
			/*
			like/unlike the post
			*/
			likePost: function (options) {
				var elem = $(this);
				var serviceUrl = $.postTemplates.paths.likePostMethod;
				var postId = elem.data('postId');
				/*
				*Ajax call to get the likeStatus
				*Assigning serviceUrl based on the likeStatus
				*/
				var likePostOptions = {
					type: "GET",
					cache: false,
					dataType: "json",
					url: options.serviceUrl + $.postTemplates.paths.isPostLikedByMethod,
					data: ({
						"postId": postId
					}),
					success: function (data) {
						serviceUrl = data.IsPostLikedByResult == true ? options.serviceUrl + $.postTemplates.paths.unlikePostMethod : options.serviceUrl + $.postTemplates.paths.likePostMethod;
						/*
						*Calling Like/Unlike Methods based on the status retrieved 
						*from the previous Ajax call and changing Action 
						*i.e whether to Like/Unlike based on the result recieved
						*/
						var ajaxOptions = {
							type: "POST",
							contentType: "application/json; charset=utf-8",
							dataType: "json",
							url: serviceUrl,
							data: '{ "postId": ' + postId + '}',
							success: function (result) {
								var actionResult = result.LikePostResult != null ? result.LikePostResult : result.UnlikePostResult;
								var result = actionResult.Message;
								if (result == "Liked") {
									elem.empty();
									elem.append($("<a href='#' class='xp-LinkLabel'>UnLike</a>"));
								} else if (result == "UnLiked") {
									elem.empty();
									elem.append($("<a href='#' class='xp-LinkLabel'>Like</a>"));
								}
								var likeCommentOptions = {
									type: "GET",
									cache: false,
									dataType: "json",
									url: options.serviceUrl + $.postTemplates.paths.getPostLikesCommentsCountMethod,
									data: ({
										"postId": postId
									}),
									success: function (countData) {
										var countResult = countData.GetPostLikesCommentsCountResult;
										/*
										* check if the likes count is more than 0, if yes then update the likes count 
										* in the main div else hide the main div
										*/
										if (countResult.LikesCount > 0) {
											$("#" + $.postTemplates.ids.likeCountMainDiv + postId).removeClass('xp-DisplayNone');
											$("#" + $.postTemplates.ids.likeCommentCountMainDiv + postId).removeClass('xp-DisplayNone');
											$("#" + $.postTemplates.ids.likeCountSpan + postId).text(countResult.LikesCount);
											$('#' + $.postTemplates.ids.likeCountSpan + postId).addClass($.postTemplates.classes.tourCssLikeCount);
										}
										else {
											$('#' + $.postTemplates.ids.likeCountSpan + postId).removeClass($.postTemplates.classes.tourCssLikeCount);
											$("#" + $.postTemplates.ids.likeCountMainDiv + postId).addClass('xp-DisplayNone');
											if (countResult.CommentsCount < 0) {

												$("#" + $.postTemplates.ids.likeCommentCountMainDiv + postId).addClass('xp-DisplayNone');
											}

										}
									}
								}
								$.postTemplates.methods.ajaxCall.call(elem, likeCommentOptions);
							} //end of success
						} //end of ajax call
						$.postTemplates.methods.ajaxCall.call(elem, ajaxOptions);
					}
				}
				$.postTemplates.methods.ajaxCall.call(elem, likePostOptions);
			},
			/*
			*View Users who liked the Post
			*/
			viewLike: function (options) {
				var elem = $(this);
				var likeContainer = $(elem.parent());
				var postId = elem.data('postId');
				var likedByUser;
				var viewLikeAjaxOptions = {
					type: "GET",
					cache: false,
					dataType: "json",
					url: options.serviceUrl + $.postTemplates.paths.getPostLikedByMethod,
					data: ({
						"postId": postId
					}),
					success: function (data) {
						var likedByResult = data.GetPostLikedByResult;
						var likedByCount = likedByResult.length;
						var likedByMainDiv = $("<div id= '" + $.postTemplates.ids.likedByMainDiv + postId + "'class='xp-FloatLeft  xp-Width  '/>");
						var likedByDiv = $("<div class='xp-Width xp-FloatLeft xp-PositionRelative '/>").appendTo(likedByMainDiv);
						var rowDiv = $("<div class='xp-FloatLeft  xp-Width xp-NoBackground xp-BottomBorder ui-state-default'/>").appendTo(likedByDiv);
						$(likedByResult).each(function (i) {
							var likedByUser = this;
							var userDiv = $("<div class='xp-FloatLeft xp-Padding-4 xp-Width30 xp-Height-60'>").appendTo(rowDiv);
							var userImageDiv = $("<div class='xp-FloatLeft xp-PaddingRight-5 xp-SmallProfilePic '><img src='" + likedByUser.LikedBy.PictureUrl + "' /> </div>").appendTo(userDiv);
							var userNameDiv = $("<div class='xp-FloatLeft'><a href='" + likedByUser.LikedBy.ProfileUrl + "' class='xp-LinkLabel'>" + likedByUser.LikedBy.DisplayName + "</a></div>").appendTo(userDiv);
						})
						$('#' + $.postTemplates.ids.likeCommentDetailsMainDiv + postId).empty();
						$('#' + $.postTemplates.ids.likeCommentDetailsMainDiv + postId).append(likedByMainDiv);
						$('#' + $.postTemplates.ids.likeCommentDetailsMainDiv + postId).show();
						if (likedByCount > 9) {
							$('#' + $.postTemplates.ids.likedByMainDiv + postId).addClass("xp-LikeCommentScroll ");
							$('#' + $.postTemplates.ids.likedByMainDiv + postId).jScrollPane({
								'verticalDragMinHeight': '60',
								'autoReinitialise': true
							});
						}
						var closeDiv = $("<div id='" + $.postTemplates.ids.closeDiv + postId + "' class='xp-FloatLeft xp-CloseBox xp-Width'><div class='xp-FloatLeft xp-Padding-4'><div id='" + $.postTemplates.ids.closeLike + postId + "'><a href='#' class='xp-PaddingLeft-7 xp-LinkLabel'>Close</a></div></div></div>");
						$('#' + $.postTemplates.ids.likeCommentDetailsMainDiv + postId).append(closeDiv);
						$("#" + $.postTemplates.ids.closeLike + postId).click(function () {
							$.postTemplates.methods.closeLikeDetails(options, postId);
							return false;
						});
					}
				}
				$.postTemplates.methods.ajaxCall.call(likeContainer, viewLikeAjaxOptions);
			},
			viewComments: function (defaultParams) {
				var elem = $(this);
				var postId = elem.data('postId');
				var likeCommentDetailsMainDiv = $('#' + $.postTemplates.ids.likeCommentDetailsMainDiv + postId);
				likeCommentDetailsMainDiv.empty();
				/*
				*Parameters to pass to comments plugin to view all comments
				*/
				var viewAllParams = {};
				$.extend(viewAllParams, defaultParams);
				viewAllParams.numberOfComments = "0";
				viewAllParams.allowInput = true;
				/*
				*Prepare comments container to view all comments
				*/
				var commentsMainDiv = $("<div id= '" + $.postTemplates.ids.likedByMainDiv + postId + "'class='xp-FloatLeft  xp-Width'/>");
				$.xpointComments.methods.addCommentContainer(commentsMainDiv, viewAllParams);
				likeCommentDetailsMainDiv.append(commentsMainDiv);
				/*
				*Close button to return to defualt display
				*/
				var closeCommentDiv = $("#" + $.postTemplates.ids.closeCommentDiv + postId);
				if (closeCommentDiv.length > 0) {
					closeCommentDiv.remove();
				}
				closeCommentDiv = $("<div id='" + $.postTemplates.ids.closeCommentDiv + postId + "' class='xp-FloatLeft  xp-CloseBox xp-Width'></div>").appendTo(likeCommentDetailsMainDiv);
				closeCommentDiv.append("<div class='xp-FloatLeft xp-Padding-4'><a href='#' class='xp-PaddingLeft-7 xp-LinkLabel'>Close</a></div>");
				closeCommentDiv.click(function () {
					likeCommentDetailsMainDiv.empty();
					$.xpointComments.methods.addCommentContainer(likeCommentDetailsMainDiv, defaultParams);
					$(this).hide();
				});
				return false;
			},
			/*
			Creates Layout
			*/
			createHtml: function (options) {
				maindivElem = $(this);
				maindivElem.empty();
				var mainDiv = $("<div id='" + $.postTemplates.ids.postMainDiv + "' class='xp-FloatLeft xp-Width xp-MarginTop-10' style='2px solid red'></div>").appendTo(maindivElem);
				var navigation = $("<div class='xp-FloatLeft xp-Width99 xp-Padding-4 xp-BorderBottomBlack'/>");
				var iconDiv = $("<div class='xp-FloatLeft xp-Padding-4' ><div class='xp-FloatLeft xp-PaddingRight-5 xp-Icon-Highlight " + options.iconClass + " '> </div>").appendTo(navigation);
				var linkDiv = $("<div class='xp-FloatLeft xp-Padding-4'><a href='#' class='xp-LinkLabel xp-FontBold Tip-HP" + options.navigationTitle.replace(' ', '') + "'>" + options.navigationTitle + "</a></div>").appendTo(navigation);
				var filterSection = $("<div style='margin-top:-5px' class='xp-FloatLeft  xp-Padding-4 Tip-HPMyPostsFilter '/>").appendTo(navigation);
				var filterUl = $("<ul class='xp-PostNavigationList xp-CustomForm xp-Margin-0 xp-Padding-0'/>").appendTo(filterSection);
				var textFilter = $("<li><input type='checkbox' id='Text' data-ContentType='TextPostContentType' class='" + $.postTemplates.classes.checkBox + "' name='text' value='Text' /> <label for='Text'>Text</label></li>").appendTo(filterUl);
				var mediaFilter = $("<li ><input type='checkbox' data-ContentType='MediaPostContentType' class='" + $.postTemplates.classes.checkBox + "' name='media' id='Media' value='Media' /><label for='Media'> Media</label>").appendTo(filterUl);
				var documentFilter = $("<li><input type='checkbox' data-ContentType='DocumentPostContentType'  class='" + $.postTemplates.classes.checkBox + "' name='documents' id='Documents' value='Documents' /><label for='Documents'>Documents</label></li>").appendTo(filterUl);
				var pollFilter = $("<li><input type='checkbox' data-ContentType='PollPostContentType' class='" + $.postTemplates.classes.checkBox + "' name='polls' id='Polls' value='Polls'/><label for='Polls'>Polls</label></li>").appendTo(filterUl);
				var linkFilter = $("<li><input type='checkbox' data-ContentType='LinkPostContentType' class='" + $.postTemplates.classes.checkBox + "' name='polls' id='Links' value='Links'/> <label for='Links'>Links</label></li>").appendTo(filterUl);
				maindivElem.append(navigation);
				maindivElem.append(mainDiv);
				var postsDiv = $("<div id='" + $.postTemplates.ids.postsContainerDiv + "' class='xp-FloatLeft xp-Width99 xp-Padding-4'/>").appendTo(maindivElem);
				$.postTemplates.methods.displayPosts(postsDiv, options, "ALL");
			},
			//end of CreateHtml
			displayPosts: function (elem, options, selectedContentTypes) {
				var ajaxOptions = {
					type: "GET",
					dataType: "json",
					cache: false,
					url: options.serviceUrl + $.postTemplates.paths.getPostsMethod,
					data: ({ "numberOfPosts": options.numPosts, "contentTypes": selectedContentTypes, "page": options.currentPage, "needPage": options.isPagingEnabled }),
					success: function (data) {
						var posts = data.GetPostsResult;
						$(posts.Data).each(function () {
							var post = this;
							if (post.IsPostValid) {
								$.postTemplates.templates[post.FormatType].draw(elem, post, options);
							}
						})
						/*
						*Paging - View More
						*/
						if (posts.NeedPage === true) {
							var viewMoreDiv = $("#" + $.postTemplates.ids.viewMoreLink + "_Container");
							viewMoreDiv.remove();
							if (posts.TotalCount > (posts.PageSize * posts.Page)) {
								viewMoreDiv = $("<div id='" + $.postTemplates.ids.viewMoreLink + "_Container' class='xp-FloatLeft xp-Width ui-state-default xp-TextAlignCenter ui-corner-all xp-MarginTop-5 xp-HoverCursor' />");
								viewMoreDiv.appendTo(elem);
								var viewMoreLink = $("<a id='" + $.postTemplates.ids.viewMoreLink + "' class='xp-nothers xp-PositionRelative xp-LinkLabel xp-HoverCursor xp-Height-20 xp-LineHeight-35 " + $.postTemplates.classes.tourCssViewMore + "' >View More</a>")
        																									.appendTo(viewMoreDiv)
        																									.click(function () {
        																										var ops = options;
        																										ops.currentPage = (posts.Page + 1);
        																										$.postTemplates.methods.displayPosts(elem, ops, selectedContentTypes);
        																									});
							}
						}
					}
				}
				var loadingPosition = { marginTop: "300px" };
				$.postTemplates.methods.ajaxCall.call(maindivElem, ajaxOptions, loadingPosition);
			},
			//end of CreateHtml
			/*
			*filter Posts based on the selection made from checkBox
			*/
			filterPosts: function (options) {
				var elem = $(this);
				var ulParent = elem.parents("ul").get(0);
				var isElemChecked = $(elem).is(':checked');
				var checkedElems = $("input:checked", $(ulParent));
				var elemCheckedlength = checkedElems.length;
				/*
				*If none of the  checkBox are selected 
				*	then displaying all posts
				*/
				if (elemCheckedlength == 0) {
					$.postTemplates.methods.init.apply(maindivElem, $.makeArray(options));
				}
				/*
				*In case there are multiple checkBox selected then displaying posts of 
				*content Types specified by the checked CheckBox
				*/
				else {
					var selectedContentTypes = "";
					$.each(checkedElems, function (i) {
						var selected = this;
						selectedContentTypes += $(selected).data('ContentType') + ",";
					});
					var selectedContents = selectedContentTypes.substr(0, selectedContentTypes.lastIndexOf(','));
					var postsDiv = $("#" + $.postTemplates.ids.postsContainerDiv);
					if (postsDiv.length > 0) {
						postsDiv.children().remove();
						postsDiv.remove();
					}
					postsDiv = $("<div id='" + $.postTemplates.ids.postsContainerDiv + "' class='xp-FloatLeft xp-Width xp-MarginTop-10' style='2px solid red'></div>").appendTo(maindivElem);
					$.postTemplates.methods.displayPosts(postsDiv, options, selectedContents);
				}
			},
			/*
			*Creates Post Layout for Posts
			*/
			createPostLayout: function (elem, post, options) {
				var postId = post.Id;
				var navConfigs = null;
				/*
				*Check if post is valid
				*/
				if (post.IsPostValid) {
					$.postTemplates.templates[post.FormatType].draw(elem, post, options);
				}
			},
			/*
			*Retrieving and Creating Layout for each of the Post
			*/
			getPostById: function (options) {
				var elem = $(this);
				var ajaxOptions = {
					type: "GET",
					cache: false,
					dataType: "json",
					url: options.serviceUrl + $.postTemplates.paths.getPostByIdMethod,
					data: ({
						"postId": options.postId
					}),
					success: function (data) {
						postData = data.GetPostByIdResult;
						if (postData.IsPostValid) {
							$.postTemplates.templates[postData.FormatType].draw(elem, postData, options);
						}
					}
				}
				$.postTemplates.methods.ajaxCall.call(elem, ajaxOptions);
			},
			/*
			*Play Videos file by passing required configuration
			*/
			playVideo: function (elem, data, options) {
				var postId = $(elem).data('postId');
				var videoDiv = $("<div class='" + $.postTemplates.classes.mediaDiv + "'/>");
				var videoElem = $("<video id='" + $.postTemplates.ids.videoElem + data.Id + "' width='300' height='230' controls preload='auto' autoplay='true' class='video-js vjs-default-skin'></video>")
                    .appendTo(videoDiv);
				/*
				*Hiding the Icon and adding VideoDiv
				*/
				$(elem).hide();
				$(elem).parent().prepend(videoDiv);
				var ext = data.FileName.substr(data.FileName.lastIndexOf('.') + 1).toLowerCase();
				var config = $.postTemplates.mediaConfigs.videoConfigs[ext] != null ? $.postTemplates.mediaConfigs.videoConfigs[ext] : $.postTemplates.mediaConfigs.defaultVideoConfig;
				var vPlayerOpts = $.extend({
					src: data.FileUrl
				}, config);
				_V_("#" + $.postTemplates.ids.videoElem + data.Id).ready(function () {
					var vPlayer = this;
					vPlayer.src(vPlayerOpts);
				});
			},
			/*
			*Play Audio file by passing required configuration
			*/
			playAudio: function (elem, data, options) {
				var ext = data.FileName.substr(data.FileName.lastIndexOf('.') + 1).toLowerCase();
				var config = $.postTemplates.mediaConfigs.audioConfigs[ext] != null ? $.postTemplates.mediaConfigs.audioConfigs[ext] : $.postTemplates.mediaConfigs.defaultAudioConfig;
				var audioDiv = $("<div class='" + $.postTemplates.classes.mediaDiv + "'/>");
				/*
				*Hiding the Icon and adding AudioDiv
				*/
				$(elem).hide();
				$(elem).parent().prepend(audioDiv);
				$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
				if ($.browser.chrome) {
					var audioElem = $("<audio id='" + $.postTemplates.ids.audioElem + data.Id + "' controls='controls' autoplay='autoplay'></audio>").appendTo(audioDiv);
					var audioSource = $("<source src='" + data.FileUrl + "' type='audio/mp3'/>").appendTo(audioElem);
				}
				else {
					$("<audio id='" + $.postTemplates.ids.audioElem + data.Id + "' src='" + data.FileUrl + "' type='audio/mp3' controls='controls'></audio>")
					.appendTo(audioDiv);
					$("#" + $.postTemplates.ids.audioElem + data.Id).ready(function () {
						$("#" + $.postTemplates.ids.audioElem + data.Id).mediaelementplayer({
							build: '/_layouts/xpointbase/jsFiles/others/',
							plugins: ['flash'],
							success: function (mediaElement, domObject) {
								mediaElement.play();
							}
						});
					});
				}
			}
		} //end of methods
	};
	/*
	* Used for text type rendering 
	*/
	$.postTemplates.addTemplate("Text", {
		draw: function (elem, data, opts) {
			elem.append($.postTemplates.methods.getBasicPostHtml(elem, data, opts));
			$.postTemplates.methods.bindEvents(data, opts);
			return elem;
		}
	});
	/*
	*Used for image type rendering
	*/
	$.postTemplates.addTemplate("Image", {
		draw: function (elem, data, opts) {
			if (data.Link != "") {
				elem.append($.postTemplates.templates["Link"].draw(elem, data, opts));
			}
			/*Adding the basic html to the post */
			else {
				var basicPostHtml = $.postTemplates.methods.getBasicPostHtml(elem, data, opts);
				elem.append(basicPostHtml);

			}
			var descriptionArea = $("#" + $.postTemplates.ids.postDescriptionFormat + data.Id);

			/*description area where we add our custom coding for each type*/
			var imageDiv = $("<div class='xp-MyPostsImg xp-FloatLeft' />");
			var image = $("<a href='" + data.FileUrl + "'><img  src='" + data.FileUrl + "' alt='" + data.FileName + "' text='Image posted By+" + data.CreatedBy.DisplayName + "' /></a>")
                .appendTo(imageDiv)
			$(descriptionArea).append(imageDiv);
			$.postTemplates.methods.bindEvents(data, opts);
			var imageNameDiv = $("<div class='xp-VerticalAlignTop xp-Breakword xp-Width-170 xp-FloatLeft xp-MarginLeft-5' />")
                .appendTo(descriptionArea);
			var imageNameHref = $("<a href='" + data.FileUrl + "'>" + data.FileName + "<a/>")
                .val(data.FileName)
                .appendTo(imageNameDiv);
		}
	});
	/*
	*Used for Link type rendering
	*/
	$.postTemplates.addTemplate("Link", {
		draw: function (elem, data, opts) {
			/*Adding the basic html to the post */
			var basicPostHtml = $.postTemplates.methods.getBasicPostHtml(elem, data, opts);
			elem.append(basicPostHtml);
			$.postTemplates.methods.bindEvents(data, opts);
			var descriptionArea = $("#" + $.postTemplates.ids.postDescriptionFormat + data.Id);
			var urlDiv = $("<a href='" + data.Link + "'><div class=' xp-FloatLeft xp-Width xp-FontBold xp-LinkLabel'>" + data.Link + "</div></a>").appendTo(descriptionArea);
			if (data.ShowThumbnail) {
				/*description area where we add our custom coding for each type*/
				var linkMainDiv = $("<div class='xp-FloatLeft xp-Width' />");
				var linkDiv = $("<div class=' xp-Width90 xp-Padding-10 xp-FloatLeft xp-PostBackground '/>").appendTo(linkMainDiv);
				var thumbNailDiv = $("<div class=' xp-FloatLeft xp-Width20 xp-Padding-4 xp-TextAlignCenter '/>").appendTo(linkDiv);
				if (data.LinkHtml.length > 0) {
					var embedDiv = $("<div style='border:0px solid red;float-Left'/>")
				.append(data.LinkHtml);
					$("iframe", embedDiv)
				.attr("width", "100%")
				.attr("height", "248");
					var html = embedDiv.html();
					linkDiv.append(html);
					var linkDescriptionDiv = $("<div class=' xp-FloatLeft xp-Width'/>").appendTo(linkDiv);
					var titleDiv = $("<div class=' xp-FloatLeft xp-Width xp-FontBold xp-LinkLabel'>" + data.UrlTitle + "</div>").appendTo(linkDescriptionDiv);
					var descriptionDiv = $("<div class=' xp-FloatLeft xp-Width xp-PaddingTop-4 xp-FontLite'>" + data.UrlDescription + "</div>").appendTo(linkDescriptionDiv)
					$(descriptionArea).append(linkMainDiv);
				}
				else if (data.UrlThumbnailIcon.length > 0) {
					var tumbNailImage = $("	<img src='" + data.UrlThumbnailIcon + "' class='xp-Width'/>").appendTo(thumbNailDiv);
				} else {
					var noPreviewDiv = $("<div class=' xp-FloatLeft xp-Width30 xp-IconNoUrl xp-Icon'/>").appendTo(thumbNailDiv);
				}
				var linkDescriptionDiv = $("<div class=' xp-FloatLeft xp-Width75'/>").appendTo(linkDiv);
				var titleDiv = $("<a href='" + data.Link + "'><div class=' xp-FloatLeft xp-Width xp-FontBold xp-LinkLabel'>" + data.UrlTitle + "</div></a>").appendTo(linkDescriptionDiv);
				var descriptionDiv = $("<div class=' xp-FloatLeft xp-Width xp-PaddingTop-4 xp-FontLite'>" + data.UrlDescription + "</div>").appendTo(linkDescriptionDiv)
				$(descriptionArea).append(linkMainDiv);
			}
		}
	});
	/*
	* Used for media type rendering 
	*/
	$.postTemplates.addTemplate("Video", {
		draw: function (elem, data, opts) {
			if (data.Link != "") {
				elem.append($.postTemplates.templates["Link"].draw(elem, data, opts));
			}
			else {
				var basicPostHtml = $.postTemplates.methods.getBasicPostHtml(elem, data, opts);
				elem.append(basicPostHtml);
			}
			var ext = data.FileName.substr(data.FileName.lastIndexOf('.') + 1).toLowerCase();
			/*
			*Adding Video Functionality only when the extension is one among the Playabale list
			*else treat it as a document
			*/
			if ($.inArray(ext, opts.playableMediaFileTypes) > -1) {
				elem.append(basicPostHtml);
				var descriptionArea = $("#" + $.postTemplates.ids.postDescriptionFormat + data.Id);

				/*description area where we add our custom coding for each type*/
				/*with Icon*/
				var videoDiv = $("<div class='xp-FloatLeft xp-Width xp-PaddingTop-4' data-postId='" + data.Id + "'/>");
				var videoIcon = $("<div id ='" + $.postTemplates.ids.videoIcon + data.Id + "' class='xp-IconVideoPlay xp-FloatLeft xp-Icon-Highlight'></div>").appendTo(videoDiv);

				var videoDetailsDiv = $("<div class='xp-VerticalAlignTop xp-FloatLeft xp-MarginLeft-5 xp-Breakword xp-Width25'><a href='" + data.FileUrl + "' class='xp-LinkLabel'>" + data.FileName + "</a></div>").appendTo(videoDiv);
				$(descriptionArea).append(videoDiv);
				$.postTemplates.methods.bindEvents(data, opts);
			}
			else {
				$.postTemplates.templates["Document"].draw(elem, data, opts);
			}
		} //Draw ends
	});
	/*
	* Used for media type rendering 
	*/
	$.postTemplates.addTemplate("Audio", {
		draw: function (elem, data, opts) {
			if (data.Link != "") {
				elem.append($.postTemplates.templates["Link"].draw(elem, data, opts));
			}
			else {
				var basicPostHtml = $.postTemplates.methods.getBasicPostHtml(elem, data, opts);
				elem.append(basicPostHtml);
			}
			var ext = data.FileName.substr(data.FileName.lastIndexOf('.') + 1).toLowerCase();
			/*
			*Adding Video Functionality only when the extension is one among the Playabale list
			*else treat it as a document
			*/
			/*Adding the basic html to the post */
			if ($.inArray(ext, opts.playableAudioFileTypes) > -1) {
				var descriptionArea = $("#" + $.postTemplates.ids.postDescriptionFormat + data.Id);

				/*description area where we add our custom coding for each type*/
				/*with Icon*/
				var audioDiv = $("<div class='xp-FloatLeft xp-Width xp-PaddingTop-4' data-postId='" + data.Id + "'/>");
				var audioIcon = $("<div id ='" + $.postTemplates.ids.audioIcon + data.Id + "' class='xp-IconAudioPlay xp-FloatLeft  xp-Icon-Highlight'></div>").appendTo(audioDiv);
				var audioDetailsDiv = $("<div class='xp-VerticalAlignTop xp-FloatLeft xp-MarginLeft-5 xp-Breakword xp-Width25'><a href='" + data.FileUrl + "' class='xp-LinkLabel'>" + data.FileName + "</a></div>").appendTo(audioDiv);
				$(descriptionArea).append(audioDiv);
				$.postTemplates.methods.bindEvents(data, opts);
			} else {
				$.postTemplates.templates["Document"].draw(elem, data, opts);
			}
		}
	});
	/*used for System Post*/
	$.postTemplates.addTemplate("SystemForumPosts", {

		/*Adding the basic html to the post */
		draw: function (elem, data, opts) {
			var basicPostHtml = $.postTemplates.methods.getBasicPostHtml(elem, data, opts);
			elem.append(basicPostHtml);

			var descriptionArea = $("#" + $.postTemplates.ids.postDescriptionFormat + data.Id);
			var systemPostMainDiv = $("<div class='xp-FloatLeft xp-Width xp-PaddingTop-4'/>");
			var systemPostUl = $("<ul class='xp-OrgUpdatesList'/>").appendTo(systemPostMainDiv);
			var ajaxOptions = {
				type: "GET",
				cache: false,
				dataType: "json",
				url: opts.serviceUrl + $.postTemplates.paths.getForumById,
				data: ({
					"forumIds": data.FilterValues
				}),
				success: function (forumData) {
					var forumResult = forumData.GetForumByIdResult;
					var len = data.FilterValues.split(',').length;
					for (i = 0; i < len; i++) {
						var style = "xp-DisplayBlock";
						var viewMore = "";
						if (i >= 5) {
							style = "xp-DisplayNone";
							viewMore = $.postTemplates.classes.viewMore;
						}
						var systemPostLi = $("<li class='" + viewMore + " " + style + "'/>").appendTo(systemPostUl);
						var systemPostImage = $("<div class='xp-FloatLeft xp-ForumTopics xp-Icon xp-Icon'><span class='xp-BadgePicIcon xp-Icon'></span></div>").appendTo(systemPostLi);
						var systemPostText = $("<div class='xp-FloatLeft xp-Padding-2'><a href='" + forumResult[i].Url + "' class='xp-LinkLabel'>" + forumResult[i].Title + "</a></div>").appendTo(systemPostLi);
					}
					if (len > 5) {
						var viewMoreDiv = $("<div class='xp-FloatLeft xp-Width xp-Padding-4'><div id='" + $.postTemplates.ids.viewMoreDiv + data.Id + "' class='" + $.postTemplates.classes.viewMoreDiv + "'><a href='#' class='xp-LinkLabel " + $.postTemplates.classes.tourCssViewMore + "'>View More...</a></div></div>").appendTo(systemPostMainDiv);
						var viewLessDiv = $("<div class='xp-FloatLeft xp-Width xp-Padding-4'><div id='" + $.postTemplates.ids.viewLessDiv + data.Id + "' class='" + $.postTemplates.classes.viewLessDiv + "'><a href='#' class='xp-LinkLabel'>View Less...</a></div></div>").appendTo(systemPostMainDiv).hide();
						viewMoreDiv.click(function () {
							systemPostUl.find('li').show();
							viewMoreDiv.hide();
							viewLessDiv.show();
						});
						viewLessDiv.click(function () {
							systemPostUl.find('li.' + $.postTemplates.classes.viewMore).hide();
							viewLessDiv.hide();
							viewMoreDiv.show();
						});
					}
					$(descriptionArea).append(systemPostMainDiv);
					$.postTemplates.methods.bindEvents(data, opts);
				} //end of success
			}
			$.postTemplates.methods.ajaxCall.call(descriptionArea, ajaxOptions);
			return elem;
		}
	});
	$.postTemplates.addTemplate("SystemLifeCyclePosts", {
		/*Adding the basic html to the post */
		draw: function (elem, data, opts) {
			var basicPostHtml = $.postTemplates.methods.getBasicPostHtml(elem, data, opts);
			elem.append(basicPostHtml);

			var descriptionArea = $("#" + $.postTemplates.ids.postDescriptionFormat + data.Id);
			var systemPostMainDiv = $("<div class='xp-FloatLeft xp-Width xp-PaddingTop-4'/>");
			var systemPostUl = $("<ul class='xp-OrgUpdatesList'/>").appendTo(systemPostMainDiv);
			var array = [data.FilterValues];
			var ajaxOptions = {
				type: "GET",
				cache: false,
				dataType: "json",
				url: opts.serviceUrl + $.postTemplates.paths.getLifeCycleById,
				data: ({
					"trackerIds": data.FilterValues
				}),
				success: function (lifeCycleData) {
					var lifecycleResult = lifeCycleData.GetLifeCycleByIdResult;
					var len = data.FilterValues.split(',').length;
					for (i = 0; i < len; i++) {
						var style = "xp-DisplayBlock";
						var viewMore = "";
						if (i >= 5) {
							style = "xp-DisplayNone";
							viewMore = $.postTemplates.classes.viewMore;
						}
						var systemPostLi = $("<li class='" + viewMore + " " + style + "'/>").appendTo(systemPostUl);
						var systemPostImage = $("<div class='xp-FloatLeft xp-LifeCycleTopics xp-Icon xp-Icon'><span class='xp-BadgePicIcon xp-Icon'></span></div>").appendTo(systemPostLi);
						var systemPostText = $("<div class='xp-FloatLeft xp-Padding-2'><a href='" + lifecycleResult[i].Url + "' class='xp-LinkLabel'>" + lifecycleResult[i].Title + "</a></div>").appendTo(systemPostLi);
					}
					if (len > 5) {
						var viewMoreDiv = $("<div class='xp-FloatLeft xp-Width xp-Padding-4'><div id='" + $.postTemplates.ids.viewMoreDiv + data.Id + "' class='" + $.postTemplates.classes.viewMoreDiv + "'><a href='#' class='xp-LinkLabel " + $.postTemplates.classes.tourCssViewMore + "'>View More...</a></div></div>").appendTo(systemPostMainDiv);
						var viewLessDiv = $("<div class='xp-FloatLeft xp-Width xp-Padding-4'><div id='" + $.postTemplates.ids.viewLessDiv + data.Id + "' class='" + $.postTemplates.classes.viewLessDiv + "'><a href='#' class='xp-LinkLabel'>View Less...</a></div></div>").appendTo(systemPostMainDiv).hide();
						viewMoreDiv.click(function () {
							systemPostUl.find('li').show();
							viewMoreDiv.hide();
							viewLessDiv.show();
						});
						viewLessDiv.click(function () {
							systemPostUl.find('li.' + $.postTemplates.classes.viewMore).hide();
							viewLessDiv.hide();
							viewMoreDiv.show();
						});
					}
					$(descriptionArea).append(systemPostMainDiv);
					$.postTemplates.methods.bindEvents(data, opts);
				} //end of success
			}
			$.postTemplates.methods.ajaxCall.call(descriptionArea, ajaxOptions);
			return elem;
		}
	});
	$.postTemplates.addTemplate("SystemTopContributorsPosts", {
		/*Adding the basic html to the post */
		draw: function (elem, data, opts) {
			var basicPostHtml = $.postTemplates.methods.getBasicPostHtml(elem, data, opts);
			elem.append(basicPostHtml);

			var descriptionArea = $("#" + $.postTemplates.ids.postDescriptionFormat + data.Id);
			var systemPostMainDiv = $("<div class='xp-FloatLeft xp-Width xp-PaddingTop-4'/>");
			var systemPostInnerDiv = $("<div class='xp-FloatLeft xp-Width60'/>").appendTo(systemPostMainDiv);
			var ajaxOptions = {
				type: "GET",
				cache: false,
				dataType: "json",
				url: $.postTemplates.paths.getUserDetails,
				data: ({
					"userMessage": data.FilterValues
				}),
				success: function (userData) {
					var userDataResult = userData.GetUserDetailsResult;
					for (i = 0; i < data.FilterValues.split(',').length; i++) {
						var systemPostItem = $("<div class='xp-FloatLeft xp-Padding-2'/>").appendTo(systemPostInnerDiv);
						var systemPostSpan = $("<span class='xp-UserBadgePic'/>").appendTo(systemPostItem);
						var systemPostImage = $("<a href='" + userDataResult[i].UserProfileUrl + "'><img  src='" + userDataResult[i].UserProfilePic + "' alt='" + userDataResult[i].UserName + "' title='" + userDataResult[i].UserName + "'/><span class='xp-BadgePicIcon xp-Icon'></span></a>")
                            .appendTo(systemPostSpan);
					} //for
				} //success
			} //end of Ajax
			$.postTemplates.methods.ajaxCall.call(descriptionArea, ajaxOptions);
			$(descriptionArea).append(systemPostMainDiv);
			$.postTemplates.methods.bindEvents(data, opts);
			return elem;
		}
	});
	/*
	* used for poll type rendering
	*/
	$.postTemplates.addTemplate("Poll", {
		draw: function (elem, data, options) {
			/*Adding the basic html to the post along with Files attached*/
			if (data.Link != "" || data.FileName != "") {
				if (data.Link != "") {
					elem.append($.postTemplates.templates["Link"].draw(elem, data, options));
				}
				else {
					var ext = data.FileName.substr(data.FileName.lastIndexOf('.') + 1).toLowerCase();
					if ($.inArray(ext, options.docFileTypes) > -1) {
						elem.append($.postTemplates.templates["Document"].draw(elem, data, options));
					} else if ($.inArray(ext, options.mediaFileTypes) > -1) {
						elem.append($.postTemplates.templates["Video"].draw(elem, data, options));
					}
					else if ($.inArray(ext, options.imageFileTypes) > -1) {
						elem.append($.postTemplates.templates["Image"].draw(elem, data, options));
					}
				}
			}
			else {
				var basicPostHtml = $.postTemplates.methods.getBasicPostHtml(elem, data, options);
				elem.append(basicPostHtml);
				$.postTemplates.methods.bindEvents(data, options);
			}

			/*description area where we add our custom coding for each type*/
			var descriptionArea = $("#" + $.postTemplates.ids.postDescriptionFormat + data.Id);
			if (descriptionArea.length == 0) {
				var basicPostHtml = $.postTemplates.methods.getBasicPostHtml(elem, data, opts);
				elem.append(basicPostHtml);
				descriptionArea = $("#" + $.postTemplates.ids.postDescriptionFormat + data.Id);
			}
			var chartArea = $("<div class='xp-FloatLeft xp-Width' id='chartArea_" + data.Id + "'/>").appendTo(descriptionArea);
			var postData = data;
			$.postTemplates.templates["Poll"].drawPoll(chartArea, postData, options);
		}, //end of draw
		drawPoll: function (elem, postData, opts) {
			/*
			*Get Poll Data
			*/
			var ajaxOptions = {
				type: "GET",
				cache: false,
				dataType: "json",
				url: opts.serviceUrl + $.postTemplates.paths.getPollData,
				data: ({
					"postId": postData.Id
				}),
				success: function (data) {
					var poll = data.GetPollDataResult;
					if (poll) {
						/*
						*Prepare the layout to allow the user to vote for the Poll if the usere has not currently voted
						*/
						if (poll.CurrentUserSelection.length == 0) {
							$.postTemplates.templates["Poll"].voteForPoll(elem, poll, opts);
						}
						/*
						*Prepare the layout to render the chart to display the results if the user has already voted
						*/
						else {
							$.postTemplates.templates["Poll"].renderPoll(elem, poll, opts);
						}
					}
				} //success
			} //end of Ajax
			$.postTemplates.methods.ajaxCall.call(elem, ajaxOptions);
		}, //end of drawPoll
		voteForPoll: function (elem, poll, opts) {
			elem.empty();
			var inputType = (poll.MultipleChoiceAllowed == true) ? "checkbox" : "radio";
			var contentDiv = $("<div id='" + $.postTemplates.ids.pollContentDiv + poll.Id + "' class='xp-FloatLeft xp-Width xp-PaddingTop-4'>").appendTo(elem);
			var idx = 1;
			$(poll.Options).each(function (i) {
				var pollOption = poll.Options[i];
				/*sanity check*/
				if (pollOption) {
					var div = $("<div style='padding:5px 5px 5px 1px' class='xp-Width xp-CustomForm '/>");
					var optionId = "polloption" + poll.Id + "_" + idx;
					var inputBox = $("<input autocomplete='off' type='" + inputType + "' id='" + optionId + "' optionLabel='" + idx + "' name='" + $.postTemplates.ids.pollOptions + poll.Id + "' />").appendTo(div);
					var label = $("<label class='xp-PollOptionLabel' for='" + optionId + "'>" + pollOption + "</label>").appendTo(div);
					contentDiv.append(div);
				}
				idx++;
			}); //end of $.each
			var confirmDiv = $("<div class='xp-OriginatorBtn'></div>").appendTo(contentDiv).hide();
			var confirmButtonDiv = $("<div class='ui-secondarytabclr ui-tabbuttonstyle xp-FloatLeft xp-FollowButton'></div>").appendTo(confirmDiv);
			confirmButtonDiv.append("<div class='xp-FloatLeft xp-FollowButtonPadding' ><a href='#' class='Fontclrlight xp-Login'>Confirm</a></div>");
			/*
			*Select options to vote for the poll
			*/
			var inputSelector = $("input[name='" + $.postTemplates.ids.pollOptions + poll.Id + "']");
			inputSelector.click(function () {
				confirmDiv.show();
				if (poll.MultipleChoiceAllowed == false) {
					var checkBox = this;
					inputSelector.not(checkBox).attr('checked', false);
					var checkedBoxes = inputSelector.is(':checked');
				}
			}); //end of click
			confirmButtonDiv.click(function () {
				var selectedOptions = [];
				$("input[name='" + $.postTemplates.ids.pollOptions + poll.Id + "']:checked").each(function () {
					selectedOptions.push($(this).attr('optionLabel'));
				});
				var pdata = {
					postId: poll.Id,
					optionNumbers: selectedOptions
				};
				var ajaxOptions = {
					type: "POST",
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					url: opts.serviceUrl + $.postTemplates.paths.savePoll,
					data: $.toJSON(pdata),
					success: function (data) {
						var poll = data.SavePollResult;
						$.postTemplates.templates["Poll"].renderPoll(elem, poll, opts);
					}
				} //end of ajax
				$.postTemplates.methods.ajaxCall.call(confirmButtonDiv, ajaxOptions);
			}); //end of confirmButtonDiv click
			elem.append(contentDiv);
		}, //end of voteForPoll
		renderPoll: function (elem, poll, opts) {
			var barColors = ['#800080', '#FFC000', '#9BBB59', '#C0504D', '#4F81BD']; // blue, red, green, yellow, purple
			var tolalVal = 0;
			if (poll && poll.Results && poll.Options) {
				elem.empty();
				for (var i = 0; i < $(poll.Results).length; i++) {
					tolalVal = tolalVal + parseInt(poll.Results[i]);
				}
				var percentValues = new Array();
				for (i = 0; i < $(poll.Options).length; i++) {
					var percent = ((parseInt(poll.Results[i]) / tolalVal) * 100);
					percentValues.push(percent);
				}
				var labels = new Array();
				var values = poll.Results;
				if ($(values).length > 0) {
					var chartContainer = $("<div class='xp-FloatLeft xp-Width49' ></div>").appendTo(elem);
					var chartDiv = $("<div  id='" + $.postTemplates.ids.pollChartDiv + poll.Id + "' class='xp-MarginTop-25' style='height:230px;'/>").appendTo(chartContainer);
					$.jqplot.config.enablePlugins = true
					$.jqplot($.postTemplates.ids.pollChartDiv + poll.Id, [values.reverse()], {
						legend: {
							show: false,
							showLabel: false
						},
						cursor: {
							show: true,
							tooltipLocation: 'ne',
							followMouse: false
						},
						seriesColors: barColors,
						seriesDefaults: {
							renderer: $.jqplot.BarRenderer,
							rendererOptions: {
								barWidth: 25,
								barDirection: 'horizontal',
								barPadding: 7,
								barMargin: 18,
								shadowAngle: 135,
								varyBarColor: true,
								highlightColors: barColors
							},
							pointLabels: {
								show: true,
								location: 'w',
								formatString: '%d'
							}
						},
						axes: {
							xaxis: {
								tickOptions: {
									showLabel: false
								}
							},
							yaxis: {
								showLabel: false,
								renderer: $.jqplot.CategoryAxisRenderer,
								ticks: labels,
								tickOptions: {
									show: false,
									showLabel: false
								}
							}
						},
						grid: {
							background: '#efefef',
							borderWidth: 1.0,
							drawGridLines: false,
							gridLineColor: '#d9d9d9',
							borderColor: "#000000",
							shadow: false
						}
					});
					$.postTemplates.templates["Poll"].addHighlighter(elem, poll);
				}
				$(".jqplot-yaxis-tick").hide();
				$(".jqplot-point-label").css('color', '#000000');
				var inputDiv = $("<div id='" + $.postTemplates.ids.pollInputDiv + poll.Id + "' class='xp-FloatLeft xp-PaddingTop-4 xp-Width50 xp-FontBold xp-MarginTop-25' ><div>").appendTo(elem);
				var inputType = (poll.MultipleChoiceAllowed == true) ? "checkbox" : "radio";
				var idx = 1;
				$(poll.Options).each(function (i) {
					var pollOption = poll.Options[i].length > 20 ? (poll.Options[i].substring(0, 20)).substring(0, poll.Options[i].substring(0, 20).lastIndexOf(" ")) + "..." : poll.Options[i];
					/*sanity check*/
					if (pollOption) {
						var selected = "";
						var image = "";
						if ($.inArray(idx, poll.CurrentUserSelection) > -1) {
							selected = "checked='checked'";
							image = "<img src='" + poll.UserPictureUrl + "'/>";
						}
						var div = $("<div class='xp-ClearBoth'>");
						var lineHeight = $('.jqplot-event-canvas').height() / (poll.Options.length);
						var inputBoxDiv = $("<div style='line-height:" + lineHeight + "px;height:" + lineHeight + "px;' class='xp-FloatLeft xp-CustomForm' />").appendTo(div);
						var optionId = "polloption" + poll.Id + "_" + idx;
						if (poll.AnswerChangesAllowed == true) {
						    var inputBox = $("<input autocomplete='off' type='" + inputType + "' id='" + optionId + "' optionLabel='" + idx + "' name='" + $.postTemplates.ids.pollOptions + poll.Id + "'" + selected + "/>").appendTo(inputBoxDiv);
						}
						var label = $("<label for='" + optionId + "' title='" + poll.Options[i] + "' style='color:" + barColors[poll.Options.length - idx] + ";'>" + pollOption + " - " + parseInt(percentValues[idx - 1]) + "% </label>").appendTo(inputBoxDiv);
						var imageDiv = $("<div id='" + $.postTemplates.ids.pollImageDiv + optionId + "' style='height:" + lineHeight + "px;' class='xp-DisplayBlock xp-FloatLeft xp-MarginLeft-12 xp-Width12' ><div class='xp-Width xp-FloatLeft ' style='height:" + lineHeight / 3.5 + "px;' ></div><div class='xp-PollProfilePic xp-FloatLeft'>" + image + "</div></div>").appendTo(div);
						inputDiv.append(div);
					}
					idx++;
				}); //end of $.each
				var confirmDiv = $("<div class='xp-OriginatorBtn'></div>").appendTo(inputDiv).hide();
				var confirmButtonDiv = $("<div id='" + $.postTemplates.ids.pollConfirmButtonDiv + poll.Id + "' class='ui-secondarytabclr ui-tabbuttonstyle xp-FloatLeft xp-FollowButton'></div>").appendTo(confirmDiv);
				confirmButtonDiv.append("<div class='xp-FloatLeft xp-FollowButtonPadding' ><a href='#' class='Fontclrlight xp-Login'>Confirm</a></div>");
				/*
				*Select options to vote for the poll
				*/
				var inputSelector = $("input[name='" + $.postTemplates.ids.pollOptions + poll.Id + "']");
				inputSelector.click(function () {
					confirmDiv.show();
					var optionImage = $("#" + $.postTemplates.ids.pollImageDiv + $(this).attr('id'));
					optionImage.toggle();
					if (poll.MultipleChoiceAllowed == false) {
						var checkBox = this;
						inputSelector.not(checkBox).attr('checked', false);
						var checkedBoxes = inputSelector.is(':checked');
					}
				}); //end of click
				confirmButtonDiv.click(function () {
					var selectedOptions = [];
					$("input[name='" + $.postTemplates.ids.pollOptions + poll.Id + "']:checked").each(function () {
						selectedOptions.push($(this).attr('optionLabel'));
					});
					var pdata = {
						postId: poll.Id,
						optionNumbers: selectedOptions
					};

					var ajaxOptions = {
						type: "POST",
						dataType: "json",
						contentType: "application/json; charset=utf-8",
						url: opts.serviceUrl + $.postTemplates.paths.savePoll,
						data: $.toJSON(pdata),
						success: function (data) {
							var poll = data.SavePollResult;
							if (poll.CurrentUserSelection.length == 0) {
								$.postTemplates.templates["Poll"].voteForPoll(elem, poll, opts);
							}
							else {
								$.postTemplates.templates["Poll"].renderPoll(elem, poll, opts);
							}
						}
					} //end of ajax
					$.postTemplates.methods.ajaxCall.call(confirmButtonDiv, ajaxOptions);
				});
			}
		}, //end of renderPoll
		addHighlighter: function (elem, poll) {
			$("#" + elem.attr('id')).bind('jqplotDataHighlight',

            function (ev, seriesIndex, pointIndex, data) {
            	var idx = 0;
            	if ($(data).get(1)) {
            		try {
            			var values = poll.Options;
            			var voteCount = poll.Results[parseInt($(data).get(1)) - 1];
            			var pollOption = values[values.length - parseInt($(data).get(1))];
            			mouseX = ev.pageX;
            			mouseY = ev.pageY;
            			var toolTipElem = $('.jqplot-highlighter-tooltip').css({
            				'z-index': 999999
            			});
            			toolTipElem.html("<div style='background-color:#ffffff;padding:3px;border:1px solid #3f3f40' class='xp-FontBold'>" + pollOption + ": " + voteCount + " votes</div>");
            		} catch (err) { }
            	}
            });
			$("#" + elem.attr('id')).bind('jqplotDataUnhighlight',

            function (ev) {
            	$('.jqplot-highlighter-tooltip').html('');
            });
		}
	});
	/*
	* used for document type rendering
	*/
	$.postTemplates.addTemplate("Document", {
		draw: function (elem, data, options) {
			if (data.Link != "") {
				elem.append($.postTemplates.templates["Link"].draw(elem, data, options));
			}
			else {
				var basicPostHtml = $.postTemplates.methods.getBasicPostHtml(elem, data, options);
				elem.append(basicPostHtml);
				$.postTemplates.methods.bindEvents(data, options);
			}
			var descriptionArea = $("#" + $.postTemplates.ids.postDescriptionFormat + data.Id);
			var documentDiv = $("<div class='xp-FloatLeft xp-Width xp-PaddingTop-4'/>");
			var docImageDiv = $("<div class='xp-MyPostsImg xp-FloatLeft'/>").appendTo(documentDiv);
			$.xpoint.utils.getImageUrl(data.FileName, function (fileIconPath) {
				if (fileIconPath != null) {
					var image = $("<img src='" + fileIconPath + "'/>").appendTo(docImageDiv);
				}
			},
				function (fileIconPath) {
					var image = $("<img src='" + fileIconPath + "'/>").appendTo(docImageDiv);
				});
			var docNameDiv = $("<div class='xp-VerticalAlignTop xp-Width-170 xp-Breakword xp-FloatLeft xp-MarginLeft-5'/>").appendTo(documentDiv); ;
			var docName = $("<a href='" + data.FileUrl + "'  class='xp-LinkLabel'>" + data.FileName + "</a>").appendTo(docNameDiv);
			$(descriptionArea).append(documentDiv);
			/*Adding the basic html to the post */
			/*description area where we add our custom coding for each type*/
		}
	});
	// closing of templates section
})(jQuery);
