const sequelize = require('../../config/database');
const { OK,INTERNAL_SERVER_ERROR } = require('http-status-codes');

const TableController = () => {

  getTables = async (req, res) => {
    const tableNames = await getTableNames();

    try {
      let queryString = `PRAGMA TABLE_INFO(${tableNames[0]})`

      const tables = await sequelize.query(queryString).then((response) => {
        console.log(response);
      });

      return res.status(OK).json({ tables });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR)
        .json({ msg:'Error while connecting to database (getTables, TableController)'});
    }

    console.log(aa);
    //sequelize.query("PRAGMA TABLE_INFO(lorem);").then(res => console.log(res))
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