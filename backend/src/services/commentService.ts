import { Comment } from '../types/types';

const createComment = async (
  userId: number,
  threadId: number,
  content: string
) => {
  return;
}

const likeCommentById = async (
  commentId: number,
  userId: number,
) => {
  return;
}

const dislikeCommentById = async (
  commentId: number,
  userId: number,
) => {
  return;
}

const removeReactionInCommentById = async (
  commentId: number,
  userId: number,
) => {
  return;
}

export default {
  createComment,
  likeCommentById,
  dislikeCommentById,
  removeReactionInCommentById
}