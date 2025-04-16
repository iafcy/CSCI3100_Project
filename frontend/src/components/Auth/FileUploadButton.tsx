import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function FileUploadButton({
  onChange, filename
} : {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filename: string | undefined;
}) {
  return (
    <Button
      component="label"
      variant="outlined"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      
    >
      <Typography
        sx={{
          flexShrink: 0,
          display: 'inline',
          mx: 2
        }}
      >
        Upload License Key
      </Typography>
      <Typography
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flexGrow: 0,
          display: 'inline'
        }}
      >
        {filename ? `(${filename})` : ''}
      </Typography>
      <VisuallyHiddenInput
        type="file"
        onChange={onChange}
        multiple
      />
    </Button>
  );
}
