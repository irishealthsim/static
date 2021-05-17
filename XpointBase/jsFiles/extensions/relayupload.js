; (function($) {
    $.fn.gridupload = function(options) {
        var defaults = {
            exts: ["jpeg", "doc", "pdf", "gif"],
            size: 100,
            uploadurl: "",
            fileid: "gridupload" + $(this).attr('id'),
            text: 'Add',
            buttonid: "griduploadbutton" + $(this).attr('id'),
            title: 'Add'
        };
        var options = $.extend(defaults, options);
        this.each(function() {
            var gridelem = $(this);
            var pagerid = gridelem.get(0).p.pager.attr('id');
            var div = "<div id='" + options.fileid + "' class='xp-FloatRight'><a href='#' style='color:#3F3F40 !important'>" + options.text + "</a></div>";
            $(gridelem).navButtonAdd("#" + pagerid, {
                caption: div, buttonicon: "ui-icon-plus", position: "first", id: options.buttonid, title: options.title
            });
            var $div = $("#" + options.fileid);

            /*Error message dialog*/
            var statusp = $("<div id='" + $(this).attr('id') + "_errordialog' class='xp-Width' title='Error'/>");
            statusp.html("");
            statusp.dialog('destroy');

            var statusmsg = $("<div />");
            statusp.append(statusmsg);

            $('body').append(statusp);

            var upload = new AjaxUpload("#" + options.buttonid, {
                //Location of the server-side upload script
                data: { currenturl: location.href },
                action: options.uploadurl,
                onSubmit: function(file, ext) {
                    var phase = gridelem.get(0).p.postData['phaseid'];
                    if (typeof phase == 'undefined') { phase = '-1'; }
                    upload.setData({ 'currenturl': location.href, 'phaseid': phase });
                    statusp.dialog('destroy');
                    if (!(ext && /^(jpg|png|jpeg|gif|bmp|doc|docx|xls|xlsx|ppt|pptx|pdf|txt|fla|avi|wmv|mov|mpg|mp3|mp4|rtf|msg)$/i.test(ext))) {
                        // extension is not allowed
                        statusmsg.html("Invalid file extension. Allowed extensions are jpg, png, jpeg, gif, bmp, doc, docx, xls, xlsx, ppt, pptx, pdf, txt, fla, avi, wmv, mov, mpg, mp3, mp4, rtf, msg.");
                        statusp.dialog();
                        // cancel upload
                        return false;
                    }
                    else {
                        /*
                         * Just a trick to replicate the behaviour of loading in the grid
                         * this will show loading sign in the grid at time of uploading a file
                         * loading will be handled further in grid.base.js
                         */
                        var ts = gridelem.get(0);
                        if(ts)
                        {    
                             ts.p.loadui = "block";
                             $("#lui_" + ts.p.id).show();
		                     $("#load_" + ts.p.id).show();
                        }
                     }
                },
                onComplete: function(file, response) {
                    $.relayloading('hide');
                    statusp.dialog('destroy');
                    var status = "";
                    if (response.text != null) {
                        status = response.text;
                    }
                    else if(response.firstChild != null){
                        status = response.firstChild.firstChild.nodeValue;
                    }
                    if (status == "success") {
                        var parentId = gridelem.get(0).p.postData['parentid'];
                        if (typeof parentId != 'undefined') {
                            $("#" + parentId).trigger('reloadGrid');
                        }
                        else {
                            gridelem.trigger('reloadGrid');
                        }
                      }
                      else if (status == "AlreadyExists") {
                        /*hide the loading sign*/
                        var ts = gridelem.get(0);
                        if (ts) {
                          ts.p.loadui = "block";
                          $("#lui_" + ts.p.id).hide();
                          $("#load_" + ts.p.id).hide();
                        }
                        statusmsg.html("File name already exists.");
                        statusp.dialog({                         
                          resizable:false
                          }).dialog("open");
                      }
                    else {
                       /*hide the loading sign*/
                        var ts = gridelem.get(0);
                        if (ts) {
                          ts.p.loadui = "block";
                          $("#lui_" + ts.p.id).hide();
                          $("#load_" + ts.p.id).hide();
                        }
                        statusmsg.html("Operation unsuccessful!  Please check if you are trying to upload a valid file, or if the file is empty or already exists or exceeds maximum size limit (28 MB).");
                        statusp.dialog({                         
                          resizable:false
                          }).dialog("open");
                    }
                }
            });
        });
    }
})(jQuery);


  
                        