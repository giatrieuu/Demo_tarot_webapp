// ListCardManage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Table, Button, Tooltip, message, Modal, Image } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ApiService from "../../services/axios";
import CardModal from "./CardModal";
import AddListCardModal from "./AddListCardModal";

const { Content } = Layout;

const ListCardManage: React.FC = () => {
  const { groupCardId } = useParams<{ groupCardId: string }>();
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingCard, setEditingCard] = useState<any>(null);
  const [isAddListModalVisible, setIsAddListModalVisible] = useState(false);
  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        if (groupCardId) {
          const data = await ApiService.fetchCardsByGroupCardId(groupCardId);
          setCards(data);
        }
      } catch (error) {
        message.error("Failed to load cards");
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [groupCardId]);

  const handleDelete = async (cardId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this card?",
      onOk: async () => {
        try {
          await ApiService.deleteCard(cardId);
          setCards(cards.filter((card) => card.id !== cardId));
          message.success("Card deleted successfully");
        } catch (error) {
          message.error("Failed to delete card");
        }
      },
    });
  };

  const handleAddCard = async (values: any, imageFile: File | null) => {
    if (!imageFile) {
      message.error("Please upload an image.");
      return;
    }
    try {
      await ApiService.createCard(groupCardId!, values.element, values.name, values.message, imageFile);
      message.success("Card added successfully");
      setIsAddModalVisible(false);
      const data = await ApiService.fetchCardsByGroupCardId(groupCardId!);
      setCards(data);
    } catch (error) {
      message.error("Failed to add card");
    }
  };
  const handleAddListCards = async (cardDataList: any[]) => {
    try {
      await ApiService.createListCard(cardDataList.map(card => ({ ...card, groupId: groupCardId! })));
      setIsAddListModalVisible(false);
      const data = await ApiService.fetchCardsByGroupCardId(groupCardId!);
      setCards(data);
    } catch (error) {
      message.error("Failed to add list of cards");
    }
  };


  const handleEditCard = async (values: any, imageFile: File | null) => {
    try {
      await ApiService.updateCard(editingCard.id, groupCardId!, values.element, values.name, values.message, imageFile || undefined);
      message.success("Card updated successfully");
      setIsEditModalVisible(false);
      setEditingCard(null);
      const data = await ApiService.fetchCardsByGroupCardId(groupCardId!);
      setCards(data);
    } catch (error) {
      message.error("Failed to update card");
    }
  };

  const showEditModal = (card: any) => {
    setEditingCard(card);
    setIsEditModalVisible(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Element",
      dataIndex: "element",
      key: "element",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt: string) => new Date(createAt).toLocaleString(),
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string) => (
        <Image width={50} src={imageUrl} alt="Card Image" />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex space-x-2">
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} onClick={() => showEditModal(record)} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Content style={{ padding: "24px" }}>
      <h1 className="text-2xl font-bold mb-4">Card List Management</h1>
      
      <div className="mb-4 flex space-x-2">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalVisible(true)}>
          Add Card
        </Button>
      </div>
      <div className="mb-4 flex space-x-2">
        <Button type="dashed" icon={<PlusOutlined />} onClick={() => setIsAddListModalVisible(true)}>
          Add List Card
        </Button>
      </div>

      <Table
        dataSource={cards}
        columns={columns}
        rowKey="id"
        loading={loading}
      />

      <CardModal
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onSubmit={handleAddCard}
        title="Add New Card"
        okText="Add"
      />

      <CardModal
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onSubmit={handleEditCard}
        initialValues={editingCard}
        title="Edit Card"
        okText="Update"
      />
       <AddListCardModal
        visible={isAddListModalVisible}
        onCancel={() => setIsAddListModalVisible(false)}
        onSubmit={handleAddListCards}
        groupId={groupCardId!}
      />
    </Content>
  );
};

export default ListCardManage;
