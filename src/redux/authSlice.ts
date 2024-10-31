import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  userId: string | null;
  role: string | null; // Add role to AuthState
}

const initialState: AuthState = {
  token: null,
  userId: null,
  role: null, // Initialize role as null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; userId: string; role: string }>
    ) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.role = action.payload.role; // Store role in state
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.role = null; // Reset role on logout
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
