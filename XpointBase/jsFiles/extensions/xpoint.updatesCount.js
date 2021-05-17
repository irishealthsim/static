(function ($) {
	$.updatesCount = $.updatesCount | {};
	$.fn.updatesCount = function (options) {
		if (!this || this.length == 0) {
			return;
		}
		var elem = this;
		if (typeof (options == "object")) {
			var jElem = elem.get(0);
			var options = $.extend($.updatesCount.defaults, options);
			jElem.options = options;
			return $.updatesCount.methods.init.call(elem, options);
		}
		var fnCall = $.updatesCount.methods[options];
		if (fnCall && $.isFunction(fnCall)) {
			return fnCall.methods[options].call(elem, arguments[1]);
		}
	};

	$.updatesCount = {
		/*default values*/
		defaults: {
			/*
			* updates will refresh for every 15 min
			* refreshDuration should be given in milliseconds
			* thus 15 minutes means (15 * 60 * 1000)
			*/
			refreshDuration: 900000,
			currentUserId: '',
			homeUrl: '',
			prepareUrl: function (ops) {
				return $.updatesCount.paths.GetUnreadCount + "?userId=" + ops.currentUserId;
			}
		},
		paths: {
			getUnreadCount: '/_vti_bin/XPointBase/UpdatesService.svc/getUnreadCount'
		},
		methods: {
			init: function (options) {
				return this.each(function () {
					var elem = $(this);
					/*This refresh data will run for the first time */
					$.updatesCount.methods.refreshData.call(elem, options);
					var updatesTimer = window.setInterval(function () {
						/* this will run for every x inteval */
						$.updatesCount.methods.refreshData.call(elem, options);
					}, options.refreshDuration);
					/*When user clicks on count div redirect him to homepage  */
					elem.click(function (e) {
						window.location = options.homeUrl;
						e.preventDefault();
					});
				});
			},

			/*This method will prompt the message by showing 'need to login again ' to the end user */
			CheckForLogin: function () {
				$.ajaxSetup(
                {
                	beforeSend: function (call) {
                		return false;
                	}
                });
				if ($("#loginNeeded").length == 0) {
					var loginDiv = $("<div id='loginNeeded'/>").append("Session time out. Need to login again.").appendTo('body').dialog({
						closeOnEscape: false,
						open: function (event, ui) {
							$(".ui-dialog-titlebar-close").hide();
						},
						modal: true,
						buttons: {
							"Click to login again": function () {
								location.reload();
							}
						}
					});
				}
			},
			/*Updating unread  count of updates based on the needLogin boolian value */
			refreshData: function (opts) {
				var elem = this;
				/*Sanity check*/
				if (opts.currentUserId != "") {
					$.ajax({ type: 'GET',
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						cache: false,
						url: $.updatesCount.paths.getUnreadCount + "?userId=" + opts.currentUserId,
						success: function (data) {
							var needLogin = data.GetUnreadCountResult.NeedLogin;
							/*If the returned value present in the variable 'needLogin' is 'false',
							*then only  add the resulted unread count of  updates to the 
							*'unread count update section' on the  page */
							if (needLogin === false) {
								var unReadCount = data.GetUnreadCountResult.UnreadCount;
								elem.empty();
								elem.append(unReadCount);
								/*If no updates are there don't display anything/ hide the count div*/
								(unReadCount == 0) ? elem.addClass('xp-DisplayNone') : elem.removeClass('xp-DisplayNone');
							}
							/*Otherwise , call the CheckLogin() method which will prompt the message 
							*to the  end user by showing 'Session time out. Need to login again'*/
							else {
								$.updatesCount.methods.CheckForLogin();
							}
						}
					});
				}
			}
		}
	}
})(jQuery);