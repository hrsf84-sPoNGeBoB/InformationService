const config = require('../config');
const express = require('express');
const router = express.Router();
const pool = require('../db/db.js');
const categoryMapper = require('../server/server_helpers/category_mapper');
const randomString = require('../server/server_helpers/id_generator');
const redis = require('redis');
const Producer = require('sqs-producer');
const client = redis.createClient({
  host: (config.REDIS_HOST || '127.0.0.1')
});

router.post('/', function(req, res) {
  const producer = Producer.create({
    queueUrl: 'https://sqs.us-east-2.amazonaws.com/909358229808/upload-output',
    region: 'us-east-2',
    accessKeyId: process.env.awsAccessKey,
    secretAccessKey: process.env.awsSecretAccessKey
  });

  //Inside the /upload endpoint, the channel_name mapped to the submitted channel_id is retrieved from Redis.



  const thumbnails = JSON.stringify(req.body.thumbnails);
  const tags = JSON.stringify(req.body.tags);
  const category_id = categoryMapper[req.body.category_id];
  const dbquery = `INSERT INTO videos (channel_id,category_id,title, description,tags,publishedAt,thumbnails,viewCount,likeCount,dislikeCount, favoriteCount, commentCount) VALUES ('${req.body.channel_id}','${category_id}','${req.body.title}','${req.body.description}','${tags}','${req.body.publishedAt}','${thumbnails}',${0},${0},${0},${0},${0})`;
  client.get(req.body.channel_id, function(err, reply) {
    // reply is null when the key is missing
    if (reply) {
      const obj = {
        'id': req.body.channel_id,
        'channel_name': reply,
        'category_id': category_id,
        'snippet': {
          'title': req.body.title,
          'description': req.body.description,
          'thumbnails': thumbnails
        }
      };
      producer.send([{
        id: 'id2',
        body: JSON.stringify(obj)
      }], function(err) {
        if (err) { console.log(err); }
        console.log('upload data sent to output queue');
      });
    } else {
      console.log('key doesn\'t exist');
    }
  });



  pool.query(dbquery, function(err, result, fields) {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(201).send({response: 'successful insertion of new video'});
  });
});

module.exports = router;
