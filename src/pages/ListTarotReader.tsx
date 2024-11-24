import React, { useEffect, useState } from 'react';
import FilterSection from '../components/List-Reader/FilterSection';
import ReadersList from '../components/List-Reader/ReadersList';

const ListTarotReader: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 900000]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [topics, setTopics] = useState<{ id: string; name: string }[]>([]);
  const [readers, setReaders] = useState([]);
  const [totalReader, setTotalReader] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopics();
    fetchReaders();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await fetch('https://www.bookingtarot.somee.com/api/TopicWeb/topics-list');
      const data = await response.json();
      setTopics(data);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const fetchReaders = async () => {
    setLoading(true);
    try {
      const minPrice = priceRange[0];
      const maxPrice = priceRange[1];
      const topicIds = selectedTopicIds.map((id) => `topicIds=${id}`).join('&');

      const apiUrl = `https://www.bookingtarot.somee.com/api/ReaderWeb/GetPagedReadersInfo?readerName=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}${topicIds ? `&${topicIds}` : ''}`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      setReaders(data.readers || []);
      setTotalReader(data.totalItems || 0);
    } catch (error) {
      console.error('Error fetching readers:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = () => {
    fetchReaders();
  };

  const handleApply = () => {
    fetchReaders();
  };

  return (
    <div className="min-h-screen bg-[#edf3e8] flex flex-col p-6 space-y-6">
      <div className="flex justify-end items-center mb-2 space-x-2">
        <input
          type="text"
          placeholder="Search reader by name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="p-2 border border-gray-100 rounded-lg w-1/2 max-w-md" // Giới hạn chiều rộng
        />
        <button
          onClick={handleSearch}
          style={{
            backgroundColor: '#629584',
            borderColor: '#629584',
            color: 'white',
          }}
          className="px-4 py-2 rounded-lg hover:opacity-90"
        >
          Search
        </button>
      </div>


      <div className="flex space-x-6">
        <FilterSection
          selectedTopicIds={selectedTopicIds}
          priceRange={priceRange}
          topics={topics}
          onTopicChange={setSelectedTopicIds}
          onPriceChange={setPriceRange}
          onReset={() => {
            setSelectedTopicIds([]);
            setPriceRange([0, 900000]);
          }}
          onApply={handleApply}
        />
        <ReadersList readers={readers} loading={loading} onCardClick={(id) => console.log('Card clicked:', id)} />

      </div>
      <div className="flex justify-end items-center mb-6 space-x-4">
        Total Readers: <span className="font-bold">{totalReader}</span>
      </div>
    </div>

  );
};

export default ListTarotReader;
