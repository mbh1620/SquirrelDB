
/*

    Query Object is an object which represents a singular query

*/

const { QueryCheck } = require("./QueryCheck");
const { queryFunctions } = require('./queryFunctions')
const { sortFunctions } = require('./sortFunctions')
const {Table} = require('../SquirrelDBTable')

class QueryObject {

    constructor(data){

        this.data = data

    }

    static createQueryObject(tableId, arrayOfQueryObjects){

        var queryResults;

        var data = {

            'tableId':tableId,
            'arrayOfQueryObjects':arrayOfQueryObjects,          /*      [[queryField, queryType, queryString],
                                                                         [queryField, queryType, queryString],
                                                                         [queryField, queryType, queryString]]
                                                                */
            'queryResults': queryResults
        }  
        
        var q1 = new QueryObject(data)

        return q1


    }

    runSingleQuery(inputRecords, queryObject, schemaDefinition){

        var queryField = queryObject[0]
        var queryType = queryObject[1]
        var queryString = queryObject[2]

        var qc1 = new QueryCheck(schemaDefinition, queryField)

        var correspondingQueryFunction = queryFunctions[qc1.runQueryCheck()]

        this.data.queryResults = correspondingQueryFunction(inputRecords, queryField, queryString, queryType)

        return this.data.queryResults

    }

    runQuery(userObject){

        //Get table data

        var table1 = Table.getTable(userObject, this.data.tableId)

        var inputRecords = table1.getRecords()

        var schemaDefinition = table1.data.schemaDefinition
        
        //Get Queries from array of Queries

        inputRecords = this.runSingleQuery(inputRecords, this.data.arrayOfQueryObjects[0], schemaDefinition)
        
        if(this.data.arrayOfQueryObjects.length > 1){

            for(var i = 1; i < this.data.arrayOfQueryObjects.length; i++){

                inputRecords = this.runSingleQuery(inputRecords, this.data.arrayOfQueryObjects[i], schemaDefinition)

            }

        }

        return this.data.queryResults

    }

    sortQueryResults(userObject, sortField){

        var dataToSort = this.data.queryResults

        var tableSchema = Table.getTable(userObject, this.data.tableId).data.schemaDefinition

        var sortFunction;

        switch(tableSchema[sortField]){

            case 'number':
                sortFunction = 'numberSort'
                break;
            case 'string':
                sortFunction = 'stringSort'
                break;
            case 'date':
                sortFunction = 'dateSort'
                break
            case 'latitude':
                sortFunction = 'numberSort'
                break
            case 'longitude':
                sortFunction = 'numberSort'
                break
        }

        var correspondingSortFunction = sortFunctions[sortFunction]

        var sortedData = correspondingSortFunction(dataToSort, sortField)
        
        return sortedData

    }

}

module.exports = {

    QueryObject

}