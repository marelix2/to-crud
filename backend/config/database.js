var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "./db/database.sqlite"

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message)
    throw err
  }
  console.log('Connected to the SQLite database.');
});

const createTable = () => {

  db.run(`CREATE TABLE IF NOT EXISTS user (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name text, 
          email text UNIQUE, 
          password text, 
          CONSTRAINT email_unique UNIQUE (email)
          )`,
    (err) => {
      if (err) {
        // Table already created
      } else {
        // Table just created, creating some rows
       
      }
    }
  );
}

const dropTable = () => {
  const drop  ='DROP TABLE user'
  db.run(drop);
}

const insertInitData = () => {

  var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
  db.run(insert, ["admin", "admin@example.com", md5("admin123456")])
  db.run(insert, ["user", "user@example.com", md5("user123456")])
  db.run(insert, ["mirek", "mirek@mirek.com", md5("user123456")])
}

module.exports = {
  db,
  createTable,
  insertInitData,
  dropTable
}
