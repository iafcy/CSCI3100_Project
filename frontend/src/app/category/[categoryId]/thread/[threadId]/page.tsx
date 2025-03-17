import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CommentListItem from '@/components/CommentListItem';
import { Comment } from '@/types/types';
import CommentListPagination from '@/components/CommentListPagination';

function placeholderFetch(threadId: number, page: number) {
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

  return {
    comments,
    totalPages: 15,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ threadId: string, categoryId: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { threadId, categoryId } =await params;
  // Fetch comments
  const { page = '1' } = await searchParams;
  const { comments, totalPages } = placeholderFetch(Number(threadId), Number(page));

  return (
    <List
      sx={{
        height: '100%',
        width: '100%',
        overflowY: 'auto',
      }}
    >      
      {comments.map((comment, i) => (
        <CommentListItem
          key={comment.id}
          comment={comment}
          index={i}
          initRating={null}
        />
      ))}

      <ListItem
        disablePadding
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 2,
          px: 4,
          mt: 2,
          mb: 2,
          textDecoration: null,
          boxSizing: 'border-box',
        }}
      >
        <CommentListPagination
          page={Number(page)}
          totalPages={totalPages}
          categoryId={Number(categoryId)}
          threadId={Number(threadId)}
        />
      </ListItem>
    </List>
  );
}