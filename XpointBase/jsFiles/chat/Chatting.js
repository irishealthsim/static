var windowFocus = true;
var username;
var ppAttached = false;
var chatboxFocus = new Array();
var newMessages = new Array();
var chatBoxes = new Array();
var convs = null;
var con = null;
var pollPing = 0;
var box = null;
var embox = null;
var firstTime = true;
var totalConvs = 0;
var activeConvs;
var step = 0;
var documenttitle = document.title;
var startChatTimer, conversationTimer;
var isActive;

window.onfocus = function () {
    isActive = true;
};

window.onblur = function () {
    isActive = false;
}; 

function CheckForLogin(loginNeeded) {
  if (loginNeeded == true) {
    $.ajaxSetup({
      beforeSend: function (call) {
        return false;
      }
    });
    if ($("#loginNeeded").length == 0) {
      var loginDiv = $("<div id='loginNeeded'/>")
                   .append("Session time out. Need to login again.")
                   .appendTo('body')
                   .dialog({
                     closeOnEscape: false,
                     open: function (event, ui) {
                       $(".ui-dialog-titlebar-close").hide();
                     },
                     modal: true,
                     buttons:
                      { "Click to login again": function () {
                        location.reload();
                      }
                      }
                   });
    }
  }

}
function StartChat() {

    if (pollPing == 0) {
        $.ajax({
            type: "POST",
            cache: false,
            url: "/_layouts/IImpact.Web/ChatService.asmx/Conversations",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
              var datap = data.d;
              if (datap) {
                convs = datap.Conversations;
                CheckForLogin(datap.NeedLogin);
              }
              conversationTimer = setTimeout('gotConvs()', 3);
            }

        });
    }

    pollPing++;
    if (pollPing > 3) {
        pollPing = 0;
    }
      startChatTimer = setTimeout('StartChat()', 500);

}

function processChatBoxes() {
    for (x in chatBoxes) {
        if (activeConvs[chatBoxes[x]] == false) {
            closeChatBox(chatBoxes[x]);
        }
    }
    for (x in newMessages) {
        if (newMessages[x] == true) {
            if (chatboxFocus[x] == false && !firstTime) {
                //FIXME: add toggle all or none policy, otherwise it looks funny
                $('#chatbox_' + x + ' .chatboxhead').toggleClass('chatboxblink');
                if (!isActive)
                    document.title = (document.title == '') ? documenttitle: '';
            }
            if (firstTime) {
                $('#chatbox_' + x + ' .chatboxhead').removeClass('chatboxblink');
                newMessages[x] = false;
            }
        }
    }
    if (isActive && document.title == '')
        document.title = documenttitle;
    firstTime = false;
}

function chatAudienceHtml(userinfo) {

    var html = "<div class = 'xp-VerticalAlignMiddle xp-Padding-2'>";
    $.each(userinfo.split('|'), function() {
        var user = $(this);
        if (user.length > 0) {
            var info = this.split('@');
            var imageurl = info[0];
            var username = info[1];
            html += "<div><img src='/_layouts/Images/XPointBase/" + imageurl + "'/>";
            html += "&nbsp;&nbsp;" + username + "</div>";
        }
    });
    html += "</div>";
    return html;
}

