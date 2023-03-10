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

export const Header = ({ handleLogout }) => {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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
      <MenuButton />
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{
          position: 'absolute',
          top: '30px',
          right: '20px',
          width: 'auto',
          height: '30px',
        }}
        spacing={1}
      >
        <Grid item>
          <MenuButton />
        </Grid>
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
