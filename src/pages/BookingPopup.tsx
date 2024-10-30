import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, Rate, Typography, Checkbox } from 'antd';
const { Option } = Select;
const { Title, Paragraph } = Typography;

interface BookingPopupProps {
    visible: boolean;
    onClose: () => void;
}

interface FormValues {
    topic?: string;
    cardDeck?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    name?: string;
    gender?: string;
    dob?: string;
    phone?: string;
    email?: string;
    note?: string;
    terms?: boolean;
}

const BookingPopup: React.FC<BookingPopupProps> = ({ visible, onClose }) => {
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
            footer={currentStep === 1 ? [
                <Button key="next" type="primary" onClick={handleNext} className="bg-blue-500 hover:bg-blue-700 text-white">
                    Next
                </Button>,
            ] : [
                <Button key="previous" onClick={handlePrevious}>
                    Previous
                </Button>,
                <Button key="submit" type="primary" onClick={handleFinish} className="bg-blue-500 hover:bg-blue-700 text-white">
                    Finish
                </Button>,
            ]}
            className="rounded-lg p-4"
        >
            <div className="text-center mb-6">
                <img
                    src="https://via.placeholder.com/100"
                    alt="Reader Avatar"
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <Title level={3} className="mb-2">
                    Huy - Glucozo
                </Title>
                <Rate disabled defaultValue={5} className="text-yellow-500 mb-2" />
                <Paragraph className="text-gray-700 text-lg mb-4">
                    $8/Hour
                </Paragraph>
                <Paragraph className="text-gray-500 mb-4">
                    A reader with 4 years of experience, high accuracy with topics about love and study. Joined TarotF since 06/10/2024. Working all days of the week.
                </Paragraph>
            </div>
            <Form
                layout="vertical"
                className="space-y-4"
                initialValues={formValues}
                onValuesChange={handleFormChange}
            >
                {currentStep === 1 ? (
                    <>
                        <Form.Item label="Topic" name="topic">
                            <Select placeholder="Choose topic" className="w-full">
                                <Option value="love">Love</Option>
                                <Option value="study">Study</Option>
                                {/* Add more options as needed */}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Card deck" name="cardDeck">
                            <Select placeholder="Choose card deck" className="w-full">
                                <Option value="deck1">Deck 1</Option>
                                <Option value="deck2">Deck 2</Option>
                                {/* Add more options as needed */}
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
                    </>
                ) : (
                    <>
                        <Form.Item label="Name" name="name">
                            <Input className="w-full" />
                        </Form.Item>
                        <Form.Item label="Gender" name="gender">
                            <Select placeholder="Select gender" className="w-full">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                {/* Add more options as needed */}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Date of Birth" name="dob">
                            <Input type="date" className="w-full" />
                        </Form.Item>
                        <Form.Item label="Phone Number" name="phone">
                            <Input className="w-full" />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input type="email" className="w-full" />
                        </Form.Item>
                        <Form.Item label="Note" name="note">
                            <Input.TextArea className="w-full" rows={4} />
                        </Form.Item>
                        <Form.Item name="terms" valuePropName="checked">
                            <Checkbox>
                                I agree to the terms of service
                            </Checkbox>
                        </Form.Item>
                        <Form.Item label="Total Cost">
                            <Input value="$8" readOnly className="w-full" />
                        </Form.Item>
                    </>
                )}
            </Form>
        </Modal>
    );
};

export default BookingPopup;
