import { createSlice } from '@reduxjs/toolkit';

export const uploadSlice = createSlice({
  name: 'uploadSlice',
  initialState: {
    canvasImage: null,
  },
  reducers: {
    changeCanvasImage(state, action) {
      state.canvasImage = action.payload;
    },
  },
});
