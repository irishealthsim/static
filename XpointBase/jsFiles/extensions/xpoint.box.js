/* 
 * plugin is for generic box 
 */
(function($) {

    $.fn.xpointbox = function(options) {
        /*
        * override the defaults
        */
        var boxOptions = $.extend($.fn.xpointbox.defaults, options);

        return this.each(function() {

        var container = $(this);
        
            if ($.trim(boxOptions.containerStyle).length > 0) {
                container.attr('class', boxOptions.containerStyle);
            }
            /*
            * check if the header container is initialised , if yes then add the headercontainer
            * in the container 
            */
            if (boxOptions.headerContainer) {
                var headerContainer = boxOptions.headerContainer;
                /*
                * check if the header container is jquery if not (that means
                * you have passed on raw html rather than actual jquery object
                * so initialise jquery object out of the raw html and then add that in the
                * container
                */
                if ((headerContainer instanceof jQuery) == false) {
                    headerContainer = $(boxOptions.headerContainer);
                }

                /*
                * check if the header style is configured
                */
                if ($.trim(boxOptions.headerStyle).length > 0) {
                  headerContainer.attr('class', boxOptions.headerStyle);

                }
                container.append(headerContainer);
                headerContainer.width(boxOptions.headerWidth);
                /*
                * check if the header plugins are configured to be applied
                */
                if ($.trim(boxOptions.headerPlugins).length > 0) {
                    headerContainer.bind(boxOptions.headerPlugins);
                }
            }
            /*
            * check if the content container is initialised , if yes then add the contentcontainer
            * in the container 
            */
            if (boxOptions.contentContainer) {
                var contentContainer = boxOptions.contentContainer;
                /*
                * check if the content container is jquery if not (that means
                * you have passed on raw html rather than actual jquery object
                * so initialise jquery object out of the raw html and then add that in the
                * container
                */
                if ((contentContainer instanceof jQuery) == false) {
                    contentContainer = $(options.contentContainer);
                }
                /*
                * check if the content style is configured
                */
                if ($.trim(boxOptions.contentStyle).length > 0) {
                  contentContainer.attr('class', boxOptions.contentStyle);
                }
                container.append(contentContainer);
                container.width(boxOptions.containterWidth);
                /*
                * check if the content plugins are configured to be applied
                */
                if ($.trim(boxOptions.contentPlugin).length > 0) {
                    contentContainer.bind(boxOptions.contentPlugin);
                }
            }
        });
    }

    //set up the defaults for the plugin
    $.fn.xpointbox.defaults = {
        headerContainer: null,
        contentContainer: null,
        headerPlugins: "",
        contentPlugin: "",
        headerStyle: "xp-DivHeader ui-widget-header",
        headerWidth: '100%',
        containterWidth: '100%',
        contentStyle: "xp-MainContent",
        containerStyle: "ui-widget-content ui-helper-clearfix ui-corner-all xp-OuterPanel xp-Overflowhidden "
    };
})(jQuery);