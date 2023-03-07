import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSearchItem = createAsyncThunk(
  'search/getPosts',
  async (text) => {
    const { data } = await axios.post(`/api/search?value=${text}`);
    return data;
  }
);

export const postsSlice = createSlice({
  name: 'postSlice',
  initialState: {
    posts: [],
    loading: false,
  },
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchItem.pending, (state, action) => {
        state.loading = true;
        state.posts = '';
      })
      .addCase(fetchSearchItem.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchSearchItem.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
