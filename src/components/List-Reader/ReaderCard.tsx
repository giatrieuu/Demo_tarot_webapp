import React from 'react';
import { Card, Rate } from 'antd';

interface ReaderCardProps {
    reader: {
        id: string;
        name: string;
        price: number;
        rating: number | null;
        description?: string | null;
        status: string;
    };
    topics: { id: string; name: string }[]; // Pass topics as an array of objects
    url: string;
    countBooking: number;
    onClick: () => void;
}

const ReaderCard: React.FC<ReaderCardProps> = ({ reader, topics, url, countBooking, onClick }) => {
    return (
        <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={onClick}>
            {url ? (
                <img src={url} alt={reader.name} className="w-full h-64 object-cover rounded-t-lg" />
            ) : (
                <div className="w-full h-32 bg-gray-300 flex items-center justify-center rounded-t-lg">
                    <span className="text-gray-500">No Image</span>
                </div>
            )}

            <Card.Meta
                title={<span>{reader.name}</span>}
                description={`Price: ${reader.price.toLocaleString()} VND`}
            />

            <div className="mt-2">
                <Rate allowHalf value={reader.rating || 0} disabled />
                <span>{countBooking} Reviews</span>
            </div>

            {/* Displaying list of topics */}
            {topics && topics.length > 0 && (
                <div className="mt-2">
                    <strong>Topics:</strong>
                    <ul className="list-disc pl-5 mt-1">
                        {topics.map((topic) => (
                            <li key={topic.id} className="text-gray-700">{topic.name}</li>
                        ))}
                    </ul>
                </div>
            )}

        </Card>
    );
};

export default ReaderCard;
