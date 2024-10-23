import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

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

const ChooseCardDeck: React.FC = () => {
    const [currentDeck, setCurrentDeck] = useState(0);

    const handlePrev = () => {
        setCurrentDeck((prev) => (prev === 0 ? decks.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentDeck((prev) => (prev === decks.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="min-h-screen">
            <section className="w-full bg-[#eef7f6] text-gray-800 p-12 lg:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-[#444444]">
                            First, choose the deck you want!
                        </h1>
                        <p className="text-lg lg:text-xl mb-4 text-[#444444]">
                            Each deck has a different meaning!
                        </p>
                        <p className="max-w-3xl mx-auto lg:mx-0 text-base lg:text-lg text-[#444444]">
                            Tarot is a versatile tool for guidance and introspection, and over the
                            centuries, many different Tarot decks have been created, each offering
                            its own unique art, symbolism, and interpretation. While the traditional
                            deck, such as the Rider-Waite Tarot, remains one of the most popular,
                            there are countless others like the Thoth Tarot, Oracle decks, and themed
                            decks (e.g., angelic, mythological, or animal-based). Each deck brings a
                            fresh perspective to the readings, allowing users to connect with the
                            imagery and energy that resonates most with them.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex justify-center w-full">
                            <Player
                                autoplay
                                loop
                                src="public/choose-card-deck.json"
                                className="w-72 h-72 lg:w-96 lg:h-96"
                            />
                        </div>
                        <select className="bg-white hover:bg-gray-100 text-[#629584] text-center font-semibold py-2 px-6 rounded shadow-md transition duration-300 mt-6">
                            <option>Choose a card deck</option>
                            <option value="rider-waite">Rider-Waite Tarot</option>
                            <option value="thoth">Thoth Tarot</option>
                            <option value="wild-unknown">The Wild Unknown Tarot</option>
                            <option value="marseille">The Tarot of Marseille</option>
                            <option value="mystical-manga">Mystical Manga Tarot</option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="w-full bg-[#629584] text-white p-12 lg:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Phần bên trái chứa text */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
                            Don't know any Tarot decks?
                        </h2>
                        <p className="text-lg lg:text-xl mb-8">
                            Don't worry, check out the decks we have here.
                        </p>
                        <p className="max-w-md lg:max-w-lg text-sm lg:text-base">
                            {decks[currentDeck].description}
                        </p>
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
                                {/* Add indicators for the deck */}
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
        </div>
    );
};

export default ChooseCardDeck;
