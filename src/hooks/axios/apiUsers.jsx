import { useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import userApi from 'api/userApi';
import { timeout } from 'utils/helper';

export const useLogin = () => {
  const callback = async (params) => {
    try {
      const response = await trackPromise(userApi.login(params));
      await trackPromise(timeout(1000));
      return response?.data;
    } catch (e) {
      return '';
    }
  };
  return [callback];
};

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const callback = async (params) => {
    try {
      setLoading(true);
      const response = await trackPromise(userApi.register(params));
      setLoading(false);
      return response?.data;
    } catch (e) {
      setLoading(false);
      return '';
    }
  };

  return [callback, { loading }];
};
