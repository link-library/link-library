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
  Logo,
} from '../Style/LoginPageStyle';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LockIcon from '@mui/icons-material/Lock';
import LinkLibraryLogo from '../images/LinkLibraryLogo.png';

export const LoginPage = () => {
  const [users, setUsers] = useRecoilState(usersState);
  const setUser = useSetRecoilState(userState);
  const [isRegistered, setIsRegistered] = useRecoilState(isLoggedInState);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkClicked, setCheckClicked] = useState(false);

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

  const handleCheckClick = () => {
    setCheckClicked(!checkClicked);
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
            <Logo src={LinkLibraryLogo} alt="Link Library Logo" />
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
            <div style={{ display: 'flex' }}>
              <div onClick={handleCheckClick} style={{ color: '#4dabf7' }}>
                {checkClicked ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
              </div>
              <div
                style={{ marginLeft: 10, marginBottom: 20, fontSize: '1.2rem' }}
              >
                로그인 상태 유지
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ color: '#4dabf7' }}>
                <LockIcon />
              </div>
              <div
                style={{ marginLeft: 10, marginBottom: 20, fontSize: '1.2rem' }}
              >
                아이디 | 비밀번호 찾기
              </div>
            </div>

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
