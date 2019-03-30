var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');
const config = require('./config/');
const {createTable, insertInitData,dropTable} = require('./config/database');

const environment = 'development';

console.log(`\n\n Server is running on: localhost:${config.port} \n\n`);

const app = express();
const server = http.Server(app);
const mappedOpenRoutes = mapRoutes(config.publicRoutes, 'api/controllers/');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(`${config.apiPath}/public`, mappedOpenRoutes);

const {getTables} = require('./api/services/TableService')

server.listen(config.port, () => {

  getTables();

  if(!config.migrate){
    dropTable();
    createTable();
    insertInitData();
  }
});

module.exports = app;