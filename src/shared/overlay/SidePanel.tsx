import React, { type ReactNode, useEffect } from "react";

type SidePanelProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  /** Optional description under title */
  description?: string;
};

const SidePanel: React.FC<SidePanelProps> = ({
  isOpen,
  title,
  description,
  children,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/30">
      {/* click outside */}
      <button
        className="flex-1 cursor-default"
        aria-label="Close panel"
        onClick={onClose}
      />

      <aside
        className="h-full w-full max-w-md bg-white shadow-xl sm:rounded-l-3xl"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div>
            <h2 className="text-sm font-medium text-neutral-900">{title}</h2>
            {description && (
              <p className="mt-1 text-xs text-neutral-500">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          >
            ×
          </button>
        </div>

        <div className="h-[calc(100%-56px)] overflow-y-auto px-6 pb-6 pt-4">
          {children}
        </div>
      </aside>
    </div>
  );
};

export default SidePanel;
