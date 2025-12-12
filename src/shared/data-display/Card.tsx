import React from "react";
import { cn } from "../../utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white shadow-sm ring-1 ring-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
