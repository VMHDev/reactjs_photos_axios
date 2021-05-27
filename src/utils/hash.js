import CryptoJS from 'crypto-js';
import { PASS_PHRASE } from 'constants/system';

// Mã hóa một lớp
export const encryptWithAES = (text) => {
  try {
    return CryptoJS.AES.encrypt(text, PASS_PHRASE).toString();
  } catch (error) {
    console.log('utils/hash/encryptWithAES', error);
  }
};

// Giải mã một lớp
export const decryptWithAES = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, PASS_PHRASE);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (error) {
    console.log('utils/hash/decryptWithAES', error);
  }
};

// Mã hóa hai lớp
export const encryptWithAESTripleDES = (text) => {
  try {
    const textTripleDES = CryptoJS.TripleDES.encrypt(
      encryptWithAES(text),
      PASS_PHRASE
    ).toString();
    return textTripleDES;
  } catch (error) {
    console.log('utils/hash/encryptWithAESTripleDES', error);
  }
};

// Giải mã hai lớp
export const decryptWithAESTripleDES = (ciphertext) => {
  try {
    const bytes = CryptoJS.TripleDES.decrypt(ciphertext, PASS_PHRASE);
    const originalTextAES = bytes.toString(CryptoJS.enc.Utf8);
    const originalText = decryptWithAES(originalTextAES);
    return originalText;
  } catch (error) {
    console.log('utils/hash/decryptWithAESTripleDES', error);
  }
};
