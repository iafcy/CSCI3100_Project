import { supabase } from '../utils/supabase';
import * as cheerio from 'cheerio';

const filterHiddenContent = (html: string) => {
  const $ = cheerio.load(html);
  
  $('.hidden-content').remove();

  $('p').each((_, p) => {
    if ($(p).text().trim() === '') {
      $(p).remove();
    }
  });

  $('li').each((_, li) => {
    if ($(li).children().length === 0 && $(li).text().trim() === '') {
      $(li).remove();
    }
  });

  $('ul, ol').each((_, list) => {
    if ($(list).children().length === 0) {
      $(list).remove();
    }
  });
  
  return $('body').html();
}

const createComment = async (
  userId: number,
  threadId: number,
  content: string
) => {
  const { data, error } = await supabase.from('comments').insert({
    content,
    filtered_content: filterHiddenContent(content),
    thread_id: threadId,
    user_id: userId
  }).select().single();

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