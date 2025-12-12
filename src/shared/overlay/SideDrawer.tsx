import React, { useEffect } from "react";

type SideDrawerProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  widthClassName?: string; // e.g. "w-[420px]"
};

const SideDrawer: React.FC<SideDrawerProps> = ({
  open,
  onClose,
  title,
  children,
  widthClassName = "w-[420px] max-w-[92vw]",
}) => {
  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
        aria-hidden
      />

      {/* panel */}
      <div
        className={`absolute right-3 top-3 bottom-3 ${widthClassName} rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="text-sm font-semibold text-gray-900">
            {title ?? "Details"}
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center"
            aria-label="Close"
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-auto p-5">{children}</div>
      </div>
    </div>
  );
};

export default SideDrawer;
