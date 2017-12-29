var app = require('../server/index.js').app,
  chai = require('chai'),
  request = require('supertest');

var expect = chai.expect;

describe('====== API Tests ======', function() {
  var today = new Date();
  var max = 100;
  var min = 0;
  var id = '000cm' + (Math.floor(Math.random() * (max - min)) + min) + (Math.floor(Math.random() * (max - min)) + min);
  var data = {
    channel_id: 'RUgGtBoL2c28uVv3',
    category_id: '22',
    title: 'Ohariuwi vi foh fajma adi kafmozmi needibah div za foku piszojma no heli johez korhibug.',
    description: 'Munapu leh zego ukitol olanonur behwo siv ohezugu mata nesco juzi batto bokcoveb ehuhekdef.',
    tags: ["tik", "wilweh", "kelfileg", "egcogop"],
    publishedAt: today.toISOString(),
    thumbnails: {"default": {"url": "https://i.ytimg.com/vi/Ks-_Mh1QhMc/default.jpg", "width": 120, "height": 90}}
  };

  var channel_data = {
    user_email: 'ab@caapeso.is',
    id,
    channel_name: 'new channel'
  };

  describe('# Gets video', function () {
    it('should respond with a 200 status', function (done) {
      request(app).get('/video/XDhlvsXpTtIWpr4z').end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body.error).to.equal(undefined);
        done();
      });
    });

    it('should get video', function (done) {
      request(app).get('/video/XDhlvsXpTtIWpr4z').end(function (err, res) {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
    });
  });


  describe('## Posts video upload info', function() {

    it('should respond with a 201 status', function(done) {
      request(app) .post('/upload') .send(data) .end(function(err, res) {
        expect(res.statusCode).to.equal(201);
        done();
      });
    });

    it('should upload video data', function(done) {
      request(app) .post('/upload') .send(data) .end(function(err, res) {
        expect(res.statusCode).to.equal(201);
        expect(res.body.error).to.equal(undefined);
        expect(res.body.response).to.equal('successful insertion of new user');
        done();
      });
    });
  });

  describe('## Posts channel sign up info', function() {
    it('should respond with a 201 status', function(done) {
      request(app) .post('/signUp') .send(channel_data) .end(function(err, res) {
        expect(res.statusCode).to.equal(201);
        expect(res.body.error).to.equal(undefined);
        done();
      });
    });
    it('should create a channel', function(done) {
      request(app) .post('/signUp') .send(channel_data) .end(function(err, res) {
        expect(res.statusCode).to.equal(201);
        expect(res.body.error).to.equal(undefined);
        expect(res.body.response).to.equal('successful insertion of sign up');
        done();
      });
    });
  });

});



