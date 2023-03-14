import React from 'react';
import { useRecoilValue } from 'recoil';
import { isSidebarOpenState } from '../atoms';

export const Sidebar = () => {
  const isSidebarOpen = useRecoilValue(isSidebarOpenState);

  return (
    <div // 사이드바 오른쪽으로 밀리는 효과
      style={{
        position: 'fixed',
        top: '70px',
        left: isSidebarOpen ? 0 : '-250px',
        width: '250px',
        height: '100%',
        backgroundColor: '#FFFFFF',
        transition: 'left 0.5s ease-in-out',
      }}
    >
      <ul>
        <li>카테고리1</li>
        <li>카테고리2</li>
        <li>카테고리3</li>
        <li>카테고리4</li>
      </ul>
    </div>
  );
};

export default Sidebar;
