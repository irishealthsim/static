(function ($) {
  $.fn.favorite = function (options) {
    var defaults = {
      uniqueId: '',
      isIdeaFavorite: '',
      favImage: 'xp-Icon xp-IconFav',           /* xp-Icon-Highlight*/
      nofavImage: 'xp-Icon xp-IconNotFav',          /* xp-Icon-Highlight */
      favoritesUrl: "/_layouts/IImpact.Web/LifecycleService.asmx/AddFavorites",
      favoritesCountUrl: "/_layouts/IImpact.Web/LifecycleService.asmx/GetFavoritesCount"
    };

    var opts = $.extend(defaults, options);

    var ids = {
      favoriteImage: $(this).attr('id') + "_favoriteImage",
      favoriteIcon: $(this).attr('id') + "_favoriteIcon"
    };

    /*
    * Creates Favorite Icon 
    */
    function createFavorite(elem) {
      var imgSrc, imgAlt;
      if (opts.isIdeaFavorite == "True") {
        imgSrc = opts.favImage;
        imgAlt = 'Unlike';
      }
      else {
        imgSrc = opts.nofavImage;
        imgAlt = 'Like';
      }
    var fav = "<div id='" + ids.favoriteIcon + "'><span><div id='" + ids.favoriteImage + "' class='" + imgSrc + " "+"xp-HoverCursor' alt='" + imgAlt + "' title='" + imgAlt + "' ></div></span></div>";
      $(elem).append(fav);
      toogleFavorite(elem);
    }

    /*
    *Toggles an Idea as Favorite or NotFavorite
    *and update the rating Count for it.
    */
    function toogleFavorite(elem) {
      $('#' + ids.favoriteIcon).click(function () {
        $.ajax({ url: opts.favoritesUrl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{itemid:'" + opts.uniqueId + "'}",
          success: function (datap, status) {
            var data = datap.d;
            $.ajax({ url: opts.favoritesCountUrl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{trackerid:'" + opts.uniqueId + "'}",
              success: function (datap) {
                $('#ratingCount').text(datap.d);
              }
            });
            if (data == "Added as Favorite Successfully") {
              opts.isIdeaFavorite = "True";
            }
            else {
              opts.isIdeaFavorite = "False";
            }
            $('#' + ids.favoriteIcon).remove();
            createFavorite(elem);
          }
        });
      });
    }

    return this.each(function () {
      var elem = $(this);
      createFavorite(elem);
    });
  }
})(jQuery);
