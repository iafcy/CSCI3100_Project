import express from 'express';

import commentController from '../controllers/commentController';

const router = express.Router();

router
  .route('/')
  .post(commentController.createComment)

router.route('/:commentId/like').post(commentController.likeComment)
router.route('/:commentId/dislike').post(commentController.dislikeComment)
router.route('/:commentId/reaction').delete(commentController.removeReaction)

export default router;
