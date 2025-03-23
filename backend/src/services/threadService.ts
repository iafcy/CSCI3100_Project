import { Comment } from '../types/types';

const createThread = async (
  userId: number,
  categoryId: number,
  title: string,
) => {
  return 1; // dummy threadId
}

const getThreadPageCountById = async (
  threadId: number,
) => {
  // dummy page count
  return 15;
}

const getThreadPageById = async (
  threadId: number,
  page: number,
) => {
  const comments: Comment[] = [
    // dummy comments
    {id: 1 + (page - 1) * 10, threadId: threadId, username: 'User 1', like: 20, dislike: 25, content: `Comment ${1 + (page - 1) * 10} of Thread ${threadId}` },
    {id: 2 + (page - 1) * 10, threadId: threadId, username: 'User 2', like: 20, dislike: 25, content: `Comment ${2 + (page - 1) * 10} of Thread ${threadId}` },
    {id: 3 + (page - 1) * 10, threadId: threadId, username: 'User 3', like: 20, dislike: 25, content: `Comment ${3 + (page - 1) * 10} of Thread ${threadId}` },
    {id: 4 + (page - 1) * 10, threadId: threadId, username: 'User 4', like: 20, dislike: 25, content: `Comment ${4 + (page - 1) * 10} of Thread ${threadId}` },
    {id: 5 + (page - 1) * 10, threadId: threadId, username: 'User 5', like: 20, dislike: 25, content: `Comment ${5 + (page - 1) * 10} of Thread ${threadId}` },
    {id: 6 + (page - 1) * 10, threadId: threadId, username: 'User 6', like: 20, dislike: 25, content: `Comment ${6 + (page - 1) * 10} of Thread ${threadId}` },
    {id: 7 + (page - 1) * 10, threadId: threadId, username: 'User 7', like: 20, dislike: 25, content: `Comment ${7 + (page - 1) * 10} of Thread ${threadId}` },
    {id: 8 + (page - 1) * 10, threadId: threadId, username: 'User 8', like: 20, dislike: 25, content: `Comment ${8 + (page - 1) * 10} of Thread ${threadId}` },
    {id: 9 + (page - 1) * 10, threadId: threadId, username: 'User 9', like: 20, dislike: 25, content: `Comment ${9 + (page - 1) * 10} of Thread ${threadId}` },
    {id: 10 + (page - 1) * 10, threadId: threadId, username: 'User 10', like: 20, dislike: 25, content: `Comment ${10 + (page - 1) * 10} of Thread ${threadId}` },
  ];

  return comments;
}

const getOutboxThreadsCount = async (
  userId: number,
) => {
  // dummy count
  return 10;
}

const getOutboxThreads = async (
  userId: number,
) => {
  return [
    // dummy threads
    {id: 1, username: 'User 1', title: `Outbox thread 1`, categoryId: 1},
    {id: 2, username: 'User 1', title: `Outbox thread 2`, categoryId: 2},
    {id: 3, username: 'User 1', title: `Outbox thread 3`, categoryId: 3},
    {id: 4, username: 'User 1', title: `Outbox thread 4`, categoryId: 4},
    {id: 5, username: 'User 1', title: `Outbox thread 5`, categoryId: 5},
    {id: 6, username: 'User 1', title: `Outbox thread 6`, categoryId: 1},
    {id: 7, username: 'User 1', title: `Outbox thread 7`, categoryId: 2},
    {id: 8, username: 'User 1', title: `Outbox thread 8`, categoryId: 3},
    {id: 9, username: 'User 1', title: `Outbox thread 9`, categoryId: 4},
    {id: 10, username: 'User 1', title: `Outbox thread 10`, categoryId: 5},
  ];
}

const getFollowingThreadsCount = async (
  userId: number,
) => {
  // dummy count
  return 10;
}

const getFollowingThreads = async (
  userId: number,
) => {
  return [
    // dummy threads
    {id: 1, username: 'User 2', title: `Following thread 1`, categoryId: 1},
    {id: 2, username: 'User 3', title: `Following thread 2`, categoryId: 2},
    {id: 3, username: 'User 4', title: `Following thread 3`, categoryId: 3},
    {id: 4, username: 'User 5', title: `Following thread 4`, categoryId: 4},
    {id: 5, username: 'User 6', title: `Following thread 5`, categoryId: 5},
    {id: 6, username: 'User 7', title: `Following thread 6`, categoryId: 1},
    {id: 7, username: 'User 8', title: `Following thread 7`, categoryId: 2},
    {id: 8, username: 'User 9', title: `Following thread 8`, categoryId: 3},
    {id: 9, username: 'User 10', title: `Following thread 9`, categoryId: 4},
    {id: 10, username: 'User 11', title: `Following thread 10`, categoryId: 5},
  ];
}

const likeThreadById = async (
  threadId: number,
  userId: number,
) => {
  return;
}

const dislikeThreadById = async (
  threadId: number,
  userId: number,
) => {
  return;
}

const removeReactionInThreadById = async (
  threadId: number,
  userId: number,
) => {
  return;
}

export default {
  createThread,
  getThreadPageCountById,
  getThreadPageById,
  getOutboxThreadsCount,
  getOutboxThreads,
  getFollowingThreadsCount,
  getFollowingThreads,
  likeThreadById,
  dislikeThreadById,
  removeReactionInThreadById
}