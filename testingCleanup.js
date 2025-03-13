//Clean up after testing

var fs = require('fs-extra')

function testingCleanup(){

    if (fs.existsSync('./public')){

        fs.rmSync('./public', {recursive:true})
    
    } else {
    
        console.log('nothing to delete')
    
    }

}

testingCleanup();

module.exports = {

    testingCleanup

}


