import { Logo } from '../Style/LoginPageStyle';
import LinkLibraryLogo from '../images/LinkLibraryLogo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';

const LogoutButton = ({ onClick }) => {
  return (
    <Button
      variant="text"
      startIcon={<LogoutIcon sx={{ fontSize: '50px' }} />}
      onClick={onClick}
    />
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
      <Logo src={LinkLibraryLogo} alt="Link Library Logo" />
      <LogoutButton onClick={handleLogout} />
    </header>
  );
};
export default Header;
