
const { QueryObject } = require('./Query/QueryObject')
var {Table, BaseTable} = require('./SquirrelDBTable')
// const {testingCleanup} = require('./testingCleanup')

var userObject = {

    id:'03be6ac8-470e-4489-96ad-0eddb7ecd1d2'

}

var bt = BaseTable.getBaseTable(userObject)

var table1 = Table.getTable(userObject, '4b357004-1d67-4f09-a4fa-842e468e268e')

var userObject2 = {

    id:'03be6ac8-470e-4489-96ad-0'

}

console.log(table1.data.schemaDefinition)

table1.putRecord(userObject2, {

    'firstName':'Jane',
    'age':32,
    'lastName':'Denton'

})

console.log(table1.getRecords())


