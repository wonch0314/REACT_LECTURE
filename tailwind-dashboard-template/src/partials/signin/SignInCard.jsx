import React from 'react';

function SignInCard() {

  return (
    <div className="p-3">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">로그인</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-lg"
            ></input>
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
            ></input>
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
