import { createSlice } from '@reduxjs/toolkit';

const category = createSlice({
  name: 'categories',
  initialState: {
    data: [],
  },
  reducers: {
    setCategory: (state, action) => {
      console.log('action.payload', action.payload);
      state.data = action.payload;
    },
    addCategory: (state, action) => {
      state.data.push(action.payload);
    },
    removeCategory: (state, action) => {
      const removeCategoryId = action.payload;
      state.data = state.data.filter(
        (category) => category._id !== removeCategoryId
      );
      return state;
    },
    updateCategory: (state, action) => {
      const udpCategory = action.payload;
      const categoryIndex = state.data.findIndex(
        (category) => category._id === udpCategory._id
      );
      if (categoryIndex >= 0) {
        state.data[categoryIndex] = udpCategory;
      }
    },
  },
});

const { reducer, actions } = category;
export const { setCategory, addCategory, removeCategory, updateCategory } =
  actions;
export default reducer;
