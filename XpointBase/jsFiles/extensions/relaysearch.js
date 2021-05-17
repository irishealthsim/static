/**
*
*  URL encode / decode
*  http://www.webtoolkit.info/
*
**/

var Url = {

    // public method for url encoding
    encode: function(string) {
        return escape(this._utf8_encode(string));
    },

    // public method for url decoding
    decode: function(string) {
        return this._utf8_decode(unescape(string));
    },

    // private method for UTF-8 encoding
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}
/**
* Search Plugin for search related  functionalities required in 
* Impact platform
* Anirudh Gupta
* Copy Right Relay Consultants
**/
function FormatKeyword(key) {
    var keys = key.split(' ');
    var keyword = '';
    $.each(keys, function(i, key) {
        if (i != 0) {
            keyword += "+";
        }
        keyword += this;
    });
    return keyword;
}

function DeFormatKeyword(key) {
    var keys = key.split('+');
    var keyword = '';
    $.each(keys, function(i, key) {
        if (i != 0) {
            keyword += " ";
        }
        keyword += this;
    });
    return keyword;
}

function populateSearchContainer(options) {
    $("#" + options.searchadvanceboxid).find("input").each(function(el) {
        var filtertype = $(this).attr('filtertype');
        var key = $.getquery()[filtertype];
        if (key != null) {

            if ($(this).hasClass('date')) {
                var datesinputs = key.split('-');
                $(this).val($.datepicker.formatDate('M dd, yy', new Date(datesinputs[0], datesinputs[1] - 1, datesinputs[2])));
            }

            else {
                $(this).val(key);
            }
        }
    });
    $("#" + options.searchadvanceboxid).find("select").each(function(el) {
        var key = $.getquery()[$(this).attr('filtertype')];
        if (key != null) {
            var thisobj = this;
            if ($(this).attr('filtertype') != "phase") {
                $(thisobj).val(key);
            }
            else {
                $lifecycle = $(".lcname");
                if ($lifecycle.length > 0) {
                    $lifecycle.trigger('change');
                    setTimeout(function() {
                        $(thisobj).val(key);
                    }, 250);
                }
            }
        }

    });

}
function bindControlDataTypes() {
    var classficationweb = null, $geography = null, $lifecycle = null, $phasename = null;
    var advkey = $.getquery()['advopen'];
    if ($(".name").length > 0) {
        $.each($(".name"), function() {
            var currentname = $(this);
            var isprsExist = $.getquery()[currentname.attr('filtertype')];
            if (advkey != null && isprsExist != null) {
                currentname.peoplepicker({
                    hoverprofile: false,
                    searchurl: '/_layouts/IImpact.Web/ChatService.asmx/SearchUsers',
                    needformat: true,
                    prePopulate: Url.decode(isprsExist)
                });
            }
            else {
                currentname.peoplepicker({
                    hoverprofile: false,
                    searchurl: '/_layouts/IImpact.Web/ChatService.asmx/SearchUsers'
                });
            }
        });
    }
    $(".date").datepicker({ dateFormat: 'M dd, yy' });
    classficationweb = "/_layouts/IImpact.Web/ClassificationService.asmx/Classification";
    $geography = $(".geog");
    if ($geography.length > 0) {
        var val = $.getquery()[$geography.attr('filtertype')] ? $.getquery()[$geography.attr('filtertype')] : "";
        $geography.classification({ listname: 'GeographyData',
            columnname: 'GeographyName',
            valuecolumn: 'GeographyName',
            serviceurl: '/_layouts/IImpact.Web/ClassificationService.asmx/Classification',
            selectedtext: val
        });
    }
    var $function = $(".func");
    if ($function.length > 0) {
        var val = $.getquery()[$function.attr('filtertype')] ? $.getquery()[$function.attr('filtertype')] : "";
        var $function = $function.classification({ listname: 'FunctionData',
            columnname: 'FunctionName',
            valuecolumn: 'FunctionName',
            serviceurl: '/_layouts/IImpact.Web/ClassificationService.asmx/Classification',
            selectedtext: val
        });
    }
    var $department = $(".dept");
    if ($department.length > 0) {
        var val = $.getquery()[$department.attr('filtertype')] ? $.getquery()[$department.attr('filtertype')] : "";
        $department = $department.classification({ listname: 'DepartmentData',
            columnname: 'DepartmentName',
            valuecolumn: 'DepartmentName',
            serviceurl: '/_layouts/IImpact.Web/ClassificationService.asmx/Classification',
            selectedtext: val
        });
    }

    $lifecycle = $(".lcname");
    var val = $.getquery()[$lifecycle.attr('filtertype')] ? $.getquery()[$lifecycle.attr('filtertype')] : "";
    $lifecycle.attr('value', val)
    if ($lifecycle.length > 0) {
        $phasename = $(".phasetype");
        if ($phasename.length > 0) {
            val = $.getquery()[$phasename.attr('filtertype')] ? $.getquery()[$phasename.attr('filtertype')] : "";
            $phasename.classification({ listname: 'LifeCycle Phases',
                columnname: 'Title',
                parentcolumnname: 'LifecycleID',
                parentid: $lifecycle.attr('id'),
                serviceurl: '/_layouts/IImpact.Web/ClassificationService.asmx/Classification',
                customattr: 'lifecycleid',
                autoindexing: true,
                selectedvalue: val
            });

        }
    }
}
function updateSearchContainer(options) {
    var sdata = "{searchtype:'" + options.searchtype + "'}";
    $.ajax({ url: options.advanceurl, contentType: "application/json; charset=utf-8", type: "POST", dataType: "json", data: sdata,
        success: function(datap) {
            var data = datap.d;
            $("#" + options.searchadvanceboxid).append(data);
            bindControlDataTypes();
            $("#" + options.searchadvancelinkid).text("AdvancedSearch [-]");
            var advkey = $.getquery()['advopen'];
            if (advkey != null) {
                populateSearchContainer(options);
            }
            $("#" + options.searchadvancelinkid).show();
            $("#" + options.searchadvanceboxid).show();
        }
    });

}


