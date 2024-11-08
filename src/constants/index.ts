export const ROLES = {
    CUSTOMER: "1",
    ADMIN: "2",
    TAROT_READER: "3",
};

export const ERROR = {
    ERROR500: '/500',
    ERROR403: '/403',
    ERROR404: '/404',
};
export const ADMIN = {
    ADMIN_DASHBOARD: '/admin/admin-dashboard',
    USER_MANAGEMENT: '/admin/manage-users',
    TOPIC_MANAGEMENT: '/admin/manage-topic',
    BLOG_MANAGEMENT: '/admin/manage-blogs',
    ADD_BLOG: '/admin/manage-blogs/create-blog',
    EDIT_BLOG: '/admin/manage-blogs/edit-blog',


}
export const TAROT_READER = {
    TAROT_READER_DASHBOARD: '/tarot-reader/tarot-reader-dashboard',
    TAROT_READER_DASHBOARD_CALENDAR: '/tarot-reader/manage-bookings',
    TAROT_READER_DASHBOARD_POST: '/tarot-reader/post-manager',
    TAROT_READER_DASHBOARD_ADD_BLOG: '/tarot-reader/manage-blog/create-blog',
    TAROT_READER_DASHBOARD_EDIT_BLOG: '/tarot-reader/manage-blog/edit-blog',
    TAROT_READER_DASHBOARD_CARD_DECK: '/tarot-reader/card-deck-manager',
    TAROT_READER_DASHBOARD_LIST_CARD: '/tarot-reader/card-deck-manager',
    TAROT_READER_DASHBOARD_CARD_DECK_UPLOAD: '/tarot-reader/card-deck-upload',
    TAROT_READER_DASHBOARD_CARD_LIST: '/tarot-reader/card-list-manage',
    TAROT_READER_DASHBOARD_BLOG: '/tarot-reader/manage-blog',
    
};
export const USER = {
    MY_BOOKING: '/my-booking',

}
export const PUBLIC = {
    HOME: '/homepage',
    LOGIN: '/login',
    FORGOT_PASSWORD: '/forgot-password',
    CHANGE_PASSWORD: '/change-password',
    REGISTER: '/register',
    LIST_READERS: '/list-tarot-reader',
    BLOG: '/blog',
    READER_DETAIL: '/reader-detail/:readerId',
    PROFILE: '/profile/me',
    CARD_DRAW: '/card-draw',
    CARD_MEANING: '/card-meaning',
    BLOG_DETAIL: '/post-detail/:id',
};

export const AdminSidebarData = {
  MenuAdminItems: [
    { key: "/admin/admin-dashboard", label: "Dashboard", icon: "DashboardOutlined" },
    { key: "/admin/manage-users", label: "User Management", icon: "UserOutlined" },
    { key: "/admin/manage-topic", label: "Topic Management", icon: "TagsOutlined" },
    { key: "/admin/manage-blogs", label: "Blogs", icon: "FileTextOutlined" },
  ],
};

export const TarotReaderSidebarData = {
    MenuTarotReaderItems: [
      { "key": "/tarot-reader/tarot-reader-dashboard", "label": "Dashboard", "icon": "AppstoreOutlined" },
      { "key": "/tarot-reader/manage-bookings", "label": "Bookings Manage", "icon": "CalendarOutlined" },
      { "key": "/tarot-reader/card-deck-manager", "label": "Card Management", "icon": "ToolOutlined" },
      { "key": "/tarot-reader/manage-blog", "label": "Blog Manage", "icon": "FileTextOutlined" },
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