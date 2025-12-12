import React from "react";

const DashboardAuthPreview: React.FC = () => {
  return (
    <div className="relative mx-auto w-full max-w-5xl min-h-[320px] rounded-[20px] bg-gradient-to-br from-blue-50 to-sky-100 px-3 py-4 sm:min-h-[380px] sm:px-4 sm:py-5 md:min-h-[520px]">
      <div className="absolute inset-3 rounded-[20px] bg-white shadow-xl shadow-slate-300/40 overflow-hidden flex items-center justify-center sm:inset-4">
        <img
          src="/images/Login.png"
          alt="Sync Mobile preview"
          className="h-full w-full object-cover sm:object-top"
        />
      </div>
    </div>
  );
};

export default DashboardAuthPreview;
