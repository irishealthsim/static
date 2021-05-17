/*This file consists of various extensions related to jquery being used in IIMpact
/*Platform 
/*Author : Anirudh*/
; (function ($) {

  /*this is extension for people picker people picker will be applied on input type = text or 
  /* Asp.net textbox control depending upon*/
  /*Configuration :  
  /* direction: this will be by default bottom but can be top/bottom [ this means the direction in which result will be shown]*/
  /* searchurl: this will be url of the webservice from the which the result needs to be fetched*/
  /* css: this is the class of the divs of one result item*/
  /*altcss: this is the class of the divs of alertnative result item*/
  /*chatenabled: if the result would be clickable text to initiate chat*/
  $.fn.peoplepicker = function (options) {
    /*set the defaults for this plugin*/
    var defaults = {
      direction: "bottom",
      searchurl: "/_layouts/IImpact.Web/ChatService.asmx/SearchUsers",
      groupUsersUrl: "/_vti_bin/XPointBase/ProfileService.svc/GroupUsers",
      css: "",
      altcss: "",
      chatenabled: false,
      multiple: false,
      isMultiEntry: false,
      resultcontainer: $(this).attr('id') + "ppResultCont",
      onsubmitpopulate: false,
      selectcontainerid: "",
      prePopulate: {},
      multivalued: false,
      direction: "bottom",
      inputlimit: -1,
      needformat: false,
      left: 4,
      width: 250
    };
    var options = $.extend(defaults, options);
    if (!options.multiple) {
      options.inputlimit = 1;
    }
    function formatItem(row) {
      var onlinepicurl = "";
      switch (row.OnlineStatus.toLowerCase()) {
        case "active":
          onlinepicurl = " xp-IconOnline xp-Icon-Highlight ";
          break;
        case "inactive":
        case "offline":
          onlinepicurl = " xp-IconOffline xp-Icon-Highlight ";
          break;
      }
      var html = "<div style='height:36px;padding-bottom:0px;' class='xp-Width '>";
      html += "<div class='xp-FloatLeft' style='width:16%;padding-top:2px'><img src='" + row.ImageUrl + "' style='width:30px;height:35px' />";
      html += "</div>";
      html += "<div class='xp-FloatLeft' style='width:74%;padding-left:2px;'>";
      html += "<div style='width:99%;' class='xp-FontNormal'>";
      html += row.Name;
      html += "</div>";
      html += "<div style='width:99%;font-size:10px;line-height:12px;' class='xp-FontLite'>";
      html += row.Department + "," + row.Function;
      html += "</div>";
      html += "<div style='width:99%;;font-size:10px;line-height:12px;' class='xp-FontLite'>";
      html += row.Geography;
      html += "</div>";
      html += "</div>";
      html += "<div class='xp-FloatLeft' style='width:6%;padding-left:2px;'	 <div class='" + onlinepicurl + "  xp-DisplayNone' ></div>";
      html += "</div>";
      html += "</div>";
      return html;
    }
    function formatResult(row) {
      return row.replace(/(<.+?>)/gi, '');
    }
    /*extend options */
    options = $.extend(defaults, options);
    options.isMultiEntry = options.multiple;
    if (options.multivalued != null) {
      options.multiple = options.multivalued;
    }
    $(this).val("");
   // var prm = Sys.WebForms.PageRequestManager.getInstance();
   // if (!prm.get_isInAsyncPostBack()) {
      return this.each(function () {
        if (options.needformat) {
          var users = {};
          if (options.prePopulate != "") {
            $.each(options.prePopulate.split(","), function (i) {
              var currentval = this;
              if (currentval != null && $.trim(currentval).length != 0) {
                var id = currentval.split("!")[0];
                var value = currentval.split("!")[1];
                if (id != null && value != null) {
                  users[i] = { "id": id, "name": value };
                  i++;
                }
              }
            });
          }
          options.prePopulate = users;
        }
        if (options.chatenabled) {
          options.direction = "top";
          options.formatItem = formatItem;
          options.formatResult = formatResult;

          $(this).autocomplete(options.searchurl, options);
        }
        else {
          $(this).val();
          var $elem = $(this).tokenInput(options.searchurl, {
            prePopulate: options.prePopulate, inputlimit: options.inputlimit, chatenabled: options.chatenabled, width: options.width, isMultiEntry: options.isMultiEntry, groupUsersUrl: options.groupUsersUrl
          });
        }
      });
   // }
  };

  /*This extension will work only for a Href will the value of text of the a href and will do the profile call
  /* and prepare the callout */
  $.fn.viewProfile = function (options) {
    var defaults = {
      getprofileurl: "",
      username: "",
      parentcontainer: "",
      containerid: "Popupviewprofile",
      profile: null
    };
    options = $.extend(defaults, options);
    var parent = $(this);
    var $container;
    var $bodycontainer;
    var hovered = false;
    function createContainer() {
      /*create only if it already doesnt exists*/
      if ($("#" + options.containerid).length == 0) {
        $container = $("<div id='" + options.containerid + "'  style='z-index:9999899;' />");
        //$container.addClass('ui-widget'); /*required to attach the theme framework for outerpanel*/
        // $container.addClass('ui-corner-all'); /*required to attach the theme framework for corners*/
        $container.addClass('xp-DivBorder');
        /*create body container*/
        $bodycontainer = $("<div id='" + options.containerid + "body' />");
        //$bodycontainer.addClass('ui-widget-content'); /*required to attach the theme framework*/

        $container.append($bodycontainer);
        $container.css("position", "absolute");
        $container.hide();
        currentparent = $(parent).parents().get(0);
        $('body').append($container);
      }
      else {
        $bodycontainer = $("'#" + options.containerid + "body'");
        $container = $("'#" + options.containerid + "'");

      }
    }
    function hideContainer() {
      if ($container != null && $container.length > 0) {
        $container.fadeOut();
      }
    }
    /*shows the result container*/
    function showContainer() {
      if ($container != null && $container.length > 0) {
        $container.fadeIn();
      }
    }
    /*this will clear the html in result container*/
    function clearContainer() {
      if ($container != null && $container.length > 0) {
        $container.remove();

      }
    };
    /*this function will fix the coordinates according to the position of the link being hovered*/
    function fixContCords(e) {
      xOffset = 120;
      yOffset = -20;
      if ($container != null && $container.length > 0) {
        var top, left;
        var parentoffset = parent.offset();
        top = parentoffset.top - ($container.outerHeight() / 2);
        left = parentoffset.left + parent.width() + 20;

        $container.css("top", (e.pageY - xOffset) + "px")
			.css("left", (e.pageX + yOffset) + "px");

      }
    }
    function replaceBackSlash(arg) {

      var pat = /\\/gim;
      var match = pat.exec(arg);

      return arg.replace(pat, '\\\\');
    }
    function onHover(e) {
      hovered = true;
      parent.addClass('');
      var profile = options.profile;
      var comma = " , ";
      if (profile == null) {
        $.ajax({ mode: "abort",
          // limit abortion to this input
          port: "viewprofilecomplete" + options.username, url: options.getprofileurl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{username:'" + replaceBackSlash(options.username) + "'}",
          success: function (datap, st) {
            var data = datap.d;
            if (data != null) {
              clearContainer();
              createContainer();
              var onlinepicurl = "";
              switch (data.OnlineStatus.toLowerCase()) {
                case "active":
                  onlinepicurl = " xp-IconOnline xp-Icon-Highlight ";
                  break;
                case "inactive":
                case "offline":
                  onlinepicurl = " xp-IconOffline xp-Icon-Highlight ";
                  break;
              }
              /*Structure Modified by Arif*/

              if (data.Function == "" || data.Department == "") {
                comma = "";
              }
              var html = "<div style='postion:relative;display:block'>";
              html += "<img src='/_layouts/Images/XPointBase/border_Design.png' />";
              html += "<table border='0' cellspacing=0 cellpadding=0 style='position:relative;margin:0px 4px 4px 8px;'>";
              html += "<tr><td rowspan='4' valign='top' style='padding-top:4px;' ><div  class='" + onlinepicurl + " xp-DisplayNone' ></div></td><td class='xp-FontBold' style='color:#FFFFFF;font-size:12pt;padding:0px 4px 8px 4px;position:relative;top:0px;vertical-align:top!important;'> " + data.Name + "</td><td rowspan='3' valign='middle' align='center'> <img src='" + data.ImageUrl + "' width='70px' height='75px' class='pngddd' /> </td></tr>";
              html += "<tr><td  class='xp-Font' style='padding:0px 4px 0px 4px;'>" + data.Function + comma + data.Department + "</td></tr>";
              html += "<tr><td  class='xp-Font' style='padding:0px 0px 8px 4px' valign='top'>" + data.Geography + "</td></tr>";
              html += "<tr><td colspan='2' class='xp-Font' >" + data.Email + "</td></tr>";
              html += "</table>";
              html += "</div>";


              if (hovered && $bodycontainer != null) {
                $bodycontainer.html(html);
                showContainer();
                fixContCords(e);
              }
            }
          },
          error: function (xhr, ajaxOptions, thrownError) {
          }
        });
      }
      else {
        clearContainer();
        createContainer();
        parent.addClass('ui-state-hover');
        var onlinepicurl = "";
        switch (profile.OnlineStatus.toLowerCase()) {
          case "active":
            onlinepicurl = " xp-IconOnline xp-Icon-Highlight ";
            break;
          case "inactive":
          case "offline":
            onlinepicurl = " xp-IconOffline xp-Icon-Highlight ";
            break;
        }
        /*Structure Modified by Arif*/
        if (profile.Function == "" || profile.Department == "") {
          comma = "";
        }
        var html = "<div>";
        html += "<img src='/_layouts/Images/XPointBase/border_Design.png' />";
        html += "<table border='0' cellspacing=0 cellpadding=0 style='position:relative;margin:0px 4px 4px 8px;'>";
        html += "<tr><td rowspan='4' valign='top' style='padding-top:4px;'><div class='" + onlinepicurl + " xp-DisplayNone' ></div></td><td class='xp-FontBold' style='color:#FFFFFF;font-size:12pt;padding:0px 4px 8px 4px;position:relative;top:0px;vertical-align:top!important;'> " + profile.Name + "</td><td rowspan='3' valign='middle' align='center'> <img src='" + profile.ImageUrl + "' width='70px' height='75px' class='pngddd' /> </td></tr>";
        html += "<tr><td  class='xp-Font' style='color:#FFFFFF;padding:0px 4px 0px 4px;'>" + profile.Function + comma + profile.Department + "</td></tr>";
        html += "<tr><td  class='xp-Font' style='color:#FFFFFF;padding:0px 0px 8px 4px' valign='top'>" + profile.Geography + "</td></tr>";
        html += "<tr><td colspan='2' class='xp-Font' style='color:#FFFFFF'>" + profile.Email + "</td></tr>";
        html += "</table>";
        html += "</div>";

        if (hovered && $bodycontainer != null) {
          $bodycontainer.html(html);
          showContainer();
          fixContCords(e);
        }
      }
    }

    function outHover() {
      hovered = false;
      parent.removeClass('ui-state-hover');
      clearContainer();
    }
    return this.each(function () {
      /*check if the parent is a href or not*/

      parent.hover(onHover, outHover);

    });
  }


  $.fn.tokenInput = function (url, options) {
    var settings = $.extend({
      url: url,
      hintText: "Find user here",
      noResultsText: "No results",
      searchingText: "Searching...",
      searchDelay: 300,
      minChars: 1,
      tokenLimit: null,
      jsonContainer: null,
      method: "GET",
      contentType: "json",
      queryParam: "q",
      inputlimit: -1,
      onResult: null,
      hasfocus: false,
      width: 250,
      scrollheight: 169,
      showhint: false
    }, options);

    if (settings.inputlimit != -1) {
      settings.tokenLimit = settings.inputlimit;
    }
    settings.classes = $.extend({
      tokenList: "token-input-list xp-TxtBox",
      token: "token-input-token xp-FontBold",
      tokenDelete: "token-input-delete-token",
      selectedToken: "token-input-selected-token",
      highlightedToken: "token-input-highlighted-token",
      dropdown: "token-input-dropdown xp-FontNormal",
      dropdownItem: "token-input-dropdown-item",
      dropdownItem2: "token-input-dropdown-item2",
      selectedDropdownItem: "token-input-selected-dropdown-item",
      inputToken: "token-input-input-token",
      focusClass: "has-focus"
    }, options.classes);

    return this.each(function () {

      var list = new $.TokenList(this, settings);
      this.GetCurrentIds = function () {
        list.GetCurrentIds();
      };
      this.GetCurrentTokens = function () {
        list.GetCurrentTokens();
      };
      this.ValidTokenCount = function () {
        list.validtokencount();
      };
    });
  };

  $.TokenList = function (input, settings) {
    //
    // Variables
    //

    // Input box position "enum"
    var POSITION = {
      BEFORE: 0,
      AFTER: 1,
      END: 2
    };

    // Keys "enum"
    var KEY = {
      BACKSPACE: 8,
      TAB: 9,
      RETURN: 13,
      ESC: 27,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      COMMA: 188
    };

    // Save the tokens
    var saved_tokens = [];

    // Keep track of the number of tokens in the list
    var token_count = 0;

    // Basic cache to save on db hits
    var cache = new $.TokenList.Cache();

    // Keep track of the timeout
    var timeout;

    // Create a new text input an attach keyup events
    var input_box = $("<input type=\"text\">")
        .css({
          outline: "none"
        })
        .focus(function () {
          if (settings.showhint == true) {
            show_dropdown_hint();
          }
        })
        .blur(function () {
          if (!settings.hasfocus) {
            hide_dropdown();
          }
        })
        .keydown(function (event) {
          var previous_token;
          var next_token;

          switch (event.keyCode) {
            case KEY.LEFT:
            case KEY.RIGHT:
            case KEY.UP:
            case KEY.DOWN:
              if (!$(this).val()) {
                previous_token = input_token.prev();
                next_token = input_token.next();

                if ((previous_token.length && previous_token.get(0) === selected_token) || (next_token.length && next_token.get(0) === selected_token)) {
                  // Check if there is a previous/next token and it is selected
                  if (event.keyCode == KEY.LEFT || event.keyCode == KEY.UP) {
                    deselect_token($(selected_token), POSITION.BEFORE);
                  } else {
                    deselect_token($(selected_token), POSITION.AFTER);
                  }
                } else if ((event.keyCode == KEY.LEFT || event.keyCode == KEY.UP) && previous_token.length) {
                  // We are moving left, select the previous token if it exists
                  select_token($(previous_token.get(0)));
                } else if ((event.keyCode == KEY.RIGHT || event.keyCode == KEY.DOWN) && next_token.length) {
                  // We are moving right, select the next token if it exists
                  select_token($(next_token.get(0)));
                }
              } else {
                var dropdown_item = null;

                if (event.keyCode == KEY.DOWN || event.keyCode == KEY.RIGHT) {
                  dropdown_item = $(selected_dropdown_item).next();
                } else {
                  dropdown_item = $(selected_dropdown_item).prev();
                }

                if (dropdown_item.length) {
                  select_dropdown_item(dropdown_item);
                }
                return false;
              }
              break;

            case KEY.BACKSPACE:
              previous_token = input_token.prev();

              if (!$(this).val().length) {
                if (selected_token) {
                  delete_token($(selected_token));
                } else if (previous_token.length) {
                  select_token($(previous_token.get(0)));
                }

                return false;
              } else if ($(this).val().length == 1) {
                hide_dropdown();
              } else {
                // set a timeout just long enough to let this function finish.
                setTimeout(function () { do_search(false); }, 5);
              }
              break;

            case KEY.TAB:
            case KEY.RETURN:
            case KEY.COMMA:
              if (selected_dropdown_item) {
                add_token($(selected_dropdown_item));
                return false;
              }
              break;

            case KEY.ESC:
              hide_dropdown();
              return true;

            default:
              var checked = true;
              if (settings.inputlimit != -1) {
                if (ValidTokenCount() == settings.inputlimit) {
                  checked = false;
                  return false;
                }
              }
              if (checked && is_printable_character(event.keyCode)) {
                // set a timeout just long enough to let this function finish.
                setTimeout(function () { do_search(false); }, 5);
              }
              break;
          }
        });

    // Keep a reference to the original input box
    var hidden_input = $(input)
                            .bind("resetpp", function () {
                              if (token_list) {
                                $.each(token_list.children(), function () {
                                  var currenttoken = $(this);
                                  if ($.data(currenttoken.get(0), "tokeninput")) {
                                    delete_token(currenttoken);
                                  }
                                });
                                return false;
                              }
                            })
                           .hide()
                           .focus(function () {
                             input_box.focus();
                           })
                           .blur(function () {
                             input_box.blur();
                           });

    // Keep a reference to the selected token and dropdown item
    var selected_token = null;
    var selected_dropdown_item = null;
    // The list to store the token items in
    var token_list = $("<ul />")
        .width(settings.width)
        .addClass(settings.classes.tokenList)
        .insertAfter(hidden_input)
        .click(function (event) {
          var li = get_element_from_event(event, "li");
          if (li && li.get(0) != input_token.get(0)) {
            toggle_select_token(li);
            return false;
          } else {
            input_box.focus();

            if (selected_token) {
              deselect_token($(selected_token), POSITION.END);
            }
          }
        })
        .mouseover(function (event) {
          var li = get_element_from_event(event, "li");
          if (li && selected_token !== this) {
            li.addClass(settings.classes.highlightedToken);
          }
        })
        .mouseout(function (event) {
          var li = get_element_from_event(event, "li");
          if (li && selected_token !== this) {
            li.removeClass(settings.classes.highlightedToken);
          }
        })
        .mousedown(function (event) {
          // Stop user selecting text on tokens
          var li = get_element_from_event(event, "li");
          if (li) {
            return false;
          }
        });


    // The list to store the dropdown items in
    var dropdown = $("<div>")
        .addClass(settings.classes.dropdown)
        .insertAfter(token_list)
        .hide();

    // The token holding the input box
    var input_token = $("<li />")
        .addClass(settings.classes.inputToken)
        .appendTo(token_list)
        .append(input_box);

    init_list();

    //
    // Functions
    //


    // Pre-populate list if items exist
    function init_list() {
      li_data = settings.prePopulate;
      if (li_data) {
        for (var i in li_data) {
          var this_token = $("<li><p>" + li_data[i].name + "</p></li>")
                    .addClass(settings.classes.token)
                    .insertBefore(input_token);

          $("<span>x</span>")
                    .addClass(settings.classes.tokenDelete)
                    .appendTo(this_token)
                    .click(function () {
                      delete_token($(this).parent());
                      return false;
                    });

          $.data(this_token.get(0), "tokeninput", { "id": li_data[i].id, "name": li_data[i].name });
          token_count++;
          // Clear input box and make sure it keeps focus
          input_box
                    .val("")
                    .focus();

          // Don't show the help dropdown, they've got the idea
          hide_dropdown();
          if (settings.tokenLimit != null && settings.tokenLimit >= token_count) {
            input_box.hide();
            $(input_box.parent().get(0)).hide();
          }
          // Save this token id
          var id_string = li_data[i].id.replace("\\", "_") + ";"
          hidden_input.val(hidden_input.val() + id_string);

        }
      }
    }

    function is_printable_character(keycode) {
      if ((keycode >= 48 && keycode <= 90) ||      // 0-1a-z
           (keycode >= 96 && keycode <= 111) ||     // numpad 0-9 + - / * .
           (keycode >= 186 && keycode <= 192) ||    // ; = , - . / ^
           (keycode >= 219 && keycode <= 222)       // ( \ ) '
          ) {
        return true;
      } else {
        return false;
      }
    }

    // Get an element of a particular type from an event (click/mouseover etc)
    function get_element_from_event(event, element_type) {
      var target = $(event.target);
      var element = null;

      if (target.is(element_type)) {
        element = target;
      } else if (target.parent(element_type).length) {
        element = target.parents(element_type + ":first");
      }
      else if (target.parents(element_type).length) {
        element = target.parents(element_type + ":first");
      }
      return element;
    }

    // Inner function to a token to the list
    function insert_token(id, value) {
      var this_token = $("<li><p>" + value + "</p></li>")
      .addClass(settings.classes.token)
      .insertBefore(input_token);

      // The 'delete token' button
      $("<span>x</span>")
          .addClass(settings.classes.tokenDelete)
          .appendTo(this_token)
          .click(function () {
            delete_token($(this).parent());
            return false;
          });

      $.data(this_token.get(0), "tokeninput", { "id": id, "name": value });

      return this_token;
    }

    // Add a token to the token list based on user input
    function add_token(item) {
      var li_data = $.data(item.get(0), "tokeninput");
      // If selected token is group then it adds all users belongs to the group.
      if (li_data.isGroup) {
        $.getJSON(settings.groupUsersUrl + "?id=" + li_data.itemId + "&format=" + true, function (groupData) {
          groupData = $.parseJSON(groupData.GroupUsersResult);
          $.each(groupData, function () {
            processData({ id: this.UserLoginName, name: this.UserName });
          });
        });
      } else processData(li_data);
    }
    // To insert the selected token list.
    function processData(liData) {
      insert_token(liData.id, liData.name);
      // Clear input box and make sure it keeps focus
      input_box.val("").focus();



      // Don't show the help dropdown, they've got the idea
      hide_dropdown();

      // Save this token id
      var id_string = liData.id + ";";
      hidden_input.val(hidden_input.val() + id_string);

      token_count++;

      if (settings.tokenLimit != null && settings.tokenLimit >= token_count) {
        input_box.hide();
        $(input_box.parent().get(0)).hide();
        hide_dropdown();
      }
    }

    // Select a token in the token list
    function select_token(token) {
      token.addClass(settings.classes.selectedToken);
      selected_token = token.get(0);

      // Hide input box
      input_box.val("");

      // Hide dropdown if it is visible (eg if we clicked to select token)
      hide_dropdown();
    }

    // Deselect a token in the token list
    function deselect_token(token, position) {
      token.removeClass(settings.classes.selectedToken);
      selected_token = null;

      if (position == POSITION.BEFORE) {
        input_token.insertBefore(token);
      } else if (position == POSITION.AFTER) {
        input_token.insertAfter(token);
      } else {
        input_token.appendTo(token_list);
      }

      // Show the input box and give it focus again
      input_box.focus();
    }

    // Toggle selection of a token in the token list
    function toggle_select_token(token) {
      if (selected_token == token.get(0)) {
        deselect_token(token, POSITION.END);
      } else {
        if (selected_token) {
          deselect_token($(selected_token), POSITION.END);
        }
        select_token(token);
      }
    }

    // Delete a token from the token list
    function delete_token(token) {
      // Remove the id from the saved list
      var token_data = $.data(token.get(0), "tokeninput");

      // Delete the token
      token.remove();
      selected_token = null;

      // Show the input box and give it focus again
      input_box.focus();

      // Delete this token's id from hidden input
      var str = hidden_input.val()
      var start = str.indexOf(token_data.id + ";");
      var end = str.indexOf(";", start) + 1;

      if (end >= str.length) {
        hidden_input.val(str.slice(0, start));
      } else {
        hidden_input.val(str.slice(0, start) + str.slice(end, str.length));
      }

      token_count--;

      if (settings.tokenLimit != null) {
        input_box
                .show()
                .val("")
                .focus();
        $(input_box.parent().get(0)).show();
      }
    }

    // Hide and clear the results dropdown
    function hide_dropdown() {
      dropdown.hide().empty();
      selected_dropdown_item = null;
    }

    function show_dropdown_searching() {
      dropdown
            .html("<p>" + settings.searchingText + "</p>")
            .show();
    }

    function show_dropdown_hint() {
      if (settings.inputlimit != -1) {
        if (ValidTokenCount() < settings.inputlimit) {
          dropdown
            .html("<p>" + settings.hintText + "</p>")
            .show();
        }
      }
      else {
        dropdown
            .html("<p>" + settings.hintText + "</p>")
            .show();
      }
    }

    // Highlight the query part of the search term
    function highlight_term(value, term) {
      return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<b>$1</b>");
    }
    /*this is where we format the result for lie*/
    function prepare_li(result, query, i) {
      var onlinepicurl = "";
      switch (result.OnlineStatus.toLowerCase()) {
        case "active":
          onlinepicurl = " xp-IconOnline xp-Icon-Highlight ";
          break;
        case "inactive":
        case "offline":
          onlinepicurl = " xp-IconOffline xp-Icon-Highlight ";
          break;
      }
      var userProfInfo;
  if (result.Department != "" && result.Function != "") {
      userProfInfo = result.Department + "," + result.Function;
  }
  else if (result.Department == "") {
      userProfInfo = result.Function;
  }
  else if (result.Function == "") {
      userProfInfo = result.Department;
  }
      var html = "<div style='height:36px;padding-bottom:0px;' class='xp-Width'>";
      html += "<div class='xp-FloatLeft' style='width:16%;padding-top:2px'><img src='" + result.ImageUrl + "' style='width:30px;height:35px' />";
      html += "</div>";
      html += "<div class='xp-FloatLeft' style='width:74%;padding-left:2px;'>";
      html += "<div style='width:99%;' class=xp-FontNormal>";
      html += highlight_term(result.Name, query);
      html += "</div>";
      html += "<div style='width:99%;font-size:10px;line-height:12px;' class='xp-FontLite'>";
      html += userProfInfo;
      html += "</div>";
      html += "<div style='width:99%;;font-size:10px;line-height:12px;' class='xp-FontLite'>";
      html += result.Geography;
      html += "</div>";
      html += "</div>";
      html += "<div  class='xp-FloatLeft' style='width:6%;'> <div class='" + onlinepicurl + " xp-DisplayNone' ></div>";
      html += "</div>";
      html += "</div>";
      return html;
    }

    // Populate the results dropdown with some results
    function populate_dropdown(query, results) {
      if (results.length) {
        dropdown.empty();
        var id = input_box.attr('id');
        var ulhtml = "";
        if (results.length < 4) {
          ulhtml = "<ul  id='" + id + "_dropdown'/>";
        }
        else {
          ulhtml = "<ul  id='" + id + "_dropdown'  style='height:" + settings.scrollheight + "px;overflow-x:hidden; overflow-y: auto;'/>";
        }
        var dropdown_ul = $(ulhtml)
                .appendTo(dropdown)
                .mouseout(function (event) {
                  settings.hasfocus = false;
                })
                 .click(function (event) {
                   settings.hasfocus = false;
                   if (selected_dropdown_item) {
                     add_token($(selected_dropdown_item));
                     return false;
                   }
                 })
                .mouseover(function (event) {
                  settings.hasfocus = true;
                  select_dropdown_item(get_element_from_event(event, "li"));
                })
                .mousedown(function (event) {
                  // Stop user selecting text on tokens
                  return false;
                })
                .hide();

        for (var i in results) {
          if (!settings.isMultiEntry && results[i].IsGroup) continue;
          if (results.hasOwnProperty(i)) {
            var this_li = $("<li>" + prepare_li(results[i], query) + "</li>").appendTo(dropdown_ul);
            if (i % 2) {
              this_li.addClass(settings.classes.dropdownItem);
            } else {
              this_li.addClass(settings.classes.dropdownItem2);
            }
            if (i == 0) {
              select_dropdown_item(this_li);
            }

            $.data(this_li.get(0), "tokeninput", { "id": results[i].UserName, "name": results[i].Name, "itemId": results[i].ID, "isGroup": results[i].IsGroup });
          }
        }

        dropdown.show();
        dropdown_ul.slideDown("fast");

      } else {
        dropdown
                .html("<p>" + settings.noResultsText + "</p>")
                .show();
      }
    }

    // Highlight an item in the results dropdown
    function select_dropdown_item(item) {
      if (item) {
        if (selected_dropdown_item) {
          deselect_dropdown_item($(selected_dropdown_item));
        }

        item.addClass(settings.classes.selectedDropdownItem);
        selected_dropdown_item = item.get(0);
      }
    }

    // Remove highlighting from an item in the results dropdown
    function deselect_dropdown_item(item) {
      item.removeClass(settings.classes.selectedDropdownItem);
      selected_dropdown_item = null;
    }

    // Do a search and show the "searching" dropdown if the input is longer
    // than settings.minChars
    function do_search(immediate) {
      var query = input_box.val().toLowerCase();

      if (query && query.length) {
        if (selected_token) {
          deselect_token($(selected_token), POSITION.AFTER);
        }
        if (query.length >= settings.minChars) {
          show_dropdown_searching();
          if (immediate) {
            run_search(query);
          } else {
            clearTimeout(timeout);
            timeout = setTimeout(function () { run_search(query); }, settings.searchDelay);
          }
        } else {
          hide_dropdown();
        }
      }
    }

    // Do the actual search
    function run_search(query) {
      var cached_results = cache.get(query);
      if (cached_results && cached_results.length > 0) {
        populate_dropdown(query, cached_results);
      } else {
        var queryStringDelimiter = settings.url.indexOf("?") < 0 ? "?" : "&";
        var callback = function (results) {
          if ($.isFunction(settings.onResult)) {
            results = settings.onResult.call(this, results);
          }
          cache.add(query, settings.jsonContainer ? results[settings.jsonContainer] : results);
          populate_dropdown(query, settings.jsonContainer ? results[settings.jsonContainer] : results);
        };
        var queries = window.location.search.substring(1).split('=');
        $.ajax({ mode: "abort",
          // limit abortion to this input
          port: "viewprofilecomplte" + query, url: settings.url, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{" + settings.queryParam + ":'" + query + "',itemType:'"+queries[1]+"'}",
          success: function (datap, st) {
            var data = datap.d
            if (data != null) {
              callback(data);
            }
          }
        });
      }
    }

    function ValidTokenCount() {
      var valid = 0;
      var i = 0;
      $.each(token_list.children(), function () {
        var data = $.data(token_list.children().get(i), "tokeninput");
        if (data != null) {
          valid++;
        }
        i++;
      });
      return valid;
    }
    function GetCurrentTokens() {
      var list = {};
      var i = 0;
      $.each(token_list.children(), function () {
        var data = $.data(token_list.children().get(i), "tokeninput");
        if (data != null) {
          list[i] = data;
        }
        i++;
      });
      return list;
    }
    function GetCurrentIds() {
      var list = {};
      var i = 0;
      $.each(token_list.children(), function () {
        var data = $.data(token_list.children().get(i), "tokeninput");
        if (data != null) {
          list[i] = data.id;
        }
        i++;
      });
      return list;
    }
    $.fn.extend(input, {
      PeopleIds: function () {
        return GetCurrentIds();
      },
      PeopleTokens: function () {
        return GetCurrentTokens();
      },
      PeopleValidTokenCount: function () {
        return ValidTokenCount();
      }
    })

  };

  // Really basic cache for the results
  $.TokenList.Cache = function (options) {
    var settings = $.extend({
      max_size: 50
    }, options);

    var data = {};
    var size = 0;

    var flush = function () {
      data = {};
      size = 0;
    };

    this.add = function (query, results) {
      if (size > settings.max_size) {
        flush();
      }

      if (!data[query]) {
        size++;
      }

      data[query] = results;
    };

    this.get = function (query) {
      return data[query];
    };
  };
  $.fn.RemoveRichText = function () {
    return this.each(function () {
      $(this).get(0).tagName == "TEXTAREA" ? tinymce.remove('#' + $(this).attr('id')) :
            $("textarea", this).each(function () { tinymce.remove('#' + $(this).attr('id')); });
    });
  }
  $.fn.SaveRichtextbox = function () {
    return this.each(function () { tinymce.get($(this).attr('id')).save(); });
  }
  /*
  * Generic Email Utility . This will open a dialog which will send email to specified users in the dialog
  */
  $.fn.EmailBox = function (options) {
    /*set up the defaults*/
    var defaults = {
      url: '',
      defaultusers: {},
      dialogTitle: 'Send Email',
      allowMultiple: false,
      updateUsers: false,
      getUsersUrl: "",
      itemId: "",
      emailSubject: ""
    };
    var ids = {
      emailBox: 'emailBox',
      person: 'personInput',
      subject: 'subjectInput',
      emailBody: 'emailBody',
      emailTemplate: 'emailTemaplate'
    };
    var options = $.extend(defaults, options);
    /*override the ids*/
    function overrideIds(id) {
      ids.emailBox += id;
      ids.person += id;
      ids.subject += id;
      ids.emailBody += id;
    }
    function prepareHtml(elem) {
      elem.empty();
      var html = "";
      html += "<table border='0' width='97%' cellspacing='0' cellpadding='6'><tbody>";
      html += "<tr><td valign='top' width='10%'>To:</td>";
      html += "<td style='width:258px'><input id='" + ids.person + "' autocomplete='off'></input></td>";
      html += "<td style='width:100px;' valign=top>Use Template: </td>";
      html += "<td style='width:140px;' valign=top><label class='xp-CustomLabel'><select id='" + ids.emailTemplate + "' style='width:140px;overflow:hidden;' ></select></label></td>";
      html += "</tr><tr><td valign=top>Subject:</td><td colspan=3><input type=text name=Subject id='" + ids.subject + "' autocomplete='off' style='width:70%' class='xp-TxtBox'/></td></tr><tr><td valign=top> </td><td colspan=3>";
      html += "<textarea name='body' id='" + ids.emailBody + "' cols='80'></textarea></td></tr>";
      html += "</tbody></table>";
      elem.html(html);

    }
    /*
    * To populate admin email templates and display the corresponding contents accordingly
    */
    function adminEMailTemplats() {
      $.ajax({ url: '/_layouts/IImpact.Web/AdminEMailTemplateService.asmx/GetEMailTemplateItems',
        contentType: "application/json; charset=utf-8",
        type: "POST",
        dataType: "json",
        success: function (datap) {
          var result = datap.d;
          if (result) {
            var template = {};
            $.each(result, function () {
              var resultTemp = this;
              var options = $("<option value='" + resultTemp.templateID + "'>" + resultTemp.title + "</option>");
              $("#" + ids.emailTemplate).append(options);
              template[resultTemp.templateID] = {
                title: resultTemp.title,
                subject: resultTemp.eMailSubject,
                body: resultTemp.eMailBody
              }
            });
            /*
            * On selection change of the drop down (email templates)
            */
            $("#" + ids.emailTemplate).change(function (j) {
              $("#" + ids.subject).val(template[$(this).val()].subject);
               tinyMCE.get('emailBodyemailLinkemailTeam').setContent(template[$(this).val()].body);
            });
          }
        }
      });
    }

    function attachPlugins($team) {
      $team.peoplepicker({ multiple: options.allowMultiple, prePopulate: options.defaultusers, needformat: true });
    }
    /*
    * this prepares everything for the email dialog
    */
    return this.each(function () {
      var elem = $(this);
      overrideIds(elem.attr('id'));
      elem.click(function (event) {
        var $emailpopup = $("#" + ids.emailBox), $team = $("#" + ids.person), $subject = $("#" + ids.subject), $body = $("#" + ids.emailBody);
        /*start of creating email popup*/
        if ($emailpopup.length > 0) {
          $emailpopup.remove();
        }
        $emailpopup = $("<div id='" + ids.emailBox + "' title='Compose Email'/>").hide();
        prepareHtml($emailpopup);
        adminEMailTemplats();
        $('body').append($emailpopup);
        var $team = $("#" + ids.person), $subject = $("#" + ids.subject), $body = $("#" + ids.emailBody);
        var allFields = $([]).add($team).add($subject).add($body);
        /*start of email popup dialog*/
        $emailpopup.dialog({
          autoOpen: false,
          width: 750,
          height: 410,
          bgiframe: false,
          modal: true,
          buttons: {
            'Send': function () {
              tinyMCE.triggerSave();
              var pdata = { team: $team.val(), subject: $subject.val(), body: $body.val() + options.emailPredefinedBody };
              var gpost = { 'post': pdata };
              $.ajax({ url: options.url, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: $.toJSON(gpost),
                success: function (datap, st) {
                  $emailpopup.dialog('close');
                }
              });
            },
            Cancel: function () {
              $(this).dialog('close');
            }
          },
          open: function () {
            $body.RelayRichText();
          },
          close: function () {
            tinymce.remove('#' + $body.attr("id"));
            allFields.val('');
          }
        });
        $subject.val("[" + options.senderName + "]" + options.emailSubject);
        //gets the updated users to send Email
        if (options.updateUsers == "True") {
          $.ajax({ url: options.getUsersUrl, dataType: 'json', type: 'POST', async: false, contentType: 'application/json; charset=utf-8', data: "{itemId:'" + options.itemId + "'}",
            success: function (data) {
              $team.peoplepicker({ multiple: options.allowMultiple, prePopulate: data.d, needformat: true });
              event.stopImmediatePropagation();
            }
          }); 	//end of ajax
        } //end of if
        else { $team.peoplepicker({ multiple: options.allowMultiple, prePopulate: options.defaultusers, needformat: true }); }

        /*end of creating email popup*/
        $emailpopup.dialog('open');
        $(".ui-widget-overlay").css('z-index', '999');
        $emailpopup.css('z-index', '1111');
        return false;
      });
    });
  };
  /*
  * Version used 4.1.5, Plugin upgraded for new Rich Text Box for Lifecycles & Tools.
  */
  $.fn.RelayRichText = function(opt, maxl) {
    return this.each(function() {
      tinymce.init({
        menubar: false,
        statusbar: false,
        autoresize_min_height: 150,
        autoresize_max_height: 300,
        plugins: "textcolor, image, link, paste, autolink, autoresize",
        image_list: "/_vti_bin/XPointBase/ImagesService.svc/getImages",
        toolbar: "undo redo bold italic underline strikethrough alignleft aligncenter alignright  richtextFontSize forecolor backcolor " + (((opt)? !!opt.imageEnabled:false)?' image ':' ') + "bullist numlist outdent indent styleselect",
        style_formats: [
          { title: "Header 1", format: "h1" },
          { title: "Header 2", format: "h2" },
          { title: "Header 3", format: "h3" },
          { title: "Header 4", format: "h4" },
          { title: "Header 5", format: "h5" },
          { title: "Header 6", format: "h6" }
        ],
        setup: $.createSetupOptions,
        selector: '#' + $(this).attr('id')
      });
    });
  };

  $.createSetupOptions = function (ed) {
    ed.addButton('richtextFontSize', function () {
      var items = [], defaultFontsizeFormats = '8pt 10pt 12pt 14pt 18pt 24pt 36pt';
      var fontsize_formats = ed.settings.fontsize_formats || defaultFontsizeFormats;

      $.each(fontsize_formats.split(' '), function (i, item) {
        var text = item, value = item;
        var values = item.split('=');
        if (values.length > 1) {
          text = values[0];
          value = values[1];
        }
        items.push({ text: text, value: value });
      });

      return {
        type: 'listbox',
        text: '8pt',
        tooltip: 'Font Sizes',
        values: items,
        fixedWidth: false,
        onPostRender: createListBoxChangeHandler(items, 'fontsize', '8pt'),
        onclick: function (e) {
          if (e.control.settings.value) {
            ed.execCommand('FontSize', false, e.control.settings.value);
          }
        }
      };
    });

    function createListBoxChangeHandler(items, formatName, defaultOpt) {
      return function () {
        var self = this;
        ed.on('nodeChange', function (e) {
          var formatter = ed.formatter;
          var value = null;
          $.each(e.parents, function (i, node) {
            $.each(items, function (i, item) {
              if (formatName) {
                if (formatter.matchNode(node, formatName, { value: item.value })) {
                  value = item.value;
                }
              } else {
                if (formatter.matchNode(node, item.value)) {
                  value = item.value;
                }
              }
              if (value) {
                return false;
              }
            });
            if (value) {
              return false;
            }
          });
          self.value((value) ? value : defaultOpt);
        });
      };
    }
  };
})(jQuery);
/*
* Date Format 1.2.3
* (c) 2007-2009 Steven Levithan <stevenlevithan.com>
* MIT license
*
* Includes enhancements by Scott Trenda <scott.trenda.net>
* and Kris Kowal <cixar.com/~kris.kowal/>
*
* Accepts a date, a mask, or a date and a mask.
* Returns a formatted version of the given date.
* The date defaults to the current date/time.
* The mask defaults to dateFormat.masks.default.
*/

