// import React, { useState } from 'react';
// import { Card, Input, Button } from 'antd';

// const { Search } = Input;

// // Dữ liệu giả lập cho các bài viết blog
// const blogData = [
//   {
//     title: 'The Fool - Kẻ Khờ',
//     author: 'Glucozo',
//     date: '06/10/2024',
//     excerpt: 'The Fool là lá bài đầu tiên trong bộ Ẩn Chính (Major Arcana) và thường được xem là biểu tượng của sự khởi đầu, tiềm năng vô hạn, và một cuộc hành trình mới mẻ...',
//     image: 'https://www.sacred-texts.com/tarot/pkt/img/ar00.jpg', // Thay đường dẫn ảnh của bạn
//   },
//   {
//     title: 'The Fool - Kẻ Khờ',
//     author: 'Glucozo',
//     date: '06/10/2024',
//     excerpt: 'The Fool là lá bài đầu tiên trong bộ Ẩn Chính (Major Arcana) và thường được xem là biểu tượng của sự khởi đầu, tiềm năng vô hạn, và một cuộc hành trình mới mẻ...',
//     image: 'https://www.sacred-texts.com/tarot/pkt/img/ar00.jpg',
//   },
//   {
//     title: 'The Fool - Kẻ Khờ',
//     author: 'Glucozo',
//     date: '06/10/2024',
//     excerpt: 'The Fool là lá bài đầu tiên trong bộ Ẩn Chính (Major Arcana) và thường được xem là biểu tượng của sự khởi đầu, tiềm năng vô hạn, và một cuộc hành trình mới mẻ...',
//     image: 'https://www.sacred-texts.com/tarot/pkt/img/ar00.jpg',
//   },
// ];

// const featuredBlog = {
//   title: 'What is Tarot: History and Future',
//   content: `Tarot is a form of divination that uses a deck of 78 cards to provide insight, guidance, and reflection on various aspects of life, such as relationships, career, and personal growth. Each card in a Tarot deck has its own symbolism and meaning, and through interpreting the cards, a reader helps clients gain clarity on their questions or challenges...`,
//   date: '06/10/2024',
//   author: 'Glucozo',
//   image: 'https://images.pexels.com/photos/1612886/pexels-photo-1612886.jpeg', // Thay đường dẫn ảnh của bạn
// };

// const BlogPage: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (value: string) => {
//     setSearchTerm(value);
//   };

//   return (
//     <div className="min-h-screen bg-[#edf3e8] p-8 md:p-12">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row items-center justify-between mb-8">
//         <Search
//           placeholder="Keyword"
//           onSearch={handleSearch}
//           className="rounded-lg w-full md:w-1/3 mb-4 md:mb-0"
//         />
//         <div className="flex flex-wrap gap-4">
//           <Button className="bg-[#72876e] text-white rounded-md px-6 hover:bg-[#91a089]">About the cards</Button>
//           <Button className="bg-[#72876e] text-white rounded-md px-6 hover:bg-[#91a089]">Introduce about Tarot</Button>
//           <Button className="bg-[#72876e] text-white rounded-md px-6 hover:bg-[#91a089]">About the topics</Button>
//           <Button className="bg-[#72876e] text-white rounded-md px-6 hover:bg-[#91a089]">Astrology and Tarot</Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Sidebar with Small Blog Cards */}
//         <div className="hidden md:block col-span-1">
//           {blogData.map((blog, index) => (
//             <Card
//               key={index}
//               hoverable
//               className="mb-4 rounded-lg overflow-hidden bg-[#d9e6dc]"
//               cover={<img src={blog.image} alt={blog.title} className="h-40 object-cover" />}
//             >
//               <div className="p-4">
//                 <h3 className="font-bold text-lg text-[#4a4a4a]">{blog.title}</h3>
//                 <p className="text-xs text-[#7a7a7a] mb-2">{blog.date} - {blog.author}</p>
//                 <p className="text-sm text-[#4a4a4a]">{blog.excerpt}</p>
//               </div>
//             </Card>
//           ))}
//         </div>

//         {/* Featured Blog Content */}
//         <div className="col-span-2 bg-[#d9e6dc] rounded-lg shadow-lg overflow-hidden">
//           <img src={featuredBlog.image} alt={featuredBlog.title} className="w-full h-64 object-cover" />
//           <div className="p-6">
//             <h2 className="text-2xl font-bold text-[#4a4a4a] mb-4">{featuredBlog.title}</h2>
//             <p className="text-sm text-[#4a4a4a] mb-6">{featuredBlog.content}</p>
//             <p className="text-sm text-[#72876e] font-medium">{featuredBlog.date} - {featuredBlog.author}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPage;

