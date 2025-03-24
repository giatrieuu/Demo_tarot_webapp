import React, { useState, useEffect } from "react";
import { message, Modal, Spin } from "antd"; // 🟢 Thêm Spin để hiển thị loading nếu cần
import TarotReaderHeader from "./TarotReaderHeader";
import TarotReaderTable from "./TarotReaderTable";
import TarotReaderCreateForm from "./TarotReaderCreateForm";
import { fetchAllReaders } from "../../../../../services/tarotReaderServices";

interface Reader {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  dob: string | null;
  status: string;
  password?: string;
}

const TarotReaderList: React.FC = () => {
  const [readers, setReaders] = useState<Reader[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  // Fetch tất cả reader
  const loadReaders = () => {
    setLoading(true);
    fetchAllReaders()
      .then((data) => setReaders(data))
      .catch(() => message.error("Không thể tải danh sách Tarot Reader."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadReaders();
  }, []);

  // Cập nhật trạng thái Block/Unblock ngay lập tức
  const handleStatusChange = (id: string, newStatus: string) => {
    setReaders((prev) =>
      prev.map((reader) =>
        reader.id === id ? { ...reader, status: newStatus } : reader
      )
    );
  };

  // Thêm mới Reader ngay lập tức
  const handleAddNewReader = (newReader: Reader) => {
    setReaders((prev) => [newReader, ...prev]);
  };

  return (
    <div className="p-5 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <TarotReaderHeader onOpenCreate={() => setIsCreateModalVisible(true)} />

      {/* Hiển thị loading nếu đang tải danh sách */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : (
        <TarotReaderTable readers={readers} onStatusChange={handleStatusChange} />
      )}

      {/* Modal Create */}
      <Modal
        title="Thêm Tarot Reader"
        open={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
      >
        <TarotReaderCreateForm
          onClose={() => setIsCreateModalVisible(false)}
          onSuccess={handleAddNewReader}
        />
      </Modal>
    </div>
  );
};

export default TarotReaderList;
