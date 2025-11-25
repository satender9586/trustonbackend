require("dotenv").config()

// create database
const createDatabase = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`

// select database

const useDatabase = `USE ${process.env.DB_NAME}`

module.exports={createDatabase,useDatabase}