import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="
        bg-main 
        hover:bg-main/80 
        text-white 
        py-[17px] 
        px-[35px] 
        rounded-full
        min-w-[160px] 
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
    >
      {children}
    </button>
  );
};

export default Button;
