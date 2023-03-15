import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { expandedCategoryState, isSidebarOpenState } from '../atoms';
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

const rootCategories = [
  { id: '1', name: 'Loot 1' },
  { id: '2', name: 'Loot 2' },
  { id: '3', name: 'Loot 3' },
  { id: '4', name: 'Loot 4' },
];

const categories = [
  { id: '1', name: 'Category 1' },
  { id: '2', name: 'Category 2' },
  { id: '3', name: 'Category 3' },
  { id: '4', name: 'Category 4' },
];

const CategoryList = ({ categories }) => {
  const [expandedCategory, setExpandedCategory] = useRecoilState(
    expandedCategoryState
  );

  const handleExpandClick = (categoryId) => {
    setExpandedCategory(categoryId === expandedCategory ? '' : categoryId);
  };

  return (
    <List>
      {rootCategories.map((root) => (
        <React.Fragment key={root.id}>
          <ListItemButton onClick={() => handleExpandClick(root.id)}>
            <ListItemText primary={root.name} />
            {expandedCategory === root.id ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={expandedCategory === root.id}
            timeout="auto"
            unmountOnExit
          >
            <List>
              {categories.map((category) => (
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
        height: '100%',
        backgroundColor: '#FFFFFF',
        transition: 'left 0.5s ease-in-out',
      }}
    >
      <CategoryList categories={categories} />
    </Box>
  );
};

export default Sidebar;
