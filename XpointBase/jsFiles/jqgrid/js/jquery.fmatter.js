/*
**
* formatter for values but most of the values if for jqGrid
* Some of this was inspired and based on how YUI does the table datagrid but in jQuery fashion
* we are trying to keep it as light as possible
* Joshua Burnett josh@9ci.com	
* http://www.greenbill.com
*
* Changes from Tony Tomov tony@trirand.com
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
* 
**/
;
(function ($) {
	$.fmatter = {};
	//opts can be id:row id for the row, rowdata:the data for the row, colmodel:the column model for this column
	//example {id:1234,}
	$.fn.fmatter = function (formatType, cellval, opts, rwd, act) {
		//debug(this);
		//debug(cellval);
		// build main options before element iteration
		opts = $.extend({}, $.jgrid.formatter, opts);
		return fireFormatter(formatType, cellval, opts, rwd, act);
	};
	$.fmatter.util = {
		// Taken from YAHOO utils
		NumberFormat: function (nData, opts) {
			if (!isNumber(nData)) {
				nData *= 1;
			}
			if (isNumber(nData)) {
				var bNegative = (nData < 0);
				var sOutput = nData + "";
				var sDecimalSeparator = (opts.decimalSeparator) ? opts.decimalSeparator : ".";
				var nDotIndex;
				if (isNumber(opts.decimalPlaces)) {
					// Round to the correct decimal place
					var nDecimalPlaces = opts.decimalPlaces;
					var nDecimal = Math.pow(10, nDecimalPlaces);
					sOutput = Math.round(nData * nDecimal) / nDecimal + "";
					nDotIndex = sOutput.lastIndexOf(".");
					if (nDecimalPlaces > 0) {
						// Add the decimal separator
						if (nDotIndex < 0) {
							sOutput += sDecimalSeparator;
							nDotIndex = sOutput.length - 1;
						}
						// Replace the "."
						else if (sDecimalSeparator !== ".") {
							sOutput = sOutput.replace(".", sDecimalSeparator);
						}
						// Add missing zeros
						while ((sOutput.length - 1 - nDotIndex) < nDecimalPlaces) {
							sOutput += "0";
						}
					}
				}
				if (opts.thousandsSeparator) {
					var sThousandsSeparator = opts.thousandsSeparator;
					nDotIndex = sOutput.lastIndexOf(sDecimalSeparator);
					nDotIndex = (nDotIndex > -1) ? nDotIndex : sOutput.length;
					var sNewOutput = sOutput.substring(nDotIndex);
					var nCount = -1;
					for (var i = nDotIndex; i > 0; i--) {
						nCount++;
						if ((nCount % 3 === 0) && (i !== nDotIndex) && (!bNegative || (i > 1))) {
							sNewOutput = sThousandsSeparator + sNewOutput;
						}
						sNewOutput = sOutput.charAt(i - 1) + sNewOutput;
					}
					sOutput = sNewOutput;
				}
				// Prepend prefix
				sOutput = (opts.prefix) ? opts.prefix + sOutput : sOutput;
				// Append suffix
				sOutput = (opts.suffix) ? sOutput + opts.suffix : sOutput;
				return sOutput;

			} else {
				return nData;
			}
		},
		// Tony Tomov
		// PHP implementation. Sorry not all options are supported.
		// Feel free to add them if you want
		DateFormat: function (format, date, newformat, opts) {
			var token = /\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g,
                timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                timezoneClip = /[^-+\dA-Z]/g,
                pad = function (value, length) {
                	value = String(value);
                	length = parseInt(length) || 2;
                	while (value.length < length) value = '0' + value;
                	return value;
                },
                ts = {
                	m: 1,
                	d: 1,
                	y: 1970,
                	h: 0,
                	i: 0,
                	s: 0
                },
                timestamp = 0,
                dM, k, hl,
                dateFormat = ["i18n"];
			// Internationalization strings
			dateFormat["i18n"] = {
				dayNames: opts.dayNames,
				monthNames: opts.monthNames
			};
			//format = format.toLowerCase();
			date = date.split(/[\\\/:_;.\t\T\s-]/);
			format = format.split(/[\\\/:_;.\t\T\s-]/);
			// parsing for month names
			for (k = 0, hl = format.length; k < hl; k++) {
				if (format[k] == 'M') {
					dM = $.inArray(date[k], dateFormat.i18n.monthNames);
					if (dM !== -1 && dM < 12) {
						date[k] = dM + 1;
					}
				}
				if (format[k] == 'F') {
					dM = $.inArray(date[k], dateFormat.i18n.monthNames);
					if (dM !== -1 && dM > 11) {
						date[k] = dM + 1 - 12;
					}
				}
				ts[format[k].toLowerCase()] = parseInt(date[k], 10);
			}
			ts.m = parseInt(ts.m) - 1;
			var ty = ts.y;
			if (ty >= 70 && ty <= 99) ts.y = 1900 + ts.y;
			else if (ty >= 0 && ty <= 69) ts.y = 2000 + ts.y;
			timestamp = new Date(ts.y, ts.m, ts.d, ts.h, ts.i, ts.s, 0);
			if (opts.masks.newformat) {
				newformat = opts.masks.newformat;
			} else if (!newformat) {
				newformat = 'Y-m-d';
			}
			var 
                G = timestamp.getHours(),
                i = timestamp.getMinutes(),
                j = timestamp.getDate(),
                n = timestamp.getMonth() + 1,
                o = timestamp.getTimezoneOffset(),
                s = timestamp.getSeconds(),
                u = timestamp.getMilliseconds(),
                w = timestamp.getDay(),
                Y = timestamp.getFullYear(),
                N = (w + 6) % 7 + 1,
                z = (new Date(Y, n - 1, j) - new Date(Y, 0, 1)) / 86400000,
                flags = {
                	// Day
                	d: pad(j),
                	D: dateFormat.i18n.dayNames[w],
                	j: j,
                	l: dateFormat.i18n.dayNames[w + 7],
                	N: N,
                	S: opts.S(j),
                	//j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th',
                	w: w,
                	z: z,
                	// Week
                	W: N < 5 ? Math.floor((z + N - 1) / 7) + 1 : Math.floor((z + N - 1) / 7) || ((new Date(Y - 1, 0, 1).getDay() + 6) % 7 < 4 ? 53 : 52),
                	// Month
                	F: dateFormat.i18n.monthNames[n - 1 + 12],
                	m: pad(n),
                	M: dateFormat.i18n.monthNames[n - 1],
                	n: n,
                	t: '?',
                	// Year
                	L: '?',
                	o: '?',
                	Y: Y,
                	y: String(Y).substring(2),
                	// Time
                	a: G < 12 ? opts.AmPm[0] : opts.AmPm[1],
                	A: G < 12 ? opts.AmPm[2] : opts.AmPm[3],
                	B: '?',
                	g: G % 12 || 12,
                	G: G,
                	h: pad(G % 12 || 12),
                	H: pad(G),
                	i: pad(i),
                	s: pad(s),
                	u: u,
                	// Timezone
                	e: '?',
                	I: '?',
                	O: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                	P: '?',
                	T: (String(timestamp).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                	Z: '?',
                	// Full Date/Time
                	c: '?',
                	r: '?',
                	U: Math.floor(timestamp / 1000)
                };
			return newformat.replace(token, function ($0) {
				return $0 in flags ? flags[$0] : $0.substring(1);
			});
		}
	};
	$.fn.fmatter.defaultFormat = function (cellval, opts) {
		return (isValue(cellval) && cellval !== "") ? cellval : opts.defaultValue ? opts.defaultValue : "&#160;";
	};
	$.fn.fmatter.email = function (cellval, opts) {
		if (!isEmpty(cellval)) {
			return "<a href=\"mailto:" + cellval + "\">" + cellval + "</a>";
		} else {
			return $.fn.fmatter.defaultFormat(cellval, opts);
		}
	};
	$.fn.fmatter.checkbox = function (cval, opts) {
		var op = $.extend({}, opts.checkbox),
                ds;
		if (!isUndefined(opts.colModel.formatoptions)) {
			op = $.extend({}, op, opts.colModel.formatoptions);
		}
		if (op.disabled === true) {
			ds = "disabled";
		} else {
			ds = "";
		}
		cval = cval + "";
		cval = cval.toLowerCase();
		var bchk = cval.search(/(false|0|no|off)/i) < 0 ? " checked='checked' " : "";
		return "<input type=\"checkbox\" " + bchk + " value=\"" + cval + "\" offval=\"no\" " + ds + "/>";
	},
        $.fn.fmatter.link = function (cellval, opts) {
        	var op = {
        		target: opts.target
        	};
        	var target = "";
        	if (!isUndefined(opts.colModel.formatoptions)) {
        		op = $.extend({}, op, opts.colModel.formatoptions);
        	}
        	if (op.target) {
        		target = 'target=' + op.target;
        	}
        	if (!isEmpty(cellval)) {
        		return "<a " + target + " href=\"" + cellval + "\">" + cellval + "</a>";
        	} else {
        		return $.fn.fmatter.defaultFormat(cellval, opts);
        	}
        };
	$.fn.fmatter.showlink = function (cellval, opts) {
		var op = {
			baseLinkUrl: opts.baseLinkUrl,
			showAction: opts.showAction,
			addParam: opts.addParam,
			target: opts.target,
			idName: opts.idName
		},
            target = "";
		if (!isUndefined(opts.colModel.formatoptions)) {
			op = $.extend({}, op, opts.colModel.formatoptions);
		}
		if (op.target) {
			target = 'target=' + op.target;
		}
		idUrl = op.baseLinkUrl + op.showAction + '?' + op.idName + '=' + opts.rowId + op.addParam;
		if (isString(cellval)) { //add this one even if its blank string
			return "<a " + target + " href=\"" + idUrl + "\">" + cellval + "</a>";
		} else {
			return $.fn.fmatter.defaultFormat(cellval, opts);
		}
	};
	$.fn.fmatter.integer = function (cellval, opts) {
		var op = $.extend({}, opts.integer);
		if (!isUndefined(opts.colModel.formatoptions)) {
			op = $.extend({}, op, opts.colModel.formatoptions);
		}
		if (isEmpty(cellval)) {
			return op.defaultValue;
		}
		return $.fmatter.util.NumberFormat(cellval, op);
	};
	$.fn.fmatter.number = function (cellval, opts) {
		var op = $.extend({}, opts.number);
		if (!isUndefined(opts.colModel.formatoptions)) {
			op = $.extend({}, op, opts.colModel.formatoptions);
		}
		if (isEmpty(cellval)) {
			return op.defaultValue;
		}
		return $.fmatter.util.NumberFormat(cellval, op);
	};
	$.fn.fmatter.currency = function (cellval, opts) {
		var op = $.extend({}, opts.currency);
		if (!isUndefined(opts.colModel.formatoptions)) {
			op = $.extend({}, op, opts.colModel.formatoptions);
		}
		if (cellval.indexOf('br') >= 0) {
			return $.fn.fmatter.defaultFormat(cellval, opts);
		}
		if (cellval.indexOf('div') >= 0) {
			return $.fn.fmatter.defaultFormat(cellval, opts);
		}
		if (isEmpty(cellval)) {
			return op.defaultValue;
		}
		return $.fmatter.util.NumberFormat(cellval, op);
	};
	$.fn.fmatter.date = function (cellval, opts, act) {
		var op = $.extend({}, opts.date);
		if (!isUndefined(opts.colModel.formatoptions)) {
			op = $.extend({}, op, opts.colModel.formatoptions);
		}
		if (!op.reformatAfterEdit && act == 'edit') {
			return $.fn.fmatter.defaultFormat(cellval, opts);
		} else if (!isEmpty(cellval)) {
			return $.fmatter.util.DateFormat(op.srcformat, cellval, op.newformat, op);
		} else {
			return $.fn.fmatter.defaultFormat(cellval, opts);
		}
	};
	/*Custom Formatter for Peoplepicker , this will create data entry with document entry 
	* for people picker value
	*/
	$.fn.fmatter.peoplepicker = function (cellval, opts) {
		if (!isEmpty(cellval)) {
			$.data(document.body, opts.colModel.name + opts.rowId + "peoplepickerdata", cellval);
			var elemhtml = "";
			var firstval = true;
			$.each(cellval.split(","), function () {
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
			return $.fn.fmatter.defaultFormat(cellval, opts);
		}
	};
	$.fn.fmatter.select = function (cellval, opts, act) {
		// jqGrid specific
		if (act == 'edit') {
			return $.fn.fmatter.defaultFormat(cellval, opts);
		} else if (!isEmpty(cellval)) {
			var oSelect = false;
			if (!isUndefined(opts.colModel.editoptions)) {
				oSelect = opts.colModel.editoptions.value;
			}
			if (oSelect) {
				var ret = [],
                    msl = opts.colModel.editoptions.multiple === true ? true : false,
                    scell = [],
                    sv;
				if (msl) {
					scell = cellval.split(",");
					scell = $.map(scell, function (n) {
						return $.trim(n);
					})
				}
				if (isString(oSelect)) {
					// mybe here we can use some caching with care ????
					var so = oSelect.split(";"),
                        j = 0;
					for (var i = 0; i < so.length; i++) {
						sv = so[i].split(":");
						if (msl) {
							if (jQuery.inArray(sv[0], scell) > -1) {
								ret[j] = sv[1];
								j++;
							}
						} else if ($.trim(sv[0]) == $.trim(cellval)) {
							ret[0] = sv[1];
							break;
						}
					}
				} else if (isObject(oSelect)) {
					// this is quicker
					if (msl) {
						ret = jQuery.map(scel, function (n, i) {
							return oSelect[n];
						});
					}
					ret[0] = oSelect[cellval] || "";
				}
				return ret.join(", ");
			} else {
				return $.fn.fmatter.defaultFormat(cellval, opts);
			}
		}
	};
	$.fn.fmatter.imageformatter = function (cellvalue, options, rowdata) {
		var val = "<img alt='" + cellvalue + "' src='/_layouts/Images/XpointBase/";
		if (cellvalue == "Amber") {
			val += "Orange";
		} else {
			val += cellvalue;
		}
		return val += ".gif'/>";
	};

	$.fn.fmatter.doclinkformatter = function (cellvalue, options, rowdata) {
		var retVal = "";
		if (cellvalue != "") {
			var cellValues = cellvalue.split(',');
			$.each(cellValues, function (index) {
				var returnVal = $(cellValues[index]).hasClass("docLinkOverlay");
			    var href;
			    if (returnVal) {
			        href = $(cellValues[index]).find("a").attr('href');
			    }
			    else {
			        href = $(cellValues[index]).attr('href');
			    }
				var array = href.split('/');
				var docname = array[array.length - 1];
                var val = "<p id='clickToOpen'>Click to open</p><a class='file' data-docname='" + docname.replace(/%20/g, " ") + "' docname='"+docname+"' filePath="+href+" target='_blank' id='"+options.rowId+"' value='click' onclick='downloadFile(this);' style='display:inline-block;float:left;' `><span class='xp-IconAttachDoc' title='" + docname.replace(/%20/g, " ") + "'></span></a>";
				retVal += val;
			});
		}
		return retVal
	};

    /*To download the pptx, xlsx,docx file in IE11 which are attached to tool*/

	downloadFile = function (Value) {
	    var val = Value.attributes.docname.value;
	    var fileExt = val.substr( (val.lastIndexOf('.') +1) );
        var trackerID='';
	    if($.urlParam('trackerId')!=undefined)
	    {
	    	trackerID=$.urlParam('trackerId');
	    }
	    else if ($.urlParam('TrackerID')!=undefined)
	    {
	    	trackerID=$.urlParam('TrackerID');
	    }

	    var filePath = Value.attributes.filePath.value;
	    var sourceDocument;

	    if (filePath.indexOf("LifecycleTemplates") >= 0) {
	        sourceDocument = 'Lists/LifecycleTemplates';
	    }

	    else if (filePath.indexOf("LifecycleDocuments") >= 0) {
	        sourceDocument = 'LifecycleDocuments';
	    }

	    if (fileExt == 'doc' || fileExt == 'ppt' || fileExt == 'xls' || fileExt == 'docx' || fileExt == 'pptx' || fileExt == 'xlsx') {
	        $.ajax({
	            url: "/_layouts/IImpact.Web/LifecycleDocumentsService.asmx/GetDocumentnodeId",
	            contentType: "application/json; charset=utf-8",
	            type: "post",
	            dataType: "json",
                async:false,
	            data: "{FilePath:'" + filePath + "'}",
	            success: function (datap) {
	                var result = jQuery.parseJSON(datap.d);
	                window.location.href = "/_layouts/xpointbase/pages/DownloadMSOfficeFiles.aspx?trackerId=" + trackerID + "&nodeId=" + result.FileID + "&sourceDoc=" + sourceDocument + "&fileExt=" + "." + fileExt + "&fileVersion=" + result.FileVersion + "";
	            }
	        });
	    }
	    else {

	        window.open(filePath, '_blank');

	    }
	};

	$.fn.fmatter.doc = function (cellvalue, options, rowdata) {
		var retVal = "";
		y = options.rowId;
		var imageContainer = '<div >';
		imageContainer += '<p >';
		imageContainer += '<a title="Import data from CSV" id="import_' + options.rowId + '" value="click" onclick="ImportFile(this);"  class="xp-exportIcon" href="javascript:void(0);"  style="display:inline-block;float:left;"></a>';
		imageContainer += '</p>';
		imageContainer += '<p>';
		imageContainer += '<a title="Export table data to CSV" id="export_' + options.rowId + '" value="click" onclick="ExportFile(this);" class="xp-importIcon" href="javascript:void(0);"  style="display:inline-block;float:left;"></a>';
		imageContainer += '<p>';
		imageContainer += '<a title="Export Template to CSV" id="exporttemplate_' + options.rowId + '" value="click" onclick="ExportTemplate(this);" class="xp-TemplateIcon" href="javascript:void(0);"  style="display:inline-block;float:left;"></a>';
		imageContainer += '</p><p style="clear: both;">';
		imageContainer += '</div>';
		retVal += imageContainer;
		return retVal;
	};

	ExportFile = function (el) {
		var rowId = $(el).attr("id").split('_')[1];
		var trackerID = $.urlParam('trackerId');
		var url = "/_layouts/XPoint.Client/pages/spcChartDataExport.aspx?tid=" + trackerID + "&rid=" + rowId;
		var iframe = $("#myframe");
		if (iframe.length > 0) {
			iframe.remove();
		}
		var element = document.createElement("iframe");
		element.setAttribute('id', 'myframe');
		element.setAttribute('src', url);
		element.style.display = "none";
		document.body.appendChild(element);
	};

	ExportTemplate = function (el) {
		var rowId = $(el).attr("id").split('_')[1];
		var trackerID = $.urlParam('trackerId');
		var url = "/_layouts/XPoint.Client/pages/SPCChartTemplateExport.aspx?tid=" + trackerID + "&rid=" + rowId;
		var iframe = $("#Templateframe");
		if (iframe.length > 0) {
			iframe.remove();
		}
		var element = document.createElement("iframe");
		element.setAttribute('id', 'myframe');
		element.setAttribute('src', url);
		element.style.display = "none";
		document.body.appendChild(element);
	};

	ImportFile = function (el) {
		console.log("Import");
		var rowId = $(el).attr("id").split('_')[1];
		var tempId = $(el).attr("id");

		/*To create a popup For Browse the File*/
		var overlay = $('<div id="overlay"></div>');
		overlay.appendTo(document.body);
		overlay.show();
		var outerLayout = $("<div class='popup' />");
		var messagePOpupOuterlayout = $("<div class='xp-popup' />");
		var closeButton = $("<div class='xp-close-border'><span id='browseHeader' class='BrowseFilePopupHeader'>Browse File</span><span class='close' id='close' >X</span></div>");

		var messageBox = " <body >";
		messageBox += "<div >";
		messageBox += "<p id='xp-loader' class='xp-message'>Please select only CSV format</p>";
		messageBox += "<a class='ui-button-text xp-browse' id='uploadFile'>Browse</a>";
		messageBox += "</div>";

		/*append layouts from inner to outside layout*/
		messagePOpupOuterlayout.append(closeButton);
		messagePOpupOuterlayout.append($(messageBox));
		outerLayout.append(messagePOpupOuterlayout);
		outerLayout.appendTo(overlay);
		$('.popup').show();

		$("#close").click(function () {
			$('.popup').remove();
			overlay.remove();
			return false;
		});

		var uploadObject;
		/*call ajaxUpload method of jqery to upload file*/
		var path = '/_layouts/IImpact.Web/NGHA/SPCChartService.asmx/ImportFile';

		$('#uploadFile').live('click', function (e) {
			uploadObject = new AjaxUpload($("#uploadFile"), {
				action: path,
				autoSubmit: true,
				name: 'uploadSPCFile',
				dataType: "json",
				type: "POST",
				contentType: "application/json; charset=utf-8",
				responseType: "json",
				onComplete: function (file, response) {
					console.log("On Submit Response: " + response);
					console.log(response);
					var statusValue = $(response.getElementsByTagName('Status')[0]).text();
					var message = $(response.getElementsByTagName('Message')[0]).text();

					if (statusValue == 1) {
						$("#browseHeader").html("Status");
						$("#xp-loader").html("Import file contains duplicate entries so cannot be imported.").css({
							"color": "red",
							"text-align": "center"
						});
						$("#xp-loader").append("<div><a class='ui-button-text xp-browse' style='color:#ffffff' id='uploadFile'><input class='browser-hidden' type='file' style='width:1px;height:0px;'>Retry</input></a></div>");
					} else {
						$.ajax({
							url: "/_layouts/IImpact.Web/NGHA/SPCChartService.asmx/SaveRowid",
							contentType: "application/json; charset=utf-8",
							type: "post",
							dataType: "json",
							data: "{rowid:'" + rowId + "'}",
							responseType: "json",
							success: function (datap) {
								window.location.reload();
							}
						});
					}
				},
				/* Validating the file among the accepted extensions or not*/
				onSubmit: function (file, ext) {
					$("#browseHeader").html("Status");
					$("#xp-loader").html("<img src='/_layouts/Images/Xpointbase/loader.gif' style='display: block;margin-left: auto;margin-right: auto;'></img>");
					$("#uploadFile").remove();
					//add file to doc folder
					console.log("On Submit File: " + file);
				},
				/*When user selects a file,Show the filename in textbox*/
				onChange: function (file, extension) {
					console.log("onchange");
					var trackerID = $.urlParam('trackerId');
					uploadObject.setData({
						'rowId': rowId,
						'trackerId': trackerID
					});
					console.log("File: " + file);
				}
			}); //end ajax upload
			uploadObject.submit();
		});
		/*end of ajax upload code ends*/
		$("#uploadFile").trigger("click");
	};

	$.urlParam = function (name) {
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return undefined;
        }
		return results[1];
	};

	$.unformat = function (cellval, options, pos, cnt, rowid) {
		// specific for jqGrid only
		var ret, formatType = options.colModel.formatter,
            op = options.colModel.formatoptions || {},
            unformatFunc = options.colModel.unformat || ($.fn.fmatter[formatType] && $.fn.fmatter[formatType].unformat);

		if (unformatFunc !== 'undefined' && isFunction(unformatFunc)) {
			ret = unformatFunc(cellval, options);
		} else if (formatType !== 'undefined' && isString(formatType)) {
			var opts = $.jgrid.formatter || {},
                stripTag;
			switch (formatType) {
				/*
				case 'link' :
				case 'showlink' :
				case 'email' :
				ret= $(cellval).text();
				break;
				*/ 
				case 'peoplepicker':
					return $.data(document.body, options.colModel.name + rowid + "peoplepickerdata");
				case 'integer':
					op = $.extend({}, opts.integer, op);
					stripTag = eval("/" + op.thousandsSeparator + "/g");
					ret = $(cellval).text().replace(stripTag, '');
					break;
				case 'number':
					op = $.extend({}, opts.number, op);
					stripTag = eval("/" + op.thousandsSeparator + "/g");
					ret = $(cellval).text().replace(op.decimalSeparator, '.').replace(stripTag, "");
					break;
				case 'currency':
					op = $.extend({}, opts.currency, op);
					stripTag = eval("/" + op.thousandsSeparator + "/g");
					ret = $(cellval).text().replace(op.decimalSeparator, '.').replace(op.prefix, '').replace(op.suffix, '').replace(stripTag, '');
					break;
				case 'checkbox':
					var cbv = (options.colModel.editoptions) ? options.colModel.editoptions.value.split(":") : ["Yes", "No"];
					ret = $('input', cellval).attr("checked") ? cbv[0] : cbv[1];
					break;
				case 'imageformatter':
					return $('img', cellval).attr('alt');
				case 'doclinkformatter':
					var ret = "";
					$(cellval).find('a').each(function (index) {
						var href = $(this).attr('href');
						var docname = $(this).data().docname;
						var anchor = "<a href='" + href + "'>" + docname + "</a>";
						ret = ret == "" ? anchor : ret + "," + anchor;
					});
					return ret;
				default:
					ret = $(cellval).text();
					break;
			}
		}
		return ret ? ret : cnt === true ? $(cellval).text() : $.jgrid.htmlDecode($(cellval).html());
	};

	function fireFormatter(formatType, cellval, opts, rwd, act) {
		formatType = formatType.toLowerCase();
		var v = cellval;

		if ($.fn.fmatter[formatType]) {
			v = $.fn.fmatter[formatType](cellval, opts, act);
		}

		return v;
	};
	//private methods and data
	function debug($obj) {
		if (window.console && window.console.log) window.console.log($obj);
	};
	/**
	* A convenience method for detecting a legitimate non-null value.
	* Returns false for null/undefined/NaN, true for other values, 
	* including 0/false/''
	*  --taken from the yui.lang
	*/
	isValue = function (o) {
		return (isObject(o) || isString(o) || isNumber(o) || isBoolean(o));
	};
	isBoolean = function (o) {
		return typeof o === 'boolean';
	};
	isNull = function (o) {
		return o === null;
	};
	isNumber = function (o) {
		return typeof o === 'number' && isFinite(o);
	};
	isString = function (o) {
		return typeof o === 'string';
	};
	/**
	* check if its empty trim it and replace \&nbsp and \&#160 with '' and check if its empty ===""
	* if its is not a string but has a value then it returns false, Returns true for null/undefined/NaN
	essentailly this provdes a way to see if it has any value to format for things like links
	*/
	isEmpty = function (o) {
		if (!isString(o) && isValue(o)) {
			return false;
		} else if (!isValue(o)) {
			return true;
		}
		o = $.trim(o).replace(/\&nbsp\;/ig, '').replace(/\&#160\;/ig, '');
		return o === "";

	};
	isUndefined = function (o) {
		return typeof o === 'undefined';
	};
	isObject = function (o) {
		return (o && (typeof o === 'object' || isFunction(o))) || false;
	};
	isFunction = function (o) {
		return typeof o === 'function';
	};

})(jQuery);