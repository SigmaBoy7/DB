import { React, useState, useEffect } from 'react';
import { Alert, Space } from 'antd';

function OfflineMesage() {
  const [IsOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [IsOnline]);

  return !IsOnline ? (
    <Space style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '1000' }} direction="vertical">
      <Alert message="Ваше соединения оборвалось!" description="Вероятно проблемы с вашим интернетом" type="warning" />
    </Space>
  ) : null;
}

export default OfflineMesage;
