import React, { useState, useEffect } from 'react';
import { Checkbox, Input, Button, Slider, Select, Card, Rate } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

interface Reader {
  readerId: string;
  name: string;
  topics: string;
  price: string;
  rating: number;
  reviews: number;
}

interface Topic {
  id: string;
  name: string;
}

const ListReaders: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([2, 20]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [readers, setReaders] = useState<Reader[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term
  const [sortOrder, setSortOrder] = useState<string>('High to low'); // State for sort order
  const navigate = useNavigate();

  const handleTopicChange = (checkedValues: any) => {
    setSelectedTopics(checkedValues);
  };

  const handlePriceChange = (values: number[]) => {
    if (Array.isArray(values)) {
      setPriceRange([values[0], values[1]]);
    }
  };

  const handleResetAll = () => {
    setSelectedTopics([]);
    setPriceRange([2, 20]);
    setSortOrder('High to low'); // Reset sort order
  };

  const handleCardClick = (reader: Reader) => {
    navigate(`/reader-detail/${reader.readerId}`);
  };

  // Fetch readers and topics data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const readersResponse = await axios.get('https://www.bookingtarot.somee.com/api/ReaderWeb/readers-list');
        const readersData: Reader[] = readersResponse.data.map((reader: any) => ({
          ...reader,
          price: (reader.price / 23000).toFixed(2)
        }));
        setReaders(readersData);

        const topicsResponse = await axios.get('https://www.bookingtarot.somee.com/api/TopicWeb/topics-list');
        const topicsData: Topic[] = topicsResponse.data;
        setTopics(topicsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://www.bookingtarot.somee.com/api/ReaderWeb/GetPagedReaders?pageNumber=1&pageSize=10&searchTerm=${searchTerm}`);
      const newReaders: Reader[] = response.data.map((reader: any) => ({
        ...reader,
        price: (reader.price / 23000).toFixed(2)
      }));
      setReaders(newReaders);
    } catch (error) {
      console.error('Error fetching searched readers:', error);
    }
  };

  // Function to sort readers based on price
  const sortReaders = (order: string) => {
    const sortedReaders = [...readers].sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return order === 'Low to high' ? priceA - priceB : priceB - priceA;
    });
    setReaders(sortedReaders);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value); // Update sort order state
    sortReaders(value); // Call sorting function
  };

  return (
    <div className="min-h-screen bg-[#edf3e8] flex p-6 space-x-6">
      <div className="w-1/4 bg-[#d9e6dc] p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Filter</h2>
          <Button type="link" className="text-sm text-[#72876e]" onClick={handleResetAll}>
            Reset all
          </Button>
        </div>

        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Topic</h3>
          <Checkbox.Group className="flex flex-col space-y-1" value={selectedTopics} onChange={handleTopicChange}>
            {topics.map((topic) => (
              <Checkbox key={topic.id} value={topic.name}>
                {topic.name}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>

        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Price</h3>
          <div className="flex space-x-2 items-center mb-4">
            <Input value={`From: $${priceRange[0]}`} disabled className="w-1/2 p-2 bg-[#dde5db] text-[#7a7a7a] text-center rounded-md border border-gray-300" />
            <Input value={`To: $${priceRange[1]}`} disabled className="w-1/2 p-2 bg-[#dde5db] text-[#7a7a7a] text-center rounded-md border border-gray-300" />
          </div>
          <Slider range min={0} max={50} step={1} value={priceRange} onChange={handlePriceChange} className="mt-2" />
        </div>

        <Button type="primary" className="w-full mt-6 bg-[#91a089] hover:bg-[#72876e]">
          Apply
        </Button>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <Input
            placeholder="Tarot reader name"
            prefix={<SearchOutlined />}
            className="w-2/3 p-2 rounded-lg border border-gray-300 bg-[#dde5db] text-[#7a7a7a]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
          <Button
            onClick={handleSearch}
            style={{ backgroundColor: '#629584', color: 'white' }} // Set button colors
            className="ml-2 rounded-lg"
          >
            Search
          </Button>
          <Select value={sortOrder} onChange={handleSortChange} className="w-1/5 rounded-lg bg-[#dde5db] text-[#7a7a7a]">
            <Option value="High to low">High to low</Option>
            <Option value="Low to high">Low to high</Option>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {readers.map((reader) => (
            <Card key={reader.readerId} className="rounded-lg overflow-hidden shadow-lg bg-[#d9e6dc]" onClick={() => handleCardClick(reader)}>
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
    </div>
  );
};

export default ListReaders;
