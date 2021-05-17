///<reference path="jquery-1.3.2-vsdoc2.js"/>
jQuery.fn.classification = function(options) {
    var defaults = {
        listname: "",
        columnname: "",
        parentcolumnname: "",
        parentid: "",
        serviceurl: "",
        customattr: "",
        uniquevals: false,
        autoindexing: false,
        valuecolumn: "ID",
        allowblank: true,
        selectedvalue: "",
        selectedtext: "",
        parentKey: ""
    };
    var options = jQuery.extend(defaults, options);

    var $this = $(this);

    $this.attr("listname", options.listname);
    $this.attr("columnname", options.columnname);
    $this.attr("parentcolumnname", options.parentcolumnname);
    $this.attr("parentid", options.parentid);
    $this.attr("serviceurl", options.serviceurl);

    if (options.parentid != "") {

        $("#" + options.parentid).change(function() {

            if ($(this).val() != "") {

                var parentval;
                if (options.customattr == null || options.customattr == "") {
                    parentval = $(this).val();
                }
                else {
                    parentval = $("#" + $(this).attr("id") + " option:selected").attr(options.customattr);
                }
                if (options.parentKey != "") {
                    parentval = options.parentKey;
                    options.parentKey = "";
                }
                var params = { classificationparams: { listname: options.listname,
                    columnname: options.columnname,
                    parentcolumnname: options.parentcolumnname,
                    parentselection: parentval,
                    clientid: $this.attr('id'),
                    autoindexing: options.autoindexing,
                    uniquevals: options.uniquevals,
                    valuecolumn: options.valuecolumn
                }
                };
                $.ajax({
                    url: $this.attr("serviceurl"),
                    contentType: "application/json; charset=utf-8",
                    type: "post",
                    dataType: "json",
                    data: $.toJSON(params),
                    success: populateChildControl
                });
            }
            else {
                $this.html("");
            }
        });

        return this;
        /*end of change event */

    }
    else {
        var params = { classificationparams: { listname: options.listname,
            columnname: options.columnname,
            clientid: $this.attr('id'),
            autoindexing: options.autoindexing,
            uniquevals: options.uniquevals,
            valuecolumn: options.valuecolumn
        }
        };

        $.ajax({
            url: options.serviceurl,
            contentType: "application/json; charset=utf-8",
            type: "post",
            dataType: "json",
            data: $.toJSON(params),
            success: populateChildControl,
            error: function(request, error) {
                alert(error);
            }
        });
        return this;


    }

    function populateChildControl(res) {

        var items = res.d;
        if (items.itemIds) {
            var ids = items.itemIds.split(',');
            var itemArr = items.items.split(',');
            var clientid = items.clientid;
            var $selectBox = $('#' + clientid);
            if (options.allowblank == false) {
                $this.find('option').remove();
            }
            else {
                $selectBox.html(
            $('<option></option>').val("").html("")
    );
            }
            var needTextCheck = false, needValueCheck = false;
            switch (typeof (options.selectedtext)) {
                case "string":
                    if ($.trim(options.selectedtext).length > 0) {
                        needTextCheck = true;
                    }
                    break;
                case "number":
                    if ($(options.selectedtext).length > 0) {
                        needTextCheck = true;
                    }
                    break;
            }
            switch (typeof (options.selectedvalue)) {
                case "string":
                    if ($.trim(options.selectedvalue).length > 0) {
                        needValueCheck = true;
                    }
                    break;
                case "number":
                    if ($(options.selectedvalue).length > 0) {
                        needValueCheck = true;
                    }
                    break;
            }
            $(ids).each(function(index) {
                var selected = false;
                if (itemArr[index] == "" || ids[index] == "") {
                    return false;
                }
                if (needTextCheck == true && itemArr[index] == options.selectedtext) {
                    selected = true;
                }

                if (needValueCheck == true && ids[index] == options.selectedvalue) {
                    selected = true;
                }

                if (selected == true) {
                    $selectBox.append(
        $('<option selected="selected"></option>').val(ids[index]).html(itemArr[index])
    );
                }
                else {
                  var seloption = document.createElement('option');
                  seloption.text = itemArr[index];
                  seloption.value = ids[index];
                  $selectBox[0].options.add(seloption);
                }
            });
            
            if (options.allowblank == false) {
            $selectBox.trigger("change");
            }            

        }
        else {
            $id = "#" + $this.attr('id');
            $($id).find('option').remove();
        }

        //elSel.style.width = "122px";
    }
}