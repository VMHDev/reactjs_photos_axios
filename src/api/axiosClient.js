// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig`
import axios from 'axios';
import queryString from 'query-string';

import { API_URL } from 'constants/system';
import store from 'redux/store';

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
    return error?.response;
  }
);
export default axiosClient;
