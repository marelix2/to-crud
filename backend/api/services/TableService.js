const { db } = require('./../../config/database.js')
const {isEqual} = require('lodash')

const getTables = () => {
  getTableNames.then((res) => {
    console.log("res",res);
  })

}

const getTableNames = new Promise((resolve, reject) => {

  const GET_TABLES = 'SELECT * FROM sqlite_master';

  const params = []


 db.all(GET_TABLES, params, async  (err, tables) => {
      const tab =  tables.map((table) => table.name).filter((name) => !isEqual(name , 'sqlite_sequence' ));
    
      if(err){
        reject(err)
      }else{
        resolve(tab)
      }
  })

})
  

module.exports = {
  getTableNames,
  getTables
};