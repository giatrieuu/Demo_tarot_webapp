// src/pages/PostList.tsx
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useSelector } from "react-redux";
import {
  fetchPostsByReader,
} from "../../../../../services/blogServices";
import PostHeader from "./PostHeader";
import PostTable from "./PostTable";

import PostForm from "./PostForm";
import { RootState } from "../../../../../redux/store";

interface Post {
  id: string;
  title: string;
  text: string;
  content: string;
  createAt: string;
  url: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [editData, setEditData] = useState<Post | null>(null);

  // Lấy userId từ Redux
  const userId = useSelector((state: RootState) => state.auth.userId);

  // 🟢 Hàm fetch bài viết từ server
  const fetchPosts = () => {
    if (!userId) {
      message.error("Không tìm thấy ID của Reader.");
      setLoading(false);
      return;
    }

    fetchPostsByReader(userId, 1, 10)
      .then((data) => {
        setPosts(
          data.posts.map((item: any) => ({
            id: item.post.id,
            title: item.post.title,
            createAt: item.post.createAt,
            url: item.url,
          }))
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);


  const handleCreate = () => {
    setEditData(null);
    setIsFormVisible(true);
  };

  const handleSuccess = () => {
    fetchPosts();
    setIsFormVisible(false);
  };

  return (
    <div className="p-5 bg-white shadow-lg rounded-lg">

      <PostHeader onOpenCreate={handleCreate} />

      <PostTable posts={posts} loading={loading} />

  
      <PostForm
        visible={isFormVisible}
        onClose={() => setIsFormVisible(false)}
        onSuccess={handleSuccess}
        initialValues={editData}
      />
    </div>
  );
};

export default PostList;
