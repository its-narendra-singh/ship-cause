import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0066cc',
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