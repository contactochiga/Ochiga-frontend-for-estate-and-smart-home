'use client';

import React from 'react';

const OchigaLogo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* Logo Icon (placeholder circle) */}
      <div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
        O
      </div>
      {/* Logo Text */}
      <span className="text-xl font-bold text-gray-900">Ochiga</span>
    </div>
  );
};

export default OchigaLogo;
