import React, { useEffect, useState } from 'react';
import { Checkbox, Input, Button, Slider, Select, Card, Rate, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

interface Topic {
  id: string;
  name: string;
}

interface Reader {
  reader: {
    id: string;
    name: string;
    price: number;
    rating: number;
  };
  topics: Topic[];
  countBooking: number;
  url: string;
}

const ListReaders: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 900000]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [sortedReaders, setSortedReaders] = useState<Reader[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('High to low');
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalReader, setTotalReader] = useState<number>(0);
  const navigate = useNavigate();

  // Hàm để lấy các chủ đề độc nhất từ danh sách người đọc
  const getUniqueTopics = (readers: Reader[]): Topic[] => {
    const topicSet = new Set<string>();

    readers.forEach(reader => {
      reader.topics.forEach(topic => {
        topicSet.add(topic.id);
      });
    });

    return Array.from(topicSet).map(id => {
      const foundTopic = readers.flatMap(reader => reader.topics).find(topic => topic.id === id);
      return foundTopic ? { id: foundTopic.id, name: foundTopic.name } : null;
    }).filter(Boolean) as Topic[]; // Lọc bỏ giá trị null
  };

  // Hàm để fetch dữ liệu người đọc từ API
  const fetchReaders = async () => {
    try {
      const response = await fetch('https://www.bookingtarot.somee.com/api/ReaderWeb/GetPagedReadersInfo');
      if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);

      const data = await response.json();
      console.log('Fetched Readers Data:', data);

      if (data && Array.isArray(data.readers)) {
        setSortedReaders(data.readers);
        const uniqueTopics = getUniqueTopics(data.readers);
        console.log('Unique Topics:', uniqueTopics);
        setTopics(uniqueTopics);
        setTotalPage(data.totalPages || 0);
        setTotalReader(data.totalItems || 0);
      } else {
        console.error('Expected data to contain a readers array:', data);
        message.error('Unexpected data format, please try again later.');
      }
    } catch (error) {
      console.error('Error fetching readers:', error);
      message.error('Error fetching readers, please try again later.');
    }
  };

  useEffect(() => {
    fetchReaders();
  }, []);

  // Các hàm xử lý sự kiện
  const handleTopicChange = (checkedValues: string[]) => {
    setSelectedTopicIds(checkedValues);
  };

  const handlePriceChange = (values: number[]) => {
    if (Array.isArray(values)) {
      setPriceRange([values[0], values[1]]);
    }
  };

  const handleResetAll = () => {
    setSelectedTopicIds([]);
    setPriceRange([0, 900000]);
    setKeyword('');
    fetchReaders();
  };

  const handleCardClick = (reader: Reader) => {
    navigate(`/reader-detail/${reader.reader.id}`);
  };

  const handleFilterApply = async () => {
    const minPrice = priceRange[0];
    const maxPrice = priceRange[1];

    const topicIds = selectedTopicIds.map(id => `topicIds=${id}`).join('&');
    const apiUrl = `https://www.bookingtarot.somee.com/api/ReaderWeb/GetPagedReadersInfo?readerName=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}${topicIds ? `&${topicIds}` : ''}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (Array.isArray(data.readers)) {
        setSortedReaders(data.readers);
        setTotalPage(data.totalPages || 0);
        setTotalReader(data.totalItems || 0);
      } else {
        message.error('Unexpected data format for filtered readers.');
      }
    } catch (error) {
      console.error('Error filtering readers:', error);
      message.error('Error filtering readers, please try again later.');
    }
  };

  const handleSearch = async () => {
    const apiUrl = `https://www.bookingtarot.somee.com/api/ReaderWeb/GetPagedReadersInfo?readerName=${keyword}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (Array.isArray(data.readers)) {
        setSortedReaders(data.readers);
        setTotalPage(data.totalPages || 0);
        setTotalReader(data.totalItems || 0);
      } else {
        message.error('Unexpected data format for search results.');
      }
    } catch (error) {
      console.error('Error searching readers:', error);
      message.error('Error searching readers, please try again later.');
    }
  };

  // Hàm để sắp xếp người đọc
  const sortReaders = (readers: Reader[], order: string) => {
    return readers.sort((a, b) => {
      const priceA = a.reader.price || 0;
      const priceB = b.reader.price || 0;

      return order === 'High to low' ? priceB - priceA : priceA - priceB;
    });
  };

  const displayedReaders = sortReaders([...sortedReaders], sortOrder);

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
          <Checkbox.Group className="flex flex-col space-y-1" value={selectedTopicIds} onChange={handleTopicChange}>
            {topics.map((topic) => (
              <Checkbox key={topic.id} value={topic.id}>
                {topic.name}
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Price</h3>
          <div className="flex space-x-2 items-center mb-4">
            <Input value={`From: $${priceRange[0]}`} disabled className="w-1/2 p-2 bg-[#dde5db] text-[#7a7a7a] text-center rounded-md border border-gray-300" />
            <Input value={`To: $${priceRange[1]}`} disabled className="w-1/2 p-2 bg-[#dde5db] text-[#7a7a7a] text-center rounded-md border border-gray-300" />
          </div>
          <Slider range min={0} max={900000} step={1} value={priceRange} onChange={handlePriceChange} className="mt-2" />
        </div>

        {/* Apply Button */}
        <Button type="primary" className="w-full mt-6 bg-[#91a089] hover:bg-[#72876e]" onClick={handleFilterApply}>
          Apply
        </Button>
      </div>

      {/* Readers List Section */}
      <div className="flex-1">
        {/* Search and Sort */}
        <div className="flex justify-between items-center mb-6">
          {/* Thanh tìm kiếm */}
          <div className="flex items-center w-2/3">
            <Input
              placeholder="Tarot reader name"
              prefix={<SearchOutlined />}
              className="flex-1 p-2 rounded-lg border border-gray-300 bg-[#dde5db] text-[#7a7a7a]"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button
              type="primary"
              className="ml-2"
              onClick={handleSearch}
              style={{ backgroundColor: '#629584', borderColor: '#629584', color: 'white' }} // Thay đổi màu nền và màu chữ
            >
              Search
            </Button>
          </div>

          {/* Thanh sắp xếp */}
          <Select
            defaultValue="High to low"
            onChange={setSortOrder}
            className="w-1/4 ml-4" // Giảm chiều rộng xuống 1/4
            style={{ marginTop: '8px', fontSize: '12px' }} // Thay đổi marginTop và fontSize
          >
            <Option value="High to low">Price: High to Low</Option>
            <Option value="Low to high">Price: Low to High</Option>
          </Select>
        </div>




        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedReaders.length > 0 ? (
            displayedReaders.map((reader) => (
              <Card
                key={reader.reader.id}
                className="cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-200"
                onClick={() => handleCardClick(reader)}
              >
                <div className="flex flex-col">
                  {/* Hình ảnh chiếm nửa trên của card */}
                  {reader.url ? (
                    <img
                      src={reader.url}
                      alt={reader.reader.name}
                      className="w-full h-32 object-cover rounded-t" // Hình chữ nhật nằm ngang
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-300 rounded-t flex items-center justify-center">
                      <span className="text-gray-600">No Image</span>
                    </div>
                  )}

                  <div className="p-4 flex flex-col items-start">
                    <Card.Meta
                      title={<span className="text-lg font-semibold">{reader.reader.name}</span>}
                      description={<span className="text-md text-gray-700">Price: ${reader.reader.price}</span>}
                    />
                    <div className="mt-2 flex items-center">
                      <Rate allowHalf value={reader.reader.rating} disabled />
                      <p className="text-sm text-gray-500 ml-2">{reader.countBooking} Reviews</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="flex items-center justify-center col-span-1 md:col-span-2 lg:col-span-3">
              <p className="text-lg text-gray-500">There are currently no Tarot Readers that match your request.</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between items-center">
          {totalPage > 0 && (
            <div className="text-left">
              <p>Page 1 of {totalPage}</p>
            </div>
          )}
          {totalReader > 0 && (
            <div className="text-right">
              <p>All {totalReader} readers</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ListReaders;
