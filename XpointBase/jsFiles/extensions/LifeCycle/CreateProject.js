//$(document).ready(function () {

//});
var titleErrorMsg;
function LoadXpointProjectControl(cType, TitleEmptyMsg) {
    titleErrorMsg = TitleEmptyMsg;
    $("#basicDetails").append("<div id='relayAjaxLoading'><div class='xp-Width xp-TextAlignCenter xp-Height100' style='top: 10%;left: 0px;margin-top:10px;'><img src='/_layouts/Images/XPointBase/xp-loader.gif'style='z-index:999999999;text-align:center;'/></div></div>");
    $("#basicDetails").load("/_layouts/XPointBase/pages/BaseCreateProject.aspx?ItemType=" + cType);
   
}

function LoadEquipProjectControl(cType) {
    /*ajax call to load the equip client page reference from EquipClientData list*/
    $.ajax({
        type: "POST",
        url: "/_layouts/IImpact.Web/LifeCycleService.asmx/GetEquipControlPage",
        data: "{contentType:'" + cType + "' }",
        contentType: 'application/json; charset=utf-8',
        dataType: "JSON",
        success: function (result) {
            $("#sliderControl").append("<div id='relayAjaxLoading'><div class='xp-Width xp-TextAlignCenter xp-Height100' style='top: 10%;left: 0px;margin-top:10px;'><img src='/_layouts/Images/XPointBase/xp-loader.gif'style='z-index:999999999;text-align:center;'/></div></div>");
            $("#sliderControl").load(result.d + "?ItemType=" + cType);
        }
    });
}

function LoadSearchEngine(cType) {
    $("#searchengine").load("/_layouts/XPointBase/pages/SearchProjectOwner.aspx?ItemType=" + cType);
}

function LoadServices() {
    $("#Services").load("/_layouts/XPointBase/pages/Services.aspx", function () {
    });
}


function LoadDropDown(divid, mname, selectedVlaue) {
    $.ajax({
        type: 'POST',
        url: "/_layouts/XPointBase/pages/BaseCreateProjectHandler.aspx/" + mname,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: '{"selectedVlaue":"' + selectedVlaue + '"}',
        cache: false,
        error: function (xhr, status, errorThrown) {
            alert("Error " + status);
        },
        success: function (response, status) {
            //alert(response.d);
            document.getElementById(divid).innerHTML = response.d;
            //$('#' + divid).HTML = response.d;
        }
    });

}

function SaveProjects() {
    if ($("#relayAjaxLoading").length > 0) { $("#relayAjaxLoading").remove(); }
    $("#basicDetails").append("<div id='relayAjaxLoading'><div class='xp-Width xp-TextAlignCenter xp-Height100 xp-relayAjaxLoader'><img src='/_layouts/Images/XPointBase/xp-loader.gif'style='z-index:999999999;text-align:center;'/></div></div>");
    try {
        document.getElementById("Slidervalue").value = $("#slider :input:checked").val();
    }
    catch (e) {
    }
    if ($('#banner').val() == '') {
        $("#relayAjaxLoading").remove();
        document.getElementById("titleErrorText").innerHTML = TitleEmptyMsg+".";
        return false;
    }
    try {
        var descriptionVal = tinyMCE.get('richTextDescription').getContent();
        $('#description').val(descriptionVal);
    }
    catch (ex) { }

    $.ajax({
        type: 'POST',
        url: "/_layouts/XPointBase/pages/BaseCreateProjectHandler.aspx/SaveNewProjectItem",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
            name: $('#newProjectIdentifier').serialize(), description: $('#description').val()
        }),
        cache: false,
        error: function (xhr, status, errorThrown) {
            //alert("Error saving Profile");
        },
        success: function (response, status) {
            // var ua = window.navigator.userAgent;
            //var msie = ua.indexOf("MSIE ");
            var result = jQuery.parseJSON(response.d);
            if (result.RetStatus == 0) {
                $('#txtSearch').css('pointer-events', 'none');
                $('#basicDetails').css('pointer-events', 'none');
                if (result.isEquip) {
                    $("#relayAjaxLoading").remove();
                    var span = $("<span id='portfolioId' ></span>");
                    $("#centerPanelId").html(span);
                    span.load(result.URL);
                }
                else {
                    $("#relayAjaxLoading").remove();
                    window.location = result.URL;
                }
            }
            else {
                $("#relayAjaxLoading").remove();
                document.getElementById("titleErrorText").innerHTML = "An Item with this name already exists that you do not have access to.<br/> Change the Item name slightly";
                document.getElementById("runme").innerHTML('<script>' + eval(response.d) + '</script>');
            }
        }
    });
}

function clearProjectData() {
    $('#newProjectIdentifier').each(function () {
        $("#erorrMessage").remove();
    this.reset();
  });
  $('select.form-control').each(function () {
    var select = $(this);
    $(select).children('option:selected').each(function () {
      $(this).empty().append('<option value="">- - Select - -</option>');
    });
  });
}

function clearOverlay() {
    $("#txtSearch").val("").removeClass("xp-owner-overlay");
    $("#textbox-wrapper").find("span").remove();
    //$("#txtSearch").prop("readonly", false);
    $("#txtSearch").attr("readonly", false);
}

function GetSimilarProject() {
    $.ajax({
        url: "/_layouts/IImpact.Web/LifeCycleService.asmx/GetSimilarIdeas",
        contentType: "application/json; charset=utf-8",
        type: "post", dataType: "json", data: "{input:'" + $("#banner").val() + "'}",
        success: function (datap, st) {
            var data = datap.d;
            if (data.length > 0) {
                $("#projectSuggestion").append(data).css('border', '1px solid gray');
                //setTimeout(function(){$('#projectSuggestion').hide();}, 10000);
            }
            return false;
        }
    });
}