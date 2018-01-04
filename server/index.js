require('newrelic');
const config = require('../config');

require('dotenv').load();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



//route files used by express router
const uploadVideo = require('../routes/upload');
const createChannel = require('../routes/signUp');
const getVideo = require('../routes/video');


app.use('/signUp', createChannel);
app.use('/upload', uploadVideo);
app.use('/video', getVideo);


app.listen(PORT, function () { console.log('listening on port 3000!')});


module.exports = {app};

