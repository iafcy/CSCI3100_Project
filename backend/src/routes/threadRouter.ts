import express from 'express';

import threadController from '../controllers/threadController';

const router = express.Router();

router
  .route('/')
  .post(threadController.createThread)

router.route('/:threadId').get(threadController.getThread)

export default router;
