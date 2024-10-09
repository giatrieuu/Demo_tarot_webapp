import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import "antd/dist/reset.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1E213A] min-h-screen">
      {/* Header Section */}
      <header className="text-center py-16 bg-[#1E213A]">
        <h1 className="text-4xl font-bold text-[#FFD700]">
          Giải Mã Cuộc Sống Với Tarot
        </h1>
        <h2 className="text-2xl text-[#FFFAF0] mt-4">
          Bói bài Tarot online miễn phí và chính xác nhất - BoiTarot.vn
        </h2>
        <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
          Tarot là phương pháp sử dụng những lá bài Tarot để xem bói và dự đoán
          về tương lai, tình yêu, công việc, tiền tài và sức khỏe...
        </p>
        <Button
          type="primary"
          size="large"
          className="bg-[#FFD700] text-[#1E213A] hover:bg-[#FFC107] mt-8"
          onClick={() => navigate("/booking")}
        >
          Bói Tarot Online
        </Button>
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

      {/* Services Section */}
      <section className="py-20 bg-[#282C44]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
          {/* Tarot Service Cards */}
          {[
            {
              title: "Phát Triển Bản Thân",
              desc: "Khám phá và hiểu rõ điểm mạnh...",
              icon: "/icons/self.png",
            },
            {
              title: "Giải Quyết Thắc Mắc",
              desc: "Giải đáp những thắc mắc, phân tích...",
              icon: "/icons/questions.png",
            },
            {
              title: "Nâng Cao Trực Giác",
              desc: "Tăng cường khả năng sáng tạo...",
              icon: "/icons/intuition.png",
            },
            {
              title: "Cân Bằng Cảm Xúc",
              desc: "Đưa ra lời khuyên hỗ trợ thư giãn...",
              icon: "/icons/balance.png",
            },
          ].map((service, index) => (
            <Card
              key={index}
              hoverable
              className="bg-[#393E59] text-white p-6 shadow-lg rounded-lg transform hover:scale-105 transition-transform"
            >
              <img
                src={service.icon}
                alt={service.title}
                className="w-16 mx-auto"
              />
              <h3 className="text-xl font-semibold mt-4">{service.title}</h3>
              <p className="mt-4 text-gray-400">{service.desc}</p>
            </Card>
          ))}
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
