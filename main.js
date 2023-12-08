function hash(msg, output=2) {
  console.log(msg.length);
  const msgBytes = textToByteArray(msg);
  console.log(msgBytes.length);
  let hash = 0;

  msgBytes.forEach(byte => {
    console.log('hash: ', hash);
    console.log('byte: ', byte);
    hash ^= byte;
    console.log('xor: ', hash);
  });

  hash %= 2 ** output;
  console.log('hash result: ', hash.toString(2));
}

function textToByteArray(str) {
  const utf8EncodeText = new TextEncoder();
  const byteArray = utf8EncodeText.encode(str); // Uint8Array
  return byteArray;
}

function byteArrayToText(arr) {
  let uint8Array = new Uint8Array(arr);
  let decoder = new TextDecoder("utf-8"); 
  let str = decoder.decode(uint8Array); 
  return str;
}

hash('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed nisl congue, congue leo vitae, vestibulum ligula');