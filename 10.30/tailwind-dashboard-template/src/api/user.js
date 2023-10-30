import { axiosInstance } from "./settings";

export const user = {
  get: (id) => {
    return axiosInstance.get(`users/${id}`);
  },
};
