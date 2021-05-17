(function ($) {
  $.userFollow = $.userFollow || {};
  $.fn.userFollow = function (options) {
    //logic  for calling method which are under notification nameSpace
    if (!this || this.length == 0) return;
    if (typeof (options) == "object") {
      var elem = $(this);
      $.data(document, "userFollowOptions", options);
      $.userFollow.methods.init.apply(this, $.makeArray(options));
    }
    if ($.userFollow.methods[options]) {
      var userFollowOptions = $.data(document, "userFollowOptions");
      userFollowOptions = $.extend(userFollowOptions, Array.prototype.slice.call(arguments, 1));
      return $.userFollow.methods[options].apply(this, $.makeArray(userFollowOptions));
    }
  };
  /*
  *Providing NameSpace for UserFollow Action
  */
  $.userFollow = {
    /*
    *Array to declare various Paths
    */
    paths: {
      userImagePath: "/_layouts/Images/XpointBase/software-developer.jpg",
      followerServiceUrl: '/_vti_bin/xpointbase/ProfileService.svc/getFollowers',
      followingServiceUrl: '/_vti_bin/xpointbase/ProfileService.svc/getFollowing',
      ServiceUrl: '/_vti_bin/xpointbase/ProfileService.svc/'
    },
    /*
    *Array to declare Classes for plugin
    */
    classes:
		{
		  action: 'ui-secondarytabclr',
		  noData: 'xp-NoData xp-Height-36  xp-FontBold',
		  tourClass: 'Tip-Hp'
		},
    /*
    * Array to declare Id's
    */
    ids: {
      userDiv: 'userDiv_',
      userSearchBox: 'userSearchBox',
      action: 'action',
      status: 'status_',
      action: 'action_',
      followDiv: 'followDiv'
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
        $.userFollow.methods.createHtml.apply(elem, $.makeArray(options));
        $("#" + $.userFollow.ids.userSearchBox).watermark("Find By Name");

      },
      /*Helper for Ajax calls */
      ajaxCall: function (ajaxOpts, loadingOpts) {
        var elem = this;
        elem.showLoading(loadingOpts);
        var onComplete = (ajaxOpts.onComplete && $.isFunction(ajaxOpts.onComplete)) ? ajaxOpts.onComplete : null;
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
      /*
      *Gets User Information ,Prepare html for each User
      */
      GetUserInformation: function (user) {
        var userInfoMainDiv = $("<div id='" + $.userFollow.ids.userDiv + user.Id + "'  class='userDiv xp-FollowMiniBox xp-FollowMiniBoxIe xp-FloatLeft xp-BorderBox xp-Padding-4 xp-BorderGray xp-Body'/> ");
        var userImageDiv = $("<div style='height:84px;' class='xp-FloatLeft  xp-Width30 xp-Overflowhidden'><div class=' xp-FloatLeft xp-FollowImgDiv'><img src='" + user.ImageUrl + "' alt='userProfile pic' /></div></div>").appendTo(userInfoMainDiv);
        var userInfoDiv = $("<div class='xp-FloatLeft xp-Width60 xp-MarginLeft-5'/>").appendTo(userInfoMainDiv);
        var userNameDiv = $("<div id = 'namesearchBox' class=''><a href= " + user.ProfileUrl + " class='xp-LinkLabel'>" + user.Name + "</a></div>").appendTo(userInfoDiv);
        var userWorkProfile = user.Department != null ? user.Department : "";
        var userWorkDetailsDiv = $("<div>" + userWorkProfile + "</div>").appendTo(userInfoDiv);
        var userLocation = user.Function != null ? user.Function : "";
        var userJobDiv = $("<div>" + userLocation + "</div>").appendTo(userInfoDiv);
        var userGroup = user.Location != null ? user.Location : "";
        var userLocationDiv = $("<div>" + userGroup + "</div>").appendTo(userInfoDiv);
        var userFollowDiv = $("<div class='xp-FloatLeft xp-Width'><div id='" + $.userFollow.followDiv + user.Id + "' class='" + $.userFollow.classes.action + " xp-TextAlignCenter " + $.userFollow.classes.tourClass + "Btn ui-corner-all xp-Padding-5'><a href='#' id='" + $.userFollow.ids.action + user.Id + "' class='xp-LinkLabel'>" + user.Action + "</a><span id='" + $.userFollow.ids.status + user.Id + "' class='xp-LinksDefault'>/" + user.ConnectionStatus + "</span> </div></div>").appendTo(userInfoMainDiv);
        return userInfoMainDiv;
      },
      bindAction: function (userId, elem, options) {
        $("#" + $.userFollow.ids.action + userId).click(function () {
          $.userFollow.methods.userFollowAction(userId, elem, options);
        });
      },
      /*
      Creates Layout
      */
      createHtml: function (options) {
        var elem = $(this);
        $.userFollow.classes.tourClass += options.classification;
        var mainDiv = $("<div  class='xp-FloatLeft xp-BorderBox  ui-corner-all xp-MarginLeft-5 xp-Width98 xp-RelativePositionIe ui-state-default xp-NoBackground'/>").appendTo(elem);
        var inputBox = $("<input autocomplete='off' class='" + $.userFollow.classes.tourClass + "Input' type='text' id = '" + $.userFollow.ids.userSearchBox + "' />");
        var inputTextBoxDiv = $("<div style='margin:0 auto;' class='xp-ClearBoth xp-PaddingTopBottom-10  xp-Width98 '/>").append(inputBox).appendTo(mainDiv);
        var usersInfoMainDivContainer = $("<div style='margin:0 auto;' class='xp-ClearBoth xp-Width98' >").appendTo(mainDiv);
        var usersInfoMainDiv = $("<div style='padding-bottom:10px' class='xp-FloatLeft xp-Width' >").appendTo(usersInfoMainDivContainer);
        /*Ajax call to get User Information based on the classification*/
        var num = -1;
        if (options.classification == "FollowingMe") {
          var followerAjaxOptions = {
            type: "GET",
            dataType: "json",
            cache: false,
            url: $.userFollow.paths.followerServiceUrl,
            onComplete: function () {
              /*
              *Calling QuickSearch plugin
              */
              $("#" + $.userFollow.ids.userSearchBox).quicksearch('.userDiv', { selector: "#namesearchBox" });
            },
            data: ({ "userId": options.userId, "numberOfUsers": num }),
            success: function (data) {
              if (data.GetFollowersResult.length > 0) {
                var followers = data.GetFollowersResult;
                $.each(followers, function (i) {
                  var follower = this;
                  usersInfoMainDiv.append($.userFollow.methods.GetUserInformation(follower));
                  $.userFollow.methods.bindAction(follower.Id, elem, options);
                })
              }
              else {
              	var noDataDiv = $("<div class='" + $.userFollow.classes.noData + "'>There are no items to display. You currently have no followers<div/>");
                usersInfoMainDiv.append(noDataDiv);
              }
            }
          }
          var loadingPosition = { marginTop: "200px" };
          $.userFollow.methods.ajaxCall.call(elem, followerAjaxOptions, loadingPosition);
        }
        else {
          var followingAjaxOptions = {
            type: "GET",
            dataType: "json",
            cache: false,
            onComplete: function () {
              /*
              *Calling QuickSearch plugin
              */
              $("#" + $.userFollow.ids.userSearchBox).quicksearch('.userDiv', { selector: "#namesearchBox" });
            },
            url: $.userFollow.paths.followingServiceUrl,
            data: ({ "userId": options.userId, "numberOfUsers": num }),
            success: function (data) {
              if (data.GetFollowingResult.length > 0) {
                var followings = data.GetFollowingResult;
                $.each(followings, function (i) {
//                  var following = this;
//                  usersInfoMainDiv.append($.userFollow.methods.GetUserInformation(following));
//                  $.userFollow.methods.bindAction(following.Id, elem, options);
                })
              } else {
                	var noDataDiv = $("<div class='" + $.userFollow.classes.noData + "'>There are no items to display. You are currently not following anyone<div/>");
                usersInfoMainDiv.append(noDataDiv);
              }
            }
          }
          var loadingPosition = { marginTop: "200px" };
          $.userFollow.methods.ajaxCall.call(elem, followingAjaxOptions, loadingPosition);
        }
      }, //end of CreateHtml
      /*
      Ajax call to Perfrom Follow/Unfollow Action
      */
      userFollowAction: function (userID, elem, options) {
        $.ajax({
          type: "GET",
          cache: false,
          dataType: "json",
          url: $.userFollow.paths.ServiceUrl + "IsFollowing",
          data: ({ "userId": userID }),
          success: function (data) {
            if (data.IsFollowingResult === false) {
              var followAjaxOptions = {
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: $.userFollow.paths.ServiceUrl + "UserFollow",
                data: '{ "userId": ' + userID + '}',
                /*
                *Changing/Updating the status and action Text
                */
                success: function (data) {

                  if (data.UserFollowResult.FollowStatus == "") {
                    $("#" + $.userFollow.ids.userDiv + userID).remove();
                    $('#followingCount').text(data.ToggleFollowResult.FollowingCount);
                    $('#followersCount').text(data.ToggleFollowResult.FollowersCount);
                  }
                  else {
                    $("#" + $.userFollow.ids.action + userID).text('');
                    $("#" + $.userFollow.ids.action + userID).text(data.UserFollowResult.ActionStatus + "/");
                    $("#" + $.userFollow.ids.status + userID).text('');
                    $("#" + $.userFollow.ids.status + userID).text(data.UserFollowResult.FollowStatus);
                    $('#followingCount').text(data.UserFollowResult.FollowingCount);
                    $('#followersCount').text(data.UserFollowResult.FollowersCount);
                  }
                }
              }
              $.userFollow.methods.ajaxCall.call($("#" + $.userFollow.ids.userDiv + userID), followAjaxOptions);
            }
            else {
              var unFollowAjaxOptions = {
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: $.userFollow.paths.ServiceUrl + "UserUnFollow",
                data: '{ "userId": ' + userID + '}',
                /*
                *Changing/Updating the status and action Text
                */
                success: function (data) {
                  if (options.classification == "IFollowing") {
                    if (data.UserUnFollowResult.FollowStatus == "Following Me") {
                      $("#" + $.userFollow.ids.userDiv + userID).remove();
                      $('#followingCount').text(data.UserUnFollowResult.FollowingCount);
                      $('#followersCount').text(data.UserUnFollowResult.FollowersCount);
                    }
                  }
                  if (data.UserUnFollowResult.FollowStatus == "") {
                    $("#" + $.userFollow.ids.userDiv + userID).remove();
                    $('#followingCount').text(data.UserUnFollowResult.FollowingCount);
                    $('#followersCount').text(data.UserUnFollowResult.FollowersCount);
                  }
                  else {
                    $("#" + $.userFollow.ids.action + userID).text('');
                    $("#" + $.userFollow.ids.action + userID).text(data.UserUnFollowResult.ActionStatus + "/");
                    $("#" + $.userFollow.ids.status + userID).text('');
                    $("#" + $.userFollow.ids.status + userID).text(data.UserUnFollowResult.FollowStatus);
                    $('#followingCount').text(data.UserUnFollowResult.FollowingCount);
                    $('#followersCount').text(data.UserUnFollowResult.FollowersCount);
                  }
                }
              }
              $.userFollow.methods.ajaxCall.call($("#" + $.userFollow.ids.userDiv + userID), unFollowAjaxOptions);
            }
          }
        });
      } //end of Useraction
    }//end of method array
  }//end of namespace
})(jQuery);
