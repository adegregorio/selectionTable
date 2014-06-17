/*
 * SelectionTable utility
 * ------------------------------
 * This utility is intended to be used to generate a table with selectable rows 
 * with a checkbox in each one. Also it adds a checkbox in the header to select
 * all the rows at once.
 *
 * Usage: 
 *  # The first step is to create an instance of SelectionTableBuilder. When
 *    creating the instance three functions must be passed as parameters:
 *      - The first one is to get the id of a given record. It is mapped to the 
 *        "getRecordId" property of the builder which is used to set the 
 *        checkbox id for that record.
 *      - The second is to get the value of a given record. It is mapped to the
 *        "getRecordValue: property of the builder and is used to set the value 
 *        of the checkbox.
 *      - The third is to get an array with the values that will be added as 
 *        columns of the given record in the table. It is mapped to the 
 *        "getRecordData" property of the builder.
 *
 *  # After creating the instance, the tableData property must be set as an 
 *    object with the following format:
 *      {
 *          id : "theIdForTheTable",
 *          columnHeaders : anArrayWithTheColumnHeaders,
 *          data : anArrayWithTheRecords
 *      };
 *
 *  # The last step is to build the table calling the buildTable function of the
 *    builder.
 *
 * @author Alejandro De Gregorio Tort
 */

function SelectionTableBuilder(recordIdGetter, recordValueGetter, recordDataGetter) {
    this.getRecordId = recordIdGetter;
    this.getRecordValue = recordValueGetter;
    this.getRecordData = recordDataGetter;
}

SelectionTableBuilder.prototype.buildTable = function () {
    this.table = $('<table />', {
        id : this.tableData.id
    });

    this.buildHeaderRow();
    this.addRecords(this.tableData.data);

    return this.table;
}

SelectionTableBuilder.prototype.buildHeaderRow = function () {
    var headerRow = $('<tr />');

    headerRow.append(this.newHeaderColumn(this.buildHeaderCheckbox()));

    for (var i = 0; i < this.tableData.columnHeaders.length; i++) {
        headerRow.append(this.newHeaderColumn(this.tableData.columnHeaders[i]));
    }

    this.table.append(headerRow);
}

SelectionTableBuilder.prototype.newHeaderColumn = function (header) {
    return $('<th />').append(header);
}

SelectionTableBuilder.prototype.buildHeaderCheckbox = function () {
    return $('<input />', {
        type : "checkbox",
        id : this.tableData.id + "AllCheckbox",
        click : function() {
            var checkboxes = $(this).closest('table').find('input:checkbox');
            checkboxes.attr('checked', $(this).is(':checked'));
        }
    });
}

SelectionTableBuilder.prototype.addRecords = function (records) {
    for (var i = 0; i < records.length; i++) {
        this.table.append(this.buildDataRow(records[i]));
    }
}

SelectionTableBuilder.prototype.buildDataRow = function (record) {
    var recordRow = $('<tr />');

    recordRow.append(this.buildDataCheckbox(this.getRecordId(record), this.getRecordValue(record)));
    recordRow.append(this.buildDataValues(this.getRecordData(record)));

    return recordRow;
}

SelectionTableBuilder.prototype.buildDataCheckbox = function (theId, theValue) {
    return $("<td />").append(
        $('<input />', {
            type : "checkbox",
            id : theId,
            value : theValue,
            click : function () {
                var allCheckbox = $(this).closest('table').find('input[id*="AllCheckbox"]');
                if ($(this).not(':checked')) {
                    allCheckbox.attr('checked', false);
                }
            }
        })
    );
}

SelectionTableBuilder.prototype.buildDataValues = function (data) {
    var cells = $('<div />');

    for (var i = 0; i < data.length; i++) {
        cells.append($("<td />").append(data[i]));
    }

    return cells.html();
}

SelectionTableBuilder.prototype.removeRow = function (element) {
    var row = element.closest('tr');
    row.remove();
}

SelectionTableBuilder.prototype.removeTable = function () {
    this.table.remove();
}

SelectionTableBuilder.prototype.getRecordsCount = function () {
    return this.table.children().children().length - 1;
}
