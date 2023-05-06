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
import { validateId } from './Async';

export const RegistrationPage = () => {
  const [userId, setUserId] = useState(''); // 이걸 아이디 스테이트로 쓰고
  const [userName, setUserName] = useState(''); // 이걸 닉네임 스테이트로 바꿔야함.
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const users = useRecoilValue(usersState);
  const setUsers = useSetRecoilState(usersState);
  const [idCheck, setIdCheck] = useState(false); // 이거를 아이디 체크로 쓰고
  const [userNameCheck, setUserNameCheck] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userId || !password || !confirmPassword || !userName) {
      alert('회원가입 양식을 맞춰주세요.');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (idCheck === false) {
      alert('아이디 중복 체크를 확인해주세요.');
      return;
    }
    if (userNameCheck === false) {
      alert('아이디 중복 체크를 확인해주세요.');
      return;
    }
    const defaultCategories = [
      { id: '1', name: '페이지 목록', categories: [] },
      { id: '2', name: '미구현', categories: [] },
    ];
    const user = { userId, password, userName, categories: defaultCategories };
    setUsers([...users, user]);
    setIsRegistered(true);
    saveUserToLocalStorage(user);
  };

  const handleIdCheck = async (event) => {
    event.preventDefault();
    const message = await validateId(userId);

    if (message === '이미 사용중인 아이디 입니다.') {
      // 아이디 중복 체크
      alert('이미 사용중인 아이디 입니다.');
      setIdCheck(false);
      return;
    } else {
      // 중복 없음 확인

      alert('사용 가능한 아이디입니다.');
      setIdCheck(true);
    }
  };

  const handleUsernameCheck = (event) => {
    event.preventDefault();
    if (users.some((u) => u.userName === userName)) {
      // 닉네임 중복 체크
      alert('중복된 닉네임이 존재합니다.');
      setUserNameCheck(false);
      return;
    } else {
      // 중복 없음 확인

      alert('사용 가능한 닉네임입니다!');
      setUserNameCheck(true);
    }
  };

  const handleUserIdInputChange = (event) => {
    // id입력창에 입력을 받으면 idcheck를 false로 전환
    setUserId(event.target.value);
    setIdCheck(false);
  };

  const handleUsernameInputChange = (event) => {
    // id입력창에 입력을 받으면 idcheck를 false로 전환
    setUserName(event.target.value);
    setUserNameCheck(false);
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
            <label>아이디</label>
            <br />
            <div style={{ display: 'flex' }}>
              <Input
                type="text"
                value={userId}
                onChange={handleUserIdInputChange}
              />
              <Button small blue Check={idCheck} onClick={handleIdCheck}>
                중복확인
              </Button>
            </div>

            <label>닉네임</label>
            <br />
            <div style={{ display: 'flex' }}>
              <Input
                type="text"
                value={userName}
                onChange={handleUsernameInputChange}
              />
              <Button
                small
                blue
                Check={userNameCheck}
                onClick={handleUsernameCheck}
              >
                중복확인
              </Button>
            </div>

            <label>비밀번호</label>
            <br />
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <label>비밀번호 확인</label>
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
