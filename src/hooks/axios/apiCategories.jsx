import { useDispatch } from 'react-redux';
import { setCategory } from 'redux/categorySlice';
import { trackPromise } from 'react-promise-tracker';
import categoryApi from 'api/categoryApi';
import { timeout } from 'utils/helper';

export const useCategoryGetAll = () => {
  const dispatch = useDispatch();

  const callback = async () => {
    try {
      // Call api
      const response = await trackPromise(categoryApi.getAll());
      // Update state
      const data = response?.data.categories ? response?.data.categories : [];
      dispatch(setCategory(data));
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
  const callback = async (params) => {
    try {
      const response = await trackPromise(categoryApi.update(params));
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
