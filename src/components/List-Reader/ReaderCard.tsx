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
    onClick: () => void; // Đảm bảo onClick được khai báo
}

const ReaderCard: React.FC<ReaderCardProps> = ({ reader, url, countBooking, onClick }) => {
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
                <Rate allowHalf value={reader.rating} disabled />
                <span>{countBooking} Reviews</span>
            </div>
        </Card>
    );
};

export default ReaderCard;
