import { createSlice } from '@reduxjs/toolkit';
import { addToLocalStorageArray } from 'utils/helper';

const initCategories = () => {
  const categories = localStorage.getItem('categories');
  if (categories) {
    return JSON.parse(categories);
  } else {
    const categoriesInit = [
      {
        id: 1,
        name: 'Technology',
      },
      {
        id: 2,
        name: 'Education',
      },
      {
        id: 3,
        name: 'Nature',
      },
      {
        id: 4,
        name: 'Animals',
      },
      {
        id: 5,
        name: 'Styles',
      },
      {
        id: 6,
        name: 'Others',
      },
    ];
    localStorage.setItem('categories', JSON.stringify(categoriesInit));
    return categoriesInit;
  }
};

const initialState = initCategories();

const category = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
      addToLocalStorageArray('categories', action.payload);
    },
    removeCategory: (state, action) => {
      const removeCategoryId = action.payload;
      state = state.filter((category) => category.id !== removeCategoryId);
      localStorage.setItem('categories', JSON.stringify(state));
      return state;
    },
    updateCategory: (state, action) => {
      const udpCategory = action.payload;
      const categoryIndex = state.findIndex(
        (category) => category.id === udpCategory.id
      );
      if (categoryIndex >= 0) {
        state[categoryIndex] = udpCategory;
      }
      localStorage.setItem('categories', JSON.stringify(state));
    },
  },
});

const { reducer, actions } = category;
export const { addCategory, removeCategory, updateCategory } = actions;
export default reducer;
