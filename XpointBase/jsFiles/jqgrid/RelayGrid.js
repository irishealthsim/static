var xpointGridWidth = {
    formatters: {
        "Custom_Portfolio": {
            "1600": function (fm) { return { width: 1500, height: 100 } },
            "1680": function (fm) { return { width: 1500, height: 100 } },
            "2736": function (fm) { return { width: 2600, height: 100 } },
            "1024": function (fm) { return { width: 990, height: 100 } },
            "1152": function (fm) { return { width: 1118, height: 100 } },
            "1280": function (fm) { return { width: 1220, height: 100 } },
            "1366": function (fm) { return { width: 1287, height: 100 } },
            "1360": function (fm) { return { width: 1287, height: 100 } },
            "800": function (fm) { return { width: 750, height: 100 } },
            "1400": function (fm) { return { width: 1330, height: 100 } },
            "1440": function (fm) { return { width: 1360, height: 100 } }
        },
        "Default": {
            "1920": function (fm) { return { width: 1880, height: 100 } },
            "1600": function (fm) { return { width: 1300, height: 100 } },
            "1680": function (fm) { return { width: 1400, height: 100 } },
            "2736": function (fm) { return { width: 2600, height: 100 } },
            "2736": function (fm) { return { width: 2320, height: 100 } },
            "1536": function (fm) { return { width: 1320, height: 100 } },
            "1024": function (fm) { return { width: 990, height: 100 } },
            "1152": function (fm) { return { width: 1118, height: 100 } },
            "1280": function (fm) { return { width: 1220, height: 100 } },
            "1360": function (fm) { return { width: 1290, height: 100 } },
            "1366": function (fm) { return { width: 1290, height: 100 } },
            "800": function (fm) { return { width: 750, height: 100 } },
            "1400": function (fm) { return { width: 1330, height: 100 } },
            "1440": function (fm) { return { width: 1360, height: 100 } },
            "768": function (fm) {
                var offSet = -28;
                if (fm && fm["1024"]) {
                    var combo = fm["1024"](fm);
                    return { width: (combo.width + offSet), height: combo.height }
                } return { width: 959, height: 100 }
            }
        },
        "Width_350_400": {
            "1920": function (fm) { return { width: 600, height: 100 } },
            "1600": function (fm) { return { width: 525, height: 100 } },
            "1680": function (fm) { return { width: 580, height: 100 } },
            "2736": function (fm) { return { width: 954, height: 100 } },
            "1024": function (fm) { return { width: 335, height: 100 } },
            "1280": function (fm) { return { width: 440, height: 100 } },
            "1366": function (fm) { return { width: 360, height: 100 } },
            "1360": function (fm) { return { width: 360, height: 100 } },
            "1440": function (fm) { return { width: 440, height: 100 } },
            "1400": function (fm) { return { width: 440, height: 100 } },
            "2160": function (fm) { return { width: 450, height: 100 } },
            "800": function (fm) { return { width: 270, height: 100 } },
            "768": function (fm) { return { width: 250, height: 100 } }
        },
        "Width_490_625": {
            "1920": function (fm) { return { width: 950, height: 100 } },
            "1600": function (fm) { return { width: 655, height: 100 } },
            "1680": function (fm) { return { width: 700, height: 100 } },
            "1024": function (fm) { return { width: 903, height: 100 } },
            "1280": function (fm) { return { width: 625, height: 100 } },
            "1360": function (fm) { return { width: 650, height: 100 } },
            "1366": function (fm) { return { width: 650, height: 100 } },
            "1400": function (fm) { return { width: 700, height: 100 } },
            "1440": function (fm) { return { width: 710, height: 100 } }
        },
        "Width_960_1205": {
            "3840": function (fm) { return { width: 500, height: 100 } },
            "1920": function (fm) { return { width: 1880, height: 100 } },
            "1600": function (fm) { return { width: 1320, height: 100 } },
            "1680": function (fm) { return { width: 1380, height: 100 } },
            "1024": function (fm) { return { width: 902, height: 100 } },
            "1280": function (fm) { return { width: 1100, height: 100 } },
            "1152": function (fm) { return { width: 980, height: 100 } },
            "1360": function (fm) { return { width: 1220, height: 100 } },
            "1366": function (fm) { return { width: 1220, height: 100 } },
            "1400": function (fm) { return { width: 1330, height: 100 } },
            "1440": function (fm) { return { width: 1360, height: 100 } },
            "768": function (fm) { return { width: 680, height: 100 } },
            "2560": function (fm) { return { width: 2300, height: 100 } },
            "1536": function (fm) { return { width: 1320, height: 100 } },
            "2048": function (fm) { return { width: 1860, height: 100 } },
            "1920": function (fm) { return { width: 1680, height: 100 } },
            "1768": function (fm) { return { width: 1600, height: 100 } },
            "1680": function (fm) { return { width: 1520, height: 100 } }
        },
        "Width_960_1205_1300": {
            "1920": function (fm) { return { width: 1880, height: 100 } },
            "1600": function (fm) { return { width: 1100, height: 100 } },
            "1680": function (fm) { return { width: 1100, height: 100 } },
            "1024": function (fm) { return { width: 959, height: 100 } },
            "1280": function (fm) { return { width: 1236, height: 100 } },
            "1400": function (fm) { return { width: 1330, height: 100 } },
            "1440": function (fm) { return { width: 1360, height: 100 } },
            "1360": function (fm) { return { width: 1300, height: 100 } },
            "1366": function (fm) { return { width: 1300, height: 100 } }
        },
        "Width_228_290_320": {
            "1920": function (fm) { return { width: 550, height: 100 } },
            "1600": function (fm) { return { width: 450, height: 100 } },
            "1680": function (fm) { return { width: 450, height: 100 } },
            "1024": function (fm) { return { width: 228, height: 100 } },
            "1280": function (fm) { return { width: 290, height: 100 } },
            "1366": function (fm) { return { width: 320, height: 100 } },
            "1360": function (fm) { return { width: 320, height: 100 } },
            "1400": function (fm) { return { width: 360, height: 100 } },
            "1440": function (fm) { return { width: 360, height: 100 } }
        },
        "Width_270_339_367": {
            "1024": function (fm) { return { width: 270, height: 100 } },
            "1280": function (fm) { return { width: 339, height: 100 } },
            "1366": function (fm) { return { width: 367, height: 100 } },
            "1360": function (fm) { return { width: 367, height: 100 } },
            "1600": function (fm) { return { width: 450, height: 100 } },
            "1680": function (fm) { return { width: 450, height: 100 } },
            "1400": function (fm) { return { width: 410, height: 100 } },
            "1440": function (fm) { return { width: 410, height: 100 } }
        },
        "Width_200_200_320": {
            "1920": function (fm) { return { width: 500, height: 100 } },
            "1024": function (fm) { return { width: 200, height: 100 } },
            "1280": function (fm) { return { width: 200, height: 100 } },
            "1600": function (fm) { return { width: 450, height: 100 } },
            "1680": function (fm) { return { width: 450, height: 100 } },
            "1366": function (fm) { return { width: 320, height: 100 } },
            "1360": function (fm) { return { width: 320, height: 100 } },
            "1400": function (fm) { return { width: 380, height: 100 } },
            "1440": function (fm) { return { width: 380, height: 100 } }
        },
        "Width_310_340": {
            "1024": function (fm) { return { width: 310, height: 100 } },
            "1280": function (fm) { return { width: 340, height: 100 } },
            "1600": function (fm) { return { width: 450, height: 100 } },
            "1680": function (fm) { return { width: 450, height: 100 } },
            "1360": function (fm) { return { width: 380, height: 100 } },
            "1366": function (fm) { return { width: 380, height: 100 } },
            "1400": function (fm) { return { width: 380, height: 100 } },
            "1440": function (fm) { return { width: 380, height: 100 } }
        },
        "Width_550_550": {
            "1920": function (fm) { return { width: 1100, height: 100 } },
            "1024": function (fm) { return { width: 550, height: 100 } },
            "1280": function (fm) { return { width: 550, height: 100 } },
            "1600": function (fm) { return { width: 750, height: 100 } },
            "1680": function (fm) { return { width: 750, height: 100 } },
            "1366": function (fm) { return { width: 600, height: 100 } },
            "1360": function (fm) { return { width: 600, height: 100 } },
            "1400": function (fm) { return { width: 650, height: 100 } },
            "1440": function (fm) { return { width: 650, height: 100 } }
        },
        "Width_486_620": {
            "1920": function (fm) { return { width: 1000, height: 100 } },
            "1024": function (fm) { return { width: 499, height: 100 } },
            "1280": function (fm) { return { width: 632, height: 100 } },
            "1600": function (fm) { return { width: 850, height: 100 } },
            "1680": function (fm) { return { width: 850, height: 100 } },
            "1366": function (fm) { return { width: 678, height: 100 } },
            "1360": function (fm) { return { width: 678, height: 100 } },
            "1440": function (fm) { return { width: 720, height: 100 } },
            "768": function (fm) { return { width: 483, height: 100 } }
        },
        "Width_556_699": {
            "1920": function (fm) { return { width: 1100, height: 100 } },
            "1600": function (fm) { return { width: 900, height: 100 } },
            "1680": function (fm) { return { width: 900, height: 100 } },
            "2736": function (fm) { return { width: 1568, height: 100 } },
            "1152": function (fm) { return { width: 600, height: 100 } },
            "1366": function (fm) { return { width: 748, height: 100 } },
            "1360": function (fm) { return { width: 748, height: 100 } },
            "1024": function (fm) { return { width: 555, height: 100 } },
            "1280": function (fm) { return { width: 699, height: 100 } },
            "1400": function (fm) { return { width: 800, height: 100 } },
            "1440": function (fm) { return { width: 800, height: 100 } },
            "3840": function (fm) { return { width: 500, height: 100 } },
            "2560": function (fm) { return { width: 2300, height: 100 } },
            "1536": function (fm) { return { width: 1320, height: 100 } },
            "2048": function (fm) { return { width: 1860, height: 100 } },
            "1920": function (fm) { return { width: 1680, height: 100 } },
            "1768": function (fm) { return { width: 1600, height: 100 } },
            "1680": function (fm) { return { width: 1520, height: 100 } },
            "800": function (fm) { return { width: 450, height: 100 } },
            "768": function (fm) {
                var offSet = -14;
                if (fm && fm["1024"]) {
                    var combo = fm["1024"](fm);
                    return { width: (combo.width + offSet), height: combo.height }
                } return { width: 552, height: 698 }
            }
        },
        // This width object will give width for 1366,1024,1280,1440 and 2048 px width reolution
        "Width_1366_1024_1440_2048_1280": {
            "1920": function (fm) { return { width: 1200, height: 100 } },
            "1600": function (fm) { return { width: 900, height: 100 } },
            "1680": function (fm) { return { width: 900, height: 100 } },
            "2736": function (fm) { return { width: 1568, height: 100 } },
            "1366": function (fm) { return { width: 748, height: 100 } },
            "1360": function (fm) { return { width: 748, height: 100 } },
            "1024": function (fm) { return { width: 570, height: 100 } },
            "1400": function (fm) { return { width: 820, height: 100 } },
            "1440": function (fm) { return { width: 825, height: 100 } },
            "2048": function (fm) { return { width: 1170, height: 100 } },
            "2560": function (fm) { return { width: 825, height: 100 } },
            "1280": function (fm) { return { width: 699, height: 100 } },
            "800": function (fm) { return { width: 450, height: 100 } },
            "768": function (fm) {
                var offSet = -14;
                if (fm && fm["1024"]) {
                    var combo = fm["1024"](fm);
                    return { width: (combo.width + offSet), height: combo.height }
                } return { width: 552, height: 698 }
            }
        },
        "Width_550_650": {
            "1920": function (fm) { return { width: 1100, height: 100 } },
            "1024": function (fm) { return { width: 550, height: 100 } },
            "1280": function (fm) { return { width: 650, height: 100 } },
            "1600": function (fm) { return { width: 850, height: 100 } },
            "1680": function (fm) { return { width: 850, height: 100 } },
            "1366": function (fm) { return { width: 700, height: 100 } },
            "1360": function (fm) { return { width: 700, height: 100 } },
            "1400": function (fm) { return { width: 750, height: 100 } },
            "1440": function (fm) { return { width: 760, height: 100 } }
        },
        "Width_600_800": {
            "1920": function (fm) { return { width: 1200, height: 100 } },
            "1024": function (fm) { return { width: 600, height: 100 } },
            "1280": function (fm) { return { width: 800, height: 100 } },
            "1600": function (fm) { return { width: 1000, height: 100 } },
            "1680": function (fm) { return { width: 1000, height: 100 } },
            "1366": function (fm) { return { width: 848, height: 100 } },
            "1360": function (fm) { return { width: 848, height: 100 } },
            "1400": function (fm) { return { width: 950, height: 100 } },
            "3840": function (fm) { return { width: 450, height: 100 } },
            "2560": function (fm) { return { width: 1550, height: 100 } },
            "2048": function (fm) { return { width: 1300, height: 100 } },
            "1920": function (fm) { return { width: 1200, height: 100 } },
            "1152": function (fm) { return { width: 800, height: 100 } },
            "1176": function (fm) { return { width: 700, height: 100 } },
            "1768": function (fm) { return { width: 1200, height: 100 } },
            "1440": function (fm) { return { width: 950, height: 100 } }
        },
        "Width_610_800_900": {
            "1920": function (fm) { return { width: 1250, height: 100 } },
            "1024": function (fm) { return { width: 610, height: 100 } },
            "1280": function (fm) { return { width: 800, height: 100 } },
            "1600": function (fm) { return { width: 1100, height: 100 } },
            "1680": function (fm) { return { width: 1100, height: 100 } },
            "1366": function (fm) { return { width: 900, height: 100 } },
            "1360": function (fm) { return { width: 900, height: 100 } },
            "1400": function (fm) { return { width: 970, height: 100 } },
            "1440": function (fm) { return { width: 980, height: 100 } }
        },
        "Width_670_800_900": {
            "1920": function (fm) { return { width: 1400, height: 100 } },
            "1024": function (fm) { return { width: 690, height: 100 } },
            "1280": function (fm) { return { width: 800, height: 100 } },
            "1600": function (fm) { return { width: 1100, height: 100 } },
            "1680": function (fm) { return { width: 1100, height: 100 } },
            "1152": function (fm) { return { width: 800, height: 100 } },
            "1366": function (fm) { return { width: 900, height: 100 } },
            "1360": function (fm) { return { width: 900, height: 100 } },
            "1400": function (fm) { return { width: 970, height: 100 } },
            "1440": function (fm) { return { width: 980, height: 100 } },
            "2560": function (fm) { return { width: 2300, height: 100 } },
            "1536": function (fm) { return { width: 1320, height: 100 } },
            "2048": function (fm) { return { width: 1860, height: 100 } },
            "1920": function (fm) { return { width: 1680, height: 100 } },
            "1768": function (fm) { return { width: 1600, height: 100 } },
            "1680": function (fm) { return { width: 1520, height: 100 } }
        },

        "Width_835_720": {
            "1920": function (fm) { return { width: 1600, height: 100 } },
            "1024": function (fm) { return { width: 835, height: 100 } },
            "1280": function (fm) { return { width: 720, height: 100 } },
            "1600": function (fm) { return { width: 1100, height: 100 } },
            "1680": function (fm) { return { width: 1100, height: 100 } },
            "1366": function (fm) { return { width: 850, height: 100 } },
            "1360": function (fm) { return { width: 850, height: 100 } },
            "1400": function (fm) { return { width: 900, height: 100 } },
            "1440": function (fm) { return { width: 920, height: 100 } }
        },
        "Width_835_1050": {
            "1920": function (fm) { return { width: 1680, height: 100 } },
            "1024": function (fm) { return { width: 835, height: 100 } },
            "1280": function (fm) { return { width: 1050, height: 100 } },
            "1400": function (fm) { return { width: 1200, height: 100 } },
            "1440": function (fm) { return { width: 1200, height: 100 } },
            "1600": function (fm) { return { width: 1400, height: 100 } },
            "1680": function (fm) { return { width: 1400, height: 100 } },
            "1366": function (fm) { return { width: 1050, height: 100 } },
            "1360": function (fm) { return { width: 1050, height: 100 } }
        },
        "Width_835_1120": {
            "1920": function (fm) { return { width: 1680, height: 100 } },
            "1024": function (fm) { return { width: 835, height: 100 } },
            "1280": function (fm) { return { width: 1120, height: 100 } },
            "1366": function (fm) { return { width: 1200, height: 100 } },
            "1360": function (fm) { return { width: 1200, height: 100 } },
            "1400": function (fm) { return { width: 1200, height: 100 } },
            "1440": function (fm) { return { width: 1200, height: 100 } },
            "1600": function (fm) { return { width: 1400, height: 100 } },
            "1680": function (fm) { return { width: 1400, height: 100 } }

        },
        "Width_540_650_929": {
            "1920": function (fm) { return { width: 1100, height: 100 } },
            "1024": function (fm) { return { width: 540, height: 100 } },
            "1280": function (fm) { return { width: 650, height: 100 } },
            "1366": function (fm) { return { width: 929, height: 100 } },
            "1360": function (fm) { return { width: 929, height: 100 } },
            "1400": function (fm) { return { width: 1000, height: 100 } },
            "1440": function (fm) { return { width: 1000, height: 100 } },
            "1600": function (fm) { return { width: 1100, height: 100 } },
            "1680": function (fm) { return { width: 1100, height: 100 } }
        },
        "Width_690_855_929": {
            "1920": function (fm) { return { width: 1400, height: 100 } },
            "1024": function (fm) { return { width: 690, height: 100 } },
            "1280": function (fm) { return { width: 855, height: 100 } },
            "1366": function (fm) { return { width: 929, height: 100 } },
            "1360": function (fm) { return { width: 929, height: 100 } },
            "1400": function (fm) { return { width: 1000, height: 100 } },
            "1440": function (fm) { return { width: 1000, height: 100 } },
            "1600": function (fm) { return { width: 1100, height: 100 } },
            "1680": function (fm) { return { width: 1100, height: 100 } }
        },
        "Width_700_842_900": {
            "1920": function (fm) { return { width: 1450, height: 100 } },
            "1024": function (fm) { return { width: 721, height: 100 } },
            "1280": function (fm) { return { width: 1042, height: 100 } },
            "1600": function (fm) { return { width: 1200, height: 100 } },
            "1680": function (fm) { return { width: 1200, height: 100 } },
            "1366": function (fm) { return { width: 968, height: 100 } },
            "1360": function (fm) { return { width: 968, height: 100 } },
            "1400": function (fm) { return { width: 1100, height: 100 } },
            "1440": function (fm) { return { width: 1100, height: 100 } },
            "800": function (fm) { return { width: 650, height: 100 } },
            "768": function (fm) { return { width: 700, height: 100 } }
        },
        "Width_493_623_668": {
            "1920": function (fm) { return { width: 1000, height: 100 } },
            "1024": function (fm) { return { width: 493, height: 100 } },
            "1280": function (fm) { return { width: 623, height: 100 } },
            "1366": function (fm) { return { width: 668, height: 100 } },
            "1360": function (fm) { return { width: 668, height: 100 } },
            "1400": function (fm) { return { width: 720, height: 100 } },
            "1600": function (fm) { return { width: 850, height: 100 } },
            "1680": function (fm) { return { width: 850, height: 100 } },
            "1440": function (fm) { return { width: 740, height: 100 } },
            "768": function (fm) { return { width: 700, height: 100 } }
        },
        "Width_980_1420": {
            "1024": function (fm) { return { width: 980, height: 100 } },
            "1280": function (fm) { return { width: 1220, height: 100 } },
            "1152": function (fm) { return { width: 1020, height: 100 } },
            "1360": function (fm) { return { width: 1220, height: 100 } },
            "1366": function (fm) { return { width: 1220, height: 100 } },
            "1400": function (fm) { return { width: 1470, height: 100 } },
            "1440": function (fm) { return { width: 1500, height: 100 } },
            "1600": function (fm) { return { width: 1530, height: 100 } },
            "1680": function (fm) { return { width: 3440, height: 100 } },
            "1920": function (fm) { return { width: 1900, height: 100 } }
        }
    }
};
/**
* jqGrid extension for custom functionalities required in 
* Impact platform
* Anirudh Gupta
* Copy Right Relay Consultants
**/
/*Start of Global Variables*/
var popupStatus = 0;   /*Defines the status of popup , if it is opened or closed 0 means closed/hidden 1 means opened/shown*/
var $popupControl;
var isSecondTime = 0;
var $viewsControl;
/*End of Global Variables*/
; (function ($) {


    /*extend the jquery for custom functions*/
    $.fn.extend(
    {

        /*with row id as input traverse through the row and and returns the row values*/
        getRowData: function (rowid) {
            var res = {};
            this.each(function () {
                var $t = this, nm, ind;
                ind = $t.rows.namedItem(rowid);
                if (!ind) return res;
                $('td', ind).each(function (i) {
                    nm = $t.p.colModel[i].name;
                    if (nm !== 'cb' && nm !== 'subgrid') {
                        /* check if the grid is of treegrid type , incase yes then get value of first expanded*/
                        if ($t.p.treeGrid === true && nm == $t.p.ExpandColumn) {
                            res[nm] = $.jgrid.htmlDecode($("span:first", this).html());
                        } else {
                            res[nm] = $.jgrid.htmlDecode($(this).html());
                        }
                    }
                });
            });
            return res;
        },
        toolbarButtonCallback: function (postUrl, param) {
            var $t = this[0];
            gpost = new Object();
            gpost.trackerID = $t.p.mid;
            gpost.itemID = $t.p.selrow;
            gpost.param = param;
            $.ajax({
                url: postUrl,
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: $.toJSON(gpost),
                complete: function (data, Status) {
                    if (Status != "success") {
                        alert(Status + " Status: " + data.statusText + " Error code: " + data.status);
                    }
                    else {
                        var rtn = $.jgrid.parse(data.responseText);
                        switch (rtn.d.action) {
                            case 'reload':
                                $($t).trigger("reloadGrid");
                                break;
                            case 'alert':
                                var alertdialog = $("#relaygridconfirmation");
                                if (alertdialog.length == 0) {
                                    alertdialog = $("<div id='relaygridconfirmation' ></div>");
                                    $($t).append(alertdialog);
                                }
                                alertdialog.dialog({ autoOpen: false, width: 250, height: 'auto', modal: true });
                                alertdialog.html(rtn.d.param);
                                alertdialog.dialog('open');
                                break;
                            case 'script':
                                eval(rtn.d.param);
                                break;
                            case 'nop':
                                break;
                                /* Pass the below parameters to create a confirmation dialog
                                *  'title': Title of the alert box
                                *  'message': Message to be displayed on the alert box
                                */
                            case 'customalert':
                                var jqalertdialog = $("#relaygridcustomalert");
                                var parameters = eval('(' + rtn.d.param + ')');
                                if (jqalertdialog.length == 0) {
                                    jqalertdialog = $("<div class='xp-jqdialog' id='relaygridcustomalert' title='" + parameters.title + "'></div>");
                                    $($t).append(jqalertdialog);
                                }
                                jqalertdialog.dialog({ autoOpen: false, width: 250, height: 'auto', modal: true });
                                jqalertdialog.html(parameters.message);
                                jqalertdialog.dialog('open');
                                break;
                                /* Pass the below parameters to create a confirmation dialog
                                *  'title': Title of the dialog box
                                *  'message': Message to be displayed on the dialog box
                                *  'btnlabel': Button label
                                *  'callbackUrl': WebService callback Url
                                *  'callbackParams': Parameters to be passed to the callback                * 
                                */
                            case 'dialog':
                                var jqdialog = $("#relaygriddialog");
                                var parameters = eval('(' + rtn.d.param + ')');
                                var callbackParameters = new Object();
                                if (parameters.callbackParams != '') {
                                    callbackParameters = eval('(' + parameters.callbackParams + ')');
                                }
                                if (jqdialog.length > 0) {
                                    jqdialog.children().remove();
                                    jqdialog.remove();
                                }
                                jqdialog = $("<div id='relaygriddialog' title='" + parameters.title + "'></div>");
                                var html = "";
                                html += "<div>" + parameters.message + "</div>";
                                jqdialog.append(html);
                                $($t).append(jqdialog);
                                var dialogButtons = {};
                                dialogButtons[parameters.btnlabel] = function () {
                                    $($t).toolbarButtonCallback(parameters.callbackUrl, callbackParameters);
                                    $(this).dialog('close');
                                };
                                dialogButtons['Cancel'] = function () {
                                    $(this).dialog('close');
                                };
                                jqdialog.dialog({
                                    autoOpen: false,
                                    width: 400,
                                    modal: true,
                                    buttons: dialogButtons
                                });
                                jqdialog.dialog('open');
                                break;
                                /* Pass the below parameters to create a dialog to enter a text input
                                *  'title': Title of the dialog box
                                *  'message': Message to be displayed on the dialog box
                                *  'btnlabel': Button label
                                *  'callbackUrl': WebService callback Url
                                *  'callbackParams': Parameters to be passed to the callback   
                                *  'label': Label for the input box
                                */
                            case 'inputdialog':
                                var jqinputdialog = $("#relaygridinputdialog");
                                var parameters = eval('(' + rtn.d.param + ')');
                                var callbackParameters = new Object();
                                if (parameters.callbackParams != '') {
                                    callbackParameters = eval('(' + parameters.callbackParams + ')');
                                }
                                if (jqinputdialog.length == 0) {
                                    jqinputdialog = $("<div id='relaygridinputdialog' title='" + parameters.title + "'></div>");
                                    var html = "";
                                    html += "<div>" + parameters.message + "</div>";
                                    html += "<div>" + parameters.label + "    <input autocomplete='off' type='text' id='inputtext'/></div>";
                                    jqinputdialog.append(html);
                                    $($t).append(jqdialog);
                                    var dialogButtons = {};
                                    dialogButtons[parameters.btnlabel] = function () {
                                        callbackParameters.inputval = $('#inputtext').val();
                                        $($t).toolbarButtonCallback(parameters.callbackUrl, callbackParameters);
                                        $(this).dialog('close');
                                    };
                                    dialogButtons['Cancel'] = function () {
                                        $(this).dialog('close');
                                    };
                                }
                                jqinputdialog.dialog({
                                    autoOpen: false,
                                    width: 400,
                                    modal: true,
                                    buttons: dialogButtons
                                });
                                $('#inputtext').val('');
                                jqinputdialog.dialog('open');
                                break;
                            default:
                                break;
                        }
                    }
                }
            });
        },
        LinkCallBack: function (trackerId, itemId, link, postUrl) {
            var orgText = $('.loading').text();
            $('.loading').text((link) ? 'Linking life-cycles...' : 'Unlinking life-cycles....');
            $('.loading').show();
            gpost = new Object();
            gpost.trackerID = trackerId;
            gpost.itemID = itemId;
            gpost.link = link;
            var gridId = $(this).attr('id').replace('gbox_', '');
            gpost.targetLinkID = $("#" + gridId)[0].p.targetLinkID;
            $(this).find(':checkbox').attr('disabled', true);
            $.ajax({
                url: postUrl,
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: $.toJSON(gpost),
                success: function (datap, Status) {
                    var status = datap.d;
                    if (status == "success") {
                        // 'ganttenabled' is the CSS class that is added by the GantViewer to the parent DIV
                        // This enables us to select any such gantt viewers on the page and instruct them to refresh
                        $('.ganttenabled').each(function () { $(this).ResetGantt(gpost.targetLinkID); });
                        $('.loading').hide();
                        $('.loading').text(orgText);
                        $('#' + gridId).find(':checkbox').removeAttr('disabled');
                    }
                    else {
                        $('.loading').hide();
                        $('.loading').text(orgText);
                        var checkbox = $('#' + gridId).find(':checkbox').removeAttr('disabled');
                        if (checkbox.is(':checked')) {
                            checkbox.attr('checked', false);
                        }
                        else {
                            checkbox.attr('checked', true);
                        }
                        alert(status);
                        return false;
                    }
                }
            });
        },
        /*with row id as input traverse through the row and and returns the column  value*/
        getColumnData: function (rowid, columnname) {
            var res = "";
            this.each(function () {
                var $t = this, nm, ind;
                ind = $t.rows.namedItem(rowid);
                if (!ind) return res;
                $('td', ind).each(function (i) {
                    nm = $t.p.colModel[i].name;
                    if (nm == columnname) {
                        if ($t.p.colModel[i].formatter && $t.p.colModel[i].formatter == "peoplepicker") {
                            res = $.data(document.body, nm + rowid + "peoplepickerdata");
                        }
                        else {
                            res = $.jgrid.htmlDecode($(this).html());
                        }
                    }
                });
            });
            return res;
        },
        /*with row id as input traverse through the row and and returns the column  value*/
        getCustomColumnData: function (rowid, columnname, type) {
            var res = "";
            this.each(function () {
                var $t = this, nm, ind;

                ind = $t.rows.namedItem(rowid);
                if (!ind) return res;
                $('td', ind).each(function (i) {
                    nm = $t.p.colModel[i].name;
                    if (nm == columnname) {
                        switch (type) {
                            case "dropdown":
                                res = $("select>option:selected", this).val();
                                break;
                        }
                    }
                });
            });
            return res;
        },
        /*this function will hide the input panel*/
        hidePanel: function () {
            var $currentobject = this;
            /*sanity check*/
            if ($currentobject != null) {
                $currentobject.fadeOut("fast");
            }
        },

        /*this function will show the input panel*/
        showPanel: function () {
            var $currentobject = this;
            /*sanity check*/
            if ($currentobject != null) {
                $currentobject.fadeIn("fast");
            }
        },

        getGridData: function () {
            var $gridelem = $(this);
            gridData = new Array();
            if ($.isFunction($gridelem.getDataIDs)) {
                dataids = $gridelem.getDataIDs();
                $.each(dataids, function (i) {
                    gridData[this] = $gridelem.getRowData(this);
                });
            }
            return gridData;
        },
        /**This function firstly checks if the Email Panel is created . If not created then 
        * Creates the panel  then checks for toggle status if hidden show the panel , 
        * if shown hide the panel
        **/
        toggleEmailPanel: function (rowid, emailcolumn) {
            var $gridelem = this;
            if ($popupControl != null) {
                if (popupStatus == 0) {
                    var emailcolumnvalue = $gridelem.getColumnData(rowid, emailcolumn);
                    if (emailcolumnvalue != "") {
                        $popupControl.clearPopupFields();
                        $popupControl.updatePopupControl(emailcolumn, emailcolumnvalue);
                        centerPopup();
                        loadPopup();
                    }
                    else {
                        alert('You cannot send mail without selecting Idea');
                    }
                    popupStatus = 1;
                }
                else {
                    disablePopup();
                    popupStatus = 0;
                }
            }
            else {
                /*create the popuppanel incase not built*/
                alert(' Add Create PopupControl Functionality first');
                /*call back the function to give it another try*/
            }

            function centerPopup() {

                //request data for centering  
                var windowWidth = document.documentElement.clientWidth;
                var windowHeight = document.documentElement.clientHeight;
                var popupHeight = $popupControl.height();
                var popupWidth = $popupControl.width();
                //centering
                $popupControl.css({
                    "position": "absolute",
                    "top": windowHeight / 2 - popupHeight / 2,
                    "left": windowWidth / 2 - popupWidth / 2
                });
                //only need force for IE6  

                $(".backgroundPopup").css({
                    "height": windowHeight
                });

            }

            function loadPopup() {

                //loads popup only if it is disabled  
                if (popupStatus == 0) {
                    $(".backgroundPopup").css({
                        "opacity": "0.7"
                    });

                    $(".backgroundPopup").showPanel();
                    $popupControl.showPanel();
                    popupStatus = 1;
                }
            }
            function disablePopup() {
                //disables popup only if it is enabled  
                if (popupStatus == 1) {
                    $(".backgroundPopup").hidePanel();
                    $popupControl.hidePanel();
                    popupStatus = 0;
                }
            }
        },
        /*create a Popup Panel with set of options either by providing the content 
        *or getting the content from Webservice*/
        createPopupPanel: function (options) {

            var $parentobject = this;
            /*get set of default values*/
            var defaultvalues = {
                popupid: $parentobject.attr('id'),
                content: "",
                datatype: "json",
                mtype: "POST",
                contenturl: "",
                draggable: false,
                title: ""
            };

            /*extend the options with default values which will be overridden incase user defines the values*/
            options = $.extend(defaultvalues, options);
            options.popupid = options.popupid + "popup";
            $popupControl = $("'#" + options.popupid + "'");
            /*create the popup only if the popup dont exists already on the page*/
            if ($("'#" + options.popupid + "'").length == 0) {

                $div = $("<div class='popupContact' id='" + options.popupid + "' >");
                $div.append("<div class='popupContact' id='" + options.popupid + "' >");
                $div.append("<a id='" + options.popupid + "Cls'  href='#' class='popupContactClose' >x</a> ");

                /*check if Title is set , if yes create heading for the title*/
                if (options.title != "") {
                    $div.append("<h1>" + options.title + "</h1>");
                }

                /*if content is static and not from ajax*/
                if (options.contenturl == "") {

                    $div.append("<p id='" + options.popupid + "Area' class='contactArea'> ");
                    $div.append(options.content);
                    $div.append("</p>");
                }
                if ($(".backgroundPopup").length == 0) {
                    $('body').append("<div id='backgroundPopup' class='backgroundPopup'></div>)");
                }
                $('body').append($div);

                $(".popupContactClose").click(function () {
                    if (popupStatus == 1) {
                        $popupControl.clearPopupFields();
                        $("#backgroundPopup").hidePanel();
                        $popupControl.hidePanel();
                        popupStatus = 0;
                    }
                });
                $div.hidePanel();
                $popupControl = $div;
            }
        },

        /* Clears value of all text fields in popupcontrol */
        clearPopupFields: function () {
            var $elem = this;
            if ($elem.length > 0) {
                $elem.find("input[type=\'text\']").each(function (count, obj) {
                    $(this).val("");
                });
                $elem.find("textarea").each(function (count, obj) {
                    $(this).val("");
                });
            }
        },

        /*traverses through the controls of popupcontrol and update the field with input value */
        updatePopupControl: function (columnname, columnvalue) {
            var $elem = this;
            $elem.find("input[type=\'text\']").each(function (count, obj) {
                if ($(this).attr('name') == columnname) {

                    $(this).val(columnvalue);
                }
            });
        },

        /*this method will add the set password button to the head of the  grid and with ajax call will reset the pass for the user of selected row*/
        setupResetPassword: function (options) {
            var defaults = {
                buttonid: $(this).attr('id') + "resetpsw",
                passwordurl: ""
            };
            options = $.extend(defaults, options);
            this.each(function () {
                var $gridelem = this;
                var parent = $(this);
                /*create button and add it to header toolbar*/
                var $btn = $("<input type='button' value='ResetPassword' id= '" + options.buttonid + "' />");
                $("#t_" + $gridelem.attr('id')).append($btn);
                /*add the click event for the button*/
                $btn.click(function () {
                    selectedid = $gridelem.getGridParam('selrow');
                    if (selectedid != null) {
                        $.ajax({
                            url: options.passwordurl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{itemid:'" + selectedid + "'}",
                            success: function (datap, st) {
                                var data = datap.d;
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                alert('Password not reset');
                            }
                        });
                    }
                    else {
                        alert('Please Select a Row');
                    }
                });
            });
        },
        /*this function will add another button which would enable password reset of the selected user*/
        enableResetPassword: function (options) {

            var selectedid;
            var defaults = {
                resetpwdurl: "",
                passwordlinkID: "",
                statusdivid: ""
            };
            /*extend options with the default values*/
            var opt = $.extend(defaults, options);
            return this.each(function () {
                var $gridelem = this;
                var parentobject = $(this);
                /*get object of header*/
                var $headerObj = $("#t_" + $gridelem.id);
                opt.passwordlinkID = $gridelem.id + "resetpwdlink";
                //var $resetbutton = $("<div class='xp-FloatLeft xp-Width20 xp-MarginLeft-5'><div id='" + opt.passwordlinkID + "' class='pngddd xp-HoverCursor xp-Icon xp-IconRstPwd xp-FloatLeft Tip-UMRstPwd ' style='padding:2px' title='Reset Password' ></div></div>");
                // $headerObj.prepend($resetbutton);
                //opt.statusdivid = $gridelem.id + "statusdiv";
                var statusdiv = $("<div id='" + opt.statusdivid + "' class='xp-SuccessMsg xp-FontNormal xp-Width99'  />");
                statusdiv.hide();
                // $headerObj.prepend(statusdiv);
                // $resetbutton.click(function () {
                selectedid = parentobject.getGridParam('selrow');
                if (selectedid != null) {
                    var ts = parentobject.get(0);
                    if (ts) {
                        ts.p.loadui = "block";
                        $("#lui_" + ts.p.id).show();
                        $("#load_" + ts.p.id).show();
                    }
                    $.ajax({
                        url: options, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{itemid:'" + selectedid + "'}",
                        success: function (datap, st) {
                            var data = datap.d;
                            if (data == "success") {
                                var ts = parentobject.get(0);
                                if (ts) {
                                    ts.p.loadui = "block";
                                    $("#lui_" + ts.p.id).hide();
                                    $("#load_" + ts.p.id).hide();
                                }
                                statusdiv.html('<div class="xp-MarginAuto xp-Width25 xp-WhiteSpace" ><div class="xp-FloatLeft xp-MarginAuto xp-PaddingRight-6" ></div><div class="xp-FloatLeft xp-MarginAuto xp-VerticalAlignMiddle" >Password reset done successfully</div></div>');
                                statusdiv.removeClass('xp-ErrorMsg').addClass('xp-SuccessMsg');
                            }
                            else {
                                var ts = parentobject.get(0);
                                if (ts) {
                                    ts.p.loadui = "block";
                                    $("#lui_" + ts.p.id).hide();
                                    $("#load_" + ts.p.id).hide();
                                }
                                statusdiv.html('<div class="xp-MarginAuto xp-Width25 xp-WhiteSpace"><div class="xp-FloatLeft xp-MarginAuto xp-PaddingRight-6"></div><div class="xp-FloatLeft xp-MarginAuto xp-VerticalAlignMiddle">Error</div></div>');
                                statusdiv.removeClass('xp-SuccessMsg').addClass('xp-ErrorMsg');
                            }
                            statusdiv.show().fadeOut(10000);
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            var ts = $gridelem.get(0);
                            if (ts) {
                                ts.p.loadui = "block";
                                $("#lui_" + ts.p.id).hide();
                                $("#load_" + ts.p.id).hide();
                            }
                            statusdiv.html('<div class="xp-MarginAuto xp-Width25 xp-WhiteSpace"><div class="xp-FloatLeft xp-MarginAuto xp-PaddingRight-6" ></div><div class="xp-FloatLeft xp-MarginAuto xp-VerticalAlignMiddle" >Password Reset not done</div></div>');
                            statusdiv.removeClass('xp-SuccessMsg').addClass('xp-ErrorMsg');
                        }
                    });
                }
                else {
                    statusdiv.html('<div class="xp-MarginAuto xp-Width25 xp-WhiteSpace"><div class="xp-FloatLeft xp-MarginAuto xp-PaddingRight-6"></div><div class="xp-FloatLeft xp-MarginAuto xp-VerticalAlignMiddle" >Please select a row</div></div>');
                    statusdiv.removeClass('xp-SuccessMsg').addClass('xp-ErrorMsg');
                    statusdiv.show().fadeOut(10000);
                }
                // });
            });
        },

        enableDeactivateUser: function (options) {
            var selectedid;
            var defaults = {
                deactivateUserServiceUrl: ""
            };
            var opt = $.extend(defaults, options);
            return this.each(function () {
                var $gridelem = this;
                var parentobject = $(this);
                /*get object of header*/
                var $headerObj = $("#t_" + $gridelem.id);
                var $ActivatePopup = "";
                var $DeactivatePopup = "";
                var usrManagerGridId = "gbox_" + $gridelem.id;
                var boxElement = document.getElementById(usrManagerGridId);
                selectedid = parentobject.getGridParam('selrow');
                if (selectedid != null) {
                    var ts = parentobject.get(0);
                    if (ts) {
                        ts.p.loadui = "block";
                        $("#lui_" + ts.p.id).show();
                        $("#load_" + ts.p.id).show();
                    }
                    $.ajax({
                        url: options, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{itemid:'" + selectedid + "'}",
                        success: function (datap, st) {
                            var data = datap.d;
                            if (data) {
                                var ts = parentobject.get(0);
                                if (ts) {
                                    ts.p.loadui = "block";
                                    $("#lui_" + ts.p.id).hide();
                                    $("#load_" + ts.p.id).hide();
                                }

                                $DeactivatePopup += "<div class='deactivateUserContent'>";
                                $DeactivatePopup += "<span class='helper'></span>";
                                $DeactivatePopup += "<div>";
                                $DeactivatePopup += "<div class='popupCloseButton'><i class='fa fa-times' aria-hidden='true'></i></div>";
                                $DeactivatePopup += "<div class='modal-contents' id='deactivateUserContentSection' style='height:auto;border-radius: 0px; border: 0px;text-align:left;'>";
                                $DeactivatePopup += "<div class='modal-body'>";
                                $DeactivatePopup += "<div class='deactivate-user-body' style='margin-top:10px;'>";
                                $DeactivatePopup += "<p style='float:left;margin-bottom:0;margin-right:5px !important;margin-top: 8px !important;margin-left: 35px !important;'>Remove access of User to iRIS</p>";
                                $DeactivatePopup += "<button type='button' id='deactivateUserButton' onclick='MyFunction()' class='xpThemeButton xpPadding'>Confirm</button>";
                                $DeactivatePopup += "<center><p style='font-size: 10pt;margin-top:15px !important;'  >On click of Confirm User will no longer have access to iRIS</p></center>";
                                $DeactivatePopup += "</div></div></div></div></div>";
                                $(boxElement).append($($DeactivatePopup));
                                $('.deactivateUserContent').show();
                                $("#deactivateUserContentSection").slideDown()
                                $('#deactivateUserButton').click(function () {
                                    $.ajax({
                                        url: "/_layouts/IImpact.Web/UserMngGridService.asmx/DeactivateUserFromDatabase", contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{itemid:'" + selectedid + "'}",
                                        success: function (datap, st) {
                                            var data = datap.d;
                                            if (data == false) {
                                                $(".deactivateUserContent").remove();
                                                location.reload();
                                            }
                                        }
                                    });
                                });
                                $('.popupCloseButton').click(function () {
                                    $("#deactivateUserContentSection").slideUp(50000)
                                    $('.deactivateUserContent').remove();
                                });
                            }
                            else {
                                var ts = parentobject.get(0);
                                if (ts) {
                                    ts.p.loadui = "block";
                                    $("#lui_" + ts.p.id).hide();
                                    $("#load_" + ts.p.id).hide();
                                }

                                $.ajax({
                                    url: "/_layouts/IImpact.Web/ClientUserAdminService.asmx/GetSummaryCount",
                                    contentType: "application/json; charset=utf-8",
                                    type: "post", dataType: "json",
                                    data: "",
                                    success: function (datap) {
                                        if (datap.d) {
                                            var data = datap.d;
                                            if (data[0] == data[1]) {
                                                var Support = "<div class='LicenceExpiredDeactivate'>";
                                                Support += " <span class='helper'></span>";
                                                Support += "<div style='max-width:530px;'>";
                                                Support += "<div class='popupCloseButton'><i class='fa fa-times' aria-hidden='true'></i></div>";
                                                Support += "<div class='modal-contents' id='privacyPolicy' style='height:auto;border-radius: 0px; border: 0px;text-align:left;'>";
                                                Support += "<div class='modal-header' >";
                                                Support += "<h4 class='modal-title' id='LiceneceErrorHeader' style='color: #33AEDC;font-weight: 600;margin-left:5px;'>You have used all your licences</h4>";
                                                Support += "</div>";

                                                Support += "<div class='modal-body' style='float:left;'>";
                                                Support += "<div class='support-body' >";
                                                Support += "<form id='LicenceErrorNotifications'>";
                                                Support += "<div class='support-body'>";
                                                Support += "<p style='float:left;margin-right:10px;padding-top:5px;color:#FF0000;'>All of your licences are now allocated </p>";
                                                Support += "<p style='float:left;margin-right:10px;padding-top:5px;color:#FF0000;'>To work within your existing licenses Deactivate a User to free up a license as required </p>";
                                                Support += "<p style='float:left;margin-right:10px;padding-top:5px;color:#FF0000;'>If you wish to request more licenses then click <a id='sendEmailforLicencePurchase' href='#' style='text-decoration:underline;color:#FF0000;'>here</a></p>";

                                                Support += "</div>";
                                                Support += "</form>";
                                                Support += "</div>";
                                                Support += "</div>";
                                                Support += "</div>";
                                                Support += "</div>";
                                                Support += "</div>";


                                                $("#SupportRequest").append($(Support));
                                                $('.LicenceExpiredDeactivate').show();
                                                $("#privacyPolicy").slideDown()
                                                $('.popupCloseButton').click(function () {
                                                    $("#privacyPolicy").slideUp(50000)
                                                    $('.LicenceExpiredDeactivate').remove();
                                                    $("#SupportRequest").remove();
                                                    $(".jqgrid-overlay").hide();
                                                });


                                                $('#sendEmailforLicencePurchase').click(function () {
                                                    var subject = "Request for Licences";

                                                    $.ajax({
                                                        url: "/_layouts/IImpact.Web/LifeCycleService.asmx/SendEmailForLicence",
                                                        contentType: "application/json; charset=utf-8",
                                                        type: "post",
                                                        dataType: "json",
                                                        data: "{EmailSubject:'" + subject + "'}",
                                                        success: function (datap, st) {
                                                            $("#LiceneceErrorHeader").html("<p style='color: #000000;font-weight: 600;margin-left:5px;'>Request to discuss licences</p>");
                                                            $("#LicenceErrorNotifications").find("div").html("<p>Your request has been sent.  The iRIS Team will contact you shortly to discuss Licences.<br><br>Thank you.</p>");

                                                            //$('.privacyContent').remove();
                                                            //$("#SupportRequest").remove();
                                                            //$(".jqgrid-overlay").remove();
                                                        }
                                                    });
                                                });

                                                $('.popupCloseButton').click(function () {
                                                    $('.deactivateUserContent').remove();
                                                });

                                            }
                                            else {
                                                $ActivatePopup += "<div class='deactivateUserContent'>";
                                                $ActivatePopup += "<span class='helper'></span>";
                                                $ActivatePopup += "<div>";
                                                $ActivatePopup += "<div class='popupCloseButton'><i class='fa fa-times' aria-hidden='true'></i></div>";
                                                $ActivatePopup += "<div class='modal-contents' id='deactivateUserContentSection' style='height:auto;border-radius: 0px; border: 0px;text-align:left;'>";
                                                $ActivatePopup += "<div class='modal-body'>";
                                                $ActivatePopup += "<div class='deactivate-user-body' style='margin-top:10px;'>";
                                                $ActivatePopup += "<p style='float:left;margin-bottom:0;margin-right:5px !important;margin-top: 8px !important;margin-left: 35px !important;'>Restore access of User to iRIS</p>";
                                                $ActivatePopup += "<button type='button' id='reactivateUserButton' onclick='MyFunction()' class='xpThemeButton xpPadding'>Confirm</button>";
                                                $ActivatePopup += "<center><p style='font-size: 10pt;margin-top:15px !important;'  >On click of Confirm User will regain access to iRIS</p></center>";
                                                $ActivatePopup += "</div></div></div></div></div>";
                                                $(boxElement).append($($ActivatePopup));
                                                $('.deactivateUserContent').show();
                                                $("#deactivateUserContentSection").slideDown()
                                                $('.popupCloseButton').click(function () {
                                                    $("#deactivateUserContentSection").slideUp(50000)
                                                    $('.deactivateUserContent').remove();
                                                });

                                                $('#sendEmailforLicencePurchase').click(function () {
                                                    var subject = "Request for Licences";

                                                    $.ajax({
                                                        url: "/_layouts/IImpact.Web/LifeCycleService.asmx/SendEmailForLicence",
                                                        contentType: "application/json; charset=utf-8",
                                                        type: "post",
                                                        dataType: "json",
                                                        data: "{EmailSubject:'" + subject + "'}",
                                                        success: function (datap, st) {
                                                        }
                                                    });
                                                });


                                                $('#reactivateUserButton').click(function () {
                                                    $.ajax({
                                                        url: "/_layouts/IImpact.Web/UserMngGridService.asmx/ReactivateUserFromDatabase", contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{itemid:'" + selectedid + "'}",
                                                        success: function (datap, st) {
                                                            var data = datap.d;
                                                            if (data == false) {
                                                                $(".deactivateUserContent").remove();
                                                                location.reload();
                                                            }
                                                        }
                                                    });
                                                });
                                            }
                                        }
                                    }
                                });
                            }
                        },
                    });
                }
                else {

                    $ActivatePopup += "<div class='deactivateUserContent'>";
                    $ActivatePopup += "<span class='helper'></span>";
                    $ActivatePopup += "<div style='width:200px;box-shadow: none;'>";
                    $ActivatePopup += "<div class='popupCloseButton'><i class='fa fa-times' aria-hidden='true'></i></div>";
                    $ActivatePopup += "<div class='modal-contents' id='deactivateUserContentSection' style='height:auto;border-radius: 0px; border: 0px;text-align:left;'>";
                    $ActivatePopup += "<div class='modal-header'>";
                    $ActivatePopup += "<h4 class='modal-title' style='color: #282c3f !important;font-size:20px;font-weight: 600;'>Warning</h4>";
                    $ActivatePopup += "</div>";
                    $ActivatePopup += "<div class='modal-body'>";
                    $ActivatePopup += "<div class='deactivate-user-body' >";
                    $ActivatePopup += "<p style='margin-bottom:0;margin-top: 5px !important;'>Please select a row</p>";
                    $ActivatePopup += "</div></div></div></div></div>";
                    $(boxElement).append($($ActivatePopup));
                    $('.deactivateUserContent').show();
                    $("#deactivateUserContentSection").slideDown();
                    $('.popupCloseButton').click(function () {
                        $("#deactivateUserContentSection").slideUp(50000)
                        $('.deactivateUserContent').remove();
                    });

                }
            });
        },

        setPassword: function (options) {

            var selectedid;
            var defaults = {
            };
            /*extend options with the default values*/
            var opt = $.extend(defaults, options);

            return this.each(function () {
                var $gridelem = this;
                var $headerObj = $("#t_" + $gridelem.id);
                opt.statusdivid = $gridelem.id + "statusdiv";
                var statusdiv = $("<div id='" + opt.statusdivid + "' class='xp-SuccessMsg xp-FontNormal xp-Width99'  />");
                statusdiv.hide();
                $headerObj.prepend(statusdiv);

                var $gridelem = this;
                var parentobject = $(this);
                selectedid = parentobject.getGridParam('selrow');
                if (selectedid != null) {
                    var resetPassword = "<div class='resetPasswordContent'>";
                    resetPassword += " <span class='helper'></span>";
                    resetPassword += "<div>";
                    resetPassword += "<div class='popupCloseButton'><i class='fa fa-times' aria-hidden='true'></i></div>";
                    resetPassword += "<div class='modal-contents' id='resetPasswordContent' style='border-radius: 0px; border: 0px;text-align:left;'>";
                    resetPassword += "<div class='modal-header'>";
                    resetPassword += "<h4 class='modal-title' style='color: #33AEDC;font-weight: 600;'>Set Password</h4>";
                    resetPassword += "</div>";
                    resetPassword += "<div class='modal-body'>";
                    resetPassword += "<div id='passwordValidation' ></div>";
                    resetPassword += "<div class='support-body'>";
                    resetPassword += "<div class='form-group'>";
                    resetPassword += "<label>New Password</label>";
                    resetPassword += "<input type='password' class='form-control' placeholder='Enter Password' id='newPassword'>";
                    resetPassword += "</div>";
                    resetPassword += "<div class='form-group'>";
                    resetPassword += "<label>Verify Password</label>";
                    resetPassword += "<input type='password' class='form-control' placeholder='Verify Password' id='confirmnewPassword'>";
                    resetPassword += "</div>";
                    resetPassword += "<button type='submit' class='xpThemeButton ui-tabbuttonstyle ui-corner-all xp-NewButton' id='submitPassword'>Save </button>";
                    resetPassword += "<button type='button' class='cancelButton ui-tabbuttonstyle ui-corner-all xp-NewButton ' >Cancel </button>";
                    resetPassword += "</div>";
                    resetPassword += "</div>";
                    resetPassword += "</div>";
                    resetPassword += "</div>";
                    resetPassword += "</div>";

                    $('body').append($(resetPassword));
                    $('.resetPasswordContent').show();
                    $("#resetPasswordContentContentSection").slideDown()
                    $('.popupCloseButton').click(function () {
                        $("#resetPasswordContentContentSection").slideUp(50000)
                        $('.resetPasswordContent').remove();
                    });

                    $("#submitPassword").click(function () {
                        var UpperCaseCount = 0;
                        var LowerCaseCount = 0;
                        var digitCount = 0;
                        var specialCharacterCount = 0;
                        var password = $("#newPassword").val();
                        var ConfirmPassword = $("#confirmnewPassword").val();
                        console.log(password.length);
                        for (var i = 0; i < password.length; i++) {
                            if (password[i] >= 'A' && password[i] <= 'Z') { UpperCaseCount++; }
                            else if (password[i] >= 'a' && password[i] <= 'z') { LowerCaseCount++; }
                            else if (password[i] >= '0' && password[i] <= '9') { digitCount++; }
                            else { specialCharacterCount++; }

                        }
                        if (password != ConfirmPassword) {
                            $('#passwordValidation').html("<p class='passwordError'>The new Passwords do not match. Please verify and resubmit.</p><br/>");
                        }

                        else if (UpperCaseCount < 1 || LowerCaseCount < 1 || specialCharacterCount < 1 || digitCount < 1 || password.length < 6) {
                            $('#passwordValidation').html("<div class='passwordError'><p>The New Password requirement is:<ul><li>Must be alphanumeric</li> <li> Minimum 6 characters - at least 1 of which is uppercase</li> <li> Minimum 1 special character</li></ul></p></div>");
                        }
                        else {
                            $.ajax({
                                url: "/_layouts/IImpact.Web/UserMngGridService.asmx/setPassword",
                                contentType: "application/json; charset=utf-8",
                                type: "post",
                                dataType: "json",
                                data: "{userId:'" + selectedid + "',password:'" + password + "'}",
                                success: function (datap, st) {
                                    $('.modal-body').html("Your Password has been successfully reset");
                                },
                                error: function (error) {
                                    $('#passwordValidation').html("<p class='passwordError'><b>This User is deactivated, Passwords can only be reset for Active Users. <br>Please Activate the User, then Reset their Password.</b></p><br>");
                                }
                            });
                        }
                    });

                    $(".cancelButton").click(function () {
                        $(".resetPasswordContent").remove();
                    });

                    $(".fa fa-times").click(function () {
                        $(".resetPasswordContent").remove();
                    });
                }
                else {
                    statusdiv.html('<div class="xp-MarginAuto xp-Width25 xp-WhiteSpace"><div class="xp-FloatLeft xp-MarginAuto xp-PaddingRight-6"></div><div class="xp-FloatLeft xp-MarginAuto xp-VerticalAlignMiddle" >Please select a row</div></div>');
                    statusdiv.removeClass('xp-SuccessMsg').addClass('xp-ErrorMsg');
                    statusdiv.show().fadeOut(10000);
                }
            });
        },


        enableSystemAdmin: function (options) {
            var selectedid;
            var defaults = {
                currentSystemAdmin: '',
                selectedAdminMessage: 'Please assign a system admin',
                systemAdminDivID: '',
                getAdminUsersUrl: "/_layouts/IImpact.Web/UserMngGridService.asmx/GetAdminUsers",
                saveSystemAdminUrl: "/_layouts/IImpact.Web/UserMngGridService.asmx/SaveSystemAdmin"
            };
            var ids = {
                selectedAdmin: 'selectedAdmin',
                selectAdmin: 'selectAdmin',
                radioDiv: 'radioDiv',
                adminUser: 'adminuser',
                arrowIcon: 'arrowIcon',
                systemAdminDivMain: 'systemAdminDivMain'
            };
            /*extend options with the default values*/
            var options = $.extend(defaults, options);
            return this.each(function () {
                var $gridelem = this;
                /*get object of header*/
                var $headerObj = $("#t_" + $gridelem.id);
                options.systemAdminDivID = $gridelem.id + ids.systemAdminDivMain;

                var $elem = $("<div id='" + options.systemAdminDivID + "' class='xp-FloatLeft xp-Width40 xp-MarginTop-5 xp-MarginBottom-5 '></div>");
                var $selectedAdmin = $("<div class='xp-FloatLeft' id='" + ids.selectedAdmin + "'>" + options.selectedAdminMessage + "</div>").appendTo($elem);
                var $arrowIcon = $("<div id='" + ids.arrowIcon + "'class='xp-FloatLeft xp-IconDownArrow xp-Icon xp-Padding-4 Tip-UMSelectedAdmin'></div>").appendTo($elem);
                var $selectAdmin = $("<div class='xp-PositionAbsolute xp-Width30 xp-Margin-0 xp-CustomForm xp-SelectAdminDiv xp-DisplayNone ui-state-default' id='" + ids.selectAdmin + "'>").appendTo($elem);
                $headerObj.append($elem);

                var $radioDiv = $("<div id='" + ids.radioDiv + "' class='xp-FloatLeft xp-Width'>");
                $radioDiv.append("<div class='xp-Width xp-FloatLeft ui-state-default xp-BottomBorder '><div class='xp-Padding-4 xp-FloatLeft xp-FontBold xp-FontSize10pt'>Select an Admin User</div></div>");
                var $scrollUserDiv = $("<div class='xp-FloatLeft xp-Width xp-SelectAdminCss'/>");
                $radioDiv.append($scrollUserDiv);
                var $radioDivUl = $("<ul/>");
                $scrollUserDiv.append($radioDivUl);
                /*
                *Ajax call to get the list of users belonging to the Administrator group
                */
                $.ajax({
                    url: options.getAdminUsersUrl,
                    contentType: "application/json; charset=utf-8",
                    type: "post",
                    dataType: "json",
                    data: "",
                    success: function (datap, st) {
                        var data = datap.d;
                        $.each(data, function (i) {
                            var user = this;
                            if (user.IsSystemAdmin) {
                                $radioDivUl.append($("<li class='xp-LinkLabel xp-SelectedElement'><input id='" + user.Name + "' type='radio' name='" + ids.adminUser + "' value='" + user.LoginName + "'  checked='checked'  /><label for='" + user.Name + "'>" + user.Name + "</label></li>"));
                            }
                            else {
                                $radioDivUl.append($("<li><input id='" + user.Name + "' type='radio' name='" + ids.adminUser + "' value='" + user.LoginName + "' /><label for='" + user.Name + "'>" + user.Name + "</label></li>"));
                            }
                        });
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                    }
                });
                $selectAdmin.append($radioDiv);
                $elem.append("</div></div></div></div>");
                /*
                * On click of the DownArrow
                */
                $arrowIcon.click(function () {
                    var admincount = $('input[type="radio"][name="' + ids.adminUser + '"]').length;
                    $selectAdmin.fadeToggle().addClass("xp-DisplayBlock");
                    if (admincount > 8) {
                        $scrollUserDiv.addClass("xp-SelectAdminScroll");
                        $scrollUserDiv.jScrollPane({ 'verticalDragMinHeight': '60' });
                    }
                    return false;
                });
                /*
                * On click of the Radio button
                */
                $('input[type="radio"][name="' + ids.adminUser + '"]').live("click", function (e) {
                    e.stopImmediatePropogation;
                    $(".xp-SelectedElement").removeClass('xp-LinkLabel');
                    if ($(this).is(":checked")) {
                        var selectedVal = $(this).val();
                        if (selectedVal != options.currentSystemAdmin) {
                            $(this).parent().addClass('xp-LinkLabel xp-SelectedElement');
                            options.currentSystemAdmin = selectedVal;
                            $.ajax({
                                url: options.saveSystemAdminUrl,
                                contentType: "application/json; charset=utf-8",
                                type: "post",
                                dataType: "json",
                                data: "{loginName:'" + selectedVal + "'}",
                                success: function (datap, st) {
                                    var data = datap.d;
                                    if (data.Status == "success") {
                                        $selectedAdmin.html(data.Message);
                                        $selectAdmin.hide();
                                    }
                                    return false;
                                }
                            });
                        }
                    }
                });
            })
        },
        setUpViews: function () {

            this.each(function () {

                var $gridelem = this;
                var parent = $(this);
                isActivity = false;
                isActivity = parent.getPostData()["isactivity"];
                /*Code for email and views*/
                if ($gridelem.p.enableViews) {

                    if ($.isFunction(parent.createViewsContainer) == true) {

                        /*check if viewurl to get list of views is also part of input*/
                        if ($gridelem.p.viewsurl != "" && $gridelem.p.viewscolumnsurl != "" && $gridelem.p.saveviewsurl != "") {
                            parent.createViewsDropDown();
                            parent.createViewsContainer();
                            var listbox = document.getElementById($gridelem.id + "selectViews");
                            /*this is where we check if new view number is limited*/
                            /*dont need to to have new view link incase of activity table only need it in tracker table*/
                            parent.createModifyViewLink();
                            if (!isActivity) {
                                parent.createNewViewLink();
                            }
                        }
                        else {
                            alert("views configuration not set  properly");
                        }
                    }
                }
            });
            /*End of code for email and views*/
        },


        createModifyViewLink: function () {
            var defaults = {
                createModifyLinkID: $(this).attr('id') + "ModifylinkID"
            };
            this.each(function () {
                var gridelem = $(this);
                this.p = $.extend(this.p, defaults);
                var modifylink = $("<img id='" + defaults.createModifyLinkID + "' src='/_layouts/Images/XPointBase/modify_icon.png' class= 'xp-FloatLeft xp-HoverCursor'style='margin:1px 0px 1px 4px;' />");
                modifylink.attr('opt', 'Modify');
                modifylink.click(function () {
                    modifylink.hide();
                    $("#" + $gridelem.p.createNewLinkID).hide();
                    gridelem.viewLinkClick('Modify');

                });
                $("#t_" + $(gridelem).attr('id')).append(modifylink);
                var isactivity = gridelem.getPostData()["isactivity"];
                if (!isactivity) {
                    modifylink.hide();
                }
            });
        },
        /*create a link for creating new view*/
        createNewViewLink: function () {
            var defaults = {
                createNewLinkID: $(this).attr('id') + "createnewlinkID"
            };
            this.each(function () {
                var gridelem = $(this);
                this.p = $.extend(this.p, defaults);
                var newlink = $("<span id='" + defaults.createNewLinkID + "' class='ui-primarytabclr ui-tabbuttonstyle ui-corner-all xp-HoverCursor xp-PositionAbsolute' style='margin:1px 0px 1px 4px;left:240px;'>add view</span>");

                //          newlink.button({icons: {primary:"ui-icon-plus" }});
                newlink.attr('opt', 'New');
                newlink.click(function () {
                    gridelem.viewLinkClick('New');
                    newlink.hide();
                    $("#" + $gridelem.p.createModifyLinkID).hide();
                });
                var headerbar = $("#t_" + $(gridelem).attr('id'));
                $(headerbar).append(newlink);
            });
        },
        /*function performed on modify or new view click*/
        viewLinkClick: function (opt) {

            this.each(function () {
                var grid = $(this);
                /*check if the operation is specified*/
                if (opt != "") {
                    if (opt == 'New') {
                        grid.clearViewFields();
                        $("#" + this.p.viewssave).attr("opt", "createnew");
                        $("#" + this.p.viewContainerID).show();
                    }
                    if (opt == 'Modify') {
                        grid.clearViewFields();
                        $("#" + this.p.viewssave).attr("opt", "modify");
                        grid.populateViewFields();
                        $("#" + this.p.viewContainerID).show();
                    }
                }
                else {
                    alert('Not valid operation');
                }
            });
        },
        /*gets the columns for the current selected view from the drop down*/
        populateViewFields: function () {
            var $parent = $(this);
            this.each(function () {
                var $gridelem = this;
                isactivity = $parent.getPostData()["isactivity"];
                $("#" + $gridelem.p.viewsnameID).val($("#" + $gridelem.id + "selectViews option:selected").text());
                $("#" + $gridelem.p.viewsnameID).attr("internalname", $("#" + $gridelem.id + "selectViews option:selected").val());
                if (isactivity) {
                    $("#" + $gridelem.p.viewsnameID).attr('disabled', true);
                }
                if ($gridelem.p.currentViewColumns != null) {
                    $.each($gridelem.p.currentViewColumns, function (i, colm) {
                        $("#" + $gridelem.p.viewContainerID).find("input[type=\'checkbox\']").each(function (count, obj) {
                            if ($(this).val() == colm) {
                                $(this).attr("checked", true);
                            }
                        });
                    });
                }
            });

        },
        /*clear are fields of view container*/
        clearViewFields: function () {
            this.each(function () {

                $("#" + this.p.viewContainerID).find("input").each(function (el) {
                    switch ($(this).get(0).type) {
                        case "checkbox":
                            $(this).attr("checked", false);
                            break;
                        case "text":
                            $(this).val("");
                            break;
                    }
                });
            });
        },
        /*this functions creates views drop down gets the list from specified webservice url 
        *and populates the list in the drop down and adds the drop down to parent container*/
        createViewsDropDown: function (options) {
            // get the object of the table*/
            var parent = $(this);
            isActivity = false;
            isActivity = parent.getPostData()["isactivity"];
            // @ToDo will need to add options out here and extend it to parent 'p' options
            this.each(function () {
                //get the object of header toolbar of the grid
                var $headerObj = $("#t_" + $(parent).attr('id'));
                $gridelem = this;

                if ($headerObj != null) {
                    /*create new object of type select will append the html according to the list
                    *retrieved from getviews webservice*/
                    var selectObj = "<select id='" + $gridelem.id + "selectViews' class='xp-FloatLeft' />";
                    $("#t_" + $gridelem.id).append(selectObj);
                    var selecthtml = '';
                    if (!isActivity) {
                        $.ajax({
                            url: $gridelem.p.viewsurl, contentType: "application/json; charset=utf-8", type: $gridelem.p.mtype, dataType: "json", data: "{}",
                            complete: function (datap, st) {
                                if (st == "success") {
                                    var data = ($.jgrid.parse(datap.responseText)).d;
                                    $.each(data, function (i, view) {
                                        var internalname = this.internalname;
                                        var displayname = this.displayname;
                                        /* Add the option value for each data */
                                        selecthtml += '<option value="' + internalname + '">' + displayname + '</option>';
                                    });
                                    $("#" + $gridelem.id + "selectViews").html(selecthtml);
                                    if ($("#" + $gridelem.id + "selectViews option").length >= 5) {

                                        $("#" + $gridelem.p.createNewLinkID).hide();
                                    }

                                }
                            }
                        });
                    }
                    else {
                        selecthtml = "<option value='Team'>As a team member</option>";
                        selecthtml += "<option value='Fav'>As my favorites</option>";
                        selecthtml += "<option value='Lead'>As a team lead</option>";
                        selecthtml += "<option value='Origin'>As an owner</option>";
                        $("#" + $gridelem.id + "selectViews").html(selecthtml);
                        $(parent).updateViewColumns();
                    }

                    $("#" + $gridelem.id + "selectViews").change(function () {
                        $("#" + $gridelem.p.viewContainerID).hide();
                        if ($(this).val() == "AllInfo") {
                            //hide modify link                                       
                            $("#" + $gridelem.p.createModifyLinkID).hide();
                        }
                        else {
                            /*incase of activity set parameter selected view*/
                            if (isActivity) {

                                parent.setPostDataItem("selview", $(this).val());

                            }
                            $("#" + $gridelem.p.createModifyLinkID).show();
                        }
                        if ($("#" + $gridelem.id + "selectViews option").length < 5) {

                            //                      $("#" + $gridelem.p.createNewLinkID).show();
                        }
                        $(parent).updateViewColumns(true);
                    });
                }
                else {
                    alert("Header toolbar doesnt exists");
                }
            });
        },
        /*get the columns for the current view and show/hide columns accordingly*/
        updateViewColumns: function (reload) {

            var $parent = this;
            var isactivity = $($parent).getPostData()["isactivity"];
            this.each(function () {
                var viewColumns;
                $gridElem = this;

                var viewsoptions = { currentViewColumns: [] };
                $gridElem.p = $.extend($gridElem.p, viewsoptions);
                var objt = $(this);
                var tmparray = new Array();
                var selectElem = $("#" + $gridElem.id + "selectViews");
                if (selectElem.length > 0) {
                    var viewvalue = selectElem.val();
                    $.ajax({
                        url: $gridElem.p.viewscolumnsurl, contentType: "application/json; charset=utf-8", type: $gridElem.p.mtype, dataType: "json", data: "{viewinternalname:'" + viewvalue + "'}",
                        complete: function (datap, st) {
                            if (st == "success") {
                                viewColumns = ($.jgrid.parse(datap.responseText)).d;
                                /*hide all columns first*/
                                var colModels = $gridElem.p.colModel;
                                $.each(colModels, function (i, curr) {

                                    objt.hideCol(this.name);
                                });
                                objt.showCol("Title");
                                if ($gridElem.p.rownumbers) {
                                    objt.showCol("rn");
                                }
                                /*check for ech returned column name with modal array if matches show the column*/
                                $.each(viewColumns, function (i, obj) {
                                    $.each($gridElem.p.colModel, function (j, modal) {
                                        if (obj.internalname == modal.name) {
                                            objt.showCol(modal.name);
                                            tmparray.push(obj.internalname);
                                        }
                                    });
                                });
                                if (reload != null && reload) {
                                    $parent.trigger("reloadGrid");
                                }
                            }
                            $gridElem.p.currentViewColumns = tmparray;
                        }
                    });
                }
                else { alert('Invalid select option'); }
            })
        },
        /*creates the views control*/
        createViewsContainer: function (options) {
            /*defines the default values to options*/
            var defaults = {
                modifyViewUrl: "",
                createViewUrl: "",
                /*dont initialize containerid unless really wanted*/
                viewscontainerID: $(this).attr('id') + "viewcontainer",
                viewsnameID: $(this).attr('id') + "viewcontainername",
                viewssave: $(this).attr('id') + "viewcontainersave",
                viewscancel: $(this).attr('id') + "viewcancel"
            };
            var $container;
            options = $.extend(options, defaults);
            /*work in extended mode of the parent plugin*/
            var $grid = this;
            this.each(function () {
                /*extend parent options with defaults here*/
                var $parent = this;
                $parent.p = $.extend($parent.p, options);

                /*get the colnames and value to create views container 
                "the below code creates the "Create New View" container"*/
                var colnames = $parent.p.colNames;
                var colModel = $parent.p.colModel;
                $container = $("<div id='" + options.containerID + "' style='padding:6px;' class='xp-GrayBackground xp-Width'/>")
                var divhtml = "";
                divhtml = "<div class='xp-FloatLeft' style='padding:0px 0px 0px 4px;margin-left:8px;'>";

                divhtml += "<span class='xp-FontNormal' style='padding:0px 6px 0px 0px'>View Name</span>";
                divhtml += "<input autocomplete='off' class='xp-TxtBox' style='margin:0px 2px 0px 2px' type='text' maxlength='15' internalname=''  id='" + options.viewsnameID + "'/>";
                divhtml += "<input type='button' value='Save' opt='' id='" + options.viewssave + "' class='ui-primarytabclr ui-tabbuttonstyle ui-corner-all'  style='margin:0px 4px 0px 4px'/>";
                divhtml += "<input type='button' value='Cancel' opt='' id='" + options.viewscancel + "' class='ui-secondarytabclr ui-tabbuttonstyle ui-corner-all' style='margin:0px 4px 0px 4px'/><br/>";
                divhtml += "</div>";
                $container.append(divhtml);
                var html = "";
                html = "<div  class='xp-Width xp-FloatLeft xp-HeightAuto' style='margin-left:8px;margin-top:4px;'>";

                /*traverse through the colnames and make html for container 
                "the below code creates a tickbox with text with proper spacing"*/
                $.each(colModel, function (i, obj) {
                    if (this.name != "rn") {
                        var colvalue = this.name;
                        if (colvalue === "Title") {
                            html += "<div class='xp-FloatLeft xp-Width25 xp-DisplayNone' >";
                            html += "<input type='checkbox' class='xp-DisplayNone' name='" + colnames[i] + "' value='" + colvalue + "' /> ";
                        }
                        else {
                            html += "<div class='xp-FloatLeft' style='margin:0px 3px 0px 0px;min-width:13%;height:40px'>";
                            html += "<input type='checkbox' name='" + colnames[i] + "' value='" + colvalue + "' /> " + colnames[i] + " ";
                        }
                        html += "</div>";
                    }
                });

                html += "</div>";
                $container.append(html);

                var parentnode = $(this).parents().get(1);
                $("#t_" + $gridelem.id).prepend($container);

                $("#" + options.viewssave).click(function () {
                    if ($grid.saveView() == true) {
                        if ($("#" + $gridelem.id + "selectViews option").length > 4) {
                            $("#" + $gridelem.p.createNewLinkID).hide();
                        }
                        else {
                            $("#" + $gridelem.p.createNewLinkID).show();
                        }
                    }
                });
                $("#t_" + $gridelem.id).prepend($container);
                $("#" + options.viewscancel).click(function () {
                    $("#" + $parent.p.viewsContainerID).hide();
                    if ($("#" + $gridelem.id + "selectViews").val() != "AllInfo") {
                        $("#" + $gridelem.p.createModifyLinkID).show();
                    }
                    if ($("#" + $gridelem.id + "selectViews option").length <= 4) {
                        if ($gridelem.p.createNewLinkID != null) {
                            $("#" + $gridelem.p.createNewLinkID).show();
                        }
                    }
                });
                $("#" + $parent.p.viewsContainerID).hide();
            });
        },
        /*add the idea to favorites list*/
        addFavorites: function (opt) {
            var selectedid;
            var defaults = {
                favoritesurl: "",
                favoriteslinkID: "",
                statusdivid: ""
            };
            /*extend options with the default values*/
            opt = $.extend(defaults, opt);
            return this.each(function () {
                var $gridelem = this;
                var parentobject = $(this);
                /*get object of header*/
                var $headerObj = $("#t_" + $gridelem.id);
                opt.favoriteslinkID = $gridelem.id + "addfavs";
                opt.statusdivid = $gridelem.id + "statusdiv";
                var $favbutton = $("<img id='" + opt.favoriteslinkID + "' class='pngddd xp-FloatLeft xp-HoverCursor xp-Height-20' style='margin:0px 10px 0px 0px;width:20px;' src='_layouts/Images/XPointBase/favorite_Yes.png' alt='Add as Favorite'/>");
                $headerObj.prepend($favbutton);
                var statusdiv = $("'#" + opt.statusdivid + "'");
                if (statusdiv.length == 0) {
                    statusdiv = $("<div id='" + opt.statusdivid + "' class='xp-SuccessMsg xp-FontNormal xp-Width99' />");
                    statusdiv.hide();
                    //$($($gridelem).parents().get(2)).prepend(statusdiv);
                    $headerObj.prepend(statusdiv);
                }
                $favbutton.click(function () {
                    statusdiv.hide();
                    statusdiv.removeClass("ui-state-error");
                    statusdiv.removeClass("xp-SuccessMsg");
                    selectedid = parentobject.getGridParam('selrow');
                    parentobject.resetSelection();
                    if (selectedid != null) {
                        $.ajax({
                            url: opt.favoritesurl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{itemid:'" + selectedid + "'}",
                            success: function (datap, st) {
                                var data = datap.d;
                                if (data == "Added as Favorite Successfully" || data == "Updated Successfully.") {
                                    /*if the item is added successfully populate the grid again to reflect th change*/
                                    $gridelem.grid.populate();
                                }
                                statusdiv.html('<div class = "xp-MarginAuto xp-Width25 xp-WhiteSpace"><div class="xp-FloatLeft xp-MarginAuto xp-PaddingRight-6" ><img src="/_layouts/Images/XPointBase/success_msg.png" /></div><div class="xp-FloatLeft xp-MarginAuto xp-VerticalAlignMiddle" >' + data + '</div></div>');
                                /*alert the status returned*/
                                statusdiv.addClass("xp-SuccessMsg");
                                statusdiv.show().fadeOut(10000);
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                statusdiv.html('<div class = "xp-MarginAuto xp-Width20" ><div class="xp-FloatLeft xp-MarginAuto xp-PaddingRight-6" ><img src="/_layouts/Images/XPointBase/error_msg.png" /></div><div class="xp-FloatLeft xp-MarginAuto xp-VerticalAlignMiddle" >Not added as Favorites</div></div>');
                                statusdiv.addClass("ui-state-error");
                                statusdiv.addClass("xp-ErrorMsg");
                                statusdiv.show().fadeOut(10000);
                            }
                        });
                    }
                    else {
                        statusdiv.html('<div class = "xp-MarginAuto xp-Width20"><div class="xp-FloatLeft xp-MarginAuto xp-PaddingRight-6"><img src="/_layouts/Images/XPointBase/error_msg.png" /></div><div class="xp-FloatLeft xp-MarginAuto">Please Select a Row</div></div>');
                        statusdiv.addClass("ui-state-error");
                        statusdiv.addClass("xp-ErrorMsg");
                        statusdiv.show().fadeOut(10000);
                    }
                });
            });
        },
        saveView: function (e) {

            this.each(function () {
                var $gridelem = this;
                var statusdivid = $gridelem.id + "statusdiv";
                var statusdiv = $("#" + statusdivid);
                if (statusdiv.length == 0) {
                    statusdiv = $("<div id='" + statusdivid + "' class='xp-SuccessMsg xp-Font xp-Width' />");
                    statusdiv.hide();
                    $($($gridelem).parents().get(2)).prepend(statusdiv);
                }
                var objt = $(this);
                var tmparr = new Array();
                $("#" + $gridelem.p.viewContainerID).find("input[type=\'checkbox\']").each(function (count, obj) {
                    if ($(this).attr("checked") == true) {
                        tmparr.push($(this).val());
                    }
                });
                var optname = $("#" + $gridelem.p.viewssave).attr('opt');
                var viewinternalname = $("#" + $gridelem.p.viewsnameID).attr('internalname');
                var viewdisplayname = $("#" + $gridelem.p.viewsnameID).val();
                statusdiv.hide();
                statusdiv.removeClass("ui-state-error");
                statusdiv.removeClass("xp-SuccessMsg");
                statusdiv.removeClass("xp-ErrorMsg");
                if (viewdisplayname != "") {
                    var validentry = true;
                    if (optname.toLowerCase() == "createnew") {
                        $.each($("#" + $gridelem.id + "selectViews").children(), function () {
                            if ($(this).text().toLowerCase() == viewdisplayname.toLowerCase()) {
                                validentry = false;
                            }
                        });

                    }
                    if (validentry) {
                        var prm = { fields: tmparr, opt: optname, internalname: viewinternalname, displayname: viewdisplayname };
                        var sdata = { 'savedata': prm };
                        $.ajax({
                            url: $gridelem.p.saveviewsurl, async: false, contentType: "application/json; charset=utf-8", type: $gridelem.p.mtype, dataType: "json", data: JSON.stringify(sdata),
                            complete: function (datap, st) {
                                if (st == "success") {
                                    var tmparray = new Array();
                                    viewColumns = ($.jgrid.parse(datap.responseText)).d;
                                    /*hide all columns first*/
                                    var colModels = $gridelem.p.colModel;
                                    $.each(colModels, function (i, curr) {
                                        objt.hideCol(this.name);
                                    });
                                    objt.showCol("Title");
                                    if ($gridelem.p.rownumbers) {
                                        objt.showCol("rn");
                                    }
                                    /*check for each returned column name with modal array if matches show the column*/
                                    $.each(viewColumns, function (i, obj) {
                                        $.each($gridelem.p.colModel, function (j, modal) {
                                            if (obj.internalname == modal.name) {
                                                objt.showCol(modal.name);
                                                tmparray.push(obj.internalname);
                                            }
                                        });
                                    });
                                    $gridelem.p.currentViewColumns = tmparray;
                                    objt.populateViewDropDown();
                                    if ($("#" + $gridelem.id + "selectViews option").length < 5) {
                                        $("#" + $gridelem.p.createNewLinkID).show();
                                    }


                                    $("#" + $gridelem.p.viewContainerID).hide();
                                    if (optname == "createnew") {
                                        $("#" + $gridelem.id + "selectViews option[value='" + viewdisplayname + "']").attr('selected', 'selected');
                                        statusdiv.html('<div class="xp-MarginAuto xp-Width20" ><div class="xp-FloatLeft xp-MarginAuto xp-PaddingRight-6"><img src="/_layouts/Images/XPointBase/success_msg.png" /></div><div class="xp-FloatLeft xp-MarginAuto">View saved successfully</div></div>');
                                        /*alert the status returned*/
                                        statusdiv.addClass("xp-SuccessMsg");
                                        statusdiv.show().fadeOut(10000);
                                    }
                                    else {
                                        $("#" + $gridelem.id + "selectViews option[value='" + viewinternalname + "']").attr('selected', 'selected');

                                        statusdiv.html('<div class="xp-MarginAuto xp-Width20"><div class="xp-FloatLeft xp-MarginAuto xp-PaddingRight-6" ><img src="/_layouts/Images/XPointBase/success_msg.png" /></div><div class="xp-FloatLeft xp-MarginAuto xp-FontNormal">View modified successfully</div></div>');
                                        /*alert the status returned*/
                                        statusdiv.addClass("xp-SuccessMsg");
                                        statusdiv.show().fadeOut(10000);
                                    }
                                    $("#" + $gridelem.p.createModifyLinkID).show();
                                }
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                statusdiv.html('<div class="xp-MarginAuto xp-Width20"><div class="xp-FloatLeft xp-MarginAuto xp-PaddingRight-6" ><img src="/_layouts/Images/XPointBase/error_msg.png" /></div><div class="xp-FloatLeft xp-MarginAuto">View Not Added</div></div>');
                                statusdiv.addClass("ui-state-error");
                                statusdiv.addClass("xp-ErrorMsg");
                                statusdiv.show().fadeOut(10000);
                            }
                        });
                    }
                    else {
                        statusdiv.html('<div class="xp-MarginAuto xp-Width25" ><div class="xp-FloatLeft xp-MarginAuto xp-PaddingRight-6"><img src="/_layouts/Images/XPointBase/error_msg.png" /></div><div class="xp-FloatLeft xp-MarginAuto">Cannot create two views with same name</div></div>');
                        statusdiv.addClass("ui-state-error");
                        statusdiv.addClass("xp-ErrorMsg");
                        statusdiv.show().fadeOut(10000);
                        return false;
                    }
                }
                else {
                    statusdiv.html('<div class="xp-MarginAuto xp-Width20"><div class="xp-FloatLeft xp-MarginAuto xp-PaddingRight-6"><img src="/_layouts/Images/XPointBase/error_msg.png" /></div><div class="xp-FloatLeft xp-MarginAuto">View name cannot be blank</div></div>');
                    statusdiv.addClass("ui-state-error");
                    statusdiv.addClass("xp-ErrorMsg");
                    statusdiv.show().fadeOut(10000);
                    return false;
                }
                return true;
            });

        },
        showhideColumns: function () {
            this.each(function () {
                var $grid = this;
                $.each($grid.p.currentViewColumns, function (i, obj) {
                    $.each($grid.p.colModel, function (j, model) {

                    });

                });
            });
        },

        /*this method will update the width value of grid according to the screen resoultion*/
        setGridAsPerScreen: function (options) {
            var defaults = {
                screenCssMap: 'Default',
                shrinkToFit: true
            };
            var options = $.extend(defaults, options);
            var screenwidth = 0, screenheight = 0;
            screenwidth = screen.width;
            screenheight = screen.height;
            return this.each(function () {
                var fms = xpointGridWidth.formatters;
                var dfm = fms["Default"];
                var fm = fms[options.screenCssMap] ? fms[options.screenCssMap] : dfm;
                var width = fm[screenwidth] ? fm[screenwidth](fm).width : (dfm[screenwidth] ? dfm[screenwidth](fm).width : screenwidth);
                var $gridelem = $(this);
                var shrink = (options.shrinkToFit == 'true') ? true : false;
                $gridelem.setGridWidth(width, shrink);
            });
        },

        populateViewDropDown: function () {
            this.each(function () {
                var $gridelem = this;
                var selecthtml = '';
                $.ajax({
                    url: $gridelem.p.viewsurl, async: false, contentType: "application/json; charset=utf-8", type: $gridelem.p.mtype, dataType: "json", data: "{}",
                    complete: function (datap, st) {
                        if (st == "success") {
                            var data = ($.jgrid.parse(datap.responseText)).d;
                            $.each(data, function (i, view) {
                                var internalname = this.internalname;
                                var displayname = this.displayname;
                                /*  */
                                selecthtml += '<option value="' + internalname + '">' + displayname + '</option>';
                            });
                            $("#" + $gridelem.id + "selectViews").html(selecthtml);
                        }
                    }
                });
            });
        },
        /*
        * prepareParetoChart  - This plugin will draw the pareto chart  with specified options 
        * Note: Plugin used for drawing chart - jquery.flot.js and excanvas.js   
        * How it works ?  
        * For each dataid in the specified jqgrid  we try to retrieve  X  label and corresponding value which becomes Y1 value
        * then we compute the commulative value and that becomes  y2 value for the corresponding x label.
        */
        prepareParetoChart: function (options) {
            var defaults = {
                gridid: "",
                y1values: [],
                y2values: [],
                valuecell: "",
                xcell: "",
                y1axislabel: "",
                y2axislable: "",
                totalcount: 0,
                labels: []
            };
            var gridelem;
            /* 
            * Extend the defaults with options specified while calling the plugin           
            */
            var options = $.extend(defaults, options);
            /*
            * Prepare values for Y1 Axis and have the total count
            */
            function PrepareY1() {
                var d1 = [], labels = [], total = 0;
                //  d1.push([0, null]);
                var ids = gridelem.getDataIDs();
                for (var i = 0; i < ids.length; i++) {
                    /*
                    * get x axis label  with specified  xcell as columnname in the jqgrid 
                    */
                    var xvalue = gridelem.getCell(ids[i], options.xcell);
                    /*
                    * get y axis value  with specified  valuecell as columnname in the jqgrid 
                    */
                    var yvalue = parseInt(gridelem.getCell(ids[i], options.valuecell));
                    /*
                    *calculate val to draw the x labels  (.25 subtraction done to align the x label value properly)
                    */
                    var val = (i - 0.25);
                    d1.push([val, yvalue]);
                    total += yvalue;
                    labels.push(xvalue);
                }
                options.labels = labels;
                options.y1values = d1;
                options.totalcount = total;
            }
            /*
            * Prepare values for Y2 Axis  
            */
            function PrepareY2() {
                var d1 = [], total = 0, cummlativeVal = 0;
                var ids = gridelem.getDataIDs();
                // d1.push([0, null]);
                for (var i = 0; i < ids.length; i++) {
                    /*
                    * get x axis label  with specified  xcell as columnname in the jqgrid 
                    */
                    var xvalue = gridelem.getCell(ids[i], options.xcell);
                    /*
                    * get y  value  with specified  valuecell as columnname in the jqgrid  and then we compute the
                    * commulative value for y2 axis
                    */
                    var yvalue = parseInt(gridelem.getCell(ids[i], options.valuecell));
                    cummlativeVal = cummlativeVal + yvalue;
                    yvalue = ((cummlativeVal / options.totalcount) * 100);
                    /*
                    *  push the value in array (Note no subtraction is required for index in here - Because it draws just a point and not label like in  case 
                    * y1 axis
                    */
                    d1.push([i, yvalue]);

                }
                options.y2values = d1;
            }
            function showTooltip(x, y, contents) {
                $('<div id="tooltip">' + contents + '</div>').css({
                    position: 'absolute',
                    display: 'none',
                    top: y + 5,
                    left: x + 5,
                    border: '1px solid #fdd',
                    padding: '2px',
                    'background-color': '#fee',
                    opacity: 0.80
                }).addClass("xp-Font")
                .appendTo("body").fadeIn(200);
            }

            return this.each(function () {
                var $this = $(this);
                /*
                *  Do a sanity check if the grid id is given
                */
                if ($.trim(options.gridid)) {
                    gridelem = $("#" + options.gridid);
                    if (gridelem.length > 0) {
                        PrepareY1();
                        PrepareY2();
                        /*Start  Plotting with various options*/
                        $.plot($this, [
                               {
                                   data: options.y1values,
                                   bars: { show: true, barWidth: 0.6 }

                               },
                               {
                                   data: options.y2values,
                                   lines: { show: true, fill: true },
                                   points: { show: true }
                                   , yaxis: 2
                               }
                        ],
                             {
                                 grid: { hoverable: true, clickable: true },
                                 xaxis: {
                                     /* 
                                     * Number of ticks should be equal to labels length so that tickformatter is called (labels length) times
                                     */
                                     ticks: options.labels.length,
                                     tickFormatter: function (x, axis) {
                                         /*
                                         * Calculate the index of the x  and get corresponding label value from  options.label value
                                         */
                                         if (options.labels[Math.round((x - axis.min) / axis.tickSize)]) {
                                             return options.labels[Math.round((x - axis.min) / axis.tickSize)];
                                         }
                                         return "";
                                     }
                                 },
                                 y2axis: {
                                     ticks: 10,
                                     min: 0,
                                     max: 100
                                 }
                             }
                        );
                        /*End Plotting*/
                        var previousPoint = null;
                        $this.blur(function () {
                            $("#tooltip").remove();
                        });
                        /*
                        * On hover gives description  of y2 axis plotted points
                        */
                        $this.bind("plothover", function (event, pos, item) {
                            $("#x").text(pos.x.toFixed(2));
                            $("#y").text(pos.y.toFixed(2));
                            if (item) {
                                if (previousPoint != item.datapoint && !(item.series.bars.show)) {
                                    previousPoint = item.datapoint;

                                    $("#tooltip").remove();
                                    try {
                                        var x = item.datapoint[0].toFixed(2),
                                       y = item.datapoint[1].toFixed(2);
                                        if (x && y) {
                                            showTooltip(item.pageX, item.pageY,
                                 "Cumulative % is " + y);
                                        }
                                    }
                                    catch (Er)
                                    { }
                                }
                            }
                            else {
                                $("#tooltip").remove();
                                previousPoint = null;
                            }
                        });
                    }
                }
            });
        },
        setupEmail: function (options) {
            var defaults = {
                url: "",
                columnname: "Team",
                updatecount: false,
                columntoupdate: "",
                listtoupdate: "",
                itemid: "",
                updateurl: "",
                position: "bottom",
                emailpopupid: "email_popup" + $(this).attr('id')
            };
            var $this = $(this);
            var $team;
            var options = $.extend(defaults, options);
            var $emailpopup = $("#" + options.emailpopupid);
            function CreateEmailPanel(parent) {
                if ($emailpopup.length > 0) {
                    $emailpopup.children().remove();
                    $emailpopup.remove();
                }

                var html = "";
                $emailpopup = $("<div id='" + options.emailpopupid + "' title='Compose Email' />");
                html += "<table border=0 width=100% cellspacing=0 cellpadding=6><tbody>";
                html += "<tr><td valign=top width='10%'>To:</td>";
                html += "<td><input autocomplete='off' id='" + $this.attr('id') + "EmailTitle'></textarea></td>";
                html += "<td width='20%' valign=top>Use Template: </td>";
                html += "<td valign=top><select id='" + $this.attr('id') + "EmailTemplate' class='xp-Width'></select></td>";
                html += "</tr><tr><td valign=top>Subject:</td><td colspan=3><input autocomplete='off' type=text name=Subject id='" + $this.attr('id') + "EmailSubject' style='width:85%' class='xp-TxtBox'/></td></tr><tr><td colspan=4>";
                html += "<textarea name='body' id='" + $this.attr('id') + "EmailBody' cols='85'></textarea></td></tr>";
                html += "</tbody></table>";

                $emailpopup.html(html);
                $('body').append($emailpopup);
                $team = $("#" + $this.attr('id') + "EmailTitle");

                var $emailtempalte = $("#" + $this.attr('id') + "EmailTemplate");
                var $email = $("#" + $this.attr('id') + "EmailSubject");
                var $body = $("#" + $this.attr('id') + "EmailBody");
                var allFields = $([]).add($team).add($email).add($body).add($emailtempalte);
                $emailpopup.dialog({
                    autoOpen: false,
                    width: 730,
                    height: 340,
                    bgiframe: true,
                    modal: true,
                    buttons: {
                        'Send': function () {
                            tinyMCE.triggerSave();
                            var pdata = { team: $team.val(), subject: $email.val(), body: $body.val() };
                            var gpost = { 'post': pdata };
                            $.ajax({
                                url: options.url, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: $.toJSON(gpost),
                                success: function (datap, st) {
                                    var data = datap.d;
                                    if (data == "success") {
                                        if (options.updatecount && options.trackerid != "") {
                                            $.ajax({
                                                url: options.updateurl, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: "{location:'" + location.href + "', itemid:'" + options.trackerid + "',listname:'" + options.listtoupdate + "',countcolumn:'" + options.columntoupdate + "'}",
                                                success: function (datap, st) {
                                                    parent.trigger("reloadGrid"); $emailpopup.dialog('close');
                                                }
                                            });

                                        }
                                        else {

                                            $emailpopup.dialog('close');
                                        }

                                    }
                                }
                            });
                        },
                        Cancel: function () {
                            $(this).dialog('close');
                        }
                    },
                    open: function () {
                        $body.RelayRichText();
                    },
                    close: function () {
                        tinyMCE.execCommand("mceRemoveControl", true, $body.attr("id"));
                        allFields.val('');
                    }

                });

                return $emailpopup;
            }
            /* Adding Admin created templates in the mail */
            function AdminEmailTemplates() {
                $.ajax({
                    url: '/_layouts/IImpact.Web/AdminEMailTemplateService.asmx/GetEMailTemplateItems',
                    contentType: "application/json; charset=utf-8",
                    type: "POST",
                    dataType: "json",
                    success: function (datap) {
                        var result = datap.d;
                        if (result) {
                            var template = {};
                            $.each(result, function () {
                                var resultTemp = this;
                                var options = $("<option value='" + resultTemp.templateID + "'>" + resultTemp.title + "</option>");
                                $("#" + $this.attr('id') + "EmailTemplate").append(options);
                                template[resultTemp.templateID] = {
                                    title: resultTemp.title,
                                    subject: resultTemp.eMailSubject,
                                    body: resultTemp.eMailBody
                                }
                            });
                            /*
                            * On selection change of the drop down (email templates)
                            */
                            $("#" + $this.attr('id') + "EmailTemplate").change(function (j) {
                                $("#" + $this.attr('id') + "EmailSubject").val(template[$(this).val()].subject);
                                $("#" + $this.attr('id') + "EmailBody").val(template[$(this).val()].body);
                            });
                        }

                    }
                });
            }
            function OpenEmail(parent) {
                if (options.columnname != "") {
                    var rowid = parent.getGridParam('selrow');
                    if (rowid != null) {
                        options.trackerid = rowid;
                        var team = parent.getColumnData(rowid, options.columnname);
                        var datap = formatPeoplepickerVal(team);
                        if (team != "") {
                            $team.peoplepicker({ multiple: true, prePopulate: datap });
                        }
                    }
                    else {
                        $team.peoplepicker({ multiple: true });
                    }
                }
                else {
                    $team.peoplepicker({ multiple: true });
                }
                $emailpopup.dialog('open');
            }
            return this.each(function () {
                var $gridelem = this;
                var parent = $(this);
                var pagerid = $(parent).get(0).p.pager.attr('id');
                /*Add the button */
                if (options.position == "top") {
                    var $btn = $("<input type='button' title='Send Mail' class='xp-MailImg xp-IconEmail xp-Icon xp-FloatLeft' />");
                    $("#t_" + parent.attr('id')).append($btn);
                    $btn.click(function () {
                        CreateEmailPanel(parent);
                        OpenEmail(parent);

                    });

                }
                else {
                    $(parent).navButtonAdd("#" + pagerid, {
                        caption: "", title: "Email", buttonicon: "ui-icon-mail-closed", onClickButton: function () { CreateEmailPanel(parent); AdminEmailTemplates(); OpenEmail(parent); }, position: "last"
                    });
                }

            });
        },
        SloughExceptionsChart: function (options) {
            var defaults = {
                gridid: "",
                idenvalue: "",
                closedvalue: "",
                valuecell: ""
            };
            var gridelem;
            var months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
            var options = $.extend(defaults, options);
            var identified;
            var closed;
            /*
            * Prepare values for Y1 Axis and have the total count
            */
            function PrepareY1() {
                var d1 = [];
                var ids = gridelem.getDataIDs();
                for (var m = 0; m < months.length; m++) {
                    var xvalue = 0;
                    for (var i = 0; i < ids.length; i++) {
                        if (gridelem.getCell(ids[i], options.idenvalue) == months[m]) {
                            xvalue++;
                        }

                    }
                    d1.push([m, xvalue]);
                }
                identified = d1;
            }
            /*
            * Prepare values for Y2 Axis  
            */
            function PrepareY2() {
                var d1 = [];
                var ids = gridelem.getDataIDs();
                for (var m = 0; m < months.length; m++) {
                    var xvalue = 0;
                    for (var i = 0; i < ids.length; i++) {
                        var gridvalue = gridelem.getCell(ids[i], options.closedvalue);
                        var istrue = gridvalue.indexOf('Closed') > -1;
                        if (gridelem.getCell(ids[i], options.idenvalue) == months[m] && istrue) {
                            xvalue++;
                        }

                    }
                    d1.push([m, xvalue]);
                }
                closed = d1;
            }
            return this.each(function () {
                var $this = $(this);
                /*
                *  Do a sanity check if the grid id is given
                */
                if ($.trim(options.gridid)) {
                    gridelem = $("#" + options.gridid);
                    if (gridelem.length > 0) {
                        PrepareY1();
                        PrepareY2();
                        /*Start  Plotting*/
                        $.plot($this, [
                               {
                                   data: identified,
                                   bars: { show: true, barWidth: 0.6, align: "center" },
                                   label: "Identified"

                               },
                               {
                                   data: closed,
                                   lines: { show: true },
                                   points: { show: true },
                                   label: "Closed"
                               }
                        ],
                             {
                                 xaxis: { tickSize: 1, tickFormatter: function (val, axis) { return months[val]; } }
                             }
                      );
                    }
                }
            });
        },
        addLink: function (options) {
            var defaults = {
                linkOptions: ''
            };
            var options = $.extend(defaults, options);

            function appendElem(elem, position, gridObj) {
                switch (position) {
                    case 'top':
                    default:
                        $($("#" + gridObj.attr('id'))[0].p.toppager + "_left").css('width', 'auto').append(elem);
                }
            }
            return this.each(function () {
                var gridObj = $(this);
                var elem = $("<div style='padding:3px 4px;' class = 'xp-FloatLeft'><a class='xp-LinkLabel Tip-MFModifyView' href='" + options.linkOptions.currentUrl + "'>" + options.linkOptions.text + "</a></div>");
                appendElem(elem, options.linkOptions.position, gridObj);
            });
        },
        dynamicGroupBy: function (options) {
            var defaults = {
                toolBar: 'top',
                groupOptions: [],
                needBlank: true,
                groupByText: 'Group By'
            };
            var options = $.extend(defaults, options);

            function appendElem(elem, position, gridObj) {

                switch (position) {
                    case 'top':
                    default:
                        $($("#" + gridObj.attr('id'))[0].p.toppager + "_left").css('width', 'auto').append(elem);
                }
            }

            function createElem(gridObj) {
                var containerDiv = $("<div class='xp-FloatLeft' />");
                var boxDiv = $("<div style='padding-top:1px' class='xp-FloatLeft xp-MarginLeft-5'/>")
                    .appendTo(containerDiv);
                var selectBox = $("<select  style='border:1px solid #C6CFCE;' class='xp-Font xp-Margin-0 xp-Height-20 xp-AnchorFontSize Tip-ACGroupBy'/>")
                      .appendTo(boxDiv)
                      .change(function () {
                          var vl = $(this).val();
                          if (vl) {
                              if (vl == "clear") {
                                  gridObj.jqGrid('customgroupingRemove', true);
                              } else {
                                  gridObj.jqGrid('groupingGroupBy', vl);
                              }
                          }

                      });
                if (options.needBlank == true) {
                    selectBox.append("<option value='clear'>Group by</option>");
                }
                $.each(options.groupOptions, function (i) {
                    var groupOption = this;
                    if (groupOption) {
                        selectBox.append(
                $('<option></option>').val(groupOption.val).html(groupOption.text)
              );
                    }
                });
                appendElem(containerDiv, options.position, gridObj);
            }
            /***************************end of method ******************/
            return this.each(function () {
                var gridObj = $(this);
                createElem(gridObj);
            });
        },
        /*functionaity for ImportButton*/
        ImportData: function (options) {
            var defaults = {
                url: "",
                position: "bottom",
                importdialogid: "importdialog" + $(this).attr('id'),
                statusmsgid: "statusmsg" + $(this).attr('id')
            };

            /*Get the TrackerID*/
            var $t = this[0];
            gpost = new Object();


            var $this = $(this);
            var options = $.extend(defaults, options);
            var $importdialog = $("#" + options.importdialogid);

            /*Create the popup*/
            function CreateImportDialog(mainElem) {
                if ($importdialog.length > 0) {
                    $importdialog.children().remove();
                    $importdialog.remove();
                }
                gpost.trackerID = $t.p.mid;
                var html = "";
                var statusp = $("<div id='" + options.statusmsgid + "' />");
                statusp.html("");
                var $firstdiv = $("<div/>");
                $importdialog = $("<div id='" + options.importdialogid + "' title='Budget Holders' />");
                html += "<table border=0 width=100% cellspacing=0 cellpadding=6><tbody>";
                html += "<tr><td class=''>Do you want to <b>import data</b> into this table from the Budget Holders table in the previous phase? This action will append the imported data with the existing data.</td>";
                html += "</tbody></table>";

                $firstdiv.append(html);
                $importdialog.append(statusp);
                $importdialog.append($firstdiv);
                $('body').append($importdialog);

                var confirmdialog = $("#confirmdialog");
                confirmdialog.dialog('destroy');
                confirmdialog.html("");
                var confirmstatusp = $("<div />");
                confirmdialog.append(confirmstatusp);

                $importdialog.dialog({
                    autoOpen: false,
                    width: 750,
                    bgiframe: true,
                    modal: true,
                    buttons: {
                        'Import': function () {
                            $.ajax({
                                url: options.url, contentType: "application/json; charset=utf-8", type: "post", dataType: "json", data: $.toJSON(gpost),
                                success: function (datap, st) {
                                    var data = datap.d;
                                    if (data.Status == "success") {
                                        /*Display the status message*/
                                        confirmstatusp.html("<div>" + data.Message + "</div>");
                                        $importdialog.dialog('close');
                                        confirmdialog.dialog();
                                        /*Set time to destroy the dialog box*/
                                        setTimeout(function () {
                                            confirmdialog.dialog('destroy');
                                        }, 4000);
                                        /*Refresh the grid*/
                                        $($t).trigger("reloadGrid");
                                        return true;
                                    }
                                }
                            });
                        },
                        Cancel: function () {
                            $(this).dialog('close');
                        }
                    }
                });

                return $importdialog;
            }
            return this.each(function () {
                var mainElem = $(this);
                var pagerid = $(mainElem).get(0).p.pager.attr('id');
                var statusp = $("<div id='confirmdialog' class='xp-Width' />");
                statusp.hide();
                $('body').append(statusp);

                /*Add the 'Import data' button*/
                if (options.position == "top") {
                    var $btn = $("<input type='button' title='Import data' class='' />");
                    $("#t_" + mainElem.attr('id')).append($btn);
                    $btn.click(function () {
                        CreateImportDialog(mainElem);
                        $importdialog.dialog('open');
                    });
                }
                else {
                    $(mainElem).navButtonAdd("#" + pagerid, {
                        caption: "Import data", buttonicon: "", onClickButton: function () { CreateImportDialog(mainElem); $importdialog.dialog('open'); }, position: "last"
                    });
                }

            });
        }
    });
})(jQuery);