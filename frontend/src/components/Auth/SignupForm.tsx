import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import supabase from '../../utils/supabase';
import FileUploadButton from './FileUploadButton';
import axios from '../../utils/axios';
import { signupSchema, SignupFormData } from '../../types/types';

export default function SignupForm({ onClose }: { onClose: () => void }) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirm, setShowPasswordConfirm] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    setError,
    trigger,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'all',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      licenseKeyFile: undefined,
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    const { username, email, password, licenseKeyFile } = data;

    const formData = new FormData();
    formData.append('file', licenseKeyFile);

    try {
      // Verify License Key
      const response = await axios.post<{
        message: string;
        data?: { license_id: string };
      }>( // Add type hint for response data
        `${import.meta.env.VITE_BACKEND_API_URL}/license/verify`,
        formData,
      );

      const licenseId = response.data?.data?.license_id;

      // Sign Up with Supabase
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            license_id: licenseId,
          },
        },
      });

      if (signUpError) {
        setError('root.serverError', {
          type: 'manual',
          message: signUpError.message || 'Signup failed. Please try again.',
        });
      } else {
        onClose();
      }
    } catch (error: any) {
      if (error.response) {
        const backendMessage = error.response.data?.message;
        setError('licenseKeyFile', {
          type: 'manual',
          message:
            backendMessage ||
            'License verification failed. Please check the file and try again.',
        });
      } else {
        setError('root.serverError', {
          type: 'manual',
          message:
            'An unexpected error occurred. Please check your connection and try again.',
        });
      }
    }
  };

  return (
    <Box
      component="form"
      sx={{ width: '100%', mt: 2 }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <TextField
        required
        id="signup-username"
        label="Username"
        variant="outlined"
        fullWidth={true}
        {...register('username')}
        error={!!errors.username}
        helperText={errors.username?.message}
        sx={{ mb: 2 }}
        aria-invalid={errors.username ? 'true' : 'false'}
      />

      <TextField
        required
        id="signup-email"
        label="Email"
        type="email"
        variant="outlined"
        fullWidth={true}
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{ mb: 2 }}
        aria-invalid={errors.email ? 'true' : 'false'}
      />

      <FormControl
        required
        variant="outlined"
        fullWidth={true}
        sx={{ mb: 2 }}
        error={!!errors.password}
      >
        <InputLabel htmlFor="signup-password">Password</InputLabel>
        <OutlinedInput
          id="signup-password"
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'hide password' : 'show password'}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-describedby={
            errors.password ? 'signup-password-error' : undefined
          }
        />
        <FormHelperText error id="signup-password-error">
          {errors.password?.message}
        </FormHelperText>
      </FormControl>

      <FormControl
        required
        variant="outlined"
        fullWidth={true}
        sx={{ mb: 2 }}
        error={!!errors.passwordConfirm}
      >
        <InputLabel htmlFor="signup-password-confirm">
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="signup-password-confirm"
          type={showPasswordConfirm ? 'text' : 'password'}
          {...register('passwordConfirm')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPasswordConfirm ? 'hide password' : 'show password'
                }
                onClick={handleClickShowPasswordConfirm}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Confirm Password"
          aria-invalid={errors.passwordConfirm ? 'true' : 'false'}
          aria-describedby={
            errors.passwordConfirm ? 'signup-password-confirm-error' : undefined
          }
        />
        <FormHelperText error id="signup-password-confirm-error">
          {errors.passwordConfirm?.message}
        </FormHelperText>
      </FormControl>

      <FormControl
        required
        margin="dense"
        fullWidth={true}
        error={!!errors.licenseKeyFile}
        sx={{ mb: 2 }}
      >
        <Controller
          name="licenseKeyFile"
          control={control}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { error },
          }) => (
            <FileUploadButton
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChange(event.target.files ? event.target.files[0] : null);
                setTimeout(() => trigger('licenseKeyFile'), 0);
              }}
              onBlur={() => {
                trigger('licenseKeyFile');
                onBlur();
              }}
              name={name}
              inputRef={ref}
              filename={value instanceof File ? value.name : undefined}
              error={!!error}
              buttonProps={{
                id: 'license-key-upload-button',
                'aria-describedby': errors.licenseKeyFile
                  ? 'signup-license-error'
                  : undefined,
              }}
            />
          )}
        />
        <FormHelperText error id="signup-license-error">
          {errors.licenseKeyFile?.message as React.ReactNode}
        </FormHelperText>
      </FormControl>

      {errors.root?.serverError && (
        <FormHelperText error sx={{ mb: 2, textAlign: 'center' }}>
          {errors.root.serverError.message}
        </FormHelperText>
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={!isValid || isSubmitting}
        sx={{ width: '100%', mt: 2 }}
        aria-busy={isSubmitting}
        loading={isSubmitting}
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </Button>
    </Box>
  );
}
