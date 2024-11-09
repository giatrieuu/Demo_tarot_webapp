import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Button,
  Tooltip,
  Modal,
  Input,
  Form,
  message,
  Upload,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const { Content } = Layout;

const CardDeckManager: React.FC = () => {
  const [cardDecks, setCardDecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCardDeckName, setNewCardDeckName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const userId = useSelector((state: RootState) => state.auth.userId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (userId) {
          const data = await ApiService.fetchGroupCardsByReaderId(userId, 1, 10);
          setCardDecks(data);
        }
      } catch (error) {
        message.error("Failed to load card decks");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleCreateCardDeck = async () => {
    if (!newCardDeckName.trim() || !imageFile || !description.trim()) {
      message.error("Card deck name, image, and description are required");
      return;
    }

    // Ensure userId is not null
    if (!userId) {
      message.error("User ID is required to create a card deck");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("Name", newCardDeckName);
      formData.append("image", imageFile);
      formData.append("ReaderId", userId); // TypeScript knows userId is a string here
      formData.append("Description", description);

      const response = await ApiService.createGroupCard(newCardDeckName, imageFile, userId, description);
      setCardDecks([...cardDecks, { id: response.id, name: newCardDeckName, description }]);
      
      message.success("Card deck created successfully!");
      setIsModalVisible(false);
      setNewCardDeckName("");
      setImageFile(null);
      setDescription("");
    } catch (error) {
      message.error("Failed to create card deck");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewCardDeckName("");
    setImageFile(null);
    setDescription("");
  };

  // Function to navigate to the list card by group card page
  const handleAddCard = (groupCardId: string) => {
    navigate(`/tarot-reader/card-list-manage/${groupCardId}`);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      align: "center" as const,
      width: "10%",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Card Deck Name",
      dataIndex: "name",
      key: "name",
      align: "left" as const,
      width: "30%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "left" as const,
      width: "40%",
    },
    {
      title: "Action",
      key: "action",
      align: "center" as const,
      width: "20%",
      render: (_: any, record: any) => (
        <div className="flex justify-center space-x-2">
          <Tooltip title="Add Card">
            <Button
              type="primary"
              shape="round"
              icon={<PlusCircleOutlined />}
              onClick={() => handleAddCard(record.id)} // Navigate to the list card page
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Content style={{ padding: "24px" }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Card Deck Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          + Create Card Deck
        </Button>
      </div>
      <p className="mb-6">Manage all your card decks from this panel.</p>

      <Table
        dataSource={cardDecks}
        columns={columns}
        rowKey="id"
        pagination={false}
        loading={loading}
      />

      <Modal
        title="Create New Card Deck"
        visible={isModalVisible}
        onOk={handleCreateCardDeck}
        onCancel={handleCancel}
        okText="Create"
        cancelText="Cancel"
        centered
      >
        <Form layout="vertical">
          <Form.Item label="Card Deck Name">
            <Input
              value={newCardDeckName}
              onChange={(e) => setNewCardDeckName(e.target.value)}
              placeholder="Enter card deck name"
            />
          </Form.Item>

          <Form.Item label="Description">
            <Input.TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </Form.Item>

          <Form.Item label="Image">
            <Upload
              maxCount={1}
              beforeUpload={(file) => {
                setImageFile(file);
                return false;
              }}
              onRemove={() => setImageFile(null)}
            >
              <Button icon={<UploadOutlined />}>Choose files</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};

export default CardDeckManager;
