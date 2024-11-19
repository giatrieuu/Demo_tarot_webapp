import React from "react";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";

interface TarotReader {
    reader: {
        id: string;
        name: string;
        rating: number;
        price: number;
    };
    countBooking: number | null;
    url: string | null;
}

interface TarotReaderSectionProps {
    readers: TarotReader[];
}

const TarotReaderSection: React.FC<TarotReaderSectionProps> = ({ readers }) => {
    const navigate = useNavigate();

    return (
        <section className="py-20 px-16 bg-white">
            <h2 className="text-4xl font-serif text-center mb-8">Featured Tarot Reader</h2>
            <div className="relative flex justify-center mb-12">
                <span className="block w-[8%] h-1 bg-purple-800"></span>
                <span className="block w-[8%] h-1 bg-gray-300"></span>
                <span className="block w-[8%] h-1 bg-gray-300"></span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                {readers.map((reader) => (
                    <div
                        key={reader.reader.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between p-8 h-[380px] w-80 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        {/* Reader Image */}
                        <img
                            src={reader.url || "https://via.placeholder.com/150"}
                            alt={reader.reader.name}
                            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                        />

                        {/* Reader Name */}
                        <h3 className="text-lg font-bold text-center mb-2">
                            {reader.reader.name}
                        </h3>

                        {/* Reader Rating */}
                        <div className="flex items-center justify-center mb-4">
                            <Rate allowHalf value={reader.reader.rating} disabled />
                            <p className="text-sm text-gray-500 ml-2">
                                {reader.countBooking} Reviews
                            </p>
                        </div>

                        {/* Footer Section: Price and Button */}
                        <div className="flex justify-between items-center mt-auto">
                            {/* Price */}
                            <p className="text-[#382C59] font-medium">
                                <span className="text-green-500 font-bold text-xl">
                                    ${reader.reader.price}
                                </span>
                            </p>

                            {/* Book Now Button */}
                            <button
                                className="custom-button custom-button:hover px-4 py-2 rounded-md hover:bg-[#6C4CB3] transition"
                                onClick={() => navigate(`/reader-detail/${reader.reader.id}`)}
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TarotReaderSection;
