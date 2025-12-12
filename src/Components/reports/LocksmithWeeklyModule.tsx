import React from "react";
import SectionCard from "../../shared/layout/SectionCard";
import SlideOver from "../../shared/overlay/SlideOver";
import ReportExportButtons from "./ReportExportButtons";

interface WeeklyLocksmithReportItem {
  id: string;
  locksmithName: string;
  region: string;
  weekLabel: string; // e.g. "Week 49"
  jobsTotal: number;
  cancellations: number;
  revenue: number;
  avgRating: number;
}

const INITIAL_WEEKLY_LOCKSMITHS: WeeklyLocksmithReportItem[] = [
  {
    id: "wl-1",
    locksmithName: "John Miller",
    region: "London",
    weekLabel: "Week 49",
    jobsTotal: 86,
    cancellations: 4,
    revenue: 4800,
    avgRating: 4.8,
  },
  {
    id: "wl-2",
    locksmithName: "Sarah Collins",
    region: "Manchester",
    weekLabel: "Week 49",
    jobsTotal: 73,
    cancellations: 2,
    revenue: 4250,
    avgRating: 4.9,
  },
  {
    id: "wl-3",
    locksmithName: "Adam Brown",
    region: "Bristol",
    weekLabel: "Week 49",
    jobsTotal: 51,
    cancellations: 3,
    revenue: 3010,
    avgRating: 4.7,
  },
];

const LocksmithWeeklyModule: React.FC = () => {
  const [reports] =
    React.useState<WeeklyLocksmithReportItem[]>(INITIAL_WEEKLY_LOCKSMITHS);
  const [range, setRange] = React.useState<string>("this-week");
  const [selectedRow, setSelectedRow] =
    React.useState<WeeklyLocksmithReportItem | null>(null);

  const visible = reports; // later: filter by range

  const totals = React.useMemo(
    () =>
      visible.reduce(
        (acc, r) => {
          acc.jobsTotal += r.jobsTotal;
          acc.cancellations += r.cancellations;
          acc.revenue += r.revenue;
          return acc;
        },
        { jobsTotal: 0, cancellations: 0, revenue: 0 }
      ),
    [visible]
  );

  const handleExportCsv = () => console.log("Export weekly locksmith CSV:", range);
  const handleExportPdf = () => console.log("Export weekly locksmith PDF:", range);

  return (
    <SectionCard
      title="Weekly locksmith report"
      description="Weekly view of locksmith performance used for QA and payout summaries."
    >
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
          <span className="font-semibold text-gray-900">{totals.jobsTotal}</span>{" "}
          jobs in range
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
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center text-[11px] text-gray-400">
            No locksmith data for this range.
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
                    {row.locksmithName}
                  </div>
                  <div className="mt-0.5 truncate text-[11px] text-gray-500">
                    {row.region} • {row.weekLabel}
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
                  <div className="font-semibold text-gray-900">{row.jobsTotal}</div>
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
                  <div className="text-gray-500">Avg rating</div>
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
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Avg rating
              </th>
              <th className="px-3 py-2 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-xs text-gray-400">
                  No locksmith data for this range.
                </td>
              </tr>
            ) : (
              visible.map((row) => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/70">
                  <td className="px-3 py-2 text-gray-900">{row.locksmithName}</td>
                  <td className="px-3 py-2 text-gray-800">{row.region}</td>
                  <td className="px-3 py-2 text-gray-800">{row.weekLabel}</td>
                  <td className="px-3 py-2 text-gray-800">{row.jobsTotal}</td>
                  <td className="px-3 py-2 text-gray-800">{row.cancellations}</td>
                  <td className="px-3 py-2 text-gray-800">
                    £{row.revenue.toLocaleString()}
                  </td>
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
          <WeeklyLocksmithDetailsPanel item={selectedRow} onClose={() => setSelectedRow(null)} />
        )}
      </SlideOver>
    </SectionCard>
  );
};

interface WeeklyLocksmithDetailsPanelProps {
  item: WeeklyLocksmithReportItem;
  onClose: () => void;
}

const WeeklyLocksmithDetailsPanel: React.FC<WeeklyLocksmithDetailsPanelProps> = ({
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
            Week & region
          </div>
          <div className="mt-0.5">
            {item.weekLabel} • {item.region}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 rounded-2xl bg-gray-50 p-3 sm:grid-cols-2">
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">Jobs total</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">{item.jobsTotal}</div>
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
            <div className="text-[11px] font-semibold uppercase text-gray-500">Avg rating</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">
              {item.avgRating.toFixed(1)} / 5
            </div>
          </div>
        </div>

        <p className="mt-2 text-[11px] text-gray-500">
          Later this can include breakdown by day-of-week, job types and postcode segments.
        </p>
      </div>
    </div>
  );
};

export default LocksmithWeeklyModule;
