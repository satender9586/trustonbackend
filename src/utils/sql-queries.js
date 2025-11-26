require("dotenv").config();

// create database if not exists
const createDatabase = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`;

// select database
const useDatabase = `USE ${process.env.DB_NAME}`;

// create users tables is not exists
const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
    userId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) DEFAULT NULL,
    emailId VARCHAR(50) NOT NULL UNIQUE,
    phoneNumber VARCHAR(15) NOT NULL CHECK (phoneNumber REGEXP '^\\+?[0-9]{10,15}$'),
    role ENUM('admin', 'employee', 'customer') DEFAULT 'customer',
    password VARCHAR(255) NOT NULL,
    status BOOLEAN DEFAULT TRUE,
    isVerified BOOLEAN DEFAULT FALSE,
    avatar VARCHAR(255),
    accessToken VARCHAR(500) DEFAULT NULL,
    refreshToken VARCHAR(500) DEFAULT NULL,
    otp VARCHAR(10) DEFAULT NULL,
    otpExpiresAt DATETIME DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;

// create addresses tables is not exists
const createAddressTable = `CREATE TABLE IF NOT EXISTS addresses (
    addressId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    houseNo VARCHAR(50) NOT NULL,
    street VARCHAR(100) NOT NULL,
    landmark VARCHAR(100),
    area VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL CHECK (pincode REGEXP '^[0-9]{6}$'),
    fullAddress TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);
`;


module.exports = { createDatabase, useDatabase ,createUsersTable,createAddressTable};
