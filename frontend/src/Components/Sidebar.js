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
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Typography } from '@mui/material';
import NewCategoryInput from './NewCategoryInput';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableListItem from './SortableListItem';

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
    // 편집된 카테고리 값을 db에 적용.
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
      event.target.blur(); // 엔터시에 onBlur를 실행시킴.
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        delayTouch: 250,
      },
    })
  ); // 드래그 드롭을 위한 센서 추가
  const [activeId, setActiveId] = useState(null);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const activeRoot = userCategories.find((root) =>
        root.categories.some((category) => category.id === active.id)
      );
      const overRoot = userCategories.find((root) =>
        root.categories.some((category) => category.id === over.id)
      );

      if (activeRoot.id === overRoot.id) {
        const oldIndex = activeRoot.categories.findIndex(
          (category) => category.id === active.id
        );
        const newIndex = overRoot.categories.findIndex(
          (category) => category.id === over.id
        );

        const updatedCategories = arrayMove(
          activeRoot.categories,
          oldIndex,
          newIndex
        );
        const newUserCategories = userCategories.map((root) =>
          root.id === activeRoot.id
            ? { ...root, categories: updatedCategories }
            : root
        );
        setUserCategories(newUserCategories);
      }
    }

    setActiveId(null);
  };

  const inputRef = useRef(null); // 카테고리 이름 수정시 input 요소 맨 끝에 포커싱하기

  useEffect(() => {
    if (editingCategoryId && inputRef.current) {
      const moveCursorToEnd = (el) => {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        el.focus();
      };

      moveCursorToEnd(inputRef.current);
    }
  }, [editingCategoryId]);

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
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={({ active }) => {
                  setActiveId(active.id);
                }}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={root.categories.map((category) => category.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <List>
                    {root.categories.map(
                      (
                        category // 하위 카테고리
                      ) => (
                        <React.Fragment key={category.id}>
                          <SortableListItem
                            category={category}
                            editingCategoryId={editingCategoryId}
                            handleEditIconClick={handleEditIconClick}
                            handleSaveEdit={handleSaveEdit}
                            handleKeyPress={handleKeyPress}
                            inputRef={inputRef}
                            handleDeleteCategory={handleDeleteCategory}
                            root={root}
                          />
                        </React.Fragment>
                      )
                    )}
                    {/* 카테고리 생성 활성화된 경우 */}
                    {isCreatingNewCategory === root.id && (
                      <NewCategoryInput
                        onCreate={(newCategoryName) =>
                          handleCreateNewCategory(newCategoryName, root.id)
                        }
                        onCancel={() => setIsCreatingNewCategory(null)}
                      />
                    )}
                  </List>
                </SortableContext>
                <DragOverlay>
                  {activeId ? (
                    <ListItemButton>
                      {
                        root.categories.find(
                          (category) => category.id === activeId
                        )?.name
                      }
                    </ListItemButton>
                  ) : null}
                </DragOverlay>
              </DndContext>
            </Collapse>
          </React.Fragment>
        )
      )}
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
