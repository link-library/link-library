import { Box, Divider, Typography, TextField, Button } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '../atoms';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LayersIcon from '@mui/icons-material/Layers';
import { useEffect, useState } from 'react';
import { EditUserNickname } from '../Pages/Async';
import { useNavigate } from 'react-router-dom';

const AccountInfoSection = () => {
  return (
    <>
      <Typography variant="h5">계정 관리</Typography>
      <Divider sx={{ borderColor: '#A5D8FF', borderWidth: '2px' }} />
    </>
  );
};

const RecordInfoSection = () => {
  return (
    <>
      <Typography variant="h5">기록 조회</Typography>
      <Divider sx={{ borderColor: '#A5D8FF', borderWidth: '2px' }} />
    </>
  );
};

const NicknameChangeSection = () => {
  const navigate = useNavigate();
  const prevNickname = useRecoilValue(userInfoState);
  const [nickname, setNickname] = useState(prevNickname.nickname);

  const handleNicknameChangeBtn = async () => {
    console.log(nickname);
    if (nickname === '') {
      alert('변경할 닉네임을 입력한 후 변경 버튼을 눌러주세요.');
      return;
    } else if (nickname.length >= 9) {
      alert('닉네임은 8글자 이하로 작성해 주세요.');
      return;
    } else if (nickname === prevNickname.nickname) {
      alert('현재 사용중인 닉네임입니다.');
    } else {
      const { message, newNickname } = await EditUserNickname(nickname);
      if (message === '마이페이지 수정 완료') {
        alert(message);
        // navigate('/', { replace: true });
        // window.location.reload();
      } else if (message === '이미 존재하는 닉네임입니다.') {
        alert(message);
        return;
      } else {
        console.log('WTF?');
      }
    }
  };

  return (
    <Box sx={{ margin: '50px' }}>
      <Typography variant="h6">닉네임 변경</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
        <TextField
          defaultValue={prevNickname.nickname}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: 'white' }}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={handleNicknameChangeBtn}
          sx={{
            marginLeft: '10px',
            width: '80px',
            backgroundColor: '#4dabf7',
            color: 'white',
            fontSize: '16px',
            '&:hover': {
              backgroundColor: '#3b8ac9',
            },
          }}
        >
          변경
        </Button>
      </Box>
    </Box>
  );
};

const PasswordChangeSection = () => {
  return (
    <Box sx={{ margin: '50px' }}>
      <Typography variant="h6">비밀번호 변경</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
        <TextField
          variant="outlined"
          size="small"
          sx={{ backgroundColor: 'white' }}
        />
        <Button
          variant="outlined"
          sx={{
            marginLeft: '10px',
            width: '80px',
            backgroundColor: '#4dabf7',
            color: 'white',
            fontSize: '16px',
            '&:hover': {
              backgroundColor: '#3b8ac9',
            },
          }}
        >
          변경
        </Button>
      </Box>
    </Box>
  );
};

const UserInfoComponent = () => {
  const [nickname, setNickname] = useRecoilState(userInfoState);
  return (
    <Box
      sx={{
        marginRight: '80px',
        marginTop: '50px',
        marginBottom: '50px',
        height: 'calc(100vh - 240px)',
        overflow: 'auto',
      }}
    >
      <AccountInfoSection />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <Box>
          <NicknameChangeSection />
          <PasswordChangeSection />
        </Box>
        <Box sx={{ margin: '50px', position: 'relative' }}>
          <Typography variant="h6">프로필 사진 변경</Typography>
          <AccountCircleIcon
            sx={{ fontSize: '300px', color: '#74C0FC' }}
            onMouseEnter={(e) => {
              const icon = e.target;
              const addIcon = icon.nextSibling;
              addIcon.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              const icon = e.target;
              const addIcon = icon.nextSibling;
              addIcon.style.opacity = '0';
            }}
          />
          <AddPhotoAlternateIcon
            sx={{
              fontSize: '80px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: '0',
              transition: 'opacity 0.3s',
              color: '#339AF0',
            }}
          />
        </Box>
      </Box>
      <Box sx={{ overflow: 'auto' }}>
        <RecordInfoSection />
        <Box sx={{ margin: '50px', display: 'flex', alignItems: 'center' }}>
          <LayersIcon sx={{ fontSize: '30px', color: '#339AF0' }} />
          <Typography variant="h6" sx={{ paddingLeft: '10px' }}>
            총 링크 카드 수: {nickname.totalPost}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserInfoComponent;
