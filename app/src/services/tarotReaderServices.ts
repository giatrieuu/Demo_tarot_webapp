import { tokenAxiosInstance, defaultAxiosInstance } from "../axios/axiosConfig";

export const getPagedReadersInfo = async () => {
  const response = await defaultAxiosInstance.get(
    "/api/ReaderWeb/GetPagedReadersInfo"
  );
  return response.data;
};
export const fetchReadersList = async (
  keyword: string,
  minPrice: number,
  maxPrice: number,
  selectedTopicIds: string[]
) => {
  // Tạo query string từ danh sách topicIds
  const topicIds = selectedTopicIds.map((id) => `topicIds=${id}`).join("&");
  const apiUrl = `/api/ReaderWeb/GetPagedReadersInfo?readerName=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}${
    topicIds ? `&${topicIds}` : ""
  }`;

  const response = await defaultAxiosInstance.get(apiUrl);
  return response.data;
};

export const fetchReaderById = async (readerId: string) => {
  const response = await defaultAxiosInstance.get(
    `/api/ReaderWeb/reader-with-images/${readerId}`
  );
  return response.data;
};

export const fetchReaderReviews = async (readerId: string) => {
  const response = await defaultAxiosInstance.get(
    `/api/BookingWeb/get-feed-back`,
    {
      params: {
        readerId,
      },
    }
  );
  return response.data;
};
export const fetchReaderTopics = async (
  readerId: string,
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  const response = await defaultAxiosInstance.get(
    `/api/ReaderWeb/reader-topic/${readerId}`,
    {
      params: {
        pageNumber,
        pageSize,
      },
    }
  );
  return response.data;
};
export const updateReaderProfile = async ({
  id,
  name,
  phone,
  description,
  dob,
}: {
  id: string;
  name?: string;
  phone?: string;
  description?: string;
  dob?: string;
}) => {
  const formData = new FormData();
  formData.append("id", id);
  if (name) formData.append("name", name);
  if (phone) formData.append("phone", phone);
  if (description) formData.append("description", description);
  if (dob) formData.append("dob", dob);

  const response = await tokenAxiosInstance.post(
    "/api/ReaderWeb/update-reader",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const fetchAllReaders = async () => {
  const response = await tokenAxiosInstance.get("/api/ReaderWeb/readers-list");
  return response.data;
};
export const fetchAllUsers = async () => {
  const response = await tokenAxiosInstance.get("/api/UserWeb/users-list");
  return response.data;
};
export const changeReaderStatus = async (readerId: string): Promise<any> => {
  const response = await tokenAxiosInstance.post(
    `/api/ReaderWeb/change-reader-status`,
    null,
    {
      params: { readerId },
    }
  );
  return response.data;
};

export const createTarotReader = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const formData = new FormData();
  formData.append("Name", name);
  formData.append("Email", email);
  formData.append("Password", password);

  const response = await tokenAxiosInstance.post(
    "/api/ReaderWeb/create-reader",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const changePassword = async ({
  readerId,
  oldPassword,
  newPassword,
  confirmPassword,
}: {
  readerId: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const formData = new FormData();
  formData.append("ReaderId", readerId);
  formData.append("OldPassword", oldPassword);
  formData.append("NewPassword", newPassword);
  formData.append("ConfirmPassword", confirmPassword);

  const response = await tokenAxiosInstance.post(
    "/api/ReaderWeb/change-password",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};
export const createWorkSchedule = async ({
  readerId,
  workDate,
  startTime,
  endTime,
  status,
  description,
}: {
  readerId: string;  // ✅ Đảm bảo `readerId` luôn là `string`
  workDate: string;
  startTime: string;
  endTime: string;
  status: string;
  description: string;
}) => {
  const response = await tokenAxiosInstance.post(
    "/api/WorkScheduleWeb/create-workSchedule",
    {
      readerId,
      workDate,
      startTime,
      endTime,
      status,
      description,
    }
  );
  return response.data;
};
export const fetchWorkScheduleByReaderId = async (readerId: string) => {
  const response = await tokenAxiosInstance.get(
    `/api/WorkScheduleWeb/workSchedules-list-by-readerid?readerId=${readerId}`
  );
  return response.data;
};