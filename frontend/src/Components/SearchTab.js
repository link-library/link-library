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
    // Implement search functionality based on searchValue
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: '2px solid transparent',
        borderColor: 'primary.main',
      }}
    >
      <InputBase
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search..."
        sx={{
          flex: 1,
          color: 'inherit',
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          pb: 0.5,
        }}
      />
      <IconButton
        onClick={handleSearchClick}
        sx={{
          color: 'inherit',
          p: 1,
        }}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchTab;
