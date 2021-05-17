
/*
* Jeditable - jQuery in place edit plugin
*
* Copyright (c) 2006-2009 Mika Tuupola, Dylan Verheul
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
* Project home:
*   http://www.appelsiini.net/projects/jeditable
*
* Based on editable by Dylan Verheul <dylan_at_dyve.net>:
*    http://www.dyve.net/jquery/?editable
*
*/

/**
* Version 1.7.1
*
* ** means there is basic unit tests for this parameter. 
*
* @name  Jeditable
* @type  jQuery
* @param String  target             (POST) URL or function to send edited content to **
* @param Hash    options            additional options 
* @param String  options[method]    method to use to send edited content (POST or PUT) **
* @param Function options[callback] Function to run after submitting edited content **
* @param String  options[name]      POST parameter name of edited content
* @param String  options[id]        POST parameter name of edited div id
* @param Hash    options[submitdata] Extra parameters to send when submitting edited content.
* @param String  options[type]      text, textarea or select (or any 3rd party input type) **
* @param Integer options[rows]      number of rows if using textarea ** 
* @param Integer options[cols]      number of columns if using textarea **
* @param Mixed   options[height]    'auto', 'none' or height in pixels **
* @param Mixed   options[width]     'auto', 'none' or width in pixels **
* @param String  options[loadurl]   URL to fetch input content before editing **
* @param String  options[loadtype]  Request type for load url. Should be GET or POST.
* @param String  options[loadtext]  Text to display while loading external content.
* @param Mixed   options[loaddata]  Extra parameters to pass when fetching content before editing.
* @param Mixed   options[data]      Or content given as paramameter. String or function.**
* @param String  options[indicator] indicator html to show when saving
* @param String  options[tooltip]   optional tooltip text via title attribute **
* @param String  options[event]     jQuery event such as 'click' of 'dblclick' **
* @param String  options[submit]    submit button value, empty means no button **
* @param String  options[cancel]    cancel button value, empty means no button **
* @param String  options[cssclass]  CSS class to apply to input form. 'inherit' to copy from parent. **
* @param String  options[style]     Style to apply to input form 'inherit' to copy from parent. **
* @param String  options[select]    true or false, when true text is highlighted ??
* @param String  options[placeholder] Placeholder text or html to insert when element is empty. **
* @param String  options[onblur]    'cancel', 'submit', 'ignore' or function ??
*             
* @param Function options[onsubmit] function(settings, original) { ... } called before submit
* @param Function options[onreset]  function(settings, original) { ... } called before reset
* @param Function options[onerror]  function(settings, original, xhr) { ... } called on error
*             
* @param Hash    options[ajaxoptions]  jQuery Ajax options. See docs.jquery.com.
*             
*/

