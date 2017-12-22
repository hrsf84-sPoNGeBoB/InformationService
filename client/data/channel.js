const Chance = require('chance');
const chance = new Chance();


module.exports = function(){
  const user_email= chance.email();
  const channel_name = chance.word();
  return {user_email, channel_name};
};

