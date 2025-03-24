import React, { useEffect, useState } from "react";

import ReadersList from "../../components/List-Reader/ReadersList";

import { fetchTopicsList } from "../../services/topicServices";
import { fetchReadersList } from "../../services/tarotReaderServices";
import FilterSection from "../../components/List-Reader/FilterSection";
import CustomButton from "../../components/CustomButton";

const ListTarotReader: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 900000]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [topics, setTopics] = useState<{ id: string; name: string }[]>([]);
  const [readers, setReaders] = useState([]);
  const [totalReader, setTotalReader] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTopics = () => {
    setLoading(true);
    fetchTopicsList()
      .then((data) => setTopics(data))
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchReaders = () => {
    setLoading(true);
    const minPrice = priceRange[0];
    const maxPrice = priceRange[1];
    fetchReadersList(keyword, minPrice, maxPrice, selectedTopicIds)
      .then((data) => {
        setReaders(data.readers || []);
        setTotalReader(data.totalItems || 0);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchTopics();
    fetchReaders();
  }, []);
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
        <CustomButton
          text="Search"
          onClick={handleSearch}
          className="bg-[#629584] hover:opacity-90"
        />
      </div>

      <div className="flex space-x-6">
        <FilterSection
          selectedTopicIds={selectedTopicIds}
          priceRange={priceRange}
          topics={topics}
          loading={loading}
          onTopicChange={setSelectedTopicIds}
          onPriceChange={setPriceRange}
          onReset={() => {
            setSelectedTopicIds([]);
            setPriceRange([0, 900000]);
          }}
          onApply={handleApply}
        />
        <ReadersList readers={readers} loading={loading} />
      </div>
      <div className="flex justify-end items-center mb-6 space-x-4">
        Total Readers: <span className="font-bold">{totalReader}</span>
      </div>
    </div>
  );
};

export default ListTarotReader;
