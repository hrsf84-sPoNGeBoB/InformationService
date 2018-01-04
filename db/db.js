const mysql = require('mysql');
const createTables = require('./schema.js');
const config = require('../config');

console.log('initializing DB');

const pool = mysql.createPool({
  connectionLimit: 2000,
  connectTimeout: 20000,
  aquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: config.SQL_HOST || 'localhost',
  port: 3306,
  user: process.env.dbUsername,
  password: process.env.dbPassword,
  database: 'youtube'
});


module.exports = pool;
