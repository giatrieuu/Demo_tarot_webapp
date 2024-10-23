import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined, HeartFilled, LeftOutlined } from "@ant-design/icons";

interface FollowUser {
    id: number;
    name: string;
}

const Profile: React.FC = () => {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState<string>("Nguyễn Quang Huy");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [dob, setDob] = useState<string>("");

    const follows: FollowUser[] = [
        { id: 1, name: "Glucozo10" },
        { id: 2, name: "Glucozo10" },
        { id: 3, name: "Glucozo10" },
    ];

    const handleBack = () => {
        navigate(-1);
    };

    const handleSave = () => {
        console.log("Profile Saved");
    };

    return (
        <div className="bg-[#D3E0DC] min-h-screen p-8">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <button onClick={handleBack} className="flex items-center gap-1 text-lg text-black">
                    <LeftOutlined />
                    Back
                </button>
            </div>

            <div className="flex gap-8">
                {/* Left Section */}
                <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
                    <div className="relative">
                        <img
                            src="./src/assets/background.jpg"
                            alt="Cover"
                            className="w-full h-60 object-cover rounded-t-lg"
                        />
                        <div className="absolute -bottom-10 left-6">
                            <div className="bg-purple-400 p-2 rounded-full border-4 border-white">
                                <UserOutlined className="text-4xl text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <h2 className="text-xl font-bold">{fullName}</h2>
                    </div>

                    {/* User Information */}
                    <div className="mt-8">
                        <h3 className="font-semibold">User information</h3>
                        <div className="flex flex-col gap-4 mt-4">
                            <input
                                type="text"
                                placeholder="Full name"
                                className="border p-2 rounded-md"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="border p-2 rounded-md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                className="border p-2 rounded-md"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <div className="flex gap-4">
                                <select
                                    className="border p-2 rounded-md w-1/2"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>

                                <input
                                    type="date"
                                    className="border p-2 rounded-md w-1/2"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-start">
                            <button
                                className="bg-blue-500 text-white px-6 py-2 rounded-md w-fit"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </div>

                {/* Right Section */}
                <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
                    <div className="mb-8">
                        <h3 className="font-semibold">Biography</h3>
                        <textarea
                            className="w-full border p-2 rounded-md mt-4"
                            rows={5}
                            placeholder="Write something about yourself..."
                        ></textarea>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Follow</h3>
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
                        <button className="text-blue-500 mt-2">+More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
