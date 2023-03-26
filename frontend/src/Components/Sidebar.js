import React from 'react';
import { useRecoilValue } from 'recoil';

import { isSidebarOpenState } from '../atoms';
import { Box } from '@mui/material';

import CategoryList from './CategoryList';

export const Sidebar = () => {
  const isSidebarOpen = useRecoilValue(isSidebarOpenState);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '70px',
        left: isSidebarOpen ? 0 : '-250px',
        width: '250px',
        height: 'calc(100% - 70px)',
        backgroundColor: '#FFFFFF',
        transition: 'left 0.5s ease-in-out',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '0.4em',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#4dabf7',
        },
      }}
    >
      <CategoryList />
    </Box>
  );
};

export default Sidebar;
