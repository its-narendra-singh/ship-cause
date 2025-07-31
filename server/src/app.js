import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// connection with atlas mongodb
mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected successfully!')
}).catch(() => {
    console.error('Failed database connection!');
});

// routes definations
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Hello From Ship Cause'
    })
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));