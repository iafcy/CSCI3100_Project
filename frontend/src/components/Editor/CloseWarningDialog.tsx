import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

export default function CloseWarningDialog({
  open, onContinue, onDiscard
} : {
  open: boolean;
  onContinue: () => void;
  onDiscard: () => void;
}) {
  const theme = useTheme();

  return (
    <Dialog
      onClick={(e) => e.stopPropagation()}
      open={open}
      maxWidth='xs'
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
        align='center'
      >
        Warning
        <IconButton
          aria-label="close"
          onClick={onContinue}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent 
        dividers
        sx={{
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
          p: 0
        }}
      >
        <Box
          sx={{
            bgcolor: theme.palette.background.default,
            py: 2
          }}
        >
          <Typography align='center'>
            Your inputted content will not be saved.
          </Typography>
          <Typography align='center'>
            Do you want to continue to edit?
          </Typography>
        </Box>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}  
        >
          <Button
            sx={{
              flex: 1,
              py: 1,
            }}
            onClick={onContinue}
          >
            Continue
          </Button>
          <Button
            sx={{
              flex: 1,
              py: 1
            }}
            onClick={onDiscard}
          >
            Close & Discard
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
