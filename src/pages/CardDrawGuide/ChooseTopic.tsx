import React, { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player'; // Assuming you're using Lottie for animation

const topics = [
    'Love',
    'Career',
    'Personal Growth',
    'Health',
];

const ChooseTopic: React.FC = () => {
    const [selectedTopic, setSelectedTopic] = useState(topics[0]);

    const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTopic(e.target.value);
    };

    return (
        <div className="min-h-screen bg-[#eef7f6] p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left side: Text */}
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-[#444444]">
                        Second, choose the theme you want!
                    </h1>
                    <p className="text-lg lg:text-xl mb-4 text-[#444444]">
                        Each deck has a different meaning!
                    </p>
                    <p className="max-w-lg text-base lg:text-lg text-[#444444]">
                        In Tarot, you can explore various topics like love, career, personal growth, and health.
                        Each reading offers insights into different aspects of your life, helping you make decisions
                        and understand your path.
                    </p>
                </div>

                {/* Right side: Animation and Selection */}
                <div className="flex flex-col items-center">
                    {/* Animation */}
                    <div className="flex justify-center w-full">
                        <Player
                            autoplay
                            loop
                            src="public/choose-topic.json" // Replace with your animation file path
                            className="w-72 h-72 lg:w-96 lg:h-96"
                        />
                    </div>

                    {/* Selection - centered below the animation */}
                    <select
                        value={selectedTopic}
                        onChange={handleTopicChange}
                        className="bg-white hover:bg-gray-100 text-[#629584] font-semibold py-2 px-6 rounded shadow-md transition duration-300 mt-6 w-56 text-center"
                    >
                        {topics.map((topic, index) => (
                            <option key={index} value={topic}>
                                {topic}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
        </div>
    );
};

export default ChooseTopic;
