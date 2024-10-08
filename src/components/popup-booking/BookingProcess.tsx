import React, { useState } from "react";
import { Drawer } from "antd";
import InforReaderDrawer from "./BookingReaderInfo"; // Step 1 component
import UserInformationDrawer from "./BookingUserInfo"; // Step 2 component
import PaymentDrawer from "./BookingPayment"; // Step 3 component

interface BookingProcessProps {
  visible: boolean;
  onClose: () => void;
  reader: any;
}

const BookingProcess: React.FC<BookingProcessProps> = ({
  visible,
  onClose,
  reader,
}) => {
  // State to control the current step
  const [currentStep, setCurrentStep] = useState(0);

  // Data to pass between steps
  const [bookingData, setBookingData] = useState({
    topic: "",
    cardDeck: "",
    date: "",
    time: "",
    services: [],
    totalCost: 0,
    userName: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    note: "",
  });

  // Function to move to the next step
  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Function to go back to the previous step
  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  // Function to handle data change and update bookingData
  const handleDataChange = (field: string, value: any) => {
    setBookingData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Function to render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <InforReaderDrawer
            visible={true}
            onClose={onClose}
            onNext={nextStep}
            bookingData={bookingData}
            handleDataChange={handleDataChange}
            reader={reader}
          />
        );
      case 1:
        return (
          <UserInformationDrawer
            visible={true}
            onClose={onClose}
            onNext={nextStep}
            onPrevious={prevStep}
            bookingData={bookingData}
            handleDataChange={handleDataChange}
            reader={reader}
          />
        );
      case 2:
        return (
          <PaymentDrawer
            visible={true}
            onClose={onClose}
            onPrevious={prevStep}
            reader={reader}
            userData={bookingData}
            totalCost={bookingData.totalCost}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Drawer
      headerStyle={{ display: "none" }} // Ẩn tiêu đề Drawer
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
      width={450} // Điều chỉnh chiều rộng để cân đối
      bodyStyle={{ padding: 0, backgroundColor: "#91a089" }} // Cập nhật padding và màu nền
    >
      {/* Render the current step component */}
      {renderStep()}
    </Drawer>
  );
};

export default BookingProcess;
