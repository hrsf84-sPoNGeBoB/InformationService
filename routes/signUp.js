const config = require('../config');
const express = require('express');
const router = express.Router();
const pool = require('../db/db.js');
const redis = require('redis');
const client = redis.createClient({
  host: (config.REDIS_HOST || '127.0.0.1')
});
const Producer = require('sqs-producer');
const randomString = require('../server/server_helpers/id_generator');

router.post('/', function(req, res) {

  const producer = Producer.create({
    queueUrl: 'https://sqs.us-east-2.amazonaws.com/909358229808/signup-output',
    region: 'us-east-2',
    accessKeyId: process.env.awsAccessKey,
    secretAccessKey: process.env.awsSecretAccessKey
  });

  const checkIfExists = (generateID)=> {
    return new Promise ((resolve, reject)=>{
      client.get(generateID, function(err, reply) {
        // reply is null when the key is missing
        if (err) {
          reject(err);
        }
        resolve(reply);
      });
    });

  };

  const check = (generateID)=>{
    return checkIfExists(generateID).then(result=>{
      if (result === null) {
        return generateID;
      } else {
        check(randomString());
      }
    }).catch(err=> err);
  };

  new Promise( (resolve) => {
    resolve(check(randomString()));

  }).then(id=>{
    console.log(id, 'ID');
    if (typeof id === 'string') {
      client.set(id, req.body.channel_name, redis.print);
      const obj = {
        'kind': 'youtube#channel',
        'channel_id': id,
        'channel_name': req.body.channel_name,
        'user_email': req.body.user_email,
        'statistics': {
          'viewCount': '0',
          'subscriberCount': '0',
          'videoCount': '0'
        }
      };
      console.log(obj, 'object');
      producer.send([{
        id: 'id1',
        body: JSON.stringify(obj)
      }], function(err) {
        if (err) { console.log(err); }
        console.log('signup data sent to output queue');
      });



      pool.query(`SELECT id FROM users WHERE user_email='${req.body.user_email}'`, function(err, result) {
        if (err) { return res.status(400).send(err); }
        console.log(result, 'result inside db');
        if (result) {
          if (result.length > 0) {
            const queryStr = `INSERT INTO channels (id, user_id, channel_name,viewCount,subscriberCount,videoCount) VALUES ('${id}', '${result[0].id}', '${req.body.channel_name}'
        ,${0},${0},${0})`;
            pool.query(queryStr, function(error, results) {
              if (err) { return res.status(400).send(error); }
              return res.status(201).send({response: 'successful insertion of new channel'});
            });
          } else {
            return res.status(400).send('no result obj');
          }

        } else {
          return res.status(400).send('no result obj');
        }
      });

    } else {
      return res.status(401).send({response: 'error'});
    }
  })
    .catch(err=> console.log(err));

});

module.exports = router;
