var filterRules = [];
function getQueryStrings() {
  var assoc = {};
  var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
  var queryString = location.search.substring(1);
  var keyValues = queryString.split('&');

  for (var i = 0; i < keyValues.length; i++) {
    var key = keyValues[i].split('=');
    if (key.length > 1) {
      assoc[decode(key[0]).toLowerCase()] = decode(key[1]);
    }
  }
  return assoc;
}
(function ($) {
  // $.xpreports = $.xpreports || {};

  $.xpreports = {
    defaults: {
      baseUrl: '',
      keyVariable: "trackerID",
      keyValue: "",
      reportConfig: [], //{ id:, title:'', frms:[{frmId:, displayName:''}}
      iconUrl: '',
      modalId: 'reportModalId',
      title: 'Generate Document',
      label: 'Document Type',
      notifyMsg:'Your document is on its way, it may take a few minutes to download....',
      exportBtnId:'exportBtnId',
      formatterLabel: '',
      needImage: true,
      param1: false,
      param2: "/_layouts/IImpact.Web/LifeCycleService.asmx/GetReportsConfig"  //get url
    },
    methods: {
      generateReport: function (baseUrl, reportId, keyVariable, keyValue, frmId,reportUrl,siteUrl) {
      var url ='';
      siteUrl = window.location.origin;
        if(reportUrl!= undefined)
        {
        url= reportUrl+"?"+keyVariable+"="+keyValue+"&reportID="+reportId;
        }
        else
        {
        url = $.xpreports.methods.prepareUrl(baseUrl, reportId, keyVariable, keyValue, frmId);
        }
        //        var opener = window.open(url, "generateReport");
        //        opener.close();
        var iframe = $("#myframe");
        if (iframe.length > 0) { iframe.remove(); }
        var element = document.createElement("iframe");
        element.setAttribute('id', 'myframe');
        element.setAttribute('src', url);
        element.style.display = "none";
        document.body.appendChild(element);
      },
      prepareUrl: function (baseUrl, reportId, keyVariable, keyValue, frmId) {
        var dynamicFilterQueryBuilder="";
      if(filterRules.length>0 && $("#IsFiltered")[0].checked)
      {
      for(var i=0;i<filterRules.length;i++)
      {
       dynamicFilterQueryBuilder+="&~data"+i+"="+filterRules[i].data+"&field"+i+"="+filterRules[i].field+"&op"+i+"="+filterRules[i].op+"";
      }
      }
        return baseUrl + "?reportID=" + reportId + "&" + keyVariable + "=" + keyValue + "&frmID=" + frmId + dynamicFilterQueryBuilder;
      },
      getConfig: function (opts) {
        var key = opts.keyVariable.toLowerCase();
        var keyVal = getQueryStrings()[key];
        var ajaxOpts = {
          contentType: "application/json; charset=utf-8",
          type: "post",
          dataType: "json",
          async: false,
          data: "{" + key + ":" + keyVal + "}",
          url: opts.param2,
          success: function (datap, st) {
            var data = datap.d;
            var config = eval("(" + data + ")");
            opts = $.extend(opts, config);
          }
        };
        $.ajax(ajaxOpts);
      },
      prepareModal: function (opts) {
        var elem = this;
        var modalDiv = $("#" + opts.modalId);
        if (modalDiv.length > 0) {
          modalDiv.dialog("open");
        }
        else {
          var body = $('body');
          var modalDiv = $("<div id='" + opts.modalId + "' style='height:auto;width:auto' title='" + opts.title + "' />").appendTo(body);
          var notifyMsg= $('</p>')
                          .html($.xpreports.defaults.notifyMsg)
                          .attr('style','display:none;')
                          .appendTo(modalDiv);
          var container = $("<div />").addClass("xp-FloatLeft xp-Width xp-MarginTop-25")
                           .appendTo(modalDiv);
          container.append("<div class='xp-FloatLeft xp-Width30 xp-FontBold'>" + opts.label + "</div>");
          var selectBox = $("<select class='xp-Width90'/>");
          var selectContainer = $("<div />").addClass("xp-FloatLeft xp-Width70")
                                 .append(selectBox)
                                 .appendTo(container);
          $(opts.reportConfig).each(function () {
          var config=this;
          window.reportlevel= config.reportLevel;
          });
          if(reportlevel=="Portfolio")
          {
          container.append("<div class='xp-FontBold' style='margin-Top:15%'>Do you want export only filtered projects <input type='checkBox' id='IsFiltered'/></div>");
          }
          $(opts.reportConfig).each(function () {
            var config = this;
            var option = $("<option/>")
                          .text(config.title)
                          .val(config.id);
            selectBox.append(option);
          });
          var frmContainer = $("<div />").hide().addClass("xp-FloatLeft xp-Width xp-MarginTop-5")
                           .appendTo(modalDiv);
          frmContainer.append("<div class='xp-FloatLeft xp-Width30 xp-FontBold'>" + opts.formatterLabel + "</div>");
          var frmSelectBox = $("<select class='xp-Width90'/>");
          var frmSelectContainer = $("<div />").addClass("xp-FloatLeft xp-Width70")
                                 .append(frmSelectBox)
                                 .appendTo(frmContainer);
          selectBox.change(function () {
            var val = $(this).val();
            var results = $.grep(opts.reportConfig, function (e) { return e.id == val; });
            frmSelectBox.children().remove();
            results = results[0].frms;
            $(results).each(function () {
              var frm = this;
              var option = $("<option/>")
                          .val(frm.frmId)
                          .text(frm.displayName);
              frmSelectBox.append(option);
            });
          });
          var val = selectBox.val();
          var results = $.grep(opts.reportConfig, function (e) { return e.id == val; });
          results = results[0].frms;
          $(results).each(function () {
            var frm = this;
            var option = $("<option/>")
                          .val(frm.frmId)
                          .text(frm.displayName);
            frmSelectBox.append(option);
          });
          modalDiv.dialog({
            bgiframe: true,
            modal: true,
            buttons: [{
            text:'Export',
            id:$.xpreports.defaults.exportBtnId,
            click: function () {
                $('#'+$.xpreports.defaults.exportBtnId).hide();            
                container.hide();
                notifyMsg.show();              
                var reportId = selectBox.val();
                var frmID = frmSelectBox.val();
                var reportUrl='';
                /*This code is writen for Report Progress bar functionality*/
                var loader=$("#relayAjaxLoading");
                if(loader.length>0){ loader.remove(); }
                $loadingProgressBar = $("<div id='relayAjaxLoading'><div class='xp-Width xp-TextAlignCenter xp-Height100' style='top: 10%;left: 0px;margin-top:10px;'><img src='/_layouts/Images/XPointBase/Loader.gif';z-index:999999999;text-align:center;'/></div></div>");
                notifyMsg.show().append($loadingProgressBar);              
                /*This code is for to hide Progress of report loading*/
                $.ajax({
                    xhr: function() {
                    var xhr = new window.XMLHttpRequest();
                    //Upload progress
                    xhr.upload.addEventListener("relayAjaxLoading", function(evt) {
                    if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    //Do something with upload progress
                    console.log(percentComplete);
                    }
                   }, false);
                 return xhr;
                },
                type: 'POST',
                url: "/",
                data: {},
                success: function(data) {
                $('#relayajaxloading').hide();
                    //modalDiv.dialog("close");
                modalDiv.remove();
                }
              });
                $(opts.reportConfig).each(function () {
                  var config=this;
                  if(config.id==reportId)
                  {
                    reportUrl=config.frms[0].reportUrl;
                  }
                  });
                $.xpreports.methods.generateReport(opts.baseUrl, reportId, opts.keyVariable, opts.keyValue, frmID,reportUrl);
              /*End of Progress bar functionality*/
              }
            }],
            close:function(){
              container.show();
              notifyMsg.hide();
              $('#'+$.xpreports.defaults.exportBtnId).show();
            }
          });
        }
        $(".ui-widget-overlay").css('z-index', '999');
        modalDiv.css('z-index', '1111');
      },
      init: function (opts) {
        return this.each(function () {
          var jElem = this;
          var elem = $(jElem);
          if (opts.param1 === "True") {
            $.xpreports.methods.getConfig(opts);
          }
          if (opts.needImage === true) {
            var imgDiv = $("<div title='" + opts.title + "'/>").addClass(opts.iconUrl).appendTo(elem);
            imgDiv.click(function () {
              $.xpreports.methods.prepareModal.call(elem, opts);
            });
          }
          else {
            $.xpreports.methods.prepareModal.call(elem, opts);
          }
        });
      }
    }
  };
  $.fn.xpreports = function (options) {
    //logic  for calling method which are under notification nameSpace
    if (!this || this.length == 0) return;
    var elem = $(this);
    if (typeof (options) == "object") {
      options = $.extend({}, $.xpreports.defaults, options);
      elem.notifyOpts = options;
      $.xpreports.methods.init.apply(this, $.makeArray(options));
    }
    if ($.xpreports.methods[options]) {
      var reportsOpts = elem.reportsOpts;
      reportsOpts = $.extend(reportsOpts, Array.prototype.slice.call(arguments, 1));
      return $.xpreports.methods[options].call(elem, reportsOpts[0]);
    }
  }
})($);