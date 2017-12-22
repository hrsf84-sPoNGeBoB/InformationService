const channel_mapper = require('../../server/server_helpers/channel_mapper');
const Chance = require('chance');
const chance = new Chance();


module.exports = function(){
  const getData = function() {
    let categoryId = Math.floor(Math.random() * (45 - 1) + 1).toString();
    if (channel_mapper.hasOwnProperty(categoryId)) {
      categoryId = channel_mapper[categoryId];
      const selectIdChar = Math.floor(Math.random() * (3 - 1) + 1);
      const idChar = selectIdChar  === 1 ? '#': '!';
      const channel_id = randomString(16, 'aA' + idChar);
      return {
        channel_id,
          categoryId,
        "title": chance.paragraph({sentences: 1}) ,
          "description": chance.paragraph({sentences: 1}) ,
          "tags": [
            chance.word(),
            chance.word(),
            chance.word(),
            chance.word()
        ]
      }

    }else{
      return getData();
    }
  };

return getData();

};

function randomString(length, chars) {
  let mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  if (chars.indexOf('!') > -1) mask += '_';
  let result = '';
  for (let i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
  return result;
}







