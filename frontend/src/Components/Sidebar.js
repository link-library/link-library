import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import {
  expandedCategoryState,
  isCreatingNewCategoryState,
  isSidebarOpenState,
  updateUserCategories,
  userCategoriesState,
} from '../atoms';
import {
  List,
  ListItemButton,
  ListItemText,
  Box,
  Collapse,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Typography } from '@mui/material';
import NewCategoryInput from './NewCategoryInput';

const CategoryList = ({ categories }) => {
  const [userCategories, setUserCategories] =
    useRecoilState(userCategoriesState);
  const [expandedCategories, setExpandedCategories] = useRecoilState(
    expandedCategoryState
  );
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useRecoilState(
    isCreatingNewCategoryState
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

  const handleCreateNewCategory = (newCategoryName, rootId) => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: uuidv4(),
        name: newCategoryName,
      };

      const newUserCategories = userCategories.map((root) =>
        root.id === rootId
          ? { ...root, categories: [...root.categories, newCategory] }
          : root
      );
      setUserCategories(newUserCategories);

      const loggedInUserId = JSON.parse(localStorage.getItem('isLoggedIn'));
      updateUserCategories(newUserCategories, loggedInUserId);

      setIsCreatingNewCategory(null);
    }
  };

  const handleDeleteCategory = (event, rootId, categoryId) => {
    event.stopPropagation();
    setUserCategories(
      userCategories.map((root) =>
        root.id === rootId
          ? {
              ...root,
              categories: root.categories.filter(
                (category) => category.id !== categoryId
              ),
            }
          : root
      )
    );
  };

  return (
    <List>
      {userCategories.map((root) => (
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
            <PlaylistAddIcon
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
            {expandedCategories[root.id] ? (
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
            <List>
              {root.categories.map((category) => (
                <React.Fragment key={category.id}>
                  <ListItemButton
                    sx={{
                      padding: '20px',
                      '&:hover': {
                        backgroundColor: '#E7F5FF',
                      },
                      '&:hover .editIcon': {
                        opacity: 1,
                      },
                      '&:hover .deleteIcon': {
                        opacity: 1,
                      },
                    }}
                  >
                    <ListItemText primary={category.name} />
                    <EditIcon
                      className="editIcon"
                      sx={{
                        display: { xs: 'none', sm: 'block' },
                        marginLeft: 'auto',
                        opacity: 0,
                        paddingLeft: '5px',
                        transition: 'opacity 0.2s',
                        '&:hover': {
                          color: '#69db7c',
                        },
                      }}
                    />
                    <DeleteIcon
                      className="deleteIcon"
                      onClick={(event) =>
                        handleDeleteCategory(event, root.id, category.id)
                      }
                      sx={{
                        display: { xs: 'none', sm: 'block' },
                        marginLeft: 'auto',
                        paddingLeft: '5px',
                        opacity: 0,
                        transition: 'opacity 0.2s',
                        '&:hover': {
                          color: '#fa5252',
                        },
                      }}
                    />
                  </ListItemButton>
                </React.Fragment>
              ))}
              {isCreatingNewCategory === root.id && (
                <NewCategoryInput
                  onCreate={(newCategoryName) =>
                    handleCreateNewCategory(newCategoryName, root.id)
                  }
                  onCancel={() => setIsCreatingNewCategory(null)}
                />
              )}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

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
