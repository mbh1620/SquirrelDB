
/*

    Query Functions used to Query Data

*/


const queryFunctions = {

    'numberQuery': numberQueryFunction,
    'stringQuery': stringQueryFunction,
    'dateQuery': dateQueryFunction,

}

function numberQueryFunction(inputData, queryField, queryValue, queryType) {

    /*

    Valid Number Queries:

        - Equals
        - Bigger Than
        - Less Than

    */

    var searchedRecord = []

    if (queryType == '=') {

        let obj2 = inputData.filter((o, i) => {

            if (o[queryField] == queryValue) {
                searchedRecord.push(o)
            }

        })

        return searchedRecord

    } else if (queryType == '>') {

        let obj2 = inputData.filter((o, i) => {

            if (o[queryField] > queryValue) {
                searchedRecord.push(o)
            }

        })

        return searchedRecord

    } else if (queryType == '<') {

        let obj2 = inputData.filter((o, i) => {

            if (o[queryField] < queryValue) {
                searchedRecord.push(o)
            }

        })

        return searchedRecord

    } else {

        var errorMessage = `'${queryType}' is not a valid Query Type!`

        throw new Error(errorMessage)

    }

}

function stringQueryFunction(inputData, queryField, queryString, queryType) {

    /* valid string queries:

           - Contains
           - Exact

       */

    var searchedRecord = []

    if (queryType == "Contains") {

        let obj2 = inputData.filter((o, i) => {
            if (Object.keys(o).includes(queryField)) {
                if (o[queryField].includes(queryString)) {
                    searchedRecord.push(o)
                }
            } else {

            }
        })

        return searchedRecord

    } else if (queryType == "Exact") {

        let obj2 = inputData.filter((o, i) => {
            if (Object.keys(o).includes(queryField)) {
                if (o[queryField] == queryString) {
                    searchedRecord.push(o)
                }
            } else {

            }
        })

        return searchedRecord

    } else {

        var errorMessage = `'${queryType}' is not a valid Query Type!`

        throw new Error(errorMessage)

    }

}

function dateQueryFunction(inputData, queryField, queryDate, queryType) {

    /* valid string queries:

            - Match = 
            - After >
            - Before <

        */

    var searchedRecord = []

    if (queryType == '=') {

        let obj2 = inputData.filter((o, i) => {
            if (Object.keys(o).includes(queryField)) {

                if (new Date(o[queryField]).toDateString() === new Date(queryDate).toDateString()) {
                    searchedRecord.push(o)
                }
            } else {

            }
        })

        return searchedRecord

    } else if (queryType == '>') {

        let obj2 = inputData.filter((o, i) => {
            if (Object.keys(o).includes(queryField)) {

                if (new Date(o[queryField]) > new Date(queryDate)) {
                    searchedRecord.push(o)
                }
            } else {

            }
        })

        return searchedRecord

    } else if (queryType == '<') {

        let obj2 = inputData.filter((o, i) => {
            if (Object.keys(o).includes(queryField)) {
                if (new Date(o[queryField]) < new Date(queryDate)) {
                    searchedRecord.push(o)
                }
            } else {

            }
        })

        return searchedRecord

    } else {

        var errorMessage = `'${queryType}' is not a valid Query Type!`

        throw new Error(errorMessage)

    }

}

module.exports = {

    queryFunctions

}