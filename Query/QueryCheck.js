
/*

    A Query Check is used to check that the query Field is a custom type and is in the schema.
    It also retrieves the relevant custom query function.

*/

const { schemaCustomTypeNames } = require("../Schema/schemaCustomTypeNames")

class QueryCheck {

    constructor(schemaDefinition, searchKey){

        this.schemaDefinition = schemaDefinition
        this.searchKey = searchKey

    }

    runQueryCheck(){

        if(schemaCustomTypeNames.includes(this.schemaDefinition[this.searchKey])){

            //The type is a custom type so a custom type query function is required

            var queryType = this.schemaDefinition[this.searchKey]

            var returnValue;

            switch(queryType){

                case 'fileLink':
                    returnValue = 'stringQuery';
                    break;
                case 'date':
                    returnValue = 'dateQuery';
                    break;
                case 'latitude':
                    returnValue = 'numberQuery';
                    break;
                case 'longitude':
                    returnValue = 'numberQuery';
                    break
            }

            return returnValue

        } else {

            //Check which standard type it is

            var queryType = this.schemaDefinition[this.searchKey]

            if(queryType == 'string'){

                return 'stringQuery'

            } else if (queryType == 'number'){

                return 'numberQuery'

            } else if (queryType == 'object'){

                return 'objectQuery'

            } else {

                throw TypeError(`Type ${queryType} is not recognised!`)

            }
        }
    }
}

module.exports = {

    QueryCheck

}