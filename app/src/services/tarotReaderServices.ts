
import { tokenAxiosInstance, defaultAxiosInstance } from "../axios/axiosConfig";


export const getPagedReadersInfo = async () => {
  const response = await defaultAxiosInstance.get("/api/ReaderWeb/GetPagedReadersInfo");
  return response.data; 

};
