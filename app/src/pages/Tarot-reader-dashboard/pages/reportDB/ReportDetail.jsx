import { Badge, Button, Col, Descriptions, Flex, Image, Modal, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../../config/axios'
import TextArea from 'antd/es/input/TextArea'
import { alertFail, alertReport, alertSuccess } from '../../../../hook/useNotification'

function ReportDetail() {
    const { reportId } = useParams()
    const [report, setReport] = useState('')
    const [open, setOpen] = useState(false)
    const [openReject, setOpenReject] = useState(false)
    const [comment, setComment] = useState(null)
    const nav = useNavigate()

    const getReport = async () => {
        try {
            const res = await api.get(`/course/report/${reportId}`)
            setReport(res.data.data)
        } catch (error) {}
    }

    useEffect(() => {
        getReport()
    }, [])

    const items = [
        {
            key: '1',
            label: 'Report ID',
            children: report?.reportId,
        },
        {
            key: '2',
            label: 'Course ID',
            children: report?.courseId,
        },
        {
            key: '8',
            label: 'Update At',
            children: report?.updateAt?.substring(0, 10),
        },
        {
            key: '3',
            label: 'Course Name',
            children: report?.courseName,
        },
        {
            key: '4',
            label: 'Report By',
            children: report?.reportUser?.fullName,
        },
        {
            key: '5',
            label: 'Status User',
            children: (
                <>
                    {' '}
                    {!report?.reportUser?.isActive ? (
                        <Badge
                            status="processing"
                            text="Disabled"
                            color="red"
                        />
                    ) : report?.reportUser?.isActive ? (
                        <Badge
                            status="processing"
                            text="Active"
                            color="green"
                        />
                    ) : null}
                </>
            ),
        },
        {
            key: '10',
            label: 'Evidence',
            children: (
                <Row>
                    <Col md={8}>
                        <div className="course">
                            <Image
                                style={{
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                }}
                                height={'100%'}
                                width={'100%'}
                                preview={false}
                                src={
                                    // course?.thumbnailImage?.accessUrl ||
                                    'https://firebasestorage.googleapis.com/v0/b/course-5f371.appspot.com/o/404image.png?alt=media&token=471fcb30-1cba-4fcb-add1-a75e8aa21ebb'
                                }
                            />
                        </div>
                    </Col>
                </Row>
            ),
        },
    ]

    const handleAction = async (isApprove) => {
        const newRequest = {
            isApprove: isApprove,
            reportId: report?.reportId,
            comment: comment,
        }

        try {
            const response = await api.put(
                `/course/report/${reportId}/resolve`,
                newRequest,
            )
            alertSuccess(
                isApprove ? 'Approve successfully!' : 'Reject successfully!',
            )
            nav('/dashboard/report')
        } catch (e) {
            if (e.response && e.response.status === 400) {
                alertReport('This course has been solved.');
                setOpen(false);
            } else {
                alertFail(isApprove ? 'Approve unsuccessfully!' : 'Reject unsuccessfully!');
            }
        }
    }

    return (
        <div className="mode">
            <Descriptions
                title="Report detail"
                layout="vertical"
                bordered
                items={items}
            />
            <Flex
                align="center"
                justify="end"
                gap={10}
                style={{ marginTop: '1em' }}
            >
                <Button className="mode__submit" onClick={() => setOpen(!open)}>
                    Approve
                </Button>
                <Button
                    className="mode__submit"
                    onClick={() => setOpenReject(!openReject)}
                >
                    Reject
                </Button>
            </Flex>
            <Modal
                title={<div style={{ fontSize: '1em' }}>Confirm approve</div>}
                open={open}
                onOk={() => handleAction(true)}
                onCancel={() => setOpen(!open)}
                footer={null}
                width={400}
            >
                <p>Are you sure approve this report?</p>
                <TextArea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="Please input your comment"
                    maxLength={50}
                />
                <Flex
                    align="center"
                    justify="end"
                    gap={10}
                    style={{ marginTop: '1em' }}
                >
                    <Button
                        className="mode__submit"
                        onClick={() => handleAction(true)}
                    >
                        Approve
                    </Button>
                </Flex>
            </Modal>
            <Modal
                title={<div style={{ fontSize: '1em' }}>Confirm reject</div>}
                open={openReject}
                onOk={() => handleAction(false)}
                onCancel={() => setOpenReject(!openReject)}
                footer={null}
                width={400}
            >
                <p>Are you sure reject this report?</p>
                <TextArea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="Please input your comment"
                    maxLength={50}
                />
                <Flex
                    align="center"
                    justify="end"
                    gap={10}
                    style={{ marginTop: '1em' }}
                >
                    <Button
                        className="mode__submit"
                        onClick={() => handleAction(false)}
                    >
                        Reject
                    </Button>
                </Flex>
            </Modal>
        </div>
    )
}

export default ReportDetail
