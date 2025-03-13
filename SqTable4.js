
const { QueryObject } = require('./Query/QueryObject')
var {Table, BaseTable} = require('./SquirrelDBTable')
// const {testingCleanup} = require('./testingCleanup')

//Update Record Test

var userObject = {

    id:'03be6ac8-470e-4489-96ad-0eddb7ecd1d2'

}

var table1 = Table.createTable('dateTable', userObject, {

    'firstName':'string',
    'age':'number',
    'dateOfIncident':'date'

})


table1.putRecord(userObject, {

    'firstName':'Matthew',
    'age':27,
    'dateOfIncident': '07/16/25'
})

var updatedRecord = table1.getRecords()[0]

updatedRecord['age'] = 45

table1.updateRecord(userObject, updatedRecord)

// var bt = BaseTable.getBaseTable(userObject)

// console.log(bt.getRecords())

var query1 = new QueryObject('dateOfIncident', '>', '03/16/25')

var results = query1.runQuery(table1)

console.log(results)

// testingCleanup()