import React from 'react';
import { Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

// Dữ liệu giả lập cho Blog
const blogData = [
  {
    id: 1,
    title: 'The Fool - Kẻ Khờ',
    description:
      'The Fool là lá bài đầu tiên trong bộ Ẩn Chính (Major Arcana) và thường được xem là biểu tượng của sự khởi đầu, tiềm năng vô hạn, và một cuộc hành trình mới mẻ...',
    date: '06/10/2024',
    author: 'Glucozo',
    image: 'src/assets/fool.jpg',
  },
  {
    id: 2,
    title: 'The Fool - Kẻ Khờ',
    description:
      'The Fool là lá bài đầu tiên trong bộ Ẩn Chính (Major Arcana) và thường được xem là biểu tượng của sự khởi đầu, tiềm năng vô hạn, và một cuộc hành trình mới mẻ...',
    date: '06/10/2024',
    author: 'Glucozo',
    image: 'https://example.com/image2.jpg',
  },
  {
    id: 3,
    title: 'The Fool - Kẻ Khờ',
    description:
      'The Fool là lá bài đầu tiên trong bộ Ẩn Chính (Major Arcana) và thường được xem là biểu tượng của sự khởi đầu, tiềm năng vô hạn, và một cuộc hành trình mới mẻ...',
    date: '06/10/2024',
    author: 'Glucozo',
    image: 'https://example.com/image3.jpg',
  },
];

const mainBlog = {
  id: 4,
  title: 'What is Tarot: History and Future',
  content:
    'Tarot is a form of divination that uses a deck of 78 cards to provide insight, guidance, and reflection on various aspects of life, such as relationships, career, and personal growth. Each card in a Tarot deck has its own symbolism and meaning, and through interpreting these cards, a reader helps clients gain clarity on their questions or challenges. Tarot readings can be a tool for self-discovery, decision-making, or spiritual insight, and they are often tailored to individual needs and situations...',
  date: '06/10/2024',
  author: 'Glucozo',
  image: 'https://example.com/image-main.jpg',
};

const BlogPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 md:p-12 bg-[#edf3e8]">
      <div className="container mx-auto">
        {/* Bố cục chia làm 2 cột */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar bên trái: Danh sách bài viết nhỏ */}
          <div className="w-full md:w-1/4 flex flex-col gap-4">
            {blogData.map((blog) => (
              <Card
                key={blog.id}
                hoverable
                className="rounded-lg overflow-hidden bg-[#d9e6dc] shadow-md flex flex-row items-center" // Điều chỉnh bố cục thẻ
                onClick={() => navigate(`/blog/${blog.id}`)} // Điều hướng đến trang chi tiết bài viết
              >
                <div className="w-1/3 h-32 overflow-hidden">
                  <img alt={blog.title} src={blog.image} className="object-cover h-full w-full" />
                </div>
                <div className="w-2/3 p-4">
                  <Title level={5} className="text-[#4a4a4a] mb-1">
                    {blog.title}
                  </Title>
                  <Paragraph ellipsis={{ rows: 3 }} className="text-[#4a4a4a] mb-2">
                    {blog.description}
                  </Paragraph>
                  <Paragraph className="text-sm text-[#72876e] mb-0">
                    {blog.date} - {blog.author}
                  </Paragraph>
                </div>
              </Card>
            ))}
          </div>

          {/* Cột bên phải: Nội dung bài viết chính */}
          <div className="w-full md:w-3/4">
            <Card
              hoverable
              className="rounded-lg overflow-hidden bg-[#d9e6dc] shadow-lg"
              cover={<img alt={mainBlog.title} src={mainBlog.image} className="object-cover h-64 w-full" />}
              onClick={() => navigate(`/blog/${mainBlog.id}`)} // Điều hướng đến trang chi tiết bài viết chính
            >
              <Title level={3} className="text-[#4a4a4a] mb-4">
                {mainBlog.title}
              </Title>
              <Paragraph className="text-sm text-[#72876e] mb-2">
                {mainBlog.date} - {mainBlog.author}
              </Paragraph>
              <Paragraph className="text-[#4a4a4a]">{mainBlog.content}</Paragraph>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
