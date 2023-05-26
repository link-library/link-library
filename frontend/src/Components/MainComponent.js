import { useRecoilState, useRecoilValue } from 'recoil';
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
import { postDelete } from '../Pages/Async';

export const MainComponent = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  const selectedCategoryName = useRecoilValue(selectedCategoryNameState);
  const isSidebarOpen = useRecoilValue(isSidebarOpenState);

  const [postcards, setPostcards] = useRecoilState(postDataState);

  const handleDelete = async (id) => {
    console.log(id);
    const message = await postDelete(id);
    console.log(message);
    if (message === '포스트 삭제 완료') {
      console.log(message);
      setPostcards(postcards.filter((postcard) => postcard.postId !== id));
    }
  };

  const getGridTemplateColumns = () => {
    if (isXs || isSm || isMd || isLg) {
      return 'repeat(auto-fit, minmax(260px, 260px))';
    }
  };

  const getGridGap = () => {
    if (isXs) return '16px';
    if (isSm) return '24px';
    if (isMd) return '32px';
    if (isLg) {
      return isSidebarOpen ? '32px' : '48px';
    }
  };

  const getMarginLeft = () => {
    if (isSidebarOpen) return '80px';
    return '50px';
  };

  const getMarginRight = () => {
    if (isSidebarOpen) return '50px';
    return '50px';
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: isSidebarOpen ? 'calc(100vw - 250px)' : '100vw',
        marginLeft: getMarginLeft(),
        // marginRight: getMarginRight(),
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          position: 'sticky',
          top: 0,
          zIndex: 1,
          overflowY: 'auto',
        }}
      >
        <Typography variant="h4" component="h4" sx={{ paddingTop: '20px' }}>
          {selectedCategoryName}
        </Typography>
        <Typography>카테고리 별 포스트 개수 표시 예정</Typography>
        <FilterTab />
      </Box>
      <Box
        sx={{
          marginTop: 2,
          overflowY: 'auto',
          height: 'calc(100vh - 240px)',
        }}
      >
        <Grid
          container
          sx={{
            display: 'grid',
            gridTemplateColumns: getGridTemplateColumns(),
            gap: getGridGap(),
            justifyContent: 'flex-start',
            paddingTop: '30px',
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
                  timeout={300}
                  classNames="postcard"
                >
                  <Grid item>
                    <PostCard
                      key={postcard.postId}
                      id={postcard.postId}
                      title={postcard.title}
                      url={postcard.url}
                      description={postcard.memo}
                      categoryName={postcard.categoryName}
                      categoryId={postcard.categoryId}
                      bookmark={postcard.bookmark}
                      nickname={postcard.nickname}
                      storeFileName={postcard.storeFileName}
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
