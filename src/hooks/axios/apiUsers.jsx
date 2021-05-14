import { useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import userApi from 'api/userApi';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const callback = async (params) => {
    try {
      setLoading(true);
      const response = await trackPromise(userApi.login(params));
      setLoading(false);
      return response;
    } catch (e) {
      setLoading(false);
      return '';
    }
  };

  return [callback, { loading }];
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
