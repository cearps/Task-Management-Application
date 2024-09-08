import React from "react";
import { ButtonType } from "../../utilities/types";

type ButtonProps = {
  type?: ButtonType; // Make the type optional for non-submit buttons
  children: React.ReactNode;
  onClick?: () => void;
  className?: string; 
};

const Button = ({ type = "button", children, onClick, className = "" }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md ${className}`} 
    >
      {children}
    </button>
  );
};

export default Button;
