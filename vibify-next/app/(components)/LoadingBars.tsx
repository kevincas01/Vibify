import React from 'react';

const LoadingBars = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex justify-center items-end overflow-hidden w-[100px] h-[50px] relative gap-3">
        <div className="w-[12px] h-[10px] bg-main animate-dance" style={{ animationDelay: '100ms' }} />
        <div className="w-[12px] h-[40px] bg-main animate-dance" style={{ animationDelay: '400ms' }} />
        <div className="w-[12px] h-[30px] bg-main animate-dance" style={{ animationDelay: '500ms' }} />
        <div className="w-[12px] h-[50px] bg-main animate-dance" style={{ animationDelay: '300ms' }} />
        <div className="w-[12px] h-[10px] bg-main animate-dance" style={{ animationDelay: '100ms' }} />
      </div>
    </div>
  );
};

export default LoadingBars;