(function ($) {

    $.fn.editable = function (target, options) {

        if ('disable' == target) {
            $(this).data('disabled.editable', true);
            return;
        }
        if ('enable' == target) {
            $(this).data('disabled.editable', false);
            return;
        }
        if ('destroy' == target) {
            $(this)
                .unbind($(this).data('event.editable'))
                .removeData('disabled.editable')
                .removeData('event.editable');
            return;
        }

        var settings = $.extend({}, $.fn.editable.defaults, { target: target }, options);

        /* setup some functions */
        var plugin = $.editable.types[settings.type].plugin || function () { };
        var submit = $.editable.types[settings.type].submit || function () { };
        var buttons = $.editable.types[settings.type].buttons
                    || $.editable.types['defaults'].buttons;
        var content = $.editable.types[settings.type].content
                    || $.editable.types['defaults'].content;
        var element = $.editable.types[settings.type].element
                    || $.editable.types['defaults'].element;
        var reset = $.editable.types[settings.type].reset
                    || $.editable.types['defaults'].reset;
        var callback = settings.callback || function () { };
        var onedit = settings.onedit || function () { };
        var onsubmit = settings.onsubmit || function () { };
        var onreset = settings.onreset || function () { };
        var onerror = settings.onerror || reset;

        /* show tooltip */
        if (settings.tooltip) {
            $(this).attr('title', settings.tooltip);
        }

        settings.autowidth = 'auto' == settings.width;
        settings.autoheight = 'auto' == settings.height;

        return this.each(function () {

            /* save this to self because this changes when scope changes */
            var self = this;
            $(this).addClass("jeditable");
            this.settings = settings;
            /* inlined block elements lose their width and height after first edit */
            /* save them for later use as workaround */
            var savedwidth = $(self).width();
            var savedheight = $(self).height();
            this.MakeEmpty = function () {
                $(self).html("");
                self.editing = false;
                callback.apply(self, ["", settings]);
                $(self).html(settings.placeholder);
                $(self).addClass(settings.emptycontainercss);
            };
            /* save so it can be later used by $.editable('destroy') */
            $(this).data('event.editable', settings.event);

            /* if element is empty add something clickable (if requested) */
            if (!$.trim($(this).html())) {
                $(this).html(settings.placeholder);
                $(self).addClass(settings.emptycontainercss);
            }
            else {
                if (settings.type == "richtext" && !($.trim($(this).text()))) {
                    $(this).text(settings.placeholder);
                    $(self).addClass(settings.emptycontainercss);
                }
                else {
                    $(self).removeClass(settings.emptycontainercss);
                }
            }


            $(this).bind(settings.event, function (e) {
                $(self).removeClass(settings.emptycontainercss);
                if (settings.checksingleedit) {
                    var parentval = $(this).parents("." + settings.parentcontainercss).get(0);
                    $(".currenteditable", parentval).removeClass("currenteditable");
                    $(this).addClass("currenteditable");
                    var editableelems = $(".jeditable", parentval).filter(function () {
                        var isdata = ($(this).data("event.editable") != null && !$(this).hasClass("currenteditable"));
                        return isdata;
                    });
                    $.each($(editableelems), function () {
                        var elemToEdit = $(this)[0];
                        if ($.isFunction(elemToEdit.reset)) {
                            elemToEdit.reset(elemToEdit.form);
                        }
                    });
                }
                /* abort if disabled for this element */
                if (true === $(this).data('disabled.editable')) {
                    return;
                }

                /* prevent throwing an exeption if edit field is clicked again */
                if (self.editing) {
                    return;
                }

                /* abort if onedit hook returns false */
                if (false === onedit.apply(this, [settings, self])) {
                    return;
                }

                /* prevent default action and bubbling */
                e.preventDefault();
                e.stopPropagation();

                /* remove tooltip */
                if (settings.tooltip) {
                    $(self).removeAttr('title');
                }

                /* figure out how wide and tall we are, saved width and height */
                /* are workaround for http://dev.jquery.com/ticket/2190 */
                if (0 == $(self).width()) {
                    //$(self).css('visibility', 'hidden');
                    settings.width = savedwidth;
                    settings.height = savedheight;
                } else {
                    if (settings.width != 'none') {
                        settings.width =
                            settings.autowidth ? $(self).width() : settings.width;
                    }
                    if (settings.height != 'none') {
                        settings.height =
                            settings.autoheight ? $(self).height() : settings.height;
                    }
                }
                //$(this).css('visibility', '');

                /* remove placeholder text, replace is here because of IE */
                if ($(this).html().toLowerCase().replace(/(;|")/g, '') ==
                    settings.placeholder.toLowerCase().replace(/(;|")/g, '')) {
                    $(this).html('');
                }

                self.editing = true;
                self.revert = $(self).html();
                $(self).html('');

                /* create the form object */
                var form = ($.browser.msie && parseInt($.browser.version) === 7) ? $('<div />') : $('<form />');
                this.form = form;
                /* apply css or style or both */
                if (settings.cssclass) {
                    if ('inherit' == settings.cssclass) {
                        form.attr('class', $(self).attr('class'));
                    } else {
                        form.attr('class', settings.cssclass);
                    }
                }

                if (settings.style) {
                    if ('inherit' == settings.style) {
                        form.attr('style', $(self).attr('style'));
                        /* IE needs the second line or display wont be inherited */
                        form.css('display', $(self).css('display'));
                    } else {
                        form.attr('style', settings.style);
                    }
                }

                /* add main input element to form and store it in input */
                var input = element.apply(form, [settings, self]);
                var buttonposition = settings.buttonpos == "" ? "down" : settings.buttonpos;
                if (buttonposition == "side") {
                    input.wrap("<div class='xp-FloatLeft xp-JeditableDivWidth' />")
                }
                /* set input content via POST, GET, given data or existing value */
                var input_content;

                if (settings.loadurl) {
                    var t = setTimeout(function () {
                        input.disabled = true;
                        content.apply(form, [settings.loadtext, settings, self]);
                    }, 100);

                    var loaddata = {};
                    loaddata[settings.id] = self.id;
                    if ($.isFunction(settings.loaddata)) {
                        $.extend(loaddata, settings.loaddata.apply(self, [self.revert, settings]));
                    } else {
                        $.extend(loaddata, settings.loaddata);
                    }
                    $.ajax({
                        type: settings.loadtype,
                        url: settings.loadurl,
                        data: loaddata,
                        async: false,
                        success: function (result) {
                            window.clearTimeout(t);
                            input_content = result;
                            input.disabled = false;
                        }
                    });
                } else if (settings.data) {
                    input_content = settings.data;
                    if ($.isFunction(settings.data)) {
                        input_content = settings.data.apply(self, [self.revert, settings]);
                    }
                } else {
                    input_content = self.revert;
                }
                content.apply(form, [input_content, settings, self]);

                input.attr('name', settings.name);

                /* add buttons to the form */

                buttons.apply(form, [settings, self]);

                /* add created form to self */
                $(self).append(form);

                /* attach 3rd party plugin if requested */
                plugin.apply(form, [settings, self]);

                /* focus to first visible form element */
                $(':input:visible:enabled:first', form).focus();

                /* highlight input contents when requested */
                if (settings.select) {
                    input.select();
                }

                /* discard changes if pressing esc */
                input.keydown(function (e) {
                    if (e.keyCode == 27) {
                        e.preventDefault();
                        //self.reset();
                        reset.apply(form, [settings, self]);
                    }
                });

                /* discard, submit or nothing with changes when clicking outside */
                /* do nothing is usable when navigating with tab */
                var t;
                if ('cancel' == settings.onblur) {
                    input.blur(function (e) {

                        /* prevent canceling if submit was clicked */
                        t = setTimeout(function () {
                            reset.apply(form, [settings, self]);
                        }, 500);
                    });
                } else if ('submit' == settings.onblur) {
                    input.blur(function (e) {
                        /* prevent double submit if submit was clicked */
                        t = setTimeout(function () {
                            form.submit();
                        }, 200);
                    });
                } else if ($.isFunction(settings.onblur)) {
                    input.blur(function (e) {
                        settings.onblur.apply(self, [input.val(), settings]);
                    });
                } else {
                    input.blur(function (e) {
                        /* TODO: maybe something here */
                    });
                }
                function AjaxCall(submitdata) {
                    var $errordiv = $("#" + $(self).attr('id') + "errordiv");
                    if ($errordiv.length > 0) {
                        $errordiv.remove();
                    }
                    /* defaults for ajaxoptions */
                    var ajaxoptions = {
                        type: 'POST',
                        data: $.toJSON(submitdata),
                        dataType: 'html',
                        url: settings.target,
                        success: function (result, status) {
                            var res = result.d;
                            if (res.Status == "success") {
                                /*
                                * custom code to make formatting work. rather than hard coding special code here
                                * you can extend the input types with formatter methods to format the result from server end
                                */
                                var editType = $.editable.types[settings.type];
                                var frm = (editType.formatter && $.isFunction(editType.formatter)) ? editType.formatter : function (ajaxResult, settings) { return ajaxResult.Message; };
                                if (frm) { $(self).html(frm.call(self, res, settings)); }
                                self.editing = false;
                                callback.apply(self, [res, settings]);
                                if (!$.trim($(self).html())) {
                                    $(self).html(settings.placeholder);
                                    $(self).addClass(settings.emptycontainercss);
                                }
                                else {
                                    $(self).removeClass(settings.emptycontainercss);
                                }
                            }
                            else {
                                $("form", self).show();
                                $($("img", self).get(0)).remove();
                                if ($errordiv.length == 0) {
                                    $errordiv = $("<div id='" + $(self).attr('id') + "errordiv'  class='xp-ErrorMsg xp-FloatLeft' style='width:35%;margin-top:4px; display:block;'/>")
                                    $errordiv.append(res.Message).show();
                                    $(self).append($errordiv);
                                }
                                return false;
                            }
                        },
                        error: function (xhr, status, error) {
                            onerror.apply(form, [settings, self, xhr]);
                        }
                    };

                    /* override with what is given in settings.ajaxoptions */
                    $.extend(ajaxoptions, settings.ajaxoptions);
                    $.ajax(ajaxoptions);
                }
                form.submit(function (e) {

                    if (t) {
                        clearTimeout(t);
                    }

                    /* do no submit */
                    e.preventDefault();

                    /* call before submit hook. */
                    /* if it returns false abort submitting */
                    if (false !== onsubmit.apply(form, [settings, self])) {
                        $($(self).parent().get(0)).removeClass('ui-state-error');
                        /* custom inputs call before submit hook. */
                        /* if it returns false abort submitting */
                        if (false !== submit.apply(form, [settings, self])) {

                            /* check if given target is function */
                            if ($.isFunction(settings.target)) {
                                var str = settings.target.apply(self, [input.val(), settings]);
                                $(self).html(str);
                                self.editing = false;
                                callback.apply(self, [self.innerHTML, settings]);
                                /* TODO: this is not dry */
                                if (!$.trim($(self).html())) {
                                    $(self).html(settings.placeholder);
                                    $(self).addClass(settings.emptycontainercss);
                                }
                                else {
                                    $(self).removeClass(settings.emptycontainercss);
                                }
                            } else {
                                /* add edited content and id of edited element to POST */
                                var submitdata = {};
                                submitdata[settings.name] = input.val();
                                submitdata[settings.id] = self.id;
                                /* add extra data to be POST:ed */
                                if ($.isFunction(settings.submitdata)) {
                                    $.extend(submitdata, settings.submitdata.apply(self, [self.revert, settings]));
                                } else {
                                    $.extend(submitdata, settings.submitdata);
                                }

                                /* quick and dirty PUT support */
                                if ('PUT' == settings.method) {
                                    submitdata['_method'] = 'put';
                                }
                                var validentry = true;
                                var $errordiv = $("#" + $(self).attr('id') + "errordiv");
                                var $div = $("#" + $(self).attr('id') + "validationdiv");
                                $div.hide();
                                if (settings.requiredfield) {
                                    if (input.val() == "") {
                                        validentry = false;
                                        if ($errordiv.length == 0) {
                                            $errordiv = $("<div id='" + $(self).attr('id') + "errordiv' style='position:absolute; font-size: 10pt !important;top: 49px;left: 225px; text-transform: none;' />");
                                            $(self).append($errordiv);
                                        }
                                        $errordiv.html("Enter valid input.");
                                        $errordiv.addClass('errorMsg');
                                        $errordiv.show();
                                        return false;
                                    }
                                    else {
                                        $errordiv.hide();
                                        $errordiv.html("");
                                        $errordiv.removeClass('errorMsg');
                                    }
                                }
                                if (validentry && settings.validateurl != null && settings.validateurl != "") {
                                    if ($div.length == 0) {
                                        $div = $("<div id='" + $(self).attr('id') + "validationdiv' class = 'xp-FloatLeft ' style='margin-top:10px'/>");
                                        $div.addClass('xp-ErrorMsg');
                                        $(self).append($div);
                                    }
                                    $div.html("");

                                    //                                    if (input.val() == "") {
                                    //                                        submitdata[settings.name] = "NA";
                                    //                                    }
                                    /* defaults for ajaxoptions */
                                    $.ajax({
                                        type: 'POST',
                                        data: $.toJSON(submitdata),
                                        contentType: 'application/json; charset=utf-8',
                                        dataType: 'json',
                                        url: settings.validateurl,
                                        success: function (result, status) {
                                            if (result.d == "success") {
                                                $(self).html(settings.indicator);
                                                AjaxCall(submitdata);
                                            }
                                            else {
                                                $div.html("");
                                                $div.html(result.d);
                                                if (settings.errorclass != '') {
                                                    $div.addClass(settings.errorclass);
                                                }
                                                $div.show();
                                                return false;
                                            }
                                        },
                                        error: function (xhr, status, error) {
                                            onerror.apply(form, [settings, self, xhr]);
                                        }
                                    });
                                }
                                else {
                                    /* show the saving indicator */
                                    //$(self).html(settings.indicator);
                                    $("form", $(self)).hide();
                                    $(self).append(settings.indicator);
                                    AjaxCall(submitdata);
                                }
                            }
                        }
                    }

                    /* show tooltip again */
                    $(self).attr('title', settings.tooltip);

                    return false;
                });
            });

            /* privileged methods */
            this.reset = function (form) {
                /* prevent calling reset twice when blurring */
                if (this.editing) {
                    /* before reset hook, if it returns false abort reseting */
                    if (false !== onreset.apply(form, [settings, self])) {
                        $(self).html(self.revert);
                        self.editing = false;
                        if (!$.trim($(self).html())) {
                            $(self).html(settings.placeholder);
                            $(self).addClass(settings.emptycontainercss);
                        }
                        else {
                            $(self).removeClass(settings.emptycontainercss);
                        }
                        /* show tooltip again */
                        if (settings.tooltip) {
                            $(self).attr('title', settings.tooltip);
                        }
                    }
                }
            };
        });

    };


    $.editable = {
        types: {
            defaults: {
                element: function (settings, original) {
                    var input = $('<input type="hidden"></input>');
                    $(this).append(input);
                    return (input);

                },
                content: function (string, settings, original) {
                    var decodedvalue = $('<div/>').html(string).text();
                    $(':input:first', this).val(decodedvalue);
                },
                reset: function (settings, original) {
                    original.reset(this);
                },
                buttons: function (settings, original) {
                    var form = this;
                    var $div = $("<div  />");
                    if (settings.buttondivscss != "") {
                        $div.addClass(settings.buttondivscss);
                    }
                    if (settings.submit) {
                        /* if given html string use that */
                        if (settings.submit.match(/>$/)) {
                            var submit = $(settings.submit).click(function () {
                                if (submit.attr("type") != "submit") {
                                    form.submit();
                                }
                            });
                            /* otherwise use button with given string as text */
                        } else {
                            var submit = $('<button type="submit" class="ui-primarytabclr ui-tabbuttonstyle  ui-corner-all" style="margin-left:5px; " />');
                            submit.html(settings.submit);
                        }
                        $div.append(submit);
                    }
                    if (settings.cancel) {
                        /* if given html string use that */
                        if (settings.cancel.match(/>$/)) {
                            var cancel = $(settings.cancel);
                            /* otherwise use button with given string as text */
                        } else {
                            var cancel = $('<button type="cancel" class="ui-secondarytabclr ui-tabbuttonstyle  ui-corner-all" style="margin:0px 3px 0px 3px;"  />');
                            cancel.html(settings.cancel);
                        }
                        $div.append(cancel);
                        $(this).append($div);

                        var buttonposition = settings.buttonpos == "" ? "down" : settings.buttonpos;
                        if (buttonposition == "right") {
                            $div.addClass("xp-FloatRight")
                            if (jQuery.browser.msie) {
                                $div.addClass("xp-Absolute")
                            }
                        }
                        if (buttonposition == "side") {
                            $div.addClass("xp-FloatLeft")
                            if (jQuery.browser.msie) {
                                $div.addClass("xp-Absolute")
                            }
                        }

                        $(cancel).click(function (event) {
                            //original.reset();
                            if ($.isFunction($.editable.types[settings.type].reset)) {
                                var reset = $.editable.types[settings.type].reset;
                            } else {
                                var reset = $.editable.types['defaults'].reset;
                            }
                            reset.apply(form, [settings, original]);
                            return false;
                        });
                    }
                }
            },
            text: {
                element: function (settings, original) {
                    var input = $('<input autocomplete="off" class="textinput"/>');
                    if (settings.width != 'none') { input.width(settings.width); }
                    if (settings.height != 'none') { input.height(settings.height); }
                    if (settings.maxlength != -1) { setformfieldsize(input, settings.maxlength); }
                    /* https://bugzilla.mozilla.org/show_bug.cgi?id=236791 */
                    //input[0].setAttribute('autocomplete','off');
                    input.attr('autocomplete', 'off');
                    $(this).append(input);
                    return (input);
                },
                plugin: function (settings, original) {
                    if ($.isFunction($.watermark)) {
                        if (settings.watermark) {
                            $(".textinput", this).watermark(settings.watermark);
                        }
                    }
                }
            },
            textarea: {
                element: function (settings, original) {
                    var textarea = $('<textarea />');
                    if (settings.rows) {
                        textarea.attr('rows', settings.rows);
                    } else if (settings.height != "none") {
                        textarea.height(settings.height);
                    }
                    if (settings.cols) {
                        textarea.attr('cols', settings.cols);
                    } else if (settings.width != "none") {
                        textarea.width(settings.width);
                    }
                    if (settings.maxlength != -1) { setformfieldsize(textarea, settings.maxlength); }
                    $(this).append(textarea);
                    return (textarea);
                }
            },
            select: {
                element: function (settings, original) {
                    if (settings.clientid != null) {
                        var select = $("<select id='" + settings.clientid + "' />");
                        if (settings.width != 'none') { select.width(settings.width); }
                        if (settings.height != 'none') { select.height(settings.height); }
                    }
                    else {
                        select = $('<select />');
                        if (settings.width != 'none') { select.width(settings.width); }
                        if (settings.height != 'none') { select.height(settings.height); }
                    }
                    var selectcontainer = $('<label class="xp-CustomLabel xp-FloatLeft"/>');
                    $(this).append(selectcontainer);
                    selectcontainer.append(select);
                    return (select);
                },
                content: function (data, settings, original) {
                    /* If it is string assume it is json. */
                    if (String == data.constructor && (data != "")) {
                        var selectelem = $('select', this);
                        $.ajax({ url: data, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: $.toJSON(settings.submitdata),
                            success: function (datap, st) {
                                var items = datap.d;
                                eval("var json  = {" + items + "}");

                                /*ABOVE LINE OF CODE WAS DISTURVING THE ORDER OF OPTIONS. AS GOT INFO FROM INTERNET ARTICLES TO MAITAIN THE ORDER OF 
                                JSON USE ARRAY. SO BELOW I HAVE JUST MAITAINED AN ARRAY WHERE I COLLECTING ALL OPTIONS IN ORDERED WAY.
                                THIS CHANGES DONE BY ELEMENT8 TEAM (NEERAJ)*/
                                var options = [];
                                var i = 1;
                                for (var key in json) {
                                    if (!$.trim(key) == "") {
                                        options[i] = key;
                                        i += 1;
                                    }
                                    else {
                                        options[0] = key;
                                    }
                                }
                                options = options;
                                for (var j = 0; j < options.length; j++) {
                                    if ('selected' == options[j]) {
                                        continue;
                                    }
                                    var option = $('<option />').val(options[j]).append(options[j]);
                                    selectelem.append(option);
                                }
                                /*END OF EDITING PLUGIN*
                                /* Loop option again to set selected. IE needed this... */
                                selectelem.children().each(function () {
                                    if ($(this).val() == json['selected'] ||
                                  $(this).text() == $.trim(original.revert)) {
                                        $(this).attr('selected', 'selected');
                                    }
                                });
                                selectelem.width(selectelem.width());
                                //selectelem.wrap('<label class="xp-CustomLabel xp-FloatLeft"/>');
                            }

                        });

                    } else {
                        /* Otherwise assume it is a hash already. */
                        var json = data;
                        for (var key in json) {
                            if (!json.hasOwnProperty(key)) {
                                continue;
                            }
                            if ('selected' == key) {
                                continue;
                            }
                            var option = $('<option />').val(key).append(json[key]);
                            $('select', this).append(option);
                        }
                        /* Loop option again to set selected. IE needed this... */
                        $('select', this).children().each(function () {
                            if ($(this).val() == json['selected'] ||
                            $(this).text() == $.trim(original.revert)) {
                                $(this).attr('selected', 'selected');
                            }
                        });
                    }

                }
            }
        },

        /* Add new input type */
        addInputType: function (name, input) {
            $.editable.types[name] = input;
        }
    };

    // publicly accessible defaults
    $.fn.editable.defaults = {
        name: 'value',
        id: 'id',
        type: 'text',
        width: 'auto',
        height: 'auto',
        event: 'click.editable',
        onblur: '',
        buttonpos: "right",
        loadtype: 'GET',
        rows: 2,
        cols: 50,
        loadtext: 'Loading...',
        placeholder: 'Click to edit',
        loaddata: {},
        buttondivscss: "",
        submitdata: {},
        ajaxoptions: {},
        checksingleedit: true,
        parentcontainercss: 'parenteditablecontainer',
        emptycontainercss: 'xp-EmptyClickToEdit',
        dateformat: "",
        errorclass: ""
    };

})(jQuery);

/**********************************************************************
* Custom input types for the jquery.jeditable plugin
* By Richard Davies <Richard__at__richarddavies.us>
*********************************************************************/

// Create a custom input type for checkboxes
$.editable.addInputType("checkbox", {
    element: function (settings, original) {
        var input = $('<input type="checkbox">');
        $(this).append(input);

        // Update <input>'s value when clicked
        $(input).click(function () {
            var value = $(input).attr("checked") ? 'Yes' : 'No';
            $(input).each(function () {
                this.checked = value;
            });
        });
        return (input);
    },
    content: function (string, settings, original) {
        var checked = string == "Yes" ? 1 : 0;
        var input = $(':input:first', this);
        $(input).attr("checked", checked);
        var value = $(input).attr("checked") ? 'Yes' : 'No';
        $(input).each(function () {
            this.checked = value;
        });
    }
});
$.editable.addInputType("checkboxes", {
    content: function (data, settings, original) {
        var elem = $(this);
        var mainContainer = $("<div />")
                         .attr('class', 'xp-Width xp-FloatLeft xp-MarginBottom-5')
                         .appendTo(elem);
        var container = $("<div>")
                     .attr('class', 'xp-FloatLeft xp-Width')
                     .appendTo(mainContainer);
        if (settings.width != 'none') { container.width(settings.width); }
        var dataObject = new Object();
        dataObject.listName = settings.submitdata.listname,
    dataObject.fieldName = settings.submitdata.fieldname,
    dataObject.itemId = settings.submitdata.itemid
        var ajaxObj = {
            url: "/_layouts/IImpact.Web/jEditableService.asmx/GetCheckboxValues",
            data: $.toJSON(dataObject),
            async: false,
            success: function (data) {
                var result = data.d;
                var checkbox;
                var span;
                var itemHolder;
                /*Looping through all result elements and adding to a container*/
                $.each(result, function (i, v) {
                    itemHolder = $("<div />")
                      .attr('class', 'xp-FloatLeft xp-Width')
                      .appendTo(container);
                    checkbox = $("<input />")
                .attr('type', 'checkbox')
                .attr('text', v.ColName)
                .attr('value', v.ColName)
                .appendTo(itemHolder)
                .attr('checked', (v.ColValue == "true") ? true : false);
                    span = $("<span>")
                .attr('text', 'checkbox')
                .attr('value', 'checkbox')
                .html(v.ColName)
                .attr('id', 'checkbox' + i)
                .appendTo(itemHolder);
                });
                /*Adding jscroll pane functionality-- Adding scroll pane if we have morethan 5 checkboxes */
                if (result.length > 5) {
                    container.addClass(" xp-CheckScroll");
                    container.jScrollPane({
                        'verticalDragMinHeight': '60',
                        'autoReinitialise': true
                    });
                }
            }
        };
        /*ajax service call to get checkboxes data*/
        $.xpoint.utils.ajaxCall.call(container, ajaxObj);
    },
    submit: function (settings, original) {
        var elem = $(this);
        var items = $("input", elem);
        var selectedMessage = "";
        var messages = [];
        /*Adding selected checkbox values to array */
        $.each(items, function (i, v) {
            var elem = $(this);
            if (elem.is(':checked')) {
                messages.push(elem.val());
            }
        });
        $("input", this).val(messages.join(', '));
        return true;
    }
});
$.editable.addInputType("radio", {
    element: function (settings, original) {
        var hidden = $('<input type="hidden">');
        $(this).append(hidden);
        return (hidden);
    },
    submit: function (settings, original) {
        $("input", this).val($(':radio:checked', this).val());
        if ($(':radio:checked', this).val() == undefined)
            return false;
        else
            return true;
    },
    content: function (data, settings, original) {
        /* If it is string assume it is json. */
        if (String == data.constructor) {
            eval('var json = ' + data);
        } else {
            /* Otherwise assume it is a hash already. */
            var json = data;
        }

        for (var key in json) {
            if (!json.hasOwnProperty(key)) {
                continue;
            }
            if ('selected' == key) {
                continue;
            }
            //$('input', this).val(key);

            var button;
            if (key == $.trim(original.revert)) {
                button = $('<input type="radio" name="button" checked="true" />').val(key);
            }
            else {
                button = $('<input type="radio" name="button" />').val(key);
            }
            if (settings.direction == "horizontal") {
                $div = $("<div />");
                $div.append(button);
                $div.append(key + "<br>");
                $div.attr("style", "float:left");
                $(this).append($div);
            }
            else {
                $(this).append(button);
                $(this).append(key + "<br>");
            }
        }


        /* Loop through and apply the checked one */
        $(':radio', this).each(function (el) {
            if ($(this).val() == $.trim(original.revert) ||
                $(this).val() == json['selected']) {
                $(this).each(function () {
                    this.checked = true;
                });
            }
        });
    }
});

$.editable.addInputType('datepicker', {
    element: function (settings, original) {
        var input = $('<input>');
        if (settings.width != 'none') { input.width(settings.width); }
        if (settings.height != 'none') { input.height(settings.height); }
        input.attr('autocomplete', 'off');
        $(this).append(input);
        return (input);
    },
    plugin: function (settings, original) {
        /* Workaround for missing parentNode in IE */
        var form = this;
        settings.onblur = 'ignore';
        $(this).find('input').datepicker({ dateFormat: settings.dateformat, changeMonth: true, changeYear: true }).bind('click', function () {
            $(this).datepicker('show');
            return false;
        }).bind('dateSelected', function (e, selectedDate, $td) {
            $(form).submit();
        });
    },
    formatter: function (ajaxResult, settings) {
        /*Fetching date format, which we stored in master page through web control */
        var displayDateFormat = regionalSettings["data-XPUserInputDateFormat"];
        /*Sanity check */
        if (displayDateFormat) {
            var d;
            try {
                d = $.datepicker.parseDate(displayDateFormat, ajaxResult.Message);
            }
            catch (e) {
                d = $.datepicker.parseDate(settings.dateformat, ajaxResult.Message);
            }
            return $.datepicker.formatDate(settings.dateformat, d);
        }
        else {
            d = $.datepicker.parseDate(settings.dateformat, ajaxResult.Message);
            return $.datepicker.formatDate(settings.dateformat, d);
        }
    }
});

$.editable.addInputType('richtext', {
    element: function (settings, original) {
        var textarea = $('<textarea id="' + $(original).attr("id") + '_mce"/>');
        if (settings.rows) {
            textarea.attr('rows', settings.rows);
        } else {
            textarea.height(settings.height);
        }
        if (settings.width) {
            textarea.width(settings.width);
        } else {
            textarea.attr('cols', settings.cols);
        }
        $(this).append(textarea);
        return (textarea);
    },
    plugin: function (settings, original) {
        $("#" + $(original).attr("id") + '_mce').val(original.revert);
        $("#" + $(original).attr("id") + '_mce').RelayRichText(original.revert);
    },
    submit: function (settings, original) {
        tinyMCE.triggerSave();
        tinymce.remove('#' + $(original).attr("id") + '_mce');
    },
    reset: function (settings, original) {
        tinymce.remove('#' + $(original).attr("id") + '_mce');
        original.reset();
    },
    formatter: function (ajaxResult, settings) {
        settings.values = ajaxResult.Message;
        $(this).html(decodeHtml(ajaxResult.Message));
    }
});
/*
* Charcounter textarea for Jeditable
*
* Copyright (c) 2008 Mika Tuupola
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
* 
* Depends on Charcounter jQuery plugin by Tom Deater
*   http://www.tomdeater.com/jquery/character_counter/
*
* Project home:
*   http://www.appelsiini.net/projects/jeditable
*
* Revision: $Id: jquery.jeditable.autogrow.js 344 2008-03-24 16:02:11Z tuupola $
*
*/

$.editable.addInputType('charcounter', {
    element: function (settings, original) {
        settings.buttondivscss = "xp-EditableButtons xpLeft";
        var textarea = $('<textarea class="xp-TxtBox"/>');
        if (settings.rows) {
            textarea.attr('rows', settings.rows);
        } else {
            textarea.height(settings.height);
        }
        if (settings.cols) {
            textarea.attr('cols', settings.cols);
        } else {
            textarea.width(settings.width);
        }
        $(this).append(textarea);
        return (textarea);
    },
    plugin: function (settings, original) {
        $('textarea', this).charCounter(settings.charcounter.characters, settings.charcounter);
    }
});
/*
* Masked input for Jeditable
*
* Copyright (c) 2007-2008 Mika Tuupola
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
*
* Depends on Masked Input jQuery plugin by Josh Bush:
* http://digitalbush.com/projects/masked-input-plugin
*
* Project home:
* http://www.appelsiini.net/projects/jeditable
*
* Revision: $Id$
*
*/
$.editable.addInputType('masked', {
    element: function (settings, original) {
        /* Create an input. Mask it using masked input plugin. Settings */
        /* for mask can be passed with Jeditable settings hash. */
        var input = $('<input />').mask(settings.mask);
        $(this).append(input);
        return (input);
    }
});
$.editable.addInputType('peopleselect', {
    element: function (settings, original) {
        if (settings.clientid != null) {
            var input = $("<select id='" + settings.clientid + "' />");
        }
        else { input = $("<select />"); }
        if (settings.width != 'none') { input.width(settings.width); }
        if (settings.height != 'none') { input.height(settings.height); }

        $(this).append(input);
        return (input);

    },
    content: function (data, settings, original) {
        /* If it is string assume it is json. */
        if (String == data.constructor) {
            var json = data;
        } else {
            /* Otherwise assume it is a hash already. */
            var json = data;
        }
        input = $("select", this);
        var option = $('<option />').val("0").append("Loading...");
        input.append(option);
        var submitdata = {};
        submitdata["reffieldname"] = settings.reffieldname;
        submitdata = $.extend(submitdata, settings.submitdata);
        $.ajax({ url: settings.getpeople, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: $.toJSON(submitdata),
            success: function (datap, st) {
                var items = datap.d;
                input.children().remove();
                if (items.length > 0) {

                    $.each(items, function () {
                        var option = $('<option />').val(this.value).append(this.text);
                        if (this.text == json) {
                            option.attr("selected", "selected");
                        }
                        input.append(option);

                    });
                    input.val(json);
                }
                else {
                    var option = $('<option />').val(0).append("Enter Team Members");
                    input.append(option);
                }

            }

        });

    },
    formatter: function (ajaxResult, settings) {
        settings.values = ajaxResult.Message;
        var elemhtml = "";

        $.each(settings.values.split(","), function () {
            var currentval = this;
            if (currentval != null && $.trim(currentval).length != 0) {
                var value = currentval.split("!")[1];
                elemhtml += "<div  width='100%'>" + value + "</div>";
            }
        });
        return elemhtml;
    }
});
$.editable.addInputType("peoplepicker", {
    element: function (settings, original) {
        settings.requiredfield = true;
        var hidden = $('<input type="hidden" />');
        var input = $('<input autocomplete="off" class="peoplepickerinput">');
        if (settings.width != 'none') { input.width(settings.width); }
        if (settings.height != 'none') { input.height(settings.height); }
        input.attr('autocomplete', 'off');
        $(this).append(input);
        return input;
    },
    plugin: function (settings, original) {
        var datap = {}, i = 0;
        if (settings.values != "") {
            $.each(settings.values.split(","), function () {
                var currentval = this;
                if (currentval != null && $.trim(currentval).length != 0) {
                    var id = currentval.split("!")[0];
                    var value = currentval.split("!")[1];
                    if (id != null && value != null) {
                        datap[i] = { "id": id, "name": value };
                        i++;
                    }
                }
            });
        }
        var controlwidth = settings.width != 'none' ? settings.width : 250;
        $(".peoplepickerinput", this).peoplepicker({ multiple: settings.multivalued, prePopulate: datap, width: controlwidth });

    },

    submit: function (settings, original) {
        var value = $(".peoplepickerinput", this).val();
        if (settings.multivalued) {
            $("input", this).val(value).hide();
        }
        else {
            $("input", this).val(value);
        }
    },
    formatter: function (ajaxResult, settings) {
        settings.values = ajaxResult.Message;
        var elemhtml = "";

        $.each(settings.values.split(","), function () {
            var currentval = this;
            if (currentval != null && $.trim(currentval).length != 0) {
                var value = currentval.split("!")[1];
                elemhtml += "<div  width='100%'>" + value + "</div>";
            }
        });
        return elemhtml;
    }
});
$.editable.addInputType('concatenated', {
    element: function (settings, original) {
        var firstinput = $("<input autocomplete='off' type='text' class='firstinput'>");
        var secondinput = $("<input autocomplete='off' type='text' class='secondinput'>");
        /* Hidden input to store value which is submitted to server. */
        var hidden = $('<input type="hidden" />');
        /*Set maxlength for firstinput and secondinput*/
        setformfieldsize(firstinput, settings.maxlength);
        setformfieldsize(secondinput, settings.maxlength);

        if (settings.values != "") {
            var values = settings.values.split(",")
            if (values[0] != null) {
                firstinput.val(values[0]);
            }
            if (values[1] != null) {
                secondinput.val(values[1]);
            }
        }

        $(this).append(hidden);
        $(this).append(firstinput);
        $(this).append(secondinput);

        return (hidden);
    },
    plugin: function (settings, original) {
        if ($.isFunction($.watermark)) {
            if (settings.firstwatermark) {
                $(".firstinput", this).watermark(settings.firstwatermark);
            }
            if (settings.secondwatermark) {
                $(".secondinput", this).watermark(settings.secondwatermark);
            }
        }
    },
    submit: function (settings, original) {
        var value = $(".firstinput", this).val() + "," + $(".secondinput", this).val();
        $("input[type='hidden']", this).val(value);
    },
    formatter: function (ajaxResult, settings) {
        settings.values = ajaxResult.Message;
        if (settings.values.split(",").length > 0) {
            return settings.values.split(",")[0] + " " + settings.values.split(",")[1];
        }
        else {
            return ajaxResult.Message;
        }
    }
});
$.editable.addInputType('peopleSuggest', {

    element: function (settings, original) {
        var id = $(original).attr("id") + "_peopleSuggest";
        var elem = $("<input type='text'  autocomplete='off'/>")
                .attr("id", id)
                .hide();
        $(this).append(elem);
        return elem;
    },
    plugin: function (settings, original) {
        var id = $(original).attr("id") + "_peopleSuggest";
        var elem = $("#" + id).val('').show();
        var prefillVls = [{ Name: "", FormattedVal: ""}];
        if ($.trim(settings.suggestVal)) {
            prefillVls = eval("(" + settings.suggestVal + ")");
        }
        var suggestOpts = $.extend({ profilePrefixUrl: '', startText: '', asHtmlID: id, singleEntry: false, url: "/_vti_bin/xpointbase/ProfileService.svc/Users",
            preFill: prefillVls, selectedItemProp: "Name", showItemProp: "FormattedHtml", searchObjProps: "Name",
            selectedValuesProp: "FormattedVal", retrieveComplete: function (data) {
                var newData = $.parseJSON(data.GetUsersResult);
                return newData;
            }
        }, settings.suggestOpts);
        elem.autoSuggest(suggestOpts.url, suggestOpts);
        return original;
    },
    submit: function (settings, original) {
        var id = $(original).attr("id") + "_peopleSuggest";
        var valElem = $("#as-values-" + id);
        var elem = $("#" + id);
        var val = valElem.val() + elem.val();
        elem.val(val);
    },
    formatter: function (ajaxResult, settings) {
        settings.suggestVal = ajaxResult.Message;
        var vals = $.parseJSON(ajaxResult.Message);
        var html = new Array();
        if (vals != null) {
            $(vals).each(function () {
                var val = this;
                if (val) {
                    if (val.Id > 0 && val.EncodedLoginName != null) {
                        html.push("<a href='" + settings.suggestOpts.profilePrefixUrl + val.EncodedLoginName + "'>" + val.Name + "</a>");
                    }
                    else {
                        html.push(val.Name);
                    }
                }

            });
            return html.join(",");
        }
        return "";
    }
});
/*
* By : Anirudh (Element8)
* This plugin Resets the value of editable div to empty 
*/

(function ($) {
    $.fn.MakeEditableBlank = function (options) {

        var defaults = {};
        var opts = $.extend(defaults, options);

        return this.each(function () {
            var $this = $(this)[0];
            if ($.isFunction($this.MakeEmpty)) {
                $this.MakeEmpty();
            }
        });
    }
})($);
