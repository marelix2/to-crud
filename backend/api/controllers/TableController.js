const {db} = require('./../../config/database.js')


const TableController = () => {

  getUsers =  (req, res, next) => {
    const sql = "select * from user"
    const params = []

    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
    }

   const getUser =  (req, res, next) => {
      var sql = "select * from user where id = ?"
      var params = [req.params.id]
      db.get(sql, params, (err, row) => {
          if (err) {
            res.status(400).json({"error":err.message});
            return;
          }
          res.json({
              "message":"success",
              "data":row
          })
        });
      }

  return {
    getUsers,
    getUser
}

}


module.exports = TableController;