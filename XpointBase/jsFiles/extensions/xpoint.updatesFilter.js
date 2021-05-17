var updateIds = {
	filterMainContainer: 'filterMainContainer',
	filterContainer: 'filterContainer',
	filterMainDiv: 'filterMainDiv',
	filterHeading: 'filterHeading',
	filterDropdown: 'filterDropdown',
	updatesIcon: 'updatesIcon',
	updatesText: 'updatesText',
	updatesTextHref: 'updatesTextHref',
	dropdownDiv: 'dropdownDiv'
};
var updateCSS = {
    filterContainer: 'xp-Width xp-BorderBottomBlack', //'xp-FloatLeft xp-Width xp-BorderBottomBlack',
    filterMainDiv: 'xp-Width99 xp-Padding-4', //'xp-FloatLeft xp-Width99 xp-Padding-4',
	filterHeading: 'xp-FloatLeft xp-Padding-4',
	//updatesIcon: 'xp-FloatLeft xp-PaddingRight-5 xp-homepage-icon xp-homeUpdates',
	updatesText: 'xp-FloatLeft xp-PaddingRight-5',
	updatesTextHref: 'xp-LinkLabel xp-FontBold Tip-HPUpdates',
	dropdownDiv: 'xp-FloatLeft xp-Padding-4 Tip-HPUpdatesDDM'
};
var updatesFilterMethods =
{
	/*Adds filter bar to the updates section*/
	addFilterArea: function (options) {
		var elem = this;
		var filterContainer = $("<div />").attr('id', updateIds.filterContainer)
						                     .attr('class', updateCSS.filterContainer)
                                             .attr('style', 'display: inline-block;vertical-align: top;')
											 .appendTo(elem);
		var filterMainDiv = $("<div />")
						                    .attr('id', updateIds.filterMainDiv)
																.attr('class', updateCSS.filterMainDiv)
                                                                .attr('style', 'display: inline-block;vertical-align: top;')
																.appendTo(filterContainer);
		var filterHeading = $("<div />")
						                     .attr('id', updateIds.filterHeading)
																 .attr('class', updateCSS.filterHeading)
																 .appendTo(filterMainDiv);
//		var updatesIcon = $("<div />")
//						                      .attr('id', updateIds.updatesIcon)
//																	.attr('class', updateCSS.updatesIcon)
//																	.appendTo(filterHeading);
		var updatesText = $("<div />")
						                       .attr('id', updateIds.updatesText)
																	 .attr('class', updateCSS.updatesText)
																	 .appendTo(filterHeading);
		var updatedTextHref = $("<a> Updates</a>")
						                        .attr('href', '#')
						                        .attr('id', updateIds.updatesTextHref)
																		.attr('class', updateCSS.updatesTextHref)
                                    .attr('style', 'color: #52606e !important')
																		.appendTo(updatesText);
		var dropdownDiv = $("<div />")
						                        .attr('id', updateIds.dropdownDiv)
																		.attr('class', updateCSS.dropdownDiv)
																		.appendTo(filterMainDiv);
		updatesFilterMethods.addDropdownOptions.call($("#" + updateIds.messageContainer), options);
		return elem;
	},
	/*
	* Adds drop down values to the filter drop down
	*/
	addDropdownOptions: function (options) {
		var dropdownDiv = $("#" + updateIds.dropdownDiv);
		var filterDropdown = $("<select />")
					                     .attr('id', updateIds.filterDropdown)
															 .appendTo(dropdownDiv);
		filterDropdown.wrap("<label class='xp-CustomLabel'/>");
		/*Appending dropdown options */
		var dropdown = $("#" + updateIds.filterDropdown);
		/*Sanity check*/
		if (filterDropdown) {
			$.each(options.dropdownOptions, function (index, value) {
				var item = this;
				filterDropdown.append($("<option />").val(value).html(index));
			});
		}
		/*
		* Executes when user selects different filter option, and calls refresh data method based on the user selection
		*/
		$("#" + updateIds.filterDropdown).change(function () {
			var elem = $(this);
			var selectedValue = elem.val();
			var selectedText = elem.children("option:selected").text();
			$.xpointTemplates.methods.refreshData.call(this, options, selectedValue);
		});
		return;
	}
}
$.xpointTemplates.preContainers.push(
  function (opts) {
  	var container = this;
  	var filterMainContainer = $("<div />").attr('id', updateIds.filterMainContainer)
                                                          .appendTo(container);
  	updatesFilterMethods.addFilterArea.call(filterMainContainer, opts);
  }
 );

