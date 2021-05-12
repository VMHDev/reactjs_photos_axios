import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { addToLocalStorageArray } from 'utils/helper';

const initPhotos = () => {
  const photos = localStorage.getItem('photos');
  if (photos) {
    return JSON.parse(photos);
  } else {
    const photosInit = [
      {
        id: uuidv4(),
        categoryId: 5,
        photo: 'https://picsum.photos/id/532/300/300',
        title:
          'Enim laboris dolore consectetur et fugiat do amet eiusmod anim proident do culpa irure consectetur.',
      },
      {
        id: uuidv4(),
        categoryId: 1,
        photo: 'https://picsum.photos/id/43/300/300',
        title: 'Ad officia magna veniam sunt.',
      },
      {
        id: uuidv4(),
        categoryId: 3,
        photo: 'https://picsum.photos/id/722/300/300',
        title:
          'Minim anim in sunt esse nisi sit magna consequat in sit laboris adipisicing.',
      },
      {
        id: uuidv4(),
        categoryId: 5,
        photo: 'https://picsum.photos/id/294/300/300',
        title: 'Deserunt in tempor est id consectetur cupidatat.',
      },
      {
        id: uuidv4(),
        categoryId: 4,
        photo: 'https://picsum.photos/id/229/300/300',
        title:
          'Labore culpa velit sunt sit anim ad do veniam do proident sunt et nisi mollit.',
      },
      {
        id: uuidv4(),
        categoryId: 1,
        photo: 'https://picsum.photos/id/862/300/300',
        title:
          'Fugiat fugiat voluptate tempor minim ipsum nisi culpa magna officia ea deserunt tempor.',
      },
      {
        id: uuidv4(),
        categoryId: 3,
        photo: 'https://picsum.photos/id/515/300/300',
        title:
          'Excepteur nisi aliquip ex aliqua consectetur id laboris cillum elit dolor dolor anim sint.',
      },
      {
        id: uuidv4(),
        categoryId: 5,
        photo: 'https://picsum.photos/id/730/300/300',
        title:
          'Occaecat exercitation Lorem cupidatat adipisicing elit duis consequat esse et tempor eu enim cupidatat.',
      },
      {
        id: uuidv4(),
        categoryId: 3,
        photo: 'https://picsum.photos/id/287/300/300',
        title: 'Veniam officia est nulla proident labore.',
      },
      {
        id: uuidv4(),
        categoryId: 3,
        photo: 'https://picsum.photos/id/859/300/300',
        title:
          'Ut incididunt do magna culpa consectetur id deserunt et enim elit quis.',
      },
      {
        id: uuidv4(),
        categoryId: 5,
        photo: 'https://picsum.photos/id/110/300/300',
        title:
          'Nisi velit fugiat voluptate fugiat magna officia qui fugiat ad non.',
      },
      {
        id: uuidv4(),
        categoryId: 5,
        photo: 'https://picsum.photos/id/649/300/300',
        title: 'Id ex enim non dolore reprehenderit eu ullamco.',
      },
    ];
    localStorage.setItem('photos', JSON.stringify(photosInit));
    return photosInit;
  }
};

const initialState = initPhotos();

const photo = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    addPhoto: (state, action) => {
      state.push(action.payload);
      addToLocalStorageArray('photos', action.payload);
    },
    removePhoto: (state, action) => {
      const removePhotoId = action.payload;
      state = state.filter((photo) => photo.id !== removePhotoId);
      localStorage.setItem('photos', JSON.stringify(state));
      return state;
    },
    updatePhoto: (state, action) => {
      const newPhoto = action.payload;
      const photoIndex = state.findIndex((photo) => photo.id === newPhoto.id);
      if (photoIndex >= 0) {
        state[photoIndex] = newPhoto;
      }
      localStorage.setItem('photos', JSON.stringify(state));
    },
  },
});

const { reducer, actions } = photo;
export const { addPhoto, removePhoto, updatePhoto } = actions;
export default reducer;
