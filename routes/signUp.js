const express = require('express');
const router = express.Router();
const pool = require('../db/db.js');

router.post('/', function(req, res) {

  res.status(200).send("successful insertion of sign up");

  // pool.query(`SELECT id FROM users WHERE user_email='${req.body.user_email}'`,function(err, result, fields){
  //   if (err) res.status(400).send(err);
  //   console.log(result[0].id, "id result");
  //   pool.query(`INSERT INTO channels (id, user_id, channel_name,viewCount,subscriberCount,videoCount) VALUES ('${req.body.id}', '${result[0].id}', '${req.body.channel_name}'
  //   ,${0},${0},${0})`, function(){
  //     res.status(200).send("successful insertion of sign up");
  //   });
  // });

});

module.exports = router;
