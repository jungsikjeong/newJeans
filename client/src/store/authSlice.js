import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    user: null,
  },
  reducers: {
    loadUser(state, action) {
      state.user = action.payload;
    },
  },
});

// const initialState = {
//   user: null,
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: '',
// };

// export const loadUser = createAsyncThunk(
//   'auth/loadUser',

//   async (_, thunkAPI) => {
//     try {
//       const {
//         data: { user },
//       } = await axios.get('/api/auth');

//       return user;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data[0]);
//     }
//   }
// );

// export const authSlice = createSlice({
//   name: 'user',
//   initialState,

//   reducers: {
//     reset: (state) => {
//       state.isLoading = false;
//       state.isError = false;
//       state.isSuccess = false;
//       state.message = '';
//     },
//   },

//   extraReducers: (builder) => {
//     builder.addCase(loadUser.pending, (state) => {
//       state.isLoading = true;
//     });
//     builder.addCase(loadUser.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.isSuccess = true;
//       state.user = action.payload;
//     });
//     builder.addCase(loadUser.rejected, (state, action) => {
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.isError = true;
//       state.user = null;
//       state.message = action.payload;
//     });
//   },
// });

// export const { reset } = authSlice.actions;
// export default authSlice.reducer;
