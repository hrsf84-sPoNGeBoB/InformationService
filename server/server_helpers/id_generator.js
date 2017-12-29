var randomString = function() {
  var maxL = 33;
  var minL = 5;
  var length = (Math.floor(Math.random() * (maxL - minL)) + minL);
  var randomCharsIdx = (Math.floor(Math.random() * (11 - 0)) + 0);
  var randomChars = {0: 'aA', 1: '#aA', 2: '#A!', 3: 'Aa', 4: 'A#a', 5: '!#', 6: '#A', 7: '!a', 8: '!A', 9: 'A#', 10: '#!a'};
  var chars = randomChars[randomCharsIdx];
  var mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  var result = '';
  for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
  return result;
};
module.exports = randomString;


