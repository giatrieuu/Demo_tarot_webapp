import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const ShuffleCard: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            {/* Section 1 */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8 w-full max-w-5xl p-8">
                {/* Left: Text */}
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Congratulations, you have reached the final step!
                    </h2>
                    <p className="text-xl text-gray-600 mt-2">
                        Shuffle the cards then get 3 cards and explore the mysteries with Tarot!
                    </p>
                </div>
                {/* Right: Animation */}
                <div className="flex justify-center">
                    <Player
                        autoplay
                        loop
                        src="public/congratulation.json"
                        className="w-72 h-72 lg:w-96 lg:h-96"
                    />
                </div>
            </section>

            {/* Section 2 */}
            <section className="bg-[#629584] text-white flex flex-col md:flex-row justify-between items-center w-full mb-12 p-8">
                {/* Left: Card Deck, Topic, and Back button */}
                <div className="flex flex-col justify-center items-center space-y-6 w-full md:w-1/3 text-left">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-white">Card deck</h3>
                        <button className="flex items-center justify-center bg-white text-gray-800 shadow-md px-10 py-3 mt-2 rounded-lg border hover:bg-gray-50">
                            <span className="mr-3 text-xl">🃏</span>
                            Rider-Waite Tarot
                        </button>
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-white">Topic</h3>
                        <button className="flex items-center justify-center bg-white text-gray-800 shadow-md px-20 py-3 mt-2 rounded-lg border hover:bg-gray-50">
                            <span className="mr-3 text-xl">❤️</span>
                            Love
                        </button>
                    </div>
                    <button className="bg-white text-gray-800 px-5 py-2 mt-2 rounded-lg shadow-md hover:bg-gray-50">Back</button>
                </div>


                {/* Right: Animation and Text */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center space-y-4">
                    {/* Animation */}
                    <Player
                        autoplay
                        loop
                        src="public/robot.json"
                        className="w-72 h-72 lg:w-96 lg:h-96"
                    />
                    {/* Text */}
                    <p className="text-xl text-white text-left">
                        *This fortune telling is based on data available in the system only, not the results directly performed by any reader. The results are for reference only and should not be considered as absolute advice for important decisions in life.
                    </p>
                    <p className="text-xl text-white text-left">
                        *Make sure this is the topic and deck you want.
                    </p>
                </div>
            </section>

            {/* Section 3 */}
            <section className="text-xs text-gray-500 text-center mb-8 w-full max-w-5xl">
                <div className="flex flex-col items-center space-y-4">
                    <img
                        src="src/assets/card.jpg"
                        alt="Card Back"
                        className="w-40 h-60"
                    />
                    <button className="bg-teal-400 text-white px-6 py-3 rounded-lg hover:bg-teal-500 shadow-lg">
                        Shuffle
                    </button>
                </div>
            </section>

        </div>
    );
};

export default ShuffleCard;
