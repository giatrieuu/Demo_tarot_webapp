
const CardMeaning = () => {
    const cardDetails = {
        name: "The Lovers",
        description: "The 6th card in the Major Arcana",
        meaning: `The Lovers card often represents love, choice, and a deep connection between two individuals. 
              When appearing in a love reading, it suggests a strong relationship, while emphasizing the importance 
              of communication and agreement. When paired with The Devil, it can warn of unhealthy dependency, 
              while The Empress emphasizes warmth and growth. The keywords for this card include love, connection, 
              and decision. The Lovers encourages listening to the heart and making decisions based on love rather 
              than reason.`,
        image: "src/assets/card.jpg" // Replace with your actual image path
    };

    return (
        <div className="bg-[#e6efe6] min-h-screen">
            <div>
                {/* Card Section */}
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className={`flex justify-between items-center p-8 bg-${index % 2 === 0 ? '[#e6efe6]' : '[#629584]'}`}
                    >
                        {/* Conditional rendering for swapping text and image position */}
                        {index === 1 ? (
                            <>
                                {/* Text Content */}
                                <div className="w-2/3 text-left text-white">
                                    <h2 className="text-3xl font-bold mb-4">{cardDetails.name}</h2>
                                    <h3 className="text-xl font-semibold mb-4">{cardDetails.description}</h3>
                                    <p className="text-lg mb-6">{cardDetails.meaning}</p>
                                    <button className="bg-[#e6efe6] text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-50">More</button>
                                </div>
                                {/* Image */}
                                <div className="w-1/3 flex justify-center">
                                    <img
                                        src={cardDetails.image}
                                        alt={cardDetails.name}
                                        className="w-48 h-64 lg:w-45 lg:h-80 rounded-lg shadow-md mb-4 object-contain"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Image */}
                                <div className="w-1/3 flex justify-center">
                                    <img
                                        src={cardDetails.image}
                                        alt={cardDetails.name}
                                        className="w-48 h-64 lg:w-45 lg:h-80 rounded-lg shadow-md mb-4 object-contain"
                                    />
                                </div>
                                {/* Text Content */}
                                <div className={`w-2/3 text-left text-${index % 2 === 0 ? 'text-gray-800' : 'white'}`}>
                                    <h2 className="text-3xl font-bold mb-4">{cardDetails.name}</h2>
                                    <h3 className="text-xl font-semibold mb-4">{cardDetails.description}</h3>
                                    <p className="text-lg mb-6">{cardDetails.meaning}</p>
                                    <button className="bg-[#629584] text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-500">More</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardMeaning;
