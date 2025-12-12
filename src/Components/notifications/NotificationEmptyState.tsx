import React from "react";

const NotificationsEmptyState: React.FC = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 py-6 text-center sm:px-6 md:px-8">
      {/* icon / emoji */}
      <div className="mb-3 text-4xl sm:text-5xl md:text-6xl">🔔</div>

      <div className="text-base font-semibold text-gray-900 sm:text-lg">
        No Notifications Yet
      </div>

      <div className="mt-1 max-w-md text-xs leading-relaxed text-gray-500 sm:text-sm">
        You’ll see admin alerts here when reports are generated or activity needs
        your attention.
      </div>
    </div>
  );
};

export default NotificationsEmptyState;
