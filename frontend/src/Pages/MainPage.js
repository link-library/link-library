import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../atoms';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

export const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/', { replace: true });
    window.location.reload();
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
      window.location.reload();
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div>
      <Header handleLogout={handleLogout} />
    </div>
  );
};

export default MainPage;
