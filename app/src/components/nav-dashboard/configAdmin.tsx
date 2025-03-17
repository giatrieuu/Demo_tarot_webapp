import { StockOutlined } from '@ant-design/icons'
import { PiStudent } from 'react-icons/pi'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { GrTransaction } from 'react-icons/gr'
import { BiSolidFlag } from 'react-icons/bi'
import { AiOutlineLogout } from 'react-icons/ai'

import { FiUsers } from 'react-icons/fi'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import { FaBell } from 'react-icons/fa'

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
                label: 'Admin',
            },
        ],
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

export const navpathAdmin = {
    1: {
        path: '/admin/overview',
    },
    21: {
        path: '/admin/manage-tarot-reader',
    },
    22: {
        path: '/admin/instructors',
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
        path: '/admin/orders',
    },
}


export default navDashboardConfigAdmin
