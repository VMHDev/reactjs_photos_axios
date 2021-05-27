import axiosClient from './axiosClient';
const photoApi = {
  getAll: () => {
    const url = '/photo';
    return axiosClient.get(url);
  },
  getPublic: () => {
    const url = '/photo/public';
    return axiosClient.get(url);
  },
  getByUser: (data) => {
    const url = '/photo/user';
    return axiosClient.post(url, data);
  },
  add: (data) => {
    const url = '/photo';
    return axiosClient.post(url, data);
  },
  update: (data) => {
    const url = `/photo/${data._id}`;
    return axiosClient.put(url, data);
  },
  delete: (data) => {
    const url = `/photo/${data}`;
    return axiosClient.delete(url);
  },
};
export default photoApi;
