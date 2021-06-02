import axiosClient from './axiosClient';
const authApi = {
  login: (data) => {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
  refreshToken: (data) => {
    const url = '/auth/token-refresh';
    return axiosClient.post(url, data);
  },
  logout: () => {
    const url = '/auth/logout';
    return axiosClient.get(url);
  },
  changePassword: (data) => {
    const url = `/auth/password/${data._id}`;
    return axiosClient.put(url, data);
  },
  getTokenPassword: (data) => {
    const url = `/auth/token-password/${data}`;
    return axiosClient.get(url);
  },
  addTokenPassword: (data) => {
    const url = '/auth/token-password';
    return axiosClient.post(url, data);
  },
};
export default authApi;
