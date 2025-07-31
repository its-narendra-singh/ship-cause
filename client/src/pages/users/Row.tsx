import React, { useState } from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { User } from '../../store/slices/auth';
import axios from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { deleteUser } from '../../store/slices/user';
import UserForm from './Form';

interface Props {
    user: User;
    idx: number;
}

const UserTableRow: React.FC<Props> = ({ user, idx }) => {
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);
    const [openForm, setOpenForm] = useState(false);

    const handleEdit = () => {
        setOpenForm(true);
    };

    const handleDelete = async () => {
        try {
            const result = await axios.delete(`/api/user/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                }
            });

            if (result.data.success) {
                dispatch(deleteUser(user._id));
            };
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    return (
        <TableRow sx={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#f9f9f9' }}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell align="right">
                <IconButton onClick={handleEdit} color="primary">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={handleDelete} color="error">
                    <DeleteIcon />
                </IconButton>
            </TableCell>

            <UserForm
                open={openForm}
                onClose={() => setOpenForm(false)}
                isUpdate={true}
                initialValues={user}
                onSuccess={() => {
                    setOpenForm(false);
                }}
            />
        </TableRow>
    );
};

export default UserTableRow;
