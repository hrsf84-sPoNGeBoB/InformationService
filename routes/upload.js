const express = require('express');
const router = express.Router();
const pool = require('../db/db.js');
const categoryMapper = require('../server/server_helpers/category_mapper');
const redis = require("redis");
const client = redis.createClient();


router.post('/', function(req, res) {


  client.set("hello1", "say what2", redis.print);
  client.get("hello1", function(err, reply) {
    // reply is null when the key is missing
    console.log(reply);
  });

  //Inside the /upload endpoint, the channel_name mapped to the submitted channel_id is retrieved from Redis.



  var thumbnails = JSON.stringify(req.body.thumbnails);
  var tags = JSON.stringify(req.body.tags);
  const category_id = categoryMapper[req.body.category_id];
  const dbquery = `INSERT INTO videos (channel_id,category_id,title, description,tags,publishedAt,thumbnails,viewCount,likeCount,dislikeCount, favoriteCount, commentCount) VALUES ('${req.body.channel_id}','${category_id}','${req.body.title}','${req.body.description}','${tags}','${req.body.publishedAt}','${thumbnails}',${0},${0},${0},${0},${0})`;

  pool.query(dbquery, function(err, result, fields) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send({response: 'successful insertion of new user'});
    }
  });
});

module.exports = router;