function gotConvs() {
  /*
  *if (totalConvs != 0) return; !important 
  * totalConvs - is total count of conversations which needs processing
  * need to restrict processing off the conversations 
  * if server is busy in taking care of previous requests
  * when gotConvs method will be called first time totalConvs will be zero
  * and hence processing will happen as  totalConvs = convs.length;
  * now in Complete  method of ajax call totalConvs will be decremented. This flow
  * will work fine till the last conversation is processed in the first Poll
  * Now if the server is slow and the conversations in first poll are not processed
  * within N seconds which configured in timer -need to wait for the processing of those conversations
  * to finish in which case totalConv will be become 0 and further poll processing 
  * will be allowed to happen 
  */
  if (totalConvs != 0) return;
    activeConvs = new Array();
    for (x in chatBoxes) {
        activeConvs[chatBoxes[x]] = false;
    }


    if (convs != null) {
        totalConvs = convs.length;
        if (totalConvs > 0) {
            $.each(convs, function(i, it) {
                var guid = it;
                activeConvs[guid] = true;
                var lastping = "";
                if ($("#chatboxping_" + guid).attr('lastping')) {
                    lastping = $("#chatboxping_" + guid).attr('lastping');
                }
                $.ajax({
                    type: "POST",
                    cache: false,
                    url: "/_layouts/IImpact.Web/ChatService.asmx/Conversation",
                    data: "{ 'guid':'" + guid + "' , 'when':'" + lastping + "' }",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    complete: function() {
                        totalConvs--;
                        if (totalConvs == 0)
                            processChatBoxes();
                    },
                    success: function(data) {

                        con = data.d;
                        if ($("#chatbox_" + con.ID).length <= 0 && con.ID != null) {
                            createChatBox(con.ID, con.roomName, con.IamInitiator, con.isPrivate);
                        }
                        else {
                            $('#chatbox_' + con.ID).css('display', 'block');
                            restructureChatBoxes();
                        }
                        var audiencecontainer = $("#chatbox_" + con.ID + " .chatboxaudience");
                        var audiencetext = audiencecontainer.data("audience");
                        if (audiencetext) {
                            //debugger;
                            if (con.audience && audiencetext != con.audience) {
                                var updatedhtml = chatAudienceHtml(con.audience);
                                audiencecontainer.html(updatedhtml);
                                audiencecontainer.data("audience", con.audience);
                            }
                        }
                        else {
                            if (con.audience != null) {

                                audiencecontainer.html(chatAudienceHtml(con.audience));
                                audiencecontainer.data("audience", con.audience);
                            }
                        }
                        if (con.isPrivate == 'true') {
                            if ($("#chatprivatespan_" + con.ID).val() != "(Private)") {
                                $("#chatprivatespan_" + con.ID).html("(Private)");
                            }
                        }
                        if (con != null && con.chats != null) {
                            if (con.chats.length > 0) {
                                $("#chatbox_" + con.ID + " .chatboxcontent").append(con.chats);
                                $("#chatbox_" + con.ID + " .chatboxcontent").scrollTop($("#chatbox_" + con.ID + " .chatboxcontent")[0].scrollHeight);
                                var datesplit = con.lastPing.split(' ');
                                var dt = datesplit[0].split('/');
                                var dttime = datesplit[1].split(':');
                                var dateObj = new Date(dt[2],dt[0]-1,dt[1],dttime[0],dttime[1],dttime[2]);
                                $("#chatboxping_" + con.ID).attr('lastping', con.lastPing).html(dateObj.format("mmm dd, yyyy h:MM")).append(datesplit[2]);
                                if (chatboxFocus[con.ID] == false) {
                                    newMessages[con.ID] = true;
                                }
                            }
                        }

                    }
                });
            });
        }
        else {
            processChatBoxes();
        }

    }
}

function GetWidth() {
    var x = 0;

    if (self.innerHeight) {
        x = self.innerWidth;
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
        x = document.documentElement.clientWidth;
    }
    else if (document.body) {
        x = document.body.clientWidth;
    }
    return x;
}

function GetHeight() {
    var y = 0;

    if (self.innerHeight) {
        y = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
        y = document.documentElement.clientHeight;
    }
    else if (document.body) {
        y = document.body.clientHeight;
    }
    return y;
}

