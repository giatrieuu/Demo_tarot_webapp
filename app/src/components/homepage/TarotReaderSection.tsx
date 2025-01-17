import React, { useEffect, useState } from "react";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";
import { getPagedReadersInfo } from "../../services/tarotReaderServices"; // Import hàm gọi API

interface TarotReader {
  reader: {
    id: string;
    name: string;
    rating: number;
    price: number;
  };
  countBooking: number | null;
  url: string | null;
}

const TarotReaderSection: React.FC = () => {
  const [readers, setReaders] = useState<TarotReader[]>([]); // State lưu danh sách readers
  const [loading, setLoading] = useState(true); // State lưu trạng thái loading
  const navigate = useNavigate();
  useEffect(() => {
    getPagedReadersInfo()
      .then((data) => {
        setReaders(Array.isArray(data.readers) ? data.readers : []); 
      })
      .finally(() => setLoading(false));
  }, []);
  
  return (
    <section className="py-20 px-16 bg-white">
      <h2 className="text-4xl font-serif text-center mb-8">
        Featured Tarot Reader
      </h2>
      <div className="relative flex justify-center mb-12">
        <span className="block w-[8%] h-1 bg-purple-800"></span>
        <span className="block w-[8%] h-1 bg-gray-300"></span>
        <span className="block w-[8%] h-1 bg-gray-300"></span>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading readers...</p>
      ) : readers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {readers.map((reader) => (
            <div
              key={reader.reader.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between p-8 h-[380px] w-80 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={reader.url || "https://via.placeholder.com/150"}
                alt={reader.reader.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-lg font-bold text-center mb-2">
                {reader.reader.name}
              </h3>
              <div className="flex items-center justify-center mb-4">
                <Rate allowHalf value={reader.reader.rating} disabled />
                <p className="text-sm text-gray-500 ml-2">
                  {reader.countBooking || 0} Reviews
                </p>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <p className="text-[#382C59] font-medium">
                  <span className="text-green-500 font-bold text-xl">
                    ${reader.reader.price}
                  </span>
                </p>
                <button
                  className="custom-button px-4 py-2 rounded-md hover:bg-[#6C4CB3] transition"
                  onClick={() => navigate(`/reader-detail/${reader.reader.id}`)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No readers found.</p>
      )}
    </section>
  );
};
export default TarotReaderSection;
