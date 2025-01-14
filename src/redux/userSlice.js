// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  achievements: [],
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.email = action.payload.email;
      state.achievements = action.payload.achievements;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUserData, setLoading } = userSlice.actions;
export default userSlice.reducer;