function restructureChatBoxes() {
    align = 0;
    offset = 0;
    rowMinimized = 1;
    height = GetHeight() - 320;
    for (x in chatBoxes) {
        chatboxguid = chatBoxes[x];

        if ($("#chatbox_" + chatboxguid).css('display') != 'none') {
            if ($('#chatbox_' + chatboxguid + ' .chatboxinput').css('display') == 'none') {
                if (align == 0) {
                    $("#chatbox_" + chatboxguid).css('right', '20px');
                    $("#chatbox_" + chatboxguid).css('top', (height - offset + 280) + 'px');
                } else {
                    width = (align) * (225 + 7) + 20;
                    $("#chatbox_" + chatboxguid).css('right', width + 'px');
                    $("#chatbox_" + chatboxguid).css('top', (height - offset + 280) + 'px');

                }
                $("#chatbox_" + chatboxguid).css('bottom', offset + 'px');
            }
            else {
                rowMinimized = 0;
                if (align == 0) {
                    $("#chatbox_" + chatboxguid).css('right', '20px');
                    $("#chatbox_" + chatboxguid).css('top', (height - offset) + 'px');
                } else {
                    width = (align) * (225 + 7) + 20;
                    $("#chatbox_" + chatboxguid).css('right', width + 'px');
                    $("#chatbox_" + chatboxguid).css('top', (height - offset) + 'px');
                }
                $("#chatbox_" + chatboxguid).css('bottom', offset + 'px');
            }
            align++;
            if (((align + 1) * (225 + 7) + 20) > GetWidth() - 200) {
                align = 0;
                if (rowMinimized == 1) {
                    offset = offset + 350 - 280;
                }
                else {
                    offset = offset + 350;
                }
                rowMinimized = 1;
            }
        }
    }
}

