import React, { useState } from "react";
import { Input, Select, Checkbox, Divider, Card, Rate, Button } from "antd";

const { Option } = Select;

interface InforReaderDrawerProps {
  visible?: boolean; // Xóa bỏ hoặc thêm ? để làm cho visible không bắt buộc
  onClose?: () => void; // Xóa bỏ hoặc thêm ? để làm cho onClose không bắt buộc
  reader: any;
  onNext: () => void; // Hàm chuyển đến bước tiếp theo
  handleDataChange: (field: string, value: any) => void; // Hàm cập nhật dữ liệu booking
  bookingData: any; // Dữ liệu booking hiện tại
}

// Khai báo kiểu dữ liệu cho costs để khắc phục lỗi TS7053
const costs: { [key: string]: number } = {
  "More time (Max 15 mins)": 5,
  "Send results back to email": 5,
  "Ask another topic": 10,
  "Add a viewer": 15,
};

const InforReaderDrawer: React.FC<InforReaderDrawerProps> = ({
  reader,
  onNext,
  handleDataChange,
  bookingData,
}) => {
  // Cập nhật các state từ bookingData được truyền từ props
  const [selectedTopic, setSelectedTopic] = useState<string>(bookingData.topic);
  const [selectedDeck, setSelectedDeck] = useState<string>(bookingData.cardDeck);
  const [date, setDate] = useState<string>(bookingData.date);
  const [time, setTime] = useState<string>(bookingData.time);
  const [services, setServices] = useState<string[]>(bookingData.services);
  const [totalCost, setTotalCost] = useState<number>(bookingData.totalCost);

  // Cập nhật tổng chi phí dựa trên các dịch vụ đã chọn
  const handleServiceChange = (checkedValues: string[]) => {
    setServices(checkedValues);
    const newTotalCost = checkedValues.reduce(
      (acc: number, service: string) => acc + (costs[service] || 0),
      0
    );
    setTotalCost(newTotalCost);

    // Cập nhật totalCost vào bookingData
    handleDataChange("totalCost", newTotalCost);
  };

  // Cập nhật topic và cardDeck vào bookingData
  const handleTopicChange = (value: string) => {
    setSelectedTopic(value);
    handleDataChange("topic", value);
  };

  const handleDeckChange = (value: string) => {
    setSelectedDeck(value);
    handleDataChange("cardDeck", value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    handleDataChange("date", e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
    handleDataChange("time", e.target.value);
  };

  return (
    <div className="p-4 bg-[#91a089]">
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

      {/* Booking Form */}
      <h3 className="text-md font-semibold mb-4 text-white">Book this person?</h3>
      <div className="space-y-4">
        {/* Topic and Card Deck Select */}
        <div className="flex space-x-4">
          <Select
            placeholder="Choose topic"
            className="w-1/2 h-12 rounded-lg"
            value={selectedTopic}
            onChange={handleTopicChange}
          >
            <Option value="Love">Love</Option>
            <Option value="Study">Study</Option>
            <Option value="Health">Health</Option>
            <Option value="Money">Money</Option>
            <Option value="Family">Family</Option>
          </Select>
          <Select
            placeholder="Choose card deck"
            className="w-1/2 h-12 rounded-lg"
            value={selectedDeck}
            onChange={handleDeckChange}
          >
            <Option value="Card deck 1">Card deck 1</Option>
            <Option value="Card deck 2">Card deck 2</Option>
            <Option value="Card deck 3">Card deck 3</Option>
            <Option value="Card deck 4">Card deck 4</Option>
            <Option value="Card deck 5">Card deck 5</Option>
          </Select>
        </div>

        {/* Date and Time Input */}
        <div className="flex space-x-4">
          <Input
            placeholder="Date"
            value={date}
            onChange={handleDateChange}
            className="w-1/2 h-12 p-3 rounded-lg bg-[#dde5db] text-[#7a7a7a]"
          />
          <Input
            placeholder="Time"
            value={time}
            onChange={handleTimeChange}
            className="w-1/2 h-12 p-3 rounded-lg bg-[#dde5db] text-[#7a7a7a]"
          />
        </div>

        {/* Services Checkboxes */}
        <Checkbox.Group
          className="flex flex-col space-y-2 bg-[#d9e6dc] p-4 rounded-lg"
          value={services}
          onChange={handleServiceChange}
        >
          <Checkbox value="More time (Max 15 mins)" className="text-sm">
            More time (Max 15 mins) - $5
          </Checkbox>
          <Checkbox value="Send results back to email" className="text-sm">
            Send results back to email - $5
          </Checkbox>
          <Checkbox value="Ask another topic" className="text-sm">
            Ask another topic - $10
          </Checkbox>
          <Checkbox value="Add a viewer" className="text-sm">
            Add a viewer - $15
          </Checkbox>
        </Checkbox.Group>

        {/* Total Cost */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-white text-lg font-medium">Total cost</span>
          <span className="text-lg text-white">${totalCost}</span>
        </div>

        {/* Next Button */}
        <div className="mt-6 flex justify-end">
          <Button
            type="primary"
            className="h-10 w-24 rounded-md bg-[#72876e] hover:bg-[#5b6958] text-white text-md"
            onClick={onNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InforReaderDrawer;
