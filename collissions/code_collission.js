const { mod } = require('./util');

function caesarCipher(msg, key, alphabet, n, type='encrypt') {
  let messageArr = msg.split('');

  let encryptedMessageArr = messageArr.map((char, i) => {

    let charIndex = alphabet.indexOf(char.toLowerCase());

    if (charIndex != -1) {
      let encryptedCharIndex = type === 'decrypt' ? mod((charIndex - key),n) : (charIndex + key) % n;
      return char === char.toUpperCase() ? alphabet[encryptedCharIndex].toUpperCase() : alphabet[encryptedCharIndex]
    } else {
      return msg[i];
    }
  })

  return encryptedMessageArr.join('');
}
const empty = {};

module.exports = {caesarCipher};//mf6:WP