const mysql = require('mysql');
const createTables = require('./schema.js');
//const config = require('../config');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  port: 3306,
  user: process.env.dbUsername,
  password: process.env.dbPassword,
  database: 'youtube'
});




module.exports = pool;
