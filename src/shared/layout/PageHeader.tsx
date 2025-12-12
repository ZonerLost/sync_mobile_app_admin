import React from "react";
import { cn } from "../../utils/cn";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  rightSlot,
  className,
}) => {
  return (
    <div
      className={cn(
        "mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div>
        <h1 className="text-lg font-semibold text-gray-900 md:text-xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-0.5 text-xs text-gray-500 md:text-sm">
            {subtitle}
          </p>
        )}
      </div>
      {rightSlot && <div className="shrink-0">{rightSlot}</div>}
    </div>
  );
};

export default PageHeader;
