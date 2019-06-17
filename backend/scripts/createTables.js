const sqlite3 = require('sqlite3').verbose()
const path = require('path');
const RandomValues = require('./../api/utils/RandomValues');
const { forEach} = require('lodash')
let db = new sqlite3.Database(path.join(process.cwd(), 'db', 'database.sqlite'));

const table = []
let tableName = ""
const range = RandomValues.getInt(3, 7)

const createQuery = () => {

    let paramsStr = "";
    
    for( let i = 0 ; i < range ; i++ ){
        let str = RandomValues.getString(RandomValues.getInt(4, 7));
        let type = RandomValues.getInt(1, 6) > 3 ? "STRING": "INTEGER";
        table[i] ={str: str , type: type}
        paramsStr  += `\`${str}\` ${type},`
    }
   paramsStr = paramsStr.slice( 0, paramsStr.length-1)
   tableName = RandomValues.getString(15);

    return `CREATE TABLE ${tableName} (${paramsStr})`
    
}

const insertQuery = () => {
    let columns = table.reduce((res, val) => res + `${val.str}, `,"");
    let values = table.reduce((res, val) => res + `${val.type === 'STRING' ? `'${RandomValues.getString(RandomValues.getInt(4, 7))}'` : RandomValues.getInt(0, 2000)}, `,"");

    columns = columns.slice( 0, columns.length-2);
    values = values.slice( 0, values.length-2);
    return `INSERT INTO ${tableName}(${columns}) VALUES(${values})`;
   
}

 db.run(`${createQuery()}`);
 db.close();
setTimeout( () => {
    db = new sqlite3.Database(path.join(process.cwd(), 'db', 'database.sqlite'));
    for(let i = 0; i < 40; i++){
        db.run(`${insertQuery()}`, function(err) {
            if (err) {
              return console.log(err.message);
            }
            console.log(`dodano wiersz o id: ${i}`);
          });
    }
     db.close();
},4000)
