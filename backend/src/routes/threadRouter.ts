import express from 'express';

import threadController from '../controllers/threadController';
import { authRequired, authOptional } from '../middleware/auth';

const router = express.Router();

router
  .route('/')
  .post(authRequired, threadController.createThread)

router.route('/following').get(authRequired, threadController.getFollowingThreads)
router.route('/user/:userId').get(threadController.getUserThreads)
router.route('/:threadId').get(authOptional, threadController.getThreads)

router.route('/:threadId/like').post(authRequired, threadController.likeThread)
router.route('/:threadId/dislike').post(authRequired, threadController.dislikeThread)
router.route('/:threadId/reaction').delete(authRequired, threadController.removeReaction)

export default router;
