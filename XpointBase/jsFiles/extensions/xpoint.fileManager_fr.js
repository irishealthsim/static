
var $deleteDialog = $("#" + "remove-folders-insure-dialog");
var $uploadFileDialog = $("#" + "upload-files-dialog");
var $movingDialog = $("#" + "dialog-moving-window");
var $downloadDialog = $("#" + "download-file-popup");
var $restoreDialog = $("#" + "restore-file-popup");
var $uploadNewDialog = $("#" + "upload-new-version-popup");
$(document).bind('drop dragover', function (e) {
    e = e || event;
    e.preventDefault();
    console.log('here I am');
    return false;
});
//bind
$(document).bind('dragleave', function (e) {

    e = e || event;
    e.preventDefault();
    console.log('here I am');
    return false;
});

if (JSON == undefined) JSON = JSON3;
if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    }
}
// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(' this is null or not defined');
        }
        // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
        var O = Object(this);
        // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;
        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }
        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }
        // 6. Let k be 0
        k = 0;
        // 7. Repeat, while k < len
        while (k < len) {

            var kValue;

            // a. Let Pk be ToString(k).
            //   This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
            //   This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                kValue = O[k];

                // ii. Call the Call internal method of callback with T as the this value and
                // argument list containing kValue, k, and O.
                callback.call(T, kValue, k, O);
            }
            // d. Increase k by 1.
            k++;
        }
        // 8. return undefined
    };
}

/**
* jQuery plugin for Pretty looking right click context menu.
*
* Requires popup.js and popup.css to be included in your page. And jQuery, obviously.
*
* Usage:
*
*   $('.something').contextPopup({
*     title: 'Some title',
*     items: [
*       {label:'My Item', icon:'/some/icon1.png', action:function() { alert('hi'); }},
*       {label:'Item #2', icon:'/some/icon2.png', action:function() { alert('yo'); }},
*       null, // divider
*       {label:'Blahhhh', icon:'/some/icon3.png', action:function() { alert('bye'); }, isEnabled: function() { return false; }},
*     ]
*   });
*
* Icon needs to be 16x16. I recommend the Fugue icon set from: http://p.yusukekamiyamane.com/
*
* - Joe Walnes, 2011 http://joewalnes.com/
*   https://github.com/joewalnes/jquery-simple-context-menu
*
* MIT License: https://github.com/joewalnes/jquery-simple-context-menu/blob/master/LICENSE.txt
*
* Customized By : Ibrahim Asad (ibra.asad@gmail.com)
*
*/
(function (jQuery, $) {
    jQuery.fn.contextPopup = function (menuData) {
        // Define default settings
        var settings = {
            contextMenuClass: 'contextMenuPlugin',
            gutterLineClass: 'gutterLine',
            headerClass: 'header',
            seperatorClass: 'divider',
            title: '',
            items: []
        };

        // merge them
        $.extend(settings, menuData);

        // Build popup menu HTML
        function createMenu(e) {
            var menu = $('<ul class="' + settings.contextMenuClass + '"><div class="' + settings.gutterLineClass + '"></div></ul>')
					.appendTo(document.body);
            if (settings.title) {
                $('<li class="' + settings.headerClass + '"></li>').text(settings.title).appendTo(menu);
            }
            settings.items.forEach(function (item) {
                if (item) {
                    var rowCode = '<li><a href="#"><span></span></a></li>';
                    var row = $(rowCode).appendTo(menu);
                    if (item.icon) {
                        var icon = $('<img>');
                        icon.attr('src', item.icon);
                        icon.insertBefore(row.find('span'));
                    }
                    row.find('span').text(item.label);
                    if (item.highlightClass) {
                        row.closest('li').addClass(item.highlightClass);
                    }
                    if (item.isEnabled != undefined && !item.isEnabled()) {
                        row.addClass('disabled');
                    }
                    else if (item.action) {
                        row.find('a').click(function () {
                            item.action(e, settings.selectedNodes);
                        });
                    }
                }
                else {
                    $('<li class="' + settings.seperatorClass + '"></li>').appendTo(menu);
                }
            });
            menu.find('.' + settings.headerClass).text(settings.title);
            return menu;
        }

        // On contextmenu event (right click)
        this.bind('click', function (e) {
            var menu = createMenu(e)
					.show();

            var left = e.pageX + 5,
			/* nudge to the right, so the pointer is covering the title */
					top = e.pageY;
            if (top + menu.height() >= $(window).height()) {
                top -= menu.height();
            }
            if (left + menu.width() >= $(window).width()) {
                left -= menu.width();
            }

            // Create and show menu
            menu.css({
                zIndex: 1000001,
                left: left,
                top: top
            })
					.bind('contextmenu', function () {
					    return false;
					});

            // Cover rest of page with invisible div that when clicked will cancel the popup.
            var bg = $('<div class="contextmenu-menu-div-hide"></div>')
					.css({
					    left: 0,
					    top: 0,
					    width: '100%',
					    height: '100%',
					    position: 'absolute',
					    zIndex: 1000000
					})
					.appendTo(document.body)
					.bind('contextmenu click', function () {
					    // If click or right click anywhere else on page: remove clean up.
					    $(".contextmenu-menu-div-hide").remove();
					    $("." + settings.contextMenuClass).remove();
					    return false;
					});

            // When clicking on a link in menu: clean up (in addition to handlers on link already)
            menu.find('a').click(function () {
                // alert("click");
                $(".contextmenu-menu-div-hide").remove();
                $("." + settings.contextMenuClass).remove();
            });

            // Cancel event, so real browser popup doesn't appear.
            return false;
        });

        return this;
    };


})(jq1102, jq1102);

"use strict";

