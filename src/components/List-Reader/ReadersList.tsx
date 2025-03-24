import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReaderCard from './ReaderCard';
import Loader from '../Loader/Loader'; 

interface ReadersListProps {
    readers: {
        reader: {
            id: string;
            name: string;
            price: number;
            rating: number | null; 
            description?: string | null;
            status: string;
        };
        topics: { id: string; name: string }[]; 
        countBooking: number;
        url: string;
    }[];
    loading: boolean;
}

const ReadersList: React.FC<ReadersListProps> = ({ readers, loading }) => {
    const navigate = useNavigate(); 

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-[calc(100vh-300px)]">
                <Loader /> 
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
                    topics={reader.topics} 
                    url={reader.url}
                    countBooking={reader.countBooking}
                    onClick={() => navigate(`/reader-detail/${reader.reader.id}`)}
                />
            ))}
        </div>
    );
};

export default ReadersList;
