import crypto from 'crypto'
import { hash } from './hash.js'
import { writeFile } from './fileUtils.js';

export function findCollissionString(fileContent, hashOutput) {
  console.log('--------------CODE FILE------------------');

  let i = 0;
  
    while(true) {
      console.log('\n------Iteration: ', i);
  
      const newFileContent = addRandomCharsToString(fileContent);
      const collisison = hash(fileContent, hashOutput) === hash(newFileContent, hashOutput);
  
      if (collisison === true) {
        writeFile('./collissions/code_collission.js', newFileContent);
        break;
      }
      i++;
    }
}

function addRandomCharsToString(inputString) {
  let randomChars = '';
  const fromCode = 48;
  const toCode = 126;
  const length = crypto.randomInt(3, 10);

  for (let i = 0; i < length; i++) {
    const randomCodePoint = Math.floor(Math.random() * (toCode - fromCode + 1)) + fromCode;
    randomChars += String.fromCodePoint(randomCodePoint);
  }

  const stringWithRandomChars = inputString + '//' + randomChars;

  return stringWithRandomChars;
}