import { supabase } from '../utils/supabase';

const getCategoryList = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select()
    .order('id', { ascending: true });

  return { data, error };
};

const getThreadsCountByCategoryId = async (categoryId: number) => {
  const { data, error, status, count } = await supabase
    .from('threads')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', categoryId);

  return { count, error };
};

const getThreadsByCategoryId = async (
  categoryId: number,
  limit: number,
  offset: number,
  userId: string | null,
  sort_by: 'time' | 'likes',
) => {
  const { data, error } = await supabase.rpc('get_threads_with_counts', {
    current_category_id: categoryId,
    return_limit: limit,
    return_offset: offset,
    current_user_id: userId,
    sort_by: sort_by,
  });

  return { data, error };
};

const getCategoryById = async (id: number) => {
  const { data, error } = await supabase
    .from('categories')
    .select()
    .eq('id', id)
    .maybeSingle();

  return { data, error };
};

export default {
  getCategoryList,
  getThreadsCountByCategoryId,
  getThreadsByCategoryId,
  getCategoryById,
};
