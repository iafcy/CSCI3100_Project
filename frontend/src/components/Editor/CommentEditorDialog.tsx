import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material';
import TiptapEditor from './TipTapEditor';
import Button from '@mui/material/Button';
import axios from '../../utils/axios';
import { useNavigate } from "react-router-dom";
import { Comment } from '../../types/types';
import CommentToReply from './CommentToReply';

export default function EditorDialog({
  open, onClose, treadTitle, threadId, commentToReply, index, isOp
} : {
  open: boolean;
  onClose: () => void;
  treadTitle: string;
  threadId: number;
  commentToReply?: Comment;
  index?: number;
  isOp?: boolean;
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [commentContent, setCommentContent] = React.useState<string>('');

  const handleClose = () => {
    if (commentContent == '') {
      onClose();
    } else {
      // ask if user want to save the content
      onClose();
    }
  }

  const handleCreate = () => {
    const data = {
      threadId: threadId,
      content: commentContent,
    }

    axios.post('/comment', data)
      .then(response => {
        console.log(response);
        // navigate(`/category/${selectedCategory}`);
        onClose();
      })
      .catch(error => console.log(error));
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      onClick={(e) => e.stopPropagation()}
      maxWidth='lg'
      fullWidth={true}
    >
      <DialogTitle 
        sx={{
          m: 0,
          py: 1,
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        Comment on "{treadTitle}"
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            color: theme.palette.text.primary,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent 
        dividers
        sx={{
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'hidden'
        }}
      >
        {commentToReply && index && isOp !== undefined &&
          <>
            <CommentToReply comment={commentToReply} index={index} isOp={isOp} />
            <Divider sx={{ my: 1 }} />
          </>
        }


        <Box sx={{
          flex: 1,
          overflow: 'hidden',
          p: 1
        }}>
          <TiptapEditor
            content={commentContent}
            onContentUpdate={setCommentContent}
          />
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          py: 2,
          px: 4,
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Button
          size='small'
          variant="contained"
          onClick={handleCreate}
          disabled={commentContent == ''}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}