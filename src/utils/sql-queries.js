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
    pincode VARCHAR(10),
    fullAddress TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);
`;

// create services tables if not exits

const createServicesTable = `CREATE TABLE IF NOT EXISTS services (
    serviceId INT PRIMARY KEY AUTO_INCREMENT,
    serviceName VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    bannerImg VARCHAR(255),
    iconImg VARCHAR(255),
    trending BOOLEAN DEFAULT FALSE,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`
// create createServicesCetogoryTable tables if not exits
const createServicesCetogoryTable = `CREATE TABLE IF NOT EXISTS service_categories (
    categoryId INT PRIMARY KEY AUTO_INCREMENT,
    serviceId INT NOT NULL,
    categoryName VARCHAR(100) NOT NULL,  
    description TEXT,
    image VARCHAR(255),
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (serviceId) REFERENCES services(serviceId) ON DELETE CASCADE
);
`
// create servicesItemTable tables if not exits
const servicesItemTable = `CREATE TABLE IF NOT EXISTS service_items (
    itemId INT PRIMARY KEY AUTO_INCREMENT,
    categoryId INT NOT NULL,
    itemName VARCHAR(150) NOT NULL,    
    price DECIMAL(10,2) NOT NULL,
    shortDesc VARCHAR(255),
    image VARCHAR(255),
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoryId) REFERENCES service_categories(categoryId) ON DELETE CASCADE
);
`

// create servicesItemFeature tables if not exits
const servicesItemFeatureTable = `CREATE TABLE IF NOT EXISTS service_item_features (
    featureId INT PRIMARY KEY AUTO_INCREMENT,
    itemId INT NOT NULL,
    featureText VARCHAR(255) NOT NULL,
    FOREIGN KEY (itemId) REFERENCES service_items(itemId) ON DELETE CASCADE
);
`

// create booking table if not exists

const createBookingTable = `
   CREATE TABLE IF NOT EXISTS bookings (
    bookingId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NULL,   
    customerName VARCHAR(100) NOT NULL,
    customerPhone VARCHAR(15) NOT NULL,
    serviceCategoryId INT NOT NULL,
    serviceItemId INT NOT NULL,
    preferredDate DATE NOT NULL,
    preferredTimeSlot VARCHAR(50),
    bookingType ENUM('online', 'offline') DEFAULT 'online',
    status ENUM(
        'pending',
        'confirmed',
        'assigned',
        'in-progress',
        'completed',
        'cancelled'
    ) DEFAULT 'pending',

    expiresAt DATETIME NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE SET NULL,
    FOREIGN KEY (serviceCategoryId) REFERENCES service_categories(categoryId),
    FOREIGN KEY (serviceItemId) REFERENCES service_items(itemId)
);

`


// create complaintAddressTable tables is not exists
const complaintAddressTable = ` 
   CREATE TABLE IF NOT EXISTS booking_addresses (
    bookingAddressId INT PRIMARY KEY AUTO_INCREMENT,
    bookingId INT NOT NULL,
    userId INT NULL, 
    
    houseNo VARCHAR(50) NOT NULL,
    street VARCHAR(100) NOT NULL,
    landmark VARCHAR(100),
    area VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10),
    fullAddress TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (bookingId) REFERENCES bookings(bookingId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE SET NULL
);
`;

module.exports = { createDatabase, useDatabase ,createUsersTable,createAddressTable,
    createServicesTable,createServicesCetogoryTable,servicesItemTable,servicesItemFeatureTable,createBookingTable,complaintAddressTable}

