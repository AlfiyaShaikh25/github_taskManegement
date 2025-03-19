// require('dotenv').config();

// const mysql = require('mysql2/promise');
// console.log("📌 DATABASE_HOST:", process.env.DATABASE_HOST);
// console.log("📌 DATABASE_NAME:", process.env.DATABASE_NAME);
// console.log("📌 DATABASE_USER:", process.env.DATABASE_USER);
// console.log("📌 DATABASE_PORT:", process.env.DATABASE_PORT || 3306);
// const pool = mysql.createPool({
//     host: ENV.DATABASE_HOST,
//     user: ENV.DATABASE_USER,
//     password: ENV.DATABASE_PASSWORD,
//     database: ENV.DATABASE_NAME,
//     port: ENV.DATABASE_PORT,
//     connectionLimit: 10,
// });

// pool.getConnection()
//     .then(connection => {
//         console.log('✅ Database connection established successfully');
//         connection.release(); // Release connection back to the pool
//     })
//     .catch(err => {
//         console.error('❌ Database connection failed:', err);
//         process.exit(1); // Stop the app if the DB connection fails
//     });

// module.exports = pool;
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT
});

connection.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL Database!');
  }
});

export default connection;
