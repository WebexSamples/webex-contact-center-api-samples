/**
 * This file has the code that enables us to connect to the database.
 * We can externalize the dialect and storage in ENV variables but have hardcoded them here for understanding
 */
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();

// Connect to database
// This can be changed by initializing a dialect of your choice. MySQL / PostGreSQL / other
module.exports.db = new Sequelize({
  dialect: 'sqlite',
  storage: './db/db.sqlite',
});
