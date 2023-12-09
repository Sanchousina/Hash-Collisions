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

const codeFileText = await content('./originals/source.js');
const codeFileTextCollision = await content('./collissions/source_2b.js');

const imgFile = await content('./originals/img.jpg', 'base64');
writeImage('./collissions/img_changed.jpg', imgFile);

// TODO: Modyfing img base64

// TODO: Reading docx file

console.log(hash(codeFileText) === hash(codeFileTextCollision));