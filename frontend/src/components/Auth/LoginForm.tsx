import * as React from 'react';
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

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const [disableSubmit, setDisableSubmit] = React.useState<boolean>(true);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState<string | null>(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState<string | null>(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!email) {
      setEmailErrorMessage("Email is required.");
    } else if (!emailRegex.test(email)) {
      setEmailErrorMessage("Please enter a valid email address.");
    } else {
      setEmailErrorMessage(null);
      return true;
    }

    return false;
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).*$/;

    if (!password) {
      setPasswordErrorMessage("Password is required.");
    } else if (password.length < 8 || password.length > 24) {
      setPasswordErrorMessage("Password must be 8-24 characters long.");
    } else if (!passwordRegex.test(password)) {
      setPasswordErrorMessage("Password must include at least 1 lowercase character, uppercase character, symbol and number.");
    } else {
      setPasswordErrorMessage(null);
      return true;
    }

    return false;
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const isValid = validateEmail(e.target.value);
    setDisableSubmit(!isValid || passwordErrorMessage !== null);
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    const isValid = validatePassword(e.target.value);
    setDisableSubmit(emailErrorMessage !== null || !isValid);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateEmail(email) && validatePassword(password)) {
      
    }
  }

  return (
    <Box
      component="form"
      sx={{ width: '100%', mt: 2 }}
      onSubmit={handleSubmit}
    >
      <TextField
        required
        id="login-email"
        label="Email"
        variant="outlined"
        fullWidth={true}
        value={email}
        onChange={handleEmailChange}
        error={emailErrorMessage !== null}
        helperText={emailErrorMessage}
        sx={{ mb: 2 }}
      />
      
      <FormControl
        required
        variant="outlined"
        fullWidth={true}
        sx={{ mb: 2 }}
      >
        <InputLabel htmlFor="logint-password">Password</InputLabel>
        <OutlinedInput
          id="login-password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          error={passwordErrorMessage !== null}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? 'hide the password' : 'display the password'
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        {passwordErrorMessage !== null && (
          <FormHelperText error={true}>{passwordErrorMessage}</FormHelperText>
        )}
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        disabled={disableSubmit}
        sx={{ width: '100%', mt: 2 }}
      >
        Login
      </Button>
    </Box>
  );
}
