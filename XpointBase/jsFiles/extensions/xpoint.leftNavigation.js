function loadLeftNagivationControl() {

  var results = '';
  results = new RegExp('[\?&]Section=([^&#]*)').exec(window.location.href);

  var queryString = '';

  if (results != null) {
    queryString = results[1]; ;
  } else {
    queryString = checkSelectedUrl();
  }

  $("#leftNavigationId").load("/_layouts/XpointBase/pages/LeftNavigationControl.aspx?section=" + queryString);

  GetSectionDisplayName(queryString);

}

function checkSelectedUrl() {

  var currentUrl = window.location.href;
  var section = '';
  var myProject = "MyProject.aspx";
  var createNewProject = "CreateNewProject";
  var defaultPage = "homeUpdates";


  if (currentUrl.indexOf(myProject) >= 0) {
    section = "MyPortfolio";
  } else if (currentUrl.indexOf(createNewProject) >= 0) {

    section = "createproject";
  } else {
    section = defaultPage;
  }

  return section;
}

function GetSectionDisplayName(sectionName) {


  $.ajax({
    type: "POST",
    url: "/_layouts/IImpact.Web/UserPostsService.asmx/GetSectionDisplayName",
    data: '{"queryString":"' + sectionName + '"}',
    contentType: 'application/json; charset=utf-8',
    dataType: "JSON",
    success: function (result) {

      $("#SelectedSectionId").text(result.d);


    }
  });



}

function loadRecentlyAccessedProjects() {

  $("#recentlyAccessedProjectId").load();

}

