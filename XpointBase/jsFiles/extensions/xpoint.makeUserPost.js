(function ($) {
  $.fn.makeUserPost = function (options) {
    if (!this || this.length == 0) { return };
    if (typeof (options) == "object") {
      var elem = $(this);
      return $.makeUserPost.methods.init.call(elem, options);
    }
    if ($.makeUserPost.methods[options]) {
      makeUserPostOptions = $.extend(makeUserPostOptions, Array.prototype.slice.call(arguments, 1));
      return $.makeUserPost.methods[options].call($(this), makeUserPostOptions);
    }
  };
  var options;
  var uploadObject;
  var fileUpload = false;
  var fileExtension = 'txt';
  var pollOptionsAdded = false;
  var linkOptionsAdded = false;
  var showThumbnail = false;
  var isValid = true;
  var postContentType = "TextPostContentType";
  var isMarkAsRead = false;
  $.makeUserPost = {
    defaults: {
      inputBoxWaterMarkText: 'Write / Ask something',
      addPollOptionWaterMarkText: '+ Add a poll option',
      urlWaterMarkText: 'Type/ Paste link here',
      maxTextBoxCharCount: 140,
      systemAdmin: false,
      maxPollOptions: 5,
      minPollOptions: 2,
      validFileExtensions: ["eps", "mp4", "csv", "mp3", "accd", "accdt", "accdc", "accde", "accdr", "asax", "ascx", "asmx", "asp", "aspx", "avi", "bmp", "cat", "chm", "config", "css", "db", "dib", "disc", "doc", "docm", "docx", "dot", "dotm", "dotx", "dvd", "dwp", "dwt", "eml", "est", "fwp", "flv", "gif", "hdp", "hlp", "hta", "htm", "htt", "inf", "ini", "jfif", "jpe", "jpeg", "jpg", "jse", "log", "master", "mht", "mhtml", "mov", "mpd", "mpp", "mps", "mpt", "mpw", "mpx", "msg", "msi", "ocx", "ogv", "odc", "odp", "odt", "ods", "one", "onepkg", "onetoc2", "pdf", "png", "pot", "potm", "potx", "ppa", "ppam", "ppt", "pptm", "pptx", "pps", "ppsd", "ppsm", "ppsx", "psp", "psd", "ptm", "ptt", "pub", "rdl", "rsapplication", "rsc", "rsd", "rsds", "rtf", "smdl", "stp", "stt", "thmx", "tif", "tiff", "txt", "vbe", "vbs", "vdw", "vdx", "vsd", "vsl", "vss", "vst", "vsu", "vsw", "vsx", "vtx", "wdp", "webpart", "wm", "wma", "wmd", "wmp", "wms", "wmv", "wmx", "wmz", "wsf", "xla", "xlam", "xls", "xlsm", "xlsx", "xlt", "xltb", "xltm", "xltx", "xml", "xps", "xsd", "xsl", "xsn", "xslt", "zip"],
      mediaFileTypes: ['gif', 'jpg', 'mp4', 'mp3', 'wmv', 'avi', 'mov', 'mkv', 'm4a', 'png', 'ogv', 'flv'],
      thumbnailIconSrc: "",
      minPollToShow: 2,
      timeOut: 2500
    },
    /*
    * array for  service url paths
    */
    paths: {
      addUserFile: "/_Layouts/IImpact.Web/UserPostsService.asmx/AddFile",
      addOrganizationFile: "/_Layouts/IImpact.Web/OrganizationPostsService.asmx/AddFile",
      addUserPost: "/_vti_bin/XPointBase/UserPostsService.svc/AddPost",
      addOrganizationPost: "/_vti_bin/XPointBase/OrganizationPostsService.svc/AddPost",
      getIconUrl: "/_vti_bin/XPointBase/UserPostsService.svc/getFileIcon",
      saveLinkInfo: ""
    },
    /*
    * array for ids
    */
    ids: {
      containerDiv: 'mainDiv',
      inputBox: 'inputBox',
      pollDiv: 'pollDiv',
      pollLink: 'pollLink',
      urlInputBox: 'urlInputBox',
      url: 'url',
      linkDiv: 'linkDiv',
      urlLoading: 'urlLoading',
      urlTitle: 'urlTitle',
      urlIcon: 'urlIcon',
      urlDescription: 'urlDescription',
      urlThumbnailPreview: 'urlThumbnailPreview',
      urlDeleteIcon: 'urlDeleteIcon',
      urlAcceptIcon: 'urlAcceptIcon',
      urlInputSubDiv: 'urlInputSubDiv',
      pollRemoveLink: 'pollRemoveLink',
      removePollLinkHref: 'removePollLinkHref',
      showThumbnailOption: 'showThumbnailOption',
      pollOptionsContainer: 'pollOptionsContainer',
      thumbnailIconSrcDiv: 'thumbnailIconSrcDiv',
      thumbnailDefaultIcon: 'thumbnailDefaultIcon',
      acknowledgeOption: 'acknowledgeOption',
      acknowledgeIcon: 'acknowledgeIcon',
      acknowledgeOptionUrl: 'acknowledgeOptionUrl',
      acknowledgeMainDiv: 'acknowledgeMainDiv',
      pollOptionsText: 'pollOptionsText',
      errorMainDiv: 'errorMainDiv',
      errorTextDiv: 'errorTextDiv',
      errorText: 'errorText',
      successMainDiv: 'successMainDiv',
      successTextDiv: 'successTextDiv',
      successText: 'successText',
      urlPreview: 'urlPreview',
      buttonDiv: 'buttonDiv',
      uploadDiv: 'uploadDiv',
      fileUpload: 'fileUpload',
      fileIcon: 'fileIcon',
      fileMainDiv: 'fileMainDiv',
      fileDeleteIcon: 'fileDeleteIcon',
      counterDiv: 'counterDiv',
      asUserOption: 'asUserOption',
      fileNameID: 'fileNameID',
      allowMultipleOption: 'allowMultipleOption',
      allowAnswerChange: 'allowAnswerChange',
      selectOptions: 'selectOptions',
      asOrganizationOption: 'asOrganizationOption',
      radioButtonContainer: 'radioButtonContainer',
      radioButtonMainDiv: 'radioButtonMainDiv',
      multilineInputBox: 'multilineInputBox',
      postUpdateDialog: 'postUpdateDialog',
      asUserRadioButton: 'asUserRadioButton',
      forOrganizationRadioButton: 'forOrganizationRadioButton',
      chooseFileButton: 'chooseFileButton',
      removeFile: 'removeFile',
      postUpdateText: 'postUpdateText',
      customFileName: 'customFileName',
      addPollDiv: 'addPollDiv',
      createPollLink: 'createPollLink',
      addOptionDiv: 'addOptionDiv',
      addPollOptionInput: 'addPollOptionInput',
      pollOptionsDiv: 'pollOptionsDiv',
      postButton: 'postButton',
      cancelButton: 'cancelButton',
      linkFileText: 'linkFileText',
      newlyCreated: 'newlyCreated'
    },
    /*
    * array for css classes used in the plugin
    */
    classes: {
      floatRight: 'xp-FloatRight',
      resetMarginPadding: 'xp-ResetMarginPadding xp-FloatLeft',
      multilineCss: 'xp-TextAreaWidthIe',
      counterDiv: "xp-FloatRight xp-MarginRight-3",
      counterDivCss: 'xp-FloatLeft xp-Width  xp-DottedBorderBottom xp-CounterDivCss',
      floatLeft: 'xp-FloatLeft',
      linkLabel: 'xp-LinkLabel',
      linksCss: 'xp-FloatLeft xp-Padding-4 Tip-HPFileLink',
      dialogDiv: 'xp-Dialog xp-OverflowHidden xp-ResetMarginPadding  ',
      dialogHeader: 'xp-DialogHeader',
      headerText: ' xp-PaddingDialog xp-LinkColor ',
      dialogHeaderDiv: ' xp-DialogHeader xp-DialogBorderBottom xp-PaddingDialog xp-DialogBottom xp-DialogFooterPadding ',
      textBoxDivCss: ' xp-PaddingDialog xp-DialogHeader ',
      overflowHidden: 'xp-OverflowHidden',
      fullWidth: 'xp-Width',
      displayBlock: 'xp-DisplayBlock',
      dialogTopBottomPadding: 'xp-DialogFooterPadding',
      dialogBorderBottom: 'xp-DialogBorderBottom ',
      dialogBgColor: 'xp-DialogBottom',
      dialogPadding: 'xp-PaddingDialog',
      textColor: 'xp-LinkColor',
      dashedBorder: 'xp-DashedBorder',
      noBorder: 'xp-BorderNone',
      marginLeft20: ' xp-MarginLeft20 ',
      dialogHeader: 'xp-DialogHeader',
      transparent: 'xp-Transparent',
      displayNone: 'xp-DisplayNone',
      allUsersDiv: ' xp-FloatLeft xp-Width10 xp-BorderRight xp-PaddingDialog xp-DialogFooterPadding ',
      borderRight: 'xp-BorderRight xp-PaddingDialog xp-DialogFooterPadding',
      visibilityHidden: 'xp-VisibilityHidden',
      dialogCheckBox: 'xp-DialogCheckBox',
      pollBorderBottom: 'xp-PollBorderBottom',
      dashedDivCss: ' xp-DialogHeader xp-PaddingDialog xp-DashedBorder ',
      buttonCss: 'xp-FloatLeft xp-DialogFooterPadding xp-PaddingDialog ',
      checkBoxCss: 'xp-width32 xp-BorderRight xp-DialogFooterPadding xp-PaddingDialog xp-FloatLeft xp-VisibilityHidden xp-DialogCheckBox ',
      createPollcss: ' xp-DialogHeader xp-Transparent xp-PollBorderBottom ',
      pollOption: ' xp-ResetMarginPadding xp-FloatLeft xp-DialogHeader xp-Width xp-PollBorderBottom ',
      addAnOption: ' xp-ResetMarginPadding xp-PaddingDialog xp-FloatLeft ',
      markAsRead: ' xp-ResetMarginPadding xp-FloatLeft xp-Width xp-DialogHeader xp-PaddingDialog xp-DisplayNone xp-MarkAsRead ',
      acknowledgeMainDiv: 'xp-FloatLeft xp-Width xp-PostBackground xp-DisplayNone xp-TxtBox xp-BottomBorder',
      acknowledgeIcon: 'xp-FloatLeft xp-Padding-4  xp-Icon-Highlight  xp-IconAddAcknowledge-Highlight',
      acknowledgeOption: 'xp-FloatLeft xp-Padding-4',
      acknowledgeOptionUrl: 'xp-LinkLabel xp-HoverCursor',
      acknowledgeUrlTour: 'Tip-HPAckOptionUrl',
      successMainDiv: 'xp-FloatLeft xp-Width xp-PositionAbsolute',
      successMain: 'xp-PositionRelative xp-FloatLeft xp-Width xp-Height-0',
      successTextDiv: 'xp-SuccessMsg xp-DisplayBlock'
    },
    /*
    * all methods under makeUserPost Plugin resides here
    */
    methods: {
      /*
      * Entry point to this plugin
      */
      init: function (options) {
        var elem = this;
        options = $.extend($.makeUserPost.defaults, options);
        var containerDiv = $("<div class='xp-FloatLeft xp-Width xp-TxtBox xp_link'  id= '" + $.makeUserPost.ids.containerDiv + "' />");
        containerDiv.appendTo(elem);
        containerDiv.data('updateOptions', options);
        $.makeUserPost.methods.createWaterMarkHtml.call(containerDiv, options);

      },
      /*creates water mark html*/
      createWaterMarkHtml: function (options) {
        var elem = $(this).empty();
        options = $.extend({}, elem.options, options);
        var span = $("<div class='xp-Padding-5 Tip-HPMakePost no_padding' ><span id='" + $.makeUserPost.ids.inputBox + "' name='" + $.makeUserPost.ids.inputBox + "' /></div>")
                          .append(options.inputBoxWaterMarkText)
													.appendTo(elem).hide().fadeIn("slow")
													.click(function () {
													  $.makeUserPost.methods.createPostHtml.apply(elem, $.makeArray(options));
													});
      },
      /*
      *  Determine content types 
      */
      determineContentType: function (options) {
        var type = "TextPostContentType";
      },
      /*
      * Calls addPollOptions method to the post
      */
      addPoll: function (options) {
        postContentType = "PollPostContentType";
        pollOptionsAdded = true;
        $("#" + $.makeUserPost.ids.pollLink).addClass($.makeUserPost.classes.displayNone);
        $("#" + $.makeUserPost.ids.pollRemoveLink).removeClass($.makeUserPost.classes.displayNone).hide().fadeIn("slow");
        $.makeUserPost.methods.addPollOptions.apply(this, $.makeArray(options));
      },
      /*
      * Remove Poll options from the post
      */
      removePoll: function (options) {
        postContentType = "TextPostContentType";
        pollOptionsAdded = false;
        $("#" + $.makeUserPost.ids.pollLink).removeClass($.makeUserPost.classes.displayNone);
        $("#" + $.makeUserPost.ids.pollRemoveLink).addClass($.makeUserPost.classes.displayNone).show().fadeOut("slow");
        $("#" + $.makeUserPost.ids.pollOptionsDiv).remove();
        $("#" + $.makeUserPost.ids.selectOptions).addClass($.makeUserPost.classes.displayNone).show().fadeOut("medium");
        $.makeUserPost.methods.clearError();
      },
      /*
      * Adding Poll Options to the post
      */
      addPollOptions: function (options) {
        var container = $("#" + $.makeUserPost.ids.pollOptionsContainer);
        if ($("#" + $.makeUserPost.ids.pollOptionsDiv).length == 0) {
          var pollOptionsDiv = $("<div id='" + $.makeUserPost.ids.pollOptionsDiv + "'>")
                                .appendTo(container).hide().fadeIn("slow");
        }
        else {
          var pollOptionsDiv = $("#" + $.makeUserPost.ids.pollOptionsDiv);
        }
        /*Adding maxNumber of poll options to the poll div */
        for (i = 0; i < options.maxPollOptions; i++) {
          var needDisplay = (i < options.minPollToShow);
          var display = (needDisplay === true) ? "block" : "none";
          var pollId = "pollIdPrefix" + i;
          var mainDiv = $("<div id='" + pollId + "' style='display:" + display + "' class='xp-FloatLeft xp-Width xp-PostBackground  xp-DottedBorderBottom pollOptionMainDiv' />");
          var iconDiv = $("<div class='xp-FloatLeft xp-Padding-4  xp-Icon-Highlight  xp-IconAddPoll'/>");
          var subDiv = $("<div class='xp-FloatLeft xp-Padding-4 ' />");
          var input = $("<input  type='text'  autocomplete='off'/>")
					            .attr('maxlength', options.maxTextBoxCharCount)
                    .appendTo(subDiv);
          input.keypress(function () {
            var sibling = $(this).parents(".pollOptionMainDiv").next();
            sibling.slideDown("slow");
            $("input", sibling).watermark(options.addPollOptionWaterMarkText).blur();
          });
          iconDiv.appendTo(mainDiv);
          subDiv.appendTo(mainDiv);
          mainDiv.appendTo(pollOptionsDiv);
          if (needDisplay === true) {
            input.watermark(options.addPollOptionWaterMarkText);
          }
        }
        /*
        * Removing display none inorder to display other options(Allow Multiple choices, Allow answer changes)  
        */
        $("#" + $.makeUserPost.ids.selectOptions).removeClass($.makeUserPost.classes.displayNone).hide().fadeIn("slow");

      },
      /*  
      *  Processes poll options
      */
      processPollAddition: function (opts) {
        var elem = this;
        $.makeUserPost.methods.addPoll.apply(elem, $.makeArray(opts));
      },
      /*
      * Validate for number of options created and to check if the next sibiling already exists
      * (if it does exists return false)
      */
      validatePollAddition: function (opts) {
        var currentOptElems = $("input[type='text']", $("#" + $.makeUserPost.ids.pollDiv));
        /*
        * Here we have processed current input elements in poll div. If the number of
        * textboxes is less than max poll options then we can add more textbox as poll 
        * options otherwise not.
        */
        if (currentOptElems.length < opts.maxPollOptions) {
          var elem = $(this);
          /*
          * now lets check if the next sibiling of type text exists, if does then no need to 
          * add more elements otherwise return true
          */
          return ($(elem.parents(".pollOptionMainDiv").get(0)).next(".pollOptionMainDiv").length == 0);
        }
        return false;
      },
      /*
      * Validates the given url against regular expression and returns true/false based on the result
      */
      validateUrl: function (textval) {
        var urlregex = new RegExp("^(http|Http|HTTP|Https|https|ftp|Ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
        return urlregex.test(textval);
      },
      /*processes user entered url*/
      processUrl: function () {
        var inputBox = $("#" + $.makeUserPost.ids.url);
        var url = inputBox.val();
        var urlDiv = $("#" + $.makeUserPost.ids.urlInputSubDiv);
        if (url.length > 0) {
          if ($.makeUserPost.methods.validateUrl(url)) {
            $.makeUserPost.methods.clearError();
            urlDiv.showLoading();
            /*Converting Url's starting part (Http) to lower as embedly giving error if we pass with Http*/
            var updatedUrl = url.slice(0, url.indexOf(':')).toLowerCase() + url.slice(url.indexOf(':'), url.length);
            $.makeUserPost.methods.getUrlInfo.call(urlDiv, updatedUrl);
            $("#" + $.makeUserPost.ids.showThumbnailOption).click().change();
          }
          else {
            /*Show wrong url text message*/
            $.makeUserPost.methods.addError("Invalid Url");
          }
        }
      },
      /*
      *  Validates the post
      */
      validatePost: function (options) {
        /*
        * Checking multiline input box towards empty.
        */
        var valid = true;
        var url = $("#" + $.makeUserPost.ids.url).val();
        if ($("#" + $.makeUserPost.ids.multilineInputBox).val().length == 0) {
          $.makeUserPost.methods.addError("Sorry, the post is empty");
          valid = false;
          return valid;
        }
        else if (!$.makeUserPost.methods.validateUrl(url) && (url.length > 0)) {
          $.makeUserPost.methods.addError("Invalid Url");
          valid = false;
          return valid;
        }
        else if (!isValid) {
          return false;
        }
        else {
          /*
          * Checking for minimum number of poll options
          */
          var validCount = 0;
          if (pollOptionsAdded) {
            for (i = 0; i < options.maxPollOptions; i++) {
              var selector = '#pollIdPrefix' + i + ' input';
              if ($(selector).val().length > 0) {
                validCount++;
              }
            }
            if (validCount < options.minPollOptions) {
              $.makeUserPost.methods.addError("Sorry, minimum poll options are " + options.minPollOptions);
              valid = false;
              return valid;
            }
          }
          /*
          * if all the above conidions are ok then validating post 
          */
          return valid;
        }
      },
      /*
      * ordering the poll options if user not entered in the proper order
      */
      orderPoll: function (options) {
        for (i = 1; i <= options.maxPollOptions; i++) {
          if ($("#" + $.makeUserPost.ids.pollOptionsText + i).val().length == 0) {
            var modified = false;
            for (j = 1 + i; (j + i <= options.maxPollOptions) && (!modified); j++) {
              if ($("#" + $.makeUserPost.ids.pollOptionsText + (j + i)).val().length != 0) {
                $("#" + $.makeUserPost.ids.pollOptionsText + i).val($("#" + $.makeUserPost.ids.pollOptionsText + (j + i)).val());
                $("#" + $.makeUserPost.ids.pollOptionsText + (j + i)).val('');
                modified = true;
              }
            }
          }
        }
      },
      /*
      * Get's the icon src based on the filetype
      */
      getFileIcon: function (options) {
        var iconFilePath = options.fileIconSrc;
        $.ajax({
          url: $.makeUserPost.paths.getIconUrl,
          type: 'GET',
          cache: false,
          async: false,
          datatype: 'json',
          data: ({ "fileName": options.fileName }),
          success: function (data) {
            /*
            * updating file icon if we successfully get the file icon
            */
            if (data && data.GetFileIconResult) {
              iconFilePath = data.GetFileIconResult;
            }
          }
        });
        return iconFilePath;
      },
      /*
      * Updating file icon based on the filetype
      */
      applyFileIcon: function (fileIconSrc) {
        /*
        * Sanity check 
        */
        if (fileIconSrc != null) {
          $("#" + $.makeUserPost.ids.fileIcon).attr('src', fileIconSrc);
        }
      },
      /*validates files is there in allowed extensions or not */
      validateFileUpload: function (ext, opts) {
        if ($.inArray(ext.toLowerCase(), opts.validFileExtensions) < 0) {
          return false;
        }
        else {
          return true;
        }
      },
      /* 
      * Based on the uploading file type determining the content type
      */
      determineMediaExtension: function (ext, opts) {
        if ($.inArray(ext, opts.mediaFileTypes) + 1 < 0) {
          fileExtension = ext;
          postContentType = "DocumentPostContentType";
        }
        else {
          fileExtension = ext;
          postContentType = "MediaPostContentType";
        }
      },
      /*
      * gathering and returning the postdata inorder to post the data
      */
      getPostData: function (options) {
        var getObject = new Object();
        var desc = $("#" + $.makeUserPost.ids.multilineInputBox).val()
        getObject.description = desc.replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
        /*
        * adding poll options if user selected
        */
        getObject.pollOption1 = (pollOptionsAdded) ? $("#pollIdPrefix0 input").val() : '';
        getObject.pollOption2 = (pollOptionsAdded) ? $("#pollIdPrefix1 input").val() : '';
        getObject.pollOption3 = (pollOptionsAdded) ? $("#pollIdPrefix2 input").val() : '';
        getObject.pollOption4 = (pollOptionsAdded) ? $("#pollIdPrefix3 input").val() : '';
        getObject.pollOption5 = (pollOptionsAdded) ? $("#pollIdPrefix4 input").val() : '';
        getObject.isAnswerChangesAllowed = (pollOptionsAdded) ? $("#" + $.makeUserPost.ids.allowAnswerChange).attr('checked') : false;
        getObject.isMultipleAnswersAllowed = (pollOptionsAdded) ? $("#" + $.makeUserPost.ids.allowMultipleOption).attr('checked') : false;
        getObject.forOrganization = $("#" + $.makeUserPost.ids.asOrganizationOption).attr('checked') ? true : false;
        getObject.isMarkAsRead = isMarkAsRead;
        var sericeUrl = (options.isAdmin === true) ? $.makeUserPost.paths.addOrganizationPost : $.makeUserPost.paths.addUserPost;
        /*
        * adding link options if user selected
        */
        getObject.link = (linkOptionsAdded) ? $("#" + $.makeUserPost.ids.url).val() : '';
        getObject.urlTitle = (linkOptionsAdded && showThumbnail) ? $("#" + $.makeUserPost.ids.urlTitle).html() : '';
        getObject.showThumbnail = $("#" + $.makeUserPost.ids.showThumbnailOption).attr('checked') ? true : false;
        getObject.urlThumbnailIcon = (linkOptionsAdded && showThumbnail) ? $("#" + $.makeUserPost.ids.urlIcon).attr('src') : '';
        getObject.urlDescription = (linkOptionsAdded && showThumbnail) ? $("#" + $.makeUserPost.ids.urlDescription).html() : '';
        var urlInputSubDiv = $("#" + $.makeUserPost.ids.urlInputSubDiv);
        if (linkOptionsAdded && showThumbnail) {
          var iframeData = $("iframe", urlInputSubDiv.data().linkInfo.code).length > 0 ? urlInputSubDiv.data().linkInfo.code : '';
          getObject.linkHtml = iframeData;
        }
        else {
          getObject.linkHtml = '';
        }
        getObject.fileIncluded = false;
        getObject.contentType = postContentType;
        getObject.contentType = $.makeUserPost.methods.determineContentType.call(this, options);
        return getObject;
      },
      /*
      * determines post content type
      */
      determineContentType: function (options) {
        if (pollOptionsAdded) {
          return "PollPostContentType";
        }
        else if (fileUpload) {
          if ($.inArray(fileExtension, options.mediaFileTypes) > -1) {
            return "MediaPostContentType";
          }
          else {
            return "DocumentPostContentType";
          }
        }
        else if (linkOptionsAdded) {
          return "LinkPostContentType";
        }
        else {
          return "TextPostContentType";
        }
      },
      /*
      *  Passing data to wcf service inorder to add post
      */
      postData: function (dataObject, options) {
        var elem = $(this);
        elem.options = options;
        /*
        *  requesting service to add user post
        */
        var postServiceUrl = $("#" + $.makeUserPost.ids.asOrganizationOption).attr('checked') ? $.makeUserPost.paths.addOrganizationPost : $.makeUserPost.paths.addUserPost;
        var ajaxOpts = {
          url: postServiceUrl,
          data: $.toJSON(dataObject),
          success: function (data) {
            /*
            *  This will be called when user post is successfull
            */
            $.makeUserPost.methods.afterPost.call(elem, dataObject, options);
          }
        };
        $.xpoint.utils.ajaxCall(ajaxOpts);
      },
      /*This method will be called after user make post (post success) */
      afterPost: function (dataObject, options) {
        var elem = $(this);
        /*Add success message to the mainDiv*/
        var mainDiv = $("#" + $.makeUserPost.ids.containerDiv);
        if (dataObject.isMarkAsRead === true) { $(".preUpdatesContainer").xpointTemplates("refreshPreContainer", {}); }
        /*If user successfully posted */
        var successMainDiv;
        if ($("#" + $.makeUserPost.ids.successMainDiv).length == 0) {
          var successMain = $("<div />")
					                .attr('class', $.makeUserPost.classes.successMain)
													.appendTo(mainDiv.parent());
          successMainDiv = $("<div />")
				                     .attr('class', $.makeUserPost.classes.successMainDiv)
														 .attr('style', "z-index:10")
														 .attr('id', $.makeUserPost.ids.successMainDiv)
														 .appendTo(successMain);
          var successTextDiv = $("<div />")
				                     .attr('class', $.makeUserPost.classes.successTextDiv)
														 .attr('id', $.makeUserPost.ids.successTextDiv)
                             .appendTo(successMainDiv).fadeIn(2500).fadeOut(2500); ;
          var successText = $("<span />")
				                     .attr('id', $.makeUserPost.ids.successText)
														 .appendTo(successTextDiv)
														 .text('Your post is successful !');
        }
        else {
          $("#" + $.makeUserPost.ids.successMainDiv).fadeIn(2500).fadeOut(2500);
        }
        /*
        * Refreshing summary post
        */
        var summaryPostContainer = $("#" + $.postSummary.ids.summaryPostContainer);
        var opts = new Object();
        opts.postCount = 1;
        opts.page = 1;
        opts.needPage = false;
        $.postSummary.methods.getPostData.call(summaryPostContainer, opts);
        /*Refresh My Posts, this will help user to see the effect then and there when he was in My Posts section 
        * 
        */
        if ($.postTemplates) { summaryPostContainer.postTemplates("refreshData"); }
      },
      /*gets user entered url info */
      getUrlInfo: function (url) {
        var elem = $(this);
        var containerDiv = $("#" + $.makeUserPost.ids.containerDiv);
        var options = containerDiv.data().updateOptions;
        var newlyCreated = $("<div id='" + $.makeUserPost.ids.newlyCreated + "' />").append("<a href='" + url + "'></a>");
        newlyCreated.embedly({ maxWidth: 150,
          wmode: 'transparent',
          method: 'after',
          key: options.embedlyKey,
          success: function (oembed, dict) {
            /*If success remove error message */
            $.makeUserPost.methods.clearError();
            var item = oembed;
            elem.hideLoading();
            $.makeUserPost.methods.createLinkHtml.call(elem, item);
            var urlInputBox = $("#" + $.makeUserPost.ids.url);
            urlInputBox.attr("readonly", true);
          },
          error: function (oembed, error) {
            elem.hideLoading();
            /*Show unable to get url message */
            $.makeUserPost.methods.addError("Unable to retrieve url");
          }
        });
      },
      /*Saves link info fetched by embed ly plugin*/
      saveLinkInfo: function (linkInfo) {
        var item = linkInfo;
        var ajaxOpts = {
          url: $.makeUserPost.paths.saveLinkInfo,
          data: '{"uniqueId":' + item.UniqueID + '}',
          success: function (data) {
          }
        };
        $.xpointTemplates.methods.ajaxCall.call(ajaxOpts);
      },
      /*creates link preview html */
      createLinkHtml: function (linkInfo) {
        var elem = $(this);
        var jsonData = linkInfo;
        elem.data('linkInfo', linkInfo);
        /*
        * Adding url preview results to the urlPreview area
        */
        $("#" + $.makeUserPost.ids.urlPreview).removeClass($.makeUserPost.classes.displayNone);
        $("#" + $.makeUserPost.ids.urlTitle).text(jsonData.title);
        $("#" + $.makeUserPost.ids.urlDescription).text(jsonData.description);
        if (jsonData.thumbnail_url != null) {
          $("#" + $.makeUserPost.ids.thumbnailIconSrcDiv).removeClass($.makeUserPost.classes.displayNone);
          $("#" + $.makeUserPost.ids.thumbnailDefaultIcon).addClass($.makeUserPost.classes.displayNone);
          $("#" + $.makeUserPost.ids.urlIcon).attr('src', jsonData.thumbnail_url).attr('width', '89');
        }
        else {
          $("#" + $.makeUserPost.ids.thumbnailIconSrcDiv).addClass($.makeUserPost.classes.displayNone);
          $("#" + $.makeUserPost.ids.thumbnailDefaultIcon).removeClass($.makeUserPost.classes.displayNone);
        }
      },
      /*hides and clears error div */
      clearError: function () {
        var errorTextDiv = $("#" + $.makeUserPost.ids.errorTextDiv);
        $("#" + $.makeUserPost.ids.errorMainDiv).addClass($.makeUserPost.classes.displayNone);
        errorTextDiv.removeClass($.makeUserPost.classes.displayBlock);
        errorTextDiv.empty();
      },
      /*Adds error message*/
      addError: function (text) {
      	$("#" + $.makeUserPost.ids.errorMainDiv).removeClass($.makeUserPost.classes.displayNone);
      	$("#" + $.makeUserPost.ids.errorTextDiv).fadeIn(2500);
      	$("#" + $.makeUserPost.ids.errorTextDiv).text(text).fadeOut(2500);
      },
      /*
      *creating required html for user post 
      */
      createPostHtml: function (options) {
        var parent = $(this).empty();
        /*
        *  Adding Organization post options if current is sytemAdmin 
        */
        if (options.isAdmin === true) {
          var radioButtonContainer = $("<div id='" + $.makeUserPost.ids.radioButtonContainer + "' class='xp-FloatLeft xp-Width xp-PostBackground xp-CustomForm'></div>");
          var asUserOption = $("<div class='xp-FloatLeft' ><input type='radio' name='AdminOptions' class='Updates_Radiobutton' value= '" + $.makeUserPost.ids.asUserOption + "' id='" + $.makeUserPost.ids.asUserOption + "' checked ><label  for='" + $.makeUserPost.ids.asUserOption + "' class='xp-VerticalAlignMiddle Tip-HPForUser'>As User</label></option></div>");
          var asOrganizationOption = $("<div class='xp-FloatLeft'><input type='radio' name='AdminOptions' class='Updates_Radiobutton  ' value= '" + $.makeUserPost.ids.asOrganizationOption + "' id='" + $.makeUserPost.ids.asOrganizationOption + "'><label for='" + $.makeUserPost.ids.asOrganizationOption + "' class='xp-VerticalAlignMiddle xp-MarginLeft-5 Tip-HPForOrg'>For Organization</label></option></div>");
          var radioButtonMainDiv = $("<div id='" + $.makeUserPost.ids.radioButtonMainDiv + "'class='xp-FloatLeft xp-Padding-4 xp-Width98 '></div>")
					                         .appendTo(radioButtonContainer);
          asUserOption.appendTo(radioButtonMainDiv);
          asOrganizationOption.appendTo(radioButtonMainDiv);
          radioButtonContainer.appendTo(parent);
        }
        var fileLink = $("<a class='" + $.makeUserPost.classes.linkLabel + "' id='" + $.makeUserPost.ids.fileUpload + "' href='#'>File</a>");
        var urlLink = $("<a class='" + $.makeUserPost.classes.linkLabel + "' id='" + $.makeUserPost.ids.urlInputBox + "'  href='#'>Link</a>");
        var urlInputMainDiv = $("<div id='" + $.makeUserPost.ids.linkDiv + "'class='xp-FloatLeft xp-Width xp-DottedBorderBottom xp-DisplayNone '/>");
        var urlInputSubDiv = $("<div id='" + $.makeUserPost.ids.urlInputSubDiv + "'class='xp-FloatLeft xp-Width99' /> ");
        var urlInput = $("<div class='xp-FloatLeft xp-Width85'><textarea class='xp-Width xp-FloatLeft' id='" + $.makeUserPost.ids.url + "' ></textarea></div>");
        urlInput.appendTo(urlInputSubDiv);
        var urlLoading = $("<div id='" + $.makeUserPost.ids.urlLoading + "' class='xp-FloatLeft xp-Width80 xp-Padding-4 xp-TextAlignCenter xp-DisplayNone'><img  src='/_layouts/Images/XpointBase/indicator.gif' height='12' alt='Loading ...' title='Loading...' /></div>")
                            .appendTo(urlInputSubDiv);
        var urlPreviewArea = $("<div class=' xp-FloatLeft xp-Width xp-DisplayNone ' id='" + $.makeUserPost.ids.urlPreview + "'/>");
        var urlPreviewSubArea = $("<div class='xp-Width93 xp-Padding-10 xp-Margin-5 xp-FloatLeft xp-PostBackground xp-DisplayNone' id='" + $.makeUserPost.ids.urlThumbnailPreview + "'></div>");
        var urlIcon = $("<div class='xp-FloatLeft xp-Width40 xp-TextAlignCenter xp-Overflowhidden xp-DisplayNone' id='" + $.makeUserPost.ids.thumbnailIconSrcDiv + "'><img id='" + $.makeUserPost.ids.urlIcon + "'  alt='Sorry, NO Thumbnail to show' title='Url Thumbnail' /></div>")
                              .appendTo(urlPreviewSubArea);
        var urlDefaultIcon = $("<div id='" + $.makeUserPost.ids.thumbnailDefaultIcon + "' class='xp-FloatLeft xp-Width40  xp-IconNoUrl xp-Icon xp-DisplayNone' title='No Thumbnails available'></div>")
				                         .appendTo(urlPreviewSubArea);
        var urlTitleDescDiv = $("<div class='xp-FloatRight xp-Width58'></div>");
        var urlTitle = $("<div id='" + $.makeUserPost.ids.urlTitle + "' class='xp-FloatLeft xp-Width xp-FontBold xp-LinkLabel'></div>")
                              .appendTo(urlTitleDescDiv);
        var urlDescription = $("<div id='" + $.makeUserPost.ids.urlDescription + "' class='xp-FloatLeft xp-Width xp-PaddingTop-4 xp-FontLite'></div>")
                                  .appendTo(urlTitleDescDiv);
        urlTitleDescDiv.appendTo(urlPreviewSubArea);
        urlPreviewSubArea.appendTo(urlPreviewArea);
        var urlAcceptIcon = $("<div id='" + $.makeUserPost.ids.urlAcceptIcon + "' class='xp-FloatRight xp-IconLinkSubmit xp-Icon xp-HoverCursor '></div>")
				                     .insertAfter(urlInput);
        var urlDeleteIcon = $("<div id='" + $.makeUserPost.ids.urlDeleteIcon + "'class=' xp-FloatRight  xp-Icon xp-IconDelete xp-HoverCursor  '/>")
                             .insertAfter(urlInput);
        var urlShowThumbnailDiv = $("<div class='xp-FloatLeft xp-Width'/>");
        var urlShowThumbnail = $("<input type='checkbox' id='" + $.makeUserPost.ids.showThumbnailOption + "'>Show thumbnail</input>")
                                .appendTo(urlShowThumbnailDiv);
        urlShowThumbnailDiv.appendTo(urlPreviewArea);
        urlInputSubDiv.appendTo(urlInputMainDiv);
        urlPreviewArea.appendTo(urlInputMainDiv);
        var fileMainDiv = $("<div id='" + $.makeUserPost.ids.fileMainDiv + "'class='xp-FloatLeft xp-Width xp-DottedBorderBottom xp-DisplayNone'/>");
        var fileIcon = $("<div class='xp-FloatLeft xp-Width30 xp-Padding-4' ><img  width='42' id='" + $.makeUserPost.ids.fileIcon + "' alt='No Preview available' /></div>")
                              .appendTo(fileMainDiv);
        var fileNameDiv = $("<div id='" + $.makeUserPost.ids.fileNameID + "'class='xp-FloatLeft xp-Width-125 xp-Overflowhidden xp-Breakword xp-Padding-4 xp-LinkLabel' />")
                              .appendTo(fileMainDiv);
        var fileDeleteIcon = $("<div id='" + $.makeUserPost.ids.fileDeleteIcon + "'class= 'xp-FloatRight xp-Padding-4  xp-Icon xp-IconDelete xp-HoverCursor' />")
                                .appendTo(fileMainDiv);
        var buttonDiv = $("<div id='" + $.makeUserPost.ids.buttonDiv + "' class='xp-Width xp-FloatLeft xp-PostBackground'></div>");
        var postButton = $("<div class=' xp-FloatLeft'><button class='ui-primarytabclr ui-tabbuttonstyle ui-corner-all' id='" + $.makeUserPost.ids.postButton + "'>Post</button></div>")
				                                  .appendTo(buttonDiv);
        var cancelButton = $("<div class=' xp-FloatLeft'><button class='ui-secondarytabclr ui-tabbuttonstyle ui-corner-all' id='" + $.makeUserPost.ids.cancelButton + "'>Cancel</button></div>")
				                                  .appendTo(buttonDiv);
        var allUsers = $("<div class='xp-FloatRight ui-state-default xp-NoBackground xp-WidthIe33 xp-Width35 xp-PaddingTopIe-8 xp-LeftBorder' style='width:auto'><div class='xp-FloatLeft xp-Padding-2  xp-Icon  xp-IconAllUsers '></div><div class='xp-FloatLeft xp-Padding-4 xp-PaddingIe-2 xp-CharCounter'>All Users</div></div>");
        var counterDiv = $("<div id='" + $.makeUserPost.ids.counterDiv + "' class='" + $.makeUserPost.classes.counterDiv + "'>" + options.maxTextBoxCharCount + "</div>");
        var multilineTextBox = $("<div class='" + $.makeUserPost.classes.counterDivCss + "'><textarea style='margin:0;'  id='" + $.makeUserPost.ids.multilineInputBox + "' class='" + $.makeUserPost.classes.multilineCss + "'></textarea></div>");
        var subDiv = $("<div class='xp-FloatLeft xp-Width xp-PostBackground xp-DottedBorderBottom'><div class='xp-FloatLeft xp-Padding-4  xp-Icon-Highlight  xp-IconAddFile' /></div>");
        var linkFileText = $("<div id='" + $.makeUserPost.ids.linkFileText + "' class='" + $.makeUserPost.classes.linksCss + "'/>").appendTo(subDiv);
        var pollDiv = $("<div id='" + $.makeUserPost.ids.pollDiv + "'class='xp-Width xp-BorderBottom'></div>");
        var pollLink = $("<div id='" + $.makeUserPost.ids.pollLink + "'class='xp-FloatLeft xp-Width xp-PostBackground xp-TxtBox xp-BottomBorder'><div class='xp-FloatLeft xp-Padding-4  xp-Icon-Highlight  xp-IconAddPoll'></div><div class='xp-FloatLeft xp-Padding-4 '><a id='" + $.makeUserPost.ids.createPollLink + "'class='" + $.makeUserPost.classes.linkLabel + " Tip-HPAddPollOpts' href='#'>Add poll options</a></div></div>")
                      .appendTo(pollDiv);
        var pollRemoveLink = $("<div id='" + $.makeUserPost.ids.pollRemoveLink + "'class='xp-FloatLeft xp-Width xp-PostBackground  xp-DottedBorderBottom xp-DisplayNone'><div class='xp-FloatLeft xp-Padding-4  xp-Icon-Highlight  xp-IconAddPoll'></div><div class='xp-FloatLeft xp-Padding-4 '><a id='" + $.makeUserPost.ids.removePollLinkHref + "'class='xp.linkLabel' href='#'>Remove poll options</a></div></div>")
                      .appendTo(pollDiv);
        var pollOptionsContainer = $("<div id='" + $.makeUserPost.ids.pollOptionsContainer + "'class='xp-FloatLeft xp-Width '></div>");
        var pollOptionsDiv = $("<div id='" + $.makeUserPost.ids.pollOptionsDiv + "' ></div>")
                                .appendTo(pollOptionsContainer);
        pollOptionsContainer.appendTo(pollDiv);
        var selectOptionsDiv = $("<div id= '" + $.makeUserPost.ids.selectOptions + "'class='xp-FloatLeft xp-Width xp-PostBackground  xp-FontNormal  xp-TxtBox xp-BottomBorder xp-DisplayNone xp-CustomForm xp-PaddingBottom-8'></div>")
                                .append("<div class='xp-FloatLeft Tip-HPAllowMultiple xp-Breakword xp-FontSize9pt xp-PaddingRight-3 xp-AnswerChange '><input type='checkbox' id='" + $.makeUserPost.ids.allowMultipleOption + "' ></input><label for='" + $.makeUserPost.ids.allowMultipleOption + "' class='xp-VerticalAlignMiddle'>Allow Multiple Choices</label></div>")
                                .append("<div class='xp-FloatLeft Tip-HPAllowAnsChange  xp-Breakword xp-FontSize9pt xp-MultipleOption'><input type='checkbox' id='" + $.makeUserPost.ids.allowAnswerChange + "' ></input><label for='" + $.makeUserPost.ids.allowAnswerChange + "' class='xp-VerticalAlignMiddle'>Allow Answer Changes</label></div>")
                                .appendTo(pollDiv);
        var errorMainDiv = $("<div id='" + $.makeUserPost.ids.errorMainDiv + "' class= 'xp-FloatLeft xp-Width xp-DisplayNone'></div>");
        var errorTextDiv = $("<div id='" + $.makeUserPost.ids.errorTextDiv + "'class='xp-ErrorMsg'><span id='" + $.makeUserPost.ids.errorText + "'/></div>")
                                      .appendTo(errorMainDiv);
        var acknowledgeMainDiv = $("<div />")
				                        .attr('id', $.makeUserPost.ids.acknowledgeMainDiv)
																.attr('class', $.makeUserPost.classes.acknowledgeMainDiv);
        var acknowledgeIcon = $("<div />")
			                        .attr('id', $.makeUserPost.ids.acknowledgeIcon)
															.attr('class', $.makeUserPost.classes.acknowledgeIcon)
															.appendTo(acknowledgeMainDiv);
        var acknowledgeOption = $("<div />")
				                        .attr('id', $.makeUserPost.ids.acknowledgeOption)
																.attr('class', $.makeUserPost.classes.acknowledgeOption)
																.appendTo(acknowledgeMainDiv);
        var acknowledgeOptionUrl = $("<a>Add acknowledgement</a>")
			                           .attr('id', $.makeUserPost.ids.acknowledgeOptionUrl)
																 .attr('class', $.makeUserPost.classes.acknowledgeOptionUrl + " " + $.makeUserPost.classes.acknowledgeUrlTour)
																 .attr('href', '#')
																 .appendTo(acknowledgeOption)
																 .click(function (event) {
																   var elem = $(this);
																   if (elem.text() == "Add acknowledgement") {
																     isMarkAsRead = true;
																     elem.text("Remove acknowledgement");
																     elem.removeClass($.makeUserPost.classes.acknowledgeUrlTour);
																   }
																   else {
																     isMarkAsRead = false;
																     elem.text("Add acknowledgement");
																     elem.addClass($.makeUserPost.classes.acknowledgeUrlTour);
																   }
																   event.preventDefault();
																 });
        /* 
        * added to the container div in the order below
        */
        linkFileText.append(urlLink);
        linkFileText.append(" or ");
        linkFileText.append(fileLink);
        allUsers.appendTo(buttonDiv);
        multilineTextBox.appendTo(parent);
        counterDiv.insertBefore(multilineTextBox);
        fileMainDiv.appendTo(parent);
        urlInputMainDiv.appendTo(parent);
        subDiv.appendTo(parent);
        pollDiv.appendTo(parent);
        acknowledgeMainDiv.appendTo(parent);
        buttonDiv.appendTo(parent);
        errorMainDiv.appendTo(parent);
        parent.hide().fadeIn("slow");

        /* Adding character counting functionality for textarea*/
        var mainInputBox = $("#" + $.makeUserPost.ids.multilineInputBox).charCounter(options.maxTextBoxCharCount, { container: "#" + $.makeUserPost.ids.counterDiv, format: '%1', 'class': $.makeUserPost.classes.floatRight });
        var path;
        if ($("#" + $.makeUserPost.ids.asOrganizationOption)) {
          path = $("#" + $.makeUserPost.ids.asOrganizationOption).attr('checked') ? $.makeUserPost.paths.addOrganizationFile : $.makeUserPost.paths.addUserFile;
        }
        else {
          path = $.makeUserPost.paths.addUserFile;
        }
        mainInputBox.focus();
        /*
        * When user clicks on File link button 
        */
        var uploadObject = new AjaxUpload($("#" + $.makeUserPost.ids.fileUpload), {
          action: path,
          autoSubmit: false,
          name: 'uploadFile',
          onComplete: function (file, response) {
            /*
            * Checking the response after fileupload action
            */
            var status = response.status;
            $.makeUserPost.methods.afterPost.call(this, options);
          },
          /*
          * Validating the file among the accepted extensions or not 
          */
          onSubmit: function (file, ext) {
            $.makeUserPost.methods.determineMediaExtension(ext, options)
            var dataObject = $.makeUserPost.methods.getPostData(options);
            dataObject.fileIncluded = true;
            uploadObject.setData(dataObject);
            fileUpload = true;
            return fileUpload;
          },
          /*
          * When user selects a file,Show the filename in textbox
          */
          onChange: function (file, extension) {

            fileUpload = true;
            var elem = this;
            isValid = true;
            if (!$.makeUserPost.methods.validateFileUpload(extension, options)) {
              /*Show Invalid File Error Message*/
              isValid = false;
              $.makeUserPost.methods.addError("Sorry, this file type cannot be shared");
              fileUpload = false;
              return false;
            }
            /*If valid file remove error message */
            $.makeUserPost.methods.clearError();
            $('#' + $.makeUserPost.ids.fileNameID).text(file);
            $.xpoint.utils.getImageUrl(file, function (path) {
              $.makeUserPost.methods.applyFileIcon.call(elem, path);
              $("#" + $.makeUserPost.ids.fileMainDiv).removeClass($.makeUserPost.classes.displayNone);
            }, function (path) {
              $.makeUserPost.methods.applyFileIcon.call(elem, path);
              $("#" + $.makeUserPost.ids.fileMainDiv).removeClass($.makeUserPost.classes.displayNone);
            });
          }
        });
        /*
        * adding acknowledge options if user selects asOrganization radio button
        */
        $(".Updates_Radiobutton").live('change', function (e) {
          var selectedValue = $(this).val();
          if (selectedValue == "asOrganizationOption") {
            uploadObject._settings.action = $.makeUserPost.paths.addOrganizationFile;
            $("#" + $.makeUserPost.ids.acknowledgeMainDiv).removeClass($.makeUserPost.classes.displayNone);
          }
          else if (selectedValue == "asUserOption") {
            uploadObject._settings.action = $.makeUserPost.paths.addUserFile;
            $("#" + $.makeUserPost.ids.acknowledgeMainDiv).addClass($.makeUserPost.classes.displayNone);
          }
        });
        /*
        * When user clicks on remove link, calling removePoll method
        */
        $("#" + $.makeUserPost.ids.removePollLinkHref).click(function (event) {
          $.makeUserPost.methods.removePoll.apply(this, $.makeArray(options));
          event.preventDefault();
        });
        /*
        * Getting the url preview when user clicks on accept icon
        */
        $("#" + $.makeUserPost.ids.urlAcceptIcon).click(function (event) {
          $.makeUserPost.methods.processUrl();
          event.preventDefault();
        });
        /*
        * When user clicks on delete icon, we are  adding DisplayNone class to the main div  
        */
        $("#" + $.makeUserPost.ids.urlDeleteIcon).click(function (event) {
          /*Clearing error message */
          $.makeUserPost.methods.clearError();
          linkOptionsAdded = false;
          var url = $("#" + $.makeUserPost.ids.url);
          url.attr("readonly", false);
          url.val('');
          var waterMark = url.prev('.watermark');
          $(waterMark).show();
          $("#" + $.makeUserPost.ids.urlDescription).empty();
          $("#" + $.makeUserPost.ids.urlIcon).attr('src', '');
          $("#" + $.makeUserPost.ids.urlTitle).empty();
          $("#" + $.makeUserPost.ids.showThumbnailOption).attr('checked', false);
          $("#" + $.makeUserPost.ids.linkDiv)
          .addClass($.makeUserPost.classes.displayNone);
          $("#" + $.makeUserPost.ids.urlPreview).addClass($.makeUserPost.classes.displayNone);
          event.preventDefault();
        });
        /*
        * When user clicks on delete icon, we are adding DisplayNone class to the main div  
        */
        $("#" + $.makeUserPost.ids.fileDeleteIcon).click(function (event) {
          /*Show unable to get url message */
          $.makeUserPost.methods.clearError();
          $("#" + $.makeUserPost.ids.fileMainDiv).addClass($.makeUserPost.classes.displayNone);
          fileUpload = false;
          event.preventDefault();
          /*
          *This is special code. What it does is we need to reset the input file
          * object created by ajaxUpload so that if the same file is tried to be uploaded
          * it doesnt fail. file.val('') doesnt clear the file value and hence wrapped around a form 
          * unwrapped the input element
          */
          var files = $(":file");
          if (files.length > 0) {
            var fileInput = $(files.get(0));
            fileInput.wrap('<form>').closest('form').get(0).reset();
            fileInput.unwrap();
          }
        });
        /*
        * attaching click event for urlLink
        */
        $("#" + $.makeUserPost.ids.urlInputBox).click(function (event) {
          var elem = this;
          linkOptionsAdded = true;
          $("#" + $.makeUserPost.ids.linkDiv).removeClass($.makeUserPost.classes.displayNone);
          var urlTextArea = $("#" + $.makeUserPost.ids.url);
          if (urlTextArea.parent('span').length == 0) {
            var waterMarked = urlTextArea.watermark(options.urlWaterMarkText);
            waterMarked.blur();
          }
          event.preventDefault();
        });
        /*
        *  we are attaching click event for createPollLink .
        */
        $("#" + $.makeUserPost.ids.createPollLink).click(function (event) {
          var elem = this;
          $.makeUserPost.methods.processPollAddition.call(elem, options);
          event.preventDefault();
        });
        /*
        * Shows url if thumbnail option selected
        */
        $("#" + $.makeUserPost.ids.showThumbnailOption).change(function () {
          if ($(this).attr('checked') === true) {
            showThumbnail = true;
            $("#" + $.makeUserPost.ids.urlThumbnailPreview).removeClass($.makeUserPost.classes.displayNone);
          }
          else {
            showThumbnail = false;
            $("#" + $.makeUserPost.ids.urlThumbnailPreview).addClass($.makeUserPost.classes.displayNone);
          }
        });
        /*
        * on post button click event, processing the post
        */
        $("#" + $.makeUserPost.ids.postButton).click(function (event) {
          /* validating post */
          if ($.makeUserPost.methods.validatePost(options) === true) {
            $.makeUserPost.methods.clearError();
            /* Initiating the upload file */
            if (fileUpload === true) {
              uploadObject.submit();
            }
            else {
              /*
              * making user post 
              */
              var dataObject = $.makeUserPost.methods.getPostData.apply(this, $.makeArray(options));
              $.makeUserPost.methods.postData.call(this, dataObject, options);
            }
            var containerDiv = $("#" + $.makeUserPost.ids.containerDiv);
            $.makeUserPost.methods.createWaterMarkHtml.call(containerDiv, options);
            event.preventDefault();
          }
          event.preventDefault();
        });
        /*
        * When user clicks on cancel this will execute 
        */
        $("#" + $.makeUserPost.ids.cancelButton).click(function (event) {
          var containerDiv = $("#" + $.makeUserPost.ids.containerDiv);
          $.makeUserPost.methods.createWaterMarkHtml.call(containerDiv, options);
          event.preventDefault();
        });
      }
    }
  }
})(jQuery);
 

