import axios from "axios";

const API_URL = "https://www.bookingtarot.somee.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const ApiService = {
  // Function to login a Tarot Reader
  loginTarotReader: async (email: string, password: string) => {
    try {
      const response = await api.post("/Auth/login", {
        email: email,
        password: password,
      });
      return response.data; // Return the response with the token
    } catch (error) {
      console.error("Error logging in Tarot Reader", error);
      throw error;
    }
  },
  getToken: async () => {
    try {
      const response = await api.get("/Auth/token", {
        withCredentials: true, // Include credentials (cookies) in the request
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
  // **Newly added function to fetch the list of group cards**
  fetchGroupCardsList: async () => {
    try {
      const response = await api.get("/api/GroupCardWeb/groupCards-list");
      return response.data; // Return the list of group cards from the API
    } catch (error) {
      console.error("Error fetching group cards list", error);
      throw error;
    }
  },
  // **Function to fetch group cards by reader ID**
  fetchGroupCardsByReaderId: async (
    readerId: string,
    pageNumber = 1,
    pageSize = 10
  ) => {
    try {
      const response = await api.get(
        `/api/GroupCardWeb/GetGroupCardsByReaderId/${readerId}`,
        {
          params: {
            pageNumber,
            pageSize,
          },
        }
      );
      return response.data; // Return the group cards data from the API
    } catch (error) {
      console.error("Error fetching group cards by reader ID", error);
      throw error;
    }
  },
  // **Newly added function to create a group card**
  createGroupCard: async (name: string, image: File, readerId: string) => {
    try {
      const formData = new FormData();
      formData.append("Name", name); // If API expects "Name", this is fine
      formData.append("image", image); // This is correct for the image
      formData.append("ReaderId", readerId); // Assuming "ReaderId" is correct key

      const response = await api.post(
        "/api/GroupCardWeb/create-groupCard",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Correct header for form data
          },
        }
      );

      return response.data; // Return the response from the API
    } catch (error) {
      console.error("Error creating group card", error);
      throw error;
    }
  },
  // **Newly added function to fetch the booking list**
  fetchBookingsList: async () => {
    try {
      const response = await api.get("/api/BookingWeb/bookings-list");
      return response.data; // Return the booking list data from the API
    } catch (error) {
      console.error("Error fetching booking list", error);
      throw error;
    }
  },
  // Function to fetch bookings by reader ID
  fetchBookingsByReaderId: async (
    readerId: string,
    pageNumber: number = 1,
    pageSize: number = 10
  ) => {
    try {
      const response = await api.get(
        `/api/BookingWeb/GetBookingsByReaderId/${readerId}`,
        {
          params: {
            pageNumber,
            pageSize,
          },
        }
      );
      return response.data; // Return the response from the API
    } catch (error) {
      console.error("Error fetching bookings by reader ID", error);
      throw error;
    }
  },
  fetchUsersList: async () => {
    try {
      const response = await api.get("/api/UserWeb/users-list");
      return response.data; // Return the list of users from the API
    } catch (error) {
      console.error("Error fetching users list", error);
      throw error;
    }
  },
  // Function to fetch the list of blog posts
  fetchBlogList: async (pageNumber = 1, pageSize = 10) => {
    try {
      const response = await api.get(`/api/PostWeb/GetPagedPosts`, {
        params: { pageNumber, pageSize },
      });
      return response.data; // Return the list of blog posts from the API
    } catch (error) {
      console.error("Error fetching blog list", error);
      throw error;
    }
  }
};



export default ApiService;
