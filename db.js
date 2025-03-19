const mysql = require('mysql2/promise');
console.log("📌 DATABASE_HOST:", process.env.DATABASE_HOST);
console.log("📌 DATABASE_NAME:", process.env.DATABASE_NAME);
console.log("📌 DATABASE_USER:", process.env.DATABASE_USER);
console.log("📌 DATABASE_PORT:", process.env.DATABASE_PORT || 3306);
const pool = mysql.createPool({
    host: 'bcilwk6xw2vrztfpngbg-mysql.services.clever-cloud.com',
    user: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASSWORD,  
    database: process.env.DATABASE_NAME, 
    port: process.env.DATABASE_PORT || 3306, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(connection => {
        console.log('✅ Database connection established successfully');
        connection.release(); // Release connection back to the pool
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err);
        process.exit(1); // Stop the app if the DB connection fails
    });

module.exports = pool;
