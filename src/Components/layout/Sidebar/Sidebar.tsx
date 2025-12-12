import React from "react";
import { NavLink, useLocation, matchPath, useNavigate } from "react-router-dom";
import {
  sidebarItems,
  type SidebarSectionItem,
} from "../../../config/sidebarItems";
import type { IconType } from "react-icons";
import {
  FiChevronDown,
  FiChevronUp,
  FiLogOut,
  FiX,
} from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(
    {}
  );
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

  // Expand section if current route is inside it
  React.useEffect(() => {
    const current: Record<string, boolean> = {};
    sidebarItems.forEach((item) => {
      if (item.type === "section") {
        current[item.label] = item.children.some((child) =>
          !!matchPath({ path: child.path, end: false }, location.pathname)
        );
      }
    });
    setOpenSections((prev) => ({ ...prev, ...current }));
  }, [location.pathname]);

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const renderIcon = (Icon?: IconType) =>
    Icon ? <Icon className="mr-3 h-4 w-4 flex-shrink-0" /> : null;

  const baseLinkClasses =
    "flex w-full items-center px-3 py-2 text-[13px] rounded-md transition-colors cursor-pointer text-left whitespace-normal";
  const activeClasses = "bg-blue-50 text-blue-600 font-medium";
  const inactiveClasses =
    "text-gray-700 hover:bg-gray-100 hover:text-gray-900";

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    onClose();
    navigate("/login", { replace: true });
  };

  const openLogout = () => {
    onClose(); // important for mobile/tablet
    setShowLogoutConfirm(true);
  };

  return (
    <>
      {/* Backdrop (mobile/tablet only) */}
      <div
        className={`fixed inset-0 z-[1000] bg-black/30 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      <aside
        className={[
          // Base (mobile/tablet off-canvas)
          "fixed inset-y-0 left-0 z-[1100] flex flex-col border-r border-gray-200 bg-white shadow-xl",
          "w-[86vw] max-w-[340px] transition-transform",

          // Desktop/Laptop: sticky + full height (does not move while scrolling)
          "lg:sticky lg:top-0 lg:z-30 lg:h-dvh lg:w-64 lg:max-w-none lg:translate-x-0 lg:shadow-none lg:flex-shrink-0",

          // Slide behavior only for < lg
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b border-gray-100 px-4">
          <div className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="sync mobile logo"
              className="h-8 w-auto rounded-lg"
            />
          </div>

          {/* Close (mobile/tablet only) */}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Label */}
        <div className="px-4 pt-3 text-[11px] uppercase tracking-wide text-gray-400">
          Overview
        </div>

        {/* Nav (IMPORTANT: min-h-0 for proper scroll inside sidebar) */}
        <nav className="mt-2 flex-1 min-h-0 overflow-y-auto px-2 pb-6 lg:pb-8">
          <ul className="space-y-1">
            {sidebarItems.map((item) =>
              item.type === "link" ? (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      [
                        baseLinkClasses,
                        isActive ? activeClasses : inactiveClasses,
                      ].join(" ")
                    }
                  >
                    {renderIcon(item.icon)}
                    <span className="min-w-0">{item.label}</span>
                  </NavLink>
                </li>
              ) : (
                <SidebarSection
                  key={item.label}
                  section={item}
                  isOpen={!!openSections[item.label]}
                  toggle={() => toggleSection(item.label)}
                  onLinkClick={onClose}
                  currentPath={location.pathname}
                />
              )
            )}
          </ul>
        </nav>

        {/* Logout */}
        <button
          type="button"
          onClick={openLogout}
          className="flex items-center gap-2 border-t border-gray-100 px-4 py-3 text-[13px] text-red-500 hover:bg-red-50"
        >
          <FiLogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Logout Confirm */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl shadow-slate-400/30">
            <h3 className="text-lg font-semibold text-gray-900">Log out?</h3>
            <p className="mt-2 text-sm text-gray-600">
              You will be returned to the login page.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface SidebarSectionProps {
  section: SidebarSectionItem;
  isOpen: boolean;
  toggle: () => void;
  onLinkClick: () => void;
  currentPath: string;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  section,
  isOpen,
  toggle,
  onLinkClick,
  currentPath,
}) => {
  const hasActiveChild = section.children.some((child) =>
    !!matchPath({ path: child.path, end: false }, currentPath)
  );

  const baseLinkClasses =
    "flex w-full items-center px-3 py-2 text-[13px] rounded-md transition-colors cursor-pointer text-left whitespace-normal";
  const activeClasses = "bg-blue-50 text-blue-600 font-medium";
  const inactiveClasses =
    "text-gray-700 hover:bg-gray-100 hover:text-gray-900";

  const Icon = section.icon;

  return (
    <li>
      <button
        type="button"
        onClick={toggle}
        className={[
          baseLinkClasses,
          hasActiveChild ? activeClasses : inactiveClasses,
          "w-full justify-between",
        ].join(" ")}
      >
        <span className="flex items-center min-w-0">
          {Icon && <Icon className="mr-3 h-4 w-4 flex-shrink-0" />}
          <span className="min-w-0">{section.label}</span>
        </span>

        {isOpen ? (
          <FiChevronUp className="h-4 w-4" />
        ) : (
          <FiChevronDown className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <ul className="mt-1 space-y-[2px] border-l border-gray-100 pl-4">
          {section.children.map((child) => (
            <li key={child.path}>
              <NavLink
                to={child.path}
                onClick={onLinkClick}
                className={({ isActive }) =>
                  [
                    "flex items-center px-3 py-[6px] text-[13px] rounded-md transition-colors cursor-pointer",
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                  ].join(" ")
                }
              >
                {child.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default Sidebar;
