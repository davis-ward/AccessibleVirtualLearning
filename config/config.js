module.exports = {
    development: {
        username: process.env.SQL_USERNAME,
        database: 'accecssi_portal',
        host: '167.88.15.112',
        password: process.env.SQL_PASSWORD,
        dialect: 'mysql',
    },
};
