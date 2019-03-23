const { db } = require('./../../config/database.js')


const TableController = () => {

  const getUsers = (req, res, next) => {
    const sql = "select * from user"
    const params = []

    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({
        "message": "success",
        "data": rows
      })
    });
  }

  const getUser = (req, res, next) => {
    const sql = "select * from user where id = ?"
    const params = [req.params.id]
    console.log(req.params)
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({
        "message": "success",
        "data": row
      })
    });
  }

  return {
    getUsers,
    getUser
  }

}


module.exports = TableController;