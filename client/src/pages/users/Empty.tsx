import React from 'react';
import { Box, Typography } from '@mui/material';

const EmptyState: React.FC = () => {
    return (
        <Box textAlign="center" py={6}>
            <Typography variant="h6" fontWeight={600} color="textSecondary">
                No users found.
            </Typography>
        </Box>
    );
};

export default EmptyState;
