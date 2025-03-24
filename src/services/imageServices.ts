import { defaultAxiosInstance } from "../axios/axiosConfig";


/**
 * Upload Avatar cho Reader
 * @param {string} readerId - ID của reader
 * @param {File} file - Ảnh cần upload
 * @returns URL ảnh mới sau khi upload
 */
export const uploadReaderAvatar = async (readerId: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("readerId", readerId); // Thêm ID của reader vào form

  const response = await defaultAxiosInstance.post("/api/Images/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data; // Trả về URL ảnh sau khi upload
};
