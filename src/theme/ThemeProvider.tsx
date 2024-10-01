import React from 'react';

import { ConfigProvider } from 'antd';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 8,
          colorPrimary: '#fe897e',
          colorLink: '#fe897e',
          colorLinkHover: '#fe897e',
          colorText: '#565D6DFF',
          // colorFillSecondary: '#2dacb5',
          colorFill: '#fe897e',
          colorInfo: '#379ae6',
          colorWarning: '#efb034',
          colorSuccess: '#1dd75b',
          fontFamily: 'Public Sans, sans-serif',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;