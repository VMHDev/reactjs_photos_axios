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
  update: (data) => {
    const url = `/user/${data._id}`;
    return axiosClient.put(url, data);
  },
};
export default userApi;
