import React from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import useAuth from '../../hooks/useAuth';

function SignInCard() {
  console.log('SignInCard > useAuth');
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div className="p-3">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">로그인</h1>
        <form onSubmit={handleSubmit(login)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-lg"
              {...register('email', {
                required: {
                  value: true,
                  message: '이메일은 필수 입력 항목입니다.',
                },
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p style={{ color: 'red' }}>{message}</p>
              )}
            ></ErrorMessage>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-lg"
              {...register('password', {
                required: {
                  value: true,
                  message: '비밀번호는 필수 입력 항목입니다.',
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,15}$/,
                  message:
                    '비밀번호는 문자, 숫자, 특수문자(!@#$%^*+=-)를 포함하여 최소 6자 이상, 15자 이하로 입력해야 합니다.',
                },
              })}
            ></input>
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <p style={{ color: 'red' }}>{message}</p>
              )}
            ></ErrorMessage>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            로그인
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            계정이 없으신가요?{' '}
            <a href="#" className="text-blue-500">
              회원가입
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInCard;
