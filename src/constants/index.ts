export const PUBLIC = {
  HOME: "/homepage",
  LOGIN: "/login",
  VERIFY: "/verify-email/verify",
  FORGOT_PASSWORD: "/forgot-password",
  CHANGE_PASSWORD: "/change-password",
  REGISTER: "/register",
  LIST_READERS: "/list-tarot-reader",
  BLOG: "/blog",
  READER_DETAIL: "/reader-detail/:readerId",
  PROFILE: "/profile/me",
  CARD_DRAW: "/card-draw",
  CARD_MEANING: "/card-meaning",
  BLOG_DETAIL: "/post-detail/:id",
  VIDEO_CALL: "/video-call/:bookingId",
};
export const USER = {
  MYBOOKING: "/mybooking",
};
export const TAROT_READER = {
  TAROT_READER_DASHBOARD_OVERVIEW: "/tarot-reader/overview",
  TAROT_READER_DASHBOARD_PROFILE: "/tarot-reader/profile",
  TAROT_READER_DASHBOARD_TOPIC: "/tarot-reader/topics",

  TAROT_READER_DASHBOARD_CALENDAR: "/tarot-reader/manage-bookings",
  TAROT_READER_DASHBOARD_CREATE_TIME: "/tarot-reader/create-time",
  TAROT_READER_DASHBOARD_ORDERS: "/tarot-reader/orders",
  TAROT_READER_DASHBOARD_ADD_BLOG: "/tarot-reader/manage-blog/create-blog",
  TAROT_READER_DASHBOARD_EDIT_BLOG: "/tarot-reader/manage-blog/edit-blog",
  TAROT_READER_DASHBOARD_CARD_DECK: "/tarot-reader/card-deck-manager",
  TAROT_READER_DASHBOARD_LIST_CARD: "/tarot-reader/card-deck-manager",
  TAROT_READER_DASHBOARD_CARD_DECK_UPLOAD: "/tarot-reader/card-deck-upload",
  TAROT_READER_DASHBOARD_CARD_LIST: "/tarot-reader/card-list-manage",
  TAROT_READER_DASHBOARD_BLOG: "/tarot-reader/manage-blog",
};

export const ADMIN = {
  ADMIN_DASHBOARD: "/admin/overview",
  TAROTREADER_MANAGEMENT: "/admin/manage-tarot-reader",
  TOPIC_MANAGEMENT: "/admin/manage-topics",
  BLOG_MANAGEMENT: "/admin/manage-blogs",
  TRANSACTION: "/admin/transactions",
};
