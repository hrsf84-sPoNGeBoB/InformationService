const express = require('express');
const router = express.Router();
const pool = require('../db/db.js');
const winston = require('winston');
const Producer = require('sqs-producer');
const AWS = require('aws-sdk');
const Elasticsearch = require('winston-elasticsearch');
const config = require('../config');
const esTransportOpts = {
  level: 'info'
};
const logger = new winston.Logger({
  transports: [
    new Elasticsearch(esTransportOpts)
  ]
});

router.get('/:id', function(req, res) {
  let id = req.params.id;
  logger.log('info', 'inside video endpoint');


  const producer = Producer.create({
    queueUrl: 'https://sqs.us-east-2.amazonaws.com/909358229808/video-output',
    region: 'us-east-2',
    accessKeyId: config.awsAccessKey,
    secretAccessKey: config.awsSecretAccessKey
  });


  pool.query(`SELECT videos.id, channels.channel_name, videos.publishedAt, videos.channel_id, videos.category_id, videos.title,videos.description, videos.thumbnails, videos.tags, videos.viewCount, videos.likeCount, videos.dislikeCount, videos.favoriteCount, videos.commentCount FROM videos INNER JOIN channels on videos.channel_id=channels.id Where channel_id="${id}"`, function (err, result) {
    if (err) { res.status(400).send(err); }
    logger.info('db fetched video info');
    var resultObj = result[0];
    var obj = {
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
      if (err) { res.status(400).send({response: err}); }
      res.status(200).send({response: 'video data successfully added to queue'});
    });

  });
});

module.exports = router;
