import React from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled } from '@mui/material/styles';

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
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [anchorElFeatures, setAnchorElFeatures] = React.useState<null | HTMLElement>(null);
    const [anchorElResources, setAnchorElResources] = React.useState<null | HTMLElement>(null);

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

    return (
        <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white', padding: '8px 24px' }}>
            <Toolbar disableGutters sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                {!isMobile ? (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <NavLink>About</NavLink>

                            <Box onClick={handleMenuOpen(setAnchorElFeatures)} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <NavLink>Features</NavLink>
                                <ExpandMoreIcon fontSize="small" />
                            </Box>

                            <Box onClick={handleMenuOpen(setAnchorElResources)} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <NavLink>Resources</NavLink>
                                <ExpandMoreIcon fontSize="small" />
                            </Box>

                            <NavLink>Ship Tips</NavLink>
                            <NavLink>How It Works</NavLink>
                            <NavLink>Contact Us</NavLink>
                            <NavLink sx={{ color: '#6a1b9a', fontWeight: 600 }}>Quick Quote</NavLink>
                        </Box>

                        <SignUpButton variant="contained">Sign Up</SignUpButton>
                    </>
                ) : (
                    <>
                        <IconButton size="large" edge="start" color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <SignUpButton variant="contained">Sign Up</SignUpButton>
                    </>
                )}
            </Toolbar>

            {renderDropdown('Features', anchorElFeatures, handleMenuClose(setAnchorElFeatures))}
            {renderDropdown('Resources', anchorElResources, handleMenuClose(setAnchorElResources))}
        </AppBar>
    );
};

export default Header;
