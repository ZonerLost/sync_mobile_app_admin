import React from "react";
import { cn } from "../../utils/cn";

interface ToolbarProps {
  children: React.ReactNode;
  className?: string;
}

const Toolbar: React.FC<ToolbarProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "mb-4 flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:gap-4 sm:p-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Toolbar;
