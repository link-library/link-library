import React, { useState } from 'react';
import { userState } from '../atoms';
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
import { useSetRecoilState } from 'recoil';
import SearchTab from './SearchTab';

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
  return (
    <IconButton onClick={onClick} aria-label="favorite">
      <img src={FavoriteChecker} alt="Favorite" style={{ width: '30px' }} />
    </IconButton>
  );
};

const ProfileButton = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} aria-label="profile">
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
  const setUser = useSetRecoilState(userState);

  const handleLogout = () => {
    setUser({ username: '', password: '', categories: [] });
    handleLogoutProp();
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
        src={LinkLibraryLogo}
        alt="Link Library Logo"
        style={{
          position: 'absolute',
          left: '10px',
          width: '200px',
          height: '40px',
        }}
      />
      <MenuButton onClick={handleMenuClick} />
      <Grid Item sx={{ ml: 45 }}>
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
