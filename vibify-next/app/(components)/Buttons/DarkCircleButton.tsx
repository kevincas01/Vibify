import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const DarkCircleButton = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        bg-black 
        hover:bg-gray-200
        hover:text-black
        text-main 
        p-[10px]
        rounded-full
        font-bold 
        tracking-[2px] 
        uppercase 
        transition-all
        duration-5000
       
      "
    >
      {children}
    </button>
  );
};

export default DarkCircleButton;
