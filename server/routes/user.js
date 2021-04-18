import express from 'express';

import { signin, signup } from '../controllers/user.js';
import { userProfile, updateProfile } from '../controllers/userProfile.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/profile/:id', userProfile);
router.patch('/profile/:id', updateProfile);

export default router;