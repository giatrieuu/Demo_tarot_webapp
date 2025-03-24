import React from 'react';
import { SearchOutlined } from '@ant-design/icons';

// Import the video file
import HomeVideo from '../../../public/assets/home.mp4';

const BannerSection: React.FC = () => {
    return (
        <section className="relative flex items-center justify-between px-16 py-20 h-screen">
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src={HomeVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="relative z-10 flex-1 pr-12">
                <h1 className="text-6xl font-bold text-white leading-tight">
                    Unlock the Mysteries <br />
                    <span className="font-light">One Card at a Time</span>
                </h1>
                <p className="mt-6 text-xl text-white">
                    Gain clarity, find your path, and explore the depths of your destiny with
                    our expert readings.
                </p>
                <div className="flex items-center mt-10 bg-white rounded-lg shadow-md overflow-hidden max-w-lg">
                    <input
                        type="text"
                        placeholder="Search by tarot reader or blog..."
                        className="flex-1 px-8 py-4 text-gray-700 text-xl outline-none"
                    />
                    <button
                        className="custom-button px-8 py-5 font-bold text-sm custom-button:hover transition-all"
                    >
                        <SearchOutlined style={{ fontSize: '20px' }} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BannerSection;