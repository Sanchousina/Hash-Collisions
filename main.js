import { readFile } from 'fs/promises';
import fs from 'fs';
import crypto from 'crypto'

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

const base64Image = await content('./originals/img.jpg', 'base64');
const newBase64Image = modifyImage(base64Image);
console.log('--------------IMAGE------------------');
console.log(hash(base64Image) === hash(newBase64Image));
writeImage('./collissions/img_changed.jpg', newBase64Image);

// TODO: Modyfing img base64
function modifyImage(base64Image) {
  const buffer = Buffer.from(base64Image, 'base64');

  const insertionPoint = crypto.randomInt(100, buffer.length);
  const numBytesToModify = crypto.randomInt(3, 11);
  const newBytes = crypto.randomBytes(numBytesToModify).toString();

  // Modify the random bytes
  buffer.write(newBytes, insertionPoint, numBytesToModify, 'binary');

  const modifiedBase64 = buffer.toString('base64');

  return modifiedBase64;
}


// TODO: Reading docx file

console.log('--------------CODE FILE------------------');
console.log(hash(codeFileText) === hash(codeFileTextCollision));