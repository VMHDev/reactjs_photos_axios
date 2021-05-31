// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#requestconfig`
import axios from 'axios';
import queryString from 'query-string';
import jwt from 'jsonwebtoken';
import momenttimezone from 'moment-timezone';

import { API_URL } from 'constants/system';
import store from 'redux/store';
import { TIME_ZONE } from 'constants/system';

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
    const decoded = jwt.decode(token?.accessToken);
    const timeExp = momenttimezone.unix(decoded.exp);
    const timeExpConvert = momenttimezone.tz(timeExp, TIME_ZONE);
    const timeNow = momenttimezone.tz(Date.now(), TIME_ZONE);
    const isExpire = timeNow.diff(timeExpConvert) >= 0 ? true : false;

    if (!isExpire) {
      config.headers.Authorization = `Bearer ${token?.accessToken}`;
    }
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
