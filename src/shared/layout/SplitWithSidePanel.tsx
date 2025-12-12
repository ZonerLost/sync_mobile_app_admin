import React from "react";
// import { cn } from "../../../utils/cn";

interface SplitWithSidePanelProps {
  main: React.ReactNode;
  side: React.ReactNode;
  /** Whether side panel is open (on desktop it is always visible). */
  sideOpen?: boolean;
  onCloseSide?: () => void;
}

const SplitWithSidePanel: React.FC<SplitWithSidePanelProps> = ({
  main,
  side,
  sideOpen = false,
  onCloseSide,
}) => {
  return (
    <div className="relative flex gap-4">
      <div className="flex-1">{main}</div>

      {/* Desktop side panel */}
      <div className="hidden w-full max-w-sm lg:block">{side}</div>

      {/* Mobile overlay side panel */}
      {sideOpen && (
        <div className="fixed inset-0 z-40 flex items-stretch justify-end bg-black/30 lg:hidden">
          <div className="h-full w-full max-w-sm bg-white shadow-xl">
            {side}
          </div>
          {onCloseSide && (
            <button
              className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs text-gray-600 shadow"
              onClick={onCloseSide}
            >
              Close
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SplitWithSidePanel;
