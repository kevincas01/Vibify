import React from "react";

interface CircleButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  size?: number; // Optional size prop to control the size of the button
}

const CircleButton = ({ onClick, children, size = 50 }: CircleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        bg-main 
        hover:bg-main/80 
        text-white 
        rounded-full
        flex 
        items-center 
        justify-center
        font-bold 
        tracking-[2px] 
        uppercase 
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2 
        focus:ring-main 
        focus:ring-opacity-50
      "
      style={{
        width: size,
        height: size,
      }}
    >
      {children}
    </button>
  );
};

export default CircleButton;
