import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CommentListItem from '../components/Forum/CommentListItem';
import CommentListPagination from '../components/Forum/CommentListPagination';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from '../utils/axios';
import useThread from '../hooks/useThreads';
import CommentListItemSkeleton from '../components/Forum/CommentListItemSkeleton';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';

export default function Thread() {
  const { threadId, categoryId } = useParams();
  const { authenticated } = useAuth();
  const { isFollowing, isBlocking } = useUser();
  
  const [searchParams, _] = useSearchParams();
  const page = searchParams.get('page') || 1;

  const { comments, setComments, commentPageCount, setCommentPageCount } = useThread();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/thread/${threadId}?page=${page}`)
      .then((response) => {
        setComments(response.data.data.comments);
        setCommentPageCount(response.data.data.pageCount);
      })
      .finally(() => setLoading(false));
  }, [threadId, categoryId, searchParams, authenticated]);

  return (
    <List
      sx={{
        height: '100%',
        width: '100%',
        overflowY: 'auto',
      }}
    >      
      {loading ? (
        <>
          <CommentListItemSkeleton />
          <CommentListItemSkeleton />
          <CommentListItemSkeleton />
        </>
      ) : (
        comments?.map((comment, i) => (
          <CommentListItem
            key={comment.id}
            comment={comment}
            index={i}
            isFollowingUser={isFollowing(comment.user_id)}
            isBlockingUser={isBlocking(comment.user_id)}
          />
        ))
      )}

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
        {
          commentPageCount > 1 &&
          <CommentListPagination
            page={Number(page)}
            totalPages={commentPageCount}
          />
        }
      </ListItem>
    </List>
  );
}