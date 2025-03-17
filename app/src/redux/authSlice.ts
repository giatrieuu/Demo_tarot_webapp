import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { decodeToken } from "../utils/authUtils";


interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  userId: string | null;
  role: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  userId: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      const decoded = decodeToken(token); 

      state.isLoggedIn = true;
      state.token = token;
      state.userId = decoded?.Id || null;
      state.role = decoded?.Role || null;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;
      state.role = null;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
