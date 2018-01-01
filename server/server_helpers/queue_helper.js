const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');
const axios = require('axios');
const config = require('../../config');
const apm = require('elastic-apm-node').start({
  appName: 'youtube',
  secretToken: '',
  serverUrl: '',
});
require('dotenv').load();
console.log('queue_helper running');
AWS.config.update({
  region: 'us-east-2',
  accessKeyId: process.env.awsAccessKey,
  secretAccessKey: process.env.awsSecretAccessKey
});

const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-2.amazonaws.com/909358229808/input',
  handleMessage: (message, done) => {
    // message.Body may need to be modified to message.Body[property]
    const name = 'video: ' + message.Body;
    const type = 'fetch input queue data';
    const trans = apm.startTransaction(name, type);
    axios.get(`http://localhost:3000/video/${message.Body}`)
      .then(function (response) {
        trans.result = 200;
        trans.end();
        console.log(response.data);
      })
      .catch(function (error) {
        trans.result = 500;
        trans.end();
        console.log(error);
      });
    done();
  },
  sqs: new AWS.SQS()
});

app.on('error', (err) => {
  // in case the queue encounters an error, report it to Elastic APM
  apm.captureError(err);
  console.log(err.message);
});

app.start();

module.exports = app;
