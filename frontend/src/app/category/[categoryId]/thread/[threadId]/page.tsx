import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CommentListItem from '@/components/CommentListItem';
import { Comment } from '@/types/types';
import CommentListPagination from '@/components/CommentListPagination';

async function fetchData(threadId: number, page: number) : Promise<{
  page: number;
  pageCount: number;
  comments: Comment[];
}>  {
  const response  = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/thread/${threadId}?=${page}`);
  const data = await response.json();
  return data.data;
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
  const { comments, pageCount } = await fetchData(Number(threadId), Number(page));

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
          totalPages={pageCount}
          categoryId={Number(categoryId)}
          threadId={Number(threadId)}
        />
      </ListItem>
    </List>
  );
}