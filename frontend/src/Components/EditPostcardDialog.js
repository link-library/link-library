import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { postDataState } from '../atoms';

const [open, setOpen] = useState(false);
const [editedPostcard, setEditedPostcard] = useRecoilState(postDataState);

const handleEdit = (id) => {
    // Find the postcard with the given id
    const postcard = editedPostcard.find((pc) => pc.postId === id);
    
    // Set the initial values of the edited postcard
    setEditedPostcard({
      categoryName: postcard.title,
      memo: postcard.url,
      title: postcard.description,
      url: postcard.category,
    });
  
    // Open the popup
    setOpen(true);
  

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
export default 