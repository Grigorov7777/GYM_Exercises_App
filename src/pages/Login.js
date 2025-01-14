import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase'; // Import auth
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Stack, Typography, Box, Container } from '@mui/material'; // Material-UI imports
import { Link } from 'react-router-dom'; // Added this import

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  // Validate password (at least 6 characters)
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');

    // Validate fields
    if (!email) {
      setEmailError('Email is required');
    } else if (!validateEmail(email)) {
      setEmailError('Enter a valid email address');
    }

    if (!password) {
      setPasswordError('Password is required');
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
    }

    // If there are validation errors, do not proceed
    if (emailError || passwordError || !email || !password) return;

    try {
      // Attempt to sign in with Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect to Home page after successful login
    } catch (err) {
      console.error(err);
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 2, fontFamily: 'Alegreya' }}>
          Login
        </Typography>

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <Stack spacing={3}>
            {/* Email Input */}
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={!!emailError} // Show error if email is invalid
              helperText={emailError} // Display email error message
            />

            {/* Password Input */}
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={!!passwordError} // Show error if password is invalid
              helperText={passwordError} // Display password error message
            />

            {/* Error Message */}
            {error && (
              <Typography color="error" variant="body2" align="center">
                {error}
              </Typography>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                padding: '12px 0',
                borderRadius: 3,
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#FF2625',
                },
              }}
            >
              Login
            </Button>
          </Stack>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ textDecoration: 'none', color: '#FF2625' }}>
            Register here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
