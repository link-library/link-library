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
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRef, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { categoryDataState, postDataState } from '../atoms';
import { postCreate } from '../Pages/Async';

const AddWebsiteDialog = ({ open, handleClose }) => {
  const userCategories = useRecoilValue(categoryDataState); // 카테고리 관리 atom 불러오기

  const [anchorEl, setAnchorEl] = useState(null); // 메뉴바 위치 추적

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (categoryName) => {
    setAnchorEl(null);
    if (typeof categoryName === 'string') {
      const selectedCategory = pageListSubcategories.find(
        (subcategory) => subcategory.name === categoryName
      );
      setSelectedCategoryName(categoryName);
      setSelectedCategoryId(selectedCategory?.categoryId || null);
      console.log(
        `categoryName: ${categoryName}, categoryId: ${selectedCategory?.categoryId}`
      );
    }
  };

  const pageListCategory = userCategories.find(
    // 페이지 목록 하위 카테고리만 골라내기
    (category) => category.name === '페이지 목록'
  );

  const pageListSubcategories = pageListCategory
    ? pageListCategory.categories
    : [];

  const [selectedCategoryName, setSelectedCategoryName] = useState(
    pageListSubcategories.length > 0 ? pageListSubcategories[0].name : ''
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState(
    pageListSubcategories.length > 0 ? pageListSubcategories[0].categoryId : ''
  );
  const [prevPostcardData, setPostcardData] = useRecoilState(postDataState);

  const nameRef = useRef();
  const urlRef = useRef();
  const descriptionRef = useRef();

  const handleSubmit = async () => {
    // 팝업창에 입력된 값을 추적하는 핸들러

    const {
      message,
      postId,
      title,
      memo,
      url,
      bookmark,
      nickname,
      updatedAt,
      categoryName,
      storeFileName,
      categoryId,
    } = await postCreate(
      false,
      selectedCategoryId,
      descriptionRef.current.value,
      nameRef.current.value,
      urlRef.current.value
    );
    console.log(message);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
    console.log(formattedDate);

    if (message === '포스터 생성 완료. 전체 조회 화면으로 이동') {
      const newPostcardData = {
        postId: postId,
        title: nameRef.current.value,
        memo: descriptionRef.current.value,
        url: urlRef.current.value,
        bookmark: false,
        nickname: nickname,
        updatedAt: formattedDate,
        categoryName: selectedCategoryName,
        storeFileName: storeFileName,
        categoryId: selectedCategoryId,
      };
      console.log(postId);
      console.log(title);
      console.log(memo);
      setPostcardData((prevPostcardData) => [
        newPostcardData,
        ...prevPostcardData,
      ]);
      console.log([...prevPostcardData, newPostcardData]);
    } else if (
      message === '카테고리는 필수 선택 사항입니다.' ||
      message === '제목을 입력해주세요' ||
      message === '주소를 입력해주세요'
    ) {
      alert(message);
      return;
    }
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
          value={
            selectedCategoryName
              ? selectedCategoryName
              : '카테고리를 선택하세요.'
          }
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
