import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingIndicator: React.FC = () => {
    return (
        <Box display="flex" justifyContent="center" py={6}>
            <CircularProgress color="secondary" />
        </Box>
    );
};

export default LoadingIndicator;
