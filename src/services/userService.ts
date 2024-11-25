import { tokenAxiosInstance, defaultAxiosInstance } from "../axios/axiosConfig";

export const getGoogleAuthUrl = () => {
  return "https://www.bookingtarot.somee.com/Auth/redirect";
};
export const getToken = async () => {
  const res = await defaultAxiosInstance.get("Auth/token");
  return res.data;
};
export const loginTarotReader = async (data: {email: string, password: string }) =>{
  const res = await tokenAxiosInstance.post("Auth/login", data)
  return res.data
}