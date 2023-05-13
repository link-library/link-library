import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { List, ListItemButton } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useRef, useState } from 'react';
import SortableListItem from './SortableListItem';
import NewCategoryInput from './NewCategoryInput';
import { categoryCreate, categoryDelete, postCreate } from '../Pages/Async';

export const SortableList = ({
  root,
  userCategories,
  setUserCategories,
  isCreatingNewCategory,
  setIsCreatingNewCategory,
  selectedCategoryId,
  handleCategoryClick,
  setSelectedCategoryName,
}) => {
  const [editingCategoryId, setEditingCategoryId] = useState(null); // 편집 중인 카테고리를 추적

  const sensors = useSensors(
    // 드래그 센서. 250ms만큼 누르고 있어야 드래그 가능해짐.
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
    if (active.categoryId !== over.categoryId) {
      const activeRoot = userCategories.find((root) =>
        root.categories.some(
          (category) => category.categoryId === active.categoryId
        )
      );
      const overRoot = userCategories.find((root) =>
        root.categories.some(
          (category) => category.categoryId === over.categoryId
        )
      );

      if (activeRoot.id === overRoot.id) {
        const oldIndex = activeRoot.categories.findIndex(
          (category) => category.categoryId === active.categoryId
        );
        const newIndex = overRoot.categories.findIndex(
          (category) => category.categoryId === over.categoryId
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

  const handleEditIconClick = (event, categoryId) => {
    // 카테고리 수정을 위해 현재 이름 값을 추적하는 이벤트
    event.stopPropagation();
    setEditingCategoryId(categoryId);
  };

  const handleSaveEdit = async (event, rootId, categoryId) => {
    // 편집된 카테고리 값을 db에 적용.
    const newName = event.target.textContent.trim();

    if (newName) {
      const newUserCategories = userCategories.map((root) =>
        root.id === rootId
          ? {
              ...root,
              categories: root.categories.map((category) =>
                category.categoryId === categoryId
                  ? { ...category, name: newName }
                  : category
              ),
            }
          : root
      );
      setUserCategories(newUserCategories);

      // const loggedInUserId = JSON.parse(localStorage.getItem('isLoggedIn'));
      // updateUserCategories(newUserCategories);
      setEditingCategoryId(null);
      setSelectedCategoryName(newName);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.blur(); // 엔터시에 onBlur를 실행시킴.
    }
  };

  const handleDeleteCategory = async (
    event,
    rootId,
    categoryId,
    categoryName
  ) => {
    event.stopPropagation();
    const msg = await categoryDelete(categoryId);
    console.log(`categoryId: ${categoryId}`);
    if (msg === '카테고리 삭제 완료') {
      console.log('카테고리 삭제 완료');
    }
    setUserCategories(
      userCategories.map((root) =>
        root.id === rootId
          ? {
              ...root,
              categories: root.categories.filter(
                (category) => category.categoryId !== categoryId
              ),
            }
          : root
      )
    );
  };

  const handleCreateNewCategory = async (newCategoryName, rootId) => {
    // const msg = await postCreate(newCategoryName);
    // console.log(msg);
    if (newCategoryName.trim()) {
      const newCategory = {
        id: uuidv4(),
        name: newCategoryName,
      };

      const msg = await categoryCreate(newCategoryName.trim());
      if (msg === '카테고리 생성 완료') {
        console.log('카테고리 생성 완료');
      }
      const newUserCategories = userCategories.map((root) =>
        root.id === rootId
          ? { ...root, categories: [...root.categories, newCategory] }
          : root
      );
      setUserCategories(newUserCategories);

      // const loggedInUserId = JSON.parse(localStorage.getItem('isLoggedIn'));
      // updateUserCategories(newUserCategories, loggedInUserId);

      setIsCreatingNewCategory(null);
    }
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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => {
        setActiveId(active.categoryId);
      }}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={root.categories.map((category) => category.categoryId)}
        strategy={verticalListSortingStrategy}
      >
        <List>
          {root.categories.map(
            (
              category // 하위 카테고리
            ) => (
              <React.Fragment key={category.categoryId}>
                <SortableListItem
                  category={category}
                  editingCategoryId={editingCategoryId}
                  handleEditIconClick={handleEditIconClick}
                  handleSaveEdit={handleSaveEdit}
                  handleKeyPress={handleKeyPress}
                  inputRef={inputRef}
                  handleDeleteCategory={handleDeleteCategory}
                  root={root}
                  handleCategoryClick={handleCategoryClick}
                  selectedCategoryId={selectedCategoryId}
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
                (category) => category.categoryId === activeId
              )?.name
            }
          </ListItemButton>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default SortableList;
