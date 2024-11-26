import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import ReaderCard from './ReaderCard';
import Loader from '../../loader/Loader'; // Loader component

interface ReadersListProps {
    readers: {
        reader: {
            id: string;
            name: string;
            price: number;
            rating: number | null; // Rating can be null
            description?: string | null;
            status: string;
        };
        topics: { id: string; name: string }[]; // Topics field is an array of objects with id and name
        countBooking: number;
        url: string;
    }[];
    loading: boolean;
}

const ReadersList: React.FC<ReadersListProps> = ({ readers, loading }) => {
    const navigate = useNavigate(); // Hook for navigation

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-[calc(100vh-300px)]">
                <Loader /> {/* Show loader */}
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
                    topics={reader.topics} // Pass topics here
                    url={reader.url}
                    countBooking={reader.countBooking}
                    onClick={() => navigate(`/reader-detail/${reader.reader.id}`)} // Navigate to reader detail page
                />
            ))}
        </div>
    );
};

export default ReadersList;
