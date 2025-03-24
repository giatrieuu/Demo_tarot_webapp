import React, { useEffect, useRef, useState } from "react";
import { Calendar, Badge, Typography, Spin, message } from "antd";
import type { Dayjs } from "dayjs";
import type { BadgeProps } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import dayjs from "dayjs";
import TimeSlotModal from "./TimeSlotModal";
import {
  createWorkSchedule,
  fetchWorkScheduleByReaderId,
} from "../../../../services/tarotReaderServices";

const { Title } = Typography;

const CreateTimeToBook: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [freeTimeSlots, setFreeTimeSlots] = useState<
    Record<string, { start: string; end: string }[]>
  >({});
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const [modalVisible, setModalVisible] = useState(false);
  const [timeRange, setTimeRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);

  // 🟢 Fetch Lịch Làm Việc Khi Component Mount
  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    fetchWorkScheduleByReaderId(userId)
      .then((data) => {
        const formattedData: Record<string, { start: string; end: string }[]> =
          {};
        data.forEach((schedule: any) => {
          const date = schedule.workDate.split("T")[0];
          if (!formattedData[date]) formattedData[date] = [];
          formattedData[date].push({
            start: schedule.startTime,
            end: schedule.endTime,
          });
        });

        setFreeTimeSlots(formattedData);
      })
      .catch(() => message.error("Không thể tải lịch làm việc"))
      .finally(() => setLoading(false));
  }, [userId]);

  // 🟡 Hiển thị lịch làm việc trên từng ô lịch
  const getListData = (value: Dayjs) => {
    const dateString = value.format("YYYY-MM-DD");
    return (
      freeTimeSlots[dateString]?.map((slot) => ({
        type: "success",
        content: `🕒 ${slot.start} - ${slot.end}`,
      })) || []
    );
  };

  // 🟡 Render dữ liệu lên Calendar
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    const isPast = value.isBefore(dayjs(), "day");

    return (
      <ul
        className={`events ${isPast ? "opacity-50 pointer-events-none" : ""}`}
      >
        {listData.map((item, index) => (
          <li key={index}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  // 🟡 Chặn chọn ngày trong quá khứ hoặc xa quá 3 ngày
  const disabledDate = (current: Dayjs) => {
    const today = dayjs();
    const maxDate = today.add(2, "day");
    return current.isBefore(today, "day") || current.isAfter(maxDate, "day");
  };

  // 🟢 Khi chọn ngày, mở modal
  const onSelectDate = (value: Dayjs) => {
    if (disabledDate(value)) return;
    setSelectedDate(value.format("YYYY-MM-DD"));
    setTimeRange([null, null]);
    setModalVisible(true);
  };

  const isSavingRef = useRef(false); // 🛑 Tránh gọi API nhiều lần

  const handleSaveTimeSlot = async () => {
    if (isSavingRef.current) return; // Nếu đang xử lý API, không gọi lại
    isSavingRef.current = true; // Đánh dấu đang gọi API

    if (!selectedDate || !timeRange[0] || !timeRange[1]) {
      message.error("Vui lòng chọn khoảng thời gian hợp lệ.");
      isSavingRef.current = false; // ✅ Reset flag
      return;
    }

    if (!userId) {
      message.error("Không thể tạo lịch: Thiếu thông tin Reader ID.");
      isSavingRef.current = false; // ✅ Reset flag
      return;
    }

    const start = timeRange[0].format("HH:mm:ss");
    const end = timeRange[1].format("HH:mm:ss");

    try {
      await createWorkSchedule({
        readerId: userId,
        workDate: selectedDate,
        startTime: start,
        endTime: end,
        status: "Available",
        description: "Ca làm việc",
      });

      setFreeTimeSlots((prev) => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), { start, end }],
      }));

      setModalVisible(false);
      message.success(`Đã lưu thời gian làm việc: ${start} - ${end}`);
    } catch (error) {
      console.error("Lỗi API:", error);
      message.error("Không thể lưu thời gian làm việc, vui lòng thử lại.");
    }

    isSavingRef.current = false; // ✅ Reset flag sau khi hoàn thành
  };
  return (
    <div className="p-6 bg-white min-h-screen">
      <Title level={3} className="text-center text-black">
        📅 Lịch Rảnh của Bạn
      </Title>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {loading ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <Calendar
            cellRender={dateCellRender}
            onSelect={onSelectDate}
            disabledDate={disabledDate}
          />
        )}
      </div>

      <TimeSlotModal
        visible={modalVisible}
        selectedDate={selectedDate}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        existingSlots={selectedDate ? freeTimeSlots[selectedDate] || [] : []}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveTimeSlot}
      />
    </div>
  );
};

export default CreateTimeToBook;
