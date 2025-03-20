import { Comment } from '../types/types';

const createThread = async (
  userId: number,
  categoryId: number,
  title: string,
) => {
  return;
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

export default {
    createThread,
    getThreadPageCountById,
    getThreadPageById
}