(function ($) {
	/*
	* define methods and defaults for the lcviews plugin
	*/
	$.lcViews = {
		/*
		*  ids for various elements in the plugin
		*/
		ids:
        {
        	viewName: 'viewName',
        	lcFiltersName: 'lcFilterCheckBox',
        	filterBase: 'filterBase',
        	selectBox: 'selectColumnBox',
        	saveBtn: 'saveBtn',
        	deleteBtn: 'deleteBtn',
        	errorDiv: 'errorDiv',
        	confirmDialog: 'configDialog'
        },
		/*
		operands for filters to be used in the plugin      
		*/
		operands: [],
		/* defines all the methods to be used in lcVIews plugin */
		methods: {
			getUrl: function (appendString, redirect) {
				var url = location.href;
				var url_parts = url.split('?');
				var main_url = url_parts[0];
				if (appendString && $.trim(appendString).length > 0) {
					main_url += appendString;
				}
				if (redirect === true) {
					window.location = main_url;
					return false;
				}
				return main_url;
			},
			/*
			* method is used for intersection of two arrays and returns the resulted array
			*/
			interSection: function (arrA, arrB) {
				/*
				* Nothing big here.. for each internal name in array A check if Array B has any entry
				* with that internal name, if yes return true and all those enteries which returned true
				* as pushed to result array
				*/
				var filteredArr = $(arrA).filter(function (n) {
					var iName = arrA[n].iName;
					var filtered = $(arrB).filter(function (m) {
						return arrB[m].iName == iName;
					});
					return (filtered.length > 0);
				});
				return filteredArr;
			},
			/*
			* generic ajax call method, specified ajaxOpts to override any method/property of the ajax call
			*/
			ajaxCall: function (ajaxOpts) {
				$.lcViews.methods.hideError();
				$.ajax($.extend({
					contentType: "application/json; charset=utf-8",
					type: "post",
					dataType: "json"
				}, ajaxOpts)
        );
			},
			/*
			* this is where the plugin actually starts. Html is created and plugins are assigned.
			* this will mostly be used only for the first time but its written to support further calls too
			*/
			init: function (options) {
				var container = $(this);
				/*make sure container is empty*/
				container.empty();
				var header = $("<div  />").appendTo(container);
				if (options.events.onHeaderCreation && $.isFunction(options.events.onHeaderCreation)) {
					options.events.onHeaderCreation.apply(header, $.makeArray(options));
				}
				var viewContainer = $("<div />").append("<div id='" + $.lcViews.ids.errorDiv + "' class='xp-DisplayNone'/>");
				container.xpointbox({
					headerContainer: header,
					contentContainer: viewContainer,
					containerStyle: 'xp-FloatLeft ui-widget-content ',
					contentStyle: "xp-MainContent  viewContent ui-corner-all xp-OuterPanel xp-Overflowhidden",
					headerStyle: ' xp-Padding-4 xp-DivHeader viewHeader '
				});

				/*
				*  now add various views related control on the page
				*/
				/*********************************Creating View Name row****************************/
				var viewDiv = $("<div  class='xp-Width xp-FloatLeft xp-Padding-10 ' />")
                               .append("<div  class='xp-FontBold xp-FloatLeft xp-Width12 Tip-MFViewName'>View Name<span class='xp-ErrorMessage'>*</span> </div>")
                               .append("<div  class='xp-FloatLeft xp-Width55'><input id='" + $.lcViews.ids.viewName + "' value=\"" + options.viewConfig.dName + "\" class='xp-TxtBox xp-FontNormal xp-Padding-4 xp-Width30'></div>")
                               .appendTo(viewContainer);

				/*restrict the character limit to 200.*/
				$('#' + $.lcViews.ids.viewName).keypress(function (e) {
					if (e.which < 0x20) {
						return;
					}
					if (this.value.length == "20") {
						e.preventDefault();
					}
				});
				/*
				* check if the delete button is required then add the delete view button
				*/
				if (options.deleteEnable === true) {
					var deleteDiv = $("<div  style='' />")
            .appendTo(viewDiv);
					var deleteBtn = $("<input type='button' value='Delete view' class='ui-primarytabclr xp-HoverCursor ui-corner-all' />")
          .appendTo(deleteDiv)
          .click(function () {
          	$.lcViews.methods.deleteView(options);
          });
				}
				/****************************start of creating lifecycles as checkbox options *************/
				var lcFilterDiv = $("<div  class='xp-Width xp-FloatLeft xp-Padding-10' />")
                                .append("<div style='height:30px;' class='xp-FloatLeft xp-FontBold Tip-MFSelectLCs'>Select Lifecycles </div>")
                                .appendTo(viewContainer);
				var filterLC = $("<div class='xp-FloatLeft xp-Width98'>")
                               .appendTo(lcFilterDiv);
				/* 
				*  traverse through all the lifecycle names and render them as checkbox 
				* also check if the viewConfig is configured with any lc filters. THe ones configured will rendered 
				* as seletected
				*/
				$.each(options.lcData, function (i) {
					var lc = options.lcData[i], checked = false;
					if (lc) {
						var checkDiv = $("<div class='xp-FloatLeft xp-CustomForm' style='width:32.5%;margin:10px 0px 15px 0px;white-space:nowrap;'/>")
                                        .appendTo(filterLC);
						var checkBox = $("<input type='checkbox'  name=\"" + $.lcViews.ids.lcFiltersName + "\" value=\"" + lc.iName + "\" style='padding-left:0px;' id='" + lc.dName + "' ></input><label for='" + lc.dName + "'>" + lc.dName + "</label>")
                                       .appendTo(checkDiv)
                                       .click(function () {
                                       	/*
                                       	* on clicking checkbox reset the filters & columns list
                                       	* and update the columns list as per selected checkboxes in lc filters
                                       	*/
                                       	$.lcViews.methods.resetSelectedList(options);
                                       	$.lcViews.methods.prepareViewColumns(options);
                                       });
						if (options.viewConfig.lcFilter.length > 0) {
							checked = ($.inArray(lc.iName, options.viewConfig.lcFilter) > -1);
						}
						if (checked === true)
							checkBox.attr('checked', 'checked');
					}
				});
				/****************prepare the views container and apply view columns plugin***********************/
				var viewColumnsMainDiv = $("<div class = 'xp-Width48 xp-Padding-4 xp-FloatLeft'/>")
                                        .append("<div  style='height:30px;' class='xp-Width30 xp-FloatLeft xp-FontBold Tip-MFTableColumns'>Table Columns<span class='xp-ErrorMessage'>*</span></div>")
                                        .appendTo(viewContainer);
				var viewColumnsDiv = $("<div class='xp-Width80 xp-Padding-2 xp-FontBold xp-FloatLeft' />")
                                    .appendTo(viewColumnsMainDiv);
				var viewColumnsSelect = $("<select id='" + $.lcViews.ids.selectBox + "' multiple='multiple'  style='width:460px;height:200px' />")
                                        .append("<option></option>")
                                        .appendTo(viewColumnsDiv);
				/*
				* check which lifecycle are checked in checkboxes list and prepare the columns
				*  we do want to process the  columns specified in view config and hence second parameter of
				* the method is set to true. Setting the parameter to true will lead to process the columns 
				* specified in viewconfig  and the order in which they are specified
				*/
				$.lcViews.methods.prepareViewColumns(options, true);
				/*********create the filter container and apply the filter columns plugin*******************/
				var viewFiltersMainDiv = $("<div  class='xp-FloatRight xp-PstSectionProfilePadding xp-Width50'/>")
                                        .append("<div  style='height:30px;' class='xp-Width30 xp-FontBold xp-FloatLeft Tip-MFFilters'>Filters</div>")
                                        .appendTo(viewContainer);
				var viewColumnsDiv = $("<div  class='xp-FontLite xp-FloatLeft' style='width:98%' id='" + $.lcViews.ids.filterBase + "' />")
                                    .appendTo(viewFiltersMainDiv);
				$.lcViews.methods.prepareFilterColumns();
				$.lcViews.methods.addFiltersFromConfig(options.viewConfig);
				/******************start with buttons container ************************/
				var btnsDiv = $("<div class='xp-Width xp-FloatLeft' style='padding:10px 0px;' />")
                         .appendTo(viewContainer);
				var div = $("<div style = 'width:130px;margin:auto;'/>").appendTo(btnsDiv);
				var savebtndiv = $("<div  class='xp-FloatLeft Tip-MFSaveBtnDiv'/>")
                     .appendTo(div);
				var submitButton = $("<input type='button'  value='Save' class='ui-primarytabclr xp-HoverCursor ui-corner-all'/>")
                              .appendTo(savebtndiv)
                              .click(function () {
                              	$.lcViews.methods.saveView(options);
                              });
				var cancelbtndiv = $("<div  class='xp-FloatRight' />")
                     .appendTo(div);
				var cancelButton = $("<input type='button'  value='Cancel' class='ui-secondarytabclr xp-HoverCursor ui-corner-all'/>")
                              .appendTo(cancelbtndiv)
                              .click(function () {
                              	/*need to traverse to existing view*/
                              	var qStr = "";
                              	if (options.viewConfig.id != -1) {
                              		qStr = "?ViewId=" + options.viewConfig.id;
                              	}
                              	$.lcViews.methods.getUrl(qStr, true);
                              });
			},
			/*
			* apply the select plugin on columns filter select box 
			* in case viewsconfig is specified then columns specified in the view config 
			* first so that ordering is as per in views config
			*/
			applySelectPlugin: function (options, viewsConfig) {
				var arr = new Array();
				var elem = $("#" + $.lcViews.ids.selectBox)
                            .multiselect('destroy')
                            .find('option')
                            .remove()
                            .end();
				if (options) {
					/*
					* check if the views config is having existing columns, they need to be added/selected in the order
					* they are specified in the viewsconfig
					*/
					if (viewsConfig) {
						$(viewsConfig.columns).each(function (l) {
							var column = this;
							if (column) {
								var formatter = column.formatter ? column.formatter : "text";
								elem.append("<option value=\"" + column.iName + "\" formatter='" + formatter + "' selected=selected>" + column.dName + "</option>");
								arr[column.iName] = column.dName;
							}
						});
					}
					$(options).each(function () {
						var opt = this;
						if (opt && arr[opt.iName] == null) {
							var formatter = opt.formatter ? opt.formatter : "text";
							elem.append("<option value=\"" + opt.iName + "\" formatter='" + formatter + "'>" + opt.dName + "</option>");
						}
					});
				}
				elem.multiselect();
			},
			/*
			* use this method to show error message
			*/
			showError: function (message) {
				$("#" + $.lcViews.ids.errorDiv)
        .html(message)
        .addClass($.lcViews.errorDivCss)
        .show().fadeOut(10000);
			},
			/*
			* use this method to hide error message
			*/
			hideError: function () {
				$("#" + $.lcViews.ids.errorDiv).removeClass($.lcViews.errorDivCss).hide();
			},
			/*
			* generic method to call a confirm dialog and what to do on confirm
			*/
			confirmDialog: function (html, onConfirm) {
				var confirmDgl = $("#" + $.lcViews.ids.confirmDialog);
				if (confirmDgl.length > 0) {
					confirmDgl.remove();
				}
				confirmDgl = $("<div id='" + confirmDgl + "' />").hide().append(html).appendTo('body');
				confirmDgl.dialog({
					resizable: false,
					height: 140,
					modal: true,
					buttons: {
						"Confirm": function () {
							var confirmed = true;
							if (onConfirm && $.isFunction(onConfirm)) {
								confirmed = onConfirm.call();
							}
							if (confirmed === true) {
								$(this).dialog("close");
							}
						},
						Cancel: function () {
							$(this).dialog("close");
						}
					}
				});
			},
			/*
			* method will show the confirmation dialog first to the user. if the user confirms then 
			* deletes the view
			*/
			deleteView: function (options) {
				var viewId = options.viewConfig.id;
				options.deleteOptions.deleteData = { 'viewId': viewId.toString() };
				var html = "Are you sure you want to delete current view";
				$.lcViews.methods.confirmDialog(html, function () {
					$.lcViews.methods.ajaxCall({
						url: options.deleteOptions.url,
						data: $.toJSON(options.deleteOptions.deleteData),
						error: function (xhr, ajaxOptions, thrownError) {
							$.lcViews.methods.showError("Not able to delete the view. Please try again later!");
						},
						success: function (datap, st) {
							var data = datap.d;
							if (data.success === true) {
								$.lcViews.methods.getUrl(null, true);
							}
							else {
								$.lcViews.methods.showError("Not able to delete the view. Please try again later!");
							}
						}
					});
					return true;
				});
			},
			/*
			* validate if the view name is specified or not
			*/
			validateViewData: function () {
				var errorHtml = "";
				var elem = $("#" + $.lcViews.ids.viewName);
				var trimmedViewName = $.trim(elem.val());
				if (trimmedViewName.length == 0) {
					errorHtml += "<div> Please enter view Name </div>";
				}
				else {
					trimmedViewName = trimmedViewName.replace(" ", "");
					var regexpr = /[^a-zA-Z0-9 ]/g;
					if (regexpr.test(trimmedViewName) === true) {
						errorHtml += "<div> Please enter valid view Name - Special characters like('!@#$%^&*()_><,.{}[]|\~?/) not allowed.</div>";
					}
				}
				var lcs = $("input[name *='" + $.lcViews.ids.lcFiltersName + "']").filter(function () {
					var checked = $(this).attr("checked");
					return (checked == "checked" || checked == true);
				});
				if (lcs == 0) {
					errorHtml += "<div> Please select lifecycles needed in the view </div>";
				}
				var columnsVal = $("#" + $.lcViews.ids.selectBox).val();
				if (columnsVal == null) {
					errorHtml += "<div> Please select columns needed in the view </div>";
				}
				return errorHtml;
			},
			/*
			* save the view . it validates the data in form first. If no error then proceeds to make 
			* an ajax call to save the view incase the view is in creation mode and not modification
			*  viewObj.viewId  will be equal to -1
			*/
			saveView: function (options) {
				var error = $.lcViews.methods.validateViewData();
				if ($.trim(error).length > 0) {
					$.lcViews.methods.showError(error);
					return false;
				}
				viewObj = new Object();
				viewObj.viewId = options.viewConfig.id.toString();
				viewObj.viewName = $("#" + $.lcViews.ids.viewName).val();
				viewObj.lifecycles = new Array();
				var lcs = $("input[name *='" + $.lcViews.ids.lcFiltersName + "']").filter(function () {
					var checked = $(this).attr("checked");
					return (checked == "checked" || checked == true);
				});
				$(lcs).each(function () {
					var lc = $(this);
					if (lc && lc.length > 0) {
						viewObj.lifecycles.push(lc.val());
					}
				});
				viewObj.columns = new Array();
				var columnsVal = $("#" + $.lcViews.ids.selectBox).val();
				$(columnsVal).each(function () {
					var clm = this;
					if (clm) {
						viewObj.columns.push(clm.toString());
					}
				});
				viewObj.filters = new Array();
				var filters = $("#" + $.lcViews.ids.filterBase).dynamicContent("value");
				for (filtKey in filters) {
					if (filtKey && filters[filtKey]) {
						var filter = new Array();
						var subArr = filters[filtKey];
						$(subArr).each(function (k) {
							filter.push(subArr[k]);
						});
						if (filter != null) {
							viewObj.filters.push(filter);
						}
					}
				}
				var vdata = {
					'data': viewObj
				};
				$.lcViews.methods.ajaxCall({
					url: options.saveOptions.url,
					data: $.toJSON(vdata),
					complete: function (datap, st) {
						var jSONData = jQuery.parseJSON(datap.responseText);
						if (jSONData && jSONData.d) {
							var data = jSONData.d;
							if (data.success === true) {
								var viewStr = "?ViewId=";
								viewStr += data.message;
								$.lcViews.methods.getUrl(viewStr, true);
							}
							else {
								$.lcViews.methods.showError(data.message);
							}
						}
						else {
							$.lcViews.methods.showError("Failure! Please try later.");
						}
					}
				});
			},
			/*
			* this method prepares the views columns based on selected lifecycles checkboxes
			*/
			prepareViewColumns: function (options, needViewConfig) {
				var lcs = $("input[name *='" + $.lcViews.ids.lcFiltersName + "']").filter(function () {
					var checked = $(this).attr("checked");
					return (checked == "checked" || checked == true);
				});
				var lcsToProcess = new Array();
				$(lcs).each(function () {
					var val = $(this).val();
					$(options.lcData).each(function () {
						var lcD = this;
						if (lcD.iName == val) {
							lcsToProcess.push(lcD);
							return false;
						}
					});
				});
				var resultsArray = new Array();
				$(lcsToProcess).each(function (k) {
					var lcToPr = this;
					if (k == 0) {
						resultsArray = lcToPr.columns;
					}
					else {
						resultsArray = $.lcViews.methods.interSection(resultsArray, lcToPr.columns);
					}
				});
				var viewConfig = needViewConfig === true ? options.viewConfig : null;
				$.lcViews.methods.applySelectPlugin(resultsArray, viewConfig);
				$.lcViews.methods.updataFilterColumns();
			},
			/*
			* this method will be used mostly first time. Will traverse through the viewConfig filters list
			* and add rows dynamically and update the controls in the newly created row
			*/
			addFiltersFromConfig: function (viewConfig) {
				$(viewConfig.filters).each(function () {
					var filter = this;
					if (filter) {
						var clm = filter.column;
						var op = filter.operand;
						var txt = filter.val;
						var isDate = filter.isDate;
						var tmpId;
						$("#" + $.lcViews.ids.filterBase).dynamicContent("addRow", null, {
							beforeAdded: function (elem, cell) {
								switch (cell) {
									case 0:
										elem.find("option[value='" + clm + "']").attr('selected', 'selected');
										break;
									case 1:
										var selectElem = $("#" + tmpId);
										$.lcViews.methods.updateFilterTemplate.apply(selectElem, [false, elem]);
										elem.find("option[value='" + op + "']").attr('selected', 'selected');
										break;
									case 2:
										if (isDate === true) {
											elem.datepicker({ dateFormat: 'M dd, yy', changeMonth: true, changeYear: true });
										}
										elem.val(txt);
										break;
								}
							},
							afterAdded: function (elem, cell) {
								if (cell === 0) {
									tmpId = elem.attr('id');
								}
							}
						});
					}
				});
			},
			updateFilterTemplate: function (refreshInptBox, oprdSelect) {
				var select = this;
				var option = $("option:selected", select);
				var numOpts = ['Eq', 'Neq', 'Gt', 'Geq', 'Lt', 'Leq'];
				var dateOpts = ['Eq', 'Neq', 'Gt', 'Geq', 'Lt', 'Leq'];
				var textOpts = ['Eq', 'Neq', 'BeginsWith', 'Contains'];
				var formatter = option.attr('formatter') ? option.attr('formatter') : 'text';
				var selectId = select.attr('id'), inptBox = null;
				if (!oprdSelect) {
					var oprdSelectId = selectId.replace("inputelem_0", "inputelem_1");
					oprdSelect = $("#" + oprdSelectId);
				}
				if (refreshInptBox === true) {
					var inptBoxId = selectId.replace("inputelem_0", "inputelem_2");
					inptBox = $("#" + inptBoxId);
					inptBox
        .datepicker("destroy")
        .val('');
				}
				oprdSelect
        .html("")
				switch (formatter) {
					case 'number':
						$(numOpts).each(function () {
							var numOpt = this;
							if (numOpt) {
								var opts = $($.lcViews.operands).filter(function () {
									return this.iName == numOpt;
								});
								$(opts).each(function () {
									var opt = this;
									if (opt) {
										oprdSelect.append($('<option></option>').val(opt.iName).html(opt.dName));
									}
								});
							}
						});
						break;
					case 'date':
						$(dateOpts).each(function () {
							var dateOpt = this;
							if (dateOpt) {
								var opts = $($.lcViews.operands).filter(function () {
									return this.iName == dateOpt;
								});
								$(opts).each(function () {
									var opt = this;
									if (opt) {
										oprdSelect.append($('<option></option>').val(opt.iName).html(opt.dName));
									}
								});
							}
						});
						if (inptBox) {
							inptBox.datepicker({ dateFormat: 'M dd, yy' });
						}
						break;
					case 'text':
					default:
						$(textOpts).each(function () {
							var textOpt = this;
							if (textOpt) {
								var opts = $($.lcViews.operands).filter(function () {
									return this.iName == textOpt;
								});
								$(opts).each(function () {
									var opt = this;
									if (opt) {
										oprdSelect.append($('<option></option>').val(opt.iName).html(opt.dName));
									}
								});
							}
						});
						break;
				}
			},
			/* 
			* prepares the filter template. We need three dynamic controls in a row 
			* 1. Columns 
			* 2. Operand
			* 3. Value as filter for the column
			*/
			prepareFilterTemplate: function () {
				var tmp = new Array();
				var columnsList = $("#" + $.lcViews.ids.selectBox).html();
				var operandsList = "";
				var containerElem = "<input style='height:18px' class = 'xp-Width-94 xp-TxtBox '/>";
				var selectColumn = $("<select class = 'xp-Width-94' />")
                            .html(columnsList)
                            .change(function () {
                            	var elem = $(this);
                            	$.lcViews.methods.updateFilterTemplate.apply(elem, [true]);
                            });
				tmp.push(
          {
          	headerText: 'Select Column',
          	element: selectColumn
          });
				tmp.push({
					headerText: 'Select operation',
					element: "<select class = 'xp-Width-94'></select>"
				});
				tmp.push({
					headerText: 'Value',
					element: containerElem
				}
          );
				return tmp;
			},
			/*
			* gets the prepared template and apply the dynamic content plugin
			*/
			prepareFilterColumns: function () {
				var tmp = $.lcViews.methods.prepareFilterTemplate();
				$("#" + $.lcViews.ids.filterBase).dynamicContent({
					template: tmp,
					actions: [
             {
             	iconCSS: 'ui-icon-circle-close',
             	onClick: function (opts) {
             		var row = $(this);
             		$("#" + $.lcViews.ids.filterBase).dynamicContent("deleteRow", row);
             	}

             }
            ],
					afLinkClk: function (row) {
						if (row) {
							$("select:first", row).trigger("change");
						}
					}
				});
			},
			updataFilterColumns: function (options) {
				var tmp = $.lcViews.methods.prepareFilterTemplate();
				$("#" + $.lcViews.ids.filterBase).dynamicContent("updateOptions", { template: tmp });
			},
			resetData: function (options) {
				var arr = $.lcViews.methods.prepareViewColumns(options);
				$.lcViews.methods.resetSelectedList();
			},
			resetSelectedList: function () {
				$("#" + $.lcViews.ids.filterBase).dynamicContent("resetData", true);
			}
		},
		errorDivCss: 'xp-ErrorMsg',
		defaults: {
			viewConfig: {
				id: -1,
				dName: '',
				lcFilter: [],
				columns: [],
				filters: []
			},
			headerText: 'Create New View',
			deleteEnable: false,
			deleteOptions: {
				url: ''
			},
			enableSave: false,
			saveOptions: {
				url: ''
			},
			lcData: [],
			events: {
				onHeaderCreation: function (options) {
					var header = $(this);
					if (options.viewConfig.id > 0) {
						options.headerText = "Modify " + options.viewConfig.dName;
					}
					header.append(options.headerText);
				}
			}
		}
	};
	/*
	* LCViews plugin is used to create the views 
	*/
	$.fn.lcViews = function (p, operands) {
		// Method calling logic
		if (!this || this.length === 0) return;
		if (("string" == typeof (p)) && $.lcViews.methods[p]) {
			var opts = $.extend(this.get(0).options, $.makeArray(arguments).slice(1)[0]);
			return $.lcViews.methods[p].apply(this, $.makeArray(opts));
		}
		var opts = $.extend($.lcViews.defaults, p);
		$.lcViews.operands = operands;
		return this.each(function () {
			this.options = opts;
			/*
			* call init which will create html 
			*/
			$.lcViews.methods.init.apply(this, $.makeArray(opts));
		});

	};

})($);