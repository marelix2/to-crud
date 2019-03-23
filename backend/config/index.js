const publicRoutes = require('./routes/publicRoutes');

const config = {
    migrate: true,
    apiPath: '/api',
    publicRoutes,
    port: process.env.PORT || '4200',
};

module.exports = config;