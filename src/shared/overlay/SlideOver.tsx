import React from "react";
import { cn } from "../../utils/cn";

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  widthClassName?: string; // e.g. "max-w-sm"
}

const SlideOver: React.FC<SlideOverProps> = ({
  isOpen,
  onClose,
  children,
  widthClassName = "max-w-sm",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1200] flex items-stretch justify-end bg-black/25">
      {/* click backdrop to close */}
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-default"
        onClick={onClose}
      />

      <div
        className={cn(
          "relative h-full w-full bg-transparent p-2 sm:p-3",
          widthClassName
        )}
      >
        <div className="relative flex h-full w-full flex-col rounded-3xl bg-[#f3f4f6] shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SlideOver;
