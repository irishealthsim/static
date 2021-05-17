; (function ($) {
	//This plugin will create phasetab forlifecycle
	$.fn.phaseTabs = function (options) {
		var defaults = {
			model: [],
			nextImageUrl: "xp-IconNext xp-Icon xp-DisplayBlock",
			primaryTab: ".ui-primarytabclr",
			currentTab : ".xp-Current",
			prevImageUrl: "xp-IconPrev xp-Icon xp-DisplayBlock"
		};

		function phaseItem(item) {
			this.title = item.title;
		}
		var opts = $.extend(defaults, options);

		//This function creates the html of the tabs
		function createHtml(elem) {
			var html = "<div class='slider'>";
			html += "<span class='prev ui-state-default ui-corner-all xp-BoxShadow'><a class='" + opts.prevImageUrl + "'/></span>";
			html += "<span class='next ui-state-default ui-corner-all xp-BoxShadow'><a class='" + opts.nextImageUrl + "'/></span>";
			html += "<div class='xp-TopNavDiv " + opts.model[0].tourClass + "'>";
			html += "<ul class='xp-TopNav'>";
			$(opts.model).each(function (i) {
				if (opts.model[i]) {
					html += buildli(opts.model[i]);
				}
			});
			html += "</ul></div></div>";
			elem.append(html);
			prioritizeSelected();
		}

		//this method display the selected tab as first item of the list
		//when there are more items than what can be accomodated in the provided 
		//div width.
		function prioritizeSelected() {
			var sum = 0;
			var firstPos = $('li:first', '.slider').offset().left;
			if($(opts.primaryTab, '.slider').length == 0)
			{
				var currentPos = $(opts.currentTab, '.slider').offset().left;
				var selectedItem = $(opts.currentTab, '.slider');
			}
			else{
				var currentPos = $(opts.primaryTab, '.slider').offset().left;
				var selectedItem = $(opts.primaryTab, '.slider');
			}
			var lastIndex = $("li", '.slider').length;
			var parentItem = $(selectedItem).parent().get(0);
			var selectedIndex = $('li', 'div.slider').index(parentItem);
			for (i = selectedIndex; i < lastIndex; i++) {
				sum += $("li", '.slider')[i].offsetWidth;
			}
			var offset = Math.abs(parseInt($('ul', '.slider').css('marginLeft')));
			var slide = currentPos - firstPos;
			var width = $('span.prev', 'div.slider').width();
			var slidewidth = slide - width;
			//make the current phase as first item.
			if ($('li:last', 'div.slider').width() + $('li:last', 'div.slider').offset().left - $('li:first', 'div.slider').offset().left > $('div', 'div.slider').width()) {
			$("ul", 'div.slider').stop().animate({ marginLeft: "-=" + slide }, 100, 'swing');
			//hide prev button if selected Item is the first item in the list
			if (selectedIndex == 0) {
					$('span.prev', 'div.slider').css('visibility', 'hidden');
					$('span.prev', 'div.slider').css('display', 'none');
			}
			//display the next button when there are more items to display
				if (sum <= $('div.slider').width()) {
					$('span.next', 'div.slider').css('visibility', 'hidden');
					$('span.next', 'div.slider').css('display', 'none');
				}
			}
		}

		//This function creates the listitem of the phasetabs
		function buildli(phaseItem) {
			var html = "<li><a href='" + phaseItem.url + "' style='" + phaseItem.style + "' class='" + phaseItem.design + "'>" + phaseItem.title + "</a></li>";
			return html;
		}

		//This method enable the next button and disables the prev button
		//by checking if there are more tabs 
		//in the phase tab list than what can be accomodate in the screen
		function scrollTabs() {
			$('.slider').each(function () {
				if ($('li:last', this).width() + $('li:last', this).offset().left - $('li:first', this).offset().left > $('div', this).width()) {
					// enable the buttons
					$('span', this).css('display', 'inline');
				}
			});

			//On Click of next button tabs scrolls to display its successors
			$(".slider .next").click(function () {
				//finding ParentDiv of the prev next Class
				var parentDiv = $('div', this.parentNode)
				var maxOffset = $('li:last', parentDiv).width() + $('li:last', parentDiv).offset().left - $('li:first', parentDiv).offset().left - parentDiv.width();
				var offset = Math.abs(parseInt($('ul', parentDiv).css('marginLeft')));
				var diff = parentDiv.width();
				if (offset >= maxOffset)
					return;
				else if (offset + diff >= maxOffset) {
					diff = maxOffset - offset;
					//Hiding the next button
					$(this).css('visibility', 'hidden');
          $(this).css('display','none');
				}
				// enabling the prev button
				$('.prev', this.parentNode).css('visibility', 'visible');
        $('.prev', this.parentNode).css('display', 'inline');
				//Animating the list item
				$("ul", $(this).parent()).stop().animate({ marginLeft: "-=" + diff }, 400, 'swing');
			});

			//On Click of prev button tabs scrolls to display its predecessors
			$(".slider .prev").click(function () {
				var offset = Math.abs(parseInt($('ul', this.parentNode).css('marginLeft')));
				var diff = $('div', this.parentNode).width();
				if (offset <= 0)
					return;
				else if (offset - diff <= 0) {
					//Hiding the prev button
					$(this).css('visibility', 'hidden');
          $(this).css('display', 'none');
					diff = offset;
				}
				//enabling the next button
				$('.next', this.parentNode).css('visibility', 'visible');
        $('.next', this.parentNode).css('display', 'inline');
				//Animating the list item
				$("ul", $(this).parent()).stop().animate({ marginLeft: '+=' + diff }, 400, 'swing');
			});
		}
		/**************************End of method *************/
		return this.each(function () {
			var elem = $(this);
			opts.baseid += elem.attr('id');
			createHtml(elem);
			scrollTabs();
		});
	}
})(jQuery);
