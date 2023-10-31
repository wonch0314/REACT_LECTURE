import axios from 'axios';

export const codes = {
  getAll: params => {
    return axios
      .get(`http://localhost:3001/codes/`, { params: params })
      .then(res => {
        console.log('res.headers:', res.headers);
        return {
          totalCount: res.headers['x-total-count'],
          data: res.data,
          currentPage: params._page,
          rowCount: params._limit,
          pageCount: params.pageCount,
        };
      });
  },
  get: id => {
    return axios.get(`http://localhost:3001/codes/${id}`).then(res => res.data);
  },
  post: params => {
    return axios
      .post(`http://localhost:3001/codes/`, params)
      .then(res => res.data);
  },
  put: params => {
    return axios
      .put(`http://localhost:3001/codes/${params.id}`, params)
      .then(res => res.data);
  },
  delete: id => {
    return axios
      .delete(`http://localhost:3001/codes/${id}`)
      .then(res => res.data);
  },
};
