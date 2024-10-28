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
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import AppHeader from "../../components/header/HeaderLogged";
import TarotReaderSidebar from "../../components/sidebar/TarotReaderSidebar";
import ApiService from "../../services/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const { Content } = Layout;

const CardDeckManager: React.FC = () => {
  const [showMenu] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [cardDecks, setCardDecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCardDeckName, setNewCardDeckName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [description, setDescription] = useState(""); // New state for description
  const [form] = Form.useForm();
  const userId = useSelector((state: RootState) => state.auth.userId);

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

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("Name", newCardDeckName);
      formData.append("image", imageFile); // Image file
      formData.append("ReaderId", userId); // ReaderId from Redux
      formData.append("Description", description); // Append the description

      // Call the API to create a group card
      const response = await ApiService.createGroupCard(
        newCardDeckName,
        imageFile,
        userId,
        description // Pass the description to the API service
      );

      // Add the newly created card deck to the list
      setCardDecks([...cardDecks, { id: response.id, name: newCardDeckName, description }]);

      message.success("Card deck created successfully!");
      setIsModalVisible(false);
      setNewCardDeckName("");
      setImageFile(null);
      setDescription(""); // Reset the description
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
    setDescription(""); // Reset the description
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      align: "center" as "center",
      width: "10%",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Card Deck Name",
      dataIndex: "name",
      key: "name",
      align: "left" as "left",
      width: "60%",
    },
    {
      title: "Description", // New column for description
      dataIndex: "description",
      key: "description",
      align: "left" as "left",
      width: "20%",
    },
    {
      title: "Action",
      key: "action",
      align: "center" as "center",
      width: "20%",
      render: (_: any, record: any) => (
        <div className="flex justify-center space-x-2">
          <Tooltip title="Edit">
            <Button
              type="primary"
              shape="round"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record.id, record.name)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="primary"
              shape="round"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id, record.name)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />
      <Layout>
        <TarotReaderSidebar showMenu={showMenu} />
        <Layout className={`transition-all duration-300 ${showMenu ? "ml-56" : "ml-0"}`}>
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
              rowSelection={{
                selectedRowKeys,
                onChange: setSelectedRowKeys,
              }}
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
                      setImageFile(file); // Manually set the image file
                      return false; // Prevent automatic upload
                    }}
                    onRemove={() => setImageFile(null)} // Handle file removal
                  >
                    <Button icon={<UploadOutlined />}>Choose files</Button>
                  </Upload>
                </Form.Item>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CardDeckManager;
