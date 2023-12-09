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

// Manually created collission
const codeFileTextCollision = await content('./collissions/source_2b.js');
console.log(hash(codeFileText) === hash(codeFileTextCollision));

const base64Image = await content('./originals/img.jpg', 'base64');

//findCollissionImage(base64Image, 4);

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

function findCollissionImage(base64Image, hashOutput) {
  console.log('--------------IMAGE------------------');

  let i = 0;

  while(true) {
    console.log('\n------Iteration: ', i);

    const newBase64Image = modifyImage(base64Image);
    const collisison = hash(base64Image, hashOutput) === hash(newBase64Image, hashOutput);

    if (collisison === true) {
      writeImage('./collissions/img_changed.jpg', newBase64Image);
      break;
    }
    i++;
  }
}


// TODO: Reading docx file


// Modify Code File
function addRandomCharsToString(inputString) {
  let randomChars = '';
  const fromCode = 48;
  const toCode = 126;
  const length = crypto.randomInt(1, 3);

  for (let i = 0; i < length; i++) {
    const randomCodePoint = Math.floor(Math.random() * (toCode - fromCode + 1)) + fromCode;
    randomChars += String.fromCodePoint(randomCodePoint);
  }

  const stringWithRandomChars = inputString + '//' + randomChars;

  return stringWithRandomChars;
}

console.log('--------------CODE FILE------------------');

let i = 0;

  while(true) {
    console.log('\n------Iteration: ', i);

    const newCodeText = addRandomCharsToString(codeFileText);
    const collisison = hash(codeFileText, 4) === hash(newCodeText, 4);

    if (collisison === true) {

      fs.writeFile('./collissions/code_collission.js', newCodeText, function(err) {
        console.log('File created');
      });

      break;
    }
    i++;
  }