//$(document).ready(function () {

//});


function Loadpage(id) {

  $("#" + id).load("/_layouts/XPointBase/pages/" + id + ".aspx", function () {

  });
}


function LoadProjectList(id, view) {
  var d = Date.now();
  $("#" + id).empty();
  $("#" + id).load("/_layouts/XPointBase/pages/MyProjectData.aspx?view=" + view + "&t=" + d, function () {
  });
}

function loadIframe(view) {
  $("li.active").removeClass("active").addClass("act");
  $("#" + view).addClass("active");
  $("li.myproject").addClass("active");
  document.getElementById('ContentPage11').src = "/_layouts/XPointBase/pages/MyProjectContent.aspx?view=" + view;
}