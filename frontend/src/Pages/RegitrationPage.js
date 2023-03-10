import React, { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { saveUserToLocalStorage, usersState } from '../atoms';
import { useNavigate } from 'react-router-dom';
import {
  Background,
  Container,
  Input,
  RegistBox,
  RegistForm,
} from '../Style/LoginPageStyle';
import { Button } from '../Style/LoginPageStyle';

export const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const users = useRecoilValue(usersState);
  const setUsers = useSetRecoilState(usersState);
  const [idCheck, setIdCheck] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      alert('Please enter a username and password');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (idCheck === false) {
      alert('아이디 중복 체크를 확인해주세요.');
      return;
    }
    const user = { username, password };
    setUsers([...users, user]);
    setIsRegistered(true);
    saveUserToLocalStorage(user);
  };

  const handleIdCheck = (event) => {
    event.preventDefault();
    if (users.some((u) => u.username === username)) {
      // 아이디 중복 체크
      alert('중복된 아이디가 존재합니다.');
      setIdCheck(false);
      return;
    } else {
      // 중복 없음 확인

      alert('사용 가능한 아이디입니다!');
      setIdCheck(true);
    }
  };

  const handleInputChange = (event) => {
    // id입력창에 입력을 받으면 idcheck를 false로 전환
    setUsername(event.target.value);
    setIdCheck(false);
  };

  useEffect(() => {
    if (isRegistered) {
      console.log('Registered!');
      navigate('/login', { replace: true });
    }
  }, [isRegistered, navigate]);

  return (
    <Background>
      <Container width="40vw">
        <RegistBox>
          <h1 style={{ textAlign: 'center' }}>회원가입</h1>
          <RegistForm>
            <label>ID</label>
            <br />
            <div style={{ display: 'flex' }}>
              <Input
                type="text"
                value={username}
                onChange={handleInputChange}
              />
              <Button small blue idCheck={idCheck} onClick={handleIdCheck}>
                중복확인
              </Button>
            </div>
            <label>Password</label>
            <br />
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <label>Confirm Password</label>
            <br />
            <Input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />

            <br />
            <Button onClick={handleSubmit}>회원가입</Button>
          </RegistForm>
        </RegistBox>
      </Container>
    </Background>
  );
};

export default RegistrationPage;
