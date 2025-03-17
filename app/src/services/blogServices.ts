import { tokenAxiosInstance, defaultAxiosInstance } from "../axios/axiosConfig";

export const getPagedPost = async (
  searchCondition: { searchTerm: string },
  pageNum: number,
  pageSize: number
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
  const response = await defaultAxiosInstance.get(
    `/api/PostWeb/post-with-images/${id}`
  );
  return response.data;
};

export const fetchPostsByReader = async (
  readerId: string,
  pageNumber: number = 1,
  pageSize: number = 10
) => {
  const response = await tokenAxiosInstance.get(
    "/api/PostWeb/paged-posts-by-reader",
    {
      params: {
        readerId,
        pageNumber,
        pageSize,
      },
    }
  );
  return response.data;
};

export const deletePostById = async (postId: string) => {
  const response = await tokenAxiosInstance.post(
    `/api/PostWeb/delete-post`,
    null,
    {
      params: {
        postId,
      },
    }
  );
  return response.data;
};
export const createPost = async (
  readerId: string,
  title: string,
  text: string,
  content: string,
  imageFile: File
) => {
  const formData = new FormData();
  formData.append("ReaderId", readerId);
  formData.append("Title", title);
  formData.append("Text", text);
  formData.append("Content", content);
  if (imageFile) {
    formData.append("Image", imageFile);
  }

  const response = await tokenAxiosInstance.post("/api/PostWeb/create-post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updatePost = async (
  postId: string,
  title: string,
  text: string,
  content: string,
  image?: File
) => {
  const formData = new FormData();
  formData.append("Id", postId);
  formData.append("Title", title);
  formData.append("Text", text);
  formData.append("Content", content);
  if (image) {
    formData.append("Image", image);
  }

  const response = await tokenAxiosInstance.post(
    "/api/PostWeb/update-post",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
