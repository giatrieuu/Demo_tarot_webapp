// DeleteBlog.tsx
import React from 'react';
import { Modal, Button } from 'antd';
import ApiService from '../../services/axios';

interface DeletePostProps {
    visible: boolean;
    id: string | null;
    onClose: () => void;
    onDelete: (id: string) => void;
}

const DeletePost: React.FC<DeletePostProps> = ({ visible, id, onClose, onDelete }) => {
    const handleDelete = async () => {
        if (id) {
            await ApiService.deletePost(id);
            onDelete(id);
            onClose();
        }
    };

    return (
        <Modal
            title="Delete Post"
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="delete" type="primary" danger onClick={handleDelete}>
                    Delete
                </Button>,
            ]}
        >
            <p>Are you sure you want to delete the post with ID: {id}?</p>
        </Modal>
    );
};

export default DeletePost;
