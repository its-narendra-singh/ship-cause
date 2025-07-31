import React from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import axios from '../utils/axios';
import { logout } from '../store/slices/auth';

const NavLink = styled(Typography)`
  cursor: pointer;
  padding: 0 16px;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: #6a1b9a;
  }
`;

const SignUpButton = styled(Button)`
  background-color: #6a1b9a;
  color: white;
  padding: 8px 24px;
  border-radius: 24px;
  font-weight: bold;
  text-transform: none;

  &:hover {
    background-color: #4a148c;
  }
`;

const Header: React.FC = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state.auth);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [anchorElFeatures, setAnchorElFeatures] = React.useState<null | HTMLElement>(null);
    const [anchorElResources, setAnchorElResources] = React.useState<null | HTMLElement>(null);

    const isVerified = Boolean(auth.user) && Boolean(auth.accessToken);

    const handleMenuOpen = (setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>) => (event: React.MouseEvent<HTMLElement>) => {
        setter(event.currentTarget);
    };

    const handleMenuClose = (setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>) => () => {
        setter(null);
    };

    const renderDropdown = (title: string, anchorEl: HTMLElement | null, onClose: () => void) => (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
            <MenuItem onClick={onClose}>{title} Option 1</MenuItem>
            <MenuItem onClick={onClose}>{title} Option 2</MenuItem>
        </Menu>
    );

    const handleLogout = async () => {
        try {
            const result = await axios.post('/api/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                }
            });

            if (result.data.success) {
                dispatch(logout());
                navigate('/');
            };
        } catch (error) {
            console.error('Failed to logout: ', error);
        }
    }

    return (
        <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white', padding: '8px 24px' }}>
            <Toolbar disableGutters sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                {!isMobile ? (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <NavLink onClick={() => navigate('/')}>About</NavLink>

                            {!isVerified && (
                                <>
                                    <Box onClick={handleMenuOpen(setAnchorElFeatures)} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <NavLink onClick={() => navigate('/')}>Features</NavLink>
                                        <ExpandMoreIcon fontSize="small" />
                                    </Box>

                                    <Box onClick={handleMenuOpen(setAnchorElResources)} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                        <NavLink onClick={() => navigate('/')}>Resources</NavLink>
                                        <ExpandMoreIcon fontSize="small" />
                                    </Box>

                                    <NavLink onClick={() => navigate('/')}>Ship Tips</NavLink>
                                    <NavLink onClick={() => navigate('/')}>How It Works</NavLink>
                                </>
                            )}
                            <NavLink onClick={() => navigate('/')}>Contact Us</NavLink>
                            {isVerified && (
                                <NavLink onClick={() => navigate('/profile')}>Profile</NavLink>
                            )}
                            {auth.user?.role === 'admin' && (
                                <NavLink onClick={() => navigate('/users')}>Users</NavLink>
                            )}
                            <NavLink sx={{ color: '#6a1b9a', fontWeight: 600 }}>Quick Quote</NavLink>
                        </Box>

                        {!isVerified ? (
                            <SignUpButton variant="contained" onClick={() => navigate('/auth')}>Sign Up</SignUpButton>
                        ) : (
                            <SignUpButton variant="contained" onClick={() => handleLogout()}>Logout</SignUpButton>
                        )}
                    </>
                ) : (
                    <>
                        <IconButton size="large" edge="start" color="inherit">
                            <MenuIcon />
                        </IconButton>

                        {!isVerified ? (
                            <SignUpButton variant="contained" onClick={() => navigate('/auth')}>Sign Up</SignUpButton>
                        ) : (
                            <SignUpButton variant="contained" onClick={() => handleLogout()}>Logout</SignUpButton>
                        )}
                    </>
                )}
            </Toolbar>

            {renderDropdown('Features', anchorElFeatures, handleMenuClose(setAnchorElFeatures))}
            {renderDropdown('Resources', anchorElResources, handleMenuClose(setAnchorElResources))}
        </AppBar>
    );
};

export default Header;
