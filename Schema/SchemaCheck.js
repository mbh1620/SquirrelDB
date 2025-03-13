const { customTypeCheckFunctions } = require('./customTypeCheckFunctions')
const { schemaCustomTypeNames } = require('./schemaCustomTypeNames')


class SchemaCheck {

    /*

    SchemaCheck object is used to run a check on an input record to check that the
    input record follows the schema pattern.

    */

    constructor(schemaDefinition, putRecord){

        this.schemaDefinition = schemaDefinition
        this.putRecord = putRecord

    }

    runCheck(){

        var schemaKeys = Object.keys(this.schemaDefinition)
        var recordEntryKeys = Object.keys(this.putRecord)

        var outputObject = {}

        for(var i = 0; i < recordEntryKeys.length; i++){

            if(schemaKeys.includes(recordEntryKeys[i])){

                /*

                SchemaDefinition contains the record entry key, now check that the 
                value is either a custom type or a standard type.

                */
            
                if(schemaCustomTypeNames.includes(this.schemaDefinition[schemaKeys[i]])){

                    //Type is a custom type, get the relevant custom type check function

                    var relevantTypeCheckFunction = customTypeCheckFunctions[this.schemaDefinition[schemaKeys[i]]]

                    if(relevantTypeCheckFunction(this.putRecord[recordEntryKeys[i]]) == true){

                        outputObject[recordEntryKeys[i]] = true

                    } else if (relevantTypeCheckFunction(this.putRecord[recordEntryKeys[i]]) == false){

                        outputObject[recordEntryKeys[i]] = false

                    }
                    

                } else {

                    //Type is a standard type, check against standard types

                    if(this.checkAgainstStandardTypes(this.putRecord[recordEntryKeys[i]], this.schemaDefinition[schemaKeys[i]])){

                        outputObject[recordEntryKeys[i]] = true

                    } else {

                        outputObject[recordEntryKeys[i]] = false

                    }

                }

            } else {

                var errorMessage = `Record field does not match schema: ${recordEntryKeys[i]} is not in schema fields!`

                throw TypeError(errorMessage)

            }

        }

        if(Object.values(outputObject).includes(false)){

            var valueString = "\n\n"

            for(var i = 0; i < Object.values(outputObject).length; i++){

                valueString += Object.keys(outputObject)[i] + ": " + Object.values(outputObject)[i] + "\n"

            }

            var errorMessage = `Records values do not match Schema Types! `+ valueString

            throw TypeError(errorMessage)

        } else {

            return outputObject

        }

    }

    checkAgainstStandardTypes(record, type){

        if(typeof(record)==type){

            return true

        } else {

            return false

        }
    }
}

module.exports = {

    SchemaCheck

}