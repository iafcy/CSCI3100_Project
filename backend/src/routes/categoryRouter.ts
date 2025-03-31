import express from 'express';

import categoryController from '../controllers/categoryController';
import { authOptional } from '../middleware/auth';

const router = express.Router();

router.route('/list').get(categoryController.getCategory)

router.route('/:categoryId').get(authOptional, categoryController.getThreads)

export default router;
