import React, { useEffect } from "react";
import { toast } from "react-toastify";
import ApiService from "../services/axios"; // Assuming ApiService is correctly implemented
import { Player } from "@lottiefiles/react-lottie-player";

const HomePage = () => {

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Call the API to fetch the token
        const response = await ApiService.getToken();
        const token = response.token?.result;  // Assuming the token is under `token.result`

        if (token) {
          // Store the token in localStorage
          localStorage.setItem("authToken", token);
          toast.success("Token retrieved successfully!");

          // Optionally: you could use the token here for further actions
          // or store it globally in a state management system if needed.
        }
      } catch (error) {
        console.error("Error fetching token", error);
        toast.error("Failed to retrieve token. Please try again.");
      }
    };

    // Fetch the token when the homepage loads
    fetchToken();
  }, []); // Empty dependency array ensures this runs once when component mounts


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
