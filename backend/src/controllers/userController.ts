import userService from '../services/userService';

const followUser = async (req: any, res: any) => {
  const userId = req.user.id;
  const payload = req.body;
  const targetUserId = payload.targetUserId;

  const { data, error } = await userService.followUser(userId, targetUserId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: data
    });
  }
}

const unfollowUser = async (req: any, res: any) => {
  const userId = req.user.id;
  const payload = req.body;
  const targetUserId = payload.targetUserId;

  const { error } = await userService.unfollowUser(userId, targetUserId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: null,
    });
  }
}

const blockUser = async (req: any, res: any) => {
  const userId = req.user.id;
  const payload = req.body;
  const targetUserId = payload.targetUserId;

  const { data, error } = await userService.blockUser(userId, targetUserId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: data
    });
  }
}

const unblockUser = async (req: any, res: any) => {
  const userId = req.user.id;
  const payload = req.body;
  const targetUserId = payload.targetUserId;

  const { error } = await userService.unblockUser(userId, targetUserId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: null,
    });
  }
}

const getFollowingUser = async (req: any, res: any) => {
  const userId = req.user.id;

  const { data, error } = await userService.getFollowingUser(userId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: data
    });
  }
}

const getBlockingUser = async (req: any, res: any) => {
  const userId = req.user.id;

  const { data, error } = await userService.getBlockingUser(userId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: data
    });
  }
}

export default {
  followUser,
  unfollowUser,
  blockUser,
  unblockUser,
  getFollowingUser,
  getBlockingUser,
};