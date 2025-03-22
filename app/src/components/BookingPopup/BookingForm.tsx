import React, { useEffect, useState } from "react";
import { Form, Select, Checkbox, Typography, message } from "antd";
import dayjs from "dayjs";
import { fetchWorkScheduleByReaderId } from "../../services/tarotReaderServices";
import { fetchBookingsByReaderId } from "../../services/bookingServices";
import { useParams } from "react-router-dom";

const { Text } = Typography;

interface Topic {
  id: string;
  name: string;
}

interface TimeSlot {
  start: string;
  end: string;
}

interface BookingFormProps {
  topics: Topic[];
  formValues: any;
  readerPrice: number;
  handleFormChange: (changedValues: any, allValues: any) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  topics,
  formValues,
  readerPrice,
  handleFormChange,
}) => {
  const { readerId } = useParams<{ readerId: string }>();
  const safeReaderId = readerId ?? ""; // ✅ Tránh lỗi `undefined`

  const [form] = Form.useForm();
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    updateAvailableDates();
  }, []);

  const updateAvailableDates = () => {
    const today = dayjs().startOf("day");
    const newDates = [0, 1, 2].map((offset) =>
      today.add(offset, "day").format("YYYY-MM-DD")
    );
    setAvailableDates(newDates);
  };

  // 📌 Khi chọn ngày, lấy dữ liệu lịch làm việc & booking từ API
  const handleDateChange = async (date: string) => {
    if (!safeReaderId) {
      message.error("Không tìm thấy Reader ID!");
      return;
    }

    setSelectedDate(date);
    setSelectedSlot(null);
    setStartTime(null);
    form.setFieldsValue({
      slot: undefined,
      startTime: undefined,
      endTime: undefined,
    });

    try {
      const schedules = await fetchWorkScheduleByReaderId(safeReaderId);
      const selectedDaySchedules = schedules?.filter(
        (schedule: any) =>
          dayjs(schedule.workDate).format("YYYY-MM-DD") === date
      );

      const slots: TimeSlot[] =
        selectedDaySchedules?.map((schedule: any) => ({
          start: dayjs(schedule.startTime, "HH:mm:ss").format("HH:mm"),
          end: dayjs(schedule.endTime, "HH:mm:ss").format("HH:mm"),
        })) ?? [];

      setTimeSlots(slots);

      const bookings = await fetchBookingsByReaderId(safeReaderId, 1, 100);

      // 🔥 Lọc đúng ngày đang chọn
      const selectedDateBookings = bookings?.filter(
        (booking: any) =>
          dayjs(booking.booking.timeStart).format("YYYY-MM-DD") === date
      );

      const bookedSlots: TimeSlot[] =
        selectedDateBookings?.map((booking: any) => ({
          start: dayjs(booking.booking.timeStart).format("HH:mm"),
          end: dayjs(booking.booking.timeEnd).format("HH:mm"),
        })) ?? [];

      setBookedTimes(bookedSlots.flatMap((slot) => [slot.start, slot.end]));
    } catch (error) {
      message.error("Lỗi khi lấy lịch làm việc hoặc booking.");
    }
  };

  // 📌 Khi chọn khung giờ làm việc
  const handleSlotChange = (index: number) => {
    const slot = timeSlots[index];
    setSelectedSlot(slot);
    setStartTime(null);
    form.setFieldsValue({ startTime: undefined, endTime: undefined });

    let timeOptions: string[] = [];
    let currentTime = dayjs(slot.start, "HH:mm");
    let endTime = dayjs(slot.end, "HH:mm");

    while (currentTime.isBefore(endTime)) {
      const formattedTime = currentTime.format("HH:mm");
      if (!bookedTimes.includes(formattedTime)) {
        timeOptions.push(formattedTime);
      }
      currentTime = currentTime.add(30, "minute");
    }

    setAvailableTimes(timeOptions);
  };

  // 📌 Khi chọn Start Time
  const handleStartTimeChange = (selectedStart: string) => {
    setStartTime(selectedStart);
    form.setFieldsValue({ endTime: undefined });
  };

  // 📌 Khi chọn End Time, tính toán giá tiền
  const handleEndTimeChange = (selectedEnd: string) => {
    if (!startTime) return;

    const startMoment = dayjs(startTime, "HH:mm");
    const endMoment = dayjs(selectedEnd, "HH:mm");

    const durationMinutes = endMoment.diff(startMoment, "minute");
    const totalCost = (readerPrice / 60) * durationMinutes;

    setTotalPrice(totalCost);

    // ✅ Cập nhật `endTime` đúng cách
    handleFormChange(
      { startTime, endTime: selectedEnd, totalPrice: totalCost },
      { ...formValues, startTime, endTime: selectedEnd, totalPrice: totalCost }
    );
  };

  return (
    <Form
      form={form}
      layout="vertical"
      className="space-y-4"
      initialValues={formValues}
      onValuesChange={handleFormChange}
    >
      <Form.Item label="Topics" name="topics">
        <Checkbox.Group className="w-full">
          {topics.map((topic) => (
            <Checkbox key={topic.id} value={topic.id}>
              {topic.name}
            </Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>

      <Form.Item label="Select Date" name="date">
        <Select
          placeholder="Chọn ngày"
          className="w-full"
          onChange={handleDateChange}
        >
          {availableDates.map((date, index) => (
            <Select.Option key={index} value={date}>
              {dayjs(date).format("DD/MM/YYYY")}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Chọn khung giờ làm việc" name="slot">
        <Select
          placeholder="Chọn khung giờ"
          className="w-full"
          disabled={!selectedDate}
          onChange={handleSlotChange}
        >
          {timeSlots.map((slot, index) => (
            <Select.Option key={index} value={index}>
              {slot.start} - {slot.end}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Select Start Time" name="startTime">
        <Select
          placeholder="Chọn giờ bắt đầu"
          className="w-full"
          disabled={!selectedSlot}
          onChange={handleStartTimeChange}
        >
          {availableTimes.map((time, index) => (
            <Select.Option key={index} value={time}>
              {time}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Select End Time" name="endTime">
        <Select
          placeholder="Chọn giờ kết thúc"
          className="w-full"
          disabled={!startTime}
          onChange={handleEndTimeChange}
        >
          {availableTimes
            .filter((time) =>
              dayjs(time, "HH:mm").isAfter(dayjs(startTime, "HH:mm"))
            )
            .map((time, index) => (
              <Select.Option key={index} value={time}>
                {time}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>

      <div className="mt-4">
        <Text strong>Total Cost: </Text> {totalPrice.toFixed(2)} VND
      </div>
    </Form>
  );
};

export default BookingForm;
