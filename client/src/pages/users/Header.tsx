import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import UserForm from './Form';

const UserTableHeader = () => {
    const [openForm, setOpenForm] = useState(false);

    return (
        <Box display="flex" justifyContent="flex-end" p={2}>
            <UserForm
                open={openForm}
                onClose={() => setOpenForm(false)}
                isUpdate={false}
                onSuccess={() => {
                    setOpenForm(false);
                }}
            />

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                    backgroundColor: '#6a1b9a',
                    color: '#fff',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                        backgroundColor: '#4a148c',
                    },
                }}
                onClick={() => setOpenForm(true)}
            >
                Add User
            </Button>
        </Box>
    );
};

export default UserTableHeader;
