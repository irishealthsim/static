$.xpoint = $.xpoint || {};
$.xpoint.utils =
{
  /*Holds css classes */
	classes: {
		displayNone: 'xp-DisplayNone',
		displayBlock: 'xp-DisplayBlock'
	},
  /*Helper for Ajax calls */
  ajaxCall: function (ajaxOpts) {
    if (ajaxOpts) {
      var aOpts = { type: "POST", contentType: "application/json; charset=utf-8", dataType: "json", data: '' };
      aOpts = $.extend(aOpts, ajaxOpts);
      $.ajax(aOpts);
    }
  },
  /*returns image url based on the file name passed */
    getImageUrl: function (file, onSuccess, onImageFailure) {
    	var ext = file.split('.').pop();
    	var imgUrl = "/_layouts/Images/lg_ic" + ext + ".png";
    	var altImgUrl = "/_layouts/Images/lg_ic" + ext + ".gif";
    	var defaultUrl = "/_layouts/images/lg_icgen.gif";
    	var img = $("<img />")
		           .attr("src", imgUrl + "?" + new Date().getTime());
    	img.load(function () {
    		onSuccess(imgUrl);
    	})
		.error(function () {
			var altImg = $("<img />")
		           .attr("src", altImgUrl + "?" + new Date().getTime());
			altImg.load(function () {
				onSuccess(altImgUrl);
			})
			.error(function () {
				onImageFailure(defaultUrl);
			});
		});
    	return false;
    },
   /* Adds offset( should be passed in minutes) to the supplied date and returns*/
   addOffset: function (date, offset) {
   	/*
   	* we get offset in minutes we should convert it to milliseconds 
   	* convertedTime = numberOfMinutes * 60,000 (60,000 milli seconds per one minute)
   	*/
   	return new Date(date.getTime() + (offset * 60000))
   },
   /*Parses date according to the fomrats passed */
   parseDate: function (date, format1, format2) {
   	var parsedDate;
   	if (date) {
   		try {
   			if (format1) {
   				parsedDate = $.datepicker.parseDate(format1, date);
   			}
   		}
   		catch (ex) {
   			if (format2) {
   				parsedDate = $.datepicker.parseDate(format2, date);
   			}
   		}
   	}
   	return parsedDate;
   },
   /*
   * Encodes html 
   */
   htmlEncode: function (value) {
   	return $('<div />').text(value).html();
   },
   /*
   *  Decodes html
   */
   htmlDecode: function (value) {
   	return $('<div />').html(value).text();
   },
   /*hides and clears error div */
   clearError: function (errorMainDiv, errorTextDiv) {
   	if (errorMainDiv != null) {
   		$("#" + $.makeUserPost.ids.errorMainDiv).addClass($.xpoint.utils.classes.displayNone);
   		elem.removeClass($.xpoint.utils.classes.displayBlock);
   		elem.empty();
   	}
   },
   /*Adds error message*/
   addError: function (errorMainDiv, errorTextDiv, errorText) {
   	if (errorMainDiv != null) {
   		$("#" + errorMainDiv).removeClass($.xpoint.utils.classes.displayNone);
   		$("#" + errorTextDiv).fadeIn(2500);
   		$("#" + errorTextDiv).text(errorText).fadeOut(2500);
   	}
   },
  /* Format Date in required format */
  formatDate: function (date) {
    if (typeof (date) == "object") {
      var hours = date.getHours(),
      minutes = date.getMinutes(),
      minutesText = (minutes < 10 && minutes > 0) ? "0" + minutes : minutes,
      hoursText = (hours > 12) ? (hours - 12) + ":" + minutesText + " PM" : hours + ":" + minutesText + " AM";
      return date.formatDate('dd-mmm-yyyy - ') + hoursText;
    } else {
      return null;
    }
  }
};