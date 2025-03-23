import threadService from '../services/threadService';
import commentService from '../services/commentService';

const createThread = async (req: any, res: any) => {
  const userId = 1; // req.user.id;
  const payload = req.body;

  const categoryId = payload.categoryId;
  const title = payload.title;
  const content = payload.content;

  const threadId = await threadService.createThread(
    userId,
    categoryId,
    title,
  );

  commentService.createComment(userId, threadId, content);

  return res.status(200).json({
    message: 'success'
  });
}

const getThreads = async (req: any, res: any) => {
  const { threadId } = req.params;
  const { page = 1 } = req.query;

  const pageCount = await threadService.getThreadPageCountById(threadId);
  const comments = await threadService.getThreadPageById(threadId, page);

  return res.status(200).json({
    message: 'success',
    data: {
      page: Number(page),
      pageCount,
      comments
    },
  });
}

const getOutboxThreads = async (req: any, res: any) => {
  const userId = 1; // req.user.id;

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
  const userId = 1; // req.user.id;

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
  const userId = 1; // req.user.id;
  const { threadId } = req.params;

  await threadService.likeThreadById(threadId, userId);

  return res.status(200).json({
    message: 'success',
    data: {},
  });
}

const dislikeThread = async (req: any, res: any) => {
  const userId = 1; // req.user.id;
  const { threadId } = req.params;

  await threadService.dislikeThreadById(threadId, userId);

  return res.status(200).json({
    message: 'success',
    data: {},
  });
}

const removeReaction = async (req: any, res: any) => {
  const userId = 1; // req.user.id;
  const { threadId } = req.params;

  await threadService.removeReactionInThreadById(threadId, userId);

  return res.status(200).json({
    message: 'success',
    data: {},
  });
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