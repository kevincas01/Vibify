import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const DarkButton = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        bg-black 
        hover:bg-gray-200
        hover:text-black
        text-white 
        border-white
        border-[1px]
        py-[10px] 
        px-[35px] 
        rounded-full
        min-w-[160px] 
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

export default DarkButton;
