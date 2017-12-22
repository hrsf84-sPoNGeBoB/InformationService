const express = require('express');
const router = express.Router();
const pool = require('../db/db.js');

router.post('/', function(req, res) {

    res.status(200).send("successful insertion of new user");


  // pool.query(`INSERT INTO videos (channel_id,category_id,title, description,tags,publishedAt,thumbnails,viewCount,likeCount,
  // dislikeCount, favoriteCount, commentCount) VALUES ('${req.body.channel_id}','${req.body.category_id}','${req.body.title}',
  // '${req.body.description}','${req.body.tags}','${req.body.publishedAt}','${req.body.thumbnails}','${0}',
  // ${0}, ${0}, ${0})`,function(err, result, fields){
  //   if (err) res.status(400).send(err);
  //   res.status(200).send("successful insertion of new user");
  // });
});

module.exports = router;
