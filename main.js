import { readFile } from 'fs/promises';
import fs from 'fs';

function hash(msg, output=2) {
  const msgBytes = textToByteArray(msg);
  let hash = 0;

  msgBytes.forEach(byte => {
    hash ^= byte;
  });

  hash %= 2 ** output;
  console.log('hash result: ', hash);
  return hash;
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

async function content(path, encoding='utf8') {
  try {
    const data = await readFile(path, {encoding: encoding} );
    return data;
  } catch (err) {
    console.log(err);
  }
}

function writeImage(outputPath, data) {
  fs.writeFile(outputPath, data, {encoding: 'base64'}, function(err) {
    console.log('File created');
  });
}

const codeFileText = await content('./source.js');
const codeFileTextCollision = await content('./source_2b.js');

// const docFileText = await content('./word.docx'); // TO FIX
// console.log(docFileText);

const imgFile = await content('./img.jpg', 'base64');
writeImage('./img_changed.jpg', imgFile);


//hash('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sed nisl congue, congue leo vitae, vestibulum ligula');

console.log(hash(codeFileText) === hash(codeFileTextCollision));