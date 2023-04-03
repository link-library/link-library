import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import { useRecoilValue } from 'recoil';
import { userCategoriesState } from '../atoms';
import { useRef, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const AddWebsiteDialog = ({ open, handleClose, onSubmit }) => {
  const userCategories = useRecoilValue(userCategoriesState); // 카테고리 관리 atom 불러오기

  const [anchorEl, setAnchorEl] = useState(null); // 메뉴바 위치 추적

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (categoryName) => {
    setAnchorEl(null);
    if (typeof categoryName === 'string') {
      setSelectedCategory(categoryName);
    }
  };

  const pageListCategory = userCategories.find(
    // 페이지 목록 하위 카테고리만 골라내기
    (category) => category.name === '페이지 목록'
  );

  const pageListSubcategories = pageListCategory
    ? pageListCategory.categories
    : [];

  const [selectedCategory, setSelectedCategory] = useState(
    pageListSubcategories.length > 0 ? pageListSubcategories[0].name : ''
  );

  const nameRef = useRef();
  const urlRef = useRef();
  const descriptionRef = useRef();

  const handleSubmit = () => {
    // 팝업창에 입력된 값을 추적하는 핸들러
    onSubmit({
      name: nameRef.current.value,
      url: urlRef.current.value,
      description: descriptionRef.current.value,
      category: selectedCategory,
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>웹사이트 추가</DialogTitle>
      <DialogContent>
        <TextField
          label="웹 사이트 이름"
          fullWidth
          margin="normal"
          inputRef={nameRef}
        />
        <TextField
          label="사이트 URL"
          fullWidth
          margin="normal"
          inputRef={urlRef}
        />
        <TextField
          inputRef={descriptionRef}
          label="사이트 설명(최대 40자)"
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          label="카테고리"
          value={selectedCategory}
          fullWidth
          margin="normal"
          onClick={handleMenuClick}
          readOnly
          InputProps={{
            endAdornment: (
              <IconButton>
                <MenuIcon />
              </IconButton>
            ),
          }}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {pageListSubcategories.map((subcategory, index) => (
            <MenuItem
              key={index}
              onClick={() => handleMenuClose(subcategory.name)}
            >
              {subcategory.name}
            </MenuItem>
          ))}
        </Menu>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소하기</Button>
        <Button variant="contained" onClick={handleSubmit}>
          추가하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddWebsiteDialog;
