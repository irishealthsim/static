var arrayList = [];
(function ($) {
    /*create a global object for the reference of all the methods, properties etc in the plugin context*/
    var lcm = {};
    $.fn.leftNavigationContext = function (method) {
        if (!this || this.length == 0)
            console.log("there is something wrong in loading plugin");

        if (lcm.methods[method]) {
            return lcm.methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            return lcm.methods.init.apply(this, arguments);
        } else {
            console.log(method + " name is not existing in this plugin");
        }
        return lcm;
    };

    lcm.defaults = {
        data: ''
    };
    lcm.Opts = {};
    
    /*methods required to achieve the context menu functionality*/

    lcm.methods = {
        init: function (options) {
            lcm.Opts = $.extend({}, lcm.defaults, options);
            lcm.methods.prepareContextMenu($(this));
        },

        /*this method is used to prepare context menu */
        prepareContextMenu: function () {
            var menuItemCount = $("#mainUl > li").length;
            if (menuItemCount > 0) {
                $("#mainUl > li").remove();
            }
            /*ajax functionality to retreive the data for context menu*/
           
            $.each(lcm.Opts.data, function (i) {
                var ctype = "hello";
                li = $("<li style='display:block !important' projectType='" + lcm.Opts.data[i].value + "'>" + lcm.Opts.data[i].text + "</li>");
                $("#mainUl").append(li);
            });
            /*on hover on the li make the create ne wproject icon and text white*/

            $("#mainUl li").hover(
               function(){
                   $("a.createproject").css("color", "#fff");
               },
               function(){
                   $("a.createproject").css("color", "#52606e");                       
               }
                    
            );
                      
            $("#mainUl li").click(function(e){
                var contenTypeName=$(this).attr("projectType");
                $("#mainUl > li").css('display','none');
                var span = $("<span id='createProjId' ></span>");
                $("#centerPanelId").html(span);
                //document.location =  $(location).attr("href")+"?ItemType="+contenTypeName;
                span.load("/_layouts/XpointBase/pages/CreatenewProject.aspx?ItemType=" + contenTypeName);

                $("#mainUl").hover(
                    lcm.methods.prepareContextMenu($(this))
                    );
            });                     
        }
    };        

})(jq111);
