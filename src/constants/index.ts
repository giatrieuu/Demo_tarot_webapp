export const ROLES = {
    ADMIN: "admin",
    CUSTOMER: "customer",
    TAROT_READER: "tarot-reader",
};

export const ERROR = {
    ERROR500: '/500',
    ERROR403: '/403',
    ERROR404: '/404',
};
export const ADMIN = {
    ADMIN_DASHBOARD: '/admin-dashboard'
}
export const TAROT_READER = {
    TAROT_READER_DASHBOARD: '/tarot-reader-dashboard',
    TAROT_READER_DASHBOARD_CALENDAR: '/calendar',
    TAROT_READER_DASHBOARD_POST: '/post-manager'
};
export const PUBLIC = {
    HOME: '/homepage',
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
    REGISTER: '/register',
    LIST_READERS: '/list-tarot-reader',
    BLOG: '/blog',
    READER_DETAIL: '/reader-detail/:readerId',
    PROFILE: '/me'
   
};

export const AdminSidebarData = {
    MenuAdminItems: [
        { text: "Dashboard", icon: "AppstoreOutlined", url: "/admin_dashboard" },
        { text: "Users", icon: "UserOutlined", url: "/manage-users" },
        { text: "Transactions", icon: "DollarOutlined", url: "/manage-transactions" },
        { text: "Bookings", icon: "CalendarOutlined", url: "/manage-bookings" },
        { text: "Blogs", icon: "FileTextOutlined", url: "/manage-blogs" },
        { text: "Settings", icon: "ToolOutlined", url: "/settings" },
        { text: "Sign Out", icon: "LogoutOutlined", url: "/signout" },
    ]
};

export const TarotReaderSidebarData = {
    MenuTarotReaderItems: [
        { text: "Dashboard", icon: "AppstoreOutlined", url: "/tarot-reader-dashboard" },
    ]
};

export const CustomerSidebarData = {
    MenuCustomerItems: [
        { text: "Dashboard", icon: "AppstoreOutlined", url: "/customer-dashboard" },
    ]
};


export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};