(function ($) {
  $.displayPosts = $.displayPosts || {};
  $.fn.displayPosts = function (options) {
    this.options = $.extend($.displayPosts.defaults, options);
    $.displayPosts.methods.init.apply(this, $.makeArray(this.options));
  };
  /*
  *Providing NameSpace for displayPosts Action
  */
  $.displayPosts = {
    defaults: {
      userId: '',
      numberOfPosts: 10,
      viewAllUrl: '',
      inputBoxWaterMarkText: 'Write a comment and Press Enter',
      playableAudioFileTypes: [],
      playableMediaFileTypes: [],
      docFileTypes: [],
      imageFileTypes: [],
      mediaFileTypes: [],
      page: 1,
      needPage: true
    },
    /*
    *Array to declare various Paths
    */
    paths: {
      getPosts: '/_vti_bin/xpointbase/UserPostsService.svc/getPostsByUser'
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
        $.displayPosts.methods.createHtml.apply(elem, $.makeArray(options));
      },
      /*
      * Prepare Following layout
      */
      getPosts: function (elem, options) {
        $.ajax({
          type: "GET",
          dataType: "json",
          cache: false,
          url: $.displayPosts.paths.getPosts,
          data: ({ "userId": options.userId, "numberOfPosts": options.numberOfPosts, "contentTypes": "ALL", "page": options.page, "needPage": options.needPage }),
          success: function (data) {
            var posts = data.GetPostsByUserResult;
            /*
            * Call CreatePostLayout method from posts plugin to display posts
            */
            if (posts.Data.length > 0) {
              $.each(posts.Data, function (i) {
                var post = this;
                $.postTemplates.methods.createPostLayout(elem, post, options);
              });

              if (options.viewAllUrl != '') {
                var viewAllMain = $("<div class='xp-PostBackground xp-FloatLeft xp-Width'></div>");
                var viewAll = $("<div class='xp-Padding-4'><a href='" + options.viewAllUrl + "' class='Tip-PVViewAllRP' style='text-decoration:none'>View All</a></div>");
                viewAllMain.append(viewAll);
                elem.append(viewAllMain);
              }
              else if (posts.NeedPage === true) {
                var viewMoreDiv = $("#" + $.postTemplates.ids.viewMoreLink + "_Container");
                viewMoreDiv.remove();
                if (posts.TotalCount > (posts.PageSize * posts.Page)) {
                  viewMoreDiv = $("<div id='" + $.postTemplates.ids.viewMoreLink + "_Container' class='xp-FloatLeft xp-Width ui-state-default xp-TextAlignCenter ui-corner-all xp-MarginTop-5 xp-HoverCursor' />");
                  viewMoreDiv.appendTo(elem);
                  var viewMoreLink = $("<a id='" + $.postTemplates.ids.viewMoreLink + "' class='xp-nothers xp-PositionRelative xp-LinkLabel Tip-HPUpdatesViewMore xp-HoverCursor xp-Height-20 xp-LineHeight-35' >View More</a>")
        																									.appendTo(viewMoreDiv)
        																									.click(function () {
        																									  var ops = options;
        																									  ops.page = (posts.Page + 1);
        																									  $.displayPosts.methods.getPosts(elem, ops);
        																									});
                }
              }
            }
            else {
            	elem.append("<div class='xp-NoData xp-FontLite xp-Height-30 '>" + options.userName + " hasn't posted anything yet.</div>");
            }
          }
        });
      },
      /*
      * Creates Layout
      */
      createHtml: function (options) {
        var elem = $(this);
        var mainDiv = $("<div class='xp-Width xp-FloatLeft xp-MarginTop-5 xp-DisplayBlock'/>").appendTo(elem);
        $.displayPosts.methods.getPosts(mainDiv, options)
      } //end of CreateHtml            
    }//end of method array
  }//end of namespace
})(jQuery);
