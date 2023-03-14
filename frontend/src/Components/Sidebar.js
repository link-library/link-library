import React from 'react';
import { useRecoilState } from 'recoil';
import { isSidebarOpenState } from '../atoms';

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(isSidebarOpenState);

  const handleToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
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
