import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton } from '@mui/material';

const SearchTab = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    // 검색 버튼 핸들러
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: '2px solid transparent',
        borderColor: '#74C0FC',
        mt: 1.5,
      }}
    >
      <InputBase
        value={searchValue}
        onChange={handleInputChange}
        placeholder="링크 검색"
        sx={{
          flex: 1,
          color: 'inherit',
          pt: 1,
          pl: 0.5,
        }}
      />
      <IconButton
        onClick={handleSearchClick}
        sx={{
          color: '#74C0FC',
          p: 1,
        }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchTab;
