import React from "react";
import { ButtonType } from "../../utilities/types";

type ButtonProps = {
  type: ButtonType;
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = ({ type, children, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
    >
      {children}
    </button>
  );
};

export default Button;
