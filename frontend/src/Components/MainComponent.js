import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isSidebarOpenState, selectedCategoryNameState } from '../atoms';
import FilterTab from './FilterTab';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { PostCard } from './PostCard';
import '../Animations/postcard-transitions.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export const MainComponent = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  const selectedCategoryName = useRecoilValue(selectedCategoryNameState);
  const isSidebarOpen = useRecoilValue(isSidebarOpenState);

  const [postcards, setPostcards] = useState([]); // 포스트 카드의 저장소

  const handleAddPostcard = (postcardData) => {
    // 포스트 카드 추가 헨들러

    const newPostcard = {
      id: Date.now(),
      creationTime: Date.now(),
      ...postcardData,
    };
    setPostcards((prevPostcards) => [...prevPostcards, newPostcard]);
  };

  const handleDelete = (id) => {
    // 포스트 카드 삭제 헨들러
    setPostcards(postcards.filter((postcard) => postcard.id !== id));
  };

  const getGridTemplateColumns = () => {
    if (isXs) return 'repeat(1, minmax(260px, 1fr))';
    if (isSm) return 'repeat(2, minmax(260px, 1fr))';
    if (isMd) return 'repeat(3, minmax(260px, 1fr))';
    if (isLg) {
      return isSidebarOpen
        ? 'repeat(4, minmax(260px, 1fr))'
        : 'repeat(5, minmax(260px, 1fr))';
    }
  };

  return (
    <Box
      sx={{
        overflow: 'auto',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'auto',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: '20px',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        <Typography variant="h4" component="h4" sx={{ paddingTop: '20px' }}>
          {selectedCategoryName}
        </Typography>
        <Typography>링크 카드 배치</Typography>
        <FilterTab handleAddPostcard={handleAddPostcard} />
      </Box>
      <Box
        sx={{
          marginTop: 2,
          overflowY: 'auto',
          height: 'calc(100vh - 150px)',
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: 'grid',
            gridTemplateColumns: getGridTemplateColumns(),
            gap: '10px',
            paddingTop: '30px',
            paddingLeft: '50px',
            maxWidth: '100%',
            transition: 'grid-template-columns 0.5s ease-in-out',
          }}
        >
          <TransitionGroup component={null}>
            {postcards.map((postcard) => (
              <CSSTransition
                key={postcard.id}
                timeout={500}
                classNames="postcard"
              >
                <Grid item>
                  <PostCard // 포스트 카드 배치
                    key={postcard.id}
                    id={postcard.id}
                    title={postcard.title}
                    url={postcard.url}
                    description={postcard.description}
                    category={postcard.category}
                    onDelete={handleDelete}
                    creationTime={postcard.creationTime}
                  />
                </Grid>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Grid>
      </Box>
    </Box>
  );
};
export default MainComponent;
