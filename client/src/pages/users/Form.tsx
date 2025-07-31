import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../utils/axios';
import type { RootState } from '../../store';
import { upsertUser } from '../../store/slices/user';

interface UserFormProps {
    open: boolean;
    onClose: () => void;
    initialValues?: {
        _id?: string;
        name?: string;
        email?: string;
        role?: string;
    };
    isUpdate?: boolean;
    onSuccess?: () => void;
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
};

const UserForm: React.FC<UserFormProps> = ({ open, onClose, initialValues = {}, isUpdate = false, onSuccess }) => {
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState({
        name: initialValues.name || '',
        email: initialValues.email || '',
        role: initialValues.role || 'user',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setFormData({
                name: initialValues.name || '',
                email: initialValues.email || '',
                role: initialValues.role || 'user',
                password: '',
            });
        }
    }, [open]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            let response;
            if (isUpdate && initialValues._id) {
                response = await axios.put(`/api/user/${initialValues._id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                });
            } else {
                response = await axios.post('/api/auth/signup', formData, {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                });
            }
            if (response.data && response.data.success) {
                if (onSuccess) onSuccess();
                dispatch(upsertUser(response.data.user));
                onClose();
            } else {
                setError(response.data.message || 'Operation failed');
            }
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6" fontWeight={700} color="#6a1b9a" mb={2}>
                    {isUpdate ? 'Update User' : 'Add User'}
                </Typography>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        select
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        fullWidth
                        SelectProps={{ native: true }}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </TextField>
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required={!isUpdate}
                        fullWidth
                    />
                    {error && (
                        <Typography color="error" variant="body2">{error}</Typography>
                    )}
                    <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                        <Button onClick={onClose} color="inherit" disabled={loading}>Cancel</Button>
                        <Button type="submit" variant="contained" sx={{ backgroundColor: '#6a1b9a', fontWeight: 600 }} disabled={loading}>
                            {isUpdate ? 'Update' : 'Add'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default UserForm;