(function (jQuery, $, timeAgo) {

    // return fm;
    // "fm" is alias for $.filemanager
    // "fmt" alias for $.filemanager.tree
    var fm = $.filemanager = {};
    // This hooks the plugin into jQuery with $.fn.plugin_name syntax
    // substitute your plugin name for plugin_template
    // when called with plugin name it will call init on the div block.
    // otherwise looks for method after element initialized $('#myElement).destroy()
    $.fn.frenchFilemanager = function (method) {

        if (!this || this.length === 0) $.error('"this" is undefined');

        // when called with method then the method is called
        if (fm.methods[method]) {
            return fm.methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            //call with init when there is no method name but initialized on element
            // Default to "init"
        } else if (typeof method === 'object' || !method) {
            // Default to "init"
            return fm.methods.init.apply(this, arguments);
            // call error  if method is missing
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.filemanager');
        }
        return fm;
    };
    // For filemanger plugin default settings.
    // Could be modified outside of plugin ( before initialization ).
    var serverSideValues;
    var selectedNodeId;
    var enableControls = false;
    fm.timeAgo = timeAgo;
    fm.treeIDs = []; // data for node's id ..
    fm.currentId = "#"; // current id selected.
    fm.isRoot = true; // means it return the first folder ( when true ) .. and when (false ) return the folders/files inside this folder
    fm.getDataLastId = "#"; // this contins the last id for items ... like ( I selected folder 1 ) and get the subfolders for (folder 2)
    fm.tree = null; // tree
    fm.dataContainer = []; // array contains (id=>all data)
    fm.childrenContainer = []; // array contains parent = > children.
    fm.container = null;
    fm.defaults = {};
    fm.options = {};
    fm.maxNestedFolderCount;
    fm.style = {};
    fm.createFolderFlag = false;
    fm.changeNodeTitle = false;
    fm.movingDialogData = new Object();
    fm.selectedItems = []; // contains the selected files/folders / documents in the middle panel .
    // for Date issue 
    fm.date = new Object();
    fm.date.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    fm.adminView = false;
    fm.hasAccess = false;
    fm.selectedDrag;
    fm.serviceUrlRef = null;

    fm.allowedFileExtensions = ['2mdl', '7zip',
			'accd', 'accdb', 'accdc', 'accde', 'accdr', 'accdt', 'accdt_1033', 'ai', 'avi',
			'bmp',
			'cat', 'chm', 'cin', 'config', 'css', 'csv',
			'dat', 'db', 'dib', 'disc', 'do', 'docm', 'doc', 'docx', 'dot', 'dot', 'dotm', 'dotx', 'dta', 'dvd', 'dwp', 'dwt',
			'emf', 'eml', 'eps', 'est',
			'flv', 'frm', 'fwp',
			'gif', 'gin', 'gis', 'gph',
			'hdp', 'hlp', 'hta', 'htt',
			'idml', 'indb', 'indd', 'indl', 'indt', 'inf', 'ini',
			'jfif', 'jpe', 'jpeg', 'jpg', 'jse', 'log', 'lst',
			'master', 'mdb', 'mdl', 'mht', 'mov', 'mp3', 'mp4', 'mpd', 'mpp', 'mps', 'mpt', 'mpw', 'mpx', 'msg',
			'ocx', 'odc', 'odp', 'ods', 'odt', 'ogv', 'one', 'onepkg', 'onetoc2',
			'pdf', 'pmd', 'png', 'pot', 'potm', 'potx', 'ppa', 'ppam', 'pps', 'ppsd', 'ppsm', 'ppsx', 'ppt', 'pptm', 'pptx', 'prm', 'psd', 'psp', 'pst', 'ptm', 'ptt', 'pub', 'pub',
			'quark', 'rdl', 'rep', 'rsapplication', 'rsc', 'rsd', 'rsds', 'rtf',
			'smdl', 'stp', 'sts', 'stt', 'swf',
			'tab', 'txt', 'tar',
			'vcd', 'vcf', 'vdf', 'vdi', 'vdo', 'vgd', 'vgf', 'vmf', 'voc', 'vpa', 'vpd', 'vpm', 'vsc', 'vsd', 'vts',
			'wmf',
			'xlf', 'xlsm', 'xqx', 'xslb', 'xls', 'xlsx', 'xlt', 'xlst',
			'zip', 'sgt', 'key', 'thm', 'thmx', 'scx'
    ];

    fm.ajaxUrl = {
        getTreeContent: '/_vti_bin/xpointbase/LifeCycleDocumentService.svc/getFolderContent',
        getCommentsUrl: '/_vti_bin/xpointbase/LifeCycleDocumentService.svc/getDocumentComments',
        deleteCommentsUrl: '/_vti_bin/xpointbase/LifeCycleDocumentService.svc/DeleteComment',
        addCommentsUrl: '/_vti_bin/xpointbase/LifeCycleDocumentService.svc/AddComments',
        folderExists: '/_vti_bin/xpointbase/LifeCycleDocumentService.svc/FolderExists',
        createFolder: '/_vti_bin/xpointbase/LifeCycleDocumentService.svc/CreateFolder',
        renameNode: '/_vti_bin/xpointbase/LifeCycleDocumentService.svc/Rename',
        deleteNodes: '/_vti_bin/xpointbase/LifeCycleDocumentService.svc/Delete',
        moveNodes: '/_vti_bin/xpointbase/LifeCycleDocumentService.svc/MoveFilesAndFolders',
        uploadFiles: '/_layouts/IImpact.Web/LifeCycleDocumentsService.asmx/AddFile',
        fileExists: '/_vti_bin/xpointbase/LifeCycleDocumentService.svc/FileExists',
        urlExists: '/_vti_bin/xpointbase/LifeCycleDocumentService.svc/UrlExists',
        uploadUrl: '/_vti_bin/xpointbase/LifeCycleDocumentService.svc/AddDocumentUrl',
        getFileVersion: '/_vti_bin/xpointbase/LifecycleDocumentService.svc/getVersionInfo',
        updateDescription: '/_vti_bin/xpointbase/LifeCycleDocumentService.svc/EditFolderDescription',
        lockFile: '/_vti_bin/xpointbase/LifecycleDocumentService.svc/CheckOut',
        UploadLatestVersionFile: '/_layouts/IImpact.Web/LifeCycleDocumentsService.asmx/Checkin',
        unlockFile: '/_vti_bin/xpointbase/LifecycleDocumentService.svc/DiscardCheckOut',
        restoreAsLatestVersion: '/_vti_bin/xpointbase/LifecycleDocumentService.svc/Restore',
        renameFile: '/_vti_bin/xpointbase/LifecycleDocumentService.svc/RenameFile'

    };
    fm.ajaxAdminUrl = {
        getTreeContent: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/GetFolderContent',
        getCommentsUrl: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/GetDocumentComments',
        deleteCommentsUrl: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/DeleteComment',
        folderExists: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/FolderExists',
        addCommentsUrl: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/AddComments',
        createFolder: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/CreateFolder',
        renameNode: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/Rename',
        deleteNodes: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/Delete',
        moveNodes: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/MoveFilesAndFolders',
        fileExists: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/FileExists',
        uploadFiles: '/_layouts/IImpact.Web/LifecycleDocumentTemplateService.asmx/AddFile',
        UploadLatestVersionFile: '/_layouts/IImpact.Web/LifecycleDocumentTemplateService.asmx/Checkin',
        urlExists: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/UrlExists',
        uploadUrl: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/AddDocumentUrl',
        getFileVersion: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/GetVersionInfo',
        updateDescription: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/EditFolderDescription',
        lockFile: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/CheckOut',
        unlockFile: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/DiscardCheckOut',
        restoreAsLatestVersion: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/Restore',
        renameFile: '/_vti_bin/xpointbase/LifecycleDocumentTemplateService.svc/RenameFile'
    };

    if (document.URL == "http://localhost/development/" || document.URL == 'http://127.0.0.1/development/') {
        fm.ajaxUrl = {
            getTreeContent: 'getResponse.php',
            getCommentsUrl: 'getCommentsUrl.php',
            deleteCommentsUrl: 'deleteCommentsUrl.php',
            addCommentsUrl: 'addCommentsUrl.php',
            createFolder: 'addFolder.php',
            deleteNodes: 'deleteNodes.php',
            moveNodes: 'MoveFilesAndFolders.php',
            uploadFiles: 'server/',
            uploadUrl: 'server/',
            lockFile: 'CheckOut',
            updateDescription: 'dump.php',
            uploadNewVersion: 'dump.php',
            unlockFile: 'sad.asd',
            restoreAsLatestVersion: '/_vti_bin/xpointbase/LifecycleDocumentService.svc/Restore'
        };
    }


    fm.iconsCenter = {
        addFolder: '<span class="xp-AddFolder"/>',
        deleteImage: '<span class="xp-Delete"/>',
        download: '<span class="xp-Download"/>',
        folder: '<span class="xp-Folder"/>',
        move: '<span class="xp-Move"/>',
        admin: '<span class="xp-Person"/>',
        rename: '<span class="xp-Rename"/>',
        restore: '<span class="xp-Restore"/>',
        sort: '<span class="xp-SortDown"/>',
        filter: '<span class="xp-Filter" />',
        unlock: '<img src="/_layouts/IMAGES/XpointBase/Unlock.png" style=" width: 20px; height: 20px; ">',
        upload: '<span class="xp-Upload"/>',
        addFile: '<span class="xp-AddFile"/>',
        menu: '<span class="xp-SortDown"/>'

    };
    fm.pathes = {
        iconsPath: '_layouts/Images/'
    };
    fm.constants = {
        folderDefaultName: 'Nouveau dossier',
        addDescription: 'Ajouter une description',
        addDescriptionHover: 'Compléter/Modifier la description du dossier',
        contextMenuRightClickTree: 'Utiliser le clic droit pour afficher le menu'
    };

    fm.messages = {
        folderDelete: 'Tous les dossiers et fichiers associés à ce dossier seront supprimés définitivement ainsi que ce dossier et ne pourront pas être restaurés. Êtes-vous sûr de vouloir les supprimer ?',
        itemsAndFoldersDelete: 'Le(s) élément(s) sélectionné(s) et tout<br/> le contenu/historique associé seront supprimés<br/> définitivement et ne pourront pas être récupérés.',
        folderAdded: 'Le nouveau dossier est ajouté <br/>en haut de la liste des sous-dossiers',
        beforeDownload: 'Que voulez-vous faire avec ce document ?',
        uploadNewVersionFile: 'Le type de fichier que vous <br/> essayez de télécharger est différent. <br/>Il doit être le même que celui du fichier téléchargé.',
        fileUnlocked: 'Fichier déverrouillé avec succès',
        itemDelete: 'Le(s) élément(s) sélectionné(s) et tout le <br/>contenu/historique seront supprimés définitivement <br/> et ne pourront pas être récupérés.',
        /*
		*Refered messages from old filemanager plugin
		*/
        fileDeleteSuccess: 'fichiers supprimés',
        fileDeleteError: 'Erreur lors de la suppression du fichier',
        singleFolderDeletionComplete: 'A supprimé le dossier avec succès',
        fileUploadSuccess: ' le fichier a été ajouté à',
        fileUploadError: 'Téléchargement d\'erreur ',
        folderExistsError: 'Un dossier avec ce nom existe déjà',
        createFolderSuccess: 'Dossier créé avec succès',
        createFolderError: 'Erreur lors de la création du dossier',
        deleteSuccess: 'Produits supprimés avec succès',
        deleteError: 'Les produits n\'ont pas pu être supprimés',
        renameSuccess: 'Renommé avec succès',
        renameError: 'Ne pouvait pas être renommé',
        nodeNameAlreadyExist: 'Le nom du fichier existe déjà ',
        folderLevelNotAllowed: 'Niveau de dossier suivant non autorisé.',
        moveNotAllowedError: 'Déplacement non autorisé pour ce dossier',
        fileTypeNotAllowed: 'Type de fichier non autorisé',
        folderDescriptionUpdateError: 'Erreur lors de la mise à jour de la description du dossier',
        confirmFileVersionRestoreAsLatestVersion:
        'Cette version sera maintenant rétablie comme la dernière de ce document. Cette action ne peut pas être annulée.' +
            '<br><br> Voulez-vous continuer ?',
        restoreAsLatestVersionSuccess: 'Fichier rétabli en tant que dernière version',
        restoreAsLatestVersionError: 'Erreur lors du rétablissement du fichier en tant que dernière version',
        lockFileError: 'Erreur lors du verrouillage du fichier',
        lockFileSuccess: 'Fichier verrouillé avec succès',
        uploadNewFileVersionDifferentFilenameWarning:
        '<div class="notify-popover-warning popup bottom">' +
            '<span class="notify-popover-warning-close">x</span>' +
            'Le nom du fichier que vous allez télécharger est différent. NB le nom d\'origine du fichier sera conservé. ' +
            '<br><br> Pour changer le nom, cliquer sur le fichier après l\'avoir téléchargé.' +
            '</div>',
        singleFileDrop: 'Fichier déposé à l\'instant',
        multipleFileDrop: 'Fichiers déposés à l\'instant',
        moveFileFailed: 'Le(s) fichier(s) ne peut (peuvent) pas être déplacé(s)',
        multipleFileDrag: 'Plus d\'un fichier',
        fileMoved: '1 produit a été déplacé vers ',
        multipleFileMoved: 'Des produits ont été déplacés vers ',
        specialCharactersError: " ne peut pas contenir de caractères spéciaux, sauf les suivants: <br/><br/>",
        specialCharacters: "Espace blanc simple, trait d'union (-) et tiret bas (_)"
    };
    fm.style.classes = {
        middlePanelContentListItem: "middle-panel-content-list-item",
        middlePanelContentListItemActive: "middle-panel-content-list-item-active",
        typeForList: "type-for-list",
        nameForList: "name-for-list",
        lastModifiedForList: 'last-modified-for-list',
        middlePanelContentListBody: 'middle-panel-content-list-body',
        rightPanelItemViewTitle: 'right-panel-item-view-tilte',
        rightPanelItemViewAddedValue: 'right-panel-item-view-added-value',
        rightPanelItemViewModifiedValue: "right-panel-item-view-modified-value",
        rightPanelFileView: 'right-panel-file-view',
        rightPanelItemViewAddDescription: 'right-panel-item-view-add-description',
        rightPanelDescriptionEditingButtons: 'right-panel-descrition-editing-buttons',
        middlePanelItemsCounter: 'middle-panel-footer-stat',
        rightPanelVersionEditingButtons: 'right-panel-version-editing-buttons',
        rigitPanelVersionText: 'right-panel-version-text',
        rightPanelVersionsSelects: "right-panel-version-select-item",
        breadcrumbItems: 'breadcrumb-items',
        middleMenuInHeader: 'top-header-menu-middle',
        contextmenuMenuDivHide: 'contextmenu-menu-div-hide',
        middlePanelUploadSection: 'middle-panel-upload-section',
        middlePanelDetailLine: 'middle-panel-detail-line',

        //Added by array of classes
        floatLeft: 'xp-FloatLeft',
        toolContainer: 'toolcontainer',
        /*
		*Classes for document top panel
		*/
        fileManagerControlPanelLeftHeader: 'filemanager-control-panel-left-header',
        topHeaderMenuLeftHeader: 'top-header-menu-LH',
        borderBlack: 'border-black',
        topHeaderMenuMiddle: 'top-header-menu-middle',
        middleMenuName: 'middle-menu-name',
        sortMiddleMenu: 'sort-middle-menu',
        fileManagerControlPanelrighthtHeader: 'filemanager-control-panel-right-header',
        /*
		*Classes for document left panel
		*/
        fileManagerControlPanelLeftContainer: 'filemanager-control-panel-left-container',
        positionRelative: 'xp-PositionRelative',
        fileExpEqHeight: 'xp-FileExpEqHeight',
        tree: 'tree',
        jsTree: 'jstree',
        jsTreeOne: 'jstree-1',
        jsTreeDefault: 'jstree-default',
        jsTreeDefaultSmall: 'jstree-default-small',
        jsTreeContainerUl: 'jstree-container-ul',
        jsTreeChildren: 'jstree-children',
        jsTreeStriped: 'jstree-striped',
        jsTreeNode: 'jstree-node',
        jsTreeLast: 'jstree-last',
        jsTreeOpen: 'jstree-open',
        jsTreeIcon: 'jstree-icon',
        jsTreeOcl: 'jstree-ocl',
        jsTreeAnchor: 'jstree-anchor',
        jsTreeThemeIcon: 'jstree-themeicon',
        jsTreeThemeIconHidden: 'jstree-themeicon-hidden',
        jsTreeClicked: 'jstree-clicked',
        folder: 'folder',
        jsTreeThemeIconCustom: 'jstree-themeicon-custom',
        /*
		*Classes for document middle panel
		*/
        fileManagerControlPanelMiddleContainer: 'filemanager-control-panel-middle-container',
        breadCrumb: 'breadcrumb',
        breadCrumbItems: 'breadcrumb-items',
        middlePanelContent: 'middle-panel-content',
        middlePanelContentListHeader: 'middle-panel-content-list-header',
        checkAll: 'checkAll',
        middlePanelDragNode: 'middle-panel-drag-node',
        uiDraggable: 'ui-draggable',
        uiDraggableHandle: 'ui-draggable-handle',
        progress: 'progress',
        progressBarSuccess: 'progress-bar-success',
        progressBar: 'progress-bar',
        middlePanelFooter: 'middle-panel-footer',
        middlePanelFooterStat: 'middle-panel-footer-stat',
        /*
		*Classes for document right panel
		*/
        fileManagerControlPanelRightContainer: 'filemanager-control-panel-right-container',
        rightPanelItemView: 'right-panel-item-view',
        rightPanelItemViewTilte: 'right-panel-item-view-tilte',
        rightPanelItemViewItemsCount: 'right-panel-item-view-itemsCount',
        rightPanelLockedSection: 'right-panel-locked-section',
        rightPanelLockedSectionBy: 'right-panel-locked-section-by',
        rightPanelItemViewAdded: 'right-panel-item-view-added',
        rightPanelItemViewModified: 'right-panel-item-view-modified',
        rightPanelDescriptionArea: 'right-panel-description-area',
        txtBox: 'xp-TxtBox',
        tipFolderDescription: 'Tip-FolderDescription',
        rightPanelItemViewAddDescriptionIcon: 'right-panel-item-view-add-description-icon',
        rightPanelDescritionEditingButtons: 'right-panel-descrition-editing-buttons',
        blackLine: 'black-line',
        rightPanelVersionView: 'right-panel-version-view',
        rightPanelVersionTitle: 'right-panel-version-title',
        rightPanelVersionSelect: 'right-panel-version-select',
        rightPanelVersionSelectItem: 'right-panel-version-select-item',
        rightPanelVersionText: 'right-panel-version-text',
        rightPanelCommentTitle: 'right-panel-comment-title',
        width: 'xp-Width'
    };
    fm.style.ids = {
        commentCountContainer: 'commentCountContainer',
        commentCountMain: 'commentCountMain',
        commentCount: 'commentCount',
        commentsContainer: 'commentsContainer',
        singleVersion: 'singleVersion',
        allVersions: 'allVersions',
        viewComment: 'viewComment',
        inputComment: 'inputComment',
        createFolderHeader: 'create-folder-header',
        createFileHeader: 'create-file-header',
        middleMenu: 'middle-menu',
        menu: 'menu',
        tree: 'tree',
        fileupload: 'fileupload',
        progress: 'progress',
        dropFileH1Message: 'dropFileH1Message',
        rightMainMenuWhenSelected: 'right-main-menu-when-selected',
        updateDescriptionDone: 'updateDescriptionDone',
        updateDescriptionCancel: 'updateDescriptionCancel',
        fileVersionUpdateCommentOk: 'file-version-update-comment-ok',
        fileVersionUpdateCommentCancel: 'file-version-update-comment-cancel',
        rightMainMenuWithoutSelect: 'right-main-menu-without-select',
        restoreVersionPopupFileComment: 'restore-version-popup-file-comment'
    };
    fm.templates = {
        /*Top header panel*/

        fileManagerTopHeaderControlPanel: '<div class="filemanager-control-panel-container border-black"/>',
        fileManagerLeftHeaderControl: '<div class="filemanager-control-panel-left-header xp-FloatLeft border-black"/>',
        leftHeaderActionPanel: '<div class="top-header-menu-LH" />',
        createFolderHeader: '<span id="create-folder-header" title="Ajouter un dossier" class="Tip-AddingFolder"></span>',
        addFileHeader: '<span id="create-file-header" title="Ajouter un fichier" class="Tip-AddFile"></span>',
        sortHeader: '<span id="' + fm.style.ids.menu + '" class="xp-Filter Tip-SortingItems" title="Sort items"></span>',
        /*midle panel top header*/
        middlePanelHeaderMain: '<div class="filemanager-control-panel-right-header xp-FloatLeft " />',
        middlePanelMenuContainer: '<div class="top-header-menu-middle" />',
        folderIconContainer: '<span class="type-for-list" />',
        middleTopheaderfolderNameContainer: '<span id="middletopfolderNamePanelId" />',
        middlePanleActionButtonPanel: '<span id="actionButtonID"><span/>',
        middleTopActionDownArrow: '<span id="middle-menu" class="Tip-DropDown" title="Dropdown" />',
        middleTopSortPanel: '<span id="sort-middle-menu" style="float:right;" title="Sort items" class="Tip-SortItems" />',

        /*lower main control panel which holds left,middle and right panel*/

        bottomMainArea: '<div />',
        /*Left container Tree area*/
        treeMainArea: '<div class="xp-FloatLeft filemanager-control-panel-left-container xp-PositionRelative xp-FileExpEqHeight border-black" />',
        treeArea: '<div id="' + fm.style.ids.tree + '" />',
        folderCount: '<span class="count-container"> (<span class="count"></span>)</span>',
        /*middle panel container*/
        middlePanelMainContainer: '<div class="xp-FloatLeft filemanager-control-panel-middle-container xp-PositionRelative xp-FileExpEqHeight border-black" />',
        middlePanleBreadCrumb: '<div class="breadcrumb" />',
        middlePanelBreadcrumbItems: '<div class="breadcrumb-items" />',
        middlePanelContentArea: ' <div class="middle-panel-content" />',
        middlePanleContentAreaListHeader: '<div class="middle-panel-content-list-header" />',
        selectAllCheckBox: '<input type="checkbox" class="" name="checkAll" />',
        middlePanelTypeColumn: '<span class="type-for-list"> Type</span>',
        middlePanelNameColumn: '<span class="name-for-list">Nom</span>',
        middlePanleLastModifiedColumn: '<span class="last-modified-for-list"> Dernière modification</span>',
        middlePanelContentList: '<div class="middle-panel-content-list-body" /> ',
        /*Middle panel file drag and drop section*/
        middlePanelFileDropMainPanel: '<div class="middle-panel-upload-section" /> ',
        middlePanelFileUploadInput: '<input id="' + fm.style.ids.fileupload + '" type="file" name="files[]" multiple style="display:none;"/> ',
        dragFileUploadProgressPanle: '<div id="' + fm.style.ids.progress + '" class="progress" />',
        dragFileMessageBoard: '<h1 id="' + fm.style.ids.dropFileH1Message + '"> S\'il vous plaît Déposer des fichiers ici </h1>',
        dragFileProgressbarSuccess: '<div class="progress-bar progress-bar-success" />',
        /*middle panel footer section*/
        middlePanleFooter: '<div class="middle-panel-footer" />',
        middlePanelFooterItemInfo: '<span class="middle-panel-footer-stat"> </span>',

        /*right panel */
        rightPanelMainArea: '<div id="rightPanelMainId" class="xp-FloatLeft filemanager-control-panel-right-container xp-PositionRelative xp-FileExpEqHeight border-black" /> ',
        rightPanelContentArea: '<div class="right-panel-item-view" id="' + fm.style.ids.rightMainMenuWhenSelected + '" />',
        rightPanelItemHeader: '<div style=" height: 30px; " id="itemHeaderPanelId" />',
        rightpanelItemTitle: '<textarea rows="1" class="right-panel-item-view-tilte" disabled="disabled" />',
        rightpanelItemTitleEdit: '<span class="right-panel-title-edit xp-Rename"></span>',
        rightPanelChildItemCount: '<span class="right-panel-item-view-itemsCount" /> ',

        /*right panel div whenever file is locked*/
        rightPanelFileLockMain: '<div class="right-panel-locked-section"/>',
        rightPanelFileLockedbyLabel: '<span style="color:red;">Locked for editing by </span> ',
        rightPanelFileLockedbyName: '<span class="right-panel-locked-section-by"></span>',

        /*right panel user who added file or modified details*/


        /*user who added file*/
        rightPanelFileAddedMain: '<div />',
        rightPanelFileAddedbyLabel: '<span class="right-panel-item-view-added">Ajouté </span> ',
        rightPanelFileaddedbyValue: '<span class="right-panel-item-view-added-value"> </span>',

        /*user who moddified teh file*/
        rightPanelFileModifiedMain: '<div/>',
        rightPanelFileModifiedByLabel: '<span class="right-panel-item-view-modified">Modifié </span>',
        rightPanelFileModifiedByvalue: '<span class="right-panel-item-view-modified-value"> </span>',


        /*file description area in right panel*/

        rightPanelDescriptionMain: '<div class="right-panel-description-area"/> ',
        rightPanelDescriptionLabel: '<span class="right-panel-item-view-add-description-label">La description </span>',
        rightPanelDescriptionTextbox: '<textarea rows="2" maxlength="88" cols="30" class="right-panel-item-view-add-description" placeholder="' + fm.constants.addDescription + '" title="' + fm.constants.addDescriptionHover + '"/>', rightPanelDescriptionTextbox: '<textarea rows="2" maxlength="88" cols="30" class="right-panel-item-view-add-description" placeholder="' + fm.constants.addDescription + '" title="' + fm.constants.addDescriptionHover + '"/>',

        /*description save ,cancel button*/
        descriptionSaveCancelMain: '<div class="right-panel-descrition-editing-buttons" /> ',
        /*save button*/
        descriptionSaveButton: '<input type="button" class="primarybutton" id="' + fm.style.ids.updateDescriptionDone + '" value="sauvegarder" /> ',
        descriptionCancelButton: '<input type="button" class="secondarybutton" id="' + fm.style.ids.updateDescriptionCancel + '" value="Annuler" />',
        horizontalLine: '<div class="black-line"> </div>',

        /*file detals view*/
        fileDetailsMain: '<div class="right-panel-file-view" /> ',
        fileVersionView: '<div class="right-panel-version-view"/>',
        fileVersion: '<div style=" height: 30px; " > <span class="right-panel-version-title"> Version </span>' +
				'<div class="right-panel-version-select"> <select class="right-panel-version-select-item"> </select>' +
				'</div>',
        fileVersionDescription: '<span class="right-panel-version-comment-label"> commentaire </span><div class="right-panel-version-text" style="border:none" title="version description"/>',
        fileVersionEditControls: '<div class="right-panel-version-editing-buttons" >' +
				'<button id="' + fm.style.ids.fileVersionUpdateCommentOk + '" class="primarybutton"> Sauvegarder </button>' +
				'<button id="' + fm.style.ids.fileVersionUpdateCommentCancel + '" class="secondarybutton"> Annuler </button>' +
				'</div>',

        fileCommentPanel: '<div class="right-panel-comment-title" id="commentsContainer" /> ',
        fileWithoutSelect: '<div class="right-panel-item-view" id="' + fm.style.ids.rightMainMenuWithoutSelect + '" > ' +
				'<span> Sélectionner un fichier ou un dossier pour voir les détails</span>' +
				'</div> ',
        rightPanelNoSelectionMain: '<div class="right-panel-item-view" id="right-main-menu-without-select" />',
        rightPanelNoSelectionMessage: '<span> Sélectionner un fichier ou un dossier pour voir les détails</span>',

        /*Main container to hold action buttons*/
        actionButtonHolder: '<span id="actionHolder" />',
        /*ACTION BUTTONS*/
        deleteMoveFolder: '<span title="Bouge toi" id="MHM-move">' + fm.iconsCenter.move + '</span><span title="Delete " id="folder-middle-header-delete" >' + fm.iconsCenter.deleteImage + '</span>',
        deleteFile: '<span title="Supprimer" id="folder-middle-header-delete" >' + fm.iconsCenter.deleteImage + '</span>',
        moveFile: '<span title="Bouge toi" id="MHM-move">' + fm.iconsCenter.move + '</span>',
        renameFolder: ' <span title="Renommer" id="rename-folder">' + fm.iconsCenter.rename + '</span>',
        restoreFile: ' <span title="Restaurer" id="restore-file">' + fm.iconsCenter.restore + '</span>',
        downloadFile: '<a title="Télécharger" id="download-file">' + fm.iconsCenter.download + '</a>',
        downloadAdminFile: '<a title="Télécharger" id="download-admin-file">' + fm.iconsCenter.download + '</a> ',
        downloadLatestVersionFile: '<span title="Télécharger" id="only-download-file-latest-version" id="download-latest-version">' + fm.iconsCenter.download + '</span>',
        renameFile: ' <span title="Renommer" id="rename-file">' + fm.iconsCenter.rename + '</span>',
        redirectToUrl: '<span title="Réorienter" id="redirectUrl">' + fm.iconsCenter.restore + '</span>',
        uploadNewVersion: '<a title="Télécharger une nouvelle version" id="upload-new-version" >' + fm.iconsCenter.upload + '</a> <input type="file" id="new-version-file-handle" style="position:absolute; top:-1000px;"; >',
        unlockFile: '<a title="Déverrouiller pour l\'édition" id="unlock-file">' + fm.iconsCenter.unlock + '</a>',
        notification: '<div class="filemanager-control-panel-notifications-main"><div class="filemanager-control-panel-notifications"></div></div>',
        middlePanelJscroll: '<script type="text/javascript">$(".middle-panel-content").jScrollPane({"autoReinitialise": true }).data("jsp").scrollToBottom(); $(".filemanager-control-panel-left-container").jScrollPane({"autoReinitialise": true }).data("jsp").scrollToBottom(); </script>',
        //Notification html
        notificationBox: '<div class="message"><div><h4></h4></div></div>'
    };
    fm.methods = {
        log: function (title, data) {
            num = "";
            var err = new Error();
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            if (msie > 0 || !!window.navigator.userAgent.match(/Trident.*rv\:11\./)) {
                ieIndex = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
            } else {
                num = err.stack.split("\n")[2].split(":")[2];
            }
        },
        initListeners: function () {
            $("input[name=checkAll]").change(function () {
                if (fm.selectedItems.length == 0) {
                    // nothing selected ... sellect all .
                    $("input[name=checkAll]").prop('checked', true);
                    $("input[name=middle-panel-list-checkbox]").prop('checked', true);
                    $("input[name=middle-panel-list-checkbox]").each(function () {
                        fm.selectedItems.push($(this).val());
                        $($(this).parent()).addClass(fm.style.classes.middlePanelContentListItemActive);
                    });

                } else if (fm.selectedItems.length <= fm.childrenContainer[fm.currentId].length) {
                    // not all selected ... delete the select .
                    fm.selectedItems = [];
                    $("input[name=checkAll]").prop('checked', false);
                    $("input[name=middle-panel-list-checkbox]").prop('checked', false);
                    $("input[name=middle-panel-list-checkbox]").each(function () {
                        $($(this).parent()).removeClass(fm.style.classes.middlePanelContentListItemActive);
                    });
                }
                fm.methods.updateMiddleHeaderMenu();
            });
            $("#" + fm.style.ids.createFolderHeader).click(function () {
                fm.methods.createFolderShowInTree(fm.currentId);
            });

            $("#" + fm.style.ids.createFileHeader).click(function () {
                fm.methods.createAddFilePopUp(fm.currentId);
            });

        },
        loadingComments: function (version, selectedItemId, allowInput, serviceUrl) {
            var fileId = selectedItemId,
			commentOpts = new Object();
            commentOpts.allowInput = allowInput;
            commentOpts.inputBoxWaterMarkText = 'Écrire un commentaire et appuyer sur la touche Enter';
            commentOpts.getCommentsUrl = serviceUrl.getCommentsUrl;
            commentOpts.deleteCommentsUrl = serviceUrl.deleteCommentsUrl;
            commentOpts.saveCommentsUrl = serviceUrl.addCommentsUrl;
            commentOpts.getCommentResult = 'GetDocumentCommentsResult';
            commentOpts.getDeleteResult = 'DeleteCommentResult';
            commentOpts.addCommentResult = 'AddCommentsResult';
            commentOpts.id = fileId;
            commentOpts.viewComment = fm.style.ids.viewComment + fileId;
            commentOpts.inputComment = fm.style.ids.inputComment + fileId;
            commentOpts.commentsMainDiv = fm.style.ids.commentsContainer;
            commentOpts.likeCommentCountMainDiv = fm.style.ids.commentCountContainer;
            commentOpts.commentCountId = fm.style.ids.commentCount;
            commentOpts.commentCountDiv = fm.style.ids.commentCountMain;
            commentOpts.isLabel = true;
            if (version == '') {
                commentOpts.isLabel = false;
                commentOpts.numberOfComments = '1.0'; // Number of comments to be shown by default used as versionlabel
                commentOpts.versionLabel = '1.0'; // Extra param required in save comments, not in post comments.
            }
            else {
                commentOpts.numberOfComments = version + '.0'; // Number of comments to be shown by default used as versionlabel
                commentOpts.versionLabel = version + '.0'; // Extra param required in save comments, not in post comments.
            }
            commentOpts.userPictureUrl = fm.options.userPictureUrl;
            window.$.xpointComments.methods.removeJScroll(commentOpts);
            window.$.xpointComments.methods.addCommentContainer($('#' + fm.style.ids.commentsContainer).empty(), commentOpts);

        },
        createMiddlePanelContentList: function () {
            var item = '<div class="' + fm.style.classes.middlePanelContentListBody + '"></div>';
            return;
        },
        createMiddlePanelContentItem: function (id, name, type, modified_date, icon) {
            var dragAndDropOption = "";
            var userFolderIcon = '<span class="xp-AdminUser" />';
            if (fm.adminView || (!fm.adminView && fm.dataContainer[id].metadata.isTemplate == false)) {
                userFolderIcon = '';
                if (type == 'folder') {
                    dragAndDropOption = "middle-panel-drag-node middle-panel-drop-folders";
                } else {
                    dragAndDropOption = "middle-panel-drag-node";
                }
            }
            if (icon == 'folder') {
                var middlePanelIcon = '<span class="xp-FolderSmall"></span>';
            } else {
                var middlePanelIcon = '<img src="' + fm.pathes.iconsPath + icon + '.gif" />';
            }
            var item = "<div id='selectedFile_" + id + "' value=" + id + " class='xp-cursorPointer selectedFile_" + id + " " + fm.style.classes.middlePanelContentListItem + " " + dragAndDropOption + "' > " +
              '<input id="selectFile_' + id + '" type="checkbox" name="middle-panel-list-checkbox" value="' + id + '" class=""  >' +
              '<span class="' + fm.style.classes.middlePanelDetailLine + '" id="' + id + '" ><span class="' + fm.style.classes.typeForList + '">' + middlePanelIcon + ' </span>' + userFolderIcon +
              '<span class="' + fm.style.classes.nameForList + '">' + name + '</span>';
            item += '<span class="' + fm.style.classes.lastModifiedForList + '"> ' + modified_date + '</span>';
            item += '</span></div>';
            return item;
        },
        loadTemplates: function (mainContainer, options) {
            /*left top header area*/
            var fileManagerTopHeaderControlPanel = $(fm.templates.fileManagerTopHeaderControlPanel);
            var fileManagerLeftHeaderControl = $(fm.templates.fileManagerLeftHeaderControl);

            /*middle panel top header*/
            var middlePanelHeaderMain = $(fm.templates.middlePanelHeaderMain);
            var middlePanelMenuContainer = $(fm.templates.middlePanelMenuContainer);
            var folderIconContainer = $(fm.templates.folderIconContainer);
            var middleTopheaderfolderNameContainer = $(fm.templates.middleTopheaderfolderNameContainer);
            var middlePanleActionButtonPanel = $(fm.templates.middlePanleActionButtonPanel);
            var middleTopActionDownArrow = $(fm.templates.middleTopActionDownArrow);
            var middleTopSortPanel = $(fm.templates.middleTopSortPanel);
            var bottomMainArea = $(fm.templates.bottomMainArea);

            /*Left container Tree area*/
            var treeMainArea = $(fm.templates.treeMainArea);
            var treeArea = $(fm.templates.treeArea);
            /*middle panel container*/
            var middlePanelMainContainer = $(fm.templates.middlePanelMainContainer);
            var middlePanleBreadCrumb = $(fm.templates.middlePanleBreadCrumb);
            var middlePanelBreadcrumbItems = $(fm.templates.middlePanelBreadcrumbItems);
            var middlePanelContentArea = $(fm.templates.middlePanelContentArea);
            var middlePanleContentAreaListHeader = $(fm.templates.middlePanleContentAreaListHeader);
            var selectAllCheckBox = $(fm.templates.selectAllCheckBox);
            var middlePanelTypeColumn = $(fm.templates.middlePanelTypeColumn);
            var middlePanelNameColumn = $(fm.templates.middlePanelNameColumn);
            var middlePanleLastModifiedColumn = $(fm.templates.middlePanleLastModifiedColumn);
            var middlePanelContentList = $(fm.templates.middlePanelContentList);

            /*Middle panel file drag and drop section*/
            var middlePanelFileDropMainPanel = $(fm.templates.middlePanelFileDropMainPanel);
            var middlePanelFileUploadInput = $(fm.templates.middlePanelFileUploadInput);
            var dragFileUploadProgressPanle = $(fm.templates.dragFileUploadProgressPanle)
            var dragFileMessageBoard = $(fm.templates.dragFileMessageBoard);
            var dragFileProgressbarSuccess = $(fm.templates.dragFileProgressbarSuccess);
            /*middle panel footer section*/
            var middlePanleFooter = $(fm.templates.middlePanleFooter);
            var middlePanelFooterItemInfo = $(fm.templates.middlePanelFooterItemInfo);

            /*right panel */

            var rightPanelMainArea = $(fm.templates.rightPanelMainArea);


            /*middle panel add jsscroll enable code*/
            var middlePanelJscroll = $(fm.templates.middlePanelJscroll);

            /*middle top header controls*/
            middlePanelMenuContainer.append(folderIconContainer);
            middlePanelMenuContainer.append(middleTopheaderfolderNameContainer);
            middlePanelMenuContainer.append(middlePanleActionButtonPanel);
            middleTopActionDownArrow.append(fm.iconsCenter.sort);
            middlePanelMenuContainer.append(middleTopActionDownArrow);
            middlePanelMenuContainer.append(middleTopSortPanel);
            middlePanelHeaderMain.append(middlePanelMenuContainer);
            folderIconContainer.append(fm.iconsCenter.folder);
            middleTopSortPanel.append(fm.iconsCenter.filter);
            /*append both top left header and top middle header to the top header main control panel*/
            fileManagerTopHeaderControlPanel.append(fileManagerLeftHeaderControl);
            fileManagerTopHeaderControlPanel.append(middlePanelHeaderMain);

            /*----------end of the Top header layout-----------------------*/

            /*Left panel creation*/
            treeMainArea.append(treeArea);
            /*MIDDLE PANEL CREATION */
            /*START-Middle panel control 1*/
            /*panel for bread crumb*/
            middlePanleBreadCrumb.append(middlePanelBreadcrumbItems);
            /*END-Middle panel control 1*/

            /*panel Middle panel control 1 which is main area to which below mentioned controls should be added*/

            /*START--Middle panel control 2 */
            /*underneath the breadcrumb there are check box,  text'type','NAme','Last modified'.  */
            middlePanleContentAreaListHeader.append(selectAllCheckBox);
            middlePanleContentAreaListHeader.append(middlePanelTypeColumn);
            middlePanleContentAreaListHeader.append(middlePanelNameColumn);
            middlePanleContentAreaListHeader.append(middlePanleLastModifiedColumn);
            middlePanelContentArea.append(middlePanelContentList);
            /*END--Middle panel control 2*/

            /*START-middle panel control 3*/
            /*footer section in middle panel*/
            middlePanleFooter.append(middlePanelFooterItemInfo);
            middlePanleFooter.append(middlePanelJscroll);

            /*END- middle panel control 3*/

            /*add middle panle controls 1,2,3 to the main*/

            middlePanelMainContainer.append(middlePanleBreadCrumb);
            middlePanelMainContainer.append(middlePanleContentAreaListHeader);
            middlePanelMainContainer.append(middlePanelContentArea);
            middlePanelMainContainer.append(middlePanleFooter);

            /* add left panel  and middle panel and right panel to the bottomMainArea*/

            bottomMainArea.append(treeMainArea);
            bottomMainArea.append(middlePanelMainContainer);
            bottomMainArea.append(rightPanelMainArea);

            /*Append both top header section and bottom main area to the MAIN area of the page*/

            mainContainer.append(fileManagerTopHeaderControlPanel);
            mainContainer.append(bottomMainArea);
            if (enableControls && !options.adminView) {
                fm.methods.addActionButtons(true);
            }
        },
        filterAjaxResponseForTree: function (response) {
            response = response.GetFolderContentResult;
            var nodesResult = [];
            fm.childrenContainer[fm.getDataLastId] = response;

            for (var i = 0; i < response.length; i++) {
                var thisResponse = response[i];
                // push data to dataContainer
                fm.dataContainer[thisResponse.attr.id] = response[i];
                if (thisResponse.metadata.nodeType != 'folder') continue;
                // making the tree's node
                fm.treeIDs.push(thisResponse.attr.id);

                var tmpNode = new Object();
                tmpNode.id = thisResponse.attr.id;
                tmpNode.parent = fm.getDataLastId;
                tmpNode.text = thisResponse.data.title;
                if (thisResponse.metadata.isTemplate) {
                    tmpNode.type = "template";
                }

                if (fm.isRoot == true) {
                    fm.isRoot = false;
                    tmpNode.parent = "#";
                    fm.options.rootFolderId = thisResponse.attr.id;
                }
                if (thisResponse.metadata.count >= 1)
                    tmpNode.children = true;
                else
                    tmpNode.children = false;

                nodesResult.push(tmpNode);
            }
            return nodesResult;
        },
        getFormatedDate: function (nonFormatedDate, rgihtPanelFormat) {
            if (!nonFormatedDate) return '';
            try {
                var ms = parseInt(nonFormatedDate.slice(6)), // nonFormatedDate = "/Date(1377849824000+0530)/"
						date = new Date(ms);
                var day = date.getDay() + 1;
                if (rgihtPanelFormat)
                    return date.getMonth() + "/" + day + "/" + (date.getFullYear() + "").substring(2, 4);
                else
                    return fm.date.months[date.getMonth()] + " " + date.getDate() + "," + date.getFullYear();
                return day
            } catch (e) {
                fm.methods.error("getFormatedDate_ERROR", ms);
                return "";
            }
        },
        initDropDownMenus: function () {
            /*
			Build Context Menu for Left Panel 'Sort' fucntionality
			*/
            $('#menu').contextPopup({
                items: [{
                    label: 'Par date de création ',
                    action: function (e) {
                        fm.methods.sortByDate(fm.options.rootFolderId);
                    }
                }, {
                    label: 'Par date de modification ',
                    action: function (e) {
                        fm.methods.sortByModifiedDate(fm.options.rootFolderId);
                    }
                }, {
                    label: 'De nom',
                    action: function (e) {
                        fm.methods.sortByName(fm.options.rootFolderId);
                    }
                }
                ]
            });
            /*
			Build Context Menu on Middle Panel header
			*/
            var contextPopupItems = [];
            var addFolder = {
                label: 'Add Folder',
                action: function (e) {
                    fm.methods.createFolderShowInTree(fm.currentId);
                }
            };
            var addFile = {
                label: 'Add File',
                action: function (e) {
                    fm.methods.createAddFilePopUp(fm.currentId);
                }
            };
            var move = {
                label: 'Déplacer vers..',
                action: function (e) {
                    var node = $(fm.options.treeID).jstree("get_node", {
                        id: fm.currentId
                    });
                    fm.methods.createMovingPopUp([fm.currentId], node.parent); //this is being used
                }
            };
            var rename = {
                label: 'Renommer',
                action: function (e) {
                    fm.methods.renameFolder(fm.currentId);
                }
            };
            var delete_node = {
                label: 'Supprimer',
                action: function (e) {
                    var node = $(fm.options.treeID).jstree("get_node", {
                        id: fm.currentId
                    });
                    fm.methods.createDeletePopUp([fm.currentId], node.parent, node.text);
                    $deleteDialog.dialog('open');
                    /*
					Fixed the overlap problem. Added required css to ui-dialog class
					*/
                    $('.ui-dialog').css('z-index', '1250');
                }
            };
            contextPopupItems.push(addFolder);
            contextPopupItems.push(addFile);
            if (fm.currentId != fm.options.rootFolderId && ((fm.adminView) || (fm.currentId && !fm.dataContainer[fm.currentId].metadata.isTemplate))) {
                contextPopupItems.push(move);
                contextPopupItems.push(rename);
                contextPopupItems.push(delete_node);
            }
            /*To hide the Dropdown on right click of the  SPC Tool Folder*/
            if (fm.dataContainer[fm.currentId].metadata.isToolDoc) {
                $(".xp-SortDown").css("display", "none");
                contextPopupItems.splice(1, 5)
            }
            /*
			Build Context Menu for Middle Panel 'Sort' fucntionality
			*/
            $('#middle-menu').contextPopup({
                items: contextPopupItems
            });
            $("#sort-middle-menu").contextPopup({
                items: [{
                    label: 'Par date de création ',
                    action: function () {
                        fm.methods.sortMiddleMenuByCreatedDate();
                    }
                }, {
                    label: 'Par date de modification ',
                    action: function () {
                        fm.methods.sortMiddleMenuByModifiedDate();
                    }
                }, {
                    label: 'Par nom',
                    action: function () {
                        fm.methods.sortMiddleMenuByName();
                    }
                }

                ]
            });
        },
        /*
		Middle Panel - Sort by Name
		*/
        sortMiddleMenuByName: function () {
            var children = fm.childrenContainer[fm.currentId];
            for (var fInd = 0; fInd < children.length; fInd++) {
                for (var sInd = 0; sInd < children.length; sInd++) {
                    if (fm.dataContainer[children[fInd].attr.id].data.title.toUpperCase() < fm.dataContainer[children[sInd].attr.id].data.title.toUpperCase()) {
                        var x = children[fInd];
                        children[fInd] = children[sInd];
                        children[sInd] = x;
                    }
                }
            }
            fm.childrenContainer[fm.currentId] = children;
            fm.methods.showMiddlePanelData(fm.currentId);
        },
        /*
		Middle Panel - Sort by Created Date
		*/
        sortMiddleMenuByCreatedDate: function () {
            var children = fm.childrenContainer[fm.currentId];
            for (var fInd = 0; fInd < children.length; fInd++) {
                for (var sInd = 0; sInd < children.length; sInd++) {
                    fDateNumber = Number(new Date(fm.methods.getFormatedDate(fm.dataContainer[children[fInd].attr.id].metadata.addedDate, false)));
                    sDateNumber = Number(new Date(fm.methods.getFormatedDate(fm.dataContainer[children[sInd].attr.id].metadata.addedDate, false)));
                    if (fDateNumber > sDateNumber) {
                        var x = children[fInd];
                        children[fInd] = children[sInd];
                        children[sInd] = x;
                    }
                }
            }
            fm.childrenContainer[fm.currentId] = children;
            fm.methods.showMiddlePanelData(fm.currentId);
        },
        /*
		Middle Panel - Sort by Modified Date
		*/
        sortMiddleMenuByModifiedDate: function () {
            var children = fm.childrenContainer[fm.currentId];
            for (var fInd = 0; fInd < children.length; fInd++) {
                for (var sInd = 0; sInd < children.length; sInd++) {
                    fDateNumber = Number(new Date(fm.methods.getFormatedDate(fm.dataContainer[children[fInd].attr.id].metadata.addedDate, false)));
                    sDateNumber = Number(new Date(fm.methods.getFormatedDate(fm.dataContainer[children[sInd].attr.id].metadata.addedDate, false)));
                    if (fDateNumber > sDateNumber) {
                        var x = children[fInd];
                        children[fInd] = children[sInd];
                        children[sInd] = x;
                    }
                }
            }
            fm.childrenContainer[fm.currentId] = children;
            fm.methods.showMiddlePanelData(fm.currentId);
        },
        /*
		Delete file/folders - Ajax call 
		*/
        deleteNodeFromServer: function (nodesToDelete, refreshNode) {
            var nodes = [];
            nodes = nodesToDelete;
            var deleteStrings = "";
            for (var i = 0; i < nodes.length; i++) {
                deleteStrings += nodes[i] + ",";
            }
            deleteStrings = deleteStrings.slice(0, -1);
            var sendData = {
                'nodeId': deleteStrings
            };

            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: fm.serviceUrlRef.deleteNodes,
                data: JSON.stringify(sendData)
            }).done(function (response) {
                $deleteDialog.dialog('close');
                if (response.DeleteResult != undefined && response.DeleteResult.Status == deleteStrings) {
                    fm.dataContainer[refreshNode].metadata.count = fm.dataContainer[refreshNode].metadata.count - nodes.length;
                    $(fm.options.treeID).jstree("refresh_node", refreshNode);
                    setTimeout(function () {
                        $(fm.options.treeID).jstree("deselect_all", false);
                        $(fm.options.treeID).jstree("select_node", refreshNode);
                    }, 2000);

                    nodes.forEach(function (node) {
                        $(fm.options.treeID).jstree("delete_node", node);
                    });
                    fm.methods.displayFlashMsg(fm.messages.deleteSuccess, "");
                } else {
                    fm.methods.displayFlashMsg(response.DeleteResult.Message, "errorFlash");
                }
            }).fail(function (error) {
                fm.methods.displayFlashMsg(fm.messages.deleteError, "errorFlash");
            });
        },
        /*
		Create Folder - Add a node in the tree
		*/
        createFolderShowInTree: function (nodeId) {
            var node = $(fm.options.treeID).jstree(true).get_node({
                id: nodeId
            });
            newNode_id = $(fm.options.treeID).jstree('create_node', node, {
                type: "default",
                text: fm.constants.folderDefaultName
            }, "last", function (new_node) {
                $("#" + node.id).prop('placeholder', fm.constants.contextMenuRightClickTree);
                setTimeout(function () {
                    fm.createFolderFlag = true;
                    $(fm.options.treeID).jstree('edit', new_node);
                }, 0);
            });
        },
        /*
		Create Folder - Ajax call
		*/
        createFolderServerRequest: function (treeNode) {
            var sendData = {
                nodeId: treeNode.parent,
                newFolderName: treeNode.text
            };
            $.ajax({
                url: fm.serviceUrlRef.folderExists,
                type: "POST",
                data: JSON.stringify(sendData),
                dataType: 'json',
                contentType: "application/json"

            }).done(function (data) {
                var data = data.FolderExistsResult;
                if (data.Status == "false") {
                    $.ajax({
                        url: fm.serviceUrlRef.createFolder,
                        type: "POST",
                        data: JSON.stringify(sendData),
                        dataType: 'json',
                        contentType: "application/json"
                    }).done(function (data) {
                        data = data.CreateFolderResult // should check if faild ....
                        $(fm.options.treeID).jstree("deselect_all", false);
                        if (data.attr.id == undefined) {
                            var res = $(fm.options.treeID).jstree("delete_node", treeNode);
                            $(fm.options.treeID).jstree("select_node", fm.options.rootFolderId);
                            fm.methods.displayFlashMsg(fm.messages.createFolderError, "errorFlash");
                            return;
                        }
                        fm.dataContainer[treeNode.parent].metadata.count = fm.dataContainer[treeNode.parent].metadata.count + 1;
                        $(fm.options.treeID).jstree("refresh_node", treeNode.parent);
                        $(fm.options.treeID).jstree(true).set_id(treeNode, data.attr.id);
                        setTimeout(function () {
                            $(fm.options.treeID).jstree("select_node", treeNode.parent);
                        }, 500);
                        fm.methods.displayFlashMsg(fm.messages.createFolderSuccess, "");
                    }).fail(function (data) {
                        fm.methods.displayFlashMsg(fm.messages.createFolderError, "errorFlash");
                    });
                }
                else {
                    var res = $(fm.options.treeID).jstree("delete_node", treeNode);
                    fm.methods.displayFlashMsg(fm.messages.folderExistsError, "errorFlash");
                    return;
                }
            });
        },
        refreshTree: function (tree, refreshNode, selectNode) {
            tree.jstree("refresh_node", refreshNode);
            setTimeout(function () {
                tree.jstree("deselect_all", false);
                tree.jstree("select_node", selectNode);
            }, 500);
        },
        /*
		Makes the jstree node editable
		*/
        renameFolder: function (nodeId) {
            var currentNode = $(fm.options.treeID).jstree(true).get_node(nodeId);
            $(fm.options.treeID).jstree(true).edit(currentNode);
        },
        /*rename file functionality from middle top header*/
        renameFileHeader: function (fileId) {
            var prevTitle;
            $(".right-panel-item-view-tilte").prop("disabled", false).focus();
            $(".right-panel-title-edit").hide();
            $(".right-panel-title-edit").after("<div class='title-msg'>Appuyer sur la touche Enter pour sauvegarder</div>");
            prevTitle = $(".right-panel-item-view-tilte").val();
            $(".right-panel-item-view-tilte").focusout(function () {
                $('.right-panel-title-edit').css({ 'display': 'inline' });
                $(".title-msg").remove();
                $(".right-panel-item-view-tilte").prop("disabled", true);
                $(".right-panel-item-view-tilte").val(prevTitle);
            })
            $(".right-panel-item-view-tilte").focusout(function () {

                $(".title-msg").remove();
            })
        },
        /*
		Makes the ajax call to rename and refreshes the containers
		*/
        renameNode: function (nodeId, newNodeName) {
            var treeNode = $(fm.options.treeID).jstree(true).get_node(nodeId);
            var sendData = {
                nodeId: treeNode.parent,
                newFolderName: newNodeName
            };
            $.ajax({
                url: fm.serviceUrlRef.folderExists,
                type: "POST",
                data: JSON.stringify(sendData),
                dataType: 'json',
                contentType: "application/json"
            }).done(function (data) {
                var data = data.FolderExistsResult;
                var currentNode = $(fm.options.treeID).jstree(true).get_node(nodeId);
                if (data.Status == "false") {
                    sendData = {
                        nodeId: nodeId,
                        newNodeName: newNodeName,
                        nodeType: fm.dataContainer[nodeId].metadata.nodeType
                    };
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: fm.serviceUrlRef.renameNode,
                        data: JSON.stringify(sendData)
                    }).done(function () {
                        fm.methods.displayFlashMsg(fm.messages.renameSuccess, "");
                        /*if the selected node is renamed then the Middle header menu and Breadcrumb needs updating*/
                        if (nodeId == fm.currentId || currentNode.parent == fm.currentId) {
                            fm.dataContainer[nodeId].data.title = newNodeName;
                        }
                    })
					.fail(function (error) {
					    fm.methods.displayFlashMsg(fm.messages.renameError, "errorFlash");
					});
                }
                else {
                    fm.methods.displayFlashMsg(data.Message, "errorFlash");
                }
                fm.methods.refreshTree($(fm.options.treeID), currentNode.parent, fm.currentId);
            });
        },
        /*
		Build the middle panel data
		*/
        showMiddlePanelData: function (nodeID) {
            $("input[name=checkAll]").prop('checked', false);
            $("." + fm.style.classes.middlePanelContentListBody).html("");
            $("." + fm.style.classes.middlePanelItemsCounter).html("");
            fm.selectedItems = [];

            var currentNodeChildren = fm.childrenContainer[nodeID];
            fm.methods.updateMiddleHeaderMenu();
            if (currentNodeChildren == null) return;
            $("." + fm.style.classes.middlePanelContentListBody).html("");
            /*
			Count the number of subfolders, files and urls in a folder
			*/
            var folder = 0,
					file = 0,
					url = 0;
            for (var i = 0; i < currentNodeChildren.length; i++) {
                $("." + fm.style.classes.middlePanelContentListBody).
				append(fm.methods.createMiddlePanelContentItem(currentNodeChildren[i].attr.id,
						currentNodeChildren[i].data.title,
						currentNodeChildren[i].metadata.nodeType,
						fm.methods.getFormatedDate(currentNodeChildren[i].metadata.addedDate, false),
						currentNodeChildren[i].data.icon));
                switch (currentNodeChildren[i].metadata.nodeType) {
                    case 'file':
                        file++;
                        break;
                    case 'folder':
                        folder++;
                        break;
                    case 'url':
                        url++;
                        break;
                }
            }
            $("." + fm.style.classes.middlePanelItemsCounter).html(
					folder + " dossiers, " + file + " fichiers, " + url + " Url."
			);

            /*drag and drop changes*/
            $("." + fm.style.classes.middlePanelContentListBody).
	after('<div id="file-upload"><span>Déposez les fichiers ici</span></div>');

            $('#file-upload').fileupload({
                url: fm.serviceUrlRef.uploadFiles,
                dataType: 'xml',
                singleFileUploads: true,
                formAcceptCharest: 'utf-8',
                dropZone: $('#file-upload'),
                formData: {
                    "folderId": fm.currentId,
                    "trackerId": fm.options.trackerId
                },
                add: function (e, data) {
                    fm.methods.hideMsg();
                    $(".browser-visible").css({ 'top': '8px' });
                    if (fm.methods.isFileTypeAllowed(data.files[0].name)) {
                        var sendData = {
                            folderId: fm.currentId,
                            fileName: data.files[0].name
                        };
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            url: fm.serviceUrlRef.fileExists,
                            data: JSON.stringify(sendData)
                        })
						.done(function (status) {

						    var res = status.FileExistsResult;
						    if (res.Status == "true") {
						        $("#file-upload").attr("style", "display:none;");
						        $('.middle-panel-content-list-body').attr("style", "display:block");

						        fm.methods.displayFlashMsg("The file " + data.files[0].name + " is existing", "");
						    }
						    else {
						        data.submit();
						    }
						});
                    }
                    else {
                        $("#file-upload").attr("style", "display:none;");
                        fm.methods.displayMsg("File type not allowed");
                        $(".browser-visible").css({ 'top': '43px' });
                    }
                },

                done: function (e, data) {

                    $("." + fm.style.classes.middlePanelContentListBody).show();
                    var resp = data.response();
                    var responseJSON = resp.jqXHR.responseText;
                    data = JSON.parse($(responseJSON).text());

                    fm.dataContainer[data.attr.id] = data;
                    if (fm.childrenContainer[fm.currentId] == undefined) fm.childrenContainer[fm.currentId] = [];
                    fm.childrenContainer[fm.currentId].push(data);
                    fm.methods.showMiddlePanelData(fm.currentId);
                    $("#file-upload").attr("style", "display:none;");
                    fm.methods.displayFlashMsg("The file " + data.data.title + "  uploaded successfully", "");
                },
                progressall: function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progress .progress-bar').css(
							'width',
							progress + '%');
                },
                dragover: function (e) {
                    $("#file-upload").attr("style", "display:block;");

                    $('#progress').css("background-color", "#7DBFD4");
                },
                dragleave: function (e) {
                    $("#file-upload").attr("style", "display:none;");
                    $('.middle-panel-content-list-body').attr("style", "display:block");
                },
                drop: function (e, data) {

                }
            }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');

            $("#file-upload").on('drop', function (event) {

            });

            $("." + fm.style.classes.middlePanelContentListBody).on('dragover', function (event) {
                $(this).hide();
                $("#file-upload").show();
            });

            $('.middle-panel-drag-node').draggable({
                axis: "y",
                revert: true,
                start: function (event, ui) {
                    //get all selected...e
                    if (ui.helper.hasClass(fm.style.classes.middlePanelContentListItemActive)) {
                        fm.selectedDrag = $('.' + fm.style.classes.middlePanelContentListItemActive);
                        $('.' + fm.style.classes.middlePanelContentListItemActive).css('position', 'absolute');
                    }

                    else {
                        fm.selectedDrag = $(ui.helper);
                        $('div.' + fm.style.classes.middlePanelContentListItemActive).removeClass(fm.style.classes.middlePanelContentListItemActive)
                    }
                },
                stop: function (event, ui) {
                    fm.selectedDrag.css('position', 'relative');
                },
                drag: function (event, ui) {
                    var currentLoc = $(this).position();
                    var prevLoc = $(this).data('prevLoc');
                    if (!prevLoc) {
                        prevLoc = ui.originalPosition;
                    }

                    var offsetLeft = currentLoc.left - prevLoc.left;
                    var offsetTop = currentLoc.top - prevLoc.top;

                    fm.methods.moveSelected(offsetLeft, offsetTop);
                    $(this).data('prevLoc', currentLoc);
                }
            });

            $('.middle-panel-drop-folders').droppable({
                drop: function (event, ui) {
                    elem = this;
                    $("." + fm.style.classes.middlePanelContentListBody).find('input:checked').each(function (i, e) {
                        var movedNode = $(this).val();
                        var oldParent = $(fm.options.treeID).jstree(true).get_node({ id: movedNode }).parent;
                        $('#' + movedNode).parent().hide();
                        var input = $(elem).find('input');
                        newParent = $(input).val();
                        $(elem).css('border', '0px');
                        fm.methods.moveNodes(oldParent, newParent, movedNode, 1);
                    });
                },

                over: function (event, ui) {
                    $(this).css('border', '1px solid #E7E7E8');
                },
                out: function (event, ui) {
                }
            });

            /* this code/ method is written for document select on document area on click of docuement name.
             */
            $(".middle-panel-content-list-item").click(function () {
                var ids = this.id;
                var fileDetail = document.getElementById(ids).getAttribute("value");
                if ($("div.selectedFile_" + fileDetail + " input[name=middle-panel-list-checkbox]").hasClass("middle-panel-content-list-item-active")) {
                    $("div.selectedFile_" + fileDetail + " input[name=middle-panel-list-checkbox]").prop('checked', false);
                    $(this).removeClass(fm.style.classes.middlePanelContentListItemActive);
                } else {
                    fm.selectedItems = [];
                    $("div.selectedFile_" + fileDetail + " input[name=middle-panel-list-checkbox]").prop('checked', true);
                }
                var cbVal = $("div.selectedFile_" + fileDetail + " input[name=middle-panel-list-checkbox]").val();
                var inputID = "selectFile_" + fileDetail;
                var selected = document.getElementById(inputID);
                if ($(".contextmenu-menu-div-hide").length && $(".contextMenuPlugin").length) {
                    $(".contextmenu-menu-div-hide").remove();
                    $(".contextMenuPlugin").remove();
                }
                if (selected.checked) {
                    $("input[type='checkbox']:checked").each(function () {
                        fm.selectedItems.push($(this).val());
                    });
                    $(selected).addClass(fm.style.classes.middlePanelContentListItemActive);
                } else {
                    fm.selectedItems = fm.methods.deleteElementFromArray(fm.selectedItems, cbVal);
                    $("input[name=checkAll]").prop('checked', false);
                    $(selected).removeClass(fm.style.classes.middlePanelContentListItemActive);
                }
                fm.methods.updateMiddleHeaderMenu();
                if (fm.selectedItems.length == 0) {
                    $("#" + fm.style.ids.rightMainMenuWhenSelected + "").css("display", "none");
                    $("#" + fm.style.ids.rightMainMenuWithoutSelect + "").css("display", "block");
                } else {
                    $("#" + fm.style.ids.rightMainMenuWhenSelected + "").css("display", "block");
                    $("#" + fm.style.ids.rightMainMenuWithoutSelect + "").css("display", "none");
                }
                if (fm.selectedItems.length == 1) {
                    fm.methods.updateRightPanel(fm.dataContainer[fm.selectedItems[0]]);
                } else {
                    fm.methods.updateRightPanel(fm.dataContainer[fm.selectedItems[fm.selectedItems.length - 1]]);
                }
            });
            // End of select document on document area.
            /*
			Change in checkbox selection
			*/
            /*$("input[name=middle-panel-list-checkbox]").change(function () {
				if ($(".contextmenu-menu-div-hide").length && $(".contextMenuPlugin").length) {
					$(".contextmenu-menu-div-hide").remove();
					$(".contextMenuPlugin").remove();
				}
				if (this.checked) {
					fm.selectedItems.push($(this).val());
					$($(this).parent()).addClass(fm.style.classes.middlePanelContentListItemActive);
				} else {
					fm.selectedItems = fm.methods.deleteElementFromArray(fm.selectedItems, $(this).val());
					$("input[name=checkAll]").prop('checked', false);
					$($(this).parent()).removeClass(fm.style.classes.middlePanelContentListItemActive);
				}
				fm.methods.updateMiddleHeaderMenu();

				if (fm.selectedItems.length == 0) {
					$("#" + fm.style.ids.rightMainMenuWhenSelected + "").css("display", "none");
					$("#" + fm.style.ids.rightMainMenuWithoutSelect + "").css("display", "block");

				} else {
					$("#" + fm.style.ids.rightMainMenuWhenSelected + "").css("display", "block");
					$("#" + fm.style.ids.rightMainMenuWithoutSelect + "").css("display", "none");

				}
				if (fm.selectedItems.length == 1) {
					fm.methods.updateRightPanel(fm.dataContainer[fm.selectedItems[0]]);
				} else {
					fm.methods.updateRightPanel(fm.dataContainer[fm.selectedItems[fm.selectedItems.length - 1]]);
				}
			});*/
            $("." + fm.style.classes.middlePanelDetailLine).click(function () {
                var nodeId = $(this).attr('id');
                if (fm.dataContainer[nodeId].metadata.nodeType == 'folder') {
                    $(fm.options.treeID).jstree("deselect_all", false);
                    $(fm.options.treeID).jstree("select_node", nodeId);
                }
            });

            fm.methods.updateRightPanel(fm.selectedItems[0]);
        },
        /*
		Methods to accomplish middle panel action buttons management
		*/

        /* When no item is selected in the middle Panel */
        middlePanelNoContentSelection: function () {
            var middleMenuInHeader = $("." + fm.style.classes.middleMenuInHeader);
            var middleTopheaderfolderNameContainer = $(fm.templates.middleTopheaderfolderNameContainer);
            middleMenuInHeader.html('');
            /*
			Folder Icon
			*/
            var folderIconContainer = $(fm.templates.folderIconContainer);
            folderIconContainer.append(fm.iconsCenter.folder);
            middleMenuInHeader.append(folderIconContainer);
            /*
			Folder Title
			*/
            middleTopheaderfolderNameContainer.text(fm.dataContainer[fm.currentId].data.title);
            middleMenuInHeader.append(middleTopheaderfolderNameContainer);
            /*
			Sort Panel
			*/
            var middleTopSortPanel = $(fm.templates.middleTopSortPanel);
            middleTopSortPanel.append(fm.iconsCenter.filter);
            middleMenuInHeader.append(middleTopSortPanel);
            /*
			For Admin Templates Page - folder actions not allowed for 'root' folder
			For Lifecycle Documents Page - folder actions not allowed for 'Template' folders
			*/
            var isTemplate = fm.dataContainer[fm.currentId].metadata.isTemplate;
            var isToolDoc = fm.dataContainer[fm.currentId].metadata.isToolDoc;
            var editable = (fm.options.adminView) ? enableControls && !((fm.currentId == fm.options.rootFolderId)) : enableControls && !isTemplate;
            if (isToolDoc) {
            }
            if (editable) {
                var middleTopActionDownArrow = $(fm.templates.middleTopActionDownArrow);
                middleTopActionDownArrow.append(fm.iconsCenter.sort);
                middleMenuInHeader.append(middleTopActionDownArrow);
            }
            var rightPanelNoSelectionMain = $(fm.templates.rightPanelNoSelectionMain);
            var rightPanelNoSelectionMessage = $(fm.templates.rightPanelNoSelectionMessage);
            if ($("#rightPanelMainId").children().length) {
                $("#rightPanelMainId").html('');
            }
            rightPanelNoSelectionMain.append(rightPanelNoSelectionMessage);
            $("#rightPanelMainId").append(rightPanelNoSelectionMain);
        },
        /*When only one item is selected */
        middlePanleSingleContentSelection: function () {
            var nodeType = fm.dataContainer[fm.selectedItems].metadata.nodeType;
            var isToolDoc = fm.dataContainer[fm.selectedItems].metadata.isToolDoc;
            var isTemplate = fm.dataContainer[fm.selectedItems].metadata.isTemplate;
            var isLCFolder = fm.dataContainer[fm.selectedItems].metadata.lcFolder;
            var editable = (fm.options.adminView) ? enableControls && !isLCFolder : enableControls && !isTemplate;
            /*
			if a Template folder is selected on Lifecycle Documents page
			OR
			If a Folder is selected AND enableControls is false on Admin Template Page
			then no action buttons will be available so do nothing and return
			*/
            if (nodeType == 'folder' && !editable) {
                fm.methods.middlePanelNoContentSelection();
                return;
            }
            /*** If Action buttons needs to be added then proceed further  ***/
            var menuInMiddleHeader = $("." + fm.style.classes.middleMenuInHeader);
            /*
			Action buttons
			*/
            var deleteFile = $(fm.templates.deleteFile);
            var moveFile = $(fm.templates.moveFile);
            var renameFolder = $(fm.templates.renameFolder);
            var renameFile = $(fm.templates.renameFile);
            var actionButtonHolder = $(fm.templates.actionButtonHolder);
            actionButtonHolder.html('');
            /*
			Delete and Move actions are available for all nodeTypes when editable is true
			*/
            var includeDeleteMove = false;
            var includeRestore = false;
            if (editable) {
                includeDeleteMove = true;
            }
            /*
			Node Type is folder
			*/
            if (nodeType == 'folder' && isToolDoc) {
                var includeDeleteMove = false;
                var includeRestore = false;
                actionButtonHolder.append("");
            }
            else if (nodeType == 'folder' && editable) {
                /*
				if editable add the action buttons
				*/
                actionButtonHolder.append(renameFolder);
            }

                /*
				Node type is File
				*/
            else if (nodeType == 'file') {
                if (isTemplate && !fm.options.adminView) {
                    var downloadAdminFile = $(fm.templates.downloadAdminFile);
                    actionButtonHolder.append(downloadAdminFile);
                } else if (isToolDoc) {
                    var downloadAdminFile = $(fm.templates.downloadAdminFile);
                    actionButtonHolder.append(downloadAdminFile);
                    includeDeleteMove = false;

                }
                    /*Start of Major else*/
                else {
                    /*if the file is locked*/
                    if (fm.dataContainer[fm.selectedItems].metadata.locked.lockState) {
                        actionButtonHolder.html('');
                        includeDeleteMove = false;
                        var downloadLatestVersionFile = $(fm.templates.downloadLatestVersionFile);
                        actionButtonHolder.append(downloadLatestVersionFile);
                        /*if the current logged in user is the user who locked the file*/
                        if (enableControls && fm.dataContainer[fm.selectedItems].metadata.locked.amIOwner) {
                            var uploadNewVersion = $(fm.templates.uploadNewVersion);
                            var unlockFile = $(fm.templates.unlockFile);
                            actionButtonHolder.append(uploadNewVersion);
                            actionButtonHolder.append(unlockFile);
                        }
                    }
                        /*if the file is NOT locked*/
                    else {
                        var items = [];
                        var restoreArray = [];
                        var downloadFile = $(fm.templates.downloadFile);
                        var versionCount = fm.dataContainer[fm.selectedItems].metadata.versionCount;
                        if (editable) {
                            actionButtonHolder.append(renameFile);

                            /*
							If the file has a single version
							*/
                            if (versionCount == 1) {
                                actionButtonHolder.append(downloadFile);
                                downloadFile.click(function (e) {
                                    //Create the download/lock popup here
                                    fm.methods.createDownloadPopUp(fm.dataContainer[fm.selectedItems], versionCount);
                                });
                            }
                                /*
								If the file has multiple versions
								*/
                            else if (versionCount > 1) {
                                /*
								If editable is true then allow for restore and downloading latest + previous versions
								*/

                                var restoreFile = $(fm.templates.restoreFile);
                                actionButtonHolder.append(downloadFile);
                                includeRestore = true;
                                /*Start of for lop*/
                                for (var vInd = versionCount; vInd >= 1; vInd--) {
                                    (function (index) {
                                        // For Download
                                        var tempObj = new Object();
                                        tempObj.label = 'version ' + index;
                                        /*temp  object*/
                                        tempObj.action = function () {
                                            fm.methods.middlePanelDownloadFile(fm.dataContainer[fm.selectedItems], index);
                                        };
                                        /* To show the selected version in RHS as highlighted in the download button ddm in Middle Panel*/
                                        if (index == versionCount) {
                                            tempObj.highlightClass = 'selected-menu';
                                        }
                                        /*End of temp object */
                                        items.push(tempObj);
                                        // For Restore 
                                        if (index != versionCount) {
                                            var tempRes = new Object();
                                            tempRes.label = 'version ' + index;
                                            tempRes.action = function () {
                                                fm.methods.middlePanelRestoreFile(fm.dataContainer[fm.selectedItems], index);
                                            };
                                            restoreArray.push(tempRes);
                                        }
                                        /*end of restore*/
                                    })(vInd);

                                    /*end of the function(index)*/
                                }
                                /*End of for loop*/

                                restoreFile.contextPopup({
                                    items: restoreArray
                                });
                                downloadFile.contextPopup({
                                    items: items
                                });

                            }
                        }
                            /*
									If enableControls is false allow to download only latest version of file
									*/
                        else {
                            var downloadLatestVersionFile = $(fm.templates.downloadLatestVersionFile);
                            actionButtonHolder.append(downloadLatestVersionFile);
                        }
                    } /*END of ELSE - if File is NOT Locked*/
                }
                /*End of major else*/
            }
            /*End of node type is File*/
            if (includeDeleteMove) {
                actionButtonHolder.append(deleteFile);
                actionButtonHolder.append(moveFile);
            }

            if (includeRestore) {
                actionButtonHolder.append(restoreFile);
            }
                /*If the type is url*/
            else if (nodeType == 'url') {
                var redirectToUrl = $(fm.templates.redirectToUrl);
                actionButtonHolder.append(redirectToUrl);
            }
            menuInMiddleHeader.html(actionButtonHolder);
            /*End of single file selection*/
        },

        /*when the multiple files/folders have been selected*/
        middlePanelMultipleItemSelection: function () {
            var actionButtonHolder = $(fm.templates.actionButtonHolder);
            var deleteFile = $(fm.templates.deleteFile);
            var moveFile = $(fm.templates.moveFile);
            var downloadFile = $(fm.templates.downloadFile);
            var downloadAdminFile = $(fm.templates.downloadAdminFile);
            var middleMenuInHeader = $("." + fm.style.classes.middleMenuInHeader);

            /*
			Maintain boolean variables to check 
			a) what combination of nodeType is selected
			b) Is any of the selected file in 'locked' state
			c) if Lifecycle documents page then check if any of the selected items is a Template file or folder
			*/
            var hasFiles = false,
				hasLockedFile = false,
						hasFolders = false,
						hasLCFolder = false,
						hasUrl = false,
						hasTemplate = false;
            var isToolDoc;
            /*
			Loop through all the selected items and check what all nodeTypes are selected
			Based on this the action buttons will be enabled
			*/
            for (var snInc = 0; snInc < fm.selectedItems.length; snInc++) {
                /*
				For Lifecycle documents page check if any of the selected items is a Template file or folder 
				*/
                if (fm.dataContainer[fm.selectedItems[snInc]].metadata.isToolDoc) {
                    isToolDoc = true;
                }
                if (!fm.options.adminView && fm.dataContainer[fm.selectedItems[snInc]].metadata.isTemplate) {
                    hasTemplate = true;
                }
                var nodeType = fm.dataContainer[fm.selectedItems[snInc]].metadata.nodeType;
                if (nodeType == 'file') {
                    hasFiles = true;
                    if (fm.dataContainer[fm.selectedItems[snInc]].metadata.locked.lockState) {
                        hasLockedFile = true;
                    }
                } else if (nodeType == 'folder') {
                    hasFolders = true;
                    if (fm.options.adminView && fm.dataContainer[fm.selectedItems[snInc]].metadata.lcFolder) {
                        hasLCFolder = true;
                    }
                } else if (nodeType == 'url') {
                    hasUrl = true;
                }
            }
            var editable = (fm.options.adminView) ? enableControls && !hasLCFolder : enableControls && !hasTemplate;
            /*
			if on Lifecycle documents page then check then if any of the selected items is a Template file or folder
			OR 
			If one/more Folder is selected with any combination AND enableControls is false 
			then no action buttons will be available so reset the action button container and return
			*/
            if (hasFolders && !editable) {
                fm.methods.middlePanelNoContentSelection();
                return;
            }
            /******* Add the required action buttons to the actionButtonHolder based on access rights and what nodeType is selected *******/

            /*
			If enableControls is true then irrespective of the nodeType 'Delete' and 'Move' will be allowed
			a) Multiple Folders
			b) Multiple Files ( In this case 'Download' needs to added in addition to 'Delete' and 'Move' which is done later
			c) Multiple URLs
			d) File(s) + Folder(s) + URL(s)
			e) File(s) + Folder(s)
			f) File(s) + URL(s)
			*/
            if (isToolDoc) {
                actionButtonHolder.append(downloadAdminFile);
            }
            else if (editable) {
                actionButtonHolder.append(deleteFile);
                actionButtonHolder.append(moveFile);
            }
            /*
			If ONLY multiple files are selected
			*/
            if (hasFiles && !hasFolders && !hasUrl) {
                /*
				If any of the selected file is locked then 'Delete' & 'Move' actions are not allowed.
				Only 'Download' is allowed
				Hence empty the actionButtonHolder
				*/
                if (hasLockedFile) {
                    actionButtonHolder.html('');
                }
                if (hasTemplate && !fm.options.adminView) {
                    actionButtonHolder.append(downloadAdminFile);
                }
                else if (isToolDoc) {
                    actionButtonHolder.append(downloadAdminFile);
                }
                else {
                    //DOWNLOAD
                    var checkValues = [];
                    $("input[type='checkbox']:checked").each(function () {
                        checkValues.push($(this).val());
                    });
                    if (checkValues.length == 1) {
                        actionButtonHolder.append(downloadFile);
                    }
                    else {
                        $("#download-file").remove();
                    }
                    //actionButtonHolder.append(downloadFile);
                    downloadFile.click(function (e) {
                        //Create the download/lock popup here
                        fm.methods.createDownloadPopUp(fm.selectedItems);
                    });
                }
            }
            else if (hasUrl && !hasFiles && !hasFolders) {
                var redirectToUrl = $(fm.templates.redirectToUrl);
                actionButtonHolder.append(redirectToUrl);
            }

            /*
			If no actions are allowed i.e. actionButtonHolder is empty then reset the Middle Panel hearder menu
			else add the action buttons to the Middle Panel menu container
			*/
            if (actionButtonHolder.html() == "") {
                fm.methods.middlePanelNoContentSelection();
            }
            else {
                middleMenuInHeader.html(actionButtonHolder);
            }
            return;
        },

        updateMiddleHeaderMenu: function () {
            var selectedItemCases = {
                0: fm.methods.middlePanelNoContentSelection,
                1: fm.methods.middlePanleSingleContentSelection
            };
            if (selectedItemCases[fm.selectedItems.length]) {
                selectedItemCases[fm.selectedItems.length]();
            }

                /*if the selected item is more than 1*/
            else if (fm.selectedItems.length > 1) {

                fm.methods.middlePanelMultipleItemSelection();
            }
            $("#download-admin-file").click(function () {
                for (var selCounter = 0; selCounter < fm.selectedItems.length; selCounter++) {
                    (function (item) {
                        if (fm.dataContainer[fm.selectedItems].metadata.fileType == ".doc" || fm.dataContainer[fm.selectedItems].metadata.fileType == ".ppt" || fm.dataContainer[fm.selectedItems].metadata.fileType == ".xls" || fm.dataContainer[fm.selectedItems].metadata.fileType == ".xlsx" || fm.dataContainer[fm.selectedItems].metadata.fileType == ".docx" || fm.dataContainer[fm.selectedItems].metadata.fileType == ".pptx") {
                            fm.methods.downloadMSFiles(fm.dataContainer[fm.selectedItems], fm.dataContainer[fm.selectedItems].metadata.version);
                        }

                        else {
                            window.open(fm.dataContainer[fm.selectedItems].metadata.url);
                        }
                    })(selCounter);
                }
            });

            $("#middle-files-selected-download").click(function () {
                for (var selCounter = 0; selCounter < fm.selectedItems.length; selCounter++) {
                    (function (item) {
                        window.open(fm.dataContainer[fm.selectedItems[item]].metadata.url);
                    })(selCounter);
                }
            });

            $("#folder-middle-header-move").click(function () {
                fm.methods.createMovingPopUp(fm.selectedItems);
            });
            $("#folder-middle-header-delete").click(function () {
                var title = (fm.selectedItems.length == 1) ? fm.dataContainer[fm.selectedItems[0]].data.title : "";
                fm.methods.createDeletePopUp(fm.selectedItems, fm.currentId, title);
                $deleteDialog.dialog('open');
            });
            $("#rename-folder").click(function () {
                var res = fm.methods.renameFolder(fm.selectedItems[0]);
            });
            $("#rename-file").click(function () {
                var res = fm.methods.renameFileHeader(fm.selectedItems[0]);
            });
            $("#MHM-move").click(function () {
                fm.methods.createMovingPopUp(fm.selectedItems, fm.currentId); //this is used
            });
            $("#redirectUrl").click(function () {
                for (var selCounter = 0; selCounter < fm.selectedItems.length; selCounter++) {
                    window.open(fm.dataContainer[fm.selectedItems[selCounter]].metadata.url);
                }
            });
            /* --- FOR LOCKED FILE --- */
            $("#only-download-file-latest-version").click(function () {
                if (fm.dataContainer[fm.selectedItems].metadata.fileType == ".doc" || fm.dataContainer[fm.selectedItems].metadata.fileType == ".ppt" || fm.dataContainer[fm.selectedItems].metadata.fileType == ".xls" || fm.dataContainer[fm.selectedItems].metadata.fileType == ".xlsx" || fm.dataContainer[fm.selectedItems].metadata.fileType == ".docx" || fm.dataContainer[fm.selectedItems].metadata.fileType == ".pptx") {
                    fm.methods.downloadMSFiles(fm.dataContainer[fm.selectedItems], fm.dataContainer[fm.selectedItems].metadata.version);
                }

                else {
                    window.open(fm.dataContainer[fm.selectedItems].metadata.url);
                }

            });
            $("#upload-new-version").click(function () {
                fm.methods.checkinFile(fm.currentId);
            });
            $("#unlock-file").click(function () {
                var unLockNode = new Object();
                unLockNode.nodeId = fm.selectedItems[0];

                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: fm.serviceUrlRef.unlockFile,
                    data: JSON.stringify(unLockNode)
                }).done(function (data) {
                    if (data.DiscardCheckOutResult.Status == "success") {
                        $(".right-panel-locked-section").css("display", "none");
                        fm.dataContainer[fm.selectedItems].metadata.locked.lockState = false;
                        fm.dataContainer[fm.selectedItems].metadata.versionCount = data.DiscardCheckOutResult.VersionCount;
                        fm.methods.updateMiddleHeaderMenu();
                        fm.methods.displayFlashMsg("File unlocked now", "");

                    }

                }).fail(function (error_obj) {
                    fm.methods.error("unlock-file.ajax.fail", error_obj);

                });
            });
            /* --- FOR LOCKED FILE --- */
            fm.methods.initDropDownMenus();
        },
        /*This method is to checkin the file*/
        checkinFile: function (parentID) {
            var dataObject = new Object();
            dataObject.nodeId = fm.selectedItems;
            dataObject.trackerId = fm.options.trackerId;
            $(".progress-popup").css("height", "10px").css("width", "390px");
            if ($uploadFileDialog.length > 0) {
                $uploadFileDialog.children().remove();
                $uploadFileDialog.remove();
            }
            $uploadFileDialog = $('<div id="upload-files-dialog" title="Upload new version">');
            var html = '<div id="error-moving-div" style="display:none;"></div><div id="upload-files-main-div">';
            html += '<div class="xp-from-computer"> <div class="from-comp"> <input type="radio" value="file" id="upload-type" checked="checked" name="upload-type" class="upload-files-default upload-file-type"> De l\'ordinateur </div>';
            html += '<div class="file-button"><input id="fileupload-popup" class="browser-hidden" type="file" name="files[]" /><div class="browser-visible">Parcourir</div></div> </div>';
            html += '<div id="file-selected-popup"> </div> <br/>';
            html += '<div class="add-textArea"> <textarea id="upload-new-version-popup-file-comment" placeholder="Add description of version change here" style="width: 297px;height: 68px;font-style:italic;"></textarea></div>';
            html += '<div><div id="progress-Upload" style="height:10px;width:317px;"> <div class="progress-bar progress-bar-success" > </div> </div>';
            html += '</div></div>';
            $uploadFileDialog.html(html);
            $("body").append($uploadFileDialog);
            $(".upload-url-type").click(function () {
                if ($(".upload-url-type").is(':checked')) {
                    $("#url-input").prop("disabled", false);
                    $("#fileupload-popup").prop("disabled", true);
                    $("#upload-button").attr('disabled', false);
                }
            });
            $(".upload-file-type").click(function () {
                if ($(".upload-file-type").is(':checked')) {
                    $("#fileupload-popup").prop("disabled", false);
                    $("#url-input").prop("disabled", true);
                }
            });
            var uploadPopup = $('#fileupload-popup');
            $(".progress-popup").css("height", "10px").css("width", "390px");
            $("#upload-type").prop('checked', true);
            $("#url-input").val("");
            $("#file-selected-popup").html("");
            $("#fileupload-popup").css("display", "block");
            $(".browser-visible").css("display", "block");
            var control = $("#fileupload-popup");
            control.replaceWith(control = control.clone(true));
            // check the default 
            var radios = $(".upload-files-default");
            $(radios[0]).prop("checked", true);
            var dataToUpload = null;

            $('#fileupload-popup').fileupload({
                url: fm.serviceUrlRef.UploadLatestVersionFile,
                dataType: 'text',
                singleFileUploads: true,
                done: function (e, data) {
                    var resp = data.response();
                    var responseJSON = resp.jqXHR.responseText;
                    // FOR IE 7,8
                    //if(data.dataType="iframe text")
                    responseJSON = responseJSON.replace('<?xml version="1.0" encoding="utf-8" ?>', '');
                    responseJSON = responseJSON.replace('<?xml version="1.0" encoding="utf-8"?>', '');
                    responseJSON = responseJSON.replace('<string xmlns="http://tempuri.org/">', '');
                    responseJSON = responseJSON.replace('</string>', '');
                    responseJSON = responseJSON.replace(/^[ \t]+/gm, '');
                    responseJSON = responseJSON.replace(/^[ \n]+/gm, '');
                    /*if ($(responseJSON).text() == "" || $(responseJSON).text() == '\n') {
					/*This should be in an error message div
					alert("Could not upload the file. Please check if the file with same name does not already exist");
					return;
					}*/
                    data = JSON.parse($.trim(responseJSON));

                    fm.dataContainer[data.attr.id] = data;
                    fm.dataContainer[parentID].metadata.count = fm.dataContainer[parentID].metadata.count + 1;
                    if (fm.childrenContainer[parentID] == undefined) fm.childrenContainer[parentID] = [];
                    fm.childrenContainer[parentID].push(data);
                    $uploadFileDialog.dialog('close');
                    $(fm.options.treeID).jstree("refresh_node", parentID);
                    fm.methods.updateMiddleHeaderMenu();
                    fm.methods.updateRightPanel(fm.dataContainer[fm.selectedItems[0]]);
                },
                formData: {
                    "nodeId": parentID,
                    "trackerId": fm.options.trackerId
                },
                progressall: function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progress-Upload .progress-bar').css(
							'width',
							progress + '%');
                },
                submit: function (e, data) {
                    data.formData = dataObject;
                },
                add: function (e, data) {
                    fm.methods.hideMsg();
                    $(".browser-visible").css({ 'top': '8px' });
                    if (fm.methods.isFileTypeAllowed(data.files[0].name)) {
                        var sendData = {
                            folderId: parentID,
                            fileName: data.files[0].name
                        };
                        var selectedFileName = data.files[0].name.replace(data.files[0].name.substring(data.files[0].name.lastIndexOf('.')), '');
                        var browsedFileType = data.files[0].name.substring(data.files[0].name.lastIndexOf('.'));
                        var selectedFileType = fm.dataContainer[fm.selectedItems[0]].metadata.fileType;
                        if (selectedFileName.indexOf(fm.dataContainer[fm.selectedItems[0]].data.title) > -1 && browsedFileType == selectedFileType) {
                            dataToUpload = data;
                            $("#file-selected-popup").html(data.files[0].name);
                            $(".progress-popup").css("display", "block");
                            $("#fileupload-popup").css("display", "none");
                            $(".browser-visible").css("display", "none");
                            var isDisabled = $("#upload-button").is(':disabled');
                            if (isDisabled) {
                                $("#upload-button").attr('disabled', false);
                            }
                        }
                        else {
                            fm.methods.displayMsg("Télécharger un fichier avec les mêmes nom et format que le fichier sélectionné/verrouillé");
                            $("#upload-button").attr('disabled', true);
                            $(".browser-visible").css({ 'top': '43px' });
                        }
                    }
                    else {
                        fm.methods.displayMsg("Type de fichier non autorisé");
                        $(".browser-visible").css({ 'top': '43px' });
                    }
                }
            }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
            $uploadFileDialog.dialog
			({
			    autoOpen: true,
			    dialogClass: "upload-dialog",
			    width: 332,
			    bgiframe: false,
			    modal: true,
			    buttons: [
				{
				    text: 'Télécharger',
				    id: 'upload-button',
				    click: function () {
				        fm.methods.hideMsg();
				        if ($("input:radio[name=upload-type]:checked").val() == "file") {
				            /*Sanity check*/
				            if (dataToUpload == null) { return; }
				            var comment = $("#upload-new-version-popup-file-comment").val();
				            dataObject.name = '';
				            dataObject.versionComments = comment;
				            dataObject.folderId = parentID;
				            dataToUpload.submit();
				        }
				        else {

				            fm.methods.uploadUrl($("#url-input").val(), parentID);
				        }
				    }
				},
						{
						    text: 'Cancel',
						    id: 'secondarybutton',
						    click: function () {
						        $(this).dialog('close');
						    }
						}
			    ]
			});
        },
        middlePanelRestoreFile: function (file, version) {
            fm.methods.createRestorePopUp(file, version);
        },
        middlePanelDownloadFile: function (file, version) {
            // ONLY DOWNLOAD THE PREVIOUS VErSIONS ... 
            // if I have 3 versions ... 1 ,2 ,3 ..... 1,2 downloading directly 
            if (file.metadata.versionCount > version) {
                fm.methods.clickOnlyDownloadFile(file, version);
                return;
            }
            fm.methods.createDownloadPopUp(file, version);
        },
        /*when the file is selected in middle panel , then load corresponding file related functonality on right panel*/
        onFileSelect: function (selectedItem, editable, isLCTemplate) {
            /*if thereis already layout which was created during previous selection of node then remove it and recreate it*/
            if ($("#rightPanelMainId").children().length) {
                $("#rightPanelMainId").html('');
            }
            var rightPanelFileAddedMain = $(fm.templates.rightPanelFileAddedMain);
            var rightPanelFileAddedbyLabel = $(fm.templates.rightPanelFileAddedbyLabel);
            var rightPanelFileaddedbyValue = $(fm.templates.rightPanelFileaddedbyValue);
            var rightPanelContentArea = $(fm.templates.rightPanelContentArea);
            rightPanelContentArea.css("display", "block");
            var rightPanelItemHeader = $(fm.templates.rightPanelItemHeader);
            var rightpanelItemTitle = $(fm.templates.rightpanelItemTitle);
            var rightpanelItemTitleEdit = $(fm.templates.rightpanelItemTitleEdit);
            rightPanelItemHeader.append(rightpanelItemTitle);
            if (editable) {
                rightPanelItemHeader.append(rightpanelItemTitleEdit);
            }
            rightPanelContentArea.append(rightPanelItemHeader);
            /*user who moddified teh file*/
            var rightPanelFileModifiedMain = $(fm.templates.rightPanelFileModifiedMain);
            var rightPanelFileModifiedByLabel = $(fm.templates.rightPanelFileModifiedByLabel);
            var rightPanelFileModifiedByvalue = $(fm.templates.rightPanelFileModifiedByvalue);
            var horizontalLine = $(fm.templates.horizontalLine);
            var fileDetailsMain = $(fm.templates.fileDetailsMain);
            var fileCommentPanel = $(fm.templates.fileCommentPanel);
            var fileVersionView = $(fm.templates.fileVersionView);
            var fileVersion = $(fm.templates.fileVersion);
            var fileVersionDescription = $(fm.templates.fileVersionDescription);
            var fileVersionEditControls = $(fm.templates.fileVersionEditControls);
            var horizontalLine = $(fm.templates.horizontalLine);
            /*Create layout for showing file's data*/
            rightPanelFileAddedMain.append(rightPanelFileAddedbyLabel);
            rightPanelFileAddedMain.append(rightPanelFileaddedbyValue);
            rightPanelContentArea.append(rightPanelFileAddedMain);
            rightPanelFileModifiedMain.append(rightPanelFileModifiedByLabel);
            rightPanelFileModifiedMain.append(rightPanelFileModifiedByvalue);
            rightPanelContentArea.append(rightPanelFileModifiedMain);
            fileVersionView.append(fileVersion);
            fileVersionView.append(fileVersionDescription);
            fileVersionView.append(fileVersionEditControls);
            fileVersionView.append(horizontalLine);
            /*comment box layout*/
            fileVersionView.append(fileCommentPanel);
            fileDetailsMain.append(fileVersionView);
            rightPanelContentArea.append(fileDetailsMain);
            $("#rightPanelMainId").append(rightPanelContentArea);

            fm.rightPanelNode = selectedItem;
            /*Add file's data on right panel*/
            $("." + fm.style.classes.rightPanelItemViewTitle).html(selectedItem.data.title);
            /*
			File Added By and Modified By
			*/
            var addedBy, modifiedBy;
            /*If Template file on LifecycleDocuments Page*/
            if (isLCTemplate) {
                addedBy = modifiedBy = "Admin"
            }
            else {
                addedBy = selectedItem.metadata.addedBy.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                modifiedBy = selectedItem.metadata.lastModifiedBy.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            }
            $("." + fm.style.classes.rightPanelItemViewAddedValue).html(
				fm.methods.getFormatedDate(selectedItem.metadata.addedDate, false) + " by " + addedBy);
            $("." + fm.style.classes.rightPanelItemViewModifiedValue).html(
				fm.methods.getFormatedDate(selectedItem.metadata.lastModifiedDate, false) + " by " + modifiedBy);

            $("." + fm.style.classes.rigitPanelVersionText).html(selectedItem.metadata.versionComments);
            if (selectedItem.metadata.version == 0) {
                selectedItem.metadata.version = selectedItem.metadata.version + 1;
            }
            var versionsCount = selectedItem.metadata.version;

            var rightPanelVersionsSelects = $("." + fm.style.classes.rightPanelVersionsSelects);
            rightPanelVersionsSelects.html('');
            var selected = (versionsCount == selectedItem.metadata.version) ? "selected" : "";
            /*
			Allow to input comment for latest version only
			*/
            var serviceUrl;
            if ((selectedItem.metadata.isTemplate && fm.options.adminView == "true") || selectedItem.metadata.isTemplate) {
                serviceUrl = fm.ajaxAdminUrl;

            }
            else if (!selectedItem.metadata.isTemplate) {
                serviceUrl = fm.ajaxUrl;
            }

            var allowInput = editable && (selectedItem.metadata.version == selectedItem.metadata.versionCount);
            //var serviceUrl = selectedItem.metadata.isTemplate ? fm.ajaxAdminUrl : fm.ajaxUrl;
            fm.methods.loadingComments(selectedItem.metadata.version, selectedItem.attr.id, allowInput, serviceUrl);
            var isTemplate = selectedItem.metadata.isTemplate;
            var editable = fm.options.adminView ? enableControls && (selectedItem.attr.id != fm.options.rootFolderId) : enableControls && !isTemplate;
            var isToolDoc = selectedItem.metadata.isToolDoc;
            if (isToolDoc) {
                rightPanelVersionsSelects.prop("disabled", "disabled");
            }
            if (isLCTemplate || !editable) {
                rightPanelVersionsSelects.prop("disabled", "disabled");
            }
            /*
			Add the latest version
			*/
            rightPanelVersionsSelects.append("<option " + selected + " value='" + selectedItem.metadata.versionCount + "'>Version " + selectedItem.metadata.versionCount + " (latest)</option>");
            /*
			Add all other versions
			*/
            for (var i = selectedItem.metadata.versionCount - 1; i > 0; i--) {
                selected = (i == selectedItem.metadata.version) ? "selected" : "";
                rightPanelVersionsSelects.append("<option " + selected + " value='" + i + "'>Version " + i + "</option>");
            }

            var previousTitle = $(".right-panel-item-view-tilte").val();

            $(".right-panel-item-view-tilte").keypress(function (event) {
                if (event.which == 13) {
                    event.preventDefault();
                    itemTitle = $(this).val();
                    var senData = {
                        nodeId: selectedItem.attr.id,
                        newNodeName: itemTitle,
                        nodeType: fm.dataContainer[selectedItem.attr.id].metadata.nodeType
                    };
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: fm.serviceUrlRef.renameFile,
                        data: JSON.stringify(senData)
                    }).done(function (responseData) {
                        responseData = responseData.RenameFileResult;

                        var node = $(fm.options.treeID).jstree(true).get_node({
                            id: fm.currentId
                        });
                        $(fm.options.treeID).jstree(true).refresh_node(node);
                        fm.methods.showMiddlePanelData(fm.currentId);
                        var savedName = responseData.data.title;


                        $('.name-for-list').text(function (index, text) {
                            return text.replace(previousTitle, savedName);
                        });
                        var selectedCheckBox = $("input[name=middle-panel-list-checkbox][value=" + responseData.attr.id + "]");

                        // selectedCheckBox.click();
                        selectedCheckBox.click();

                        selectedCheckBox.prop('checked', true);
                        $($(selectedCheckBox).parent()).addClass(fm.style.classes.middlePanelContentListItemActive);
                        fm.dataContainer[responseData.attr.id] = responseData;

                        fm.methods.updateMiddleHeaderMenu();

                        var items = [];
                        var restoreArray = [];


                        /*extra logic*/
                        for (var vInd = responseData.metadata.versionCount; vInd >= 1; vInd--) {
                            (function (index) {
                                // For Download
                                var tempObj = new Object();
                                tempObj.label = 'version ' + index;
                                /*temp  object*/
                                tempObj.action = function () {
                                    fm.methods.middlePanelDownloadFile(fm.dataContainer[fm.selectedItems], index);
                                };
                                /* To show the selected version in RHS as highlighted in the download button ddm in Middle Panel*/
                                if (index == responseData.metadata.versionCount) {
                                    tempObj.highlightClass = 'selected-menu';
                                }
                                /*End of temp object */
                                items.push(tempObj);
                                // For Restore 
                                if (index != responseData.metadata.versionCount) {
                                    var tempRes = new Object();
                                    tempRes.label = 'version ' + index;
                                    tempRes.action = function () {
                                        fm.methods.middlePanelRestoreFile(fm.dataContainer[fm.selectedItems], index);
                                    };
                                    restoreArray.push(tempRes);
                                }
                                /*end of restore*/
                            })(vInd);

                            /*end of the function(index)*/
                        }
                        /*End of for loop*/

                        $('#restore-file').contextPopup({
                            items: restoreArray
                        });
                        $('#download-file').contextPopup({
                            items: items
                        });


                        fm.methods.updateRightPanel(fm.dataContainer[responseData.attr.id]);

                    })
.fail(function (error) {
    fm.methods.displayFlashMsg(fm.messages.renameError, "");
});
                }
            });

            var prevTitle;
            $('.right-panel-title-edit').click(function () {
                $(".right-panel-item-view-tilte").prop("disabled", false).focus();
                $(this).hide();
                $(this).after("<div class='title-msg'>Appuyer sur la touche Enter pour sauvegarder</div>");
                prevTitle = $(".right-panel-item-view-tilte").val();
            });

            $(".right-panel-item-view-tilte").focusout(function () {
                $('.right-panel-title-edit').css({ 'display': 'inline' });
                $(".title-msg").remove();
                $(".right-panel-item-view-tilte").prop("disabled", true);
                $(this).val(prevTitle);
            })


            $(".right-panel-item-view-tilte").focusout(function () {

                $(".title-msg").remove();
            })
            $('.right-panel-version-select-item').change(function () {
                var versionValue = $("." + fm.style.classes.rightPanelVersionsSelects).val();
                var serviceUrl;
                if ((selectedItem.metadata.isTemplate && fm.options.adminView == "true") || selectedItem.metadata.isTemplate) {
                    serviceUrl = fm.ajaxAdminUrl;
                }
                else if (!selectedItem.metadata.isTemplate) {
                    serviceUrl = fm.ajaxUrl;
                }
                $.ajax({
                    type: "GET",
                    cache: false,
                    dataType: "json",
                    url: serviceUrl.getFileVersion,
                    data: {
                        "nodeId": fm.rightPanelNode.attr.id,
                        "version": versionValue,
                        "trackerId": fm.options.trackerId
                    }
                })
						.done(function (data) {
						    data = data.GetVersionInfoResult;
						    if (data.version.indexOf(".") != -1) {
						        data.version = data.version.slice(0, data.version.indexOf('.'));
						    }
						    /*
							Load selected version's comments
							*/
						    var allowInput = editable && (data.version == selectedItem.metadata.versionCount);
						    fm.methods.loadingComments(data.version, fm.rightPanelNode.attr.id, allowInput, serviceUrl);
						    /*Update Added Date, Added By and Modified by, Modified Date of selected version*/
						    $("." + fm.style.classes.rightPanelItemViewAddedValue).html(fm.methods.getFormatedDate(data.addedDate, false) + " by " + data.addedBy);
						    $("." + fm.style.classes.rightPanelItemViewModifiedValue).html(fm.methods.getFormatedDate(data.lastModifiedDate, false) + " by " + data.lastModifiedBy);
						    $("." + fm.style.classes.rigitPanelVersionText).html(data.versionComments);
						    /*
							Recreate the versions ddm for download action to show the seletect version as highlighted
							*/
						    var items = [];
						    for (var vInd = data.versionCount; vInd >= 1; vInd--) {
						        (function (index) {
						            var tempObj = new Object();
						            tempObj.label = 'version ' + index;
						            if (vInd == data.version) {
						                tempObj.highlightClass = 'selected-menu';
						            }
						            /*temp  object*/
						            tempObj.action = function () {
						                fm.methods.middlePanelDownloadFile(fm.dataContainer[fm.selectedItems], index);
						            };
						            /*End of temp object */
						            items.push(tempObj);
						        })(vInd);
						    }
						    $('#download-file').contextPopup({
						        items: items
						    });
						})
						.fail(function (error) {
						    fm.methods.error("changeVersion.fail", error);
						});
            });
        },
        /*when the folder is selcted on middle panel, then create the layout and add correspong data*/
        onFolderSelect: function (selectedItem, editable, isLCTemplate) {
            /*if thereis already layout which was created during previous selection of node then remove it and recreate it*/
            if ($("#rightPanelMainId").children().length) {
                $("#rightPanelMainId").html('');
            }
            var rightPanelFileAddedMain = $(fm.templates.rightPanelFileAddedMain);
            var rightPanelFileAddedbyLabel = $(fm.templates.rightPanelFileAddedbyLabel);
            var rightPanelFileaddedbyValue = $(fm.templates.rightPanelFileaddedbyValue);
            var rightPanelContentArea = $(fm.templates.rightPanelContentArea);
            rightPanelContentArea.css("display", "block");
            var rightPanelItemHeader = $(fm.templates.rightPanelItemHeader);
            var rightpanelItemTitle = $(fm.templates.rightpanelItemTitle);
            var addDescription = $("." + fm.style.classes.rightPanelItemViewAddDescription);

            /*user who moddified teh file*/
            var rightPanelFileModifiedMain = $(fm.templates.rightPanelFileModifiedMain);
            var rightPanelFileModifiedByLabel = $(fm.templates.rightPanelFileModifiedByLabel);
            var rightPanelFileModifiedByvalue = $(fm.templates.rightPanelFileModifiedByvalue);
            /*file description area in right panel*/
            var rightPanelDescriptionMain = $(fm.templates.rightPanelDescriptionMain);
            var rightPanelDescriptionLabel = $(fm.templates.rightPanelDescriptionLabel);
            var rightPanelDescriptionTextbox = $(fm.templates.rightPanelDescriptionTextbox);
            /*description save ,cancel button*/
            var descriptionSaveCancelMain = $(fm.templates.descriptionSaveCancelMain);
            /*save button*/
            var descriptionSaveButton = $(fm.templates.descriptionSaveButton);
            var descriptionCancelButton = $(fm.templates.descriptionCancelButton);

            var rightPanelChildItemCount = $(fm.templates.rightPanelChildItemCount);
            var horizontalLine = $(fm.templates.horizontalLine);
            rightPanelItemHeader.append(rightpanelItemTitle);

            rightPanelItemHeader.append(rightPanelChildItemCount);
            rightPanelContentArea.append(rightPanelItemHeader);
            rightPanelFileAddedMain.append(rightPanelFileAddedbyLabel);
            rightPanelFileAddedMain.append(rightPanelFileaddedbyValue);
            rightPanelContentArea.append(rightPanelFileAddedMain);
            rightPanelFileModifiedMain.append(rightPanelFileModifiedByLabel);
            rightPanelFileModifiedMain.append(rightPanelFileModifiedByvalue);
            rightPanelContentArea.append(rightPanelFileModifiedMain);
            /*folder description*/
            rightPanelDescriptionMain.append(rightPanelDescriptionLabel);
            rightPanelDescriptionMain.append(rightPanelDescriptionTextbox);
            rightPanelContentArea.append(rightPanelDescriptionMain);

            if (editable) {
                descriptionSaveCancelMain.append(descriptionSaveButton);
                descriptionSaveCancelMain.append(descriptionCancelButton);
                rightPanelContentArea.append(descriptionSaveCancelMain);
            }
            /*
			*End of folder description
			*/

            $("#rightPanelMainId").append(rightPanelContentArea);
            fm.rightPanelNode = selectedItem;
            $("." + fm.style.classes.rightPanelItemViewTitle).html(selectedItem.data.title);
            /*
			Folder Added By and Modified By
			*/
            var addedBy, modifiedBy;
            /*If Template folder on LifecycleDocuments Page*/
            if (isLCTemplate) {
                addedBy = modifiedBy = "Admin"
            }
            else {
                addedBy = selectedItem.metadata.addedBy;
                modifiedBy = selectedItem.metadata.lastModifiedBy;
            }
            $("." + fm.style.classes.rightPanelItemViewAddedValue).html(
				fm.methods.getFormatedDate(selectedItem.metadata.addedDate, false) + " by " + addedBy);
            $("." + fm.style.classes.rightPanelItemViewModifiedValue).html(
				fm.methods.getFormatedDate(selectedItem.metadata.lastModifiedDate, false) + " by " + modifiedBy);

            var fileDetailsMain = $(fm.templates.fileDetailsMain);
            var fileCommentPanel = $(fm.templates.fileCommentPanel);
            var addDescription = $("." + fm.style.classes.rightPanelItemViewAddDescription);
            /*
			Folder content count
			*/
            /*if undefined*/
            if (fm.childrenContainer[selectedItem.attr.id] == undefined) {
                var cNode = $(fm.options.treeID).jstree(true).get_node({
                    id: selectedItem.attr.id
                });
                $(fm.options.treeID).jstree(true).load_node(cNode, function () {
                    var currentNodeChildren = fm.childrenContainer[selectedItem.attr.id] ? fm.childrenContainer[selectedItem.attr.id] : [];
                    var folder = 0,
										file = 0,
										url = 0;
                    for (var i = 0; i < currentNodeChildren.length; i++) {
                        switch (currentNodeChildren[i].metadata.nodeType) {
                            case 'file':
                                file++;
                                break;
                            case 'folder':
                                folder++;
                                break;
                            case 'url':
                                url++;
                                break;
                        }
                    }
                    $(".right-panel-item-view-itemsCount").html(folder + " dossiers, " + file + " fichiers, " + url + " Url.");
                });
            }
                /*if not undefined*/
            else {
                var currentNodeChildren = fm.childrenContainer[selectedItem.attr.id];
                var folder = 0,
									file = 0,
									url = 0;
                for (var i = 0; i < currentNodeChildren.length; i++) {
                    switch (currentNodeChildren[i].metadata.nodeType) {
                        case 'file':
                            file++;
                            break;
                        case 'folder':
                            folder++;
                            break;
                        case 'url':
                            url++;
                            break;
                    }
                }
                $(".right-panel-item-view-itemsCount").html(folder + " folders, " + file + " files, " + url + " urls.");
            }
            /*
			If Folder description is not empty then show
			*/
            if (selectedItem.metadata.description != "") {
                addDescription.val(selectedItem.metadata.description);
                if (!editable) {
                    addDescription.attr('readonly', 'readonly');
                }
            }
                /*
				Hide description if:
				1. User does not have edit rights to add/edit description
				or
				2. Page is 'Document Explorer' and Folder is a Template Folder
				*/
            else if (!editable) {
                fm.methods.hideDescription();
            }
            else {
                addDescription.val("");
            }

            $("." + fm.style.classes.rightPanelItemViewAddDescription).click(function () {
                if (!editable)
                    return false;
                $("." + fm.style.classes.rightPanelDescriptionEditingButtons).show();
                $("#commentsContainer").css({ 'height': '261px' });
            });

            /*when you click on save button of description box do the following action*/
            $("#" + fm.style.ids.updateDescriptionDone).click(function () {
                var newDesc = $("." + fm.style.classes.rightPanelItemViewAddDescription).val();
                if (newDesc == fm.constants.addDescription || newDesc == fm.rightPanelNode.metadata.description)
                    return;

                var objToSend = {
                    'nodeId': fm.rightPanelNode.attr.id,
                    newNodeDescription: newDesc
                };

                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: fm.serviceUrlRef.updateDescription,
                    data: JSON.stringify(objToSend)
                })
						.done(function () {
						    fm.rightPanelNode.metadata.description = newDesc;
						    $("." + fm.style.classes.rightPanelDescriptionEditingButtons).hide();
						    $("#commentsContainer").css({ 'height': '285px' });
						})
						.fail(function (error) {
						    fm.methods.displayFlashMsg(fm.messages.folderDescriptionUpdateError, "errorFlash");
						});
            });
            /*
			*Function when click event occur on cancel button of folder descrption
			*/
            $("#" + fm.style.ids.updateDescriptionCancel).click(function () {
                if (fm.rightPanelNode.metadata.description == "") {
                    addDescription.val(fm.constants.addDescription);
                } else {
                    addDescription.val(fm.rightPanelNode.metadata.description);
                }
                $("." + fm.style.classes.rightPanelDescriptionEditingButtons).hide();
                $("#commentsContainer").css({ 'height': '285px' });
            });
            /* show placeholder for IE8. */
            $('[placeholder]').focus(function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function () {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur();
        },
        /*When the url is selected on  middle panel, then create the layout on right panel and add corresponding data*/
        onUrlSelect: function (selectedItem, editable, isLCTemplate) {
            /*if thereis already layout which was created during previous selection of node then remove it and recreate it*/
            if ($("#rightPanelMainId").children().length) {
                $("#rightPanelMainId").html('');
            }
            var rightPanelFileAddedMain = $(fm.templates.rightPanelFileAddedMain);
            var rightPanelFileAddedbyLabel = $(fm.templates.rightPanelFileAddedbyLabel);
            var rightPanelFileaddedbyValue = $(fm.templates.rightPanelFileaddedbyValue);
            var rightPanelContentArea = $(fm.templates.rightPanelContentArea);
            rightPanelContentArea.css("display", "block");
            var rightPanelItemHeader = $(fm.templates.rightPanelItemHeader);
            var rightpanelItemTitle = $(fm.templates.rightpanelItemTitle);
            var addDescription = $("." + fm.style.classes.rightPanelItemViewAddDescription);
            rightPanelItemHeader.append(rightpanelItemTitle);
            rightPanelContentArea.append(rightPanelItemHeader);
            var horizontalLine = $(fm.templates.horizontalLine);
            rightPanelFileAddedMain.append(rightPanelFileAddedbyLabel);
            rightPanelFileAddedMain.append(rightPanelFileaddedbyValue);
            rightPanelContentArea.append(rightPanelFileAddedMain);

            $("#rightPanelMainId").append(rightPanelContentArea);
            fm.rightPanelNode = selectedItem;

            /*Add the title of teh url and */
            $("." + fm.style.classes.rightPanelItemViewTitle).html(selectedItem.data.title);
            /*
			URL Added By
			*/
            var addedBy;
            /*If Template folder on LifecycleDocuments Page*/
            if (isLCTemplate) {
                addedBy = "Admin"
            } else {
                addedBy = selectedItem.metadata.addedBy;
            }
            $("." + fm.style.classes.rightPanelItemViewAddedValue).html(
				fm.methods.getFormatedDate(selectedItem.metadata.addedDate, false) + " by " + addedBy);

            var fileDetailsMain = $(fm.templates.fileDetailsMain);
            var fileCommentPanel = $(fm.templates.fileCommentPanel);
            $(".right-panel-item-view-itemsCount").html('');
            fileDetailsMain.append(fileCommentPanel);
            $(".right-panel-item-view").append(fileDetailsMain);
            var serviceUrl = selectedItem.metadata.isTemplate ? fm.ajaxAdminUrl : fm.ajaxUrl;
            fm.methods.loadingComments('', selectedItem.attr.id, editable, serviceUrl);
        },
        /*if the file is locked*/
        onFileLockedOut: function (selectedItem) {
            /*if thereis already layout which was created during previous selection of node then remove it and recreate it*/
            if ($("#rightPanelMainId").children().length) {
                $("#rightPanelMainId").html('');
            }
            var rightPanelFileLockMain = $(fm.templates.rightPanelFileLockMain);
            var rightPanelFileLockedbyLabel = $(fm.templates.rightPanelFileLockedbyLabel);
            var rightPanelFileLockedbyName = $(fm.templates.rightPanelFileLockedbyName);

            var rightPanelFileAddedMain = $(fm.templates.rightPanelFileAddedMain);
            var rightPanelFileAddedbyLabel = $(fm.templates.rightPanelFileAddedbyLabel);
            var rightPanelFileaddedbyValue = $(fm.templates.rightPanelFileaddedbyValue);

            /*user who moddified teh file*/
            var rightPanelFileModifiedMain = $(fm.templates.rightPanelFileModifiedMain);
            var rightPanelFileModifiedByLabel = $(fm.templates.rightPanelFileModifiedByLabel);
            var rightPanelFileModifiedByvalue = $(fm.templates.rightPanelFileModifiedByvalue);

            var rightPanelContentArea = $(fm.templates.rightPanelContentArea);
            rightPanelContentArea.css("display", "block");
            var rightPanelItemHeader = $(fm.templates.rightPanelItemHeader);
            var rightpanelItemTitle = $(fm.templates.rightpanelItemTitle);
            rightPanelItemHeader.append(rightpanelItemTitle);
            rightPanelContentArea.append(rightPanelItemHeader);
            var horizontalLine = $(fm.templates.horizontalLine);
            var fileDetailsMain = $(fm.templates.fileDetailsMain);
            var fileCommentPanel = $(fm.templates.fileCommentPanel);
            var fileVersionView = $(fm.templates.fileVersionView);
            var fileVersion = $(fm.templates.fileVersion);
            var fileVersionDescription = $(fm.templates.fileVersionDescription);
            var fileVersionEditControls = $(fm.templates.fileVersionEditControls);

            rightPanelFileLockMain.append(rightPanelFileLockedbyLabel);
            rightPanelFileLockMain.append(rightPanelFileLockedbyName);
            if (selectedItem.metadata.locked.numberOfDays > 0) {
                rightPanelFileLockMain.append(" <span style='color:red;'>" + selectedItem.metadata.locked.numberOfDays + "</span> days ago");
            }
            else if (selectedItem.metadata.locked.numberOfDays == 0) {
                rightPanelFileLockMain.append("  <span style='color:red;'> today</span>");
            }

            rightPanelFileAddedMain.append(rightPanelFileAddedbyLabel);
            rightPanelFileAddedMain.append(rightPanelFileaddedbyValue);

            rightPanelFileModifiedMain.append(rightPanelFileModifiedByLabel);
            rightPanelFileModifiedMain.append(rightPanelFileModifiedByvalue);


            fileVersionView.append(fileVersion);
            fileVersionView.append(fileVersionDescription);
            fileVersionView.append(fileVersionEditControls);
            fileVersionView.append(horizontalLine);
            /*comment box layout*/
            fileVersionView.append(fileCommentPanel);
            fileDetailsMain.append(fileVersionView);


            rightPanelContentArea.append(rightPanelFileLockMain);
            rightPanelContentArea.append(rightPanelFileAddedMain);
            rightPanelContentArea.append(rightPanelFileModifiedMain);

            rightPanelContentArea.append(fileDetailsMain);

            $("#rightPanelMainId").append(rightPanelContentArea);
            fm.rightPanelNode = selectedItem;
            rightPanelFileLockedbyName.html(selectedItem.metadata.locked.lockedBy);

            $("." + fm.style.classes.rightPanelItemViewTitle).html(selectedItem.data.title);
            $("." + fm.style.classes.rightPanelItemViewAddedValue).html(
					fm.methods.getFormatedDate(selectedItem.metadata.addedDate, false) + " by " + selectedItem.metadata.addedBy);
            $("." + fm.style.classes.rightPanelItemViewModifiedValue).html(
					fm.methods.getFormatedDate(selectedItem.metadata.lastModifiedDate, false) + " by " + selectedItem.metadata.lastModifiedBy);


            $("." + fm.style.classes.rigitPanelVersionText).html(selectedItem.metadata.versionComments);
            if (selectedItem.metadata.version == 0) {
                selectedItem.metadata.version = selectedItem.metadata.version + 1;
            }
            var versionsCount = selectedItem.metadata.version;

            var rightPanelVersionsSelects = $("." + fm.style.classes.rightPanelVersionsSelects);
            rightPanelVersionsSelects.html('');
            var selected = (versionsCount == selectedItem.metadata.version) ? "selected" : "";
            /*
			Allow to input comment for latest version only
			*/
            var allowInput = ((fm.options.adminView) && (selectedItem.metadata.version == selectedItem.metadata.versionCount) || ((!selectedItem.metadata.isTemplate) && (selectedItem.metadata.version == selectedItem.metadata.versionCount))) ? true : false;
            var serviceUrl = selectedItem.metadata.isTemplate ? fm.ajaxAdminUrl : fm.ajaxUrl;
            fm.methods.loadingComments(selectedItem.metadata.version, selectedItem.attr.id, allowInput, serviceUrl);
            /*
			Add the latest version
			*/
            rightPanelVersionsSelects.append("<option " + selected + " value='" + selectedItem.metadata.versionCount + "'>Version " + selectedItem.metadata.versionCount + " (latest)</option>");
            /*
			Add all other versions
			*/
            for (var i = selectedItem.metadata.versionCount - 1; i > 0; i--) {
                selected = (i == selectedItem.metadata.version) ? "selected" : "";
                rightPanelVersionsSelects.append("<option " + selected + " value='" + i + "'>Version " + i + "</option>");
            }
            $('.right-panel-version-select-item').change(function () {
                var versionValue = $("." + fm.style.classes.rightPanelVersionsSelects).val();
                var serviceUrl;
                if ((selectedItem.metadata.isTemplate && fm.options.adminView == "true") || selectedItem.metadata.isTemplate) {
                    serviceUrl = fm.ajaxAdminUrl;

                }
                else if (!selectedItem.metadata.isTemplate) {
                    serviceUrl = fm.ajaxUrl;
                }
                $.ajax({
                    type: "GET",
                    cache: false,
                    dataType: "json",
                    url: serviceUrl.getFileVersion,
                    data: {
                        "nodeId": fm.rightPanelNode.attr.id,
                        "version": versionValue,
                        "trackerId": fm.options.trackerId
                    }
                })
						.done(function (data) {
						    data = data.GetVersionInfoResult;
						    if (data.version.indexOf(".") != -1) {
						        data.version = data.version.slice(0, data.version.indexOf('.'));
						    }
						    /*
							Load selected version's comments
							*/
						    var allowInput = ((fm.options.adminView) && (data.version == selectedItem.metadata.versionCount) || ((!data.isTemplate) && (data.version == selectedItem.metadata.versionCount))) ? true : false;
						    var allowInput = (data.version == selectedItem.metadata.versionCount);
						    fm.methods.loadingComments(data.version, fm.rightPanelNode.attr.id, allowInput, serviceUrl);
						    /*Update Added Date, Added By and Modified by, Modified Date of selected version*/
						    $("." + fm.style.classes.rightPanelItemViewAddedValue).html(fm.methods.getFormatedDate(data.addedDate, false) + " by " + data.addedBy);
						    $("." + fm.style.classes.rightPanelItemViewModifiedValue).html(fm.methods.getFormatedDate(data.lastModifiedDate, false) + " by " + data.lastModifiedBy);
						    $("." + fm.style.classes.rigitPanelVersionText).html(data.versionComments);
						    /*
							Recreate the versions ddm for download action to show the seletect version as highlighted
							*/
						    var items = [];
						    for (var vInd = data.versionCount; vInd >= 1; vInd--) {
						        (function (index) {
						            var tempObj = new Object();
						            tempObj.label = 'version ' + index;
						            if (vInd == data.version) {
						                tempObj.highlightClass = 'selected-menu';
						            }
						            /*temp  object*/
						            tempObj.action = function () {
						                fm.methods.middlePanelDownloadFile(fm.dataContainer[fm.selectedItems], index);
						            };
						            /*End of temp object */
						            items.push(tempObj);
						        })(vInd);
						    }
						    $('#download-file').contextPopup({
						        items: items
						    });
						})
						.fail(function (error) {
						    fm.methods.error("changeVersion.fail", error);
						});
            });
        },
        updateRightPanel: function (selectedItem) {
            /*This logic has to be modified. When there is no item is selected in middle panel we need to show 'select item on middle panel'*/
            if ($(".right-panel-file-view").length) {
                $(".right-panel-file-view").html('');
            }
            if (selectedItem == undefined) {
                return;
            }
            else {
                /*
				Item is editable if on Admin Templates page enableControls is true
				or
				For LifecycleDocuments Page enableComtrols is true and selected item is a not a Template item
				*/
                var editable = fm.options.adminView ? enableControls : enableControls && !selectedItem.metadata.isTemplate;
                /*
				Is the selected item of type 'Template' on LifeccyleDocuments Page
				*/
                var isLCTemplate = !(fm.options.adminView) && selectedItem.metadata.isTemplate

                if (selectedItem.metadata.locked.lockState && !isLCTemplate) {
                    fm.methods.onFileLockedOut(selectedItem);
                }
                    /*Whenever the selected item is fodler type on middle panel then do the follwoing actions*/
                else if (selectedItem.metadata.nodeType == "folder") {
                    fm.methods.onFolderSelect(selectedItem, editable, isLCTemplate);
                }
                    /*Whenever the selected item is file type on middle panel then do the follwoing actions*/
                else if (selectedItem.metadata.nodeType == "file") {
                    if (selectedItem.metadata.isToolDoc) {
                        editable = false;
                        fm.methods.onFileSelect(selectedItem, editable, isLCTemplate);
                    } else {
                        fm.methods.onFileSelect(selectedItem, editable, isLCTemplate);
                    }
                }
                    /*Whenever the selected item is Url type on middle panel then do the follwoing actions*/
                else if (selectedItem.metadata.nodeType == "url") {
                    fm.methods.onUrlSelect(selectedItem, editable, isLCTemplate)
                }
            }
        },
        hideDescription: function () {
            $("." + fm.style.classes.rightPanelItemViewAddDescription).css("display", "none");
            $("." + fm.style.classes.rightPanelDescriptionEditingButtons).css("display", "none");
        },
        createUploadNewVersionPopUp: function (dataToUpload, data) {
            if ($uploadNewDialog.length > 0) {
                $uploadNewDialog.children().remove();
                $uploadNewDialog.remove();
            }
            $uploadNewDialog = $("<div style='z-index:999 !important' id='" + "upload-new-version-popup" + "' title='" + "Upload new version" + "' />");
            var html = "<div style='z-index:999 !important;width:435px; height:150px' class='xp-FloatLeft xp-Overflowhidden'><table border=0 width=100% cellspacing=0 cellpadding=6><tbody>";
            html += "<tr><td>Filename</td><td><input type='text' id='upload-new-version-popup-file-name' style='margin: 0 28px;  width: 297px;height: 22px;'></td>";
            html += "<tr><td>Comment</td><td><textarea id='upload-new-version-popup-file-comment' style='margin: 0 29px;  width: 297px;height: 68px;'></textarea></td></tr>";
            html += "<tr><td colspan='2'><div id='progress' class='progress progress-popup'><div class='progress-bar progress-bar-success'></div></div></td></tr>";
            html += "</tbody></table><span class='CommnetBox' id='UploadNewVersionCommnetBox'>This field is required.</span>";
            html += "</div>";

            $uploadNewDialog.html(html);
            $uploadNewDialog.css('z-index', '999');
            $("body").append($uploadNewDialog);
            $uploadNewDialog.dialog
			({
			    autoOpen: true,
			    dialogClass: "upload-new-dialog",
			    width: 450,
			    bgiframe: false,
			    modal: true,
			    buttons: [
				{
				    text: 'Upload',
				    id: 'primarybutton',
				    click: function () {
				        var name = $("#upload-new-version-popup-file-name").val();
				        var comment = $("#upload-new-version-popup-file-comment").val();
				        dataToUpload.name = name;
				        dataToUpload.versionComments = comment;
				        /*Version comment should not empty*/
				        $("#upload-new-version-popup-file-comment").keydown(function () {
				            $("#UploadNewVersionCommnetBox").css("display", "none");
				        });
				        if ($.trim(comment) == '') {
				            $("#UploadNewVersionCommnetBox").css("display", "block");
				            $("#upload-new-version-popup-file-comment").focus();
				        } else {
				            data.submit();
				            $(this).dialog('close');
				        }
				    }
				},
						{
						    text: 'Annuler',
						    id: 'secondarybutton',
						    click: function () {
						        $(this).dialog('close');
						    }
						}
			    ]
			});

        }, //upload new version popup ends
        createRestorePopUp: function (file, version) {
            if ($restoreDialog.length > 0) {
                $restoreDialog.children().remove();
                $restoreDialog.remove();
            }
            $restoreDialog = $("<div style='z-index:999 !important' id='" + "restore-file-popup" + "' title='" + "Restore previous version" + "' />");
            var html = "<div style='z-index:999 !important;width:430px; height:147px;' class='xp-FloatLeft xp-Overflowhidden'><table border=0 width=100% cellspacing=0 cellpadding=6><tbody>";
            html += "<tr><td colspan='2' height='40px'><p>This version will be now restored as the latest version of this document.</p></td>";
            html += "<tr style='top: 59px !important; position:absolute;'><td colspan='2'><textarea id='" + fm.style.ids.restoreVersionPopupFileComment + "' style='width: 399px; height: 65px;'></textarea></td></tr>";
            html += "</tbody></table><span class='CommnetBox' id='RestoreCommnetBox'>This field is required.</span></div>";
            $restoreDialog.html(html);
            $restoreDialog.css('z-index', '999');
            $("body").append($restoreDialog);
            $restoreDialog.dialog
			({
			    autoOpen: true,
			    dialogClass: "restore-dialog",
			    width: 450,
			    bgiframe: false,
			    modal: true,
			    buttons: [
				{
				    text: 'Restaurer',
				    id: 'primarybutton',
				    click: function () {
				        var commentBox = $("#" + fm.style.ids.restoreVersionPopupFileComment);
				        var comment = commentBox.val();
				        /*Version comment should not empty*/
				        commentBox.keydown(function () {
				            $("#RestoreCommnetBox").css("display", "none");
				        });
				        if ($.trim(comment) == '') {
				            $("#RestoreCommnetBox").css("display", "block");
				            commentBox.focus();
				        } else {
				            var restoreObj = new Object();
				            restoreObj.comment = comment;
				            restoreObj.nodeId = file.attr.id;
				            restoreObj.version = version;

				            $.ajax({
				                type: "POST",
				                contentType: "application/json; charset=utf-8",
				                dataType: "json",
				                url: fm.serviceUrlRef.restoreAsLatestVersion,
				                data: JSON.stringify(restoreObj)
				            }).done(function (responseData) {
				                responseData = responseData.RestoreResult;

				                var node = $(fm.options.treeID).jstree(true).get_node({
				                    id: fm.currentId
				                });
				                $(fm.options.treeID).jstree(true).refresh_node(node);
				                fm.methods.showMiddlePanelData(fm.currentId);
				                var selectedCheckBox = $("input[name=middle-panel-list-checkbox][value=" + responseData.attr.id + "]");

				                // selectedCheckBox.click();
				                selectedCheckBox.click();

				                selectedCheckBox.prop('checked', true);
				                $($(selectedCheckBox).parent()).addClass(fm.style.classes.middlePanelContentListItemActive);
				                fm.dataContainer[responseData.attr.id] = responseData;


				                fm.methods.updateMiddleHeaderMenu();

				                var items = [];
				                var restoreArray = [];


				                /*extra logic*/
				                for (var vInd = responseData.metadata.versionCount; vInd >= 1; vInd--) {
				                    (function (index) {
				                        // For Download
				                        var tempObj = new Object();
				                        tempObj.label = 'version ' + index;
				                        /*temp  object*/
				                        tempObj.action = function () {
				                            fm.methods.middlePanelDownloadFile(fm.dataContainer[fm.selectedItems], index);
				                        };
				                        /* To show the selected version in RHS as highlighted in the download button ddm in Middle Panel*/
				                        if (index == responseData.metadata.versionCount) {
				                            tempObj.highlightClass = 'selected-menu';
				                        }
				                        /*End of temp object */
				                        items.push(tempObj);
				                        // For Restore 
				                        if (index != responseData.metadata.versionCount) {
				                            var tempRes = new Object();
				                            tempRes.label = 'version ' + index;
				                            tempRes.action = function () {
				                                fm.methods.middlePanelRestoreFile(fm.dataContainer[fm.selectedItems], index);
				                            };
				                            restoreArray.push(tempRes);
				                        }
				                        /*end of restore*/
				                    })(vInd);

				                    /*end of the function(index)*/
				                }
				                /*End of for loop*/

				                $('#restore-file').contextPopup({
				                    items: restoreArray
				                });
				                $('#download-file').contextPopup({
				                    items: items
				                });


				                fm.methods.updateRightPanel(responseData);
				            }).fail(function (error_obj) {
				                fm.methods.displayFlashMsg(fm.messages.restoreAsLatestVersionError, "");
				            });
				            $(this).dialog('close');
				        }
				    }
				},
						{
						    text: 'Annuler',
						    id: 'secondarybutton',
						    click: function () {
						        $(this).dialog('close');
						    }
						}
			    ]
			});

        }, //restore popup ends
        createDeletePopUp: function (nodeID, refreshNode, title) {
            if ($deleteDialog.length > 0) {
                $deleteDialog.children().remove();
                $deleteDialog.remove();
            }
            /*
			Set the dialog box 'title' and 'message' based on what is selected for delete
			*/
            var deleteMessage = "Tous les dossiers et fichiers associés à ce dossier seront supprimés définitivement ainsi que ce dossier et ne pourront pas être restaurés. Êtes-vous sûr de vouloir les supprimer ?";
            title = "Supprimer: " + title;
            if (nodeID.length > 1) {
                deleteMessage = "The selected item(s) and all associated content/history will be deleted permanently and cannot be recovered."
                title = "Delete Items";
            }
            /*
			Create the dialog box
			*/
            $deleteDialog = $("<div style='z-index:999 !important' id='" + "remove-folders-insure-dialog" + "' title='" + title + "' />");
            var html = "<div style='z-index:999 !important margin-top: -23px;' class='xp-FloatLeft xp-Overflowhidden xp-Height-60'><table border=0 width=100% cellspacing=0 cellpadding=6><tbody>";
            html += "<tr><td height='40px'><p>" + deleteMessage + "</p></td>";
            html += "</tbody></table></div>";
            $deleteDialog.html(html);
            $deleteDialog.css('z-index', '999');
            $("body").append($deleteDialog);
            $deleteDialog.dialog
			({
			    autoOpen: false,
			    dialogClass: "delete-dialog",
			    width: 450,
			    bgiframe: false,
			    modal: true,
			    buttons: [

				{
				    text: 'Annuler',
				    id: 'secondarybutton',
				    class: 'cancelButton',
				    click: function () {
				        $(this).dialog('close');
				    }
				},
				{
				    text: 'Supprimer',
				    id: 'primarybutton',
				    class: 'xpThemeButton',
				    click: function () {
				        fm.methods.deleteNodeFromServer(nodeID, refreshNode);
				    }
				}

			    ]
			});

        }, //delete popup ends
        createDownloadPopUp: function (file, version) {
            if ($downloadDialog.length > 0) {
                $downloadDialog.children().remove();
                $downloadDialog.remove();
            }
            $downloadDialog = $("<div style='z-index:999 !important; min-height:auto !important;' id='" + "download-file-popup" + "' />");
            var html = "<div><b> What do you want to do with this document?</b></div>";
            $downloadDialog.html(html);

            var tooltip = "<div class='tooltipInfo'><i class='fa fa-info-circle xp-InfoIcon'></i> <span class='tooltiptextInfo'><i class='fa fa-angle-double-right xpInfoIcon' ></i> <li class='xpInfo'>Locking the file maintains one master version </li> <i class='fa fa-angle-double-right xpInfoIcon' ></i> <li class='xpInfo'>Only lock the file if you are editing it </li> <i class='fa fa-angle-double-right xpInfoIcon' ></i> <li class='xpInfo'>If the file is locked by another user and you need to edit it, wait or contact the user who locked this file to prevent losing data </li> <i class='fa fa-angle-double-right xpInfoIcon' ></i> <li class='xpInfo'>You can use the file comments section on the right hand side to notify the user that you need access.</li></span></div>";
            $downloadDialog.append(tooltip);
            $downloadDialog.css('z-index', '999');
            $("body").append($downloadDialog);
            $downloadDialog.dialog
			({
			    autoOpen: true,
			    dialogClass: "download-dialog",
			    width: 450,
			    bgiframe: false,
			    modal: true,
			    buttons: [
				{
				    text: 'Télécharger',
				    id: 'onlyDownloadFile',
				    click: function () {
				        if (file.length == undefined || file.length == 1)
				            fm.methods.clickOnlyDownloadFile(file, version);
				        else {
				            for (var selCounter = 0; selCounter < file.length; selCounter++) {
				                (function (item) {
				                    /*check whether the browser has blocked pop up or not. If pop up is blocked 
									the alert the user to unblock pop up,else download files*/
				                    var isPopupBlocked = window.open(fm.dataContainer[fm.selectedItems[item]].metadata.url);
				                    if (!isPopupBlocked || isPopupBlocked.closed || typeof isPopupBlocked.closed == 'undefined') {
				                        alert("your browser is blocking pop up.Please unblock pop up and continue downloading!!");
				                    }
				                })(selCounter);
				            }
				        }
				        $(this).dialog('close');
				    }
				},
						{
						    text: 'Download and Lock',
						    id: 'downloadFileAndLock',
						    click: function () {
						        /*
								Check if multiple files are selected or single
								*/
						        var fileIds = [];
						        if (file.length == undefined) {
						            fileIds.push(file.attr.id);
						        }
						        else {
						            fileIds = file;
						        }
						        for (var count = 0; count < fileIds.length; count++) {
						            fm.methods.clickDownloadFileAndLock(fileIds[count]);
						            var checkbox = $("input[name=middle-panel-list-checkbox][value=" + fileIds[count] + "]");
						            checkbox.prop("checked", true);
						        }
						        $(this).dialog('close');
						    }
						}
			    ]
			});

        },
        /*custom method to download MS files*/
        downloadMSFiles: function (file, version) {
            /*load an applictaion page in which its code behind will take file metadata such as node id, trackerId, version of the file 
            get the SPFile object.Stream the binary stream and use it to open xml*/

            var sourceDocument;

            if (file.metadata.url.indexOf("LifecycleTemplates") >= 0) {
                sourceDocument = 'Lists/LifecycleTemplates';
            }

            else if (file.metadata.url.indexOf("LifecycleDocuments") >= 0) {
                sourceDocument = 'LifecycleDocuments';
            }

            window.location.href = "/_layouts/xpointbase/pages/DownloadMSOfficeFiles.aspx?trackerId=" + fm.options.trackerId + "&nodeId=" + file.attr.id + "&sourceDoc=" + sourceDocument + "&fileExt=" + file.metadata.fileType + "&fileVersion=" + version;

        },

        //download popup ends
        clickOnlyDownloadFile: function (file, version) {
            // current file or the latest file 
            if (version == file.metadata.versionCount) {
                if (file.metadata.fileType == ".doc" || file.metadata.fileType == ".ppt" || file.metadata.fileType == ".xls" || file.metadata.fileType == ".xlsx" || file.metadata.fileType == ".docx" || file.metadata.fileType == ".pptx") {
                    fm.methods.downloadMSFiles(file, version);
                }
                else { window.open(file.metadata.url); }
            } else {

                $.ajax({
                    type: "GET",
                    cache: false,
                    dataType: "json",
                    url: fm.serviceUrlRef.getFileVersion,
                    data: {
                        "nodeId": file.attr.id,
                        "version": version,
                        "trackerId": fm.options.trackerId
                    }
                })
						.done(function (data) {

						    data = data.GetVersionInfoResult;
						    /*
							Download the specific version of the file
							*/
						    /*
                    Download the specific version of the file
                    */
						    if (file.metadata.fileType == ".doc" || file.metadata.fileType == ".ppt" || file.metadata.fileType == ".xls" || file.metadata.fileType == ".xlsx" || file.metadata.fileType == ".docx" || file.metadata.fileType == ".pptx") {

						        fm.methods.downloadMSFiles(file, version);
						    }
						    else { window.open(data.url); }
						    /*
							The below is not required when only a historical version of the file is being downloaded
							TO DO : Handle this for right panel 
							
							fm.dataContainer[file.attr.id].metadata.versionComments = data.Comments;
							fm.dataContainer[file.attr.id].metadata.addedBy = data.CreatedBy;
							fm.dataContainer[file.attr.id].metadata.addedDate = data.CreatedOn;
							fm.dataContainer[file.attr.id].metadata.lastModifiedBy = data.ModifiedBy;
							fm.dataContainer[file.attr.id].metadata.lastModifiedDate = data.ModifiedOn;
							fm.dataContainer[file.attr.id].metadata.size = data.Size;
							fm.dataContainer[file.attr.id].metadata.url = data.Url;
							fm.dataContainer[file.attr.id].metadata.type = data.Type;
							fm.dataContainer[file.attr.id].metadata.version = data.Version;
														
							fm.methods.updateRightPanel(file);
							*/
						})
						.fail(function (error) {
						    fm.methods.error("changeVersion.fail", error);
						});
            }
            return;
        },
        clickDownloadFileAndLock: function (fileId) {
            var dataToUpdate = {
                nodeId: fileId
            };

            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: fm.serviceUrlRef.lockFile,
                data: JSON.stringify(dataToUpdate)
            }).done(function (data) {
                data = data.CheckOutResult;
                dateToFormat = '/Date(' + (new Date).getTime() + ')/',
				lockedDate = fm.methods.getFormatedDate(dateToFormat, true); // format received from server
                fm.dataContainer[fileId].metadata.locked.amIOwner = true;
                fm.dataContainer[fileId].metadata.locked.lockDate = lockedDate;
                fm.dataContainer[fileId].metadata.locked.lockState = true;
                fm.dataContainer[fileId].metadata.locked.lockedBy = data.Message;
                fm.methods.updateRightPanel(fm.dataContainer[fileId]);
                /*code for downloading MS documents*/
                if (fm.dataContainer[fileId].metadata.fileType == ".doc" || fm.dataContainer[fileId].metadata.fileType == ".ppt" || fm.dataContainer[fileId].metadata.fileType == ".xls" || fm.dataContainer[fileId].metadata.fileType == ".xlsx" || fm.dataContainer[fileId].metadata.fileType == ".docx" || fm.dataContainer[fileId].metadata.fileType == ".pptx") {
                    var versionNumberInt = parseInt(fm.dataContainer[fileId].metadata.version);
                    var latestVersionNUm = versionNumberInt + 1;

                    var versionInString = latestVersionNUm.toString();
                    fm.methods.downloadMSFiles(fm.dataContainer[fileId], versionInString);
                }
                else { window.open(fm.dataContainer[fileId].metadata.url); }
                fm.methods.showMiddlePanelData(fm.currentId);
                setTimeout(function () {
                    var checkbox = $("input[name=middle-panel-list-checkbox][value=" + fileId + "]");
                    checkbox.click();
                    fm.methods.updateMiddleHeaderMenu();
                }, 200);

            }).fail(function (error) {
                fm.methods.error("downloadFileAndLock.fail", error);
            });
        },
        loadMoveDialog: function () {
            $("#dialog-moving-div").jstree({
                'core': {
                    'multiple': false,
                    'data': {
                        'url': fm.serviceUrlRef.getTreeContent,
                        'data': function (node) {
                            var folderId = fm.movingDialogData.currentId;
                            // this when get conent of file that not selected.. like I selected folder1 but click in folder2 arrow.
                            if (node.id != fm.movingDialogData.currentId && node.id != "#") folderId = node.id;
                            fm.movingDialogData.getDataLastId = folderId;
                            return {
                                'folderId': folderId,
                                'isRoot': fm.movingDialogData.isRoot,
                                'trackerId': fm.options.trackerId
                            };
                        },
                        'error': function (error, textStatus, thor) {
                            fm.methods.error('POPUP_error', "Error while loading data....");
                            fm.methods.error("POPUP_error_handle", thor.message);
                        },
                        'dataFilter': function (data) {
                            data = $.parseJSON(data);
                            data = fm.methods.filterAjaxResponseForTreeInPopUp(data);
                            data = JSON.stringify(data);
                            return data;
                        }
                    },
                    'check_callback': function (o, n, p, i, m) {
                        if (m && m.dnd && m.pos !== 'i') {
                            return false;
                        }
                        if (o === "move_node" || o === "copy_node") {
                            if (this.get_node(n).parent === this.get_node(p).id) {
                                return false;
                            }
                        }
                        return true;
                    },
                    'themes': {
                        'responsive': false,
                        'variant': 'small',
                        'stripes': true
                    }
                },
                'sort': function (a, b) {
                    var x = (this.get_type(a) === this.get_type(b) ? (this.get_text(a) > this.get_text(b) ? 1 : -1) : (this.get_type(a) >= this.get_type(b) ? 1 : -1));
                    return x == true ? false : true;
                },
                'types': {
                    'default': {
                        'icon': 'folder'
                    }
                },
                'unique': {
                    'duplicate': function (name, counter) {
                        return name + ' ' + counter;
                    }
                },
                "plugins": ['sort', 'types']
            })
			.on('move_node.jstree', function (e, data) {
			    fm.movingDialogData.old_parent = data.old_parent;
			})
			.on('changed.jstree', function (e, data) {
			    if (data.node == undefined) {
			        return;
			    }
			    if (data.node != undefined) fm.movingDialogData.currentId = data.node.id;
			})
			.on("open_node.jstree", function (e, data) {
			    var nodesToDisable = [];
			    /*
				When a root folder is opened on a Lifeccyle DOcuments Page disale the template nodes
				(template folders will be present only under root hence so no need to do so for every node opened)
				*/
			    if (data.node.id == fm.options.rootFolderId && !fm.options.adminView) {
			        nodesToDisable = nodesToDisable.concat(fm.movingDialogData.templateNodes);
			    }
			    nodesToDisable = nodesToDisable.concat(fm.movingDialogData.nodeID);
			    nodesToDisable = nodesToDisable.concat(fm.movingDialogData.old_parent);
			    disableNodes(nodesToDisable);
			})
			.on("loaded.jstree", function (e, data) {
			    var rootFolder = $(fm.movingDialogData.treeID).jstree(true).get_node({
			        id: fm.options.rootFolderId
			    });
			    $(fm.movingDialogData.treeID).jstree("toggle_node", rootFolder);
			})
			.on("select_node.jstree", function (e, data) {
			    fm.movingDialogData.new_parent = data.node.id;
			    fm.methods.hideMsg();
			})
			.on("rename_node.jstree", function (e, data) {
			    if (data.text == data.old) {
			        fm.methods.resetTree(data.node.id);
			    }
			    else if (!fm.methods.isNodeNameUnique($('#' + data.node.parent), data.text)) {
			        $('#error-moving-div').html("Folder with this name already exists");
			        fm.methods.resetTree(data.node.id);
			    }
			    else {
			        fm.methods.createFolderServerRequestInPopUp(data.node);
			    }
			    $("#create-folder-in-popup").attr('disabled', false);
			    return;
			});
            /*Disable the nodes so that those cannot be selected for move*/
            function disableNodes(nodesToDisable) {
                $(nodesToDisable).each(function (i) {
                    var node = $(fm.movingDialogData.treeID).jstree(true).get_node({
                        id: nodesToDisable[i]
                    });
                    if (node) {
                        $(fm.movingDialogData.treeID).jstree(true).disable_node(node);
                        $(fm.movingDialogData.treeID).find("#" + node.li_attr.id + "_anchor").css("color", 'gray');
                    }
                });
            }
        },

        resetTree: function (nodeID) {
            var node = $(fm.movingDialogData.treeID).jstree(true).get_node({
                id: nodeID
            });
            var res = $(fm.movingDialogData.treeID).jstree("delete_node", node);
        },
        createMovingPopUp: function (nodeID, currentParent) {
            if ($movingDialog.length > 0) {
                $movingDialog.children().remove();
                $movingDialog.remove();
            }
            $movingDialog = $("<div id='" + "dialog-moving-window" + "' title='" + "Déplacer vers" + "' />");
            var html = '<div id="error-moving-div" style="display:none;"></div><div id="dialog-moving-div" class="tree"></div>';

            $movingDialog.html(html);
            $("body").append($movingDialog);

            if (nodeID == undefined) {
                fm.movingDialogData.nodeID = [fm.currentId];
            } else {
                fm.movingDialogData.nodeID = nodeID;
            }
            fm.movingDialogData.childrenContainer = [];
            fm.movingDialogData.templateNodes = [];
            fm.movingDialogData.getDataLastId = fm.options.rootFolderId;
            fm.movingDialogData.currentId = fm.options.rootFolderId;
            fm.movingDialogData.dataContainer = [];
            fm.movingDialogData.treeIDs = [];
            fm.movingDialogData.isRoot = true;
            fm.movingDialogData.old_parent = currentParent;
            fm.movingDialogData.popupMoving = true; // if true we dont need to moving Backend ( we dont making any thing ) in move_node.jstree
            fm.movingDialogData.treeID = "#dialog-moving-div";

            $movingDialog.dialog
			({
			    autoOpen: true,
			    dialogClass: "move-dialog",
			    width: 450,
			    bgiframe: false,
			    modal: true,
			    open: fm.methods.loadMoveDialog,
			    buttons: [

				{
				    text: 'Déplacer vers',
				    id: 'create-folder-in-popup',
				    class: 'createFolder',
				    click: function () {
				        $("#create-folder-in-popup").attr('disabled', true);
				        fm.methods.createFolderShowInTreeInPopUp();
				    }
				},


				{
				    text: 'Annuler',
				    id: 'secondarybutton',
				    class: 'cancelButton',
				    click: function () {
				        $(this).dialog('close');
				    }
				},

				{
				    text: 'Bouge toi',
				    id: 'primarybutton',
				    class: 'moveButton',
				    click: function () {
				        var new_parent = $(fm.movingDialogData.treeID).jstree(true).get_node({
				            id: fm.movingDialogData.new_parent
				        });
				        if (new_parent.parents.length < fm.options.maxNestedFolderCount) {
				            fm.methods.moveInPopUp();
				        }
				        else {
				            fm.methods.displayMsg("Can not move because the max. level is reached");
				        }
				    }
				}
			    ]
			});
        },
        moveInPopUp: function () {
            if (fm.movingDialogData.new_parent == undefined) {
                fm.methods.displayMsg("Please select a valid folder for move");
                return;
            }
            var new_parent = $(fm.movingDialogData.treeID).jstree(true).get_node({
                id: fm.movingDialogData.new_parent
            });
            var numberOfNodes = fm.movingDialogData.nodeID.length;
            var sourceIdString = "";
            for (var i = 0; i < numberOfNodes; i++) {
                sourceIdString += fm.movingDialogData.nodeID[i] + ",";
            }
            sourceIdString = sourceIdString.slice(0, -1);
            fm.methods.moveNodes(fm.movingDialogData.old_parent, fm.movingDialogData.new_parent, sourceIdString, numberOfNodes);
            $("#dialog-moving-window").dialog("close");
        },
        moveNodes: function (oldParent, newParent, sourceId, numberOfNodes) {
            var sendData = {
                targetFolderId: newParent,
                sourceId: sourceId
            };
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: fm.serviceUrlRef.moveNodes,
                data: JSON.stringify(sendData)
            }).done(function (response) {
                var resData = response.MoveFilesAndFoldersResult;
                if (resData.Status == 'success') {
                    /*
					Update the content count of the old and new parent
					*/
                    fm.dataContainer[oldParent].metadata.count = fm.dataContainer[oldParent].metadata.count - numberOfNodes;
                    if (fm.dataContainer[newParent] != undefined)
                        fm.dataContainer[newParent].metadata.count = fm.dataContainer[newParent].metadata.count + numberOfNodes;
                    /*
					Refresh the old and new parent and make the new parent as the selected node
					Setting timeout is required when the old_parent & new_parent are siblings or parent/child. 
					In such cases one node needs to complete refreshing before the other can be refreshed else it throws error
					*/
                    var tree = $(fm.options.treeID);
                    tree.jstree("refresh_node", oldParent);
                    setTimeout(function () {
                        tree.jstree("refresh_node", newParent);
                    }, 1000);
                    setTimeout(function () {
                        tree.jstree("deselect_all", false);
                        tree.jstree("select_node", newParent);
                    }, 2000);
                    fm.methods.displayFlashMsg(resData.Message, "");
                }
            });
        },
        isNodeNameUnique: function (folder, name) {
            var existingNames = folder
							.find('ul:first > li > a')
							.contents()
							.map(function () {
							    return this.nodeType === 3 ? this.data : null;
							}),
				result = $.inArray(name, existingNames);
            return ! ~result;
        },
        filterAjaxResponseForTreeInPopUp: function (response) {
            response = response.GetFolderContentResult;
            var nodesResult = [];
            var templateNodes = [];
            fm.movingDialogData.childrenContainer[fm.movingDialogData.getDataLastId] = response;;

            for (var i = 0; i < response.length; i++) {
                var responseId = response[i].attr.id;
                // push data to dataContainer
                fm.movingDialogData.dataContainer[responseId] = response[i];
                if (response[i].metadata.nodeType != 'folder') continue;
                // making the tree's node
                fm.movingDialogData.treeIDs.push(responseId);
                if (response[i].metadata.isTemplate) {
                    templateNodes.push(responseId);
                }
                var tmpNode = new Object();
                tmpNode.id = responseId;
                tmpNode.parent = fm.movingDialogData.getDataLastId;


                tmpNode.text = response[i].data.title;
                if (fm.movingDialogData.isRoot == true) {
                    fm.movingDialogData.isRoot = false;

                    tmpNode.parent = "#";

                }
                if (response[i].metadata.count >= 1) tmpNode.children = true;
                else tmpNode.children = false;

                nodesResult.push(tmpNode);
            }
            fm.movingDialogData.templateNodes = templateNodes;
            return nodesResult;


        },
        createFolderServerRequestInPopUp: function (treeNode) {
            var sendData = {
                nodeId: treeNode.parent,
                newFolderName: treeNode.text
            };
            $.ajax({
                url: fm.serviceUrlRef.folderExists,
                type: "POST",
                data: JSON.stringify(sendData),
                dataType: 'json',
                contentType: "application/json"

            }).done(function (data) {
                var data = data.FolderExistsResult;
                if (data.Status == "false") {
                    $.ajax({
                        url: fm.serviceUrlRef.createFolder,
                        cache: false,
                        type: "POST",
                        data: JSON.stringify(sendData),
                        dataType: 'json',
                        contentType: "application/json"

                    }).done(function (data) {
                        data = data.CreateFolderResult;
                        $("#create-folder-in-popup").attr('disabled', false);
                        // should check if faild ....
                        if (data.attr.id == undefined) {
                            alert("Error while creating new Folder .. ");
                            var res = $(fm.movingDialogData.treeID).jstree("delete_node", treeNode);
                            $(fm.movingDialogData.treeID).jstree("deselect_all", false);
                            $(fm.movingDialogData.treeID).jstree("select_node", fm.options.rootFolderId);
                            return;
                        }

                        $(fm.movingDialogData.treeID).jstree(true).set_id(treeNode, data.attr.id);
                        var copied_node = $(fm.movingDialogData.treeID).jstree(true).get_node({
                            id: data.attr.id
                        });
                        $(fm.options.treeID).jstree(true).copy_node(copied_node, treeNode.parent, 0, function (node, parent, pos) {
                            $(fm.options.treeID).jstree(true).set_id(node, data.attr.id);
                        }, false, true);

                        // set data in orginal containers
                        fm.dataContainer[data.attr.id] = data;
                        if (fm.childrenContainer[treeNode.parent] == undefined) {
                            fm.childrenContainer[treeNode.parent] = [];
                        }
                        fm.childrenContainer[treeNode.parent].push(data);

                        // set dat in popup containers

                        fm.movingDialogData.dataContainer[data.attr.id] = data;
                        if (fm.movingDialogData.childrenContainer[treeNode.parent] == undefined) {
                            fm.movingDialogData.childrenContainer[treeNode.parent] = [];
                        }
                        fm.movingDialogData.childrenContainer[treeNode.parent].push(data);
                        $(fm.movingDialogData.treeID).jstree("deselect_all", false);
                        $(fm.movingDialogData.treeID).jstree("select_node", data.attr.id);
                    }).fail(function () {
                        $("#create-folder-in-popup").attr('disabled', false);
                    });
                }
                else {
                    $(fm.movingDialogData.treeID).jstree("delete_node", treeNode);
                    fm.methods.displayMsg(fm.messages.folderExistsError);
                    return;
                }
            });
        },

        createFolderShowInTreeInPopUp: function () {
            var node = $(fm.movingDialogData.treeID).jstree(true).get_node({
                id: fm.movingDialogData.currentId
            });
            newNode_id = $(fm.movingDialogData.treeID).jstree('create_node', node, {
                type: "default",
                text: fm.constants.folderDefaultName
            }, "last", function (new_node) {
                setTimeout(function () {
                    $(fm.movingDialogData.treeID).jstree('edit', new_node);
                }, 0);
            });
        },
        createAddFilePopUp: function (parentID) {
            $(".progress-popup").css("height", "22px").css("width", "390px");

            if ($uploadFileDialog.length > 0) {
                $uploadFileDialog.children().remove();
                $uploadFileDialog.remove();
            }
            $uploadFileDialog = $('<div id="upload-files-dialog" title="Ajouter des fichiers">');
            var html = '<div id="error-moving-div" style="display:none;"></div><div id="upload-files-main-div">';
            html += '<div> <div class="from-comp"> <input type="radio" value="file" id="upload-type" checked="checked" name="upload-type" class="upload-files-default upload-file-type"> De l\'ordinateur </div>';
            html += '<div class="file-button"><input id="fileupload-popup" class="browser-hidden" type="file" name="files[]" /><div class="browser-visible">Parcourir</div></div> </div>';
            html += '<div id="file-selected-popup"> </div> <br/>';
            html += '<div class="add-url"> <input type="radio" value="url" id="upload-type" class="upload-url-type" name="upload-type"> Ajouter une Url <input id="url-input" type="text" name="url-input" disabled> </div>';
            html += '<span id="urlErrMesg"></span>';
            html += '<div> <div id="progress" class="progress progress-popup" > <div class="progress-bar progress-bar-success" > </div> </div> </div></div>';

            $uploadFileDialog.html(html);
            $("body").append($uploadFileDialog);
            $(".upload-url-type").click(function () {
                if ($(".upload-url-type").is(':checked')) {
                    $("#url-input").prop("disabled", false);
                    $("#fileupload-popup").prop("disabled", true);
                    $("#upload-button").attr('disabled', false);
                }
            });
            $(".upload-file-type").click(function () {
                if ($(".upload-file-type").is(':checked')) {
                    $("#fileupload-popup").prop("disabled", false);
                    $("#url-input").prop("disabled", true);
                }
            });

            var uploadPopup = $('#fileupload-popup');
            $(".progress-popup").css("height", "10px").css("width", "auto");
            $("#upload-type").prop('checked', true);
            $("#url-input").val("");
            $("#file-selected-popup").html("");
            $("#fileupload-popup").css("display", "block");
            $(".browser-visible").css("display", "block");

            var control = $("#fileupload-popup");
            control.replaceWith(control = control.clone(true));

            // check the default 
            var radios = $(".upload-files-default");
            $(radios[0]).prop("checked", true);
            var dataToUpload = null;
            $('#fileupload-popup').fileupload({
                url: fm.serviceUrlRef.uploadFiles,
                dataType: 'text',
                singleFileUploads: true,
                done: function (e, data) {
                    var resp = data.response();
                    var responseJSON = resp.jqXHR.responseText;
                    // FOR IE 7,8
                    //if(data.dataType="iframe text")
                    responseJSON = responseJSON.replace('<?xml version="1.0" encoding="utf-8" ?>', '');
                    responseJSON = responseJSON.replace('<?xml version="1.0" encoding="utf-8"?>', '');
                    responseJSON = responseJSON.replace('<string xmlns="http://tempuri.org/">', '');
                    responseJSON = responseJSON.replace('</string>', '');
                    responseJSON = responseJSON.replace(/^[ \t]+/gm, '');
                    responseJSON = responseJSON.replace(/^[ \n]+/gm, '');
                    /*if ($(responseJSON).text() == "" || $(responseJSON).text() == '\n') {
					/*This should be in an error message div
					alert("Could not upload the file. Please check if the file with same name does not already exist");
					return;
					}*/
                    data = JSON.parse($.trim(responseJSON));

                    fm.dataContainer[data.attr.id] = data;
                    fm.dataContainer[parentID].metadata.count = fm.dataContainer[parentID].metadata.count + 1;
                    if (fm.childrenContainer[parentID] == undefined) fm.childrenContainer[parentID] = [];
                    fm.childrenContainer[parentID].push(data);
                    $(fm.options.treeID).jstree("refresh_node", parentID);
                    setTimeout(function () {
                        $(fm.options.treeID).jstree("deselect_all", false);
                        $(fm.options.treeID).jstree("select_node", parentID);
                    }, 500);
                    $uploadFileDialog.dialog('close');
                },
                formData: {
                    "folderId": parentID,
                    "trackerId": fm.options.trackerId
                },
                progressall: function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);
                    $('#progress .progress-bar').css(
							'width',
							progress + '%');
                },

                add: function (e, data) {
                    fm.methods.hideMsg();
                    $(".browser-visible").css({ 'top': '8px' });
                    if (fm.methods.isFileTypeAllowed(data.files[0].name)) {
                        var sendData = {
                            folderId: parentID,
                            fileName: data.files[0].name
                        };
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            url: fm.serviceUrlRef.fileExists,
                            data: JSON.stringify(sendData)
                        })
						.done(function (status) {
						    var res = status.FileExistsResult;
						    if (res.Status == "true") {
						        fm.methods.displayMsg("Le fichier existe déjà");
						        $("#upload-button").attr('disabled', true);
						        $(".browser-visible").css({ 'top': '43px' });
						    }
						    else {
						        $(".progress-popup").css("display", "block");
						        $("#upload-button").attr('disabled', false);
						        dataToUpload = data;
						        $("#file-selected-popup").append(data.files[0].name + " <a style='cursor: pointer;color:#646d7a; margin-left:10px;' id='remove-file-selected-popup' > <i class='fa fa-times'></i> </a>")
						        $("#fileupload-popup").css("display", "none");
						        $(".browser-visible").css("display", "none");
						        $("#progress").css("height", "auto");
						        /*Remove file*/
						        $("#remove-file-selected-popup").click(function () {
						            $("#upload-button").attr('disabled', true);
						            $("#file-selected-popup").html("");
						            $("#fileupload-popup").css("display", "block");
						            $(".browser-visible").css("display", "block");
						            $("#progress").css("display", "none");

						            var control = $("#fileupload-popup");
						            control.replaceWith(control = control.clone(true));
						        });
						    }
						});
                    }
                    else {
                        fm.methods.displayMsg("Type de fichier non autorisé");
                        $(".browser-visible").css({ 'top': '43px' });
                    }
                }
            }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');

            $uploadFileDialog.dialog
			({
			    autoOpen: true,
			    dialogClass: "upload-dialog",
			    width: 450,
			    bgiframe: false,
			    modal: true,
			    buttons: [
				{
				    text: 'Télécharger',
				    id: 'upload-button',
				    click: function () {
				        fm.methods.hideMsg();
				        if ($("input:radio[name=upload-type]:checked").val() == "file") {
				            $("#progress").css("height", "10px").css("width", "auto");
				            /*Sanity check*/
				            if (dataToUpload == null) { return; }
				            dataToUpload.submit();
				        }
				        else {
				            fm.methods.uploadUrl($("#url-input").val(), parentID);
				        }
				    }
				},
						{
						    text: 'Annuler',
						    id: 'secondarybutton',
						    click: function () {
						        $(this).dialog('close');
						    }
						}
			    ]
			});
        },
        uploadUrl: function (url, parentID) {


            // validate the URL value.  should start with :: 
            if (url.length > 8) {
                var toVaild = url.toUpperCase();
                if (toVaild.substr(0, 6) == "FTP://" || toVaild.substr(0, 7) == "HTTP://" || toVaild.substr(0, 8) == "HTTPS://") {

                } else {
                    $("#urlErrMesg").html($('<div class="errorMsg">Veuillez saisir l\'URL dans un format valide</div>'));
                    return false;
                }
            } else {
                $("#urlErrMesg").html($('<div class="errorMsg">Veuillez saisir l\'URL dans un format valide</div>'));
                return false;
            }
            /*
			Validate that the URL does not already exist
			*/
            var sendData = {
                folderId: parentID,
                url: url.replace(/\\/g, "\\\\")
            };
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: fm.serviceUrlRef.urlExists,
                data: JSON.stringify(sendData)
            })
				.done(function (data) {
				    var res = data.UrlExistsResult;
				    if (res.Status == "true") {
				        fm.methods.displayMsg("l'URL existe déjà");
				        $(".browser-visible").css({ 'top': '43px' });
				    }
				    else {
				        /*
						Add the URL
						*/
				        $.ajax({
				            type: "POST",
				            contentType: "application/json; charset=utf-8",
				            dataType: "json",
				            url: fm.serviceUrlRef.uploadUrl,
				            data: JSON.stringify(sendData)
				        })
					.done(function (data) {
					    var responseJson = data.AddDocumentUrlResult;
					    if (!responseJson) {
					        return false;
					    }
					    fm.dataContainer[responseJson.attr.id] = responseJson;
					    if (fm.childrenContainer[parentID] == undefined)
					        fm.childrenContainer[parentID] = [];
					    fm.childrenContainer[parentID].push(responseJson);
					    fm.dataContainer[parentID].metadata.count = fm.dataContainer[parentID].metadata.count + 1;
					    $(fm.options.treeID).jstree("refresh_node", parentID);
					    setTimeout(function () {
					        $(fm.options.treeID).jstree("deselect_all", false);
					        $(fm.options.treeID).jstree("select_node", parentID);
					    }, 800);
					    $uploadFileDialog.dialog('close');
					})
					.fail(function (error) {
					    fm.methods.error("upload-files-button-URL-FAIL", error);
					    fm.methods.displayMsg("Can't upload the URL now .. try again");
					    $(".browser-visible").css({ 'top': '43px' });
					    $uploadFileDialog.dialog('close');
					});
				    }
				})
					.fail(function (error) {
					    fm.methods.displayMsg("Can't upload the URL now .. try again");
					    $(".browser-visible").css({ 'top': '43px' });
					    $uploadFileDialog.dialog('close');
					});
        },
        sortByName: function (folderId) {
            var current = $(fm.options.treeID).jstree(true).get_node({
                id: folderId
            });

            var children = current.children;
            for (var fInd = 0; fInd < children.length; fInd++) {
                for (var sInd = 0; sInd < children.length; sInd++) {
                    if (fm.dataContainer[children[fInd]].data.title.toUpperCase() < fm.dataContainer[children[sInd]].data.title.toUpperCase()) {
                        var x = children[fInd];
                        children[fInd] = children[sInd];
                        children[sInd] = x;
                    }
                }
            }

            for (var ind = 0; ind < children.length; ind++) {
                child = $(fm.options.treeID).jstree(true).get_node({
                    id: children[ind]
                });
                if (child.children.length >= 2) fm.methods.sortByName(child.id);
            }
            $(fm.options.treeID).jstree(true).redraw(true);
            fm.methods.addSubFolderCount(current);
        },
        sortByModifiedDate: function (folderId) {
            var current = $(fm.options.treeID).jstree(true).get_node({
                id: folderId
            });

            var children = current.children;
            for (var fInd = 0; fInd < children.length; fInd++) {
                for (var sInd = 0; sInd < children.length; sInd++) {
                    fDateNumber = Number(new Date(fm.methods.getFormatedDate(fm.dataContainer[children[fInd]].metadata.addedDate, false)));
                    sDateNumber = Number(new Date(fm.methods.getFormatedDate(fm.dataContainer[children[sInd]].metadata.addedDate, false)));

                    if (fDateNumber < sDateNumber) {
                        var x = children[fInd];
                        children[fInd] = children[sInd];
                        children[sInd] = x;
                    }
                }
            }

            for (var ind = 0; ind < children.length; ind++) {
                child = $(fm.options.treeID).jstree(true).get_node({
                    id: children[ind]
                });
                if (child.children.length >= 2) fm.methods.sortByModifiedDate(child.id);
            }
            $(fm.options.treeID).jstree(true).redraw(true);
            fm.methods.addSubFolderCount(current);
        },
        sortByDate: function (folderId) {
            var current = $(fm.options.treeID).jstree(true).get_node({
                id: folderId
            });

            var children = current.children;
            for (var fInd = 0; fInd < children.length; fInd++) {
                for (var sInd = 0; sInd < children.length; sInd++) {
                    fDateNumber = Number(new Date(fm.methods.getFormatedDate(fm.dataContainer[children[fInd]].metadata.addedDate, false)));
                    sDateNumber = Number(new Date(fm.methods.getFormatedDate(fm.dataContainer[children[sInd]].metadata.addedDate, false)));
                    if (fDateNumber > sDateNumber) {
                        var x = children[fInd];
                        children[fInd] = children[sInd];
                        children[sInd] = x;
                    }
                }
            }
            for (var ind = 0; ind < children.length; ind++) {
                child = $(fm.options.treeID).jstree(true).get_node({
                    id: children[ind]
                });
                if (child.children.length >= 2) fm.methods.sortByDate(child.id);
            }
            $(fm.options.treeID).jstree(true).redraw(true);
            fm.methods.addSubFolderCount(current);
        },
        updateTopHeader: function (node) {
            /*
			If edit access add the Actions - Create Folder, Create File and Middle Menu
			*/
            var createFolderHeader = $("#" + fm.style.ids.createFolderHeader);
            var createFileHeader = $("#" + fm.style.ids.createFileHeader);
            var isTemplate = fm.dataContainer[node.id].metadata.isTemplate;
            /*
			For Admin Templates Page - folder actions not allowed for 'root' folder
			For Lifecycle Documents Page - folder actions not allowed for 'Template' folders
			*/
            var editable = (fm.options.adminView) ? enableControls && !((fm.currentId == fm.options.rootFolderId)) : enableControls && !isTemplate;
            if (editable) {
                createFolderHeader.children().show();
                createFileHeader.children().show();
            }
            else {
                createFolderHeader.children().hide();
                createFileHeader.children().hide();
            }
        },
        updateBreadcrumb: function (node) {
            arrayPath = [];
            var current_node = node;
            arrayPath.push(fm.dataContainer[node.id].data.title);
            while (current_node.id != fm.options.rootFolderId && current_node.parent != "#") {
                parent_ = $(fm.options.treeID).jstree("get_parent", current_node);
                arrayPath.push(fm.dataContainer[parent_].data.title);
                current_node = $(fm.options.treeID).jstree("get_node", {
                    id: parent_
                });
            }
            arrayPath.reverse();
            /*
			if length more than 60 ... it show the root then .... then the last node
			*/
            var path = "";
            for (var i = 0; i < arrayPath.length; i++) {
                path += arrayPath[i] + " > ";
            };
            path = path.substring(0, path.length - 3);
            var fullPath = path;

            if (path.length > 60) {
                path = arrayPath[0] + " > ";
                path += "... > ";
                path += arrayPath[arrayPath.length - 2] + " > ";
                path += arrayPath[arrayPath.length - 1];
                if (path.length > 60) {
                    path = arrayPath[0] + " > ";
                    path += "... => ";
                    path += arrayPath[arrayPath.length - 1];
                }
            }
            if (arrayPath.length == 1)
                path += " > ";
            $("." + fm.style.classes.breadcrumbItems).html(path).attr('title', fullPath);
        },
        updateNodeTitle: function (nodeId, value) {
            var node = $(fm.options.treeID).jstree(true).get_node({
                id: nodeId
            });
            var newValue = fm.dataContainer[nodeId].metadata.count + value;
            fm.dataContainer[nodeId].metadata.count = newValue;
            $(fm.options.treeID).jstree(true).redraw(true);
        },
        updateNodeTitleInPopUpTree: function (nodeId, value) {
            var node = $(fm.movingDialogData.treeID).jstree(true).get_node({
                id: nodeId
            });
            var newValue = fm.movingDialogData.dataContainer[nodeId].metadata.count + value;
            fm.movingDialogData.dataContainer[nodeId].metadata.count = newValue;
            $(fm.movingDialogData.treeID).jstree(true).redraw(true);
        },
        deleteElementFromArray: function (array, element) {
            return jQuery.grep(array, function (value) {
                return value != element;
            });
        },
        init: function (opt) {
            $.extend(true, fm.options, fm.defaults, opt);
            $($(this).parent().parent()).css("border", "1px black solid");
            serverSideValues = opt;
            if (serverSideValues.editable == "True") {
                enableControls = true;
                fm.hasAccess = true;
            }
            fm.methods.loadTemplates($(this), opt);
            fm.currentId = fm.options.rootFolderId;
            fm.options.treeID = "#tree";
            $(fm.options.treeID).addClass("tree");
            if (fm.options.adminView != undefined) {
                if (fm.options.adminView) {
                    fm.serviceUrlRef = fm.ajaxAdminUrl;
                }
                else {
                    fm.serviceUrlRef = fm.ajaxUrl;
                }
            }

            fm.tree = $(fm.options.treeID).jstree({
                'core': {
                    'error': function (error_obj) {
                        fm.methods.error("core.error", error_obj);
                    },
                    'multiple': false,
                    'cache': false,
                    'data': {
                        'cache': false,
                        'url': fm.serviceUrlRef.getTreeContent,
                        'data': function (node) {
                            var folderId = fm.currentId;
                            // this when get conent of file that not selected.. like I selected folder1 but click in folder2 arrow.
                            if (node.id != fm.currentId && node.id != "#") folderId = node.id;
                            fm.getDataLastId = folderId;
                            var isTemplate = fm.dataContainer[folderId] ? fm.dataContainer[folderId].metadata.isTemplate : fm.options.adminView;
                            return {
                                'folderId': folderId,
                                'isRoot': fm.isRoot,
                                'trackerId': fm.options.trackerId,
                                'isTemplate': isTemplate
                            };
                        },
                        'error': function (error, textStatus, thor) {
                            fm.methods.error('error', "Error while loading data....");
                            fm.methods.error("error_handle", thor.message);
                        },
                        'dataFilter': function (data) {
                            data = $.parseJSON(data);
                            data = fm.methods.filterAjaxResponseForTree(data);
                            data = JSON.stringify(data);
                            return data;
                        }
                    },
                    'check_callback': function (o, n, p, i, m) {
                        if (m && m.dnd && m.pos !== 'i') {
                            return false;
                        }
                        if (o === "move_node" || o === "copy_node") {
                            if (this.get_node(n).parent === this.get_node(p).id) {
                                return false;
                            }
                            /*
							For source Node
							- The 'Root' folder is not movable in Admin Templates as well as Lifecycle Documents
							- LC Folders on Admin Templates and Template folders on Lifecycle Documents page are not movable
							*/
                            var sNodeId = this.get_node(n).id;
                            var sMove = (sNodeId == fm.options.rootFolderId);
                            if (!sMove) {
                                sMove = fm.options.adminView ? fm.dataContainer[sNodeId].metadata.lcFolder : fm.dataContainer[sNodeId].metadata.isTemplate;
                            }
                            /*
							Destination Node
							- Any folder is not allowed to be moved to the 'Root' folder of the Admin Templates Page
							- Any folder is not allowed to be moved to 'Templates' folder on Lifecycle Documents page
							*/
                            var dNodeId = this.get_node(p).id;
                            var dMove = fm.options.adminView ? dNodeId == fm.options.rootFolderId : fm.dataContainer[dNodeId].metadata.isTemplate;
                            /*Check source and destnation for move allowed*/
                            if (sMove || dMove) {
                                fm.methods.displayFlashMsg(fm.messages.moveNotAllowedError, "errorFlash");
                                return false;
                            }
                        }
                        return true;
                    },
                    'themes': {
                        'responsive': false,
                        'variant': 'small',
                        'stripes': true
                    }
                },
                'sort': function (a, b) {
                    return (this.get_type(a) === this.get_type(b) ? (this.get_text(a) > this.get_text(b) ? 1 : -1) : (this.get_type(a) >= this.get_type(b) ? 1 : -1));
                },
                'contextmenu': {
                    'select_node': false,
                    'items': function (node) {
                        var tmp = $.jstree.defaults.contextmenu.items();
                        delete tmp.ccp.action;
                        delete tmp.create.action;
                        tmp.create.label = "Ajouter un dossier";
                        tmp.create.action = function (data) {
                            var inst = $.jstree.reference(data.reference),
							obj = inst.get_node(data.reference);
                            fm.methods.createFolderShowInTree(obj.id);
                        };
                        tmp.ccp.label = "Déplacer vers ...";
                        delete tmp.ccp.submenu;
                        tmp.ccp.action = function (data) {
                            var inst = $.jstree.reference(data.reference),
							obj = inst.get_node(data.reference);
                            fm.methods.createMovingPopUp([obj.id], obj.parent); //this is used
                        };
                        tmp.addFile = new Object();
                        tmp.addFile.label = "Ajouter un fichier";
                        tmp.addFile.action = function (data) {
                            var inst = $.jstree.reference(data.reference),
							obj = inst.get_node(data.reference);
                            fm.methods.createAddFilePopUp(obj.id);
                        };
                        if (this.get_type(node) === "file") {
                            delete tmp.create;
                        }
                        tmp.remove.action = function (data) {
                            var nodes = [];
                            var inst = $.jstree.reference(data.reference),
							obj = inst.get_node(data.reference);
                            nodes.push(obj.id);
                            var nodeToRefresh;
                            fm.methods.createDeletePopUp(nodes, obj.parent, obj.text);
                            $deleteDialog.css('z-index', '999');
                            $deleteDialog.dialog('open');
                            /*
							Fixed the overlap problem. Added required css to ui-dialog class
							*/
                            /*$('.ui-dialog').css('z-index', '1250');*/
                        };
                        /*Folder actions not allowed for 'Template' folders on Lifecycle Documents page*/
                        var isTemplate = fm.dataContainer[node.id].metadata.isTemplate;
                        var editable = fm.options.adminView ? enableControls && (node.id != fm.options.rootFolderId) : enableControls && !isTemplate;
                        if (editable) {
                            var newMenu = new Object();
                            newMenu.create = tmp.create;
                            newMenu.addFile = tmp.addFile;
                            newMenu.ccp = tmp.ccp;
                            newMenu.rename = tmp.rename;
                            newMenu.remove = tmp.remove;
                            if (node.id == fm.options.rootFolderId || fm.dataContainer[node.id].metadata.lcFolder) {
                                newMenu.rename._disabled = true;
                                newMenu.remove._disabled = true;
                                newMenu.ccp._disabled = true;
                            }
                            if (fm.dataContainer[node.id].metadata.isToolDoc) {
                                newMenu.remove();
                                //						        newMenu.create._disabled = true;
                                //						        newMenu.addFile._disabled = true;
                                //						        newMenu.rename._disabled = true;
                                //						        newMenu.remove._disabled = true;
                                //						        newMenu.ccp._disabled = true;
                            }
                            return newMenu;
                        }
                    }
                },
                'types': {
                    'default': {
                        'icon': 'folder'
                    },
                    'template': {
                        'icon': '/_layouts/Images/xpointbase/AdminFolder.png'
                    }
                },
                'unique': {
                    'duplicate': function (name, counter) {
                        return name + ' ' + counter;
                    }
                },
                "plugins": ['dnd', 'sort', 'contextmenu', 'types']
            });
            fm.tree
				.on('hover_node.jstree', fm.methods.onHoverNode)
				.on('rename_node.jstree', fm.methods.onRenameNode)
				.on('dehover_node.jstree', fm.methods.onDeHoverNode)
				.on('open_node.jstree', fm.methods.onOpenNode)
				.on('loaded.jstree', fm.methods.onLoaded)
				.on('changed.jstree', fm.methods.onChanged)
				.on('activate_node.jstree', fm.methods.onSelectNode)
				.on('move_node.jstree', fm.methods.onMoveNode);
        },
        /*
		Append the count of files and sub-folders within the folder
		*/
        addSubFolderCount: function (node) {
            if (node.id === undefined || node.id == '#') { }
            else {
                var $node = $('#' + node.id);
                var lis = $node.parent().find('li');
                lis.each(function () {
                    var $this = $(this),
						dataContainer = fm.dataContainer[$this.attr('id')];
                    if (dataContainer) {
                        var count = fm.dataContainer[$this.attr('id')].metadata.count;
                        if (count > 0) {
                            var countSpan = $this.find('.count');
                            if (countSpan.length > 0) {
                                countSpan.html(count);
                            }
                            else {
                                var countElem = $(fm.templates.folderCount);
                                $this.find('a').append(countElem);
                                $this.find('.count').html(count);
                            }
                        }
                        else {
                            $this.find('.count-container').html('');
                        }
                    }
                });
            }
        },
        onSelectNode: function (e, data) {
            data.instance.toggle_node(data.node);
            var isTemplate = fm.dataContainer[data.node.id].metadata.isTemplate;
            var IsToolDoc = fm.dataContainer[data.node.id].metadata.isToolDoc;
            var editable = fm.options.adminView ? enableControls && (data.node.id != fm.options.rootFolderId) : enableControls && !isTemplate;
            fm.methods.addActionButtons(editable, IsToolDoc);
        },
        /*Add the action buttons of top left panel of the layout*/
        addActionButtons: function (editable, IsToolDoc) {
            if (IsToolDoc) {
                $(".filemanager-control-panel-left-header").html('');
            }
            else if (editable) {
                var createFolderHeader = $(fm.templates.createFolderHeader);
                var leftHeaderActionPanel = $(fm.templates.leftHeaderActionPanel);
                var addFileHeader = $(fm.templates.addFileHeader);
                var sortHeader = $(fm.templates.sortHeader);
                createFolderHeader.append(fm.iconsCenter.addFolder);
                leftHeaderActionPanel.append(createFolderHeader);
                addFileHeader.append(fm.iconsCenter.addFile);
                leftHeaderActionPanel.append(addFileHeader);
                leftHeaderActionPanel.append(sortHeader);
                $(".filemanager-control-panel-left-header").html(leftHeaderActionPanel);
                $("#" + fm.style.ids.createFolderHeader).click(function () {
                    fm.methods.createFolderShowInTree(fm.currentId);
                });
                $("#" + fm.style.ids.createFileHeader).click(function () {
                    fm.methods.createAddFilePopUp(fm.currentId);
                });
            }
            else {
                $(".filemanager-control-panel-left-header").html('');
            }
        },
        onOpenNode: function (e, data) {
            if (data.node == undefined) return;
            var node = data.node;
            fm.methods.addSubFolderCount(node);
        },
        onHoverNode: function (e, data) {
            /*on hover if the root selected folder is root folder and also on admin template do not show hover not*/
            if ((data.node.id != fm.options.rootFolderId && fm.options.adminView) || (!fm.options.adminView)) {
                $("#" + data.node.id).prop('title', fm.constants.contextMenuRightClickTree);
            }
        },
        onDeHoverNode: function (e, data) {
            if ((data.node.id != fm.options.rootFolderId && fm.options.adminView) || (!fm.options.adminView)) {
                $("#" + data.node.id).prop('title', fm.constants.contextMenuRightClickTree);
            }
        },
        onRenameNode: function (e, data) {
            /*
			if new folder is being created
			*/
            if (fm.createFolderFlag == true) {
                fm.createFolderFlag = false;
                if (data.node.parents.length < fm.options.maxNestedFolderCount) {
                    fm.methods.createFolderServerRequest(data.node);
                }
                else {
                    fm.methods.displayFlashMsg(fm.messages.folderLevelNotAllowed, "errorFlash");
                    $(fm.options.treeID).jstree("delete_node", data.node);
                }
                return;
            }
            if (data.text == data.old) {
                $(fm.options.treeID).jstree("refresh_node", fm.currentId);
                return;
            }
            /*
			Rename folder
			*/
            fm.methods.renameNode(data.node.id, data.text);
        },
        onMoveNode: function (e, data) {
            if (fm.movingDialogData.popupMoving == true)
                return;
            fm.methods.moveNodes(data.old_parent, data.parent, data.node.id, 1);
        },
        onLoaded: function (e, data) {
            $(fm.options.treeID).jstree
            var rootFolder = $(fm.options.treeID).jstree(true).get_node({
                id: fm.options.rootFolderId
            });
            $(fm.options.treeID).jstree("toggle_node", rootFolder);
            $(fm.options.treeID).jstree("hide_icon", rootFolder);
            setTimeout(function () {
                $(fm.options.treeID).jstree("deselect_all", false);
                $(fm.options.treeID).jstree("select_node", fm.options.rootFolderId);
                fm.methods.initDropDownMenus();
                fm.methods.initListeners();
            }, 1000);
        },
        onChanged: function (e, data) {
            if (data.node == undefined) {
                return;
            }
            fm.currentId = data.node.id;
            $(fm.options.treeID).jstree(true).load_node(data.node, function () {
                fm.methods.addSubFolderCount(data.node);
                fm.methods.updateBreadcrumb(data.node);
                fm.methods.updateTopHeader(data.node);
                fm.methods.showMiddlePanelData(data.node.id);
            });
        },
        isFileTypeAllowed: function (name, allowedExtensions) {
            var arr = name.split('.'),
				fileExtension = arr[arr.length - 1],
			// Could be optimized. For example using ES5 Array.some() method or regExp.
				result = $.inArray(fileExtension.toLowerCase(), allowedExtensions || fm.allowedFileExtensions);
            return !! ~result;
        },
        displayMsg: function (msg) {
            $('#error-moving-div').html(msg).show();
        },
        hideMsg: function (msg) {
            $('#error-moving-div').html('').hide();
        },
        displayFlashMsg: function (msg, type) {
            type = (type == "") ? "successFlash" : type;
            if ($('.message').length < 1) {
                $("body").append(fm.templates.notificationBox);
            } else {
                $('.message').show();
            }
            $('.message > div').addClass(type);
            $('.message').find('h4').html(msg);
            $('.message').fadeOut(5000);

            $('.message > div').bind('click', function (e) {
                $('.message').hide();
            });
        }
    }
})(jq1102, jq1102, $.timeago);