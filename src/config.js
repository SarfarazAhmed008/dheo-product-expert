require('dotenv').config();

module.exports = {
    facebook: {
        appId: process.env.APP_ID,
        appSecret: process.env.APP_SECRET,
        pageId: process.env.PAGE_ID,
        accessToken: process.env.ACCESS_TOKEN
    },
    postgres: {
        // connectionString: process.env.POSTGRES_URL + "?sslmode=require",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    openai: {
        apiKey: process.env.API_KEY
    }
};
