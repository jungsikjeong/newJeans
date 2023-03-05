import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    loadUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state, action) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});
