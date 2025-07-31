import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password -refreshToken');
        res.status(200).json({
            success: true,
            users: users,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch users', error: err.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, '-password -refreshToken');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch user', error: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const updates = req.body;
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ success: true, message: 'User updated', user });
    } catch (err) {
        res.status(500).json({ success: true, message: 'Update failed', error: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ success: true, message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Delete failed', error: err.message });
    }
};