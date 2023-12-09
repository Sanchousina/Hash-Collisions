import { textToByteArray } from "./textUtils.js";

export function hash(msg, output=2) {
  const msgBytes = textToByteArray(msg);
  let hash = 0;

  msgBytes.forEach(byte => {
    hash ^= byte;
  });

  hash %= 2 ** output;
  console.log('hash result: ', hash);
  return hash;
}