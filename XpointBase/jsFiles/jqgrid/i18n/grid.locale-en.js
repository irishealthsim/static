; (function ($) {
    /**
     * jqGrid English Translation
     * Tony Tomov tony@trirand.com
     * http://trirand.com/blog/ 
     * Dual licensed under the MIT and GPL licenses:
     * http://www.opensource.org/licenses/mit-license.php
     * http://www.gnu.org/licenses/gpl.html
    **/

    /*NOTE:This is a modified file to fulfill multilingual feature in grid tools*/
    
    $.jgrid = {


        defaults: {
            recordtext: defaults.recordtext,
            emptyrecords: defaults.emptyrecords,
            loadtext: defaults.loadtext,
            pgtext: defaults.pgtext
        },
        search: {
            caption: "Search...",
            Find: "Find",
            Reset: "Reset",
            odata: ['equal to', 'not equal to', 'less than', 'less than or equal to', 'greater than', 'greater than or equal to', 'begins with', 'does not begin with', 'is in', 'is not in', 'ends with', 'does not end with', 'contains', 'does not contain'],
            groupOps: [{ op: "AND", text: "all" }, { op: "OR", text: "any" }],
            matchText: " match",
            rulesText: " rules"
        },
        edit: {
            addCaption: edit.addCaption,
            editCaption: edit.editCaption,
            bSubmit: edit.bSubmit,
            bCancel: edit.bCancel,
            bClose: edit.bClose,
            saveData: edit.saveData,
            bYes: edit.bYes,
            bNo: edit.bNo,
            bExit: edit.bExit,
            msg: {
                required: edit.msg['required'],
                number: "Please, enter valid number",
                minValue: "value must be greater than or equal to ",
                maxValue: "value must be less than or equal to",
                email: "is not a valid e-mail",
                integer: "Please, enter valid integer value",
                date: "Please, enter valid date value",
                url: "is not a valid URL. Prefix required ('http://' or 'https://')",
                nodefined: " is not defined!",
                novalue: " return value is required!",
                customarray: "Custom function should return array!",
                customfcheck: "Custom function should be present in case of custom checking!"

            }
        },
        view: {
            caption: "View Record",
            bClose: "Close"
        },
        del: {
            caption: del.caption,
            msg: del.msg,
            bSubmit: del.bSubmit,
            bCancel: del.bCancel
        },
        nav: {
            edittext: "",
            edittitle: nav.edittitle,
            addtext: "",
            addtitle: nav.addtitle,
            deltext: "",
            deltitle: nav.deltitle,
            searchtext: "",
            searchtitle: "Find records",
            refreshtext: "",
            refreshtitle: "Reload Grid",
            alertcap: nav.alertcap,
            alerttext: nav.alerttext,
            viewtext: "",
            viewtitle: "View selected row"
        },
        col: {
            caption: "Select columns",
            bSubmit: "Ok",
            bCancel: "Cancel"
        },
        errors: {
            errcap: "Error",
            nourl: "No url is set",
            norecords: "No records to process",
            model: "Length of colNames <> colModel!"
        },
        formatter: {
            integer: { thousandsSeparator: " ", defaultValue: '0' },
            number: { decimalSeparator: ".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0.00' },
            currency: { decimalSeparator: ".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix: "", defaultValue: '0.00' },
            date: {
                dayNames: [
                    "Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat",
                    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                ],
                monthNames: [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
                ],
                AmPm: ["am", "pm", "AM", "PM"],
                S: function (j) { return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th' },
                srcformat: 'Y-m-d',
                newformat: 'd/m/Y',
                masks: {
                    ISO8601Long: "Y-m-d H:i:s",
                    ISO8601Short: "Y-m-d",
                    ShortDate: "n/j/Y",
                    LongDate: "l, F d, Y",
                    FullDateTime: "l, F d, Y g:i:s A",
                    MonthDay: "F d",
                    ShortTime: "g:i A",
                    LongTime: "g:i:s A",
                    SortableDateTime: "Y-m-d\\TH:i:s",
                    UniversalSortableDateTime: "Y-m-d H:i:sO",
                    YearMonth: "F, Y"
                },
                reformatAfterEdit: false
            },
            baseLinkUrl: '',
            showAction: '',
            target: '',
            checkbox: { disabled: true },
            idName: 'id'
        }
    };
})(jQuery);
