import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ React Router
import ReaderCard from './ReaderCard';
import Loader from '../../loader/Loader'; // Component Loader

interface ReadersListProps {
    readers: {
        reader: { id: string; name: string; price: number; rating: number };
        url: string;
        countBooking: number;
    }[];
    loading: boolean;
}

const ReadersList: React.FC<ReadersListProps> = ({ readers, loading }) => {
    const navigate = useNavigate(); // Hook điều hướng

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-[calc(100vh-300px)]">
                <Loader /> {/* Hiển thị Loader */}
            </div>
        );
    }

    if (!Array.isArray(readers) || readers.length === 0) {
        return (
            <div className="text-center col-span-full text-gray-500">
                No readers found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readers.map((reader) => (
                <ReaderCard
                    key={reader.reader.id}
                    reader={reader.reader}
                    url={reader.url}
                    countBooking={reader.countBooking}
                    onClick={() => navigate(`/reader-detail/${reader.reader.id}`)} // Điều hướng đến trang chi tiết
                />
            ))}
        </div>
    );
};

export default ReadersList;
