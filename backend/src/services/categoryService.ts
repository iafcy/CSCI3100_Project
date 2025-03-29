import supabase from "../utils/supabase";

const getCategoryList = async () => {
  const { data, error } = await supabase.from('categories').select().order('id', { ascending: true });
  
  return { data, error };
}

const getThreadsCountByCategoryId = async (
  categoryId: number
) => {
  const { data, error, status, count } = await supabase
    .from('threads')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', categoryId);

  return { count, error };
}

const getThreadsByCategoryId = async (
  categoryId: number
) => {
  const { data, error } = await supabase
    .rpc('get_threads_with_counts', { categoryid: categoryId, n_limit: 20 });

  return { data, error };
}

export default {
  getCategoryList,
  getThreadsCountByCategoryId,
  getThreadsByCategoryId,
}