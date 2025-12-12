import React from "react";
import SectionCard from "../../shared/layout/SectionCard";
import SlideOver from "../../shared/overlay/SlideOver";
import ReportExportButtons from "./ReportExportButtons";

type MovementVariant = "in" | "out";

interface WeeklyCompanyMovementItem {
  id: string;
  companyName: string;
  city: string;
  weekLabel: string;
  jobsInRange: number;
  revenueInRange: number;
  reason: string;
}

const INITIAL_IN_ITEMS: WeeklyCompanyMovementItem[] = [
  {
    id: "ci-1",
    companyName: "SafeKeys Ltd",
    city: "London",
    weekLabel: "Week 49",
    jobsInRange: 42,
    revenueInRange: 2450,
    reason: "New onboarding",
  },
  {
    id: "ci-2",
    companyName: "DoorFix Solutions",
    city: "Manchester",
    weekLabel: "Week 49",
    jobsInRange: 35,
    revenueInRange: 2090,
    reason: "Expanded coverage region",
  },
];

const INITIAL_OUT_ITEMS: WeeklyCompanyMovementItem[] = [
  {
    id: "co-1",
    companyName: "Prime Locks Ltd",
    city: "Birmingham",
    weekLabel: "Week 49",
    jobsInRange: 12,
    revenueInRange: 650,
    reason: "Paused operations",
  },
  {
    id: "co-2",
    companyName: "QuickFix Doors",
    city: "Leeds",
    weekLabel: "Week 49",
    jobsInRange: 7,
    revenueInRange: 390,
    reason: "Moved to competitor",
  },
];

interface WeeklyCompaniesMovementModuleProps {
  variant: MovementVariant;
}

