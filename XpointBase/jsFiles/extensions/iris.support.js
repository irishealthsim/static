(function ($) {

    $.fn.support = function (options) {
        //Extending the default Options.
        var defaults = {};
        var Options = $.extend(defaults, options);

        return this.each(function () {
            var $ele = $(this);
            createHTML($ele);
        });

        function createHTML(elem) {
            var Support = "<div class='privacyContent'>";
            Support += " <span class='helper'></span>";
            Support += "<div>";
            Support += "<div class='popupCloseButton'><i class='fa fa-times' aria-hidden='true'></i></div>";
            Support += "<div class='modal-contents' id='privacyPolicy' style='height:550px;border-radius: 0px; border: 0px;text-align:left;'>";
            Support += "<div class='modal-header'>";
            Support += "<h4 class='modal-title' style='color: #33AEDC;font-weight: 600;'>Request for Support</h4>";
            Support += "</div>";

            Support += "<div class='modal-body'>";
            Support += "<div class='support-body'>";
            Support += "<form>";
            Support += "<p style='margin-bottom:10px !important'>We are keen to help you with your support question or issue. Please use the prompts below to provide any feedback that will help us to solve your question/ issue as soon as possible!</p>";
            Support += "<div class='form-group'><p>Type of support needed : <span style='color:red'>*</span></p>";
            Support += "<select required='true' class='form-control' id='supportOption' >";
            Support += "<option></option>";
            Support += "<option>How to use iRIS</option>";
            Support += "<option>Bug/ Technical Issue (Problem)</option>";
            Support += "<option>Usability</option>";
            Support += "<option>Future Request</option>";
            Support += "<option>Sales Question</option>";
            Support += "<option>User Access</option>";
            Support += "<option>Other Support Needed</option>";
            Support += "</select></div>";

            Support += "<p style='margin-top:15px !important;float:left;'>Describe the question or bug: <span style='color:red'>*</span></p>";
            Support += "<textarea rows='4' id='supportDescription' placeholder='Please describe the Question/ issue...If a Bug, please include link to the item/page concerned, user(s) experiencing issue' required='true'></textarea>";

            Support += "<p style='margin-top:15px !important;float:left;'>If a Bug, please help us to replicate it quickly: </p>";
            Support += "<textarea rows='4' id='supportSteps' placeholder='Please describe the steps/actions that created the issue'></textarea>";

            Support += "<p style='margin-top:15px !important;float:left;'>If a Bug, what browser is this happening in?</p>";
            Support += "<input type='text' id='browser' name='browser' class='form-control' placeholder='Example: IE9, IE10, Edge, Chrome, Firefox, Safari'>";

            Support += "<div class='form-group'  style='margin-top:15px !important;' >";
            Support += "<input type='submit' name='send' value='Send' id='sendSupport' class='xpThemeButton ui-tabbuttonstyle ui-corner-all xp-NewButton' style='margin-right:10px;'>";
            Support += "<input type='button' name='send' value='Cancel' class='cancelButton ui-tabbuttonstyle ui-corner-all xp-NewButton'>";
            Support += "</div>";
            Support += "</form>";
            Support += "</div>";
            Support += "</div>";
            Support += "</div>";
            Support += "</div>";
            Support += "</div>";


            $("#SupportRequest").append($(Support));
            $('.privacyContent').show();
            $("#privacyPolicy").slideDown()
            $('.popupCloseButton').click(function () {
                $("#privacyPolicy").slideUp(50000)
                $('.privacyContent').remove();

            });

            $("#sendSupport").unbind('click').click(function (e) {

                var mailInfo = {};
                mailInfo.typeOfSupport = $("#supportOption").children("option:selected").val();
                mailInfo.description = $("#supportDescription").val();
                mailInfo.stepstorecreate = $("#supportSteps").val();
                mailInfo.browser = $("#browser").val();

                if (mailInfo.typeOfSupport != "" && mailInfo.description != "") {
                    $.ajax({
                        url: "/_layouts/IImpact.Web/iRISSupportService.asmx/sendSupportMail",
                        contentType: "application/json; charset=utf-8",
                        type: "post",
                        dataType: "json",
                        async: false,
                        data: JSON.stringify({ 'mailInfo': mailInfo, }),
                        success: function (datap) {
                            var data = datap.d;
                            if (data == true) {
                                $("#privacyPolicy").animate({ height: 150 }, 1000);
                                $(".modal-body").empty();
                                $(".modal-body").css("padding", "0");
                                var success = $("<h4 style='text-align:left;color:#000;margin-left:15px;'>Your request for support has been sent... our Support Teams will respond shortly...</h4>");
                                $(".modal-body").append(success);
                                setTimeout(function () {
                                    $('.privacyContent').remove();
                                }, 4000);
                            }
                            else {
                                $("#privacyPolicy").animate({ height: 100 }, 1000);
                                $(".modal-body").empty();
                                $(".modal-body").css("padding", "0");
                                var failure = $("<h4 style='text-align:left;color:#000;margin-left:15px;'>Oops - your email request for support did not send! Please re-submit it.</h4>");
                                $(".modal-body").append(failure);
                                setTimeout(function () {
                                    $('.privacyContent').remove();
                                }, 4000);
                            }
                            return true;
                        }
                    });
                }
            });

            $('.cancelButton').click(function () {
                $("#privacyPolicy").slideUp(50000)
                $('.privacyContent').remove();

            });
        }
    }
})(jQuery);