const express = require('express');
const router = express.Router();
const pool = require('../db/db.js');
const Producer = require('sqs-producer');
const AWS = require('aws-sdk');
//const config = require('../config');
const esTransportOpts = {
  level: 'info'
};


router.get('/:id', function(req, res) {
  let id = req.params.id;

  const producer = Producer.create({
    queueUrl: 'https://sqs.us-east-2.amazonaws.com/909358229808/video-output',
    region: 'us-east-2',
    accessKeyId: process.env.awsAccessKey,
    secretAccessKey: process.env.awsSecretAccessKey
  });


  pool.query(`SELECT videos.id, channels.channel_name, videos.publishedAt, videos.channel_id, videos.category_id, videos.title,videos.description, videos.thumbnails, videos.tags, videos.viewCount, videos.likeCount, videos.dislikeCount, videos.favoriteCount, videos.commentCount FROM videos INNER JOIN channels on videos.channel_id=channels.id Where channel_id="${id}"`, function (err, result) {
    if (err) { return res.status(400).send(err); }
    if (result) {
      const resultObj = result[0];
      const obj = {
        'kind': 'youtube#video',
        'id': id,
        'snippet': {
          'publishedAt': resultObj['publishedAt'],
          'channel_id': resultObj['channel_id'],
          'category_id': resultObj['category_id'],
          'title': resultObj['title'],
          'description': resultObj['description'],
          'thumbnails': resultObj['thumbnails'],
          'tags': resultObj['tags']
        },
        'statistics': {
          'viewCount': '0',
          'likeCount': '0',
          'dislikeCount': '0',
          'favoriteCount': '0',
          'commentCount': '0'
        }
      };
      producer.send([{
        id: 'id1',
        body: JSON.stringify(obj)
      }], function(err) {
        if (err) { return res.status(400).send({response: err}); }
        return res.status(200).send({response: 'video data successfully added to queue'});
      });
    } else {
      return res.status(400).send('no result obj');
    }
  });
});

module.exports = router;
