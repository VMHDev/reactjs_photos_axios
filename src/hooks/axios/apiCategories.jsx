import { useDispatch } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';

import { setCategory, updateCategory } from 'redux/categorySlice';
import categoryApi from 'api/categoryApi';
import { timeout } from 'utils/helper';

export const useCategoryGetAll = () => {
  const dispatch = useDispatch();

  const callback = async () => {
    try {
      // Call api
      const response = await trackPromise(categoryApi.getAll());
      // Update state
      if (response?.data.success) {
        const data = response?.data.categories ? response?.data.categories : [];
        dispatch(setCategory(data));
      }

      await trackPromise(timeout(1000));
      return response?.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };
  return [callback];
};

export const useCategoryAdd = () => {
  const callback = async (params) => {
    try {
      const response = await trackPromise(categoryApi.add(params));
      await trackPromise(timeout(1000));
      return response?.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };

  return [callback];
};

export const useCategoryUpdate = () => {
  const dispatch = useDispatch();
  const callback = async (params) => {
    try {
      console.log('params', params);
      // Call api
      const response = await trackPromise(categoryApi.update(params));
      console.log('response', response);
      // Update state
      if (response?.data.success) {
        const action = updateCategory(params);
        dispatch(action);
      }

      await trackPromise(timeout(1000));
      return response?.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };

  return [callback];
};

export const useCategoryDelete = () => {
  const callback = async (params) => {
    try {
      const response = await trackPromise(categoryApi.delete(params));
      await trackPromise(timeout(1000));
      return response?.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };

  return [callback];
};
