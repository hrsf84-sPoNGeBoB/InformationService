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
    queueUrl: 'https://sqs.us-east-2.amazonaws.com/126825225017/myoutput.fifo',
    region: 'us-east-2',
    accessKeyId: config.awsAccessKey,
    secretAccessKey: config.awsSecretAccessKey
  });


  pool.query(`SELECT * FROM videos WHERE channel_id="${id}"`, function (err, result) {
    if (err) { res.status(400).send(err); }
    logger.info('db fetched video info');
    res.status(200).send(JSON.stringify(result));
    producer.send([{
      id: 'id1',
      body: JSON.stringify(result),
      groupId: 'group1234',
      deduplicationId: 'abcdef123456'
    }], function(err) {
      if (err) { console.log(err); }
      res.status(200).send('data placed in queue');
    });

  });
});

module.exports = router;
