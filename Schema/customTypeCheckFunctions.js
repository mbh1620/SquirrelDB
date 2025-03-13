
/*

    Schema Custom Type Check Functions

    Lambda Functions used to check a custom type


*/


var customTypeCheckFunctions = {

    'fileLink': fileLinkCheckFunction,
    'webLink':  webLinkCheckFunction,
    'date': dateCheckFunction,
    'embeddedQueryObject':function(){},
    'latitude':function(){},
    'longitude':function(){}

}

function fileLinkCheckFunction(checkValue){

    if(typeof(checkValue) == 'string'){

        if(checkValue.includes('/') && checkValue.includes('.')){

            return true

        } else {

            return false

        }
 
    } else {

        return false

    }

}

function webLinkCheckFunction(checkValue){

    if(typeof(checkValue) == 'string'){

        if(checkValue.includes('http://') || checkValue.includes('https://')){

            return true

        } else {

            return false

        }
 
    } else {

        return false

    }

}

function dateCheckFunction(checkValue){

    var date = new Date(checkValue)

    if(date == 'Invalid Date'){

        return false

    } else {

        return true

    }

}

module.exports = {

    customTypeCheckFunctions

}