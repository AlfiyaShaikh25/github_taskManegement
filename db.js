const mysql = require('mysql2/promise');
console.log("📌 DATABASE_HOST:", process.env.DATABASE_HOST);
console.log("📌 DATABASE_NAME:", process.env.DATABASE_NAME);
console.log("📌 DATABASE_USER:", process.env.DATABASE_USER);
console.log("📌 DATABASE_PORT:", process.env.DATABASE_PORT || 3306);
const pool = mysql.createPool({
    host: process.env.DATABASE_HOST || process.env.MYSQL_ADDON_HOST,
    user: process.env.DATABASE_USER,  // Clever Cloud MySQL user
    password: process.env.DATABASE_PASSWORD,  // Clever Cloud MySQL password
    database: process.env.DATABASE_NAME,  // Clever Cloud MySQL database name
    port: process.env.DATABASE_PORT || 3306,  // Default MySQL port
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