function createChatBox(chatboxguid, chatboxtitle, isOwner, priv) {

    if ($("#chatbox_" + chatboxguid).length > 0) {
        /*
        * There is already a chatbox div eleemnt existingin the document. If its display mode is "none"
        * it means that it has been closed and so we are getting re-invitedto the chat. Just make it
        * visible and restructure all the visible boxes
        */
        if ($("#chatbox_" + chatboxguid).css('display') == 'none') {
            $("#chatbox_" + chatboxguid).css('display', 'block');
            restructureChatBoxes();
        }
        $("#chatbox_" + chatboxguid + " .chatboxtextarea").focus();
        return;
    }

    /*
    * Here we create a div for the new chat elements. Add everything inside this one div. All
    * elements inside the div have an id of the form idbasename_GUID where GUID is the chat
    * guid on the server. This means that everything that iscreated is unique and can referenced
    * independently
    */
    //    if (priv == "true") {
    //        chatboxtitle += "(Private)";
    //    }

    var minimized = $.cookie('chatbox_minimized'), display = 'block';
    if (minimized) {
        $.each(minimized.split('|'), function() {
            var guid = this;
            if (guid == chatboxguid) {
                display = 'none';
            }
        });
    }


    $(" <div />").attr("id", "chatbox_" + chatboxguid)
 .addClass("chatbox xp-OuterPanel")
 .html('<div class="chatboxhead"><div id="chattitle_' + chatboxguid + '" class="chatboxtitle xp-ChattingPadding">' + chatboxtitle + '<span id="chatprivatespan_' + chatboxguid + '" class="chatboxprivate"></span></div><div class="chatboxoptions" id="chatoptions_' + chatboxguid + '"><div class = "xp-FloatLeft xp-ChattingPadding"><a href="javascript:void(0)" onclick="javascript:invite(event,\'' + chatboxguid + '\')"  title="Invite" id="inv_' + chatboxguid + '"><img border="0" src="/_layouts/Images/XpointBase/Chat_invite.png" alt="Invite"/></a></div><div class = "xp-FloatLeft xp-ChattingPadding"><span class="xp-ChatMinimize" id="mini_' + chatboxguid + '">&nbsp;&nbsp;&nbsp;&nbsp;</span></div><div  class = "xp-FloatLeft xp-ChattingPadding"><a href="javascript:void(0)" onclick="javascript:closeChatBox(\'' + chatboxguid + '\')" title="Close"  id="close_' + chatboxguid + '"><img border="0" src="/_layouts/Images/XpointBase/Chat_close.png" alt="close" /></a></div></div><br clear="all"/></div><div class="chatboxaudience"></div><div class="chatboxcontent"></div><div class="chatboxlastmessage">Last message: <span id="chatboxping_' + chatboxguid + '"></span></div><div id="chatboxinput_' + chatboxguid + '" class="chatboxinput"><textarea id="textarea_' + chatboxguid + '"onkeydown="javascript:return checkChatBoxInputKey(event,this,\'' + chatboxguid + '\');" class="chatboxtextarea" ></textarea><span id="chatemoticon_' + chatboxguid + '"><a href="javascript:void(0)" onclick="javascript:emoticonPicker(event, \'' + chatboxguid + '\');" title="Insert Emoticons"  id="Emoticons_' + chatboxguid + '"><img border="0" src="/_Layouts/Images/XPointBase/ChatEmoticons/Happy/00000001.gif" alt="Emoticons" ></a></span></div>')
 .appendTo($("body"));
    /*
    * Add some call backs to the various elements in the div. typing characters (look for return)
    * Add handlers for Minimize and Close functions
    */
    $('#chatbox_' + chatboxguid + ' .chatboxcontent').css('display', display);
    $('#chatbox_' + chatboxguid + ' .chatboxinput').css('display', display);
    $('#chatbox_' + chatboxguid + ' .chatboxlastmessage').css('display', display);
    $('#chatbox_' + chatboxguid + ' .chatboxaudience').css('display', display);


    $("#textarea_" + chatboxguid).keydown(function(event) { checkChatBoxInputKey(event, this, chatboxguid); });
    $("#mini_" + chatboxguid).click(function() { toggleChatBoxGrowth(chatboxguid); });
    $("#close_" + chatboxguid).click(function() { closeChatBox(chatboxguid); });
    $("#inv_" + chatboxguid).click(function() { invite(chatboxguid); });
    $("#chatbox_" + chatboxguid).css('bottom', '0px');
    $("#Emoticons_" + chatboxguid).click(function() { emoticonPicker(event, chatboxguid); });
    if (isOwner == "true" && priv == "false") {
        $("#chatoptions_" + chatboxguid).prepend('<div class = "xp-FloatLeft xp-ChattingPadding"><a href="javascript:void(0)" onclick="javascript:makePrivate(\'' + chatboxguid + '\')"  title="Private" id="private_' + chatboxguid + '"><img border="0" src="/_layouts/Images/XpointBase/Chat_private.png" alt="private"/></a></div>');
        $("#private_" + chatboxguid).click(function () { makePrivate(chatboxguid); });
    }
    chatBoxeslength = 0;

    // Count the number of visible chats
    for (x in chatBoxes) {
        if ($("#chatbox_" + chatBoxes[x]).css('display') != 'none') {
            chatBoxeslength++
        }
    }
    // Calculate position of this chatbox relative to how many others are visible
    if (chatBoxeslength == 0) {
        $("#chatbox_" + chatboxguid).css('right', '20px');
    } else {
        width = (chatBoxeslength) * (225 + 7) + 20;
        $("#chatbox_" + chatboxguid).css('right', width + 'px');
    }

    // THis array holds a list of all chatbox GUIDs that are part of the document
    chatBoxes.push(chatboxguid);

    // New chat box doesn't have the focus
    chatboxFocus[chatboxguid] = false;

    //Add function call back for when chatbox losses the focus. Must remove the 'selected' display class
    // Add function for when the chat gets the focus. Add a selected display class, cancel any highligh for new message notification
    $("#chatbox_" + chatboxguid + " .chatboxtextarea").blur(function() {
        chatboxFocus[chatboxguid] = false;
        $("#chatbox_" + chatboxguid + " .chatboxtextarea").removeClass('chatboxtextareaselected');
    }).focus(function() {
        chatboxFocus[chatboxguid] = true;
        newMessages[chatboxguid] = false;
        $('#chatbox_' + chatboxguid + ' .chatboxhead').removeClass('chatboxblink');
        $("#chatbox_" + chatboxguid + " .chatboxtextarea").addClass('chatboxtextareaselected');
    });

    // ON a click move the focus to the input text area, provided the chat box is visible
    $("#chatbox_" + chatboxguid).click(function() {
        if ($('#chatbox_' + chatboxguid + ' .chatboxcontent').css('display') != 'none') {
            $("#chatbox_" + chatboxguid + " .chatboxtextarea").focus();
        }
    });

    // Draw the chat box and position it relative to the others
    $("#chatbox_" + chatboxguid).show();
    restructureChatBoxes();

}
function makePrivate(chatboxguid) {
    $.post("/_layouts/IImpact.Web/ChatService.asmx/MakePrivate", { 'guid': chatboxguid }, function(data) { }, 'json');
    if ($("#private_" + chatboxguid).is(':visible')) {
        $("#private_" + chatboxguid).hide();
        $("#chatprivatespan_" + chatboxguid).html("(Private)");
    }
}


