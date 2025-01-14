import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Switch, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../redux/themeSlice';
import { auth } from '../utils/firebase'; 
import Logo from '../assets/images/Logo.png';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.darkMode); 

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged(setUser);

    
    return () => unsubscribe();
  }, []);

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode()); 
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        gap: { sm: '123px', xs: '40px' },
        mt: { sm: '32px', xs: '20px' },
        px: '20px',
      }}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src={Logo}
          alt="logo"
          style={{ width: '48px', height: '48px', margin: '0px 20px' }}
        />
      </Link>

      {/* Links */}
      <Stack
        direction="row"
        gap="40px"
        fontFamily="Alegreya"
        fontSize="24px"
        alignItems="center"
      >
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: isDarkMode ? '#fff' : '#3A1212',
            borderBottom: '3px solid #FF2625',
          }}
        >
          Home
        </Link>
        <a
          href="#exercises"
          style={{
            textDecoration: 'none',
            color: isDarkMode ? '#fff' : '#3A1212',
          }}
        >
          Exercises
        </a>

        {/* Add KetoDiet link */}
        <Link
          to="/keto-diet"
          style={{
            textDecoration: 'none',
            color: isDarkMode ? '#fff' : '#3A1212',
          }}
        >
          Keto Diet
        </Link>

        {user ? (
          <>
            {/* Profile Links */}
            <Link
              to="/profile"
              style={{
                textDecoration: 'none',
                color: isDarkMode ? '#fff' : '#3A1212',
              }}
            >
              Profile
            </Link>
            <Link
              to="/edit-profile"
              style={{
                textDecoration: 'none',
                color: isDarkMode ? '#fff' : '#3A1212',
              }}
            >
              Edit Profile
            </Link>
            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              variant="contained"
              color="secondary"
              sx={{ textTransform: 'none' }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            {/* Login/Register Links */}
            <Link
              to="/login"
              style={{
                textDecoration: 'none',
                color: isDarkMode ? '#fff' : '#3A1212',
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                textDecoration: 'none',
                color: isDarkMode ? '#fff' : '#3A1212',
              }}
            >
              Register
            </Link>
          </>
        )}
      </Stack>

      {/* Dark Mode Toggle with Text */}
      <Stack direction="row" alignItems="center" gap="10px">
        <Typography>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</Typography>
        <Switch
          checked={isDarkMode} // Bind switch state to Redux darkMode value
          onChange={handleToggleDarkMode}
          color="default"
          sx={{
            marginLeft: 'auto', // Push to the far right side
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Navbar;
