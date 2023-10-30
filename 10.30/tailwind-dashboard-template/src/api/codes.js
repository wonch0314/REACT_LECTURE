import { axiosInstance } from "./settings";

export const codes = {
  getAll: async (params) => {
    const res = await axiosInstance.get(`codes/`, params);
    return res.data;
  },

  get: async (id) => {
    const res = await axiosInstance.get(`codes/${id}`);
    return res.data;
  },

  post: async (params) => {
    const res = await axiosInstance.post(`codes/`, params);
    return res.data;
  },

  put: async (params) => {
    const res = await axiosInstance.put(`codes/${params.id}`, params);
    return res.data;
  },

  delete: async (id) => {
    const res = await axiosInstance.delete(`codes/${id}`);
    return res.data;
  },
};

export const oooo = {
  getAll: (params) => {
    return axiosInstance.get(`codes/`, params).then((res) => res.data);
  },

  get: (id) => {
    return axiosInstance.get(`codes/${id}`).then((res) => res.data);
  },

  post: (params) => {
    return axiosInstance.post(`codes/`, params).then((res) => res.data);
  },

  put: (params) => {
    return axiosInstance.put(`codes/${params.id}`, params).then((res) => res.data);
  },

  delete: (id) => {
    return axiosInstance.delete(`codes/${id}`).then((res) => res.data);
  },
};
