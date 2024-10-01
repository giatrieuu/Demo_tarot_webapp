import { tokenAxiosInstance, defaultAxiosInstance } from './axiosInstance';

// ví dụ về cách gọi config axios và gọi api
export const registerAccountStudent = async (data: { name: string; email: string; password: string; role: string; }) => {
    const response = await tokenAxiosInstance.post("/api/users", data);
    toast.success("Registration successful");
    return response.data;
  };
  
export const getSettingDefault = async () => {
    const response = await tokenAxiosInstance.get("/api/setting/default");
    return response.data;
  };