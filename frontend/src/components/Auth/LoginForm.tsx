import { useState } from 'react';
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
import { loginSchema, LoginFormData } from '../../types/types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function LoginForm({
  onClose
} : {
  onClose: () => void;
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const { email, password } = data;

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (loginError) {
      setError("root.serverError", { type: "manual", message: loginError.message || "Login failed. Please try again." });
    } else {
      const { error } = await supabase.auth.getUser();

      if (error) {
        setError("root.serverError", { type: "manual", message: error.message || "Login failed. Please try again." });
      } else {
        onClose();
      }
    }
  }

  return (
    <Box
      component="form"
      sx={{ width: '100%', mt: 2 }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <TextField
        required
        id="signup-email"
        label="Email"
        type="email"
        variant="outlined"
        fullWidth={true}
        {...register("email", {
          onChange: () => {
            clearErrors("root.serverError");
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{ mb: 2 }}
        aria-invalid={errors.email ? "true" : "false"}
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
          {...register("password", {
            onChange: () => {
              clearErrors("root.serverError");
            },
          })}
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
          aria-invalid={errors.password ? "true" : "false"}
          aria-describedby={errors.password ? "signup-password-error" : undefined}
        />
        <FormHelperText error id="signup-password-error">
          {errors.password?.message}
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
         {isSubmitting ? 'Logging in...' : 'Login'}
       </Button>
    </Box>
  );
}
