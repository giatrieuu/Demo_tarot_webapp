import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, Rate, Typography, Divider } from 'antd';
import QRCodeImage from '../assets/qr-code.jpg'; // Đường dẫn tới ảnh mã QR

const { Option } = Select;
const { Title, Paragraph, Text } = Typography;

interface BookingPopupProps {
    visible: boolean;
    onClose: () => void;
    readerData: Reader | null;
    avatarUrl: string; // Thêm prop cho avatar của reader
    topics: Topic[]; // Thêm prop cho danh sách chủ đề của reader
}

interface FormValues {
    topic?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    note?: string;
    terms?: boolean;
}

interface Reader {
    id: string;
    name: string;
    phone: string;
    email: string;
    rating: number;
    price: number;
    description: string;
    dob: string;
    status: string;
}

interface Topic {
    id: string;
    name: string;
}

const BookingPopup: React.FC<BookingPopupProps> = ({ visible, onClose, readerData, avatarUrl, topics }) => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formValues, setFormValues] = useState<FormValues>({});

    const handleNext = () => {
        setCurrentStep(2);
    };

    const handlePrevious = () => {
        setCurrentStep(1);
    };

    const handleFinish = () => {
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    const handleFormChange = (changedValues: Partial<FormValues>, allValues: FormValues) => {
        setFormValues(allValues);
    };

    return (
        <Modal
            visible={visible}
            onCancel={handleCancel}
            footer={
                currentStep === 1 ? (
                    <Button key="next" type="primary" onClick={handleNext} className="bg-blue-500 hover:bg-blue-700 text-white">
                        Next
                    </Button>
                ) : (
                    <>
                        <Button key="previous" onClick={handlePrevious}>
                            Previous
                        </Button>
                        <Button key="finish" type="primary" onClick={handleFinish} className="bg-blue-500 hover:bg-blue-700 text-white">
                            Confirm payment
                        </Button>
                    </>
                )
            }
            className="rounded-lg p-4"
        >
            {readerData && (
                <div className="text-center mb-6">
                    <img
                        src={avatarUrl} // Sử dụng URL avatar của reader ở đây
                        alt="Reader Avatar"
                        className="w-20 h-20 rounded-full mx-auto mb-4"
                    />
                    <Title level={3} className="mb-2">
                        {readerData.name}
                    </Title>
                    <Rate disabled defaultValue={readerData.rating} className="text-yellow-500 mb-2" />
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
                        <Form.Item label="Topic" name="topic">
                            <Select placeholder="Choose topic" className="w-full">
                                {topics.map((topic) => (
                                    <Option key={topic.id} value={topic.name}>
                                        {topic.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Date" name="date">
                            <Input type="date" className="w-full" />
                        </Form.Item>
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item label="Start Time" name="startTime">
                                <Input type="time" className="w-full" />
                            </Form.Item>
                            <Form.Item label="End Time" name="endTime">
                                <Input type="time" className="w-full" />
                            </Form.Item>
                        </div>
                        <Form.Item label="Note" name="note">
                            <Input.TextArea className="w-full" rows={4} />
                        </Form.Item>
                        <div className="mt-4">
                            <Text strong>Total Cost: </Text> ${readerData?.price || 0}
                        </div>
                    </>
                )}
                {currentStep === 2 && (
                    <div className="text-center">
                        <Divider />
                        <Paragraph><b>Tarot reader:</b> {readerData?.name}</Paragraph>
                        <Paragraph><b>Topic:</b> {formValues.topic}</Paragraph>
                        <Paragraph><b>Total:</b> ${readerData?.price}</Paragraph>
                        <div className="flex justify-center">
                            <img src={QRCodeImage} alt="QR Code" className="my-4 w-24 h-24" /> {/* QR Code image */}
                        </div>
                        <Paragraph>190293102323131 - TarotF - Momo</Paragraph>
                    </div>
                )}
            </Form>
        </Modal>
    );
};

export default BookingPopup;
