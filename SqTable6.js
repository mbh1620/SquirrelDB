
const { QueryObject } = require('./Query/QueryObject')
var {Table, BaseTable} = require('./SquirrelDBTable')
// const {testingCleanup} = require('./testingCleanup')

//Edit Table Test (Editing the table meta data)

var userObject = {

    id:'03be6ac8-470e-4489-96ad-0eddb7ecd1d2'

}

// var table1 = Table.createTable('dateTable', userObject, {

//     'firstName':'string',
//     'age':'number',
//     'dateOfIncident':'date'

// })


// table1.putRecord(userObject, {

//     'firstName':'Matthew',
//     'age':27,
//     'dateOfIncident': '07/16/25'
// })

// var updatedRecord = table1.getRecords()[0]

// console.log(BaseTable.getBaseTable(userObject).getRecords())

// var table1 = Table.getTable(userObject, 'f99ff067-c600-469d-a7f6-25ac9b2eef51')



// var updatedData = table1.data

// updatedData['tableName'] = 'newTableName'

// table1.updateTable(userObject, updatedData)

// console.log(table1.data)

console.log(BaseTable.getBaseTable(userObject).getRecords())

// testingCleanup()