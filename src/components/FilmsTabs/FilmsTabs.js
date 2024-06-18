import React from 'react';
import { Tabs } from 'antd';

const items = [
  {
    key: 'Search',
    label: 'Search',
  },
  {
    key: 'Rated',
    label: 'Rated',
  },
];

const FilmmTabs = function ({ handleTabsChange }) {
  return <Tabs onChange={handleTabsChange} style={{ fontFamily: ['Inter', 'sans-serif'] }} centered items={items} />;
};

export default FilmmTabs;
