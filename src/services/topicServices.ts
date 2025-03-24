import { tokenAxiosInstance, defaultAxiosInstance } from "../axios/axiosConfig";

export const fetchTopicsList = async () => {
  const response = await defaultAxiosInstance.get("/api/TopicWeb/topics-list");
  return response.data;
};
export const fetchReaderTopics = async (
  readerId: string,
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  const response = await tokenAxiosInstance.get(
    `/api/ReaderWeb/reader-topic/${readerId}`,
    {
      params: { pageNumber, pageSize },
    }
  );
  return response.data;
};
