 $(document).ready(function () {
  $.fn.fmatter.peoplesuggest =
   function (cellvalue, options, rowdata) {
     if (cellvalue && $.trim(cellvalue).length > 0) {
       var html = new Array();
       var pplAttr = new Array();
       var vals = $.parseJSON(cellvalue);
       if (vals != null) {
         $(vals).each(function () {
           var val = this;
           if (val) {
             if (val.Id > 0 && val.EncodedLoginName != null) {
               html.push("<a href='" + options.colModel.profilePrefixUrl + val.EncodedLoginName + "'>" + val.Name + "</a>");
             }
             else {
               html.push(val.Name);
             }
             pplAttr.push("{ FormattedVal:'" + val.FormattedVal + "', Name:'" + val.Name + "'}");
           }

         });
         return "<div class='pplSuggestion' pplSuggestion=\"[" + pplAttr.join(",") + "]\">" + html.join(",") + "</div>";
       }
       return "";
     }
     return $.fn.fmatter.defaultFormat(cellvalue, options, rowdata);
   };

  jQuery.extend($.fn.fmatter.peoplesuggest, {
    unformat: function (cellvalue, options) {
      var pplSuggDiv = $(".pplSuggestion", $(cellvalue));
      return pplSuggDiv.attr("pplSuggestion");
    }
  });
});
function initPeopleSuggest(el, vl, suggestOpts) {
  var prefillVls = [{ Name: "", FormattedVal: ""}];
  if (vl) {
    prefillVls = eval("(" + vl + ")");
  }
  var elJ = $(el);
  elJ.val('');
  var elId = elJ.attr('id');
  suggestOpts = $.extend({ startText:'', asHtmlID: elId, singleEntry: false, anonymousEntry:true, url: "/_vti_bin/xpointbase/ProfileService.svc/Users",
    groupUrl: "/_vti_bin/xpointbase/ProfileService.svc/GroupUsers", preFill: prefillVls, selectedItemProp: "Name", showItemProp: "FormattedHtml", searchObjProps: "Name",
    selectedValuesProp: "FormattedVal", retrieveComplete: function (data) {
      var newData = $.parseJSON(data.GetUsersResult);
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
      if (fldsToChks.length > 0 && $.inArray(fieldName, fldsToChks) > -1) {
        if ($.trim(elemVal.replace(/,/g, "")).length == 0) {
          var tr = $(elem.parents("tr").get(0));
          var td = tr.find('td:eq(0)');
          status = false;
          message = $(td).text().replace("*", "") + ": " + jQuery.jgrid.edit.msg.required;
          return;
        }
      }
      postdata[fieldName] = elemVal;
    }
  });
  return [status, message, ''];
}