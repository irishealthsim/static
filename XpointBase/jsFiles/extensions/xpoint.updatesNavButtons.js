(function ($) {
	$.xpointTemplates.addNavButtons("like", {
		draw: function (opts) {
			var elem = this;

			return elem;
		}
	});

	/* Adds navigation button to the post/supplied elem */
	$.xpointTemplates.addNavButtons("ViewPost", {
		draw: function (options) {
			var elem = this;
			elem.empty();
			var href = '#'; //window.location.href.substring(0, window.location.href.lastIndexOf("/")) + "/Post.aspx?PostID=" + postId + "";
			var linkLI = $("<li />").appendTo(elem);
			var viewpostsHref = $("<a >View Post</a>")
			                    .attr('class', 'viewPost xp-LinkLabel')
													.attr('href', href)
													.appendTo(linkLI);

			return elem;
		}
	});
	/* */
	$.xpointTemplates.addNavButtons("MarkAsRead", {
		draw: function (options) {
			var elem = this;
			elem.empty();
			var href = '#';
			var linkLI = $("<li />").appendTo(elem);
			var markAsRead = $("<a>Mark As Read</a>")
	                 .attr('class', 'HomePage_Updates_MarskAsRead xp-LinkLabel')
									 .attr('href', href)
									 .appendTo(linkLI);
			return elem;
		}
	});
})(jQuery);