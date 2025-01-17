import { tokenAxiosInstance, defaultAxiosInstance } from "../axios/axiosConfig";

export const getPagedPost = async ( searchCondition: { searchTerm: string }, pageNum: number, pageSize: number
) => {
  const response = await tokenAxiosInstance.get(
    "/api/PostWeb/GetPagedPostsNew",
    {
      params: {
        searchTerm: searchCondition.searchTerm,
        pageNumber: pageNum,
        pageSize: pageSize,
      },
    }
  );
  return response.data;
};

export const getPostById = async (id: string) => {
  const response = await defaultAxiosInstance.get(`/api/PostWeb/post-with-images/${id}`);
  return response.data;
};
