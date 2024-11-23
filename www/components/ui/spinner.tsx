import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-4 border-t-black rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;