import React from 'react';
import { Space, Alert } from 'antd';

const AppAlert = function ({ errorDescription }) {
  const errorMessage = (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert message="Что-то пошло не так" description={errorDescription} type="error" />
    </Space>
  );

  return errorMessage;
};

export default AppAlert;
