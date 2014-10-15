selectionTable
==============

Generate a table with selectable rows with a checkbox in each one. Also it adds a checkbox in the header to select all the rows at once.

Usage
=====
* The first step is to create an instance of `SelectionTableBuilder`. When creating the instance three functions must be passed as parameters:
    * The first one is to get the id of a given record. It is mapped to the `getRecordId` property of the builder which is used to set the checkbox id for that record.
    * The second is to get the value of a given record. It is mapped to the `getRecordValue` property of the builder and is used to set the value of the checkbox.
    * The third is to get an array with the values that will be added as columns of the given record in the table. It is mapped to the `getRecordData` property of the builder.

* After creating the instance, the `tableData` property must be set as an object with the following format:
```
{
  id : "theIdForTheTable",
  columnHeaders : anArrayWithTheColumnHeaders,
  data : anArrayWithTheRecords
};
```
* The last step is to build the table calling the `buildTable` function of the builder.