var dateFormat = function () {
  var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
		  val = String(val);
		  len = len || 2;
		  while (val.length < len) val = "0" + val;
		  return val;
		};

  // Regexes and supporting functions are cached through closure
  return function (date, mask, utc) {
    var dF = dateFormat;

    // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
    if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
      mask = date;
      date = undefined;
    }

    // Passing date through Date applies Date.parse, if necessary
    date = date ? new Date(date) : new Date;
    if (isNaN(date)) throw SyntaxError("invalid date");

    mask = String(dF.masks[mask] || mask || dF.masks["default"]);

    // Allow setting the utc argument via the mask
    if (mask.slice(0, 4) == "UTC:") {
      mask = mask.slice(4);
      utc = true;
    }

    var _ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
			  d: d,
			  dd: pad(d),
			  ddd: dF.i18n.dayNames[D],
			  dddd: dF.i18n.dayNames[D + 7],
			  m: m + 1,
			  mm: pad(m + 1),
			  mmm: dF.i18n.monthNames[m],
			  mmmm: dF.i18n.monthNames[m + 12],
			  yy: String(y).slice(2),
			  yyyy: y,
			  h: H % 12 || 12,
			  hh: pad(H % 12 || 12),
			  H: H,
			  HH: pad(H),
			  M: M,
			  MM: pad(M),
			  s: s,
			  ss: pad(s),
			  l: pad(L, 3),
			  L: pad(L > 99 ? Math.round(L / 10) : L),
			  t: H < 12 ? "a" : "p",
			  tt: H < 12 ? "am" : "pm",
			  T: H < 12 ? "A" : "P",
			  TT: H < 12 ? "AM" : "PM",
			  Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
			  o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
			  S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

    return mask.replace(token, function ($0) {
      return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
    });
  };
} ();

// Some common format strings
dateFormat.masks = {
  "default": "ddd mmm dd yyyy HH:MM:ss",
  shortDate: "m/d/yy",
  mediumDate: "mmm d, yyyy",
  longDate: "mmmm d, yyyy",
  fullDate: "dddd, mmmm d, yyyy",
  shortTime: "h:MM TT",
  mediumTime: "h:MM:ss TT",
  longTime: "h:MM:ss TT Z",
  isoDate: "yyyy-mm-dd",
  isoTime: "HH:MM:ss",
  isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
  isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
  dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
  monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
  return dateFormat(this, mask, utc);
};
// For convenience...
Date.prototype.formatDate = function (mask, utc) {
  return dateFormat(this, mask, utc);
};

//Decode html
function decodeHtml(value) {
  if (value == '&nbsp;' || value == '&#160;' || (value.length == 1 && value.charCodeAt(0) == 160)) { return ""; }
  return !value ? value : String(value).replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"');
}

