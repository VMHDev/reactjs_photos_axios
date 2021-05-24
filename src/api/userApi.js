import axiosClient from './axiosClient';
const userApi = {
  getById: (params) => {
    const url = `/user/${params}`;
    return axiosClient.get(url);
  },
  getByEmail: (data) => {
    const url = '/user/email';
    return axiosClient.post(url, data);
  },
  register: (data) => {
    const url = '/user/register';
    return axiosClient.post(url, data);
  },
  login: (data) => {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },
};
export default userApi;
