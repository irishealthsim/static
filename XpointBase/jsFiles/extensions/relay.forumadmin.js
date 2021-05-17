(function ($) {
  $.fn.extend({

    hackedSlideUp: function (speed) {
      if (!speed)
        speed = 'slow';
      var target = $(this);
      $("a", target).hide();
      target.slideUp(speed, function () {
      	$("a", target).hide();
      });
    },
    hackedSlideDown:function (speed) {
      if (!speed)
        speed = 'slow';
      var target = $(this);
      target.slideDown(speed, function () {
        $("a", target).show();
      });
    }

  });
    //This plugin creates admin functionality for the forum 
    //with various options
    $.fn.forumadmin = function (options) {
        //define various default options for the plugin
        var defaults = {
            geturl: '/_layouts/IImpact.Web/ForumService.asmx/GetAllCategory',   //url for the webmethod for retrieving the categories and subcategories
            deletecaturl: '/_layouts/IImpact.Web/ForumService.asmx/DeleteCategory', // url for the webmethod for deleting either category or subcategory
            deletesubcaturl: '/_layouts/IImpact.Web/ForumService.asmx/DeleteSubCategory', // url for the webmethod for deleting either category or subcategory
            addurl: '/_layouts/IImpact.Web/ForumService.asmx/AddCategory',   // url for the webmethod for adding categories and subcategories
            addsubcategoryurl: '/_layouts/IImpact.Web/ForumService.asmx/AddSubCategory',   // url for the webmethod for adding   subcategories
            editcategoryurl: '/_layouts/IImpact.Web/ForumService.asmx/EditCategory',   // url for the webmethod for editing category
            editsubcategoryurl: '/_layouts/IImpact.Web/ForumService.asmx/EditSubCategory',   // url for the webmethod for editing subcategory
            headerimageurl: "xp-IconForums xp-Icon"
        };
        //prepare the ids for the various elements required in the plugin
        var ids = {
            addPanel: 'addContainer',
            linkPanel: 'links',
            addCategoryLink: 'addCategoryLink',
            addCategoryPanel: 'addCategoryPanel',
            dataListPanel: 'dataListPanel',
            confirmPanel: 'confirmPanel'
        };
        //labels
        var labels = {
            addCategoryLabel: "Add",                                                              // Add Category Label //
            addSubCategoryLabel: "Add More"                                                         // Add SubCategory Label //
        };
        //extend the default settings with the options specified and put them in opts
        var opts = $.extend(defaults, options);
        this.opts = opts;
        /*********************************Start Method***************************************/
        /*****Summary:  prepare the ids array after appending baseid to defaults *******************/
        function prepareIds(baseid) {
            ids.addPanel += baseid;
            ids.linkPanel += baseid;
            ids.addCategoryLink += baseid;
            ids.addCategoryPanel += baseid;
            ids.dataListPanel += baseid;
            ids.confirmPanel += baseid;
        }
        var dataListPanel;
        /*********************************End Method***************************************/
        function PrepareConfirmDiv() {
            var html = '<div id="' + ids.confirmPanel + '" title="Confirmation" style="display:none">' +
	     '<p><span class="ui-icon ui-icon-alert xp-FloatLeft" style="margin:0 7px 0 0;"></span><span class="messagespan"></span></p>' +
           '</div>';
            $('body').append(html);

        }

        function OpenDialog(message, ondelete) {
            var dialogBox = $("#" + ids.confirmPanel);
            dialogBox.dialog('destroy');
            $(".messagespan", dialogBox).html(message);
            dialogBox.dialog({
                autoOpen: true,
                resizable: false,
                modal: true,
                buttons: {
                    'Delete': function () {
                        if (ondelete) {
                            eval(ondelete);
                        }
                        else {
                            window.location = options.currentlink;
                        }
                    },
										 Cancel: function () {
                        $(this).dialog('close');
                    }
                }
            });
        }

        /*********************************Start Method***************************************/
        /*****Summary:   creates  Header  *************************************************/
        function createHeader(elem) {
            var headerDiv = $("<div class='xp-Width xp-FloatLeft' />").css({
                'padding-bottom': '0px'
            }
      ).append("<div class='xp-DivHeader xp-FloatLeft xp-Padding-8'><span class='xp-FloatLeft Tip-FMManagerHeader'>Forum Categories</span></div>");
            elem.append(headerDiv);
        }
        /*********************************End Method***************************************/
        /*********************************Start Method***************************************/
        /*****Summary:   creates link panel *******************/
        function createLinksPanel(elem) {
            var linksPanel = $("<div id='" + ids.linkPanel + "' />");
            linksPanel.addClass('xp-FloatLeft xp-Width');
            linksPanel.css({
                'padding': '8px 0px 8px 4px'
            });
               var addCategoryLink = $("<a href='#' id='" + ids.addCategoryLink + "' class='ui-primarytabclr Tip-FMAddCategory ui-tabbuttonstyle ui-corner-all xp-TabLink'>" + labels.addCategoryLabel + "</a>");
            linksPanel.append(addCategoryLink).appendTo(elem);  // append the addcategorylink to linkspanel and append that to elem
            addCategoryLink.click(function () {
                var categoryPanel = $("#" + ids.addCategoryPanel);
                categoryPanel.hackedSlideDown(1000);
            });
        }
        /*********************************End Method***************************************/
        /*********************************Start Method***************************************/
        /*****Summary:  this method creates add category panel *******************/
        function createCategoryPanel(elem) {
            var categoryPanel = $("<div id='" + ids.addCategoryPanel + "' class='xp-ClearBoth xp-LeftLargeWidth xp-FloatLeft ui-corner-all xp-OuterPanel xp-BoxShadow'/>")
      .css({
          'display': 'none',          
          'padding': '10px',
          'border-left': '0px',
          'border-top': '0px'
      }).append("<div style='margin:auto;' class='xp-Width60'><div class='alertdiv xp-ErrorMsg' style='display:none' /></div>");
            var categoryContainer = $("<div class='xp-FloatLeft xp-Width'/>").css({
                'padding': '8px 0px'
            }); ;
            var categoryLabelContainer = $("<div class='xp-Font xp-FloatLeft' />")
      .css({
          'width': '100px'
      }).append("<b>Category</b><span class='xp-Error'>*</span>");
            categoryContainer.append(categoryLabelContainer);
            var categoryTextContainer = $("<div class='xp-FloatLeft xp-Width50 xp-CategoryContainer'/>").append("<input type='text' autocomplete='off' class='counter addCategorytext xp-TxtBox xp-Width90 ' maxlength=30/>");
            categoryContainer.append(categoryTextContainer);
            var closeDiv = $("<div class='xp-FloatRight'/>");
            var closeLink = $("<a href='#' class='xp-CloseThick xp-DisplayBlock xp-Padding-2 '><span class='ui-icon ui-icon-closethick'></span></a>").click(function () {
                $("input", categoryPanel).val("");
                var alertdiv = $(".alertdiv", categoryPanel);
                alertdiv.empty().hide();
                $(".addSubCategoryPanel:gt(0)", categoryPanel).remove();
                categoryPanel.hackedSlideUp(1000);
            });
            closeDiv.append(closeLink);
            categoryContainer.append(closeDiv);
            categoryContainer.append("<div class='xp-ClearBoth xp-Error' style='font-size:8pt;padding-top:5px;'>There should be atleast one subcategory</div>");
            categoryPanel.append(categoryContainer).appendTo(elem);
            //create a  subcategory panel and append that to main panel 
            //this subcategory panel will be used to add subcategory sub panels on click on 'add subcategory'
            var subCategoryPanel = $("<div />").appendTo(categoryPanel);
            addSubCategory(subCategoryPanel);
            var subCategoryLinkDiv = $("<div class='xp-ClearBoth' style='padding:8px 8px' />")
      .append("<div class='xp-FloatLeft' style='width:1%;'>&nbsp;</div>");
            var subDiv = $("<div class='xp-FloatLeft'/>");
            var addSubCategoryLink = $("<a href='#' class='ui-secondarytabclr ui-tabbuttonstyle ui-corner-all xp-TabLink' style='text-decoration:none'>" + labels.addSubCategoryLabel + "</a>");
            addSubCategoryLink.click(function () {
                addSubCategory(subCategoryPanel);
            });
            subDiv.append(addSubCategoryLink).appendTo(subCategoryLinkDiv);
            subCategoryLinkDiv.appendTo(categoryPanel);
            var buttonDiv = $("<div class='xp-BtnMaindiv' align='center'/>").appendTo(categoryPanel);
            var addBtn = $("<div class='xp-BtnDiv'><a href='#' class='ui-primarytabclr ui-tabbuttonstyle' style='text-decoration:none'>Add</a></div>")
      .appendTo(buttonDiv);
            var cancelBtn = $("<div class='xp-BtnDiv'><a href='#' class='ui-secondarytabclr ui-tabbuttonstyle' style='text-decoration:none'>Cancel</a></div>")
      .appendTo(buttonDiv)
      .click(function () {
          var inputbox = $("input", categoryPanel);
          var alertdiv = $(".alertdiv", categoryPanel);
          alertdiv.empty().hide();
          inputbox.val("");
          inputbox.trigger("keypress");
          $(".addSubCategoryPanel:gt(0)", categoryPanel).remove();
          categoryPanel.hackedSlideUp(1000);
      });
            addBtn.click(function () {

                if (ValidateNewCategory(addBtn) == true) {
                	var cat = $(".addCategorytext", categoryPanel).val().replace("'", "\\'");
										var subcat = new Array();
                    var isduplicate;
                    $.each($(".addSubCategory", categoryPanel), function (i, val) {
                    	var subcatname = $(this).val().replace("'", "\\'");
                        if (subcatname.length > 0) {


                            if (subcat.length > 0) {

                                $.each(subcat, function (ii, vall) {

                                    if (subcat[ii] == subcatname) {
                                        isduplicate = true;
                                    }
                                });
                            }
                            if (!isduplicate) {
                                subcat[i] = subcatname;
                            }
                            else {
                                var alertdiv = $(".alertdiv", $("#" + ids.addCategoryPanel));
                                alertdiv.html("SubCategory Name should be Unique");
                                alertdiv.show();
                                return;
                            }
                        }
                    });
                    if (!isduplicate) {
                        AddNewCategory(cat, subcat, elem);
                    }
                }
            }

      );
        }

        function AddNewCategory(category, subcategory, elem) {
            var categoryPanel = $("#" + ids.addCategoryPanel);
            $.ajax({ url: opts.addurl, contentType: "application/json; charset=utf-8", type: "post", dateType: "json", data: "{category:'" + category + "',subcategory:'" + subcategory + "'}",
                success: function (datap, st) {
                    var data = datap.d;

                    if (data == undefined) {
                        data = $.evalJSON(datap).d;
                    }
                    if (data.status == "success") {
                        var inputbox = $("input", categoryPanel);
                        inputbox.val("");
                        inputbox.trigger("keypress");
                        categoryPanel.hackedSlideUp(1000);
                        $(".addSubCategoryPanel:gt(0)", categoryPanel).remove();
                        populate();
                    }
                    else {
                        var alertdiv = $(".alertdiv", $("#" + ids.addCategoryPanel));
                        alertdiv.html(data.message);
                        alertdiv.show();
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) { }

            });
        }

        /*********************************Start Method***************************************/
        /*****Summary:  this method creates  one subcategory  *******************/
        function addSubCategory(elem) {
        		var html = "<div class='addSubCategoryPanel xp-Font xp-Width xp-FloatLeft' style='padding:8px 0px;' >";
        		html += "<div class='xp-FloatLeft' style='width:100px;height:18px;line-height:18px' ><b>Sub Category</b></div>";
        		html += "<div class='xp-FloatLeft xp-Width50 xp-CategoryContainer' ><input type='text' autocomplete='off' class='counter addSubCategory xp-TxtBox xp-Width90' maxlength=60 ></input></div>";
        		html += "</div>";
            elem.append(html);
        }
        /*********************************end Method***************************************/
        /*********************************Start Method***************************************/
        /*****Summary: gets categories and sub categories and creates html   *******************/
        function populate() {
            var elem = dataListPanel;
            elem.empty();
            $.ajax({ url: opts.geturl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{}",
                success: function (datap, st) {
                    //code for the create html
                    createHtml(datap.d, elem);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                }

            });

        }
        /*********************************end Method***************************************/

        /****************Start of Method*******************/

        function ValidateNewCategory(linkElem) {
            var parent = $(linkElem.parents("#" + ids.addCategoryPanel));
            var alertdiv = $(".alertdiv", parent);
            alertdiv.empty().hide();
            var categoryElem = $(".addCategorytext", parent);
            if (categoryElem.val().length > 0) {
                /*check for empty sub categories*/
                var nonemptysubcat = $(".addSubCategory", parent).filter(function () {
                    var $this = $(this);
                    return ($this.val().length > 0);
                });
                if (nonemptysubcat.length == 0) {
                    alertdiv.html("Please enter a subcategory");
                    alertdiv.show();
                }
                else {
                    return true;
                }
            }
            else {
                alertdiv.show();
                alertdiv.html("Please enter category");

            }
            return false;
        }

        /****************End of Method*******************/



        /* End of Method**/

        function saveCategory(linkElem) {
            var parent = $($(linkElem).parents(".rowContainer"));
            var inputElem = $(".rowLabel", parent).find("input");
            var categoryText = inputElem.val().replace("'", "\\'");
            var editId = inputElem.attr('editid');
            var alertDiv = $(".alertdiv", parent).empty().hide();
            if ($.trim(categoryText).length == 0) {
                alertDiv.html("Cannot add empty category.").show();
            }
            else {
                $.ajax({
                    url: opts.editcategoryurl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{id:'" + editId + "',category:'" + categoryText + "'}",
                    success: function (datap, st) {
                        var data = datap.d;
                        if (data.status == 'success') {
                        	makeReadable(linkElem, categoryText.replace("\\'", "'"));
                        }
                        else {
                            alertDiv.html(data.message).show();
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                    }

                });
            }
        }

        function saveSubCategory(linkElem) {
            var parent = $($(linkElem).parents(".rowContainer"));
            var subCategoryText = $(".labeltext", parent).val().replace("'", "\\'");
            var editId = $(".labeltext", parent).attr('editid');
            var alertDiv = $(".alertdiv", parent).empty().hide();
            if ($.trim(subCategoryText).length == 0) {
                ///do something here to validation              
                alertDiv.html("Cannot add empty subcategory").show();
            }
            else {
                $.ajax({ url: opts.editsubcategoryurl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{'id':'" + editId + "','subcategory':'" + subCategoryText + "'}",
                    success: function (datap, st) {
                        var data = datap.d;
                        if (data.status == 'success') {
                        	makeReadable(linkElem, subCategoryText.replace("\\'", "'"));
                        }
                        else {
                            /*to do for handling error*/
                            alertDiv.html(data.message).show();
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                    }
                });
            }
        }

        function makeReadable(linkElem, labelhtml) {
            var parent = $($(linkElem).parents(".rowContainer")).removeClass('xp-CustomBgClr xp-CustomBorderClr');
            var labelContainer = $(".rowLabel", parent);
            var alertDiv = $(".alertdiv", parent).empty().hide();
            labelContainer.empty();
            labelContainer.html(labelhtml);
            var addLink = $(".addLink", parent).length > 0 ? $(".addLink", parent).show() : "";
            var editLink = $(".editLink", parent).show();
            var saveLink = $(".saveLink", parent).remove()
            var deleteLink = $(".deleteLink", parent).show();
            var cancelLink = $(".cancelLink", parent).remove();
            $(".deleteSubCatDiv", parent).show();
        }
        function makeEditable(linkElem, onSave, editid, maxlength) {
            var parent = $($(linkElem).parents(".rowContainer")).addClass('xp-CustomBgClr xp-CustomBorderClr');
            var labelContainer = $(".rowLabel", parent);
            var oldhtml = labelContainer.html();
            labelContainer.empty();

            labelContainer.append("<input type='text' autocomplete='off' size=47 maxlength=" + maxlength + " editid='" + editid + "' edittype='" + linkElem.attr('edittype') + "'" + " class='counter labeltext xp-TxtBox' value='" + oldhtml + "'/>");
            $('input[editid=' + editid + '][edittype=' + linkElem.attr("edittype") + ']').val(oldhtml);
            var addLink = $(".addLink", parent).length > 0 ? $(".addLink", parent).hide() : "";
            var editLink = $(".editLink", parent).hide();
            var saveLink = $("<a href='#' class='saveLink editLink ui-primarytabclr ui-tabbuttonstyle' edittype='" + editLink.attr('edittype') + "'>Save</a>").appendTo($(editLink.parent()));
            saveLink.click(function () {
                eval(onSave);
            });
            var deleteLink = $(".deleteLink", parent).hide();
            var deleteDiv = $(".deleteSubCatDiv", parent);
            var cancelLink = $("<a href='#' class='cancelLink editLink ui-secondarytabclr ui-tabbuttonstyle'>Cancel</a>").appendTo(deleteLink.length > 0 ? $(deleteLink.parent()) : deleteDiv.show());
            cancelLink.click(function () {
                makeReadable(cancelLink, oldhtml);
            });
        }


        function addNewSubCategoryRow(elem, categoryid) {
        	var subCategoryPanel = $("<div class='newsubCategoryPanel xp-HightlightRow xp-CustomBgClr xp-CustomBorderClr xp-ClearBoth xp-Width xp-FloatLeft' style='display:none;padding:0px 8px 2px 8px' />")
                      .append("<div class='alertdiv xp-ErrorMsg' style='display:none' /><div class='xp-ClearBoth' style='width:2%;height:4px'></div><div class='xp-FloatLeft' style='width:100px'>Sub Category</div>")
                      .append("<div class='xp-FloatLeft xp-SubCategryInput xp-Width43 xp-MarginTop-3  '><input maxlength='60' autocomplete='off' class='counter xp-TxtBox xp-Width99 '   /></div>")
                      .appendTo(elem);
        		var btnsDiv = $("<div  class='xp-ActionBtnsDiv xp-MarginTop-3' style='width:31%'/>").appendTo(subCategoryPanel);
            var saveDiv = $("<div class='xp-ActionBtn' />").appendTo(btnsDiv);
            var saveLink = $("<a href='#' class='addLink ui-primarytabclr ui-tabbuttonstyle'>Save</a>").appendTo(saveDiv).click(function () {
                var subCategoryPanel = $($(this).parents(".newsubCategoryPanel"));
                subCategoryText = $("input", subCategoryPanel).val().replace("'", "\\'");
                var alertDiv = $(".alertdiv", subCategoryPanel).empty().hide();
                if ($.trim(subCategoryText).length == 0) {
                    alertDiv.html("Cannot add empty subcategory.").show();
                }
                else {
                    $.ajax({ url: opts.addsubcategoryurl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{'categoryid':'" + categoryid + "','subcategory':'" + subCategoryText + "'}",
                        success: function (datap, st) {
                            var data = datap.d;
                            if (data.status == 'success') {
                                $("input", subCategoryPanel).val("");
                                populate();
                                subCategoryPanel.hackedSlideUp(1000);
                            }
                            else {
                                //to do for handling error
                                alertDiv.html(data.message).show();
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                        }

                    });
                }
            });
            var cancelDiv = $("<div class='xp-ActionBtn' />").appendTo(btnsDiv);
            var cancelLink = $("<a href='#' class='editLink ui-secondarytabclr ui-tabbuttonstyle' edittype='category'>Cancel</a>").appendTo(cancelDiv);
            cancelLink.click(function () {
                var subCategoryPanel = $($(this).parents(".newsubCategoryPanel"));
                var inputbox = $("input", subCategoryPanel);
                inputbox.val("");
                inputbox.trigger("keypress");
                subCategoryPanel.hackedSlideUp(1000);
            });
        }

        /********************* start of method ***************////////////////////
        function deleteItem(url, id) {
            //ajax call start
            $.ajax({ url: url, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{'id':'" + id + "'}",
                success: function (datap, st) {
                    var data = datap.d;
                    if (data.status == 'success') {
                        populate();
                        $("#" + ids.confirmPanel).dialog('close');
                    }
                    else {
                        //to do for handling error
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                }

            });
            //end of ajax call        
        }

        /************************End of the method**************************************/

        function addCategoryRow(category, elem) {
            var div = $("<div  class='rowContainer xp-CatRowContainer'/>").appendTo(elem);
            var labelDiv = $("<div class='alertdiv xp-ErrorMsg' style='display:none' /><div class='rowLabel xp-FloatLeft'/>").append(category.Name);
            div.append(labelDiv);
            var btnsDiv = $("<div  class='xp-ActionBtnsDiv' style='width:31%;' />").appendTo(div);
            var addDiv = $("<div class='xp-ActionBtn' />").appendTo(btnsDiv);
            var addLink = $("<a href='#' class='addLink Tip-FMAddLink'>Add</a>").appendTo(addDiv).click(function () {
                var parent = $(this).parents(".rowContainer");
                $(".newsubCategoryPanel", parent).hackedSlideDown(1000);
            });
            var editDiv = $("<div class='xp-ActionBtn' />").appendTo(btnsDiv);
            var editLink = $("<a href='#' class='editLink Tip-FMEditLink' edittype='category'>Edit</a>").appendTo(editDiv);
            editLink.click(function () {
                makeEditable(editLink, "saveCategory(editLink)", category.Id, 30);
            });
            var deleteDiv = $("<div class='xp-ActionBtn' />").appendTo(btnsDiv);
            var deleteLink = $("<a href='#' class='deleteLink Tip-FMDeleteLink' deltype='category'>Delete</a>").appendTo(deleteDiv);
            deleteLink.click(function () {
                var dialogMessage = 'This will cause all the discussions under this category to be deleted.<br/><br/> Are you sure you want to delete ?';
                OpenDialog(dialogMessage, "deleteItem('" + opts.deletecaturl + "','" + category.Id + "')");
            });
            addNewSubCategoryRow(div, category.Id);
        }
        
        function addSubCategoryRow(subcategory, elem) {
            var div = $("<div class='rowContainer xp-SubCatRowContainer'/>").appendTo(elem);
            div.append("<div class='alertdiv xp-ErrorMsg' style='display:none' /><div class='xp-FloatLeft' style='width:2%'>&nbsp;</div>");
            var labelDiv = $("<div  class='rowLabel xp-FloatLeft' style='width:68%' />").append(subcategory.Name);
            div.append(labelDiv);
            var btnsDiv = $("<div  class='xp-ActionBtnsDiv' style='width:30%;'/>").appendTo(div);
            var editDiv = $("<div class='xp-ActionBtn' />").appendTo(btnsDiv);
            var editLink = $("<a href='#' class='editLink Tip-FMEditSubCat' edittype='subcategory'>Edit</a>").appendTo(editDiv);
            editLink.click(function () {
                makeEditable(editLink, "saveSubCategory(editLink)", subcategory.Id, 60);
            });
            var deleteDiv = $("<div class='deleteSubCatDiv xp-ActionBtn' />").appendTo(btnsDiv);
            //check if the subcategory deletion is allowed only then add deletelink 
            if (subcategory.AllowDelete) {
            	var deleteLink = $("<a href='#' class='deleteLink Tip-FMDeleteSubCat ' id='subcatDelete" + subcategory.Id + "' deltype='subcategory'>Delete</a>");
                deleteLink.appendTo(deleteDiv);
                deleteLink.click(function () {
                    var dialogMessage = 'This will cause all the discussions under this subcategory to be deleted.<br/><br/> Are you sure you want to delete ?';
                    OpenDialog(dialogMessage, "deleteItem('" + opts.deletesubcaturl + "','" + subcategory.Id + "')");

                });

            }

        }
        /*********************************Start Method***************************************/
        /*****Summary: Creates html from specified list of categories and subcategories   *******************/
        function createHtml(data, elem) {
            elem.empty();
            var $html = "";
            if (data == null) {
                elem.html("No categories added");
            }
            else {
                /*traverse through the list of data returned 
                * for each item firstly draw the category name and create edit and delete controls
                * then traverse through the subcategories and create edit and delete controls
                */
                $.each(data, function (i) {
                    var category = data[i];
                    addCategoryRow(category, elem);
                    /*If subcategory is null then there is no subcategory*/
                    $.each(category.SubCats, function (j) {
                        var subCategory = category.SubCats[j];
                        addSubCategoryRow(subCategory, elem);
                    });

                });
                elem.append($html);
            }
        }
        /*********************************end Method***************************************/
        /*********************************Start Method***************************************/
        /*****Summary:  this method is returned for each matched element for the plugin on the page *******************/
        return this.each(function () {
            var elem = $(this);   //get jquery object for the current matched element
            elem.addClass('xp-Overflowhidden xp-FloatLeft');
            elem.css({ 'width': '80%' });
            prepareIds(elem.attr('id'));
            PrepareConfirmDiv();
            createHeader(elem);
            createLinksPanel(elem);
            createCategoryPanel(elem);
            dataListPanel = $("<div class='xp-Font xp-DataListPanel xp-OuterPanel ui-corner-all xp-BoxShadow' id='dataListPanel'/>").appendTo(elem);
            populate();
            $(".counter").livequery(function () {
                var $this = $(this);
                $this.charCounter($this.attr('maxlength'));
            });
        });
        /*********************************End Method***************************************/
    }

})(jQuery);


