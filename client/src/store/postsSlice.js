import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSearchItem = createAsyncThunk(
  'posts/fetchBySearchItem',
  async (text, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/search?value=${text}`);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const fetchGetPosts = createAsyncThunk(
  'posts/fetchByPosts',
  async () => {
    const { data } = await axios.get('/api/posts');

    return data;
  }
);

export const postsSlice = createSlice({
  name: 'postSlice',
  initialState: {
    loading: false,
    posts: [],
    error: null,
  },
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },

    clearPosts(state, action) {
      state.posts = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetPosts.pending, (state, action) => {
        state.loading = true;
        state.posts = [];
      })
      .addCase(fetchGetPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchGetPosts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchSearchItem.pending, (state, action) => {
        state.loading = true;
        state.posts = [];
      })
      .addCase(fetchSearchItem.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchSearchItem.rejected, (state, action) => {
        state.loading = false;
        state.posts = [];
        state.error = action.payload;
      });
  },
});
