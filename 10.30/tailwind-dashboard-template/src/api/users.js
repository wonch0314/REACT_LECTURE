import axios from "axios";

export const users = {
  get: (id) => {
    // return axios.get('http://localhost:3001/users/' + id)
    return axios.get(`http://localhost:3001/users/${id}`);
  },
};
