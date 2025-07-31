import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0066cc', // Update to match Figma design
        },
        secondary: {
            main: '#ff6600',
        },
    },
    typography: {
        fontFamily: `Raleway, DM Sans`,
    },
});

export default theme;