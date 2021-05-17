

(function ($) {


    /*get all elements from the  query string and creates an array and returns array as object*/
    $.getquery = function () {
        var r = {};
        var q = location.search;
        q = q.replace(/^\?/, ''); // remove the leading ?	
        q = q.replace(/\&$/, ''); // remove the trailing & 
        jQuery.each(q.split('&'), function () {
            var key = this.split('=')[0];
            var val = this.split('=')[1];
            // convert floats 
            if (/^[0-9.]+$/.test(val))
                val = parseFloat(val);
            // ingnore empty values 
            if (val)
                r[key] = val;
        });
        return r;
    };
    /*This plugins creates  container for new forum topic */
    $.fn.newtopic = function (options) {
        var defaults = {
            saveurl: "",
            enablecategory: true,
            forumtype: "general",
            requiredcss: "xp-Error",
            cancelpageurl: "",
            body: "",
            subcategory: "",
            title: "",
            categorylist: "g_spforums_category",
            subcategorylist: ""
        };
        var options = $.extend(defaults, options);
        var baseid = $(this).attr('id');
        var ids = {
            title: baseid + "_title",
            category: baseid + "_category",
            subcategory: baseid + "_subcategory",
            body: baseid + "_bodytext",
            addbuttonid: baseid + "_addbutton",
            errorp: baseid + "_errormessage"
        };

        function SaveRichtextbox() {
            tinyMCE.triggerSave();
        }
        function showerror(data) {
            var statusdiv = $("#" + ids.errorp);
            statusdiv.hide();
            statusdiv.html('<div class="xp-Width30" style="margin:auto;"><div style="margin:auto;" class="xp-FloatLeft"><img src="/_layouts/Images/XPointBase/error_msg.png" style="padding-right:6px"/></div><div style="margin:auto;" class="xp-FloatLeft">' + data + '</div></div>');
            statusdiv.addClass("ui-state-error");
            statusdiv.addClass("xp-ErrorMsg");
            statusdiv.show().fadeOut(10000);
        }
        function MakeRichtextBox(inputbox) {
            inputbox.RelayRichText();
        }
        function AssignPlugins() {
            var bodyelem = $("#" + ids.body);
            MakeRichtextBox(bodyelem);
            $("#" + ids.title).charCounter(50, { style: '' });
            if (options.enablecategory) {
                var catkey = $.getquery()["category"];
                if (catkey == null) {
                    catkey = "";
                }
                $("#" + ids.category).classification({ listname: 'g_spforums_category',
                    columnname: 'Title',
                    parentcolumnname: '',
                    parentid: '',
                    serviceurl: '/_layouts/IImpact.Web/ClassificationService.asmx/Classification',
                    valuecolumn: '',
                    uniquevals: 'False',
                    autoindexing: 'False',
                    allowblank: false,
                    selectedvalue: catkey
                });
                var key = $.getquery()["forum"];
                if (key == null || catkey == "") {
                    key = "";
                }
                $("#" + ids.subcategory).classification({ listname: 'g_spforums_forums',
                    columnname: 'Title',
                    parentcolumnname: 'CategoryID',
                    parentid: ids.category,
                    serviceurl: '/_layouts/IImpact.Web/ClassificationService.asmx/Classification',
                    valuecolumn: '',
                    uniquevals: 'False',
                    autoindexing: 'False',
                    allowblank: false,
                    selectedvalue: key,
                    parentKey: catkey
                });

            }
        }



        function ValidateControls() {
            var validated = true;
            options.title = $("#" + ids.title).val();
            if ($.trim(options.title).length == 0) {
                validated = false;
                showerror("Enter a valid title");
                return validated;
            }
            if (options.enablecategory) {
                options.subcategory = $("#" + ids.subcategory).val();
                if ($.trim(options.subcategory).length == 0) {
                    validated = false;
                    showerror("Select valid category and subcategory");
                    return validated;
                }
            }
            SaveRichtextbox();
            options.body = $("#" + ids.body).val();
            if ($.trim(options.body).length == 0) {
                validated = false;
                showerror("Enter topic description");
                return validated;
            }
            return validated;
        }
        /*Added retrieving url for discussion page*/
        function GetQueryStringValues(param) {
            var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < url.length; i++) {
                var urlparam = url[i].split('=');
                if (urlparam[0] == param) {
                    return urlparam[1];
                }
            }
        }

        function BuildHtml(container) {
            var statusdiv = $("<div id='" + ids.errorp + "'/>");
            statusdiv.hide();
            container.append(statusdiv);
            /*create header */
            var headerdiv = $("<div class='xp-FloatLeft xp-Width xp-PaddingBottom-5'><div class='xp-DivHeader  xp-Overflowhidden' >Create Discussion</div></div>");
            container.append(headerdiv);
            /*end of header content*/
            /*content container*/
            var outerdiv = $("<div style='width:87%' class='xp-FloatLeft xp-Width xp-OuterPanel ui-corner-all xp-BoxShadow' />");
            var table = $("<table class='xp-Width xp-NewTopicTd' cellpadding=10px cellspacing=0 />");
            /*title row*/
            var tr = $("<tr />");
            var td = $("<td  style='width:140px' class='xp-FontBold' />");
            td.append("Title <span class='" + options.requiredcss + "'>*</span>");
            tr.append(td);
            var td = $("<td class='xp-Width80'/>");
            td.append(" <div class='xp-Width40 xp-FloatLeft'><input type='text' autocomplete='off' id='" + ids.title + "' class='xp-TxtBox xp-Width xp-FloatLeft ' /></div>");
            tr.append(td);
            table.append(tr);
            /*end of title row*/
            if (options.enablecategory) {
                /*category row*/
                var tr = $("<tr />");
                var td = $("<td  style='' class='xp-FontBold'/>");
                td.append("Category <span class='" + options.requiredcss + "'>*</span>");
                tr.append(td);
                var td = $("<td />");
                td.append("<select id='" + ids.category + "' style='width:250px' />");
                tr.append(td);
                table.append(tr);
                /*end of  category row*/
                /*sub category row*/
                var tr = $("<tr />");
                var td = $("<td  style='' class='xp-FontBold'/>");
                td.append("Subcategory <span class='" + options.requiredcss + "'>*</span>");
                tr.append(td);
                var td = $("<td />");
                td.append("<select id='" + ids.subcategory + "' style='width:250px' />");
                tr.append(td);
                table.append(tr);
                /*end of sub category row*/
            }
            /*body row*/
            var tr = $("<tr />");
            var td = $("<td class='xp-FontBold' style='vertical-align:top;' valign='top' />");
            td.append("Body <span class='" + options.requiredcss + "'>*</span>");
            tr.append(td);
            var td = $("<td/>");
            td.append("<textarea id='" + ids.body + "' cols='75' rows='10'/>");
            tr.append(td);
            table.append(tr);
            /*end of body row*/
            /*buttons row*/
            var tr = $("<tr />");
            var td = $("<td colspan=2 />");
            var buttondiv = $("<div style='margin:auto;width:auto !important;float:right' class='xp-Width30'/>");
            var adddiv = $("<div class='xp-FloatLeft' />");
            var addbtn = $("<input type='button' id='" + ids.addbuttonid + "' value='Post' class='ui-button  ui-primarytabclr ui-corner-all'/>");
            adddiv.append(addbtn);
            buttondiv.append(adddiv)
            var canceldiv = $("<div style=' padding-left:15px;' class='xp-FloatLeft'  />");
            var cancelbtn = $("<input type='button' value='Cancel' class='ui-button ui-secondarytabclr ui-corner-all'/>");
            canceldiv.append(cancelbtn);
            buttondiv.append(canceldiv)
            td.append(buttondiv);
            tr.append(td);
            table.append(tr);
            /*end of buttons row*/
            /*end of content container*/
            outerdiv.append(table);
            container.append(outerdiv);
            AssignPlugins();
            cancelbtn.click(function () {
                if (document.referrer) {
                    window.location = document.referrer;
                }
                else {
                    window.location = options.cancelpageurl;
                }
            });
            $(document).ready(function () {

                /*query string*/


                $("select").wrap("<label class='xp-CustomLabel'/>");
            })
            addbtn.click(function () {

                var isProject = GetQueryStringValues("trackerId");
                var projectId = "";
                if (isProject != "undefined") {
                    projectId = isProject;
                }


                /*validate controls before ajax call*/
                if (ValidateControls()) {
                    var gpost = { title: options.title, subcategory: options.subcategory, body: options.body, forumtype: options.forumtype, trackerID: "" + projectId + "" };
                    $.ajax({ url: options.saveurl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: $.toJSON(gpost),
                        success: function (datap, st) {
                            var data = datap.d;
                            if (data.status == "success") {
                                window.location = data.message;
                            }
                            else {
                                showerror(data.message);
                            }
                        }
                    });
                }
            });
        }
        return this.each(function () {
            var container = $(this);
            BuildHtml(container);
        });
    };

})(jQuery);