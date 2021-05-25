import { trackPromise } from 'react-promise-tracker';
import authApi from 'api/authApi';
import { timeout } from 'utils/helper';

export const useLogin = () => {
  const callback = async (params) => {
    try {
      const response = await trackPromise(authApi.login(params));
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
