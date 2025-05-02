import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import TiptapEditor from './TipTapEditor';
import Button from '@mui/material/Button';
import axios from '../../utils/axios';
import { Comment } from '../../types/types';
import useThread from '../../hooks/useThreads';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CloseWarningDialog from './CloseWarningDialog';

export default function CommentEditorDialog({
  open,
  onClose,
  treadTitle,
  threadId,
}: {
  open: boolean;
  onClose: () => void;
  treadTitle: string;
  threadId: number;
  commentToReply?: Comment;
  index?: number;
  isOp?: boolean;
}) {
  const theme = useTheme();
  const { comments, setComments, commentPageCount, setCommentPageCount } =
    useThread();
  const [commentContent, setCommentContent] = useState<string>('');
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [openWarning, setOpenWarning] = useState<boolean>(false);

  const handleClose = (confirm: boolean = false) => {
    if (commentContent == '' || confirm) {
      setCommentContent('');
      setOpenWarning(false);
      onClose();
    } else {
      setOpenWarning(true);
    }
  };

  const handleCreate = () => {
    setLoading(true);
    setOpenErrorSnackbar(false);
    setErrorSnackbarMessage('');

    const data = {
      threadId: threadId,
      content: commentContent,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_API_URL}/comment`, data)
      .then((response) => {
        if (comments.length < 10) {
          setComments([...comments, response.data.data]);
        } else {
          setCommentPageCount(commentPageCount + 1);
        }

        setCommentContent('');
        onClose();
      })
      .catch((error) => {
        setErrorSnackbarMessage(
          error.response.data?.message ||
            'Failed to create comment. Please try again.',
        );
        setOpenErrorSnackbar(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog
      onClose={() => handleClose(false)}
      open={open}
      onClick={(e) => e.stopPropagation()}
      maxWidth="lg"
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
          justifyContent: 'space-between',
        }}
      >
        Comment on "{treadTitle}"
        <IconButton
          aria-label="close"
          onClick={() => handleClose(false)}
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
          overflowY: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflow: 'hidden',
            p: 1,
          }}
        >
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
          size="small"
          variant="contained"
          onClick={handleCreate}
          disabled={commentContent == ''}
          loading={loading}
          data-testid="create-comment-btn"
        >
          Create
        </Button>

        <CloseWarningDialog
          open={openWarning}
          onContinue={() => setOpenWarning(false)}
          onDiscard={() => handleClose(true)}
        />

        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenErrorSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenErrorSnackbar(false)}
            severity="error"
            variant="outlined"
            sx={{ width: '100%' }}
          >
            {errorSnackbarMessage}
          </Alert>
        </Snackbar>
      </DialogActions>
    </Dialog>
  );
}
