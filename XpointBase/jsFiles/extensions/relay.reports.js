; (function($)
{

  /*This plugin attaches reports config Panel  to create a new config  or edit configuration of current
  /*report config item  Please Note : THIS PLUGIN CAN  ONLY BE USED WITH JqGrid Plugin */
  /*options explaination :
  /* 1. oper  : either 'new' or 'edit' or 'read' will define if the report configuration is in edit mode or new  creation mode */
  /* 2. saveurl :   url of web service where forms data will be sent  */
  /* 3. editurl : url of the webservice to retrieve data of forms*/
  /* 4. configid: retrieved the id of the configuration for which details need to be retrieved*/
  $.fn.reportsConfig = function(options)
  {
    var defaults = {
      oper: 'new',
      geturl: '',
      getchartsurl: '',
      deleteurl: '',
      addurl: '',
      suspendurl: '',
      editurl: '',
      baseid: 'reportconfigbase' + $(this).attr('id'),
      titletext: "Create New Report",
      container: $(this).attr('id'),
      configid: -1

    };
    var paramnames = {
      name: "Name",
      owner: "Owner",
      frequency: "Frequency",
      prepday: "Prepared On",
      remindday: "Remind On",
      pubday: "Publish On",
      charts: "Charts On Report",
      distlist: "Distribute To",
      descrip: "Description",
      save: "Save",
      cancel: "Cancel",
      configid: "configid",
      id: "id",
      asterix: "*"
    };

    var paramids = {
      name: "Title",
      owner: "Owner",
      frequency: "Frequency",
      prepday: "PreparationDate",
      remindday: "ReminderDate",
      pubday: "PublishingDate",
      charts: "ChartsOnReport",
      distlist: "DistributionList",
      descrip: "Description",
      save: "Save",
      cancel: "Cancel"
    };

    var cssnames = {
      OuterPanel: "xp-MainDiv ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"
    }

    /*extend the defaults to options*/
    options = $.extend(defaults, options);
    $basecontainer = $("#" + options.baseid);
    var preColData = new Array();
    var $baseheader;
    var $basebody;
    var configData = new Array();
    var $basetable, $baseinnertable, $save, $cancel;
    var frequencydata = [{ name: 'Weekly', value: 'Weekly' },
        { name: 'Monthly', value: 'Monthly' },
        { name: 'Fortnightly', value: 'Fortnightly' },
        { name: 'Quarterly', value: 'Quarterly' },
        { name: 'HalfYearly', value: 'HalfYearly' }
        ];
    function getUpdatedChartData()
    {
      var chartColData = {};
      var resultColData = {};
      var colData = $("#" + paramids.charts).getGridData();
      if (options.oper === 'edit')
      {
        $.each(preColData, function(i)
        {

          idx = this.id;
          if (colData[idx] != null)
          {
            resultColData = {};
            resultColData[paramnames.id] = idx;
            resultColData["Type"] = colData[idx].Type;
            resultColData["Heading"] = colData[idx].Heading;
            resultColData["Owner"] = colData[idx].Owner;
            resultColData["Location"] = colData[idx].Location;
            resultColData["Function"] = colData[idx].Function;
            resultColData["Department"] = colData[idx].Department;
            resultColData["opstatus"] = "edit";
            chartColData[i] = resultColData;
          }
          else
          {
            resultColData = {};
            resultColData[paramnames.id] = idx;
            resultColData["opstatus"] = "del";
            chartColData[i] = resultColData;
          }

        });
        var ids = $("#" + paramids.charts).getDataIDs();
        $.each(ids, function(i)
        {
          idx = ids[i];
          found = false;
          $.each(preColData, function()
          {
            preid = this.id;
            if (idx == preid)
            {
              found = true;
            }
          });
          if (!found)
          {
            resultColData = {};
            resultColData[paramnames.id] = idx;
            resultColData["Type"] = colData[idx].Type;
            resultColData["Heading"] = colData[idx].Heading;
            resultColData["Owner"] = colData[idx].Owner;
            resultColData["Location"] = colData[idx].Location;
            resultColData["Function"] = colData[idx].Function;
            resultColData["Department"] = colData[idx].Department;
            resultColData["opstatus"] = "new";
            chartColData[idx] = resultColData;
          }
        });
      }
      else
      {
        if (options.oper === 'new')
        {
          var preid = 1;
          $.each(colData, function(t)
          {
            if (colData[preid] != null)
            {
              resultColData = {};
              resultColData[paramnames.id] = preid;
              resultColData["Type"] = colData[preid].Type;
              resultColData["Heading"] = colData[preid].Heading;
              resultColData["Owner"] = colData[preid].Owner;
              resultColData["Location"] = colData[preid].Location;
              resultColData["Function"] = colData[preid].Function;
              resultColData["Department"] = colData[preid].Department;
              resultColData["opstatus"] = "new";
              chartColData[preid] = resultColData;
              preid++;
            }
          });
        }
      }
      return chartColData;
    }
    function DateValidationConfigs()
    {

      var today = new Date();
      $("#" + options.baseid + paramids.prepday).keypress(function()
      {
        return false;
      });
      $("#" + options.baseid + paramids.pubday).keypress(function()
      {
        return false;
      });
      $("#" + options.baseid + paramids.remindday).keypress(function()
      {
        return false;
      });
      var pubDate = $("#" + options.baseid + paramids.pubday).val();
      var remindDate = $("#" + options.baseid + paramids.remindday).val();
      $("#" + options.baseid + paramids.prepday).datepicker({ dateFormat:'M dd, yy', beforeShow: function()
      {
        pubDate = $("#" + options.baseid + paramids.pubday).val();
        if (pubDate != "")
        {
          var minimumDate = new Date(pubDate);
          return { minDate: today, maxDate: minimumDate };
        }
        else
        {
          return { minDate: today };
        }
      }
      });
      $("#" + options.baseid + paramids.remindday).datepicker({ dateFormat:'M dd, yy', beforeShow: function()
      {
        var prepday = $("#" + options.baseid + paramids.prepday).val();
        if (prepday != "")
        {
          var date = new Date(prepday);
          date.setDate(date.getDate() + 1);
          var vmaxdate = new Date(prepday);
          if (pubDate == "")
          {
            switch ($("#" + options.baseid + paramids.frequency).val())
            {
              case "Weekly":
                vmaxdate.setDate(vmaxdate.getDate() + 6);
                break;
              case "Monthly":
                vmaxdate.setMonth(vmaxdate.getMonth() + 1);
                vmaxdate.setDate(vmaxdate.getDate() - 1);
                break;
              case "Fortnightly":
                vmaxdate.setDate(vmaxdate.getDate() + 14);
                break;
              case "Quarterly":
                vmaxdate.setMonth(vmaxdate.getMonth() + 3);
                vmaxdate.setDate(vmaxdate.getDate() - 1);
                break;
              case "HalfYearly":
                vmaxdate.setMonth(vmaxdate.getMonth() + 6);
                vmaxdate.setDate(vmaxdate.getDate() - 1);
                break;
            }
          }
          else
          {
            vmaxdate = new Date(pubDate);
          }
          return { minDate: date, maxDate: vmaxdate };
        }
        else
        {
          return { minDate: today };
        }
      }
      });
      $("#" + options.baseid + paramids.pubday).datepicker({ dateFormat:'M dd, yy', beforeShow: function()
      {
        var prepday = $("#" + options.baseid + paramids.prepday).val();
        if (prepday != "")
        {
          var date = new Date(prepday);
          date.setDate(date.getDate() + 1);
          var vmaxdate = new Date(prepday);

          switch ($("#" + options.baseid + paramids.frequency).val())
          {
            case "Weekly":
              vmaxdate.setDate(vmaxdate.getDate() + 6);
              break;
            case "Monthly":
              vmaxdate.setMonth(vmaxdate.getMonth() + 1);
              vmaxdate.setDate(vmaxdate.getDate() - 1);
              break;
            case "Fortnightly":
              vmaxdate.setDate(vmaxdate.getDate() + 14);
              break;
            case "Quarterly":
              vmaxdate.setMonth(vmaxdate.getMonth() + 3);
              vmaxdate.setDate(vmaxdate.getDate() - 1);
              break;
            case "HalfYearly":
              vmaxdate.setMonth(vmaxdate.getMonth() + 6);
              vmaxdate.setDate(vmaxdate.getDate() - 1);
              break;
          }
          return { minDate: date, maxDate: vmaxdate };
        }
        else
        {
          return { minDate: today };
        }
      }
      });

    }
    function ValidateControls(chartdata)
    {
      var validated = true;
      $(".xp-ErrorMsg").hide();
      $(".xp-ErrorMsg").removeClass('xp-ErrorMsg');
      if ($("#" + options.baseid + paramids.name).val() == "")
      {
        validated = false;
        var nameeror = $("#" + options.baseid + paramids.name + "error");
        nameeror.html("Cannot be blank");
        nameeror.addClass('xp-ErrorMsg');
        nameeror.show();
      }
      if ($("#" + options.baseid + paramids.descrip).val() == "")
      {
        validated = false;
        var deserror = $("#" + options.baseid + paramids.descrip + "error");
        deserror.html("Cannot be blank");
        deserror.addClass('xp-ErrorMsg');
        deserror.show();
      }
      if ($("#" + options.baseid + paramids.distlist).val() == "")
      {
        validated = false;
        var diseror = $("#" + options.baseid + paramids.distlist + "error");
        diseror.html("Cannot be blank");
        diseror.addClass('xp-ErrorMsg');
        diseror.show();
      }
      if ($("#" + options.baseid + paramids.frequency).val() == "")
      {
        validated = false;
        var frerror = $("#" + options.baseid + paramids.frequency + "error");
        frerror.html("Cannot be blank");
        frerror.addClass('xp-ErrorMsg');
        frerror.show();
      }
      if ($("#" + options.baseid + paramids.owner).val() == "")
      {
        validated = false;
        var ownererr = $("#" + options.baseid + paramids.owner + "error");
        ownererr.html("Cannot be blank");
        ownererr.addClass('xp-ErrorMsg');
        ownererr.show();
      }
      if ($("#" + options.baseid + paramids.pubday).val() == "")
      {
        validated = false;
        var puberror = $("#" + options.baseid + paramids.pubday + "error");
        puberror.html("Cannot be blank");
        puberror.addClass('xp-ErrorMsg');
        puberror.show();
      }
      if ($("#" + options.baseid + paramids.prepday).val() == "")
      {
        validated = false;
        var preerror = $("#" + options.baseid + paramids.prepday + "error");
        preerror.html("Cannot be blank");
        preerror.addClass('xp-ErrorMsg');
        preerror.show();
      }
      if ($("#" + options.baseid + paramids.remindday).val() == "")
      {
        validated = false;
        var remerror = $("#" + options.baseid + paramids.remindday + "error");
        remerror.html("Cannot be blank");
        remerror.addClass('xp-ErrorMsg');
        remerror.show();
      }
      var chartcount = 0;
      $.each(chartdata, function()
      {
        chartcount = chartcount + 1;
      });
      if (chartcount == 0)
      {
        validated = false;
        var charterror = $("#" + options.baseid + paramids.charts + "error");
        charterror.html("Cannot be blank");
        charterror.addClass('xp-ErrorMsg');
        charterror.show();
      }
      return validated;
    }
    function GetConfigFormData()
    {
      var formdata = {};
      formdata[paramids.name] = $("#" + options.baseid + paramids.name).val();
      formdata[paramids.descrip] = $("#" + options.baseid + paramids.descrip).val();
      formdata[paramids.distlist] = $("#" + options.baseid + paramids.distlist).val();
      formdata[paramids.frequency] = $("#" + options.baseid + paramids.frequency).val();
      formdata[paramids.owner] = $("#" + options.baseid + paramids.owner).val();
      formdata[paramids.pubday] = $("#" + options.baseid + paramids.pubday).val();
      formdata[paramids.prepday] = $("#" + options.baseid + paramids.prepday).val();
      formdata[paramids.remindday] = $("#" + options.baseid + paramids.remindday).val();
      return formdata;
    }
    function CreateEditContainer()
    {
      if ($basecontainer.length === 0)
      {
        $basecontainer = $("<div id='" + options.baseid + "' class='" + cssnames.OuterPanel + "' style='width:75%'>");
        $baseheader = $("<div class='xp-MainHeader'><table width='100%' class='ui-widget-header ui-corner-all'><tr><td style='padding:4px'><div class='ui-widget-header'><div  class='xp-FloatLeft;'><img src='/_layouts/images/XPointBase/reports.png'/></div><div class='xp-FloatLeft;' style='padding:3px;'>Reports Configuration</div></div></td></tr></table></div>");
        $basecontainer.append($baseheader);
        $basebody = $("<div class='xp-MainContent'/>");
        $basetable = $("<table border='0' cellspacing='0' cellpadding='15' width='100%' id='" + options.baseid + "table'>");
        $tr = $("<tr/>");
        /*add name */
        $tr.append($("<td style='width:5%' class='xp-FontBold'>").append(paramnames.name).append("<span class='xp-Error'>" + paramnames.asterix + "</span>"));
        $tr.append($("<td colspan='5' style='' id='" + options.baseid + paramids.name + "td'>").append("<input type='text'  autocomplete='off' class='xp-TxtBox xp-Width60' id='" + options.baseid + paramids.name + "'/><div id='" + options.baseid + paramids.name + "error' class='xp-FloatLeft xp-Width60' style='display:none;'/>"));
        $basetable.append($tr);

        $tr = $("<tr/>");
        /*add Owner */
        $tr.append($("<td style='' class='xp-FontBold'>").append(paramnames.owner).append("<span class='xp-Error'>" + paramnames.asterix + "</span>"));
        $tr.append($("<td colspan='5'  id='" + options.baseid + paramids.owner + "td'>").append("<input class='reportpeople' autocomplete='off' type='text' id='" + options.baseid + paramids.owner + "'/><div id='" + options.baseid + paramids.owner + "error' class='xp-FloatLeft' style='display:none;width:25%;'/>"));
        $basetable.append($tr);

        $tr = $("<tr/>");
        /*add description */
        $tr.append($("<td style='vertical-align:top' class='xp-FontBold'>").append(paramnames.descrip).append("<span class='xp-Error'>" + paramnames.asterix + "</span>"));
        $tr.append($("<td colspan='5'  id='" + options.baseid + paramids.descrip + "td'>").append("<textarea class='xp-ReportsMultiText' id='" + options.baseid + paramids.descrip + "'/><div id='" + options.baseid + paramids.descrip + "error' class='xp-FloatLeft xp-Width70' style='display:none;'/>"));
        $basetable.append($tr);

        $tr = $("<tr/>");
        /*add frequency  */
        $tr.append($("<td style='vertical-align:top' class='xp-FontBold'>").append(paramnames.frequency).append("<span class='xp-Error'>" + paramnames.asterix + "</span>"));
        fieldhtml = "<select id='" + options.baseid + paramids.frequency + "' style='reportddl' >";
        $.each(frequencydata, function(j)
        {
          fieldhtml += "<option value='" + this.value + "'>" + this.name + "</option>";
        });
        fieldhtml += "</select><div id='" + options.baseid + paramids.frequency + "error' style='display:none'/>";
        $tr.append($("<td colspan='5' id='" + options.baseid + paramids.frequency + "td'>").append(fieldhtml));
        $basetable.append($tr);

        $tr = $("<tr>");
        /*add Preparation Date */
        $tr.append($("<td style='vertical-align:top;' class='xp-FontBold'>").append(paramnames.prepday).append("<span class='xp-Error'>" + paramnames.asterix + "</span>"));
        $tr.append($("<td width='15%' id='" + options.baseid + paramids.prepday + "td'>").append("<input type='text' autocomplete='off' class='reportdatepick' id='" + options.baseid + paramids.prepday + "'/><div id='" + options.baseid + paramids.prepday + "error' style='display:none'/>"));
        $basetable.append($tr);

        //$tr = $("<tr/>");
        /*add reminder  Date */
        $tr.append($("<td width='10%' class='xp-FontBold' style='white-space:nowrap;'>").append(paramnames.remindday).append("<span class='xp-Error'>" + paramnames.asterix + "</span>"));
        $tr.append($("<td width='15%' id='" + options.baseid + paramids.remindday + "td'>").append("<input class='reportdatepick' autocomplete='off' autocomplete='off' type='text' id='" + options.baseid + paramids.remindday + "'/><div id='" + options.baseid + paramids.remindday + "error' style='display:none'/>"));
        $basetable.append($tr);

        //$tr = $("<tr/>");
        /*add publishing   Date */
        $tr.append($("<td width='10%' class='xp-FontBold' style='white-space:nowrap;'>").append(paramnames.pubday).append("<span class='xp-Error'>" + paramnames.asterix + "</span>"));
        $tr.append($("<td width='15%' id='" + options.baseid + paramids.pubday + "td'>").append("<input class='reportdatepick' autocomplete='off' type='text' id='" + options.baseid + paramids.pubday + "'/><div id='" + options.baseid + paramids.pubday + "error' style='display:none'/>"));
        $basetable.append($tr);

        $tr = $("<tr/>");
        /*add charts    */
        $tr.append($("<td style='vertical-align:top; width:12%; white-space:nowrap;' class='xp-FontBold'>").append(paramnames.charts).append("<span class='xp-Error'>" + paramnames.asterix + "</span>"));
        //$basetable.append($tr);
        // $tr = $("<tr/>");
        fieldhtml = "<table id='" + paramids.charts + "' class='scroll' cellpadding='0' cellspacing='0'></table>";
        fieldhtml += "<div id='" + paramids.charts + "pager' class='scroll' style='text-align:center;'></div><div id='" + options.baseid + paramids.charts + "error' class='xp-FloatLeft xp-Width80' style='display:none;'/>";
        $tr.append($("<td colspan='6' style='' id='" + options.baseid + paramids.charts + "td'/>").append(fieldhtml));
        $basetable.append($tr);

        $tr = $("<tr/>");
        /*add Distribution list */
        $tr.append($("<td style='vertical-align:top' class='xp-FontBold'>").append(paramnames.distlist).append("<span class='xp-Error'>" + paramnames.asterix + "</span>"));
        $tr.append($("<td colspan='6' id='" + options.baseid + paramids.distlist + "td' >").append("<textarea class='reportmultipeople' id='" + options.baseid + paramids.distlist + "'/><div id='" + options.baseid + paramids.distlist + "error' class='xp-FloatLeft xp-Width70' style='display:none;'/>"));
        $basetable.append($tr);

        $tr = $("<tr/>");
        /*add save and cancel list */
        $div = $("<div class='xp-Width50' style='margin:auto;'/>");
        $save = $("<input autocomplete='off' id='" + paramids.save + "' type='button' value='" + paramnames.save + "' class='ui-button ui-corner-all'/>");
        $savediv = $("<div class='xp-FloatLeft' style='padding:4px'/>");
        $savediv.append($save);
        $cancel = $("<input autocomplete='off' id='" + paramids.cancel + "' type='button' value='" + paramnames.cancel + "' class='ui-button ui-corner-all'/>");
        $canceldiv = $("<div class='xp-FloatLeft' style='padding:4px'/>");
        $cancel.click(function()
        {
          self.close();
        });
        $canceldiv.append($cancel);
        $div.append($savediv);
        $div.append($canceldiv);
        $tr.append($("<td colspan='6' />").append($div));

        $basetable.append($tr);

        $tr = $("<tr/>");
        /*add Distribution list */
        $tr.append($("<td colspan='6' class='xp-Error'> * indicates mandatory fields </td>"));
        $basetable.append($tr);

        $basebody.append($basetable);
        $basecontainer.append($basebody);
        $("#" + options.container).append($basecontainer);
        $save.click(function()
        {
          gpost = new Object();
          gpost.formdata = GetConfigFormData();
          gpost.chartsdata = getUpdatedChartData();
          gpost.configid = options.configid;
          if (options.oper === 'edit')
          {
            var validated = ValidateControls(gpost.chartsdata);
            if (validated)
            {
              $.ajax({ url: options.editurl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: $.toJSON(gpost),
                success: function(datap, st)
                {
                  var data = datap.d;
                  if (data == "success")
                  {
                    alert("Configuration is Successfully Updated");
                    setTimeout(function()
                    {
                      self.close();
                    }, 2500);
                  }
                  else
                  {
                    alert(data);
                  }
                },
                error: function(xhr, ajaxOptions, thrownError)
                {
                }
              });
            }
          }
          else
          {
            if (options.oper === 'new')
            {
              var validated = ValidateControls(gpost.chartsdata);
              if (validated)
              {
                $.ajax({ url: options.addurl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: $.toJSON(gpost),
                  success: function(datap, st)
                  {
                    var data = datap.d;
                    if (data == "success")
                    {
                      alert("Configuration is Successfully Added");
                      setTimeout(function()
                      {
                        self.close();
                      }, 2500);
                    }
                    else
                    {
                      alert(data);
                    }
                  },
                  error: function(xhr, ajaxOptions, thrownError)
                  {
                  }
                });
              }
            }
          }

        });
        DateValidationConfigs();
        $(".reportpeople").peoplepicker();
        $(".reportmultipeople").peoplepicker({ multivalued: true });

        $("#" + paramids.charts).jqGrid({
          datatype: "local",
          colNames: ['Chart Type', 'Chart Heading', 'Chart Owner', 'Location', 'Function', 'Department'],
          colModel: [
   		{ name: 'Type', width: 100, search: false, edittype: "select", editoptions: { value: "Ideas By Status:Ideas By Status;Ideas By Type:Ideas By Type;Ideas By Owner:Ideas By Owner;Ideas By Region:Ideas By Region;Ideas By Health:Ideas By Health;Ideas By Phase:Ideas By Phase" }, editable: true },
   		{ name: 'Heading', width: 100, search: false, editable: true },
   		{ name: 'Owner', width: 100, search: false, edittype: 'singleperson', editable: true },
   		{ name: 'Location', width: 100, search: false, edittype: 'location', editable: true },
   		{ name: 'Function', width: 100, search: false, edittype: 'function', editable: true },
   		{ name: 'Department', width: 100, search: false, edittype: 'department', editable: true },
   	],
          rowNum: 10,
          rowList: [10, 20, 30],
          imgpath: '/_layouts/XPointBase/themes/xpointbasic/images',
          pager: jQuery("#" + paramids.charts + "pager"),
          sortname: 'id',
          viewrecords: true,
          sortorder: "desc",
          width: "620",
          height: "150"
        }).navGrid("#" + paramids.charts + "pager", { edit: true, add: true, del: true, search: false, refresh: false });
      }
    }

    function CreateReadContainer()
    {
      if ($basecontainer.length === 0)
      {
        $basecontainer = $("<div id='" + options.baseid + "' class='" + cssnames.OuterPanel + "'>");
        $baseheader = $("<div class='xp-MainHeader'><table  class='xp-Width ui-widget-header ui-corner-all'><tr><td style='padding:4px'>Report Configuration</td></tr></table></div>");
        $basecontainer.append($baseheader);
        $basebody = $("<div class='xp-MainContent'/>");
        $basetable = $("<table border='0' width='100%' id='" + options.baseid + "table'>");
        $tr = $("<tr/>");
        /*add name */
        $tr.append($("<td style='padding-left:6px;width:5%;line-height:20px;' valign='top'>").append(paramnames.name));
        $tr.append($("<td colspan='5' class='xp-ViewLabel' id='" + options.baseid + paramids.name + "td'/>"));
        $basetable.append($tr);

        $tr = $("<tr/>");
        /*add Owner */
        $tr.append($("<td style='padding-left:6px;line-height:20px;' valign='top'/>").append(paramnames.owner));
        $tr.append($("<td colspan='5' class='xp-ViewLabel' id='" + options.baseid + paramids.owner + "td'/>"));
        $basetable.append($tr);

        $tr = $("<tr/>");
        /*add description */
        $tr.append($("<td style='padding-left:6px;line-height:20px;' valign='top'/>").append(paramnames.descrip));
        $tr.append($("<td colspan='5' class='xp-ViewLabel' id='" + options.baseid + paramids.descrip + "td'/>"));
        $basetable.append($tr);

        $tr = $("<tr/>");
        $tr.append($("<td style='padding-left:6px;line-height:20px;' valign='top'/>").append(paramnames.frequency));
        $tr.append($("<td colspan='5' class='xp-ViewLabel' id='" + options.baseid + paramids.frequency + "td'/>"));
        $basetable.append($tr);

        $tr = $("<tr/>");
        /*add Preparation Date */
        $tr.append($("<td style='padding-left:6px;line-height:20px;' valign='top'/>").append(paramnames.prepday));
        $tr.append($("<td  class='xp-ViewLabel xp-Width10' id='" + options.baseid + paramids.prepday + "td'/>"));
        $basetable.append($tr);

        //$tr = $("<tr/>");
        /*add reminder  Date */
        $tr.append($("<td width='5%' valign='top' style='line-height:20px;'/>").append(paramnames.remindday));
        $tr.append($("<td class='xp-ViewLabel xp-Width10' id='" + options.baseid + paramids.remindday + "td'/>"));
        $basetable.append($tr);

        //$tr = $("<tr/>");
        /*add publishing   Date */
        $tr.append($("<td width='5%' valign='top' style='line-height:20px;'/>").append(paramnames.pubday));
        $tr.append($("<td  class='xp-ViewLabel xp-Width10' id='" + options.baseid + paramids.pubday + "td'/>"));
        $basetable.append($tr);

        //$tr = $("<tr/>");
        /*add charts    */
        //$tr.append($("<td/>").append(paramnames.charts));
        //$basetable.append($tr);
        $tr = $("<tr/>");
        fieldhtml = "<table id='" + paramids.charts + "'class='scroll' cellpadding='0' cellspacing='0'></table>";
        fieldhtml += "<div id='" + paramids.charts + "pager' class='scroll' style='text-align:center;'></div>";
        $tr.append($("<td colspan='6' style='padding:4px 4px 4px 4px;' id='" + options.baseid + paramids.pubday + "td' colspan=2/>").append(fieldhtml));
        $basetable.append($tr);
        $tr = $("<tr/>");
        /*add Distribution list */
        $tr.append($("<td style='padding-left:6px;line-height:20px;' valign='top'/>").append(paramnames.distlist));
        $tr.append($("<td colspan='6' class='xp-ViewLabel' id='" + options.baseid + paramids.distlist + "td' />"));
        $basetable.append($tr);
        $basebody.append($basetable);
        $basecontainer.append($basebody)
        $("#" + options.container).append($basecontainer);

        DateValidationConfigs();
        $(".reportpeople").peoplepicker();
        $(".reportmultipeople").peoplepicker({ multivalued: true });

        $("#" + paramids.charts).jqGrid({
          datatype: "local",
          colNames: ['Chart Type', 'Chart Heading', 'Chart Owner', 'Location', 'Function', 'Department'],
          colModel: [
   		{ name: 'Type', width: 200, search: false, editable: false },
   		{ name: 'Heading', width: 150, search: false, editable: false },
   		{ name: 'Owner', width: 130, search: false, edittype: 'singleperson', editable: false },
   		{ name: 'Location', width: 110, search: false, edittype: 'location', editable: false },
   		{ name: 'Function', width: 110, search: false, editable: false },
   		{ name: 'Department', width: 110, search: false, editable: false },
   	],
          rowNum: 10,
          rowList: [10, 20, 30],
          imgpath: '/_layouts/Relay/GridControl/themes/customthem/images',
          pager: jQuery("#" + paramids.charts + "pager"),
          sortname: 'id',
          viewrecords: true,
          sortorder: "desc",
          caption: "Charts On Reports",
          width: "825",
          height: "100"
        }).navGrid("#" + paramids.charts + "pager", { edit: false, add: false, del: false });
      }

    }

    function getChartsData()
    {

      $.ajax({ url: options.getchartsurl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{configid:'" + options.configid + "'}",
        success: function(datap, st)
        {
          var data = datap.d;
          if (data != null)
          {
            preColData = data;
            if (preColData != null)
            {
              $.each(preColData, function(i)
              {
                var localdata = new Array();
                $.each(preColData[i].data, function(j)
                {
                  localdata["Type"] = preColData[i].data.Type;
                  localdata["Heading"] = preColData[i].data.Heading;
                  localdata["Owner"] = preColData[i].data.Owner;
                  localdata["Location"] = preColData[i].data.Location;
                  localdata["Function"] = preColData[i].data.Function;
                  localdata["Department"] = preColData[i].data.Department;
                });
                $("#" + paramids.charts).addRowData(preColData[i].id, localdata);
                localdata = null;
              });
            }
          }
        },
        error: function(xhr, ajaxOptions, thrownError)
        {

        }
      });

    }


    function getConfigData()
    {

      $.ajax({ url: options.geturl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{configid:'" + options.configid + "'}",
        success: function(datap, st)
        {
          var data = datap.d;
          if (data != null)
          {
            configData = data;
            if (configData != null)
            {
              switch (options.oper)
              {
                case 'edit':
                  $("#" + options.baseid + paramids.name).val(configData[paramids.name]);
                  $("#" + options.baseid + paramids.descrip).val(configData[paramids.descrip]);
                  $("#" + options.baseid + paramids.distlist).val(configData[paramids.distlist]);
                  $("#" + options.baseid + paramids.frequency).val(configData[paramids.frequency]);
                  $("#" + options.baseid + paramids.owner).val(configData[paramids.owner]);
                  $("#" + options.baseid + paramids.pubday).val(configData[paramids.pubday]);
                  $("#" + options.baseid + paramids.prepday).val(configData[paramids.prepday]);
                  $("#" + options.baseid + paramids.remindday).val(configData[paramids.remindday]);
                  break;
                case 'read':
                  $("#" + options.baseid + paramids.name + "td").append(configData[paramids.name]);
                  $("#" + options.baseid + paramids.descrip + "td").append(configData[paramids.descrip]);
                  $("#" + options.baseid + paramids.distlist + "td").append(configData[paramids.distlist]);
                  $("#" + options.baseid + paramids.frequency + "td").append(configData[paramids.frequency]);
                  $("#" + options.baseid + paramids.owner + "td").append(configData[paramids.owner]);
                  $("#" + options.baseid + paramids.pubday + "td").append(configData[paramids.pubday]);
                  $("#" + options.baseid + paramids.prepday + "td").append(configData[paramids.prepday]);
                  $("#" + options.baseid + paramids.remindday + "td").append(configData[paramids.remindday]);
                  break;
              }
              PopulateChartGrid();
            }
          }
        },
        error: function(xhr, ajaxOptions, thrownError)
        {

        }
      });

    }
    function PopulateChartGrid()
    {
      getChartsData();

    }


    function PopulateControls()
    {

      if (options.oper === 'edit' || options.oper === 'read')
      {
        getConfigData();

      }
    }

    return this.each(function()
    {

      if (options.oper === 'read')
      {
        CreateReadContainer();
      }
      else
      {
        CreateEditContainer();
      }

      if (options.oper === 'edit' || options.oper === 'read')
      {
        PopulateControls();
      }

    });

  };

})(jQuery);