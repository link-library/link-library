import React, { useEffect, useState } from 'react';
import {
  useRecoilState,
  useRecoilTransactionObserver_UNSTABLE,
  useRecoilValue,
} from 'recoil';
import {
  isSidebarOpenState,
  postDataState,
  selectedCategoryNameState,
} from '../atoms';
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

  const [postcards, setPostcards] = useRecoilState(postDataState); // 포스트 카드의 저장소

  // const handleAddPostcard = (postcardData) => {
  //   // 포스트 카드 추가 헨들러
  //   const newPostcard = {
  //     postId: postcardData.postId,
  //     title: postcardData.title,
  //     url: postcardData.url,
  //     memo: postcardData.memo,
  //     categoryName: postcardData.categoryName,
  //     updatedAt: postcardData.updatedAt,
  //   };
  //   setPostcards((prevPostcards) => [...prevPostcards, newPostcard]);
  // };

  // useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
  //   const newPostcards = snapshot.getLoadable(postDataState).contents;
  //   setPostcards(newPostcards);
  // });

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
        <FilterTab />
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
            {postcards
              .filter(
                (postcard) => postcard.categoryName === selectedCategoryName
              )
              .map((postcard) => (
                <CSSTransition
                  key={postcard.postId}
                  timeout={500}
                  classNames="postcard"
                >
                  <Grid item>
                    <PostCard // 포스트 카드 배치
                      key={postcard.postId}
                      id={postcard.postId}
                      title={postcard.title}
                      url={postcard.url}
                      description={postcard.memo}
                      category={postcard.categoryName}
                      onDelete={handleDelete}
                      creationTime={postcard.updatedAt}
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
