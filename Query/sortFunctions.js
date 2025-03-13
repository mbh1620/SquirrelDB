/*

    sort Functions used to sort query Data

*/

const sortFunctions = {

    'numberSort': numberSortFunction,
    'stringSort': stringSortFunction,
    'dateSort': dateSortFunction,

}

function numberSortFunction(inputData, sortField){

    let sortedData = inputData.sort((a, b) => {

        return a[sortField] - b[sortField]

    })

    return sortedData

}

function stringSortFunction(inputData, sortField){

    let sortedData = inputData.sort((a, b) => {

        return a[sortField].localeCompare(b[sortField])

    })

    return sortedData
}

function dateSortFunction(inputData, sortField){

    let sortedData = inputData.sort((a, b) => {

        return new Date(a[sortField]) - new Date(b[sortField])

    })

    return sortedData

}

module.exports = {

    sortFunctions

}