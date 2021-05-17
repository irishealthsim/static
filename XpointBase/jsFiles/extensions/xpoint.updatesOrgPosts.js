var orgPostIds = {
	orgMainContainer: 'orgMainContainer',
	markAsReadContainer: 'markAsReadContainer',
	mainDiv: 'mainDiv',
	profilePicDiv: 'profilePicDiv',
	profileUrl: 'profileUrl',
	postDescriptionDiv: 'postDescriptionDiv',
	descriptionTopDiv: 'descriptionTopDiv',
	orgPostDescription: 'orgPostDescription',
	descriptionBottomDiv: 'descriptionBottomDiv',
	descriptionArea: 'descriptionArea',
	duration: 'duration',
	clockIcon: 'clockIcon',
	markAsReadIcon: 'markAsReadIcon',
	profilePic: 'profilePic'
};
var orgPostPaths = {
	getOrganizationPosts: '/_vti_bin/XPointBase/OrganizationPostsService.svc/getUnreadPosts',
	markPostAsRead: '/_vti_bin/XPointBase/OrganizationPostsService.svc/MarkPostAsRead'
};
var orgPostCSS = {
	markAsReadContainer: 'xp-FloatLeft xp-Width xp-BorderBottomGray xp_newHighlight',
	orgMainContainer: 'xp-FloatLeft xp-Width',
	markAsReadDiv: 'xp-MarkRead xp-FloatLeft xp-Padding-2 xp-HoverCursor Tip-HPUpdatesMarkRead'
};
var updatesOrganizationPostMethods = {
  /*gets orgnization posts */
  getOrgData: function (options) {
    var elem = this;
    var ajaxOpts = { success: function (data) {
      var items = data.GetUnreadPostsResult;
      $.each(items, function () {
        var dataItem = this;
        updatesOrganizationPostMethods.getOrgPostHtml.call(elem, dataItem, items)
      });
    },
      type: "GET",
      url: orgPostPaths.getOrganizationPosts
    };
    ajaxOpts = $.extend(ajaxOpts, options.ajaxOpts);
    $.xpointTemplates.methods.ajaxCall.call(this, ajaxOpts);
  },
  /* adds html for incoming div (for Organization updates) */
  getOrgPostHtml: function (data, opts) {
    var elem = this;
    var item = data;
    var postTime = new Date(parseInt(item.CreatedDate.substr(6)));
    var postTimeString = postTime.toUTCString().substr(0, postTime.toUTCString().lastIndexOf('UTC'));
    var markAsReadContainer = $("<div />")
						                          .attr('id', orgPostIds.markAsReadContainer)
																			.attr('class', $.xpointTemplates.classes.markAsReadContainer)
																			.appendTo(elem);

    var mainDiv = $("<div />")
						                   .attr('id', orgPostIds.mainDiv)
															 .attr('class', $.xpointTemplates.classes.mainDiv);
    mainDiv.appendTo(markAsReadContainer);
    var profilePicDiv = $("<div />")
						                    .attr('id', orgPostIds.profilePicDiv)
																.attr('class', $.xpointTemplates.classes.profilePicDiv)
						                    .appendTo(mainDiv);
    var profilePic = $("<img width='42px'/>")
        																					.attr('id', orgPostIds.profilePic)
        																					.attr('src', item.CreatedBy.PictureUrl)
        																					.attr('alt', 'Unable to display user profile pic')
        										                      .appendTo(profilePicDiv);
    var postDescriptionDiv = $("<div />")
						                         .attr('id', orgPostIds.postDescriptionDiv)
						                         .attr('class', $.xpointTemplates.classes.postDescriptionDiv)
																		 .appendTo(mainDiv);
    var descriptionTopDiv = $("<div />")
																			.attr('id', orgPostIds.descriptionTopDiv)
																			.attr('class', $.xpointTemplates.classes.descriptionTopDiv)
																			.appendTo(postDescriptionDiv);
    var orgPostDescription = $("<div />")
						                           .attr('id', orgPostIds.orgPostDescription)
								                       .appendTo(descriptionTopDiv);
    var profileUrl = $("<a>" + item.CreatedBy.DisplayName + "</a>")
						                .attr('href', item.CreatedBy.ProfileUrl)
														.attr('class', $.xpointTemplates.classes.link + " Tip-HPUpdatesUsername")
														.appendTo(orgPostDescription);
    var profileUrl = item.CreatedBy.ProfileUrl;
    var siteUrl = profileUrl.slice(0, profileUrl.lastIndexOf("/"));
    var orgPostUrl = siteUrl + "/OrganizationPost.aspx?PostID=" + item.Id;
    var orgPostLink = "post for Organization";
    orgPostDescription.append(' made a ' + orgPostLink + ' - ' + "<a href=" + orgPostUrl + ">" + item.Description + "</a>");
    var descriptionBottomDiv = $("<div />")
						                           .attr('class', $.xpointTemplates.classes.descriptionBottomDiv)
																			 .attr('id', orgPostIds.descriptionBottomDiv)
																			 .appendTo(orgPostDescription);
    var durationDiv = $("<div />")
						                        .attr('class', $.xpointTemplates.classes.durationDiv)
																		.appendTo(descriptionBottomDiv);
    /* We add remaining code to this id  */
    var descriptionArea = $("<div />")
																		.attr('id', orgPostIds.descriptionArea)
						                        .attr('class', $.xpointTemplates.classes.descriptionArea);
    /* Adding bottom section of the post description */
    var clockIcon = $("<div />")
						                      .attr('id', orgPostIds.clockIcon)
																	.attr('class', $.xpointTemplates.classes.clockIcon)
																	.appendTo(durationDiv);
    var date = new Date(parseInt(data.CreatedDate.substr(6)));
    var formattedDate = $.xpointTemplates.methods.formatDate(date);
    var duration = $("<div >" + $.timeago(postTime) + "</div>")
											.attr('class', $.xpointTemplates.classes.duration + " Tip-HPTimeStamp")
											.hover(function () {
											  dateDiv.removeClass($.xpointTemplates.classes.displayNone);
											},
											function () {
											  dateDiv.addClass($.xpointTemplates.classes.displayNone);
											})
								      .appendTo(durationDiv);
    var showdate = $("<div />")
                        .attr("class", $.xpointTemplates.classes.showDate)
                        .attr("style", "height:1px")
                        .appendTo(duration);
    var dateDiv = $("<div />")
						.attr('class', $.xpointTemplates.classes.dateDiv)
						.attr('style', 'width:135px')
						.append(formattedDate)
						.appendTo(showdate);
    var markAsDiv = $("<div />")
						                .attr('class', $.xpointTemplates.classes.markAsDiv)
														.appendTo(descriptionBottomDiv);
    var markAsReadIcon = $("<div />")
						                     .attr('id', orgPostIds.markAsReadIcon)
						                     .attr('class', $.xpointTemplates.classes.markAsReadIcon)
																 .appendTo(markAsDiv);
    var markAsReadDiv = $("<div />")
																 .attr('class', orgPostCSS.markAsReadDiv)
																 .append('Mark As Read')
																 .appendTo(markAsDiv)
																 .click(function (event) {
																   var elem = $(this);
																   /*performing ajax call to mark as read*/
																   var ajaxOpts = {
																     url: orgPostPaths.markPostAsRead,
																     cache: false,
																     data: '{"postId":' + item.Id + '}'
																   };
																   $.xpointTemplates.methods.ajaxCall.call(this, ajaxOpts);
																   /*Removing update container where user clicked Mark As Read
																   * If it is the last update we are removing the whole container
																   */
																   var currentUpdateContainer = elem.parent().parent().parent().parent().parent().parent().parent();
																   var mainContainer = currentUpdateContainer.parent();
																   var mainContainerContents = currentUpdateContainer.parent().children().length;
																   if (mainContainerContents == 1) {
																     mainContainer.remove();
																   }
																   else {
																     currentUpdateContainer.remove();
																   }
																   event.preventDefault();
																 });
  }
};
$.xpointTemplates.preContainers.push(
function (opts) {
	var container = this;
	var orgMainContainer = $("<div />")
							                       .attr('id', orgPostIds.orgMainContainer)
																		 .attr('class', orgPostCSS.orgMainContainer)
        			                       .appendTo(container);
	updatesOrganizationPostMethods.getOrgData.call(orgMainContainer, opts);
}
);