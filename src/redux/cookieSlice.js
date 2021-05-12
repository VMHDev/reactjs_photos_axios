import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import { COOKIES_EXPIRE } from 'constants/system';

const cookies = new Cookies();
const initCookies = () => ({
  login: cookies.get('login') ? cookies.get('login') : null,
  isTimeout: true,
});
const initialState = initCookies();

const user_cookies = createSlice({
  name: 'cookies',
  initialState,
  reducers: {
    addLogin: (state, action) => {
      state.login = action.payload;
      state.isTimeout = false;
      // Update cookie
      cookies.set('login', JSON.stringify(action.payload), {
        path: '/',
        maxAge: COOKIES_EXPIRE,
      });
    },
    removeLogin: (state, action) => {
      state.login = action.payload;
      state.isTimeout = false;
      // Update cookie
      cookies.remove('login', { path: '/' });
    },
  },
});

const { reducer, actions } = user_cookies;
export const { addLogin, removeLogin } = actions;
export default reducer;
