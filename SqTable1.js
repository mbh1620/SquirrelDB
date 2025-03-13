
const { QueryObject } = require('./Query/QueryObject')
var {Table, BaseTable} = require('./SquirrelDBTable')
// const {testingCleanup} = require('./testingCleanup')

var userObject = {

    id:'03be6ac8-470e-4489-96ad-0eddb7ecd1d2'

}

var table1 = Table.createTable('table1', userObject, {

    'firstName':'string',
    'age':'number',
    'lastName':'string'

})

table1.putRecord(userObject, {

    'firstName':'Matthew',
    'age':27,
    'lastName':'Haywood'
})

var bt = BaseTable.getBaseTable(userObject)

console.log(bt.getRecords())

var query1 = new QueryObject('age', '>', 30)

var results = query1.runQuery(table1)

console.log(results)

// testingCleanup()