// A Table class is used to store the member functions

var uuid = require('uuid')
var fs = require('fs-extra')
var path = require('path')
var lockfile = require('proper-lockfile')
const { SchemaCheck } = require('./Schema/SchemaCheck')

var rootPath = './public/'

class Table {

    constructor(data){

        //Data Structure looks like the following

        /*
            id:id,
		    tableName:tableName,
		    ownerId:ownerId,
		    userFolder:userFolder,
		    schemaDefinition:schemaDefinition,
		    DBFilePath:path.join(userFolder, id+'.json')

        */

        this.data = data

    }

    putRecord(userObject, putRecord){

        var checkedRecord = this.checkRecordAgainstSchema(putRecord)

        if(checkedRecord){

            this.inputRecordtoFile(userObject, checkedRecord)
        
        }

    }

    updateRecord(userObject, updatedRecord){

        var checkedRecord = this.checkRecordAgainstSchema(updatedRecord)

        if(checkedRecord){

            this.updateRecordToFile(userObject, checkedRecord)

        }

    }

    deleteRecord(userObject, recordId){

        var data = JSON.parse(fs.readFileSync(path.join(rootPath, this.data.DBFilePath)))

		let obj2 = data.records.filter((o, i) => {
			if (Object.keys(o).includes('recordId')) {
				if (o['recordId'] == recordId) {            
					data.records.splice(i, 1)
				}
			} else {
				//Not Found Record
			}
		})

		data = JSON.stringify(data)

		fs.writeFileSync(path.join(rootPath, this.data.DBFilePath), data)

    }

    getRecords(){

        var data = JSON.parse(fs.readFileSync(path.join(rootPath, this.data.DBFilePath)))

        return data.records

    }

    inputRecordtoFile(userObject, checkedRecord){

        checkedRecord['recordId'] = uuid.v4()
        checkedRecord['dateTime'] = new Date().toISOString();
        checkedRecord['authorId'] = userObject.id

        lockfile.lockSync(path.join(rootPath, this.data.DBFilePath))

        var data = JSON.parse(fs.readFileSync(path.join(rootPath, this.data.DBFilePath)))

        data.records.push(checkedRecord)

        fs.writeFileSync(path.join(rootPath, this.data.DBFilePath), JSON.stringify(data))

        lockfile.unlockSync(path.join(rootPath, this.data.DBFilePath))

        return checkedRecord

    }

    updateRecordToFile(userObject, checkedRecord){

        var data = JSON.parse(fs.readFileSync(path.join(rootPath, this.data.DBFilePath)))
        var recordId = checkedRecord.recordId

        var index;

		let obj2 = data.records.filter((o, i) => {
			if (Object.keys(o).includes('recordId')) {
				if (o['recordId'] == recordId) {            
					index = i
				}
			} else {
				//Not Found Record
			}
		})

		data.records.splice(index, 1, checkedRecord)
		
		data = JSON.stringify(data)

    	fs.writeFileSync(path.join(rootPath, this.data.DBFilePath), data);

    }

    getSchemaDefinition(){

        return this.data.schemaDefinition

    }

    checkRecordAgainstSchema(putRecord){

        var schemaCheck1 = new SchemaCheck(this.data.schemaDefinition, putRecord)
        
        schemaCheck1.runCheck()

        return putRecord;

    }

    static createDatabaseFile(DBFilePath){

        fs.writeFileSync(path.join(rootPath, DBFilePath), '{"records":[]}')

    }

    static createTable(tableName, userObject, schemaDefinition){
        
        var ownerId = userObject.id
        var id = uuid.v4()
        var userFolder = `/${ownerId}/Database/`

        var data = {

            id:id,
		    tableName:tableName,
		    ownerId:ownerId,
		    userFolder:userFolder,
		    schemaDefinition:schemaDefinition,
		    DBFilePath:path.join(userFolder, id+'.json')

        }

        data.schemaDefinition['recordId'] = 'string'
        data.schemaDefinition['dateTime'] = 'date'
        data.schemaDefinition['authorId'] = 'string'

        Table.checkPathExists(path.join(rootPath, data.userFolder))
        var baseTable = Table.checkGetCreateBaseTable(userObject)
        Table.createDatabaseFile(data.DBFilePath)

        baseTable.putRecord(userObject, data)

        return new Table(data)

    }

    updateTable(userObject, updatedData){

        var bt = BaseTable.getBaseTable(userObject)

        bt.updateRecord(userObject, updatedData)
        
        this.data = updatedData

    }

    deleteTable(userObject){

        var bt = BaseTable.getBaseTable(userObject)

        bt.deleteRecord(userObject, this.data.recordId)

        delete this

    }

    static checkPathExists(path){

		if(fs.existsSync(path)){
			
			return true

		} else {
			
			fs.mkdirSync(path, {recursive:true})

		}

	}

    static checkGetCreateBaseTable(userObject){

        if(fs.existsSync(path.join(rootPath, `/${userObject.id}/Database/`, 'BASEDB.json'))){

			return BaseTable.getBaseTable(userObject)

		} else {

			return BaseTable.createBaseTable(userObject)

		}

    }

    static checkBaseTableExists(userObject){

        if(fs.existsSync(path.join(rootPath, `/${userObject.id}/Database/`, 'BASEDB.json'))){

			return true

		} else {

			return false

		}

    }

    static getTable(userObject, tableId){

        var bt = BaseTable.getBaseTable(userObject)

        var records = bt.getRecords()

        var tableRecord;

        let obj2 = records.filter((o, i) => {
			if (Object.keys(o).includes('id')) {
				if (o['id'] == tableId) {            
					tableRecord = o
				}
			}
        })

        if(tableRecord != undefined){

            var t1 = new Table(tableRecord)

            return t1

        } else {

            throw Error("Table not found!")

        }
        
    }

}

class BaseTable extends Table {

    constructor(data){

        super(data)

    }

    static getBaseTable(userObject){

        var filePath = `/${userObject.id}/Database/BASEDB.json`

        var data = JSON.parse(fs.readFileSync(path.join(rootPath, filePath)))

        var searchedRecord = []

        let obj2 = data.records.filter((o, i) => {
            if (Object.keys(o).includes('id')) {
                if (o['id'] == 'BASEDB') {
                    searchedRecord.push(o)
                }
            } else {
    
            }
        })

        var bt1 = new BaseTable(searchedRecord[0])

        return bt1
    }

    static createBaseTable(userObject){

        var baseSchema = {

            'id':'string',
            'tableName':'string',
            'ownerId':'string',
            'userFolder':'string',
            'schemaDefinition': 'object',
            'DBFilePath':'fileLink',
            'recordId':'string',
            'dateTime':'date',
            'authorId':'string'

        }

        var id = 'BASEDB'
        var userFolder = `/${userObject.id}/Database/`

        var data = {

            id:id,
		    tableName:'BASEDB',
		    ownerId:userObject.id,
		    userFolder:userFolder,
		    schemaDefinition:baseSchema,
		    DBFilePath:path.join(userFolder, id+'.json')

        }
        
        data.DBFilePath = path.join(data.userFolder, 'BASEDB.json')

        Table.createDatabaseFile(data.DBFilePath)

        var bt1 = new BaseTable(data)

        bt1.putRecord(userObject, data)

        return bt1

    }

}

module.exports = {

    Table,
    BaseTable

}