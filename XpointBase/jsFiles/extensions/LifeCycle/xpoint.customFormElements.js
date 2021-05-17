(function () {
	$.fn.customFormElements = function (options) {
		/*
		* Return null if incoming selector null or undefined
		*/
		if (!this || this.length == 0) {
			return;
		}
		var elem = this;
		if (typeof (options) == "object") {
			var jElem = elem.get(0);
			var options = $.extend($.customFormElements.defaults, options);
			jElem.options = options;
			return $.customFormElements.methods.init.call(elem, options);
		}
		var fnCall = $.customFormElements.methods[options];
		if (fnCall && $.isFunction(fnCall)) {
			return fnCall.call(elem, arguments[1]);
		}
	};
	var options;
	$.customFormElements = {
		templates: [],
		addTemplate: function (name, config) {
			$.customFormElements.templates[name] = config;
		},
		/*
		*default values
		*/
		defaults: {
	},
	/*
	*  ids which is used in this plugin
	*/
	ids: {
		checkboxContainer: 'checkboxContainer',
		checkBoxID: 'checkBoxID'
	},
	/*
	* css classes used in this plugin
	*/
	classes: {
		itemHolder: 'xp-FloatLeft xp-Width xp-PaddingTopBottom-6',
		checkboxCSS: ''
	},
	/*
	* service paths used in this plugin
	*/
	paths: {
		updateField: '/_vti_bin/XPointBase/CustomFormElementsService.svc/UpdateCheckboxItem'
	},
	/*
	* methods used in this plugin
	*/
	methods: {
		/*Initializing elements*/
		init: function (options) {
			var elem = this;
			/*
			* Based on passed element below method parses, 
			* if you are adding custom elements, first you need to add template otherwise it will thow error  
			*/
			$.customFormElements.templates[options.element].createHtml.call(elem, options);
		},
		/*
		* Updates checkboxfield value in SharePoint list by making ajax call
		*/
		updateCheckboxField: function (listName, itemID, fieldname, value) {
			var dataObj = new Object();
			dataObj.value = value.toString();
			dataObj.listName = listName.toString();
			dataObj.itemId = itemID.toString();
			dataObj.fieldName = fieldname;
			var ajaxOpts = {
				url: $.customFormElements.paths.updateField,
				data: $.toJSON(dataObj),
				success: function (data) {
					var elem = this;
				},
				error: function (data) {
					var elem = this;
				}
			};
			$.xpoint.utils.ajaxCall(ajaxOpts);
		}
	}
};
/*Adding template for checkbox, Which will add checkboxes and required events*/
$.customFormElements.addTemplate("checkbox", {
	createHtml: function (options) {
		return this.each(function () {
			var elem = $(this);
			/*add checkboxes which is present in col */
			var container = $("<div />")
				                 .attr('id', $.customFormElements.ids.checkboxContainer);
			elem.html(container);
			var checkbox;
			var span;
			var itemHolder;
			/*Looping through all supplied columns */
			$.each(options.col, function (i, v) {
				var elem = this;
				var itemCSS = (options.checkboxCSS == "") ? $.customFormElements.classes.checkboxCSS : options.checkboxCSS;
				var containerCSS = (options.checkboxContainerCSS == "") ? $.customFormElements.classes.itemHolder : options.checkboxContainerCSS


				itemHolder = $("<div />")
					            .attr('class', containerCSS)
							        .appendTo(container);
				checkbox = $("<input />")
					           .attr('type', 'checkbox')
                     .attr('id', $.customFormElements.ids.checkBoxID)
										 .attr('text', v.name)
										 .attr('item', v.name)
										 .attr('itemid', options.itemId)
										 .attr('class', itemCSS)
										 .attr('listName', options.listName)
										 .attr('value', v.name)
                     .appendTo(itemHolder)
										 .attr('checked', v.value);

				if (options.Editable == "false") {
					checkbox.attr('disabled', 'disabled')
				}
				checkbox.click(function (event) {
					var elem = $(this);
					$.customFormElements.methods.updateCheckboxField(elem.attr('listName'), elem.attr('itemid'), elem.val(), elem.attr('checked'));
				});
				if (options.isSingle == "false") {
					span = $("<span>")
					        .attr('text', 'checkbox')
									.attr('value', 'checkbox')
									.html(v.header)
									.attr('id', 'checkbox' + i)
									.appendTo(itemHolder);
				}
			});

		});
	}
});

})(jQuery);