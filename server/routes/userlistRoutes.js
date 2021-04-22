import express from 'express';

import { getUserlist } from '../controllers/userlist.js';

const router = express.Router();

router.get('/', getUserlist);


export default router;