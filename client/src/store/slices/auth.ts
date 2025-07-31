import { createSlice } from '@reduxjs/toolkit';

export type User = {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    accessToken: string;
    refreshToken: string;
};

const initialState: {
    user: User | null,
    accessToken: string | null,
    refreshToken: string | null,
} = {
    user: null,
    accessToken: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;