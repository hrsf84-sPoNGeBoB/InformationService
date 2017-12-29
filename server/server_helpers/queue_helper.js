const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');
const axios = require('axios');
const config = require('../../config');

AWS.config.update({
  region: 'us-east-2',
  accessKeyId: config.awsAccessKey,
  secretAccessKey: config.awsSecretAccessKey
});

const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-2.amazonaws.com/909358229808/input',
  handleMessage: (message, done) => {
    axios.get(`http://localhost:3000/video/${message.Body}`)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    done();
  },
  sqs: new AWS.SQS()
});

app.on('error', (err) => {
  console.log(err.message);
});

app.start();

module.exports = app;
