import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Breadcrumb, Alert } from "antd";
import parse from "html-react-parser"; // 🟢 Thêm import này

import { getPostById } from "../../services/blogServices";

const { Title, Paragraph } = Typography;

interface BlogData {
  post: {
    id: string;
    userId: string;
    text: string;
    createAt: string;
    status: string;
    title: string;
    content: string;
  };
  url: string;
  name: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPostById(id!).then((blog) => {
      if (blog) {
        setBlog(blog);
      } else {
        setError("Failed to load blog details.");
      }
    });
  }, [id]);

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

      {/* 🖼 Ảnh Blog */}
      <img
        src={blog?.url || "https://via.placeholder.com/150"}
        className="w-full h-80 object-cover shadow-lg my-4 mt-8"
        alt="Blog post"
      />

      {/* 📝 Tiêu đề & Thông tin */}
      <Title level={2}>{blog?.post?.title}</Title>
      <Paragraph className="text-sm text-gray-500">
        {blog?.post?.createAt
          ? new Date(blog.post.createAt).toLocaleDateString()
          : ""}{" "}
        - by {blog?.name}
      </Paragraph>

      {/* 📝 Nội dung ngắn */}
      <Paragraph>{blog?.post?.text}</Paragraph>

      {/* 📝 Nội dung chi tiết từ ReactQuill */}
      <div className="prose max-w-none">
        {blog?.post?.content ? parse(blog.post.content) : ""}
      </div>

      {/* Bình luận (nếu cần) */}
      {/* <CommentSection postId={id!} userId={userId} /> */}
    </div>
  );
};

export default BlogDetail;
