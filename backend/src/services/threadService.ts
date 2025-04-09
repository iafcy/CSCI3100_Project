import supabase from '../utils/supabase';

const COMMENTS_PER_PAGE = 10;

const createThread = async (
  userId: number,
  categoryId: number,
  title: string,
) => {
  const { data, error } = await supabase.from('threads').insert({
    title,
    category_id: categoryId,
    user_id: userId
  }).select();

  return { data, error };
}

const getThreadPageCountById = async (
  threadId: number,
) => {
  const { data, error, status, count } = await supabase
    .from('comments')
    .select('*', { count: 'exact', head: true })
    .eq('thread_id', threadId);

  return Math.ceil(count! / COMMENTS_PER_PAGE);
}

const getThreadPageById = async (
  threadId: number,
  page: number,
  userId: string | null
) => {
  const { data, error } = await supabase
    .rpc('get_comments_in_thread_with_counts', {
      current_thread_id: threadId,
      return_limit: COMMENTS_PER_PAGE,
      return_offset: COMMENTS_PER_PAGE * (page - 1),
      current_user_id: userId
    });

  return { data, error };
}

const getUserNameById = async (
  userId: number
) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', userId)
    .single();

  return { data, error };
}

const getUserThreadsCount = async (
  userId: number,
) => {
  const { data, error, status, count } = await supabase
    .from('threads')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  return { count, error };
}

const getUserThreads = async (
  userId: number,
  sort_by: 'time' | 'likes',
) => {
  const { data, error } = await supabase
    .rpc('get_user_threads_with_counts', {
      return_limit: 20,
      current_user_id: userId,
      sort_by: sort_by
    });

  return { data, error };
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
  const { data, error } = await supabase.from('thread_reactions').upsert({
    thread_id: threadId,
    user_id: userId,
    is_like: true,
  }).select();

  return { data, error };
}

const dislikeThreadById = async (
  threadId: number,
  userId: number,
) => {
  const { data, error } = await supabase.from('thread_reactions').upsert({
    thread_id: threadId,
    user_id: userId,
    is_like: false,
  }).select();

  return { data, error };
}

const removeReactionInThreadById = async (
  threadId: number,
  userId: number,
) => {
  const { data, error } = await supabase.from('thread_reactions')
    .delete()
    .eq('thread_id', threadId)
    .eq('user_id', userId)
    .select();

  return { data, error };
}

export default {
  createThread,
  getThreadPageCountById,
  getThreadPageById,
  getUserNameById,
  getUserThreadsCount,
  getUserThreads,
  getFollowingThreadsCount,
  getFollowingThreads,
  likeThreadById,
  dislikeThreadById,
  removeReactionInThreadById
}