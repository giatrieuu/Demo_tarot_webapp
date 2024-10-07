import React, { useState } from 'react';
import { Checkbox, Input, Button, Slider, Select, Card, Rate } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import InforReaderDrawer from '../components/popup-booking/BookingReaderInfo'; // Import component

const { Option } = Select;

const ListReaders: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([2, 20]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Love', 'Study', 'Health', 'Money', 'Family']);
  const [selectedDecks, setSelectedDecks] = useState<string[]>(['Card deck 1', 'Card deck 2', 'Card deck 3', 'Card deck 4', 'Card deck 5']);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedReader, setSelectedReader] = useState<any>(null);

  const handleTopicChange = (checkedValues: any) => {
    setSelectedTopics(checkedValues);
  };

  const handleDeckChange = (checkedValues: any) => {
    setSelectedDecks(checkedValues);
  };

  const handlePriceChange = (values: [number, number]) => {
    setPriceRange(values);
  };

  const handleResetAll = () => {
    setSelectedTopics([]);
    setSelectedDecks([]);
    setPriceRange([2, 20]);
  };

  const showDrawer = (reader: any) => {
    setSelectedReader(reader);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="min-h-screen bg-[#edf3e8] flex p-6 space-x-6">
      {/* Filter Section */}
      <div className="w-1/4 bg-[#d9e6dc] p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Filter</h2>
          <Button type="link" className="text-sm text-[#72876e]" onClick={handleResetAll}>
            Reset all
          </Button>
        </div>

        {/* Topic Filter */}
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Topic</h3>
          <Checkbox.Group className="flex flex-col space-y-1" value={selectedTopics} onChange={handleTopicChange}>
            <Checkbox value="Love">Love</Checkbox>
            <Checkbox value="Study">Study</Checkbox>
            <Checkbox value="Health">Health</Checkbox>
            <Checkbox value="Money">Money</Checkbox>
            <Checkbox value="Family">Family</Checkbox>
          </Checkbox.Group>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Price</h3>
          <div className="flex space-x-2 items-center mb-4">
            <Input value={`From: $${priceRange[0]}`} disabled className="w-1/2 p-2 bg-[#dde5db] text-[#7a7a7a] text-center rounded-md border border-gray-300" />
            <Input value={`To: $${priceRange[1]}`} disabled className="w-1/2 p-2 bg-[#dde5db] text-[#7a7a7a] text-center rounded-md border border-gray-300" />
          </div>
          <Slider range min={0} max={50} step={1} value={priceRange} onChange={handlePriceChange} className="mt-2" />
        </div>

        {/* Card Deck Filter */}
        <div>
          <h3 className="text-md font-medium mb-2">Card deck</h3>
          <Checkbox.Group className="flex flex-col space-y-1" value={selectedDecks} onChange={handleDeckChange}>
            <Checkbox value="Card deck 1">Card deck 1</Checkbox>
            <Checkbox value="Card deck 2">Card deck 2</Checkbox>
            <Checkbox value="Card deck 3">Card deck 3</Checkbox>
            <Checkbox value="Card deck 4">Card deck 4</Checkbox>
            <Checkbox value="Card deck 5">Card deck 5</Checkbox>
          </Checkbox.Group>
        </div>

        {/* Apply Button */}
        <Button type="primary" className="w-full mt-6 bg-[#91a089] hover:bg-[#72876e]">
          Apply
        </Button>
      </div>

      {/* Readers List Section */}
      <div className="flex-1">
        {/* Search and Sort */}
        <div className="flex justify-between items-center mb-6">
          <Input placeholder="Tarot reader name" prefix={<SearchOutlined />} className="w-1/3 p-2 rounded-lg border border-gray-300 bg-[#dde5db] text-[#7a7a7a]" />
          <Select defaultValue="High to low" className="w-1/5 rounded-lg bg-[#dde5db] text-[#7a7a7a]">
            <Option value="High to low">High to low</Option>
            <Option value="Low to high">Low to high</Option>
          </Select>
        </div>

        {/* Readers List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Reader Cards */}
          {[
            { name: 'Gia Triều - Victor', topics: 'Love - Study - Money', price: 10, reviews: 102, rating: 4 },
            { name: 'Thảo - Shy', topics: 'Love - Study', price: 10, reviews: 170, rating: 5 },
            { name: 'Huy - Glucozo', topics: 'Love - Study', price: 8, reviews: 90, rating: 4 },
            { name: 'Capybara - Sucksick', topics: 'Family - Study', price: 2, reviews: 10, rating: 3 },
          ].map((reader, index) => (
            <Card key={index} className="rounded-lg overflow-hidden shadow-lg bg-[#d9e6dc]" onClick={() => showDrawer(reader)}>
              <img src="https://via.placeholder.com/300x180" alt="Reader" className="w-full h-32 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{reader.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{reader.topics}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#72876e] font-bold">${reader.price}/Hour</span>
                  <Rate disabled defaultValue={reader.rating} className="text-yellow-500" />
                </div>
                <p className="text-sm text-gray-500 mt-2">{reader.reviews} reviews</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Drawer for Reader Information */}
      {selectedReader && (
        <InforReaderDrawer visible={visible} onClose={onClose} reader={selectedReader} />
      )}
    </div>
  );
};

export default ListReaders;
