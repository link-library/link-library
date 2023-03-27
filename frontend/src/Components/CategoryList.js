import React from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import {
  expandedCategoryState,
  isCreatingNewCategoryState,
  userCategoriesState,
} from '../atoms';
import { List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import SortableList from './SortableList';

const CategoryList = ({ categories }) => {
  const [userCategories, setUserCategories] =
    useRecoilState(userCategoriesState);

  const [isCreatingNewCategory, setIsCreatingNewCategory] = useRecoilState(
    isCreatingNewCategoryState
  );

  const [expandedCategories, setExpandedCategories] = useRecoilState(
    expandedCategoryState
  );

  const handleExpandClick = (rootId) => {
    setExpandedCategories({
      ...expandedCategories,
      [rootId]: !expandedCategories[rootId],
    });
  };

  const handleAddIconClick = (event, rootId) => {
    // 새 카테고리 추가 버튼 클릭시
    event.stopPropagation();
    setIsCreatingNewCategory(rootId);

    setExpandedCategories({
      ...expandedCategories,
      [rootId]: true,
    });
  };

  return (
    <List>
      {userCategories.map(
        (
          root // 상위 카테고리
        ) => (
          <React.Fragment key={root.id}>
            <ListItemButton
              onClick={() => handleExpandClick(root.id)}
              sx={{
                padding: '20px',
                border: '1px solid',
                borderColor: 'primary.main',
                '&:hover .addIcon': {
                  opacity: 1,
                },
              }}
            >
              <ListItemText>
                <Typography fontWeight="fontWeightBold">{root.name}</Typography>
              </ListItemText>
              <PlaylistAddIcon // 카테고리 생성 버튼
                className="addIcon"
                onClick={(event) => handleAddIconClick(event, root.id)}
                sx={{
                  color: '#339af0',
                  marginRight: '5px',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  opacity: 0,
                }}
              />
              {expandedCategories[root.id] ? ( // 카테고리 목록 열고 닫기
                <ExpandLess sx={{ color: '#A5D8FF' }} />
              ) : (
                <ExpandMore sx={{ color: '#A5D8FF' }} />
              )}
            </ListItemButton>
            <Collapse
              in={expandedCategories[root.id]}
              timeout="auto"
              unmountOnExit
            >
              <SortableList
                root={root}
                userCategories={userCategories}
                setUserCategories={setUserCategories}
                isCreatingNewCategory={isCreatingNewCategory}
                setIsCreatingNewCategory={setIsCreatingNewCategory}
              />
            </Collapse>
          </React.Fragment>
        )
      )}
    </List>
  );
};

export default CategoryList;
