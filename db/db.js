const mysql = require('mysql');
const createTables = require('./schema.js');
const config = require('../config');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'mysqldb.coxqxml1wk9k.us-east-2.rds.amazonaws.com',
  port: 3306,
  user: config.dbUsername,
  password: config.dbPassword,
  database: 'mysqldb'
});




module.exports = pool;
