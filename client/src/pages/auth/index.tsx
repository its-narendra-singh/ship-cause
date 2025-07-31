import React, { useEffect, useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import AuthForm from './AuthForm';
import axios from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../store/slices/auth';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../store';

type Mode = 'signin' | 'signup' | 'add';

const AuthPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state.auth);
    const [mode, setMode] = useState<Mode>('signin');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (Boolean(auth.user) && Boolean(auth.accessToken) && mode !== 'add') {
            navigate('/');
        };
    }, [auth, navigate, mode]);

    const handleSubmit = async (formData: any) => {
        if (mode === 'signup') {
            handleSignUp(formData);
        } else if (mode === 'signin') {
            handleSignIn(formData);
        } else if (mode === 'add') {
            handleAdd(formData);
        };
    };

    const handleSignUp = async (formData: any) => {
        try {
            const result = await axios.post('/api/auth/signup', formData);

            if (result.data.success) {
                setMode('signin');
            } else {
                setError(result.data.message);
            };
        } catch (error) {
            console.error('Failed to authenticate the user!', error);
        }
    };

    const handleSignIn = async (formData: any) => {
        try {
            const result = await axios.post('/api/auth/signin', formData);

            if (result.data.success) {
                dispatch(setCredentials({
                    user: result.data.user,
                    accessToken: result.data.accessToken,
                    refreshToken: result.data.refreshToken
                }));

                console.log('result: ', result);

                navigate('/');
            } else {
                setError(result.data.message);
            };
        } catch (error) {
            console.error('Failed to authenticate the user!', error);
        }
    };

    const handleAdd = async (formData: any) => {
        try {
            const result = await axios.post('/api/auth/signup', formData);

            if (result.data.success) {
                setMode('signin');
            } else {
                setError(result.data.message);
            };
        } catch (error) {
            console.error('Failed to authenticate the user!', error);
        }
    };

    const toggleMode = () => {
        if (mode === 'signin') setMode('signup');
        else if (mode === 'signup') setMode('signin');
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, background: '#f5f5f5' }}>
            <Box textAlign="center" sx={{ width: '40%' }}>
                <AuthForm
                    mode={mode}
                    onSubmit={handleSubmit}
                    error={error}
                    initialValues={mode === 'add' ? { name: '', email: '' } : undefined}
                />

                {mode !== 'add' && (
                    <Typography variant="body2" mt={2}>
                        {mode === 'signin' ? 'Don’t have an account?' : 'Already have an account?'}{' '}
                        <Link
                            component="button"
                            onClick={toggleMode}
                            sx={{ color: '#6a1b9a', fontWeight: 600 }}
                        >
                            {mode === 'signin' ? 'Sign up' : 'Sign in'}
                        </Link>
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default AuthPage;