function emoticonPicker(event, guid) {
    if (!event) {
        event = window.event;
    }
    var posx = 0;
    var posy = 0;

    if (event.pageX || event.pageY) {
        posx = event.pageX;
        posy = event.pageY;
    }
    else if (event.clientX || event.clientY) {
        posx = event.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
        posy = event.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
    }
    posX = posx - 230;
    posY = posy - 150;

    if (box != null) {
        box.unload();
        box = null;
    }

    if (embox == null) {
        embox = new Boxy('<input type="hidden" id="emoticonGUID"/><table id=emtable style=font-size:3px></table>', { title: "Emoticons" });
        var tds;
        var idx;
        var dirs = ["Happy", "Rage", "SadConfused", "Mood"];
        var dir;
        for (x in dirs) {
            dir = dirs[x];
            tds = "";
            for (idx = 1; idx < 7; idx++) {
                tds += '<td><a href="javascript:void(0)" onclick="javascript:emoticonInsert(\'' + dir + '\',\'' + idx + '\')" title="Insert"  id="Emoticons_' + dir + idx + '"><img border="0" src="_layouts/Images/XPointBase/ChatEmoticons/' + dir + '/0000000' + idx + '.gif" alt="Emoticon" ></a></td>';
            }

            tds = '<tr>' + tds + '</tr>';
            $("#emtable").append(tds);
            $("#Emoticons_" + dir + "1").click(function() { emoticonInsert(dir, 1); });
            $("#Emoticons_" + dir + "2").click(function() { emoticonInsert(dir, 2); });
            $("#Emoticons_" + dir + "3").click(function() { emoticonInsert(dir, 3); });
            $("#Emoticons_" + dir + "4").click(function() { emoticonInsert(dir, 4); });
            $("#Emoticons_" + dir + "5").click(function() { emoticonInsert(dir, 5); });
            $("#Emoticons_" + dir + "6").click(function() { emoticonInsert(dir, 6); });
            $("#Emoticons_" + dir + "7").click(function() { emoticonInsert(dir, 7); });
            $("#Emoticons_" + dir + "8").click(function() { emoticonInsert(dir, 8); });
            $("#Emoticons_" + dir + "9").click(function() { emoticonInsert(dir, 9); });

        }

    }

    updateEmbox(guid);

}

function emoticonInsert(dir, idx) {
    var guid;
    if (embox != null) {
        guid = $("#emoticonGUID").val();
        $("#textarea_" + guid).val($("#textarea_" + guid).val() + ":" + dir.toString().toLowerCase() + "0" + idx);
        $("#chatbox_" + guid + " .chatboxtextarea").focus();
        embox.unload();
        embox = null;
    }
}

