// src/redux/slices/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: false, // Default to light mode
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode; // Toggle the mode
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
