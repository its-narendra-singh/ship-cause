import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import axios from '../utils/axios';
import { setCredentials } from '../store/slices/auth';

const ProfilePage: React.FC = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState({
        name: auth.user?.name || '',
        email: auth.user?.email || '',
        role: auth.user?.role || '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setFormData({
            name: auth.user?.name || '',
            email: auth.user?.email || '',
            role: auth.user?.role || '',
        });
    }, [auth.user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth.user) return;
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const response = await axios.put(`/api/user/${auth.user._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
            });
            if (response.data && response.data.success) {
                dispatch(setCredentials({
                    ...auth,
                    user: response.data.user,
                }));
                setSuccess('Profile updated successfully');
            } else {
                setError(response.data.message || 'Update failed');
            }
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
            <Paper sx={{ p: 4, width: 400, borderRadius: 3 }} elevation={3}>
                <Typography variant="h5" fontWeight={700} color="#6a1b9a" mb={3}>
                    My Profile
                </Typography>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        disabled
                        fullWidth
                    />
                    {error && <Typography color="error" variant="body2">{error}</Typography>}
                    {success && <Typography color="success.main" variant="body2">{success}</Typography>}
                    <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                        <Button type="submit" variant="contained" sx={{ backgroundColor: '#6a1b9a', fontWeight: 600 }} disabled={loading}>
                            Update Profile
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default ProfilePage;
