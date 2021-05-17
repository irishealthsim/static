function guidGenerator() {
  var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
  return (S4() + S4() + "_" + S4() + "_" + S4() + "_" + S4() + "_" + S4() + S4() + S4());
}(function ($) {

  $.fn.zoomJQPlot = function (options) {
    var settings = new Object;
    settings.chartData = options.chartData;
    settings.title = options.title;
    settings.plot = null;
    settings.chartSettings = $.extend(true, {}, options.chartSettings);
    return this.each(function () {
      $('.zoomedJqPlot').remove();
      var id = "zoomedJqPlot" + guidGenerator();
      var zoomedPlot = $("<div  class='zoomedJqPlot' title='" + settings.title + "'/>").appendTo('body').append("<div id='" + id + "' style='width:95%;height:100%'/>").dialog({
        height: 600,
        width: 800,
        modal: true,
        show: "blind",
        hide: 'drop',
        open: function (event, ui) {
          settings.plot = $.jqplot(id, settings.chartData, settings.chartSettings);
        },
        beforeClose: function (event, ui) {
          if (settings.plot) {
            settings.plot.destroy();
            zoomedPlot.empty();
          }
        }
      });
    });
  };
  $.xpointChart = $.xpointChart || {};
  $.fn.xpointChart = function (p) {
    $.jqplot.config.enablePlugins = true;
    // Method calling logic
    if (!this || this.length === 0) return;
    if (("string" == typeof (p)) && $.xpointChart.methods[p]) {
      var opts = $.extend(this.get(0).options, $.makeArray(arguments).slice(1)[0]);
      return $.xpointChart.methods[p].apply(this, $.makeArray(opts));
    }
    return this.each(function () {
      this.options = $.extend($.xpointChart.defaults, p);
    });
  };
  /*
   * give more definition to the namespace. chart types array is defined 
   * and a method through which addition type of charts can be defined in
   * a plugin mode   like $.xpointChart.addChartType('BarChart',....
   * same way  formatters can be defined
   * chartmodel options
   * series: {chartType:'', xaxis:'',yaxis:'', xAxisLabel:'',yAxisLabel:'', chartHeading:''
   * , forumlae:'' }
   */
  $.xpointChart = {
    defaults: {
      data: [],
      chartModel: []
    },
    chartSettings: {
      heightOffset: -8,
      legend: {
        show: true,
        location: 'e',
        placement: "outsideGrid",
        renderer: $.jqplot.EnhancedLegendRenderer,
        formatter: function (value) {
          if ($.trim(value).length > 12) {
            var text = value.substring(0, 10) + "..";
            return "<span class='tipHover' title='" + value + "'>" + text + "</span>";
          }
          return value;
        }
      },
      highlighter: {
        show: true,
        tooltipAxes: 'y',        
        formatString: '<table class="jqplot-highlighter"><tr><td style="font-size:12px">%s %d</td></tr> </table>'
      },
      grid: {
        background: '#FFFFFF',
        borderColor: '#efefef',
        // CSS color spec for border around grid.
        borderWidth: 1,
        drawGridLines: false,
        shadow: true,
        gridLineColor: '#cfcfcf'
      },
      axes: {
        xaxis: {
          renderer: $.jqplot.CategoryAxisRenderer,
          tickOptions: {
            mark: 'outside',
            fontFamily: ' Arial,Helvetica,sans-serif',
            fontSize: '8pt',
            showGridline: false,
            formatter: function (str, value) {
              if ($.trim(value).length > 8) {
                var text = value.substring(0, 6) + "..";
                return "<span class='tipHover' title='" + value + "'>" + text + "</span>";
              }
              return value;
            }
          }
        },
        yaxis: {
          min: 0,
          autoscale: true,
          labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
          tickRenderer: $.jqplot.CanvasAxisTickRenderer,
          tickOptions: {
            formatString: '%d',
            fontFamily: ' Arial,Helvetica,sans-serif',
            fontSize: '8pt'
          }
        }
      },
      series: []
    },
    chartTypes: {},
    formulaTypes: {},
    /* Add new input type */
    addChartType: function (name, chartConfig) {
      $.xpointChart.chartTypes[name] = chartConfig;
    },
    addFormulaType: function (name, formula) {
      $.xpointChart.formulaTypes[name] = formula;
    },
    methods: {
      topN: function (options) {
        var defaults = {
          needSort: true,
          numberSort: true,
          topN: 5,
          multiSortByIndex: 1
        };

        function SortAlgo(a, b, options) {
          if (typeof (a) == 'object' && a.length && typeof (b) == 'object' && b.length) {
            var aVal = a[options.multiSortByIndex] ? a[options.multiSortByIndex] : 0;
            var bVal = b[options.multiSortByIndex] ? b[options.multiSortByIndex] : 0;
            return aVal - bVal;
          }
          return a - b;
        }
        var arr = this;
        var options = $.extend(defaults, options);
        $(arr).each(function (i) {
          var subArr = arr[i];
          if (subArr) {
            if (typeof (subArr) == 'object' && subArr.length && options) {
              if (options.needSort) {
                if (options.numberSort === true) {
                  subArr = subArr.sort(function (a, b) {
                    return SortAlgo(a, b, options);
                  });
                } else {
                  subArr = subArr.sort();
                }
              }
              subArr = subArr.reverse();
              if (subArr.length > options.topN) {
                arr[i] = subArr.splice(0, options.topN);
              }
            }
          }
        });
        return arr;
      },
      jQSearch: function (term) {
        for (idx in this) {
          var arr = this[idx];
          if (typeof (arr) == "object" && arr.length > 0) {
            if (arr[0] && arr[0] == term) {
              return idx;
            }
          }
        }
        return -1;
      },
      prepareConfigNDraw: function (options) {
        $(options.chartModel).each(function (j) {
          var chartModel = this;
          chartModel.chartSettings = $.extend(true, {}, $.xpointChart.chartSettings);
          chartModel.chartData = [];
          chartModel.zoomEvents = [];
          if (chartModel) {
            $(chartModel.series).each(function () {
              var series = this;
              var chartType = $.xpointChart.chartTypes[series.chartType];
              chartType.settings.apply(series, $.makeArray(chartModel));
              if (chartType.zoomSettings && $.isFunction(chartType.zoomSettings)) {
                chartModel.zoomEvents.push(chartType.zoomSettings);
              }
            });
            $.xpointChart.methods.draw(chartModel);
          }
        });
      },
      afterDataAdded: function (chartModel) {
        if (chartModel) {
          if (chartModel.topN) {
            chartModel.chartData = $.xpointChart.methods.topN.apply(chartModel.chartData, $.makeArray({
              topN: chartModel.topN
            }));
          }
          var needAutoScale = chartModel.needAutoScale != null ? chartModel.needAutoScale : true;
          if (chartModel.series.length == 1 && needAutoScale == true) {
            var series = chartModel.series[0];
            chartModel.chartSettings.legend = null;
            chartModel.chartSettings.axes.yaxis.autoscale = false;
            if (series.data.length == 1) {
              var dataRow = series.data[0];
              if (dataRow && dataRow[1] == 0) {
                chartModel.chartSettings.axes.yaxis.max = 1;
              }
            }
          }
        }
      },
      prepareZoomSettings: function (chartModel) {
        var settings = $.extend(true, {}, chartModel.chartSettings);
        if (settings.legend.show === true) {
          settings.legend.fontSize = '10pt';
          settings.legend.placement = "outsideGrid";
          settings.legend.formatter = null;
        }
        settings.heightOffset = null;
        if (chartModel.zoomEvents) {
          $(chartModel.zoomEvents).each(function () {
            var ev = this;
            if (ev && $.isFunction(ev)) {
              settings = ev(settings);
            }
          });
        }
        return settings;
      },
      draw: function (chartModel) {
        $.xpointChart.methods.afterDataAdded(chartModel);
        var chartDiv = $("#" + chartModel.chartId);
        if (chartModel.hasData === true) {
          var chartSettings = chartModel.chartSettings;


        chartModel.chartData[0].sort(function(a,b)
          {
            if(a[0]<b[0]) return -1;
            if(a[0]>b[0]) return 1;
            return 0;
          });
          var plot = $.jqplot(chartModel.chartId, chartModel.chartData, chartSettings);
          //var link = $("<img src='/_layouts/Images/XpointBase/zoom.png' href='#' style='cursor:pointer;padding-top:4px'/>").click(function () {
          var link = $("<div class=' xp-IconZoomChart xp-Icon Tip-ACZoomChart ' href='#' style='cursor:pointer;'></div>").click(function () {
            chartModel.chartSettings = chartSettings;
            chartDiv.zoomJQPlot({
              chartData: chartModel.chartData,
              chartSettings: $.xpointChart.methods.prepareZoomSettings(chartModel),
              title: chartModel.chartHeading
            });
          });
          var chartContainer = $(chartDiv.parents(".singleXpointChartContainer").get(0));
          $(".xpointChartZoom", chartContainer).empty().append(link);
          $(".tipHover").tipTip();
          return plot;
        }
        chartDiv.empty().append("No data to plot!");
        return null;
      },
      reDraw: function (options) {
        if (!options) {
          return;
        }
        var elem = $(this);
        if (elem.get(0).options) {
          options = $.extend(elem.options, options);
        }
        $(options.chartModel).each(function () {
          var chartModel = this;
          chartModel.chartData = [];
          if (chartModel) {
            var chartDiv = $("#" + chartModel.chartId);
            var needAutoScale = chartModel.needAutoScale != null ? chartModel.needAutoScale : true;
            if (needAutoScale == true) {
              chartModel.chartSettings.axes.yaxis.autoscale = true;
              chartModel.chartSettings.axes.yaxis.max = null;
            }
            $.xpointChart.methods.processData(options);
            $(chartModel.series).each(function (idx) {
              var series = this;
              if (series) {
                chartModel.chartData.push(series.data);
              }
            });
            var plot = $.xpointChart.methods.draw(chartModel);
            if (plot) {
              plot.replot();
            }
          }
        });
      },
      prepareCharts: function (options) {
        var container = $(this);
        container.width("100%");
        $(options.chartModel).each(function (i) {
          var chartModel = this;
          if (chartModel) {
            var chartContainer = $("<div style='margin:4px 14px 25px 14px;' class='singleXpointChartContainer xp-OuterPanel xp-Overflowhidden '/>").appendTo(container);
            var headerDiv = $("<div class='xpointChartHeader' />").append("<div class='xp-DivHeader' style='float:left;width:85%'>" + chartModel.chartHeading + "</div>").append("<div style=';text-align:right' class='xpointChartZoom xp-FloatRight ui-corner-all  ui-state-default xp-Padding-4'/>").appendTo(chartContainer);
            var id = "chart_" + guidGenerator();
            chartModel.chartId = id;
            var chartDiv = $("<div  id='" + id + "' style='width:100%;height:280px;float:left'/>")
            chartContainer.xpointbox({
              containterWidth: '50%',
              headerContainer: headerDiv,
              contentContainer: chartDiv,
              containerStyle: 'singleXpointChartContainer xp-FloatLeft',
              contentStyle: "xp-MainContent  xp-FloatLeft",
              headerStyle: ' xpointChart ui-state-default xp-BottomBorder xp-NoBackground xp-FloatLeft xp-Overflowhidden xp-Height-30'
            });
          }
        });
      },
      processData: function (options, byIndex) {
        if (options.data.length == 0) {
          $(options.chartModel).each(function (j) {
            var chartModel = options.chartModel[j];
            chartModel.hasData = false;
            if (chartModel) {
              $(chartModel.series).each(function (k) {
                var series = this;
                series.data = new Array();
              });
            }
          });
          return false;
        }
        var i = -1;
        for (rowKey in options.data) {
          var row = options.data[rowKey];
          if (row) {
            i++;
            $(options.chartModel).each(function (j) {
              var chartModel = options.chartModel[j];
              if (chartModel) {
                $(chartModel.series).each(function (k) {
                  var series = this;
                  if (series) {
                    if (i === 0) {
                      chartModel.hasData = false;
                      series.data = new Array();
                    }
										var xArray = $.trim(row[series.xAxis]).length > 0 ? row[series.xAxis].split(',') : "NA";
										$(xArray).each(function(n){
                    var xValue = xArray[n];
                    if ($.trim(xValue).length > 0) {
                      xValue = $("<div />").append(xValue).text();
                    }
                    var yValue = $.trim(row[series.yAxis]).length > 0 ? row[series.yAxis] : 0;
                    var index = $.xpointChart.methods.jQSearch.apply(series.data, $.makeArray(xValue));
                    if (index == -1) {
                      var entry = new Array();
                      entry.push(xValue)
                      entry.push(0);
                      series.data.push(entry);
                      chartModel.hasData = true;
                      index = (series.data.length - 1);
                    }
                    var seriesOptions = {
                      idx: index,
                      xvalue: xValue,
                      yvalue: yValue
                    };										
                    $.xpointChart.formulaTypes[series.formula].apply(series, $.makeArray(seriesOptions));
										});
                  }									
                });
              }
            });
          }
        }
        return options;
      },
      /*
       * creates the various charts as configured in chartModel
       */
      init: function (options) {
        return this.each(function () {
          var elem = this;
          var container = $(elem);
          if (this.options) {
            options = $.extend(this.options, options);
          }
          if (this.chartsApplied && this.chartsApplied === true) {
            container.empty();
          }
          this.chartsApplied = true;
          if (options.data && options.data.length > 0) {
            var opts = $.makeArray(options);
            $.xpointChart.methods.prepareCharts.apply(elem, opts);
            $.xpointChart.methods.processData.apply(elem, opts);
            $.xpointChart.methods.prepareConfigNDraw.apply(elem, opts);
          } else {
            container.append("No data to prepare charts. Create new lifecycle item today.");
          }
        });
      }
    }

  }; /**********************************Add formula types *********************/
  $.xpointChart.addFormulaType("sum", function (options) {
    var series = this;
    if (series) {
      series.data[options.idx][1] = parseFloat(series.data[options.idx][1]) + parseFloat(options.yvalue);
    }
  });
  $.xpointChart.addFormulaType("count", function (options) {
    var series = this;
    if (series) {
      series.data[options.idx][1] = parseFloat(series.data[options.idx][1]) + 1;
    }
  }); /**************************************end*******************************/
  /*****************************add charts type ***************************/
  $.xpointChart.addChartType("bar", {
    zoomSettings: function (settings) {
      settings.axes.xaxis.labelRenderer = $.jqplot.CanvasAxisLabelRenderer;
      settings.axes.xaxis.tickRenderer = $.jqplot.CanvasAxisTickRenderer;
      settings.axes.xaxis.tickOptions.angle = 30;
      settings.axes.xaxis.tickOptions.formatter = function (str, value) {
        return value
      };
      return settings;
    },
    settings: function (chartModel) {
      var series = this;
      if (series) {
        var extraSeriesSettings = series.extraSeriesSettings ? series.extraSeriesSettings : {};
        extraSeriesSettings = $.extend({
          label: series.label,
          renderer: $.jqplot.BarRenderer
        }, extraSeriesSettings);
        chartModel.chartSettings.series.push(extraSeriesSettings);
        chartModel.chartData.push(series.data);
        if (series.extraChartSettings) {
          chartModel.chartSettings = $.extend(chartModel.chartSettings, series.extraChartSettings);
        }
      }
    }
  });
  $.xpointChart.addChartType("ohlc", {
    zoomSettings: function (settings) {
      settings.axes.xaxis.labelRenderer = $.jqplot.CanvasAxisLabelRenderer;
      settings.axes.xaxis.tickRenderer = $.jqplot.CanvasAxisTickRenderer;
      settings.axes.xaxis.tickOptions.angle = 30;
      settings.axes.xaxis.tickOptions.formatter = function (str, value) {
        return value
      };
      return settings;
    },
    settings: function (chartModel) {
      var series = this;
      if (series) {
        var extraSeriesSettings = series.extraSeriesSettings ? series.extraSettings : {};
        extraSeriesSettings = $.extend({
          label: series.label,
          renderer: $.jqplot.OHLCRenderer,
          rendererOptions: {
            barPadding: 6,
            barMargin: 20
          }
        }, extraSeriesSettings);
        chartModel.chartSettings.series.push(extraSeriesSettings);
        chartModel.chartData.push(series.data);
        if (series.extraChartSettings) {
          chartModel.chartSettings = $.extend(chartModel.chartSettings, series.extraChartSettings);
        }
      }
    }
  });
  $.xpointChart.addChartType("line", {
    zoomSettings: function (settings) {
      settings.axes.xaxis.labelRenderer = $.jqplot.CanvasAxisLabelRenderer;
      settings.axes.xaxis.tickRenderer = $.jqplot.CanvasAxisTickRenderer;
      settings.axes.xaxis.tickOptions.angle = 30;
      settings.axes.xaxis.tickOptions.formatter = function (str, value) {
        return value
      };
      return settings;
    },
    settings: function (chartModel) {
      var series = this;
      if (series) {
        var extraSeriesSettings = series.extraSeriesSettings ? series.extraSettings : {};
        extraSeriesSettings = $.extend({
          label: series.label,
          renderer: $.jqplot.LineRenderer
        }, extraSeriesSettings);
        chartModel.chartSettings.series.push(extraSeriesSettings);
        chartModel.chartData.push(series.data);
        if (series.extraChartSettings) {
          chartModel.chartSettings = $.extend(chartModel.chartSettings, series.extraChartSettings);
        }
      }
    }
  });
  $.xpointChart.addChartType("pie", {
    settings: function (chartModel) {
      var series = this;
      if (series) {
        var extraSettings = series.extraSeriesSettings ? series.extraSeriesSettings : {};
        var chartSettings = {};
        $.extend(extraSettings, {
          label: series.label,
          renderer: jQuery.jqplot.PieRenderer
        });
        $.extend(chartSettings, {
          highlighter: {
            show: false
          },
          seriesDefaults: {
            // Make this a pie chart.
            renderer: jQuery.jqplot.PieRenderer,
            rendererOptions: {
              // Put data labels on the pie slices.
              // By default, labels show the percentage of the slice.
              showDataLabels: true,
              dataLabelPositionFactor: 1.05,
              dataLabelThreshold:0
            }
          },
          legend: {
            show: true,
            placement: 'outsideGrid',
            renderer: $.jqplot.EnhancedLegendRenderer,
            formatter: function (value) {
              if ($.trim(value).length > 12) {
                var text = value.substring(0, 10) + "..";
                return "<span class='tipHover' title='" + value + "'>" + text + "</span>";
              }
              return value;
            },
            location: 'e'
          }
        });
        if (chartModel.series.length > 1) {
          $.extend(extraSettings, {
            label: series.label,
            renderer: jQuery.jqplot.DonutRenderer
          });

          chartSettings.seriesDefaults = {
            // make this a donut chart.
            renderer: $.jqplot.DonutRenderer,
            rendererOptions: {
              // Donut's can be cut into slices like pies.
              sliceMargin: 3,
              // Pies and donuts can start at any arbitrary angle.
              startAngle: -90,
              showDataLabels: true,
              // By default, data labels show the percentage of the donut/pie.
              // You can show the data 'value' or data 'label' instead.
              dataLabels: 'value'
            }
          };
        }
        chartModel.chartSettings.series.push(extraSettings);
        chartModel.chartData.push(series.data);
        chartModel.chartSettings = chartSettings;
        chartModel.needAutoScale = false;
      }
    }
  });
})($);