import express from 'express';

import threadController from '../controllers/threadController';

const router = express.Router();

router
  .route('/')
  .post(threadController.createThread)

router.route('/:threadId').get(threadController.getThreads)
router.route('/:threadId/outbox').get(threadController.getOutboxThreads)
router.route('/:threadId/following').get(threadController.getFollowingThreads)

router.route('/:threadId/like').post(threadController.likeThread)
router.route('/:threadId/dislike').post(threadController.dislikeThread)
router.route('/:threadId/reaction').delete(threadController.removeReaction)

export default router;
