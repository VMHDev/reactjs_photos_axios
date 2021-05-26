import { createSlice } from '@reduxjs/toolkit';
import { encryptWithAESTripleDES, decryptWithAESTripleDES } from 'utils/hash';
import {
  getValueFromCookies,
  setValueToCookies,
  removeValueFromCookies,
} from 'utils/cookie';
import {
  COOKIES_USERLOGIN_NAME,
  COOKIES_TOKEN_NAME,
  COOKIES_EXPIRE,
} from 'constants/system';

const initCookies = () => {
  // Get info user login from cookie
  const objUserLogin = getValueFromCookies(COOKIES_USERLOGIN_NAME)
    ? JSON.parse(getValueFromCookies(COOKIES_USERLOGIN_NAME))
    : null;

  if (objUserLogin) {
    // Decrypt password from cookie
    const decryptPass = decryptWithAESTripleDES(objUserLogin?.password);
    return {
      userLogin: { ...objUserLogin, password: decryptPass },
      token: getValueFromCookies(COOKIES_TOKEN_NAME)
        ? getValueFromCookies(COOKIES_TOKEN_NAME)
        : null,
    };
  } else {
    return {
      userLogin: null,
      token: null,
    };
  }
};
const initialState = initCookies();

const user_cookies = createSlice({
  name: 'cookies',
  initialState,
  reducers: {
    addLogin: (state, action) => {
      // Update state
      state.userLogin = action.payload.user;
      state.token = action.payload.token;

      // Encrypt password
      const objUserLogin = {
        ...action.payload.user,
        password: encryptWithAESTripleDES(action.payload.user.password),
      };

      // Update cookie
      setValueToCookies(COOKIES_USERLOGIN_NAME, JSON.stringify(objUserLogin), {
        expires: parseInt(COOKIES_EXPIRE),
      });
      setValueToCookies(COOKIES_TOKEN_NAME, action.payload.token, {
        expires: parseInt(COOKIES_EXPIRE),
      });
    },
    removeLogin: (state, action) => {
      state.userLogin = action.payload;
      state.token = action.payload;
      // Update cookie
      removeValueFromCookies([COOKIES_USERLOGIN_NAME, COOKIES_TOKEN_NAME]);
    },
  },
});

const { reducer, actions } = user_cookies;
export const { addLogin, removeLogin } = actions;
export default reducer;
