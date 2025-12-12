import type { IconType } from "react-icons";
import {
  FiHome,
  FiBarChart2,
  FiLayers,
  FiBriefcase,
  FiUser,
} from "react-icons/fi";

export type SidebarLinkItem = {
  type: "link";
  label: string;
  path: string;
  icon?: IconType;
};

export type SidebarSectionItem = {
  type: "section";
  label: string;
  icon?: IconType;
  children: SidebarLinkItem[];
};

export type SidebarItem = SidebarLinkItem | SidebarSectionItem;

export const sidebarItems: SidebarItem[] = [
  // main overview
  {
    type: "link",
    label: "Dashboard",
    path: "/dashboard",
    icon: FiHome,
  },

  // admin reports (Owner access)
  {
    type: "section",
    label: "Reports",
    icon: FiBarChart2,
    children: [
      { type: "link", label: "Daily Locksmith Report", path: "/reports/daily-locksmiths" },
      { type: "link", label: "Weekly Locksmith Report", path: "/reports/weekly-locksmiths" },
      { type: "link", label: "Companies IN (Weekly)", path: "/reports/weekly-companies-in" },
      { type: "link", label: "Companies OUT (Weekly)", path: "/reports/weekly-companies-out" },
      { type: "link", label: "Weekly Cancellations", path: "/reports/weekly-cancelled" },
      { type: "link", label: "Operator Overview (Daily)", path: "/reports/daily-operators" },
      { type: "link", label: "Operator Overview (Weekly)", path: "/reports/weekly-operators" },
      { type: "link", label: "Operator Overview (Monthly)", path: "/reports/monthly-operators" },
      { type: "link", label: "Revenue Reports", path: "/reports/locksmith-revenue" },
    ],
  },

  // company reports
  {
    type: "section",
    label: "Company Reports",
    icon: FiLayers,
    children: [
      { type: "link", label: "Company List", path: "/company/list" },
      { type: "link", label: "Daily Company Report", path: "/company/daily" },
      { type: "link", label: "Weekly Company Report", path: "/company/weekly" },
    ],
  },

  // management
  {
    type: "section",
    label: "Management",
    icon: FiBriefcase,
    children: [
      { type: "link", label: "Locksmiths", path: "/management/view-locksmiths" },
      { type: "link", label: "Operators", path: "/management/view-operators" },
      { type: "link", label: "Accountants", path: "/management/view-accountants" },
      { type: "link", label: "Companies", path: "/management/companies" },
      { type: "link", label: "Email Addresses", path: "/management/email-addresses" },
    ],
  },

  // profile
  {
    type: "link",
    label: "Admin Profile",
    path: "/profile",
    icon: FiUser,
  },
];
