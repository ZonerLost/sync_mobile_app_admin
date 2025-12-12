import React from "react";
import SectionCard from "../../shared/layout/SectionCard";
import SlideOver from "../../shared/overlay/SlideOver";
import ReportExportButtons from "./ReportExportButtons";

interface DailyLocksmithReportItem {
  id: string;
  locksmithName: string;
  region: string;
  date: string; // YYYY-MM-DD
  jobsCompleted: number;
  cancellations: number;
  revenue: number;
  avgResponseMinutes: number;
  avgRating: number;
}

const INITIAL_DAILY_LOCKSMITHS: DailyLocksmithReportItem[] = [
  {
    id: "dl-1",
    locksmithName: "John Miller",
    region: "London",
    date: "2025-12-10",
    jobsCompleted: 18,
    cancellations: 1,
    revenue: 980,
    avgResponseMinutes: 21,
    avgRating: 4.8,
  },
  {
    id: "dl-2",
    locksmithName: "Sarah Collins",
    region: "Manchester",
    date: "2025-12-10",
    jobsCompleted: 15,
    cancellations: 0,
    revenue: 820,
    avgResponseMinutes: 24,
    avgRating: 4.9,
  },
  {
    id: "dl-3",
    locksmithName: "Adam Brown",
    region: "Bristol",
    date: "2025-12-10",
    jobsCompleted: 11,
    cancellations: 2,
    revenue: 610,
    avgResponseMinutes: 27,
    avgRating: 4.6,
  },
];

const LocksmithDailyModule: React.FC = () => {
  const [reports] =
    React.useState<DailyLocksmithReportItem[]>(INITIAL_DAILY_LOCKSMITHS);

  const today = React.useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [selectedDate, setSelectedDate] = React.useState<string>(today);
  const [selectedRow, setSelectedRow] =
    React.useState<DailyLocksmithReportItem | null>(null);

  const filtered = React.useMemo(
    () => reports.filter((r) => r.date === selectedDate),
    [reports, selectedDate]
  );

  const totals = React.useMemo(
    () =>
      filtered.reduce(
        (acc, r) => {
          acc.jobsCompleted += r.jobsCompleted;
          acc.cancellations += r.cancellations;
          acc.revenue += r.revenue;
          return acc;
        },
        { jobsCompleted: 0, cancellations: 0, revenue: 0 }
      ),
    [filtered]
  );

  const handleExportCsv = () => console.log("Export daily locksmith CSV:", selectedDate);
  const handleExportPdf = () => console.log("Export daily locksmith PDF:", selectedDate);

  return (
    <SectionCard
      title="Daily locksmith report"
      description="Per-locksmith performance for a given day, used for QA and payouts."
    >
      {/* Toolbar */}
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Filters
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-400">Date</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="h-9 w-full rounded-2xl border border-gray-200 bg-white px-3 text-xs text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:h-8 sm:w-auto"
            />
          </div>
        </div>

        <ReportExportButtons onExportCsv={handleExportCsv} onExportPdf={handleExportPdf} />
      </div>

      {/* Summary */}
      <div className="mb-3 grid gap-2 rounded-2xl bg-gray-50 px-3 py-2 text-[11px] text-gray-700 sm:grid-cols-2 sm:text-xs md:grid-cols-3 md:gap-3 md:px-4 md:py-3">
        <div>
          <span className="font-semibold text-gray-900">{totals.jobsCompleted}</span>{" "}
          jobs completed
        </div>
        <div>
          <span className="font-semibold text-gray-900">{totals.cancellations}</span>{" "}
          cancellations
        </div>
        <div>
          <span className="font-semibold text-gray-900">
            £{totals.revenue.toLocaleString()}
          </span>{" "}
          total revenue
        </div>
      </div>

      {/* ✅ MOBILE CARDS */}
      <div className="space-y-2 md:hidden">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center text-[11px] text-gray-400">
            No locksmith activity for this date.
          </div>
        ) : (
          filtered.map((row) => (
            <div
              key={row.id}
              className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-gray-900">
                    {row.locksmithName}
                  </div>
                  <div className="mt-0.5 truncate text-[11px] text-gray-500">
                    {row.region}
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
                  <div className="font-semibold text-gray-900">{row.jobsCompleted}</div>
                </div>
                <div>
                  <div className="text-gray-500">Revenue</div>
                  <div className="font-semibold text-gray-900">
                    £{row.revenue.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Cancellations</div>
                  <div className="font-semibold text-gray-900">{row.cancellations}</div>
                </div>
                <div>
                  <div className="text-gray-500">Avg response</div>
                  <div className="font-semibold text-gray-900">
                    {row.avgResponseMinutes} min
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-gray-500">Rating</div>
                  <div className="font-semibold text-gray-900">
                    {row.avgRating.toFixed(1)} / 5
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ DESKTOP TABLE */}
      <div className="hidden overflow-x-auto pb-1 md:block">
        <table className="w-full min-w-[720px] table-auto border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Locksmith
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Region
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Jobs completed
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Cancellations
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Revenue
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Avg response
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Rating
              </th>
              <th className="px-3 py-2 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-xs text-gray-400">
                  No locksmith activity for this date.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/70">
                  <td className="px-3 py-2 text-gray-900">{row.locksmithName}</td>
                  <td className="px-3 py-2 text-gray-800">{row.region}</td>
                  <td className="px-3 py-2 text-gray-800">{row.jobsCompleted}</td>
                  <td className="px-3 py-2 text-gray-800">{row.cancellations}</td>
                  <td className="px-3 py-2 text-gray-800">
                    £{row.revenue.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-gray-800">{row.avgResponseMinutes} min</td>
                  <td className="px-3 py-2 text-gray-800">{row.avgRating.toFixed(1)}</td>
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
          <DailyLocksmithDetailsPanel item={selectedRow} onClose={() => setSelectedRow(null)} />
        )}
      </SlideOver>
    </SectionCard>
  );
};

interface DailyLocksmithDetailsPanelProps {
  item: DailyLocksmithReportItem;
  onClose: () => void;
}

const DailyLocksmithDetailsPanel: React.FC<DailyLocksmithDetailsPanelProps> = ({
  item,
  onClose,
}) => {
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
          {item.locksmithName}
        </h2>
        <div className="h-8 w-8" />
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-1.5 pb-4 text-[11px] text-gray-800 sm:px-2 sm:text-xs">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Date & region
          </div>
          <div className="mt-0.5">
            {item.date} • {item.region}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 rounded-2xl bg-gray-50 p-3 sm:grid-cols-2">
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">
              Jobs completed
            </div>
            <div className="mt-1 text-sm font-semibold text-gray-900">{item.jobsCompleted}</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">
              Cancellations
            </div>
            <div className="mt-1 text-sm font-semibold text-gray-900">{item.cancellations}</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">Revenue</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">
              £{item.revenue.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">
              Avg response
            </div>
            <div className="mt-1 text-sm font-semibold text-gray-900">
              {item.avgResponseMinutes} min
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">Avg rating</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">
              {item.avgRating.toFixed(1)} / 5
            </div>
          </div>
        </div>

        <p className="mt-2 text-[11px] text-gray-500">
          Later you can extend this with per-job breakdown, postcodes, job types, etc.
        </p>
      </div>
    </div>
  );
};

export default LocksmithDailyModule;
