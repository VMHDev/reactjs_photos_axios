// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig`
import axios from 'axios';
import queryString from 'query-string';
import store from 'redux/store';

import { API_URL } from 'constants/system';
import { PATH_USER_LOGIN } from 'constants/route';

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {
  const token = store.getState().cookies?.token;
  if (token?.accessToken) {
    config.headers.Authorization = `Bearer ${token?.accessToken}`;
  }
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      console.log('error.response', error.response);
      console.log('window.location', window.location.pathname);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        if (window.location.pathname !== PATH_USER_LOGIN) {
          window.location.href = PATH_USER_LOGIN;
        }
      }
    } catch (error) {
      console.log('api/axiosClient:', error);
    }
    return error?.response;
  }
);
export default axiosClient;
