(function ($) {
    $.fn.xpointTemplates = function (options) {
        /*
		* logic  for calling method which are under notification nameSpace
		*/
        if (!this || this.length == 0) {
            return;
        }
        var elem = this;
        if (typeof (options) == "object") {
            var jElem = elem.get(0);
            var options = $.extend($.xpointTemplates.defaults, options);
            jElem.options = options;
            return $.xpointTemplates.methods.init.call(elem, options);
        }
        var fnCall = $.xpointTemplates.methods[options];
        if (fnCall && $.isFunction(fnCall)) {
            return fnCall.call(elem, arguments[1]);
        }
    };
    /* 
	* Stores the plugin options  
	*/
    var options;
    $.xpointTemplates =
    {
        preContainers: [],
        templates: [],
        navButtons: [],
        component: [],
        contextMenuOptions: [],
        addNavButtons: function (name, navConfig) {
            /*Updating navingation buttons array*/
            $.xpointTemplates.navButtons[name] = navConfig;
        },
        /* Adding new template type*/
        addTemplate: function (name, templateConfig) {
            $.xpointTemplates.templates[name] = templateConfig;
        },
        /* Adds component */
        addComponent: function (name, componentConfig) {
            $.xpointTemplates.component[name] = componentConfig;
        },
        /* Adds context menu options */
        addContextMenuOptions: function (name, contextMenuConfig) {
            $.xpointTemplates.contextMenuOptions[name] = contextMenuConfig;
        },
        /* 
    	* default values 
    	*/
        defaults:
        {
            userId: '',
            destination: '',
            getPostsCount: 10,
            defaultType: 'Text',
            userReadDuration: 5000,
            page: 1,
            needPage: true,
            ajaxOpts: { type: 'GET' },
            processData: function (ajaxData) { return ajaxData.GetUpdatesResult; },
            dropdownOptions: { All: 'HPAllUpdates', LifeCycles: 'HPLifecycle', Forum: 'HPForum' },          /* Organization: 'HPOrganization', User: 'HPUser'*/
            prepareUrl: function (ops) {
                return $.xpointTemplates.paths.getUpdatesServicePath + "?userId=" + ops.userId + "&destination=" + ops.destination + "&numberOfUpdates=" + ops.getPostsCount + "&page=" + ops.page + "&needPage=" + ops.needPage;
            }
        },
        /* 
    	* ids which we used in this plugin will be declared here 
    	*/
        ids: {
            descriptionArea: 'descriptionArea',
            messageContainer: 'messageContainer',
            markAsReadContainer: 'markAsReadContainer',
            profilePic: 'profilePic',
            postDescriptionDiv: 'postDescriptionDiv',
            descriptionTopDiv: 'descriptionTopDiv',
            orgMainContainer: 'orgMainContainer',
            orgPostDescription: 'orgPostDescription',
            profilePicDiv: 'profilePicDiv',
            profileUrl: 'profileUrl',
            markAsReadDiv: 'homePage_Updates_markAsReadDiv',
            markAsReadIcon: 'markAsReadIcon',
            contextMenuIcon: 'homePage_Updates_ContextMenuIcon',
            userUnSubscribe: 'homePage_Updates_UserUnSubscribe',
            lifecycleUnSubscribe: 'homePage_Updates_LifecycleUnSubscribe',
            forumUnSubscribe: 'homePage_Updates_ForumUnSubscribe',
            thisPostUnSubScribe: 'homePage_Updates_ThisPostUnSubscribe',
            descBottomUL: 'descBottomUL',
            contextMenuDataDIV: 'homePage_Updates_contextMenuDataDIV',
            othersContainer: 'othersContainer',
            othersMainDiv: 'othersMainDiv',
            othersSubDiv: 'othersSubDiv',
            nrow: 'nrow',
            nrowInnerDiv: 'nrowInnerDiv',
            othersCloseMainDiv: 'othersCloseMainDiv',
            othersCloseDiv: 'othersCloseDiv',
            othersCloseLink: 'othersCloseLink',
            viewMoreLink: 'viewMoreLink'
        },
        /* css classes used in this plugin we will declare here */
        classes: {
            container: 'media', //'xp-FloatLeft xp-Width xp-BorderBottomGray',
            markAsReadContainer: 'xp-FloatLeft xp-Width xp-BorderBottomGray xp-newHighlight',
            mainDiv: 'xp-PositionRelative xp-FloatLeft xp-Width80 xp-Padding-6',
            profilePicDiv: 'media-left', //'xp-FloatLeft xp-MarginRight-10',
            postDescriptionDiv: 'media-body', //'xp-FloatLeft xp-MarginRight-10 xp-Width80',
            descriptionTopDiv: 'xp-Width', //'xp-FloatLeft xp-Width xp-TxtDescription',
            link: 'xp-LinkLabel',
            descriptionBottomDiv: 'xp-FloatLeft xp-Width', //'xp-FloatLeft xp-Width xp-PaddingTopBottom-10',
            durationDiv: 'xp-FloatLeft  xp-MarginTop-5 xp-PostionRelative', //'xp-FloatLeft  xp-MarginTop-5 xp-Width24 xp-PostionRelative',
            dateDiv: 'xp-PositionAbsolute xp-Padding-4 ui-state-default xp-BoxShadow xp-DateHoverDiv xp-DisplayNone',
            markAsDiv: 'xp-FloatRight xp-HoverCursor',
            descriptionArea: 'descriptionArea xp-FloatLeft xp-Width xp-PaddingTop-4',
            contextMenuIcon: "homePage_Updates_ContextMenuIcon xp-FloatLeft xp-Margin-0 xp-Padding-0 xp-IconPostAction xp-Icon-Highlight",
            duration: 'xp-FontLite xp-VerticalAlignTop xp-IconTxtAlign xp-FloatLeft',
            clockIcon: 'xp-IconTimestamp xp-Icon xp-FloatLeft xp-PaddingRight-3',
            contextMenuDataDIV: 'homePage_Updates_contextMenuDataDIV xp-DisplayNone xp-PositionAbsolute xp-OuterPanel xp-ClearBoth xp-FloatLeft xp-PostActionList',
            displayNone: 'xp-DisplayNone',
            showDate: 'xp-PositionRelative xp-Width xp-FloatLeft',
            messageContainer: 'bs-example5 graph', //'xp-FloatLeft xp-Width',
            markAsReadDiv: 'homePage_Updates_markAsReadDiv xp-MarkRead xp-FloatLeft xp-Padding-2',
            markAsReadIcon: 'xp-IconAddAcknowledge-Highlight xp-Icon-Highlight xp-FloatLeft xp-Padding-4',
            unreadMessage: 'xp-NewUpdateHighlight',
            othersContainer: 'xp-FloatLeft ui-state-default xp-LikeCommentBg xp-Width',
            othersMainDiv: 'xp-FloatLeft xp-Width xp-LikeCommentBg',
            othersSubDiv: 'xp-Width xp-FloatLeft xp-OthersLikeScroll',
            nrow: 'xp-FloatLeft  xp-Width xp-LikeCommentBg',
            nrowInnerDiv: 'xp-FloatLeft xp-Padding-4 xp-Width30',
            userImageDiv: 'media-left', //'xp-FloatLeft xp-PaddingRight-5 xp-SmallProfilePic',
            userNameDiv: 'xp-FloatLeft',
            userName: 'media-heading', //'xp-LinkLabel',
            othersCloseMainDiv: 'xp-FloatLeft xp-CloseBox xp-Width',
            othersCloseDiv: 'xp-FloatLeft xp-Padding-4',
            othersCloseLink: 'xp-PaddingLeft-7 xp-LinkLabel',
            pollImage: "xp-Icon-Highlight  xp-IconAdminPoll"
        },
        /* Service url paths */
        paths: {
            getUpdatesServicePath: '/_vti_bin/XPointBase/UpdatesService.svc/GetUpdates',
            userUnSubscribe: '/_vti_bin/XPointBase/ProfileService.svc/UnFollowUser',
            componentUnSubscribe: '/_layouts/IImpact.Web/NotificationService.asmx/RemoveAlert',
            thisPostUnSubscribe: '/_vti_bin/XPointBase/UserPostsService.svc/UnfollowPost',
            markUpdateAsRead: '/_vti_bin/XPointBase/UpdatesService.svc/MarkUpdateAsRead',
            getUserDetails: '/_vti_bin/XPointBase/UpdatesService.svc/getUserDetails'
        },
        /* 
    	* these methods will be available to call from outside of the plugin 
    	*/
        methods:
        {
            /*Redraws the output*/
            refreshData: function (options, destination) {
                if (destination) {
                    /* 
        			* Empty the display area 
        			*/
                    var messageContainer = $("#" + $.xpointTemplates.ids.messageContainer);
                    var orgMessageContainer = $("#" + $.xpointTemplates.ids.orgMainContainer);
                    options.destination = destination;
                    options.page = 1;
                    if (messageContainer.length > 0) {
                        messageContainer.empty();
                        if (orgMessageContainer.length > 0) {
                            orgMessageContainer.addClass($.xpointTemplates.classes.displayNone);
                            if (destination == "HPAllUpdates") {
                                orgMessageContainer.removeClass($.xpointTemplates.classes.displayNone);
                            }
                        }
                        $.xpointTemplates.methods.getData.call(messageContainer, options);
                    }
                }
            },
            refreshPreContainer: function (opts) {
                var preContainer = $(".preUpdatesContainer");
                if (preContainer.length > 0) {
                    var updatesConfig = preContainer.get(0).updatesConfig;
                    $.extend(updatesConfig, opts);
                    preContainer.empty();
                    $($.xpointTemplates.preContainers).each(function () {
                        var fn = this;
                        /*
        				* fn here should a reference to a function and hence we need to check if fn is a valid function call
        				* if yes then call fn with container context and options
        				*/
                        if (fn && $.isFunction(fn)) {
                            fn.call(preContainer, updatesConfig);
                        }
                    });
                }
            },
            /*
        	* Start point for the plugin 
        	*/
            init: function (opts) {
                var jElem = this;
                var options = jElem.options;
                var container = $(jElem);


                var queries = {};
                $.each(document.location.search.substr(1).split('&'), function (c, q) {
                    if (q != "") {
                        var i = q.split('=');
                        queries[i[0].toString()] = i[1].toString();
                    }
                });

                var preContainer = $("<div  class='preUpdatesContainer' />");

                var messageContainer = $("<div />")
							                       .attr('id', $.xpointTemplates.ids.messageContainer)
							                       .attr('class', $.xpointTemplates.classes.messageContainer)
							                       .appendTo(container);
                $("#messageContainer").load("/_layouts/XPSecuirtyAdmin/OnlineUpdates/LifecycleUpdates.aspx?TrackerID=" + queries["TrackerID"]);
                /**
        		if (opts) {
        			options = $.extend($.xpointTemplates.defaults, opts);
        		}
        		if (options) {
        			//*update updates count in the homepage 
        			var updates = $("#updatesCountDiv");
        			updates.empty();
        			$.updatesCount.methods.refreshData.call(updates, { 'currentUserId': options.userId });
        			var updatesDiv = $("<div />");
        			if ($($.xpointTemplates.preContainers).length > 0) {
        				preContainer[0].updatesConfig = options;
        				container.append(preContainer);
        			}
        			$($.xpointTemplates.preContainers).each(function () {
        				var fn = this;
        				
        				//* fn here should a reference to a function and hence we need to check if fn is a valid function call
        				//* if yes then call fn with container context and options
        				
        				if (fn && $.isFunction(fn)) {
        					fn.call(preContainer, options);
        				}
        			});
        			var messageContainer = $("<div />")
							                       .attr('id', $.xpointTemplates.ids.messageContainer)
							                       .attr('class', $.xpointTemplates.classes.messageContainer)
							                       .appendTo(container);
        			$("#messageContainer").load("/_layouts/XPSecuirtyAdmin/OnlineUpdates/UpdateNotification.aspx");
        			messageContainer[0].updatesConfig = options;
        			$.xpointTemplates.methods.getData.call(messageContainer, opts);
        		}
        		else {
        			container.append("No data to prepare updates");
        		}
              */
            },
            /*Helper for Ajax calls */
            ajaxCall: function (ajaxOpts) {
                if (ajaxOpts) {
                    var aOpts = { type: "POST", contentType: "application/json; charset=utf-8", cache: false, dataType: "json", data: '' };
                    aOpts = $.extend(aOpts, ajaxOpts);
                    $.ajax(aOpts);
                }
            },
            /*refreshes the updates as read after certain period*/
            refreshUnRead: function (options) {
                var elem = this;
                /*marking updates as read*/
                if (elem.unreadUpdateIds) {
                    var updateIdsText = elem.unreadUpdateIds.join(",");
                    $.xpointTemplates.methods.markRead.call(elem, options, updateIdsText);
                }
            },
            /*Marking updates as read */
            markRead: function (options, text) {
                var ajaxOpts = {
                    url: $.xpointTemplates.paths.markUpdateAsRead,
                    data: '{"updateId":"' + text + '"}',
                    success: function (data) {
                        /*update updates count in the homepage */
                        var updates = $("#updatesCountDiv");
                        updates.empty();
                        $.updatesCount.methods.refreshData.call(updates, { 'currentUserId': options.userId });
                    }
                };
                $.xpointTemplates.methods.ajaxCall.call(this, ajaxOpts);
            },
            /*Updates updates message with mark as read*/
            refreshUnReadData: function () {
                /*Mark as read all the messages which has UnReadMessage as true*/

            },
            /* Adds basic html for incoming div (for other updates) */
            getBasicPostHtml: function (data, opts, contextMenuConfigs, includeContextMenu) {
                var elem = this;
                var item = data;
                var postTime = new Date(parseInt(item.ActualTime.substr(6)));
                var postTimeString = postTime.toUTCString().substr(0, postTime.toUTCString().lastIndexOf('UTC'));
                var container = $("<div />")
															.attr('class', $.xpointTemplates.classes.container)
                              .attr('style', 'margin-top:0px !important;')
															.appendTo(elem);
                var mainDiv = $("<div />")
															 .attr('class', $.xpointTemplates.classes.mainDiv)
															 .appendTo(container);
                /* Updating container with different css if the current user has not read this update */
                if (!item.IsRead) {
                    if (!elem.unreadUpdateIds) {
                        elem.unreadUpdateIds = [];
                        elem.unreadUpdateIds.push(item.UpdateID);
                        elem.refreshRequired = true;
                    }
                    else {
                        elem.unreadUpdateIds.push(item.UpdateID);
                    }
                    container.addClass($.xpointTemplates.classes.unreadMessage);
                    setTimeout(function () {
                        container.removeClass($.xpointTemplates.classes.unreadMessage);
                    }, opts.userReadDuration);
                }
                else {
                    container.removeClass($.xpointTemplates.classes.unreadMessage);
                }
                var profilePicDiv = $("<div />")
        			.attr('class', $.xpointTemplates.classes.profilePicDiv)
        			.appendTo(mainDiv);
                var profilePic = $("<img width='42px'/>")
        			.attr('src', item.CreatedByPictureUrl)
        			.attr('alt', 'Unable to display user profile pic')
        			.appendTo(profilePicDiv);
                var postDescriptionDiv = $("<div />")
        			.attr('class', $.xpointTemplates.classes.postDescriptionDiv)
        			.appendTo(mainDiv);
                var descriptionTopDiv = $("<div />")
        			//.attr('class', $.xpointTemplates.classes.descriptionTopDiv)
        			.appendTo(postDescriptionDiv);
                var postDescription = $("<div>" + opts.msgToPrint + "</div>")
        			.appendTo(descriptionTopDiv);
                if (opts.imageCSS) {
                    /* We add remaining code to this id  */
                    var descriptionArea = $("<div />")
						                        .attr('class', $.xpointTemplates.classes.descriptionArea)
																		.appendTo(postDescription);
                    var imageDiv = $("<div class='xp-MyPostsImg xp-FloatLeft " + opts.imageCSS + "' />")
							                .appendTo(descriptionArea);
                }
                var descriptionBottomDiv = $("<div />")
						                           .attr('class', $.xpointTemplates.classes.descriptionBottomDiv)
                                      // .attr("style", "padding-bottom: 25px; !important")
																			 .appendTo(postDescription);
                var durationDiv = $("<div />")
						                        .attr('class', $.xpointTemplates.classes.durationDiv)
																		.appendTo(descriptionBottomDiv);
                var horizontalLine = $("<br/><hr/>").appendTo(descriptionBottomDiv);
                /* Adding bottom section of the post description */
                var clockIcon = $("<div />")
																	.attr('class', $.xpointTemplates.classes.clockIcon)
																	.appendTo(durationDiv);
                var date = new Date(parseInt(data.ActualTime.substr(6)));
                var formattedDate = $.xpointTemplates.methods.formatDate(date);
                var duration = $("<div >" + $.timeago(postTime) + "</div>")
																					.attr('class', $.xpointTemplates.classes.duration)
																					.hover(function () {
																					    dateDiv.removeClass($.xpointTemplates.classes.displayNone);
																					},
																					function () {
																					    dateDiv.addClass($.xpointTemplates.classes.displayNone);
																					})
								                          .appendTo(durationDiv);
                var showDate = $("<div>")
                               .attr("class", $.xpointTemplates.classes.showDate)
                               .attr("style", "height:1px")
                               .appendTo(duration);
                var dateDiv = $("<div />")
								.attr('class', $.xpointTemplates.classes.dateDiv)
								.attr('style', 'width:135px')
								.append(formattedDate)
								.appendTo(showDate);        		/* Adding the right context menu icon*/
                if (opts.ExtraOptions && opts.ExtraOptions.contextMenu) {
                    var contextMenuIcon = $("<div />")
																						.attr('class', $.xpointTemplates.classes.contextMenuIcon)
																						.data('item', item)
																						.data('contextMenu', opts.ExtraOptions.contextMenu)
								                            .appendTo(mainDiv);

                    var contextMenuDataDIV = $("<div />")
																		 .attr('class', $.xpointTemplates.classes.contextMenuDataDIV)
																		 .appendTo(mainDiv);
                }
            },
            /*formats incoming date as dd-mmm-yyyy mm:ss AM/PM */
            formatDate: function (date) {
                if (typeof (date) == "object") {
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var minutesText = (minutes < 10 && minutes > 0) ? "0" + minutes : minutes;
                    var hoursText = (hours > 12) ? (hours - 12) + ":" + minutesText + " PM" : hours + ":" + minutesText + " AM";
                    return date.formatDate('dd-mmm-yyyy - ') + hoursText;
                }
                else {
                    return null;
                }
            },
            /*This method will add html when user clicks on other users*/
            getOthersData: function (message) {
                var elem = $(this);
                var likedByUser;
                var ajaxOpts = {
                    type: "GET",
                    cache: false,
                    url: $.xpointTemplates.paths.getUserDetails,
                    data: ({ "userMessage": message }),
                    success: function (data) {
                        var items = data.GetUserDetailsResult;
                        $.xpointTemplates.methods.addOthersHtml.call(elem, items);
                        if (items.length > 9) {
                            $('#' + $.xpointTemplates.ids.othersSubDiv).jScrollPane({ 'autoReinitialise': true, 'verticalDragMinHeight': '60' });
                        }
                        else {
                            $('#' + $.xpointTemplates.ids.othersSubDiv).removeClass("xp-OthersLikeScroll");
                        }
                    }
                };
                $.xpointTemplates.methods.ajaxCall(ajaxOpts);
            },
            /*adds others html*/
            addOthersHtml: function (items) {
                var elem = $(this);
                var parentElem = elem.parent().parent().parent().parent();
                var othersContainer = $("<div />")
								                      .attr('class', $.xpointTemplates.classes.othersContainer)
																			.attr('id', $.xpointTemplates.ids.othersContainer)
																			.appendTo(parentElem);
                var othersMainDiv = $("<div />")
								                    .attr('class', $.xpointTemplates.classes.othersMainDiv)
																		.attr('id', $.xpointTemplates.ids.othersMainDiv)
																		.appendTo(othersContainer);
                var othersSubDiv = $("<div />")
								                     .attr('class', $.xpointTemplates.classes.othersSubDiv)
																		 .attr('id', $.xpointTemplates.ids.othersSubDiv)
																		 .appendTo(othersMainDiv);
                var count = 0;
                var nrow;
                /*Looping through all users and building html accordingly*/
                $.each(items, function (i) {
                    var currElem = this;
                    if ((count % 3) == 0) {
                        nrow = $("<div/>")
								               .attr('class', $.xpointTemplates.classes.nrow)
        							         .appendTo(othersSubDiv);
                    }
                    var nrowInnerDiv = $("<div />")
									                    .attr('class', $.xpointTemplates.classes.nrowInnerDiv)
																			.attr('id', $.xpointTemplates.ids.nrowInnerDiv)
																			.appendTo(nrow);
                    var userImageDiv = $("<div />")
									                   .attr('class', $.xpointTemplates.classes.userImageDiv)
									                   .appendTo(nrowInnerDiv);
                    var userImage = $("<img />")
									                 .attr('src', currElem.UserProfilePic)
																	 .appendTo(userImageDiv);
                    var userNameDiv = $("<div />")
									                   .attr('class', $.xpointTemplates.classes.userNameDiv)
																		 .appendTo(nrowInnerDiv);
                    var userName = $("<a>" + currElem.UserName + "</a>")
									              .attr('class', $.xpointTemplates.classes.userName)
																.attr('target', currElem.UserProfileUrl)
																.appendTo(userNameDiv);
                    count++;
                });
                var othersCloseMainDiv = $("<div />")
									                      .attr('class', $.xpointTemplates.classes.othersCloseMainDiv)
																				.attr('id', $.xpointTemplates.ids.othersCloseMainDiv)
																				.appendTo(othersContainer);
                var othersCloseDiv = $("<div />")
									                       .attr('class', $.xpointTemplates.classes.othersCloseDiv)
																				 .attr('id', $.xpointTemplates.ids.othersCloseDiv)
																				 .appendTo(othersCloseMainDiv);
                var othersCloseLink = $("<a>Close</a>")
									                      .attr('href', '#')
																				.attr('class', $.xpointTemplates.classes.othersCloseLink)
																				.attr('id', $.xpointTemplates.ids.othersCloseLink)
																				.appendTo(othersCloseDiv);
                $("#" + $.xpointTemplates.ids.othersCloseLink).click(function (e) {
                    var elem = $(this);
                    /*Removing the others containr div*/
                    var parentElem = elem.parent().parent().parent();
                    parentElem.remove();
                    return false;
                });
            },
            /*gets data from db (through ajax query) */
            getData: function (options) {
                var elem = this;
                var config = $.extend({}, elem[0].updatesConfig, options);
                var combinedUrl = config.prepareUrl(config);
                var ajaxOpts = {
                    success: function (data) {
                        if (data) {
                            var result = options.processData.call(elem, data);
                            $.xpointTemplates.methods.draw.call(elem, result);
                            if (elem.refreshRequired) {
                                $.xpointTemplates.methods.refreshUnRead.call(elem, options);
                            }
                        }
                        /*
                        *  handling the context menu click icon 
                        */
                        $("." + $.xpointTemplates.ids.contextMenuIcon).click(function (e) {
                            var elem = $(this);
                            var contextMenuDataDiv = elem.next();
                            if (contextMenuDataDiv.is(":visible")) { contextMenuDataDiv.addClass("xp-DisplayNone"); return false; }
                            var item = elem.data().item;
                            var contextMenu = elem.data().contextMenu;

                            contextMenuDataDiv.empty().removeClass("xp-DisplayNone");
                            $(contextMenu).each(function () {
                                var cMenu = this;
                                var menuName = cMenu.title;
                                $.xpointTemplates.contextMenuOptions[menuName].add.call(contextMenuDataDiv, item, options);
                            });
                        });
                        /*When user clicks on others class */
                        $(".xp-nothers").click(function (e) {
                            var elem = $(this);
                            var message = elem.data().usersids;
                            if (message) {
                                var updateDiv = $(elem).parents('.xp-PositionRelative');
                                if ($(updateDiv).has($('#othersContainer')).length == 0) {
                                    $.xpointTemplates.methods.getOthersData.call(elem, message);
                                }
                            }
                            e.preventDefault();
                        });
                    }, url: combinedUrl
                };
                ajaxOpts = $.extend(ajaxOpts, config.ajaxOpts);
                $.xpointTemplates.methods.ajaxCall.call(this, ajaxOpts);
            },
            draw: function (opts) {
                var elem = this;
                var count = 0;
                var config = $.extend({}, elem[0].updatesConfig);
                $(opts.Data).each(function () {
                    var dataItem = this;
                    try {
                        config.ExtraOptions = $.parseJSON(dataItem.ExtraOptions);
                    } catch (e) { }
                    count = dataItem.Count;
                    var messageType = "", fn = null;
                    var fmType = $.xpointTemplates.templates[dataItem.FormatType] ? $.xpointTemplates.templates[dataItem.FormatType] : $.xpointTemplates.templates[config.defaultType];
                    try {
                        var message = $.parseJSON(dataItem.Message.replace(/\n/g, "\\n"));
                        if (message) {
                            config.msgToPrint = message.updateMessage;
                            fn = fmType.jsonReader;
                        }
                    } catch (e) {
                        config.msgToPrint = dataItem.Message;
                        fn = fmType.textReader ? fmType.textReader : null;
                    }
                    var init = fmType.init ? fmType.init : $.xpointTemplates.methods.getBasicPostHtml;
                    init.call(elem, dataItem, config);
                    if (fn != null) {
                        fn.call(elem, dataItem, config);
                    }
                });
                if (opts.NeedPage === true) {
                    var viewMoreDiv = $("#" + $.xpointTemplates.ids.viewMoreLink + "_Container");
                    viewMoreDiv.remove();
                    if (opts.TotalCount > (opts.PageSize * opts.Page)) {
                        viewMoreDiv = $("<div id='" + $.xpointTemplates.ids.viewMoreLink + "_Container' class='xp-FloatLeft xp-Width  xp-TextAlignCenter  xp-MarginTop-5' />");
                        viewMoreDiv.appendTo(elem);
                        var viewMoreLink = $("<div class=' xp-Width98 ui-secondarytabclr xp-ClearBoth ui-corner-all xp-TextAlignCenter xp-HoverCursor  ' style='margin:0 auto;' ><a id='" + $.xpointTemplates.ids.viewMoreLink + "' class='xp-PositionRelative xp-LinkLabel xp-HoverCursor xp-Height-20 xp-LineHeight-35 Tip-HPUpdatesViewMore' >View More</a></div>")
									                    .appendTo(viewMoreDiv)
																			.click(function (event) {
																			    elem[0].updatesConfig.page = (opts.Page + 1);
																			    $.xpointTemplates.methods.getData.call(elem, elem[0].updatesConfig);
																			    event.preventDefault();
																			});
                    }
                }
            }
        }
    };

    /*
	* Used for text type rendering 
	*/
    $.xpointTemplates.addTemplate("Text", {

        textReader: function (data, opts) {

        },
        jsonReader: function (data, opts) {

        }
    });
    /*
	* Used for media type rendering 
	*/
    $.xpointTemplates.addTemplate("Video",
    {
        jsonReader: function (data, opts) {
            return this.each(function () {
                var elem = $(this);
                /*description area where we add our custom coding for each type*/
                var descriptionArea = $("." + $.xpointTemplates.ids.descriptionArea);
                var videoDiv = $("<div class='xp-MyPostsImg xp-FloatLeft' />");
                var video = $("<video width='320' height='240' controls='controls'><source src='' type='video/mp4'>Your browser does not support video tag</video>")
								                     .appendTo(videoDiv);
            });
        }
    });
    /*
	* Used for media type rendering 
	*/
    $.xpointTemplates.addTemplate("Audio",
    {
        jsonReader: function (data, opts) {
            return this.each(function () {
                var elem = $(this);
                /*description area where we add our custom coding for each type*/
                var descriptionArea = $("." + $.xpointTemplates.ids.descriptionArea);
                var audioDiv = $("<div class='xp-MyPostsImg xp-FloatLeft' />");
                var audio = $("<audio controls='controls'><source src='' type='audio/mp3'>Your browser does not support video tag</audio>")
								                     .appendTo(audioDiv);
            });
        }
    });
    /*
	* used for poll type rendering
	*/
    $.xpointTemplates.addTemplate("Poll", {
        init: function (dataItem, config) {
            var elem = this;
            var extraConfig = $.extend({}, config, { imageCSS: $.xpointTemplates.classes.pollImage });
            $.xpointTemplates.methods.getBasicPostHtml.call(elem, dataItem, extraConfig);
        },
        jsonReader: function (data, options) {
            return this.each(function () {
                var elem = $(this);
                /*description area where we add our custom coding for each type*/
                var descriptionArea = $("." + $.xpointTemplates.ids.descriptionArea);
            });
        }
    });
    /*
	* used for document type rendering
	*/
    $.xpointTemplates.addTemplate("Document", {
        jsonReader: function (data, options) {
            return this.each(function () {
                var elem = $(this);
                /*description area where we add our custom coding for each type*/
                var descriptionArea = $("." + $.xpointTemplates.ids.descriptionArea);
            });
        }
    });
    /*
	* Renders context menu options for c_LifeCycle component
	*/
    $.xpointTemplates.addComponent("c_LifeCycle", {
        contextMenuOptions: ['user', 'lifecycle'],

        draw: function (data, options) {
            return this.each(function () {
                var elem = $(this);
                return elem;
            });
        }
    });
    /*
	* Renders context menu options for c_UserItem component
	*/
    $.xpointTemplates.addComponent("c_UserItem", {
        contextMenuOptions: ['user'],
        draw: function (data, options) {
            return this.each(function () {
                var elem = $(this);
                return elem;
            });
        }
    });
    /*
	* Renders context menu options for c_CategoryItem component
	*/
    $.xpointTemplates.addComponent("c_CategoryItem", {
        contextMenuOptions: ['user', 'forum'],
        draw: function (data, options) {
            return this.each(function () {
                var elem = $(this);
                return elem;
            });
        }
    });
    /*
	*  Renders context menu options for c_OrganizationPostItem component
	*/
    $.xpointTemplates.addComponent("c_OrganizationPostItem", {
        contextMenuOptions: [],
        draw: function (data, options) {
            return this.each(function () {
                var elem = $(this);
                return elem;
            });
        }
    });
    /*
	*  Renders context menu options for c_UserPostItem component
	*/
    $.xpointTemplates.addComponent("c_UserPostItem", {
        contextMenuOptions: ['user', 'post'],
        draw: function (data, options) {
            return this.each(function () {
                var elem = $(this);
                return elem;
            });
        }
    });
})(jQuery);