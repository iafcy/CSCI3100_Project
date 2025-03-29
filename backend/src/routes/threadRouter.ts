import express from 'express';

import threadController from '../controllers/threadController';
import { auth } from '../middleware/auth';

const router = express.Router();

router
  .route('/')
  .post(auth, threadController.createThread)

router.route('/:threadId').get(threadController.getThreads)
router.route('/:threadId/outbox').get(auth, threadController.getOutboxThreads)
router.route('/:threadId/following').get(auth, threadController.getFollowingThreads)

router.route('/:threadId/like').post(auth, threadController.likeThread)
router.route('/:threadId/dislike').post(auth, threadController.dislikeThread)
router.route('/:threadId/reaction').delete(auth, threadController.removeReaction)

export default router;
