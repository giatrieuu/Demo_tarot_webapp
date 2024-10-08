import React, { useState, useEffect } from "react";
import { Input, Select, Checkbox, Divider, Card, Rate, Button } from "antd";

const { Option } = Select;

interface UserInformationDrawerProps {
  visible: boolean;
  onClose: () => void;
  reader: any;
  totalCost: number;
  onPrevious: () => void;
  onNext: (userData: any) => void;
  bookingData: any;
  handleDataChange: (field: string, value: any) => void;
}

const UserInformationDrawer: React.FC<UserInformationDrawerProps> = ({

  reader,
  onPrevious,
  onNext,
  bookingData,
  handleDataChange,
}) => {
  // Khai báo state cho các trường nhập liệu của form, sử dụng dữ liệu từ bookingData
  const [userName, setUserName] = useState<string>(bookingData.userName);
  const [gender, setGender] = useState<string>(bookingData.gender);
  const [dob, setDob] = useState<string>(bookingData.dob);
  const [phone, setPhone] = useState<string>(bookingData.phone);
  const [email, setEmail] = useState<string>(bookingData.email);
  const [note, setNote] = useState<string>(bookingData.note);
  const [agreed, setAgreed] = useState<boolean>(false);

  // Cập nhật các state khi `bookingData` thay đổi
  useEffect(() => {
    setUserName(bookingData.userName);
    setGender(bookingData.gender);
    setDob(bookingData.dob);
    setPhone(bookingData.phone);
    setEmail(bookingData.email);
    setNote(bookingData.note);
  }, [bookingData]);

  // Hàm xử lý sự kiện khi người dùng nhấn nút Next
  const handleNext = () => {
    const userData = {
      userName,
      gender,
      dob,
      phone,
      email,
      note,
    };
    handleDataChange("userName", userName);
    handleDataChange("gender", gender);
    handleDataChange("dob", dob);
    handleDataChange("phone", phone);
    handleDataChange("email", email);
    handleDataChange("note", note);
    onNext(userData);
  };

  return (
    <div className="p-4 bg-[#91a089] w-full max-w-md mx-auto rounded-lg ">
      {/* Reader Information */}
      <Card bordered={false} className="mb-6 bg-[#d9e6dc] rounded-lg shadow-sm">
        <div className="flex items-center">
          <img
            src={reader?.image || "https://via.placeholder.com/80"}
            alt={reader?.name}
            className="w-16 h-16 rounded-full object-cover mr-4" // Điều chỉnh kích thước ảnh
          />
          <div>
            <h3 className="text-lg font-semibold">{reader?.name}</h3>
            <Rate disabled defaultValue={4} className="text-yellow-500" />
            <p className="text-sm text-gray-500">{reader?.price}/Hour</p>
          </div>
        </div>
        <Divider className="my-4" />
        <p className="text-sm text-gray-600">{reader?.description}</p>
      </Card>

      {/* User Information Form */}
      <h3 className="text-md font-semibold mb-4 text-white">Your information</h3>
      <div className="space-y-4">
        {/* Name and Gender */}
        <div className="flex space-x-4">
          <Input
            placeholder="Your name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              handleDataChange("userName", e.target.value);
            }}
            className="w-1/2 h-12 p-3 rounded-lg bg-[#dde5db] text-[#7a7a7a]"
          />
          <Select
            placeholder="Gender"
            className="w-1/2 h-12 rounded-lg"
            value={gender}
            onChange={(value) => {
              setGender(value);
              handleDataChange("gender", value);
            }}
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
        </div>

        {/* Date of Birth and Phone */}
        <div className="flex space-x-4">
          <Input
            placeholder="Date of birth"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
              handleDataChange("dob", e.target.value);
            }}
            className="w-1/2 h-12 p-3 rounded-lg bg-[#dde5db] text-[#7a7a7a]"
          />
          <Input
            placeholder="Phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              handleDataChange("phone", e.target.value);
            }}
            className="w-1/2 h-12 p-3 rounded-lg bg-[#dde5db] text-[#7a7a7a]"
          />
        </div>

        {/* Email */}
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            handleDataChange("email", e.target.value);
          }}
          className="w-full h-12 p-3 rounded-lg bg-[#dde5db] text-[#7a7a7a]"
        />

        {/* Note */}
        <Input.TextArea
          placeholder="Note"
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            handleDataChange("note", e.target.value);
          }}
          rows={2}
          className="w-full p-3 rounded-lg bg-[#dde5db] text-[#7a7a7a]"
        />

        {/* Terms of Service */}
        <Checkbox
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="text-sm"
        >
          I agree to the terms of service
        </Checkbox>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <Button
            type="default"
            className="h-10 w-24 rounded-md bg-[#91a089] hover:bg-[#72876e] text-white text-md"
            onClick={onPrevious} // Gọi hàm chuyển về bước trước
          >
            Previous
          </Button>
          <Button
            type="primary"
            className="h-10 w-24 rounded-md bg-[#72876e] hover:bg-[#5b6958] text-white text-md"
            onClick={handleNext} // Gọi hàm chuyển đến bước tiếp theo
            disabled={!agreed} // Chỉ cho phép nhấn Next khi đã đồng ý với điều khoản
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserInformationDrawer;
