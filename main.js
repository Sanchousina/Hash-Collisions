import { getFileContent } from './fileUtils.js';
import { findCollissionImage } from './imageUtils.js';
import { findCollissionString } from './stringUtils.js';

// Manually created collission
//const codeFileTextCollision = await getFileContent('./collissions/source_2b.js');
//console.log(hash(codeFileText) === hash(codeFileTextCollision));

const codeFileText = await getFileContent('./originals/source.js');

findCollissionString(codeFileText, 4);

//---------------------------------------------------------------------

const base64Image = await getFileContent('./originals/img.jpg', 'base64');

findCollissionImage(base64Image, 4);

//---------------------------------------------------------------------

// TODO: Reading docx file



