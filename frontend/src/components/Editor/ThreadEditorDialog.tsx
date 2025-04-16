import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import SelectCategory from './SelectCategory';
import TiptapEditor from './TipTapEditor';
import Button from '@mui/material/Button';
import axios from '../../utils/axios';
import { useNavigate } from "react-router-dom";
import useThread from '../../hooks/useThreads';
import useNav from '../../hooks/useNav';

export default function EditorDialog({
  open, onClose
} : {
  open: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { threads, setThreads } = useThread();
  const { activeCategory } = useNav();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const [threadTitle, setThreadTitle] = React.useState<string>('');
  const [threadContent, setThreadContent] = React.useState<string>('');

  const handleClose = () => {
    if (threadContent == '' && threadTitle == '') {
      onClose();
    } else {
      // ask if user want to save the content
      onClose();
    }
  }

  const handleCreate = () => {
    const data = {
      categoryId: selectedCategory,
      title: threadTitle,
      content: threadContent,
    }

    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/thread`, data)
      .then(response => {
        const newThread = response.data.data;
        console.log(newThread)

        if (newThread.category_id == activeCategory?.id) {
          setThreads([
            response.data.data,
            ...threads,
          ]);
        }

        setThreadTitle('');
        setThreadContent('');

        navigate(`/category/${newThread.category_id}`);
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
        Create Thread
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
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexGrow: 0,
          }}
        >
          <SelectCategory
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <TextField
            required
            id="new-thread-title"
            label="Title"
            variant="outlined"
            size="small"
            fullWidth={true}
            sx={{
              mb: 2,
              bgcolor: theme.palette.background.default
            }}
            value={threadTitle}
            onChange={(e) => setThreadTitle(e.target.value)}
          />
        </Box>

        <Box sx={{
          flex: 1,
          overflow: 'hidden',
        }}>
          <TiptapEditor
            content={threadContent}
            onContentUpdate={setThreadContent}
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
          disabled={threadContent == '' || threadTitle == ''}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}