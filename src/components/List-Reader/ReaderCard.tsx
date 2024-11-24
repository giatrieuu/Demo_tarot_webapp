import React from 'react';
import { Card, Rate } from 'antd';

interface ReaderCardProps {
    reader: {
        id: string;
        name: string;
        price: number;
        rating: number;
    };
    url: string;
    countBooking: number;
    onClick: () => void;
}

const ReaderCard: React.FC<ReaderCardProps> = ({ reader, url, countBooking, onClick }) => {
    return (
        <Card className="cursor-pointer" onClick={onClick}>
            {url ? (
                <img src={url} alt={reader.name} className="w-full h-64 object-cover" />
            ) : (
                <div className="w-full h-32 bg-gray-300 flex items-center justify-center">
                    <span>No Image</span>
                </div>
            )}
            <Card.Meta
                title={<span>{reader.name}</span>}
                description={`Price: ${reader.price} VND`}
            />
            <div className="mt-2">
                <Rate allowHalf value={reader.rating} disabled />
                <span>{countBooking} Reviews</span>
            </div>
        </Card>
    );
};

export default ReaderCard;
