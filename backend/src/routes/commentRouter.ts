import express from 'express';

import commentController from '../controllers/commentController';
import { authRequired } from '../middleware/auth';

const router = express.Router();

router
  .route('/')
  .post(authRequired, commentController.createComment)

router.route('/:commentId/like').post(authRequired, commentController.likeComment)
router.route('/:commentId/dislike').post(authRequired, commentController.dislikeComment)
router.route('/:commentId/reaction').delete(authRequired, commentController.removeReaction)

export default router;
