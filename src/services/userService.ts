import { tokenAxiosInstance, defaultAxiosInstance } from "../axios/axiosConfig";

export const getGoogleAuthUrl = () => {
  return "https://www.bookingtarot.somee.com/Auth/redirect";
};
export const getToken = async () => {
  const res = await defaultAxiosInstance.get("Auth/token");
  return res.data;
};
export const loginTarotReader = async (data: { email: string, password: string }) => {
  const res = await tokenAxiosInstance.post("Auth/login", data)
  return res.data
}

export const fetchReadersList = async (keyword: string, minPrice: number, maxPrice: number, selectedTopicIds: string[]) => {
  const topicIds = selectedTopicIds.map((id) => `topicIds=${id}`).join('&');
  const apiUrl = `/api/ReaderWeb/GetPagedReadersInfo?readerName=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}${topicIds ? `&${topicIds}` : ''}`;
  const res = await defaultAxiosInstance.get(apiUrl);
  return res.data
};

export const fetchTopicsList = async () => {
  const res = await defaultAxiosInstance.get("/api/TopicWeb/topics-list");
  return res.data;
};

