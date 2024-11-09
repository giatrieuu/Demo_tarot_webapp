import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, HeartFilled, LeftOutlined } from "@ant-design/icons";
import { Upload, message, Button, Input, Avatar, Progress } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ApiService from "../services/axios";
import ImgCrop from "antd-img-crop";
import dayjs from "dayjs";
import Loader from "../loader/Loader";

interface FollowUser {
  id: string;
  name: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const role = useSelector((state: RootState) => state.auth.role);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [biography, setBiography] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [follows, setFollows] = useState<FollowUser[]>([]);

  useEffect(() => {
    if (!userId || role === null) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (role === "1") {
          response = await ApiService.getUserWithImages(userId);
          const followedReadersResponse = await ApiService.getFollowedReaders(
            userId
          );
          const followedReaders = followedReadersResponse?.readers?.map(
            (reader: any) => ({
              id: reader.reader.id,
              name: reader.reader.name,
            })
          );
          setFollows(followedReaders || []);
        } else if (role === "3") {
          response = await ApiService.fetchReaderWithImages(userId);
        }

        const user = response?.user || response?.reader;
        setFullName(user?.name || "");
        setEmail(user?.email || "");
        setPhone(user?.phone || "");
        setDob(user?.dob ? dayjs(user.dob).format("YYYY-MM-DD") : "");
        setBiography(user?.description || "");
        setImageUrl(response?.url?.[0] || null);
      } catch (error) {
        message.error("Failed to fetch profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, role]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const updateData = {
        id: userId,
        name: fullName || undefined,
        phone: phone || undefined,
        description: biography || undefined,
        dob: dob || undefined,
      };

      if (role === "3") {
        await ApiService.updateReader(updateData);
      } else {
        await ApiService.updateUser(updateData);
      }
      message.success("Profile updated successfully");
    } catch (error) {
      message.error("Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    if (!userId) {
      message.error("User ID is missing.");
      return;
    }

    try {
      let response;

      // Pass the appropriate ID based on the user role
      if (role === "3") {
        response = await ApiService.updateImage(
          file,
          undefined,
          undefined,
          undefined,
          undefined,
          userId
        ); // for reader role
      } else if (role === "1") {
        response = await ApiService.updateImage(file, undefined, userId); // for user role
      }

      if (response?.url) {
        setImageUrl(response.url); // Update the profile image
        message.success("Image updated successfully");
      } else {
        message.error("Failed to get image URL");
      }
    } catch (error) {
      message.error("Failed to upload image");
      console.error("Error updating image", error);
    } finally {
      setUploadProgress(null);
    }
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG files!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-[#D3E0DC] min-h-screen p-8">
      <div className="flex items-center gap-2 mb-6">
        <Button onClick={() => navigate(-1)} icon={<LeftOutlined />}>
          Back
        </Button>
      </div>

      <div className="flex gap-8">
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <div className="relative">
            <img
              src="./src/assets/background.jpg"
              alt="Cover"
              className="w-full h-60 object-cover rounded-t-lg"
            />
            <div className="absolute -bottom-10 left-6">
              <div className="p-2 rounded-full border-4 border-white relative">
                <ImgCrop>
                  <Upload
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    customRequest={({ file }) =>
                      handleImageUpload(file as File)
                    }
                  >
                    <div className="relative">
                      <Avatar
                        src={imageUrl}
                        size={128}
                        icon={<UserOutlined />}
                        style={{
                          cursor: "pointer",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                      {uploadProgress !== null && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full">
                          <Progress
                            type="circle"
                            percent={uploadProgress}
                            width={80}
                            showInfo={false}
                          />
                        </div>
                      )}
                    </div>
                  </Upload>
                </ImgCrop>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold">{fullName}</h2>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold">User information</h3>
            <div className="flex flex-col gap-4 mt-4">
              <Input
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <Input placeholder="Email" value={email} disabled />
              <Input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="flex gap-4">
                <Input
                  type="date"
                  className="w-1/2"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-start">
              <Button type="primary" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </div>

        <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-8">
            <h3 className="font-semibold">Biography</h3>
            <textarea
              className="w-full border p-2 rounded-md mt-4"
              rows={5}
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
              placeholder="Write something about yourself..."
            ></textarea>
          </div>
          {role === "1" && follows.length > 0 && (
            <div>
              <h3 className="font-semibold mb-4">Followed Readers</h3>
              {follows.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between bg-gray-100 p-3 rounded-md mb-2"
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-purple-400 p-2 rounded-full">
                      <UserOutlined className="text-xl text-white" />
                    </div>
                    <span>{user.name}</span>
                  </div>
                  <HeartFilled className="text-red-500" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
