var chai = require('chai');
var assert = chai.assert;


var category_mapper = require('../server/server_helpers/category_mapper.js');
var queue_helper = require('../server/server_helpers/queue_helper.js');
var pool = require('../db/db.js');

describe('===== Unit tests =======', function() {
  describe('category mapper tests', function() {
    it('should correctly map category_id  27 to a string', function () {
      const category_id = category_mapper['27'];
      assert.equal(category_id, 'Education');
    });
    it('should not map category_id 3, 4, 5, 6, 7, 8, or 9 to a string', function () {
      const category_id3 = category_mapper['3'];
      const category_id4 = category_mapper['4'];
      const category_id5 = category_mapper['5'];
      const category_id6 = category_mapper['6'];
      const category_id7 = category_mapper['7'];
      const category_id8 = category_mapper['8'];
      const category_id9 = category_mapper['9'];
      assert.equal(category_id3, undefined);
      assert.equal(category_id4, undefined);
      assert.equal(category_id5, undefined);
      assert.equal(category_id6, undefined);
      assert.equal(category_id7, undefined);
      assert.equal(category_id8, undefined);
      assert.equal(category_id9, undefined);
    });
  });
  describe('queue helper tests', function() {
    it('should connect to aws sqs', function () {
      assert.equal(queue_helper['sqs']['endpoint']['port'], 443);
      assert.equal(queue_helper['sqs']['endpoint']['href'], 'https://sqs.us-east-2.amazonaws.com/');

    });
  });

  describe('## Database tests', function() {
    it('mysql driver should successfully post to db', function () {
      var max = 1000;
      var min = 0;
      var id = 'e0cm' + (Math.floor(Math.random() * (max - min)) + min) + (Math.floor(Math.random() * (max - min)) + min);
      var filler = (Math.floor(Math.random() * (max - min)) + min);
      var channel_data = {
        user_email: 'ab@c' + filler + '.is',
        id,
        channel_name: 'new channel'
      };
      var dbquery = `INSERT INTO channels (id, user_id, channel_name,viewCount,subscriberCount,videoCount) VALUES ('${channel_data.id}',${filler},'new channel',${0},${0},${0})`;
      pool.query(dbquery, function(err, result) {
        if (err) { throw err; }
        assert.equal(err, undefined);
        assert.equal(result, 'object');
      });
    });

    it('mysql driver should successfully fetch from db', function () {
      var dbquery = `Select * from videos Where channel_id='002E9MMmbXXjOxI3'`;
      pool.query(dbquery, function(err, result) {
        if (err) { throw err; }
        assert.equal(err, undefined);
        assert.equal(result, 'object');
      });
    });
  });


});




