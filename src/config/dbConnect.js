const mysql = require("mysql2/promise");
require("dotenv").config();
const { createDatabase, useDatabase,createUsersTable ,createAddressTable} = require("./../utils/sql-queries.js");

const initialPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  connectionLimit: 10,
  dateStrings: true,
});


let appPool;

async function funDb() {
  try {
    await initialPool.query("SELECT 1");
    console.log("Connected to MySQL server");

    await initialPool.query(createDatabase);
    console.log("Database created/checked");

  
    appPool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      connectionLimit: 10,
      dateStrings: true,
    });

    await appPool.query(useDatabase);
    await appPool.query(createUsersTable);
    await appPool.query(createAddressTable);
    console.log(`Using database: ${process.env.DB_NAME}`);
  } catch (err) {
    console.error("DB Error:", err.message);
  }
}


async function queryAsync(query, values=[]) {
  try {
    const [rows] = await appPool.query(query, values);
    return rows;
  } catch (error) {
    throw new Error("Query failed: " + error.message);
  }
}

module.exports = { funDb, queryAsync };
