(function ($) {

    $.fn.fr_support = function (options) {
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
            Support += "<h4 class='modal-title' style='color: #33AEDC;font-weight: 600;'>Demande d'assistance</h4>";
            Support += "</div>";

            Support += "<div class='modal-body'>";
            Support += "<div class='support-body'>";
            Support += "<form>";
            Support += "<p style='margin-bottom:10px !important'>Nous sommes à votre disposition pour répondre à vos questions ou problèmes. Veuillez utiliser les invites ci-dessous pour nous faire part de vos commentaires qui nous aideront à résoudre votre question ou votre problème dans les plus brefs délais !</p>";
            Support += "<div class='form-group'><p>Type d'assistance nécessaire: <span style='color:red'>*</span></p>";
            Support += "<select required='true' class='form-control' id='supportOption' >";
            Support += "<option></option>";
            Support += "<option>Comment utiliser iRIS</option>";
            Support += "<option>Bogue/Problème technique (problème)</option>";
            Support += "<option>Convivialité</option>";
            Support += "<option>Demande future</option>";
            Support += "<option>Question concernant les ventes</option>";
            Support += "<option>Accès utilisateur</option>";
            Support += "<option>Autre assistance nécessaire</option>";
            Support += "</select></div>";

            Support += "<p style='margin-top:15px !important;float:left;'>Décrire la question ou le bogue: <span style='color:red'>*</span></p>";
            Support += "<textarea rows='4' id='supportDescription' placeholder='Veuillez détailler la question/le problème'il s'agit d'un bogue, veuillez inclure un lien vers le produit ou la page concernée, l'utilisateur (ou les utilisateurs) rencontrant le problème' required='true'></textarea>";

            Support += "<p style='margin-top:15px !important;float:left;'>Si c'est un bogue, veuillez nous aider à le reproduire rapidement: </p>";
            Support += "<textarea rows='4' id='supportSteps' placeholder='Veuillez décrire les étapes/actions qui ont créé le problème'></textarea>";

            Support += "<p style='margin-top:15px !important;float:left;'>Si c'est un bogue, dans quel navigateur cela se passe-t-il?</p>";
            Support += "<input type='text' id='browser' name='browser' class='form-control' placeholder='Exemple: IE9, IE10, Edge, Chrome, Firefox, Safari'>";

            Support += "<div class='form-group'  style='margin-top:15px !important;' >";
            Support += "<input type='submit' name='send' value='Envoyer' id='sendSupport' class='xpThemeButton ui-tabbuttonstyle ui-corner-all xp-NewButton' style='margin-right:10px;'>";
            Support += "<input type='button' name='send' value='Annuler' class='cancelButton ui-tabbuttonstyle ui-corner-all xp-NewButton'>";
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
                                var success = $("<h4 style='text-align:left;color:#000;margin-left:15px;'>Votre demande d'assistance a été envoyée ... nos équipes d'assistance vous répondront sous peu ...</h4>");
                                $(".modal-body").append(success);
                                setTimeout(function () {
                                    $('.privacyContent').remove();
                                }, 4000);
                            }
                            else {
                                $("#privacyPolicy").animate({ height: 100 }, 1000);
                                $(".modal-body").empty();
                                $(".modal-body").css("padding", "0");
                                var failure = $("<h4 style='text-align:left;color:#000;margin-left:15px;'>Oups - votre demande d'assistance par e-mail n'a pas été envoyée! Veuillez le soumettre à nouveau.</h4>");
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