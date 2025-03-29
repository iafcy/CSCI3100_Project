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

  const pageCount = await threadService.getThreadPageCountById(threadId);
  const { data, error } = await threadService.getThreadPageById(threadId, page);

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

const getOutboxThreads = async (req: any, res: any) => {
  const userId = req.user.id;

  const threadsCount = await threadService.getOutboxThreadsCount(userId);
  const threads = await threadService.getOutboxThreads(userId);

  return res.status(200).json({
    message: 'success',
    data: {
      threadsCount: Number(threadsCount),
      threads
    }
  });
}

const getFollowingThreads = async (req: any, res: any) => {
  const userId = req.user.id;

  const threadsCount = await threadService.getFollowingThreadsCount(userId);
  const threads = await threadService.getFollowingThreads(userId);

  return res.status(200).json({
    message: 'success',
    data: {
      threadsCount: Number(threadsCount),
      threads
    }
  });
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
  getOutboxThreads,
  getFollowingThreads,
  likeThread,
  dislikeThread,
  removeReaction
};