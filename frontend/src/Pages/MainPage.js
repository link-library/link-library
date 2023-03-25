import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isLoggedInState, isSidebarOpenState } from '../atoms';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import MainComponent from '../Components/MainComponent';

export const MainPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(null);
    navigate('/', { replace: true });
    window.location.reload();
  };

  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenState); // 사이드바 관리 State

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (isLoggedIn === null) {
      navigate('/login', { replace: true });
      window.location.reload();
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <div
      style={{
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Header handleLogout={handleLogout} handleMenuClick={handleMenuClick} />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        {/* <Category isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} /> */}
        <MainComponent />
      </div>
    </div>
  );
};

export default MainPage;
