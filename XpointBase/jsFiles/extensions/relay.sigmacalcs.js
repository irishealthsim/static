//
// Lower tail quantile for standard normal distribution function.
//
// This function returns an approximation of the inverse cumulative
// standard normal distribution function.  I.e., given P, it returns
// an approximation to the X satisfying P = Pr{Z <= X} where Z is a
// random variable from the standard normal distribution.
//
// The algorithm uses a minimax approximation by rational functions
// and the result has a relative error whose absolute value is less
// than 1.15e-9.
//
// Author:      Peter J. Acklam
// (Javascript version by Alankar Misra @ Digital Sutras (alankar@digitalsutras.com))
// Time-stamp:  2003-05-05 05:15:14
// E-mail:      pjacklam@online.no
// WWW URL:     http://home.online.no/~pjacklam

// An algorithm with a relative error less than 1.15*10-9 in the entire region.

function NORMSINV(p)
{
  // Coefficients in rational approximations
  var a = new Array(-3.969683028665376e+01, 2.209460984245205e+02,
                      -2.759285104469687e+02, 1.383577518672690e+02,
                      -3.066479806614716e+01, 2.506628277459239e+00);

  var b = new Array(-5.447609879822406e+01, 1.615858368580409e+02,
                      -1.556989798598866e+02, 6.680131188771972e+01,
                      -1.328068155288572e+01);

  var c = new Array(-7.784894002430293e-03, -3.223964580411365e-01,
                      -2.400758277161838e+00, -2.549732539343734e+00,
                      4.374664141464968e+00, 2.938163982698783e+00);

  var d = new Array(7.784695709041462e-03, 3.224671290700398e-01,
                       2.445134137142996e+00, 3.754408661907416e+00);

  // Define break-points.
  var plow = 0.02425;
  var phigh = 1 - plow;

  // Rational approximation for lower region:
  if (p < plow)
  {
    var q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
                                             ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }

  // Rational approximation for upper region:
  if (phigh < p)
  {
    var q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
                                                    ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }

  // Rational approximation for central region:
  var q = p - 0.5;
  var r = q * q;
  return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
                             (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}
; (function($)
{

  $.fn.sigmaCalculator = function(options)
  {

    var defaults = {
      mode: 'basic',
      basemodetext: 'Basic Mode',
      advancemodetext: 'Advance Mode',
      basicmodeidcontainer: '',
      advancemodeidcontainer: ''
    }
    var options = $.extend(defaults, options);
    var $this = $(this);
    options.basicmodeidcontainer = $this.attr('id') + "baseicmode";
    options.advancemodeidcontainer = $this.attr('id') + "advancemode";
    var ids = {
      basemodeOpp: options.basicmodeidcontainer + "opportunity",
      basemodeDefects: options.basicmodeidcontainer + "defects",
      basemodeDPMO: options.basicmodeidcontainer + "DPMO",
      basemodeDefectsPerc: options.basicmodeidcontainer + "Defectsperc",
      basemodeYieldPerc: options.basicmodeidcontainer + "YieldPerc",
      basemodeProcessSigma: options.basicmodeidcontainer + "ProcessSigma",
      advancemodeUnits: options.advancemodeidcontainer + "Units",
      advancemodeOpp: options.advancemodeidcontainer + "opportunity",
      advancemodeDefects: options.advancemodeidcontainer + "defects",
      advancemodeDPMO: options.advancemodeidcontainer + "DPMO",
      advancemodeDefectsPerc: options.advancemodeidcontainer + "Defectsperc",
      advancemodeYieldPerc: options.advancemodeidcontainer + "YieldPerc",
      advancemodeProcessSigma: options.advancemodeidcontainer + "ProcessSigma",
      advancemodeSigmaShift: options.advancemodeidcontainer + "SigmaShift",
      advancemodeDPU: options.advancemodeidcontainer + "DPU",
      stepcalculateBtn: $this.attr('id') + "stepCalculateButton",
      basecalculateBtn: $this.attr('id') + "baseCalculateButton",
      advcalculateBtn: $this.attr('id') + "advCalculateButton"

    }

    function onlyNumbers(evt)
    {
      var e = event || evt; // for trans-browser compatibility
      var charCode = e.which || e.keyCode;

      if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

      return true;

    }
    function CreateBasicMode()
    {
      var basemodediv = $("#" + options.basicmodeidcontainer);
      if (basemodediv.length == 0)
      {
        basemodediv = $("<div id='" + options.basicmodeidcontainer + "' style='border:0px red solid;width:99%' class='xp-MainContent'/>");
        var leftdiv = $("<div  class='xp-FloatLeft xp-Width30' style='border:0px black solid'/>");
        var lefttopdiv = $("<div  style='border:0px black solid;height:160px'/>");
        var html = "";
        html += "<table border=0 cellspacing=0 cellpadding=6 class='xp-MainContent xp-Width'>";
        html += "<tr><td  class='xp-FontBold xp-Width40'>Opportunities</td>";
        html += "<td><input type='text' autocomplete='off' id='" + ids.basemodeOpp + "' class='xp-TxtBox'/> </td></tr>";
        html += "<tr><td class='xp-FontBold'>Defects</td>";
        html += "<td><input type='text' autocomplete='off' id='" + ids.basemodeDefects + "' class='xp-TxtBox'/> </td></tr>";
        html += "</table>";
        lefttopdiv.html(html);
        leftdiv.append(lefttopdiv);
        var leftbottomdiv = $("<div  style='border:0px black solid;text-align:center'/>");
        leftbottomdiv.append("<input type='button'  id='" + ids.basecalculateBtn + "'  value='Calculate' class='ui-button ui-corner-all'/>");
        leftdiv.append(leftbottomdiv);
        basemodediv.append(leftdiv);
        div = $("<div  class='xp-FloatLeft' style='width:2%'/>");
        basemodediv.append(div);
        html = "";
        div = $("<div  style='border:0px yellow solid;height:185px' class='xp-GrayBackground xp-FloatLeft'/>");
        html += "<table border=0 cellspacing=0 cellpadding=6 >";
        html += "<tr><td colspan=2 class='xp-FontBold'>Result</td></tr>";
        html += "<tr><td class='xp-FontBold'>DPMO</td>";
        html += "<td><input type='text' autocomplete='off' disabled='disabled' id='" + ids.basemodeDPMO + "' class='xp-NoBorderTextbox'/> </td></tr>";
        html += "<tr><td class='xp-FontBold'>Defects (%)</td>";
        html += "<td><input type='text' autocomplete='off' disabled='disabled' id='" + ids.basemodeDefectsPerc + "' class='xp-NoBorderTextbox'/> </td></tr>";
        html += "<tr><td class='xp-FontBold'>Yield (%)</td>";
        html += "<td><input type='text' autocomplete='off' disabled='disabled' id='" + ids.basemodeYieldPerc + "' class='xp-NoBorderTextbox'/> </td></tr>";
        html += "<tr><td class='xp-FontBold'>Process Sigma</td>";
        html += "<td><input type='text' autocomplete='off' disabled='disabled' id='" + ids.basemodeProcessSigma + "' class='xp-NoBorderTextbox'/> </td></tr>";
        html += "</table>";
        div.html(html);
        basemodediv.append(div);
        $this.append(basemodediv);
      }
      return basemodediv;
    }

    function CreateAdvanceMode()
    {
      var advancediv = $("#" + options.advancemodeidcontainer);
      if (advancediv.length == 0)
      {
        advancediv = $("<div id='" + options.advancemodeidcontainer + "' style='border:0px red solid;width:99%' class='xp-MainContent'/>");
        var advleftdiv = $("<div  style='float:left;width:30%;border:0px black solid'/>");
        var advlefttopdiv = $("<div  style='border:0px black solid;height:160px'/>");
        var html = "";
        html += "<table border=0 cellspacing=0 cellpadding=6 width='100%' class='xp-MainContent'>";
        html += "<tr><td style='width:40%' class='xp-FontBold'>Units</td>";
        html += "<td><input autocomplete='off' type='text' id='" + ids.advancemodeUnits + "' class='xp-TxtBox'/> </td></tr>";
        html += "<tr><td class='xp-FontBold'>Opportunities/Units</td>";
        html += "<td><input autocomplete='off' type='text' id='" + ids.advancemodeOpp + "' class='xp-TxtBox'/> </td></tr>";
        html += "<tr><td class='xp-FontBold'>Defects</td>";
        html += "<td><input autocomplete='off' type='text' id='" + ids.advancemodeDefects + "' class='xp-TxtBox'/> </td></tr>";
        html += "<tr><td class='xp-FontBold'>Sigma Shift</td>";
        html += "<td><input autocomplete='off' type='text' id='" + ids.advancemodeSigmaShift + "' class='xp-TxtBox'/> </td></tr>";
        html += "</table>";
        advlefttopdiv.html(html);
        advleftdiv.append(advlefttopdiv);
        var advleftbottomdiv = $("<div  style='border:0px black solid;text-align:center'/>");
        advleftbottomdiv.append("<input type='button'  id='" + ids.advcalculateBtn + "'  value='Calculate' class='ui-button ui-corner-all'/>");
        advleftdiv.append(advleftbottomdiv);
        advancediv.append(advleftdiv);
        div = $("<div  style='float:left;width:2%'/>");
        advancediv.append(div);
        html = "";
        div = $("<div  style='float:left;border:0px yellow solid;height:185px' class='xp-GrayBackground'/>");
        html += "<table border=0 cellspacing=0 cellpadding=6 >";
        html += "<tr><td colspan=2 class='xp-FontBold'>Result</td></tr>";
        html += "<tr><td class='xp-FontBold'>DPU</td>";
        html += "<td><input type='text' autocomplete='off' disabled='disabled' id='" + ids.advancemodeDPU + "' class='xp-NoBorderTextbox'/> </td></tr>";
        html += "<tr><td class='xp-FontBold'>DPMO</td>";
        html += "<td><input type='text' autocomplete='off' disabled='disabled' id='" + ids.advancemodeDPMO + "' class='xp-NoBorderTextbox'/> </td></tr>";
        html += "<tr><td class='xp-FontBold'>Defects(%)</td>";
        html += "<td><input type='text' autocomplete='off' disabled='disabled' id='" + ids.advancemodeDefectsPerc + "' class='xp-NoBorderTextbox'/> </td></tr>";
        html += "<tr><td class='xp-FontBold'>Yield(%)</td>";
        html += "<td><input type='text' autocomplete='off' disabled='disabled' id='" + ids.advancemodeYieldPerc + "' class='xp-NoBorderTextbox'/> </td></tr>";
        html += "<tr><td class='xp-FontBold'>Process Sigma</td>";
        html += "<td><input type='text' autocomplete='off' disabled='disabled' id='" + ids.advancemodeProcessSigma + "' class='xp-NoBorderTextbox'/> </td></tr>";
        html += "</table>";
        div.append(html);
        advancediv.append(div);
        advancediv.hide();
        $this.append(advancediv);
      }
      return advancediv;
    }

    function GetDPMO(defects, opp)
    {
      var dpmo = ((defects) / (opp)) * 1000000;
      return dpmo;
    }

    function GetDefectPercent(defects, opp)
    {
      return ((defects) / (opp)) * 100;
    }

    function GetYieldPercent(defectpercent)
    {
      return (100 - (defectpercent));
    }

    function GetProcessSigma(defects, opp, shift)
    {

      return NORMSINV(1 - ((defects) / (opp))) + shift;
    }

    function GetDPU(defects, opp, units)
    {
      return (defects / (units) * (opp));
    }
    function UpdateBasicValues()
    {
      var opp = $("#" + ids.basemodeOpp).val();
      if (opp == "")
      {
        opp = 100;
      }
      var defects = $("#" + ids.basemodeDefects).val();
      if (defects == "")
      {
        defects = 0.0;
      }
      var DPMO = GetDPMO(defects, opp);
      $("#" + ids.basemodeDPMO).val(DPMO);

      $("#" + ids.basemodeDefectsPerc).val(GetDefectPercent(defects, opp));
      $("#" + ids.basemodeYieldPerc).val(GetYieldPercent($("#" + ids.basemodeDefectsPerc).val()));
      $("#" + ids.basemodeProcessSigma).val(GetProcessSigma(defects, opp, 1.5));
    }

    function UpdateAdvanceValues()
    {
      var units = $("#" + ids.advancemodeUnits).val();
      if (units == "")
      {
        units = 1;
      }
      var opp = $("#" + ids.advancemodeOpp).val();
      if (opp == "")
      {
        opp = 1;
      }

      var defects = $("#" + ids.advancemodeDefects).val();
      if (defects == "")
      {
        defects = 0.0;
      }
      var DPMO = GetDPMO(defects, opp * units);
      $("#" + ids.advancemodeDPMO).val(DPMO);

      $("#" + ids.advancemodeDefectsPerc).val(GetDefectPercent(defects, opp * units));
      $("#" + ids.advancemodeYieldPerc).val(GetYieldPercent($("#" + ids.advancemodeDefectsPerc).val()));
      var shift = $("#" + ids.advancemodeSigmaShift).val();
      if (shift == "" || shift == 0)
      {
        shift = 1.5;
        $("#" + ids.advancemodeSigmaShift).val(1.5)
      }
      $("#" + ids.advancemodeProcessSigma).val(GetProcessSigma(defects, (opp * units), shift));
      $("#" + ids.advancemodeDPU).val(GetDPU(defects, opp, units));
    }

    return this.each(function()
    {
      var elem = $(this);
      var outerdiv = $("<div style='border:0px aqua solid;padding:12px'/>");
      var div = $("<div  class='xp-FontBold xp-FloatLeft'/>");
      var link = $("<a href='#' id='" + $this.attr('id') + "togglelink' />");
      link.text(options.advancemodetext);
      div.append("switch to: ");
      div.append(link);
      outerdiv.append(div);
      elem.append(outerdiv);
      var basicdiv = CreateBasicMode();
      outerdiv.append(basicdiv);
      elem.append(outerdiv);
      var advancediv = CreateAdvanceMode();
      outerdiv.append(advancediv);
      elem.append(outerdiv);
      var $basecalculate = $("#" + ids.basecalculateBtn);

      $basecalculate.click(function()
      {
        UpdateBasicValues();

      });
      var $advcalculate = $("#" + ids.advcalculateBtn);

      $advcalculate.click(function()
      {
        UpdateAdvanceValues();

      });
      link.click(function()
      {
        $("text", elem).val("");
        if (options.mode == 'basic')
        {
          options.mode = 'advance';
          link.text(options.basemodetext);
          basicdiv.hide();
          advancediv.show();

        }
        else
        {
          options.mode = 'basic';
          link.text(options.advancemodetext);
          basicdiv.show();
          advancediv.hide();
        }
      });

    });
  }

  $.fn.rolledyield = function(options)
  {
    var $this = $(this);
    var ids = {
      containerdiv: $this.attr('id') + "container",
      process1id: $this.attr('id') + "processone",
      process2id: $this.attr('id') + "processtwo",
      process3id: $this.attr('id') + "processthree",
      process4id: $this.attr('id') + "processfour",
      resultid: $this.attr('id') + "resultid",
      calculatebtn: $this.attr('id') + "calculatebtn"
    }

    function CreateContainerDiv()
    {
      var div = $("#" + ids.containerdiv);
      if (div.length == 0)
      {
        div = $("<div id='" + ids.containerdiv + "'/>");
        div.append("<table>");
        div.append("<tr><td>Steps </td> <td>  DPMO </td></tr>");
        div.append("<tr><td>Step A  </td><td> <input id='" + ids.process1id + "'/></td></tr>");
        div.append("<tr><td>Step B  </td><td> <input id='" + ids.process2id + "'/></td></tr>");
        div.append("<tr><td>Step C  </td><td> <input id='" + ids.process3id + "'/></td></tr>");
        div.append("<tr><td>Step D  </td><td> <input id='" + ids.process4id + "'/></td></tr>");
        div.append("<tr><td>RTY </td><td> <input id='" + ids.resultid + "'/></td></tr>");
        div.append("<tr><td></td><td> <input type='button' value='calculate' id='" + ids.stepcalculatebtn + "'/></td></tr>");
        div.append("</table>");
        $this.append(div);
      }
      return div;
    }

    return this.each(function()
    {

      CreateContainerDiv();
      var btn = $("#" + ids.stepcalculatebtn);

      btn.click(function()
      {
        var value1, value2, value3, value4;
        value1 = $("#" + ids.process1id).val();
        value2 = $("#" + ids.process2id).val();
        value3 = $("#" + ids.process3id).val();
        value4 = $("#" + ids.process4id).val();
        if (value1 == "")
        {
          value1 = 0;
          $("#" + ids.process1id).val(0.0);
        }
        if (value2 == "")
        {
          value2 = 0;
          $("#" + ids.process2id).val(0.0);
        }
        if (value3 == "")
        {
          value3 = 0;
          $("#" + ids.process3id).val(0.0);
        }
        if (value4 == "")
        {
          value4 = 0;
          $("#" + ids.process4id).val(0.0);
        }

        var multiple = value1 * value2 * value3 * value4;

        var dmocal1, dmocal2, dmocal3, dmocal4;
        dmocal1 = 1 - (value1 / 1000000);
        dmocal2 = 1 - (value2 / 1000000);
        dmocal3 = 1 - (value3 / 1000000);
        dmocal4 = 1 - (value4 / 1000000);
        var multiple = dmocal1 * dmocal2 * dmocal3 * dmocal4;

        var rty = Math.pow(multiple, 1 / 4);
        $("#" + ids.resultid).val(rty);
      });

    });
  }

})(jQuery);