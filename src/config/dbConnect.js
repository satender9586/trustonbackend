const mysql = require("mysql2/promise");
require("dotenv").config()
const { createDatabase,useDatabase } = require("./../utils/sql-queries.js")


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 10,
    dateStrings: true
});


async function connectAsync() {
    try {
        await pool.query("SELECT 1")
        console.log("DB Connected", process.env.DB_NAME)
    } catch (error) {
        throw new Error("Something is wrong in db connected" + error.message)
    }

}

async function queryAsync(query) {
    try {
        const [rows] = await pool.query(query)
        return rows
    } catch (error) {
        throw new Error("Query failed: " + error.message);
    }
}

async function funDb() {
    try {
        await connectAsync()
        await queryAsync(createDatabase)
        await queryAsync(useDatabase)
    } catch (error) {
        console.error("Error: ", error.message);
    }
    finally {
        // pool.end()
    }
}

module.exports = { pool, funDb }