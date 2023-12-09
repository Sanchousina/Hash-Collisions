import { readFile } from 'fs/promises';
import fs from 'fs';

export async function getFileContent(path, encoding='utf8') {
  try {
    const data = await readFile(path, {encoding: encoding} );
    return data;
  } catch (err) {
    console.log(err);
  }
}

export function writeFile(outputPath, data, encoding='utf-8') {
  fs.writeFile(outputPath, data, {encoding: encoding}, function(err) {
    console.log('File created');
  });
}
