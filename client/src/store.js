import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './store/authSlice';

export const { loadUser, logout } = authSlice.actions;

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
