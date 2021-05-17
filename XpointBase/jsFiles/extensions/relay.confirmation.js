(function($) {

    /*This plugin will attach Modal Popup to a Hyperlink tag with class name 
    *options :  Classname -  name of the css class with which need to attach the plugin
    *Content : content of the div which need to be shown on click of the hyperlink 
    */
    $.fn.confirm = function(options) {
        var defaults = {
            classname: "opener",
            content: "",
            currentlink: "",
            confirmmessage: ""
        };
        var options = $.extend(defaults, options);
        var divid = options.classname + "dialogbody";
        function PrepareContentDiv() {
            var html = '<div id=' + divid + ' title="Confirmation" style="display:none">' +
	'<p><span class="ui-icon ui-icon-alert xp-FloatLeft" style=" margin:0 7px  0;"></span>' + options.confirmmessage + '</p>' +
'</div>';
            $('body').append(html);

        }
        return this.each(function() {
            var dialogid = "#" + divid;
            if (options.content = "" || $(dialogid).length == 0) {
                PrepareContentDiv();
            }
            $(dialogid).dialog('destroy');
            $(dialogid).dialog({
                autoOpen: false,
                resizable: false,
                modal: true,
                buttons: {

                    'Delete': function() {
                        window.location = options.currentlink;
                    },
                    Cancel: function() {
                        $(this).dialog('close');
                    }
                    
                }
            });
            $("." + options.classname).click(function() {
                options.currentlink = $(this).attr("href");
                $(dialogid).dialog('open');
                $(".ui-dialog :button").blur();
                $(".ui-dialog :button").each(function() {
                    var $val = $(this).attr("innerHTML");
                    if ($val == 'Delete') {
                        $(this).addClass("ui-state-focus");
                    }
                    else {
                        $(this).removeClass("ui-state-focus");
                    }
                });

                return false;
            });
            $(".ui-dialog :button").hover(function() {
                $(".ui-dialog :button").blur();
                $(this).addClass("ui-state-focus");
            });
        });
    };

})(jQuery);