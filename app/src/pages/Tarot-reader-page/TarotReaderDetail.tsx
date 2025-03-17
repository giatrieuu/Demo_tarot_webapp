import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ReaderProfile from "../../components/Tarot-reader-detail/ReaderProfile";
import ReaderAbout from "../../components/Tarot-reader-detail/ReaderAbout";
import ReaderReviews from "../../components/Tarot-reader-detail/ReaderReviews";
import BookingPopup from "../../components/BookingPopup/BookingPopup";
import {
  fetchReaderById,
  fetchReaderTopics,
  fetchReaderReviews,
} from "../../services/tarotReaderServices";

const ReaderDetail: React.FC = () => {
  const { readerId } = useParams<{ readerId: string }>();
  const [readerData, setReaderData] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [topics, setTopics] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookingPopupVisible, setIsBookingPopupVisible] = useState(false);

  /**
   * Fetch reader data
   */
  const fetchReaderData = useCallback(async () => {
    if (!readerId) return;

    try {
      setLoading(true);
      setError(null);

      const [readerResponse, topicsResponse, reviewsResponse] = await Promise.all([
        fetchReaderById(readerId),
        fetchReaderTopics(readerId, 1, 10),
        fetchReaderReviews(readerId),
      ]);

      if (!readerResponse || !readerResponse.reader) {
        setError("Reader not found!");
        return;
      }

      setReaderData(readerResponse.reader);
      setImageUrl(readerResponse.url?.[0] || "");
      setTopics(topicsResponse || []);
      setReviews(reviewsResponse || []);
    } catch (err) {
      setError("Failed to fetch reader details. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [readerId]);

  useEffect(() => {
    fetchReaderData();
  }, [fetchReaderData]);

  const handleBookNow = () => {
    setIsBookingPopupVisible(true);
  };

  const handleCloseBookingPopup = () => {
    setIsBookingPopupVisible(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div
    className="relative flex flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat px-6 py-12 md:px-24 lg:px-40 xl:px-60"
    style={{ backgroundImage: "url('/public/assets/bgTarot.jpg')" }} 
  >
    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
  
    {/* Thẻ chứa nội dung, tăng max-width */}
    <div className="relative z-10 w-full max-w-7xl bg-transparent shadow-lg rounded-lg p-10">
      <ReaderProfile
        readerData={readerData}
        imageUrl={imageUrl}
        topics={topics}
        isFollowed={false}
        onFollow={() => console.log("Follow reader")}
        onBookNow={handleBookNow} 
      />
      <ReaderAbout description={readerData.description} />
      <ReaderReviews reviews={reviews} />
      <BookingPopup
        visible={isBookingPopupVisible}
        onClose={handleCloseBookingPopup}
        readerData={readerData}
        avatarUrl={imageUrl}
        topics={topics}
        userId={"USER_ID"} 
      />
    </div>
  </div>
  );
};

export default ReaderDetail;
