import userService from '../services/userService';

const followUser = async (req: any, res: any) => {
  const userId = req.user.id;
  const payload = req.body;
  const targetUserId = payload.targetUserId;

  const { data: userData, error: userError } = await userService.getUserNameById(targetUserId);
  if (userError) {
    return res.status(500).json({
      message: 'Internal server error',
      error: userError.message
    });
  } else if (!userData) {
    return res.status(400).json({
      message: 'User not found',
    });
  }

  const { data, error } = await userService.followUser(userId, targetUserId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: data
    });
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}

const unfollowUser = async (req: any, res: any) => {
  const userId = req.user.id;
  const payload = req.body;
  const targetUserId = payload.targetUserId;

  const { data: userData, error: userError } = await userService.getUserNameById(targetUserId);
  if (userError) {
    return res.status(500).json({
      message: 'Internal server error',
      error: userError.message
    });
  } else if (!userData) {
    return res.status(400).json({
      message: 'User not found',
    });
  }

  const { error } = await userService.unfollowUser(userId, targetUserId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: null,
    });
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}

const blockUser = async (req: any, res: any) => {
  const userId = req.user.id;
  const payload = req.body;
  const targetUserId = payload.targetUserId;

  const { data: userData, error: userError } = await userService.getUserNameById(targetUserId);
  if (userError) {
    return res.status(500).json({
      message: 'Internal server error',
      error: userError.message
    });
  } else if (!userData) {
    return res.status(400).json({
      message: 'User not found',
    });
  }

  const { data, error } = await userService.blockUser(userId, targetUserId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: data
    });
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
}

const unblockUser = async (req: any, res: any) => {
  const userId = req.user.id;
  const payload = req.body;
  const targetUserId = payload.targetUserId;

  const { data: userData, error: userError } = await userService.getUserNameById(targetUserId);
  if (userError) {
    return res.status(500).json({
      message: 'Internal server error',
      error: userError.message
    });
  } else if (!userData) {
    return res.status(400).json({
      message: 'User not found',
    });
  }

  const { error } = await userService.unblockUser(userId, targetUserId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: null,
    });
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
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
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
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
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message
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