import React, { useState } from "react";
import { Player } from '@lottiefiles/react-lottie-player';

interface Deck {
    name: string;
    description: string;
    image: string;
}

const decks: Deck[] = [
    {
        name: "Rider-Waite Tarot",
        description:
            "The Rider-Waite Tarot, also known as the Rider-Waite-Smith Tarot, is one of the most iconic and widely used Tarot decks. Created in 1909 by artist Pamela Colman Smith under the guidance of Arthur Edward Waite, this deck introduced illustrated minor arcana cards, making it easier for readers to interpret the symbolism of each card. It is known for its deep symbolism and accessibility in Tarot reading.",
        image: "src/assets/card.jpg", // Thay đường dẫn bằng ảnh của bạn
    },
    // Thêm nhiều bộ bài khác nếu cần
];


const ShuffleCard: React.FC = () => {

    const [currentDeck, setCurrentDeck] = useState(0);

    const handlePrev = () => {
        setCurrentDeck((prev) => (prev === 0 ? decks.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentDeck((prev) => (prev === decks.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center ">
            {/* Section 1 */}
            <section
                className="w-full bg-[#eef7f6] text-gray-800 p-12 lg:p-16 h-screen bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('src/assets/home1.jpg')`,
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center bg-opacity-75 w-full h-full bg-white p-8 shadow-md">
                    {/* Phần bên trái chứa text */}
                    <div className="text-center lg:text-right lg:flex lg:justify-end">
                        <div className="lg:max-w-l text-center">
                            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
                                Curious about Tarot decks?
                            </h2>
                            <p className="text-lg lg:text-xl mb-8">
                                Don't worry, check out the decks we have here.
                            </p>
                            <p className="max-w-md lg:max-w-full text-sm lg:text-base">
                                {decks[currentDeck].description}
                            </p>
                        </div>
                    </div>

                    {/* Phần bên phải chứa hình ảnh và nút */}
                    <div className="flex justify-center items-center space-x-6 lg:space-x-8">
                        <button
                            onClick={handlePrev}
                            className="p-3 bg-gray-300 hover:bg-gray-400 rounded-md transition duration-300"
                        >
                            &#8592;
                        </button>

                        <div className="flex flex-col items-center">
                            <img
                                src={decks[currentDeck].image}
                                alt={decks[currentDeck].name}
                                className="w-48 h-64 lg:w-45 lg:h-80 rounded-lg shadow-md mb-4 object-contain"
                            />
                            <h3 className="text-xl font-semibold">{decks[currentDeck].name}</h3>
                            <div className="flex space-x-2 mt-4">
                                {[...Array(decks.length)].map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full ${currentDeck === index ? 'bg-white' : 'bg-gray-400'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleNext}
                            className="p-3 bg-gray-300 hover:bg-gray-400 rounded-md transition duration-300"
                        >
                            &#8594;
                        </button>
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section className="bg-black text-white flex flex-col md:flex-row justify-center items-center w-full p-8">
                <div className="flex flex-col justify-center items-center space-y-6 w-full md:w-1/3 text-left">
                    <div>
                        <h3 className="text-lg text-white">Select Card deck</h3>
                        <select className="bg-white text-left text-gray-800 shadow-md px-8 py-3 mt-2 rounded-lg border hover:bg-gray-50">
                            <option>Rider-Waite Tarot</option>
                            <option>Thoth Tarot</option>
                            <option>The Wild Unknown Tarot</option>
                            <option>The Tarot of Marseille</option>
                            <option>Mystical Manga Tarot</option>
                        </select>
                    </div>
                    <div>
                        <h3 className="text-lg text-white">Select Topic</h3>
                        <select className="bg-white text-left text-gray-800 shadow-md px-20 py-3 mt-2 rounded-lg border hover:bg-gray-50">
                            <option>Love</option>
                            <option>Study</option>
                            <option>Finance</option>
                            <option>Health</option>
                            <option>Work</option>
                        </select>
                    </div>
                    <button className="bg-white text-gray-800 px-5 py-2 mt-2 rounded-lg shadow-md hover:bg-gray-50">Submit</button>
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center items-center py-8">
                    <Player autoplay loop src="public/robot.json" className="w-72 h-72 lg:w-96 lg:h-96" />
                    <p className="text-xl text-white text-left">
                        *This fortune telling is based on data available in the system only, not the results directly performed by any reader. The results are for reference only and should not be considered as absolute advice for important decisions in life.
                    </p>
                    <p className="text-xl text-white text-left">
                        *Make sure this is the topic and deck you want.
                    </p>
                </div>
            </section>

            {/* Section 3 */}
            <section className="bg-[#eef7f6] text-xs text-gray-500 text-center w-full">
                <div className="flex flex-col items-center space-y-4 px-5 py-8 ">
                    <img
                        src="src/assets/card.jpg"
                        alt="Card Back"
                        className="w-48 h-64 lg:w-45 lg:h-80 rounded-lg shadow-md mb-4 object-contain"
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
