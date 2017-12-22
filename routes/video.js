const express = require('express');
const router = express.Router();
const pool = require('../db/db.js');
const winston = require('winston');
var Producer = require('sqs-producer');
const AWS = require('aws-sdk');
var Elasticsearch = require('winston-elasticsearch');
var esTransportOpts = {
  level: 'info'
};
var logger = new winston.Logger({
  transports: [
    new Elasticsearch(esTransportOpts)
  ]
});




router.get('/:id', function(req, res) {
  let id = req.params.id;
  logger.log('info', 'inside video endpoint');


  // var producer = Producer.create({
  //   queueUrl: 'https://sqs.us-east-2.amazonaws.com/126825225017/myoutput.fifo',
  //   region: 'us-east-2',
  //   accessKeyId: 'AKIAJU7EN3GRZIYDPPDA',
  //   secretAccessKey: '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'
  // });


  res.status(200).send("data fetched")
  // pool.query(`SELECT * FROM videos WHERE channel_id="${id}"`,function(err, result, fields){
  //   if (err) res.status(400).send(err);
  //   logger.info('db fetched video info');
  //   res.status(200).send("data fetched")
  //   // producer.send([{
  //   //   id: 'id1',
  //   //   body: JSON.stringify(result),
  //   //   groupId: 'group1234',
  //   //   deduplicationId: 'abcdef123456'
  //   // }], function(err) {
  //   //   if (err) console.log(err);
  //   //   res.status(200).send("data placed in queue")
  //   // });
  //
  // });
});

module.exports = router;
