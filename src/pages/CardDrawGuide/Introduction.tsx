import { Player } from "@lottiefiles/react-lottie-player";

const Introduction: React.FC = () => {
    return (
        <div className="h-auto min-h-screen flex items-center justify-center bg-[#eef7f6] p-4 lg:p-6">

            {/* Wrapper for content */}
            <div className="flex flex-col lg:flex-row items-center justify-center max-w-5xl w-full lg:space-x-8 space-y-6 lg:space-y-0">
                {/* Text Section */}
                <div className="flex-1 text-center lg:text-left px-4 lg:px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">What is Tarot?</h2>
                    <h2 className="text-xl text-gray-600 mb-2">Superstition or mystical science?</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Tarot is a mystical tool used for divination, self-reflection, and guidance.
                        Comprising 78 cards, each card holds symbolic imagery that provides insight into
                        life’s mysteries, challenges, and opportunities.
                    </p>
                </div>

                {/* Animation Section */}
                <div className="flex justify-center px-4 lg:px-6">
                    <Player
                        autoplay
                        loop
                        src="/public/question-girl.json"
                        className="w-72 h-72 lg:w-96 lg:h-96"
                    />
                </div>
            </div>
        </div>
    );
};

export default Introduction;
