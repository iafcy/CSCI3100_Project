import { supabase } from '../utils/supabase';

interface Profile {
  id: string;
  username: string;
}

const followUser = async (userId: number, targetUserId: number) => {
  const { data, error } = (await supabase
    .from('follows')
    .upsert({
      user_id: userId,
      target_user_id: targetUserId,
    })
    .select('profiles:target_user_id (id, username)')
    .single()) as { data: { profiles: Profile } | null; error: any };

  return { data: data?.profiles, error };
};

const unfollowUser = async (userId: number, targetUserId: number) => {
  const { data, error } = await supabase
    .from('follows')
    .delete()
    .eq('user_id', userId)
    .eq('target_user_id', targetUserId)
    .select()
    .single();

  return { data, error };
};

const blockUser = async (userId: number, targetUserId: number) => {
  const { data, error } = (await supabase
    .from('blocks')
    .upsert({
      user_id: userId,
      target_user_id: targetUserId,
    })
    .select('profiles:target_user_id (id, username)')
    .single()) as { data: { profiles: Profile } | null; error: any };

  return { data: data?.profiles, error };
};

const unblockUser = async (userId: number, targetUserId: number) => {
  const { data, error } = await supabase
    .from('blocks')
    .delete()
    .eq('user_id', userId)
    .eq('target_user_id', targetUserId)
    .select()
    .single();

  return { data, error };
};

const getFollowingUser = async (userId: number) => {
  const { data, error } = await supabase
    .from('follows')
    .select('target_user_id, profiles:target_user_id (id, username)')
    .eq('user_id', userId);

  const flattenedData = data?.map((item: any) => ({
    id: item.target_user_id,
    username: item.profiles.username,
  }));

  return { data: flattenedData, error };
};

const getBlockingUser = async (userId: number) => {
  const { data, error } = await supabase
    .from('blocks')
    .select('target_user_id, profiles:target_user_id (id, username)')
    .eq('user_id', userId);

  const flattenedData = data?.map((item: any) => ({
    id: item.target_user_id,
    username: item.profiles.username,
  }));

  return { data: flattenedData, error };
};

const getUserNameById = async (userId: number) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', userId)
    .maybeSingle();

  return { data, error };
};

const isUserFollowed = async (userId: number, targetUserId: number) => {
  const { data, error } = await supabase
    .from('follows')
    .select()
    .eq('user_id', userId)
    .eq('target_user_id', targetUserId)
    .maybeSingle();

  return { isFollowed: !!data, error };
};

const isUserBlocked = async (userId: number, targetUserId: number) => {
  const { data, error } = await supabase
    .from('blocks')
    .select()
    .eq('user_id', userId)
    .eq('target_user_id', targetUserId)
    .maybeSingle();

  return { isBlocked: !!data, error };
};

export default {
  followUser,
  unfollowUser,
  blockUser,
  unblockUser,
  getFollowingUser,
  getBlockingUser,
  getUserNameById,
  isUserFollowed,
  isUserBlocked,
};
