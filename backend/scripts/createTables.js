const sqlite3 = require('sqlite3').verbose()
const path = require('path');
const RandomValues = require('./../api/utils/RandomValues');
const { forEach} = require('lodash')
var db = new sqlite3.Database(path.join(process.cwd(), 'db', 'database.sqlite'));

const query = () => {
    const params = RandomValues.getInt(4, 7);
    const types = ["INTEGER",
        "TEXT",
        "BLOB",
        "REAL",
         "NUMERIC"]

    let paramsStr = types.reduce((result, value) => result + ` \`${RandomValues.getString(RandomValues.getInt(4, 7))}\` ${value},`, "")
    paramsStr = paramsStr.slice( 0, paramsStr.length-1)
    return `CREATE TABLE ${RandomValues.getString(15)} (${paramsStr})`
    
}

db.run(`${query()}`);
db.close();