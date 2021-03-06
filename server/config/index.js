import dotenv from 'dotenv';

dotenv.config();

export default {
    url: process.env.APP_URL || 'http://localhost:3000',
    jwtSecret: process.env.JWT_SECRET || '1234'
};