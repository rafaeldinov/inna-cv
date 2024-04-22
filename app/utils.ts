import * as nanoid from 'nanoid';
import { fileTypes } from './const';
const XMLHttpRequest = require('xhr2');

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_-=abcdefghigklmnopqrstuvwxyz';
const generator = nanoid.customAlphabet(alphabet, 15);

export function isValidURL(string: string) {
  var res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}

export function validFileType(file: File) {
  return fileTypes.includes(file.type);
}

export function getFileSize(number: number) {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}
