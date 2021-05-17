/******************************************************************************************/
/* 
* This files takes care of all the  extensions made to jqgrid inorder to make the plugin compatible with
* xpoint
*/
/*methods to extend to jqgrid*/
$.extend($.jgrid, {
  getColNames: function (p) {
    var modelNames = new Array();
    $(p.colModel).each(function (i) {
      modelNames[i] = this.name;
    });
    return modelNames.join("|");
  }
}); /********end of - methods to extend*********/

/*************************Start of extensions made to parameters ****************************/
var extendDefaults = {
  enableEmail: false,
  enableViews: false,
  viewsurl: "",
  viewscolumnsurl: "",
  saveviewsurl: "",
  tmpid: -1,
  datatype: "json",
  mtype: "POST",
  reportquerytype: "",
  mid: -1,
  isactivity: false,
  selview: "Team",
  listname: "na",
  phasebased: false,
  radiobutton: true,
  imgurl: "",
  imgclass: "",
  datatype: 'json',
  loadui: 'block',
  ajaxGridOptions: {
    contentType: "application/json; charset=utf-8"
  },
  prmNames: {
    mid: "mid",
    currenturl: "currenturl",
    tmpid: "tmpid",
    isactivity: "isactivity",
    selview: "selview",
    reportquerytype: "reportquerytype"
  },
  serializeGridData: function (postData) {
    var gdata, prm = {};
    var ts = this;
    prm[ts.p.prmNames.mid] = ts.p.mid;
    prm[ts.p.prmNames.reportquerytype] = ts.p.reportquerytype;
    prm[ts.p.prmNames.currenturl] = location.href;
    prm[ts.p.prmNames.tmpid] = ts.p.tmpid;
    prm[ts.p.prmNames.selview] = ts.p.postData["selview"] != null ? ts.p.postData["selview"] : ts.p.selview;
    prm[ts.p.prmNames.isactivity] = ts.p.isactivity;
    prm["listname"] = ts.p.listname;
    prm["colModel"] = $.jgrid.getColNames(ts.p);
    prm["phasebased"] = ts.p.phasebased;
    prm["loadonce"] = ts.p.loadonce;
    var sdata = {
      'searchdata': $.extend(postData, prm)
    };
    return $.toJSON(sdata);
  },
  jsonReader: {
    root: function (obj) {
      return obj.d.rows;
    },
    page: function (obj) {
      return obj.d.page;
    },
    total: function (obj) {
      return obj.d.total;
    },
    records: function (obj) {
      return obj.d.records;
    }
  }
};
$.jgrid.defaults = $.extend($.jgrid.defaults, extendDefaults);

/************************************end of extensions of parms ******************************/
/************************************extend the ajax options******************/
var extraEdit = {
  closeAfterEdit: true,
  closeAfterAdd: true,
  recreateForm: true,
  ajaxEditOptions: {
    contentType: "application/json"
  },
  serializeEditData: function (data) {
    var t = this.gbox.replace("gbox_", "");
    var $t = $(t)[0];
    var le = 0;
    for (i in data) {
      le = le + 1;
    }
    var coldata = new Array(le - 2);
    var fields = new Array(le - 2);
    le = 0;
    for (i in data) {
      fields[le] = i;
      coldata[le] = data[i];
      if (le == fields.length) break;
      le++;
    }
    gpost = new Object();
    gpost.id = data.id == "_empty" ? "new" : data.id;
    gpost.cells = coldata;
    gpost.fields = fields;
    gpost.mid = $t.p.mid;
    gpost.listname = $t.p.listname;
    return $.toJSON(gpost);
  }

};
$.extend(jQuery.jgrid.edit, extraEdit);
var extraDel = {
  ajaxDelOptions: {
    contentType: "application/json"
  },
  serializeDelData: function (data) {
    var t = this.gbox.replace("gbox_", "");
    var $t = $(t)[0];
    data = $.extend(data, {
      "listname": $t.p.listname
    });
    return $.toJSON(data);
  }
};
$.extend(jQuery.jgrid.del, extraDel); /*********************************************end of ajax options ******************/

/*****************************start of formatters **************************/

function richtTextUtil(val) {
  var value = val === undefined || val === null || val === "" ? "&#160;" : val + "";
  return $.jgrid.htmlDecode(value);
}
$.fn.fmatter.richtext = function (cellval, opts, rwd, act) {
  return richtTextUtil(cellval);
}
/*Custom Formatter for Peoplepicker , this will create data entry with document entry 
* for people picker value
*/

function formatPeoplepickerVal(elem) {
  var datap = {},
    i = 0;
  if (elem.length > 0) {
    var val = elem.val();
    if ($.trim(val)) {
      $.each(val.split(","), function () {
        var currentval = this;
        if (currentval != null && $.trim(currentval).length != 0) {
          var id = currentval.split("!")[0];
          var value = currentval.split("!")[1];
          if (id != null && value != null) {
            datap[i] = {
              "id": id,
              "name": value
            };
            i++;
          }
        }
      });
    }
  }
  return datap;
}
jQuery.extend($.fn.fmatter, {
  peoplepicker1: function (cellvalue, options, rowdata) {
    if (cellvalue && $.trim(cellvalue).length > 0) {
      $.data(document.body, options.colModel.name + options.rowId + "peoplepickerdata", cellvalue);
      var elemhtml = "";
      var firstval = true;
      $.each(cellvalue.split(","), function () {
        var currentval = this;
        if (currentval != null && $.trim(currentval).length != 0) {
          if (!firstval) {
            elemhtml += ", ";
          }
          firstval = false;
          var value = currentval.split("!")[1];
          elemhtml += value;
        }
      });
      return elemhtml;
    } else {
      return $.fn.fmatter.defaultFormat(cellvalue, options, rowdata);
    }
  },
  lcLink: function (cellvalue, options, rowdata) {
    var opts = options.colModel.formatoptions;
    var baseLink = opts.baseLink;
    var id = options.rowId;
    var target = opts.target ? opts.target : "";
    var idElem = opts.idElem ? opts.idElem : "id";
    return "<a href='" + baseLink + "?" + idElem + "=" + id + "' target='" + target + "' class='Tip-LCLinks'>" + cellvalue + "</a>";
  }

});
jQuery.extend($.fn.fmatter.peoplepicker1, {
  unformat: function (cellvalue, options) {
    return $.data(document.body, options.colModel.name + options.rowId + "peoplepickerdata");
  }
});

