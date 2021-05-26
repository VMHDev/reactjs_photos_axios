import { createSlice } from '@reduxjs/toolkit';

const photo = createSlice({
  name: 'photos',
  initialState: {
    data: [],
  },
  reducers: {
    setPhoto: (state, action) => {
      state.data = action.payload;
    },
    addPhoto: (state, action) => {
      state.data.push(action.payload);
    },
    removePhoto: (state, action) => {
      const removePhotoId = action.payload;
      state = state.data.filter((photo) => photo._id !== removePhotoId);
      return state;
    },
    updatePhoto: (state, action) => {
      const udpPhoto = action.payload;
      const photoIndex = state.data.findIndex(
        (photo) => photo._id === udpPhoto._id
      );
      if (photoIndex >= 0) {
        state.data[photoIndex] = udpPhoto;
      }
    },
  },
});

const { reducer, actions } = photo;
export const { setPhoto, addPhoto, removePhoto, updatePhoto } = actions;
export default reducer;
