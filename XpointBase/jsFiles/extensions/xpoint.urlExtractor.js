(function ($) {

	$.urlExtractor = {
		defaults: {
			getUrl: "/_vti_bin/XPointBase/UserPostsService.svc/GetLinkInfo",
			defaultClosed: true,
			linkLabel: 'Attach link',
			buttonLabel: 'Attach'
		},
		ids: {
			textBox: 'linkTextBox',
			button: 'getLinkButton',
			container: 'attachLinkContainer',
			resultContainer: 'linkResultContainer'
		},
		methods: {
			show: function (opts) {
				var effect = "", opts = opts ? opts : {};
				if (!opts.effect) {
					effect = opts.effect;
				}
				$("#" + $.urlExtractor.ids.container).show(effect, opts.options, opts.duration, opts.callBack);
			},
			clearResult: function () {
				$("#" + $.urlExtractor.ids.textBox).val('');
				$("#" + $.urlExtractor.ids.resultContainer).html('');
			},
			getResult: function () {
				return $("#" + $.urlExtractor.ids.resultContainer).html();
			},
			hide: function (opts) {
				opts = opts ? opts : {};
				if (opts.clearBeforeHide === true) {
					$.urlExtractor.methods.clearResult();
					$("#" + $.urlExtractor.ids.textBox).val('');

				}
				var effect = "";
				if (!opts.effect) {
					effect = ""
				}
				$("#" + $.urlExtractor.ids.container).hide(effect, opts.options, opts.duration, opts.callBack);
			},
			validateUrl: function (url) {
				return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
			},
			addLoadingImg: function () {
				$("#" + $.urlExtractor.ids.resultContainer).empty().append("<img src='/_layouts/XPointCommunities/images/loading.gif' style='width:30%'/>").show();
			},
			prepareUrlData: function (result, urlLink) {
				if (result) {
					var resultContainer = $("#" + $.urlExtractor.ids.resultContainer)
                                 .empty();
					if (result.thumbNail) {
						var thumbNailDiv = $("<div />")
                             .css({ 'float': 'left', 'padding-right': '14px' })
                             .append("<img src='" + result.thumbNail + "' style='width:90px;height:60px'  />")
                             .appendTo(resultContainer);
					}
					var infoDiv = $("<div />")
                        .css({ 'float': 'left' })
                        .appendTo(resultContainer);
					var titleDiv = $("<div />")
                         .css({ 'float': 'left', 'width': '100%' })
                         .html("<strong>" + result.title + "</strong>")
                         .appendTo(infoDiv);

					var urlDiv = $("<div />")
                         .css({ 'float': 'left', 'width': '100%' })
                         .html("<a href='" + urlLink + "'>" + urlLink + "</a>")
                         .appendTo(infoDiv);

					var descDiv = $("<div />")
                         .css({ 'float': 'left', 'width': '100%' })
                         .html(result.description)
                         .appendTo(infoDiv);
					resultContainer.show();
				}
			},
			getLink: function (link, callBack) {
				$.urlExtractor.methods.addLoadingImg();
				var isValid = $.urlExtractor.methods.validateUrl(link);
				if (isValid === true) {
					var getObj = new Object();
					getObj.url = link;
					$.ajax({
						url: "/_vti_bin/XPointBase/UserPostsService.svc/GetLinkInfo",
						type: "POST",
						dataType: "json",
						contentType: "application/json; charset=utf-8",
						data: $.toJSON(getObj),
						success: function (data, textStatus, jqXHR) {
							if (data && data.GetLinkInfoResult) {
								var jsonObj = jQuery.parseJSON(data.GetLinkInfoResult);
								if (callBack != null && $.isFunction(callBack)) {
									callBack.call(jsonObj);
								} else {
									$.urlExtractor.methods.prepareUrlData(jsonObj, link);
								}
							}
						},
						error: function () {
						}
					});
				}
				else {
					alert('Enter valid url');
				}
			},
			init: function (p) {
				var elem = $(this);
				var div = $("<div id='" + $.urlExtractor.ids.container + "' />")
                   .css({ 'width': '100%', 'float': 'left' })
                   .appendTo(elem);
				/* 
				* check if it is configured to have the container hidden by default
				*/
				if (p.defaultClosed === true) {
					div.hide();
				}
				/*add textbox container*/
				var textAreaContainer = $("<div />")
                       .css({ 'float': 'left' })
                       .appendTo(div);
				var textArea = $("<input autocomplete='off' id='" + $.urlExtractor.ids.textBox + "'  />")
                       .css({ 'border': '1px solid #C6CFCE', 'width': '485px', 'height': '27px', '-moz-border-radius': '4px 4px 4px 4px' })
                       .appendTo(textAreaContainer);
				/********add button container********/
				var buttonContainer = $("<div />")
                              .css({ 'float': 'left', 'padding-left': '12px' })
                              .appendTo(div);
				var button = $("<input autocomplete='off' type='button'  id='" + $.urlExtractor.ids.button + "' style='font-size:10px' />")
                      .val(p.buttonLabel)
                      .button()
                      .appendTo(buttonContainer)
                      .click(function () {
                      	$.urlExtractor.methods.getLink(p.getUrl, $("#" + $.urlExtractor.ids.textBox).val());

                      });
				$("<div id='" + $.urlExtractor.ids.resultContainer + "'/>")
         .css({ 'width': '100%', 'float': 'left', 'display': 'none', 'padding-top': '6px', 'text-align': 'left' })
         .appendTo(div);
			}
		}
	};

	/*
	* a plugin to call url extractor related methods
	*/
	$.fn.urlExtractor = function (p) {
		if (!this || this.length === 0) return;
		if (("string" == typeof (p)) && $.urlExtractor.methods[p]) {
			var opts = $.extend(this.get(0).options, $.makeArray(arguments).slice(1)[0]);
			return $.urlExtractor.methods[p].apply(this, $.makeArray(opts));
		}
		return this.each(function () {
			this.options = $.extend($.urlExtractor.defaults, p);
			$.urlExtractor.methods.init.apply(this, $.makeArray(this.options));
		});

	}

})(jQuery);