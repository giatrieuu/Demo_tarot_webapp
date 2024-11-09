import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Loader from '../loader/Loader'; // Import the Loader component
import ApiService from '../services/axios';


interface Reader {
  reader: {
    id: string;
    name: string;
  };
  countBooking: number | null;
  url: string | null;
}

interface BlogData {
  post: {
    id: string;
    userId: string;
    text: string;
    createAt: string;
    status: string;
    title: string;
    content: string;
  };
  url: string;
  name: string;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [readers, setReaders] = useState<Reader[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [currentBlogGroupIndex, setCurrentBlogGroupIndex] = useState(0);

  useEffect(() => {
    const fetchReaders = async () => {
      try {
        const response = await fetch('https://www.bookingtarot.somee.com/api/ReaderWeb/GetPagedReadersInfo');
        if (!response.ok) throw new Error('Failed to fetch readers');
        const data = await response.json();
        setReaders(data.readers || []);

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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await ApiService.getPosts(); // Gọi hàm getPosts để lấy dữ liệu
        setBlogs(data.posts);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        message.error("Could not load blogs at the moment.");
      }
    };

    fetchBlogs();
  }, []);

  const handleNextBlogGroup = () => {
    setCurrentBlogGroupIndex((prevIndex) =>
      (prevIndex + 1) * 3 < blogs.length ? prevIndex + 1 : 0
    );
  };

  const handlePrevBlogGroup = () => {
    setCurrentBlogGroupIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : Math.floor((blogs.length - 1) / 3)
    );
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
            className="bg-[#8fd0ba] text-white font-bold px-8 py-4 mt-10 text-lg"
          >
            Free Tarot Reading
          </Button>
        </div>
      </section>

      {/* Section 2 */}
      <section className="py-20 px-16 bg-black flex justify-center items-center">
        <div className="w-full md:w-3/4 flex flex-col md:flex-row items-center justify-between">
          {readers.length > 0 && currentReader && (
            <>
              {/* Reader Avatar and Info on the Left */}
              <div className="flex items-center">
                <button onClick={handlePrev} className="text-white p-2">
                  <LeftOutlined style={{ fontSize: "24px" }} />
                </button>
                <div className="mx-4 md:mx-10 text-center">
                  <img
                    src={currentReader.url || "https://via.placeholder.com/150"}
                    alt={currentReader.reader.name}
                    className="w-64 h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-white">
                    {currentReader.reader.name}
                  </h3>
                  <p className="text-gray-500">
                    {currentReader.countBooking} reviews
                  </p>
                </div>
                <button onClick={handleNext} className="text-white p-2">
                  <RightOutlined style={{ fontSize: "24px" }} />
                </button>
              </div>

              {/* Text and Book Now Button on the Right (Hidden on Mobile) */}
              <div className="hidden md:block text-left pl-16 max-w-md">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Who will be the one to uncover the mysteries of the cards?
                </h2>
                <p className="text-white mb-8">
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

      {/* Section 3 */}
      <section className="bg-black py-20 px-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-10">Latest Blogs</h2>
        {blogs.length > 0 ? (
          <div className="relative">
            <div className="flex justify-between items-center mb-8">
              <button onClick={handlePrevBlogGroup} className="text-white p-2">
                <LeftOutlined style={{ fontSize: '24px' }} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mx-auto">
                {blogs.slice(currentBlogGroupIndex * 3, currentBlogGroupIndex * 3 + 3).map((blog, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full w-80"
                    onClick={() => navigate(`/post-detail/${blog.post.id}`)}
                  >
                    <img
                      src={blog.url || "https://via.placeholder.com/300"}
                      alt={blog.post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-black mb-2">{blog.post.title}</h3>
                        <p className="text-gray-600 mb-2 text-sm">
                          {new Date(blog.post.createAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-gray-800">
                        {blog.post.text.length > 100
                          ? `${blog.post.text.substring(0, 100)}...`
                          : blog.post.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handleNextBlogGroup} className="text-white p-2">
                <RightOutlined style={{ fontSize: '24px' }} />
              </button>
            </div>
          </div>
        ) : (
          <p className="text-white">No blogs available</p>
        )}
      </section>

      {/* Section 4 */}
      <section className="bg-black py-20 px-16 text-center">
        <h2 className="text-4xl font-bold text-white mb-10">About Us</h2>
        <div className="flex justify-center items-center flex-wrap">
          {/* Team Member */}
          {[
            { name: 'Yến Thảo', role: 'FE Dev', image: 'src/assets/Thảo.jpg', facebook: 'https://www.facebook.com/yenthao.phan.7?mibextid=LQQJ4d' },
            { name: 'Gia Triều', role: 'FE Dev', image: 'src/assets/Triều.jpg', facebook: 'https://www.facebook.com/trieu.gia.9469' },
            { name: 'Quang Huy', role: 'FE Dev - Leader', image: 'src/assets/Huy.jpg', facebook: 'https://www.facebook.com/vilad.huy/' },
            { name: 'Gia Phong', role: 'BE Dev', image: 'src/assets/Phong.jpg', facebook: 'https://www.facebook.com/thus.gios.3' },
            { name: 'Hoàng Anh', role: 'MB Dev', image: 'src/assets/Hoàng Anh.jpg', facebook: 'https://www.facebook.com/profile.php?id=100010488452873' },
            { name: 'Kiến Hòa', role: 'Designer', image: 'src/assets/Hòa.jpg', facebook: 'https://www.facebook.com/hoa.dong.31945243' },
          ].map((member, index) => (
            <div key={index} className="w-1/6 p-4">
              <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                <img
                  src={member.image}
                  alt="Team member"
                  className="w-24 h-24 object-cover rounded-lg mb-2"
                  style={{ width: '200px', height: '200px' }}
                />
              </a>
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
};

export default HomePage;
