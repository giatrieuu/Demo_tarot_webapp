import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Rate,
  Typography,
  Divider,
  message,
  Checkbox,
} from "antd";

const { Title, Paragraph, Text } = Typography;

interface BookingPopupProps {
  visible: boolean;
  onClose: () => void;
  readerData: Reader | null;
  avatarUrl: string;
  topics: Topic[];
  userId: string | null;
}

interface FormValues {
  topics?: string[];
  date?: string;
  time?: string;
  note?: string;
}

interface Reader {
  id: string;
  name: string;
  price: number;
  rating: number;
  description: string;
}

interface Topic {
  id: string;
  name: string;
}

const BookingPopup: React.FC<BookingPopupProps> = ({
  visible,
  onClose,
  readerData,
  avatarUrl,
  topics,
  userId,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedDuration, setSelectedDuration] = useState<number>(30); // Default to 30 minutes

  const handleNext = () => setCurrentStep(2);
  const handlePrevious = () => setCurrentStep(1);
  const handleFinish = () => onClose();
  const handleCancel = () => onClose();

  const calculateTotalPrice = (selectedTime: string) => {
    if (readerData?.price && selectedTime) {
      const [startStr, endStr] = selectedTime.split(" - ");
      const start = new Date(`1970-01-01T${convertTo24HourFormat(startStr)}:00`);
      const end = new Date(`1970-01-01T${convertTo24HourFormat(endStr)}:00`);

      if (end > start) {
        const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        setTotalPrice(hours * readerData.price);
      } else {
        setTotalPrice(0);
      }
    }
  };

  const convertTo24HourFormat = (time: string) => {
    const [timeStr, modifier] = time.split(" ");
    const [hourStr, minuteStr] = timeStr.split(":");
    let hours = parseInt(hourStr, 10);
    const minutes = parseInt(minuteStr, 10);

    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const hoursStr = hours < 10 ? `0${hours}` : hours;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

    return `${hoursStr}:${minutesStr}`;
  };

  const handleFormChange = (
    changedValues: Partial<FormValues>,
    allValues: FormValues
  ) => {
    setFormValues(allValues);
    if (changedValues.time) calculateTotalPrice(changedValues.time);
  };

  const handleDurationChange = (value: number) => {
    setSelectedDuration(value);
  };

  const fetchTimeSlots = async (date: string) => {
    if (!readerData) return;

    try {
      const response = await fetch(
        `https://www.bookingtarot.somee.com/api/BookingWeb/available-time-slots?readerId=${readerData.id}&date=${date}`
      );
      if (!response.ok) throw new Error("Failed to fetch time slots");
      const data = await response.json();

      const startTime = new Date(data[0].start);
      const endTime = new Date(data[0].end);

      const formattedSlots = [];
      let current = new Date(startTime);

      while (current < endTime) {
        const nextSlot = new Date(current);
        nextSlot.setMinutes(current.getMinutes() + selectedDuration);

        if (nextSlot > endTime) break;

        const start = current.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const end = nextSlot.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        formattedSlots.push(`${start} - ${end}`);

        current = nextSlot;
      }

      setTimeSlots(formattedSlots);
    } catch (error) {
      console.error("Error fetching time slots:", error);
      message.error("Could not fetch available time slots. Please try again.");
    }
  };

  useEffect(() => {
    if (formValues.date) fetchTimeSlots(formValues.date);
  }, [formValues.date, selectedDuration]);

  const confirmBooking = async () => {
    if (!userId) {
      message.error("User ID is required. Please log in.");
      return;
    }
  
    try {
      const [startStr, endStr] = (formValues.time || "").split(" - ");
      const timeStartFormatted = `${formValues.date}T${convertTo24HourFormat(
        startStr
      )}:00.000Z`;
      const timeEndFormatted = `${formValues.date}T${convertTo24HourFormat(
        endStr
      )}:00.000Z`;
  
      const formData = new FormData();
      formData.append("UserId", userId);
      formData.append("ReaderId", readerData!.id);
      formData.append("TimeStart", timeStartFormatted);
      formData.append("TimeEnd", timeEndFormatted);
      (formValues.topics || []).forEach((topicId) => {
        formData.append("ListTopicId", topicId);
      });
      formData.append("Note", formValues.note || "");
  
      // Create booking and payment concurrently
      const bookingResponse = await fetch(
        "https://www.bookingtarot.somee.com/api/BookingWeb/create-booking",
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
          body: formData,
        }
      );
  
      if (!bookingResponse.ok) {
        throw new Error("Failed to create booking");
      }
  
      const bookingData = await bookingResponse.json();
      const bookingId = bookingData.id; // Ensure bookingData contains the correct booking ID field
  
      // Create the PayPal payment with the bookingId
      const paymentResponse = await fetch(
        `https://www.bookingtarot.somee.com/api/Payment/create-payment?bookingId=${bookingId}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
  
      if (paymentResponse.ok) {
        const paymentData = await paymentResponse.json();
        const approvalUrl = paymentData.approvalUrl;
  
        // Redirect the user to PayPal to approve the payment
        window.location.href = approvalUrl;
      } else {
        throw new Error("Failed to create payment. Please try again.");
      }
    } catch (error) {
      console.error("Error creating booking and payment:", error);
      message.error("Could not complete booking and payment process. Please try again.");
    }
  };

  const handleConfirmClick = () => {
    const { topics, date, time } = formValues;
    if (!topics || topics.length === 0 || !date || !time) {
      message.warning("Please fill in all required fields.");
    } else {
      Modal.confirm({
        title: "Confirm Payment",
        content: "Are you sure you want to proceed with the booking?",
        okText: "Yes",
        cancelText: "No",
        onOk: confirmBooking,
      });
    }
  };

  const getTopicNames = (topicIds: string[] | undefined): string[] => {
    return (
      topicIds?.map((id) => {
        const topic = topics.find((t) => t.id === id);
        return topic ? topic.name : id;
      }) || []
    );
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancel}
      footer={
        currentStep === 1 ? (
          <Button
            key="next"
            type="primary"
            onClick={handleNext}
            className="bg-blue-500 hover:bg-blue-700 text-white"
          >
            Next
          </Button>
        ) : (
          <>
            <Button key="previous" onClick={handlePrevious}>
              Previous
            </Button>
            <Button
              key="finish"
              type="primary"
              onClick={handleConfirmClick}
              className="bg-blue-500 hover:bg-blue-700 text-white"
            >
              Confirm Payment
            </Button>
          </>
        )
      }
      className="rounded-lg p-4"
    >
      {readerData && (
        <div className="text-center mb-6">
          <img
            src={avatarUrl}
            alt="Reader Avatar"
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <Title level={3} className="mb-2">
            {readerData.name}
          </Title>
          <Rate
            disabled
            defaultValue={readerData.rating}
            className="text-yellow-500 mb-2"
          />
          <Paragraph className="text-gray-700 text-lg mb-4">
            ${readerData.price}/Hour
          </Paragraph>
          <Paragraph className="text-gray-500 mb-4">
            {readerData.description}
          </Paragraph>
        </div>
      )}
      <Form
        layout="vertical"
        className="space-y-4"
        initialValues={formValues}
        onValuesChange={handleFormChange}
      >
        {currentStep === 1 && (
          <>
            <Form.Item label="Topics" name="topics">
              <Checkbox.Group className="w-full">
                {topics.map((topic) => (
                  <Checkbox key={topic.id} value={topic.id}>
                    {topic.name}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input
                type="date"
                className="w-full"
                min={new Date().toISOString().split("T")[0]}
                max={
                  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
              />
            </Form.Item>
            <Form.Item label="Duration" name="duration">
              <Select
                defaultValue={30}
                onChange={handleDurationChange}
              >
                <Select.Option value={30}>30 mins</Select.Option>
                <Select.Option value={60}>1 hour</Select.Option>
                <Select.Option value={90}>1 hour 30 mins</Select.Option>
                <Select.Option value={120}>2 hours</Select.Option>
                <Select.Option value={150}>2 hours 30 mins</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Time" name="time">
              <Select placeholder="Choose time" className="w-full">
                {timeSlots.map((slot, index) => (
                  <Select.Option key={index} value={slot}>
                    {slot}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Note" name="note">
              <Input.TextArea className="w-full" rows={4} />
            </Form.Item>
            <div className="mt-4">
              <Text strong>Total Cost: </Text> ${totalPrice.toFixed(2)}
            </div>
          </>
        )}
        {currentStep === 2 && (
          <div className="text-center">
            <Divider />
            <Paragraph>
              <b>Tarot reader:</b> {readerData?.name}
            </Paragraph>
            <Paragraph>
              <b>Date:</b> {formValues.date}
            </Paragraph>
            <Paragraph>
              <b>Time:</b> {formValues.time}
            </Paragraph>
            <Paragraph>
              <b>Topics:</b> {getTopicNames(formValues.topics).join(", ")}
            </Paragraph>
            <Paragraph>
              <b>Total:</b> ${totalPrice.toFixed(2)}
            </Paragraph>
            <Divider />
            <Paragraph className="text-center">
              You will be redirected to PayPal to complete your payment.
            </Paragraph>
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default BookingPopup;
