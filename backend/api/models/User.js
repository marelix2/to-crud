const { STRING, DATE } = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {
};

const tableName = 'Users';

const User = sequelize.define('User', {
    username: {
        type: STRING,
        unique: true,
    },
    name: {
        type: STRING,
    },
    surname: {
        type: STRING,
    },
    register_date: {
        type: DATE
    },
    last_login_date: {
        type: DATE
    }
}, { hooks, tableName });

// eslint-disable-next-line
User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
};

module.exports = User;
