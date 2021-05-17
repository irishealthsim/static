(function ($) {
  var tipClassNames = [];
  var config = [];
  $.fn.tour = function (options) {
    //Variables, Ids & Classes used in the tour.
    $.tourAttributes = {
      defaults: {
        step: 0,
        totalSteps: 0,
        tourId: '',
        showNoTip: 'No tip available for this Page',
        tourCtrlText: 'Take a look at what you can do in this Page'
      },
      serviceUrl: '/_vti_bin/XPointBase/TourService.svc/GetTourData',
      ids: {
        tourContainer: 'tourContainer',
        tourCtrlText: 'tourCtrlText',
        tourOverlay: 'tourOverlay',
        startTour: 'startTour',
        endTour: 'endTour',
        prevStep: 'prevStep',
        nextStep: 'nextStep',
        tourTip: 'tourTip'
      },
      classes: {
        tourContainer: 'xp-TourControls',
        tourOverlay: 'xp-TourOverlay',
        buttonCss: 'xp-Button ui-primarytabclr',
        navigationDivCss: 'xp-Navigation',
        endTour: 'xp-EndTour',
        tourTip: 'xp-TourTip ui-corner-all',
        tourTipArrow: 'xp-TourTipArrow'
      }
    };
    //Extending the default Options.
    var tourOptions = $.extend($.tourAttributes.defaults, options);
    //Function to start the tour, Invoke on click of 'Start Button'.
    function activateTour() {
      if (tipClassNames.length == 0) {
        tipClassNames = new Array();
        getTipClasses();
      }
      (config.length == 0) ? (tipClassNames.length != 0) ? getTourData() : noTip() : playTour();
    }
    //Function to play the tour.
    function playTour() {
      tourOptions.totalSteps = config.length;
      $('#' + $.tourAttributes.ids.startTour).remove();
      $('#' + $.tourAttributes.ids.endTour).show();
      if (tourOptions.totalSteps > 1)
        $('#' + $.tourAttributes.ids.nextStep).show();
      goNextStep();
    }
    //Function to get the tip classes.
    function getTipClasses() {
      //Here it gets the elements that has classname prefixed with 'Tip- (and) ui-'.
      var elemArray = $("*[class*='Tip-'],*[class*='ui-']");
      $.each(elemArray, function () {
        if (!($(this).css("visibility") == "hidden")) {
          var pageClasses = $(this).attr('class').split(' ');
          getClassNames(pageClasses);
        }
      });
      var dynamicClasses = tourOptions.dynamicClass.split(' ');
      getClassNames(dynamicClasses);
    }
    //Here it gets the class name that prefixed with 'Tip- (and) ui-' from the classes.
    function getClassNames(classes) {
      $.each(classes, function () {
        var tipClass = /^Tip\-(.+)/.exec(this);
        var uiClass = /^ui\-(.+)/.exec(this);
        addTourClass(tipClass);
        addTourClass(uiClass);
      });
    }
    //Checks the class is present in array 'tipClassNames', if not it will be added.
    function addTourClass(tourClass) {
      if (tourClass != null) {
        if ($.inArray(tourClass[0], tipClassNames) == -1) {
          tipClassNames.push(tourClass[0]);
        }
      }
    }
    //Function to prepare the tour data.
    function getTourData() {
      config = new Array();
      //Ajax call to get the items from the server side based on the tipClassNames.
      $.ajax({
        url: $.tourAttributes.serviceUrl,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ classNames: tipClassNames }),
        success: function (tourData) {
          var tourConfig = tourData.GetTourDataResult;
          $.each(tourConfig, function () {
            config.push({ name: this.tourClass, tipStyle: this.tipStyle, position: this.tipPosition, text: this.tourTip });
          });
          (config.length == 0) ? noTip() : playTour();
        },
        error: function () {
          noTip();
        }
      });
    }
    //Function for moving to next tip.
    function goNextStep() {
      if (tourOptions.step < tourOptions.totalSteps - 1) {
        //If any hidden elements found then it skips.
        tourOptions.step = getExactStep(tourOptions.step, true);
      }
      //If step is more than zero then it shows previous button.
      (tourOptions.step > 0) ? $('#' + $.tourAttributes.ids.prevStep).show() : $('#' + $.tourAttributes.ids.prevStep).hide();
      //If step is equal to total steps then it hides the next button.
      (tourOptions.step == tourOptions.totalSteps - 1) ? $('#' + $.tourAttributes.ids.nextStep).hide() : $('#' + $.tourAttributes.ids.nextStep).show();
      if (tourOptions.step >= tourOptions.totalSteps) {
        //if last step then end tour.
        closeTour();
        return false;
      }
      ++tourOptions.step;
      showTourTip();
    }
    //Function for moving to previous step.
    function goPreviousStep() {
      if (tourOptions.step > 1) {
        //If any hidden elements found then it skips.
        tourOptions.step = getExactStep(tourOptions.step, false);
      }
      //If step is more than two then it shows previous button.
      (tourOptions.step > 2) ? $('#' + $.tourAttributes.ids.prevStep).show() : $('#' + $.tourAttributes.ids.prevStep).hide();
      if (tourOptions.step == tourOptions.totalSteps)
        $('#' + $.tourAttributes.ids.nextStep).show();
      if (tourOptions.step <= 1)
        return false;
      --tourOptions.step;
      showTourTip();
    }
    //Function to skip the element, if it is not available or hidden and gets the exact element step.
    function getExactStep(currentStep, increment) {
      var stepCount = (increment) ? currentStep : currentStep - 2;
      var tourConfig = config[stepCount];
      var $elem = $('.' + tourConfig.name);
      var needSkip = ($elem.length > 0) ? $elem.is(":hidden") : true;
      while (needSkip) {
        stepCount = (increment) ? ++currentStep : --currentStep - 2;
        tourConfig = config[stepCount];
        $elem = $('.' + tourConfig.name);
        needSkip = ($elem.length > 0) ? $elem.is(":hidden") : true;
      }
      return currentStep;
    }
    //Function to show there is no tip available.
    function noTip() {
      $('#' + $.tourAttributes.ids.tourCtrlText).html(tourOptions.showNoTip);
      $('#' + $.tourAttributes.ids.startTour).hide();
    }
    //Function to end the tour.
    function closeTour() {
      bindTourClick();
      removeTourTip();
      removeTourControls();
    }
    //Function to show the tour tip.
    function showTourTip() {
      //Remove current tour tip.
      removeTourTip();
      var configStep = config[tourOptions.step - 1];
      var $elem = $('.' + configStep.name);
      //Tour tip div to show the tip.
      var $tourTip = $('<div/>')
                    .attr('id', $.tourAttributes.ids.tourTip)
                    .attr('style', 'border-width:1px !important;display:none;' + ((configStep.tipStyle != 'Default') ? configStep.tipStyle : '') + '')
                    .attr('class', $.tourAttributes.classes.tourTip);
      $('<p/>')
                    .html(configStep.text)
                    .appendTo($tourTip);
      $('<span/>')
                    .attr('class', $.tourAttributes.classes.tourTipArrow)
                    .appendTo($tourTip);
      //Appending the Tour tip to the body but by default it will be hidden.
      $('BODY').prepend($tourTip);
      //The css properties that tour tip should have.
      var properties = {};
      var tipPosition = configStep.position;
      //To get the information about element where exactly it is.
      var elemOuterWidth = $elem.outerWidth();
      var elemOuterHeight = $elem.outerHeight();
      var elemLeft = $elem.offset().left;
      var elemTop = $elem.offset().top;
      //To decide the position for arrow.
      switch (tipPosition) {
        case 'Top Left':
          properties = {
            'left': elemLeft + 5 + 'px',
            'top': elemTop + elemOuterHeight + 14 + 'px',
            'z-index': '9999'
          };
          $tourTip.find('span.' + $.tourAttributes.classes.tourTipArrow).addClass('xp-TourTipArrowTL');
          break;
        case 'Top Right':
          properties = {
            'left': elemLeft + elemOuterWidth - $tourTip.width() - 3 + 'px',
            'top': elemTop + elemOuterHeight + 6 + 'px',
            'z-index': '9999'
          };
          $tourTip.find('span.' + $.tourAttributes.classes.tourTipArrow).addClass('xp-TourTipArrowTR');
          break;
        case 'Bottom Left':
          properties = {
            'left': elemLeft - 4 + 'px',
            'top': elemTop - $tourTip.height() - 4 + 'px',
            'z-index': '9999'

          };
          $tourTip.find('span.' + $.tourAttributes.classes.tourTipArrow).addClass('xp-TourTipArrowBL');
          break;
        case 'Bottom Right':
          properties = {
            'left': elemLeft + elemOuterWidth - $tourTip.width() + 'px',
            'top': elemTop - $tourTip.height() + 'px',
            'z-index': '9999'
          };
          $tourTip.find('span.' + $.tourAttributes.classes.tourTipArrow).addClass('xp-TourTipArrowBR');
          break;
        case 'Left Top':
          properties = {
            'left': elemLeft + elemOuterWidth + 10 + 'px',
            'top': elemTop + 'px',
            'z-index': '9999'
          };
          $tourTip.find('span.' + $.tourAttributes.classes.tourTipArrow).addClass('xp-TourTipArrowLT');
          break;
        case 'Left Bottom':
          properties = {
            'left': elemLeft + elemOuterWidth + 'px',
            'top': elemTop + elemOuterHeight - $tourTip.height() + 'px',
            'z-index': '9999'
          };
          $tourTip.find('span.' + $.tourAttributes.classes.tourTipArrow).addClass('xp-TourTipArrowLB');
          break;
        case 'Right Top':
          properties = {
            'left': elemLeft - $tourTip.width() + 'px',
            'top': elemTop + 'px',
            'z-index': '9999'
          };
          $tourTip.find('span.' + $.tourAttributes.classes.tourTipArrow).addClass('xp-TourTipArrowRT');
          break;
        case 'Right Bottom':
          properties = {
            'left': elemLeft - $tourTip.width() + 'px',
            'top': elemTop + elemOuterHeight - $tourTip.height() + 'px',
            'z-index': '9999'
          };
          $tourTip.find('span.' + $.tourAttributes.classes.tourTipArrow).addClass('xp-TourTipArrowRB');
          break;
        case 'Top':
          properties = {
            'left': elemLeft + elemOuterWidth / 2 - $tourTip.width() / 2 - 3 + 'px',
            'top': elemTop + elemOuterHeight + 5 + 'px',
            'z-index': '9999'
          };
          $tourTip.find('span.' + $.tourAttributes.classes.tourTipArrow).addClass('xp-TourTipArrowT');
          break;
        case 'Right':
          properties = {
            'left': elemLeft - $tourTip.width() - 5 + 'px',
            'top': elemTop + elemOuterHeight / 2 - $tourTip.height() / 2 + 'px',
            'z-index': '9999'
          };
          $tourTip.find('span.' + $.tourAttributes.classes.tourTipArrow).addClass('xp-TourTipArrowR');
          break;
        case 'Bottom':
          properties = {
            'left': elemLeft + elemOuterWidth / 2 - $tourTip.width() / 2 - 3 + 'px',
            'top': elemTop - $tourTip.height() - 8 + 'px',
            'z-index': '9999'
          };
          $tourTip.find('span.' + $.tourAttributes.classes.tourTipArrow).addClass('xp-TourTipArrowB');
          break;
        case 'Left':
          properties = {
            'left': elemLeft + elemOuterWidth + 10 + 'px',
            'top': elemTop + elemOuterHeight / 2 - $tourTip.height() / 2 + 'px',
            'z-index': '9999'
          };
          $tourTip.find('span.' + $.tourAttributes.classes.tourTipArrow).addClass('xp-TourTipArrowL');
          break;
        default:
          properties = {
            'left': '50%',
            'top': '50%',
            'margin-top': ($tourTip.height() / 2) * (-1),
            'margin-left': ($tourTip.width() / 2) * (-1),
            'z-index': '9999'
          };
          break;
      }
      /*
      * If the element is not in the viewport,
      * then it scroll to the viewport before displaying the tour tip.
      */
      var windowTop = $(window).scrollTop();
      var windowBottom = $(window).scrollTop() + $(window).height();
      //To get the boundaries of element & element + tour tip.
      var elemBoundaryTop = parseFloat(properties.top, 10);
      if (elemTop < elemBoundaryTop)
        elemBoundaryTop = elemTop;
      var elemBoundaryBottom = parseFloat(properties.top, 10) + $tourTip.height();
      if ((elemTop + elemOuterHeight) > elemBoundaryBottom)
        elemBoundaryBottom = elemTop + elemOuterHeight;
      if ((elemBoundaryTop < windowTop || elemBoundaryTop > windowBottom) || (elemBoundaryBottom < windowTop || elemBoundaryBottom > windowBottom)) {
        $('html, body').stop()
                       .animate({ scrollTop: elemBoundaryTop - 13 }, 500, 'easeInOutExpo', function () {
                         //Show the new tooltip
                         $tourTip.css(properties).show();
                       });
      }
      else
        $tourTip.css(properties).show();
    }
    //Function to remove the tour tip.
    function removeTourTip() {
      $('#' + $.tourAttributes.ids.tourTip).remove();
    }
    //Function to show the tour controls.
    function showTourControls(elem) {
      var url = window.location.pathname;
      var pageName = url.substring(url.lastIndexOf('/') + 1).split('.')[0];
      if ($("#tourContainer").length >= 1) {
          return false;
      }
      //Main Div for the Tour Control.
      var $tourContainerDiv = $('<div/>')
                              .attr('id', $.tourAttributes.ids.tourContainer)
                              .attr('class', $.tourAttributes.classes.tourContainer);
      $('<p/>')
                              .attr('id', $.tourAttributes.ids.tourCtrlText)
                              .html(tourOptions.tourCtrlText)
                              .appendTo($tourContainerDiv);
      $('<span/>')
                              .attr('id', $.tourAttributes.ids.startTour)
                              .attr('class', $.tourAttributes.classes.buttonCss)
                              .html('Start the tour')
                              .appendTo($tourContainerDiv);
      //Navigation buttons Div appended to Main Div.
      var $navigationDiv = $('<div/>')
                              .attr('class', $.tourAttributes.classes.navigationDivCss)
                              .appendTo($tourContainerDiv);

      $('<span/>')
                              .attr('id', $.tourAttributes.ids.prevStep)
                              .attr('class', $.tourAttributes.classes.buttonCss)
                              .html('<i class="fa fa-angle-double-left" aria-hidden="true"></i> Previous')
                              .attr('style', 'display:none')
                              .appendTo($navigationDiv);

      $('<span/>')
                              .attr('id', $.tourAttributes.ids.nextStep)
                              .attr('class', $.tourAttributes.classes.buttonCss)
                              .html('Next <i class="fa fa-angle-double-right" aria-hidden="true"></i>')
                              .attr('style', 'display:none')
                              .appendTo($navigationDiv);
      
      //Close button for the Tour Control.
      $('<span/>')
                              .attr('id', $.tourAttributes.ids.endTour)
                              .attr('class', $.tourAttributes.classes.endTour)
                              .html('x')
                              .appendTo($tourContainerDiv);
      //Adding the Main Div of Tour control to body.
      $('BODY').prepend($tourContainerDiv);
      $('#' + $.tourAttributes.ids.tourContainer).animate({ 'right': '20px' }, 500);
    }
    //Function to remove the tour container ie, tour controls.
    function removeTourControls() {
      $('#' + $.tourAttributes.ids.tourContainer).remove();
    }
    //Function to bind the click event for tour icon.
    function bindTourClick() {
      $('#' + tourOptions.tourId).click(function () {
        $(this).tour();
      });
    }
    //To start (or) end the tour and to navigate the steps.
    function bindButtonsClick() {
      $('#' + $.tourAttributes.ids.startTour).click(function () { activateTour(); });
      $('#' + $.tourAttributes.ids.endTour).click(function () { closeTour(); });
      $('#' + $.tourAttributes.ids.nextStep).click(function () { goNextStep(); });
      $('#' + $.tourAttributes.ids.prevStep).click(function () { goPreviousStep(); });
    }
    return this.each(function () {
      var $ele = $(this);
      tourOptions.tourId = $ele.context.id;
      //Unbinding the click event to avoid further clicks.
      $('#' + tourOptions.tourId).unbind('click');
      showTourControls($ele);
      //Invoking function to bind the event handler for buttons.
      bindButtonsClick();
    });
  }
})(jQuery);