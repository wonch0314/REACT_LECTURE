import axios from "axios";

const print = (a) => {
  console.log(`%c${a}`, "background: orange; color: white;");
};

export const user = {
  get: (id) => {
    return axios.get(`http://localhost:3001/users/${id}`);
  },
  getAll: (params) => {
    return axios.get(`http://localhost:3001/users/`, { params }).then((res) => {
      print("res.headers:", res.headers);
      console.log(params);
      return {
        totalCount: res.headers["x-total-count"],
        data: res.data,
        currentPage: params._page,
        rowCount: params._limit,
        pageCount: params.pageCount,
      };
    });
  },
  delete: (id) => {
    return axios
      .delete(`http://localhost:3001/users/${id}`)
      .then((res) => res.data);
  },
  post: (params) => {
    return axios
      .post(`http://localhost:3001/users/`, params)
      .then((res) => res.data);
  },
  put: (params) => {
    return axios
      .put(`http://localhost:3001/users/${params.id}`, params)
      .then((res) => res.data);
  },
};
