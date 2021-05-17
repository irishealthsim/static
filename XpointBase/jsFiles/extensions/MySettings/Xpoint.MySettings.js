function loadData(userInfo) {

    /*Add the userinfo values to the input fields of the page*/
    $("#roleInput").val(userInfo.designation);
    $("#roleInput").prev().html(userInfo.designation);
    $("#groupInput").val(userInfo.group);
    $("#groupInput").prev().html(userInfo.group);
    $("#siteInput").val(userInfo.site);
    $("#siteInput").prev().html(userInfo.site);
    $("#functionInput").val(userInfo.functions);
    $("#functionInput").prev().html(userInfo.functions);
    $("#reportingManagerInput").val(userInfo.reportingManager);
    $("#reportingManagerInput").prev().html(userInfo.reportingManager);
    $("#deskNumberInput").val(userInfo.deskNumber);
    $("#deskNumberInput").prev().html(userInfo.deskNumber);
    $("#mobileNumberInput").val(userInfo.mobileNumber);
    $("#mobileNumberInput").prev().html(userInfo.mobileNumber);
    $("#emailInput").val(userInfo.email);
    $("#emailInput").prev().html(userInfo.email);
    $("#faxInput").val(userInfo.fax);
    $("#faxInput").prev().html(userInfo.fax);
    $("#firstName").html(userInfo.firstName);
    $("#lastName").html(userInfo.lastName);
    $("#profilePic").attr('src', userInfo.profilePic);
    $("#firstNameEdit").val(userInfo.firstName);
    $("#lastNameEdit").val(userInfo.lastName);
    $("#aboutMeInput").val(userInfo.aboutMe);
    $("#aboutMeInput").prev().html(userInfo.aboutMe);
    $("#responsibilitiesInput").val(userInfo.responsibilities);
    $("#responsibilitiesInput").prev().html(userInfo.responsibilities);
    $("#interestsInput").val(userInfo.interests);
    $("#interestsInput").prev().html(userInfo.interests);
    $("#skillsInput").val(userInfo.skills);
    $("#skillsInput").prev().html(userInfo.skills);


    /*on submit of workProfile section*/
    $("#workProfileSubmit").click(function (e) {
        e.preventDefault();
        var personalInfoObject = {};
        var data = {};
        personalInfoObject.designation = $("#roleInput").val();
        personalInfoObject.group = $("#groupInput").val();
        personalInfoObject.site = $("#siteInput").val();
        personalInfoObject.functions = $("#functionInput").val();
        personalInfoObject.reportingManager = $("#reportingManagerInput").attr('userid');
        data.userNameInfo = personalInfoObject;
        $.ajax({
            url: "/_layouts/IImpact.Web/MySettingsService.asmx/SaveWorkProfile",
            contentType: "application/json; charset=utf-8",
            type: "post",
            async: false,
            dataType: "json",
            data: JSON.stringify(data),
            success: function (datap) {
                $("#workProfileForm").append($("<div class='xp-successMessage' id='successOverlay'><p id='text'>Updated successfully</p></div>"))
                $(".xp-successMessage").fadeOut(5000);
                /*1. Disbale the submit and reset button
                2. display the p tag and add entered data to p tag*/
                $("#workProfileForm").children().find('p').attr('style', 'display:block');
                $("#workProfileForm").children().find('input').attr('style', 'display:none');
                $("#roleInput").prev().text(personalInfoObject.designation);
                $("#groupInput").prev().text(personalInfoObject.group);
                $("#siteInput").prev().text(personalInfoObject.site);
                $("#functionInput").prev().text(personalInfoObject.functions);
                $("#reportingManagerInput").prev().html($("#reportingManagerInput").val());
                $("#workProfileForm > .btn").prop("disabled", "false");
            }
        });
    });

    /*on submit of contact information section*/
    $("#contactInfoSubmit").click(function (e) {
        e.preventDefault();
        var personalInfoObject = {};
        var data = {};
        personalInfoObject.deskNumber = $("#deskNumberInput").val();
        personalInfoObject.mobileNumber = $("#mobileNumberInput").val();
        personalInfoObject.email = $("#emailInput").val();
        personalInfoObject.fax = $("#faxInput").val();
        data.userNameInfo = personalInfoObject;
        $.ajax({
            url: "/_layouts/IImpact.Web/MySettingsService.asmx/SaveContactInfo",
            contentType: "application/json; charset=utf-8",
            type: "post",
            async: false,
            dataType: "json",
            data: JSON.stringify(data),
            success: function (datap) {
                $("#ContactInfoForm").append($("<div class='xp-successMessage' id='successOverlay'><p id='text'>Updated successfully</p></div>"))
                $(".xp-successMessage").fadeOut(5000);
                /*1. Disbale the submit and reset button
                2. display the p tag and add entered data to p tag*/
                $("#ContactInfoForm").children().find('p').attr('style', 'display:block');
                $("#ContactInfoForm").children().find('input').attr('style', 'display:none');
                $("#deskNumberInput").prev().text(personalInfoObject.deskNumber);
                $("#mobileNumberInput").prev().text(personalInfoObject.mobileNumber);
                $("#emailInput").prev().text(personalInfoObject.email);
                $("#faxInput").prev().text(personalInfoObject.fax);
                $("#ContactInfoForm > .btn").prop("disabled", "false");

            }
        });
    });

    /*on submit of Security Question section*/
    $("#securityQuestionSubmit").click(function (e) {
        e.preventDefault();
        var personalInfoObject = {};
        var data = {};
        personalInfoObject.currentPassword = $("#currentPassword").val();
        personalInfoObject.question = $("#secretQuestion").val();
        personalInfoObject.answer = $("#secretAnswer").val();
        data.userNameInfo = personalInfoObject;

        $.ajax({
            url: "/_layouts/IImpact.Web/MySettingsService.asmx/SaveSecretQuestion",
            contentType: "application/json; charset=utf-8",
            type: "post",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (datap) {
                $("#SecretQuestionForm").append($("<div class='xp-successMessage' id='successOverlay'><p id='text'>" + datap.d + "</p></div>"))
                $(".xp-successMessage").fadeOut(5000);
            }
        });
    });

    /*on submit of Personal Info section*/
    $("#personalInformationSubmit").click(function (e) {
        e.preventDefault();
        var personalInfoObject = {};
        var data = {};
        personalInfoObject.aboutMe = $("#aboutMeInput").val();
        personalInfoObject.responsibilities = $("#responsibilitiesInput").val();
        personalInfoObject.interests = $("#interestsInput").val();
        personalInfoObject.skills = $("#skillsInput").val();
        data.userNameInfo = personalInfoObject;

        $.ajax({
            url: "/_layouts/IImpact.Web/MySettingsService.asmx/SavePersonalInfo",
            contentType: "application/json; charset=utf-8",
            type: "post",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (datap) {
                $("#PersonalInfoForm").append($("<div class='xp-successMessage' id='successOverlay'><p id='text'>" + datap.d + "</p></div>"))
                $(".xp-successMessage").fadeOut(5000);
                $("#PersonalInfoForm").children().find('p').attr('style', 'display:block');
                $("#PersonalInfoForm").children().find('input').attr('style', 'display:none');
                $("#aboutMeInput").prev().text(personalInfoObject.aboutMe);
                $("#responsibilitiesInput").prev().text(personalInfoObject.responsibilities);
                $("#interestsInput").prev().text(personalInfoObject.interests);
                $("#skillsInput").prev().text(personalInfoObject.skills);
                $("#PersonalInfoForm > .btn").prop("disabled", "false");
            }
        });
    });

    /*on submit of user name edit section*/
    $("#userNameSubmit").click(function (e) {
        e.preventDefault();
        var personalInfoObject = {};
        var data = {};
        /*add all the data to the array to pass it to web method*/
        personalInfoObject.firstName = $("#firstNameEdit").val();
        personalInfoObject.lastName = $("#lastNameEdit").val();
        data.userNameInfo = personalInfoObject;
        $.ajax({
            url: "/_layouts/IImpact.Web/MySettingsService.asmx/SaveUserName",
            contentType: "application/json; charset=utf-8",
            type: "post",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (datap) {
                var data = datap.d;
                $("#firstName").text(data.FirstName);
                $("#lastName").text(data.LastName);
                $(".popUp").css("display", "none");
            }
        });
    });

    /*if user click on cancel in username edit section*/
    $("#nameResetButton").click(function () {
        $(".popUp").css("display", "none");
    });


    /*for uploading the Profilepic*/
    var upload = new AjaxUpload($("#editPic"), {
        data: {},
        action: "/_layouts/IImpact.Web/MySettingsService.asmx/SetPic",
        onSubmit: function (file, ext) {
            if (!(ext && /^(jpg|png|jpeg)$/i.test(ext))) {
                alert("Incorrect file format.Only jpg, jpeg and png are allowed.");
                return false;
            }
        },
        onComplete: function (file, response) {
            GetPic();
        }
    });

    $("#editPic").click(function (e) {
        var upload = new AjaxUpload("#editPic", {
            data: {},
            action: "/_layouts/IImpact.Web/MySettingsService.asmx/SetPic",
            onSubmit: function (file, ext) {
                if (!(ext && /^(jpg|png|jpeg)$/i.test(ext))) {
                    alert("Incorrect file format.Only jpg, jpeg and png are allowed.");
                    return false;
                }
            },
            onComplete: function (file, response) {
                GetPic();
            }
        });
        upload.submit();
    });

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function GetPic() {
        $.ajax({
            url: "/_layouts/IImpact.Web/MySettingsService.asmx/GetPic",
            contentType: "application/json; charset=utf-8",
            type: "post",
            dataType: "json",
            data: "{}",
            success: function (datap, st) {
                var uniqueId = guid();
                var data = datap.d;
                var UserImage = data.ImageUrl + "?uniqueId=" + uniqueId;
                $("#profilePic").remove();
                $(".profile-pic").append("<img alt='profilepic' src='" + UserImage + "' id='profilePic' class='profile'>");
            }
        });
    };
};

