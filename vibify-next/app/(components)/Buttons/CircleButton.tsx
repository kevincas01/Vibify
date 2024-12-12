import React from "react";

interface CircleButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  size?: number; // Optional size prop to control the size of the button
  dark?: boolean; // Optional dark mode flag to switch button styles
}

const CircleButton = ({
  onClick,
  children,
  size = 50,
  dark = false,
}: CircleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${
          dark
            ? " bg-black hover:bg-gray-200 hover:text-black text-main  border-white "
            : "bg-main text-black hover:bg-darkMain hover:text-white "
        }
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
      `}
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
