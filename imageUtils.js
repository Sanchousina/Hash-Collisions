import crypto from 'crypto'
import { hash } from './hash.js'
import { writeFile } from './fileUtils.js';

export function findCollissionImage(base64Image, hashOutput) {
  console.log('--------------IMAGE------------------');

  let i = 0;

  while(true) {
    console.log('\n------Iteration: ', i);

    const newBase64Image = modifyImage(base64Image);
    const collisison = hash(base64Image, hashOutput) === hash(newBase64Image, hashOutput);

    if (collisison === true) {
      writeFile('./collissions/img_changed.jpg', newBase64Image, 'base64');
      break;
    }
    i++;
  }
}

function modifyImage(base64Image) {
  const buffer = Buffer.from(base64Image, 'base64');

  const insertionPoint = crypto.randomInt(100, buffer.length-100);
  const numBytesToModify = crypto.randomInt(3, 6);
  const newBytes = crypto.randomBytes(numBytesToModify).toString();

  // Modify the random bytes
  buffer.write(newBytes, insertionPoint, numBytesToModify, 'binary');

  const modifiedBase64 = buffer.toString('base64');

  return modifiedBase64;
}
