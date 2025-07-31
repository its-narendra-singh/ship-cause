import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.SECRET_TOKEN,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.SECRET_TOKEN,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    return { accessToken, refreshToken };
};

export const signup = async (req, res) => {
    try {
        const { name, email, password, role = 'user' } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });

        res.status(201).json({ success: true, message: 'User created', user });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Signup failed', error: err.message });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        const { accessToken, refreshToken } = generateTokens(user);
        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({ success: true, user, accessToken, refreshToken });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Signin failed', error: err.message });
    }
};

export const logout = async (req, res) => {
    try {
        const userId = req.user.id;
        await User.findByIdAndUpdate(userId, { refreshToken: null });
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Logout failed', error: err.message });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(401).json({ message: 'Refresh token required' });

        const decoded = jwt.verify(refreshToken, process.env.SECRET_TOKEN);
        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const newAccessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.SECRET_TOKEN,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
        res.status(403).json({ message: 'Token refresh failed', error: err.message });
    }
};