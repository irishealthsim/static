$(document).ready(function () {
    $.fn.fmatter.projectsuggest =
   function (cellvalue, options, rowdata) {
       if (cellvalue && $.trim(cellvalue).length > 0) {
           var html = new Array();
           var pplAttr = new Array();
           var vals = $.parseJSON(cellvalue);
           if (vals != null) {
               $(vals).each(function () {
                   var val = this;
                   if (val) {
                       if (val.Id > 0) {
                           html.push("<a href='" + options.colModel.projectPrefixUrl + val.Id + "'>" + val.Name + "</a>");
                       }
                       else {
                           html.push(val.Name);
                       }
                       pplAttr.push("{ FormattedVal:'" + val.FormattedVal + "', Name:'" + val.Name + "'}");
                   }

               });
               return "<div class='projSuggestion' projSuggestion=\"[" + pplAttr.join(",") + "]\">" + html.join(",") + "</div>";
           }
           return "";
       }
       return $.fn.fmatter.defaultFormat(cellvalue, options, rowdata);
   };

    jQuery.extend($.fn.fmatter.projectsuggest, {
        unformat: function (cellvalue, options) {
            var pplSuggDiv = $(".projSuggestion", $(cellvalue));
            return pplSuggDiv.attr("projSuggestion");
        }
    });
});
function initProjectSuggest(el, vl, suggestOpts) {
    var prefillVls = [{ Name: "", FormattedVal: ""}];
    if (vl) {
        prefillVls = eval("(" + vl + ")");
    }
    var elJ = $(el);
    elJ.val('');
    var elId = elJ.attr('id');
    suggestOpts = $.extend({ startText: '', asHtmlID: elId, singleEntry: false, anonymousEntry: true, url: "/_vti_bin/xpointbase/ProjectService.svc/Projects",
        contentTypes: "", preFill: prefillVls, isProject: true, selectedItemProp: "Name", showItemProp: "FormattedHtml", searchObjProps: "Name",
        selectedValuesProp: "FormattedVal", retrieveComplete: function (data) {
            var newData = $.parseJSON(data.GetProjectsResult);
            return newData;
        }
    }, suggestOpts);
    setTimeout(function () {
        elJ.autoSuggest(suggestOpts.url, suggestOpts);
    }, 300);
}

function pplBeforeSubmit(postdata, formid, fieldNames, requiredFields) {
    var fNames = fieldNames.split(",");
    var fldsToChks = new Array();
    if ($.trim(requiredFields)) {
        fldsToChks = requiredFields.split(',');
    }
    var status = true, message = "";
    $(fNames).each(function (i) {
        var fieldName = fNames[i];
        if ($.trim(fieldName)) {
            var elem = $('[name=' + fieldName + ']', $(formid));
            var valElem = $('[id^=as-values-' + elem.attr('id') + ']', $(formid));
            var elemVal = valElem.val() + elem.val();
            /*if (fldsToChks.length > 0 && $.inArray(fieldName, fldsToChks) > -1) {
                if ($.trim(elemVal.replace(/,/g, "")).length == 0) {
                    var tr = $(elem.parents("tr").get(0));
                    var td = tr.find('td:eq(0)');
                    status = false;
                    message = $(td).text().replace("*", "") + ": " + jQuery.jgrid.edit.msg.required;
                    return;
                }
            }*/
            postdata[fieldName] = elemVal;
        }
    });
    return [status, message, ''];
}