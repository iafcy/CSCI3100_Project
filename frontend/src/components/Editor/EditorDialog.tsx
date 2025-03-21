import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import SelectCategory from './SelectCategory';

export default function EditorDialog({
  open, onClose
} : {
  open: boolean;
  onClose: () => void;
}) {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const [threadTitle, setThreadTitle] = React.useState<string>('');

  return (
    <Dialog
      onClose={onClose}
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
          onClick={onClose}
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
          height: '80vh'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2
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
            sx={{ mb: 2 }}
            value={threadTitle}
            onChange={(e) => setThreadTitle(e.target.value)}
          />
        </Box>
      </DialogContent>
    </Dialog>
  )
}