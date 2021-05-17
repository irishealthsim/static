(function($) {
    //This plugin creates audit configuration tool
    //with various options
    $.fn.auditConfiguration = function(options) {
        //define various default options for the plugin
        var defaults = {
            geturl: '/_layouts/IImpact.Web/AuditLogService.asmx/GetAuditConfig',
            updateurl: '/_layouts/IImpact.Web/AuditLogService.asmx/UpdateAuditConfig'
        };
        var options = $.extend(defaults, options);

        var constants = {
            listname: 'AuditConfiguration',
            ontracktrue: 'rly-AuditConfigOnGreen',
            ontrackfalse: 'rly-AuditConfigOnRed',
            offtracktrue: 'rly-AuditConfigOnGreen',
            offtrackfalse: 'rly-AuditConfigOnRed'
        };
        var panelid;
        function GetConfig() {
            $.ajax({ url: options.geturl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{uniquekey:'" + options.uniquekey + "'}",
                success: function(datap, st) {
                    CreateHtml(datap.d, panelid)
                },
                error: function(xhr, ajaxOptions, thrownError) {
                }
            });
        }

        function CreateHtml(data, panelid) {
            var elem = $(panelid);
            elem.empty();

            if (data == null) {
                elem.append("Problem occurred");
            }
            else {
                var header = $("<div class=''>header</div>");
                header.appendTo(elem);
                $.each(data, function(i) {
                    elem.append("<div>" + data[i].Caption + "</div>");
                    var mainOnOffDiv = $("<div class='onoffmainclass'/>").appendTo(elem); 
                    AddOnTrack(data[i].IsActive, mainOnOffDiv, data[i].ItemId);
                    AddOffTrack(data[i].IsActive, mainOnOffDiv, data[i].ItemId);
                });
                AddFooter(elem);
            }
        }

        function AddOnTrack(isactive, parentdivId, itemid) {
            var classname = isactive == true ? constants.ontracktrue : constants.ontrackfalse;
            var divclss = $("<div />").appendTo(parentdivId);
            var OnTrack = $("<a  href='#' class='" + classname + "' itemid='" + itemid + "' isactive='" + isactive + "'>on</a>").appendTo(divclss).click(function() {
                var $this = $(this);
                UpdateValue($this.attr('itemid'), $this.attr('isactive'), parentdivId);
            });
        }
        function AddOffTrack(isactive, parentdivId, itemid) {
            var classname = isactive == true ? constants.offtracktrue : constants.offtrackfalse;
            var divclss = $("<div />").appendTo(parentdivId);
            var OffTrack = $("<a href='#' class='" + classname + "' itemid='" + itemid + "' isactive='" + isactive + "'>off</a>").appendTo(divclss).click(function() {
                var $this = $(this);
                UpdateValue($this.attr('itemid'), $this.attr('isactive'), parentdivId);
            });
        }
        function AddFooter(elem) {
            elem.append("<div>Footer</div>");
        }
        function UpdateValue(itemid, isactive, parentdivid) {
            var vdata = "{id:'" + itemid + "',isactive:'" + isactive + "'}";
            $.ajax({ url: options.updateurl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: vdata,
                success: function(datap, st) {
                    var onClssNm = isactive ? "red" : "green";
                    var offClassNm = isactive ? "green" : "red";
                    var ondivcont = $("onclass", parent);
                    var offdivcont = $("offclass", parent);
                    var onlink = $("a", ondivcont).removeClass($(this).attr('attr')).addClass(onClssNm);
                    var offlink = $("a", offdivcont).removeClass($(this).attr('attr')).addClass(offClassNm);
                },
                error: function(xhr, ajaxOptions, thrownError) {
                }
            });
        }
        return this.each(function() {
            var elem = $(this);
            panelid = $("<div class='' id='panelid'/>").appendTo(elem);
            GetConfig();
        });
    }

})(jQuery);


