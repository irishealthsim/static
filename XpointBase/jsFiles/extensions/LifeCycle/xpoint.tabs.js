; (function ($) {
	//This plugin will create tabs for analysis page
	$.fn.xpointTabs = function (options) {
		var defaults = {
			model: []
		};

		var opts = $.extend(defaults, options);
		function builddata() {
			var source = [];
			var items = [];
			data = opts.model;
			// build hierarchical source.
			for (i = 0; i < data.length; i++) {
				var item = data[i];
				var label = item["title"];
				var parentid = item["parentId"];
				var id = item["tabId"];
				var url = item["url"];
				var design = item["design"];

				if (items[parentid]) {
					var item = { parentid: parentid, label: label, item: item, url: url, design: design };
					if (!items[parentid].items) {
						items[parentid].items = [];
					}
					items[parentid].items[items[parentid].items.length] = item;
					items[id] = item;
				}
				else {
					items[id] = { parentid: parentid, label: label, item: item, url: url, design: design };
					source[id] = items[id];
				}
			}
			return source;
		}
		function buildUL(parent, items) {
			$.each(items, function () {
				if (this.label) {
					// create LI element and append it to the parent element.
					var li = $("<li><a href='" + this.url + "'>" + this.label + "</a></li>");
					if (this.design != '') {
						li.addClass('selected');
					}
					li.appendTo(parent);
					// if there are sub items, call the buildUL function.
					if (this.items && this.items.length > 0) {
						var ul = $("<ul></ul>");
						ul.appendTo(li);
						buildUL(ul, this.items);
					}
				}
			});
		}

		return this.each(function () {
			var elem = $(this);
			opts.baseid += elem.attr('id');
			var source = builddata();
			var div = $("<div id='jqxMenu'></div>");
			var ul = $("<ul id='amenu-list'></ul>");
			ul.appendTo(div);
			buildUL(ul, source);
			elem.append(div);
			//createHtml(elem);
			$('#amenu-list').amenu({
				'speed': 200, // animation speed
				'animation': 'show' // animation type: <span style="background-color: rgb(255, 255, 255); line-height: normal;">show, fade, slide, wind, none</span>
			});
		});
		//});
	}
})(jQuery);
