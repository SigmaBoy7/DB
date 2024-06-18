import React from 'react';
import { Spin } from 'antd';

const AppSpiner = function ({ isLoading }) {
  const spiner = isLoading ? <Spin style={{ margin: '0 auto' }} size="large" /> : null;
  return spiner;
};

export default AppSpiner;
