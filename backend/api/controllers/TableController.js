const sequelize = require('../../config/database');
const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('http-status-codes');
const query = require('./../utils/queries');

const TableController = () => {

  getTables = async (req, res) => {
    const tableNames = await getTableNames();

    try {
      let tables = [];
      for (let i = 0; i < tableNames.length; i++) {
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
        .json({ msg: 'Error while connecting to database (getTables, TableController)' });
    }

  }

  getTableNames = async () => {

    let tableNames = await sequelize.query("SELECT name FROM sqlite_master WHERE type = 'table'")
    tableNames = tableNames['0'];
    tableNames = tableNames.map(object => object.name).filter(object => !object.includes('sqlite_sequence'))

    return tableNames;
  }

  updateRow = async (req, res) => {
    try {
      const { values, id, headers, tableName } = req.body;

      //TODO: type validation on update

      let info = await sequelize.query(`Select * FROM ${tableName};`);

      if (info[0].length === 0) {
        return res.status(NOT_FOUND)
          .json({ msg: 'brak wieksza' });
      }

      info = info[0]

      const keys = Object.keys(info[0]);
      const valueToUpdate = info[id];

      const changes = values.map((val, index) => ({ cell: val, id: index }))
        .filter((val, index) => val.cell.name !== valueToUpdate[keys[index]])

      if (changes.length === 0) {
        return res.status(OK).json({ msg: "brak zmian" });
      }

      let qq = await sequelize.query(query.getUpdateQuery(keys, changes, tableName, valueToUpdate));
      return res.status(OK).json({ msg: "operacja zakończona sukcesem" });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR)
        .json({ msg: 'Error while connecting to database (updateRow, TableController)' + error });
    }

  }

  deleteRow = async (req, res) => {
    try {
      const { id, tableName } = req.body;

      //TODO: type validation on update

      let info = await sequelize.query(`Select * FROM ${tableName};`);

      if (info[0].length === 0) {
        return res.status(NOT_FOUND)
          .json({ msg: 'brak wieksza' });
      }

      info = info[0]
      const valueToDelete = info[id];

      let qq = await sequelize.query(query.getDeleteQuery(tableName, valueToDelete));
      return res.status(OK).json({ msg: "operacja zakończona sukcesem" });
    } catch (error) {
      return res.status(INTERNAL_SERVER_ERROR)
        .json({ msg: 'Error while connecting to database (deleteRow, TableController)' + error });
    }

  }


  insertRow = async (req, res) => {
    try {
    const { values, id, headers, tableName } = req.body;

    let info = await sequelize.query(`Select * FROM ${tableName};`);

    console.log(query.getInsertQuery(tableName,headers, values))

    const keys = Object.keys(info[0]);
    const valueToUpdate = info[id];

    let qq = await sequelize.query(query.getInsertQuery(tableName,headers, values));


    return res.status(OK).json({ msg: "operacja zakończona sukcesem" });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR)
      .json({ msg: 'Error while connecting to database (insertRow, TableController)' + error });
  }
}

getTableHeaders = async (req, res) => {
  try {
    const { tableName } = req.body;

    const queryString = `PRAGMA TABLE_INFO(${tableName})`
    const headers = await sequelize.query(queryString).then((response) => {
      const cols = Object.keys(response).map((col) => {
        return {
          name: col,
          type: response[col].type,
          isPrimary: response[col].primaryKey
        }
      })
      return cols;
    })

    return res.status(OK).json({ headers });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR)
      .json({ msg: 'Error while connecting to database (getTableHeaders, TableController)' + error });
  }
}

getTableRows = async (req, res) => {
  try {
    const { tableName } = req.body;

    let rows = await sequelize.query(`Select * FROM ${tableName};`);
    rows = rows[0];

    return res.status(OK).json({ rows });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR)
      .json({ msg: 'Error while connecting to database (getTables, TableController)' });
  }
}



return {
  getTables,
  insertRow,
  updateRow,
  deleteRow,
  getTableRows,
  getTableHeaders
}
}


module.exports = TableController;