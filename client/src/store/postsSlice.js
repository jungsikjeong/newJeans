import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';

// 검색한 아이템 가져오기
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

// 전체 게시글 가져오기
export const fetchGetPosts = createAsyncThunk(
  'posts/fetchByPosts',
  async () => {
    const { data } = await axios.get('/api/posts');

    return data;
  }
);

// 페이지네이션
export const fetchPagination = createAsyncThunk(
  'posts/fetchPagination',
  async (params) => {
    const { data, headers } = await axios.get('/api/posts', { params });

    const lastPage = parseInt(headers['last-page'], 10);

    return { data, lastPage };
  }
);

// 특정 게시물 가져오기
export const fetchGetPost = createAsyncThunk(
  'posts/fetchByPost',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/posts/${id}`);

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const fetchMyPageGetPosts = createAsyncThunk(
  'posts/fetchMyPageGetPosts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/posts/mypage');

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const postsSlice = createSlice({
  name: 'postSlice',
  initialState: {
    loading: false,
    posts: [],
    post: [],
    lastPage: '',
    error: null,
  },
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },

    clearPosts(state, action) {
      state.post = [];
      state.posts = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGetPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchGetPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchGetPosts.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(fetchPagination.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(...action.payload.data);
        state.lastPage = action.payload.lastPage;
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
      })

      .addCase(fetchMyPageGetPosts.pending, (state, action) => {
        state.loading = true;
        state.posts = [];
      })
      .addCase(fetchMyPageGetPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchMyPageGetPosts.rejected, (state, action) => {
        state.loading = false;
        state.posts = [];
        state.error = action.payload;
      })

      .addCase(fetchGetPost.pending, (state, action) => {
        state.loading = true;
        state.post = [];
      })
      .addCase(fetchGetPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
        state.error = null;
      })
      .addCase(fetchGetPost.rejected, (state, action) => {
        state.loading = false;
        state.post = [];
        state.error = action.payload;
      });
  },
});
