
import { useNavigate } from "react-router-dom";
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
          <button
            onClick={() => navigate("/card-draw")}
            className="bg-[#CBDAD5] hover:bg-[#B5C8C3] text-black px-8 py-4 mt-10 text-lg rounded-md">
            Free Tarot Reading
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

      {/* Rest of your content */}
      {/* You can add the feature section, about section, etc. below */}
    </div>
  );
};

export default HomePage;