import express from 'express';
import { signup, login, getProfile } from '../controllers/authController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authenticateUser, getProfile);

export default router;
