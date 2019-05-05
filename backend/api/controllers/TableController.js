const sequelize = require('../../config/database');
const { OK,INTERNAL_SERVER_ERROR } = require('http-status-codes');

const TableController = () => {

  getTables = async (req, res) => {
    const tableNames = await getTableNames();

    try {
      let tables = [];
      for(let i = 0 ; i <tableNames.length ; i++ ) {
      const queryString = `PRAGMA TABLE_INFO(${tableNames[i]})`
       const a = await sequelize.query(queryString).then((response) => {
          const columns = Object.keys(response).map((col) => {
            return {
              name: col,
              type: response[col].type,
              isPrimary: response[col].primaryKey
            }

          })
          return {
            tableName: tableNames[i],
            columns: columns
          }
        })
        tables.push(a);
      }
      return res.status(OK).json({ tables });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR)
        .json({ msg:'Error while connecting to database (getTables, TableController)'});
    }

  }

  getTableNames = async () => {
   
    let tableNames = await sequelize.query("SELECT name FROM sqlite_master WHERE type = 'table'")
    tableNames = tableNames['0'];
    tableNames = tableNames.map(object => object.name).filter(object => !object.includes('sqlite_sequence'))
   
    return tableNames;
  }

  return {
    getTables
  }
}


module.exports = TableController;