/********************custom element and value for Richtextbox***************/

function RichtTextElem(value, options) {
  var el = document.createElement("textarea");
  el.value = value;
  setTimeout(function () {
    $(el).RelayRichText($(el).val())
  }, 150);
  return el;
}

function RichTextValue(elem, operation, value) {
  elem.SaveRichtextbox();
  return elem.val();
}

function fixWidth(elem) {
  var grid = elem.get(0);
  if (grid.p.datatype == 'json') {
    var width = grid.p.width;
    if (!$.browser.msie) {
      var sWidth = screen.width;
      if (width > sWidth) {
        elem.setGridWidth((sWidth - 50));
      }
    }
    grid.p.shrinkToFit = false;
  }
}
$.jgrid.extend({

  customgroupingRemove: function (current) {
    return this.each(function () {
      var $t = this;
      if (typeof (current) == 'undefined') {
        current = true;
      }
      $t.p.grouping = false;
      if (current === true) {
        var grp = $t.p.groupingView;
        // show previous hidden groups if they are hidden and weren't removed yet
        for (var i = 0; i < grp.groupField.length; i++) {
          if (!grp.groupColumnShow[i] && grp.visibiltyOnNextGrouping[i]) {
            $($t).jqGrid('showCol', grp.groupField);
          }
        }
        $("tr.jqgroup, tr.jqfoot", "#" + $t.p.id + " tbody:first").remove();
        $("tr.jqgrow:hidden", "#" + $t.p.id + " tbody:first").show();
        $($t).trigger("reloadGrid");
      } else {
        $($t).trigger("reloadGrid");
      }
    });
  }
});
(function ($) {
 $.fn.reportPortfolio = function(opts){
      var gridElem = $(this);
      var gridId = gridElem.attr('id');
      var topPagerDiv = $('#' + gridId + '_toppager')[0]; // "#list_toppager"
        gridElem.jqGrid('navButtonAdd', '#' + gridId + '_toppager_left', {
        caption: "<span class='xp-Icon xp-IconExportDocGrid Tip-ExportDoc' />",
        title: 'Export Report',
        buttonicon: 'NONE',
        onClickButton: function () {
          $(this).xpreports(opts);
        }
      });
      var pgDiv = $(".ui-pg-div", topPagerDiv);
      pgDiv.addClass("xp-PgDiv");
  }
  $.fn.portFolioPager = function (options) {

    return this.each(function () {
      var gridElem = $(this);
      var gridId = gridElem.attr('id');
      var topPagerDiv = $('#' + gridId + '_toppager')[0]; // "#list_toppager"
      //$("#edit_" + gridId + "_top", topPagerDiv).remove(); // "#edit_list_top"
      // $("#del_" + gridId + "_top", topPagerDiv).remove(); // "#del_list_top"
      // $("#search_" + gridId + "_top", topPagerDiv).remove(); // "#search_list_top"
      // $("#refresh_" + gridId + "_top", topPagerDiv).remove(); // "#refresh_list_top"
      var centerDiv = $("#" + gridId + "_toppager_center", topPagerDiv); // "#list_toppager_center"
      var clonedDiv = centerDiv.find("table:first").clone(true);
      centerDiv.empty();
      $("td:nth-child(4)", clonedDiv).remove();
      $("td:last", clonedDiv).remove();
      $("td", clonedDiv).addClass("")
      $("#" + gridId + "_toppager_right", topPagerDiv).append(clonedDiv);
      $(".ui-paging-info", topPagerDiv).remove();
      gridElem.jqGrid('navButtonAdd', '#' + gridId + '_toppager_left', {
        caption: '',
        title: 'Toggle Filter Toolbar',
        buttonicon: 'ui-icon-pin-s',
        onClickButton: function () {
          $(this)[0].toggleToolbar()
        }
      });
      gridElem.jqGrid('navButtonAdd', '#' + gridId + '_toppager_left', {
        caption: '',
        title: 'Clear Search',
        buttonicon: 'ui-icon-refresh',
        onClickButton: function () {
          $(this)[0].clearToolbar()
        }
      });

      gridElem.jqGrid('navButtonAdd', '#' + gridId + '_toppager_left', {
          caption: '',
          title: 'Clear Search',
          buttonicon: 'ui-icon-deactivate',

      });

      gridElem.jqGrid('navButtonAdd', '#' + gridId + '_toppager_left', { // "#list_toppager_left"
        caption: "",
        title: 'Select Columns',
        buttonicon: 'ui-icon-columns',
        onClickButton: function () {
          var nWidth = gridElem.get(0).grid.width;
          gridElem.jqGrid('columnChooser', {
            done: function (perm) {
              if (perm) {
                gridElem.jqGrid("remapColumns", perm, true);
                gridElem.jqGrid("setGridWidth", nWidth);
              }
            }
          });
        }
      });
      var pgDiv = $(".ui-pg-div", topPagerDiv);
      pgDiv.addClass("xp-PgDiv");
    });

  }

})($);