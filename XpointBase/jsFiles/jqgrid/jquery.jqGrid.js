//This file should be used if you want to debug and develop
function jqGridInclude() {
    var pathtojsfiles = "/_layouts/XPointBase/jsFiles/"; // need to be ajusted
    // set include to false if you do not want some modules to be included
    var modules = [
      //  { include: true, incfile: 'jqgrid/js/i18n/grid.locale-en.js' }, // jqGrid translation
        {include: true, incfile: 'jqgrid/js/grid.base.js' }, // jqGrid base
        {include: true, incfile: 'jqgrid/js/grid.common.js' }, // jqGrid common for editing
        {include: true, incfile: 'jqgrid/js/grid.formedit.js' }, // jqGrid Form editing
        {include: true, incfile: 'jqgrid/js/grid.inlinedit.js' }, // jqGrid inline editing
        {include: true, incfile: 'jqgrid/js/grid.celledit.js' }, // jqGrid cell editing
        {include: true, incfile: 'jqgrid/js/grid.subgrid.js' }, //jqGrid subgrid
        {include: true, incfile: 'jqgrid/js/grid.treegrid.js' }, //jqGrid treegrid
        {include: true, incfile: 'jqgrid/js/grid.custom.js' }, //jqGrid custom 
        {include: true, incfile: 'jqgrid/js/grid.postext.js' }, //jqGrid postext
        {include: true, incfile: 'jqgrid/js/grid.tbltogrid.js' }, //jqGrid table to grid 
        {include: true, incfile: 'jqgrid/js/grid.setcolumns.js' }, //jqGrid setcolumns
        {include: true, incfile: 'jqgrid/js/grid.import.js' }, //jqGrid import
        {include: true, incfile: 'jqgrid/js/jquery.fmatter.js' }, //jqGrid formater
        {include: true, incfile: 'jqgrid/js/JsonXml.js' }, //xmljson utils
         {include: true, incfile:'jqgrid/js/jqModal.js' }, //jqmodel plugin
        {include: true, incfile: 'jqgrid/js/jquery.searchFilter.js' }, // search Plugin
        {include: true, incfile: 'jqgrid/js/json2.js' }, //string to object object to string
         {include: true, incfile: 'jqgrid/RelayGrid.js' }, //Custom Methods Extension       
           {include: true, incfile: 'others/ajaxupload.js' }, // for upload functionality
         {include: true, incfile: 'extensions/relayupload.js'} //for Upload functionality
    ];
    var filename;
    for (var i = 0; i < modules.length; i++) {
        if (modules[i].include === true) {

            filename = pathtojsfiles + modules[i].incfile;
            if (jQuery.browser.safari) {
                jQuery.ajax({ url: filename, dataType: 'script', async: false, cache: true });
            } else {
                IncludeJavaScript(filename);
            }
        }
    }
    function IncludeJavaScript(jsFile) {
        var oHead = document.getElementsByTagName('head')[0];
        var oScript = document.createElement('script');
        oScript.type = 'text/javascript';
        oScript.charset = 'utf-8';
        oScript.src = jsFile;
        oHead.appendChild(oScript);
    };
};
jqGridInclude();
