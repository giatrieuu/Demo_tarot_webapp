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

export const createTopic = async (name: string) => {
  const formData = new FormData();
  formData.append("Name", name);

  const response = await tokenAxiosInstance.post(
    "/api/TopicWeb/create-topic",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// New function to update a topic
export const updateTopic = async (id: string, name: string) => {
  const formData = new FormData();
  formData.append("Id", id);
  formData.append("Name", name);

  const response = await tokenAxiosInstance.post(
    "/api/TopicWeb/update-topic",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

// New function to delete a topic
export const deleteTopic = async (topicId: string) => {
  const response = await tokenAxiosInstance.post(
    `/api/TopicWeb/delete-topic`,
    null,
    {
      params: { topicId },
    }
  );
  return response.data;
};


// New function to associate a topic with a reader
export const createReaderTopic = async (readerId: string, topicId: string) => {
  const response = await tokenAxiosInstance.post(
    "/api/ReaderWeb/create-reader-topic",
    {
      readerId,
      topicId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};