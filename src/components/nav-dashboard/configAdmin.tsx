import { StockOutlined } from '@ant-design/icons';
import { PiStudent } from 'react-icons/pi';
import { GrTransaction } from 'react-icons/gr';
import { AiOutlineLogout } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { GiCrystalBall } from 'react-icons/gi'; // Import the new icon for Topic

export const navDashboardConfigAdmin = [
    {
        key: '1',
        icon: <StockOutlined />,
        label: 'Overview',
    },
    {
        key: '2',
        icon: <FiUsers style={{ fontSize: '1.4em' }} />,
        label: 'Services',
        children: [
            {
                key: '21',
                icon: <PiStudent style={{ fontSize: '1.4em' }} />,
                label: 'Tarot reader',
            },
            {
                key: '22',
                icon: <GiCrystalBall style={{ fontSize: '1.4em' }} />,
                label: 'Topic',
            },
        ],
    },
    {
        key: '9',
        icon: <GrTransaction style={{ fontSize: '1.4em' }} />,
        label: 'Transactions',
    },
    {
        key: '7',
        icon: <AiOutlineLogout style={{ fontSize: '1.4em' }} />,
        label: 'Logout',
    },
];

export const navpathAdmin = {
    1: {
        path: '/admin/overview',
    },
    21: {
        path: '/admin/manage-tarot-reader',
    },
    22: {
        path: '/admin/manage-topics', // New path for Topic
    },
    23: {
        path: '/admin/admin',
    },
    3: {
        path: '/admin/manage-bookings',
    },
    4: {
        path: '/admin/profile',
    },
    5: {
        path: '/admin/transaction',
    },
    6: {
        path: '/admin/report',
    },
    8: {
        path: '/admin/notification',
    },
    9: {
        path: '/admin/transactions',
    },
};

export default navDashboardConfigAdmin;