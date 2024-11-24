import React from 'react';
import ReaderCard from './ReaderCard';
import Loader from '../../loader/Loader'; // Đảm bảo bạn có Loader component

interface ReadersListProps {
    readers: {
        reader: { id: string; name: string; price: number; rating: number };
        url: string;
        countBooking: number;
    }[];
    loading: boolean;
    onCardClick: (id: string) => void;
}

const ReadersList: React.FC<ReadersListProps> = ({ readers, loading, onCardClick }) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-[calc(100vh-300px)]"> {/* Chiều cao được điều chỉnh */}
                <Loader /> {/* Loader được căn giữa */}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readers.length > 0 ? (
                readers.map((reader) => (
                    <ReaderCard
                        key={reader.reader.id}
                        reader={reader.reader}
                        url={reader.url}
                        countBooking={reader.countBooking}
                        onClick={() => onCardClick(reader.reader.id)}
                    />
                ))
            ) : (
                <div className="text-center col-span-full text-gray-500">
                    No readers found.
                </div>
            )}
        </div>
    );
};

export default ReadersList;
