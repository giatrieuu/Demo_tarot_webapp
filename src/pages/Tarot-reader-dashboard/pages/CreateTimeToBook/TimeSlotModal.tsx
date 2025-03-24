import React from "react";
import { Modal, TimePicker, Button } from "antd";
import type { Dayjs } from "dayjs";

interface TimeSlotModalProps {
  visible: boolean;
  selectedDate: string | null;
  timeRange: [Dayjs | null, Dayjs | null];
  setTimeRange: (range: [Dayjs | null, Dayjs | null]) => void;
  existingSlots: { start: string; end: string }[]; // ✅ Thêm dòng này
  onClose: () => void;
  onSave: () => void;
}

const TimeSlotModal: React.FC<TimeSlotModalProps> = ({
  visible,
  selectedDate,
  timeRange,
  setTimeRange,
  onClose,
  onSave,
}) => {
  return (
    <Modal
      title={`Chọn thời gian rảnh cho ${selectedDate}`}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="save" type="primary" onClick={onSave}>
          Lưu
        </Button>,
      ]}
    >
      <TimePicker.RangePicker
        value={timeRange}
        onChange={(range) => setTimeRange(range ?? [null, null])}
        format="HH:mm"
        minuteStep={15}
        className="w-full"
        hideDisabledOptions
        disabledHours={() =>
          Array.from({ length: 24 }, (_, i) =>
            i < 7 || i > 18 ? i : -1
          ).filter((i) => i !== -1)
        }
        disabledMinutes={(selectedHour) =>
          selectedHour < 7 || selectedHour > 18
            ? Array.from({ length: 60 }, (_, i) => i)
            : []
        }
      />
    </Modal>
  );
};

export default TimeSlotModal;
