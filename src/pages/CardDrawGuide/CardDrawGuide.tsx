import React, { useState } from "react";
import Introduction from "./Introduction";
import ChooseCardDeck from "./ChooseCardDeck";
import ChooseTopic from "./ChooseTopic";
import ShuffleCard from "./ShuffleCard";

const CardDrawGuide: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <Introduction />;
            case 1:
                return <ChooseCardDeck />;
            case 2:
                return <ChooseTopic />;
            case 3:
                return <ShuffleCard />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full">
            {renderStep()}
            <div className="flex justify-center mt-6 gap-4">
                {/* Back Button */}
                <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`w-fit px-6 py-2 rounded-md text-sm transition-all duration-300 ${currentStep === 0
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-gray-300 hover:bg-gray-400"
                        }`}
                >
                    Back
                </button>

                {/* Next Button */}
                <button
                    onClick={nextStep}
                    disabled={currentStep === 3}
                    className={`w-fit px-6 py-2 rounded-md text-sm transition-all duration-300 ${currentStep === 3
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#629584] text-white hover:bg-[#45a049]"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CardDrawGuide;
