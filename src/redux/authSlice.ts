import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  userId: string | null;
  role: string | null; // Define role as string or null
}

// Initial state setup
const initialState: AuthState = {
  token: null,
  userId: null,
  role: null,
};

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login reducer with PayloadAction type for token, userId, and role
    login: (
      state,
      action: PayloadAction<{ token: string; userId: string; role: string }>
    ) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.role = action.payload.role; // Set role in state
    },
    // Logout reducer to reset state
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.role = null; // Reset role on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
