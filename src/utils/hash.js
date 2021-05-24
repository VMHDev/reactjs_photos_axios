import CryptoJS from 'crypto-js';
import { PASS_PHRASE } from 'constants/system';

// Mã hóa một lớp
export const encryptWithAES = (text) => {
  console.log('text', text);
  console.log('PASS_PHRASE', PASS_PHRASE);
  return CryptoJS.AES.encrypt(text, PASS_PHRASE).toString();
};

// Giải mã một lớp
export const decryptWithAES = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, PASS_PHRASE);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

// Mã hóa hai lớp
export const encryptWithAESTripleDES = (text) => {
  const textTripleDES = CryptoJS.TripleDES.encrypt(
    encryptWithAES(text),
    PASS_PHRASE
  ).toString();
  return textTripleDES;
};

// Giải mã hai lớp
export const decryptWithAESTripleDES = (ciphertext) => {
  const bytes = CryptoJS.TripleDES.decrypt(ciphertext, PASS_PHRASE);
  const originalTextAES = bytes.toString(CryptoJS.enc.Utf8);
  const originalText = decryptWithAES(originalTextAES);
  return originalText;
};
