const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
let sql = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_POR,
})


sql.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    else console.log("Database connected successfully");
})

module.exports = sql