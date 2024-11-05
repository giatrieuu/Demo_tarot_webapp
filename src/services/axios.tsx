import axios from "axios";
import { defaultAxiosInstance, tokenAxiosInstance } from "./axiosInstance";

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
  // Function to log out the user
  logoutUser: async () => {
    try {
      const response = await api.post("/Auth/logout", {});
      return response.data; // Return the logout response
    } catch (error) {
      console.error("Error logging out", error);
      throw error;
    }
  },
  // Function to change password
  changePassword: async (
    readerId: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      const formData = new FormData();
      formData.append("ReaderId", readerId); // Reader ID
      formData.append("OldPassword", oldPassword); // Current password
      formData.append("NewPassword", newPassword); // New password
      formData.append("ConfirmPassword", confirmPassword); // Confirm new password

      const response = await api.post(
        "/api/ReaderWeb/change-password",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response && response.data) {
        return response.data; // Return the API response
      } else {
        throw new Error("No response from server.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  },
  createReader: async (name: string, email: string, password: string) => {
    try {
      const formData = new FormData();
      formData.append("Name", name);
      formData.append("Email", email);
      formData.append("Password", password);

      const response = await api.post(
        "/api/ReaderWeb/create-reader",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data; // Return the response from the API
    } catch (error) {
      console.error("Error creating reader", error);
      throw error;
    }
  },

  fetchReadersList: async () => {
    try {
      const response = await api.get("/api/ReaderWeb/readers-list");
      return response.data; // Return the readers data from the API
    } catch (error) {
      console.error("Error fetching readers list", error);
      throw error;
    }
  },

  // Function to fetch user data with images by userId
  getUserWithImages: async (userId: string) => {
    try {
      const response = await api.get(`/api/UserWeb/user-with-images/${userId}`);
      return response.data; // Return the user data and images
    } catch (error) {
      console.error("Error fetching user with images", error);
      throw error;
    }
  },
  fetchReaderWithImages: async (readerId: string) => {
    try {
      const response = await api.get(
        `/api/ReaderWeb/reader-with-images/${readerId}`
      );
      return response.data; // Return the data received from API
    } catch (error) {
      console.error("Error fetching reader with images", error);
      throw error;
    }
  },

  // Function to get notifications for a reader
  getReaderNotifications: async (readerId: string) => {
    try {
      // Adjusted to use query parameters instead of URL segments
      const response = await api.get(`/api/NotificationWeb/get-reader-noti`, {
        params: {
          readerId, // Pass the readerId as a query parameter
        },
      });
      return response.data; // Return the notifications data
    } catch (error) {
      console.error("Error fetching reader notifications", error);
      throw error;
    }
  },
  getReaderNotificationCounts: async (readerId: string) => {
    try {
      const response = await api.get(
        `/api/NotificationWeb/get-reader-noti-counts`,
        {
          params: {
            readerId,
          },
        }
      );
      return response.data; // Return the notification counts
    } catch (error) {
      console.error("Error fetching reader notification counts", error);
      throw error;
    }
  },
  // Function to fetch notifications for a user by userId
  getUserNotifications: async (userId: string) => {
    try {
      const response = await api.get(`/api/NotificationWeb/get-user-noti`, {
        params: {
          userId, // Pass the userId as a query parameter
        },
      });
      return response.data; // Return the notifications data from the API
    } catch (error) {
      console.error("Error fetching user notifications", error);
      throw error;
    }
  },
  markNotificationAsRead: async (notificationId: string) => {
    try {
      const response = await api.post(
        `/api/NotificationWeb/mark-as-read`,
        null,
        {
          params: {
            notificationId, // Pass the notification ID as a query parameter
          },
        }
      );
      return response.data; // Return the response message
    } catch (error) {
      console.error("Error marking notification as read", error);
      throw error;
    }
  },

  // Function to create a topic
  createTopic: async (name: string) => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJUcmnhu4F1IEdpYSIsImVtYWlsIjoibGVnaWF0cmlldTMyNDVAZ21haWwuY29tIiwianRpIjoiNmZiMmVjYzItMTQxZi00Nzc2LTlhNzYtNTRlOGMwZmRmOWNkIiwiSWQiOiJVc2VyXzJkYzBmMWE2ZjYiLCJSb2xlIjoiMiIsIkltYWdlIjoiaHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi90YXJvdGJvb2tpbmdhcGkuYXBwc3BvdC5jb20vby9pbWFnZXMlMkZlMmIzNThkNC04ZjFhLTQyOWMtOGNiZi1hODdkZjJmNDU4ZjMuanBnP2FsdD1tZWRpYSZ0b2tlbj04YTEyNzNmNi05YTUxLTQ4M2YtOGY0NC02MDA5ZjNkZjA4NTgiLCJleHAiOjE3MzAzOTQ3OTIsImlzcyI6Imh0dHA6Ly93d3cuYm9va2luZ3Rhcm90LnNvbWVlLmNvbS8ifQ.EASwKpXNwdR0sKhqKhjVpRsgIMcK_EivC-CyK0wGIN8";

      const formData = new FormData();
      formData.append("name", name);

      const response = await api.post("/api/TopicWeb/create-topic", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      return response.data; // Return the response from the API
    } catch (error) {
      console.error("Error creating topic", error);
      throw error;
    }
  },
  deleteTopic: async (topicId: any) => {
    try {
      const response = await api.post(`/api/TopicWeb/delete-topic`, null, {
        params: { topicId },
      });
      return response.data; // Return the response from the API
    } catch (error) {
      console.error("Error deleting topic", error);
      throw error;
    }
  },
  // Function to fetch the list of topics
  fetchTopicsList: async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.get("/api/TopicWeb/topics-list", {
        headers: {
          Authorization: `bearer ${token}`, // Include the token in the Authorization header
        },
      });
      return response.data; // Return the list of topics from the API
    } catch (error) {
      console.error("Error fetching topics list", error);
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

  // Corrected function to create a group card
  createGroupCard: async (
    name: string,
    image: File,
    readerId: string,
    description: string
  ) => {
    try {
      const formData = new FormData();
      formData.append("Name", name); // Ensure the key matches what the API expects
      formData.append("image", image); // Correct key for the image file
      formData.append("ReaderId", readerId); // Key for readerId
      formData.append("Description", description); // Added missing description

      const response = await api.post(
        "/api/GroupCardWeb/create-groupCard",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct headers for multipart
          },
        }
      );

      return response.data; // Return the API response
    } catch (error) {
      console.error("Error creating group card", error);
      throw error;
    }
  },
  // Function to fetch cards by group card ID
  fetchCardsByGroupCardId: async (groupCardId: string) => {
    try {
      const response = await api.get(
        `/api/CardWeb/cards-by-group/${groupCardId}`
      );
      return response.data; // Return the list of cards from the API
    } catch (error) {
      console.error("Error fetching cards by group card ID", error);
      throw error;
    }
  },
  // Function to create a new card in a group
  createCard: async (
    groupId: string,
    element: string,
    name: string,
    message: string,
    img: File
  ) => {
    try {
      const formData = new FormData();
      formData.append("GroupId", groupId); // Group ID
      formData.append("Element", element); // Element of the card
      formData.append("Name", name); // Card name
      formData.append("Message", message); // Card message
      formData.append("img", img); // Image file for the card

      const response = await api.post("/api/CardWeb/create-card", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // Return the response data from the API
    } catch (error) {
      console.error("Error creating card:", error);
      throw error;
    }
  },
  // Function to update an existing card
  updateCard: async (
    id: string,
    groupId: string,
    element: string,
    name: string,
    message: string,
    image?: File
  ) => {
    try {
      const formData = new FormData();
      formData.append("Id", id); // Card ID
      formData.append("GroupId", groupId); // Group ID
      formData.append("Element", element); // Element of the card
      formData.append("Name", name); // Card name
      formData.append("Message", message); // Card message
      if (image) {
        formData.append("Image", image); // Optional image file for the card
      }

      const response = await api.post("/api/CardWeb/update-card", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // Return the response data from the API
    } catch (error) {
      console.error("Error updating card:", error);
      throw error;
    }
  },

  createListCard: async (
    cards: {
      groupId: string;
      element: string;
      name: string;
      message: string;
      img: File;
    }[]
  ) => {
    try {
      const cardDataList = await Promise.all(
        cards.map(async (card) => {
          // Prepare FormData for the image upload
          const imageFormData = new FormData();
          imageFormData.append("File", card.img);
          imageFormData.append("GroupId", card.groupId); // Pass GroupId if needed for image upload

          // Call updateImage API to upload the image and retrieve the URL or identifier
          const uploadedImage = await ApiService.updateImage(imageFormData);

          // Return the card data with the uploaded image URL/ID
          return {
            groupId: card.groupId,
            element: card.element,
            name: card.name,
            message: card.message,
            img: uploadedImage.url || uploadedImage.id, // Use the correct property from the response
          };
        })
      );

      // Prepare FormData for the createListCard API
      const formData = new FormData();
      cardDataList.forEach((card, index) => {
        formData.append(`createListCardModel[${index}][groupId]`, card.groupId);
        formData.append(`createListCardModel[${index}][element]`, card.element);
        formData.append(`createListCardModel[${index}][name]`, card.name);
        formData.append(`createListCardModel[${index}][message]`, card.message);
        formData.append(`createListCardModel[${index}][img]`, card.img); // Use the uploaded image URL/ID
      });

      // Call the API to create the list of cards
      const response = await api.post(
        "/api/CardWeb/create-list-card",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data; // Return the response from the API
    } catch (error) {
      console.error("Error creating list of cards", error);
      throw error;
    }
  },


  // Function to delete a card by cardId
  deleteCard: async (cardId: string) => {
    try {
      const response = await api.post(`/api/CardWeb/delete-card`, null, {
        params: { cardId },
      });
      return response.data; // Return the response from the API
    } catch (error) {
      console.error("Error deleting card", error);
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
  fetchBookingsByReaderId: async (readerId: string) => {
    try {
      const response = await api.get(
        `/api/BookingWeb/GetBookingsByReaderId/${readerId}`
      );
      return response.data; // Return the response from the API
    } catch (error) {
      console.error("Error fetching bookings by reader ID", error);
      throw error;
    }
  },
  // Function to fetch bookings by user ID
  fetchBookingsByUserId: async (userId: string) => {
    try {
      const response = await api.get(
        `/api/BookingWeb/GetBookingsByUserId/${userId}`
      );
      return response.data; // Return the response data from the API
    } catch (error) {
      console.error("Error fetching bookings by user ID", error);
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
  getPosts: async () => {
    try {
      const response = await api.get("/api/PostWeb/GetPagedPostsNew");
      return response.data; // Trả về dữ liệu bài đăng từ API
    } catch (error) {
      console.error("Error fetching posts list", error);
      throw error;
    }
  },
  getPostById: async (id: string) => {
    try {
      const response = await api.get(`/api/PostWeb/post-with-images/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching blog post details", error);
      throw error;
    }
  },

  createPost: async (
    title: string,
    text: string,
    content: string,
    image: File
  ) => {
    try {
      const formData = new FormData();
      formData.append("Title", title);
      formData.append("Text", text);
      formData.append("Content", content);
      formData.append("Image", image);

      const response = await api.post("/api/PostWeb/create-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error creating post", error);
      throw error;
    }
  },

  updatePost: async (
    id: string,
    title: string,
    text: string,
    content: string,
    image: File
  ) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("title", title);
      formData.append("text", text);
      formData.append("content", content);
      formData.append("image", image);

      const response = await api.post("/api/PostWeb/update-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error updating post", error);
      throw error;
    }
  },

  deletePost: async (postId: string) => {
    try {
      const response = await api.post(`/api/PostWeb/delete-post`, null, {
        params: { postId },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting post", error);
      throw error;
    }
  },

  // Function to update user data
  updateUser: async (data: any) => {
    try {
      const formData = new FormData();

      // Append only the available fields to the form data
      if (data.id) formData.append("Id", data.id);
      if (data.name) formData.append("Name", data.name);
      if (data.phone) formData.append("Phone", data.phone);
      if (data.description) formData.append("Description", data.description);
      if (data.dob) formData.append("Dob", data.dob);

      const response = await defaultAxiosInstance.post(
        "/api/UserWeb/update-user",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error updating user profile", error);
      throw error;
    }
  },
  updateReader: async (data: any) => {
    try {
      const formData = new FormData();

      // Append only the available fields to the form data
      if (data.id) formData.append("Id", data.id);
      if (data.name) formData.append("Name", data.name);
      if (data.phone) formData.append("Phone", data.phone);
      if (data.description) formData.append("Description", data.description);
      if (data.dob) formData.append("Dob", data.dob);

      const response = await defaultAxiosInstance.post(
        "/api/ReaderWeb/update-reader",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error updating reader profile", error);
      throw error;
    }
  },

  updateImage: async (
    file?: File,
    postId?: string,
    userId?: string,
    cardId?: string,
    groupId?: string,
    readerId?: string
  ) => {
    try {
      const formData = new FormData();

      if (file) formData.append("File", file);
      if (postId) formData.append("PostId", postId);
      if (userId) formData.append("UserId", userId);
      if (cardId) formData.append("CardId", cardId);
      if (groupId) formData.append("GroupId", groupId);
      if (readerId) formData.append("ReaderId", readerId);

      const response = await axios.post("/api/Images/UpdateImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // Return the response data from the API
    } catch (error) {
      console.error("Error updating image", error);
      throw error;
    }
  },

  // Block/Unblock User
  blockUser: async (userId: string) => {
    try {
      const response = await api.post(`/api/UserWeb/change-user-status`, null, {
        params: { userId },
      });
      return response.data;
    } catch (error) {
      console.error("Error blocking user", error);
      throw error;
    }
  },

  unblockUser: async (userId: string) => {
    try {
      const response = await api.post(`/api/UserWeb/change-user-status`, null, {
        params: { userId },
      });
      return response.data;
    } catch (error) {
      console.error("Error unblocking user", error);
      throw error;
    }
  },

  // Block/Unblock Tarot Reader
  blockReader: async (readerId: string) => {
    try {
      const response = await api.post(
        `/api/ReaderWeb/change-reader-status`,
        null,
        {
          params: { readerId },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error blocking reader", error);
      throw error;
    }
  },

  unblockReader: async (readerId: string) => {
    try {
      const response = await api.post(
        `/api/ReaderWeb/change-reader-status`,
        null,
        {
          params: { readerId },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error unblocking reader", error);
      throw error;
    }
  },

  // Function to fetch comments by postId with pagination
  getCommentsByPostId: async (
    postId: string,
    pageNumber = 1,
    pageSize = 100
  ) => {
    try {
      const response = await api.get(
        `/api/CommentWeb/GetCommentsByPostId/${postId}`,
        {
          params: {
            pageNumber,
            pageSize,
          },
        }
      );
      return response.data; // Return the comments data from the API
    } catch (error) {
      console.error("Error fetching comments by post ID", error);
      throw error;
    }
  },
  // Function to post a comment
  postComment: async (postId: string, userId: string, text: string) => {
    try {
      const formData = new FormData();
      formData.append("PostId", postId);
      formData.append("UserId", userId); // Assuming userId is available from the app state
      formData.append("Text", text);

      const response = await api.post(
        "/api/CommentWeb/create-comment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data; // Return the API response
    } catch (error) {
      console.error("Error posting comment:", error);
      throw error;
    }
  },
  // Function to edit a comment
  updateComment: async (commentId: string, text: string) => {
    try {
      const formData = new FormData();
      formData.append("Id", commentId); // Pass the comment ID
      formData.append("Text", text); // The updated text

      const response = await api.post(
        "/api/CommentWeb/update-comment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data; // Return the updated comment response
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  },
};

export default ApiService;
