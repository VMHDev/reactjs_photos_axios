import axiosClient from './axiosClient';
const authApi = {
  login: (data) => {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
};
export default authApi;
