var UserData;
function loadProfile(result) {
    var mainlayout = document.getElementById("mainLayout");

    var layout = '<div class="col-md-12">'
    layout += '<div class="col-md-2 col-xs-2 noPadding">'
    layout += "<img src=" + result.profilePic + "  width='100%' id='profilePicture'>"
    layout += '</div>'

    layout += '<div class="col-md-10 col-xs-10" >'
    layout += '<h1 class="profileName">' + result.name + '</h1>'
    layout += '<div class="col-md-4">'
    layout += '<div class="group">'
    layout += '<span class="title">Designation :</span>'
    layout += '<span class="values">' + result.designation + '</span>'
    layout += '</div>'

    layout += '<div class="group">'
    layout += '<span class="title">Reporting Manager :</span>'
    layout += '<span class="values">' + result.manager + '</span>'
    layout += '</div>'

    layout += '<div class="group">'
    layout += '<span class="title">Function :</span>'
    layout += '<span class="values">' + result.functions + '</span>'
    layout += '</div>'
    layout += '</div>'

    layout += '<div class="col-md-3">'
    layout += '<div class="group">'
    layout += '<span class="title">Group :</span>'
    layout += '<span class="values">' + result.group + '</span>'
    layout += '</div>'

    layout += '<span class="title">Site :</span>'
    layout += '<span class="values">' + result.site + '</span>'
    layout += '</div>'


    layout += '<div class="col-md-5">'
    layout += '<h4 class="heading">Contact Information</h4>'
    layout += '<li>' + '<i class="fa fa-envelope gray"></i>' + '<span class="contact">' + result.email + '</span>' + '</li>'
    layout += '<li>' + '<i class="fa fa-phone gray"></i>' + '<span class="contact">' + result.deskNumber + '</span>' + '</li>'
    layout += '<li>' + '<i class="fa fa-mobile gray"></i>' + '<span class="contact">' + result.mobile + '</span>' + '</li>'
    layout += '</div>'



    var personalInfo = '<div class="col-md-12 secondSection">'
    personalInfo += '<h4 class="heading">Personal Information </h4>'
    personalInfo += '<div class="outerBorder">'
    personalInfo += '<div class="col-md-6">'
    personalInfo += '<span class="title">About Me :</span>'
    personalInfo += '<div class="description">' + result.aboutMe + '</div>'

    personalInfo += '<span class="title">Interests :</span>'
    personalInfo += '<div class="description">' + result.interests + '</div>'
    personalInfo += '</div>'


    personalInfo += '<div class="col-md-6">'
    personalInfo += '<span class="title">Responsibilities :</span>'
    personalInfo += '<div class="description">' + result.responsibilities + '</div>'

    personalInfo += '<span class="title">Skills :</span>'
    personalInfo += '<div class="description">' + result.skills + '</div>'
    personalInfo += '</div>'
    personalInfo += '</div>'


    $(mainlayout).append($(layout));
    $(mainlayout).append($(personalInfo));


};

function loadFrenchProfile(result)
{
    var mainlayout = document.getElementById("mainLayout");

    var layout = '<div class="col-md-12">'
    layout += '<div class="col-md-2 col-xs-2 noPadding">'
    layout += "<img src=" + result.profilePic + "  width='100%' id='profilePicture'>"
    layout += '</div>'

    layout += '<div class="col-md-10 col-xs-10" >'
    layout += '<h1 class="profileName">' + result.name + '</h1>'
    layout += '<div class="col-md-4">'
    layout += '<div class="group">'
    layout += '<span class="title">Désignation :</span>'
    layout += '<span class="values">' + result.designation + '</span>'
    layout += '</div>'

    layout += '<div class="group">'
    layout += '<span class="title">Gestionnaire de rapports :</span>'
    layout += '<span class="values">' + result.manager + '</span>'
    layout += '</div>'

    layout += '<div class="group">'
    layout += '<span class="title">Fonction :</span>'
    layout += '<span class="values">' + result.functions + '</span>'
    layout += '</div>'
    layout += '</div>'

    layout += '<div class="col-md-3">'
    layout += '<div class="group">'
    layout += '<span class="title">Groupe :</span>'
    layout += '<span class="values">' + result.group + '</span>'
    layout += '</div>'

    layout += '<span class="title">Site :</span>'
    layout += '<span class="values">' + result.site + '</span>'
    layout += '</div>'

    layout += '<div class="col-md-5">'
    layout += '<h4 class="heading">Coordonnées de contact</h4>'
    layout += '<li>' + '<i class="fa fa-envelope gray"></i>' + '<span class="contact">' + result.email + '</span>' + '</li>'
    layout += '<li>' + '<i class="fa fa-phone gray"></i>' + '<span class="contact">' + result.deskNumber + '</span>' + '</li>'
    layout += '<li>' + '<i class="fa fa-mobile gray"></i>' + '<span class="contact">' + result.mobile + '</span>' + '</li>'
    layout += '</div>'

    var personalInfo = '<div class="col-md-12 secondSection">'
    personalInfo += '<h4 class="heading">Coordonnées personnelles </h4>'
    personalInfo += '<div class="outerBorder">'
    personalInfo += '<div class="col-md-6">'
    personalInfo += '<span class="title">À propos de moi :</span>'
    personalInfo += '<div class="description">' + result.aboutMe + '</div>'

    personalInfo += '<span class="title">Intérêts :</span>'
    personalInfo += '<div class="description">' + result.interests + '</div>'
    personalInfo += '</div>'

    personalInfo += '<div class="col-md-6">'
    personalInfo += '<span class="title">Responsabilités :</span>'
    personalInfo += '<div class="description">' + result.responsibilities + '</div>'

    personalInfo += '<span class="title">Compétences :</span>'
    personalInfo += '<div class="description">' + result.skills + '</div>'
    personalInfo += '</div>'
    personalInfo += '</div>'

    $(mainlayout).append($(layout));
    $(mainlayout).append($(personalInfo));
}