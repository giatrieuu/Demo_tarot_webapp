import {jwtDecode} from "jwt-decode";

/**
 * Interface chứa các trường cần lấy từ token
 */
interface DecodedToken {
  Id?: string;
  Role?: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

/**
 * Giải mã JWT tokenz
 * @param token - Chuỗi JWT token
 * @returns Thông tin giải mã hoặc `null` nếu token không hợp lệ
 */
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

/**
 * Kiểm tra token có hợp lệ không (dựa vào expiration time - exp)
 * @param token - Chuỗi JWT token
 * @returns 
 */
export const isTokenValid = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return false;
  return decoded.exp * 1000 > Date.now(); 
};
