import React, { useState, useEffect } from "react";
import { List, Typography, Avatar, Button, Input, Form, Dropdown, Menu, Modal } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;
const { TextArea } = Input;

interface CommentData {
  author: string;
  avatar: string;
  content: string;
  datetime: string;
  id: string;
}

interface CommentSectionProps {
  postId: string;
  userId: string | null;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, userId }) => {
  const [commentList, setCommentList] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingComment, setEditingComment] = useState<string>("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await ApiService.getCommentsByPostId(postId);
        const formattedComments = (response.comments || []).map((comment: any) => ({
          author: comment.userName,
          avatar: comment.userImage || "https://joeschmoe.io/api/v1/random",
          content: comment.content,
          datetime: new Date(comment.createdAt).toLocaleString(),
          id: comment.id,
        }));
        setCommentList(formattedComments);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || !userId) return;
    try {
      const response = await ApiService.postComment(postId, userId, newComment);
      const newCommentData = {
        author: "Anonymous",
        avatar: "https://joeschmoe.io/api/v1/random",
        content: response.text,
        datetime: new Date(response.createAt).toLocaleString(),
        id: response.id,
      };
      setCommentList([newCommentData, ...commentList]);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await ApiService.deleteComment(commentId);
      setCommentList(commentList.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = (commentId: string, currentText: string) => {
    setEditingComment(currentText);
    setEditingCommentId(commentId);
    setIsEditing(true);
  };

  const handleEditSubmit = async () => {
    if (editingCommentId && editingComment.trim()) {
      try {
        const response = await ApiService.updateComment(editingCommentId, editingComment);
        setCommentList(
          commentList.map((comment) =>
            comment.id === editingCommentId
              ? { ...comment, content: response.text, datetime: new Date().toLocaleString() }
              : comment
          )
        );
        setIsEditing(false);
        setEditingComment("");
        setEditingCommentId(null);
      } catch (error) {
        console.error("Error updating comment:", error);
      }
    }
  };

  const menu = (commentId: string, currentText: string) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleEditComment(commentId, currentText)}>
        Edit
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleDeleteComment(commentId)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="mt-8">
      <Typography.Title level={4}>Comments</Typography.Title>
      <Form className="mb-6" layout="vertical">
        <Form.Item>
          <TextArea
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment here..."
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleCommentSubmit}>
            Add Comment
          </Button>
        </Form.Item>
      </Form>
      <List
        className="comment-list"
        header={`${commentList.length} ${commentList.length === 1 ? "comment" : "comments"}`}
        itemLayout="horizontal"
        dataSource={commentList}
        renderItem={(item) => (
          <li>
            <div className="flex items-start space-x-4">
              <Avatar src={item.avatar} />
              <div className="flex-1">
                <div className="flex justify-between">
                  <strong>{item.author}</strong>
                  <span className="text-xs">{item.datetime}</span>
                </div>
                <Paragraph>{item.content}</Paragraph>
              </div>
              <Dropdown overlay={menu(item.id, item.content)} trigger={["click"]}>
                <Button shape="circle" icon={<EllipsisOutlined />} />
              </Dropdown>
            </div>
          </li>
        )}
      />
      <Modal
        title="Edit Comment"
        visible={isEditing}
        onOk={handleEditSubmit}
        onCancel={() => setIsEditing(false)}
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

export default CommentSection;
