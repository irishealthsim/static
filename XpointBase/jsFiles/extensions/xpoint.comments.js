(function ($) {
	$.xpointComments = {
		defaults: {
			numberOfComments: '',
			inputBoxWaterMarkText: '',
			getCommentsUrl: '',
			saveCommentsUrl: '',
			deleteCommentsUrl: '',
			userPictureUrl: '',
			allowInput: false,
			id: '',
			numberOfVisibleComments: 0, // This is used to set the scrollpane
			getCommentResult: 'GetPostCommentsResult',
			getDeleteResult: 'DeletePostCommentResult',
			addCommentResult: 'AddPostCommentResult',
			versionLabel: false,
			scrollDiv: false
		},
		ids: {
			commentMain: 'xpointCommentMainDiv_',
			inputContainer: 'xpointInputContainerDiv_',
			closeComment: 'xpointCloseCommentDiv_',
			deleteComment: 'xpointDeleteCommentDiv_',
			inputBox: 'xpointInputBox_',
			dateDiv: 'dateDiv_',
			timeDiv: 'timeDiv_',
			actualTimeDiv: 'actualTimeDiv_'
		},
		classes: {
			dateDiv: 'xp-PositionAbsolute xp-Padding-4 ui-state-default xp-BoxShadow xp-DateHoverDiv  xp-DisplayNone',
			tourCssCommentCount: 'Tip-HPMyPostsCmntCount'
		},
		methods: {
			/*Helper for Ajax calls */
			ajaxCall: function (ajaxOpts, loadingOpts) {
				var elem = this;
				if (elem.length > 0) {
					elem.showLoading(loadingOpts);
				}
				var onComplete = (ajaxOpts.complete && $.isFunction(ajaxOpts.complete)) ? ajaxOpts.complete : null;
				if (ajaxOpts) {
					var aOpts = {
						type: "POST",
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						data: '',
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
			initializeJScroll: function (opts) {
				/*
				*reinitialize jScrollPane
				*/
				var div = $("#" + opts.commentsMainDiv);
				if ($.xpointComments.defaults.numberOfVisibleComments >= 3) {
					div.addClass('xp-CommentScroll');
					div.jScrollPane({
						'verticalDragMinHeight': '60',
						'autoReinitialise': true
					}).data('jsp').scrollToBottom();
				}
			},
			removeJScroll: function (opts) {
				/*
				*remove jScrollPane
				*/
				var div = $("#" + opts.commentsMainDiv);
				div.removeClass('xp-CommentScroll');
				var element = div.jScrollPane({});
				var api = element.data('jsp');
				api.destroy();
			},
			/*
			*Add individual comment
			*/
			addComment: function (elem, commentItem, opts) {
				var commentTime = new Date(parseInt(commentItem.CreatedDate.substr(6)));
				var commentMainDiv = $("<div id='" + commentItem.Id + "' class='xp-FloatLeft  xp-Width xp-BottomBorder xp-NoBackground ui-state-default'></div>").appendTo(elem);
				var commentDiv = $("<div class='xp-FloatLeft xp-Width99 xp-PositionRelative xp-Padding-4'></div>").appendTo(commentMainDiv);
				commentDiv.append("<div class='xp-FloatLeft xp-PaddingRight-5 xp-SmallProfilePic'><img src='" + commentItem.CreatedBy.PictureUrl + "' /></div>");
				var commentLayout = $("<div class='xp-FloatLeft xp-Width85'></div>").appendTo(commentDiv);
				var commentDesc = $("<div class='xp-FloatLeft xp-Width'></div>").appendTo(commentLayout);
				commentDesc.append("<div class='xp-FloatLeft xp-Width xp-CommentHeight  xp-TxtDescription xp-Breakword'><a href='" + commentItem.CreatedBy.ProfileUrl + "' class='xp-LinkLabel'>" + commentItem.CreatedBy.DisplayName + "</a>" + (!!opts.isLabel ? '<span> (Version ' + commentItem.VersionLabel.slice(0, commentItem.VersionLabel.indexOf('.')) + ')</span>' : '') + " : " + commentItem.Comment + "</div>");
				var timeDiv = $("<div class='xp-FloatLeft xp-VerticalAlignBottom' id='" + $.xpointComments.ids.timeDiv + commentItem.Id + "'></div>").appendTo(commentLayout);
				timeDiv.append("<div class='xp-IconTimestamp xp-Icon xp-FloatLeft  xp-PaddingRight-3'></div><div class='xp-FontLite xp-VerticalAlignTop  xp-FloatLeft' style='line-height:11px;'><div class='xp-FloatLeft xp-TimeStampDiv xp-PositionRelative xp-Padding-2 xp-Width' id='" + $.xpointComments.ids.actualTimeDiv + commentItem.Id + "'> " + $.timeago(commentTime) + "</div></div>");
				try {
					var formattedDate = $.xpoint.utils.formatDate(commentTime);
				} catch (e) {
				}
				var dateDiv = $("<div/>")
                    .attr('class', $.xpointComments.classes.dateDiv)
                    .attr('id', $.xpointComments.ids.dateDiv + commentItem.Id)
                    .append(formattedDate)
                    .appendTo($("#" + $.xpointComments.ids.actualTimeDiv + commentItem.Id));
				/*
				*Show/Hide Actual Time On Hover of Comment 
				*/
				$("#" + $.xpointComments.ids.timeDiv + commentItem.Id).hover(
				function () {
					$("#" + $.xpointComments.ids.dateDiv + commentItem.Id).show();
				},
        function () {
        	$("#" + $.xpointComments.ids.dateDiv + commentItem.Id).hide();
        });
				var deleteCommentDiv = $("<div id='" + $.xpointComments.ids.deleteComment + commentItem.Id + "'class='xp-IconDeleteComment xp-MarginLeft-5 xp-HoverCursor xp-Icon xp-FloatLeft xp-PositionRelative'></div>");
				var deleteConfirm = $("<div class='xp-PositionAbsolute ui-secondarytabclr xp-NoBackground xp-BoxShadow ui-corner-all xp-DisplayNone xp-DeleteCmnt xp-PositionAbsolute xp-Padding-4'><span class='xp-HoverCursor xp-FontBold'>Delete Comment</span></div>").appendTo(deleteCommentDiv);
				if (commentItem.IsDeleteAllowed) {
					commentDiv.append(deleteCommentDiv);
				}
				/*
				*Comfirm on click
				*/
				deleteCommentDiv.click(function () {
					deleteConfirm.toggle();
				});
				/*
				*Delete the comment on click
				*/
				deleteConfirm.click(function () {
					var ajaxOptions = {
						url: opts.deleteCommentsUrl,
						type: "POST",
						data: '{ "commentId": ' + commentItem.Id + '}',
						dataType: "json",
						contentType: "application/json; charset=utf-8",
						success: function (data) {
							if (data) {
								var status = data[$.xpointComments.defaults.getDeleteResult];
								if (status.Status == "success") {
									commentMainDiv.remove();
									/*
									*Update the comments count
									*/
									var commentsCount = $("#" + opts.commentCountId);
									var val = parseInt(commentsCount.text()) - 1;
									commentsCount.text(val);
									/*if 0 Comments then the count should not be shown*/
									if (val == 0) {
										$("#" + opts.commentCountDiv).toggle();
										$("#" + opts.viewComment).toggle();
										commentsCount.removeClass($.xpointComments.classes.tourCssCommentCount);
									}
									$.xpointComments.defaults.numberOfVisibleComments--;
									if (val <= 3) {
										$.xpointComments.methods.removeJScroll(opts);
									}
								}
							}
						} //end success
					}//end ajax

					$.xpointComments.methods.ajaxCall.call(commentMainDiv, ajaxOptions);
				});
			},
			/*
			*Prepares the container to input comments
			*/
			addInputContainer: function (opts) {
				var inputCommentDiv = $("#" + opts.inputComment).show();
				$("#" + opts.commentsMainDiv).show();
				var inputContainer = $("#" + $.xpointComments.ids.inputContainer + opts.id);
				if (inputContainer.length > 0) {
					inputContainer.children().remove();
					inputContainer.remove();
				}
				inputContainer = $("<div id='" + $.xpointComments.ids.inputContainer + opts.id + "' class='xp-FloatLeft xp-Width xp-NoBackground xp-Height-60 xp-BottomBorder ui-state-default'></div>").appendTo(inputCommentDiv);
				inputContainer.append("<div class='xp-FloatLeft xp-Padding-4 xp-SmallProfilePic '><img  src='" + opts.userPictureUrl + "' /></div>");
				var inputElem = $("<div class='xp-FloatLeft xp-Width85 xp-CommentTxtBox'></div>").appendTo(inputContainer);
				var inputBox = $("<input size='100%' autocomplete='off'  id='" + $.xpointComments.ids.inputBox + opts.id + "' type='text' />").appendTo(inputElem).keypress(function (event) {
					var keycode = (event.keyCode ? event.keyCode : event.which);
					if (keycode == 13) {
						var box = $(this);
						var commentVal = box.val();
						if (commentVal.trim() != "") {
							var param = new Object();
							param.comment = commentVal;
							param.postId = opts.id;
							if (!!opts.versionLabel) param.versionLabel = opts.versionLabel;
							box.val('');
							var ajaxOptions = {
								url: opts.saveCommentsUrl,
								type: "POST",
								data: $.toJSON(param),
								dataType: "json",
								contentType: "application/json; charset=utf-8",
								success: function (data) {
									if (data) {
										var comment = data[$.xpointComments.defaults.addCommentResult];
										if (comment) {
											var viewComment = $("#" + opts.viewComment).show();
											$.xpointComments.methods.addComment(viewComment, comment, opts);
											/*
											*Update the comments count
											*/
											var commentCountDiv = $("#" + opts.commentCountDiv);
											var commentsCount = $("#" + opts.commentCountId);
											var likeCommentCountMainDiv = $("#" + opts.likeCommentCountMainDiv);
											var val;
											if (commentsCount.text() == 0) {
												likeCommentCountMainDiv.show();
												commentCountDiv.show();
												commentsCount.addClass($.xpointComments.classes.tourCssCommentCount);
											}
											val = parseInt(commentsCount.text());
											commentsCount.text(val + 1);
											$.xpointComments.defaults.numberOfVisibleComments++;
											$("#" + opts.commentsMainDiv).jScrollPane({ 'verticalDragMinHeight': '60' }).data('jsp').scrollToBottom();
										}
									}
								}, //end success
								error: function (xhr, ajaxOptions, thrownError) {
									box.val(commentVal);
								} //end success
							} //end ajax
							$.xpointComments.methods.ajaxCall.call(inputCommentDiv, ajaxOptions);
							return false;
						}
						else {
							return false;
						}
					}
				});
				/*
				* Character count & WaterMark
				*/
				inputBox.charCounter(140);
				inputBox.watermark(opts.inputBoxWaterMarkText);
			},
			/*
			*Prepares the comments container
			*/
			addCommentContainer: function (container, opts) {
				opts = $.extend(true, $.xpointComments.defaults, opts);
				var commentMain = $("#" + $.xpointComments.ids.commentMain + opts.id);
				if (commentMain.length > 0) {
					commentMain.children().remove();
					commentMain.remove();
				}
				commentMain = $("<div id='" + $.xpointComments.ids.commentMain + opts.id + "' class='xp-FloatLeft xp-Width'></div>").appendTo(container);
				var viewCommentDiv = $("<div id='" + opts.viewComment + "' class='xp-Width xp-FloatLeft'></div>").appendTo(commentMain);
				var inputCommentDiv = $("<div id='" + opts.inputComment + "' class='xp-Width xp-FloatLeft'></div>").appendTo(commentMain).hide();

				/*
				* get comments
				*/
				var ajaxOptions = {
					type: "GET",
					dataType: "json",
					cache: false,
					url: opts.getCommentsUrl,
					data: ({ "postId": opts.id, "numberOfComments": opts.numberOfComments }),
					success: function (data) {
						if (data != null) {
							var comments = data[opts.getCommentResult];
							if (comments) {
								if (comments.length == 0) {
									container.hide();
									viewCommentDiv.hide();
									if (!!opts.versionLabel) {
										$('#' + opts.commentCountId).text(0);
										$('#' + opts.commentCountDiv).hide();
									}
								}
								else if (!!opts.versionLabel) {
									container.show();
									viewCommentDiv.show();
									$('#' + opts.commentCountDiv).show();
									$('#' + opts.commentCountId).text(comments.length);
								}
								$.xpointComments.defaults.numberOfVisibleComments = comments.length;
								$(comments).each(function () {
									var comment = this;
									if (comment) {
										$.xpointComments.methods.addComment(viewCommentDiv, comment, opts);
									}
								});

								$.xpointComments.methods.initializeJScroll(opts);
							}
						}
						if (opts.allowInput) {
							$.xpointComments.methods.addInputContainer(opts);
						}
					} //end success
				} //end ajax
				$.xpointComments.methods.ajaxCall.call($("#" + opts.likeCommentCountMainDiv), ajaxOptions);
			},
			init: function (opts) {
				var container = $(this);
				$.xpointComments.methods.addCommentContainer(elem, opts);
			}
		}
	};
	$.fn.xpointComments = function (p) {
		// Method calling logic
		if (!this || this.length === 0) return;
		if (("string" == typeof (p)) && $.xpointComments.methods[p]) {
			var opts = $.extend(this.get(0).options, $.makeArray(arguments).slice(1)[0]);
			return $.xpointComments.methods[p].apply(this, $.makeArray(opts));
		}
		return this.each(function () {
			this.options = $.extend($.xpointComments.defaults, p);
			$.xpointComments.methods.init.apply(this, $.makeArray(this.options));
		});
	}
})(jQuery);