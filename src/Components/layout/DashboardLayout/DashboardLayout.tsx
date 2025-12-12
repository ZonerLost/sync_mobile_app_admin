import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

const LG_MIN_WIDTH = 1024;

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const location = useLocation();

  // Close sidebar after navigation on mobile/tablet
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < LG_MIN_WIDTH) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  // Prevent background scroll when sidebar is open (mobile/tablet)
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const isDesktop = window.matchMedia(`(min-width:${LG_MIN_WIDTH}px)`).matches;
    if (isDesktop) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = isSidebarOpen ? "hidden" : prev;

    return () => {
      document.body.style.overflow = prev;
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <main className="flex-1 p-3 sm:p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
