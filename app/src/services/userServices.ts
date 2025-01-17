import { tokenAxiosInstance, defaultAxiosInstance } from "../axios/axiosConfig";


export const loginTarotReader = async (data: { email: string, password: string }) => {
    const res = await tokenAxiosInstance.post("Auth/login", data)
    return res.data
  } 