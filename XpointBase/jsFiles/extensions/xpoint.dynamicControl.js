(function ($) {

  $.widget("ui.dynamicContent", {
    options: {
      template: [],
      headerCSS: '',
      addText: 'Add',
      contentCSS: '',
      headerWidth: "100%",
      contentWidth: "100%",
      noRowToStart: true,
      ids: [],
      rowCSS: '',
      rowWidth: "100%",
      actions: []
    },
    _cellWidth: function () {
      var lgt = this.options.template.length > 0 ? this.options.template.length : 1;
      return (100 / lgt-0.5);
    },
    _create: function () {
      this.element.empty();
      var elem = this.element;
      // elem.options = this.options;
      // elem.cellWidth = this._cellWidth;
      this.dynamicHeader = $("<div style='display:none'/>")
                         .addClass(this.options.headerCSS)
                         .width(this.options.headerWidth)
                         .appendTo(this.element);
      this.dynamicContent = $("<div  class='dynamicContent xp-FloatLeft'  />")
                                  .addClass(this.options.contentCSS)
                                  .width(this.options.contentWidth)
                                  .appendTo(this.element);
      elem.dynamicContent('addRow', true);
      if (this.options.noRowToStart === false) {
        this.linkObj.trigger('click');
      }
      var afLinkClk = this.options.afLinkClk;
      var linkDiv = $("<div class='xp-FloatLeft xp-CvAddButton ' />").appendTo(this.dynamicContent);
      this.linkObj = $("<a class='xp-HoverCursor' >" + this.options.addText + "</a>")
                           .click(function () {
                             var row = elem.dynamicContent('addRow');
                             if (afLinkClk && $.isFunction(afLinkClk)) {
                               afLinkClk.apply(elem, [row]);
                             }
                           })
                           .appendTo(linkDiv);
    },
    updateOptions: function (options) {
      $.extend(this.options, options);
    },
    deleteRow: function (row) {
      if (row) {
        var tmpArr = this.options.template;
        var rowId = row.attr('rowId');
        row.remove();
        $(tmpArr).each(function () {
          var tmp = this;
          if (tmp) {
            var elems = tmp.elems;
            if (elems && elems[rowId] != null) {
              tmp.elems.splice(rowId);
            }
          }
        });
      }
      this.resetData();
    },
    _getValue: function () {
      var elem = $(this);
      return elem ? elem.val() : null;
    },
    value: function () {
      var tmpArr = this.options.template;
      var tmpValFn = this._getValue;
      var valArr = {};
      $(tmpArr).each(function (j) {
        var tmp = tmpArr[j];
        for (key in tmp.elems) {
          var strKey = key.toString();
          var row = tmp.elems[key];
          if ($.isArray(row)) {
            for (subKey in row) {
              var tmpElem = row[subKey];
              if (tmpElem) {
                if (valArr[strKey] == null) {
                  valArr[strKey] = new Array();
                }
                var valFn = (tmp.value && $.isFunction(tmp.value)) ? tmp.value : tmpValFn;
                var rtVal = valFn.apply(tmpElem);
                if (rtVal != null && $.trim(rtVal).length > 0) {
                  valArr[strKey].push(rtVal);
                }
              }
            }
          }
        }
      });
      return valArr;
    },
    resetData: function (removeElem) {
      var tmpArr = this.options.template;
      if (removeElem) {
        var elem = $(".rowControlContainer", this.element);
        elem.remove();
      }
      $(tmpArr).each(function (j) {
        var tmp = tmpArr[j];
        tmpArr[j].elems = null;
      });
    },
    addRow: function (addHeader, opts) {
      var elem = $(".dynamicContent", this.element);
      var id = this.options.ids.length + 1;
      var notHeader = (addHeader == null);
      this.options.ids.push(id);
      var baseId = elem.attr('id');
      var rowId = baseId + "_row_" + id;
      var rowParent = $("<div   id='" + rowId + "' class='rowContainer xp-FloatLeft' rowId='" + id + "' style='position:relative;width:88%'/>")
                       .appendTo(elem)
                      .addClass(this.options.rowCSS);
      var row = $("<div class='xp-FloatLeft' />")
                      .width(this.options.rowWidth)
                      .appendTo(rowParent);
      var tmpArr = this.options.template;
      var cellWidth = this._cellWidth();
      var bfAd = null, afAd = null;
      if (opts) {
        bfAd = (opts.beforeAdded && $.isFunction(opts.beforeAdded)) ? opts.beforeAdded : null;
        afAd = (opts.afterAdded && $.isFunction(opts.afterAdded)) ? opts.afterAdded : null;
      }
      $(tmpArr).each(function (cell) {
      	var tmp = tmpArr[cell], tmpElem = $("<div class='xp-FloatLeft xp-DynamicInput' cellId='" + cell + "' />");
      	$('.xp-DynamicInput>select').wrap("<label class='xp-CustomLabel'/>");
        if (tmp) {
          if (addHeader === true) {
            tmpElem
            .append(tmp.headerText);
          }
          else {
            rowParent.addClass("rowControlContainer");
            rowParent.css('width', '92%')
            if (!tmp.elems) {
              tmp.elems = new Array();
            }
            if (!$.isArray(tmp.elems[id])) {
              tmp.elems[id] = new Array();
            }
            var elemId = rowId + "_inputelem_" + cell;
            if (tmp.element instanceof jQuery) {
              var clonedObj = tmp.element.clone(true);
              clonedObj.attr('id', elemId);
              if (bfAd) {
                bfAd(clonedObj, cell);
              }
              tmpElem.append(clonedObj);
              tmp.elems[id][cell] = clonedObj;
              if (afAd) {
                afAd(clonedObj, cell);
              }
            }
            else {
              var obj = $(tmp.element);
              obj.attr('id', elemId);
              if (bfAd) {
                bfAd(obj, cell);
              }
              tmpElem.append(obj);
              tmp.elems[id][cell] = obj;
              if (afAd) {
                afAd(obj, cell);
              }
            }
          }
          tmpElem.width(cellWidth + "%");
          tmpElem.attr('id', rowId + "_elem_" + cell);
          row.append(tmpElem);
          if (tmp.afterAdded && $.isFunction(tmp.afterAdded)) {
            tmp.afterAdded.apply(tmpElem, $.makeArray({ parentRow: row }));
          }
          if (tmp.events && $.isArray(tmp.events)) {
            for (eventKey in tmp.events) {
              tmpElem.bind(eventKey, tmp.events[eventKey]);
            }
          }
        }
      });
      if (this.options.actions && this.options.actions.length > 0 && addHeader == null) {
        var actionContainer = $("<div />")
                              .addClass("menuDiv")
                              .appendTo(rowParent);
        var opts = this.options;
        var actions = opts.actions;
        var ul = $("<ul/>");
        $(actions).each(function (k) {
          var action = actions[k];
          if (action) {
            var actionElem = $("<li class='  actionLi' />")
                                   .append("<span class='ui-secondarytabclr xp-DisplayBlock ui-corner-all  xp-Padding-4'>delete</span>")
                                   .appendTo(actionContainer)
                                   .click(function () {
                                     action.onClick.apply(rowParent, [opts]);
                                   });
          }
        });
      }
      return row;
    }
  });

})($);