import React from "react";
import { Button } from "antd";
import { QRCodeCanvas } from "qrcode.react"; // Sử dụng QRCodeCanvas từ qrcode.react để tạo mã QR

interface PaymentDrawerProps {
  visible: boolean;
  onClose: () => void;
  reader: any;
  userData: any;
  totalCost: number;
  onPrevious: () => void;
}

const PaymentDrawer: React.FC<PaymentDrawerProps> = ({
  visible,

  reader,
  userData,
  totalCost,
  onPrevious,
}) => {
  // Kiểm tra nếu `userData` hoặc `service` không tồn tại thì sử dụng giá trị mặc định
  const services = userData?.service ? userData.service.join(", ") : "N/A";

  // Nếu `visible` là false thì không hiển thị component
  if (!visible) return null;

  return (
    <div className="p-4 bg-[#91a089] w-full max-w-md mx-auto rounded-lg">
      {/* Booking Information */}
      <h3 className="text-md font-semibold mb-4 text-white">Booking information</h3>
      <div className="space-y-2 bg-[#dde5db] p-4 rounded-lg">
        <p className="text-sm text-gray-800">
          <strong>Tarot reader:</strong> {reader?.name || "N/A"}
        </p>
        <p className="text-sm text-gray-800">
          <strong>Customer name:</strong> {userData?.userName || "N/A"}
        </p>
        <p className="text-sm text-gray-800">
          <strong>Phone:</strong> {userData?.phone || "N/A"}
        </p>
        <p className="text-sm text-gray-800">
          <strong>Email:</strong> {userData?.email || "N/A"}
        </p>
        <p className="text-sm text-gray-800">
          <strong>Topic:</strong> {userData?.topic || "N/A"}
        </p>
        <p className="text-sm text-gray-800">
          <strong>Card deck:</strong> {userData?.deck || "N/A"}
        </p>
        <p className="text-sm text-gray-800">
          <strong>Service:</strong> {services} {/* Dùng giá trị `services` đã kiểm tra */}
        </p>
        <p className="text-sm text-gray-800">
          <strong>Total:</strong> ${totalCost}
        </p>
      </div>

      {/* QR Code for Payment */}
      <div className="flex justify-center my-4">
        {/* Tạo mã QR code cho thanh toán */}
        <QRCodeCanvas value="TarotF-Payment" size={150} />
      </div>
      <p className="text-center text-lg font-semibold text-white">
        19029310232131 - TarotF - Momo
      </p>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <Button
          type="default"
          className="h-10 w-24 rounded-md bg-[#91a089] hover:bg-[#72876e] text-white text-md"
          onClick={onPrevious}
        >
          Previous
        </Button>
        <Button
          type="primary"
          className="h-10 w-36 rounded-md bg-[#72876e] hover:bg-[#5b6958] text-white text-md"
          onClick={() => console.log("Confirm payment")}
        >
          Confirm payment
        </Button>
      </div>
    </div>
  );
};

export default PaymentDrawer;
