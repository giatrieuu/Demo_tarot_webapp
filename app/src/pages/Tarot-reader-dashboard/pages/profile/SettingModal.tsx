import React, { useState } from "react";
import { Modal, Input, Button, Avatar, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { updateReaderProfile } from "../../../../services/tarotReaderServices";
import {
  uploadReaderAvatar,
} from "../../../../services/imageServices";

interface SettingModalProps {
  visible: boolean;
  onClose: () => void;
  readerData: any;
  onUpdate: (updatedData: any) => void;
}

const SettingModal: React.FC<SettingModalProps> = ({
  visible,
  onClose,
  readerData,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    name: readerData?.name || "",
    phone: readerData?.phone || "",
    description: readerData?.description || "",
    avatar:
      readerData?.avatar || "https://source.unsplash.com/100x100/?portrait", // Ảnh mặc định
  });

  const [loading, setLoading] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userId);

  // Xử lý thay đổi input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý upload Avatar
  const handleUpload = async (file: File) => {
    if (!userId) {
      message.error("User ID is missing. Please log in again.");
      return;
    }

    setLoading(true);
    const newAvatarUrl = await uploadReaderAvatar(userId, file); // Gọi API upload ảnh
    setFormData({ ...formData, avatar: newAvatarUrl }); // Cập nhật ảnh trong state
    message.success("Avatar updated successfully!");
    setLoading(false);
  };

  // Xử lý cập nhật hồ sơ
  const handleSubmit = () => {
    if (!userId) {
      message.error("User ID is missing. Please log in again.");
      return;
    }

    setLoading(true);
    updateReaderProfile({
      id: userId,
      ...formData,
    })
      .then((updatedData) => {
        message.success("Profile updated successfully!");
        onUpdate(updatedData);
        onClose();
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal title="Edit Profile" open={visible} onCancel={onClose} footer={null}>
      <div className="flex flex-col items-center space-y-6">
        {/* Avatar + Nút Change Avatar */}
        <div className="relative group">
          <Avatar
            src={formData.avatar}
            size={100}
            className="border-4 border-gray-300 shadow-md rounded-full"
          />

          {/* Nút upload nằm chồng lên avatar */}
          <Upload
            showUploadList={false}
            beforeUpload={(file) => {
              handleUpload(file);
              return false;
            }}
          >
            <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <UploadOutlined className="mr-1" /> Change
            </button>
          </Upload>
        </div>

        {/* Form chỉnh sửa */}
        <div className="w-full space-y-4">
          <label className="block text-gray-700 font-medium">Full Name</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-gray-700 font-medium">Phone</label>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-gray-700 font-medium">Description</label>
          <Input
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Button
            type="primary"
            loading={loading}
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SettingModal;
// import React, { useState } from "react";
// import { Modal, Input, Button, Avatar, Upload, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../../redux/store";
// import { updateReaderProfile } from "../../../../services/tarotReaderServices";
// import { uploadReaderAvatar } from "../../../../services/imageServices";

// interface SettingModalProps {
//   visible: boolean;
//   onClose: () => void;
//   readerData: any;
//   onUpdate: (updatedData: any) => void;
// }

// const SettingModal: React.FC<SettingModalProps> = ({
//   visible,
//   onClose,
//   readerData,
//   onUpdate,
// }) => {
//   const [formData, setFormData] = useState({
//     name: readerData?.name || "",
//     phone: readerData?.phone || "",
//     description: readerData?.description || "",
//     avatar: readerData?.avatar || "https://source.unsplash.com/100x100/?portrait",
//   });

//   const [loading, setLoading] = useState(false);
//   const userId = useSelector((state: RootState) => state.auth.userId);

//   // Xử lý upload Avatar
//   const handleUpload = async (file: File) => {
//     if (!userId) {
//       message.error("User ID is missing. Please log in again.");
//       return;
//     }

//     setLoading(true);
//     const newAvatarUrl = await uploadReaderAvatar(userId, file); // Gọi API upload ảnh
//     setFormData({ ...formData, avatar: newAvatarUrl }); // Cập nhật ảnh trong state
//     message.success("Avatar updated successfully!");
//     setLoading(false);
//   };

//   return (
//     <Modal title="Edit Profile" open={visible} onCancel={onClose} footer={null}>
//       <div className="flex flex-col items-center space-y-6">
//         {/* Avatar + Nút Change Avatar */}
//         <div className="relative group">
//           <Avatar
//             src={formData.avatar}
//             size={100}
//             className="border-4 border-gray-300 shadow-md rounded-full"
//           />

//           {/* Nút upload nằm chồng lên avatar */}
//           <Upload
//             showUploadList={false}
//             beforeUpload={(file) => {
//               handleUpload(file);
//               return false;
//             }}
//           >
//             <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <UploadOutlined className="mr-1" /> Change
//             </button>
//           </Upload>
//         </div>

//         {/* Form chỉnh sửa */}
//         <div className="w-full space-y-4">
//           <label className="block text-gray-700 font-medium">Full Name</label>
//           <Input name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

//           <label className="block text-gray-700 font-medium">Phone</label>
//           <Input name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

//           <label className="block text-gray-700 font-medium">Description</label>
//           <Input name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />

//           <Button type="primary" loading={loading} onClick={() => updateReaderProfile({ id: userId, ...formData })} className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200">
//             Save Changes
//           </Button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default SettingModal;
