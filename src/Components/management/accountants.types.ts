export type AccountantStatus = "Active" | "Suspended";

export interface Accountant {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  status: AccountantStatus;
}

export const INITIAL_ACCOUNTANTS: Accountant[] = [
  {
    id: "ac-1",
    name: "Sarah Collins",
    email: "sarah.collins@company.com",
    role: "Lead Accountant",
    lastLogin: "Today, 09:14",
    status: "Active",
  },
  {
    id: "ac-2",
    name: "Michael Turner",
    email: "michael.turner@company.com",
    role: "Revenue Analyst",
    lastLogin: "Yesterday, 17:42",
    status: "Active",
  },
  {
    id: "ac-3",
    name: "Laura Fisher",
    email: "laura.fisher@company.com",
    role: "Junior Accountant",
    lastLogin: "3 days ago",
    status: "Suspended",
  },
];

export const statusToBadgeClass = (status: AccountantStatus) => {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-600";
    case "Suspended":
    default:
      return "bg-gray-100 text-gray-500";
  }
};
