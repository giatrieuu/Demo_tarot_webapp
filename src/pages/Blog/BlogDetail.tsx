import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Avatar,
  List,
  Typography,
  Breadcrumb,
  Alert,
  Button,
  Input,
  Form,
  Dropdown,
  Menu,
  Modal,
} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import ApiService from "../../services/axios"; // Import the ApiService to call APIs
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

interface CommentData {
  author: string;
  avatar: string;
  content: string;
  datetime: string;
  id: string; // Include ID for each comment to handle edits/deletes
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [commentList, setCommentList] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingComment, setEditingComment] = useState<string>(""); // Stores the comment being edited
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null); // Stores the ID of the comment being edited
  const userId = useSelector((state: RootState) => state.auth.userId);

  // Fetch blog post details
  useEffect(() => {
    const fetchBlogDetail = async () => {
      if (!id) {
        setError("Invalid blog ID");
        return;
      }

      try {
        const response = await ApiService.getBlogById(id);
        setBlog(response);
      } catch (err) {
        console.error("Error fetching blog post details:", err);
        setError("Failed to load blog details");
      }
    };

    fetchBlogDetail();
  }, [id]);

  // Fetch comments by postId
// Fetch comments by postId
useEffect(() => {
  const fetchComments = async () => {
      if (id) {
          try {
              const response = await ApiService.getCommentsByPostId(id); // Fetch comments using postId
              console.log('API response:', response); // Log the response to ensure we get the expected data

              // Extract the comments array from the response
              const comments = response.comments || []; // Default to empty array if no comments

              const formattedComments = comments.map((comment: any) => ({
                  author: comment.userName, // Use userName for the author field
                  avatar: comment.userImage || 'https://joeschmoe.io/api/v1/random', // Use userImage for avatar, default if missing
                  content: comment.content, // Use content for the comment text
                  datetime: new Date(comment.createdAt).toLocaleString(), // Format createdAt as a readable date
                  id: comment.id, // Include the comment ID
              }));

              setCommentList(formattedComments); // Set fetched comments
          } catch (err) {
              console.error("Error fetching comments:", err);
              setError("Failed to load comments");
          }
      }
  };

  fetchComments();
}, [id]);


  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") {
      return;
    }

    try {
      // Call API to post a new comment
      const response = await ApiService.postComment(id!, userId, newComment);

      const newCommentData = {
        author: "Anonymous",
        avatar: "https://joeschmoe.io/api/v1/random",
        content: response.text,
        datetime: new Date(response.createAt).toLocaleString(),
        id: response.id,
      };

      // Add the new comment to the list
      setCommentList([newCommentData, ...commentList]);
      setNewComment(""); // Clear the input
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId: string) => {
    try {
      await ApiService.deleteComment(commentId);
      setCommentList(commentList.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // Handle edit click - Open the modal with the comment text
  const handleEditComment = (commentId: string, currentText: string) => {
    setEditingComment(currentText); // Set the current comment text in the state
    setEditingCommentId(commentId); // Set the comment ID in the state
    setIsEditing(true); // Show the modal
  };

  // Handle editing comment submission
  const handleEditSubmit = async () => {
    if (editingCommentId && editingComment.trim() !== "") {
      try {
        // Call API to update the comment
        const response = await ApiService.updateComment(
          editingCommentId,
          editingComment
        );

        // Update the comment in the list
        setCommentList(
          commentList.map((comment) =>
            comment.id === editingCommentId
              ? {
                  ...comment,
                  content: response.text,
                  datetime: new Date().toLocaleString(),
                }
              : comment
          )
        );

        // Close the modal
        setIsEditing(false);
        setEditingComment("");
        setEditingCommentId(null);
      } catch (error) {
        console.error("Error updating comment:", error);
      }
    }
  };

  // Dropdown menu for Edit/Delete
  const menu = (commentId: string, currentText: string) => (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => handleEditComment(commentId, currentText)}
      >
        Edit
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleDeleteComment(commentId)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  if (error) return <Alert message={error} type="error" showIcon />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/blog">Blog</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{blog?.post?.title || "Blog Detail"}</Breadcrumb.Item>
      </Breadcrumb>

      <img
        src={blog?.url || "https://via.placeholder.com/150"}
        className="w-full h-80 object-cover shadow-lg my-4 mt-8"
        alt="Blog post"
      />

      <Title level={2}>{blog?.post?.title}</Title>

      <Paragraph className="text-sm text-gray-500">
        {blog?.post?.createAt
          ? new Date(blog.post.createAt).toLocaleDateString()
          : ""}{" "}
        - by {blog?.name}
      </Paragraph>

      <Paragraph>{blog?.post?.text}</Paragraph>

      <div className="mt-8">
        <Title level={4}>Comments</Title>

        {/* Comment Input Section */}
        <Form className="mb-6" layout="vertical">
          <Form.Item>
            <TextArea
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add your comment here..."
              className="rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              onClick={handleCommentSubmit}
              className="w-full h-10 rounded-md bg-blue-600 hover:bg-blue-500 text-white"
            >
              Add Comment
            </Button>
          </Form.Item>
        </Form>

        {/* Comment List Section */}
        <div className="max-h-96 overflow-y-auto">
          <List
            className="comment-list"
            header={`${commentList.length} ${
              commentList.length === 1 ? "comment" : "comments"
            }`}
            itemLayout="horizontal"
            dataSource={commentList}
            renderItem={(item) => (
              <li className="mb-4">
                <div className="flex items-start space-x-4">
                  <Avatar src={item.avatar} alt="Avatar" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-gray-800">{item.author}</strong>
                      <span className="text-xs text-gray-500">
                        {item.datetime}
                      </span>
                    </div>
                    <Paragraph className="text-gray-700">
                      {item.content}
                    </Paragraph>
                  </div>
                  <Dropdown
                    overlay={menu(item.id, item.content)}
                    trigger={["click"]}
                  >
                    <Button
                      shape="circle"
                      icon={<EllipsisOutlined />}
                      className="border-none shadow-none"
                    />
                  </Dropdown>
                </div>
              </li>
            )}
          />
        </div>
      </div>

      {/* Edit Comment Modal */}
      <Modal
        title="Edit Comment"
        visible={isEditing}
        onOk={handleEditSubmit}
        onCancel={() => setIsEditing(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <TextArea
          rows={4}
          value={editingComment}
          onChange={(e) => setEditingComment(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default BlogDetail;
