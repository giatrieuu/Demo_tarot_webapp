import {tokenAxiosInstance} from "../axios/axiosConfig";

export const fetchBookingsByReaderId = async (
  readerId: string,
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  const response = await tokenAxiosInstance.get(
    `/api/BookingWeb/GetBookingsByReaderId/${readerId}`,
    {
      params: { pageNumber, pageSize },
    }
  );
  return response.data;
};
export const updateBookingStatus = async (bookingId: string, status: number) => {
    const response = await tokenAxiosInstance.post(
      "/api/BookingWeb/change-booking-status",
      null, 
      {
        params: {
          bookingId,
          status,
        },
      }
    );
    return response.data;
  };

  export const createBooking = async ({
    userId,
    readerId,
    timeStart,
    timeEnd,
    listTopicId,
    note,
  }: {
    userId: string;
    readerId: string;
    timeStart: string;
    timeEnd: string;
    listTopicId: string[];
    note?: string;
  }) => {
    const formData = new FormData();
    formData.append("UserId", userId);
    formData.append("ReaderId", readerId);
    formData.append("TimeStart", timeStart);
    formData.append("TimeEnd", timeEnd);
    listTopicId.forEach((topic) => formData.append("ListTopicId", topic));
    if (note) formData.append("Note", note);
  
    console.log("Sending Booking Data:", Object.fromEntries(formData)); // Debug request
  
    const response = await tokenAxiosInstance.post(
      "/api/BookingWeb/create-booking",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  
    return response.data;
  };
  



  export const createPaymentQR = async ({
    amount,
    orderId,
  }: {
    amount: number;
    orderId: string;
  }) => {
    const requestBody = {
      amount: Math.abs(amount), // Đảm bảo số dương
      orderId: orderId,
    };
  
    console.log("Gửi request createPaymentQR:", requestBody); // Debug request
  
    const response = await tokenAxiosInstance.post(
      "/api/Payment/create-qr",
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );
  
    console.log("Response từ API createPaymentQR:", response.data); // Debug response
  
    return response.data;
  };


  export const fetchBookingsByUserId = async (
    userId: string,
    pageNumber: number = 1,
    pageSize: number = 10
  ) => {
    const response = await tokenAxiosInstance.get(
      `/api/BookingWeb/GetBookingsByUserId/${userId}`,
      {
        params: { pageNumber, pageSize },
      }
    );
  
    console.log("Fetch Bookings Response:", response.data); // Debug API response
    return response.data;
  };
  