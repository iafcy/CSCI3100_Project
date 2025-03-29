import express from 'express';

import commentController from '../controllers/commentController';
import { auth } from '../middleware/auth';

const router = express.Router();

router
  .route('/')
  .post(auth, commentController.createComment)

router.route('/:commentId/like').post(auth, commentController.likeComment)
router.route('/:commentId/dislike').post(auth, commentController.dislikeComment)
router.route('/:commentId/reaction').delete(auth, commentController.removeReaction)

export default router;
