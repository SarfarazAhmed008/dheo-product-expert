require('dotenv').config();

module.exports = {
    facebook: {
        appId: process.env.APP_ID,
        appSecret: process.env.APP_SECRET,
        pageId: process.env.PAGE_ID,
        accessToken: process.env.ACCESS_TOKEN
    },
    postgres: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
};
