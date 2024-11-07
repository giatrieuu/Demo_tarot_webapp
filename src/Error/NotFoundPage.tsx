import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            {/* Nhúng animation bằng iframe */}
            <iframe
                src="https://lottie.host/embed/44fa5f78-2a51-47b7-9eee-12b4d4188ed3/sz7BrZ5Bvg.json"
                style={{ width: "500px", height: "500px", border: "none" }}
                title="Lottie Animation"
                allow="autoplay"
            ></iframe>

            {/* Dòng chữ Back to TarotF */}
            <Link to="/" className="mt-4 text-lg" style={{ fontFamily: "'Uncial Antiqua', cursive", color: 'black' }}>
                Back to TarotF
            </Link>
        </div>
    );
};

export default NotFoundPage;
