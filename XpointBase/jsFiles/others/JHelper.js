/*
* Support JScript functions fo JHelper.cs server-side class
*/
/*
* Supports the MakeAutocomplete textbox server side methods
*/
function MakeAutoComplete(id, url, dataString) {
  $('#' + id).keyup(function (event) {

    /*Variables for key events*/
    var KEY = {
      UP: 38,
      DOWN: 40,
      DEL: 46,
      TAB: 9,
      RETURN: 13,
      ESC: 27,
      COMMA: 188,
      PAGEUP: 33,
      PAGEDOWN: 34,
      BACKSPACE: 8
    };
    var lastKeyPressCode = event.keyCode;
    switch (event.keyCode) {

      case KEY.BACKSPACE:

        var decoration = $('#' + id).css("text-decoration");

        if (decoration == "underline") {
          $('#' + id).val("");
          $('#' + id).css("text-decoration", "");
        }
        break;
    }

  });
  $('#' + id).autocomplete(url, { minChars: 1, dataType: "json", contentType: "application/json; charset=utf-8", ds: dataString,
    parse: function parse(data) {
      var parsed = [];
      var rows = data.d;
      for (var i = 0; i < rows.length; i++) {
        var row = $.trim(rows[i]);
        if (row) {
          row = row.split("|");
          parsed[parsed.length] = {
            data: row,
            value: row[0],
            result: row[0]
          };
        }
      }
      return parsed;
    },
    post: function (term, options, cache, success) {
      var ds = "{'q':'" + term + "', 'limit':'" + options.max + "'";
      for (var i = 0; i < options.ds.length; i++) {
        var obj = options.ds[i];
        ds += ",  '" + obj[0] + "'" + ':' + "'" + $('#' + obj[1]).val() + "'";
      }
      ds += " }";
      $.ajax({
        type: "POST",
        cache: false,
        url: options.url,
        data: ds,
        contentType: options.contentType,
        dataType: options.dataType,
        success: function (data) {
          var parsed = options.parse && options.parse(data) || parse(data);
          cache.add(term, parsed);
          success(term, parsed);
        }
      });
    }
  });
};
    