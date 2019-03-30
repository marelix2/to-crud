const Sequelize = require('sequelize');
const path = require('path');

const database = new Sequelize(
    'databasename',
    'username',
    'password',
    {
        host: 'localhost',
        dialect: 'sqlite',
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
        storage: path.join(process.cwd(), 'db', 'database.sqlite'),
    },
);

module.exports = database