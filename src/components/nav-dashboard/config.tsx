import { StockOutlined } from '@ant-design/icons'
import { LuBox } from 'react-icons/lu'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { GrTransaction } from 'react-icons/gr'

import { IoMdBook } from 'react-icons/io'
import { AiOutlineLogout } from 'react-icons/ai'

import { FiUsers } from 'react-icons/fi'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'

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
        path: '/tarot-reader/topics',
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
