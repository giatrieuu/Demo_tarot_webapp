import { useEffect, useState } from 'react';
import { message } from 'antd';
import Loader from '../loader/Loader';
import ApiService from '../services/axios';
import TarotReaderSection from '../components/Homepage/TarotReaderSection';
import BannerSection from '../components/Homepage/BannerSection';
import BlogSection from '../components/Homepage/BlogSection';
import TeamSection from '../components/Homepage/TeamSection';


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
  const [readers, setReaders] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
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


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await ApiService.getPosts();
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


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Section 1 */}
      <BannerSection />

      {/* Section 2 */}
      <TarotReaderSection readers={readers} />

      {/* Section 3 */}
      <BlogSection
        blogs={blogs}
        currentBlogGroupIndex={currentBlogGroupIndex}
        handlePrevBlogGroup={handlePrevBlogGroup}
        handleNextBlogGroup={handleNextBlogGroup}
      />

      {/* Section 4 */}
      <TeamSection />

    </div>
  );
};

export default HomePage;
