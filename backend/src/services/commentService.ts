import supabase from '../utils/supabase';

const createComment = async (
  userId: number,
  threadId: number,
  content: string
) => {
  const { data, error } = await supabase.from('comments').insert({
    content,
    thread_id: threadId,
    user_id: userId
  }).select();

  return { data, error };
}

const likeCommentById = async (
  commentId: number,
  userId: number,
) => {
  const { data, error } = await supabase.from('comment_reactions').upsert({
    comment_id: commentId,
    user_id: userId,
    is_like: true,
  }).select();

  return { data, error };
}

const dislikeCommentById = async (
  commentId: number,
  userId: number,
) => {
  const { data, error } = await supabase.from('comment_reactions').upsert({
    comment_id: commentId,
    user_id: userId,
    is_like: false,
  }).select();

  return { data, error };
}

const removeReactionInCommentById = async (
  commentId: number,
  userId: number,
) => {
  const { data, error } = await supabase.from('comment_reactions')
    .delete()
    .eq('comment_id', commentId)
    .eq('user_id', userId)
    .select();

  return { data, error };
}

export default {
  createComment,
  likeCommentById,
  dislikeCommentById,
  removeReactionInCommentById
}