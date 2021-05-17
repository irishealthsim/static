
function DuplicateProject(trackerid) {
    var DuplicateItem = "<div class='DuplicateContent'>";
    DuplicateItem += " <span class='helper'></span>";
    DuplicateItem += "<div>";
    DuplicateItem += "<div class='popupCloseButton'><i class='fas fa-times' class='popupClose'></i></div>";
    DuplicateItem += "<div class='modal-content' id='DuplicateItem' style='height:auto;border-radius: 0px; border: 0px;text-align:left;'>";
    DuplicateItem += "<div class='modal-header'>";
    DuplicateItem += "<h4 class='modal-title' style='color: #33AEDC;font-weight: 600;'>Duplicate the Item</h4>";
    DuplicateItem += "</div>";

    DuplicateItem += "<div class='modal-body'>";
    DuplicateItem += "<p class='duplicateMessage'>Duplication will take a few minutes as all the data is moved across. You will be notified when it is done.</p>";
    DuplicateItem += "<center><img class='duplicateProcess' src='/_layouts/IMAGES/Xpointbase/xpoint-progress-bar.gif' ></center>";
    DuplicateItem += "</div>";

    DuplicateItem += "<div class='DuplicateButtonSection'>";
    DuplicateItem += "<button id='DuplicateProcess' class='xpThemeButton ui-tabbuttonstyle ui-corner-all xp-NewButton xp-MarginRight-10'>Duplicate</button>";
    DuplicateItem += "<button class='cancelButton ui-tabbuttonstyle ui-corner-all xp-NewButton'>Cancel</button>";
    DuplicateItem += "</div>";

    DuplicateItem += "</div>";
    DuplicateItem += "</div>";
    DuplicateItem += "</div>";

    if ($(".DuplicateContent").length > 0) {
        $("#DuplicateMainContent > .DuplicateContent").remove();
    }
    $("body").append(DuplicateItem);
    $(".duplicateProcess").hide();
    $('.popupCloseButton').click(function () {
        $('.DuplicateContent').remove();
    });

    $(".cancelButton").click(function () {
        $('.DuplicateContent').remove();
    });

    $('#DuplicateProcess').click(function () {
        $(".popupCloseButton").hide();
        $(".duplicateMessage").remove();
        $(".duplicateProcess").show();
        $(".DuplicateButtonSection").remove();
        $(".modal-body").append("<center><p id='duplicateProcessMessage'>Duplicating the item</p></center>");
        $.ajax({
            url: "/_layouts/IImpact.Web/DuplicateItemDataService.asmx/Duplicate",
            contentType: "application/json; charset=utf-8",
            type: "post",
            dataType: "json",
            data: "{trackerid:'" + trackerid + "'}",
            success: function (data) {
                $('.modal-title').text("Success - the Item is Duplicated!");
                $('.modal-body').append("<p>The duplicate item can be accessed here:</p>" + data.d);
                $(".duplicateProcess").remove();
                $("#duplicateProcessMessage").remove();
                $(".popupCloseButton").attr('disabled', 'false');
                $(".popupCloseButton").show();
                $(".DuplicateButtonSection").hide();
            }
        });

    });
}

function fr_DuplicateProject(trackerid) {
    var DuplicateItem = "<div class='DuplicateContent'>";
    DuplicateItem += " <span class='helper'></span>";
    DuplicateItem += "<div>";
    DuplicateItem += "<div class='popupCloseButton'><i class='fas fa-times' class='popupClose'></i></div>";
    DuplicateItem += "<div class='modal-content' id='DuplicateItem' style='height:auto;border-radius: 0px; border: 0px;text-align:left;'>";
    DuplicateItem += "<div class='modal-header'>";
    DuplicateItem += "<h4 class='modal-title' style='color: #33AEDC;font-weight: 600;'>Dupliquer l'article</h4>";
    DuplicateItem += "</div>";

    DuplicateItem += "<div class='modal-body'>";
    DuplicateItem += "<p class='duplicateMessage'>La duplication prendra quelques minutes à mesure que toutes les données sont déplacées. Vous serez averti quand cela sera fait.</p>";
    DuplicateItem += "<center><img class='duplicateProcess' src='/_layouts/IMAGES/Xpointbase/xpoint-progress-bar.gif' ></center>";
    DuplicateItem += "</div>";

    DuplicateItem += "<div class='DuplicateButtonSection'>";
    DuplicateItem += "<button id='DuplicateProcess' class='xpThemeButton ui-tabbuttonstyle ui-corner-all xp-NewButton xp-MarginRight-10'>Dupliquer</button>";
    DuplicateItem += "<button class='cancelButton ui-tabbuttonstyle ui-corner-all xp-NewButton'>Annuler</button>";
    DuplicateItem += "</div>";

    DuplicateItem += "</div>";
    DuplicateItem += "</div>";
    DuplicateItem += "</div>";

    if ($(".DuplicateContent").length > 0) {
        $("#DuplicateMainContent > .DuplicateContent").remove();
    }
    $("body").append(DuplicateItem);
    $(".duplicateProcess").hide();
    $('.popupCloseButton').click(function () {
        $('.DuplicateContent').remove();
    });

    $(".cancelButton").click(function () {
        $('.DuplicateContent').remove();
    });

    $('#DuplicateProcess').click(function () {
        $(".popupCloseButton").hide();
        $(".duplicateMessage").remove();
        $(".duplicateProcess").show();
        $(".DuplicateButtonSection").remove();
        $(".modal-body").append("<center><p id='duplicateProcessMessage'>Duplication de l'article</p></center>");
        $.ajax({
            url: "/_layouts/IImpact.Web/DuplicateItemDataService.asmx/Duplicate",
            contentType: "application/json; charset=utf-8",
            type: "post",
            dataType: "json",
            data: "{trackerid:'" + trackerid + "'}",
            success: function (data) {
                $('.modal-title').text("Succès - l'article est dupliqué!");
                $('.modal-body').append("<p>L'élément en double est accessible ici:</p>" + data.d);
                $(".duplicateProcess").remove();
                $("#duplicateProcessMessage").remove();
                $(".popupCloseButton").attr('disabled', 'false');
                $(".popupCloseButton").show();
                $(".DuplicateButtonSection").hide();
            }
        });

    });
}



