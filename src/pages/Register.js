import React, { useState } from 'react';
import { TextField, Button, Stack, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';  // <-- Add this import for Link

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Initialize user data in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        achievements: [], // Initialize achievements as an empty array
      });

      navigate('/profile'); // Redirect to profile page after registration
    } catch (err) {
      console.error(err);
      setError(err.message);
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
          Register
        </Typography>

        <form onSubmit={handleRegister} style={{ width: '100%' }}>
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
            />

            {/* Error Message */}
            {error && (
              <Typography color="error" variant="body2" align="center">
                {error}
              </Typography>
            )}

            {/* Register Button */}
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
              Register
            </Button>
          </Stack>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ textDecoration: 'none', color: '#FF2625' }}>
            Login here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
