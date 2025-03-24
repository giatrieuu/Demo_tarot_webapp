import { defaultAxiosInstance } from "../axios/axiosConfig";

export const fetchLiveKitToken = async (bookingId: string, userName: string) => {
  try {
    const response = await defaultAxiosInstance.get(`/api/BookingWeb/LiveKitToken`, {
      params: { bookingId, userName },
    });

    if (!response.data || !response.data.token || !response.data.serverUrl) {
      console.error("⚠️ API LiveKit không trả về dữ liệu hợp lệ:", response.data);
      return null;
    }

    console.log("✅ LiveKit Token:", response.data);
    return response.data; // { token: "...", serverUrl: "..." }
  } catch (error) {
    console.error("❌ Lỗi khi lấy LiveKit token:", error);
    return null; // Trả về null để không làm crash app
  }
};
