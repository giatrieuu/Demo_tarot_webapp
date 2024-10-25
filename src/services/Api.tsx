import { defaultAxiosInstance, tokenAxiosInstance } from "./axiosInstance";
import { toast } from "react-toastify";

export const googleLogin = async (token: string) => {
  const response = await tokenAxiosInstance.get(
    `/Auth/signin-google?token=${token}`
  );
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    toast.success("Google login successful");
  }
  return response;
};

export const authRedirect = async () => {
  try {
    // Making the request to the Auth redirect API
    const response = await tokenAxiosInstance.get(`/Auth/redirect`);
    toast.success("Redirect handled successfully");
    return response.data; // Ensure to return the data, which contains the redirect URL
  } catch (error) {
    toast.error("Failed to fetch redirect");
    throw error; // Re-throw the error to be handled by the caller
  }
};


export const fetchReadersList = async () => {
  const response = await defaultAxiosInstance.get(
    "/api/ReaderWeb/readers-list"
  );
  return response.data;
};
export const fetchTopicsList = async () => {
  const response = await tokenAxiosInstance.get("/api/TopicWeb/topics-list");
  return response.data;
};
