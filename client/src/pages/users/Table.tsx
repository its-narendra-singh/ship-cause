import React from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    TableContainer,
} from '@mui/material';
import Header from './Header';
import Row from './Row';
import type { User } from '../../store/slices/auth';

interface Props {
    users: User[];
}

const UserTable: React.FC<Props> = ({ users }) => {
    return (
        <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 4px 24px rgba(106,27,154,0.08)' }}>
            <Header />

            <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell sx={{ fontWeight: 700, color: '#6a1b9a', background: '#f5f5f5' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: '#6a1b9a', background: '#f5f5f5' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: '#6a1b9a', background: '#f5f5f5' }}>Role</TableCell>
                            <TableCell align="right" sx={{ fontWeight: 700, color: '#6a1b9a', background: '#f5f5f5' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, idx) => (
                            <Row key={user._id} user={user} idx={idx} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default UserTable;