; (function($) {

    /*create plugin to make container as search box with advance options*/
    $.fn.Searchable = function(options) {
        /*extend the options with default options*/
        options = $.extend({}, $.fn.Searchable.defaults, options);
        var parent = this;

        return this.each(function() {
            var $searchthis = $(this);
            this.options = options;
            /*create the div to have the search input box and search button and a link for advance
            *Note advance will only be available if query string includes parameter 'tp' ie is for type 
            *of advance search required*/
            var $div = $("<div  id=" + options.searchboxid + " style='border-width:0px 1px 1px 1px !important'  class='ui-state-default xp-FloatLeft xp-Width xp-BoxShadow xp-MarginBottom-10 xp-NoBackground xp-BorderBox ui-corner-bottom xp-Padding0'/>");
            /*Adding HTML to Search Box DIV*/
            $div.append("<table id=" + options.outertableid + " border=0 cellpadding=3 ><tr id=" + options.outertableid + "headerrow><td class='xp-FontNormal'>Search Item :</td><td><input autocomplete='off' class='Tip-SHSearchBox' type='text' id='" + options.searchtextid + "'/></td><td style='padding-left:8px;'><input type='button' id='" + options.searchbuttonid + "' value='Search' class='ui-primarytabclr ui-corner-all'/></td>");
            $searchthis.append($div);
            /*check if type of search is set in query string if yes create a link for advance search*/
            var type = $.getquery()['tp'];
            if (type != null)  {
                options.searchtype = type;
            }
//            type = null;
//            if (type != null) {
//                options.searchtype = type;
//                var $advancelink = $("<a href='#' id='" + options.searchadvancelinkid + "'> AdvancedSearch [+]  </a>").click(function() {
//                    $searchthis.Searchable.AdvanceLinkClick(options);

//                });
//                $advancelink.hide();
//                /*append the table to have addition td for the advance link only if type is defined*/
//                $('#' + options.outertableid + "headerrow").append($("<td style='padding-left:4px;'/>").append($advancelink));
//                var $advancediv = $("<div id='" + options.searchadvanceboxid + "'/>").hide();
//                var advkey = $.getquery()['advopen'];
//                if (advkey != null) {
//                    updateSearchContainer(options);
//                    $("<div id='" + options.searchadvanceboxid + "'/>").show();
//                }
//                else {
//                    $advancelink.show();
//                }

//                $div.append($advancediv);
//            }
            $("#" + options.searchtextid).bind(($.browser.opera ? "keypress" : "keydown"), function(event) {

                if (event.keyCode == 13) {
                    event.preventDefault();
                    $("#" + options.searchbuttonid).trigger('click');
                }

            });
            /*check if keyword is set in query string if yes update value of searchbox*/
            var key = $.getquery()['k'];
            if (key != null) {
                options.keyword = key.toString().replace("%20", "");
                $("#" + options.searchtextid).val(DeFormatKeyword(options.keyword));
            }
            /*attach the event to search button*/
            $("#" + options.searchbuttonid).click(function() {
                options.keyword = $("#" + options.searchtextid).val();
                $searchthis.Searchable.SearchClick(options);
            });
        });
    };
    /*extension of the function to have functionality after search button is clicked*/
    $.fn.Searchable.SearchClick = function(options) {
        /*retrieve the current url of the page without the query strings*/
        var url = $.getCurrentUrl();
        /*check if keyword is entered*/

        if (options.keyword != "") {
            /*todo need to do formatting of the keyword*/
            url += "?k=" + FormatKeyword(options.keyword);
            /*check if searchtype is specified*/
            if (options.searchtype.length > 0) {
                url += "&tp=" + options.searchtype;
                /*this means advance search is also initialized now check if some filter is entered
                /* in advance search and add it to url accordingly*/
                var advanceboxexits = false;
                $("#" + options.searchadvanceboxid).find("input").each(function(el) {
                    if ($(this).val() != null && $(this).val().length > 0 && $(this).val() != "") {
                        var abc = $(this).attr('filtertype');
                        if ($(this).hasClass('date')) {
                            var date = new Date($(this).val());
                            url += "&" + abc + "=" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                        }
                        else if ($(this).hasClass('name')) {
                            try {
                                var vals = $(this)[0].PeopleTokens()[0];
                                url += "&" + $(this).attr('filtertype') + "=" + vals.id + "!" + vals.name;
                            }
                            catch (Err) { }
                        }

                        else {
                            url += "&" + $(this).attr('filtertype') + "=" + $(this).val();
                        }
                    }
                    advanceboxexits = true;
                });
                $("#" + options.searchadvanceboxid).find("select").each(function(el) {
                    if ($(this).val() != null && $(this).val().length > 0 && $(this).val() != "") {
                        url += "&" + $(this).attr('filtertype') + "=" + $(this).val();
                    }
                    advanceboxexits = true;
                });
            }
            if (advanceboxexits && $("#" + options.searchadvanceboxid).is(":visible")) {
                url += "&" + "advopen=1";
            }
            /*redirect to updated url*/
            window.location.replace(url);
        }
        else {
            alert("Enter keyword to search");
        }
    };


    /*get current url of the page without query string*/
    $.getCurrentUrl = function() {
        var currentlocation = String(document.location).split('?')[0];
        return currentlocation;
    };
    /*extension of the function to have functionality after search advance link is clicked*/
    $.fn.Searchable.AdvanceLinkClick = function(options) {
        /*check first is the search advance box is visible or not , incase it is
        *visible hide it and remove the html  , incase it is not visible get 
        *html from webservice and update the html of advance search container and show it*/
        var isVisible = $("#" + options.searchadvanceboxid).is(':visible');
        var i = 0;
        if (isVisible == true) {
            $("#" + options.searchadvancelinkid).text("AdvancedSearch [+]");
            $("#" + options.searchadvanceboxid).hide();
            $("#" + options.searchadvanceboxid + "*").html("");
        }
        else {
            /*make the ajax call*/
            updateSearchContainer(options);

        }

    };
    /*set the defaults for the plugin */
    $.fn.Searchable.defaults = {
        advanceurl: "",
        queryparams: [],
        searchboxid: $(this).attr('id') + "searchdiv",
        searchtextid: $(this).attr('id') + "searchtext",
        searchtbuttonid: $(this).attr('id') + "searchbutton",
        searchadvancelinkid: $(this).attr('id') + "advancelink",
        searchadvanceboxid: $(this).attr('id') + "searchadvancediv",
        keyword: "",
        searchtype: "",
        outertableid: $(this).attr("id") + "outertable"
    };

    /*get all elements from the  query string and creates an array and returns array as object*/
    $.getquery = function() {
        var r = {};
        var q = location.search;
        q = q.replace(/^\?/, ''); // remove the leading ?	
        q = q.replace(/\&$/, ''); // remove the trailing & 
        jQuery.each(q.split('&'), function() {
            var key = this.split('=')[0];
            var val = this.split('=')[1];
            // convert floats 
            if (/^[0-9.]+$/.test(val))
                val = parseFloat(val);
            // ingnore empty values 
            if (val)
                r[key] = val;
        });
        return r;
    };

    // Initialize this and store globally for tracking state.
    var currentPage = 1;
    var lastPage = 3;

    /*plugin for search result control  it sends the */
    $.fn.SearchControl = function(options) {
        /*extend the options with default options*/
        options = $.extend({}, $.fn.SearchControl.defaults, options);
        getResult = function(currentpage) {
            //  alert(options.searchurl);
        };

        /*start of return*/
        return this.each(function() {
            if (options.searchurl != "") {
                var prm = { url: location.search, pageSize: options.pageSize };
                var sdata = "{url:'" + location.search + "'}";
                getResult();
            }
            else {
                alert("Search Control not configured for searchurl");
            }
        }
        );
        /*end of return*/
    };
    /*set the defaults for the SearchControl plugin */
    $.fn.SearchControl.defaults = {
        searchurl: "",
        pageSize: 5,
        currentPage: 1,
        lastPage: 1

    };

})(jQuery);
  