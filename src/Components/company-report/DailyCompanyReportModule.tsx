import React from "react";
import SectionCard from "../../shared/layout/SectionCard";
import SlideOver from "../../shared/overlay/SlideOver";
import CompanyReportFilters from "./CompanyReportFilters";

interface DailyCompanyReportItem {
  id: string;
  companyName: string;
  date: string;
  jobsCompleted: number;
  cancellations: number;
  revenue: number;
  avgResponseMinutes: number;
}

const INITIAL_DAILY_REPORTS: DailyCompanyReportItem[] = [
  { id: "dr-1", companyName: "SafeKeys Ltd", date: "2025-12-10", jobsCompleted: 28, cancellations: 1, revenue: 1650, avgResponseMinutes: 23 },
  { id: "dr-2", companyName: "DoorFix Solutions", date: "2025-12-10", jobsCompleted: 19, cancellations: 2, revenue: 1180, avgResponseMinutes: 27 },
  { id: "dr-3", companyName: "Rapid Locks UK", date: "2025-12-10", jobsCompleted: 9, cancellations: 1, revenue: 540, avgResponseMinutes: 31 },
  { id: "dr-4", companyName: "City Access Services", date: "2025-12-10", jobsCompleted: 4, cancellations: 0, revenue: 230, avgResponseMinutes: 29 },
];

const DailyCompanyReportModule: React.FC = () => {
  const [reports] = React.useState<DailyCompanyReportItem[]>(INITIAL_DAILY_REPORTS);

  const today = React.useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [selectedDate, setSelectedDate] = React.useState<string>(today);
  const [selectedRow, setSelectedRow] = React.useState<DailyCompanyReportItem | null>(null);

  const filtered = React.useMemo(
    () => reports.filter((r) => r.date === selectedDate),
    [reports, selectedDate]
  );

  const totals = React.useMemo(() => {
    return filtered.reduce(
      (acc, r) => {
        acc.jobsCompleted += r.jobsCompleted;
        acc.cancellations += r.cancellations;
        acc.revenue += r.revenue;
        return acc;
      },
      { jobsCompleted: 0, cancellations: 0, revenue: 0 }
    );
  }, [filtered]);

  return (
    <SectionCard
      title="Daily company report"
      description="Per-company performance for a specific day, including jobs, cancellations and revenue."
      className="space-y-3"
    >
      <CompanyReportFilters
        mode="daily"
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onExportCsv={() => console.log("Export CSV", selectedDate)}
        onExportPdf={() => console.log("Export PDF", selectedDate)}
      />

      <div className="grid gap-2 rounded-2xl bg-gray-50 px-3 py-2 text-[11px] text-gray-700 sm:grid-cols-2 sm:text-xs md:grid-cols-3 md:px-4 md:py-3">
        <div>
          <span className="font-semibold text-gray-900">{totals.jobsCompleted}</span>{" "}
          jobs completed
        </div>
        <div>
          <span className="font-semibold text-gray-900">{totals.cancellations}</span>{" "}
          cancellations
        </div>
        <div>
          <span className="font-semibold text-gray-900">£{totals.revenue.toLocaleString()}</span>{" "}
          total revenue
        </div>
      </div>

      {/* ✅ Mobile cards */}
      <div className="md:hidden space-y-2">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center text-[11px] text-gray-400">
            No company activity for this date.
          </div>
        ) : (
          filtered.map((row) => (
            <div key={row.id} className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
              <div className="text-sm font-semibold text-gray-900">{row.companyName}</div>

              <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-gray-50 p-3 text-[11px]">
                <div>
                  <div className="text-gray-500">Jobs</div>
                  <div className="mt-0.5 font-semibold text-gray-900">{row.jobsCompleted}</div>
                </div>
                <div>
                  <div className="text-gray-500">Cancel</div>
                  <div className="mt-0.5 font-semibold text-gray-900">{row.cancellations}</div>
                </div>
                <div>
                  <div className="text-gray-500">Revenue</div>
                  <div className="mt-0.5 font-semibold text-gray-900">£{row.revenue.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-500">Avg response</div>
                  <div className="mt-0.5 font-semibold text-gray-900">{row.avgResponseMinutes} min</div>
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

      {/* ✅ md+ table */}
      <div className="hidden md:block overflow-x-auto pb-1">
        <table className="w-full table-auto border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Company</th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Jobs completed</th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Cancellations</th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Revenue</th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">Avg response</th>
              <th className="px-3 py-2 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">Details</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-xs text-gray-400">
                  No company activity for this date.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/70">
                  <td className="px-3 py-2 text-gray-900">{row.companyName}</td>
                  <td className="px-3 py-2 text-gray-800">{row.jobsCompleted}</td>
                  <td className="px-3 py-2 text-gray-800">{row.cancellations}</td>
                  <td className="px-3 py-2 text-gray-800">£{row.revenue.toLocaleString()}</td>
                  <td className="px-3 py-2 text-gray-800">{row.avgResponseMinutes} min</td>
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

      <SlideOver isOpen={!!selectedRow} onClose={() => setSelectedRow(null)} widthClassName="w-full max-w-md">
        {selectedRow && <DailyReportDetailsPanel item={selectedRow} onClose={() => setSelectedRow(null)} />}
      </SlideOver>
    </SectionCard>
  );
};

interface DailyReportDetailsPanelProps {
  item: DailyCompanyReportItem;
  onClose: () => void;
}

const DailyReportDetailsPanel: React.FC<DailyReportDetailsPanelProps> = ({ item, onClose }) => {
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
        <h2 className="flex-1 text-center text-sm font-semibold text-gray-900">{item.companyName}</h2>
        <div className="h-8 w-8" />
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-1.5 pb-4 text-[11px] text-gray-800 sm:px-2 sm:text-xs">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Date</div>
          <div className="mt-0.5">{item.date}</div>
        </div>

        <div className="grid grid-cols-1 gap-2 rounded-2xl bg-gray-50 p-3 sm:grid-cols-2">
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">Jobs completed</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">{item.jobsCompleted}</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">Cancellations</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">{item.cancellations}</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">Revenue</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">£{item.revenue.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">Avg response time</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">{item.avgResponseMinutes} min</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyCompanyReportModule;
