import express from 'express';

import categoryController from '../controllers/categoryController';

const router = express.Router();

router.route('/list').get(categoryController.getCategory)

router.route('/:categoryId').get(categoryController.getThreads)

export default router;
