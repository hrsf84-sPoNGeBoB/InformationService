var apm = require('elastic-apm-node').start({
  appName: 'youtube',
  secretToken: '',
  serverUrl: '',
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const redis = require("redis"),
  client = redis.createClient();



const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(apm.middleware.express());



//route files used by express router
const uploadVideo = require('../routes/upload');
const createChannel = require('../routes/signUp');
const getVideo = require('../routes/video');



app.use('/signUp', createChannel);
app.use('/upload', uploadVideo);
app.use('/video', getVideo);

client.on('connect', function() {
  console.log('connected');
});

client.on("error", function (err) {
  console.log("Error " + err);
});
app.listen(PORT, function () { console.log('listening on port 3000!') });




module.exports = app;
