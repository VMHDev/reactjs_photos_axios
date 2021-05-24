import { trackPromise } from 'react-promise-tracker';
import userApi from 'api/userApi';
import { timeout } from 'utils/helper';

export const useGetById = () => {
  const callback = async (params) => {
    try {
      const response = await trackPromise(userApi.getById(params));
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

export const useGetByEmail = () => {
  const callback = async (params) => {
    try {
      const response = await trackPromise(
        userApi.getByEmail({ email: params })
      );
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

export const useLogin = () => {
  const callback = async (params) => {
    try {
      const response = await trackPromise(userApi.login(params));
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

export const useRegister = () => {
  const callback = async (params) => {
    try {
      const response = await trackPromise(userApi.register(params));
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
