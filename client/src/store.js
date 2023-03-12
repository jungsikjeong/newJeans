import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './store/authSlice';
import { postsSlice } from './store/postsSlice';
import { uploadSlice } from './store/uploadSlice';

export const { loadUser, logout } = authSlice.actions;
export const { changeCanvasImage } = uploadSlice.actions;
export const { getPosts, clearPosts, nextPage } = postsSlice.actions;

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    upload: uploadSlice.reducer,
    posts: postsSlice.reducer,
  },
});
