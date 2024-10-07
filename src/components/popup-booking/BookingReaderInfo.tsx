import React, { useState } from 'react';
import { Drawer, Button, Input, Select, Checkbox, Divider, Card, Rate } from 'antd';

const { Option } = Select;

interface InforReaderDrawerProps {
  visible: boolean;
  onClose: () => void;
  reader: any;
}

const InforReaderDrawer: React.FC<InforReaderDrawerProps> = ({ visible, onClose, reader }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedDeck, setSelectedDeck] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [services, setServices] = useState<string[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  // Cập nhật tổng chi phí dựa trên các dịch vụ đã chọn
  const handleServiceChange = (checkedValues: any) => {
    setServices(checkedValues);
    const costs = {
      'More time (Max 15 mins)': 5,
      'Send results back to email': 5,
      'Ask another topic': 10,
      'Add a viewer': 15,
    };
    const newTotalCost = checkedValues.reduce((acc: number, service: string) => acc + costs[service], 0);
    setTotalCost(newTotalCost);
  };

  return (
    <Drawer
      title={null}
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
      width={400}
      bodyStyle={{ padding: 20, backgroundColor: '#91a089' }}
    >
      {/* Reader Information */}
      <Card bordered={false} className="mb-6 bg-[#d9e6dc] rounded-lg shadow-sm">
        <div className="flex items-center">
          <img
            src={reader?.image || 'https://via.placeholder.com/80'}
            alt={reader?.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
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
            className="w-1/2"
            value={selectedTopic}
            onChange={(value) => setSelectedTopic(value)}
          >
            <Option value="Love">Love</Option>
            <Option value="Study">Study</Option>
            <Option value="Health">Health</Option>
            <Option value="Money">Money</Option>
            <Option value="Family">Family</Option>
          </Select>
          <Select
            placeholder="Choose card deck"
            className="w-1/2"
            value={selectedDeck}
            onChange={(value) => setSelectedDeck(value)}
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
            onChange={(e) => setDate(e.target.value)}
            className="w-1/2"
          />
          <Input
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-1/2"
          />
        </div>

        {/* Services Checkboxes */}
        <Checkbox.Group
          className="flex flex-col space-y-2"
          value={services}
          onChange={handleServiceChange}
        >
          <Checkbox value="More time (Max 15 mins)">More time (Max 15 mins) - $5</Checkbox>
          <Checkbox value="Send results back to email">Send results back to email - $5</Checkbox>
          <Checkbox value="Ask another topic">Ask another topic - $10</Checkbox>
          <Checkbox value="Add a viewer">Add a viewer - $15</Checkbox>
        </Checkbox.Group>

        {/* Total Cost and Next Button */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white text-lg font-medium">Total cost</span>
            <span className="text-lg text-white">${totalCost}</span>
          </div>
          <Button type="primary" className="w-full bg-[#72876e] hover:bg-[#5b6958] text-white">
            Next
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default InforReaderDrawer;
