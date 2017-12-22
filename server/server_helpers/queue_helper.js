const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');
const axios = require('axios');

AWS.config.update({
  region: 'us-east-2',
  accessKeyId: 'AKIAJU7EN3GRZIYDPPDA',
  secretAccessKey: '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'
});

const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-2.amazonaws.com/126825225017/myq.fifo',
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
