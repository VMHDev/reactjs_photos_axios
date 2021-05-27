import Cookies from 'js-cookie';
import { encryptWithAES, decryptWithAES } from 'utils/hash';

export function setValueToCookies(name, value, options = null) {
  try {
    const encryptValue = encryptWithAES(value);
    if (options) {
      Cookies.set(name, encryptValue, options);
    } else {
      Cookies.set(name, encryptValue);
    }
  } catch (error) {
    console.log('utils/cookie/setValueToCookies', error);
  }
}

export function getValueFromCookies(name) {
  try {
    if (Cookies.get(name)) {
      return decryptWithAES(Cookies.get(name));
    }
    return null;
  } catch (error) {
    console.log('utils/cookie/getValueFromCookies', error);
  }
}

export function removeValueFromCookies(names) {
  try {
    names.forEach((name) => {
      Cookies.remove(name);
    });
  } catch (error) {
    console.log('utils/cookie/removeValueFromCookies', error);
  }
}
