const express = require('express');
const router = express.Router();
const pool = require('../db/db.js');
const redis = require("redis");
const client = redis.createClient();
const randomString = require('../server/server_helpers/id_generator');


router.post('/', function(req, res) {

  var generateID = function() {
    randomString();
  };

  new Promise( (resolve, reject) => {
    while (randomString)

  }).then()
    .catch();




  //generate channel id and make sure it doesn't already exist
  //set channel_name mapped to channel id  {channel_id: channel_name}

  pool.query(`SELECT id FROM users WHERE user_email='${req.body.user_email}'`, function(err, result, fields) {
    if (err) res.status(400).send(err);

    pool.query(`INSERT INTO channels (id, user_id, channel_name,viewCount,subscriberCount,videoCount) VALUES ('${req.body.id}', '${result[0].id}', '${req.body.channel_name}'
    ,${0},${0},${0})`, function(){
      res.status(201).send({response: 'successful insertion of sign up'});
    });
  });

});

module.exports = router;
