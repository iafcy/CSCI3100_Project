import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CommentListItem from '../components/CommentListItem';
import { Comment } from '../types/types';
import CommentListPagination from '../components/CommentListPagination';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from '../utils/axios';

export default function Thread() {
  const { threadId, categoryId } = useParams();
  
  // Fetch comments
  const [searchParams, _] = useSearchParams();
  const page = searchParams.get('page') || 1;
  
  const [comments, setComment] = useState<Comment[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);

  useEffect(() => {
    axios.get(`http://localhost:8080/thread/${threadId}?page=${page}`)
      .then((response) => {
        setComment(response.data.data.comments);
        setPageCount(response.data.data.pageCount);
      })
  }, [threadId, categoryId, searchParams]);

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
        />
      </ListItem>
    </List>
  );
}