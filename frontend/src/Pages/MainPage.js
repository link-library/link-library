import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { isSidebarOpenState } from '../atoms';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import MainFrame from '../Components/MainFrame';
import { logoutUser } from './Async';

export const MainPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const msg = await logoutUser(localStorage.getItem('accessToken'));
    if (msg === '잘못된 요청입니다.') {
      alert(msg);
      return;
    }
    if (msg === '로그아웃 되었습니다') {
      alert(msg);
      localStorage.removeItem('accessToken');
      navigate('/login', { replace: true });
      window.location.reload();
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenState); // 사이드바 관리 State

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    console.log(1);
    if (localStorage.getItem('accessToken') === null) {
      navigate('/login', { replace: true });
      window.location.reload();
    }
  }, [navigate]);

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
        <MainFrame />
      </div>
    </div>
  );
};

export default MainPage;
