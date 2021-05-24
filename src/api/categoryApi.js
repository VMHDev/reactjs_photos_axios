import axiosClient from './axiosClient';
const categoryApi = {
  getAll: () => {
    const url = '/category';
    return axiosClient.get(url);
  },
  add: (data) => {
    const url = '/category';
    return axiosClient.post(url, data);
  },
  update: (data) => {
    const url = `/category/${data._id}`;
    return axiosClient.put(url, data);
  },
  delete: (data) => {
    const url = `/category/${data}`;
    return axiosClient.delete(url);
  },
};
export default categoryApi;
