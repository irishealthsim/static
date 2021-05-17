(function ($) {
	/*
	* Adds unsubscribe user anchor to the context menu 
	*/
	$.xpointTemplates.addContextMenuOptions("user", {
		add: function (item) {
			var elem = this;
			if ((item.Destination1 == "HPUser") || (item.Destination2 == "HPUser") || (item.Destination3 == "HPUser") || (item.Destination4 == "HPUser") || (item.Destination5 == "HPUser")) {
				var div = $("<div />")
									.attr('class', 'homePage_Updates_UserUnSubscribe xp-FloatLeft xp-Width xp-HoverCursor')
									.appendTo(elem);
				var userLink = $("<a >Unfollow this User </a>")
	                  .attr('class', 'xp-Padding-4 xp-LinkLabel')
										.appendTo(div)
										.click({ item: item }, function (e) {
											var obj = e.data.item;
											var ajaxOptions = {
												data: '{ "userId":' + obj.CreatedByID + '}',
												url: $.xpointTemplates.paths.userUnSubscribe,
												/*After forum unsubscribing  if you want to do something you can do it in below success method*/
												success: function (data) {
												}
											};
											$.xpointTemplates.methods.ajaxCall.call(this, ajaxOptions);
										});
			}
			return elem;
		}
	});
	/*
	* Adds unsubscribe lifecycle anchor to the context menu 
	*/
	$.xpointTemplates.addContextMenuOptions("lifecycle", {
		add: function (item) {
			var elem = this;
			if ((item.Destination1 == "HPLifecycle") || (item.Destination2 == "HPLifecycle") || (item.Destination3 == "HPLifecycle") || (item.Destination4 == "HPLifecycle") || (item.Destination5 == "HPLifecycle")) {
				var div = $("<div />")
									.attr('class', 'homePage_Updates_LifecycleUnSubscribe xp-FloatLeft xp-Width xp-HoverCursor')
									.appendTo(elem);
				var userLink = $("<a >Unfollow this Lifecycle </a>")
	                  .attr('class', 'xp-Padding-4 xp-LinkLabel')
										.appendTo(div)
										.click({ item: item }, function (e) {
											var obj = e.data.item;
											var ajaxOpts = {
												data: "{ componentName: 'LCUpdate' ,uniqueId: '" + obj.ComponentID + "'}",
												url: $.xpointTemplates.paths.componentUnSubscribe,
												/*After forum unsubscribing  lifecycle if you want to do something you can do it in below success method*/
												success: function (data) {
												}
											};
											$.xpointTemplates.methods.ajaxCall.call(this, ajaxOpts);
										});
			}
			return elem;
		}
	});
	/*
	* Adds unsubscribe forum anchor to the context menu 
	*/
	$.xpointTemplates.addContextMenuOptions("forum", {
		add: function (item) {
			var elem = this;
			var div = $("<div />")
									.attr('class', 'homePage_Updates_ForumUnSubscribe xp-FloatLeft xp-Width xp-HoverCursor')
									.appendTo(elem);
			var userLink = $("<a >Unfollow this discussion </a>")
	                  .attr('class', 'xp-Padding-4 xp-LinkLabel')
										.appendTo(div)
										.click({ item: item }, function (e) {
											var obj = e.data.item;
											var ajaxOpts = {
												data: "{ componentName: 'ForumUpdate' ,uniqueId: '" + obj.ComponentID + "'}",
												url: $.xpointTemplates.paths.componentUnSubscribe,
												/*After forum unsubscribing  lifecycle if you want to do something you can do it in below success method*/
												success: function (data) {
												}
											};
											$.xpointTemplates.methods.ajaxCall.call(this, ajaxOpts);
										});
			return elem;
		}
	});
	/*
	* Adds unsubscribe this post anchor to the context menu 
	*/
	$.xpointTemplates.addContextMenuOptions("post", {
		add: function (item) {
			var elem = this;
			var div = $("<div />")
									.attr('class', 'homePage_Updates_ThisPostUnSubscribe xp-FloatLeft xp-Width xp-HoverCursor')
									.appendTo(elem);
			var userLink = $("<a>Unfollow this post </a>")
	                  .attr('class', 'xp-Padding-4 xp-LinkLabel')
										.appendTo(div)
										.click({ item: item }, function (e) {
											var obj = e.data.item;
											var ajaxOpts = {
												data: '{ "postId":' + obj.ComponentID + '}',
												url: $.xpointTemplates.paths.thisPostUnSubscribe,
												/*After this post unsubscribing this post if you want to do something you can do it in below success method*/
												success: function (data) {
													alert('successfully unsubscribed post');
												}
											};
											$.xpointTemplates.methods.ajaxCall.call(this, ajaxOpts);
										});
			return elem;
		}
	});
})(jQuery);