/// <reference path="jquery-1.3.2-vsdoc2.js"/>
/*
* jquery tree builder
*
* convert unordered list (ul) of organization tree to chart
* 
* author: Oky Purnama <oky_pm@yahoo.com>
*/



var processed = false;

function renderOrgChart() {
    $(document).ready(function() {
        setTimeout("OrgChart()", 1000);
    });
}

function OrgChart(proc, extrawidth) {
    var isRender = true;
    if (proc != null) {
        processed = proc;
    }

    if (isRender) {
        if (!processed) {
            processed = true;
            $("#chart-outerwrapper").css("display", "block");
            //wrapp each li
            var rootChildren = 0;
            var checked = false;
            var maxsiblings = 0;
            $("#chart-outerwrapper").find('ul.org-chart li').each(function() {
                var content = '';
                var firstChild = $(this).children().get(0);
                if (firstChild.nodeName.toUpperCase() == 'DIV') {
                    var content = firstChild;
                    var siblingCounts = $(this).siblings().length;
                    if (siblingCounts > maxsiblings) {
                        maxsiblings = siblingCounts;
                    }
                    var childrenCounts = $(this).children().length;
                    if (!checked) {
                        rootChildren = $(this).children().length;
                        checked = true;
                    }
                    var isRoot = '';
                    if ($(this).parent().parent().get(0).nodeName.toUpperCase() == 'DIV') {
                        isRoot = ' root';
                    }

                    var hasChildren = '';
                    if ($(this).children().get(childrenCounts - 1).nodeName.toUpperCase() == 'UL') {
                        hasChildren = ' has-children';
                    }

                    var isMiddle = '';
                    if (siblingCounts > 0 && $(this).prev('li').length == 1 && $(this).next('li').length == 1) {
                        isMiddle = ' middle';
                    }

                    var isTopLeft = '';
                    if (siblingCounts > 0 && $(this).prev('li').length == 0) {
                        isTopLeft = ' top-left';
                    }

                    var isTopRight = '';
                    if (siblingCounts > 0 && $(this).next('li').length == 0) {
                        isTopRight = ' top-right';
                    }

                    $("<div class='outerwrapper' align='center'><div class='innerwrapper" + isRoot + isTopLeft + isMiddle + isTopRight + "'><div class='start'>&nbsp;</div><div class='end'>&nbsp;</div><div class='node-wrapper'></div><div class='tail" + hasChildren + "'>&nbsp;</div></div></div>").insertAfter($(firstChild));
                    $(this).find('div.node-wrapper').prepend($(content));
                } else {
                    $(this).prepend("<div class='outerwrapper' align='center'><div class='innerwrapper middle'><div class='start'>&nbsp;</div><div class='end'>&nbsp;</div><div style='clear:both;'><div style='height: 75px; float: left; width: 50%; border-right: solid 1px #333;'>&nbsp;</div></div><div class='tail has-children'>&nbsp;</div></div></div>");
                }
            });

            if (rootChildren > 0) {
                if (maxsiblings > 1) {
                    $("#chart-outerwrapper").width(maxsiblings * 300);
                }
                else {
                    $('div.chart-outerwrapper').css("style", "overflow:hidden");
                    $('div.chart-innerwrapper').css("style", "overflow:hidden");
                }
                if (extrawidth) {
                    $('div.chart-outerwrapper').width($('div.chart-outerwrapper').width() + extrawidth);
                }
                $('ul.org-chart li').each(function() {
                    var width1 = $(this).width();
                    $($(this).find('div.innerwrapper').get(0)).width(width1);
                });

            }

        }
    }
}
