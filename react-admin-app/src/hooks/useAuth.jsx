import { useEffect, useState } from 'react';
import { useApi } from '../api/index';
import { useLocation, useNavigate } from 'react-router';
import { useAuthStore } from '../stores/authStore';

function useAuth() {
  const { user, setUser } = useAuthStore();

  const { api } = useApi();
  const navigate = useNavigate();
  const location = useLocation();

  const userId = localStorage.getItem('id');
  useEffect(() => {
    if (!userId && !user) {
      // 현재 경로가 '/signin'이 아닌 경우 returnUrl을 설정한다.
      if (location.pathname !== '/signin') {
        console.log('current url:', location.pathname);
        localStorage.setItem('returnUrl', location.pathname);
      }
      navigate('/signin');
      return;
    }
    if (userId && !user) {
      fetchUser(userId);
    }
  }, []);

  const fetchUser = async userId => {
    await api.user
      .get(userId)
      .then(res => {
        setUser(res.data);
        console.log('data:', res.data);
        localStorage.removeItem('id');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('name', res.data.name);
        // localStorage.setItem('token', res.data.token);
      })
      .catch(err => console.log(err));
  };
  const login = async params => {
    console.log('params:', params);
    /**
     * TODO 실제 서버에 로그인 요청을 해서 id 값을 받아서 처리하도록 수정해야 한다.
     */
    //   axios
    //     .post('http://localhost:8080/api/v1/auth/signin', data)
    //     .then(({ data }) => console.log(data))
    //     .catch(err => console.log('axios error..........', err));
    const uId = 1;
    await fetchUser(uId);
    const returnUrl = localStorage.getItem('returnUrl');
    if (returnUrl) {
      localStorage.removeItem('returnUrl');
      navigate(returnUrl);
    } else {
      navigate('/');
    }
  };

  const logout = () => {
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('returnUrl');
    setUser(null);
  };

  return { user, login, logout };
}

export default useAuth;
