import React from "react";
import { cn } from "../../utils/cn";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message?: string;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-16 text-center text-gray-500",
        className
      )}
    >
      {icon && <div className="mb-4 text-4xl">{icon}</div>}
      <div className="text-base font-semibold text-gray-900">
        {title}
      </div>
      {message && (
        <p className="mt-1 text-sm text-gray-500">{message}</p>
      )}
    </div>
  );
};

export default EmptyState;
