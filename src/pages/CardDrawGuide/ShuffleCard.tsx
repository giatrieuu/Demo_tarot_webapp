import React, { useEffect, useState } from "react";
import { Player } from '@lottiefiles/react-lottie-player';
import ApiService from "../../services/axios";

interface Deck {
    id: string;
    name: string;
    description: string;
    image: string;
}

interface Topic {
    id: string;
    name: string;
}

const ShuffleCard: React.FC = () => {
    const [currentDeck, setCurrentDeck] = useState(0);
    const [groupCards, setGroupCards] = useState<Deck[]>([]); // State for storing fetched card decks
    const [topics, setTopics] = useState<Topic[]>([]); // State for storing fetched topics

    // Fetch group cards (card decks) when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const decksData = await ApiService.fetchGroupCardsList();
                setGroupCards(decksData); // Update the groupCards state with the fetched data

                const topicsData = await ApiService.fetchTopicsList();
                setTopics(topicsData); // Update the topics state with the fetched data
            } catch (error) {
                console.error("Failed to load data", error);
            }
        };

        fetchData();
    }, []);

    const handlePrev = () => {
        setCurrentDeck((prev) => (prev === 0 ? groupCards.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentDeck((prev) => (prev === groupCards.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center ">
            {/* Section 1 */}
            <section
                className="w-full bg-[#eef7f6] text-gray-800 p-12 lg:p-16 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('src/assets/home1.jpg')`,
                }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center bg-opacity-75 w-full h-full bg-white p-8 shadow-md">
                    <div className="text-center lg:text-right lg:flex lg:justify-end">
                        <div className="lg:max-w-l text-center">
                            <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
                                Curious about Tarot decks?
                            </h2>
                            <p className="text-lg lg:text-xl mb-8">
                                Don't worry, check out the decks we have here.
                            </p>
                            {groupCards.length > 0 && (
                                <p className="max-w-md lg:max-w-full text-sm lg:text-base">
                                    {groupCards[currentDeck]?.description}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-center items-center space-x-6 lg:space-x-8">
                        <button
                            onClick={handlePrev}
                            className="p-3 bg-gray-300 hover:bg-gray-400 rounded-md transition duration-300"
                        >
                            &#8592;
                        </button>

                        <div className="flex flex-col items-center">
                            <img
                                src={groupCards[currentDeck]?.image || 'src/assets/card.jpg'}
                                alt={groupCards[currentDeck]?.name || "Card Deck"}
                                className="w-48 h-64 lg:w-45 lg:h-80 rounded-lg shadow-md mb-4 object-contain"
                            />
                            <h3 className="text-xl font-semibold">
                                {groupCards[currentDeck]?.name || "Loading..."}
                            </h3>
                            <div className="flex space-x-2 mt-4">
                                {[...Array(groupCards.length)].map((_, index) => (
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
                            {groupCards.map((deck) => (
                                <option key={deck.id} value={deck.id}>
                                    {deck.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h3 className="text-lg text-white">Select Topic</h3>
                        <select className="bg-white text-left text-gray-800 shadow-md px-20 py-3 mt-2 rounded-lg border hover:bg-gray-50">
                            {topics.map((topic) => (
                                <option key={topic.id} value={topic.id}>
                                    {topic.name}
                                </option>
                            ))}
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



        </div>
    );
};

export default ShuffleCard;
