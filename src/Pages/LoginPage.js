import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, usersState, isLoggedInState } from '../atoms';
import { useNavigate, Navigate } from 'react-router-dom';

export const LoginPage = () => {
  const [users, setUsers] = useRecoilState(usersState);
  const setUser = useSetRecoilState(userState);
  const [isRegistered, setIsRegistered] = useRecoilState(isLoggedInState);
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      // 입력한 정보가 DB에 있을 경우
      setIsRegistered(true);
      setUser(user);
    } else {
      alert('Invalid username or password');
    }
  };

  if (isRegistered) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate('/join')}>회원가입</button>
      {/* navigate는 이벤트로 사용시 useNavigate로 사용해야함. */}
    </div>
  );
};

export default LoginPage;
