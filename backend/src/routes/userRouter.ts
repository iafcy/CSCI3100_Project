import express from 'express';

import userController from '../controllers/userController';
import { authRequired } from '../middleware/auth';

const router = express.Router();

router.route('/following').get(authRequired, userController.getFollowingUser)
router.route('/blocking').get(authRequired, userController.getBlockingUser)

router.route('/follow').post(authRequired, userController.followUser)
router.route('/unfollow').post(authRequired, userController.unfollowUser)
router.route('/block').post(authRequired, userController.blockUser)
router.route('/unblock').post(authRequired, userController.unblockUser)

export default router;
