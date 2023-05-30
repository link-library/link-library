import React, { useState } from 'react';
import { Logo } from '../Style/LoginPageStyle';
import LinkLibraryLogo from '../images/LinkLibraryLogo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import FavoriteChecker from '../images/FavoriteChecker.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Grid } from '@mui/material';
import SearchTab from './SearchTab';
import { GetProfileImg, getLikePostData, getUserInfo } from '../Pages/Async';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  postDataState,
  selectedCategoryIdState,
  selectedCategoryNameState,
  selectedUserImg,
  totalPostAmountBySelectedCategoryState,
  userInfoState,
} from '../atoms';
import { useNavigate } from 'react-router-dom';

const MenuButton = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      aria-label="menu"
      sx={{
        position: 'absolute',
        top: '30px',
        left: '250px',
        bgcolor: '#D0EBFF',
        borderRadius: '8px',
        padding: '3px',
      }}
    >
      <MenuIcon sx={{ fontSize: '25px' }} />
    </IconButton>
  );
};

const ThemeToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <IconButton onClick={handleThemeToggle} aria-label="toggle theme">
      {isDarkMode ? (
        <LightModeIcon sx={{ fontSize: '30px' }} />
      ) : (
        <DarkModeIcon sx={{ fontSize: '30px' }} />
      )}
    </IconButton>
  );
};

const FavoriteButton = ({ onClick }) => {
  const [postData, setPostData] = useRecoilState(postDataState);
  const setTotalPostAmount = useSetRecoilState(
    totalPostAmountBySelectedCategoryState
  );
  const setSelectedCategoryName = useSetRecoilState(selectedCategoryNameState);
  const [selectedCategoryId, setSelectedCategoryId] = useRecoilState(
    selectedCategoryIdState
  );

  const handleClick = async () => {
    const { message, postData, totalPostAmount } = await getLikePostData(0);
    if (message === '찜목록 or 전체페이지 조회 완료') {
      console.log(`totalPostAmount: ${totalPostAmount}`);
      setPostData(postData);
      setTotalPostAmount(totalPostAmount);
      setSelectedCategoryName('bookmark');
      setSelectedCategoryId(-1);
    }
  };

  const handleFavoriteButtonStyle =
    selectedCategoryId === -1
      ? { backgroundColor: '#D0EBFF', borderRadius: '8px', padding: '8px' }
      : {};

  return (
    <IconButton
      onClick={handleClick}
      aria-label="favorite"
      style={handleFavoriteButtonStyle}
    >
      <img src={FavoriteChecker} alt="Favorite" style={{ width: '30px' }} />
    </IconButton>
  );
};

const ProfileButton = ({ onClick }) => {
  const setSelectedCategoryName = useSetRecoilState(selectedCategoryNameState);
  const setSelectedImageFinal = useSetRecoilState(selectedUserImg);
  const [selectedCategoryId, setSelectedCategoryId] = useRecoilState(
    selectedCategoryIdState
  );
  const setUserInfo = useSetRecoilState(userInfoState);

  const handleProfileButtonClick = async () => {
    const { message, nickname, totalPost, storeFileName } = await getUserInfo();
    if (message === '마이페이지 조회 완료') {
      console.log(`nickname: ${nickname}`);
      console.log(`totalPost: ${totalPost}`);
      console.log(`storeFileName: ${storeFileName}`);

      setUserInfo({
        nickname: nickname,
        totalPost: totalPost,
        storeFileName: storeFileName,
      });
      const userImg = await GetProfileImg(storeFileName);
      setSelectedImageFinal(userImg);
      setSelectedCategoryName('프로필');
      setSelectedCategoryId(-3);
    }
  };

  const handleProfileButtonStyle =
    selectedCategoryId === -3
      ? { backgroundColor: '#D0EBFF', borderRadius: '8px', padding: '8px' }
      : {};

  return (
    <IconButton
      onClick={handleProfileButtonClick}
      aria-label="profile"
      style={handleProfileButtonStyle}
    >
      <AccountCircleIcon sx={{ fontSize: '30px' }} />
    </IconButton>
  );
};

const LogoutButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} aria-label="logout">
      <LogoutIcon sx={{ fontSize: '30px' }} />
    </IconButton>
  );
};

export const Header = ({ handleLogout: handleLogoutProp, handleMenuClick }) => {
  const handleLogout = () => {
    handleLogoutProp();
  };

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/', { replace: true });
    window.location.reload();
  };

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
      }}
    >
      <Logo
        onClick={handleLogoClick}
        src={LinkLibraryLogo}
        alt="Link Library Logo"
        style={{
          position: 'absolute',
          left: '10px',
          width: '200px',
          height: '40px',
          cursor: 'pointer',
        }}
      />
      <MenuButton onClick={handleMenuClick} />
      <Grid item sx={{ ml: 45 }}>
        <SearchTab />
      </Grid>

      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{
          position: 'absolute',
          top: '25px',
          right: '20px',
          width: 'auto',
          height: '30px',
        }}
        spacing={1}
      >
        <Grid item>
          <ThemeToggleButton />
        </Grid>
        <Grid item>
          <FavoriteButton />
        </Grid>
        <Grid item>
          <ProfileButton />
        </Grid>
        <Grid item>
          <LogoutButton onClick={handleLogout} />
        </Grid>
      </Grid>
    </header>
  );
};
export default Header;
