import { tokenAxiosInstance } from "../axios/axiosConfig";
export const fetchReaderNotifications = async (readerId: string) => {
    const response = await tokenAxiosInstance.get(
      `/api/NotificationWeb/get-reader-noti`,
      {
        params: { readerId }, 
      }
    );
    return response.data;
  };