function inviteClicked() {
    if (box != null) {
        var person = $("#picker").val();
        var valid = $("#picker").validatepp({ loginname: person })[0].validate;
        if (valid) {
            var guid = $("#guidCache").val();
            $.post("/_layouts/IImpact.Web/ChatService.asmx/InviteUser", { 'guid': guid, 'user': person }, function(data) {

            });
            box.unload();
            box = null;
            ppAttached = false;
            $("#picker").trigger("resetpp");
        }
    }
    return false;
}

function invite(event, guid) {
    var posx = 0;
    var posy = 0;
    if (!event) {
        event = window.event;
    }
    if (event.pageX || event.pageY) {
        posx = event.pageX;
        posy = event.pageY;
    }
    else if (event.clientX || event.clientY) {
        posx = event.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
        posy = event.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
    }
    posX = posx - 180;
    posY = posy;

    if (embox != null) {
        embox.unload();
        embox = null;
    }

    if (box == null) {
        var peoplepickerdiv;
        $.ajax({
            type: "POST",
            cache: false,
            url: "/_layouts/IImpact.Web/ChatService.asmx/GetPeoplePicker",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function(data) {
                if (data != null) {

                    peoplepickerdiv = data.d;
                    box = new Boxy(peoplepickerdiv, { title: "Invite to chat" });

                }

            }
        });
    }
    else {
        $("#picker").trigger("resetpp");

    }
    UpdateBoxy(guid);
}

function updateEmbox(guid) {
    embox.moveTo(posX, posY);
    embox.show();
    $("#emoticonGUID").val(guid);
}
function UpdateBoxy(guid) {
    if (guid != null) {
        box.moveTo(posX, posY);
        box.show();
        $("#guidCache").val(guid);
        $("#inviteButton").click(inviteClicked);
        if (ppAttached == false) {
            $("#picker").peoplepicker({
                hoverprofile: false,
                width: 200,
                searchurl: '/_layouts/IImpact.Web/ChatService.asmx/SearchUsers'
            });
            ppAttached = true;
        }
        else {

        }
    }
}

