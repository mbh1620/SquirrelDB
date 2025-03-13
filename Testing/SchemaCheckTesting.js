const { SchemaCheck } = require('../SchemaCheck')




//SchemaCheck Testing

var schemaDefinition = {

    'firstName':'string',
    'age':'number',
    'profileFile':'fileLink'

}

var putRecord = {

    'firstName':'Matthew',
    'age':26,
    'profileFile':'./Matthew.jpeg'

}

var schemaCheck1 = new SchemaCheck(schemaDefinition, putRecord)

schemaCheck1.runCheck()