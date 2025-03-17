import { StockOutlined } from '@ant-design/icons'
import { LuBox } from 'react-icons/lu'
import { PiStudent } from 'react-icons/pi'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { GrTransaction } from 'react-icons/gr'
import { BiSolidFlag } from 'react-icons/bi'
import { IoMdBook } from 'react-icons/io'
import { AiOutlineLogout } from 'react-icons/ai'

import { FiUsers } from 'react-icons/fi'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import { FaBell } from 'react-icons/fa'

export const navDashboardConfig = [
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
                label: 'Topic',
            },
            {
                key: '22',
                icon: <FaChalkboardTeacher style={{ fontSize: '1.4em' }} />,
                label: 'Blog',
            },
            {
                key: '23',
                icon: (
                    <MdOutlineAdminPanelSettings
                        style={{ fontSize: '1.4em' }}
                    />
                ),
                label: 'Create time to book',
            },
        ],
    },
    {
        key: '3',
        icon: <IoMdBook style={{ fontSize: '1.4em' }} />,
        label: 'Booking',
    },
    {
        key: '4',
        icon: <LuBox style={{ fontSize: '1.4em' }} />,
        label: 'Profile',
    },

    // {
    //     key: '5',
    //     icon: <GrTransaction style={{ fontSize: '1.4em' }} />,
    //     label: 'Transaction',
    // },
    {
        key: '9',
        icon: <GrTransaction style={{ fontSize: '1.4em' }} />,
        label: 'Orders',
    },
    {
        key: '6',
        icon: <BiSolidFlag style={{ fontSize: '1.4em' }} />,
        label: 'Report',
    },
    {
        key: '8',
        icon: <FaBell style={{ fontSize: '1.3em' }} />,
        label: 'Notifications',
    },
    {
        key: '7',
        icon: <AiOutlineLogout style={{ fontSize: '1.4em' }} />,
        label: 'Logout',
    },
]

export const navpath = {
    1: {
        path: '/tarot-reader/overview',
    },
    21: {
        path: '/tarot-reader/students',
    },
    22: {
        path: '/tarot-reader/manage-blog',
    },
    23: {
        path: '/tarot-reader/create-time',
    },
   
   
    3: {
        path: '/tarot-reader/manage-bookings',
    },
    4: {
        path: '/tarot-reader/profile',
    },
    5: {
        path: '/tarot-reader/transaction',
    },
    6: {
        path: '/tarot-reader/report',
    },
    8: {
        path: '/tarot-reader/notification',
    },
    
    9: {
        path: '/tarot-reader/orders',
    },
}


export default navDashboardConfig