const WeeklyCompaniesMovementModule: React.FC<WeeklyCompaniesMovementModuleProps> = ({
  variant,
}) => {
  const [range, setRange] = React.useState<string>("this-week");
  const [selectedRow, setSelectedRow] = React.useState<WeeklyCompanyMovementItem | null>(
    null
  );

  const items = variant === "in" ? INITIAL_IN_ITEMS : INITIAL_OUT_ITEMS;

  const totals = React.useMemo(
    () =>
      items.reduce(
        (acc, r) => {
          acc.companies += 1;
          acc.jobs += r.jobsInRange;
          acc.revenue += r.revenueInRange;
          return acc;
        },
        { companies: 0, jobs: 0, revenue: 0 }
      ),
    [items]
  );

  const title = variant === "in" ? "Weekly companies IN" : "Weekly companies OUT";

  const description =
    variant === "in"
      ? "New companies joining SYC Mobile in the selected week range."
      : "Companies that churned or paused in the selected week range.";

  const handleExportCsv = () => {
    console.log(`Export companies ${variant} CSV for range:`, range);
  };
  const handleExportPdf = () => {
    console.log(`Export companies ${variant} PDF for range:`, range);
  };

  return (
    <SectionCard title={title} description={description}>
      {/* Toolbar */}
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Filters
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-400">Range</span>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="h-9 w-full rounded-2xl border border-gray-200 bg-white px-3 text-xs text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:h-8 sm:w-auto"
            >
              <option value="this-week">This week</option>
              <option value="last-week">Last week</option>
              <option value="last-4-weeks">Last 4 weeks</option>
            </select>
          </div>
        </div>

        <ReportExportButtons onExportCsv={handleExportCsv} onExportPdf={handleExportPdf} />
      </div>

      {/* Summary */}
      <div className="mb-3 grid gap-2 rounded-2xl bg-gray-50 px-3 py-2 text-[11px] text-gray-700 sm:grid-cols-2 sm:text-xs md:grid-cols-3 md:gap-3 md:px-4 md:py-3">
        <div>
          <span className="font-semibold text-gray-900">{totals.companies}</span>{" "}
          companies
        </div>
        <div>
          <span className="font-semibold text-gray-900">{totals.jobs}</span> jobs in range
        </div>
        <div>
          <span className="font-semibold text-gray-900">
            £{totals.revenue.toLocaleString()}
          </span>{" "}
          total revenue impact
        </div>
      </div>

      {/* ✅ MOBILE CARDS */}
      <div className="space-y-2 md:hidden">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center text-[11px] text-gray-400">
            No company movement for this range.
          </div>
        ) : (
          items.map((row) => (
            <div key={row.id} className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-gray-900">
                    {row.companyName}
                  </div>
                  <div className="mt-0.5 text-[11px] text-gray-500">
                    {row.weekLabel} • {row.city}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedRow(row)}
                  className="shrink-0 rounded-2xl bg-white px-3 py-1.5 text-[11px] font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
                >
                  View
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-gray-50 p-3 text-[11px] text-gray-800">
                <div>
                  <div className="text-gray-500">Jobs</div>
                  <div className="font-semibold text-gray-900">{row.jobsInRange}</div>
                </div>
                <div>
                  <div className="text-gray-500">Revenue</div>
                  <div className="font-semibold text-gray-900">
                    £{row.revenueInRange.toLocaleString()}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-gray-500">Reason</div>
                  <div className="mt-0.5 text-gray-900">{row.reason}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ DESKTOP TABLE */}
      <div className="hidden overflow-x-auto pb-1 md:block">
        <table className="w-full min-w-[820px] table-auto border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Company
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                City
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Week
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Jobs in range
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Revenue impact
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Reason
              </th>
              <th className="px-3 py-2 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Details
              </th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-xs text-gray-400">
                  No company movement for this range.
                </td>
              </tr>
            ) : (
              items.map((row) => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/70">
                  <td className="px-3 py-2 text-gray-900">{row.companyName}</td>
                  <td className="px-3 py-2 text-gray-800">{row.city}</td>
                  <td className="px-3 py-2 text-gray-800">{row.weekLabel}</td>
                  <td className="px-3 py-2 text-gray-800">{row.jobsInRange}</td>
                  <td className="px-3 py-2 text-gray-800">
                    £{row.revenueInRange.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-gray-800">{row.reason}</td>
                  <td className="px-3 py-2 text-right text-gray-500">
                    <button
                      type="button"
                      onClick={() => setSelectedRow(row)}
                      className="rounded-2xl bg-white px-3 py-1.5 text-[11px] font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <SlideOver
        isOpen={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        widthClassName="w-full sm:max-w-md"
      >
        {selectedRow && (
          <CompanyMovementDetailsPanel
            item={selectedRow}
            variant={variant}
            onClose={() => setSelectedRow(null)}
          />
        )}
      </SlideOver>
    </SectionCard>
  );
};

interface CompanyMovementDetailsPanelProps {
  item: WeeklyCompanyMovementItem;
  variant: MovementVariant;
  onClose: () => void;
}

const CompanyMovementDetailsPanel: React.FC<CompanyMovementDetailsPanelProps> = ({
  item,
  variant,
  onClose,
}) => {
  const label = variant === "in" ? "joined" : "left/paused";

  return (
    <div className="flex h-full flex-col bg-white px-3 pb-4 pt-3 sm:rounded-3xl sm:px-4 sm:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <span className="text-sm">×</span>
        </button>
        <h2 className="flex-1 text-center text-sm font-semibold text-gray-900">
          {item.companyName}
        </h2>
        <div className="h-8 w-8" />
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-1.5 pb-4 text-[11px] text-gray-800 sm:px-2 sm:text-xs">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Week & city
          </div>
          <div className="mt-0.5">
            {item.weekLabel} • {item.city}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 rounded-2xl bg-gray-50 p-3 sm:grid-cols-2">
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">
              Jobs in range
            </div>
            <div className="mt-1 text-sm font-semibold text-gray-900">{item.jobsInRange}</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">
              Revenue impact
            </div>
            <div className="mt-1 text-sm font-semibold text-gray-900">
              £{item.revenueInRange.toLocaleString()}
            </div>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Reason {label}
          </div>
          <div className="mt-0.5">{item.reason}</div>
        </div>

        <p className="mt-2 text-[11px] text-gray-500">
          Later this can include internal notes from account managers or support on why the
          company {label} SYC Mobile.
        </p>
      </div>
    </div>
  );
};

export default WeeklyCompaniesMovementModule;
