import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditorDialog from './EditorDialog';

export default function Editor() {
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleOpen}
      >
        <AddIcon />
      </IconButton>

      <EditorDialog
        open={open}
        onClose={handleClose}
      />
    </>
  )
}