(function ($) {
	$.documentLinksDialog = $.documentLinksDialog || {};
	$.fn.documentLinksDialog = function (options) {
		this.options = $.extend($.documentLinksDialog.defaults, options);
		$.documentLinksDialog.methods.init.apply(this, $.makeArray(this.options));
	};
	/*
	*Providing NameSpace for documentLinksDialog Action
	*/
	$.documentLinksDialog = {
		defaults: {
			formId: ''
		},
		/*
		*Array to declare various Paths
		*/
		paths: {
			getRootFolderContents: '/_layouts/IImpact.Web/LifeCycleService.asmx/GetRootFolderContents',
			getFolderContents: '/_layouts/IImpact.Web/LifeCycleService.asmx/GetFolderContents'
		},
		/*
		*Array to declare Ids
		*/
		ids: {
			linkDialog: 'documentLinkDialogId',
			buttonAttach: 'buttonAttachId',
			buttonCancel: 'buttonCancelId'
		},
		/*
		*Array to declare custom classes
		*/
		classes: {
			highlight: 'xp-Customhighlight',
			lcFolder: 'xp-LCDocFolder',
			lcFile: 'xp-LCDocFile',
			linkRoot: 'xp-LinkRoot',
			customTitle: 'xp-CustomTitle'
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
				$.documentLinksDialog.methods.createHtml.apply(elem, $.makeArray(options));
			},
			/*
			* Creates Layout
			*/
			createHtml: function (options) {
				var elem = $(this);
				/*
				* Get the reference of the Add/Edit form element and save the current z-index
				*/
				var formElem = $("#" + options.formId);
				var formIndex = formElem.css("z-index");
				elem.hide();
				var containerDiv = $("<div />");
				var docLink = $("<div class='xp-FloatLeft xp-Width50 xp-Height-15' style='border: 1px solid #b9b9b9; padding:2px; overflow:auto;' />");
				docLink.html(elem.val());
				var button = $("<div class='xp-FloatLeft xp-Width12 xp-BoxShadow xp-HoverCursor xp-MarginLeft-12'><span class='xp-Icon xp-IconAttachPin xp-DisplayBlock xp-FloatLeft'></span><a class='xp-FloatLeft' style='padding:2px 4px'>Link</a></div>");
				var removeButton = $("<div class='xp-FloatLeft xp-Width12 xp-BoxShadow xp-HoverCursor xp-MarginLeft-12'><a class='xp-FloatLeft' style='padding:2px 4px'>Remove</a></div>");
				/*add the link and button elements*/
				containerDiv.append(docLink).append(button).append(removeButton);
				elem.after(containerDiv);
				/*
				* Click of 'Remove' button
				*/
				removeButton.click(function () {
					docLink.html('');
					elem.val('');
				});
				/*
				* Click of 'Link' button
				*/
				button.click(function () {
					var linkDialog = $("<div id='" + $.documentLinksDialog.ids.linkDialog + "' title=''/>");
					linkDialog.dialog("close");
					/*Get Lifecycle Folders and show the pop-up*/
					$.ajax({
						url: $.documentLinksDialog.paths.getRootFolderContents, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{}",
						success: function (datap, st) {
							var data = datap.d;
							var mainDiv = $("<div />");
							var html = "";
							html += "<div class='xp-FloatLeft xp-Width'>";
							$.each(data, function (i) {
								html += this;
							});
							html += "</div>";
							mainDiv.append(html);
							linkDialog.append(mainDiv);
							containerDiv.append(linkDialog);
							linkDialog.css("z-index", "999999");
							/*
							* Click of folder
							*/
							$("div." + $.documentLinksDialog.classes.lcFolder + " a").live("click", function (e) {
								e.preventDefault();
								var name = $(this).html();
								var nodeId = $(this).data().nodeid;
								/*Get files within folders*/
								$.ajax({
									url: $.documentLinksDialog.paths.getFolderContents, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{nodeId:" + nodeId + "}",
									success: function (datap, st) {
										var data = datap.d;
										html = "";
										html += "<div class='xp-FloatLeft xp-Width'>";
										$.each(data, function (i) {
											html += this;
										});
										html += "</div>";
										mainDiv.html(html);
										var customTitle = $("<div class='xp-FontBold'><a class='" + $.documentLinksDialog.classes.linkRoot + "' href='#'><u>Root</u></a><span> \>\> " + name + " </span></div>");
										$("." + $.documentLinksDialog.classes.customTitle).html(customTitle);
										/*
										* Click of the 'Root' link of the title to go back to the folder's dialog
										*/
										$("a." + $.documentLinksDialog.classes.linkRoot).click(function (e) {
											e.preventDefault();
											linkDialog.dialog("close");
											button.trigger("click");
										});
									}
								});
							}); // end folder click
							linkDialog.dialog({
								autoOpen: false,
								width: 400,
								height: 200,
								modal: true,
								position: {
									my: 'center',
									at: 'center',
									of: formElem
								},
								open: function (event, ui) {
									var parentElem = $(this).parent();
									formElem.css("z-index", "1");
									/*
									*Remove the default title
									*/
									parentElem.find(".ui-dialog-titlebar").removeClass("ui-widget-header").addClass("xp-BorderBottom");
									/*
									*Add custom title to the title bar
									*/
									var customTitle = $("<div class='" + $.documentLinksDialog.classes.customTitle + " xp-FontBold xp-FloatLeft'>Root</div>");
									parentElem.find(".ui-dialog-title").append(customTitle);
									/*
									*Disable the 'Attach' button
									*/
									$("#" + $.documentLinksDialog.ids.buttonAttach).attr("disabled", true);
									$("#" + $.documentLinksDialog.ids.buttonAttach).addClass("ui-state-disabled");
								},
								beforeclose: function (event, ui) {
									formElem.css("z-index", formIndex);
								},
								close: function (event, ui) {
									$("div.ui-dialog").remove();
									$(this).dialog("destroy").dialog("widget").remove();
								},
								buttons: [
									{
										/*
										*'Attach' button
										*/
										text: "Attach",
										id: $.documentLinksDialog.ids.buttonAttach,
										class: 'xpThemeButton',
										click: function () {
											/*Get the file selected to link*/
											var selectedFile = $("div." + $.documentLinksDialog.classes.highlight + " a");
											var fileName = $(selectedFile).data().docname;
											var href = elem.val();
											/*
												Sanity check
												*/
											if (elem.val() == "") {
												href = "<a data-docname='" + fileName + "' href='" + selectedFile.attr('href') + "'>" + fileName + "</a>";
											}
											else {
												var valArr = elem.val().split(',');
												var fileArray = [];
												$.each(valArr, function (i, value) {
													fileArray.push($(value).data().docname);
												});
												/*
												Check for duplicate files
												*/
												if ($.inArray(fileName, fileArray) == -1) {
													href = href + "," + "<a data-docname='" + fileName + "' href='" + selectedFile.attr('href') + "'>" + fileName + "</a>";
												}
											}
											docLink.html(href);
											elem.val(href);
											$(this).dialog("close");
										}
									},
									{
										/*
										*'Cancel' button
										*/
									    text: "Cancel",
                                        class:'cancelButton',
										id: $.documentLinksDialog.ids.buttonCancel,
										click: function () {
											$(this).dialog("close");
										}
									}
								]
							}); /*close linkDialog*/
							linkDialog.dialog("open");
						} /*close success*/
					}); /*close ajax*/
					/*
					*Click on the file to select
					*/
					$("." + $.documentLinksDialog.classes.lcFile).live("click", function (e) {
						e.preventDefault();
						/*
						*Highlight the recently selected file
						*/
						$("." + $.documentLinksDialog.classes.lcFile).removeClass($.documentLinksDialog.classes.highlight);
						$(this).addClass($.documentLinksDialog.classes.highlight);
						/*
						*Enable the 'Attach' button
						*/
						$("#" + $.documentLinksDialog.ids.buttonAttach).attr("disabled", false);
						$("#" + $.documentLinksDialog.ids.buttonAttach).removeClass("ui-state-disabled");
					}); //end of file click

				});

			} //end of CreateHtml            
		}//end of method array
	}//end of namespace
})(jQuery);