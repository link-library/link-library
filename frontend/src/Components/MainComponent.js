import React from 'react';
import { useRecoilValue } from 'recoil';
import { isSidebarOpenState } from '../atoms';
import Sidebar from './Sidebar';

export const MainComponent = () => {
  const isSidebarOpen = useRecoilValue(isSidebarOpenState);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#e7f5ff',
        marginLeft: isSidebarOpen ? '250px' : '0',
        transition: 'margin-left 0.5s ease-in-out',
        position: 'absolute',
        top: '70px',
        left: '0',
        bottom: '0',
        right: '0',
      }}
    >
      <Sidebar />
      <div style={{ flexGrow: 1, marginLeft: '20px' }}>
        <h1>헤더 테스트</h1>
        <p>링크 카드 배치</p>
      </div>
    </div>
  );
};

export default MainComponent;
