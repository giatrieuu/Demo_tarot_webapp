import React, { useState } from 'react';
import { Table, Dropdown, Button, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

const CardDeckList: React.FC = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      name: 'Card 1',
      message: 'This is a sample message for card 1',
      element: 'Water',
      image: 'card1.jpg',
      lastModified: '10-10-2024',
    },
    {
      key: '2',
      name: 'Card 2',
      message: 'This is a sample message for card 2',
      element: 'Fire',
      image: 'card2.jpg',
      lastModified: '10-10-2024',
    },
  ]);

  const handleMenuClick = (key: string, record: any) => {
    if (key === 'edit') {
      console.log('Editing card:', record);
      // Handle edit logic
    } else if (key === 'delete') {
      console.log('Deleting card:', record);
      // Handle delete logic
      setDataSource(dataSource.filter((item) => item.key !== record.key));
    }
  };

  const columns = [
    {
      title: 'St',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'Element',
      dataIndex: 'element',
      key: 'element',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Last Modified',
      dataIndex: 'lastModified',
      key: 'lastModified',
    },
    {
      title: '',
      key: 'action',
      render: (text: any, record: any) => (
        <Dropdown
          overlay={
            <Menu
              onClick={({ key }) => handleMenuClick(key, record)}
              items={[
                { label: 'Edit', key: 'edit' },
                { label: 'Delete', key: 'delete' },
              ]}
            />
          }
          trigger={['click']}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#EDF3E8] p-10">
      <h2 className="text-2xl font-bold mb-4">Card deck 1</h2>
      <div className="flex mb-6">
        <input
          type="text"
          placeholder="Keyword"
          className="px-4 py-2 rounded-lg shadow-sm border border-gray-300 w-80"
        />
        <Button className="ml-2 px-4 py-2 bg-[#91A089] hover:bg-[#72876e] text-white">
          Search
        </Button>
      </div>
      
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        className="bg-white shadow-sm rounded-lg"
      />
    </div>
  );
};

export default CardDeckList;
