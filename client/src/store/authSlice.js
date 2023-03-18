import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../utils/api';

// 페이지네이션
export const fetchByAuth = createAsyncThunk('auth/fetchByAuth', async () => {
  const { data } = await api.get('/auth');

  return data;
});

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    logout(state, action) {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      state.user = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchByAuth.pending, (state, action) => {
        state.user = '';
      })
      .addCase(fetchByAuth.fulfilled, (state, action) => {
        localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
        state.user = action.payload.user;
      })
      .addCase(fetchByAuth.rejected, (state, action) => {
        state.user = '';
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
      });
  },
});
