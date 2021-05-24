import Cookies from 'js-cookie';
import { encryptWithAES, decryptWithAES } from 'utils/hash';

export function setValueToCookies(name, value, options = null) {
  const encryptValue = encryptWithAES(value);
  if (options) {
    Cookies.set(name, encryptValue, options);
  } else {
    Cookies.set(name, encryptValue);
  }
}

export function getValueFromCookies(name) {
  if (Cookies.get(name)) {
    return decryptWithAES(Cookies.get(name));
  }
  return null;
}

export function removeValueFromCookies(names) {
  names.forEach((name) => {
    Cookies.remove(name);
  });
}