function removeArrItems(arr, itemsToRemove) {
  if (null == itemsToRemove) {
    return;
  }
  if (!/Array/.test(itemsToRemove.constructor)) {
    itemsToRemove = [itemsToRemove];
  }
  var j;
  for (var i = 0; i < itemsToRemove.length; i++) {
    j = 0;
    while (j < arr.length) {
      if (arr[j] == itemsToRemove[i]) {
        arr.splice(j, 1);
      } else {
        j++;
      }
    }
  }
}
function closeChatBox(chatboxguid) {
  // Verify that this chat box hasn't already been closed. A closed chat box will have a display type of 'none'
  if ($("#chatbox_" + chatboxguid).css('display') != 'none') {
    // Make it invisible and scrunch up the other boxes
    $('#chatbox_' + chatboxguid).css('display', 'none');
    restructureChatBoxes();
    // Tell the server we are leaving this chat
    $.post("/_layouts/IImpact.Web/ChatService.asmx/CloseConversation", { 'guid': chatboxguid }, function (data) {
      if ($("#chatbox_" + chatboxguid)) {
        $("#chatbox_" + chatboxguid).remove();
      }
      removeArrItems(chatBoxes, chatboxguid);
    }, 'json');
    if (box != null) {
      // If the chat we are closing has an open invite box or emoticon box close them
      if ($("#guidCache").val() == chatboxguid) {
        box.unload();
        box = null;
      }
      if ($("#emoticonGUID").val() == chatboxguid) {
        embox.hide();
      }
    }
  }
}
function toggleChatBoxGrowth(chatboxguid) {
    /*toggle the maximize/minimize image*/
    $('#mini_' + chatboxguid).toggleClass("xp-ChatMinimize");
    $('#mini_' + chatboxguid).toggleClass("xp-ChatMaximize");
    if ($('#chatbox_' + chatboxguid + ' .chatboxcontent').css('display') == 'none') {

        var minimizedChatBoxes = new Array();

        if ($.cookie('chatbox_minimized')) {
            minimizedChatBoxes = $.cookie('chatbox_minimized').split(/\|/);
        }

        var newCookie = '';

        for (i = 0; i < minimizedChatBoxes.length; i++) {
            if (minimizedChatBoxes[i] != chatboxguid) {
                newCookie += chatboxguid + '|';
            }
        }
        newCookie = newCookie.slice(0, -1);

        $.cookie('chatbox_minimized', newCookie);
        // Make all chat div elements visible
        $('#chatbox_' + chatboxguid + ' .chatboxcontent').css('display', 'block');
        $('#chatbox_' + chatboxguid + ' .chatboxinput').css('display', 'block');
        $('#chatbox_' + chatboxguid + ' .chatboxaudience').css('display', 'block');
        $('#chatbox_' + chatboxguid + ' .chatboxlastmessage').css('display', 'block');
        // Scroll to the last message
        $("#chatbox_" + chatboxguid + " .chatboxcontent").scrollTop($("#chatbox_" + chatboxguid + " .chatboxcontent")[0].scrollHeight);
    }
    else {

        var newCookie = chatboxguid;

        if ($.cookie('chatbox_minimized')) {
            newCookie += '|' + $.cookie('chatbox_minimized');
        }
        $.cookie('chatbox_minimized', newCookie);
        // Make all chat div eleemnts invisble apart from the header
        $('#chatbox_' + chatboxguid + ' .chatboxcontent').css('display', 'none');
        $('#chatbox_' + chatboxguid + ' .chatboxinput').css('display', 'none');
        $('#chatbox_' + chatboxguid + ' .chatboxlastmessage').css('display', 'none');
        $('#chatbox_' + chatboxguid + ' .chatboxaudience').css('display', 'none');
        if (box != null) {
            if ($("#guidCache").val() == chatboxguid) {
                box.unload();
                box = null;
            }
        }
    }
    restructureChatBoxes();

}

function checkChatBoxInputKey(event, chatboxtextarea, chatboxguid) {
    if (!event) {
        event = window.event;
    }
    if (event.keyCode == 13 && event.shiftKey == 0) {
        message = $(chatboxtextarea).val();
        message = message.replace(/^\s+|\s+$/g, "");

        $(chatboxtextarea).val('');
        $(chatboxtextarea).focus();
        $(chatboxtextarea).css('height', '35px');
        if (message != '') {
            $.post("/_layouts/IImpact.Web/ChatService.asmx/AddChat", { 'guid': chatboxguid, 'chatText': message }, function(data) {
                message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
            }, "json");
        }
        return false;
    }

    var adjustedHeight = chatboxtextarea.clientHeight;
    var maxHeight = 35;

    if (maxHeight > adjustedHeight) {
        adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);
        if (maxHeight)
            adjustedHeight = Math.min(maxHeight, adjustedHeight);
        if (adjustedHeight > chatboxtextarea.clientHeight)
            $(chatboxtextarea).css('height', adjustedHeight + 8 + 'px');
    } else {
        $(chatboxtextarea).css('overflow', 'auto');
    }

}

function startChatSession(userlist, room) {

    $.ajax({
        type: "POST",
        cache: false,
        url: "/_layouts/IImpact.Web/ChatService.asmx/StartNewChat",
        data: "users=" + userlist + "&roomName=" + room,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Content-Length", "users=" + userlist + "&roomName=" + room.length);

        },
        dataType: "json",
        ContentType: "application/json; charset=utf-8",
        complete: function(xhr, msg) {

            if (xhr.status == 200) {
            }
            else {
                alert(xhr.responseText);
            }
        }
    });


}

/**
* Cookie plugin
*
* Copyright (c) 2006 Klaus Hartl (stilbuero.de)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/

jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
