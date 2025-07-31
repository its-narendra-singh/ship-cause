import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Table from './Table';
import Loading from './Loading';
import Empty from './Empty';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store';
import axios from '../../utils/axios';
import { setUsers } from '../../store/slices/user';

const UserManagementPage: React.FC = () => {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.user);
    const auth = useSelector((state: RootState) => state.auth);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const result = await axios.get('/api/user', {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`
                    }
                });

                if (result.data && result.data.success) {
                    dispatch(setUsers(result.data.users));
                }
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [dispatch, auth.accessToken]);

    useEffect(() => {
        console.log('loaded users: ', users);
    }, [users]);

    return (
        <Box sx={{ background: '#f9f9f9', minHeight: '100vh', py: 6, fontFamily: 'Raleway, sans-serif' }}>
            <Container maxWidth="lg">
                <Typography variant="h4" fontWeight={700} gutterBottom color="#6a1b9a">
                    User Management
                </Typography>

                {loading ? (
                    <Loading />
                ) : users.length === 0 ? (
                    <Empty />
                ) : (
                    <Table users={users} />
                )}
            </Container>
        </Box>
    );
};

export default UserManagementPage;
