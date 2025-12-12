import React from "react";
import SectionCard from "../../shared/layout/SectionCard";
import SlideOver from "../../shared/overlay/SlideOver";
import ReportExportButtons from "./ReportExportButtons";

type OperatorMode = "daily" | "weekly" | "monthly";

interface OperatorOverviewItem {
  id: string;
  operatorName: string;
  shiftLabel: string;
  ticketsHandled: number;
  avgHandleMinutes: number;
  firstResponseSeconds: number;
  resolutionRate: number;
}

const BASE_ITEMS: OperatorOverviewItem[] = [
  {
    id: "op-1",
    operatorName: "Operator 01",
    shiftLabel: "Today",
    ticketsHandled: 58,
    avgHandleMinutes: 7.4,
    firstResponseSeconds: 42,
    resolutionRate: 92,
  },
  {
    id: "op-2",
    operatorName: "Operator 02",
    shiftLabel: "Today",
    ticketsHandled: 46,
    avgHandleMinutes: 8.2,
    firstResponseSeconds: 55,
    resolutionRate: 88,
  },
  {
    id: "op-3",
    operatorName: "Operator 03",
    shiftLabel: "Today",
    ticketsHandled: 39,
    avgHandleMinutes: 9.1,
    firstResponseSeconds: 60,
    resolutionRate: 86,
  },
];

interface OperatorOverviewModuleProps {
  mode: OperatorMode;
}

const OperatorOverviewModule: React.FC<OperatorOverviewModuleProps> = ({ mode }) => {
  const [range, setRange] = React.useState<string>(
    mode === "daily" ? new Date().toISOString().slice(0, 10) : "this-period"
  );
  const [selectedRow, setSelectedRow] = React.useState<OperatorOverviewItem | null>(null);

  const items = BASE_ITEMS;

  const totals = React.useMemo(
    () =>
      items.reduce(
        (acc, r) => {
          acc.tickets += r.ticketsHandled;
          acc.resolution += r.resolutionRate;
          return acc;
        },
        { tickets: 0, resolution: 0 }
      ),
    [items]
  );

  const avgResolutionRate = items.length > 0 ? totals.resolution / items.length : 0;

  const title =
    mode === "daily"
      ? "Operator overview (daily)"
      : mode === "weekly"
      ? "Operator overview (weekly)"
      : "Operator overview (monthly)";

  const description =
    mode === "daily"
      ? "Same-day operator performance for staffing and QA."
      : mode === "weekly"
      ? "Weekly operator trends to support staffing and training."
      : "Monthly operator trends used in performance reviews.";

  const handleExportCsv = () => console.log("Export operator CSV:", mode, range);
  const handleExportPdf = () => console.log("Export operator PDF:", mode, range);

  const renderFilterControl = () => {
    if (mode === "daily") {
      return (
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400">Date</span>
          <input
            type="date"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="h-9 w-full rounded-2xl border border-gray-200 bg-white px-3 text-xs text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:h-8 sm:w-auto"
          />
        </div>
      );
    }

    if (mode === "weekly") {
      return (
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400">Week range</span>
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
      );
    }

    return (
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-gray-400">Month</span>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="h-9 w-full rounded-2xl border border-gray-200 bg-white px-3 text-xs text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:h-8 sm:w-auto"
        >
          <option value="this-month">This month</option>
          <option value="last-month">Last month</option>
          <option value="last-3-months">Last 3 months</option>
        </select>
      </div>
    );
  };

  return (
    <SectionCard title={title} description={description}>
      {/* Toolbar */}
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Filters
          </span>
          {renderFilterControl()}
        </div>

        <ReportExportButtons onExportCsv={handleExportCsv} onExportPdf={handleExportPdf} />
      </div>

      {/* Summary */}
      <div className="mb-3 grid gap-2 rounded-2xl bg-gray-50 px-3 py-2 text-[11px] text-gray-700 sm:grid-cols-2 sm:text-xs md:gap-3 md:px-4 md:py-3">
        <div>
          <span className="font-semibold text-gray-900">{totals.tickets}</span>{" "}
          tickets handled
        </div>
        <div>
          <span className="font-semibold text-gray-900">{avgResolutionRate.toFixed(1)}%</span>{" "}
          avg resolution rate
        </div>
      </div>

      {/* ✅ MOBILE CARDS */}
      <div className="space-y-2 md:hidden">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center text-[11px] text-gray-400">
            No operator activity recorded for this range.
          </div>
        ) : (
          items.map((row) => (
            <div key={row.id} className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-gray-900">
                    {row.operatorName}
                  </div>
                  <div className="mt-0.5 truncate text-[11px] text-gray-500">
                    {row.shiftLabel}
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
                  <div className="text-gray-500">Tickets</div>
                  <div className="font-semibold text-gray-900">{row.ticketsHandled}</div>
                </div>
                <div>
                  <div className="text-gray-500">Resolution</div>
                  <div className="font-semibold text-gray-900">{row.resolutionRate}%</div>
                </div>
                <div>
                  <div className="text-gray-500">Avg handle</div>
                  <div className="font-semibold text-gray-900">
                    {row.avgHandleMinutes.toFixed(1)} min
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">First response</div>
                  <div className="font-semibold text-gray-900">{row.firstResponseSeconds}s</div>
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
                Operator
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Period
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Tickets handled
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Avg handle time
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                First response
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                Resolution rate
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
                  No operator activity recorded for this range.
                </td>
              </tr>
            ) : (
              items.map((row) => (
                <tr key={row.id} className="border-b border-gray-50 hover:bg-gray-50/70">
                  <td className="px-3 py-2 text-gray-900">{row.operatorName}</td>
                  <td className="px-3 py-2 text-gray-800">{row.shiftLabel}</td>
                  <td className="px-3 py-2 text-gray-800">{row.ticketsHandled}</td>
                  <td className="px-3 py-2 text-gray-800">
                    {row.avgHandleMinutes.toFixed(1)} min
                  </td>
                  <td className="px-3 py-2 text-gray-800">{row.firstResponseSeconds}s</td>
                  <td className="px-3 py-2 text-gray-800">{row.resolutionRate}%</td>
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
          <OperatorOverviewDetailsPanel item={selectedRow} onClose={() => setSelectedRow(null)} />
        )}
      </SlideOver>
    </SectionCard>
  );
};

interface OperatorOverviewDetailsPanelProps {
  item: OperatorOverviewItem;
  onClose: () => void;
}

const OperatorOverviewDetailsPanel: React.FC<OperatorOverviewDetailsPanelProps> = ({
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
          {item.operatorName}
        </h2>
        <div className="h-8 w-8" />
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-1.5 pb-4 text-[11px] text-gray-800 sm:px-2 sm:text-xs">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">
            Period
          </div>
          <div className="mt-0.5">{item.shiftLabel}</div>
        </div>

        <div className="grid grid-cols-1 gap-2 rounded-2xl bg-gray-50 p-3 sm:grid-cols-2">
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">Tickets handled</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">{item.ticketsHandled}</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">Avg handle time</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">
              {item.avgHandleMinutes.toFixed(1)} min
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">First response</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">
              {item.firstResponseSeconds}s
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase text-gray-500">Resolution rate</div>
            <div className="mt-1 text-sm font-semibold text-gray-900">{item.resolutionRate}%</div>
          </div>
        </div>

        <p className="mt-2 text-[11px] text-gray-500">
          Later you can attach transcripts, QA scores or escalation breakdowns here.
        </p>
      </div>
    </div>
  );
};

export default OperatorOverviewModule;
