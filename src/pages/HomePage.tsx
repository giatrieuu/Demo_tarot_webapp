import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen">
      {/* Section 1 */}
      <section
        className="relative flex items-center justify-between px-16 py-20 h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('src/assets/home3.jpg')" }} // Replace with the actual image path
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

        {/* Left Content Section */}
        <div className="relative z-10 flex-1 pr-12">
          <h1 className="text-6xl font-bold text-white leading-tight">
            Unlock the Mysteries <br />
            <span className="font-light">One Card at a Time</span>
          </h1>
          <p className="mt-6 text-xl text-white">
            Gain clarity, find your path, and explore the depths of your destiny
            with our expert readings.
          </p>
          <button
            onClick={() => navigate("/card-draw")}
            className="bg-white text-[#4a044e] font-bold px-8 py-4 mt-10 text-lg rounded-md">
            Free Tarot Reading
          </button>
        </div>
      </section>
    </div>

  );
};

export default HomePage;