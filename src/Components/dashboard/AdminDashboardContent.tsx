import React from "react";
import DashboardChartsSection from "./DashboardChartsSection";
import QuickReportsSection from "./QuickReportsSection";
import type { DashboardKpis } from "./DashboardChartsSection";

// Re-export so other modules can import the type from here
export type { DashboardKpis } from "./DashboardChartsSection";

// eslint-disable-next-line react-refresh/only-export-components
export const rangeOptions = [
  { id: "7d", label: "Last 7 days" },
  { id: "30d", label: "Last 30 days" },
  { id: "90d", label: "Last 90 days" },
] as const;

export type RangeOptionId = (typeof rangeOptions)[number]["id"];

interface AdminDashboardContentProps {
  range: RangeOptionId;
  onRangeChange: (range: RangeOptionId) => void;
  kpis: DashboardKpis;
}

const AdminDashboardContent: React.FC<AdminDashboardContentProps> = ({
  range,
  onRangeChange,
  kpis,
}) => {
  const rangeLabel =
    rangeOptions.find((item) => item.id === range)?.label ?? undefined;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 md:space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-xs text-gray-500">
            Operational and business performance overview.
          </p>
        </div>

        {/* Range selector */}
        <div className="inline-flex w-full flex-wrap items-center gap-2 rounded-full bg-gray-100 p-[3px] text-xs sm:w-auto sm:flex-nowrap sm:gap-[2px]">
          {rangeOptions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onRangeChange(item.id)}
              className={[
                "rounded-full px-3 py-1 font-medium transition",
                range === item.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-800",
              ].join(" ")}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs + Charts */}
      <DashboardChartsSection kpis={kpis} rangeLabel={rangeLabel} />

      {/* Quick access to detailed reports */}
      <QuickReportsSection />
    </div>
  );
};

export default AdminDashboardContent;
