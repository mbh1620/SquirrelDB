
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
//     'dateOfIncident':'date',

// })

// var table2 = Table.createTable('Incidents', userObject, {

//     'incident':'string',
//     'personInvolved':'embeddedQueryObject'

// })

// table2.putRecord(userObject, {

//     'incident':'incident1',
//     'personInvolved':QueryObject.createQueryObject('f2f14ffe-25ad-4fa3-bba9-492dfce4428b', [['firstName', 'Exact', 'Matthew']])

// })


// table1.putRecord(userObject, {

//     'firstName':'Matthew',
//     'age':27,
//     'dateOfIncident': '07/16/25',
    
// })

var bt = BaseTable.getBaseTable(userObject)

var t1 = Table.getTable(userObject, 'f2f14ffe-25ad-4fa3-bba9-492dfce4428b')

var t2 = Table.getTable(userObject, '56d39129-7b03-4120-b2dd-d2c86206431e')


// t1.putRecord(userObject, {

//     'firstName':'Derrick',
//     'age':42,
//     'dateOfIncident':'08/23/25'

// })

console.log(t2.getRecords()[0].personInvolved.data)

console.log(new QueryObject(t2.getRecords()[0].personInvolved.data).runQuery(userObject))

// var queryObject = QueryObject.createQueryObject('f2f14ffe-25ad-4fa3-bba9-492dfce4428b', [['age', '>', 20],
//                                                                                          ['age', '<', 50]])

// queryObject.runQuery(userObject)

// console.log(queryObject.sortQueryResults(userObject, 'dateOfIncident'))

// console.log(queryObject.runQuery(userObject))

// var t1 = Table.getTable(userObject, "818883cb-5157-420d-bb0d-295e64bd1aca")

// console.log(t1)