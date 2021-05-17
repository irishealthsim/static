/*
This function is used in advance filter for Analysis page
*/
(function ($) {
    // "af" is alias for $.advanceFilter
    var af = $.advanceFilter = {};
    var sf = $.sortData = {};

    /*settings*/
    af.setting = {
        //Set the mouse hover color for filter text and check box.
        filterTextHoverColor: "#f6f6f6",

        //Set the max width to come horizontal scroll bar 
        filterContatinerMaxWidth: "400px",

        //Set the minimum number of distinct filter text must be in the filter container, to add the html elments for fiter text search box.
        numberOfTextForSearchBoxAdd: 10,

        //Set the text value for select all and unselect all button
        selectAllButtonText: "Select All",
        unSelectAllButtonText: "Clear Filter",
        okButtonText: "Ok",
        cancelButtonText: "Reset",

        //Hide the filterSearchBoxContainerId if filter container height is less than 373px
        filterContainerHeight: "373px",
        filterContainerBackGroundColor: "white",
        backGroundColorNone: "white"
    };

    af.constants = {
        searchBoxPlaceHolder: "Search filter values",
        searchBoxTitle: "Search filter values"
    };

    af.classes = {
        filterContainerModel: "filterContainerModel",
        filterSearchBoxContainer: "filterSearchBoxContainer",
        filterSearchBox: "filterSearchBox",
        filterValuesContainer: "filterValuesContainer",
        checkboxContainer: "checkboxContainer",
        filterCheckBox: "filterCheckBox",
        filterText: "values",
        buttonContatiner: "buttonContatiner ",
        selectUnselectCheckBoxes: "selectUnselectCheckBoxes",
    };

    af.ids = {
        filterContainer: "filterContainer",
        filterContainerKey: "filterContainerKey",
        filterKeyConatiner: "filterKeyConatiner",
        filterSearchBoxContainerId: "filterSearchBoxContainerId",
        filterSearchBoxId: "filterSearchBoxId",
        selectAll: "selectAll",
        unSelectAll: "unSelectAll",
        submitAll: "submitAll",
        clearAll: "clearAll",
        sortAsc: "sortFilterData"
    };

    af.methods = {
        AddSearchTextToSearchBox: function (searchBoxID, checkboxClass) {
            var searchTextBox = $(searchBoxID);
            var checkBoxes = $(af.classes.filterCheckBox);
            var searchTextArray = [];
            var searchTextSplitArray = [];
            var searchArray = [];
            var newSearchText = "";
            var checkValues = $('input[type=checkbox]:checked').map(function () {
                return $(this).val();
            }).get();

            $.each(searchTextSplitArray, function (i, checkValues) {
                searchTextArray.push(checkValues);
            });

            $.each(checkBoxes, function (i, checkBox) {
                if (checkBox.checked) {
                    searchArray.push(checkBox.value);
                    if ($.inArray(checkBox.value, searchTextArray) == -1)
                        searchTextArray.push(checkBox.value);
                } else {
                    if ($.inArray(checkBox.value, searchTextArray) != -1)
                        searchTextArray.splice($.inArray(checkBox.value, searchTextArray), 1);
                }
            });
            //push to searchbox
            $.each(searchTextArray, function (i, checkValue) {
                newSearchText += (searchTextArray.length > (i + 1)) ? (checkValue + "|") : checkValue;
            });

            $("#" + searchBoxID).val(checkValues);
            $("#test").val(checkValues);

        },

        InItSearchFunctionality: function (filterSearchBoxId, checkBoxClassName) {
            var filterSearchBox = $("#" + filterSearchBoxId);
            var filterValuesContainer = $("." + af.classes.filterValuesContainer);

            filterSearchBox.keyup(function () {
                var filterKeyFound = false;
                var searchKey = $.trim(filterSearchBox.val(" + af.ids.submitAll + ")).toUpperCase();
                if (searchKey == "") return;
                var checkBoxes = $("." + checkBoxClassName);

                $.each(checkBoxes, function (i, checkBox) {
                    if ($.trim(checkBox.value).toUpperCase().indexOf(searchKey) != -1) {
                        checkBox.focus();
                        filterSearchBox.focus();
                        filterValuesContainer.css("background-color", af.setting.backGroundColorNone);
                        $($("." + (checkBox.parentElement).parentElement.className)[i]).css("background-color", af.setting.filterTextHoverColor);
                        filterKeyFound = true;
                        return false;
                    }
                });
                if (!filterKeyFound) filterValuesContainer.css("background-color", af.setting.backGroundColorNone);
            });
        },

        SetCheckBoxStatus: function (filterBoxId, checkBoxClassName) {
            var filterKeys = $.trim($("#" + filterBoxId)[0].value);

            if (filterKeys == "") return;

            var filterKeyArrays = filterKeys.split('|');

            $.each(filterKeyArrays, function (i, value) {
                filterKeyArrays[i] = $.trim(value);
            });

            var checkBoxes = $("." + checkBoxClassName);

            $.each(checkBoxes, function (i, checkbox) {
                if ($.inArray($.trim(checkbox.value), filterKeyArrays) != -1)
                    checkbox.checked = false;
            });
        },

        InItHideFilterContainer: function () {
            $(document).click(function (e) {
                var filterContainerKey = $("#" + af.ids.filterContainerKey);
                var filterContainer = $("#" + af.ids.filterContainer);

                if (filterContainerKey.length > 0)
                    if (filterContainerKey[0].value == e.target.id) return;

                if ($(e.target).parents("div#filterContainer").length != 1)
                    if (filterContainer.length > 0) filterContainer.hide();
            });
        },

        selectUnselctAllPostOperation: function (searchBoxId, filterCheckBox, tableId, filterContainerId) {
            af.methods.AddSearchTextToSearchBox(searchBoxId, filterCheckBox);
        },

        advanceFilter: function (tableData, searchBoxId, tableId) {
            var filterContainer = $("#" + af.ids.filterContainer);
            var filterContainerKey = $("#" + af.ids.filterContainerKey);
            var searchBox = $("#" + searchBoxId);
            //Check - if filter containet contains same filterContainerKey as searchBoxId, then tooggle the filer container
            /* if (filterContainerKey.length > 0)
                 if (filterContainerKey[0].value == searchBoxId) {
                     (filterContainer.css('display') == 'block') ? filterContainer.css('display', 'none') : filterContainer.css('display', 'block');
                     return;
                 }   */// sorting purpose
            //Check - if search box id does not contains gs_ then terminate the operation
            if (searchBox.attr('id').indexOf("filter_") == -1) return;

            var searchBoxPosition = searchBox.offset();
            var innerWidthForSearchBox = searchBox.innerWidth();
            var searchBoxHeight = searchBox.height();
            var columnKey = searchBox.attr('id').substring(7, searchBox.attr('id').length);
            var dataArray = [];

            //Check - if filter container is already exist in the dom, then remove it
            if (filterContainer.length > 0) $("#filterContainer").remove();

            //Prepare value array of the selected filter box column
            $.each(tableData, function (i, value) {
                if ($.inArray(value[columnKey], dataArray) == -1) dataArray.push(value[columnKey]);
            });

            //Keep dataArray's values in ascending order
            var container = "<div class='" + af.classes.filterContainerModel + "' id='" + af.ids.filterContainer + "' style='position: absolute;left:" + (searchBoxPosition.left + 1) + "px;top:" + (searchBoxPosition.top + searchBoxHeight + 1.6) + "px;" +
                "min-width: " + (innerWidthForSearchBox + 46) + "px; max-width:" + af.setting.filterContatinerMaxWidth + ";background-color: " + af.setting.filterContainerBackGroundColor + "; border: 1px solid #d9d9d9; padding:5px;'>";

            //checkbox for select and unselect
            if (dataArray.length >= 1) {
                container += "<div class='" + af.classes.buttonContatiner + "'></br>";
                container += "<span class= 'ui-sort-icon'></span>";
                container += "<span style='cursor:pointer;margin-left:4px;' class='sortAsc " + af.classes.filterValuesContainer + "' id='" + af.ids.sortAsc/*tableId*/ + "'>Sort Ascending/Descending</span></br></br>";
                //container += "<span id='z-a'>Sort Z to A</span></br>";
                if (dataArray.length > 1) {
                    container += "<input type='checkbox' id='" + af.ids.selectAll + "' class='" + af.classes.selectUnselectCheckBoxes + af.classes.filterValuesContainer + "'/>";
                    container += "<span style='cursor:pointer' class='" + af.classes.filterValuesContainer + "'>" + af.setting.selectAllButtonText + "</span>";
                }
                container += "</div>";
                container += "<hr style='height:0px'>";
            }

            //Prepare filter values container
            if (dataArray.length >= 1) {
                container += "<div id='" + af.ids.filterKeyConatiner + "' style='float: left;overflow-y: auto;min-height: auto;width:190px;max-height:" + af.setting.filterContatinerMaxWidth + ";'>";
                $.each(dataArray, function (i, value) {
                    if ($.trim(value) != "") {
                        container += "<div class='" + af.classes.filterValuesContainer + "' style='margin-right:11px;width:100%;float:left;'>";
                        container += "<span style='height: 20px;float: left;' class='" + af.classes.checkboxContainer + "'>";
                        var checkBoxValue = (value.indexOf('<a') != -1) ? $(value).text() : value;
                        container += "<input type='checkbox' class= '" + af.classes.filterCheckBox + "' name='filterCheckbox' value='" + checkBoxValue + "'/>";
                        container += "</span>";
                        container += "<span style='cursor:pointer' class='" + af.classes.filterText + "'>" + value + "</span>";
                        container += "</div>";
                    }
                });
            }

            /*if (dataArray.length >= 1) {
                container += "<hr style='height:0px'>";
                container += "<div class='" + af.classes.buttonContatiner + "'>";
                container += "<button style='cursor:pointer' id='" + af.ids.submitAll + "' class=' submitButton " + af.classes.selectUnselectCheckBoxes + "'>" + af.setting.okButtonText + "</button>";
                container += "<button style='cursor:pointer' id='" + af.ids.clearAll + "' class='reset " + af.classes.selectUnselectCheckBoxes + "'>" + af.setting.cancelButtonText + "</button>";
                container += "</div>";
            }*/

            if (dataArray.length >= 1) {
                container += "<div class='" + af.classes.buttonContatiner + "'></br>";
                //container += "<input type='textbox' id='test' title='dsort_title' style='width:100px;height:15px'/>";
                container += "</div>";
            }

            //Add filterContainerKey into the filter container
            container += "<input type='hidden' id='" + af.ids.filterContainerKey + "' value='" + searchBoxId + "'/>";
            container += "</div>";

            if (dataArray.length >= 1) {
                container += "<div class='" + af.classes.buttonContatiner + "'>";
                container += "<hr style='height:0px'>";
                container += "<button style='cursor:pointer' id='" + af.ids.submitAll + "' class=' submitButton xp-filter-ok " + af.classes.selectUnselectCheckBoxes + "'>" + af.setting.okButtonText + "</button>";
                container += "<button style='cursor:pointer' id='" + af.ids.clearAll + "' class='reset xp-filter-reset " + af.classes.selectUnselectCheckBoxes + "'>" + af.setting.cancelButtonText + "</button>";
                container += "</div>";
            }

            $("body").append(container);

            //Do the required stuff after filter container loaded into DOM
            var filterValuesContainer = $("." + af.classes.filterValuesContainer);
            var filterCheckBox = $("." + af.classes.filterCheckBox);

            var filterSearchBoxId = $("#" + af.ids.filterSearchBoxId);
            filterContainer = $("#" + af.ids.filterContainer);

            var filterSearchBoxContainerId = $("#" + af.ids.filterSearchBoxContainerId);

            filterValuesContainer.hover(function () {
                filterValuesContainer.css("background-color", "white");
                $(this).css("background-color", "#f6f6f6");
            });

            //Set the filterSearchBox width
            if (filterSearchBoxId.length > 0) {
                var width = filterContainer.width();
                filterSearchBoxId.css('width', width);
            }

            //Search functionality
            af.methods.InItSearchFunctionality(af.ids.filterSearchBoxId, af.classes.filterCheckBox);

            //Checked the checked box if filter key matches with checkboxes values
            af.methods.SetCheckBoxStatus(searchBoxId, af.classes.filterCheckBox);

            //Hide the filterSearchBoxContainerId if filter container height is less than 373px
            if (filterContainer.height() < af.setting.filterContainerHeight) {
                filterSearchBoxContainerId.hide();
            }

            if (dataArray.length > 1) {
                $("#" + af.ids.selectAll).click(function () {
                    filterCheckBox.attr("checked", this.checked);
                    af.methods.selectUnselctAllPostOperation(searchBoxId, af.classes.filterCheckBox, tableId.id, af.ids.filterContainer);
                });
                $("#" + af.ids.unSelectAll).click(function () {
                    filterCheckBox.attr("checked", false);
                    af.methods.selectUnselctAllPostOperation(searchBoxId, af.classes.filterCheckBox, tableId.id, af.ids.filterContainer);
                });
            }

            //clear button click
            //            $("#" + af.ids.clearAll).click(function () {
            //                filterContainer.hide();
            //                filterSearchBoxContainerId.hide();
            //            });
        },
        inIt: function () {
            $.fn.advanceFilter = function (tableData, searchBoxId, tableId) {
                af.methods.advanceFilter(tableData, searchBoxId, tableId);
                af.methods.InItHideFilterContainer();
            }
        }
    };
    af.methods.inIt();
}(jQuery));

