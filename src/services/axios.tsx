import axios from "axios";

const API_URL = "https://www.bookingtarot.somee.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const ApiService = {
  getToken: async () => {
    try {
      const response = await api.get("/Auth/token", {
        withCredentials: true,  // Include credentials (cookies) in the request
      });
      return response.data; // Return the token response
    } catch (error) {
      console.error("Error retrieving token", error);
      throw error;
    }
  },

  // Function to create a topic
  createTopic: async (name: string) => {
    try {
      const formData = new FormData();
      formData.append("name", name);

      const response = await api.post("/api/TopicWeb/create-topic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // Return the response from the API
    } catch (error) {
      console.error("Error creating topic", error);
      throw error;
    }
  },

  // Function to fetch the list of topics
  fetchTopicsList: async () => {
    try {
      const response = await api.get("/api/TopicWeb/topics-list");
      return response.data; // Return the list of topics from the API
    } catch (error) {
      console.error("Error fetching topics list", error);
      throw error;
    }
  },
  // Function to delete a topic
  deleteTopic: async (id: string, name: string) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);

      const response = await api.post("/api/TopicWeb/delete-topic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // Return the response from the API
    } catch (error) {
      console.error("Error deleting topic", error);
      throw error;
    }
  },
  // Function to update a topic
  updateTopic: async (id: string, name: string) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);

      const response = await api.post("/api/TopicWeb/update-topic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // Return the response from the API
    } catch (error) {
      console.error("Error updating topic", error);
      throw error;
    }
  },
};

export default ApiService;
