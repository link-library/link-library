import React, { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { saveUserToLocalStorage, usersState } from '../atoms';
import { useNavigate } from 'react-router-dom';

export const RegistrationPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
  const users = useRecoilValue(usersState);
  const setUsers = useSetRecoilState(usersState);

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
    if (users.some((u) => u.username === username)) {
      alert('Username already exists');
      return;
    }
    const user = { username, password };
    setUsers([...users, user]);
    setIsRegistered(true);
    saveUserToLocalStorage(user);
  };

  useEffect(() => {
    if (isRegistered) {
      console.log('Registered!');
      navigate('/login', { replace: true });
    }
  }, [isRegistered, navigate]);

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <br />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Regiter
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
