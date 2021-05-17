function newFunctionalityUpdateAlert() {
        var galleryImage = [];
        $.ajax({
            url: "/_layouts/IImpact.Web/LifeCycleService.asmx/GetUpgradePopUpImages",
            dataType: 'json',
            data: '{}',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            success: function (datap) {
                if (datap.d != 0) {
                    var data = datap.d;

                    $.each(data, function (i) {
                        galleryImage.push(data[i]);
                    });

                    var mainLayout = $("<div id='updateSlider' class='fullscreen'/>");
                    var skipButton = $("<span id='skipButton'>Skip</span>");
                    var nextButton = $("<span id='nextButton'>Next</span>");
                    var okGotItButton = $("<span id='endButton'>Ok, got it</span>");
                    var startTour = $("<span id='startButton' class='startbtn'>Start</span>");
                    var welcomeImage = $("<img class='ns-img' src='/_layouts/Images/XPointBase/newFunctionalityAlert.png'></img>");
                    var buttonControlArea = $("<div id='buttonClass'>");
                    var imageArea = $("<div id='slider-inner'>");

                    $("body").append(mainLayout);
                    $("#updateSlider").append(imageArea);
                    $("#updateSlider").append(buttonControlArea);
                    //var galleryImage = new Array("img/mock-41.jpg", "img/mock-42.jpg", "img/mock-43.jpg");
                    $("#slider-inner").append(welcomeImage);
                    $("#buttonClass").append(skipButton);
                    $("#buttonClass").append(startTour);

                    $("#startButton").click(function () {
                        $(".startbtn").remove();
                        $("#slider-inner >img").remove();
                        var imageDiv = $("<img class='ns-img' id='nsImg' src='" + galleryImage[0] + "'></img>");
                        $("#slider-inner").append(imageDiv);
                        imageDiv.hide().animate({ left: 200, opacity: "show" }, 2000);
                        var i = 1;
                        if (i < galleryImage.length) {
                            $("#buttonClass").append(skipButton);
                            $("#buttonClass").append(nextButton);
                        }
                        /*on click*/
                        $("#nextButton").click(function (e) {
                            $("#slider-inner >img").remove();
                            var introImage = $("<img class='ns-img' id='nsImg' src='" + galleryImage[i] + "'></img>");
                            $("#slider-inner").append(introImage);
                            introImage.hide().animate({ left: 200, opacity: "show" }, 2000);
                            if (i == galleryImage.length - 1) {
                                $("#buttonClass > span").remove();
                                $("#buttonClass").append(okGotItButton);
                            }
                            i = i + 1;
                        });
                    });
                    /**/
                    skipButton.click(function () {
                        $("#updateSlider").remove();
                    });
                    /**/
                    okGotItButton.click(function (e) {
                        $("#updateSlider").remove();
                    });
                }
            }
        });
    }