var isloaded = false;
(function ($) {

  /*Thread Viewer -  Creates forum thread viewer based on Topic id  and forum type*/
  $.fn.threadViewer = function (options) {
    var defaults = {
      topicid: -1,
      forumtype: "",
      topicurl: "",
      posturl: "",
      addurl: "",
      editposturl: "",
      edittopicurl: "",
      highlightcss: "xp-PstNew",
      enableadd: true,
      deletetopicurl: "",
      page: 1,
      totalpages: 0,
      pagesize: 10
    };
    /*extend the options by overridding defaults*/
    var options = $.extend(defaults, options);
    /*Defines Structure of a post  
    /*1. Id :  id  either  Post Id or topic id 
    /*2. type : type is either "post" or "topic"
    /*3. html:  current html of the post 
    /*4. by: defines who is the owner or posted by user 
    /*5. ownerpic :  url of the pic of the owner user
    /*6. postdate : date on which post/topic was created
    /*7. allowedit:  enable edit button 
    /*8. allowreply : enable reply button 
    /*9.allowquote : enable quote button */
    function Post(id, type, html, by, ownerpic, postdate, allowedit, allowreply, allowquote, editdate) {
      this.id = id;
      this.type = type;
      this.html = html;
      this.by = by;
      this.ownerpic = ownerpic;
      this.postdate = postdate;
      this.allowedit = allowedit;
      this.allowreply = allowreply;
      this.allowquote = allowquote;
      this.editdate = editdate;
      this.BuildHtml = BuildHtml;
    }
    var baseid = $(this).attr('id');
    var ids = {
      topicheader: baseid + "_topictext",
      adddivid: baseid + "_addDiv",
      addinputid: baseid + "_addDivTextInput",
      topiccontainerid: baseid + "_TopicContainer",
      addbuttonid: baseid + "_addbuttonid",
      commentscontainerid: baseid + "_CommentsContainer",
      pagerDivId: baseid + "_pagerContainer",
      errorDivId: baseid + "_errorContainer",
      titleContainer: baseid + "_titleContainer"
    };
    function MakeRichtextBox(inputbox, content) {
      inputbox.RelayRichText();
      if (content) tinymce.get(inputbox.attr("id")).setContent(content);
    }
    function SaveRichtextbox() {
      tinyMCE.triggerSave();
    }
    function RemoveRichtextbox(inputbox) {
      inputbox.RemoveRichText();
    }
    function HighlightPost(inputdiv) {
      var allhighlighted = $("." + options.highlightcss);
      allhighlighted.removeClass(options.highlightcss);
      inputdiv.addClass(options.highlightcss);
    }
    function EditMode(inputdiv, btndiv, post, aurl) {
      $(".ps_editbtn", btndiv).removeClass("Tip-FMEditBtn");
      $(".ps_editbtn", btndiv).hide();
      $(".ps_replybtn", btndiv).removeClass("Tip-FMReplyBtn");
      $(".ps_replybtn", btndiv).hide();
      $(".ps_quotebtn", btndiv).removeClass("Tip-FMQuoteBtn");
      $(".ps_quotebtn", btndiv).hide();
      var currenthtml = inputdiv.html();
      inputdiv.html("");
      var textarea = $("<textarea  id='" + post.id + "_textarea' class='ps_inputtext xp-PstNewCommentBx'> </textarea>");
      textarea.append(currenthtml);
      inputdiv.append(textarea);
      MakeRichtextBox(textarea, currenthtml);
      var savebtn = $("<input type='button' class='xpThemeButton ps_savebtn ui-button  ui-corner-all' value='Save' />");
      btndiv.append(savebtn);
      savebtn.wrap("<div class='xp-FloatLeft'/>");
      var cancelbtn = $("<input type='button' class=' cancelButton ps_cancelbtn ui-button  ui-corner-all' value='Cancel' />");
      btndiv.append(cancelbtn);
      cancelbtn.wrap("<div class='xp-FloatLeft'/>");
      savebtn.click(function () {
        SaveRichtextbox();
        post.html = textarea.val();
        var pdata = { tpid: post.id, type: options.forumtype, html: textarea.val() };
        var gpost = { 'post': pdata };
        /*make Ajax call*/
        $.ajax({ url: aurl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: $.toJSON(gpost),
          success: function (datap, st) {
            var data = datap.d;
            if (data.status == "success") {
              var div = $($(".ps_editbtn", btndiv).parent().get(0));
              $(".ps_editbtn", btndiv).show();
              $(".ps_editbtn", btndiv).addClass("Tip-FMEditBtn");
              div.show();
              if (data.allowreply) {
                var div = $($(".ps_replybtn", btndiv).parent().get(0));
                $(".ps_replybtn", btndiv).show();
                $(".ps_replybtn", btndiv).addClass("Tip-FMReplyBtn");
                div.show();
              }
              if (data.allowquote) {
                var div = $($(".ps_quotebtn", btndiv).parent().get(0));
                $(".ps_quotebtn", btndiv).show();
                $(".ps_quotebtn", btndiv).addClass("Tip-FMQuoteBtn");
                div.show();
              }

              RemoveRichtextbox(textarea);
              inputdiv.html(post.html);
              HighlightPost(inputdiv);
              textarea.remove();
              var saveparent = $(savebtn.parent().get(0));
              saveparent.children().remove()
              saveparent.remove();
              var cancelparent = $(cancelbtn.parent().get(0));
              cancelparent.children().remove();
              cancelparent.remove();

            }
          },
          error: function (xhr, ajaxOptions, thrownError) {
          }
        });
        /*end of ajax call*/
      });
      cancelbtn.click(function () {
        var div = $($(".ps_editbtn", btndiv).parent().get(0));
        $(".ps_editbtn", btndiv).show();
        $(".ps_editbtn", btndiv).addClass("Tip-FMEditBtn");
        div.show();
        if (post.allowreply) {
          var div = $($(".ps_replybtn", btndiv).parent().get(0));
          $(".ps_replybtn", btndiv).show();
          $(".ps_replybtn", btndiv).addClass("Tip-FMReplyBtn");
          div.show();
        }
        if (post.allowquote) {
          var div = $($(".ps_quotebtn", btndiv).parent().get(0));
          $(".ps_quotebtn", btndiv).show();
          $(".ps_quotebtn", btndiv).addClass("Tip-FMQuoteBtn");
          div.show();
        }
        RemoveRichtextbox(textarea);
        post.html = currenthtml;
        inputdiv.html(currenthtml);
        textarea.remove();
        var saveparent = $(savebtn.parent().get(0));
        saveparent.children().remove()
        saveparent.remove();
        var cancelparent = $(cancelbtn.parent().get(0));
        cancelparent.children().remove();
        cancelparent.remove();
      });
    }

    /*build html for the given post object*/
    function BuildHtml(url, highlightdiv) {
      with (this) {
        var post = this;
        if (id > 0) {
          var div = $("<div id='" + baseid + "postdiv_" + id + "' class='xp-Width xp-PstSection'/>");
          /*create left side div*/
          var lefthtml = "<div class='xp-PstProfileBx xp-FontLite '><div class='xp-PstProfileBxHd xp-PstProfilePadding xp-FloatLeft'><div style='vertical-align: top;' class=' xp-FloatLeft xp-PstProfilePic'><img src='" + ownerpic + "'/></div></div>";
          div.append(lefthtml);
          /*create right side div*/
          var rightdiv = $("<div class='xp-PstText ui-widget xp-BodyLink xp-OuterPanel ui-corner-all '/>");
          var notch = $("<div class='notch'></div><div class='notch2'></div>");
          rightdiv.append(notch)
          var detailsDiv = $("<div class='xp-Width xp-FloatLeft xp-FontNormal xp-MarginBottom-10'>");
          if (editdate.length > 0 && editdate != postdate) {
            var lefthtml = "<div class=' xp-FloatLeft xp-Width40 xp-FontBold xp-FontSize11pt xp-padding-4'>" + by + "</div><div class=' xp-FloatRight xp-Width50 xp-FontLite xp-Padding-4'><div style='text-align:right' class=' xp-FloatRight xp-Width xp-FontSize8pt'>" + postdate + "</div><div style='text-align:right' class=' xp-FloatRight xp-Width xp-FontSize8pt'>Last Edit : " + editdate + "</div></div>";
            detailsDiv.append(lefthtml);
          }
          else {
            var lefthtml = "<div class=' xp-FloatLeft xp-Width40 xp-FontBold xp-FontSize11pt'>" + by + "</div><div class=' xp-FloatRight xp-Width50 xp-FontLite  xp-Padding-4'><div  style='text-align:right'  class=' xp-FloatRight xp-Width xp-FontSize8pt'>" + postdate + "</div></div>";
            detailsDiv.append(lefthtml);
          }
          detailsDiv.append("</div>");
          rightdiv.append(detailsDiv);
          var inputdiv = $("<div class='ps_input xp-FloatLeft xp-Width' />");
          var addhighlightdiv = $("<div class='ps_input xp-FloatLeft xp-Width' />");
          /*if need to highglight the input div*/
          if (highlightdiv) {
            HighlightPost(addhighlightdiv);
          }
          inputdiv.append(html);

          rightdiv.append(inputdiv);
          if (allowedit || allowreply || allowquote) {
            var btndiv = $("<div id='" + baseid + "_btncontainer' class='xp-PstSpacer '>");
            if (allowedit) {
              var editbtn = $("<input type='button' class='xpThemeButton ps_editbtn ui-button  ui-corner-all Tip-FMEditBtn' value='edit'>");
              btndiv.append(editbtn);
              editbtn.wrap("<div class='xp-FloatLeft'/>");
              editbtn.click(function () {
                EditMode(inputdiv, btndiv, post, url);
              });
            }
            if (allowreply) {
              var replybtn = $("<input type='button' class='xpThemeButton ps_replybtn ui-button  ui-corner-all Tip-FMReplyBtn' value='reply'/>");
              btndiv.append(replybtn);
              replybtn.wrap("<div class='xp-FloatLeft' style='padding-left:8px'/>");
              replybtn.click(function () {
                var addinput = $("#" + ids.addinputid);
                addinput.attr('tpid', id);
                var tiny = tinymce.get(ids.addinputid);
                tiny.setContent('');
                $('html, body').stop().animate({ scrollTop: 600000 }, 'slow');
                tiny.focus();
              });
            }
            if (allowquote) {
              var allowbtn = $("<input type='button' class='xpThemeButton ps_quotebtn ui-button  ui-corner-all Tip-FMQuoteBtn' value='quote'/>");
              btndiv.append(allowbtn);
              allowbtn.wrap("<div class='xp-FloatLeft' style='padding-left:8px'/>");
              allowbtn.click(function () {
                var addinput = $("#" + ids.addinputid);
                addinput.attr('tpid', id);
                var tiny = tinymce.get(ids.addinputid);
                tiny.setContent('');
                var htmlcontent = '<div class="xp-BgForumQuote" style="width:98%;word-wrap:break-word;display:block;padding:5px;">"' + html.replace("<p>", "").replace("</p>", " ") + '"</div><br/><br/>';
                ($.browser.msie) ? tiny.execCommand("mceInsertRawHTML", false, htmlcontent) : tiny.selection.setContent(htmlcontent);
                $('html, body').stop().animate({ scrollTop: 600000 }, 'slow');
                tiny.focus();
              });
            }
            addhighlightdiv.append(inputdiv);
            addhighlightdiv.append(btndiv);
            rightdiv.append(addhighlightdiv);
          }
          div.append(rightdiv);


          /*created third div - this is created for future updations... now its with emplty*/
          var lastdiv = $("<div class='xp-FloatRight' style='width:1%;background-color:transparent;padding-top:15px;height:20px;'/>");
          div.append(lastdiv);

          div.append("<div class='xp-FloatLeft xp-Width' style='height:14px;' />");
          return div;
        }
        else {
          return "";
        }
      }
    }
    function GetTopic(container) {
      var data = { tpid: options.topicid, type: options.forumtype };
      var post = { 'post': data };
      /*make Ajax call*/
      $.ajax({ url: options.topicurl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: $.toJSON(post),
        success: function (datap, st) {
          var data = datap.d;
          if (data.status == "success") {
            $("#" + ids.titleContainer).append(data.title);
            pt = new Post(data.id, data.type, data.html, data.by, data.ownerpic, data.postdate, data.allowedit, data.allowreply, data.allowquote, data.editdate);
            container.append(pt.BuildHtml(options.edittopicurl, false));
          }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
      });
      /*end of ajax call*/
    }

    /****************************************************/
    function GetComments(container) {
      var data = { tpid: options.topicid, type: options.forumtype, 'page': options.page, 'pagesize': options.pagesize };
      var post = { 'post': data };
      /*make Ajax call*/
      $.ajax({ url: options.posturl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: $.toJSON(post),
        success: function (datap, st) {
          var forumdata = datap.d;
          if ($(forumdata).length == 0) {
            $('#commentsheadertext').html("");
          }
          options.page = forumdata.page;
          options.totalpages = forumdata.totalpages;
          var data = forumdata.data;
          $.each(data, function (i) {
            if (data[i].status == "success") {
              pt = new Post(data[i].id, data[i].type, data[i].html, data[i].by, data[i].ownerpic, data[i].postdate, data[i].allowedit, data[i].allowreply, data[i].allowquote, data[i].editdate);
              container.append(pt.BuildHtml(options.editposturl, false));
            }
          });
          if (parseInt(options.totalpages) > parseInt(options.page)) {
            options.page = parseInt(options.page) + 1;
            GetComments(container);
          }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
      });
      /*end of ajax call*/
    }
    function MakeDeleteTopic() {
      $('.deletetopic').confirm({ confirmmessage: 'Are you sure you want to delete this forum discussion?', classname: 'deletetopic' });
    }

    return this.each(function () {

      if (!isloaded) {
        isloaded = true;
        var $this = $(this);
        $this.html("");
        $this.attr("class", "xp-Width xp-FloatLeft xp-MarginTop-10")
        //$this.append("<div class='xp-Width'>");
        var topicheadercontainer = $("<div id='" + ids.topicheader + "' class='xp-DivHeader ui-state-default xp-PstMnTopic xp-FloatLeft '  />");
        topicheadercontainer.append("<span id='" + ids.titleContainer + "' class='Tip-FMTopicItemHead xp-FloatLeft'></span>");
        $this.append(topicheadercontainer);

        if (options.deletetopicurl != "") {
          var deletediv = "<div class='xp-FloatRight' style='padding-right:4px;'>";
          deletediv += "<a href='" + options.deletetopicurl + "' class='xpThemeButton deletetopic Tip-FMDeletBtn ui-tabbuttonstyle xp-TabLink' style='font-weight:normal!important;color:#fff !important;'>delete</a></div>";
          topicheadercontainer.append(deletediv);
          MakeDeleteTopic();

        }
        $this.append("</div>");
        var topiccontainer = $("<div id='" + ids.topiccontainerid + "' class='xp-Width' />");
        $this.append(topiccontainer);
        GetTopic(topiccontainer);
        var commentscontainer = $("<div id='" + ids.commentscontainerid + "' class='xp-ClearBoth' />");
        commentscontainer.append("<div class='xp-PstTopic ui-state-default xp-DivHeader ui-widget' style='float:none;line-height:15px;font-weight:bold'><span id='commentsheadertext'>Comments</span></div>");
        $this.append(commentscontainer);
        GetComments(commentscontainer);
        $this.append("<div id='" + ids.pagerDivId + "'/>");
        var addcontainer;
        if (options.enableadd) {
          addcontainer = $("<div id='" + ids.adddivid + "' class='xp-ClearBoth' style='margin-top:20px'/>");
          $this.append(addcontainer);
          var errorDiv = $("<div class='xp-ErrorMsg' id='" + ids.errorDivId + "'>This topic is currently unavailable or permanently removed</div>").appendTo(addcontainer);
          errorDiv.hide();
          addcontainer.append("<div class='xp-PstTopic Tip-FMAddNewCmnt' style='float:none;line-height:15px;font-weight:bold;color:#202020'>Add New Comment</div>");
          var addCommentTxt = $("<textarea maxlength='50' id='" + ids.addinputid + "' class='xp-PstNewCommentBx xp-PstProfilePadding' ></textarea>");
          addcontainer.append(addCommentTxt);
          MakeRichtextBox(addCommentTxt);
          var btncontainer = $("<div class='xp-FloatLeft xp-Width55' style='margin:auto;' />");
          var cancelBtn = $("<input type='button'  value='Cancel' class='ui-button ui-secondarytabclr  ui-corner-all'/>");
          btncontainer.append(cancelBtn);
          cancelBtn.wrap("<div class='xp-FloatRight xp-Padding-10'/> ");
          addcontainer.append(btncontainer);
          addcontainer.append("<br/><br/><br/>");
          cancelBtn.click(function () {
            addCommentTxt.val("");
            tinymce.get(addCommentTxt.attr('id')).setContent('');
          });
          var addBtn = $("<input type='button' value='Add' id='" + ids.addbuttonid + "' tpid='-1' class='ui-button ui-primarytabclr ui-corner-all'/>");
          btncontainer.append(addBtn);
          addBtn.wrap("<div class='xp-FloatRight xp-Padding-10'/> ");
          addBtn.click(function () {
            SaveRichtextbox();
            var richtext = addCommentTxt.val();
            if ($.trim(richtext).length > 0) {
              addBtn.attr('disabled', 'disabled');
              $.relayloading("show");
              var data = { tpid: options.topicid, type: options.forumtype, html: addCommentTxt.val() };
              var post = { 'post': data };
              /*make Ajax call*/
              $.ajax({ url: options.addurl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: $.toJSON(post),
                success: function (datap, st) {
                  var data = datap.d;
                  if (data.status == "success") {
                    addCommentTxt.val("");
                    SaveRichtextbox();
                    pt = new Post(data.id, data.type, data.html, data.by, data.ownerpic, data.postdate, data.allowedit, data.allowreply, data.allowquote, data.editdate);
                    $('#commentsheadertext').html("Comments");
                    commentscontainer.append(pt.BuildHtml(options.editposturl, true));
                    tinymce.get(addCommentTxt.attr('id')).setContent('');
                  }
                  else {
                    errorDiv.show();
                  }
                  $.relayloading("hide");
                  addBtn.removeAttr('disabled');
                },
                error: function (xhr, ajaxOptions, thrownError) {
                  $.relayloading("hide");
                  addBtn.removeAttr('disabled');
                }
              });
              /*end of ajax call*/
            }
          });

        }
      }
    });

    /*end of return*/
  }

})(jQuery);