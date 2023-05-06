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
import { Box, Paper } from '@mui/material';
import { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import styled from 'styled-components';

const StyledCard = styled(Card)({
  maxWidth: 260,
  height: 300,
  position: 'relative',
  borderRadius: '10px',
  transition: 'box-shadow 0.2s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    cursor: 'pointer',
  },
  '&.custom-card': {
    borderRadius: '10px',
  },
});

export const PostCard = ({
  id,
  title,
  url,
  description,
  category,
  onDelete,
  creationTime,
}) => {
  const handleDeleteClick = (event) => {
    event.stopPropagation();
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

  const handleLikeClick = (event) => {
    event.stopPropagation();
    // 찜하기 버튼 토글 기능
    setLikeClick(!likeClick);
  };

  const [SnackbarOpen, setSnackbarOpen] = useState(false); // 알림창 상태 관리

  const handleCopyClick = async (event) => {
    event.stopPropagation();
    // url 복사 버튼 핸들러
    try {
      await navigator.clipboard.writeText(url);
      setSnackbarOpen(true);
    } catch (err) {
      console.error('URL 복사 실패!!', err);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    // 알림창 닫기 버튼 핸들러
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handlePostCardClick = () => {
    let formattedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = `https://${url}`;
    }
    window.open(formattedUrl, '_blank'); // 새 인터넷 창에서 해당 url로 이동
  };

  /**
   * 제공된 URL이 "http://" 또는 "https://"로 시작하는지 확인하는 정규식 패턴 테스트입니다. 다음은 코드 분석입니다.


test() 메서드는 제공된 URL이 "http://" 또는 "https://"로 시작하지 않는지 확인합니다.
^ 문자는 문자열의 시작을 의미합니다.
https? 부분은 "http" 또는 "https"와 일치하며 ?는 "s" 문자가 선택 사항임을 나타냅니다.
:은 나머지 URL에서 "http" 또는 "https"를 구분하는 콜론과 일치합니다.
\/\/는 "http://" 또는 "https://" 다음의 URL에서 일반적으로 사용되는 두 개의 슬래시와 일치합니다.
i 플래그는 대소문자를 구분하지 않는 패턴을 만들어 대소문자 조합이 있는 URL과 일치하도록 합니다.

따라서 테스트에서 true를 반환하면 URL이 "http://" 또는 "https://"로 시작하지 않고 전체 URL 대신 상대 경로를 포함할 가능성이 있음을 의미합니다.
   */

  return (
    <Paper elevation={0}>
      <StyledCard className="custom-card" onClick={handlePostCardClick}>
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
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 1,
            bgcolor: '#74C0FC',
          }}
          titleTypographyProps={{
            variant: '12',
            fontWeight: 'bold',
          }}
          subheaderTypographyProps={{
            fontSize: '0.8rem',
            fontWeight: 'normal',
          }}
        />
        <CardMedia
          sx={{
            display: 'flex',
            justifyContent: 'center', // 수평으로 중앙
            alignItems: 'center', // 수직으로 중앙
            height: '130px',
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
                <StarIcon sx={{ fontSize: '1.5rem ', color: '#000000' }} />
              ) : (
                <StarBorderIcon
                  sx={{ fontSize: '1.5rem ', color: '#000000' }}
                />
              )}
            </IconButton>
            <IconButton sx={{ padding: '8px' }} onClick={handleCopyClick}>
              <ContentCopyIcon sx={{ fontSize: '1.2rem', color: '#000000' }} />
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
      </StyledCard>
    </Paper>
  );
};
