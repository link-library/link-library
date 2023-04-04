import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import linkLibraryLogo from '../images/LinkLibraryLogo.png';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/material';
import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const PostCard = ({
  id,
  title,
  url,
  description,
  category,
  onDelete,
  creationTime,
}) => {
  const handleDeleteClick = () => {
    onDelete(id); // 포스트 카드 삭제
  };

  const formattedCreationTime = new Intl.DateTimeFormat('en-US', {
    // 포스트 생성 시간 생성기
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(creationTime));

  function truncate(str, maxLengh) {
    // 상세 설명란 n자 초과시 '...'으로 생략하게 만들기
    if (str.length > maxLengh) {
      return str.slice(0, maxLengh - 3) + '...';
    }
    return str;
  }

  const [likeClick, setLikeClick] = useState(false); // 찜하기 버튼 토글 관리

  const handleLikeClick = () => {
    // 찜하기 버튼 토글 기능
    setLikeClick(!likeClick);
  };

  const [SnackbarOpen, setSnackbarOpen] = useState(false); // 알림창 상태 관리

  const handleCopyClick = async () => {
    // url 복사 버튼 핸들러
    try {
      await navigator.clipboard.writeText(url);
      setSnackbarOpen(true);
    } catch (err) {
      console.error('URL 복사 실패!!', err);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 260,
        height: 300,
        position: 'relative',
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], width: 30, height: 30 }}>M</Avatar>
        }
        action={
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon
              sx={{
                fontSize: '1.4rem',
              }}
            />
          </IconButton>
        }
        title={title}
        subheader={formattedCreationTime}
        sx={{
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 1,
        }}
        titleTypographyProps={{
          variant: '12',
          fontWeight: 'bold',
        }}
        subheaderTypographyProps={{
          fonstSize: '1rem',
          fontWeight: 'normal',
        }}
      />
      <CardMedia
        sx={{
          display: 'flex',
          justifyContent: 'center', // 수평으로 중앙
          alignItems: 'center', // 수직으로 중앙
          height: '130px',
          borderTop: '2px solid black',
          borderBottom: '2px solid black',
          boxSizing: 'border-box',
        }}
      >
        <img
          src={linkLibraryLogo}
          alt="이미자"
          style={{
            width: '180px',
            height: '35px',
            objectFit: 'cover',
          }}
        />
      </CardMedia>
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            height: '60px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {truncate(description, 25)}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
      >
        <Box>
          <IconButton sx={{ padding: '5px' }} onClick={handleLikeClick}>
            {likeClick ? (
              <StarIcon sx={{ fontSize: '1.5rem ' }} />
            ) : (
              <StarBorderIcon sx={{ fontSize: '1.5rem ' }} />
            )}
          </IconButton>
          <IconButton sx={{ padding: '8px' }} onClick={handleCopyClick}>
            <ContentCopyIcon sx={{ fontSize: '1.2rem' }} />
          </IconButton>
        </Box>
      </CardActions>
      <Snackbar
        open={SnackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
          style={{ backgroundColor: '#8ce99a' }}
        >
          URL이 복사되었습니다!
        </Alert>
      </Snackbar>
    </Card>
  );
};
