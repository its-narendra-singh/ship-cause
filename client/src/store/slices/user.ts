import { createSlice } from '@reduxjs/toolkit';
import type { User } from './auth';

const initialState: User[] = [];

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (_state, action) => {
            return action.payload;
        },
        deleteUser: (state, action) => {
            return state.filter(user => user._id !== action.payload);
        },
        upsertUser: (state, action) => {
            const user = action.payload;
            const idx = state.findIndex(u => u._id === user._id);
            if (idx !== -1) {
                state[idx] = user;
            } else {
                state.push(user);
            }
        },
    },
});

export const { setUsers, deleteUser, upsertUser } = userSlice.actions;
export default userSlice.reducer;