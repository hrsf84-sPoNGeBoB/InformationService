//INSERT INTO users (user_email) VALUES ('ab1@abeugo.ms');


'use strict';
const Faker = require('faker');
const mysql = require('mysql');
const config = require('../config');


const pool = mysql.createPool({
  connectionLimit: 100,
  host: config.SQL_HOST || 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'youtube'
});


function generateRandomData(userContext, events, done) {
  // generate data with Faker:
  const channel = Faker.name.findName();
  const email = 'r12erfg5' + Faker.internet.exampleEmail();
  const id = '22';
  const dbquery = `INSERT INTO users (user_email) VALUES ('${email}')`;
  pool.query(dbquery, function(err, result) {
    if (err) {
      console.log(err, 'Error inserting to users');
    } else {
      console.log(result, 'inserted data to users');
    }

  });
  // add variables to virtual user's context:
  userContext.vars.email = email;
  userContext.vars.channel_id = channel;
  userContext.vars.id_num = id;
  // continue with executing the scenario:
  return done();
}

module.exports = {
  generateRandomData
};

