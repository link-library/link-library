import React, { useState, useRef, useEffect } from 'react';
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
import CheckIcon from '@mui/icons-material/Check';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Typography } from '@mui/material';
import NewCategoryInput from './NewCategoryInput';
import EditCategoryInput from './EditCategoryInput';

const CategoryList = ({ categories }) => {
  const [editingCategoryId, setEditingCategoryId] = useState(null); // 편집 중인 카테고리를 추적
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

  const handleEditIconClick = (event, categoryId) => {
    // 카테고리 수정을 위해 현재 이름 값을 추적하는 이벤트
    event.stopPropagation();
    setEditingCategoryId(categoryId);
  };

  const handleSaveEdit = (event, rootId, categoryId) => {
    const newName = event.target.textContent.trim();
    if (newName) {
      const newUserCategories = userCategories.map((root) =>
        root.id === rootId
          ? {
              ...root,
              categories: root.categories.map((category) =>
                category.id === categoryId
                  ? { ...category, name: newName }
                  : category
              ),
            }
          : root
      );
      setUserCategories(newUserCategories);

      const loggedInUserId = JSON.parse(localStorage.getItem('isLoggedIn'));
      updateUserCategories(newUserCategories, loggedInUserId);
      setEditingCategoryId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.blur();
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

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
                        backgroundColor:
                          editingCategoryId === category.id
                            ? 'inherit'
                            : '#E7F5FF',
                      },
                      '&:hover .editIcon': {
                        opacity: editingCategoryId === category.id ? 0 : 1,
                      },
                      '&:hover .deleteIcon': {
                        opacity: editingCategoryId === category.id ? 0 : 1,
                      },
                    }}
                  >
                    {editingCategoryId === category.id ? (
                      <ListItemText
                        primary={category.name}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(event) =>
                          handleSaveEdit(event, root.id, category.id)
                        }
                        onKeyPress={handleKeyPress}
                        style={{
                          width: '100%',
                          padding: '5px',
                          border: '1px solid black',
                          marginRight: '10px',
                        }}
                      />
                    ) : (
                      <ListItemText primary={category.name} />
                    )}
                    <EditIcon
                      className="editIcon"
                      onClick={(event) =>
                        handleEditIconClick(event, category.id)
                      }
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
