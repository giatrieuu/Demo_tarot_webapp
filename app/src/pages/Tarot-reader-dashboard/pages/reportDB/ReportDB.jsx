import { Avatar, Button, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../../config/axios'

function ReportDB() {
    const [noti, setNoti] = useState([])
    const navigate = useNavigate()
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
            pageSizeOptions: ['5', '10'],
        },
    })

    const columns = [
        {
            title: 'No',
            dataIndex: 'reportId',
            key: 'reportId',
        },
        {
            title: 'CourseId',
            dataIndex: 'courseId',
            key: 'courseId',
        },

        {
            title: 'From',
            dataIndex: 'reportUser',
            key: 'reportUser',
            render: (reportUser) => (
                <Space>
                    <Avatar
                        style={{ marginRight: '0.5em' }}
                        src={
                            'https://scontent.fsgn2-11.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=qj3fwGIe_3cQ7kNvgEqEV_R&_nc_ht=scontent.fsgn2-11.fna&oh=00_AYDT4XOtXHAA05v2lFZ9eSBcH9kzfVTF0CiJ73tdeaXYAA&oe=66BEBFB8'
                        }
                    />
                    {reportUser?.fullName}
                </Space>
            ),
        },
        {
            title: 'To',
            dataIndex: 'courseName',
            key: 'courseName',
            render: (courseName) => <>{courseName}</>,
        },
        {
            title: 'Date',
            dataIndex: 'updateAt',
            key: 'updateAt',
            render: (text) => <>{text.substring(0, 10)}</>,
        },
        {
            title: 'Detail',
            key: 'address',
            render: (record) => (
                <>
                    <Button
                        onClick={() =>
                            navigate(`/dashboard/report/${record.reportId}`)
                        }
                    >
                        Detail
                    </Button>
                </>
            ),
        },
    ]
    const fetchCourse = async () => {
        try {
            const res = await api.get(
                `/course/report?page=${tableParams.pagination?.current - 1}&size=${tableParams?.pagination?.pageSize}&sort=createAt%2CASC`,
            )

            setNoti(res?.data?.data?.content)
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res.data.data.page.totalPages * 5,
                },
            })
        } catch (error) {}
    }
    const handleTableChange = (pagination) => {
        setTableParams({ pagination })
    }

    useEffect(() => {
        fetchCourse()
    }, [tableParams.pagination?.current, tableParams?.pagination?.pageSize])

    return (
        <div className="mode">
            <Table
                columns={columns}
                dataSource={noti}
                pagination={tableParams.pagination}
                onChange={handleTableChange}
            />
        </div>
    )
}

export default ReportDB
