import threadService from '../services/threadService';
import commentService from '../services/commentService';
import userService from '../services/userService';

const createThread = async (req: any, res: any) => {
  const userId = req.user.id;
  const payload = req.body;

  const categoryId = payload.categoryId;
  const title = payload.title;
  const content = payload.content;

  const { data: newThread, error: threadError } =
    await threadService.createThread(userId, categoryId, title);

  if (!threadError) {
    const { data: newComment, error: commentError } =
      await commentService.createComment(userId, newThread.id, content);

    if (!commentError) {
      return res.status(200).json({
        message: 'success',
        data: {
          ...newThread,
          username: req.user.user_metadata.username,
          like: 0,
          dislike: 0,
          user_reaction: null,
        },
      });
    } else {
      return res.status(500).json({
        message: 'Internal server error',
        error: commentError.message,
      });
    }
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: threadError.message,
    });
  }
};

const getThreads = async (req: any, res: any) => {
  const { threadId } = req.params;
  const { page = 1 } = req.query;
  const userId = req.user?.id ?? null;

  const { data: threadData, error: threadError } =
    await threadService.getThreadById(threadId);
  if (threadError) {
    return res.status(500).json({
      message: 'Internal server error',
      error: threadError.message,
    });
  } else if (!threadData) {
    return res.status(400).json({
      message: 'Thread not found',
    });
  }

  const pageCount = await threadService.getThreadPageCountById(threadId);
  const { data, error } = await threadService.getThreadPageById(
    threadId,
    page,
    userId,
  );

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: {
        page: Number(page),
        pageCount,
        comments: data,
      },
    });
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const getUserThreads = async (req: any, res: any) => {
  const { userId } = req.params;
  const { sort_by = 'time', limit = 10, offset = 0 } = req.query; // sort by time or likes

  if (!['time', 'likes'].includes(sort_by)) {
    return res
      .status(400)
      .json({ message: "Invalid sort_by parameter. Use 'time' or 'likes'." });
  }

  if (isNaN(limit) || limit <= 0) {
    return res.status(400).json({ message: 'Invalid limit value' });
  }

  if (isNaN(offset) || offset < 0) {
    return res.status(400).json({ message: 'Invalid offset value' });
  }

  const { data: userData, error: userError } =
    await userService.getUserNameById(userId);

  if (userError) {
    return res.status(500).json({
      message: 'Internal server error',
      error: userError.message,
    });
  } else if (!userData) {
    return res.status(400).json({
      message: 'User not found',
    });
  }

  const { count, error: countError } =
    await threadService.getUserThreadsCount(userId);

  if (!countError) {
    if (count && count <= offset) {
      return res.status(200).json({
        message: 'success',
        data: {
          threadsCount: Number(count),
          threads: [],
        },
      });
    }
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: countError.message,
    });
  }

  const { data, error } = await threadService.getUserThreads(
    userId,
    limit,
    offset,
    sort_by,
  );

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: {
        username: userData?.username,
        threadsCount: Number(count),
        threads: data,
      },
    });
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const getFollowingThreads = async (req: any, res: any) => {
  const userId = req.user.id;
  const { sort_by = 'time', limit = 10, offset = 0 } = req.query; // sort by time or likes

  if (!['time', 'likes'].includes(sort_by)) {
    return res
      .status(400)
      .json({ message: "Invalid sort_by parameter. Use 'time' or 'likes'." });
  }

  if (isNaN(limit) || limit <= 0) {
    return res.status(400).json({ message: 'Invalid limit value' });
  }

  if (isNaN(offset) || offset < 0) {
    return res.status(400).json({ message: 'Invalid offset value' });
  }

  const { data: count, error: countError } =
    await threadService.getFollowingThreadsCount(userId);

  if (!countError) {
    if (count && count <= offset) {
      return res.status(200).json({
        message: 'success',
        data: {
          threadsCount: Number(count),
          threads: [],
        },
      });
    }
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: countError.message,
    });
  }

  const { data, error } = await threadService.getFollowingThreads(
    userId,
    limit,
    offset,
    sort_by,
  );

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: {
        threadsCount: Number(count),
        threads: data,
      },
    });
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const likeThread = async (req: any, res: any) => {
  const userId = req.user.id;
  const { threadId } = req.params;

  const { data: threadData, error: threadError } =
    await threadService.getThreadById(threadId);
  if (threadError) {
    return res.status(500).json({
      message: 'Internal server error',
      error: threadError.message,
    });
  } else if (!threadData) {
    return res.status(400).json({
      message: 'Thread not found',
    });
  }

  const { data, error } = await threadService.likeThreadById(threadId, userId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: data,
    });
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const dislikeThread = async (req: any, res: any) => {
  const userId = req.user.id;
  const { threadId } = req.params;

  const { data: threadData, error: threadError } =
    await threadService.getThreadById(threadId);
  if (threadError) {
    return res.status(500).json({
      message: 'Internal server error',
      error: threadError.message,
    });
  } else if (!threadData) {
    return res.status(400).json({
      message: 'Thread not found',
    });
  }

  const { data, error } = await threadService.dislikeThreadById(
    threadId,
    userId,
  );

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: data,
    });
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const removeReaction = async (req: any, res: any) => {
  const userId = req.user.id;
  const { threadId } = req.params;

  const { data: threadData, error: threadError } =
    await threadService.getThreadById(threadId);
  if (threadError) {
    return res.status(500).json({
      message: 'Internal server error',
      error: threadError.message,
    });
  } else if (!threadData) {
    return res.status(400).json({
      message: 'Thread not found',
    });
  }

  const { data, error } = await threadService.removeReactionInThreadById(
    threadId,
    userId,
  );

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: data,
    });
  } else {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

export default {
  createThread,
  getThreads,
  getUserThreads,
  getFollowingThreads,
  likeThread,
  dislikeThread,
  removeReaction,
};
