import { createSlice } from '@reduxjs/toolkit';

import { addToLocalStorageArray } from 'utils/helper';

const initUserTokens = () => {
  const user_tokens = localStorage.getItem('user_tokens');
  if (user_tokens) {
    return JSON.parse(user_tokens);
  } else {
    const tokensInit = [];
    localStorage.setItem('user_tokens', JSON.stringify(tokensInit));
    return tokensInit;
  }
};

const initialState = initUserTokens();

const user_tokens = createSlice({
  name: 'user_tokens',
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.push(action.payload);
      // Update local storage
      addToLocalStorageArray('user_tokens', action.payload);
    },
  },
});

const { reducer, actions } = user_tokens;
export const { addToken } = actions;
export default reducer;
