import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, message } from "antd";
import BookingHeader from "../../components/BookingPopup/BookingHeader";
import BookingForm from "../../components/BookingPopup/BookingForm";
import BookingSummary from "../../components/BookingPopup/BookingSummary";
import { createBooking, createPaymentQR } from "../../services/bookingServices";
import { RootState } from "../../redux/store";

interface BookingPopupProps {
  visible: boolean;
  onClose: () => void;
  readerData: any;
  avatarUrl: string;
  topics: any[];
  userId: string;
}
const BookingPopup: React.FC<BookingPopupProps> = ({
  visible,
  onClose,
  readerData,
  avatarUrl,
  topics,
}) => {
  const userId = useSelector((state: RootState) => state.auth.userId) ?? "";

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formValues, setFormValues] = useState<any>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // ✅ Hàm cập nhật giá tiền dựa trên thời gian chọn
  const handleFormChange = (changedValues: any, allValues: any) => {
    if (changedValues.startTime && allValues.endTime) {
      const start = new Date(`${allValues.date}T${allValues.startTime}:00`);
      const end = new Date(`${allValues.date}T${allValues.endTime}:00`);
      const durationMinutes = (end.getTime() - start.getTime()) / 60000;
      const newTotalPrice = (readerData.price / 60) * durationMinutes;

      console.log("Duration:", durationMinutes, "minutes");
      console.log("Calculated Price:", newTotalPrice);

      setTotalPrice(newTotalPrice);
    }
    setFormValues(allValues);
  };

  const handleConfirmClick = async () => {
    if (!userId) {
      message.warning("Vui lòng đăng nhập để đặt lịch!");
      window.location.href = "/login"; // 🔹 Điều hướng về trang đăng nhập
      return;
    }
  
    if (
      !formValues.date ||
      !formValues.startTime ||
      !formValues.endTime ||
      !formValues.topics
    ) {
      message.warning("Vui lòng điền đầy đủ thông tin!");
      return;
    }
  
    setLoading(true);
  
    try {
      const timeStart = `${formValues.date}T${formValues.startTime}:00`;
      const timeEnd = `${formValues.date}T${formValues.endTime}:00`;
  
      // 🔹 Gọi API tạo booking
      const bookingResponse = await createBooking({
        userId,
        readerId: readerData.id,
        timeStart,
        timeEnd,
        listTopicId: formValues.topics,
        note: formValues.note,
      });
  
      if (!bookingResponse || !bookingResponse.id) {
        throw new Error("Không thể tạo booking.");
      }
  
      const bookingId = bookingResponse.id;
      message.success("Đặt lịch thành công!");
  
      // 🔹 Gọi API tạo QR thanh toán
      const paymentQRResponse = await createPaymentQR({
        amount: totalPrice,
        orderId: bookingId,
      });
  
      if (!paymentQRResponse || !paymentQRResponse.qrCodeUrl) {
        throw new Error("Không thể tạo QR thanh toán.");
      }
  
      window.open(paymentQRResponse.qrCodeUrl, "_blank");
    } catch (error: any) {
      message.error(error.message || "Có lỗi xảy ra, vui lòng thử lại!");
    }
  
    setLoading(false);
  };
  
  return (
    <Modal
      open={visible} // Thay vì `visible={visible}`
      onCancel={onClose}
      confirmLoading={loading}
      footer={
        currentStep === 1 ? (
          <Button type="primary" onClick={() => setCurrentStep(2)}>
            Tiếp theo
          </Button>
        ) : (
          <>
            <Button onClick={() => setCurrentStep(1)}>Trước</Button>
            <Button
              type="primary"
              onClick={handleConfirmClick}
              loading={loading}
            >
              Xác nhận & Thanh toán
            </Button>
          </>
        )
      }
    >
      {readerData && (
        <BookingHeader readerData={readerData} avatarUrl={avatarUrl} />
      )}
      {currentStep === 1 && (
        <BookingForm
          topics={topics}
          formValues={formValues}
          readerPrice={readerData.price} // ✅ Truyền giá reader vào BookingForm
          handleFormChange={handleFormChange}
        />
      )}
      {currentStep === 2 && (
        <BookingSummary
          readerName={readerData.name}
          formValues={formValues}
          totalPrice={totalPrice} // ✅ Đảm bảo truyền đúng totalPrice
          getTopicNames={(ids) =>
            ids?.map((id) => topics.find((t) => t.id === id)?.name || id) || []
          }
        />
      )}
    </Modal>
  );
};

export default BookingPopup;
