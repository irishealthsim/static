$(document).ready(function () {
    /*var mainLayout = $("<div id='mainLayoutId'></div>");*/

    $("#top_SoBP").hover(function () {

        $.ajax({
            url: "/_layouts/IImpact.Web/SOBPResourceLinkService.asmx/GetSobpResourceLinks",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            type: 'POST',
            data: "",
            success: function (datap) {
                var data = datap.d;
                if ($(".tooltiptextINACSL").length > 0) {
                    $(".tooltiptextINACSL").remove();
                }
                var tooltiptext = $("<span class='tooltiptextINACSL'></span>");
                for (var i = 0; i < data.length; i++) {
                    var subItem = $("<a target='_blank' href='" + data[i].linkHref + "' title='" + data[i].linkHoverNote + "'>" + data[i].linkDisplayName + "</a>");
                    tooltiptext.append(subItem);
                }
                $("#top_SoBP").append(tooltiptext);
            }
        });
    }, function () {
        $(".tooltiptextINACSL").remove();
    });
});