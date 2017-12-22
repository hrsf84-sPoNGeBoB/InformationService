const mysql = require('mysql');
const createTables = require('./schema.js');

const pool = mysql.createPool({
  connectionLimit : 100,
  host     : 'mysqldb.coxqxml1wk9k.us-east-2.rds.amazonaws.com',
  port      :  3306,
  user     : 'bomc13',
  password : 'oderay13',
  database : 'mysqldb'
});




module.exports = pool;

