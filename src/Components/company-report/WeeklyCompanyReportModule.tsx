import React from "react";
import SectionCard from "../../shared/layout/SectionCard";
import SlideOver from "../../shared/overlay/SlideOver";
import CompanyReportFilters from "./CompanyReportFilters";

interface WeeklyCompanyReportItem {
  id: string;
  companyName: string;
  weekLabel: string; // e.g. "Week 49"
  jobsTotal: number;
  cancellations: number;
  revenue: number;
}

const INITIAL_WEEKLY_REPORTS: WeeklyCompanyReportItem[] = [
  {
    id: "wr-1",
    companyName: "SafeKeys Ltd",
    weekLabel: "Week 49",
    jobsTotal: 185,
    cancellations: 7,
    revenue: 10450,
  },
  {
    id: "wr-2",
    companyName: "DoorFix Solutions",
    weekLabel: "Week 49",
    jobsTotal: 142,
    cancellations: 6,
    revenue: 8580,
  },
  {
    id: "wr-3",
    companyName: "Rapid Locks UK",
    weekLabel: "Week 49",
    jobsTotal: 61,
    cancellations: 4,
    revenue: 4230,
  },
  {
    id: "wr-4",
    companyName: "City Access Services",
    weekLabel: "Week 49",
    jobsTotal: 28,
    cancellations: 2,
    revenue: 1640,
  },
];

const WeeklyCompanyReportModule: React.FC = () => {
  const [reports] =
    React.useState<WeeklyCompanyReportItem[]>(INITIAL_WEEKLY_REPORTS);

  const [selectedRange, setSelectedRange] = React.useState<string>("this-week");
  const [selectedRow, setSelectedRow] =
    React.useState<WeeklyCompanyReportItem | null>(null);

  // For now, range doesn't filter sample data; in real app you'd filter by week-range
  const visible = reports;

  const totals = React.useMemo(() => {
    return visible.reduce(
      (acc, r) => {
        acc.jobsTotal += r.jobsTotal;
        acc.cancellations += r.cancellations;
        acc.revenue += r.revenue;
        return acc;
      },
      { jobsTotal: 0, cancellations: 0, revenue: 0 }
    );
  }, [visible]);

  const handleExportCsv = () => {
    console.log("Export weekly company report as CSV for", selectedRange);
  };

  const handleExportPdf = () => {
    console.log("Export weekly company report as PDF for", selectedRange);
  };

  return (
    <SectionCard
      title="Weekly company report"
      description="Aggregated weekly company performance used for trend analysis and billing."
      className="space-y-3 md:space-y-4"
    >
      <CompanyReportFilters
        mode="weekly"
        selectedRange={selectedRange}
        onRangeChange={setSelectedRange}
        onExportCsv={handleExportCsv}
        onExportPdf={handleExportPdf}
      />

      {/* Aggregated summary */}
      <div className="grid gap-2 rounded-2xl bg-gray-50 px-3 py-2 text-[11px] text-gray-700 sm:grid-cols-2 sm:text-xs md:gap-3 md:px-4 md:py-3 lg:grid-cols-3">
        <div>
          <span className="font-semibold text-gray-900">{totals.jobsTotal}</span>{" "}
          jobs this range
        </div>
        <div>
          <span className="font-semibold text-gray-900">
            {totals.cancellations}
          </span>{" "}
          cancellations
        </div>
        <div>
          <span className="font-semibold text-gray-900">
            £{totals.revenue.toLocaleString()}
          </span>{" "}
          total revenue
        </div>
      </div>

      {/* ✅ Mobile cards */}
      <div className="space-y-2 md:hidden">
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center text-[11px] text-gray-400">
            No company activity for this week.
          </div>
        ) : (
          visible.map((row) => (
            <div
              key={row.id}
              className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-gray-900">
                    {row.companyName}
                  </div>
                  <div className="text-[11px] text-gray-500">{row.weekLabel}</div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="text-[10px] uppercase tracking-wide text-gray-400">
                    Revenue
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    £{row.revenue.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-gray-50 p-3 text-[11px]">
                <div>
                  <div className="text-gray-500">Jobs total</div>
                  <div className="mt-0.5 font-semibold text-gray-900">
                    {row.jobsTotal}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Cancellations</div>
                  <div className="mt-0.5 font-semibold text-gray-900">
                    {row.cancellations}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRow(row)}
                className="mt-3 w-full rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
              >
                View details
              </button>
            </div>
          ))
        )}
      </div>

      {/* ✅ Tablet/Laptop table */}
      <div className="hidden md:block overflow-x-auto pb-1">
        <table className="w-full min-w-[720px] table-auto border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Company
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Week
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Jobs total
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Cancellations
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Revenue
              </th>
              <th className="px-3 py-2 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-3 py-6 text-center text-xs text-gray-400"
                >
                  No company activity for this week.
                </td>
              </tr>
            ) : (
              visible.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-50 hover:bg-gray-50/70"
                >
                  <td className="px-3 py-2 text-gray-900">{row.companyName}</td>
                  <td className="px-3 py-2 text-gray-800">{row.weekLabel}</td>
                  <td className="px-3 py-2 text-gray-800">{row.jobsTotal}</td>
                  <td className="px-3 py-2 text-gray-800">{row.cancellations}</td>
                  <td className="px-3 py-2 text-gray-800">
                    £{row.revenue.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedRow(row)}
                      className="rounded-2xl bg-white px-3 py-1.5 text-xs font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
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
        widthClassName="w-full max-w-md"
      >
        {selectedRow && (
          <WeeklyReportDetailsPanel
            item={selectedRow}
            onClose={() => setSelectedRow(null)}
          />
        )}
      </SlideOver>
    </SectionCard>
  );
};

interface WeeklyReportDetailsPanelProps {
  item: WeeklyCompanyReportItem;
  onClose: () => void;
}

const WeeklyReportDetailsPanel: React.FC<WeeklyReportDetailsPanelProps> = ({
  item,
  onClose,
}) => {
  return (
    <div className="flex h-full flex-col bg-white px-3 pb-4 pt-3 sm:rounded-3xl sm:px-4 sm:shadow-md md:px-5">
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
            Week
          </div>
          <div className="mt-0.5">{item.weekLabel}</div>
        </div>

        <div className="grid grid-cols-1 gap-2 rounded-2xl bg-gray-50 p-3 sm:grid-cols-2">
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">
              Jobs total
            </div>
            <div className="mt-1 text-sm font-semibold text-gray-900">
              {item.jobsTotal}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">
              Cancellations
            </div>
            <div className="mt-1 text-sm font-semibold text-gray-900">
              {item.cancellations}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">
              Revenue
            </div>
            <div className="mt-1 text-sm font-semibold text-gray-900">
              £{item.revenue.toLocaleString()}
            </div>
          </div>
        </div>

        <p className="mt-2 text-[11px] text-gray-500">
          Weekly details can be extended later with trends (e.g. jobs per day in
          this week, postcode breakdown, etc.).
        </p>
      </div>
    </div>
  );
};

export default WeeklyCompanyReportModule;
