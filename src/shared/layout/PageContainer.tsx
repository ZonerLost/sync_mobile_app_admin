import React from "react";
import { cn } from "../../utils/cn";

interface PageContainerProps {
  children: React.ReactNode;
  /** When true, content stretches edge-to-edge (e.g. map + table). */
  fullWidth?: boolean;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  fullWidth,
  className,
}) => {
  return (
    <div
      className={cn(
        "min-h-[calc(100vh-56px)] bg-[#f3f4f6] px-3 pb-6 pt-4 md:px-6",
        fullWidth ? "" : "max-w-6xl",
        fullWidth ? "" : "mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageContainer;
