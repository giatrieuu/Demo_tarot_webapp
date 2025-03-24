import { Table, Tag } from 'antd'

function Transaction() {
    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
            render: (text) => <p style={{ textAlign: 'left' }}>{text}</p>,
        },
        {
            title: 'TransactionID',
            dataIndex: 'transactionId',
            key: 'transactionId',
            render: (text) => <p style={{ textAlign: 'left' }}>{text}</p>,
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => <p>${text}</p>,
        },

        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'green' : 'green'
                        if (tag === 'widthdraw') {
                            color = 'volcano'
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        )
                    })}
                </>
            ),
        },
    ]
    const data = [
        {
            key: '1',
            transactionId: 10278934,
            from: 'John Brown',
            to: 'Jenny',
            amount: 300,
            date: 'June 4, 2024',
            tags: ['transfer'],
        },
        {
            key: '2',
            transactionId: 14645684,
            from: 'Jim Green',
            to: 'Joe Black',
            amount: 420,
            date: 'June 19, 2024',
            tags: ['transfer'],
        },
        {
            key: '3',
            transactionId: 12563434,
            from: 'Joe Black',
            to: 'John Doe',
            amount: 320,
            date: 'July 15, 2024',
            tags: ['transfer'],
        },
    ]

    return (
        <div className="mode">
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default Transaction
