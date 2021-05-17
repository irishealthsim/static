/*
This plugin is for file upload functionality
*/
(function ($) {
    var fu = $.fileUpload = {};
    $.fileUpload = $.fileUpload || {};
    $.fn.fileUpload = function (options) {
        this.options = $.extend($.fileUpload.defaults, options);
        $.fileUpload.methods.init.apply(this, $.makeArray(this.options));
    };
    var $uploadFileDialog = $("#" + "tool-upload-files-dialog");
    var uploadObject;
    var fname;
    var urlPath;
    var folderID;
    var isFileExist = "false";


    allowedFileExtensions = ['2mdl', '7zip',
                       'accd', 'accdb', 'accdc', 'accde', 'accdr', 'accdt', 'accdt_1033', 'ai', 'avi',
                       'bmp',
                       'cat', 'chm', 'cin', 'config', 'css', 'csv',
                       'dat', 'db', 'dib', 'disc', 'do', 'docm', 'doc', 'docx', 'dot', 'dot', 'dotm', 'dotx', 'dta', 'dvd', 'dwp', 'dwt',
                       'emf', 'eml', 'eps', 'est',
                       'flv', 'frm', 'fwp',
                       'gif', 'gin', 'gis', 'gph',
                       'hdp', 'hlp', 'hta', 'htt',
                       'idml', 'indb', 'indd', 'indl', 'indt', 'inf', 'ini',
                       'jfif', 'jpe', 'jpeg', 'jpg', 'jse', 'log', 'lst',
                       'master', 'mdb', 'mdl', 'mht', 'mov', 'mp3', 'mp4', 'mpd', 'mpp', 'mps', 'mpt', 'mpw', 'mpx', 'msg',
                       'ocx', 'odc', 'odp', 'ods', 'odt', 'ogv', 'one', 'onepkg', 'onetoc2',
                       'pdf', 'pmd', 'png', 'pot', 'potm', 'potx', 'ppa', 'ppam', 'pps', 'ppsd', 'ppsm', 'ppsx', 'ppt', 'pptm', 'pptx', 'prm', 'psd', 'psp', 'pst', 'ptm', 'ptt', 'pub', 'pub',
                       'quark', 'rdl', 'rep', 'rsapplication', 'rsc', 'rsd', 'rsds', 'rtf',
                       'smdl', 'stp', 'sts', 'stt', 'swf',
                       'tab', 'txt', 'tar',
                       'vcd', 'vcf', 'vdf', 'vdi', 'vdo', 'vgd', 'vgf', 'vmf', 'voc', 'vpa', 'vpd', 'vpm', 'vsc', 'vsd', 'vts',
                       'wmf',
                       'xlf', 'xlsm', 'xqx', 'xslb', 'xls', 'xlsx', 'xlt', 'xlst',
                       'zip', 'sgt', 'key', 'thm', 'thmx', 'scx'
    ],

    //namespace
  $.fileUpload = {
      //service url ref
      serviceUrlRef: {
          uploadFiles: '/_layouts/IImpact.Web/LifecycleDocumentTemplateService.asmx/AddFile',
          UploadLatestFile: '/_layouts/IImpact.Web/LifeCycleDocumentsService.asmx/Checkin'
      },
      //Array to declare Ids
      ids: {
          fileupload: 'fileupload',
          linkDialog: 'documentLinkDialogId',
          buttonAttach: 'buttonAttachId',
          buttonCancel: 'buttonCancelId'
      },
      //array to declare Classes
      classes: {
          highlight: 'xp-Customhighlight',
          lcFolder: 'xp-LCDocFolder',
          lcFile: 'xp-LCDocFile',
          linkRoot: 'xp-LinkRoot',
          customTitle: 'xp-CustomTitle'
      },

      /*Array to declare methods*/
      methods: {
          /*Entry Point for the plugin*/
          init: function (options) {
              var elem = $(this);
              $.fileUpload.methods.createHtml.apply(elem, $.makeArray(options));
          },

          createHtml: function (options) {
              var elem = $(this);
              var toolName = options.toolHeader;

              /*
              * Get the reference of the Add/Edit form element and save the current z-index
              */
              var formElem = $("#" + options.formId);
              var formIndex = formElem.css("z-index");
              elem.hide();
              var containerDiv = $("<div />");
              var docLink = $("<div id='docLinkId' class='form-control xp-FloatLeft xp-Width50 xp-Height-20' style='margin-right: 5px;border: 1px solid #b9b9b9; padding:2px; overflow:hidden;' />");
              docLink.html(elem.val());
              var button = $("<div id='fileuploadPopup' style='margin-top:6px;float:left;'><a class='xpThemeButton xpPadding  ui-primarytabclr ui-corner-all' >" + options.attachfilelbl + "</a></div>");
              var removeButton = $("<div id='deleteLink' style='float:left;margin-top:10px; margin-left:10px;'><a class='xpThemeButton xpPadding  ui-primarytabclr ui-corner-all'>" + options.removelbl + "</a></div>");
              /*add the link and button elements*/
              containerDiv.append(docLink).append(button).append(removeButton);
              elem.after(containerDiv);
              if (elem.val() == 0) {
                  $("#deleteLink").css("display", "none");
                  $("#docLinkId").css("display", "none");
              }
              if (elem.val() != 0) {
                  $("#fileuploadPopup").css("display", "none");
                  $("#deleteLink").css("display", "block");
                  $("#docLinkId").css("display", "block");
                  var fileName = $(elem.val()).text();
                  var fileDetails = new Object();
                  fileDetails.filename = fileName;
                  fileDetails.toolName = options.toolHeader;
                  fileDetails.trackerId = options.trackerId;

                  $.ajax({
                      url: "/_layouts/IImpact.Web/SevernDeanery/SupportMaterialsService.asmx/UploadedFileUrl",
                      contentType: "application/json; charset=utf-8",
                      type: "post",
                      dataType: "json",
                      async: false,
                      responseType: "json",
                      data: "{fileDetails:" + JSON.stringify(fileDetails) + "}",
                      success: function (datap) {
                          var data = datap.d;
                          href = "<div class='docLinkOverlay' ><a data-docname='" + fileName + "' href='" + data + "' >" + fileName + "</a></div>";
                          docLink.html(href);
                          elem.val(href);

                      }
                  });
                  button.attr("disabled", true).addClass("not-allowed");
                  $('#Linkid').attr('disabled', true);
              }
              /*
              * Click of 'Remove' button
              */
              removeButton.click(function () {
                  var docName = docLink.text();
                  button.attr("disabled", false).removeClass("not-allowed");
                  $.ajax({
                      url: "/_layouts/IImpact.Web/SevernDeanery/SupportMaterialsService.asmx/removeUploadedToolFile",
                      contentType: "application/json; charset=utf-8",
                      type: "post",
                      dataType: "json",
                      data: "{fileName:'" + docName + "',trackerId:'" + options.trackerId + "',folderName:'" + options.toolHeader + "'}",
                      responseType: "json",
                      success: function (datap) {
                          //alert("remove");
                          var data = datap.d;
                          $("#fileuploadPopup").css("display", "block");
                          $("#deleteLink").css("display", "none");
                          $("#docLinkId").css("display", "none");
                      }
                  });
                  docLink.html('');
                  elem.val('');
              });
              /*
              * Click of 'Link' button
              */
              button.click(function () {



                  var linkDialog = $("<div id='" + $.fileUpload.ids.linkDialog + "' title=''/>");
                  linkDialog.dialog("close");
                  /*Get Lifecycle Folders and show the pop-up*/
                  $.ajax({
                      url: $.documentLinksDialog.paths.getRootFolderContents, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{}",
                      success: function (datap, st) {
                          var data = datap.d;
                          containerDiv.append(linkDialog);
                          linkDialog.css("z-index", "999999");
                          linkDialog.dialog({
                              autoOpen: false,
                              width: 400,
                              height: 150,
                              modal: true,
                              position: {
                                  my: 'center',
                                  at: 'center',
                                  of: formElem
                              },
                              open: function (event, ui) {
                                  var parentElem = $(this).parent();
                                  formElem.css("z-index", "1");
                                  /*
                                  *Add custom title to the title bar
                                  */
                                  var customTitle = $("<div class='" + $.fileUpload.classes.customTitle + " xp-FontBold xp-FloatLeft'>" + options.attachfilelbl + "</div>");
                                  parentElem.find(".ui-dialog-title").append(customTitle);
                                  /*
                                  *Disable the 'Attach' button
                                  */
                                  $("#" + $.fileUpload.ids.buttonAttach).attr("disabled", false);
                                  // $("#" + $.documentLinksDialog.ids.button).addClass("ui-state-disabled");
                              },
                              beforeclose: function (event, ui) {
                                  formElem.css("z-index", formIndex);
                              },
                              close: function (event, ui) {
                                  $("div.ui-dialog").remove();
                                  $(this).dialog("destroy").dialog("widget").remove();
                              },
                              buttons: [
                                {
                                    /*
                                    *'Browse' button
                                    */
                                    text: options.browselbl,
                                    id: "browseFile",
                                    click: function (e) {
                                        var control = $("#browseFile");
                                        control.replaceWith(control = control.clone(true));
                                        var path = '/_layouts/IImpact.Web/SevernDeanery/SupportMaterialsService.asmx/AddFile';
                                        e.preventDefault();
                                        uploadObject = new AjaxUpload($("#browseFile"), {

                                            action: path,
                                            autoSubmit: false,
                                            name: 'uploadFile',
                                            dataType: 'json',

                                            onComplete: function (file, response) {
                                                var fileDetails = new Object();
                                                fileDetails.filename = file;
                                                fileDetails.toolName = options.toolHeader;
                                                fileDetails.trackerId = options.trackerId;

                                                $.ajax({
                                                    url: "/_layouts/IImpact.Web/SevernDeanery/SupportMaterialsService.asmx/UploadedFileUrl",
                                                    contentType: "application/json; charset=utf-8",
                                                    type: "post",
                                                    dataType: "json",
                                                    responseType: "json",
                                                    data: "{fileDetails:" + JSON.stringify(fileDetails) + "}",
                                                    success: function (datap) {
                                                        $("#deleteLink").css("display", "block");
                                                        $("#docLinkId").css("display", "block");
                                                        var data = datap.d;
                                                        href = "<div class='docLinkOverlay' ><a data-docname='" + file + "' href='" + data + "' >" + file + "</a></div>";
                                                        docLink.html(href);
                                                        elem.val(href);
                                                        //alert("complete");
                                                    }
                                                });

                                                /*TODO: get teh file name and file id.. place teh file name on the docLinkId div */
                                                /* Checking the response after fileupload action */
                                            },
                                            /* Validating the file among the accepted extensions or not*/
                                            onSubmit: function (file, ext) {

                                                //add file to doc folder
                                                uploadObject.setData({ 'folderId': folderID, 'trackerId': options.trackerId });
                                                $("#fileuploadPopup").css("display", "none");
                                            },

                                            /*When user selects a file,Show the filename in textbox*/
                                            onChange: function (file, extension) {
                                                /*Check the extensions of file whether it matches to allowed file types. if not throw the error message*/
                                                result = $.inArray(extension.toLowerCase(), allowedFileExtensions);
                                                if (!! ~result) {
                                                    /*write ajax cal for checking whether there is a file inside the folder or not.Duplicate entry check*/
                                                    fname = file;
                                                    var fileDetails = new Object();
                                                    fileDetails.filename = file;
                                                    fileDetails.toolName = options.toolHeader;
                                                    fileDetails.trackerId = options.trackerId;

                                                    $.ajax({
                                                        url: "/_layouts/IImpact.Web/SevernDeanery/SupportMaterialsService.asmx/checkExistingFile",
                                                        contentType: "application/json; charset=utf-8",
                                                        type: "post",
                                                        dataType: "json",
                                                        responseType: "json",
                                                        data: "{fileDetails:" + JSON.stringify(fileDetails) + "}", //"{filename:'" + file + "', toolName:'" + options.toolHeader + "',trackerId:'" + options.trackerId + "'}",
                                                        success: function (datap) {
                                                            var data = datap.d;
                                                            folderID = data.ParentFolderId;
                                                            if (data.Status == "true") {
                                                                isFileExist = "true";
                                                                $("#documentLinkDialogId").html("This file has already been added... Please add another file to attach.");
                                                            }
                                                            else {
                                                                isFileExist = "false";
                                                                $("#documentLinkDialogId").html(file);
                                                                $("#documentLinkDialogId").addClass($.fileUpload.classes.highlight);
                                                                $("#browseFile").attr("disabled", true).addClass("not-allowed");
                                                                $("#" + $.fileUpload.ids.buttonAttach).attr("disabled", false).removeClass("not-allowed");
                                                            }
                                                        }
                                                    });
                                                }
                                                else {
                                                    $("#documentLinkDialogId").html("Oops!! Something went wrong with the Filetype. Please try other file types.");
                                                }
                                            }
                                        });   //end ajax upload
                                        //$("#browseFile").trigger("click");
                                        e.preventDefault();
                                        // e.stopProgration();
                                    }
                                },


                                {
                                    /*
                                    *'Attach' button
                                    */
                                    text: options.attachlbl,
                                    id: $.fileUpload.ids.buttonAttach,
                                    click: function (e) {
                                        var elem = $(this);
                                        /*Get the file selected to link*/
                                        //var selectedFile = $("div." + $.fileUpload.classes.highlight + " a");
                                        var fileName = fname;
                                        var href = elem.val()
                                        if (isFileExist == "false") {
                                            uploadObject.submit();
                                            button.attr("disabled", true).addClass("not-allowed");
                                        }
                                        //docLink.html(href);
                                        //elem.val(href);
                                        $(this).dialog("close");
                                        docLink.append("<div id='relayAjaxLoading'><div class='xp-Width xp-TextAlignCenter xp-Height100 xp-relayAjaxLoader'><img src='/_layouts/Images/XPointBase/xp-loader.gif'style='z-index:999999999;text-align:center;'/></div></div>");
                                    }
                                },
                                {
                                    /*
                                    *'Cancel' button
                                    */
                                    text: options.cancellbl,
                                    id: $.fileUpload.ids.buttonCancel,
                                    click: function () {
                                        $(this).dialog("close");
                                    }
                                }
                              ]
                          }); /*close linkDialog*/
                          linkDialog.dialog("open");
                          $("#" + $.fileUpload.ids.buttonAttach).attr("disabled", true).addClass("not-allowed");
                          $.fileUpload.methods.initiateAjaxFileUpload(options);
                      } /*close success*/
                  }); /*close ajax*/

              });

          }, //end of CreateHtml
          // initiate a file upload
          initiateAjaxFileUpload: function (options) {
              uploadObject = new AjaxUpload($("#browseFile"), {
                  //AjaxUpload($("#browseFile"), {
                  action: '/_layouts/IImpact.Web/SevernDeanery/SupportMaterialsService.asmx/AddFile',
                  autoSubmit: false,
                  name: 'uploadFile',
                  dataType: 'json',
                  onComplete: function (file, response) {
                      alert();
                      var fileDetails = new Object();
                      fileDetails.filename = file;
                      fileDetails.toolName = options.toolHeader;
                      fileDetails.trackerId = options.trackerId;

                      $.ajax({
                          url: "/_layouts/IImpact.Web/SevernDeanery/SupportMaterialsService.asmx/UploadedFileUrl",
                          contentType: "application/json; charset=utf-8",
                          type: "post",
                          dataType: "json",
                          responseType: "json",
                          data: "{fileDetails:" + JSON.stringify(fileDetails) + "}",
                          success: function (datap) {

                              var data = datap.d;
                              href = "<div class='docLinkOverlay' ><a data-docname='" + file + "' href='" + data + "' >" + file + "</a></div>";
                              docLink.html(href);
                              elem.val(href);
                          }
                      });
                  }
              });   //end initiate ajax upload
              $("#browseFile").trigger("click");
          } //  initiate a file upload end
      } //methods end
  }  //end of namespace
})(jQuery);