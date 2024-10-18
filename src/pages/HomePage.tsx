import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import { Player } from "@lottiefiles/react-lottie-player";
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1E213A] min-h-screen">
      {/* Header Section */}
      <header className="relative flex items-center justify-between px-16 py-20 bg-[#E9F4F2]">
        {/* Left Content Section */}
        <div className="flex-1 pr-12">
          <h1 className="text-6xl font-bold text-black leading-tight">
            Unlock the Mysteries <br />
            <span className="font-light">One Card at a Time</span>
          </h1>
          <p className="mt-6 text-xl text-gray-700">
            Gain clarity, find your path, and explore the depths of your destiny
            with our expert readings.
          </p>
          <button className="bg-[#CBDAD5] hover:bg-[#B5C8C3] text-black px-8 py-4 mt-10 text-lg rounded-md">
            You want to try?
          </button>
        </div>

        {/* Right Animation Section */}
        <div className="flex-1 flex justify-end">
          <Player
            autoplay
            loop
            src="/zodiac-animation.json" // Make sure the path is correct
            style={{ height: "450px", width: "450px" }} // Increased size
          />
        </div>
      </header>
      {/* Feature Section */}
      <section className="py-20 bg-[#282C44]">
        <h2 className="text-3xl font-semibold text-center text-[#FFD700] mb-12">
          Tính Năng Nổi Bật
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {/* Tarot Feature Cards */}
          {[
            {
              title: "Bói Bài Tarot",
              desc: "Mở khóa những hiểu biết sâu sắc về cuộc sống...",
              link: "/tarot-online",
            },
            {
              title: "Trải Bài Tarot 1:1",
              desc: "Nhận những lời khuyên cá nhân từ chuyên gia...",
              link: "/tarot-1-1",
            },
            {
              title: "Bói Bài Hàng Ngày",
              desc: "Mỗi ngày, hãy khám phá vận mệnh và định hướng của bạn...",
              link: "/daily-tarot",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              hoverable
              className="bg-[#393E59] text-white p-6 shadow-lg rounded-lg transform hover:scale-105 transition-transform"
              onClick={() => navigate(feature.link)}
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-4 text-gray-400">{feature.desc}</p>
              <Button type="link" className="mt-4 text-[#FFD700]">
                {feature.title.includes("1:1")
                  ? "Bói bài với chuyên gia"
                  : "Bói bài online"}
              </Button>
            </Card>
          ))}
        </div>
      </section>
      {/* About Section */}
      <section className="py-10 bg-[#1E213A] text-white flex justify-center items-center">
        {/* Container */}
        <div className="flex max-w-6xl mx-auto items-center px-4 lg:flex-row flex-col lg:space-x-12 space-y-8 lg:space-y-0">
          {/* Image Section - Left Side */}
          <div className="flex-shrink-0 lg:w-1/3 w-full flex justify-center lg:justify-start">
            <img
              src="src/assets/fool.jpg"
              alt="Tarot Hand"
              className="w-72 h-auto shadow-lg rounded-lg animate-float" // Apply animation class here
            />
          </div>

          {/* Text Section - Right Side */}
          <div className="lg:w-2/3 w-full text-left lg:pl-8">
            {" "}
            {/* Thêm class "lg:pl-8" để đẩy phần text sang phải */}
            <h2 className="text-3xl font-semibold text-[#FFD700] mb-4">
              Giới Thiệu
            </h2>
            <p className="text-md leading-relaxed text-gray-300">
              Tarot là một công cụ mạnh mẽ để chuyển hóa, cung cấp cho chúng ta
              cái nhìn sâu sắc về cuộc sống và giúp chúng ta hiểu rõ hơn về bản
              thân cũng như những vấn đề xung quanh. Thông qua việc đọc các lá
              bài, chúng ta có thể tìm thấy sự hướng dẫn, truyền cảm hứng và lời
              khuyên quý giá để đưa ra những quyết định đúng đắn, giúp vượt qua
              những thách thức và đạt được mục tiêu mà bản thân đề ra.
            </p>
            <p className="text-md leading-relaxed text-gray-300 mt-4">
              Tarot không chỉ là một công cụ tiên tri, mà còn là một phương tiện
              để khám phá bản thân, phát triển trí tuệ và tâm linh. Nó giúp
              chúng ta tìm ra những mẫu số chung trong cuộc sống, từ đó đưa ra
              những giải pháp sáng tạo và hiệu quả hơn. Với sự kết hợp giữa trực
              giác và lý trí, Tarot trở thành một công cụ vô cùng hữu ích trong
              cuộc hành trình tự khám phá và thực hiện những mục tiêu của mình.
            </p>
            <Button
              type="primary"
              size="middle" // Sửa "medium" thành "middle"
              className="bg-[#FFD700] text-[#1E213A] hover:bg-[#FFC107] mt-6"
              onClick={() => navigate("/about")}
            >
              Bói Tarot Online
            </Button>
          </div>
        </div>
      </section>
      {/* Tarot Reader Highlight Section */}
      <section className="flex items-center justify-between px-16 py-20 bg-[#E9F4F2]">
        {/* Left Content Section */}
        <div className="flex-1 pr-12">
          <h1 className="text-4xl font-bold text-black leading-tight">
            Who will be the one to uncover <br />
            the mysteries of the cards?
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-lg">
            Tarot Reader sections provide insight and guidance on the journey of
            self-discovery, helping clients better understand their current
            situation, identify opportunities and challenges, and seek paths to
            spiritual healing through cards filled with mystery and meaning.
          </p>
          <button className="bg-[#CBDAD5] hover:bg-[#B5C8C3] text-black px-8 py-3 mt-8 rounded-md text-lg">
            Book now
          </button>
        </div>

        {/* Right Content Section - Reader Profile Card */}
        <div className="flex-1 flex flex-col items-center">
          {/* Navigation Arrows */}
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-white rounded-full shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Reader Image */}
            <div className="flex flex-col items-center">
              <img
                src="/reader-image.jpg" // Replace with your reader image path
                alt="Tarot Reader"
                className="rounded-lg w-48 h-48 object-cover"
              />
              <p className="mt-4 font-semibold">Reader: Shyneat Showka</p>
              <p className="text-gray-500">300 reviews</p>
            </div>

            <button className="p-2 bg-white rounded-full shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex space-x-2 mt-4">
            <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
            <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
          </div>
        </div>
      </section>

      {/* Tarot Themes Section */}
      <section className="py-20 bg-[#1E213A] text-center text-white relative">
        <h2 className="text-3xl font-semibold text-[#FFD700]">
          Chủ đề bói Tarot trên nền tảng Boitarot.vn
        </h2>

        {/* Container for topics and tarot image */}
        <div className="relative max-w-7xl mx-auto mt-12">
          {/* Left and Right Columns with Central Tarot Image */}
          <div className="flex justify-between items-start gap-16">
            {/* Left Column Topics */}
            <div className="w-1/3 space-y-8 text-left relative z-10">
              {[
                {
                  title: "Sức Khỏe",
                  description:
                    "Tổng quan về tình hình sức khỏe của tôi trong tháng này? Có những năng lượng tiêu cực nào sức khỏe đang đến với tôi không?",
                },
                {
                  title: "Giải Quyết Xung Đột",
                  description:
                    "Tôi đang gặp phải xung đột nào trong cuộc sống hiện tại? Đó là xung đột với người thân, đồng nghiệp hay chính bản thân tôi?",
                },
                {
                  title: "Định Hướng Công Việc",
                  description:
                    "Tôi thích hợp làm nghề gì? Tình trạng công việc tháng này có ổn không? Những biến động nào về công việc đang xảy ra?",
                },
                {
                  title: "Người Yêu Hiện Tại",
                  description:
                    "Mối quan hệ hiện tại của tôi với người yêu đang diễn ra như thế nào? Người yêu của tôi có những cảm xúc và ý định gì về mối quan hệ này?",
                },
              ].map((topic, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <img
                    src="public/Tarot.png"
                    alt="Topic Icon"
                    className="w-8 h-8"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-[#FFD700]">
                      {topic.title}
                    </h3>
                    <p className="text-gray-300 mt-2">{topic.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tarot Card Image at Center */}
            <div className="flex justify-center items-center relative z-0">
              <img
                src="src/assets/fool.jpg"
                alt="Tarot Card"
                className="w-72 h-auto shadow-lg rounded-lg animate-float" // Apply animation class here
              />
            </div>

            {/* Right Column Topics */}
            <div className="w-1/3 space-y-8 text-left relative z-10">
              {[
                {
                  title: "Crush",
                  description:
                    "Liệu tôi có cơ hội được crush của mình đáp lại tình cảm không? Nên làm gì để tiến triển mối quan hệ này? Những điều gì sẽ xảy ra nếu tôi...",
                },
                {
                  title: "Người Yêu Cũ",
                  description:
                    "Vì sao mối quan hệ trước đây của tôi lại kết thúc? Tôi nên làm gì để đóng lại quá khứ và hướng tới tương lai? Liệu tôi và người yêu cũ có cơ hội...",
                },
                {
                  title: "Định Hướng Bản Thân",
                  description:
                    "Tôi nên tập trung vào những mục tiêu và ưu tiên nào trong thời gian tới? Những thách thức nào sắp đến với tôi và làm thế nào để vượt qua?",
                },
                {
                  title: "Mối Quan Hệ Mập Mờ",
                  description:
                    "Mối quan hệ này sẽ đi về đâu? Tôi nên làm gì để làm rõ tình hình và định hướng mối quan hệ? Những rủi ro và cơ hội nào đang chờ...",
                },
              ].map((topic, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <img
                    src="public/Tarot.png"
                    alt="Topic Icon"
                    className="w-8 h-8"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-[#FFD700]">
                      {topic.title}
                    </h3>
                    <p className="text-gray-300 mt-2">{topic.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
