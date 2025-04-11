import threadService from '../services/threadService';
import commentService from '../services/commentService';

const createThread = async (req: any, res: any) => {
  const userId = req.user.id;
  const payload = req.body;

  const categoryId = payload.categoryId;
  const title = payload.title;
  const content = payload.content;

  const { data: threadData, error: threadError } = await threadService.createThread(
    userId,
    categoryId,
    title,
  );

  if (!threadError && threadData) {
    const threadId = threadData[0].id;
    const { data: commentData, error: commentError } = await commentService.createComment(userId, threadId, content);

    if (!commentError) {
      return res.status(200).json({
        message: 'success',
        data: threadData
      });
    }
  }
}

const getThreads = async (req: any, res: any) => {
  const { threadId } = req.params;
  const { page = 1 } = req.query;
  const userId = req.user?.id ?? null;

  const pageCount = await threadService.getThreadPageCountById(threadId);
  const { data, error } = await threadService.getThreadPageById(threadId, page, userId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: {
        page: Number(page),
        pageCount,
        comments: data
      },
    });
  }
}

const getUserThreads = async (req: any, res: any) => {
  const { userId } = req.params;
  const { sort_by = 'time' } = req.query; // sort by time or likes

  if (!['time', 'likes'].includes(sort_by)) {
    return res.status(400).json({ message: "Invalid sort_by parameter. Use 'time' or 'likes'." });
  }

  const { data: userData, error: userError} = await threadService.getUserNameById(userId);
  const { count, error: countError } = await threadService.getUserThreadsCount(userId);
  const { data, error } = await threadService.getUserThreads(userId, sort_by);

  if (!error && !countError && !userError) {
    return res.status(200).json({
      message: 'success',
      data: {
        username: userData?.username,
        threadsCount: Number(count),
        threads: data
      }
    });
  }
}

const getFollowingThreads = async (req: any, res: any) => {
  const userId = req.user.id;
  const { sort_by = 'time' } = req.query; // sort by time or likes

  if (!['time', 'likes'].includes(sort_by)) {
    return res.status(400).json({ message: "Invalid sort_by parameter. Use 'time' or 'likes'." });
  }

  const { data: count, error: countError } = await threadService.getFollowingThreadsCount(userId);
  const { data, error } = await threadService.getFollowingThreads(userId, sort_by);

  if (!error && !countError) {
    return res.status(200).json({
      message: 'success',
      data: {
        threadsCount: Number(count),
        threads: data
      }
    });
  }
}

const likeThread = async (req: any, res: any) => {
  const userId = req.user.id;
  const { threadId } = req.params;

  const { data, error } = await threadService.likeThreadById(threadId, userId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: data,
    });
  }
}

const dislikeThread = async (req: any, res: any) => {
  const userId = req.user.id;
  const { threadId } = req.params;

  const { data, error } = await threadService.dislikeThreadById(threadId, userId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: data,
    });
  }
}

const removeReaction = async (req: any, res: any) => {
  const userId = req.user.id;
  const { threadId } = req.params;

  const { data, error } = await threadService.removeReactionInThreadById(threadId, userId);

  if (!error) {
    return res.status(200).json({
      message: 'success',
      data: data,
    });
  }
}

export default {
  createThread,
  getThreads,
  getUserThreads,
  getFollowingThreads,
  likeThread,
  dislikeThread,
  removeReaction
};