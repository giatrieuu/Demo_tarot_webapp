import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Loader from '../loader/Loader'; // Import the Loader component

interface Reader {
  reader: {
    id: string;
    name: string;
  };
  countBooking: number | null;
  url: string | null;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [readers, setReaders] = useState<Reader[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalReaders, setTotalReaders] = useState<number>(0); // State to hold total readers count


  useEffect(() => {
    const fetchReaders = async () => {
      try {
        const response = await fetch('https://www.bookingtarot.somee.com/api/ReaderWeb/GetPagedReadersInfo');
        if (!response.ok) throw new Error('Failed to fetch readers');
        const data = await response.json();
        setReaders(data.readers || []);
        setTotalReaders(data.readers.length); // Set total readers count

      } catch (error) {
        console.error('Error fetching readers:', error);
        message.error('Could not load readers at the moment.');
      } finally {
        setLoading(false);
      }
    };

    fetchReaders();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % readers.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + readers.length) % readers.length);
  };

  const currentReader = readers[currentIndex];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader /> {/* Loader will appear centered */}
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Section 1 */}
      <section
        className="relative flex items-center justify-between px-16 py-20 h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('src/assets/home3.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="relative z-10 flex-1 pr-12">
          <h1 className="text-6xl font-bold text-white leading-tight">
            Unlock the Mysteries <br />
            <span className="font-light">One Card at a Time</span>
          </h1>
          <p className="mt-6 text-xl text-white">
            Gain clarity, find your path, and explore the depths of your destiny with our expert readings.
          </p>
          <Button
            onClick={() => navigate("/card-draw")}
            className="bg-white text-[#4a044e] font-bold px-8 py-4 mt-10 text-lg rounded-md"
          >
            Free Tarot Reading
          </Button>
        </div>
      </section>

      {/* Reader Carousel Section */}
      <section className="py-20 px-16 bg-[#e9f2ef] flex justify-center items-center">
        <div className="w-full md:w-3/4 flex flex-col md:flex-row items-center justify-between">
          {readers.length > 0 && currentReader && (
            <>
              {/* Reader Avatar and Info on the Left */}
              <div className="flex items-center">
                <button onClick={handlePrev} className="p-2">
                  <LeftOutlined style={{ fontSize: "24px" }} />
                </button>
                <div className="mx-4 md:mx-10 text-center">
                  <img
                    src={currentReader.url || "https://via.placeholder.com/150"}
                    alt={currentReader.reader.name}
                    className="w-48 h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {currentReader.reader.name}
                  </h3>
                  <p className="text-gray-500">
                    {currentReader.countBooking} reviews
                  </p>
                </div>
                <button onClick={handleNext} className="p-2">
                  <RightOutlined style={{ fontSize: "24px" }} />
                </button>
              </div>

              {/* Text and Book Now Button on the Right (Hidden on Mobile) */}
              <div className="hidden md:block text-left pl-16 max-w-md">
                <h2 className="text-4xl font-bold text-[#333333] mb-6">
                  Who will be the one to uncover the mysteries of the cards?
                </h2>
                <p className="text-gray-600 mb-8">
                  Tarot Reader sections provide insight and guidance on the
                  journey of self-discovery, helping clients better understand
                  their current situation, identify opportunities and challenges,
                  and seek paths to spiritual healing through cards filled with
                  mystery and meaning.
                </p>
                <Button
                  className="bg-[#8fd0ba] text-white font-bold px-8 py-4 rounded-md"
                  onClick={() => navigate(`/reader-detail/${currentReader.reader.id}`)}
                >
                  Book now
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-[#CCF4D9] py-20 px-16 text-center">
        <div className="flex justify-around items-center">
          <div className="flex flex-col items-center">
            <img src="src\assets\Reader-icon.svg" alt="Total Readers Icon" className="w-16 h-16 mb-4" />
            <h2 className="text-5xl font-bold text-[#4a044e]">{totalReaders}</h2>
            <p className="text-lg text-gray-600">Total readers</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="src\assets\Users-icon.svg" alt="Number of Users Icon" className="w-16 h-16 mb-4" />
            <h2 className="text-5xl font-bold text-[#4a044e]">100+</h2>
            <p className="text-lg text-gray-600">Number of users</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="src\assets\Task-icon.svg" alt="Fortune Tellings Icon" className="w-16 h-16 mb-4" />
            <h2 className="text-5xl font-bold text-[#4a044e]">300+</h2>
            <p className="text-lg text-gray-600">Number of fortune tellings performed</p>
          </div>
        </div>
      </section>


      {/* About Us Section */}
      <section className="bg-[#edf3e8] py-20 px-16 text-center">
        <h2 className="text-4xl font-bold text-[#4a044e] mb-10">About Us</h2>
        <div className="flex justify-center items-center">
          {/* Team Member */}
          <div className="w-1/6 p-4">
            <img src="https://via.placeholder.com/100" alt="Team member" className="w-full h-auto rounded-lg mb-2" />
            <h3 className="text-lg font-semibold text-gray-800">Yến Thảo</h3>
            <p className="text-gray-500">FE Dev</p>
          </div>
          <div className="w-1/6 p-4">
            <img src="https://via.placeholder.com/100" alt="Team member" className="w-full h-auto rounded-lg mb-2" />
            <h3 className="text-lg font-semibold text-gray-800">Gia Triệu</h3>
            <p className="text-gray-500">FE Dev</p>
          </div>
          <div className="w-1/6 p-4">
            <img src="https://via.placeholder.com/100" alt="Team member" className="w-full h-auto rounded-lg mb-2" />
            <h3 className="text-lg font-semibold text-gray-800">Quang Huy</h3>
            <p className="text-gray-500">FE Dev - Leader</p>
          </div>
          <div className="w-1/6 p-4">
            <img src="https://via.placeholder.com/100" alt="Team member" className="w-full h-auto rounded-lg mb-2" />
            <h3 className="text-lg font-semibold text-gray-800">Gia Phong</h3>
            <p className="text-gray-500">BE Dev</p>
          </div>
          <div className="w-1/6 p-4">
            <img src="https://via.placeholder.com/100" alt="Team member" className="w-full h-auto rounded-lg mb-2" />
            <h3 className="text-lg font-semibold text-gray-800">Hoàng Anh</h3>
            <p className="text-gray-500">MB Dev</p>
          </div>
          <div className="w-1/6 p-4">
            <img src="https://via.placeholder.com/100" alt="Team member" className="w-full h-auto rounded-lg mb-2" />
            <h3 className="text-lg font-semibold text-gray-800">Kiến Hòa</h3>
            <p className="text-gray-500">Designer</p>
          </div>
        </div>
      </section>



    </div>
  );
};

export default HomePage;
