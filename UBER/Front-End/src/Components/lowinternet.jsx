import React, { useEffect, useState } from 'react';

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 w-full bg-yellow-100 border-b border-yellow-300 text-yellow-800 z-50 shadow-sm">
      <div className="max-w-screen-lg mx-auto px-4 py-3 text-center">
        <strong className="block text-sm font-medium">You're currently offline</strong>
        <p className="text-xs mt-1">Please check your internet connection.</p>
      </div>
    </div>
  );
};

export default ConnectionStatus;
