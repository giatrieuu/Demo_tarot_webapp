import React, { useState, useEffect } from "react";
import ApiService from "../../services/axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditPostProps {
    postId: string;
}

const EditBlog: React.FC<EditPostProps> = ({ postId }) => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch post details by ID
    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const postData = await ApiService.getPostById(postId);
                setTitle(postData.title);
                setText(postData.text);
                setContent(postData.content);
            } catch (error) {
                console.error("Error fetching post details:", error);
                alert("Failed to load post details.");
            } finally {
                setLoading(false);
            }
        };

        fetchPostDetails();
    }, [postId]);

    const handleEditorChange = (newContent: string) => {
        setContent(newContent);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await ApiService.updatePost(postId, title, text, content);
            console.log("Post updated successfully:", response);
            alert("Post updated successfully!");
        } catch (error) {
            console.error("Error updating post:", error);
            alert("Failed to update post. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Display loading indicator while fetching data
    }

    return (
        <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-md mt-10">
            <h2 className="text-2xl font-bold mb-6">Edit Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter post title"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Text</label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter post text"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Content</label>
                    <ReactQuill
                        value={content}
                        onChange={handleEditorChange}
                        theme="snow" // You can customize the theme
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default EditBlog;
