const createResource = require('./data/metadata');
const channelData = require('./data/channel');
const fs = require('fs');
const path = require('path');
const channelfile = path.join(__dirname, '.', 'data','channel.txt');
const userfile = path.join(__dirname, '.', 'data','user.txt');
const uploadfile = path.join(__dirname, '.', 'data','upload.txt');




function WriteData1(){
   //const writeStreamUser = fs.createWriteStream(userfile);
   const writeStreamchannel= fs.createWriteStream(channelfile);
  // const writeStreamVideo= fs.createWriteStream(uploadfile);
  let recordArr = [];


    for (let i = 0; i < 3333335; i++) {
      let data = channelData();
      let videodata = createResource();
      //let userdata = '\\N' + '\t' + data.user_email;
      let thumbNails = {
        "default": {
          "url": "https://i.ytimg.com/vi/Ks-_Mh1QhMc/default.jpg",
          "width": 120,
          "height": 90
        }
      };

      let date = new Date();
      let count = i + 1;
      let channeldata = videodata.channel_id + '\t' + count + '\t' + data.channel_name + '\t' + 0 + '\t' + 0 + '\t' + 0;
      recordArr.push(videodata.channel_id);
      //let uploadVideoData = videodata.channel_id + '\t' + videodata.categoryId + '\t' + videodata["title"] + '\t' + videodata["description"] + '\t' + JSON.stringify(videodata["tags"])
        //+ '\t' + date.toISOString() + '\t' + JSON.stringify(thumbNails) + '\t' + 0 + '\t' + 0 + '\t' + 0 + '\t' + 0 + '\t' + 0;

      // writeStreamUser.on('error', function (e) {
      //   console.error(e);
      // });
      writeStreamchannel.on('error', function (e) {
        console.error(e);
      });
      // writeStreamVideo.on('error', function (e) {
      //   console.error(e);
      // });
      //writeStreamUser.write(userdata + "\r\n");
       writeStreamchannel.write(channeldata + "\r\n");
      // writeStreamVideo.write(uploadVideoData + "\r\n");
  }
  //writeStreamUser.end();
  writeStreamchannel.end();
  // writeStreamVideo.end();
  const writeStreamVideo= fs.createWriteStream(uploadfile);
  recordArr.forEach(item=>{
    let date = new Date();
    let videodata = createResource();
    let thumbNails = {
      "default": {
        "url": "https://i.ytimg.com/vi/Ks-_Mh1QhMc/default.jpg",
        "width": 120,
        "height": 90
      }
    };
    let uploadVideoData = '\\N' + '\t' + item + '\t' + videodata.categoryId + '\t' + videodata["title"] + '\t' + videodata["description"] + '\t' + JSON.stringify(videodata["tags"])
    + '\t' + date.toISOString() + '\t' + JSON.stringify(thumbNails) + '\t' + 0 + '\t' + 0 + '\t' + 0 + '\t' + 0 + '\t' + 0;

    writeStreamVideo.on('error', function (e) {
      console.error(e);
    });
    writeStreamVideo.write(uploadVideoData + "\r\n");
  });
  writeStreamVideo.end();
}

function WriteData2(){
  //const writeStreamUser = fs.createWriteStream(userfile);
  const writeStreamchannel= fs.createWriteStream(channelfile);
  //const writeStreamVideo= fs.createWriteStream(uploadfile);
  let count = 1;

  for (let i = 0; i < 3333334; i++) {
    let data = channelData();
    let videodata = createResource();
    let userdata = '\\N' + '\t' + data.user_email;
    let thumbNails = {
      "default": {
        "url": "https://i.ytimg.com/vi/Ks-_Mh1QhMc/default.jpg",
        "width": 120,
        "height": 90
      }
    };

    let date = new Date();
    let channeldata = videodata.channel_id + '\t' + count + '\t' + data.channel_name + '\t' + 0 + '\t' + 0 + '\t' + 0;
    let uploadVideoData = videodata.channel_id + '\t' + videodata.categoryId + '\t' + videodata["title"] + '\t' + videodata["description"] + '\t' + JSON.stringify(videodata["tags"])
      + '\t' + date.toISOString() + '\t' + JSON.stringify(thumbNails) + '\t' + 0 + '\t' + 0 + '\t' + 0 + '\t' + 0 + '\t' + 0;
    count++;
    // writeStreamUser.on('error', function (e) {
    //   console.error(e);
    // });
    writeStreamchannel.on('error', function (e) {
      console.error(e);
    });
    // writeStreamVideo.on('error', function (e) {
    //   console.error(e);
    // });
    //writeStreamUser.write(userdata + "\r\n");
    writeStreamchannel.write(channeldata + "\r\n");
    //writeStreamVideo.write(uploadVideoData + "\r\n");

  }
  //writeStreamUser.end();
  writeStreamchannel.end();
  //writeStreamVideo.end();
}

function WriteData3(){
  // const writeStreamUser = fs.createWriteStream(userfile);
  // const writeStreamchannel= fs.createWriteStream(channelfile);
  const writeStreamVideo= fs.createWriteStream(uploadfile);
  let count = 1;

  for (let i = 0; i < 3333334; i++) {
    let data = channelData();
    let videodata = createResource();
    let userdata = '\\N' + '\t' + data.user_email;
    let thumbNails = {
      "default": {
        "url": "https://i.ytimg.com/vi/Ks-_Mh1QhMc/default.jpg",
        "width": 120,
        "height": 90
      }
    };

    let date = new Date();
    let channeldata = videodata.channel_id + '\t' + count + '\t' + data.channel_name + '\t' + 0 + '\t' + 0 + '\t' + 0;
    let uploadVideoData = videodata.channel_id + '\t' + videodata.categoryId + '\t' + videodata["title"] + '\t' + videodata["description"] + '\t' + JSON.stringify(videodata["tags"])
      + '\t' + date.toISOString() + '\t' + JSON.stringify(thumbNails) + '\t' + 0 + '\t' + 0 + '\t' + 0 + '\t' + 0 + '\t' + 0;
    count++;
    // writeStreamUser.on('error', function (e) {
    //   console.error(e);
    // });
    // writeStreamchannel.on('error', function (e) {
    //   console.error(e);
    // });
    writeStreamVideo.on('error', function (e) {
      console.error(e);
    });
    // writeStreamUser.write(userdata + "\r\n");
    // writeStreamchannel.write(channeldata + "\r\n");
    writeStreamVideo.write(uploadVideoData + "\r\n");

  }
  // writeStreamUser.end();
  // writeStreamchannel.end();
  writeStreamVideo.end();
}




// //ChannelSignUp();
// //UploadVideo();
WriteData1();
// //WriteData2();
// WriteData3();
