import React from "react";
import DashboardAuthPreview from "./DashboardAuthPreview";

interface AuthShellProps {
  children: React.ReactNode;
}

const AuthShell: React.FC<AuthShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen  bg-[#f3f5f9] text-gray-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col lg:flex-row">
        {/* LEFT: auth content */}
        <div className="flex w-full flex-col px-6 py-8 sm:px-10 lg:w-[420px] lg:py-10">
          {/* Logo */}
          <div className="flex h-14 items-center mt-10 border-b border-gray-100 px-4">
            <div className="flex items-center mt-14 gap-2">
              <img
                src="/images/logo.png"
                alt="sync mobile logo"
                className="h-8 w-30 rounded-lg "
              />
            </div>
          </div>

          <div className="flex-1">{children}</div>
        </div>

        {/* RIGHT: dashboard preview */}
        <div className="hidden flex-1 items-stretch lg:flex">
          <DashboardAuthPreview />
        </div>
      </div>
    </div>
  );
};

export default AuthShell;
