import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
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
  onChange,
  filename,
  name,
  onBlur,
  inputRef,
  error = false,
  buttonProps
}: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filename: string | undefined;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: boolean;
  buttonProps?: ButtonProps;
}) {
  return (
    <Button
      component="label"
      variant="outlined"
      fullWidth
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      error={error}
      {...buttonProps}
    >
      <Typography
        sx={{
          flexShrink: 0,
          display: 'inline',
          mx: 1,
        }}
      >
        Upload License Key
      </Typography>

      <Typography
        component="span"
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flexGrow: 1,
          display: 'inline',
          textAlign: 'left',
          pl: 1,
          color: error ? 'error.main' : (filename ? 'text.primary' : 'text.secondary'),
        }}
      >
        {filename ? filename : '(No file selected)'}
      </Typography>

      <VisuallyHiddenInput
        type="file"
        onChange={onChange}
        name={name}
        onBlur={onBlur}
        ref={inputRef}
        accept="text/plain"
      />
    </Button>
  );
}