/*for adding the Security Questions list*/
function addDropDownList(secretquestionId, currentLanguage) {
    if (currentLanguage == "fr")
    {
        $('#secretQuestion').append(new Option("Maiden name of your mother?", "Nom de jeune fille de votre mère?"));
        $('#secretQuestion').append(new Option("Your favorite pastime?", "Votre passe-temps préféré?"));
        $('#secretQuestion').append(new Option("Your childhood nickname?", "Surnom de votre enfance?"));
        $('#secretQuestion').append(new Option("Your first car or bike make?", "Votre première marque de voiture ou de bicyclette?"));
        $('#secretQuestion').append(new Option("Your childhood hero?", "Votre héros d'enfance?"));
        $('#secretQuestion').append(new Option("Name of your first teacher?", "Nom de votre premier enseignant?"));
        $('#secretQuestion').append(new Option("Your best childhood friend?", "Votre meilleur ami d'enfance?"));
        $('#secretQuestion').append(new Option("Street in which you grew up?", "La rue dans laquelle vous avez grandi?"));
    }
    else{
        $('#secretQuestion').append(new Option("Maiden name of your mother?", "Maiden name of your mother?"));
        $('#secretQuestion').append(new Option("Your favorite pastime?", "Your favorite pastime?"));
        $('#secretQuestion').append(new Option("Your childhood nickname?", "Your childhood nickname?"));
        $('#secretQuestion').append(new Option("Your first car or bike make?", "Your first car or bike make?"));
        $('#secretQuestion').append(new Option("Your childhood hero?", "Your childhood hero?"));
        $('#secretQuestion').append(new Option("Name of your first teacher?", "Name of your first teacher?"));
        $('#secretQuestion').append(new Option("Your best childhood friend?", "Your best childhood friend?"));
        $('#secretQuestion').append(new Option("Street in which you grew up?", "Street in which you grew up?"));
    }
}