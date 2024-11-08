// utils/authUtils.ts
import ApiService from "../services/axios";
import {jwtDecode} from "jwt-decode";
import { Dispatch } from "redux";
import { login } from "../redux/authSlice";

interface DecodedToken {
  Id: string;
  Role: number;
}

export const fetchGoogleToken = async (dispatch: Dispatch): Promise<void> => {
  try {
    const response = await ApiService.getToken();
    const token = response.token?.result;

    if (token) {
      const { userId, role } = decodeToken(token);

      // Store token and role in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role.toString());

      // Dispatch login action with token, userId, and role
      dispatch(login({ token, userId, role }));
    }
  } catch (error) {
    console.error("Error fetching token", error);
  }
};

export const decodeToken = (token: string): { userId: string; role: number } => {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return {
      userId: decodedToken.Id,
      role: decodedToken.Role,
    };
  } catch (error) {
    console.error("Failed to decode token", error);
    return { userId: "", role: 0 };
  }
};
