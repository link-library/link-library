import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';
import { Box, Grid, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import AddWebsiteDialog from './AddWebsiteDialog';
import { categoryDataState } from '../atoms';
import { useRecoilValue } from 'recoil';

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

  const [AddWebsiteDialogOpen, setAddWebsiteDialogOpen] = useState(false); // 웹 사이트 추가 팝업창 상태 관리
  const categoryData = useRecoilValue(categoryDataState);
  const handleAddWebsiteDialogOpen = () => {
    if (categoryData[0].categories.length === 0) {
      alert('먼저 카테고리를 하나 이상 만들어야 합니다.');
    } else setAddWebsiteDialogOpen(true);
  };

  const handleAddWebsiteDialogClose = () => {
    setAddWebsiteDialogOpen(false);
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

  const AddPostButton = () => {
    // Post link 추가 버튼

    return (
      <>
        <IconButton
          onClick={handleAddWebsiteDialogOpen}
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
        <AddWebsiteDialog
          open={AddWebsiteDialogOpen}
          handleClose={handleAddWebsiteDialogClose}
        />
      </>
    );
  };
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '100px',
        right: '50px',
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
