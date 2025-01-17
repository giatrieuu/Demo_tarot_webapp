
import BannerSection from "../components/homepage/BannerSection";
import BlogSection from "../components/homepage/BlogSection";
import TarotReaderSection from "../components/homepage/TarotReaderSection";
import TeamSection from "../components/homepage/TeamSection";

const HomePage = () => {


  return (
    <div className="bg-white min-h-screen">
      {/* Section 1 */}
      <BannerSection />
      <TarotReaderSection/>
      <BlogSection/>
      <TeamSection />
    </div>
  );
};

export default HomePage;
