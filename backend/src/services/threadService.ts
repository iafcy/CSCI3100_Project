import { supabase } from '../utils/supabase';

const COMMENTS_PER_PAGE = 10;

const createThread = async (
  userId: number,
  categoryId: number,
  title: string,
) => {
  const { data, error } = await supabase
    .from('threads')
    .insert({
      title,
      category_id: categoryId,
      user_id: userId,
    })
    .select()
    .single();

  return { data, error };
};

const getThreadPageCountById = async (threadId: number) => {
  const { data, error, status, count } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .eq('thread_id', threadId);

  return Math.ceil(count! / COMMENTS_PER_PAGE);
};

const getThreadPageById = async (
  threadId: number,
  page: number,
  userId: string | null,
) => {
  const { data, error } = await supabase.rpc(
    'get_comments_in_thread_with_counts',
    {
      current_thread_id: threadId,
      return_limit: COMMENTS_PER_PAGE,
      return_offset: COMMENTS_PER_PAGE * (page - 1),
      current_user_id: userId,
    },
  );

  return { data, error };
};

const getUserThreadsCount = async (userId: number) => {
  const { data, error, status, count } = await supabase
    .from('threads')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  return { count, error };
};

const getUserThreads = async (
  userId: number,
  limit: number,
  offset: number,
  sort_by: 'time' | 'likes',
) => {
  const { data, error } = await supabase.rpc('get_user_threads_with_counts', {
    return_limit: limit,
    return_offset: offset,
    current_user_id: userId,
    sort_by: sort_by,
  });

  return { data, error };
};

const getFollowingThreadsCount = async (userId: number) => {
  const { data, error } = await supabase.rpc('get_following_threads_count', {
    current_user_id: userId,
  });

  return { data, error };
};

const getFollowingThreads = async (
  userId: number,
  limit: number,
  offset: number,
  sort_by: 'time' | 'likes',
) => {
  const { data, error } = await supabase.rpc(
    'get_following_threads_with_counts',
    {
      return_limit: limit,
      return_offset: offset,
      current_user_id: userId,
      sort_by: sort_by,
    },
  );

  return { data, error };
};

const likeThreadById = async (threadId: number, userId: number) => {
  const { data, error } = await supabase
    .from('thread_reactions')
    .upsert({
      thread_id: threadId,
      user_id: userId,
      is_like: true,
    })
    .select()
    .single();

  return { data, error };
};

const dislikeThreadById = async (threadId: number, userId: number) => {
  const { data, error } = await supabase
    .from('thread_reactions')
    .upsert({
      thread_id: threadId,
      user_id: userId,
      is_like: false,
    })
    .select()
    .single();

  return { data, error };
};

const removeReactionInThreadById = async (threadId: number, userId: number) => {
  const { data, error } = await supabase
    .from('thread_reactions')
    .delete()
    .eq('thread_id', threadId)
    .eq('user_id', userId)
    .select()
    .single();

  return { data, error };
};

const getThreadById = async (id: number) => {
  const { data, error } = await supabase
    .from('threads')
    .select()
    .eq('id', id)
    .maybeSingle();

  return { data, error };
};

export default {
  createThread,
  getThreadPageCountById,
  getThreadPageById,
  getUserThreadsCount,
  getUserThreads,
  getFollowingThreadsCount,
  getFollowingThreads,
  likeThreadById,
  dislikeThreadById,
  removeReactionInThreadById,
  getThreadById,
};
