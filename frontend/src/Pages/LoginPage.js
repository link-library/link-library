import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState, usersState, isLoggedInState } from '../atoms';
import { useNavigate, Navigate } from 'react-router-dom';
import {
  Container,
  LoginBox,
  Form1,
  Form2,
  Input,
  Button,
  Background,
  ImgForm,
  ElongatedButton,
  InputContainer,
  BottomMargin,
} from '../Style/LoginPageStyle';

export const LoginPage = () => {
  const [users, setUsers] = useRecoilState(usersState);
  const setUser = useSetRecoilState(userState);
  const [isRegistered, setIsRegistered] = useRecoilState(isLoggedInState);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      // 입력한 정보가 DB에 있을 경우

      setUser(user);
      setIsRegistered(true);
    } else {
      alert('Invalid username or password');
    }
  };

  useEffect(() => {
    if (isRegistered) {
      navigate('/', { replace: true });
      window.location.reload();
    }
  }, [isRegistered, navigate]);

  return (
    <Background>
      <Container>
        <LoginBox>
          <Form1>
            <ImgForm />
            <BottomMargin />
          </Form1>
          <Form2 onSubmit={handleLogin}>
            <h1>로그인</h1>
            <BottomMargin />
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <Button type="submit">로그인</Button>
            <Button onClick={() => navigate('/join')}>회원가입</Button>
            {/* navigate는 이벤트로 사용시 useNavigate로 사용해야함. */}
          </Form2>
        </LoginBox>
      </Container>
    </Background>
  );
};

export default LoginPage;
