import { tokenAxiosInstance, defaultAxiosInstance } from "../axios/axiosConfig";

export const loginTarotReader = async (data: {
  email: string;
  password: string;
}) => {
  const res = await tokenAxiosInstance.post("Auth/login", data);
  return res.data;
};
export const loginUser = async (data: { email: string; password: string }) => {
  const res = await tokenAxiosInstance.post("Auth/Userlogin", data);
  return res.data;
};
export const registerUser = async (data: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const response = await defaultAxiosInstance.post("/Auth/userRegister", data);
  return response.data;
};
export const verifyEmail = async (userId: string, token: string) => {
  const response = await defaultAxiosInstance.get(
    `/Auth/verify?userId=${userId}&token=${token}`
  );
  return response.data;
};
export const forgotPassword = async (email: string) => {
  const response = await defaultAxiosInstance.get(`/Auth/ForgotPassword?email=${encodeURIComponent(email)}`);
  return response.data;
};
export const getAuthToken = async () => {
  const response = await tokenAxiosInstance.get("/Auth/token", {
    withCredentials: true,
  });
  return response.data;
};
export const logoutUser = async () => {
  await tokenAxiosInstance.post("/Auth/logout", {}, { withCredentials: true });

  // Đánh dấu user đã logout
  localStorage.setItem("isLoggedOut", "true");

  // Xóa cookie trên frontend (chỉ có tác dụng nếu không phải HttpOnly)
  document.cookie =
    ".AspNetCore.Cookies=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Xóa localStorage
  localStorage.removeItem("authToken");
  sessionStorage.clear();

  // Reload trang để đảm bảo session bị xóa
  window.location.href = "/";
};

export const fetchUserWithImages = async (userId: string) => {
  const response = await defaultAxiosInstance.get(
    `/api/UserWeb/user-with-images/${userId}`
  );
  return response.data;
};
// Existing updateUserProfile function
export const updateUserProfile = async (userData: {
  id: string;
  name: string;
  email: string;
  description: string | null;
  dob: string | null;
  avatar?: File;
}) => {
  const formData = new FormData();
  formData.append("id", userData.id);
  formData.append("name", userData.name);
  formData.append("email", userData.email);
  if (userData.description) formData.append("description", userData.description);
  if (userData.dob) formData.append("dob", userData.dob);
  if (userData.avatar) formData.append("avatar", userData.avatar);

  const response = await defaultAxiosInstance.post(
    `/api/UserWeb/update-user`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// New updateUserImage function
export const updateUserImage = async (userId: string, imageFile: File) => {
  const formData = new FormData();
  formData.append("File", imageFile);
  formData.append("UserId", userId);
  // Optional fields (can be empty)
  formData.append("CardId", "");
  formData.append("PostId", "");
  formData.append("GroupId", "");
  formData.append("ReaderId", "");

  const response = await defaultAxiosInstance.post(
    `/api/Images/UpdateImage`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};