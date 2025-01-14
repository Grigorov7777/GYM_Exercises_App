// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box, Switch, Typography } from '@mui/material';
import { Provider, useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import store from './redux/store'; // Import the store
import { toggleDarkMode } from './redux/themeSlice'; // Import the dark mode action

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProfile from './components/EditProfile'; // Import EditProfile component
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Add KetoDiet import
import KetoDiet from './pages/KetoDiet'; // Add this import

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const AppContent = () => {
  const dispatch = useDispatch(); // Redux dispatch
  const darkMode = useSelector((state) => state.theme.darkMode); // Access darkMode state

  // Create theme based on darkMode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#bb86fc' : '#3f51b5',
      },
      background: {
        default: darkMode ? '#121212' : '#f4f6f8',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
        <Navbar />
        {/* Toggle for Dark Mode */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            {darkMode ? 'Dark Mode' : 'Light Mode'}
          </Typography>
          <Switch
            checked={darkMode}
            onChange={() => dispatch(toggleDarkMode())} // Dispatch toggle action
            inputProps={{ 'aria-label': 'Toggle Dark Mode' }}
          />
        </Box>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Profile and Edit Profile Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          {/* Add the KetoDiet Route */}
          <Route path="/keto-diet" element={<KetoDiet />} /> {/* Add this route */}
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

const App = () => (
  // Wrap the entire app with the Redux Provider to pass the store to all components
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
