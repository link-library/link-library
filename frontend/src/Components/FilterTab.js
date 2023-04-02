import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import { Box, Grid, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

const FilterOptions = ({ anchorEl, handleClose }) => {
  // 필터 옵션 설정
  return (
    <Menu
      anchorReference="anchorPosition"
      anchorPosition={anchorEl}
      open={Boolean(anchorEl)} // 필터메뉴 표시 여부 결정
      onClose={handleClose} // anchorEl을 null로 설정하여 open이 false가 되도록 유도하는 콜백함수를 실행시킴
      keepMounted // true시에 DOM에서 메뉴의 하위 요소를 유지하도록 함으로써 성능향상에 기여
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem onClick={handleClose}>최근 생성순</MenuItem>
      <MenuItem onClick={handleClose}>이름순</MenuItem>
      {/* 클릭하면 메뉴가 닫히도록 해야함 */}
    </Menu>
  );
};

const FilterTab = () => {
  const [anchorEl, setAnchorEl] = useState(null); // 필터 메뉴 객체 관리 스테이트

  const handleClick = (event) => {
    setAnchorEl({ top: event.clientY, left: event.clientX });
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const FilterButton = () => {
    return (
      <>
        <IconButton
          onClick={handleClick}
          sx={{
            color: '#339af0',
            backgroundColor: '#74c0fc',
            borderRadius: '8px',
            border: 'none',
            padding: '3px',
          }}
        >
          <FilterAltIcon />
        </IconButton>
        <FilterOptions anchorEl={anchorEl} handleClose={handleClose} />
      </>
    );
  };

  const AddPostButton = ({ onClick }) => {
    return (
      <IconButton
        onClick={onClick}
        sx={{
          color: '#FFFFFF',
          fontWeight: 'bold',
          backgroundColor: '#74c0fc',
          borderRadius: '8px',
          border: 'none',
          padding: '3px',
        }}
      >
        <AddIcon />
      </IconButton>
    );
  };
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '40px',
        right: '100px',
      }}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
      >
        <Grid item>
          <FilterButton />
        </Grid>
        <Grid item>
          <AddPostButton />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterTab;