var npChart = {
	"Canvas": {
		"Width": 600,
		"Height": 530
	},
	"SPCChart": {
		"InitChartProperties": {
			"SPCChartType": "NUMBER_DEFECTIVE_PARTS_CHART",
			"ChartMode": "Time",
			"NumCategories": 5,
			"NumSamplesPerSubgroup": 50,
			"NumDatapointsInView": 12,
			"TimeIncrementMinutes": 60
		},
		"ChartPositioning": {
			"GraphStartPosX": 0.125
		},
		"Scrollbar": {
			"EnableScrollBar": true
		},
		"TableSetup": {
			"HeaderStringsLevel": "HEADER_STRINGS_LEVEL1",
			"EnableInputStringsDisplay": true,
			"EnableCategoryValues": false,
			"EnableCalculatedValues": true,
			"EnableTotalSamplesValues": false,
			"EnableNotes": false,
			"EnableTimeValues": true,
			"EnableNotesToolTip": true,
			"TableBackgroundMode": "TABLE_SINGLE_COLOR_BACKGROUND",
			"BackgroundColor1": "LIGHTBLUE",
			"BackgroundColor2": "LIGHTGOLDENRODYELLOW",
			"TableAlarmEmphasisMode": "ALARM_HIGHLIGHT_TEXT",
			"ChartAlarmEmphasisMode": "ALARM_HIGHLIGHT_SYMBOL",
			"ChartData": {
				"Title": "Number of Discharges",
				"PartNumber": "",
				"ChartNumber": "-",
				"PartName": "",
				"Operation": "",
				"SpecificationLimits": "",
				"Operator": "",
				"Machine": "",
				"Gauge": "",
				"UnitOfMeasure": "0.0001inch",
				"ZeroEquals": "zero",
				"DateString": "",
				"NotesMessage": "",
				"NotesHeader": "NOTES"
			}
		},
		"Events": {
			"EnableDataToolTip": true,
			"AlarmStateEventEnable": true
		},
		"SampleData": {
			"SampleIntervalRecords": []
		},
		"Methods": {
			"AutoCalculateControlLimits": true,
			"AutoScaleYAxes": true,
			"RebuildUsingCurrentData": true
		}
	}
};



function loadChartWithData(mid) {
	//console.log('====MID=====' + mid);
	var postData = '{mid: "' + mid + '"}';
	var url = window.location.origin;

	$.ajax({
	    url: "" + url + "/_layouts/IImpact.Web/NGHA/PIChartService.asmx/GetDataForChart",
		type: "POST",
		dataType: "json",
		contentType: "application/json",
		data: postData,
		error: function (jqXHR, textStatus, errorThrown) {
			console.log('Error Status: ' + textStatus);
			console.log('Error Throwsn: ' + errorThrown);
			console.log(jqXHR);

		},
		success: function (result) {
			var sampleDataResult = result.d;
			if (sampleDataResult.length > 0) {
				var utcSeconds = sampleDataResult[0].TimeStamp;
				var chartDateStartDate = new Date(utcSeconds);
				//chartDateStartDate.setUTCSeconds(utcSeconds);

				var dateString = chartDateStartDate.getDate() + '/' + (chartDateStartDate.getMonth() + 1) + '/' + chartDateStartDate.getFullYear();
				npChart.SPCChart.TableSetup.ChartData.DateString = dateString;
			}
			//console.log(JSON.stringify(sampleDataResult));
			npChart.SPCChart.SampleData.SampleIntervalRecords = sampleDataResult;

		}
	});
}

