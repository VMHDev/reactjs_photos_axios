import { createSlice } from '@reduxjs/toolkit';

const app = createSlice({
  name: 'app',
  initialState: {
    isShowLoading: false,
    modalOk: {},
    modalOkCancel: {},
    modalYesNoCancel: {},
  },
  reducers: {
    showLoading(state, action) {
      state.isShowLoading = action.payload;
    },
    showModalOk(state, action) {
      state.modalOk = action.payload;
    },
    showModalOkCancel(state, action) {
      state.modalOkCancel = action.payload;
    },
    showModalYesNoCancel(state, action) {
      state.modalYesNoCancel = action.payload;
    },
  },
});

const { reducer, actions } = app;
export const {
  showLoading,
  showModalOk,
  showModalOkCancel,
  showModalYesNoCancel,
} = actions;
export default reducer;
